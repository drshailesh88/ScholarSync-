import { ExtractionScreen } from "@/components/sr/extraction/extraction-screen";

interface ExtractionPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ExtractionPage({ params }: ExtractionPageProps) {
  const { projectId } = await params;
  return <ExtractionScreen reviewId={projectId} />;
}
