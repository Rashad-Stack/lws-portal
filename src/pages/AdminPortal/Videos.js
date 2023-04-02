import React from "react";
import { AddVideo, VideoTable } from "../../components/AdminVideo";
import { Layout } from "../../components/ui";

export default function Videos() {
  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AddVideo />
            <div className="overflow-x-auto mt-4">
              <VideoTable />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
