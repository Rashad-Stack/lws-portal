import React from "react";
import Layout from "../../components/ui/Layout";
import { AddData } from "../../components/ui";
import { AddQuizModal, QuizTable } from "../../components/AdminQuizzes";

export default function Quizzes() {
  return (
    <Layout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {/* Add quiz */}
            <AddData modalTitle="Add Quiz" AddModal={AddQuizModal} />
            <div className="overflow-x-auto mt-4">
              {/* Render added quiz list for modify */}
              <QuizTable />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
