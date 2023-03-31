import React from "react";

export default function Option({ option = {}, handleOptionClick }) {
  const { checked, option: quizOption } = option;
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleOptionClick} />
      {quizOption}
    </label>
  );
}
