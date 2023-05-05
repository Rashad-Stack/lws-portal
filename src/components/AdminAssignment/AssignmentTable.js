import React from "react";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentQuery,
} from "../../features/assignment/assignmentApi";
import { ErrorMessage, Loader, TableHead, TableRow } from "../ui";
import AddAssignmentModal from "./AddAssignmentModal";

export default function AssignmentTable() {
  const { data: assignments, isLoading, isError } = useGetAssignmentQuery();
  const [deleteAssignment, { isLoading: deleteLoading }] =
    useDeleteAssignmentMutation();

  // Decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if (!isLoading && !isError && assignments?.assignments?.length === 0) {
    content = <ErrorMessage message="No Quizzes found!" />;
  } else if (!isLoading && !isError && assignments?.assignments?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <TableHead headerTitle="Title" headerDescription="Video" />
        <tbody className="divide-y divide-slate-600/50">
          {assignments?.assignments?.map((assignment) => (
            <TableRow
              key={assignment?._id}
              modalTitle="Update assignment"
              tableData={assignment}
              id={assignment?._id}
              title={assignment?.title}
              description={assignment?.videoTitle}
              ActionModal={AddAssignmentModal}
              actionFunc={deleteAssignment}
              loading={deleteLoading}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
}
