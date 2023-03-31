import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../features/auth/authSlice";
import TableRow from "./TableBody";
import TableHeader from "./TableHeader";

export default function CurrentUserTable() {
  const { user } = useSelector(authSelector);
  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        {/* Table Header */}
        <TableHeader />

        {/* Table body */}
        <tbody>
          <TableRow
            rank="4"
            name={user?.name}
            quizMark="50"
            assignmentMark="50"
            total="100"
            current={true}
          />
        </tbody>
      </table>
    </div>
  );
}
