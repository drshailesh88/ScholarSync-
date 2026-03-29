import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockSearchPubMed = vi.hoisted(() => vi.fn());
const mockSearchSemanticScholar = vi.hoisted(() => vi.fn());
const mockSearchOpenAlex = vi.hoisted(() => vi.fn());
const mockSearchClinicalTrials = vi.hoisted(() => vi.fn());
const mockReciprocalRankFusion = vi.hoisted(() => vi.fn());
const mockRerankResults = vi.hoisted(() => vi.fn());
const mockAugmentQuery = vi.hoisted(() => vi.fn());
const mockEnrichStudyTypes = vi.hoisted(() => vi.fn());
const mockQualityRank = vi.hoisted(() => vi.fn());
const mockExpandQueryForDomain = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
    search: { limit: 120, windowSeconds: 3600 },
    export: { limit: 30, windowSeconds: 3600 },
    analysis: { limit: 20, windowSeconds: 3600 },
    embed: { limit: 60, windowSeconds: 3600 },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    withRequestId: vi.fn().mockReturnValue({
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

vi.mock("@/lib/search/sources/pubmed", () => ({
  searchPubMed: mockSearchPubMed,
}));

vi.mock("@/lib/search/sources/semantic-scholar", () => ({
  searchSemanticScholar: mockSearchSemanticScholar,
}));

vi.mock("@/lib/search/sources/openalex", () => ({
  searchOpenAlex: mockSearchOpenAlex,
}));

vi.mock("@/lib/search/sources/clinical-trials", () => ({
  searchClinicalTrials: mockSearchClinicalTrials,
}));

vi.mock("@/lib/search/rank-fusion", () => ({
  reciprocalRankFusion: mockReciprocalRankFusion,
}));

vi.mock("@/lib/search/rerank", () => ({
  rerankResults: mockRerankResults,
}));

vi.mock("@/lib/search/evidence-level", () => ({
  getEvidenceLevel: vi.fn().mockReturnValue({ level: "II" }),
}));

vi.mock("@/lib/ai/query-augment", () => ({
  augmentQuery: mockAugmentQuery,
}));

vi.mock("@/lib/search/journal-quality", () => ({
  lookupJournalQuality: vi.fn().mockReturnValue(null),
}));

vi.mock("@/lib/search/study-type-detector", () => ({
  enrichStudyTypes: mockEnrichStudyTypes,
}));

vi.mock("@/lib/search/quality-ranker", () => ({
  qualityRank: mockQualityRank,
}));

vi.mock("@/lib/search/query-expander", () => ({
  expandQueryForDomain: mockExpandQueryForDomain,
}));

import { GET } from "../route";

function makeRequest(params: Record<string, string> = {}): Request {
  const url = new URL("http://localhost/api/search/unified");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return new Request(url.toString());
}

const sampleResult = {
  id: "pmid:123",
  title: "Sample Paper",
  authors: ["Author A"],
  year: 2024,
  source: "pubmed",
};

describe("GET /api/search/unified", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);

    mockSearchPubMed.mockResolvedValue({ results: [sampleResult], total: 1 });
    mockSearchSemanticScholar.mockResolvedValue({ results: [], total: 0 });
    mockSearchOpenAlex.mockResolvedValue({ results: [], total: 0 });
    mockSearchClinicalTrials.mockResolvedValue({ results: [], total: 0 });

    mockReciprocalRankFusion.mockReturnValue([sampleResult]);
    mockRerankResults.mockImplementation((_q: string, r: unknown[]) => r);
    mockAugmentQuery.mockResolvedValue({
      pubmedQuery: "augmented pubmed",
      semanticScholarQuery: "augmented s2",
      openAlexQuery: "augmented oa",
    });

    // New module defaults
    mockEnrichStudyTypes.mockReturnValue(0);
    mockQualityRank.mockImplementation(
      (results: unknown[]) => results,
    );
    mockExpandQueryForDomain.mockReturnValue({
      original: "test",
      supplementary: null,
      expansions: [],
    });
  });

  it("returns results for a valid query", async () => {
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toBeDefined();
    expect(body.total).toBeGreaterThanOrEqual(0);
  });

  it("returns 400 when query is missing", async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/query/i);
  });

  it("returns 400 when query exceeds 500 characters", async () => {
    const res = await GET(makeRequest({ q: "a".repeat(501) }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/500/);
  });

  it("passes pagination params through", async () => {
    const res = await GET(makeRequest({ q: "cancer", page: "1", perPage: "10" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.page).toBe(1);
    expect(body.perPage).toBe(10);
  });

  it("returns 401 when auth fails", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));
    const res = await GET(makeRequest({ q: "test" }));
    expect(res.status).toBe(401);
  });

  // ── Slice 1: enrichStudyTypes() ──────────────────────────────────

  it("calls enrichStudyTypes on fused results before evidence assignment", async () => {
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    expect(res.status).toBe(200);
    expect(mockEnrichStudyTypes).toHaveBeenCalledTimes(1);
    // Should be called with the fused results array
    expect(mockEnrichStudyTypes).toHaveBeenCalledWith(expect.any(Array));
  });

  it("degrades gracefully when enrichStudyTypes throws", async () => {
    mockEnrichStudyTypes.mockImplementation(() => {
      throw new Error("detector crash");
    });
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toBeDefined();
  });

  // ── Slice 2: qualityRank() ───────────────────────────────────────

  it("calls qualityRank with fused results and query string", async () => {
    const query = "diabetes treatment review";
    const res = await GET(makeRequest({ q: query }));
    expect(res.status).toBe(200);
    expect(mockQualityRank).toHaveBeenCalledTimes(1);
    expect(mockQualityRank).toHaveBeenCalledWith(expect.any(Array), query);
  });

  it("degrades gracefully when qualityRank throws", async () => {
    mockQualityRank.mockImplementation(() => {
      throw new Error("ranker crash");
    });
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toBeDefined();
  });

  // ── Slice 3: expandQueryForDomain() ──────────────────────────────

  it("calls expandQueryForDomain with query and domain config", async () => {
    const res = await GET(makeRequest({ q: "SGLT2 inhibitors heart failure" }));
    expect(res.status).toBe(200);
    expect(mockExpandQueryForDomain).toHaveBeenCalledTimes(1);
    expect(mockExpandQueryForDomain).toHaveBeenCalledWith(
      "SGLT2 inhibitors heart failure",
      expect.objectContaining({ sources: expect.any(Array) }),
    );
  });

  it("fires supplementary PubMed search when expansion returns supplementary query", async () => {
    mockExpandQueryForDomain.mockReturnValue({
      original: "SGLT2 inhibitors heart failure",
      supplementary: "(empagliflozin OR dapagliflozin) AND (sglt2 heart failure)",
      expansions: [{ term: "SGLT2 inhibitors", synonyms: ["empagliflozin", "dapagliflozin"] }],
    });
    const res = await GET(makeRequest({ q: "SGLT2 inhibitors heart failure" }));
    expect(res.status).toBe(200);
    // PubMed should have been called twice: once for original, once for supplementary
    expect(mockSearchPubMed).toHaveBeenCalledTimes(2);
  });

  it("does not fire supplementary search when expansion returns null", async () => {
    mockExpandQueryForDomain.mockReturnValue({
      original: "test query",
      supplementary: null,
      expansions: [],
    });
    const res = await GET(makeRequest({ q: "some generic query without drugs" }));
    expect(res.status).toBe(200);
    // PubMed should only be called once (original query)
    expect(mockSearchPubMed).toHaveBeenCalledTimes(1);
  });

  it("degrades gracefully when expandQueryForDomain throws", async () => {
    mockExpandQueryForDomain.mockImplementation(() => {
      throw new Error("expander crash");
    });
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toBeDefined();
  });
});
