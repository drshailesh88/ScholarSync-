"use client";

import { BUILT_STAGES } from "@/lib/sr/enabled-stages";
import { CURRENT_REVIEWER_ID } from "@/lib/sr/fixtures";
import { deriveFunnelSummary, deriveYourWork } from "@/lib/sr/funnel";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";
import { ReviewSummary } from "./review-summary";

/** Store-driven Review Summary so counts stay live across stages. */
export function ReviewSummaryContainer({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  if (!review) return <SrStageSkeleton />;

  const you = review.reviewers.find((r) => r.id === CURRENT_REVIEWER_ID);

  return (
    <ReviewSummary
      reviewId={reviewId}
      reviewTitle={review.title}
      summary={deriveFunnelSummary(review)}
      yourWork={deriveYourWork(review, CURRENT_REVIEWER_ID)}
      youFirstName={you?.name.split(" ")[0] ?? "Reviewer"}
      enabledStages={BUILT_STAGES}
    />
  );
}
