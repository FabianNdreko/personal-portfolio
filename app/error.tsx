"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-2xl font-medium">Something went wrong</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {error.message}
      </p>
      <button
        type="button"
        onClick={reset}
        className="text-sm text-muted-foreground underline hover:text-foreground"
      >
        Try again
      </button>
    </main>
  );
}
