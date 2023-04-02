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

  return (
    <form
      action=""
      className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        <div className="w-full max-w-xs">
          <InputBox
            required={true}
            title="Enter title"
            value={question}
            setValue={setQuestion}
          />
        </div>
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
    </form>
  );
}
