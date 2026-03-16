"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function IllustrateError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Illustrate unavailable"
      message="We couldn't load the illustrate page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
