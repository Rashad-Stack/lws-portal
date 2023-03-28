import { useFormik } from "formik";
import React from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { registerSchema } from "../../utils";

import { Button, ErrorMessage } from "../ui";
import { initialValues } from "./formValidator";

export default function RegistrationForm() {
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit(values, action) {
        register(values);
        if (isSuccess) {
          action.resetForm();
        }
      },
    });

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            className="login-input rounded-t-md"
            placeholder="Student Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            className="login-input "
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
            className="login-input"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <label htmlFor="confirm_password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm_password"
            type="password"
            autoComplete="confirm-password"
            className="login-input rounded-b-md"
            placeholder="Confirm Password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div>
        {errors?.name && touched?.name && (
          <ErrorMessage message={errors.name} />
        )}
        {errors?.email && touched?.email && (
          <ErrorMessage message={errors.email} />
        )}
        {errors?.password && touched?.password && (
          <ErrorMessage message={errors.password} />
        )}
        {errors?.confirm_password && touched?.confirm_password && (
          <ErrorMessage message={errors.confirm_password} />
        )}
        {isError && <ErrorMessage message={error?.data} />}

        <Button title="Create Account" loading={isLoading} />
      </div>
    </form>
  );
}
