"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function SystematicReviewProjectError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Systematic Review unavailable"
      message="We couldn't load the systematic review page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
