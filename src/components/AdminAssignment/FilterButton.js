import React from "react";
import { useGetAssignmentMarkQuery } from "../../features/assignment/assignmentApi";
import { ErrorMessage, Loader } from "../ui";

export default function FilterButton() {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  return (
    <ul className="assignment-status">
      <li>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            Total <span>{assignmentMarks?.length || 0}</span>
          </>
        )}
      </li>
      <li>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            Pending{" "}
            <span>
              {assignmentMarks?.filter((a) => a.status === "pending")?.length ||
                0}
            </span>
          </>
        )}
      </li>
      <li>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            Mark Sent{" "}
            <span>
              {assignmentMarks?.filter((a) => a.status === "published")?.length}
            </span>
          </>
        )}
        {/* Render error */}
        {!isLoading && isError && <ErrorMessage message="Error" />}
      </li>
    </ul>
  );
}
