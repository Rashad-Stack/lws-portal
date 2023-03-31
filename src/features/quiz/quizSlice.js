import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  quizzes: [],
  quizMark: {},
  correctQuiz: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuizzes(state, action) {
      const quizzes = action.payload.map((quiz) => {
        return {
          ...quiz,
          options: quiz.options.map((option) => {
            // added check to trace which option is selected
            return {
              ...option,
              checked: false,
            };
          }),
        };
      });

      state.quizzes = quizzes;
    },
    answeredQuizzes(state, action) {
      const { optionId, questionId, videoId } = action.payload;

      state.quizzes.forEach((quiz) => {
        if (quiz.video_id === videoId && quiz.id === questionId) {
          quiz.options.forEach((option) => {
            if (option.id * 1 === optionId * 1) {
              // toggled checked/unchecked
              option.checked = !option.checked;
            }
          });
        }
      });
    },
    calculateQuizMark(state, action) {
      const { quiz, user } = action.payload || {};
      const { id, name } = user || {};
      quiz.forEach((question, index1) => {
        let correctIndexes = [];
        let checkIndexes = [];
        question?.options.forEach((option, index2) => {
          // Checking corrected options
          if (option?.isCorrect) {
            correctIndexes.push(index2);
          }
          // Checking user selected option
          if (state.quizzes[index1]?.options[index2]?.checked) {
            checkIndexes.push(index2);
          }
        });
        // Check equality of two array
        if (_.isEqual(correctIndexes, checkIndexes)) {
          state.correctQuiz.push(state.quizzes[index1]?.options[checkIndexes]);
        }
      });
      state.quizMark = {
        student_id: id,
        student_name: name,
        video_id: quiz[0]?.video_id,
        video_title: quiz[0]?.video_title,
        totalQuiz: quiz?.length,
        totalWrong: quiz.length - state.correctQuiz.length,
        totalCorrect: state.correctQuiz.length,
        totalMark: 5 * state.correctQuiz.length,
      };
    },
    resetQuizMark(state) {
      state.correctQuiz = [
        //setup empty array
      ];
      state.quizMark = {
        //setup empty object
      };
    },
  },
});

export const { addQuizzes, answeredQuizzes, calculateQuizMark, resetQuizMark } =
  quizSlice.actions;
export const quizzesSelector = (state) => state.quizzes;
export const quizzesMarkSelector = (state) => state.quizzes;
export default quizSlice.reducer;
