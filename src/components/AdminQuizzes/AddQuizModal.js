import React from "react";
import { InputBox, Loader } from "../ui";
import { useState } from "react";

export default function AddQuizModal({
  modalTitle,
  setIsOpen,
  isEditing,
  tableData = {},
}) {
  const [question, setQuestion] = useState("");
  const [video_id, setVideo_id] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOPtion3] = useState("");
  const [option4, setOPtion4] = useState("");

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    console.log({
      question,
      video_id,
      video_title,
      options: [
        { id: 1, isCorrect: false, option: option1 },
        { id: 2, isCorrect: false, option: option2 },
        { id: 3, isCorrect: true, option: option3 },
        { id: 4, isCorrect: false, option: option4 },
      ],
    });
  };

  return (
    <form
      onSubmit={handleSubmitQuiz}
      className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        <div className="w-full max-w-xs">
          <InputBox
            required={true}
            title="Enter question"
            value={question}
            setValue={setQuestion}
          />
          <InputBox
            required={true}
            title="Enter video id"
            value={video_id}
            setValue={setVideo_id}
          />
          <InputBox
            required={true}
            title="Enter video title"
            value={video_title}
            setValue={setVideo_title}
          />
          <InputBox
            required={true}
            title="Enter option 1"
            value={option1}
            setValue={setOption1}
          />
          <InputBox
            required={true}
            title="Enter option 2"
            value={option2}
            setValue={setOption2}
          />
          <InputBox
            required={true}
            title="Enter option 3"
            value={option3}
            setValue={setOPtion3}
          />
          <InputBox
            required={true}
            title="Enter option 4"
            value={option4}
            setValue={setOPtion4}
          />
        </div>

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
            {false ? <Loader /> : isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
