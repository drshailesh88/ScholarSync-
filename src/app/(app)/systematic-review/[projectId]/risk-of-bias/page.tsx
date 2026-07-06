import { RobScreen } from "@/components/sr/rob/rob-screen";

interface RobPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function RobPage({ params }: RobPageProps) {
  const { projectId } = await params;
  return <RobScreen reviewId={projectId} />;
}
