import apiSlice from "../api/apiSlice";

const coursesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      getCourses: builder.query({
        query() {
          return {
            url: "/videos",
            method: "GET",
          };
        },
      }),

      getVideo: builder.query({
        query(id) {
          return {
            url: `/videos/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetCoursesQuery, useGetVideoQuery } = coursesApi;
