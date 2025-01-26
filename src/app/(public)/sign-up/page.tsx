import { Metadata } from "next";
import React from "react";
import RegisterForm from "../__components__/sign-up/register-form";

export const metadata: Metadata = {
  title: "Registre-se",
  description: "Registre-se para ter acesso a todos os recursos do site.",
};

const SignUp = () => {
  return <RegisterForm />;
};

export default SignUp;
