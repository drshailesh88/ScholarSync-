"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function SlidesError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Slides unavailable"
      message="We couldn't load the slides page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
