import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-center">Something went wrong</h1>
      <pre className="text-center">
        <span className="font-bold">Error code:</span> {searchParams.error}
      </pre>
      <Button variant="link" asChild className="mt-4">
        <Link href="/" className="mt-4">
          Go Home
        </Link>
      </Button>
    </div>
  );
}
