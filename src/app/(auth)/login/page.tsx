import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LoginForm } from "~/components/auth/login-form";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;

  const { error } = searchParams;

  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login with your email or use one of the providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        {error ? (
          <p className="text-center text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </CardContent>
    </>
  );
}
