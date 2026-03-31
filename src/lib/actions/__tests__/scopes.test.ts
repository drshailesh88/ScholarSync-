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

import {
  createScope,
  deleteScope,
  getUserScopes,
  reorderScopes,
  updateScope,
} from "../scopes";

describe("scope actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  it("creates a scope with defaults", async () => {
    // Count query returns 0
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ count: 0 }]));
    // Max sort order returns -1
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ max: -1 }]));

    const insertBuilder = createQueryBuilder([
      {
        id: 1,
        user_id: "user_123",
        name: "My Scope",
        included_domains: [],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 0,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await createScope({ name: "My Scope" });

    expect(insertBuilder.values).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user_123",
        name: "My Scope",
        included_domains: [],
        excluded_domains: [],
      })
    );
    expect(result).toMatchObject({
      id: 1,
      name: "My Scope",
      includedDomains: [],
      isActive: true,
    });
  });

  it("rejects creation after 20 scopes", async () => {
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ count: 20 }]));

    await expect(createScope({ name: "Too many" })).rejects.toThrow(
      /maximum 20/i
    );
  });

  it("rejects empty scope name", async () => {
    await expect(createScope({ name: "" })).rejects.toThrow(/name.*required/i);
  });

  it("rejects scope name exceeding 100 characters", async () => {
    await expect(createScope({ name: "a".repeat(101) })).rejects.toThrow(
      /100 characters/i
    );
  });

  it("creates a scope with domain filters", async () => {
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ count: 5 }]));
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ max: 4 }]));

    const insertBuilder = createQueryBuilder([
      {
        id: 6,
        user_id: "user_123",
        name: "Gov Sources",
        included_domains: ["gov.uk", "nih.gov"],
        excluded_domains: ["reddit.com"],
        included_keywords: ["policy"],
        excluded_keywords: ["opinion"],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 5,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await createScope({
      name: "Gov Sources",
      includedDomains: ["gov.uk", "nih.gov"],
      excludedDomains: ["reddit.com"],
      includedKeywords: ["policy"],
      excludedKeywords: ["opinion"],
    });

    expect(result).toMatchObject({
      name: "Gov Sources",
      includedDomains: ["gov.uk", "nih.gov"],
      excludedDomains: ["reddit.com"],
    });
  });

  it("updates a scope name and activation status", async () => {
    const updateBuilder = createQueryBuilder([
      {
        id: 1,
        user_id: "user_123",
        name: "Renamed",
        included_domains: [],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: false,
        sort_order: 0,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.update.mockReturnValue(updateBuilder);

    const result = await updateScope(1, { name: "Renamed", isActive: false });

    expect(updateBuilder.set).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Renamed", is_active: false })
    );
    expect(result).toMatchObject({ name: "Renamed", isActive: false });
  });

  it("throws when updating a nonexistent scope", async () => {
    const updateBuilder = createQueryBuilder([]);
    mockDb.update.mockReturnValue(updateBuilder);

    await expect(updateScope(999, { name: "Ghost" })).rejects.toThrow(
      /not found/i
    );
  });

  it("deletes a scope", async () => {
    const deleteBuilder = createQueryBuilder([]);
    mockDb.delete.mockReturnValue(deleteBuilder);

    const result = await deleteScope(1);

    expect(deleteBuilder.where).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  it("returns user scopes ordered by sort_order", async () => {
    const selectBuilder = createQueryBuilder([
      {
        id: 1,
        user_id: "user_123",
        name: "First",
        included_domains: [],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 0,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
      {
        id: 2,
        user_id: "user_123",
        name: "Second",
        included_domains: ["nih.gov"],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 1,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.select.mockReturnValue(selectBuilder);

    const result = await getUserScopes();

    expect(selectBuilder.orderBy).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: 1, name: "First", sortOrder: 0 });
    expect(result[1]).toMatchObject({ id: 2, name: "Second", sortOrder: 1 });
  });

  it("reorders scopes by updating sort_order", async () => {
    // reorderScopes calls update for each id, then getUserScopes
    const updateBuilder = createQueryBuilder([]);
    mockDb.update.mockReturnValue(updateBuilder);

    // getUserScopes at the end
    const selectBuilder = createQueryBuilder([
      {
        id: 2,
        user_id: "user_123",
        name: "Second",
        included_domains: [],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 0,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
      {
        id: 1,
        user_id: "user_123",
        name: "First",
        included_domains: [],
        excluded_domains: [],
        included_keywords: [],
        excluded_keywords: [],
        date_from: null,
        date_to: null,
        region: null,
        is_active: true,
        sort_order: 1,
        created_at: new Date("2026-03-31T00:00:00Z"),
        updated_at: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.select.mockReturnValue(selectBuilder);

    const result = await reorderScopes([2, 1]);

    expect(result[0]).toMatchObject({ id: 2, sortOrder: 0 });
    expect(result[1]).toMatchObject({ id: 1, sortOrder: 1 });
  });
});
