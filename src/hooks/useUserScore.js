import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAssignmentMarkQuery } from "../features/assignment/assignmentApi";
import { authSelector } from "../features/auth/authSlice";
import { getCurrentUserScore } from "../features/leaderBoard/leaderBoardSlice";
import { useGetQuizMarkQuery } from "../features/quiz/quizApi";

export default function useUserScore() {
  const { user } = useSelector(authSelector);
  const { data: quizMark, isLoading, isError } = useGetQuizMarkQuery();
  const {
    data: assignmentMark,
    isLoading: assignmentIsLoading,
    isError: assignmentIsError,
  } = useGetAssignmentMarkQuery();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isError && !assignmentIsLoading) {
      dispatch(getCurrentUserScore({ user, quizMark, assignmentMark }));
    }
  }, [dispatch, assignmentIsLoading]);

  return {
    loading: isLoading || assignmentIsLoading,
    error: (!isLoading && !assignmentIsLoading && isError) || assignmentIsError,
    isAssignment: assignmentMark?.length > 0,
    isQuiz: quizMark?.length > 0,
    user,
  };
}
