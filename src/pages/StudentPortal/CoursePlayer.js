import React from "react";
import { Player, VideoList } from "../../components/CoursePlayer";
import { Layout } from "../../components/ui";

export default function CoursePlayer() {
  return (
    <Layout>
      <Player />
      <VideoList />
    </Layout>
  );
}
