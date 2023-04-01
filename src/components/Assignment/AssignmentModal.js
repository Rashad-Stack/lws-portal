import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetOneAssignmentQuery,
  usePostAssignmentMarkMutation,
} from "../../features/assignment/assignmentApi";
import { authSelector } from "../../features/auth/authSlice";
import { courseIdSelector } from "../../features/courses/courseSlice";
import { ErrorMessage, Loader } from "../ui";

export default function AssignmentModal({ setIsOpen }) {
  const { courseId } = useSelector(courseIdSelector);
  const { user } = useSelector(authSelector);
  const {
    data: assignment,
    isLoading: assignmentIsLoading,
    isError: assignmentIsError,
  } = useGetOneAssignmentQuery(courseId);
  const [postAssignmentMark, { isLoading, isError, isSuccess }] =
    usePostAssignmentMarkMutation();
  const [repositoryLink, setRepositoryLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const handleSubmitAssignment = (event) => {
    event.preventDefault();

    if (!assignmentIsLoading && !assignmentIsError && assignment[0]?.video_id) {
      postAssignmentMark({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: assignment[0]?.video_id,
        title: assignment[0]?.title,
        totalMark: assignment[0]?.totalMark,
        repo_link: repositoryLink,
        live_link: liveLink,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <form
      action=""
      className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
      onSubmit={handleSubmitAssignment}
    >
      <div className="bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">
          Submit your assignment
        </h1>
        {!isLoading ||
          (!assignmentIsLoading && isError) ||
          (assignmentIsError && (
            <ErrorMessage message="Something went wrong!" />
          ))}
        {!isLoading && !isError && (
          <div className="w-full max-w-xs">
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Github repository link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                required
                value={repositoryLink}
                onChange={(e) => setRepositoryLink(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Your assignment live link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-evenly items-center">
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-400 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            disabled={isLoading || assignmentIsLoading}
          >
            {isLoading || assignmentIsLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
