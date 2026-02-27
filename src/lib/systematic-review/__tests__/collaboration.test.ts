// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck — mock chain types are intentionally loose
/**
 * Unit tests for the collaboration module.
 *
 * All database calls are mocked — these are pure unit tests that verify
 * the business logic in each exported function.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mock variables — accessible inside vi.mock factory closures
// ---------------------------------------------------------------------------

const {
  _mockReturning,
  _mockSet,
  mockDelete,
  mockSelect,
  mockInsert,
  mockUpdate,
} = vi.hoisted(() => {
  const mockReturning = vi.fn().mockResolvedValue([]);
  const mockSet = vi.fn(() => ({
    where: vi.fn(() => ({ returning: mockReturning })),
  }));
  const mockSelect = vi.fn();
  const mockInsert = vi.fn(() => ({
    values: vi.fn(() => ({ returning: mockReturning })),
  }));
  const mockDelete = vi.fn(() => ({
    where: vi.fn(() => ({ returning: mockReturning })),
  }));
  const mockUpdate = vi.fn(() => ({ set: mockSet }));

  return {
    _mockReturning: mockReturning,
    _mockSet: mockSet,
    mockDelete,
    mockSelect,
    mockInsert,
    mockUpdate,
  };
});

// ---------------------------------------------------------------------------
// Helper: build a chainable select mock that resolves to `rows`
// ---------------------------------------------------------------------------

function makeSelectChain(rows: unknown[]) {
  const limit = vi.fn().mockResolvedValue(rows);
  const where = vi.fn(() => ({ limit }));
  // where can also resolve directly (for getProjectCollaborators which has no .limit)
  where.mockImplementation(() => {
    const result = Promise.resolve(rows);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any).limit = limit;
    return result;
  });
  const from = vi.fn(() => ({ where }));
  return { from, where, limit };
}

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("@/lib/db", () => ({
  db: {
    select: mockSelect,
    insert: mockInsert,
    delete: mockDelete,
    update: mockUpdate,
  },
}));

vi.mock("@/lib/db/schema", () => ({
  projects: { id: "id", user_id: "user_id" },
  users: { id: "id", email: "email" },
  projectCollaborators: {
    id: "id",
    projectId: "projectId",
    userId: "userId",
    email: "email",
    role: "role",
    invitedAt: "invitedAt",
    acceptedAt: "acceptedAt",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((col: unknown, val: unknown) => ({ col, val })),
  and: vi.fn((...args: unknown[]) => ({ and: args })),
}));

// ---------------------------------------------------------------------------
// Actual imports (after mocks)
// ---------------------------------------------------------------------------

import {
  inviteCollaborator,
  getProjectCollaborators,
  removeCollaborator,
  updateCollaboratorRole,
  canAccessProject,
  getProjectRole,
  verifyProjectAccess,
} from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCollaboratorRecord(overrides?: Record<string, unknown>) {
  return {
    id: 1,
    projectId: 42,
    userId: "user_abc",
    email: "alice@example.com",
    role: "reviewer",
    invitedAt: new Date("2026-01-01"),
    acceptedAt: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Reset mocks between tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// inviteCollaborator
// ---------------------------------------------------------------------------

describe("inviteCollaborator", () => {
  it("creates a new collaborator when user exists and no prior invite", async () => {
    const userRow = { id: "user_abc", email: "alice@example.com" };
    const insertedRow = makeCollaboratorRecord();

    // 1st db.select() — user lookup: returns user
    const chain1 = makeSelectChain([userRow]);
    // 2nd db.select() — existing collab check: returns empty
    const chain2 = makeSelectChain([]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    // insert -> values -> returning
    mockInsert.mockReturnValueOnce({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValueOnce([insertedRow]),
      })),
    });

    const result = await inviteCollaborator(42, "alice@example.com", "reviewer");

    expect(result).toEqual(insertedRow);
    expect(mockInsert).toHaveBeenCalled();
  });

  it("returns existing record when collaborator already exists", async () => {
    const userRow = { id: "user_abc", email: "alice@example.com" };
    const existingRow = makeCollaboratorRecord();

    // 1st db.select() — user lookup
    const chain1 = makeSelectChain([userRow]);
    // 2nd db.select() — existing collab: found
    const chain2 = makeSelectChain([existingRow]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await inviteCollaborator(42, "alice@example.com");

    expect(result).toEqual(existingRow);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("throws when no user with the given email exists", async () => {
    // user lookup returns empty
    const chain1 = makeSelectChain([]);
    mockSelect.mockReturnValueOnce({ from: chain1.from });

    await expect(
      inviteCollaborator(42, "nobody@example.com")
    ).rejects.toThrow("No user found with email: nobody@example.com");
  });
});

// ---------------------------------------------------------------------------
// getProjectCollaborators
// ---------------------------------------------------------------------------

describe("getProjectCollaborators", () => {
  it("returns all collaborators for a project", async () => {
    const rows = [
      makeCollaboratorRecord({ id: 1, userId: "user_1", role: "reviewer" }),
      makeCollaboratorRecord({ id: 2, userId: "user_2", role: "extractor" }),
    ];

    // getProjectCollaborators: select -> from -> where (resolves directly, no .limit)
    const where = vi.fn().mockResolvedValueOnce(rows);
    const from = vi.fn(() => ({ where }));
    mockSelect.mockReturnValueOnce({ from });

    const result = await getProjectCollaborators(42);

    expect(result).toEqual(rows);
    expect(result).toHaveLength(2);
    expect(mockSelect).toHaveBeenCalled();
  });

  it("returns an empty array when no collaborators exist", async () => {
    const where = vi.fn().mockResolvedValueOnce([]);
    const from = vi.fn(() => ({ where }));
    mockSelect.mockReturnValueOnce({ from });

    const result = await getProjectCollaborators(99);

    expect(result).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// removeCollaborator
// ---------------------------------------------------------------------------

describe("removeCollaborator", () => {
  it("returns true when a collaborator is successfully removed", async () => {
    mockDelete.mockReturnValueOnce({
      where: vi.fn(() => ({
        returning: vi.fn().mockResolvedValueOnce([{ id: 1 }]),
      })),
    });

    const result = await removeCollaborator(42, "user_abc");

    expect(result).toBe(true);
    expect(mockDelete).toHaveBeenCalled();
  });

  it("returns false when the collaborator does not exist", async () => {
    mockDelete.mockReturnValueOnce({
      where: vi.fn(() => ({
        returning: vi.fn().mockResolvedValueOnce([]),
      })),
    });

    const result = await removeCollaborator(42, "non_existent_user");

    expect(result).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// updateCollaboratorRole
// ---------------------------------------------------------------------------

describe("updateCollaboratorRole", () => {
  it("updates the role and returns the updated record", async () => {
    const updatedRow = makeCollaboratorRecord({ role: "statistician" });
    mockUpdate.mockReturnValueOnce({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn().mockResolvedValueOnce([updatedRow]),
        })),
      })),
    });

    const result = await updateCollaboratorRole(42, "user_abc", "statistician");

    expect(result).toEqual(updatedRow);
    expect(result.role).toBe("statistician");
  });

  it("throws when the collaborator does not exist", async () => {
    mockUpdate.mockReturnValueOnce({
      set: vi.fn(() => ({
        where: vi.fn(() => ({
          returning: vi.fn().mockResolvedValueOnce([]),
        })),
      })),
    });

    await expect(
      updateCollaboratorRole(42, "non_existent", "viewer")
    ).rejects.toThrow("Collaborator not found for project 42 / user non_existent");
  });
});

// ---------------------------------------------------------------------------
// verifyProjectAccess
// ---------------------------------------------------------------------------

describe("verifyProjectAccess", () => {
  it("returns allowed:true, role:'owner' when user is the project owner", async () => {
    // ownership check — found
    const chain1 = makeSelectChain([{ id: 42 }]);
    mockSelect.mockReturnValueOnce({ from: chain1.from });

    const result = await verifyProjectAccess(42, "owner_user");

    expect(result).toEqual({ allowed: true, role: "owner" });
  });

  it("returns allowed:true with collaborator role when user is a collaborator", async () => {
    // ownership check — not found
    const chain1 = makeSelectChain([]);
    // collaborator check — found
    const chain2 = makeSelectChain([{ role: "reviewer" }]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await verifyProjectAccess(42, "collab_user");

    expect(result).toEqual({ allowed: true, role: "reviewer" });
  });

  it("returns allowed:false, role:null for a non-member", async () => {
    const chain1 = makeSelectChain([]);
    const chain2 = makeSelectChain([]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await verifyProjectAccess(42, "stranger");

    expect(result).toEqual({ allowed: false, role: null });
  });
});

// ---------------------------------------------------------------------------
// canAccessProject
// ---------------------------------------------------------------------------

describe("canAccessProject", () => {
  it("returns true for an owner", async () => {
    const chain1 = makeSelectChain([{ id: 42 }]);
    mockSelect.mockReturnValueOnce({ from: chain1.from });

    const result = await canAccessProject(42, "owner_user");

    expect(result).toBe(true);
  });

  it("returns true for a collaborator", async () => {
    const chain1 = makeSelectChain([]);
    const chain2 = makeSelectChain([{ role: "extractor" }]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await canAccessProject(42, "collab_user");

    expect(result).toBe(true);
  });

  it("returns false for a non-member", async () => {
    const chain1 = makeSelectChain([]);
    const chain2 = makeSelectChain([]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await canAccessProject(42, "stranger");

    expect(result).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getProjectRole
// ---------------------------------------------------------------------------

describe("getProjectRole", () => {
  it("returns 'owner' for the project owner", async () => {
    const chain1 = makeSelectChain([{ id: 42 }]);
    mockSelect.mockReturnValueOnce({ from: chain1.from });

    const result = await getProjectRole(42, "owner_user");

    expect(result).toBe("owner");
  });

  it("returns the collaborator role string", async () => {
    const chain1 = makeSelectChain([]);
    const chain2 = makeSelectChain([{ role: "extractor" }]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await getProjectRole(42, "collab_user");

    expect(result).toBe("extractor");
  });

  it("returns null for a user with no access", async () => {
    const chain1 = makeSelectChain([]);
    const chain2 = makeSelectChain([]);
    mockSelect
      .mockReturnValueOnce({ from: chain1.from })
      .mockReturnValueOnce({ from: chain2.from });

    const result = await getProjectRole(42, "stranger");

    expect(result).toBeNull();
  });
});
