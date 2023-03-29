import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetVideoQuery } from "../../features/courses/coursesApi";
import { courseIdSelector } from "../../features/courses/courseSlice";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";

export default function Player() {
  const { courseId } = useSelector(courseIdSelector);
  const { data: video, isLoading, isError } = useGetVideoQuery(courseId);
  const { title, description, url, createdAt } = video || {};

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {isLoading && <Loader />}
      {!isLoading && isError && (
        <ErrorMessage message="Something went wrong!" />
      )}

      {!isLoading && !isError && !video?.id && (
        <ErrorMessage message="No video found!" />
      )}
      {!isLoading && !isError && video?.id && (
        <>
          <iframe
            width="100%"
            className="aspect-video"
            src={url}
            title={title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
            <div className="flex gap-4">
              <Link
                to="/assignment"
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </Link>
              <Link
                to="/quiz"
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
