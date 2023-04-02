import React from "react";

export default function TableHead() {
  return (
    <thead>
      <tr>
        <th className="table-th">Video Title</th>
        <th className="table-th w-60 truncate">Description</th>
        <th className="table-th">Action</th>
      </tr>
    </thead>
  );
}
