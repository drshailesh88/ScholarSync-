"use client";

import { useEffect } from "react";

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Settings error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            className="text-red-500"
          >
            <path
              fill="currentColor"
              d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-ink mb-2">
          Settings Unavailable
        </h2>
        <p className="text-sm text-ink-muted mb-6 max-w-md">
          We couldn&apos;t load your settings. Your account data is safe --
          please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
