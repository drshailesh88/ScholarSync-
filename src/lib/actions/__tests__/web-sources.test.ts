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

import {
  saveWebSource,
  getWebSources,
  deleteWebSource,
  archiveWebSource,
  restoreWebSource,
  isWebSourceSaved,
  getSavedUrls,
  linkWebSourceToProject,
  unlinkWebSourceFromProject,
  getWebSourceById,
} from "../web-sources";

describe("web-sources actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  // ── Save ───────────────────────────────────────────────────────

  describe("saveWebSource", () => {
    it("saves a new web source and returns its ID", async () => {
      // Duplicate check → not found
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));
      // Soft-deleted check → not found
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));
      // Insert → returns new record
      mockDb.insert.mockReturnValueOnce(
        createQueryBuilder([{ id: 42, url: "https://example.com/article" }])
      );

      const result = await saveWebSource({
        result: {
          title: "Test Article",
          url: "https://example.com/article",
          domain: "example.com",
          authors: ["Jane Doe"],
          journal: "",
          year: 2024,
          citationCount: 0,
          isOpenAccess: false,
          publicationTypes: [],
          sources: ["searxng"],
          trustTier: "major_journalism",
        },
        tab: "web",
        searchQuery: "test query",
      });

      expect(result).toEqual({ id: 42, alreadySaved: false });
    });

    it("returns alreadySaved=true when URL already exists for user", async () => {
      // Duplicate check → found
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 7 }]));

      const result = await saveWebSource({
        result: {
          title: "Existing Article",
          url: "https://example.com/existing",
          domain: "example.com",
          authors: [],
          journal: "",
          year: 2024,
          citationCount: 0,
          isOpenAccess: false,
          publicationTypes: [],
          sources: ["searxng"],
        },
        tab: "news",
      });

      expect(result).toEqual({ id: 7, alreadySaved: true });
      // Should NOT have called insert
      expect(mockDb.insert).not.toHaveBeenCalled();
    });

    it("restores a soft-deleted source instead of creating a new one", async () => {
      // Duplicate check (non-deleted) → not found
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));
      // Soft-deleted check → found
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 99 }]));
      // Update (restore)
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      const result = await saveWebSource({
        result: {
          title: "Restored Article",
          url: "https://example.com/deleted",
          domain: "example.com",
          authors: [],
          journal: "",
          year: 2024,
          citationCount: 0,
          isOpenAccess: false,
          publicationTypes: [],
          sources: ["searxng"],
        },
        tab: "web",
      });

      expect(result).toEqual({ id: 99, alreadySaved: false });
      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.insert).not.toHaveBeenCalled();
    });

    it("throws if result has no URL", async () => {
      await expect(
        saveWebSource({
          result: {
            title: "No URL",
            authors: [],
            journal: "",
            year: 2024,
            citationCount: 0,
            isOpenAccess: false,
            publicationTypes: [],
            sources: [],
          },
          tab: "web",
        })
      ).rejects.toThrow("Cannot save a result without a URL");
    });
  });

  // ── Get ────────────────────────────────────────────────────────

  describe("getWebSources", () => {
    it("returns web sources for the current user", async () => {
      const mockSources = [
        { id: 1, title: "Source 1", url: "https://a.com" },
        { id: 2, title: "Source 2", url: "https://b.com" },
      ];
      mockDb.select.mockReturnValueOnce(createQueryBuilder(mockSources));

      const result = await getWebSources();
      expect(result).toEqual(mockSources);
    });

    it("returns empty when filtering by project with no linked sources", async () => {
      // Project source IDs query → empty
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      const result = await getWebSources({ projectId: 5 });
      expect(result).toEqual([]);
    });
  });

  describe("getWebSourceById", () => {
    it("returns the source if it belongs to the user", async () => {
      const source = { id: 1, title: "My Source", user_id: "user_123" };
      mockDb.select.mockReturnValueOnce(createQueryBuilder([source]));

      const result = await getWebSourceById(1);
      expect(result).toEqual(source);
    });

    it("returns null if source not found", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      const result = await getWebSourceById(999);
      expect(result).toBeNull();
    });
  });

  // ── Duplicate check ────────────────────────────────────────────

  describe("isWebSourceSaved", () => {
    it("returns true if URL is saved", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));

      const result = await isWebSourceSaved("https://example.com");
      expect(result).toBe(true);
    });

    it("returns false if URL is not saved", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      const result = await isWebSourceSaved("https://notfound.com");
      expect(result).toBe(false);
    });
  });

  describe("getSavedUrls", () => {
    it("returns saved URLs from the batch", async () => {
      mockDb.select.mockReturnValueOnce(
        createQueryBuilder([
          { url: "https://a.com" },
          { url: "https://c.com" },
        ])
      );

      const result = await getSavedUrls([
        "https://a.com",
        "https://b.com",
        "https://c.com",
      ]);

      expect(result).toEqual(["https://a.com", "https://c.com"]);
    });

    it("returns empty array for empty input", async () => {
      const result = await getSavedUrls([]);
      expect(result).toEqual([]);
      expect(mockDb.select).not.toHaveBeenCalled();
    });
  });

  // ── Soft delete ────────────────────────────────────────────────

  describe("deleteWebSource (soft delete)", () => {
    it("sets deleted_at timestamp", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await deleteWebSource(42);

      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe("restoreWebSource", () => {
    it("clears deleted_at and sets status to saved", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await restoreWebSource(42);

      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  // ── Archive ────────────────────────────────────────────────────

  describe("archiveWebSource", () => {
    it("sets status to archived", async () => {
      mockDb.update.mockReturnValueOnce(createQueryBuilder());

      await archiveWebSource(42);

      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  // ── Project linking ────────────────────────────────────────────

  describe("linkWebSourceToProject", () => {
    it("creates a link between source and project", async () => {
      // Verify source ownership
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
      // Insert link
      mockDb.insert.mockReturnValueOnce(createQueryBuilder());

      await linkWebSourceToProject(1, 5);

      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("throws if source not found", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      await expect(linkWebSourceToProject(999, 5)).rejects.toThrow(
        "Web source not found"
      );
    });
  });

  describe("unlinkWebSourceFromProject", () => {
    it("removes the link after verifying ownership", async () => {
      // Verify source ownership
      mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
      // Delete link
      mockDb.delete.mockReturnValueOnce(createQueryBuilder());

      await unlinkWebSourceFromProject(1, 5);

      expect(mockDb.select).toHaveBeenCalled();
      expect(mockDb.delete).toHaveBeenCalled();
    });

    it("throws if source not found (IDOR prevention)", async () => {
      mockDb.select.mockReturnValueOnce(createQueryBuilder([]));

      await expect(unlinkWebSourceFromProject(999, 5)).rejects.toThrow(
        "Web source not found"
      );
    });
  });
});
