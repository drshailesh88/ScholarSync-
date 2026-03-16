"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function LatexNewError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="New unavailable"
      message="We couldn't load the new page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
