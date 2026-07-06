import { ReportScreen } from "@/components/sr/report/report-screen";

interface ReportPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { projectId } = await params;
  return <ReportScreen reviewId={projectId} />;
}
