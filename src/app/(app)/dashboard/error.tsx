"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Dashboard unavailable"
      message="We couldn't load your dashboard. This might be a temporary issue."
      error={error}
      onRetry={reset}
    />
  );
}
