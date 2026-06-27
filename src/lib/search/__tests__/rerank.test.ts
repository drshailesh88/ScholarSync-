import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { UnifiedSearchResult } from "@/types/search";
import { rerankResults, attachRerankScores, hasReranker } from "../rerank";

const { mockResilientFetch } = vi.hoisted(() => ({ mockResilientFetch: vi.fn() }));

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: mockResilientFetch,
}));

const MEDCPT_URL = "https://example-medcpt-rerank.modal.run";
const COHERE_KEY = "cohere_test_key";

function jsonResponse(body: unknown) {
  return { json: () => Promise.resolve(body) } as unknown as Response;
}

function paper(title: string): UnifiedSearchResult {
  return {
    title,
    authors: [],
    journal: "",
    year: 2024,
    citationCount: 0,
    isOpenAccess: false,
    openAccessPdfUrl: null,
    publicationTypes: [],
    sources: ["pubmed"],
  } as UnifiedSearchResult;
}

const RESULTS = [paper("A relevance low"), paper("B relevance high"), paper("C relevance mid")];

beforeEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("rerankResults — backend selection", () => {
  it("uses the self-hosted MedCPT reranker when MEDCPT_RERANK_URL is set, sorting by score desc", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    // scores in INPUT order: A=0.1, B=0.9, C=0.5 → expect B, C, A
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [0.1, 0.9, 0.5] }));

    const out = await rerankResults("q", RESULTS);

    expect(out.map((r) => r.title)).toEqual([
      "B relevance high",
      "C relevance mid",
      "A relevance low",
    ]);
    expect(out[0].rerankScore).toBe(0.9);

    const [url, init] = mockResilientFetch.mock.calls[0];
    expect(url).toBe(MEDCPT_URL);
    expect(JSON.parse(init.body as string)).toMatchObject({
      query: "q",
      documents: ["A relevance low. ", "B relevance high. ", "C relevance mid. "],
    });
  });

  it("prefers MedCPT over Cohere when both are configured", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    vi.stubEnv("COHERE_API_KEY", COHERE_KEY);
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [0.1, 0.9, 0.5] }));

    await rerankResults("q", RESULTS);

    expect(mockResilientFetch).toHaveBeenCalledTimes(1);
    expect(mockResilientFetch.mock.calls[0][0]).toBe(MEDCPT_URL);
  });

  it("falls back to Cohere when only COHERE_API_KEY is set", async () => {
    vi.stubEnv("COHERE_API_KEY", COHERE_KEY);
    mockResilientFetch.mockResolvedValueOnce(
      jsonResponse({ results: [{ index: 1, relevance_score: 0.9 }, { index: 0, relevance_score: 0.1 }] })
    );

    const out = await rerankResults("q", RESULTS);

    expect(out.map((r) => r.title)).toEqual(["B relevance high", "A relevance low"]);
    expect(mockResilientFetch.mock.calls[0][0]).toBe("https://api.cohere.com/v2/rerank");
  });

  it("fails open (unchanged, no fetch) when no reranker is configured", async () => {
    const out = await rerankResults("q", RESULTS);
    expect(out).toBe(RESULTS);
    expect(mockResilientFetch).not.toHaveBeenCalled();
  });

  it("fails open to the input order when the MedCPT call throws", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    mockResilientFetch.mockRejectedValueOnce(new Error("[MedCPT-Rerank] cold start timeout"));

    const out = await rerankResults("q", RESULTS);
    expect(out).toBe(RESULTS);
  });

  it("returns input unchanged when the reranker yields no scores", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [] }));

    const out = await rerankResults("q", RESULTS);
    expect(out).toBe(RESULTS);
  });
});

describe("hasReranker / attachRerankScores", () => {
  it("hasReranker reflects either env var", () => {
    expect(hasReranker()).toBe(false);
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    expect(hasReranker()).toBe(true);
  });

  it("attachRerankScores activates via MEDCPT_RERANK_URL (no Cohere key) and sets scores without reordering", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [0.1, 0.9, 0.5] }));

    const input = [paper("A relevance low"), paper("B relevance high"), paper("C relevance mid")];
    const out = await attachRerankScores("q", input, 50);

    // same order (no reordering), scores attached by identity
    expect(out.map((r) => r.title)).toEqual([
      "A relevance low",
      "B relevance high",
      "C relevance mid",
    ]);
    expect(out[1].rerankScore).toBe(0.9);
  });
});
