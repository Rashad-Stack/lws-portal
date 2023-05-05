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
    currentUserScore || {};

  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      {rank ? (
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
      ) : (
        <h1 className="font-bold text-red-400 text-center text-lg py-8">
          You didn&apos;t participant any quiz or assignment!
        </h1>
      )}
    </div>
  );
}
export default CurrentUserTable;
