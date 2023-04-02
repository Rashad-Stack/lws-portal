import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";

import { leaderBoardScoreSelector } from "../../features/leaderBoard/leaderBoardSlice";
import TableRow from "./TableBody";
import TableHeader from "./TableHeader";

function CurrentUserTable() {
  const { user } = useSelector(authSelector);
  const { currentUserScore } = useSelector(leaderBoardScoreSelector);
  const { name, rank, totalQuizMark, totalAssignmentMark, totalMark } =
    currentUserScore;

  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        {/* Table Header */}
        <TableHeader />

        {/* Table body */}
        <tbody>
          <TableRow
            rank={rank}
            name={name}
            quizMark={totalQuizMark}
            assignmentMark={totalAssignmentMark}
            total={totalMark}
            current={currentUserScore?.studentId === user?.id}
          />
        </tbody>
      </table>
    </div>
  );
}
export default React.memo(CurrentUserTable);
