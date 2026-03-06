/**
 * RALPH Journal Feed — Sprint 13: One-Click Citation Tests
 *
 * Tests the article-to-citation converter and citation modal component.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, existsSync } from "fs";

// Mock server action
vi.mock("@/lib/actions/citations", () => ({
  getAllCitationFormats: vi.fn(async () => ({
    apa: { full: "Test APA citation", inText: "(Test, 2026)" },
    mla: { full: "Test MLA citation", inText: "Test" },
    chicago: { full: "Test Chicago citation", inText: "(Test 2026)" },
    vancouver: { full: "Test Vancouver citation", inText: "1" },
    harvard: { full: "Test Harvard citation", inText: "(Test, 2026)" },
    bibtex: "@article{Test2026, title={Test}}",
  })),
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

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  },
}));

// =====================================================================
// JF-500: articleToPaperData converter
// =====================================================================
describe("JF-500: articleToPaperData", () => {
  it("converts FeedArticleWithStatus to PaperData", async () => {
    const { articleToPaperData } = await import(
      "@/lib/feeds/article-to-citation"
    );

    const article = {
      id: 1,
      feedSourceId: 10,
      guid: "g1",
      title: "Empagliflozin in CKD",
      authors: "Herrington WG, Staplin N, Wanner C",
      abstractSnippet: "In this trial...",
      link: "https://nejm.org/article",
      doi: "10.1056/NEJMoa2204233",
      pubmedId: "36995890",
      publishedAt: new Date("2026-03-01T00:00:00Z"),
      imageUrl: null,
      contentHtml: null,
      journal: "N Engl J Med",
      volume: "388",
      issue: "2",
      createdAt: new Date(),
      isRead: true,
      isStarred: false,
      isSavedToLibrary: false,
      savedPaperId: null,
      feedSourceTitle: "NEJM",
      feedSourceFaviconUrl: null,
    };

    const paperData = articleToPaperData(article);

    expect(paperData.title).toBe("Empagliflozin in CKD");
    expect(paperData.authors).toEqual([
      "Herrington WG",
      "Staplin N",
      "Wanner C",
    ]);
    expect(paperData.journal).toBe("N Engl J Med");
    expect(paperData.year).toBe(2026);
    expect(paperData.doi).toBe("10.1056/NEJMoa2204233");
    expect(paperData.volume).toBe("388");
    expect(paperData.issue).toBe("2");
  });

  it("handles null authors", async () => {
    const { articleToPaperData } = await import(
      "@/lib/feeds/article-to-citation"
    );

    const article = {
      id: 1,
      feedSourceId: 10,
      guid: "g2",
      title: "Test",
      authors: null,
      abstractSnippet: null,
      link: null,
      doi: null,
      pubmedId: null,
      publishedAt: null,
      imageUrl: null,
      contentHtml: null,
      journal: null,
      volume: null,
      issue: null,
      createdAt: new Date(),
      isRead: false,
      isStarred: false,
      isSavedToLibrary: false,
      savedPaperId: null,
      feedSourceTitle: "Test",
      feedSourceFaviconUrl: null,
    };

    const paperData = articleToPaperData(article);
    expect(paperData.authors).toEqual([]);
    expect(paperData.journal).toBeUndefined();
    expect(paperData.year).toBeUndefined();
    expect(paperData.doi).toBeUndefined();
  });

  it("handles article with Date object publishedAt", async () => {
    const { articleToPaperData } = await import(
      "@/lib/feeds/article-to-citation"
    );

    const article = {
      id: 1,
      feedSourceId: 10,
      guid: "g3",
      title: "Test",
      authors: "Smith J",
      abstractSnippet: null,
      link: null,
      doi: null,
      pubmedId: null,
      publishedAt: new Date("2025-06-15T00:00:00Z"),
      imageUrl: null,
      contentHtml: null,
      journal: null,
      volume: null,
      issue: null,
      createdAt: new Date(),
      isRead: false,
      isStarred: false,
      isSavedToLibrary: false,
      savedPaperId: null,
      feedSourceTitle: "Test",
      feedSourceFaviconUrl: null,
    };

    const paperData = articleToPaperData(article);
    expect(paperData.year).toBe(2025);
  });

  it("handles publishedAt as string (from JSON serialization)", async () => {
    const { articleToPaperData } = await import(
      "@/lib/feeds/article-to-citation"
    );

    const article = {
      id: 1,
      feedSourceId: 10,
      guid: "g4",
      title: "Test",
      authors: null,
      abstractSnippet: null,
      link: null,
      doi: null,
      pubmedId: null,
      publishedAt: "2025-06-15T00:00:00.000Z" as unknown as Date,
      imageUrl: null,
      contentHtml: null,
      journal: null,
      volume: null,
      issue: null,
      createdAt: new Date(),
      isRead: false,
      isStarred: false,
      isSavedToLibrary: false,
      savedPaperId: null,
      feedSourceTitle: "Test",
      feedSourceFaviconUrl: null,
    };

    const paperData = articleToPaperData(article);
    // Should handle string dates gracefully — either parse or return undefined
    expect(paperData.year === 2025 || paperData.year === undefined).toBe(true);
  });
});

// =====================================================================
// JF-501: Citation modal component exists
// =====================================================================
describe("JF-501: CitationModal component", () => {
  it("CitationModal is exported from citation-modal.tsx", async () => {
    const mod = await import("@/components/feeds/citation-modal");
    expect(mod.CitationModal).toBeDefined();
    expect(typeof mod.CitationModal).toBe("function");
  });
});

// =====================================================================
// JF-502: Article-to-citation module exists
// =====================================================================
describe("JF-502: article-to-citation module", () => {
  it("articleToPaperData is exported", async () => {
    const mod = await import("@/lib/feeds/article-to-citation");
    expect(typeof mod.articleToPaperData).toBe("function");
  });
});

// =====================================================================
// JF-503: Cite button in article-card
// =====================================================================
describe("JF-503: Cite button in article card", () => {
  it("article-card.tsx contains Cite button or onCite prop", () => {
    const path = "src/components/feeds/article-card.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toMatch(/onCite|cite|Cite|Quotes/i);
  });
});

// =====================================================================
// JF-504: Cite button in article-reader
// =====================================================================
describe("JF-504: Cite button in article reader", () => {
  it("article-reader.tsx contains Cite button or onCite prop", () => {
    const path = "src/components/feeds/article-reader.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toMatch(/onCite|cite|Cite|Quotes/i);
  });
});

// =====================================================================
// JF-505: Citation modal wired in feeds page
// =====================================================================
describe("JF-505: Citation modal in feeds page", () => {
  it("feeds page imports and renders CitationModal", () => {
    const path = "src/app/(app)/feeds/page.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("CitationModal");
    expect(content).toContain("citation-modal");
  });
});

// =====================================================================
// JF-506: Keyboard shortcut "c" for cite
// =====================================================================
describe("JF-506: Keyboard shortcut", () => {
  it("feeds page has 'c' keyboard shortcut for citation", () => {
    const path = "src/app/(app)/feeds/page.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toMatch(/["']c["']/);
  });
});

// =====================================================================
// JF-507: Citation modal uses existing citation system
// =====================================================================
describe("JF-507: Uses existing citation infrastructure", () => {
  it("citation-modal imports getAllCitationFormats", () => {
    const path = "src/components/feeds/citation-modal.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("getAllCitationFormats");
  });

  it("citation-modal imports from @/lib/actions/citations", () => {
    const path = "src/components/feeds/citation-modal.tsx";
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("@/lib/actions/citations");
  });

  it("article-to-citation has author parsing", () => {
    const path = "src/lib/feeds/article-to-citation.ts";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("parseAuthors");
  });
});

// =====================================================================
// JF-508: All 6 citation styles supported
// =====================================================================
describe("JF-508: All citation styles present", () => {
  it("citation modal has tabs for all 6 styles", () => {
    const path = "src/components/feeds/citation-modal.tsx";
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("apa");
    expect(content).toContain("mla");
    expect(content).toContain("chicago");
    expect(content).toContain("vancouver");
    expect(content).toContain("harvard");
    expect(content).toContain("bibtex");
  });
});

// =====================================================================
// JF-509: Copy to clipboard functionality
// =====================================================================
describe("JF-509: Copy functionality", () => {
  it("citation modal has copy buttons", () => {
    const path = "src/components/feeds/citation-modal.tsx";
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("clipboard");
    expect(content).toMatch(/Copy.*Citation|Copy.*BibTeX|Copied/);
  });

  it("has both full citation and in-text copy options", () => {
    const path = "src/components/feeds/citation-modal.tsx";
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("inText");
    expect(content).toMatch(/Copy.*In-Text|intext/i);
  });
});
