import React from "react";
import TableRow from "./TableBody";
import TableHeader from "./TableHeader";

export default function OtherUsersLeaderBoard() {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        {/* Table Header */}

        <TableHeader />
        {/* Table body */}
        <tbody>
          <TableRow
            rank="4"
            name="Saad Hasan"
            quizMark="50"
            assignmentMark="50"
            total="100"
            current={false}
          />
          <TableRow
            rank="4"
            name="Saad Hasan"
            quizMark="50"
            assignmentMark="50"
            total="100"
            current={false}
          />
          <TableRow
            rank="4"
            name="Saad Hasan"
            quizMark="50"
            assignmentMark="50"
            total="100"
            current={false}
          />
        </tbody>
      </table>
    </div>
  );
}
