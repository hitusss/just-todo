import Link from "next/link";

import { auth } from "~/server/auth";
import { signOut } from "~/actions/auth";
import { Button } from "~/components/ui/button";

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
            <div className="flex gap-4">
              <form action={signOut}>
                <Button variant="destructive">Logout</Button>
              </form>
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
