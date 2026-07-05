import { SrShell } from "@/components/sr/sr-shell";
import { getReviewById } from "@/lib/sr/fixtures";
import { deriveFunnelSummary } from "@/lib/sr/funnel";

interface SrReviewLayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function SrReviewLayout({
  children,
  params,
}: SrReviewLayoutProps) {
  const { projectId } = await params;
  const review = getReviewById(projectId);
  const summary = deriveFunnelSummary(review);

  return (
    <SrShell
      reviewId={projectId}
      projectTitle={review.shortTitle}
      projectMeta={`Cochrane-style review · ${review.reviewers.length} reviewers`}
      summary={summary}
    >
      {children}
    </SrShell>
  );
}
