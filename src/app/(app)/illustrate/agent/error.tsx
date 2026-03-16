"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function IllustrateAgentError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Agent unavailable"
      message="We couldn't load the agent page. Please try again."
      error={error}
      onRetry={reset}
    />
  );
}
