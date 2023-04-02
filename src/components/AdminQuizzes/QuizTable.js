import React from "react";
import { TableHead } from "../ui";

export default function QuizTable() {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <TableHead headerTitle="Question" headerDescription="Video" />
      <tbody className="divide-y divide-slate-600/50"></tbody>
    </table>
  );
}
