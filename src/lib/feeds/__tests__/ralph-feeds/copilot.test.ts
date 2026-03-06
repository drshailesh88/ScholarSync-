/**
 * RALPH Journal Feed — Sprint 14: AI Copilot Backend Tests
 *
 * Tests the source resolver, API routes, and store extension.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync, existsSync } from "fs";

// ── Mock external I/O ───────────────────────────────────────────────

vi.mock("@/lib/search/sources/unpaywall", () => ({
  lookupUnpaywall: vi.fn(async () => ({
    doi: "10.1234/test",
    pdfUrl: null,
    isOpenAccess: false,
  })),
}));

vi.mock("@/lib/deep-research/full-text-extractor", () => ({
  downloadAndExtractPdf: vi.fn(async () => null),
  extractKeySecions: vi.fn((text: string) => text),
}));

vi.mock("@/lib/search/sources/pubmed", () => ({
  searchPubMed: vi.fn(async () => ({
    results: [
      {
        title: "Related Paper 1",
        authors: ["Author A"],
        journal: "Test Journal",
        year: 2025,
        abstract: "Related abstract text",
        pmid: "99999999",
        doi: "10.9999/related",
      },
    ],
    total: 1,
  })),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  },
}));

vi.mock("@/lib/db", () => ({
  db: new Proxy(
    {},
    {
      get: () => () =>
        new Proxy(
          {},
          { get: () => () => Promise.resolve([]) }
        ),
    }
  ),
}));

vi.mock("@/lib/db/schema", () => ({
  feedArticles: {},
  userArticleStatus: {},
  papers: {},
  userReferences: {},
}));

// ── Reset mocks between tests ───────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
});

// ── Test data ───────────────────────────────────────────────────────

const ARTICLE_WITH_DOI = {
  title: "Empagliflozin in CKD",
  authors: "Herrington WG, Staplin N",
  abstractSnippet:
    "In this double-blind trial of 6,609 patients with CKD...",
  doi: "10.1056/NEJMoa2204233",
  pubmedId: "36995890",
  journal: "N Engl J Med",
  volume: "388",
  issue: "2",
  publishedAt: "2026-03-01T00:00:00Z",
  link: "https://nejm.org/doi/full/10.1056/NEJMoa2204233",
};

const ARTICLE_NO_ABSTRACT = {
  title: "Novel Gene Therapy Approach",
  authors: "Kim S, Park J",
  abstractSnippet: null,
  doi: "10.1234/gene-therapy",
  pubmedId: null,
  journal: "Gene Therapy",
  volume: "1",
  issue: "1",
  publishedAt: null,
  link: null,
};

// =====================================================================
// JF-600: Source resolver module exists
// =====================================================================
describe("JF-600: Source resolver exports", () => {
  it("resolveArticleSource is exported", async () => {
    const mod = await import("@/lib/feeds/copilot-source-resolver");
    expect(typeof mod.resolveArticleSource).toBe("function");
  });
});

// =====================================================================
// JF-601: Tier 2 — article with abstract but no OA PDF
// =====================================================================
describe("JF-601: Tier 2 resolution", () => {
  it("returns abstract_only when Unpaywall returns no PDF", async () => {
    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );

    const result = await resolveArticleSource(ARTICLE_WITH_DOI);

    expect(result.tier).toBe("abstract_only");
    expect(result.sourceLabel).toContain("Abstract only");
    expect(result.context).toContain("ABSTRACT:");
    expect(result.context).toContain("double-blind trial");
    expect(result.systemPrompt).toContain("abstract");
  });
});

// =====================================================================
// JF-602: Tier 3 — article without abstract
// =====================================================================
describe("JF-602: Tier 3 resolution", () => {
  it("returns title_only when no abstract available", async () => {
    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );

    const result = await resolveArticleSource(ARTICLE_NO_ABSTRACT);

    expect(result.tier).toBe("title_only");
    expect(result.sourceLabel).toContain("Title");
    expect(result.context).not.toContain("ABSTRACT:");
    expect(result.systemPrompt).toContain("title and metadata");
  });
});

// =====================================================================
// JF-603: Tier 1 — full paper when OA PDF available
// =====================================================================
describe("JF-603: Tier 1 resolution", () => {
  it("returns full_paper when PDF extraction succeeds", async () => {
    const { lookupUnpaywall } = await import(
      "@/lib/search/sources/unpaywall"
    );
    const { downloadAndExtractPdf } = await import(
      "@/lib/deep-research/full-text-extractor"
    );

    (lookupUnpaywall as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      doi: "10.1056/NEJMoa2204233",
      pdfUrl: "https://example.com/paper.pdf",
      isOpenAccess: true,
    });
    (
      downloadAndExtractPdf as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(
      "Results\nThe primary outcome of disease progression or renal death occurred in 432 patients (13.1%) in the empagliflozin group compared with 558 patients (16.9%) in the placebo group (hazard ratio, 0.72; 95% CI, 0.64 to 0.82; P<0.001). The rate of decline in eGFR was slower in the empagliflozin group.\nDiscussion\nThis trial demonstrates that empagliflozin significantly reduced the risk of progressive kidney disease among patients with chronic kidney disease."
    );

    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );
    const result = await resolveArticleSource(ARTICLE_WITH_DOI);

    expect(result.tier).toBe("full_paper");
    expect(result.sourceLabel).toContain("Full paper");
    expect(result.context).toContain("FULL PAPER TEXT");
  });
});

// =====================================================================
// JF-604: Related PubMed papers are included in context
// =====================================================================
describe("JF-604: Related papers enrichment", () => {
  it("includes related PubMed abstracts in context", async () => {
    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );

    const result = await resolveArticleSource(ARTICLE_WITH_DOI);

    expect(result.relatedPaperCount).toBeGreaterThan(0);
    expect(result.context).toContain("RELATED PUBMED LITERATURE");
    expect(result.context).toContain("Related Paper 1");
  });
});

// =====================================================================
// JF-605: Source resolver never throws
// =====================================================================
describe("JF-605: Crash resistance", () => {
  it("returns Tier 3 even when all external calls fail", async () => {
    const { lookupUnpaywall } = await import(
      "@/lib/search/sources/unpaywall"
    );
    const { searchPubMed } = await import(
      "@/lib/search/sources/pubmed"
    );

    (lookupUnpaywall as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error")
    );
    (searchPubMed as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("PubMed down")
    );

    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );
    const result = await resolveArticleSource(ARTICLE_NO_ABSTRACT);

    expect(result).toBeDefined();
    expect(result.tier).toBe("title_only");
    expect(result.context).toContain("Novel Gene Therapy");
  });
});

// =====================================================================
// JF-606: Context includes article metadata
// =====================================================================
describe("JF-606: Metadata in context", () => {
  it("includes title, authors, journal, DOI in context", async () => {
    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );

    const result = await resolveArticleSource(ARTICLE_WITH_DOI);

    expect(result.context).toContain("Empagliflozin in CKD");
    expect(result.context).toContain("Herrington WG");
    expect(result.context).toContain("N Engl J Med");
    expect(result.context).toContain("10.1056/NEJMoa2204233");
  });
});

// =====================================================================
// JF-607: Excludes self from related papers
// =====================================================================
describe("JF-607: Self-exclusion in related papers", () => {
  it("does not include the article itself in related papers", async () => {
    const { searchPubMed } = await import(
      "@/lib/search/sources/pubmed"
    );

    (searchPubMed as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      results: [
        {
          title: "This is the same paper",
          pmid: "36995890",
          doi: "10.1056/NEJMoa2204233",
          authors: [],
          journal: "",
          year: 2026,
          abstract: "Same",
        },
        {
          title: "Related Paper",
          pmid: "11111111",
          doi: "10.9999/other",
          authors: ["Author B"],
          journal: "Other J",
          year: 2025,
          abstract: "Different",
        },
      ],
      total: 2,
    });

    const { resolveArticleSource } = await import(
      "@/lib/feeds/copilot-source-resolver"
    );
    const result = await resolveArticleSource(ARTICLE_WITH_DOI);

    // Should include "Related Paper" but NOT the self-match
    expect(result.context).toContain("Related Paper");
    expect(result.context).not.toContain("This is the same paper");
  });
});

// =====================================================================
// JF-608: API route files exist
// =====================================================================
describe("JF-608: API routes exist", () => {
  it("summarize route exists", () => {
    expect(
      existsSync("src/app/api/feeds/copilot/summarize/route.ts")
    ).toBe(true);
    const content = readFileSync(
      "src/app/api/feeds/copilot/summarize/route.ts",
      "utf-8"
    );
    expect(content).toContain("export async function POST");
    expect(content).toContain("resolveArticleSource");
    expect(content).toContain("generateText");
  });

  it("chat route exists", () => {
    expect(
      existsSync("src/app/api/feeds/copilot/chat/route.ts")
    ).toBe(true);
    const content = readFileSync(
      "src/app/api/feeds/copilot/chat/route.ts",
      "utf-8"
    );
    expect(content).toContain("export async function POST");
    expect(content).toContain("streamText");
    expect(content).toContain("toTextStreamResponse");
  });
});

// =====================================================================
// JF-609: Store has copilot state
// =====================================================================
describe("JF-609: Zustand store copilot extension", () => {
  it("store has copilot state fields", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("copilotOpen");
    expect(content).toContain("copilotMessages");
    expect(content).toContain("copilotLoading");
    expect(content).toContain("copilotSourceTier");
    expect(content).toContain("copilotSuggestions");
    expect(content).toContain("copilotSummaryCache");
  });

  it("store has copilot actions", () => {
    const content = readFileSync("src/stores/feed-store.ts", "utf-8");
    expect(content).toContain("openCopilot");
    expect(content).toContain("closeCopilot");
    expect(content).toContain("summarizeArticle");
    expect(content).toContain("sendCopilotMessage");
    expect(content).toContain("clearCopilot");
  });
});

// =====================================================================
// JF-610: Summarize route uses rate limiting
// =====================================================================
describe("JF-610: Rate limiting", () => {
  it("summarize route imports checkRateLimit", () => {
    const content = readFileSync(
      "src/app/api/feeds/copilot/summarize/route.ts",
      "utf-8"
    );
    expect(content).toContain("checkRateLimit");
  });

  it("chat route imports checkRateLimit", () => {
    const content = readFileSync(
      "src/app/api/feeds/copilot/chat/route.ts",
      "utf-8"
    );
    expect(content).toContain("checkRateLimit");
  });
});

// =====================================================================
// JF-611: Summarize route uses small model (cost efficient)
// =====================================================================
describe("JF-611: Model selection", () => {
  it("summarize uses getSmallModel", () => {
    const content = readFileSync(
      "src/app/api/feeds/copilot/summarize/route.ts",
      "utf-8"
    );
    expect(content).toContain("getSmallModel");
  });

  it("chat uses getModel (standard)", () => {
    const content = readFileSync(
      "src/app/api/feeds/copilot/chat/route.ts",
      "utf-8"
    );
    expect(content).toContain("getModel");
  });
});

// =====================================================================
// JF-612: full-text-extractor exports were added
// =====================================================================
describe("JF-612: full-text-extractor exports", () => {
  it("downloadAndExtractPdf is now exported", () => {
    const content = readFileSync(
      "src/lib/deep-research/full-text-extractor.ts",
      "utf-8"
    );
    expect(content).toMatch(
      /export\s+async\s+function\s+downloadAndExtractPdf/
    );
  });

  it("extractKeySecions is now exported", () => {
    const content = readFileSync(
      "src/lib/deep-research/full-text-extractor.ts",
      "utf-8"
    );
    expect(content).toMatch(/export\s+function\s+extractKeySecions/);
  });
});
