import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
} from "../features/assignment/assignmentApi";

export default function useAssignmentManage() {
  const [addAssignment, { isLoading, isError, isSuccess }] =
    useAddAssignmentMutation();
  const [
    editAssignment,
    {
      isLoading: assignmentEditIsLoading,
      isError: assignmentEditIsError,
      isSuccess: assignmentEditIsSuccess,
    },
  ] = useEditAssignmentMutation();
  const assignmentIsLoading = isLoading || assignmentEditIsLoading;
  const assignmentIsError = isError || assignmentEditIsError;
  const assignmentIsSuccess = isSuccess || assignmentEditIsSuccess;

  return {
    addAssignment,
    editAssignment,
    assignmentIsLoading,
    assignmentIsError,
    assignmentIsSuccess,
  };
}
