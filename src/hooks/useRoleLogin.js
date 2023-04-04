import React from "react";
import {
  useAdminLoginMutation,
  useLoginMutation,
} from "../features/auth/authApi";

export default function useRoleLogin() {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [
    adminLogin,
    {
      isLoading: adminLoginIsLoading,
      isError: adminLoginIsError,
      error: adminLoginError,
      isSuccess: adminLoginIsSuccess,
    },
  ] = useAdminLoginMutation();

  const loginIsLoading = isLoading || adminLoginIsLoading;
  const loginIsError = isError || adminLoginIsError;
  const loginError = error || adminLoginError;
  const loginSuccess = isSuccess || adminLoginIsSuccess;

  return {
    login,
    adminLogin,
    loginIsLoading,
    loginIsError,
    loginError,
    loginSuccess,
  };
}
