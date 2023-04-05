import { useSelector } from "react-redux";
import { useGetOneAssignmentQuery } from "../features/assignment/assignmentApi";
import { courseIdSelector } from "../features/courses/courseSlice";
import { useGetQuizQuery } from "../features/quiz/quizApi";

export default function useQuizAndAssignment() {
  const { courseId } = useSelector(courseIdSelector);

  const { data: quiz, isLoading, isError } = useGetQuizQuery(courseId);
  const { data: assignment } = useGetOneAssignmentQuery(courseId);
  const isHasQuiz = quiz?.length > 0 ? true : false;
  const isHasAssignment = assignment?.length > 0 ? true : false;
  return { quiz, assignment, isHasQuiz, isHasAssignment, isLoading, isError };
}
