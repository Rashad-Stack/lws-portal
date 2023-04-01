import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { useGetOneQuizMarkQuery } from "../../features/quiz/quizApi";
import { useGetOneAssignmentMarkQuery } from "../../features/assignment/assignmentApi";
import { useSelector } from "react-redux";
import { courseIdSelector } from "../../features/courses/courseSlice";
import { authSelector } from "../../features/auth/authSlice";
import { AssignmentModal } from "../Assignment";

export default function CourseActionButtons() {
  const { courseId } = useSelector(courseIdSelector) || {};
  const { user } = useSelector(authSelector);
  const { data: quizMark = [] } = useGetOneQuizMarkQuery({
    courseId,
    studentId: user.id,
  });
  const { data: assignmentMark = [] } = useGetOneAssignmentMarkQuery({
    courseId,
    studentId: user?.id,
  });
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className={`px-3 font-bold py-1 border rounded-full text-sm capitalize ${
          assignmentMark.length > 0 && assignmentMark[0]?.status
            ? "border-gray-600 text-gray-600"
            : "border-cyan text-cyan hover:bg-cyan  hover:text-primary"
        }`}
      >
        {(assignmentMark.length > 0 && assignmentMark[0]?.status) ||
          "Assignment"}
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
