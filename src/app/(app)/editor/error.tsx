"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function EditorError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorDisplay
      title="Editor unavailable"
      message="We couldn't load the editor. Your work is safe — please try again."
      error={error}
      onRetry={reset}
    />
  );
}
