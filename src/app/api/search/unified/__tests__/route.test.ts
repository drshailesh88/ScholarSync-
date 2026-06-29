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
const mockFederateNonAcademic = vi.hoisted(() => vi.fn());
const mockReciprocalRankFusion = vi.hoisted(() => vi.fn());
const mockRerankResults = vi.hoisted(() => vi.fn());
const mockAugmentQuery = vi.hoisted(() => vi.fn());
const mockEnrichStudyTypes = vi.hoisted(() => vi.fn());
const mockQualityRank = vi.hoisted(() => vi.fn());
const mockExpandQueryForDomain = vi.hoisted(() => vi.fn());
const mockGetDomainPreferences = vi.hoisted(() => vi.fn());
const mockGetUserScopes = vi.hoisted(() => vi.fn());

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

vi.mock("@/lib/search/web/federate", () => ({
  federateNonAcademic: mockFederateNonAcademic,
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

vi.mock("@/lib/actions/scopes", () => ({
  getUserScopes: mockGetUserScopes,
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

    mockFederateNonAcademic.mockResolvedValue({
      results: [
        {
          title: "Peer review reform megathread",
          authors: [],
          journal: "r/AskAcademia",
          year: 2025,
          abstract: "Community discussion",
          citationCount: 0,
          publicationTypes: ["discussions"],
          isOpenAccess: false,
          sources: ["discussions"],
          url: "https://www.reddit.com/r/AskAcademia/comments/abc/thread/",
          domain: "reddit.com",
        },
      ],
      perSource: [],
      perSourceRows: [],
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
    mockGetUserScopes.mockResolvedValue([]);
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

  it("routes the web tab through the multi-source federation, not SearXNG directly", async () => {
    const res = await GET(makeRequest({ q: "climate change", tab: "web" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      "climate change",
      "web",
      expect.objectContaining({ limit: 100 })
    );
    expect(mockSearchSearXNG).not.toHaveBeenCalled();
    expect(mockSearchPubMed).not.toHaveBeenCalled();
    expect(body.results).toHaveLength(1);
    expect(body.sourceCounts).toEqual({ web: 1 });
    expect(body.searxngUnavailable).toBe(false);
  });

  it("fetches the full federation pool once and slices it to serve page 2", async () => {
    mockFederateNonAcademic.mockResolvedValueOnce({
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
        url: `https://example.com/result-${index + 1}`,
        domain: "example.com",
      })),
      perSource: [],
      perSourceRows: [],
      degraded: false,
    });

    const res = await GET(
      makeRequest({ q: "climate change", tab: "web", page: "1", perPage: "20" })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    // Federated path calls federateNonAcademic once with limit: 100 — no incremental re-fetch.
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      "climate change",
      "web",
      expect.objectContaining({ limit: 100 })
    );
    expect(mockFederateNonAcademic).toHaveBeenCalledTimes(1);
    expect(body.results).toHaveLength(20);
    expect(body.results[0].title).toBe("Result 21");
    // total = diversified.length (fused pool size after preference/diversity pass), not upstream total
    expect(body.total).toBe(40);
    expect(body.hasMore).toBe(false);
    expect(body.sourceCounts).toEqual({ web: 40 });
  });

  it("routes the discussions tab through the multi-source federation, not SearXNG", async () => {
    const res = await GET(
      makeRequest({ q: "climate change", tab: "discussions" })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      "climate change",
      "discussions",
      expect.objectContaining({ limit: 100 })
    );
    // Discussions no longer routes through SearXNG social-media (federation owns it).
    expect(mockSearchSearXNG).not.toHaveBeenCalled();
    expect(body.results[0].domain).toBe("reddit.com");
    expect(body.sourceCounts).toEqual({ discussions: 1 });
  });

  it("surfaces federation degradation as searxngUnavailable on the discussions tab", async () => {
    mockFederateNonAcademic.mockResolvedValueOnce({
      results: [],
      perSource: [],
      perSourceRows: [],
      degraded: true,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "discussions" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toEqual([]);
    expect(body.searxngUnavailable).toBe(true);
  });

  it("surfaces federation degradation as searxngUnavailable on the news tab", async () => {
    mockFederateNonAcademic.mockResolvedValueOnce({
      results: [],
      perSource: [],
      perSourceRows: [],
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
    mockFederateNonAcademic.mockResolvedValueOnce({
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
      perSource: [],
      perSourceRows: [],
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
    mockFederateNonAcademic.mockResolvedValueOnce({
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
      perSource: [],
      perSourceRows: [],
      degraded: false,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    // The federated path filters muted domains before computing total (total = diversified pool
    // size after preference filtering), so the muted reddit.com result is excluded from both
    // the results and the total count.
    expect(body.total).toBe(1);
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
    mockFederateNonAcademic.mockResolvedValueOnce({
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
      perSource: [],
      perSourceRows: [],
      degraded: false,
    });

    const res = await GET(makeRequest({ q: "climate change", tab: "news" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results[0].domain).toBe("reuters.com");
    expect(body.results[1].domain).toBe("example.com");
  });

  it("federated pool is filtered by muted domains and paged correctly on a later page", async () => {
    mockGetDomainPreferences.mockResolvedValueOnce([
      {
        domain: "reddit.com",
        level: "mute",
      },
    ]);
    // The federation returns a single pool — 45 muted + 35 visible = 80 items total.
    // After muted-domain filtering, 35 visible items remain. Page 1, perPage 10 slices
    // items 11-20 of the visible set (hasMore = 35 > 20 = true).
    mockFederateNonAcademic.mockResolvedValueOnce({
      results: [
        ...Array.from({ length: 45 }, (_, index) => ({
          title: `Muted ${index + 1}`,
          authors: [],
          journal: "Reddit",
          year: 2026,
          abstract: "Muted result",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: `https://www.reddit.com/r/science/comments/${index + 1}`,
          domain: "reddit.com",
        })),
        ...Array.from({ length: 35 }, (_, index) => ({
          title: `Visible ${index + 1}`,
          authors: [],
          journal: "Reuters",
          year: 2026,
          abstract: "Visible result",
          citationCount: 0,
          publicationTypes: ["news"],
          isOpenAccess: false,
          sources: ["news"],
          url: `https://www.reuters.com/world/climate-${index + 1}`,
          domain: "reuters.com",
        })),
      ],
      perSource: [],
      perSourceRows: [],
      degraded: false,
    });

    const res = await GET(
      makeRequest({ q: "climate change", tab: "news", page: "1", perPage: "10" })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    // Federated path fetches once, no incremental re-fetch loop.
    expect(mockFederateNonAcademic).toHaveBeenCalledTimes(1);
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      "climate change",
      "news",
      expect.objectContaining({ limit: 100 })
    );
    expect(body.results).toHaveLength(10);
    expect(body.results[0].title).toBe("Visible 11");
    expect(body.results[9].title).toBe("Visible 20");
    // total = diversified pool size after muted-domain filter (35 visible remain)
    expect(body.total).toBe(35);
    expect(body.hasMore).toBe(true);
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

  // ── Phase 4: Filter pills + Scope constraints ────────────────────

  it("passes timeRange to the federation for non-academic tabs", async () => {
    const res = await GET(
      makeRequest({ q: "climate news", tab: "news", timeRange: "week" })
    );
    expect(res.status).toBe(200);
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      "climate news",
      "news",
      expect.objectContaining({ limit: 100, timeRange: "week" })
    );
  });

  it("wraps query in quotes when exactMatch is true", async () => {
    const res = await GET(
      makeRequest({ q: "climate policy", tab: "web", exactMatch: "true" })
    );
    expect(res.status).toBe(200);
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      '"climate policy"',
      "web",
      expect.objectContaining({ limit: 100 })
    );
  });

  it("skips domain preferences when usePreferences is false", async () => {
    mockGetDomainPreferences.mockResolvedValueOnce([
      { domain: "reddit.com", level: "mute", createdAt: null, updatedAt: null },
    ]);
    const res = await GET(
      makeRequest({ q: "test query", tab: "web", usePreferences: "false" })
    );
    expect(res.status).toBe(200);
    // getDomainPreferences should NOT have been called since preferences are disabled
    expect(mockGetDomainPreferences).not.toHaveBeenCalled();
  });

  it("applies scope domain filter on academic results", async () => {
    mockGetUserScopes.mockResolvedValueOnce([
      {
        id: 42,
        name: "Gov Only",
        includedDomains: ["nih.gov"],
        excludedDomains: [],
        includedKeywords: [],
        excludedKeywords: [],
        dateFrom: null,
        dateTo: null,
        region: null,
        isActive: true,
        sortOrder: 0,
        createdAt: null,
        updatedAt: null,
      },
    ]);

    mockReciprocalRankFusion.mockReturnValueOnce([
      { title: "NIH paper", domain: "nih.gov", sources: ["pubmed"] },
      { title: "Harvard paper", domain: "harvard.edu", sources: ["openalex"] },
    ]);

    const res = await GET(
      makeRequest({ q: "heart disease", scopeId: "42" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    // Only the NIH result should survive the scope filter
    expect(body.results).toHaveLength(1);
    expect(body.results[0].title).toBe("NIH paper");
  });

  it("sorts by trust tier when sort=trust", async () => {
    mockReciprocalRankFusion.mockReturnValueOnce([
      { title: "Community post", domain: "reddit.com", trustTier: "community", sources: ["openalex"] },
      { title: "Government report", domain: "nih.gov", trustTier: "government", sources: ["pubmed"] },
      { title: "News article", domain: "reuters.com", trustTier: "major_journalism", sources: ["openalex"] },
    ]);

    const res = await GET(
      makeRequest({ q: "climate change", sort: "trust" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results[0].title).toBe("Government report");
    expect(body.results[1].title).toBe("News article");
    expect(body.results[2].title).toBe("Community post");
  });

  it("rejects invalid timeRange values", async () => {
    const res = await GET(
      makeRequest({ q: "test", tab: "web", timeRange: "invalid" })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/timeRange/i);
  });

  // ── Source status surfacing ──────────────────────────────────────

  it("reports a source that returns results as ok", async () => {
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.sourceStatuses.pubmed).toEqual({ status: "ok" });
  });

  it("surfaces a rejected (timed-out) source as degraded, not a normal zero", async () => {
    mockSearchOpenAlex.mockRejectedValueOnce(
      new Error("OpenAlex timed out after 12000ms")
    );
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.sourceCounts.openalex).toBe(0);
    expect(body.sourceStatuses.openalex.status).toBe("timeout");
  });

  it("surfaces an adapter-reported rate limit instead of zero results", async () => {
    mockSearchSemanticScholar.mockResolvedValueOnce({
      results: [],
      total: 0,
      status: { status: "rate_limited", message: "Rate limited" },
    });
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.sourceStatuses.semantic_scholar.status).toBe("rate_limited");
  });

  it("marks a genuine empty source as ok (true zero)", async () => {
    mockSearchSemanticScholar.mockResolvedValueOnce({
      results: [],
      total: 0,
      status: { status: "ok" },
    });
    const res = await GET(makeRequest({ q: "diabetes treatment review" }));
    const body = await res.json();
    expect(body.sourceStatuses.semantic_scholar).toEqual({ status: "ok" });
  });

  it("retries PubMed with the raw query when the augmented query returns zero", async () => {
    mockAugmentQuery.mockResolvedValueOnce({
      pubmedQuery: "over-constrained MeSH query",
      semanticScholarQuery: "s2",
      openAlexQuery: "oa",
    });
    // First PubMed call (augmented) returns empty; raw fallback returns a hit.
    mockSearchPubMed
      .mockResolvedValueOnce({ results: [], total: 0, status: { status: "ok" } })
      .mockResolvedValueOnce({
        results: [sampleResult],
        total: 1,
        status: { status: "ok" },
      });
    mockReciprocalRankFusion.mockReturnValueOnce([sampleResult]);

    const res = await GET(
      makeRequest({ q: "transcatheter aortic valve six year outcomes" })
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    // augmented call + raw fallback call
    expect(mockSearchPubMed).toHaveBeenCalledWith(
      "transcatheter aortic valve six year outcomes",
      expect.objectContaining({ page: 0 })
    );
    expect(body.sourceCounts.pubmed).toBe(1);
    expect(body.sourceStatuses.pubmed.status).toBe("ok");
  });

  it("strips double quotes from query when exactMatch is true", async () => {
    const res = await GET(
      makeRequest({ q: 'injection "attack" test', tab: "web", exactMatch: "true" })
    );
    expect(res.status).toBe(200);
    // Should strip inner quotes first, then wrap in double quotes to prevent injection
    expect(mockFederateNonAcademic).toHaveBeenCalledWith(
      '"injection attack test"',
      "web",
      expect.objectContaining({ limit: 100 })
    );
  });
});
