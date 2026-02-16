"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function LibraryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Library unavailable"
      message="We couldn't load your paper library. Please try again."
      onRetry={reset}
    />
  );
}
