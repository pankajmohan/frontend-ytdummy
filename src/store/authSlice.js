import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:false,
    userData:null
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
            login:(state, action)=>{
                console.log("Action:",action);
                state.status = true;
                state.userData = action.payload;
                localStorage.setItem("auth", JSON.stringify({ user: action.payload }));

            },
            logout:(state)=>{
                state.status = false;
                state.userData = null;
            }
    }
})


export default authSlice.reducer;

export const {login, logout} = authSlice.actions;