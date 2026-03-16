"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function IllustrateCreditsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Credits unavailable"
      message="We couldn't load the credits page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
