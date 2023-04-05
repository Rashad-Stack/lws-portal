import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import { leaderBoardScoreSelector } from "../../features/leaderBoard/leaderBoardSlice";
import TableRow from "./TableBody";
import TableHeader from "./TableHeader";

export default function OtherUsersLeaderBoard() {
  const { user } = useSelector(authSelector);
  const { otherUsersScore } = useSelector(leaderBoardScoreSelector);

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        {/* Table Header */}

        <TableHeader />
        {/* Table body */}
        <tbody>
          {otherUsersScore.length > 0 &&
            otherUsersScore
              .slice(0, 20)
              .map((score) => (
                <TableRow
                  key={score?.studentId}
                  rank={score?.rank}
                  name={score?.name}
                  quizMark={score?.totalQuizMark}
                  assignmentMark={score?.totalAssignmentMark}
                  total={score?.totalMark}
                  current={score?.studentId === user?.id}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}
