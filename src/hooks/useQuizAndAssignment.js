import { useSelector } from "react-redux";
import {
  useGetOneAssignmentMarkQuery,
  useGetOneAssignmentQuery,
} from "../features/assignment/assignmentApi";
import { courseIdSelector } from "../features/courses/courseSlice";
import {
  useGetOneQuizMarkQuery,
  useGetQuizQuery,
} from "../features/quiz/quizApi";

export default function useQuizAndAssignment() {
  const { courseId } = useSelector(courseIdSelector);
  const { data: quizMark } = useGetOneQuizMarkQuery(courseId);

  const { data: quizzes, isLoading, isError } = useGetQuizQuery(courseId);
  const { data: assignment } = useGetOneAssignmentQuery(courseId);
  const { data: assignmentMark } = useGetOneAssignmentMarkQuery(courseId);

  const isHasQuiz = quizzes?.quizzes?.length > 0 ? true : false;
  const isHasAssignment = assignment?.assignments?.length > 0 ? true : false;
  const quizzesSubmitted =
    quizMark?.quizMark?.length > 0 && quizMark?.quizMark[0].published
      ? true
      : false;

  return {
    quiz: quizzes?.quizzes,
    quizMark,
    assignment: assignment?.assignments,
    assignmentMark: assignmentMark?.assignmentMark,
    isHasQuiz,
    quizzesSubmitted,
    isHasAssignment,
    isLoading,
    isError,
  };
}
