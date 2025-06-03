import axios from "axios";
import {jwtDecode} from "jwt-decode";


const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Critical to send/receive cookies
  headers: {
    'Content-Type': 'application/json' // ✅ This is critical!
  }
});




let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
const isAuthRequest = originalRequest.url.includes('/login') || originalRequest.url.includes('/refresh-token');
    
    if (error.response?.status === 401 && !originalRequest._retry  && !isAuthRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/users/refresh-token");
        const newAccessToken = refreshResponse.data?.data?.accessToken;

        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);



export default api;