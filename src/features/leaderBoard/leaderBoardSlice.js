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
      if (state.assignmentMark?.length > 0) {
        state.assignmentMark.forEach((mark) => {
          const studentId = mark.studentId;
          if (!studentAssignmentData[studentId]) {
            studentAssignmentData[studentId] = [];
          }
          studentAssignmentData[studentId].push(mark);
        });
      }

      // assembling quiz mark of each student
      if (state.quizScore?.length > 0) {
        state.quizScore.forEach((mark) => {
          const studentId = mark.studentId;
          if (!studentQuizData[studentId]) {
            studentQuizData[studentId] = [];
          }
          studentQuizData[studentId].push(mark);
        });
      }

      // Calculating total mark of each student
      for (const [studentId, marks] of Object.entries({
        ...studentQuizData,
        ...studentAssignmentData,
      })) {
        // calculating total assignment mark
        const assignmentMark = studentAssignmentData[studentId] || [];
        const totalAssignmentMark = assignmentMark?.reduce(
          (a, b) => a + b?.mark || 0,
          0
        );

        // calculating total quiz mark
        const quizMarks = studentQuizData[studentId] || [];
        const totalQuizMark = quizMarks.reduce(
          (a, b) => a + b?.totalMark || 0,
          0
        );

        // set calculated marks to the state
        state.otherUsersScore.push({
          name: marks[0]?.studentName,
          studentId: marks[0]?.studentId,
          totalQuizMark: totalQuizMark,
          totalAssignmentMark: totalAssignmentMark,
          totalMark: totalQuizMark + totalAssignmentMark,
        });
      }

      // Sort the array in descending order based on totalMark
      state.otherUsersScore.sort((a, b) => b.totalMark - a.totalMark);

      // Rank the students based on their totalMark
      let rank = 1;
      state.otherUsersScore.forEach((student, index) => {
        if (
          index > 0 &&
          student.totalMark < state.otherUsersScore[index - 1].totalMark
        ) {
          rank++;
        }
        student.rank = rank;
      });

      // // filter out logged/current user marks
      state.currentUserScore = state.otherUsersScore.find(
        (cu) => cu.studentId === user.id
      );
    },
  },
});

export const { getCurrentUserScore } = leaderBoardSlice.actions;
export const leaderBoardScoreSelector = (state) => state.leaderBoard;
export default leaderBoardSlice.reducer;
