import type { ChunkResult } from "./search";

export interface FusedChunk extends ChunkResult {
  rrfScore: number;
  vectorRank?: number;
  keywordRank?: number;
  sources: ("vector" | "keyword")[];
}

export function reciprocalRankFusion(
  vectorResults: ChunkResult[],
  keywordResults: ChunkResult[],
  k: number = 60
): FusedChunk[] {
  const scores = new Map<number, FusedChunk>();

  vectorResults.forEach((chunk, i) => {
    const existing = scores.get(chunk.id);
    if (existing) {
      existing.rrfScore += 1 / (k + i + 1);
      existing.vectorRank = i + 1;
      existing.sources.push("vector");
    } else {
      scores.set(chunk.id, {
        ...chunk,
        rrfScore: 1 / (k + i + 1),
        vectorRank: i + 1,
        sources: ["vector"],
      });
    }
  });

  keywordResults.forEach((chunk, i) => {
    const existing = scores.get(chunk.id);
    if (existing) {
      existing.rrfScore += 1 / (k + i + 1);
      existing.keywordRank = i + 1;
      if (!existing.sources.includes("keyword")) existing.sources.push("keyword");
    } else {
      scores.set(chunk.id, {
        ...chunk,
        rrfScore: 1 / (k + i + 1),
        keywordRank: i + 1,
        sources: ["keyword"],
      });
    }
  });

  return [...scores.values()].sort((a, b) => b.rrfScore - a.rrfScore);
}
