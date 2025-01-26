import SignInForm from "@/app/(public)/__components__/login/sign-in.form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar | comunica.in",
};
export default function Login() {
  return <SignInForm />;
}
