"use client";

import type { SlideState } from "@/stores/slides-store";
import type { ThemeConfig } from "@/types/presentation";

// ---------------------------------------------------------------------------
// exportDeck — reusable export helper for gamma mode
// ---------------------------------------------------------------------------

export type ExportFormat = "pptx" | "pdf";

interface ExportDeckOptions {
  format: ExportFormat;
  slides: SlideState[];
  title: string;
  themeConfig?: ThemeConfig;
}

/**
 * Export the current deck to PPTX or PDF.
 *
 * - PPTX uses `/api/export/pptx` (PptxGenJS on the server)
 * - PDF  uses `/api/export/presentation-pdf` (pdf-lib on the server)
 *
 * Returns `true` on success, throws on failure.
 */
export async function exportDeck({
  format,
  slides,
  title,
  themeConfig,
}: ExportDeckOptions): Promise<boolean> {
  // Map SlideState → the shape the API routes expect
  const apiSlides = slides.map((s) => ({
    title: s.title,
    subtitle: s.subtitle,
    layout: s.layout,
    contentBlocks: s.contentBlocks,
    speakerNotes: s.speakerNotes,
  }));

  const endpoint =
    format === "pptx" ? "/api/export/pptx" : "/api/export/presentation-pdf";

  const body: Record<string, unknown> = {
    title: title || "Untitled Deck",
    slides: apiSlides,
  };

  // Only the PPTX route accepts themeConfig
  if (format === "pptx" && themeConfig) {
    body.themeConfig = themeConfig;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `Export failed (${res.status})`;
    try {
      const json = await res.json();
      if (json?.error) message = json.error;
    } catch {
      // ignore parse failure
    }
    throw new Error(message);
  }

  // Download the file
  const blob = await res.blob();
  const ext = format === "pptx" ? "pptx" : "pdf";
  const safeTitle = (title || "deck").replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `${safeTitle}.${ext}`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();

  // Cleanup
  requestAnimationFrame(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  });

  return true;
}
