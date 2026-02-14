"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function SettingsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Settings unavailable"
      message="We couldn't load your settings. Please try again."
      onRetry={reset}
    />
  );
}
