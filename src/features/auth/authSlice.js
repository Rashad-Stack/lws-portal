import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: undefined,
  user: undefined,
  isLoginError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      state.isLoginError = false;
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
    },
    userLoggedOut(state) {
      state.isLoginError = false;
      state.jwt = undefined;
      state.user = undefined;
      localStorage.clear("auth");
    },
    roleCheckout(state) {
      state.isLoginError = true;
    },
  },
});

export const { userLoggedIn, userLoggedOut, roleCheckout } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
