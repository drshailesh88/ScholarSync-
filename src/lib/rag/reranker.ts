import type { FusedChunk } from "./fusion";

export interface RerankedChunk extends FusedChunk {
  rerankScore: number;
}

/**
 * Rerank chunks using Cohere's cross-encoder.
 * Gracefully degrades to returning input unchanged if no API key.
 */
export async function rerankChunks(
  query: string,
  chunks: FusedChunk[],
  topK: number = 8
): Promise<RerankedChunk[]> {
  if (!process.env.COHERE_API_KEY || chunks.length === 0) {
    return chunks.slice(0, topK).map((c) => ({ ...c, rerankScore: c.rrfScore }));
  }

  try {
    const response = await fetch("https://api.cohere.com/v2/rerank", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "rerank-v3.5",
        query,
        documents: chunks.map((c) => c.text),
        top_n: topK,
        return_documents: false,
      }),
    });

    if (!response.ok) {
      console.error("Cohere rerank failed:", response.status);
      return chunks.slice(0, topK).map((c) => ({ ...c, rerankScore: c.rrfScore }));
    }

    const data = (await response.json()) as {
      results: { index: number; relevance_score: number }[];
    };

    return data.results.map((r) => ({
      ...chunks[r.index],
      rerankScore: r.relevance_score,
    }));
  } catch (err) {
    console.error("Cohere rerank error:", err);
    return chunks.slice(0, topK).map((c) => ({ ...c, rerankScore: c.rrfScore }));
  }
}
