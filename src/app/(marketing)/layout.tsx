import Link from "next/link";

import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col justify-between">
      <header className="flex h-16 items-center justify-between px-4">
        <span className="font-bold">LOGO</span>
        <nav>
          {session ? (
            <Button asChild>
              <Link href="/app">Go to app</Link>
            </Button>
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
