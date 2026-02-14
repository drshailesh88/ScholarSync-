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

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

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
  getDocument,
  loadStudioDocument,
  saveDocumentContent,
} from "../documents";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("documents actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // getDocument (loadDocument equivalent)
  // -------------------------------------------------------------------------
  describe("getDocument", () => {
    it("returns null when document does not exist", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      const result = await getDocument(999);

      expect(result).toBeNull();
    });

    it("returns document with sections when found", async () => {
      const doc = {
        id: 1,
        project_id: 10,
        title: "My Review",
        document_type: "review_article",
        overall_status: "drafting",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const sections = [
        {
          id: 100,
          document_id: 1,
          section_type: "abstract",
          title: "Abstract",
          sort_order: 0,
          word_count: 150,
          editor_content: { type: "doc", content: [] },
        },
        {
          id: 101,
          document_id: 1,
          section_type: "introduction",
          title: "Introduction",
          sort_order: 1,
          word_count: 500,
          editor_content: { type: "doc", content: [] },
        },
      ];

      // First select returns [doc], second select returns sections
      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [[doc], sections];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await getDocument(1);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(1);
      expect(result!.title).toBe("My Review");
      expect(result!.sections).toHaveLength(2);
      expect(result!.sections[0]).toMatchObject({
        id: 100,
        section_type: "abstract",
        title: "Abstract",
      });
    });

    it("returns document with empty sections array when doc has no sections", async () => {
      const doc = {
        id: 5,
        project_id: 20,
        title: "Empty Doc",
        document_type: "original_article",
        overall_status: "outlining",
        created_at: new Date(),
        updated_at: new Date(),
      };

      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [[doc], []];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await getDocument(5);

      expect(result).not.toBeNull();
      expect(result!.sections).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // loadStudioDocument
  // -------------------------------------------------------------------------
  describe("loadStudioDocument", () => {
    it("returns an existing document for a given project", async () => {
      const existingDoc = {
        id: 3,
        project_id: 10,
        title: "Existing Doc",
        document_type: "review_article",
        overall_status: "drafting",
      };

      const sections = [
        {
          id: 200,
          document_id: 3,
          section_type: "abstract",
          title: "Abstract",
          sort_order: 0,
        },
      ];

      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [[existingDoc], sections];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await loadStudioDocument(10);

      expect(result).toMatchObject({
        id: 3,
        title: "Existing Doc",
      });
      expect(result.sections).toHaveLength(1);
    });

    it("creates a new document when project has none", async () => {
      const newDoc = {
        id: 50,
        project_id: 10,
        title: "Untitled Document",
        document_type: "review_article",
        overall_status: "drafting",
      };

      const newSection = {
        id: 300,
        document_id: 50,
        section_type: "abstract",
        title: "Abstract",
        sort_order: 0,
      };

      // First select: no existing doc found -> []
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      // insert: create doc, then create sections
      let insertCallIndex = 0;
      mockDb.insert.mockImplementation(() => {
        if (insertCallIndex === 0) {
          insertCallIndex++;
          return createQueryBuilder([newDoc]);
        }
        insertCallIndex++;
        return createQueryBuilder([
          {
            ...newSection,
            id: 300 + insertCallIndex,
            section_type: "introduction",
            title: "Introduction",
          },
        ]);
      });

      const result = await loadStudioDocument(10);

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("sections");
      expect(mockDb.insert).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // saveDocumentContent (saveDocument equivalent)
  // -------------------------------------------------------------------------
  describe("saveDocumentContent", () => {
    it("saves content to an existing section and returns metadata", async () => {
      const updatedSection = {
        id: 100,
        document_id: 1,
        section_type: "abstract",
        title: "Abstract",
        word_count: 200,
        editor_content: { type: "doc", content: [{ type: "paragraph" }] },
        updated_at: new Date(),
      };

      mockDb.update.mockImplementation(() =>
        createQueryBuilder([updatedSection])
      );
      mockDb.select.mockImplementation(() =>
        createQueryBuilder([
          { id: 100, document_id: 1, sort_order: 0 },
        ])
      );

      const result = await saveDocumentContent({
        documentId: 1,
        title: "Updated Title",
        editor_content: { type: "doc", content: [] },
        plain_text_content: "Hello world",
        word_count: 2,
      });

      expect(result).toHaveProperty("documentId", 1);
      expect(result).toHaveProperty("sectionId");
      expect(result).toHaveProperty("updatedAt");
      expect(mockDb.update).toHaveBeenCalled();
    });

    it("uses provided sectionId when specified", async () => {
      mockDb.update.mockImplementation(() => createQueryBuilder([{}]));

      const result = await saveDocumentContent({
        documentId: 1,
        title: "Title",
        editor_content: {},
        plain_text_content: "content",
        word_count: 1,
        sectionId: 42,
      });

      expect(result.sectionId).toBe(42);
      expect(result.documentId).toBe(1);
    });

    it("creates a fallback section when document has no sections", async () => {
      // select for first section returns empty
      mockDb.select.mockImplementation(() => createQueryBuilder([]));
      // insert creates a new section
      mockDb.insert.mockImplementation(() =>
        createQueryBuilder([{ id: 77, document_id: 1 }])
      );
      mockDb.update.mockImplementation(() => createQueryBuilder([{}]));

      const result = await saveDocumentContent({
        documentId: 1,
        title: "Fallback",
        editor_content: {},
        plain_text_content: "",
        word_count: 0,
      });

      expect(result).toHaveProperty("documentId", 1);
      expect(result).toHaveProperty("sectionId");
      expect(mockDb.insert).toHaveBeenCalled();
    });
  });
});
