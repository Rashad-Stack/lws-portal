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
    };
  },
});

export const { useGetQuizQuery } = quizApi;
