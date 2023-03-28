import React from "react";

import BrandImage from "../../assets/image/learningportal.svg";

export default function FormHeader({ title }) {
  return (
    <div>
      <img className="h-12 mx-auto" src={BrandImage} />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
        {title}
      </h2>
    </div>
  );
}
