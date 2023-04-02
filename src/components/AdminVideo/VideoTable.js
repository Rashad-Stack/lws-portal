import React from "react";

import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useGetCoursesQuery } from "../../features/courses/coursesApi";
import { ErrorMessage, Loader } from "../ui";

export default function VideoTable() {
  const { data: videos, isLoading, isError } = useGetCoursesQuery();

  // Decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <ErrorMessage message="No videos found!" />;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <TableHead />
        <tbody className="divide-y divide-slate-600/50">
          {videos.map((video) => (
            <TableRow key={video.id} video={video} />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
}
