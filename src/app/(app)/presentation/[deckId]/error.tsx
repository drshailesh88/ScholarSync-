"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function PresentationDeckError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Presentation unavailable"
      message="We couldn't load the presentation page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
