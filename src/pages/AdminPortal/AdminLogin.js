import React from "react";
import Form from "../../components/StudentLogin/Form";
import { FormHeader, FormLayout } from "../../components/ui";

export default function AdminLogin() {
  return (
    <FormLayout>
      <FormHeader title="Sign in to Admin Account" />
      <Form admin={true} />
    </FormLayout>
  );
}
