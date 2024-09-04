import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function VerifyRequestPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Verify Request</CardTitle>
        <CardDescription>
          Check your email for the verification link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="link" asChild className="mt-4">
          <Link href="/login">Or logiin with a different email</Link>
        </Button>
      </CardContent>
    </>
  );
}
