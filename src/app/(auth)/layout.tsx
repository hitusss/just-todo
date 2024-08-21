export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container grid min-h-screen w-full place-items-center">
      <div className="w-screen max-w-sm space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow">
        {children}
      </div>
    </main>
  );
}
