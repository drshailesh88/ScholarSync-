import { ReviewSummaryContainer } from "@/components/sr/summary/review-summary-container";

interface ReviewSummaryPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ReviewSummaryPage({
  params,
}: ReviewSummaryPageProps) {
  const { projectId } = await params;
  return <ReviewSummaryContainer reviewId={projectId} />;
}
