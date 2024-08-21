import Link from "next/link";

import { Button } from "~/components/ui/button";

export default function VerifyRequestPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-center">Verify Request</h1>
      <p className="text-center">Check your email for the verification link.</p>
      <Button variant="link" asChild className="mt-4">
        <Link href="/login">Or logiin with a different email</Link>
      </Button>
    </div>
  );
}
