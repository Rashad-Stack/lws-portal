import React from "react";
import { Layout } from "../../components/ui";
import {
  FilterButton,
  AssignmentMarkTable,
} from "../../components/AdminAssignment";

export default function AssignmentMark() {
  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {/* Render assignment count */}
            <FilterButton />
            <div className="overflow-x-auto mt-4">
              {/* Render assignment mark table */}
              <AssignmentMarkTable />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
