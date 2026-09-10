import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-1/2 max-w-190 flex-col items-center justify-center gap-4 px-5 py-24">
      <h1 className="font-display text-2xl font-semibold">404 — not found</h1>
      <Link
        href="/"
        className="font-mono text-sm text-muted-foreground hover:text-accent"
      >
        $ cd ~
      </Link>
    </main>
  );
}
