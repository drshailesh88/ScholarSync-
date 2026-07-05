import { ExportScreen } from "@/components/sr/report/export-screen";

interface ExportPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ExportPage({ params }: ExportPageProps) {
  const { projectId } = await params;
  return <ExportScreen reviewId={projectId} />;
}
