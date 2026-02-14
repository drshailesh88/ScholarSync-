"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function NotebookError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Notebook unavailable"
      message="We couldn't load your notebook. Please try again."
      onRetry={reset}
    />
  );
}
