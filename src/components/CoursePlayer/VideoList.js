import React, { useEffect } from "react";
import { useGetCoursesQuery } from "../../features/courses/coursesApi";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import ListItem from "./ListItem";

export default function VideoList() {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  useEffect(() => {
    document.title = "LWS | Courses";
  }, []);

  // Decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage message="Something went wrong!" />;
  } else if (!isLoading && !isError && courses.length === 0) {
    content = <ErrorMessage message="No Courser Found!" />;
  } else if (!isLoading && !isError && courses.length > 0) {
    content = courses.map((course) => (
      <ListItem key={course.id} course={course} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}
