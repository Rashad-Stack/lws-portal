import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usePostQuizMarkMutation } from "../../features/quiz/quizApi";
import { quizzesSelector } from "../../features/quiz/quizSlice";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

export default function ActionAlert({ setIsOpen }) {
  const { quizMark } = useSelector(quizzesSelector);
  const [postQuizMark, { isLoading, isError, isSuccess }] =
    usePostQuizMarkMutation();

  const navigate = useNavigate();

  const submitQuiz = () => {
    postQuizMark(quizMark);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-gray-800 px-16 py-14 rounded-md text-center">
        <h1 className="text-xl mb-4 font-bold text-slate-100">
          Do you want to Submit ?
        </h1>

        {!isLoading && isError && (
          <ErrorMessage message="Something went wrong!" />
        )}
        <button
          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
          onClick={() => setIsOpen(false)}
        >
          No
        </button>
        <button
          className="bg-cyan-400 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          onClick={submitQuiz}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Yes"}
        </button>
      </div>
    </div>
  );
}
