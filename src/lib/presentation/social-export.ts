// ============================================================================
// Social Export Utilities — Image capture, PDF generation, thread extraction
// ============================================================================

import type { ContentBlock } from "@/types/presentation";
import type { SocialFormatKey } from "./social-formats";
import { SOCIAL_FORMATS } from "./social-formats";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SlideData {
  title?: string | null;
  subtitle?: string | null;
  contentBlocks: ContentBlock[];
}

// ---------------------------------------------------------------------------
// Image capture — uses html-to-image for client-side DOM-to-PNG
// ---------------------------------------------------------------------------

export async function captureSlideAsImage(
  element: HTMLElement,
  format: SocialFormatKey,
): Promise<Blob> {
  const { toPng } = await import("html-to-image");
  const config = SOCIAL_FORMATS[format];

  const width = "width" in config ? config.width : 1080;
  const height = "height" in config ? config.height : 1080;

  const dataUrl = await toPng(element, {
    width,
    height,
    pixelRatio: 2, // 2x for retina quality
    cacheBust: true,
    // Ignore crossorigin image errors
    filter: (node: HTMLElement) => {
      // Skip nodes that might cause CORS issues
      if (node.tagName === "LINK" && node.getAttribute("rel") === "stylesheet") {
        return false;
      }
      return true;
    },
  });

  const response = await fetch(dataUrl);
  return response.blob();
}

// ---------------------------------------------------------------------------
// LinkedIn Carousel — PDF with square pages, one slide per page
// ---------------------------------------------------------------------------

export async function exportAsLinkedInPdf(images: Blob[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();

  for (const imageBlob of images) {
    const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    // LinkedIn carousel uses 1080x1080 (square) pages
    const page = pdfDoc.addPage([1080, 1080]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
    });
  }

  const pdfBytes = await pdfDoc.save();
  // Cast needed because TypeScript 5.x Uint8Array<ArrayBufferLike> is narrower than BlobPart
  return new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}

// ---------------------------------------------------------------------------
// Twitter/X Thread — Extract text from slides into tweet-sized chunks
// ---------------------------------------------------------------------------

export function generateTwitterThread(slides: SlideData[]): string[] {
  return slides.map((slide, i) => {
    const parts: string[] = [];

    if (slide.title) {
      parts.push(slide.title);
    }

    // Extract text from content blocks
    for (const block of slide.contentBlocks) {
      if (block.type === "text" && block.data.text) {
        parts.push(block.data.text);
      }
      if (block.type === "bullets" && block.data.items) {
        for (const item of block.data.items) {
          parts.push(`\u2022 ${item}`);
        }
      }
      if (block.type === "stat_result") {
        const stat = block.data;
        let line = `${stat.label}: ${stat.value}`;
        if (stat.pValue) line += ` (p=${stat.pValue})`;
        parts.push(line);
      }
      if (block.type === "quote") {
        parts.push(`"${block.data.text}" \u2014 ${block.data.attribution}`);
      }
      if (block.type === "callout") {
        if (block.data.title) parts.push(block.data.title);
        parts.push(block.data.text);
      }
    }

    let tweet = parts.join("\n\n");

    // Add thread indicator for multi-slide threads
    const prefix = slides.length > 1 ? `${i + 1}/${slides.length} ` : "";
    const maxLen = 280 - prefix.length;

    if (tweet.length > maxLen) {
      tweet = tweet.substring(0, maxLen - 3) + "...";
    }

    return (prefix + tweet).trim();
  });
}

// ---------------------------------------------------------------------------
// Download helpers
// ---------------------------------------------------------------------------

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function downloadImagesAsZipOrIndividual(
  images: Blob[],
  prefix: string,
): Promise<void> {
  // Download each image individually since JSZip is not available
  for (let i = 0; i < images.length; i++) {
    const filename = `${prefix}_${String(i + 1).padStart(2, "0")}.png`;
    downloadBlob(images[i], filename);

    // Small delay between downloads to prevent browser blocking
    if (i < images.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

export async function copyThreadToClipboard(tweets: string[]): Promise<boolean> {
  const text = tweets.join("\n\n---\n\n");
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      textarea.remove();
    }
  }
}
