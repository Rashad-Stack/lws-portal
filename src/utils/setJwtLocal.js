import { userLoggedIn } from "../features/auth/authSlice";

export const setToLocal = (data, dispatch) => {
  console.log("🚀 ~ file: setJwtLocal.js:4 ~ setToLocal ~ data:", data.token);
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
