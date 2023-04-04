import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../features/assignment/assignmentApi";
import { Loader } from "../ui";

export default function AssignmentTableRow({ assignmentMark = {} }) {
  const {
    id,
    title,
    createdAt,
    repo_link,
    status,
    student_name,
    totalMark,
    mark: initialMark,
  } = assignmentMark;
  const [editAssignmentMark, { isLoading }] = useEditAssignmentMarkMutation();

  const [mark, setMark] = useState(totalMark);

  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const setMarkHandler = () => {
    editAssignmentMark({ id, data: mark });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{createdDate}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      <td className="table-td input-mark">
        {status === "published" ? (
          initialMark
        ) : (
          <>
            <input
              max="100"
              value={mark}
              onChange={(e) => setMark(e.target.value)}
            />

            <button disabled={isLoading} onClick={setMarkHandler}>
              {isLoading ? (
                <Loader />
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
