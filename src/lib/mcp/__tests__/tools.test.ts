import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";
import type { LiteraturePaper } from "@/lib/search/run-search";

vi.mock("@/lib/search/run-search", async (importActual) => {
  const actual = await importActual<typeof import("@/lib/search/run-search")>();
  return {
    ...actual,
    runLiteratureSearch: vi.fn(),
    fetchPaperById: vi.fn(),
  };
});

import { runLiteratureSearch, fetchPaperById } from "@/lib/search/run-search";
import {
  searchPapers,
  fetchPaper,
  getSearchCapabilities,
  searchPapersInputSchema,
  toMcpPaper,
} from "../tools";

const mockedRun = vi.mocked(runLiteratureSearch);
const mockedFetch = vi.mocked(fetchPaperById);

function makePaper(overrides: Partial<LiteraturePaper> = {}): LiteraturePaper {
  return {
    title: "TAVR in low-risk patients: six-year outcomes",
    authors: ["Forrest JK", "Deeb GM"],
    journal: "J Am Coll Cardiol",
    year: 2026,
    abstract: "Background: long-term outcomes ... ".repeat(30),
    tldr: "Six-year outcomes favor TAVR.",
    doi: "10.1016/j.jacc.2026.02.5063",
    pmid: "40000000",
    citationCount: 12,
    publicationTypes: ["Randomized Controlled Trial"],
    isOpenAccess: false,
    sources: ["pubmed", "semantic_scholar"],
    rrfScore: 0.0321,
    evidenceLevel: "I",
    studyType: "rct",
    id: "pm_40000000",
    studyTypeEnum: "rct",
    verificationStatus: "pending",
    source: "both",
    inLibrary: false,
    url: undefined,
    ...overrides,
  };
}

describe("search_papers tool", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedRun.mockResolvedValue({
      results: [makePaper()],
      total: 1,
      page: 0,
      perPage: 10,
      hasMore: false,
      sourceCounts: { pubmed: 1, semantic_scholar: 1 },
    });
  });

  it("returns structured papers with the documented fields", async () => {
    const out = await searchPapers({ query: "TAVR low risk six year outcomes" });
    expect(out.count).toBe(1);
    const p = out.results[0];
    expect(p.title).toContain("TAVR");
    expect(p.authors).toEqual(["Forrest JK", "Deeb GM"]);
    expect(p.year).toBe(2026);
    expect(p.journal).toBe("J Am Coll Cardiol");
    expect(p.doi).toBe("10.1016/j.jacc.2026.02.5063");
    expect(p.pmid).toBe("40000000");
    expect(p.source).toBe("both");
    expect(p.studyType).toBe("rct");
    expect(p.evidenceLevel).toBe("I");
    expect(p.relevanceScore).toBeCloseTo(0.0321);
    // url derived from pmid when absent
    expect(p.url).toBe("https://pubmed.ncbi.nlm.nih.gov/40000000/");
  });

  it("clamps maxResults to the hard ceiling of 50", async () => {
    await searchPapers({ query: "x", maxResults: 1000 });
    expect(mockedRun).toHaveBeenCalledWith(
      expect.objectContaining({ perPage: 50 })
    );
  });

  it("omits the abstract when includeAbstract is false but keeps a snippet", async () => {
    const out = await searchPapers({ query: "x", includeAbstract: false });
    expect(out.results[0].abstract).toBeUndefined();
    expect(out.results[0].snippet).toBe("Six-year outcomes favor TAVR.");
  });

  it("forwards sources and year filters to the search backend", async () => {
    await searchPapers({
      query: "x",
      sources: ["openalex"],
      yearFrom: 2020,
      yearTo: 2026,
    });
    expect(mockedRun).toHaveBeenCalledWith(
      expect.objectContaining({ sources: ["openalex"], yearFrom: 2020, yearTo: 2026 })
    );
  });
});

describe("search_papers input schema", () => {
  const schema = z.object(searchPapersInputSchema);

  it("requires a non-empty query and applies defaults", () => {
    const parsed = schema.parse({ query: "diabetes" });
    expect(parsed.maxResults).toBe(10);
    expect(parsed.includeAbstract).toBe(true);
  });

  it("rejects an empty query", () => {
    expect(() => schema.parse({ query: "" })).toThrow();
  });

  it("rejects maxResults above 50", () => {
    expect(() => schema.parse({ query: "x", maxResults: 51 })).toThrow();
  });

  it("rejects unknown sources", () => {
    expect(() => schema.parse({ query: "x", sources: ["scopus"] })).toThrow();
  });
});

describe("fetch_paper tool", () => {
  beforeEach(() => vi.clearAllMocks());

  it("errors when no identifier is supplied", async () => {
    const out = await fetchPaper({});
    expect(out.found).toBe(false);
    expect(out.error).toMatch(/doi, pmid, id/);
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("returns a not-found result when the backend has nothing", async () => {
    mockedFetch.mockResolvedValue(null);
    const out = await fetchPaper({ doi: "10.0/none" });
    expect(out.found).toBe(false);
  });

  it("returns the mapped paper when found", async () => {
    mockedFetch.mockResolvedValue(makePaper());
    const out = await fetchPaper({ pmid: "40000000" });
    expect(out.found).toBe(true);
    expect(out.paper?.doi).toBe("10.1016/j.jacc.2026.02.5063");
  });
});

describe("get_search_capabilities tool", () => {
  it("describes sources, limits and output fields", () => {
    const caps = getSearchCapabilities();
    expect(caps.sources.map((s) => s.id)).toEqual([
      "pubmed",
      "semantic_scholar",
      "openalex",
    ]);
    expect(caps.limits.maxResults).toBe(50);
    expect(caps.outputFields).toContain("doi");
    expect(caps.outputFields).toContain("evidenceLevel");
    // default sources flagged correctly
    const defaults = caps.sources.filter((s) => s.default).map((s) => s.id);
    expect(defaults).toEqual(["pubmed", "semantic_scholar"]);
  });
});

describe("toMcpPaper", () => {
  it("prefers an explicit url over a derived one", () => {
    const mapped = toMcpPaper(makePaper({ url: "https://example.org/paper" }), {
      includeAbstract: true,
    });
    expect(mapped.url).toBe("https://example.org/paper");
  });
});
