"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function IllustrateEditorError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Editor unavailable"
      message="We couldn't load the editor page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
