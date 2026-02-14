"use server";

import { db } from "@/lib/db";
import { paperChunks, papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

const DOCLING_URL = process.env.DOCLING_SERVICE_URL || "http://localhost:8001";

interface DoclingChunk {
  chunk_index: number;
  text: string;
  section_type: string;
  word_count: number;
}

/**
 * Check if the Docling service is available.
 */
export async function isDoclingAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${DOCLING_URL}/health`, {
      signal: AbortSignal.timeout(3_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Extract and chunk a PDF using Docling (section-aware chunking).
 * Falls back to basic chunking if Docling is unavailable.
 *
 * @param paperId - The paper record ID
 * @param fileBuffer - Raw PDF bytes
 * @returns Number of chunks created and sections detected
 */
export async function extractWithDocling(
  paperId: number,
  fileBuffer: Buffer
): Promise<{
  chunksCreated: number;
  sectionsDetected: string[];
  usedDocling: boolean;
}> {
  await getCurrentUserId();

  // Verify paper exists
  const [paper] = await db
    .select({ id: papers.id })
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) {
    throw new Error(`Paper ${paperId} not found`);
  }

  // Try Docling first
  const doclingUp = await isDoclingAvailable();

  if (doclingUp) {
    try {
      const formData = new FormData();
      const arrayBuf = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength) as ArrayBuffer;
      const blob = new Blob([arrayBuf], { type: "application/pdf" });
      formData.append("file", blob, "paper.pdf");

      const response = await fetch(`${DOCLING_URL}/chunk`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(120_000),
      });

      if (!response.ok) {
        throw new Error(`Docling returned ${response.status}`);
      }

      const result = (await response.json()) as {
        chunks: DoclingChunk[];
        total_chunks: number;
        sections_detected: string[];
      };

      // Delete existing chunks
      await db.delete(paperChunks).where(eq(paperChunks.paper_id, paperId));

      // Insert Docling chunks with section types
      if (result.chunks.length > 0) {
        const values = result.chunks.map((chunk) => ({
          paper_id: paperId,
          chunk_index: chunk.chunk_index,
          text: chunk.text,
          section_type: mapSectionType(chunk.section_type),
          metadata: { word_count: chunk.word_count, source: "docling" as const },
        }));

        await db.insert(paperChunks).values(values);
      }

      // Also get full markdown for full_text_plain
      try {
        const parseForm = new FormData();
        const parseArrayBuf = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength) as ArrayBuffer;
        const parseBlob = new Blob([parseArrayBuf], { type: "application/pdf" });
        parseForm.append("file", parseBlob, "paper.pdf");

        const parseRes = await fetch(`${DOCLING_URL}/parse`, {
          method: "POST",
          body: parseForm,
          signal: AbortSignal.timeout(120_000),
        });

        if (parseRes.ok) {
          const parseResult = (await parseRes.json()) as { markdown: string };
          await db
            .update(papers)
            .set({
              is_chunked: true,
              is_extracted: true,
              full_text_plain: parseResult.markdown,
            })
            .where(eq(papers.id, paperId));
        }
      } catch {
        // Non-critical — just mark as chunked
        await db
          .update(papers)
          .set({ is_chunked: true })
          .where(eq(papers.id, paperId));
      }

      return {
        chunksCreated: result.total_chunks,
        sectionsDetected: result.sections_detected,
        usedDocling: true,
      };
    } catch (error) {
      console.error("Docling extraction failed, falling back to basic:", error);
      // Fall through to basic extraction
    }
  }

  // Fallback: use existing basic extraction from pdf.ts
  const { extractPdfText } = await import("@/lib/actions/pdf");
  const basicResult = await extractPdfText(paperId, fileBuffer);

  return {
    chunksCreated: basicResult.chunksCreated,
    sectionsDetected: [],
    usedDocling: false,
  };
}

/**
 * Server-action wrapper that accepts FormData from a client component.
 * Converts the uploaded file to a Buffer and delegates to extractWithDocling.
 */
export async function extractUploadedPdf(formData: FormData): Promise<{
  chunksCreated: number;
  sectionsDetected: string[];
  usedDocling: boolean;
}> {
  const paperId = Number(formData.get("paperId"));
  const file = formData.get("file") as File;
  if (!file || !paperId) {
    throw new Error("paperId and file are required");
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return extractWithDocling(paperId, buffer);
}

/**
 * Map Docling section types to our schema enum values.
 */
function mapSectionType(
  doclingType: string
): "abstract" | "introduction" | "methods" | "results" | "discussion" | "conclusion" | "other" {
  const mapping: Record<string, "abstract" | "introduction" | "methods" | "results" | "discussion" | "conclusion" | "other"> = {
    abstract: "abstract",
    introduction: "introduction",
    methods: "methods",
    results: "results",
    discussion: "discussion",
    conclusion: "conclusion",
  };
  return mapping[doclingType] || "other";
}
