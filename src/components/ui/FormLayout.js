import React from "react";

export default function FormLayout({ children }) {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">{children}</div>
    </section>
  );
}
