import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetOneQuizMarkQuery } from "../../features/quiz/quizApi";
import { useGetOneAssignmentMarkQuery } from "../../features/assignment/assignmentApi";
import { useSelector } from "react-redux";
import { courseIdSelector } from "../../features/courses/courseSlice";
import { authSelector } from "../../features/auth/authSlice";
import { AssignmentModal } from "../Assignment";
import { AppModal } from "../ui";
import useQuizAndAssignment from "../../hooks/useQuizAndAssignment";

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
  const { isHasQuiz, isHasAssignment } = useQuizAndAssignment();

  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const isShownQuizBtn = quizMark?.length || !isHasQuiz;
  const isShownAssignmentBtn =
    (assignmentMark.length > 0 && assignmentMark[0]?.status) ||
    !isHasAssignment;
  console.log();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className={`px-3 font-bold py-1 border rounded-full text-sm capitalize ${
          isShownAssignmentBtn
            ? "border-gray-600 text-gray-600"
            : "border-cyan text-cyan hover:bg-cyan  hover:text-primary"
        }`}
        disabled={assignmentMark.length > 0 && assignmentMark[0]?.status}
      >
        {isHasAssignment
          ? (assignmentMark.length > 0 && assignmentMark[0]?.status) ||
            "Assignment"
          : "No Assignment"}
      </button>
      <button
        onClick={() => navigate(quizMark?.length ? "/" : "/quiz")}
        className={`px-3 font-bold py-1 border rounded-full text-sm ${
          isShownQuizBtn
            ? "border-gray-600 text-gray-600"
            : "border-cyan text-cyan hover:bg-cyan  hover:text-primary"
        }`}
        disabled={isShownQuizBtn}
      >
        {quizMark?.length
          ? "Quiz Submitted"
          : isHasQuiz
          ? "Attend to Quiz"
          : "No Quiz to attend"}
      </button>
      <AppModal modalIsOpen={modalIsOpen}>
        <AssignmentModal setIsOpen={setIsOpen} />
      </AppModal>
    </div>
  );
}
