"use client";

import { useRouter } from "next/navigation";

export default function LibraryItemError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <h2 className="text-lg font-medium text-[var(--ink)]">
          Source not found
        </h2>
        <p className="text-sm text-[var(--ink-muted)]">
          The requested library source could not be loaded.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/library")}
            className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm text-white hover:bg-[var(--brand-hover)] transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>
    </div>
  );
}
