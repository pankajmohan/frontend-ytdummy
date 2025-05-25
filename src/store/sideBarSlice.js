import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:false,
}


export const sideBarSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
            fullscreen:(state, action)=>{
                state.status = !state.status;
                
            }
    }
})


export default sideBarSlice.reducer;

export const {fullscreen} = sideBarSlice.actions;