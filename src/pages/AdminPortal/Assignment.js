import React from "react";
import { AddData, Layout } from "../../components/ui";
import {
  AddAssignmentModal,
  AssignmentTable,
} from "../../components/AdminAssignment";

export default function Assignment() {
  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AddData
              modalTitle="Add Assignment"
              AddModal={AddAssignmentModal}
            />
            <div className="overflow-x-auto mt-4">
              <AssignmentTable />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
