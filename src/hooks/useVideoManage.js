import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../features/courses/coursesApi";

export default function useVideoManage() {
  const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();
  const [
    editVideo,
    {
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditVideoMutation();

  const videoManageIsLoading = isLoading || editIsLoading;
  const videoManageIsError = isError || editIsError;
  const videoManageIsSuccess = isSuccess || editIsSuccess;

  return {
    addVideo,
    editVideo,
    videoManageIsLoading,
    videoManageIsError,
    videoManageIsSuccess,
  };
}
