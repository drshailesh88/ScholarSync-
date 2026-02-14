import type { UnifiedSearchResult } from "@/types/search";

interface CohereRerankResponse {
  results: {
    index: number;
    relevance_score: number;
  }[];
}

export async function rerankResults(
  query: string,
  results: UnifiedSearchResult[],
  topN?: number
): Promise<UnifiedSearchResult[]> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey || results.length === 0) {
    return results;
  }

  try {
    const documents = results.map(
      (r) => `${r.title}. ${r.abstract || r.tldr || ""}`
    );

    const response = await fetch("https://api.cohere.com/v2/rerank", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "rerank-v3.5",
        query,
        documents,
        top_n: topN || Math.min(results.length, 50),
        return_documents: false,
      }),
    });

    if (!response.ok) {
      console.error(`Cohere rerank failed with status ${response.status}`);
      return results;
    }

    const data: CohereRerankResponse = await response.json();

    const reranked: UnifiedSearchResult[] = data.results.map((r) => ({
      ...results[r.index],
      rerankScore: r.relevance_score,
    }));

    return reranked;
  } catch (error) {
    console.error("Cohere rerank error:", error);
    return results;
  }
}
