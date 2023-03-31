import { setToLocal } from "../../utils";
import apiSlice from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
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
            const result = await queryFulfilled;

            // Set access token and logged user in to local storage.
            setToLocal(result?.data, dispatch);
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
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authApi;
