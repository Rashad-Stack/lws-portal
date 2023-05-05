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
            videoId,
            videoTitle,
            option1,
            option1IsCorrect,
            option2,
            option2IsCorrect,
            option3,
            option3IsCorrect,
            option4,
            option4IsCorrect,
          } = data;

          // Create the options array using map
          const options = [
            { id: 1, isCorrect: option1IsCorrect, option: option1 },
            { id: 2, isCorrect: option2IsCorrect, option: option2 },
            { id: 3, isCorrect: option3IsCorrect, option: option3 },
            { id: 4, isCorrect: option4IsCorrect, option: option4 },
          ];

          return {
            url: "/quizzes/",
            method: "POST",
            body: { question, videoId, videoTitle, options },
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
                  draft.quizzes.push(createdQuiz.quiz);
                }
              )
            );
          } catch (err) {
            // do nothing
          }
        },
      }),

      editQuiz: builder.mutation({
        // Destructure id and data from the input object
        query({ id, data = {} }) {
          const {
            question,
            videoId,
            videoTitle,
            option1,
            option1IsCorrect,
            option2,
            option2IsCorrect,
            option3,
            option3IsCorrect,
            option4,
            option4IsCorrect,
          } = data;

          // Create the options array using map
          const options = [
            { id: 1, isCorrect: option1IsCorrect, option: option1 },
            { id: 2, isCorrect: option2IsCorrect, option: option2 },
            { id: 3, isCorrect: option3IsCorrect, option: option3 },
            { id: 4, isCorrect: option4IsCorrect, option: option4 },
          ];

          // Return the URL, method, and body as an object
          return {
            url: `/quizzes/${id}`,
            method: "PATCH",
            body: { question, videoId, videoTitle, options },
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
                  if (updatedQuiz?.quiz?._id) {
                    const quizToUpdate = draft.quizzes.find((q) => q._id == id);
                    Object.assign(quizToUpdate, updatedQuiz?.quiz);
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
        async onQueryStarted(id, { queryFulfilled, dispatch }) {
          const deletePatch = dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const index = draft.quizzes.findIndex((quiz) => quiz._id == id);
              if (index != -1) {
                // Remove the deleted quiz from the array
                draft.quizzes.splice(index, 1);
              }
            })
          );
          try {
            await queryFulfilled;
          } catch (err) {
            // Use optional chaining to undo the delete patch only if it was successfully applied
            deletePatch.undo();
          }
        },
      }),

      // Student portal section
      getQuiz: builder.query({
        query(videoId) {
          return {
            url: `/quizzes/?videoId=${videoId}`,
            method: "GET",
          };
        },
        async onQueryStarted(videoId, { queryFulfilled, dispatch }) {
          try {
            const { data: result } = await queryFulfilled;

            // Dispatching result to quiz slice for modify data
            if (result?.quizzes) {
              dispatch(addQuizzes(result?.quizzes));
            }
          } catch (err) {
            // Do nothing
          }
        },
      }),
      // Get all submitted query
      getQuizMark: builder.query({
        query() {
          return {
            url: "/quizMarks",
            method: "GET",
          };
        },
      }),
      // Quiz submit query
      postQuizMark: builder.mutation({
        query(data) {
          return {
            url: "/quizMarks",
            method: "POST",
            body: data,
          };
        },

        invalidatesTags: ["GetOneQuiz"],
        // Pessimistic Update
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const { data: SubmittedQuiz } = await queryFulfilled;

            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMark",
                undefined,
                (draft) => {
                  draft.push(SubmittedQuiz);
                }
              )
            );
          } catch (err) {
            // do nothing
          }
        },
      }),
      // Get one submitted query
      getOneQuizMark: builder.query({
        query(courseId) {
          return {
            url: `/quizMarks?videoId=${courseId}`,
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
