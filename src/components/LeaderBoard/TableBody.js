import React from "react";

export default function TableRow({
  rank,
  name,
  quizMark,
  assignmentMark,
  total,
  current,
}) {
  return (
    <tr
      className={
        current ? "border-2 border-cyan" : "border-t border-slate-600/50"
      }
    >
      <td
        className={`table-td text-center ${
          current ? "font-bold" : "font-normal"
        }`}
      >
        {rank}
      </td>
      <td
        className={`table-td text-center ${
          current ? "font-bold" : "font-normal"
        }`}
      >
        {name}
      </td>
      <td
        className={`table-td text-center ${
          current ? "font-bold" : "font-normal"
        }`}
      >
        {quizMark}
      </td>
      <td
        className={`table-td text-center ${
          current ? "font-bold" : "font-normal"
        }`}
      >
        {assignmentMark}
      </td>
      <td
        className={`table-td text-center ${
          current ? "font-bold" : "font-normal"
        }`}
      >
        {total}
      </td>
    </tr>
  );
}
