import { PrismaScreen } from "@/components/sr/prisma/prisma-screen";

interface PrismaPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function PrismaPage({ params }: PrismaPageProps) {
  const { projectId } = await params;
  return <PrismaScreen reviewId={projectId} />;
}
