import React, { useEffect, useState } from "react";
import tc from "thousands-counter";

import useVideoManage from "../../hooks/useVideoManage";
import { ErrorMessage, InputBox, Loader } from "../ui";
import { convertToNumber } from "../../utils";

export default function AddVideoModal({
  modalTitle,
  setIsOpen,
  isEditing,
  tableData = {},
}) {
  const {
    addVideo,
    editVideo,
    videoManageIsLoading,
    videoManageIsError,
    videoManageIsSuccess,
  } = useVideoManage();
  const {
    _id,
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    views: initialViews,
    duration: initialDuration,
  } = tableData;

  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [url, setUrl] = useState(initialUrl || "");
  const [views, setViews] = useState(
    initialViews ? convertToNumber(initialViews) : ""
  );
  const [duration, setDuration] = useState(initialDuration || "");

  //   Resetting form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setViews("");
    setDuration("");
  };

  const handleSubmitVideo = (event) => {
    event.preventDefault();
    isEditing
      ? editVideo({
          id: _id,
          data: {
            title,
            description,
            url,
            views: tc(views, { digits: 2 }),
            duration,
          },
        })
      : addVideo({
          title,
          description,
          url,
          views: tc(views, { digits: 2 }),
          duration,
        });
  };

  useEffect(() => {
    if (videoManageIsSuccess) {
      setIsOpen(false);

      //   Resetting form
      resetForm();
    }
  }, [videoManageIsSuccess]);

  return (
    <form
      className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
      onSubmit={handleSubmitVideo}
    >
      <div className="w-4/5 lg:w-4/5 xl:w-1/3 bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>

        <div className="w-full">
          <InputBox
            required={true}
            title="Enter title"
            value={title}
            setValue={setTitle}
          />

          <InputBox
            required={true}
            title="Enter description"
            value={description}
            setValue={setDescription}
          />

          <InputBox
            required={true}
            title="Enter video url"
            value={url}
            setValue={setUrl}
          />

          <InputBox
            required={true}
            title="Enter views"
            value={views}
            setValue={setViews}
          />

          <InputBox
            required={true}
            title="Enter duration"
            value={duration}
            setValue={setDuration}
          />
        </div>
        {!videoManageIsLoading && videoManageIsError && (
          <ErrorMessage
            message={
              isEditing ? "Failed to update video!" : "Failed to add video!"
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
            disabled={videoManageIsLoading}
          >
            {videoManageIsLoading ? (
              <Loader />
            ) : isEditing ? (
              "Update"
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
