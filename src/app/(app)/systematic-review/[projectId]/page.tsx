import { ReviewSummary } from "@/components/sr/summary/review-summary";
import { BUILT_STAGES } from "@/lib/sr/enabled-stages";
import { CURRENT_REVIEWER_ID, getReviewById } from "@/lib/sr/fixtures";
import { deriveFunnelSummary, deriveYourWork } from "@/lib/sr/funnel";

interface ReviewSummaryPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ReviewSummaryPage({
  params,
}: ReviewSummaryPageProps) {
  const { projectId } = await params;
  const review = getReviewById(projectId);
  const summary = deriveFunnelSummary(review);
  const yourWork = deriveYourWork(review, CURRENT_REVIEWER_ID);
  const you = review.reviewers.find((r) => r.id === CURRENT_REVIEWER_ID);

  return (
    <ReviewSummary
      reviewId={projectId}
      reviewTitle={review.title}
      summary={summary}
      yourWork={yourWork}
      youFirstName={you?.name.split(" ")[0] ?? "Reviewer"}
      enabledStages={BUILT_STAGES}
    />
  );
}
