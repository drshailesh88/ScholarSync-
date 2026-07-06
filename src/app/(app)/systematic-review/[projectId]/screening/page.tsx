import { ScreeningScreen } from "@/components/sr/screening/screening-screen";

interface ScreeningPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ScreeningPage({ params }: ScreeningPageProps) {
  const { projectId } = await params;
  return <ScreeningScreen reviewId={projectId} />;
}
