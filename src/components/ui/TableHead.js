import React from "react";

export default function TableHead({ headerTitle, headerDescription }) {
  return (
    <thead>
      <tr>
        <th className="table-th">{headerTitle}</th>
        <th className="table-th w-60 truncate">{headerDescription}</th>
        <th className="table-th">Action</th>
      </tr>
    </thead>
  );
}
