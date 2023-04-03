import apiSlice from "../api/apiSlice";
import { addQuizzes } from "./quizSlice";

const quizApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      // Admin portal section
      getQuizzes: builder.query({
        query() {
          return {
            url: "/quizzes/",
            method: "GET",
          };
        },
      }),

      addQuizzes: builder.mutation({
        query(data = {}) {
          const {
            question,
            video_id,
            video_title,
            option1,
            option1IsCorrect,
            option2,
            option2IsCorrect,
            option3,
            option3IsCorrect,
            option4,
            option4IsCorrect,
          } = data;
          return {
            url: "/quizzes/",
            method: "POST",
            body: {
              question,
              video_id,
              video_title,
              options: [
                { id: 1, isCorrect: option1IsCorrect, option: option1 },
                { id: 2, isCorrect: option2IsCorrect, option: option2 },
                { id: 3, isCorrect: option3IsCorrect, option: option3 },
                { id: 4, isCorrect: option4IsCorrect, option: option4 },
              ],
            },
          };
        },

        // Pessimistic Update
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data: createdQuiz } = await queryFulfilled;

            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(createdQuiz);
                }
              )
            );
          } catch (err) {
            // do nothing
          }
        },
      }),

      editQuiz: builder.mutation({
        query({ id, data = {} }) {
          const {
            question,
            video_id,
            video_title,
            option1,
            option1IsCorrect,
            option2,
            option2IsCorrect,
            option3,
            option3IsCorrect,
            option4,
            option4IsCorrect,
          } = data;
          return {
            url: `/quizzes/${id}`,
            method: "PATCH",
            body: {
              question,
              video_id,
              video_title,
              options: [
                { id: 1, isCorrect: option1IsCorrect, option: option1 },
                { id: 2, isCorrect: option2IsCorrect, option: option2 },
                { id: 3, isCorrect: option3IsCorrect, option: option3 },
                { id: 4, isCorrect: option4IsCorrect, option: option4 },
              ],
            },
          };
        },
        async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
          try {
            const { data: updatedQuiz } = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  if (updatedQuiz?.id) {
                    const quizToUpdate = draft.find((q) => q.id == id);
                    quizToUpdate.question = updatedQuiz.updatedQuiz;
                    quizToUpdate.video_id = updatedQuiz.video_id;
                    quizToUpdate.video_title = updatedQuiz.video_title;
                    quizToUpdate.options = updatedQuiz.options;
                  }
                }
              )
            );
          } catch (err) {
            // Do nothing
          }
        },
      }),

      deleteQuiz: builder.mutation({
        query(id) {
          return {
            url: `/quizzes/${id}`,
            method: "DELETE",
          };
        },

        // Optimistic delete
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          const deletePatch = dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const index = draft.findIndex((quiz) => quiz.id == arg);
              if (index != -1) {
                draft.splice(index, 1);
              }
            })
          );
          try {
            await queryFulfilled;
          } catch (err) {
            deletePatch.undo();
          }
        },
      }),

      // Student portal section
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
  useAddQuizzesMutation,
  useGetQuizzesQuery,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
