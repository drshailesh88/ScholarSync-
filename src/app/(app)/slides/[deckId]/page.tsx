"use client";

import { useParams } from "next/navigation";
import { SlidesWorkspace } from "@/components/slides/slides-workspace";
import { CollaborationProvider } from "@/components/presentation/collaboration-provider";

export default function SlidesEditorPage() {
  const params = useParams();
  const deckId = Number(params.deckId);

  if (!deckId || isNaN(deckId)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-red-500">Invalid deck ID</p>
      </div>
    );
  }

  return (
    <CollaborationProvider
      deckId={deckId}
      initialSlides={[]}
      initialDeckMeta={{
        title: "",
        theme: "modern",
        themeConfig: {},
        slideOrder: [],
      }}
    >
      <SlidesWorkspace deckId={deckId} />
    </CollaborationProvider>
  );
}
