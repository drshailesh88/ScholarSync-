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
import { getProjects, createProject } from "../projects";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("projects actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  // getProjects
  // -------------------------------------------------------------------------
  describe("getProjects", () => {
    it("returns an empty array when user has no projects", async () => {
      mockDb.select.mockImplementation(() => createQueryBuilder([]));

      const result = await getProjects();

      expect(result).toEqual([]);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it("returns projects with paper_count and doc_count attached", async () => {
      const projectRows = [
        {
          id: 1,
          user_id: "test_user_123",
          title: "My Thesis",
          status: "drafting",
          updated_at: new Date(),
          created_at: new Date(),
          deleted_at: null,
        },
        {
          id: 2,
          user_id: "test_user_123",
          title: "Review Article",
          status: "planning",
          updated_at: new Date(),
          created_at: new Date(),
          deleted_at: null,
        },
      ];

      const paperCountRows = [
        { project_id: 1, count: 5 },
        { project_id: 2, count: 12 },
      ];

      const docCountRows = [{ project_id: 1, count: 2 }];

      // First select -> project rows, second -> paper counts, third -> doc counts
      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [projectRows, paperCountRows, docCountRows];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await getProjects();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 1,
        title: "My Thesis",
        paper_count: 5,
        doc_count: 2,
      });
      expect(result[1]).toMatchObject({
        id: 2,
        title: "Review Article",
        paper_count: 12,
        doc_count: 0, // no doc count row for project 2
      });
    });

    it("defaults paper_count and doc_count to 0 when no counts exist", async () => {
      const projectRows = [
        {
          id: 3,
          user_id: "test_user_123",
          title: "Empty Project",
          status: "planning",
          updated_at: new Date(),
          created_at: new Date(),
          deleted_at: null,
        },
      ];

      let selectCallIndex = 0;
      mockDb.select.mockImplementation(() => {
        const results = [projectRows, [], []];
        const result = results[selectCallIndex] ?? [];
        selectCallIndex++;
        return createQueryBuilder(result);
      });

      const result = await getProjects();

      expect(result).toHaveLength(1);
      expect(result[0].paper_count).toBe(0);
      expect(result[0].doc_count).toBe(0);
    });
  });

  // -------------------------------------------------------------------------
  // createProject
  // -------------------------------------------------------------------------
  describe("createProject", () => {
    it("creates a project with default values and returns it", async () => {
      const createdProject = {
        id: 10,
        user_id: "test_user_123",
        title: "New Project",
        project_type: "review_article",
        status: "planning",
        citation_style: "vancouver",
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockDb.insert.mockImplementation(() =>
        createQueryBuilder([createdProject])
      );

      const result = await createProject({ title: "New Project" });

      expect(result).toMatchObject({
        id: 10,
        title: "New Project",
        project_type: "review_article",
        status: "planning",
      });
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("passes custom project_type through to the insert", async () => {
      const createdProject = {
        id: 11,
        user_id: "test_user_123",
        title: "SR Project",
        project_type: "systematic_review",
        status: "planning",
        citation_style: "apa",
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockDb.insert.mockImplementation(() =>
        createQueryBuilder([createdProject])
      );

      const result = await createProject({
        title: "SR Project",
        project_type: "systematic_review",
        citation_style: "apa",
      });

      expect(result).toMatchObject({
        id: 11,
        project_type: "systematic_review",
        citation_style: "apa",
      });
    });

    it("returns an object with an id property", async () => {
      mockDb.insert.mockImplementation(() =>
        createQueryBuilder([{ id: 99, title: "Test" }])
      );

      const result = await createProject({ title: "Test" });

      expect(result).toHaveProperty("id");
      expect(typeof result.id).toBe("number");
    });
  });
});
