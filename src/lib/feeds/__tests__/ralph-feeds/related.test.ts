import { describe, it, expect, vi, beforeEach } from "vitest";
import { existsSync, readFileSync } from "fs";

const mockGetSemanticScholarPaper = vi.fn();
const mockSearchSemanticScholar = vi.fn();
const mockGetRecommendationsForPaper = vi.fn();
const mockSearchPubMed = vi.fn();

vi.mock("@/lib/search/sources/semantic-scholar", () => ({
  getSemanticScholarPaper: (...args: unknown[]) =>
    mockGetSemanticScholarPaper(...args),
  searchSemanticScholar: (...args: unknown[]) =>
    mockSearchSemanticScholar(...args),
}));

vi.mock("@/lib/search/sources/s2-recommendations", () => ({
  getRecommendationsForPaper: (...args: unknown[]) =>
    mockGetRecommendationsForPaper(...args),
}));

vi.mock("@/lib/search/sources/pubmed", () => ({
  searchPubMed: (...args: unknown[]) => mockSearchPubMed(...args),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
  },
}));

beforeEach(() => {
  mockGetSemanticScholarPaper.mockReset();
  mockSearchSemanticScholar.mockReset();
  mockGetRecommendationsForPaper.mockReset();
  mockSearchPubMed.mockReset();

  mockSearchSemanticScholar.mockResolvedValue({ results: [], total: 0 });
  mockSearchPubMed.mockResolvedValue({ results: [], total: 0 });
});

describe("JF-940: findRelatedPapers", () => {
  it("function exists", async () => {
    const mod = await import("@/lib/feeds/related-papers");
    expect(typeof mod.findRelatedPapers).toBe("function");
  });

  it("returns S2 recommendations when a DOI resolves to a paper", async () => {
    mockGetSemanticScholarPaper.mockResolvedValueOnce({
      title: "Index paper",
      s2Id: "abc123",
    });
    mockGetRecommendationsForPaper.mockResolvedValueOnce([
      {
        title: "Related 1",
        authors: ["A B"],
        journal: "J1",
        year: 2025,
        doi: "10.2/rel1",
        citationCount: 50,
        publicationTypes: [],
        isOpenAccess: false,
      },
    ]);

    const { findRelatedPapers } = await import("@/lib/feeds/related-papers");
    const result = await findRelatedPapers({
      title: "Test Article",
      doi: "10.1/test",
      pubmedId: null,
    });

    expect(result.papers).toHaveLength(1);
    expect(result.source).toBe("s2_recommendations");
  });

  it("falls back to PubMed when no DOI lookup path succeeds", async () => {
    mockSearchPubMed.mockResolvedValueOnce({
      results: [
        {
          title: "PubMed Related",
          authors: ["E F"],
          journal: "J3",
          year: 2025,
          pmid: "111",
          abstract: "Abstract",
          citationCount: 0,
          publicationTypes: [],
          isOpenAccess: false,
        },
      ],
      total: 1,
    });

    const { findRelatedPapers } = await import("@/lib/feeds/related-papers");
    const result = await findRelatedPapers({
      title: "Some Topic",
      doi: null,
      pubmedId: null,
    });

    expect(result.papers.length).toBeGreaterThan(0);
    expect(result.source).toBe("pubmed_search");
  });

  it("never throws and returns an empty result on total failure", async () => {
    mockGetSemanticScholarPaper.mockRejectedValueOnce(new Error("fail"));
    mockSearchSemanticScholar.mockRejectedValueOnce(new Error("fail"));
    mockSearchPubMed.mockRejectedValueOnce(new Error("fail"));

    const { findRelatedPapers } = await import("@/lib/feeds/related-papers");
    const result = await findRelatedPapers({
      title: "X",
      doi: "10.1/x",
      pubmedId: null,
    });

    expect(result.papers).toEqual([]);
  });

  it("excludes the source article from recommendations by DOI", async () => {
    mockGetSemanticScholarPaper.mockResolvedValueOnce({
      title: "Index paper",
      s2Id: "abc123",
    });
    mockGetRecommendationsForPaper.mockResolvedValueOnce([
      {
        title: "Original",
        authors: ["A B"],
        journal: "J1",
        year: 2025,
        doi: "10.2/rel1",
        citationCount: 50,
        publicationTypes: [],
        isOpenAccess: false,
      },
      {
        title: "Different paper",
        authors: ["C D"],
        journal: "J2",
        year: 2024,
        doi: "10.2/rel2",
        citationCount: 30,
        publicationTypes: [],
        isOpenAccess: false,
      },
    ]);

    const { findRelatedPapers } = await import("@/lib/feeds/related-papers");
    const result = await findRelatedPapers({
      title: "Original",
      doi: "10.2/rel1",
      pubmedId: null,
    });

    expect(result.papers).toHaveLength(1);
    expect(result.papers[0].doi).toBe("10.2/rel2");
  });
});

describe("JF-941: Related papers route", () => {
  it("route exists", () => {
    const path = "src/app/api/feeds/articles/[id]/related/route.ts";
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, "utf-8")).toContain("findRelatedPapers");
  });
});

describe("JF-942: Related papers component", () => {
  it("component exists", () => {
    expect(existsSync("src/components/feeds/related-papers.tsx")).toBe(true);
  });

  it("article-reader includes related papers", () => {
    expect(
      readFileSync("src/components/feeds/article-reader.tsx", "utf-8")
    ).toContain("RelatedPapers");
  });
});
