import { redirect } from "next/navigation";

import { auth } from "~/server/auth";
import { LoginForm } from "~/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return redirect("/app");
  }

  return (
    <>
      <h1 className="text-center">Login</h1>
      <LoginForm />
    </>
  );
}
