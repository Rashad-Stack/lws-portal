import {
  useAddQuizzesMutation,
  useEditQuizMutation,
} from "../features/quiz/quizApi";

export default function useQuizManage() {
  const [addQuizzes, { isLoading, isError, isSuccess }] =
    useAddQuizzesMutation();
  const [
    editQuiz,
    {
      isLoading: quizEditIsLoading,
      isError: quizEditIsError,
      isSuccess: quizEditIsSuccess,
    },
  ] = useEditQuizMutation();

  const quizIsLoading = isLoading || quizEditIsLoading;
  const quizIsError = isError || quizEditIsError;
  const quizIsSuccess = isSuccess || quizEditIsSuccess;

  return { addQuizzes, editQuiz, quizIsLoading, quizIsError, quizIsSuccess };
}
