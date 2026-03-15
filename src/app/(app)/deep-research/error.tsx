"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function DeepResearchError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Deep Research unavailable"
      message="We couldn't load the deep research page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
