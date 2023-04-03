import React from "react";

export default function OptionIdentifier({ option, setOption }) {
  return (
    <div className="flex flex-col pb-5">
      <select
        value={option}
        onChange={(e) => setOption(Boolean(e.target.value))}
        className="text-black"
      >
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
    </div>
  );
}
