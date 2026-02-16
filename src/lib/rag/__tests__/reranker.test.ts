import { describe, it, expect, vi, beforeEach } from "vitest";
import { rerankChunks } from "../reranker";
import type { FusedChunk } from "../fusion";

function makeChunk(id: number, rrfScore: number = 0.5): FusedChunk {
  return {
    id, paper_id: 1, text: `chunk ${id}`, chunk_index: 0,
    section_type: null, page_number: null, score: 0.5,
    rrfScore, sources: ["vector"],
  };
}

describe("rerankChunks", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    delete process.env.COHERE_API_KEY;
  });

  it("falls back to RRF scores when no API key", async () => {
    const chunks = [makeChunk(1, 0.8), makeChunk(2, 0.6), makeChunk(3, 0.4)];
    const result = await rerankChunks("query", chunks, 2);
    expect(result).toHaveLength(2);
    expect(result[0].rerankScore).toBe(0.8);
    expect(result[1].rerankScore).toBe(0.6);
  });

  it("returns empty array for empty input", async () => {
    process.env.COHERE_API_KEY = "test-key";
    const result = await rerankChunks("query", []);
    expect(result).toEqual([]);
  });

  it("calls Cohere API when key is set", async () => {
    process.env.COHERE_API_KEY = "test-key";
    vi.spyOn(global, "fetch").mockResolvedValueOnce(new Response(JSON.stringify({
      results: [
        { index: 1, relevance_score: 0.95 },
        { index: 0, relevance_score: 0.80 },
      ]
    })));

    const chunks = [makeChunk(1), makeChunk(2)];
    const result = await rerankChunks("query", chunks, 2);
    expect(result).toHaveLength(2);
    expect(result[0].rerankScore).toBe(0.95);
  });

  it("falls back on API error", async () => {
    process.env.COHERE_API_KEY = "test-key";
    vi.spyOn(global, "fetch").mockResolvedValueOnce(new Response("", { status: 500 }));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const chunks = [makeChunk(1, 0.7)];
    const result = await rerankChunks("query", chunks, 1);
    expect(result[0].rerankScore).toBe(0.7);
  });

  it("falls back on network error", async () => {
    process.env.COHERE_API_KEY = "test-key";
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const chunks = [makeChunk(1, 0.6)];
    const result = await rerankChunks("query", chunks, 1);
    expect(result[0].rerankScore).toBe(0.6);
  });

  it("defaults topK to 8", async () => {
    const chunks = Array.from({ length: 15 }, (_, i) => makeChunk(i, 1 - i * 0.05));
    const result = await rerankChunks("query", chunks);
    expect(result).toHaveLength(8);
  });
});
