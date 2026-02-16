import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  generateText: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

import { compressChunks } from "../compressor";
import { generateText } from "ai";
import type { RerankedChunk } from "../reranker";

const mockGenerateText = vi.mocked(generateText);

function makeChunk(id: number): RerankedChunk {
  return {
    id, paper_id: 1, text: `Chunk ${id} text content.`, chunk_index: 0,
    section_type: null, page_number: null, score: 0.5,
    rrfScore: 0.5, rerankScore: 0.5, sources: ["vector"],
  };
}

describe("compressChunks", () => {
  it("compresses chunks with AI-extracted sentences", async () => {
    mockGenerateText.mockResolvedValue({ text: "Relevant sentence only." } as Awaited<ReturnType<typeof generateText>>);
    const result = await compressChunks("query", [makeChunk(1), makeChunk(2)]);
    expect(result).toHaveLength(2);
    expect(result[0].compressedText).toBe("Relevant sentence only.");
  });

  it("falls back to original text when AI returns empty", async () => {
    mockGenerateText.mockResolvedValue({ text: "" } as Awaited<ReturnType<typeof generateText>>);
    const result = await compressChunks("query", [makeChunk(1)]);
    expect(result[0].compressedText).toBe("Chunk 1 text content.");
  });

  it("handles empty chunks array", async () => {
    const result = await compressChunks("query", []);
    expect(result).toEqual([]);
  });
});
