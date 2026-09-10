import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-2xl font-medium">Page not found</h1>
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        Back home
      </Link>
    </main>
  );
}
