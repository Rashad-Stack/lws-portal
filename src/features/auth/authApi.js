import { setToLocal } from "../../utils";
import apiSlice from "../api/apiSlice";
import { roleCheckout } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      // Student Portal
      login: builder.mutation({
        query(data) {
          return {
            url: "/login",
            method: "POST",
            body: data,
          };
        },
        async onQueryStarted(data, { queryFulfilled, dispatch }) {
          try {
            const { data: result } = await queryFulfilled;

            // Set access token and logged user in to local storage.
            if (result?.user.role !== "admin") {
              setToLocal(result, dispatch);
            } else {
              dispatch(roleCheckout());
            }
          } catch (err) {
            // Do nothing
          }
        },
      }),
      register: builder.mutation({
        query(data) {
          return {
            url: "/users",
            method: "POST",
            body: { ...data, role: "student" },
          };
        },
        async onQueryStarted(data, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            // Set access token and logged user in to local storage.
            setToLocal(result?.data, dispatch);
          } catch (err) {
            // Do nothing
          }
        },
      }),
      // Admin portal
      adminLogin: builder.mutation({
        query(data) {
          return {
            url: "/login",
            method: "POST",
            body: data,
          };
        },
        async onQueryStarted(data, { queryFulfilled, dispatch }) {
          try {
            const { data: result } = await queryFulfilled;

            // Set access token and logged user in to local storage.
            if (result?.user.role !== "student") {
              setToLocal(result, dispatch);
            } else {
              dispatch(roleCheckout());
            }
          } catch (err) {
            // Do nothing
          }
        },
      }),
    };
  },
});

export const { useAdminLoginMutation, useLoginMutation, useRegisterMutation } =
  authApi;
