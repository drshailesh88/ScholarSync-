import { ConflictsScreen } from "@/components/sr/conflicts/conflicts-screen";

interface ConflictsPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ConflictsPage({ params }: ConflictsPageProps) {
  const { projectId } = await params;
  return <ConflictsScreen reviewId={projectId} />;
}
