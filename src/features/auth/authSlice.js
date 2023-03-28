import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
    },
    userLoggedOut(state) {
      state.jwt = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
