import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://lws.herokuapp.com/api/v1",
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
