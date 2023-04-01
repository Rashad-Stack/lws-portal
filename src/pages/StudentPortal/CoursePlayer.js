import React, { useEffect } from "react";
import { Player, VideoList } from "../../components/CoursePlayer";
import { Layout } from "../../components/ui";

export default function CoursePlayer() {
  useEffect(() => {
    // Setting page title
    document.title = "LWS | Courses";
  }, []);

  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {/* Video player component */}
            <Player />
            {/* Video list component */}
            <VideoList />
          </div>
        </div>
      </section>
    </Layout>
  );
}
