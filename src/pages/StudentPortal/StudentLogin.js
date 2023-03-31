import React, { useEffect } from "react";
import Form from "../../components/StudentLogin/Form";
import { FormHeader, FormLayout } from "../../components/ui";

export default function StudentLogin() {
  useEffect(() => {
    // Setting page title
    document.title = "LWS | Student Login";
  }, []);
  return (
    <FormLayout>
      <FormHeader title="Sign in to Student Account" />
      <Form />
    </FormLayout>
  );
}
