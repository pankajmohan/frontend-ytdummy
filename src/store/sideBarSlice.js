import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  width: 260,           // Expanded sidebar width
  collapsedWidth: 80    // Width when collapsed
};

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
      state.width = state.isCollapsed ? state.collapsedWidth : 260;
    },
    // Optional: set specific width manually
    setSidebarWidth: (state, action) => {
      state.width = action.payload;
    }
  }
});

export const { toggleSidebar, setSidebarWidth } = sideBarSlice.actions;
export default sideBarSlice.reducer;
