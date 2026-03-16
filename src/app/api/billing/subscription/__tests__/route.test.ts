import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetSubscription = vi.hoisted(() => vi.fn());
const mockGetUserUsageStats = vi.hoisted(() => vi.fn());

vi.mock("@/lib/actions/billing", () => ({
  getSubscription: mockGetSubscription,
}));

vi.mock("@/lib/actions/user", () => ({
  getUserUsageStats: mockGetUserUsageStats,
}));

import { GET } from "../route";

describe("GET /api/billing/subscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns subscription and usage details", async () => {
    mockGetSubscription.mockResolvedValue({
      plan: "pro",
      status: "active",
      currentPeriodStart: new Date("2025-01-01T00:00:00.000Z"),
      currentPeriodEnd: new Date("2025-02-01T00:00:00.000Z"),
    });
    mockGetUserUsageStats.mockResolvedValue({
      tokens_used: 150,
      tokens_limit: 50000,
      searches_used: 3,
      plagiarism_checks: 1,
      exports_used: 2,
      plan: "pro",
    });

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({
      subscription: { plan: "pro", status: "active" },
      usage: {
        tokensUsed: 150,
        tokensLimit: 50000,
        searchesUsed: 3,
        plagiarismChecks: 1,
        exportsUsed: 2,
        plan: "pro",
      },
    });
  });

  it("propagates auth-dependent action failures", async () => {
    mockGetSubscription.mockRejectedValue(new Error("Not authenticated"));
    mockGetUserUsageStats.mockResolvedValue(null);

    const res = await GET();

    expect(mockGetSubscription).toHaveBeenCalledOnce();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to fetch subscription" });
  });

  it("returns null sections when subscription and usage are unavailable", async () => {
    mockGetSubscription.mockResolvedValue(null);
    mockGetUserUsageStats.mockResolvedValue(null);

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      subscription: null,
      usage: null,
    });
  });

  it("returns 500 when usage fetch throws", async () => {
    mockGetSubscription.mockResolvedValue(null);
    mockGetUserUsageStats.mockRejectedValue(new Error("DB failed"));

    const res = await GET();

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to fetch subscription" });
  });
});
