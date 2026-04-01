import { beforeEach, describe, expect, it, vi } from "vitest";

function createQueryBuilder(result: unknown = []) {
  const builder: Record<string, unknown> = {};
  const methods = [
    "select",
    "insert",
    "update",
    "delete",
    "from",
    "where",
    "set",
    "values",
    "returning",
    "orderBy",
    "onConflictDoNothing",
    "limit",
    "innerJoin",
  ];

  for (const method of methods) {
    builder[method] = vi.fn().mockReturnValue(builder);
  }

  builder.then = (resolve: (value: unknown) => unknown) => resolve(result);

  return builder;
}

const { mockDb } = vi.hoisted(() => {
  const mockDb = {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  return { mockDb };
});

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/web/content-extractor", () => ({
  extractContent: vi.fn().mockResolvedValue({
    contentHtml: "<p>Extracted content</p>",
    contentPlain: "Extracted content",
    wordCount: 2,
  }),
}));

import {
  createHighlight,
  getHighlights,
  updateHighlight,
  deleteHighlight,
  updateWebSourceNotes,
  extractWebSourceContent,
} from "../web-sources";

describe("web source highlights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  // ── Create Highlight ──────────────────────────────────────────

  describe("createHighlight", () => {
    it("creates a highlight after verifying source ownership", async () => {
      // Verify ownership
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
      // Insert highlight
      const newHighlight = {
        id: 10,
        web_source_id: 1,
        user_id: "user_123",
        selected_text: "important passage",
        start_offset: 0,
        end_offset: 17,
        color: "yellow",
        note: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      mockDb.insert.mockReturnValueOnce(createQueryBuilder([newHighlight]));

      const result = await createHighlight({
        webSourceId: 1,
        selectedText: "important passage",
        startOffset: 0,
        endOffset: 17,
        color: "yellow",
      });

      expect(result).toEqual(newHighlight);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("throws if web source not found (IDOR prevention)", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      await expect(
        createHighlight({
          webSourceId: 999,
          selectedText: "text",
          startOffset: 0,
          endOffset: 4,
        })
      ).rejects.toThrow("Web source not found");
    });

    it("defaults color to yellow when not specified", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
      const highlight = {
        id: 11,
        color: "yellow",
        selected_text: "text",
        start_offset: 0,
        end_offset: 4,
      };
      mockDb.insert.mockReturnValueOnce(createQueryBuilder([highlight]));

      const result = await createHighlight({
        webSourceId: 1,
        selectedText: "text",
        startOffset: 0,
        endOffset: 4,
      });

      expect(result.color).toBe("yellow");
    });

    it("creates a highlight with a note", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
      const highlight = {
        id: 12,
        color: "green",
        note: "This is key evidence",
        selected_text: "evidence",
        start_offset: 10,
        end_offset: 18,
      };
      mockDb.insert.mockReturnValueOnce(createQueryBuilder([highlight]));

      const result = await createHighlight({
        webSourceId: 1,
        selectedText: "evidence",
        startOffset: 10,
        endOffset: 18,
        color: "green",
        note: "This is key evidence",
      });

      expect(result.note).toBe("This is key evidence");
      expect(result.color).toBe("green");
    });
  });

  // ── Get Highlights ────────────────────────────────────────────

  describe("getHighlights", () => {
    it("returns highlights for a web source ordered by offset", async () => {
      const highlights = [
        { id: 1, start_offset: 0, end_offset: 10, color: "yellow" },
        { id: 2, start_offset: 20, end_offset: 30, color: "green" },
      ];
      mockDb.select.mockReturnValueOnce(createQueryBuilder(highlights));

      const result = await getHighlights(1);
      expect(result).toEqual(highlights);
    });

    it("returns empty array when no highlights exist", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      const result = await getHighlights(999);
      expect(result).toEqual([]);
    });
  });

  // ── Update Highlight ──────────────────────────────────────────

  describe("updateHighlight", () => {
    it("updates highlight color", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await updateHighlight(10, { color: "red" });

      expect(mockDb.update).toHaveBeenCalled();
    });

    it("updates highlight note", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await updateHighlight(10, { note: "Updated note" });

      expect(mockDb.update).toHaveBeenCalled();
    });

    it("clears highlight note when set to null", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await updateHighlight(10, { note: null });

      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  // ── Delete Highlight ──────────────────────────────────────────

  describe("deleteHighlight", () => {
    it("deletes a highlight by ID", async () => {
      mockDb.delete.mockReturnValueOnce(createQueryBuilder());

      await deleteHighlight(10);

      expect(mockDb.delete).toHaveBeenCalled();
    });
  });
});

// ── General Notes ─────────────────────────────────────────────────

describe("web source notes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  describe("updateWebSourceNotes", () => {
    it("updates notes on a web source", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await updateWebSourceNotes(1, "This is a great article about AI.");

      expect(mockDb.update).toHaveBeenCalled();
    });

    it("clears notes when set to null", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await updateWebSourceNotes(1, null);

      expect(mockDb.update).toHaveBeenCalled();
    });
  });
});

// ── Content Extraction ────────────────────────────────────────────

describe("extractWebSourceContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  it("extracts content and updates the web source", async () => {
    // Verify ownership + get source
    mockDb.select.mockReturnValueOnce(
      createQueryBuilder([
        { id: 1, url: "https://example.com", content_extracted: false },
      ])
    );
    // Update with extracted content
    mockDb.update.mockReturnValueOnce(createQueryBuilder());

    const result = await extractWebSourceContent(1);

    expect(result.wordCount).toBe(2);
    expect(mockDb.update).toHaveBeenCalled();
  });

  it("skips extraction if already extracted", async () => {
    mockDb.select.mockReturnValueOnce(
      createQueryBuilder([
        { id: 1, url: "https://example.com", content_extracted: true },
      ])
    );

    const result = await extractWebSourceContent(1);

    expect(result.wordCount).toBe(0);
    expect(mockDb.update).not.toHaveBeenCalled();
  });

  it("throws if source not found", async () => {
    mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

    await expect(extractWebSourceContent(999)).rejects.toThrow(
      "Web source not found"
    );
  });
});
