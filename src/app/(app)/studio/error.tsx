"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function StudioError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Studio unavailable"
      message="We couldn't load the editor. Your work is safe — please try again."
      onRetry={reset}
    />
  );
}
