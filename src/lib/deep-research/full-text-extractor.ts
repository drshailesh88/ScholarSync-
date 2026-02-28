/**
 * Full-Text Extraction for Deep Research.
 *
 * Downloads open-access PDFs and extracts text, focusing on
 * Results and Discussion sections which carry the most analytical value.
 * Falls back gracefully to abstract-only when PDF extraction fails.
 */

import type { EnhancedPaper, ResearchProgressCallback } from "./types";
import { validateExternalUrl } from "@/lib/security/url-validator";

// ── Section extraction ────────────────────────────────────────────────

/**
 * Attempt to extract the Results and Discussion sections from full text.
 * Falls back to the full text if section headers aren't found.
 */
function extractKeySecions(fullText: string): string {
  const normalized = fullText.replace(/\r\n/g, "\n");

  // Regex patterns for section boundaries
  const resultsStart =
    /\n\s*(Results?|RESULTS?)\s*\n/i;
  const discussionStart =
    /\n\s*(Discussion|DISCUSSION)\s*\n/i;
  const conclusionStart =
    /\n\s*(Conclusion|CONCLUSION|Conclusions|CONCLUSIONS)\s*\n/i;
  const referencesStart =
    /\n\s*(References|REFERENCES|Bibliography|BIBLIOGRAPHY)\s*\n/i;
  const acknowledgementsStart =
    /\n\s*(Acknowledgments?|ACKNOWLEDGMENTS?|Funding|FUNDING)\s*\n/i;

  // Find the end boundary (references, acknowledgements, or end of text)
  const endPatterns = [referencesStart, acknowledgementsStart];
  let endIdx = normalized.length;
  for (const pattern of endPatterns) {
    const match = normalized.match(pattern);
    if (match && match.index !== undefined && match.index < endIdx) {
      endIdx = match.index;
    }
  }

  // Try to find Results section
  const resultsMatch = normalized.match(resultsStart);
  if (resultsMatch && resultsMatch.index !== undefined) {
    const startIdx = resultsMatch.index;
    return normalized.slice(startIdx, endIdx).trim();
  }

  // Try Discussion section as fallback
  const discussionMatch = normalized.match(discussionStart);
  if (discussionMatch && discussionMatch.index !== undefined) {
    const startIdx = discussionMatch.index;
    const conclusionMatch = normalized.match(conclusionStart);
    const sectionEnd =
      conclusionMatch && conclusionMatch.index !== undefined
        ? Math.min(conclusionMatch.index + conclusionMatch[0].length + 2000, endIdx)
        : endIdx;
    return normalized.slice(startIdx, sectionEnd).trim();
  }

  // No section headers found — return everything before references
  return normalized.slice(0, endIdx).trim();
}

// ── PDF download + text extraction ────────────────────────────────────

const MAX_PDF_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB limit
const FETCH_TIMEOUT_MS = 15_000;

/**
 * Download a PDF and extract its text using pdf-parse.
 * Uses pdf-parse (v2) which works reliably in Node.js/serverless environments.
 */
async function downloadAndExtractPdf(url: string): Promise<string | null> {
  try {
    // Validate URL to prevent SSRF attacks
    const validation = await validateExternalUrl(url);
    if (!validation.valid) {
      return null;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ScholarSync/1.0 (Academic Research Tool)",
        Accept: "application/pdf",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    // Check content length before downloading
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_PDF_SIZE_BYTES) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_PDF_SIZE_BYTES) {
      return null;
    }

    // Use pdf-parse v2 class-based API
    const { PDFParse } = await import("pdf-parse");
    const data = new Uint8Array(arrayBuffer);
    const parser = new PDFParse({ data });
    const result = await parser.getText();
    const text = result.text;
    await parser.destroy();

    if (!text || text.trim().length < 200) {
      return null; // Likely a scanned PDF without OCR
    }

    return text;
  } catch {
    return null;
  }
}

// ── Main extraction pipeline ──────────────────────────────────────────

const MAX_FULL_TEXT_CHARS = 15_000;
const DEFAULT_TOP_N = 15;

/**
 * Extract full text from the top N open-access papers.
 * Papers are selected by citation count. Populates paper.fullText in-place.
 */
export async function extractFullTexts(
  papers: EnhancedPaper[],
  onProgress?: ResearchProgressCallback,
  topN: number = DEFAULT_TOP_N
): Promise<{ extracted: number; failed: number }> {
  // Filter to papers with open-access PDF URLs
  const candidates = papers
    .filter((p) => p.fullTextUrl && p.isOpenAccess)
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, topN);

  if (candidates.length === 0) {
    onProgress?.(
      "full-text-extraction",
      "No open-access PDFs available for full-text extraction"
    );
    return { extracted: 0, failed: 0 };
  }

  onProgress?.(
    "full-text-extraction",
    `Extracting full text from ${candidates.length} open-access papers...`
  );

  let extracted = 0;
  let failed = 0;

  // Process in batches of 3 to avoid overwhelming the network
  const batchSize = 3;
  for (let i = 0; i < candidates.length; i += batchSize) {
    const batch = candidates.slice(i, i + batchSize);

    const batchPromises = batch.map(async (paper) => {
      const titleShort =
        paper.title.length > 80
          ? paper.title.slice(0, 77) + "..."
          : paper.title;

      onProgress?.(
        "full-text-extraction",
        `Reading full text: ${titleShort} — ${paper.journal || "Unknown"} ${paper.year || ""}`
      );

      const rawText = await downloadAndExtractPdf(paper.fullTextUrl!);

      if (rawText) {
        // Extract key sections (Results + Discussion) and truncate
        const keyText = extractKeySecions(rawText);
        paper.fullText = keyText.slice(0, MAX_FULL_TEXT_CHARS);
        extracted++;
      } else {
        failed++;
      }
    });

    await Promise.all(batchPromises);
  }

  onProgress?.(
    "full-text-extraction",
    `Full-text extraction complete: ${extracted} papers read, ${failed} skipped`
  );

  return { extracted, failed };
}
