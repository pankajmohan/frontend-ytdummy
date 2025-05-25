import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import sideBarSlice from "./sideBarSlice";
const persistedAuth = localStorage.getItem("auth")
  ? {
    status: true,
    userData: JSON.parse(localStorage.getItem("auth")),
  }
  : {
    status: false,
    userData: null,
  };



const store = configureStore({
  reducer: {
    auth: AuthReducer,
    sidebar: sideBarSlice
  },
  preloadedState: {
    auth: persistedAuth
  }


})

export default store;