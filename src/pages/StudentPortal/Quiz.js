import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import Question from "../../components/Quiz/Question";
import { ActionAlert, ErrorMessage, Layout, Loader } from "../../components/ui";
import { authSelector } from "../../features/auth/authSlice";
import { courseIdSelector } from "../../features/courses/courseSlice";
import { useGetQuizQuery } from "../../features/quiz/quizApi";
import {
  calculateQuizMark,
  quizzesSelector,
} from "../../features/quiz/quizSlice";

export default function Quiz() {
  const { courseId } = useSelector(courseIdSelector);
  const { user } = useSelector(authSelector);
  const { data: quiz, isLoading, isError } = useGetQuizQuery(courseId);
  const { quizzes } = useSelector(quizzesSelector);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    // Dispatching raw quiz data for getting Quiz result
    dispatch(calculateQuizMark({ quiz, user }));
    setIsOpen(true);
  };

  useEffect(() => {
    // Setting page title
    document.title = "LWS | Quizzes";
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* Handling error and Loading state */}
        {isLoading && <Loader />}
        {!isLoading && isError && (
          <ErrorMessage message="Something went wrong!" />
        )}

        {!isLoading && !isError && !quiz[0]?.video_id && (
          <ErrorMessage message="No quiz found!" />
        )}

        {/* Rendering data */}
        {!isLoading && !isError && quiz[0]?.video_id && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold">{quiz[0]?.video_title}</h1>
              <p className="text-sm text-slate-200">
                Each question contains 5 Mark
              </p>
            </div>

            <form onSubmit={handleQuizSubmit}>
              <div className="space-y-8">
                {/* Rendering quiz with component */}
                {quizzes.map((quiz) => (
                  <Question key={quiz.id} quiz={quiz} />
                ))}
              </div>
              <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
        <ActionAlert setIsOpen={setIsOpen} />
      </Modal>
    </Layout>
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
