import { LoginForm } from "~/components/auth/login-form";

export default async function LoginPage() {
  return (
    <>
      <h1 className="text-center">Login</h1>
      <LoginForm />
    </>
  );
}
