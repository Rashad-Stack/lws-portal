import React from "react";
import { useGetCoursesQuery } from "../../features/courses/coursesApi";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function VideoSelector({ title, setVideo, initialVideo = {} }) {
  const { data: videos, isLoading, isError } = useGetCoursesQuery();

  const handleSetVideo = (e) => {
    // Restore string object from selected values
    setVideo(JSON.parse(e.target.value));
  };

  //   Destructuring Initial values for editing
  const { initialVideoTitle } = initialVideo;

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-200 text-sm font-bold mb-2">
        {title}
      </label>
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <ErrorMessage message="Something went wrong!" />
      )}
      {!isLoading && !isError && videos?.length === 0 && (
        <ErrorMessage message="No related video found" />
      )}
      {!isLoading && !isError && videos?.length > 0 && (
        <select
          className="w-full border text-sm rounded-md block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          onChange={handleSetVideo}
        >
          <option hidden>{initialVideoTitle || "Select a video"}</option>
          {videos.map((video) => (
            <option
              key={video?.id}
              // Set object as string into value
              value={JSON.stringify(video)}
            >
              {video?.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
