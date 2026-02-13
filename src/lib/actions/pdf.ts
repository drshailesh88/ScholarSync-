"use server";

import { db } from "@/lib/db";
import { paperChunks, papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { PDFParse } from "pdf-parse";

/**
 * Approximate word count for a given string.
 */
function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Split text into chunks of approximately `targetWords` words,
 * with an overlap of `overlapWords` words between consecutive chunks.
 * This preserves context across chunk boundaries for better RAG retrieval.
 */
function splitIntoChunks(
  text: string,
  targetWords: number = 500,
  overlapWords: number = 50
): string[] {
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length === 0) return [];
  if (words.length <= targetWords) return [words.join(" ")];

  const chunks: string[] = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + targetWords, words.length);
    const chunk = words.slice(start, end).join(" ");
    chunks.push(chunk);

    if (end >= words.length) break;

    // Move forward by (targetWords - overlapWords) to create overlap
    start += targetWords - overlapWords;
  }

  return chunks;
}

/**
 * Extract text from a PDF buffer and save the text as chunks to the
 * `paper_chunks` table. Embeddings are left null and will be populated
 * in Phase 5.
 *
 * @param paperId - The ID of the paper record in the `papers` table
 * @param fileBuffer - The raw PDF file contents as a Buffer
 * @returns Object containing the number of chunks created and total pages
 */
export async function extractPdfText(
  paperId: number,
  fileBuffer: Buffer
): Promise<{ chunksCreated: number; pages: number; totalWords: number }> {
  // Ensure the caller is authenticated
  await getCurrentUserId();

  // Verify the paper exists
  const [paper] = await db
    .select({ id: papers.id })
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) {
    throw new Error(`Paper with id ${paperId} not found`);
  }

  // Extract text from the PDF using pdf-parse v2 class-based API
  const data = new Uint8Array(fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength);
  const parser = new PDFParse({ data });
  const textResult = await parser.getText();
  const fullText = textResult.text;
  const totalPages = textResult.total;
  await parser.destroy();

  if (!fullText || fullText.trim().length === 0) {
    throw new Error("PDF extraction produced no text content");
  }

  // Split into ~500 word chunks with 50 word overlap
  const chunks = splitIntoChunks(fullText, 500, 50);

  // Delete any existing chunks for this paper (in case of re-extraction)
  await db.delete(paperChunks).where(eq(paperChunks.paper_id, paperId));

  // Insert all chunks
  const chunkValues = chunks.map((chunkText, index) => ({
    paper_id: paperId,
    chunk_index: index,
    text: chunkText,
    metadata: { word_count: countWords(chunkText) },
  }));

  if (chunkValues.length > 0) {
    await db.insert(paperChunks).values(chunkValues);
  }

  // Update the paper record to mark it as chunked and extracted
  await db
    .update(papers)
    .set({
      is_chunked: true,
      is_extracted: true,
      full_text_plain: fullText,
    })
    .where(eq(papers.id, paperId));

  return {
    chunksCreated: chunks.length,
    pages: totalPages,
    totalWords: countWords(fullText),
  };
}
