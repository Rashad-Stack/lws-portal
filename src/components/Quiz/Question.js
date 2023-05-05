import React from "react";
import { useDispatch } from "react-redux";

import { answeredQuizzes, resetQuizMark } from "../../features/quiz/quizSlice";
import { ErrorMessage } from "../ui";
import Option from "./Option";

export default function Question({ quiz = {} }) {
  const { question, options = [] } = quiz;

  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    // dispatch for resetting quiz mark for new selection
    dispatch(resetQuizMark());

    // dispatch for setting selected option
    dispatch(
      answeredQuizzes({
        optionId: option?._id,
        questionId: quiz?._id,
        videoId: quiz?.videoId,
      })
    );
  };

  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <div className="quizOptions">
        {/* Options */}
        {options?.length > 0 ? (
          options.map((option) => (
            <Option
              key={option._id}
              handleOptionClick={() => handleOptionClick(option)}
              option={option}
            />
          ))
        ) : (
          <ErrorMessage message="No question found!" />
        )}
      </div>
    </div>
  );
}
