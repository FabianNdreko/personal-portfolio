import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-1/2 max-w-190 flex-col items-center justify-center gap-4 px-5 py-24">
      <h1 className="font-display text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        That page does not exist, or the link is out of date.
      </p>
      <Link href="/" className="text-sm text-accent hover:underline">
        Back home
      </Link>
    </main>
  );
}
