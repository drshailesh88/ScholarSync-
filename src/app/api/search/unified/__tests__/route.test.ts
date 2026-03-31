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
const mockSearchSearXNG = vi.hoisted(() => vi.fn());
const mockReciprocalRankFusion = vi.hoisted(() => vi.fn());
const mockRerankResults = vi.hoisted(() => vi.fn());
const mockAugmentQuery = vi.hoisted(() => vi.fn());
const mockEnrichStudyTypes = vi.hoisted(() => vi.fn());
const mockQualityRank = vi.hoisted(() => vi.fn());
const mockExpandQueryForDomain = vi.hoisted(() => vi.fn());
const mockGetDomainPreferences = vi.hoisted(() => vi.fn());

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

vi.mock("@/lib/search/sources/searxng", () => ({
  searchSearXNG: mockSearchSearXNG,
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

vi.mock("@/lib/actions/domain-preferences", () => ({
  getDomainPreferences: mockGetDomainPreferences,
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
    mockSearchSearXNG.mockResolvedValue({
      results: [
        {
          title: "Climate change",
          authors: [],
          journal: "NOAA",
          year: 2025,
          abstract: "Example result",
          citationCount: 0,
          publicationTypes: ["web"],
          isOpenAccess: false,
          sources: ["web"],
        },
      ],
      total: 1,
      degraded: false,
    });

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
    mockGetDomainPreferences.mockResolvedValue([]);
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

  it("keeps academic search as the default tab", async () => {
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));

    expect(res.status).toBe(200);
    expect(mockSearchSearXNG).not.toHaveBeenCalled();
    expect(mockSearchPubMed).toHaveBeenCalled();
  });

  it("routes the web tab through SearXNG general search", async () => {
    const res = await GET(makeRequest({ q: "climate change", tab: "web" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockSearchSearXNG).toHaveBeenCalledWith("climate change", {
      category: "general",
      limit: 20,
    });
    expect(mockSearchPubMed).not.toHaveBeenCalled();
    expect(body.results).toHaveLength(1);
    expect(body.sourceCounts).toEqual({ web: 1 });
    expect(body.searxngUnavailable).toBe(false);
  });

  it("requests enough SearXNG results to paginate page 2 and slices in the route", async () => {
    mockSearchSearXNG.mockResolvedValueOnce({
      results: Array.from({ length: 40 }, (_, index) => ({
        title: `Result ${index + 1}`,
        authors: [],
        journal: "Example",
        year: 2025,
        abstract: `Snippet ${index + 1}`,
        citationCount: 0,
        publicationTypes: ["web"],
        isOpenAccess: false,
        sources: ["web"],
      })),
      total: 57,
      degraded: false,
    });

    const res = await GET(
      makeRequest({ q: "climate change", tab: "web", page: "1", perPage: "20" })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockSearchSearXNG).toHaveBeenCalledWith("climate change", {
      category: "general",
      limit: 40,
    });
    expect(body.results).toHaveLength(20);
    expect(body.results[0].title).toBe("Result 21");
    expect(body.total).toBe(57);
    expect(body.hasMore).toBe(true);
    expect(body.sourceCounts).toEqual({ web: 57 });
  });

  it("routes the discussions tab through SearXNG social-media search", async () => {
    const res = await GET(
      makeRequest({ q: "climate change", tab: "discussions" })
    );

    expect(res.status).toBe(200);
    expect(mockSearchSearXNG).toHaveBeenCalledWith("climate change", {
      category: "social media",
      limit: 20,
    });
  });

  it("returns empty results with a degradation flag when SearXNG is unavailable", async () => {
    mockSearchSearXNG.mockResolvedValueOnce({
      results: [],
      total: 0,
      degraded: true,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toEqual([]);
    expect(body.total).toBe(0);
    expect(body.searxngUnavailable).toBe(true);
    expect(body.sourceCounts).toEqual({ news: 0 });
  });

  it("adds trust tiers to web results", async () => {
    mockSearchSearXNG.mockResolvedValueOnce({
      results: [
        {
          title: "Reuters climate report",
          authors: [],
          journal: "Reuters",
          year: 2026,
          abstract: "Climate coverage",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: "https://www.reuters.com/world/climate",
          domain: "reuters.com",
        },
      ],
      total: 1,
      degraded: false,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results[0].trustTier).toBe("major_journalism");
  });

  it("filters muted domains from non-academic search results", async () => {
    mockGetDomainPreferences.mockResolvedValueOnce([
      {
        domain: "reddit.com",
        level: "mute",
      },
    ]);
    mockSearchSearXNG.mockResolvedValueOnce({
      results: [
        {
          title: "Keep me",
          authors: [],
          journal: "Reuters",
          year: 2026,
          abstract: "Visible result",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: "https://www.reuters.com/world/climate",
          domain: "reuters.com",
        },
        {
          title: "Hide me",
          authors: [],
          journal: "Reddit",
          year: 2026,
          abstract: "Muted result",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: "https://www.reddit.com/r/science/comments/1",
          domain: "reddit.com",
        },
      ],
      total: 2,
      degraded: false,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.total).toBe(2);
    expect(body.hasMore).toBe(false);
    expect(body.results).toHaveLength(1);
    expect(body.results[0].domain).toBe("reuters.com");
  });

  it("boosts preferred domains ahead of neutral results", async () => {
    mockGetDomainPreferences.mockResolvedValueOnce([
      {
        domain: "reuters.com",
        level: "prefer",
      },
    ]);
    mockSearchSearXNG.mockResolvedValueOnce({
      results: [
        {
          title: "Neutral result",
          authors: [],
          journal: "Example",
          year: 2026,
          abstract: "Neutral",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: "https://example.com/story",
          domain: "example.com",
        },
        {
          title: "Preferred result",
          authors: [],
          journal: "Reuters",
          year: 2026,
          abstract: "Preferred",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: "https://www.reuters.com/world/climate",
          domain: "reuters.com",
        },
      ],
      total: 2,
      degraded: false,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results[0].domain).toBe("reuters.com");
    expect(body.results[1].domain).toBe("example.com");
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
