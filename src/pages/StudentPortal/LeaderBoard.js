import React, { useEffect } from "react";
import {
  CurrentUserTable,
  OtherUsersLeaderBoard,
} from "../../components/LeaderBoard";
import { Layout } from "../../components/ui";

export default function LeaderBoard() {
  useEffect(() => {
    // Setting page title
    document.title = "LWS | Leader board";
  }, []);

  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          {/* Render current user position in leader board */}
          <CurrentUserTable />
          {/* Render other users position in leader board */}
          <OtherUsersLeaderBoard />
        </div>
      </section>
    </Layout>
  );
}
