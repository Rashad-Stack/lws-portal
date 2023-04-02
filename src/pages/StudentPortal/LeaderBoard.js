import React, { useEffect } from "react";
import {
  CurrentUserTable,
  OtherUsersLeaderBoard,
} from "../../components/LeaderBoard";
import { ErrorMessage, Layout, Loader } from "../../components/ui";
import useUserScore from "../../hooks/useUserScore";

export default function LeaderBoard() {
  const { loading, error, isAssignment, isQuiz } = useUserScore();

  useEffect(() => {
    // Setting page title
    document.title = "LWS | Leader board";
  }, []);

  // Decide what to render
  let content = null;
  if (loading) {
    content = <Loader />;
  } else if (!loading && error) {
    content = <ErrorMessage message="Something went wrong" />;
  } else if ((!loading && !error && isAssignment) || isQuiz) {
    content = (
      <>
        {/* Render current user position in leader board */}
        <CurrentUserTable />
        {/* Render other users position in leader board */}
        <OtherUsersLeaderBoard />
      </>
    );
  } else {
    console.log("else ok");
  }

  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </Layout>
  );
}
