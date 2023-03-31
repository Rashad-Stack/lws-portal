import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import courseSlice from "../features/courses/courseSlice";
import quizSlice from "../features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    courseId: courseSlice,
    quizzes: quizSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware(getDefaultMiddleWares) {
    return getDefaultMiddleWares().concat(apiSlice.middleware);
  },
});
