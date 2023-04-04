import React from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

import { useGetVideoQuery } from "../../features/courses/coursesApi";
import { courseIdSelector } from "../../features/courses/courseSlice";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import CourseActionButtons from "./CourseActionButtons";

export default function Player() {
  const { courseId } = useSelector(courseIdSelector);
  const { data: video, isLoading, isError } = useGetVideoQuery(courseId);

  const { title, description, url, createdAt } = video || {};

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {/* Handling Loading and error state */}
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <ErrorMessage message="Something went wrong!" />
      )}

      {!isLoading && !isError && !video?.id && (
        <ErrorMessage message="No video found!" />
      )}
      {!isLoading && !isError && video?.id && (
        // Rendering data throw component
        <>
          <div>
            <ReactPlayer url={url} width="100%" height={480} controls={true} />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <CourseActionButtons />
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
