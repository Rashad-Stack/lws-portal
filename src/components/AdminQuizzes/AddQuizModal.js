import React, { useEffect, useState } from "react";
import { ErrorMessage, InputBox, Loader, VideoSelector } from "../ui";

import OptionIdentifier from "./OptionIdentifier";
import useQuizManage from "../../hooks/useQuizManage";
import useQuizEditState from "../../hooks/useQuizEditState";

export default function AddQuizModal({
  modalTitle,
  setIsOpen,
  isEditing,
  tableData = {},
}) {
  const {
    initialQuestion,
    initialOption1,
    initialOption1IsCorrect,
    initialOption2,
    initialOption2IsCorrect,
    initialOption3,
    initialOption3IsCorrect,
    initialOption4,
    initialOption4IsCorrect,
  } = useQuizEditState(tableData);

  const [question, setQuestion] = useState(initialQuestion || "");
  const [video, setVideo] = useState({});
  const [option1, setOption1] = useState(initialOption1 || "");
  const [option2, setOption2] = useState(initialOption2 || "");
  const [option3, setOPtion3] = useState(initialOption3 || "");
  const [option4, setOPtion4] = useState(initialOption4 || "");
  const [option1IsCorrect, setOPtion1IsCorrect] = useState(
    initialOption1IsCorrect || false
  );
  const [option2IsCorrect, setOPtion2IsCorrect] = useState(
    initialOption2IsCorrect || false
  );
  const [option3IsCorrect, setOPtion3IsCorrect] = useState(
    initialOption3IsCorrect || false
  );
  const [option4IsCorrect, setOPtion4IsCorrect] = useState(
    initialOption4IsCorrect || false
  );
  const { addQuizzes, editQuiz, quizIsLoading, quizIsError, quizIsSuccess } =
    useQuizManage();

  const resetForm = () => {
    setQuestion("");
    setVideo({});
    setOption1("");
    setOption2("");
    setOPtion3("");
    setOPtion4("");
    setOPtion1IsCorrect(false);
    setOPtion2IsCorrect(false);
    setOPtion3IsCorrect(false);
    setOPtion4IsCorrect(false);
  };

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    const data = {
      question,
      video_id: video?.id || tableData?.video_id,
      video_title: video?.title,
      option1,
      option1IsCorrect,
      option2,
      option2IsCorrect,
      option3,
      option3IsCorrect,
      option4,
      option4IsCorrect,
    };

    isEditing ? editQuiz({ id: tableData?.id, data }) : addQuizzes(data);
  };

  useEffect(() => {
    if (quizIsSuccess) {
      setIsOpen(false);
      resetForm();
    }
  }, [quizIsSuccess]);

  return (
    <form
      onSubmit={handleSubmitQuiz}
      className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="w-4/5 lg:w-4/5 xl:w-1/3 bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        <div className="w-full">
          <InputBox
            required={true}
            title="Enter question"
            value={question}
            setValue={setQuestion}
          />
          <VideoSelector
            title="Select assignment Related video"
            initialVideo={isEditing ? tableData : {}}
            setVideo={setVideo}
          />
          <div className="flex gap-5">
            <div>
              <InputBox
                required={true}
                title="Enter option 1"
                value={option1}
                setValue={setOption1}
              />
              <OptionIdentifier
                option={option1IsCorrect}
                setOption={setOPtion1IsCorrect}
              />
            </div>
            <div>
              <InputBox
                required={true}
                title="Enter option 2"
                value={option2}
                setValue={setOption2}
              />
              <OptionIdentifier
                option={option2IsCorrect}
                setOption={setOPtion2IsCorrect}
              />
            </div>
            <div>
              <InputBox
                required={true}
                title="Enter option 3"
                value={option3}
                setValue={setOPtion3}
              />{" "}
              <OptionIdentifier
                option={option3IsCorrect}
                setOption={setOPtion3IsCorrect}
              />
            </div>

            <div>
              <InputBox
                required={true}
                title="Enter option 4"
                value={option4}
                setValue={setOPtion4}
              />{" "}
              <OptionIdentifier
                option={option4IsCorrect}
                setOption={setOPtion4IsCorrect}
              />
            </div>
          </div>
        </div>
        {!quizIsLoading && quizIsError && (
          <ErrorMessage
            message={
              isEditing ? "Failed to update quiz!" : "Failed to add quiz!"
            }
          />
        )}
        <div className="flex justify-evenly items-center">
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-400 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            disabled={false}
          >
            {quizIsLoading ? <Loader /> : isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
