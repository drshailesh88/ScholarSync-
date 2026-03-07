import { getNotebookByShareToken } from "@/lib/actions/notebook-share";
import { notFound } from "next/navigation";
import { SharedNotebookViewer } from "@/components/notebook/SharedNotebookViewer";
import { NotebookPasswordGate } from "@/components/notebook/NotebookPasswordGate";
import type { Metadata } from "next";

interface ShareNotebookPageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({
  params,
}: ShareNotebookPageProps): Promise<Metadata> {
  const { token } = await params;
  const notebook = await getNotebookByShareToken(token);
  if (!notebook) {
    return { title: "Not Found - ScholarSync" };
  }
  return {
    title: `${notebook.title} - ScholarSync`,
    description: `Shared notebook by ${notebook.ownerName}`,
  };
}

export default async function ShareNotebookPage({
  params,
}: ShareNotebookPageProps) {
  const { token } = await params;
  const notebook = await getNotebookByShareToken(token);

  if (!notebook) {
    notFound();
  }

  if (notebook.hasPassword) {
    return <NotebookPasswordGate token={token} notebook={notebook} />;
  }

  return (
    <SharedNotebookViewer
      title={notebook.title}
      ownerName={notebook.ownerName}
      mode={notebook.mode}
      createdAt={notebook.createdAt}
      messages={notebook.messages}
    />
  );
}
