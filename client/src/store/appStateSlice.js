import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      console.log("setuser", action);
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLoggedInUser, logout } = appStateSlice.actions;
export default appStateSlice.reducer;
