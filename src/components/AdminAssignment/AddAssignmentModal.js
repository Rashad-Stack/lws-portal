import React, { useEffect, useState } from "react";
import { ErrorMessage, InputBox, Loader } from "../ui";
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
  const { initialTitle, initialVideoId, initialVideoTitle, initialTotalMark } =
    useAssignmentEditingState(tableData);
  const [title, setTitle] = useState(initialTitle || "");
  const [video_id, setVideo_id] = useState(initialVideoId || "");
  const [video_title, setVideo_title] = useState(initialVideoTitle || "");
  const [totalMark, setTotalMark] = useState(initialTotalMark || "");

  const resetForm = () => {
    setTitle("");
    setVideo_id("");
    setVideo_title("");
    setTotalMark("");
  };

  const handleSubmitAssignment = (event) => {
    event.preventDefault();
    const data = { title, video_id, video_title, totalMark };
    isEditing
      ? editAssignment({ id: tableData?.id, data })
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
            title="Enter Title"
            value={title}
            setValue={setTitle}
          />
          <InputBox
            required={true}
            title="Enter video id"
            value={video_id}
            setValue={setVideo_id}
          />
          <InputBox
            required={true}
            title="Enter video title"
            value={video_title}
            setValue={setVideo_title}
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
