import { LoginForm } from "~/components/auth/login-form";

export default async function LoginPage({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  return (
    <>
      <h1 className="text-center">Login</h1>
      <LoginForm />
      {error ? (
        <p className="text-center text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
}
