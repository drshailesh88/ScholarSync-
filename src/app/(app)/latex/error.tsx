"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function LatexError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Latex unavailable"
      message="We couldn't load the latex page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
