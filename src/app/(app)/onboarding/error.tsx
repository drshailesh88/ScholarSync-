"use client";

import { ErrorDisplay } from "@/components/ui/error-display";

export default function OnboardingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDisplay
      title="Onboarding unavailable"
      message="We couldn't load the onboarding flow. Please try again."
      onRetry={reset}
    />
  );
}
