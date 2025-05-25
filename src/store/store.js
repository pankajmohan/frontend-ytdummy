import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
const persistedAuth = localStorage.getItem("auth")
  ? {
      status: true,
      userData: JSON.parse(localStorage.getItem("auth")).user,
    }
  : {
      status: false,
      userData: null,
    };



const store = configureStore({
    reducer:{
auth: AuthReducer, 
   },
   preloadedState:{
    auth:persistedAuth
   }

    
})

export default store;