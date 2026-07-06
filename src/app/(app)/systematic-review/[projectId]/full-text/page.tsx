import { FullTextScreen } from "@/components/sr/fulltext/fulltext-screen";

interface FullTextPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function FullTextPage({ params }: FullTextPageProps) {
  const { projectId } = await params;
  return <FullTextScreen reviewId={projectId} />;
}
