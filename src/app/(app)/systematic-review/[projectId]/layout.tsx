import { SrShellContainer } from "@/components/sr/sr-shell-container";
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

  return (
    <SrShellContainer
      reviewId={projectId}
      projectTitle={review.shortTitle}
      projectMeta={`Cochrane-style review · ${review.reviewers.length} reviewers`}
      initialSummary={deriveFunnelSummary(review)}
    >
      {children}
    </SrShellContainer>
  );
}
