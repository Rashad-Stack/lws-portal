import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { useGetOneAssignmentMarkQuery } from "../../features/assignment/assignmentApi";
import { useGetVideoQuery } from "../../features/courses/coursesApi";
import { courseIdSelector } from "../../features/courses/courseSlice";
import { useGetOneQuizMarkQuery } from "../../features/quiz/quizApi";
import { authSelector } from "../../features/auth/authSlice";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import { AssignmentModal } from "../Assignment";

export default function Player() {
  const { courseId } = useSelector(courseIdSelector);
  const { user } = useSelector(authSelector);
  const { data: video, isLoading, isError } = useGetVideoQuery(courseId);
  const { data: quizMark } = useGetOneQuizMarkQuery({
    courseId,
    studentId: user.id,
  });
  const { data: assignmentMark } = useGetOneAssignmentMarkQuery({
    courseId,
    studentId: user?.id,
  });
  const [modalIsOpen, setIsOpen] = useState(false);

  const { title, description, url, createdAt } = video || {};
  const navigate = useNavigate();

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {/* Handling Loading and error state */}
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <ErrorMessage message="Something went wrong!" />
      )}

      {!isLoading && !isError && !video?.id && (
        <ErrorMessage message="No video found!" />
      )}
      {!isLoading && !isError && video?.id && (
        // Rendering data throw component
        <>
          <iframe
            width="100%"
            className="aspect-video"
            src={url}
            title={title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className={`px-3 font-bold py-1 border rounded-full text-sm ${
                  assignmentMark?.length
                    ? "border-gray-600 text-gray-600"
                    : "border-cyan text-cyan hover:bg-cyan  hover:text-primary"
                }`}
              >
                {assignmentMark?.length ? "Assignment Submitted" : "Assignment"}
              </button>
              <button
                onClick={() => navigate(quizMark?.length ? "/" : "/quiz")}
                className={`px-3 font-bold py-1 border rounded-full text-sm ${
                  quizMark?.length
                    ? "border-gray-600 text-gray-600"
                    : "border-cyan text-cyan hover:bg-cyan  hover:text-primary"
                }`}
              >
                {quizMark?.length ? "Quiz Submitted" : "Attend to Quiz"}
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {description}
            </p>
          </div>
        </>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
        <AssignmentModal setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
}

// styling for modal
const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(000, 000, 000, 0.75)",
  },
};
