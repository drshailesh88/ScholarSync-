"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function PresentationError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Presentations unavailable"
      message="We couldn't load the presentation builder. Please try again."
      onRetry={reset}
    />
  );
}
