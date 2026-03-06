"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function FeedsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Journal Feed unavailable"
      message="We couldn't load your feeds. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
