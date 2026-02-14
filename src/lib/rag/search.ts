import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { generateEmbedding } from "@/lib/ai/embeddings";

export interface ChunkResult {
  id: number;
  paper_id: number;
  text: string;
  chunk_index: number;
  section_type: string | null;
  page_number: number | null;
  score: number;
}

/**
 * Vector similarity search on paper_chunks using pgvector.
 */
export async function searchVector(
  queryText: string,
  paperIds: number[],
  limit: number = 20,
  filters?: { sectionType?: string }
): Promise<ChunkResult[]> {
  const embedding = await generateEmbedding(queryText);
  const vectorStr = `[${embedding.join(",")}]`;

  let filterClause = sql`embedding IS NOT NULL`;
  if (paperIds.length > 0) {
    filterClause = sql`embedding IS NOT NULL AND paper_id = ANY(${paperIds})`;
  }
  if (filters?.sectionType) {
    filterClause = sql`${filterClause} AND section_type = ${filters.sectionType}`;
  }

  const results = await db.execute(
    sql`SELECT id, paper_id, text, chunk_index, section_type, page_number,
            1 - (embedding <=> ${vectorStr}::vector) as score
        FROM paper_chunks
        WHERE ${filterClause}
        ORDER BY embedding <=> ${vectorStr}::vector
        LIMIT ${limit}`
  );

  return results as unknown as ChunkResult[];
}

/**
 * Full-text keyword search on paper_chunks using PostgreSQL tsvector.
 */
export async function searchKeyword(
  query: string,
  paperIds: number[],
  limit: number = 20
): Promise<ChunkResult[]> {
  let filterClause = sql`to_tsvector('english', text) @@ plainto_tsquery('english', ${query})`;
  if (paperIds.length > 0) {
    filterClause = sql`${filterClause} AND paper_id = ANY(${paperIds})`;
  }

  const results = await db.execute(
    sql`SELECT id, paper_id, text, chunk_index, section_type, page_number,
            ts_rank(to_tsvector('english', text), plainto_tsquery('english', ${query})) as score
        FROM paper_chunks
        WHERE ${filterClause}
        ORDER BY score DESC
        LIMIT ${limit}`
  );

  return results as unknown as ChunkResult[];
}
