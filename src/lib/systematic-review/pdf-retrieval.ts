/**
 * PDF Retrieval Engine for Systematic Reviews
 *
 * Automatically retrieves open-access PDFs from multiple sources:
 *   1. Existing pdf_storage_path (already have the file)
 *   2. Existing pdf_url (already have a URL — try to verify it)
 *   3. Unpaywall (DOI-based OA lookup)
 *   4. Semantic Scholar (openAccessPdf field)
 *   5. PubMed Central (OA subset XML API)
 *
 * Only updates papers.pdf_url — GCS storage is a separate concern.
 */

import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RetrievalStatus =
  | "not_attempted"
  | "retrieved"
  | "not_available"
  | "failed";

export interface RetrievalResult {
  paperId: number;
  status: RetrievalStatus;
  source?: "unpaywall" | "semantic_scholar" | "pmc" | "existing";
  pdfUrl?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Verify that a URL actually points to a PDF by checking the Content-Type
 * header or the first 4 bytes (%PDF magic bytes).
 * Returns true if it looks like a valid PDF.
 */
async function looksLikePDF(url: string): Promise<boolean> {
  try {
    // HEAD request first — fast, avoids downloading the whole file
    const headRes = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!headRes.ok) return false;

    const contentType = headRes.headers.get("content-type") ?? "";
    if (contentType.includes("application/pdf")) return true;

    // Some servers don't set Content-Type correctly on HEAD — fall back to
    // downloading just the first 8 bytes via a Range request.
    const rangeRes = await fetch(url, {
      headers: { Range: "bytes=0-7" },
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!rangeRes.ok) return false;

    const buf = await rangeRes.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // %PDF magic: 0x25 0x50 0x44 0x46
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  } catch {
    return false;
  }
}

/** Fetch a candidate PDF URL from the Unpaywall API for a given DOI. */
async function tryUnpaywall(doi: string): Promise<string | null> {
  try {
    const encodedDOI = encodeURIComponent(doi);
    const url = `https://api.unpaywall.org/v2/${encodedDOI}?email=team@scholarsync.app`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      best_oa_location?: { url_for_pdf?: string | null } | null;
    };

    return data?.best_oa_location?.url_for_pdf ?? null;
  } catch {
    return null;
  }
}

/** Fetch the open-access PDF URL from Semantic Scholar for a given S2 paper ID. */
async function trySemanticScholar(s2Id: string): Promise<string | null> {
  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(s2Id)}?fields=openAccessPdf`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      openAccessPdf?: { url?: string | null } | null;
    };

    return data?.openAccessPdf?.url ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch a PDF URL from PubMed Central OA service for a given PubMed ID (PMID).
 * The PMC OA API returns XML; we parse it to find PDF links.
 */
async function tryPMC(pmid: string): Promise<string | null> {
  try {
    const url = `https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi?id=${encodeURIComponent(pmid)}`;

    const res = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) return null;

    const xml = await res.text();

    // Look for <link format="pdf" href="..."/>
    const pdfMatch = xml.match(/<link[^>]+format="pdf"[^>]+href="([^"]+)"/);
    if (pdfMatch?.[1]) return pdfMatch[1];

    // Some entries use href first: <link href="..." format="pdf"/>
    const pdfMatchAlt = xml.match(/<link[^>]+href="([^"]+)"[^>]+format="pdf"/);
    if (pdfMatchAlt?.[1]) return pdfMatchAlt[1];

    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Core retrieval function
// ---------------------------------------------------------------------------

/**
 * Attempt to retrieve an open-access PDF for a single paper.
 *
 * Cascade order:
 *   1. pdf_storage_path already exists → already have the file, return "existing"
 *   2. pdf_url already set → verify it is a real PDF, mark "existing"
 *   3. Unpaywall (requires DOI)
 *   4. Semantic Scholar (requires semantic_scholar_id)
 *   5. PubMed Central (requires pubmed_id)
 *
 * On success, updates papers.pdf_url in the database.
 */
export async function retrievePDF(paperId: number): Promise<RetrievalResult> {
  // 1. Load the paper record
  const [paper] = await db
    .select({
      id: papers.id,
      doi: papers.doi,
      pubmed_id: papers.pubmed_id,
      semantic_scholar_id: papers.semantic_scholar_id,
      pdf_url: papers.pdf_url,
      pdf_storage_path: papers.pdf_storage_path,
    })
    .from(papers)
    .where(eq(papers.id, paperId))
    .limit(1);

  if (!paper) {
    return { paperId, status: "failed", error: "Paper not found" };
  }

  // 2. Already stored in GCS — nothing to do
  if (paper.pdf_storage_path) {
    return { paperId, status: "retrieved", source: "existing", pdfUrl: paper.pdf_url ?? undefined };
  }

  // 3. Already have a pdf_url — verify it still works
  if (paper.pdf_url) {
    const valid = await looksLikePDF(paper.pdf_url);
    if (valid) {
      return { paperId, status: "retrieved", source: "existing", pdfUrl: paper.pdf_url };
    }
    // URL is stale/invalid — fall through to discovery
  }

  // 4. Try each open-access source in order
  const attempts: Array<() => Promise<{ url: string | null; source: RetrievalResult["source"] }>> = [];

  if (paper.doi) {
    attempts.push(async () => ({ url: await tryUnpaywall(paper.doi!), source: "unpaywall" }));
  }

  if (paper.semantic_scholar_id) {
    attempts.push(async () => ({
      url: await trySemanticScholar(paper.semantic_scholar_id!),
      source: "semantic_scholar",
    }));
  }

  if (paper.pubmed_id) {
    attempts.push(async () => ({ url: await tryPMC(paper.pubmed_id!), source: "pmc" }));
  }

  for (const attempt of attempts) {
    const { url, source } = await attempt();

    if (!url) continue;

    // Verify the URL is actually a PDF before trusting it
    const valid = await looksLikePDF(url);
    if (!valid) continue;

    // Persist the discovered URL
    await db
      .update(papers)
      .set({ pdf_url: url, updated_at: new Date() })
      .where(eq(papers.id, paperId));

    return { paperId, status: "retrieved", source, pdfUrl: url };
  }

  // 5. Nothing found
  return { paperId, status: "not_available" };
}

// ---------------------------------------------------------------------------
// Batch retrieval
// ---------------------------------------------------------------------------

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 1_000;

/**
 * Retrieve open-access PDFs for multiple papers.
 * Processes in batches of 5 with a 1-second delay between batches
 * to respect external API rate limits.
 *
 * @param paperIds  List of paper IDs to process.
 * @param onProgress  Optional callback invoked after each paper completes.
 */
export async function batchRetrievePDFs(
  paperIds: number[],
  onProgress?: (completed: number, total: number) => void
): Promise<RetrievalResult[]> {
  const results: RetrievalResult[] = [];
  const total = paperIds.length;

  for (let i = 0; i < paperIds.length; i += BATCH_SIZE) {
    const batch = paperIds.slice(i, i + BATCH_SIZE);

    // Process the batch in parallel
    const batchResults = await Promise.all(
      batch.map((id) =>
        retrievePDF(id).catch(
          (err): RetrievalResult => ({
            paperId: id,
            status: "failed",
            error: err instanceof Error ? err.message : String(err),
          })
        )
      )
    );

    results.push(...batchResults);
    onProgress?.(results.length, total);

    // Wait between batches (but not after the last one)
    const isLastBatch = i + BATCH_SIZE >= paperIds.length;
    if (!isLastBatch) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  return results;
}
