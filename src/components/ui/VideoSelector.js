import React, { useState } from "react";
import { useGetCoursesQuery } from "../../features/courses/coursesApi";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function VideoSelector({ title, setVideo, initialVideo = {} }) {
  const { data: videos, isLoading, isError } = useGetCoursesQuery();
  const [selectedVideo, setSelectVideo] = useState();

  const handleSetVideo = (e) => {
    // Restore string object from selected values
    setVideo(JSON.parse(e.target.value));
    setSelectVideo(JSON.parse(e.target.value));
  };

  //   Destructuring Initial values for editing
  const { initialVideoId } = initialVideo;

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
          value={selectedVideo?.title}
          onChange={handleSetVideo}
        >
          <option hidden>Select a video</option>
          {videos.map((video) => {
            let initialVideo = undefined;
            // Checking initial values for editing
            if (video.id === initialVideoId) {
              initialVideo = video;
            }

            return (
              <option
                key={video?.id}
                // Set object as string into value
                value={JSON.stringify(initialVideo || video)}
              >
                {initialVideo?.title || video?.title}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
