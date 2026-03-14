import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockDb = vi.hoisted(() => ({
  update: vi.fn(),
}));
const mockEq = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

vi.mock("drizzle-orm", () => ({
  eq: mockEq,
}));

vi.mock("@/lib/db/schema", () => ({
  users: {
    id: "users.id",
  },
}));

import { POST } from "../route";

describe("POST /api/onboarding/complete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockEq.mockReturnValue("eq-filter");
    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    mockDb.update.mockReturnValue({ set });
  });

  it("marks onboarding as complete for authenticated user", async () => {
    const res = await POST();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
  });

  it("enforces auth by requiring getCurrentUserId", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));

    const res = await POST();

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to complete onboarding" });
  });

  it("returns 500 when db update throws", async () => {
    const where = vi.fn().mockRejectedValue(new Error("db failed"));
    const set = vi.fn().mockReturnValue({ where });
    mockDb.update.mockReturnValue({ set });

    const res = await POST();

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to complete onboarding" });
  });

  it("returns 500 when query builder throws before DB write", async () => {
    mockEq.mockImplementation(() => {
      throw new Error("bad condition");
    });

    const res = await POST();

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to complete onboarding" });
  });
});
