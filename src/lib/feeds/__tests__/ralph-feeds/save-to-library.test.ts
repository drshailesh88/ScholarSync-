/**
 * RALPH Journal Feed — Sprint 10: Save to Library Tests
 *
 * Tests the saveFeedArticleToLibrary() function and parseAuthorsToArray helper.
 * Database calls are mocked.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock setup ──────────────────────────────────────────────────────

const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockValues = vi.fn();
const mockReturning = vi.fn();
const mockOnConflictDoNothing = vi.fn();
const mockOnConflictDoUpdate = vi.fn();
const mockWhere = vi.fn();
const mockFrom = vi.fn();

function resetChainMocks() {
  mockSelect.mockReset();
  mockInsert.mockReset();
  mockValues.mockReset();
  mockReturning.mockReset();
  mockOnConflictDoNothing.mockReset();
  mockOnConflictDoUpdate.mockReset();
  mockWhere.mockReset();
  mockFrom.mockReset();

  // Default chain behavior
  mockValues.mockReturnValue({
    onConflictDoNothing: mockOnConflictDoNothing.mockResolvedValue([]),
    onConflictDoUpdate: mockOnConflictDoUpdate.mockResolvedValue([]),
    returning: mockReturning.mockResolvedValue([{ id: 100 }]),
  });
  mockFrom.mockReturnValue({
    where: mockWhere.mockResolvedValue([]),
  });
  mockSelect.mockReturnValue({
    from: mockFrom,
  });
  mockInsert.mockReturnValue({
    values: mockValues,
  });
}

vi.mock("@/lib/db", () => ({
  db: {
    select: (...args: unknown[]) => mockSelect(...args),
    insert: (...args: unknown[]) => mockInsert(...args),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
  },
}));

vi.mock("@/lib/db/schema", () => ({
  feedArticles: {
    id: "id",
    feedSourceId: "fsi",
    title: "title",
    authors: "authors",
    abstractSnippet: "as",
    doi: "doi",
    pubmedId: "pmid",
    publishedAt: "pa",
    journal: "j",
    volume: "v",
    issue: "i",
    link: "link",
  },
  userArticleStatus: {
    userId: "uid",
    articleId: "aid",
    isSavedToLibrary: "stl",
    savedPaperId: "spid",
    isRead: "ir",
    readAt: "ra",
  },
  papers: {
    id: "id",
    title: "title",
    doi: "doi",
    pubmed_id: "pmid",
    source: "source",
    authors: "authors",
    abstract: "abstract",
    journal: "journal",
    year: "year",
    volume: "volume",
    issue: "issue",
    publication_date: "pd",
    citation_count: "cc",
  },
  userReferences: {
    userId: "uid",
    paperId: "pid",
    collection: "col",
    isFavorite: "fav",
  },
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

// ── Import AFTER mocks ──────────────────────────────────────────────

const { saveFeedArticleToLibrary, parseAuthorsToArray } = await import(
  "@/lib/feeds/save-to-library"
);

// ── Test data ───────────────────────────────────────────────────────

const MOCK_ARTICLE = {
  id: 1,
  feedSourceId: 10,
  guid: "guid-001",
  title: "Empagliflozin in CKD Patients",
  authors: "Herrington WG, Staplin N, Wanner C",
  abstractSnippet: "In this double-blind trial...",
  link: "https://www.nejm.org/doi/full/10.1056/NEJMoa2204233",
  doi: "10.1056/NEJMoa2204233",
  pubmedId: "36995890",
  publishedAt: new Date("2026-03-01"),
  imageUrl: null,
  contentHtml: null,
  journal: "N Engl J Med",
  volume: "388",
  issue: "2",
  createdAt: new Date(),
};

const MOCK_ARTICLE_NO_DOI = {
  ...MOCK_ARTICLE,
  id: 2,
  doi: null,
  pubmedId: null,
  authors: "Single Author",
};

// ── Setup ───────────────────────────────────────────────────────────

beforeEach(() => {
  resetChainMocks();
});

// =====================================================================
// JF-260: parseAuthorsToArray — core helper
// =====================================================================
describe("JF-260: parseAuthorsToArray", () => {
  it("parses comma-separated authors", () => {
    expect(parseAuthorsToArray("Smith J, Jones K, Brown A")).toEqual([
      "Smith J",
      "Jones K",
      "Brown A",
    ]);
  });

  it("returns empty array for null", () => {
    expect(parseAuthorsToArray(null)).toEqual([]);
  });

  it("returns empty array for undefined", () => {
    expect(parseAuthorsToArray(undefined)).toEqual([]);
  });

  it("handles single author without comma", () => {
    expect(parseAuthorsToArray("Single Author")).toEqual(["Single Author"]);
  });

  it("trims whitespace from each author", () => {
    expect(parseAuthorsToArray("  Smith J ,  Jones K  ")).toEqual([
      "Smith J",
      "Jones K",
    ]);
  });

  it("handles accented characters", () => {
    expect(
      parseAuthorsToArray("García-López R, Müller K, O'Brien S")
    ).toEqual(["García-López R", "Müller K", "O'Brien S"]);
  });

  it("filters out empty segments from trailing commas", () => {
    expect(parseAuthorsToArray("Smith J, Jones K,")).toEqual([
      "Smith J",
      "Jones K",
    ]);
  });

  it("handles et al. notation", () => {
    expect(parseAuthorsToArray("Smith J, Jones K, et al.")).toEqual([
      "Smith J",
      "Jones K",
      "et al.",
    ]);
  });
});

// =====================================================================
// JF-261: saveFeedArticleToLibrary — article not found
// =====================================================================
describe("JF-261: Article not found", () => {
  it("throws when article does not exist", async () => {
    // First select (fetch article) returns empty
    mockWhere.mockResolvedValueOnce([]);

    await expect(
      saveFeedArticleToLibrary("user-001", 999)
    ).rejects.toThrow("Article not found");
  });
});

// =====================================================================
// JF-262: saveFeedArticleToLibrary — creates new paper with DOI
// =====================================================================
describe("JF-262: New paper creation with DOI", () => {
  it("creates paper and returns isNew=true", async () => {
    // 1st select: fetch article -> found
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    // 2nd select: check userArticleStatus -> not saved yet
    mockWhere.mockResolvedValueOnce([]);
    // 3rd select: check papers by DOI -> not found
    mockWhere.mockResolvedValueOnce([]);
    // Insert paper -> returns new paper
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    const result = await saveFeedArticleToLibrary("user-001", 1);

    expect(result.paperId).toBe(100);
    expect(result.isNew).toBe(true);
    // Verify insert was called (for the paper)
    expect(mockInsert).toHaveBeenCalled();
  });
});

// =====================================================================
// JF-263: saveFeedArticleToLibrary — links to existing paper by DOI
// =====================================================================
describe("JF-263: Link to existing paper by DOI", () => {
  it("returns existing paperId and isNew=false", async () => {
    // 1st select: fetch article -> found
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    // 2nd select: check userArticleStatus -> not saved yet
    mockWhere.mockResolvedValueOnce([]);
    // 3rd select: check papers by DOI -> found existing
    mockWhere.mockResolvedValueOnce([{ id: 42 }]);

    const result = await saveFeedArticleToLibrary("user-001", 1);

    expect(result.paperId).toBe(42);
    expect(result.isNew).toBe(false);
  });
});

// =====================================================================
// JF-264: saveFeedArticleToLibrary — idempotent (already saved)
// =====================================================================
describe("JF-264: Idempotent when already saved", () => {
  it("returns existing paperId without creating anything new", async () => {
    // 1st select: fetch article -> found
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    // 2nd select: check userArticleStatus -> already saved
    mockWhere.mockResolvedValueOnce([
      {
        isSavedToLibrary: true,
        savedPaperId: 42,
      },
    ]);

    const result = await saveFeedArticleToLibrary("user-001", 1);

    expect(result.paperId).toBe(42);
    expect(result.isNew).toBe(false);
  });
});

// =====================================================================
// JF-265: saveFeedArticleToLibrary — uses source="feed"
// =====================================================================
describe("JF-265: Source set to feed", () => {
  it("inserts paper with source='feed'", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]); // not saved yet
    mockWhere.mockResolvedValueOnce([]); // no DOI match
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    // Verify the values() call included source: "feed"
    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "feed",
      })
    );
  });
});

// =====================================================================
// JF-266: Authors parsed to array
// =====================================================================
describe("JF-266: Authors conversion", () => {
  it("passes parsed authors array to paper insert", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        authors: ["Herrington WG", "Staplin N", "Wanner C"],
      })
    );
  });
});

// =====================================================================
// JF-267: Handles article with no authors
// =====================================================================
describe("JF-267: No authors handling", () => {
  it("passes empty array when authors is null", async () => {
    const noAuthorArticle = { ...MOCK_ARTICLE, authors: null };
    mockWhere.mockResolvedValueOnce([noAuthorArticle]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        authors: [],
      })
    );
  });
});

// =====================================================================
// JF-268: Creates userReferences row
// =====================================================================
describe("JF-268: User references creation", () => {
  it("inserts into userReferences with onConflictDoNothing", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    // insert should have been called multiple times:
    // once for paper, once for userReferences, once for userArticleStatus
    expect(mockInsert.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(mockOnConflictDoNothing).toHaveBeenCalled();
  });
});

// =====================================================================
// JF-269: Updates userArticleStatus with savedPaperId
// =====================================================================
describe("JF-269: Article status update", () => {
  it("upserts userArticleStatus with isSavedToLibrary and savedPaperId", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    // Should use onConflictDoUpdate for userArticleStatus
    expect(mockOnConflictDoUpdate).toHaveBeenCalled();
  });
});

// =====================================================================
// JF-270: Article with no DOI and no PMID creates new paper
// =====================================================================
describe("JF-270: No DOI, no PMID", () => {
  it("creates new paper when no identifiers available for dedup", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE_NO_DOI]);
    mockWhere.mockResolvedValueOnce([]); // not saved
    // No DOI/PMID queries happen (both are null)
    mockReturning.mockResolvedValueOnce([{ id: 200 }]);

    const result = await saveFeedArticleToLibrary("user-001", 2);

    expect(result.paperId).toBe(200);
    expect(result.isNew).toBe(true);
  });
});

// =====================================================================
// JF-271: Year extracted from publishedAt date
// =====================================================================
describe("JF-271: Year extraction", () => {
  it("extracts year from publishedAt", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    await saveFeedArticleToLibrary("user-001", 1);

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        year: 2026,
      })
    );
  });
});

// =====================================================================
// JF-272: Function signature and return type
// =====================================================================
describe("JF-272: Function contract", () => {
  it("saveFeedArticleToLibrary is exported", () => {
    expect(typeof saveFeedArticleToLibrary).toBe("function");
  });

  it("parseAuthorsToArray is exported", () => {
    expect(typeof parseAuthorsToArray).toBe("function");
  });

  it("returns object with paperId and isNew", async () => {
    mockWhere.mockResolvedValueOnce([MOCK_ARTICLE]);
    mockWhere.mockResolvedValueOnce([]);
    mockWhere.mockResolvedValueOnce([]);
    mockReturning.mockResolvedValueOnce([{ id: 100 }]);

    const result = await saveFeedArticleToLibrary("user-001", 1);

    expect(result).toHaveProperty("paperId");
    expect(result).toHaveProperty("isNew");
    expect(typeof result.paperId).toBe("number");
    expect(typeof result.isNew).toBe("boolean");
  });
});
