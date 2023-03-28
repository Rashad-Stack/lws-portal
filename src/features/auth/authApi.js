import { setToLocal } from "../../utils";
import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

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
            setToLocal(result?.data, dispatch);
          } catch (err) {}
        },
      }),
      register: builder.mutation({
        query(data) {
          return {
            url: "/users",
            method: "POST",
            body: data,
          };
        },
        async onQueryStarted(data, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            setToLocal(result?.data, dispatch);
            // if (result?.data) {
            //   const { accessToken, user } = result?.data;
            //   localStorage.setItem(
            //     "auth",
            //     JSON.stringify({
            //       jwt: accessToken,
            //       user,
            //     })
            //   );
            //   dispatch(
            //     userLoggedIn({
            //       jwt: accessToken,
            //       user,
            //     })
            //   );
            // }
          } catch (err) {}
        },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authApi;
