import React from "react";

import {
  useDeleteVideoMutation,
  useGetCoursesQuery,
} from "../../features/courses/coursesApi";
import { ErrorMessage, Loader, TableHead, TableRow } from "../ui";
import AddVideoModal from "./AddVideoModal";

export default function VideoTable() {
  const { data: videos, isLoading, isError } = useGetCoursesQuery();
  const [deleteVideo, { isLoading: deleteLoading }] = useDeleteVideoMutation();

  // Decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if (!isLoading && !isError && videos?.videos?.length === 0) {
    content = <ErrorMessage message="No video added!" />;
  } else if (!isLoading && !isError && videos?.videos?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <TableHead headerTitle="Video Title" headerDescription="Description" />

        <tbody className="divide-y divide-slate-600/50">
          {videos?.videos?.map((video) => (
            <TableRow
              key={video._id}
              modalTitle="Update video"
              tableData={video}
              id={video?._id}
              title={video?.title}
              description={video?.description}
              ActionModal={AddVideoModal}
              actionFunc={deleteVideo}
              loading={deleteLoading}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
}
