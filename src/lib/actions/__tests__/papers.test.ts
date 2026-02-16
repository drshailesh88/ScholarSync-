import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Chainable query builder helper (must be declared before vi.hoisted)
// ---------------------------------------------------------------------------
function createQueryBuilder(result: unknown = []) {
  const builder: Record<string, unknown> = {};
  const methods = [
    "select",
    "selectDistinct",
    "insert",
    "update",
    "delete",
    "from",
    "innerJoin",
    "leftJoin",
    "where",
    "orderBy",
    "groupBy",
    "limit",
    "offset",
    "set",
    "values",
    "returning",
    "onConflictDoNothing",
    "on",
  ];

  for (const m of methods) {
    builder[m] = vi.fn().mockReturnValue(builder);
  }

  // Make the builder thenable so `await db.select()...` resolves to `result`
  builder.then = (resolve: (v: unknown) => unknown) => resolve(result);

  return builder;
}

// ---------------------------------------------------------------------------
// Hoisted mocks - these are available inside vi.mock factories
// ---------------------------------------------------------------------------
const { mockDb } = vi.hoisted(() => {
  const mockDb = {
    select: vi.fn(),
    selectDistinct: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  return { mockDb };
});

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("test_user_123"),
}));

vi.mock("@/lib/search/dedup", () => ({
  normalizeTitle: vi.fn((t: string) =>
    t.toLowerCase().replace(/\s+/g, " ").trim()
  ),
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

// ---------------------------------------------------------------------------
// Import the module under test AFTER mocks are in place
// ---------------------------------------------------------------------------
import { getUserPapers, savePaper } from "../papers";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("papers actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // getUserPapers
  // -------------------------------------------------------------------------
  describe("getUserPapers", () => {
    it("returns an empty array when the user has no papers", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      const result = await getUserPapers();

      expect(result).toEqual([]);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it("returns mapped papers with reference metadata", async () => {
      const now = new Date();
      const mockRows = [
        {
          ref: {
            id: 1,
            isFavorite: true,
            collection: "Cardiology",
            notes: "Good paper",
            tags: ["review"],
            createdAt: now,
          },
          paper: {
            id: 10,
            title: "Test Paper",
            doi: "10.1234/test",
            source: "pubmed",
            year: 2024,
            authors: ["Author A"],
          },
        },
      ];

      mockDb.select.mockImplementation(() => createQueryBuilder(mockRows));

      const result = await getUserPapers();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 10,
        title: "Test Paper",
        refId: 1,
        isFavorite: true,
        collection: "Cardiology",
        notes: "Good paper",
        tags: ["review"],
      });
      expect(result[0].addedAt).toBe(now.toISOString());
    });

    it("passes collection filter when provided", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      await getUserPapers("Favorites");

      // Verify that select was called (the filter is applied in the where clause)
      expect(mockDb.select).toHaveBeenCalled();
    });

    it("handles papers with null createdAt", async () => {
      const mockRows = [
        {
          ref: {
            id: 2,
            isFavorite: false,
            collection: "All Papers",
            notes: null,
            tags: [],
            createdAt: null,
          },
          paper: {
            id: 20,
            title: "No Date Paper",
            doi: null,
            source: "semantic_scholar",
          },
        },
      ];

      mockDb.select.mockImplementation(() => createQueryBuilder(mockRows));

      const result = await getUserPapers();

      expect(result).toHaveLength(1);
      expect(result[0].addedAt).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // savePaper
  // -------------------------------------------------------------------------
  describe("savePaper", () => {
    it("inserts a new paper and creates user reference when no duplicate exists", async () => {
      // findExistingPaper will do multiple selects that all return []
      // then insert returns the new paper, then user ref insert
      mockDb.select.mockImplementation(() => createQueryBuilder([]));
      mockDb.insert.mockImplementation(() => createQueryBuilder([{ id: 42 }]));
      mockDb.update.mockImplementation(() => createQueryBuilder([]));

      const paperId = await savePaper({
        title: "New Paper",
        source: "pubmed",
        doi: "10.1000/new",
        abstract: "Abstract text",
      });

      expect(paperId).toBe(42);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("returns the existing paper id when a duplicate DOI is found", async () => {
      // findExistingPaper: first select by DOI returns a match
      mockDb.select.mockImplementation(() =>
        createQueryBuilder([{ id: 99 }])
      );
      // enrichExistingPaper: select full paper, then possibly update
      mockDb.update.mockImplementation(() => createQueryBuilder([]));
      mockDb.insert.mockImplementation(() => createQueryBuilder([]));

      const paperId = await savePaper({
        title: "Existing Paper",
        source: "pubmed",
        doi: "10.1000/existing",
      });

      expect(paperId).toBe(99);
    });

    it("returns a paper id with expected type (number)", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));
      mockDb.insert.mockImplementation(() => createQueryBuilder([{ id: 7 }]));
      mockDb.update.mockImplementation(() => createQueryBuilder([]));

      const paperId = await savePaper({
        title: "Typed Paper",
        source: "arxiv",
      });

      expect(typeof paperId).toBe("number");
    });
  });
});
