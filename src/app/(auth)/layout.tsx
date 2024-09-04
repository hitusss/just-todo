import { Card } from "~/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container grid h-screen w-full place-items-center">
      <Card className="mx-auto max-w-sm">{children}</Card>
    </main>
  );
}
