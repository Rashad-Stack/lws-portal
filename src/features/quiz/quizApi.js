import apiSlice from "../api/apiSlice";
import { addQuizzes } from "./quizSlice";

const quizApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      getQuiz: builder.query({
        query(id) {
          return {
            url: `/quizzes/?video_id=${id}`,
            method: "GET",
          };
        },
        async onQueryStarted(id, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            // Dispatching result to quiz slice for modify data
            if (result?.data) {
              dispatch(addQuizzes(result.data));
            }
          } catch (err) {
            // Do nothing
          }
        },
      }),
      postQuizMark: builder.mutation({
        query(data) {
          return {
            url: "/quizMark",
            method: "POST",
            body: data,
          };
        },

        invalidatesTags: ["GetOneQuiz"],
      }),
      getQuizMark: builder.query({
        query() {
          return {
            url: "/quizMark",
            method: "GET",
          };
        },
      }),

      getOneQuizMark: builder.query({
        query({ courseId, studentId }) {
          return {
            url: `/quizMark?student_id=${studentId}&video_id=${courseId}`,
            method: "GET",
          };
        },
        providesTags: ["GetOneQuiz"],
      }),
    };
  },
});

export const {
  useGetQuizMarkQuery,
  useGetQuizQuery,
  usePostQuizMarkMutation,
  useLazyGetQuizMarkQuery,
  useGetOneQuizMarkQuery,
} = quizApi;
