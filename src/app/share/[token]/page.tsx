import { getDeckByShareToken } from "@/lib/actions/share";
import { notFound } from "next/navigation";
import { SharedPresentationViewer } from "@/components/presentation/shared-presentation-viewer";
import { SharePasswordGate } from "@/components/presentation/share-password-gate";
import type { Metadata } from "next";

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { token } = await params;
  const deck = await getDeckByShareToken(token);
  if (!deck) {
    return { title: "Not Found - ScholarSync" };
  }
  return {
    title: `${deck.title} - ScholarSync`,
    description: deck.description || "Shared presentation",
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  const deck = await getDeckByShareToken(token);

  if (!deck) {
    notFound();
  }

  if (deck.hasPassword) {
    return <SharePasswordGate token={token} deck={deck} />;
  }

  return (
    <SharedPresentationViewer
      title={deck.title}
      slides={deck.slides}
      theme={deck.theme}
      themeConfig={deck.themeConfig}
    />
  );
}
