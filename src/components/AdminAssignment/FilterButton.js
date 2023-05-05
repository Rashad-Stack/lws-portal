import React from "react";
import { useGetAssignmentMarkQuery } from "../../features/assignment/assignmentApi";
import { ErrorMessage, Loader } from "../ui";

export default function FilterButton() {
  const {
    data: assignmentMark,
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
            Total <span>{assignmentMark?.assignmentMark?.length || 0}</span>
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
              {assignmentMark?.assignmentMark?.filter(
                (a) => a.status === "pending"
              )?.length || 0}
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
              {
                assignmentMark?.assignmentMark?.filter(
                  (a) => a.status === "published"
                )?.length
              }
            </span>
          </>
        )}
        {/* Render error */}
        {!isLoading && isError && <ErrorMessage message="Error" />}
      </li>
    </ul>
  );
}
