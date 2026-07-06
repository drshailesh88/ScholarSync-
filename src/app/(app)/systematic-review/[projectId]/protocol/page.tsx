import { ProtocolScreen } from "@/components/sr/protocol/protocol-screen";

interface ProtocolPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProtocolPage({ params }: ProtocolPageProps) {
  const { projectId } = await params;
  return <ProtocolScreen reviewId={projectId} />;
}
