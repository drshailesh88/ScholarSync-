import { beforeEach, describe, expect, it, vi } from "vitest";

function createQueryBuilder(result: unknown = []) {
  const builder: Record<string, unknown> = {};
  const methods = [
    "select",
    "insert",
    "delete",
    "from",
    "where",
    "values",
    "returning",
    "orderBy",
    "onConflictDoUpdate",
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
  getDomainPreferences,
  removeDomainPreference,
  setDomainPreference,
} from "../domain-preferences";

describe("domain preference actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
  });

  it("upserts a normalized domain preference", async () => {
    mockDb.select
      .mockReturnValueOnce(createQueryBuilder([]))
      .mockReturnValueOnce(createQueryBuilder([{ count: 5 }]));
    const insertBuilder = createQueryBuilder([
      {
        domain: "bbc.co.uk",
        level: "prefer",
        createdAt: new Date("2026-03-31T00:00:00Z"),
        updatedAt: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await setDomainPreference(
      "https://news.bbc.co.uk/world",
      "prefer"
    );

    expect(insertBuilder.values).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user_123",
        domain: "bbc.co.uk",
        level: "prefer",
      })
    );
    expect(insertBuilder.onConflictDoUpdate).toHaveBeenCalled();
    expect(result).toMatchObject({
      domain: "bbc.co.uk",
      level: "prefer",
    });
  });

  it("rejects inserts after 1000 saved domain preferences", async () => {
    mockDb.select
      .mockReturnValueOnce(createQueryBuilder([]))
      .mockReturnValueOnce(createQueryBuilder([{ count: 1000 }]));

    await expect(
      setDomainPreference("https://news.bbc.co.uk/world", "prefer")
    ).rejects.toThrow(/limit/i);
  });

  it("allows updating an existing preference even at the limit", async () => {
    mockDb.select.mockReturnValueOnce(createQueryBuilder([{ id: 1 }]));
    const insertBuilder = createQueryBuilder([
      {
        domain: "bbc.co.uk",
        level: "higher",
        createdAt: new Date("2026-03-31T00:00:00Z"),
        updatedAt: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.insert.mockReturnValue(insertBuilder);

    const result = await setDomainPreference("https://news.bbc.co.uk/world", "higher");

    expect(result).toMatchObject({
      domain: "bbc.co.uk",
      level: "higher",
    });
  });

  it("returns a user's saved domain preferences ordered by domain", async () => {
    const selectBuilder = createQueryBuilder([
      {
        domain: "bbc.co.uk",
        level: "prefer",
        createdAt: new Date("2026-03-31T00:00:00Z"),
        updatedAt: new Date("2026-03-31T00:00:00Z"),
      },
      {
        domain: "reddit.com",
        level: "mute",
        createdAt: new Date("2026-03-31T00:00:00Z"),
        updatedAt: new Date("2026-03-31T00:00:00Z"),
      },
    ]);
    mockDb.select.mockReturnValue(selectBuilder);

    const result = await getDomainPreferences();

    expect(selectBuilder.where).toHaveBeenCalled();
    expect(selectBuilder.orderBy).toHaveBeenCalled();
    expect(result).toEqual([
      expect.objectContaining({ domain: "bbc.co.uk", level: "prefer" }),
      expect.objectContaining({ domain: "reddit.com", level: "mute" }),
    ]);
  });

  it("removes a normalized domain preference", async () => {
    const deleteBuilder = createQueryBuilder([]);
    mockDb.delete.mockReturnValue(deleteBuilder);

    const result = await removeDomainPreference("https://www.reddit.com/r/science");

    expect(deleteBuilder.where).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      domain: "reddit.com",
    });
  });

  it("rejects invalid domain input", async () => {
    await expect(
      setDomainPreference("definitely not a domain", "higher")
    ).rejects.toThrow(/domain/i);
  });
});
