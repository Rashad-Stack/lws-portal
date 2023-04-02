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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
