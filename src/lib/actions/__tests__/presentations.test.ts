import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Chainable query builder helper
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
    "as",
  ];

  for (const m of methods) {
    builder[m] = vi.fn().mockReturnValue(builder);
  }

  builder.then = (resolve: (v: unknown) => unknown) => resolve(result);

  return builder;
}

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const { mockDb } = vi.hoisted(() => {
  const mockDb = {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  return { mockDb };
});

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("test_user_123"),
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

// ---------------------------------------------------------------------------
// Import under test
// ---------------------------------------------------------------------------
import {
  createDeck,
  getDeck,
  getUserDecks,
  updateDeck,
  deleteDeck,
  createSlide,
  deleteSlide,
} from "../presentations";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("presentations actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // createDeck
  // -------------------------------------------------------------------------
  describe("createDeck", () => {
    it("inserts a new deck and returns it", async () => {
      const deck = {
        id: 1,
        userId: "test_user_123",
        title: "My Presentation",
        audienceType: "general",
        sourceType: "custom",
        theme: "modern",
      };

      mockDb.insert.mockImplementation(() => createQueryBuilder([deck]));

      const result = await createDeck({ title: "My Presentation" });

      expect(result).toMatchObject({ id: 1, title: "My Presentation" });
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("uses provided audienceType when specified", async () => {
      const deck = {
        id: 2,
        userId: "test_user_123",
        title: "Expert Talk",
        audienceType: "conference",
        sourceType: "synthesis",
      };

      mockDb.insert.mockImplementation(() => createQueryBuilder([deck]));

      const result = await createDeck({
        title: "Expert Talk",
        audienceType: "conference",
        sourceType: "synthesis",
      });

      expect(result).toMatchObject({
        id: 2,
        audienceType: "conference",
        sourceType: "synthesis",
      });
    });
  });

  // -------------------------------------------------------------------------
  // getDeck
  // -------------------------------------------------------------------------
  describe("getDeck", () => {
    it("returns null when deck does not exist", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      const result = await getDeck(999);

      expect(result).toBeNull();
    });

    it("returns deck with slides when found", async () => {
      const deck = {
        id: 5,
        userId: "test_user_123",
        title: "Found Deck",
        theme: "modern",
      };

      const deckSlides = [
        { id: 10, deckId: 5, sortOrder: 0, title: "Title Slide" },
        { id: 11, deckId: 5, sortOrder: 1, title: "Intro" },
      ];

      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [[deck], deckSlides];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await getDeck(5);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(5);
      expect(result!.slides).toHaveLength(2);
      expect(result!.slides[0]).toMatchObject({ id: 10, title: "Title Slide" });
    });
  });

  // -------------------------------------------------------------------------
  // getUserDecks
  // -------------------------------------------------------------------------
  describe("getUserDecks", () => {
    it("returns an empty array when user has no decks", async () => {
      // getUserDecks uses a subquery with .as(), so we need to handle that
      mockDb.select.mockImplementation(() => {
        const qb = createQueryBuilder([]);
        // The subquery chain: db.select(...).from(...).groupBy(...).as(...)
        // returns the subquery alias, which is then used in leftJoin
        return qb;
      });

      const result = await getUserDecks();

      expect(result).toEqual([]);
    });

    it("returns deck list with slide counts", async () => {
      const rows = [
        {
          id: 1,
          title: "Deck A",
          description: null,
          theme: "modern",
          audienceType: "general",
          generationStatus: "completed",
          themeConfig: null,
          totalSlides: 5,
          sourceType: "custom",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDb.select.mockImplementation(() => createQueryBuilder(rows));

      const result = await getUserDecks();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ id: 1, title: "Deck A", totalSlides: 5 });
    });
  });

  // -------------------------------------------------------------------------
  // updateDeck
  // -------------------------------------------------------------------------
  describe("updateDeck", () => {
    it("updates and returns the deck", async () => {
      const updated = {
        id: 3,
        title: "Updated Title",
        theme: "academic",
        updatedAt: new Date(),
      };

      mockDb.update.mockImplementation(() => createQueryBuilder([updated]));

      const result = await updateDeck(3, { title: "Updated Title", theme: "academic" });

      expect(result).toMatchObject({ id: 3, title: "Updated Title" });
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // deleteDeck
  // -------------------------------------------------------------------------
  describe("deleteDeck", () => {
    it("calls delete on the database", async () => {
      mockDb.delete.mockImplementation(() => createQueryBuilder(undefined));

      await deleteDeck(7);

      expect(mockDb.delete).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // createSlide
  // -------------------------------------------------------------------------
  describe("createSlide", () => {
    it("inserts a slide, updates deck total, and returns the slide", async () => {
      const slide = {
        id: 20,
        deckId: 5,
        sortOrder: 0,
        layout: "title_content",
        title: "New Slide",
      };

      const allSlides = [
        { id: 20, deckId: 5, sortOrder: 0 },
        { id: 21, deckId: 5, sortOrder: 1 },
      ];

      mockDb.insert.mockImplementation(() => createQueryBuilder([slide]));

      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [allSlides];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      mockDb.update.mockImplementation(() => createQueryBuilder([]));

      const result = await createSlide({ deckId: 5, sortOrder: 0, title: "New Slide" });

      expect(result).toMatchObject({ id: 20, title: "New Slide" });
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // deleteSlide
  // -------------------------------------------------------------------------
  describe("deleteSlide", () => {
    it("deletes a slide, reorders remaining, and updates deck total", async () => {
      const deleted = { id: 10, deckId: 5, sortOrder: 0 };
      const remaining = [
        { id: 11, deckId: 5, sortOrder: 1 },
        { id: 12, deckId: 5, sortOrder: 2 },
      ];

      mockDb.delete.mockImplementation(() => createQueryBuilder([deleted]));

      mockDb.select.mockImplementation(() => createQueryBuilder(remaining));

      mockDb.update.mockImplementation(() => createQueryBuilder([]));

      const result = await deleteSlide(10);

      expect(result).toMatchObject({ id: 10, deckId: 5 });
      expect(mockDb.delete).toHaveBeenCalled();
      // update called for reorder + deck total
      expect(mockDb.update).toHaveBeenCalled();
    });

    it("returns undefined when slide does not exist", async () => {
      mockDb.delete.mockImplementation(() => createQueryBuilder([undefined]));

      const result = await deleteSlide(999);

      expect(result).toBeUndefined();
    });
  });
});
