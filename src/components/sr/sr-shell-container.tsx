"use client";

import type { FunnelSummary } from "@/lib/sr/funnel";
import { deriveFunnelSummary } from "@/lib/sr/funnel";
import { SrShell } from "./sr-shell";
import { useSrReview } from "./use-sr-review";

interface SrShellContainerProps {
  reviewId: string;
  projectTitle: string;
  projectMeta: string;
  /** Server-derived counts used until the client store hydrates. */
  initialSummary: FunnelSummary;
  children: React.ReactNode;
}

/** Keeps the rail counts live: store-derived once hydrated. */
export function SrShellContainer({
  reviewId,
  projectTitle,
  projectMeta,
  initialSummary,
  children,
}: SrShellContainerProps) {
  const review = useSrReview(reviewId);
  const summary = review ? deriveFunnelSummary(review) : initialSummary;

  return (
    <SrShell
      reviewId={reviewId}
      projectTitle={projectTitle}
      projectMeta={projectMeta}
      summary={summary}
    >
      {children}
    </SrShell>
  );
}
