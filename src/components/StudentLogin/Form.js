import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { Button, ErrorMessage } from "../ui";
import { initialValues } from "./formValidationConfig";
import { loginSchema } from "../../utils";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import useRoleLogin from "../../hooks/useRoleLogin";

export default function Form({ admin }) {
  const {
    login,
    adminLogin,
    loginIsLoading,
    loginIsError,
    loginError,
    loginSuccess,
  } = useRoleLogin();
  const { isLoginError } = useSelector(authSelector);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit(values, action) {
        // Decide who is login
        admin ? adminLogin(values) : login(values);

        // after successfully logged in, empty al form input
        if (loginSuccess) {
          action.resetForm();
        }
      },
    });
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            name="email"
            autoComplete="email"
            className="login-input rounded-t-md"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="login-input rounded-b-md"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="text-sm">
          {admin ? (
            <Link
              to="/admin/forget"
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Forgot your password?
            </Link>
          ) : (
            <Link
              to="/student/registration"
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Create New Account
            </Link>
          )}
        </div>
      </div>
      <div>
        {errors?.email && touched?.email && (
          <ErrorMessage message={errors.email} />
        )}
        {errors?.password && touched?.password && (
          <ErrorMessage message={errors.password} />
        )}
        {loginIsError && (
          <ErrorMessage
            message={loginError?.data.message || "Failed to login!"}
          />
        )}
        {isLoginError && (
          <ErrorMessage
            message={
              admin
                ? "Please Provide admin account!"
                : "Please Provide student account!"
            }
          />
        )}

        <Button title="Sign in" loading={loginIsLoading} />
      </div>
    </form>
  );
}
