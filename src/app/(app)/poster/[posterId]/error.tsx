"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function PosterDetailError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Poster unavailable"
      message="We couldn't load the poster page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
