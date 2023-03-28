import { userLoggedIn } from "../features/auth/authSlice";

export const setToLocal = (data, dispatch) => {
  if (data) {
    const { accessToken, user } = data;
    localStorage.setItem(
      "auth",
      JSON.stringify({
        jwt: accessToken,
        user,
      })
    );
    dispatch(
      userLoggedIn({
        jwt: accessToken,
        user,
      })
    );
  }
};
