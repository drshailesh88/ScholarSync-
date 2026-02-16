"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function ProjectsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Projects unavailable"
      message="We couldn't load your projects. Please try again."
      onRetry={reset}
    />
  );
}
