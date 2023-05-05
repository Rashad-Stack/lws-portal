import { userLoggedIn } from "../features/auth/authSlice";

export const setToLocal = (data, dispatch) => {
  if (data) {
    const { token, user } = data;
    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        jwt: token,
      })
    );
    dispatch(
      userLoggedIn({
        user,
        jwt: token,
      })
    );
  }
};
