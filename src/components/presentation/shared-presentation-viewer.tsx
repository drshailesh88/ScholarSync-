"use client";

import { ResponsiveDeckViewer } from "./responsive-deck-viewer";

interface SlideData {
  id: number;
  sortOrder: number;
  layout: string | null;
  title: string | null;
  subtitle: string | null;
  contentBlocks: unknown;
  speakerNotes: string | null;
}

interface SharedPresentationViewerProps {
  title: string;
  slides: SlideData[];
  theme: string | null;
  themeConfig: unknown;
}

export function SharedPresentationViewer(props: SharedPresentationViewerProps) {
  return <ResponsiveDeckViewer {...props} />;
}
