import React, { useEffect } from "react";
import RegistrationForm from "../../components/StudentRegister/RegistrationForm";
import { FormHeader, FormLayout } from "../../components/ui";
export default function StudentRegistration() {
  useEffect(() => {
    document.title = "LWS | Student Registration";
  }, []);

  return (
    <FormLayout>
      <FormHeader title="Create Your New Account" />
      <RegistrationForm />
    </FormLayout>
  );
}
