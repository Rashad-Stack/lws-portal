import React from "react";
import { VideoTable } from "../../components/AdminVideo";
import { AddData, Layout } from "../../components/ui";
import AddVideoModal from "../../components/AdminVideo/AddVideoModal";

export default function Videos() {
  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {/* Add video */}
            <AddData
              modalTitle="Add video"
              AddModal={AddVideoModal}
              buttonTitle="Add Video"
            />
            <div className="overflow-x-auto mt-4">
              {/* Render added video list for modify */}
              <VideoTable />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
