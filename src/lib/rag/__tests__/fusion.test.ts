import { describe, it, expect } from "vitest";
import { reciprocalRankFusion } from "../fusion";
import type { ChunkResult } from "../search";

function makeChunk(id: number, text: string = "chunk text"): ChunkResult {
  return { id, paper_id: 1, text, chunk_index: 0, section_type: null, page_number: null, score: 0.5 };
}

describe("reciprocalRankFusion", () => {
  it("merges results from both sources", () => {
    const vector = [makeChunk(1), makeChunk(2)];
    const keyword = [makeChunk(2), makeChunk(3)];
    const result = reciprocalRankFusion(vector, keyword);
    expect(result).toHaveLength(3);
  });

  it("sorts by RRF score descending", () => {
    const vector = [makeChunk(1), makeChunk(2)];
    const keyword = [makeChunk(2), makeChunk(3)];
    const result = reciprocalRankFusion(vector, keyword);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].rrfScore).toBeGreaterThanOrEqual(result[i].rrfScore);
    }
  });

  it("gives higher score to chunks in both sources", () => {
    const vector = [makeChunk(1), makeChunk(2)];
    const keyword = [makeChunk(2), makeChunk(3)];
    const result = reciprocalRankFusion(vector, keyword);
    const chunk2 = result.find(c => c.id === 2)!;
    const chunk1 = result.find(c => c.id === 1)!;
    expect(chunk2.rrfScore).toBeGreaterThan(chunk1.rrfScore);
  });

  it("tracks sources correctly", () => {
    const vector = [makeChunk(1)];
    const keyword = [makeChunk(2)];
    const result = reciprocalRankFusion(vector, keyword);
    expect(result.find(c => c.id === 1)!.sources).toEqual(["vector"]);
    expect(result.find(c => c.id === 2)!.sources).toEqual(["keyword"]);
  });

  it("tracks both sources for overlapping chunks", () => {
    const vector = [makeChunk(1)];
    const keyword = [makeChunk(1)];
    const result = reciprocalRankFusion(vector, keyword);
    expect(result[0].sources).toContain("vector");
    expect(result[0].sources).toContain("keyword");
  });

  it("sets vectorRank and keywordRank", () => {
    const vector = [makeChunk(1), makeChunk(2)];
    const keyword = [makeChunk(2), makeChunk(1)];
    const result = reciprocalRankFusion(vector, keyword);
    const chunk1 = result.find(c => c.id === 1)!;
    expect(chunk1.vectorRank).toBe(1);
    expect(chunk1.keywordRank).toBe(2);
  });

  it("handles empty vector results", () => {
    const result = reciprocalRankFusion([], [makeChunk(1)]);
    expect(result).toHaveLength(1);
    expect(result[0].sources).toEqual(["keyword"]);
  });

  it("handles empty keyword results", () => {
    const result = reciprocalRankFusion([makeChunk(1)], []);
    expect(result).toHaveLength(1);
    expect(result[0].sources).toEqual(["vector"]);
  });

  it("handles both empty", () => {
    expect(reciprocalRankFusion([], [])).toEqual([]);
  });

  it("uses custom k parameter", () => {
    const vector = [makeChunk(1)];
    const keyword: ChunkResult[] = [];
    const r60 = reciprocalRankFusion(vector, keyword, 60);
    const r10 = reciprocalRankFusion(vector, keyword, 10);
    expect(r10[0].rrfScore).toBeGreaterThan(r60[0].rrfScore);
  });
});
