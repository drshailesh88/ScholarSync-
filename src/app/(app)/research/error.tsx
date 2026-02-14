"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function ResearchError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Research unavailable"
      message="We couldn't load the research page. Please try again."
      onRetry={reset}
    />
  );
}
