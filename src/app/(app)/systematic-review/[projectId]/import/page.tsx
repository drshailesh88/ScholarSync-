import { ImportScreen } from "@/components/sr/import/import-screen";

interface ImportPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ImportPage({ params }: ImportPageProps) {
  const { projectId } = await params;
  return <ImportScreen reviewId={projectId} />;
}
