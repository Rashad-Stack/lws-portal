import React from "react";
import { ErrorMessage, Loader, TableHead, TableRow } from "../ui";
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../../features/quiz/quizApi";
import AddQuizModal from "./AddQuizModal";

export default function QuizTable() {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const [deleteQuiz, { isLoading: deleteLoading }] = useDeleteQuizMutation();

  // Decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if (!isLoading && !isError && quizzes.length === 0) {
    content = <ErrorMessage message="No Quiz added!" />;
  } else if (!isLoading && !isError && quizzes.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <TableHead headerTitle="Question" headerDescription="Video" />

        <tbody className="divide-y divide-slate-600/50">
          {quizzes.map((quiz) => (
            <TableRow
              key={quiz.id}
              modalTitle="Update video"
              tableData={quiz}
              id={quiz?.id}
              title={quiz?.question}
              description={quiz?.video_title}
              ActionModal={AddQuizModal}
              actionFunc={deleteQuiz}
              loading={deleteLoading}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
}
