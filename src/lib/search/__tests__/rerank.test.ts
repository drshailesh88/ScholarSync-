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
  it("uses the self-hosted MedCPT reranker when MEDCPT_RERANK_URL is set, sorting by score desc and squashing logits to [0,1]", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    // The endpoint returns raw LOGITS in INPUT order: A=-2, B=4, C=1 → sorted desc
    // by sigmoid(logit) → B, C, A. The adapter squashes each to a [0,1] probability.
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [-2, 4, 1] }));

    const out = await rerankResults("q", RESULTS);

    expect(out.map((r) => r.title)).toEqual([
      "B relevance high",
      "C relevance mid",
      "A relevance low",
    ]);
    // top score is sigmoid(4), not the raw logit; the negative logit becomes a
    // bounded probability in (0, 0.5), never a negative value that could dominate
    // a weighted sum of [0,1] quality signals.
    expect(out[0].rerankScore).toBeCloseTo(1 / (1 + Math.exp(-4)), 5);
    expect(out[2].rerankScore).toBeCloseTo(1 / (1 + Math.exp(2)), 5);
    expect(out[2].rerankScore).toBeGreaterThan(0);
    expect(out[2].rerankScore).toBeLessThan(0.5);

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

  it("falls back from MedCPT to Cohere when the MedCPT call throws and Cohere is configured", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    vi.stubEnv("COHERE_API_KEY", COHERE_KEY);
    mockResilientFetch.mockRejectedValueOnce(new Error("[MedCPT-Rerank] cold start timeout"));
    mockResilientFetch.mockResolvedValueOnce(
      jsonResponse({ results: [{ index: 1, relevance_score: 0.9 }, { index: 0, relevance_score: 0.1 }] })
    );

    const out = await rerankResults("q", RESULTS);

    expect(mockResilientFetch).toHaveBeenCalledTimes(2);
    expect(mockResilientFetch.mock.calls[0][0]).toBe(MEDCPT_URL);
    expect(mockResilientFetch.mock.calls[1][0]).toBe("https://api.cohere.com/v2/rerank");
    expect(out.map((r) => r.title)).toEqual(["B relevance high", "A relevance low"]);
  });
});

describe("hasReranker / attachRerankScores", () => {
  it("hasReranker reflects any configured backend", () => {
    expect(hasReranker()).toBe(false);
    vi.stubEnv("COHERE_API_KEY", COHERE_KEY);
    expect(hasReranker()).toBe(true);
  });

  it("hasReranker reflects MEDCPT_RERANK_URL", () => {
    expect(hasReranker()).toBe(false);
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    expect(hasReranker()).toBe(true);
  });

  it("attachRerankScores activates via MEDCPT_RERANK_URL (no Cohere key) and sets scores without reordering", async () => {
    vi.stubEnv("MEDCPT_RERANK_URL", MEDCPT_URL);
    mockResilientFetch.mockResolvedValueOnce(jsonResponse({ scores: [0.1, 0.9, 0.5] }));

    const input = [paper("A relevance low"), paper("B relevance high"), paper("C relevance mid")];
    const out = await attachRerankScores("q", input, 50);

    // same order (no reordering), scores attached by identity, squashed to [0,1]
    expect(out.map((r) => r.title)).toEqual([
      "A relevance low",
      "B relevance high",
      "C relevance mid",
    ]);
    expect(out[1].rerankScore).toBeCloseTo(1 / (1 + Math.exp(-0.9)), 5);
  });
});
