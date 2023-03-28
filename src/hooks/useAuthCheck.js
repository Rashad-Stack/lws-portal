import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.jwt && auth?.user) {
        dispatch(
          userLoggedIn({
            jwt: auth.jwt,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
