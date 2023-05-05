import {
  useAddQuizzesMutation,
  useEditQuizMutation,
} from "../features/quiz/quizApi";

export default function useQuizManage() {
  const [addQuizzes, { isLoading, isError, error: addError, isSuccess }] =
    useAddQuizzesMutation();
  const [
    editQuiz,
    {
      isLoading: quizEditIsLoading,
      isError: quizEditIsError,
      isSuccess: quizEditIsSuccess,
      error: editError,
    },
  ] = useEditQuizMutation();

  const quizIsLoading = isLoading || quizEditIsLoading;
  const quizIsError = isError || quizEditIsError;
  const quizIsSuccess = isSuccess || quizEditIsSuccess;
  const error = addError || editError;

  return {
    addQuizzes,
    editQuiz,
    quizIsLoading,
    quizIsError,
    error,
    quizIsSuccess,
  };
}
