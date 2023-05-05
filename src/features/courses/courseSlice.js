import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseId: undefined,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId(state, action) {
      state.courseId = action.payload;
    },
  },
});

export const { setCourseId } = courseSlice.actions;
export const courseIdSelector = (state) => state.courseId;
export default courseSlice.reducer;
