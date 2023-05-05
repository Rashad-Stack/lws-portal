import React, { useEffect, useState } from "react";
import { ErrorMessage, InputBox, Loader, VideoSelector } from "../ui";
import useAssignmentManage from "../../hooks/useAssignmentManage";
import useAssignmentEditingState from "../../hooks/useAssignmentEditingState";

export default function AddAssignmentModal({
  modalTitle,
  setIsOpen,
  isEditing,
  tableData,
}) {
  const {
    addAssignment,
    editAssignment,
    assignmentIsLoading,
    assignmentIsError,
    assignmentIsSuccess,
  } = useAssignmentManage();
  const { initialTitle, initialTotalMark } =
    useAssignmentEditingState(tableData);
  const [title, setTitle] = useState(initialTitle || "");
  const [video, setVideo] = useState({});
  const [totalMark, setTotalMark] = useState(initialTotalMark || "");
  const resetForm = () => {
    setTitle("");
    setVideo("");
    setTotalMark("");
  };

  const handleSubmitAssignment = (event) => {
    event.preventDefault();

    const data = {
      title,
      totalMark: totalMark * 1,
      videoId: video?._id || tableData?.videoId,
      videoTitle: video?.title,
    };

    isEditing
      ? editAssignment({ id: tableData?._id, data })
      : addAssignment(data);
  };

  useEffect(() => {
    if (assignmentIsSuccess) {
      setIsOpen(false);
      resetForm();
    }
  }, [assignmentIsSuccess]);

  return (
    <form
      onSubmit={handleSubmitAssignment}
      className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="w-4/5 lg:w-4/5 xl:w-1/3 bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        <div className="w-full">
          <InputBox
            required={true}
            title="Enter assignment title"
            value={title}
            setValue={setTitle}
          />
          <VideoSelector
            title="Select assignment Related video"
            initialVideo={isEditing ? tableData : {}}
            setVideo={setVideo}
          />

          <InputBox
            required={true}
            title="Enter assignment mark"
            value={totalMark}
            setValue={setTotalMark}
          />
        </div>
        {!assignmentIsLoading && assignmentIsError && (
          <ErrorMessage
            message={
              isEditing
                ? "Failed to update assignment!"
                : "Failed to add assignment!"
            }
          />
        )}
        <div className="flex justify-evenly items-center">
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-400 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            disabled={false}
          >
            {assignmentIsLoading ? <Loader /> : isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
