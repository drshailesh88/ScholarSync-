/**
 * RALPH Journal Feed — Sprint 5: PubMed Search-as-Feed Tests
 *
 * Tests the createPubMedSearchFeed() function which converts PubMed
 * search queries into live RSS feed URLs.
 *
 * All HTTP calls are mocked — no real PubMed API calls.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock resilientFetch ─────────────────────────────────────────────

const mockFetch = vi.fn();

vi.mock("@/lib/http/resilient-fetch", () => ({
  resilientFetch: (...args: unknown[]) => mockFetch(...args),
}));

// Import AFTER mock setup
const { createPubMedSearchFeed } = await import("@/lib/feeds/pubmed-feed");

// ── Helpers ─────────────────────────────────────────────────────────

function mockESearchResponse(
  webenv: string,
  count: string = "42",
  querykey: string = "1"
): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers({ "content-type": "application/json" }),
    json: () =>
      Promise.resolve({
        esearchresult: {
          count,
          webenv,
          querykey,
          idlist: [],
        },
      }),
    text: () =>
      Promise.resolve(
        JSON.stringify({
          esearchresult: { count, webenv, querykey, idlist: [] },
        })
      ),
  } as unknown as Response;
}

// ── Setup ───────────────────────────────────────────────────────────

beforeEach(() => {
  mockFetch.mockReset();
});

// =====================================================================
// JF-100: Basic PubMed feed creation — simple query
// =====================================================================
describe("JF-100: Basic PubMed feed creation", () => {
  it("returns a feed URL containing erss.cgi", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_abc123def456")
    );

    const result = await createPubMedSearchFeed("SGLT2 inhibitors heart failure");
    expect(result.feedUrl).toContain("erss.cgi");
    expect(result.feedUrl).toContain("rss_guid=");
    expect(result.feedUrl).toContain("MCID_abc123def456");
  });

  it("returns correct title with PubMed prefix", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_abc123def456")
    );

    const result = await createPubMedSearchFeed("SGLT2 inhibitors heart failure");
    expect(result.title).toBe("PubMed: SGLT2 inhibitors heart failure");
  });

  it("returns the original query", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_abc123def456")
    );

    const result = await createPubMedSearchFeed("SGLT2 inhibitors heart failure");
    expect(result.query).toBe("SGLT2 inhibitors heart failure");
  });

  it("returns totalResults from esearch count", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_abc123def456", "1234")
    );

    const result = await createPubMedSearchFeed("SGLT2 inhibitors");
    expect(result.totalResults).toBe(1234);
  });
});

// =====================================================================
// JF-101: Handles complex queries with boolean operators
// =====================================================================
describe("JF-101: Complex query handling", () => {
  it("passes boolean queries to PubMed API correctly", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_complex123")
    );

    const query = "(SGLT2 inhibitors OR dapagliflozin) AND heart failure AND NOT review[pt]";
    const result = await createPubMedSearchFeed(query);

    // Verify the query was sent to the API
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent("(SGLT2 inhibitors OR dapagliflozin)")),
      expect.anything(),
      expect.anything()
    );
    expect(result.feedUrl).toBeTruthy();
  });
});

// =====================================================================
// JF-102: URL-encodes special characters
// =====================================================================
describe("JF-102: URL encoding", () => {
  it("encodes special characters in query", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_encoded123")
    );

    await createPubMedSearchFeed("β-blocker & ACE inhibitor");

    // Verify the fetch URL has encoded the query
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).not.toContain("β-blocker & ACE");
    expect(calledUrl).toContain("term=");
  });
});

// =====================================================================
// JF-103: Returns descriptive title, truncated for long queries
// =====================================================================
describe("JF-103: Title generation", () => {
  it("truncates title for queries over 80 chars", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_long123")
    );

    const longQuery = "A".repeat(100);
    const result = await createPubMedSearchFeed(longQuery);
    expect(result.title.length).toBeLessThanOrEqual(90); // "PubMed: " (8) + 77 + "..." (3) = 88
    expect(result.title).toContain("...");
    expect(result.title.startsWith("PubMed: ")).toBe(true);
  });

  it("does not truncate short queries", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_short123")
    );

    const result = await createPubMedSearchFeed("aspirin");
    expect(result.title).toBe("PubMed: aspirin");
    expect(result.title).not.toContain("...");
  });
});

// =====================================================================
// JF-104: Rejects empty query
// =====================================================================
describe("JF-104: Empty query rejection", () => {
  it("throws on empty string", async () => {
    await expect(createPubMedSearchFeed("")).rejects.toThrow("query is required");
  });

  it("throws on whitespace-only string", async () => {
    await expect(createPubMedSearchFeed("   ")).rejects.toThrow("query is required");
  });

  it("does not call fetch for empty query", async () => {
    try { await createPubMedSearchFeed(""); } catch { /* expected */ }
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// =====================================================================
// JF-105: Rejects query longer than 500 characters
// =====================================================================
describe("JF-105: Query length limit", () => {
  it("throws on query exceeding 500 chars", async () => {
    const longQuery = "A".repeat(501);
    await expect(createPubMedSearchFeed(longQuery)).rejects.toThrow("exceeds 500 characters");
  });

  it("accepts query at exactly 500 chars", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_exact500")
    );

    const query = "A".repeat(500);
    const result = await createPubMedSearchFeed(query);
    expect(result.feedUrl).toBeTruthy();
  });

  it("does not call fetch for over-length query", async () => {
    try { await createPubMedSearchFeed("A".repeat(501)); } catch { /* expected */ }
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// =====================================================================
// JF-106: API failure handling
// =====================================================================
describe("JF-106: API failure handling", () => {
  it("throws descriptive error when PubMed API returns error", async () => {
    mockFetch.mockRejectedValueOnce(
      new Error("[PubMed-RSS] Failed after 2 retries: 503")
    );

    await expect(
      createPubMedSearchFeed("test query")
    ).rejects.toThrow("failed to create search");
  });

  it("throws when response has no WebEnv", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: () => Promise.resolve({
        esearchresult: {
          count: "0",
          webenv: "",
          querykey: "",
          idlist: [],
        },
      }),
    } as unknown as Response);

    await expect(
      createPubMedSearchFeed("nonexistent rare condition")
    ).rejects.toThrow("no WebEnv returned");
  });
});

// =====================================================================
// JF-107: Uses correct E-utilities parameters
// =====================================================================
describe("JF-107: E-utilities API call parameters", () => {
  it("includes usehistory=y in the esearch URL", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_params123")
    );

    await createPubMedSearchFeed("test");

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("usehistory=y");
  });

  it("includes db=pubmed", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_params123")
    );

    await createPubMedSearchFeed("test");

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("db=pubmed");
  });

  it("includes retmode=json", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_params123")
    );

    await createPubMedSearchFeed("test");

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("retmode=json");
  });

  it("includes tool=scholarsync and email", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_params123")
    );

    await createPubMedSearchFeed("test");

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("tool=scholarsync");
    expect(calledUrl).toContain("email=");
  });

  it("passes correct resilientFetch options", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_opts123")
    );

    await createPubMedSearchFeed("test");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.anything(),
      expect.objectContaining({
        service: expect.stringContaining("PubMed"),
        timeout: expect.any(Number),
      })
    );
  });
});

// =====================================================================
// JF-108: Trims whitespace from query
// =====================================================================
describe("JF-108: Query whitespace handling", () => {
  it("trims leading and trailing whitespace", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_trim123")
    );

    const result = await createPubMedSearchFeed("  heart failure  ");
    expect(result.query).toBe("heart failure");
    expect(result.title).toBe("PubMed: heart failure");
  });
});

// =====================================================================
// JF-109: Feed URL is a valid URL
// =====================================================================
describe("JF-109: Feed URL validity", () => {
  it("returns a parseable URL", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_valid123")
    );

    const result = await createPubMedSearchFeed("aspirin");
    // Should not throw
    const url = new URL(result.feedUrl);
    expect(url.hostname).toBe("eutils.ncbi.nlm.nih.gov");
  });

  it("properly encodes the WebEnv in the URL", async () => {
    mockFetch.mockResolvedValueOnce(
      mockESearchResponse("MCID_special+chars/test=value")
    );

    const result = await createPubMedSearchFeed("test");
    // The WebEnv should be URI-encoded in the feed URL
    expect(result.feedUrl).not.toContain(" ");
    // Should still be a valid URL
    expect(() => new URL(result.feedUrl)).not.toThrow();
  });
});
