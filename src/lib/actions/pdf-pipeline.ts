"use server";

import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { uploadPdf, downloadPdf } from "@/lib/storage/gcs";
import { lookupUnpaywall } from "@/lib/search/sources/unpaywall";
import { extractWithDocling } from "@/lib/actions/pdf-advanced";
import { extractPdfText } from "@/lib/actions/pdf";
import { embedPaperChunks } from "@/lib/actions/embeddings";

/**
 * Attempt to find and fetch the full-text PDF for a paper.
 * Tries multiple sources in order of reliability.
 *
 * @returns Buffer of the PDF, or null if unavailable
 */
async function fetchPdfFromWeb(paper: {
  id: number;
  doi: string | null;
  pdf_url: string | null;
  open_access_url: string | null;
}): Promise<Buffer | null> {
  const urlsToTry: string[] = [];

  // Priority 1: Known PDF URL from search results
  if (paper.pdf_url) {
    urlsToTry.push(paper.pdf_url);
  }

  // Priority 2: Open access URL
  if (paper.open_access_url && paper.open_access_url !== paper.pdf_url) {
    urlsToTry.push(paper.open_access_url);
  }

  // Priority 3: Unpaywall lookup (if we have a DOI)
  if (paper.doi) {
    try {
      const unpaywall = await lookupUnpaywall(paper.doi);
      if (unpaywall.pdfUrl && !urlsToTry.includes(unpaywall.pdfUrl)) {
        urlsToTry.push(unpaywall.pdfUrl);
      }
    } catch {
      // Unpaywall lookup failed, continue with what we have
    }
  }

  // Try each URL until one works
  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "ScholarSync/1.0 (mailto:contact@scholarsync.com)",
          Accept: "application/pdf",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(30_000), // 30s timeout per attempt
      });

      if (!response.ok) continue;

      const contentType = response.headers.get("content-type") || "";
      // Accept PDF or octet-stream (some servers don't set correct content-type)
      if (
        !contentType.includes("pdf") &&
        !contentType.includes("octet-stream")
      ) {
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Basic sanity check: PDF files start with %PDF
      if (buffer.length > 4 && buffer.subarray(0, 5).toString() === "%PDF-") {
        return buffer;
      }
    } catch {
      // This URL failed, try next
      continue;
    }
  }

  return null;
}

/**
 * Full PDF processing pipeline for a paper.
 *
 * 1. Fetch PDF (from web or from provided buffer)
 * 2. Store in GCS
 * 3. Extract text (Docling -> fallback to pdf-parse)
 * 4. Chunk and embed
 *
 * This is designed to be called in the background (fire-and-forget).
 * It is safe to call multiple times — it will skip steps already completed.
 *
 * @param paperId - The paper record ID
 * @param providedBuffer - Optional: if the caller already has the PDF bytes (e.g., user upload)
 */
export async function processPdfPipeline(
  paperId: number,
  providedBuffer?: Buffer
): Promise<{
  pdfFound: boolean;
  stored: boolean;
  chunksCreated: number;
  embedded: number;
}> {
  const result = {
    pdfFound: false,
    stored: false,
    chunksCreated: 0,
    embedded: 0,
  };

  // Load paper record
  const [paper] = await db.select().from(papers).where(eq(papers.id, paperId));
  if (!paper) {
    console.error(`[pdf-pipeline] Paper ${paperId} not found`);
    return result;
  }

  // Step 1: Get the PDF buffer
  let pdfBuffer: Buffer | null = providedBuffer || null;

  if (!pdfBuffer) {
    // Try to download from GCS first (maybe we stored it before but didn't finish processing)
    pdfBuffer = await downloadPdf(paperId);
  }

  if (!pdfBuffer) {
    // Try to fetch from the web
    pdfBuffer = await fetchPdfFromWeb({
      id: paper.id,
      doi: paper.doi,
      pdf_url: paper.pdf_url,
      open_access_url: paper.open_access_url,
    });
  }

  if (!pdfBuffer) {
    // No PDF available — this is expected for many papers (paywalled, etc.)
    // The paper will continue to use abstract-only RAG
    return result;
  }

  result.pdfFound = true;

  // Step 2: Store in GCS (idempotent — overwrites if exists)
  try {
    const gcsPath = await uploadPdf(paperId, pdfBuffer);

    await db
      .update(papers)
      .set({
        pdf_storage_path: gcsPath,
        full_text_available: true,
      })
      .where(eq(papers.id, paperId));

    result.stored = true;
  } catch (error) {
    console.error(
      `[pdf-pipeline] GCS upload failed for paper ${paperId}:`,
      error
    );
    // Continue with extraction even if storage failed — we still have the buffer
  }

  // Step 3: Extract and chunk (skip if already done with full text)
  if (!paper.full_text_plain || paper.full_text_plain.length < 500) {
    try {
      // Try Docling first (section-aware), fall back to basic
      const extractionResult = await extractWithDocling(paperId, pdfBuffer);
      result.chunksCreated = extractionResult.chunksCreated;
    } catch (error) {
      console.error(
        `[pdf-pipeline] Extraction failed for paper ${paperId}:`,
        error
      );
      try {
        // Fallback to basic extraction
        const basicResult = await extractPdfText(paperId, pdfBuffer);
        result.chunksCreated = basicResult.chunksCreated;
      } catch (basicError) {
        console.error(
          `[pdf-pipeline] Basic extraction also failed for paper ${paperId}:`,
          basicError
        );
        return result;
      }
    }
  }

  // Step 4: Generate embeddings for new chunks
  if (result.chunksCreated > 0) {
    try {
      const embeddingResult = await embedPaperChunks(paperId);
      result.embedded = embeddingResult.embedded;
    } catch (error) {
      console.error(
        `[pdf-pipeline] Embedding failed for paper ${paperId}:`,
        error
      );
      // Chunks exist without embeddings — keyword search still works.
      // Embeddings can be retried later.
    }
  }

  return result;
}

/**
 * Queue a background PDF processing job for a paper.
 * This is the function that savePaper() and the upload flow should call.
 * It's fire-and-forget — errors are logged but don't propagate.
 */
export function queuePdfProcessing(
  paperId: number,
  providedBuffer?: Buffer
): void {
  processPdfPipeline(paperId, providedBuffer)
    .then((result) => {
      if (result.pdfFound) {
        console.log(
          `[pdf-pipeline] Paper ${paperId}: stored=${result.stored}, chunks=${result.chunksCreated}, embedded=${result.embedded}`
        );
      }
    })
    .catch((error) => {
      console.error(
        `[pdf-pipeline] Unhandled error for paper ${paperId}:`,
        error
      );
    });
}
