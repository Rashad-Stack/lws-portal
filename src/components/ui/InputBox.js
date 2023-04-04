import React from "react";

export default function InputBox({
  title,
  value,
  setValue,
  required,
  type = "text",
}) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-200 text-sm font-bold mb-2">
        {title}
      </label>
      <input
        className="w-full border text-sm rounded-md block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
