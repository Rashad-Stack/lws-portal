import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    async prepareHeaders(headers, { getState }) {
      const token = getState()?.auth?.jwt;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["GetOneQuiz", "GetOneAssignment"],
  endpoints() {
    return {};
  },
});

export default apiSlice;
