import React, { useEffect, useState } from "react";
import useVideoManage from "../../hooks/useVideoManage";

import { ErrorMessage, InputBox, Loader } from "../ui";

export default function AddVideoModal({
  modalTitle,
  setIsOpen,
  isEditing,
  video = {},
}) {
  const {
    addVideo,
    editVideo,
    videoManageIsLoading,
    videoManageIsError,
    videoManageIsSuccess,
  } = useVideoManage();
  const {
    id,
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    views: initialViews,
    duration: initialDuration,
  } = video;

  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [url, setUrl] = useState(initialUrl || "");
  const [views, setViews] = useState(initialViews || "");
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
          id,
          data: { title, description, url, views: views + "k", duration },
        })
      : addVideo({ title, description, url, views: views + "k", duration });
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
      className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
      onSubmit={handleSubmitVideo}
    >
      <div className="bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        {!videoManageIsLoading && videoManageIsError && (
          <ErrorMessage message="Something went wrong!" />
        )}
        {!videoManageIsLoading && !videoManageIsError && (
          <div className="w-full max-w-xs">
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
