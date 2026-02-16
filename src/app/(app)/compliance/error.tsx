"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function ComplianceError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Integrity check unavailable"
      message="We couldn't load the compliance tools. Please try again."
      onRetry={reset}
    />
  );
}
