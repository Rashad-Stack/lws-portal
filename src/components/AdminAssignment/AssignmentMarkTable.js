import React from "react";
import AssignmentMarkTableHead from "./AssignmentMarkTableHead";
import { ErrorMessage, Loader } from "../ui";
import AssignmentTableRow from "./AssignmentTableRow";
import { useGetAssignmentMarkQuery } from "../../features/assignment/assignmentApi";

export default function AssignmentMarkTable() {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  // Decide what to render
  const assignmentMarkIsLoading = isLoading;
  const assignmentMarkIsError = isError;
  let content = null;
  if (assignmentMarkIsLoading) {
    content = <Loader />;
  } else if (!assignmentMarkIsLoading && assignmentMarkIsError) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if (
    !assignmentMarkIsLoading &&
    !assignmentMarkIsError &&
    assignmentMarks.length === 0
  ) {
    content = <ErrorMessage message="No Quizzes found!" />;
  } else if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <AssignmentMarkTableHead />
        <tbody className="divide-y divide-slate-600/50">
          {assignmentMarks.map((assignmentMark) => (
            <AssignmentTableRow
              key={assignmentMark.id}
              assignmentMark={assignmentMark}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
}
