"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function AnalysisError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Analysis unavailable"
      message="We couldn't load the writing analysis tool. Please try again."
      onRetry={reset}
    />
  );
}
