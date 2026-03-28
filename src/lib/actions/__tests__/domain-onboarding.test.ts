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

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("test_user_123"),
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

import { createProject } from "../projects";
import { updateUserProfile } from "../user";

describe("domain onboarding actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the user's domain field", async () => {
    const updateBuilder = createQueryBuilder([{ id: "test_user_123", domain: "physics" }]);
    mockDb.update.mockReturnValue(updateBuilder);

    const result = await updateUserProfile({ domain: "physics" });

    expect(updateBuilder.set).toHaveBeenCalledWith(
      expect.objectContaining({
        domain: "physics",
      })
    );
    expect(result).toMatchObject({ domain: "physics" });
  });

  it("saves an explicit project domain to projects.field", async () => {
    const insertBuilder = createQueryBuilder([{ id: 1, title: "Test", field: "physics" }]);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await createProject({
      title: "Test",
      domain: "physics",
    });

    expect(insertBuilder.values).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test",
        field: "physics",
      })
    );
    expect(result).toMatchObject({ field: "physics" });
  });

  it("inherits the user's domain when a project domain is not provided", async () => {
    const selectBuilder = createQueryBuilder([{ domain: "biology" }]);
    const insertBuilder = createQueryBuilder([{ id: 2, title: "Inherited", field: "biology" }]);
    mockDb.select.mockReturnValue(selectBuilder);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await createProject({ title: "Inherited" });

    expect(insertBuilder.values).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Inherited",
        field: "biology",
      })
    );
    expect(result).toMatchObject({ field: "biology" });
  });

  it('defaults the project domain to "medicine" when the user has no domain set', async () => {
    const selectBuilder = createQueryBuilder([{ domain: null }]);
    const insertBuilder = createQueryBuilder([{ id: 3, title: "Default", field: "medicine" }]);
    mockDb.select.mockReturnValue(selectBuilder);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await createProject({ title: "Default" });

    expect(insertBuilder.values).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Default",
        field: "medicine",
      })
    );
    expect(result).toMatchObject({ field: "medicine" });
  });
});
