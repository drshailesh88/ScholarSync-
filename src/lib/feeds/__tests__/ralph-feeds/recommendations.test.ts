/**
 * RALPH Journal Feed — Sprint 17: Smart Recommendations Tests
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync, existsSync } from "fs";

// ── Mocks ───────────────────────────────────────────────────────────

const mockGetS2Paper = vi.fn();
const mockGetRecs = vi.fn();
const mockSearchPubMed = vi.fn();

vi.mock("@/lib/search/sources/semantic-scholar", () => ({
  getSemanticScholarPaper: (...args: unknown[]) => mockGetS2Paper(...args),
}));

vi.mock("@/lib/search/sources/s2-recommendations", () => ({
  getRecommendationsForPaper: (...args: unknown[]) => mockGetRecs(...args),
}));

vi.mock("@/lib/search/sources/pubmed", () => ({
  searchPubMed: (...args: unknown[]) => mockSearchPubMed(...args),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
  },
}));

const { findRelatedPapers } = await import("@/lib/feeds/find-related");

// ── Setup ───────────────────────────────────────────────────────────

beforeEach(() => {
  mockGetS2Paper.mockReset();
  mockGetRecs.mockReset();
  mockSearchPubMed.mockReset();
});

const MOCK_S2_RESULT = {
  title: "Related Trial",
  authors: ["Author A", "Author B"],
  journal: "Test Journal",
  year: 2025,
  doi: "10.9999/related",
  pmid: "11111111",
  s2Id: "s2-related-001",
  citationCount: 50,
  isOpenAccess: false,
  publicationTypes: [],
};

// =====================================================================
// JF-800: findRelatedPapers — S2 path with DOI
// =====================================================================
describe("JF-800: S2 recommendations via DOI", () => {
  it("resolves DOI to S2 ID then gets recommendations", async () => {
    mockGetS2Paper.mockResolvedValueOnce({
      s2Id: "s2-paper-123",
      title: "Test Paper",
    });
    mockGetRecs.mockResolvedValueOnce([MOCK_S2_RESULT]);

    const result = await findRelatedPapers({
      title: "Original Paper",
      doi: "10.1056/NEJMoa2204233",
      pubmedId: "36995890",
    });

    expect(result.source).toBe("semantic_scholar");
    expect(result.papers).toHaveLength(1);
    expect(result.papers[0].title).toBe("Related Trial");

    // Verify DOI was passed in correct format
    expect(mockGetS2Paper).toHaveBeenCalledWith("DOI:10.1056/NEJMoa2204233");
    expect(mockGetRecs).toHaveBeenCalledWith("s2-paper-123", 8, "Test Paper");
  });
});

// =====================================================================
// JF-801: S2 via PMID fallback
// =====================================================================
describe("JF-801: S2 recommendations via PMID", () => {
  it("tries PMID when DOI lookup fails", async () => {
    // DOI lookup fails
    mockGetS2Paper
      .mockResolvedValueOnce(null) // DOI returns null
      .mockResolvedValueOnce({ s2Id: "s2-pmid-456", title: "Test" }); // PMID works
    mockGetRecs.mockResolvedValueOnce([MOCK_S2_RESULT]);

    const result = await findRelatedPapers({
      title: "Original Paper",
      doi: "10.invalid/doi",
      pubmedId: "36995890",
    });

    expect(result.source).toBe("semantic_scholar");
    expect(mockGetS2Paper).toHaveBeenCalledWith("PMID:36995890");
  });
});

// =====================================================================
// JF-802: PubMed fallback when S2 fails completely
// =====================================================================
describe("JF-802: PubMed fallback", () => {
  it("falls back to PubMed when S2 returns no results", async () => {
    mockGetS2Paper.mockResolvedValue(null); // Both DOI and PMID fail
    mockSearchPubMed.mockResolvedValueOnce({
      results: [
        { ...MOCK_S2_RESULT, pmid: "22222222", doi: "10.9999/fallback" },
      ],
      total: 1,
    });

    const result = await findRelatedPapers({
      title: "Original Paper",
      doi: "10.1056/test",
      pubmedId: "36995890",
    });

    expect(result.source).toBe("pubmed_fallback");
    expect(result.papers.length).toBeGreaterThan(0);
  });
});

// =====================================================================
// JF-803: Article without DOI goes straight to PMID or PubMed
// =====================================================================
describe("JF-803: No DOI article", () => {
  it("skips S2 DOI path and tries PMID directly", async () => {
    mockGetS2Paper.mockResolvedValueOnce({
      s2Id: "s2-pmid-789",
      title: "Test",
    });
    mockGetRecs.mockResolvedValueOnce([MOCK_S2_RESULT]);

    const result = await findRelatedPapers({
      title: "No DOI Paper",
      doi: null,
      pubmedId: "55555555",
    });

    expect(result.source).toBe("semantic_scholar");
    // Should NOT have called with DOI prefix
    expect(mockGetS2Paper).not.toHaveBeenCalledWith(
      expect.stringContaining("DOI:")
    );
    expect(mockGetS2Paper).toHaveBeenCalledWith("PMID:55555555");
  });
});

// =====================================================================
// JF-804: Never throws — returns empty on total failure
// =====================================================================
describe("JF-804: Crash resistance", () => {
  it("returns empty array when all sources fail", async () => {
    mockGetS2Paper.mockRejectedValue(new Error("S2 down"));
    mockSearchPubMed.mockRejectedValueOnce(new Error("PubMed down"));

    const result = await findRelatedPapers({
      title: "Some Paper",
      doi: "10.1234/test",
      pubmedId: "12345678",
    });

    expect(result.papers).toEqual([]);
    expect(result.source).toBe("pubmed_fallback");
    expect(result.sourceMessage).toContain("Could not find");
  });
});

// =====================================================================
// JF-805: Self-exclusion in PubMed fallback
// =====================================================================
describe("JF-805: Self-exclusion", () => {
  it("excludes the original article from PubMed results by DOI", async () => {
    mockGetS2Paper.mockResolvedValue(null);
    mockSearchPubMed.mockResolvedValueOnce({
      results: [
        { ...MOCK_S2_RESULT, doi: "10.1056/SELF", pmid: "36995890" }, // Self
        {
          ...MOCK_S2_RESULT,
          doi: "10.9999/other",
          pmid: "99999999",
          title: "Other Paper",
        }, // Not self
      ],
      total: 2,
    });

    const result = await findRelatedPapers({
      title: "Original Paper",
      doi: "10.1056/SELF",
      pubmedId: "36995890",
    });

    expect(result.papers).toHaveLength(1);
    expect(result.papers[0].title).toBe("Other Paper");
  });
});

// =====================================================================
// JF-806: Respects limit parameter
// =====================================================================
describe("JF-806: Limit parameter", () => {
  it("passes limit to S2 recommendations", async () => {
    mockGetS2Paper.mockResolvedValueOnce({ s2Id: "s2-123", title: "T" });
    mockGetRecs.mockResolvedValueOnce([]);

    await findRelatedPapers(
      { title: "T", doi: "10.1234/t", pubmedId: null },
      5
    );

    expect(mockGetRecs).toHaveBeenCalledWith("s2-123", 5, "T");
  });
});

// =====================================================================
// JF-807: API route exists
// =====================================================================
describe("JF-807: API route", () => {
  it("copilot/related route exists with POST handler", () => {
    expect(
      existsSync("src/app/api/feeds/copilot/related/route.ts")
    ).toBe(true);
    const content = readFileSync(
      "src/app/api/feeds/copilot/related/route.ts",
      "utf-8"
    );
    expect(content).toContain("export async function POST");
    expect(content).toContain("findRelatedPapers");
    expect(content).toContain("checkRateLimit");
  });
});

// =====================================================================
// JF-808: Store has related papers state
// =====================================================================
describe("JF-808: Store extension", () => {
  it("store has findRelatedPapers action", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("findRelatedPapers");
    expect(content).toContain("relatedPapers");
    expect(content).toContain("relatedPapersLoading");
  });
});

// =====================================================================
// JF-809: Copilot panel has Related button
// =====================================================================
describe("JF-809: UI integration", () => {
  it("copilot panel has Find Related button", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toMatch(/Related|findRelatedPapers/);
  });
});

// =====================================================================
// JF-810: Function signature and return type
// =====================================================================
describe("JF-810: Function contract", () => {
  it("findRelatedPapers is exported", async () => {
    const mod = await import("@/lib/feeds/find-related");
    expect(typeof mod.findRelatedPapers).toBe("function");
  });

  it("returns RelatedPapersResult shape", async () => {
    mockGetS2Paper.mockResolvedValueOnce({ s2Id: "s2-123", title: "T" });
    mockGetRecs.mockResolvedValueOnce([MOCK_S2_RESULT]);

    const result = await findRelatedPapers({
      title: "T",
      doi: "10.1234/t",
      pubmedId: null,
    });

    expect(result).toHaveProperty("papers");
    expect(result).toHaveProperty("source");
    expect(result).toHaveProperty("sourceMessage");
    expect(Array.isArray(result.papers)).toBe(true);
  });
});
