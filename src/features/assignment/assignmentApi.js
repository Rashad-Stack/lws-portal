import apiSlice from "../api/apiSlice";
const assignmentApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      getAssignmentMark: builder.query({
        query() {
          return {
            url: "/assignmentMark",
            method: "GET",
          };
        },
      }),

      getOneAssignmentMark: builder.query({
        query({ courseId, studentId }) {
          return {
            url: `/assignmentMark?assignment_id=${courseId}&student_id=${studentId}`,
            method: "GET",
          };
        },
        providesTags: ["GetOneAssignment"],
      }),

      postAssignmentMark: builder.mutation({
        query(data) {
          return {
            url: "/assignmentMark",
            method: "POST",
            body: {
              ...data,
              mark: 0,
              status: "pending",
              createdAt: new Date(Date.now()).toISOString(),
            },
          };
        },
        invalidatesTags: ["GetOneAssignment"],
      }),

      getOneAssignment: builder.query({
        query(videoId) {
          return {
            url: `/assignments?video_id=${videoId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetOneAssignmentMarkQuery,
  usePostAssignmentMarkMutation,
  useGetOneAssignmentQuery,
} = assignmentApi;
