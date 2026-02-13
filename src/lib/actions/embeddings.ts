"use server";

import { db } from "@/lib/db";
import { paperChunks } from "@/lib/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { generateEmbeddings, generateEmbedding } from "@/lib/ai/embeddings";

/**
 * Generate embeddings for all unembedded chunks of a given paper.
 * Processes in batches of 50 to avoid OpenAI rate limits.
 */
export async function embedPaperChunks(paperId: number): Promise<{ embedded: number }> {
  await getCurrentUserId();

  // Get chunks that don't have embeddings yet
  const chunks = await db
    .select({ id: paperChunks.id, text: paperChunks.text })
    .from(paperChunks)
    .where(
      and(
        eq(paperChunks.paper_id, paperId),
        isNull(paperChunks.embedding)
      )
    )
    .orderBy(paperChunks.chunk_index);

  if (chunks.length === 0) return { embedded: 0 };

  const BATCH_SIZE = 50;
  let embedded = 0;

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.text);
    const embeddings = await generateEmbeddings(texts);

    // Update each chunk with its embedding using raw SQL for the vector type
    for (let j = 0; j < batch.length; j++) {
      const vectorStr = `[${embeddings[j].join(",")}]`;
      await db.execute(
        sql`UPDATE paper_chunks SET embedding = ${vectorStr}::vector WHERE id = ${batch[j].id}`
      );
    }

    embedded += batch.length;
  }

  return { embedded };
}

/**
 * Similarity search: find the most relevant chunks for a query.
 * Uses pgvector cosine distance operator (<=>).
 *
 * @param query - The search query text
 * @param paperIds - Optional array of paper IDs to restrict search to
 * @param limit - Maximum number of results (default 5)
 * @returns Array of matching chunks with similarity scores
 */
export async function searchSimilarChunks(
  query: string,
  paperIds?: number[],
  limit: number = 5
): Promise<{ id: number; paper_id: number; text: string; similarity: number; chunk_index: number }[]> {
  await getCurrentUserId();

  const queryEmbedding = await generateEmbedding(query);
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  // Build the query with optional paper_id filter
  let filterClause = sql`embedding IS NOT NULL`;
  if (paperIds && paperIds.length > 0) {
    filterClause = sql`embedding IS NOT NULL AND paper_id = ANY(${paperIds})`;
  }

  const results = await db.execute(
    sql`SELECT id, paper_id, text, chunk_index,
        1 - (embedding <=> ${vectorStr}::vector) as similarity
        FROM paper_chunks
        WHERE ${filterClause}
        ORDER BY embedding <=> ${vectorStr}::vector
        LIMIT ${limit}`
  );

  return (results as unknown as { id: number; paper_id: number; text: string; similarity: number; chunk_index: number }[]);
}
