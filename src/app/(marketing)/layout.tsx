import Link from "next/link";

import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { LogoutForm } from "~/components/auth/logout-form";
import { Logo } from "~/components/logo";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="flex h-16 items-center justify-between px-4">
        <Logo className="h-6 w-auto" />
        <nav>
          {session ? (
            <div className="flex gap-4">
              <LogoutForm />
              <Button asChild>
                <Link href="/app">Go to app</Link>
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer></footer>
    </div>
  );
}
