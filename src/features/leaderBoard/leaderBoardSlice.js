import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizScore: [],
  assignmentMark: [],
  currentUserScore: {},
  otherUsersScore: [],
};

const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState,
  reducers: {
    getCurrentUserScore(state, action) {
      const { assignmentMark, quizMark, user } = action.payload || {};
      state.quizScore = quizMark;
      state.assignmentMark = assignmentMark;

      state.otherUsersScore = [];
      const studentAssignmentData = {};
      const studentQuizData = {};

      // assembling assignment mark of each student
      state.assignmentMark.forEach((mark) => {
        const studentId = mark.student_id;
        if (!studentAssignmentData[studentId]) {
          studentAssignmentData[studentId] = [];
        }
        studentAssignmentData[studentId].push(mark);
      });

      // assembling quiz mark of each student
      state.quizScore.forEach((mark) => {
        const studentId = mark.student_id;
        if (!studentQuizData[studentId]) {
          studentQuizData[studentId] = [];
        }
        studentQuizData[studentId].push(mark);
      });

      // Calculating total mark of each student
      for (const [studentId, assignmentMarks] of Object.entries(
        studentAssignmentData
      )) {
        // calculating total assignment mark
        const totalAssignmentMark = assignmentMarks.reduce(
          (a, b) => a + b?.mark,
          0
        );

        // calculating total quiz mark
        const quizMarks = studentQuizData[studentId] || [];
        const totalQuizMark = quizMarks.reduce((a, b) => a + b?.totalMark, 0);

        // set calculated marks to the state
        state.otherUsersScore.push({
          name: assignmentMarks[0]?.student_name,
          studentId: assignmentMarks[0]?.student_id,
          totalQuizMark,
          totalAssignmentMark,
          totalMark: totalQuizMark + totalAssignmentMark,
        });
      }

      // Sorting data by highest mark
      state.otherUsersScore = state.otherUsersScore.sort(
        (a, b) => b.totalMark - a.totalMark
      );

      // filter out logged/current user marks
      const loggedUser = state.otherUsersScore.find(
        (cu) => cu.studentId === user.id
      );

      // adding rank
      loggedUser.rank =
        state.otherUsersScore.findIndex((cu) => cu.studentId === user.id) + 1;
      state.currentUserScore = loggedUser;
    },
  },
});

export const { getCurrentUserScore } = leaderBoardSlice.actions;
export const leaderBoardScoreSelector = (state) => state.leaderBoard;
export default leaderBoardSlice.reducer;
