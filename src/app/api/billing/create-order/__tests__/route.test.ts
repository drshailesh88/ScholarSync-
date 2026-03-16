import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCreateRazorpayOrder = vi.hoisted(() => vi.fn());
const mockIsConfigured = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/billing/razorpay", () => ({
  createRazorpayOrder: mockCreateRazorpayOrder,
  isConfigured: mockIsConfigured,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    analysis: { limit: 20, windowSeconds: 3600 },
  },
}));

import { POST } from "../route";

function makeRequest(body: unknown): NextRequest {
  return new Request("http://localhost/api/billing/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as NextRequest;
}

describe("POST /api/billing/create-order", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsConfigured.mockReturnValue(true);
    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockCheckRateLimit.mockResolvedValue(null);
  });

  it("returns order data for valid plan", async () => {
    mockCreateRazorpayOrder.mockResolvedValue({
      id: "order_1",
      amount: 100000,
      currency: "INR",
    });

    const res = await POST(makeRequest({ plan: "basic" }));

    expect(res.status).toBe(200);
    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
    expect(mockCreateRazorpayOrder).toHaveBeenCalledWith("basic", "user_123");
    await expect(res.json()).resolves.toMatchObject({
      orderId: "order_1",
      amount: 100000,
      currency: "INR",
    });
  });

  it("enforces auth by calling getCurrentUserId and fails when unauthenticated", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));

    const res = await POST(makeRequest({ plan: "basic" }));

    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to create payment order" });
  });

  it("returns 400 for invalid plan", async () => {
    const res = await POST(makeRequest({ plan: "enterprise" }));

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid plan. Must be 'basic' or 'pro'",
    });
  });

  it("returns 500 when order creation throws", async () => {
    mockCreateRazorpayOrder.mockRejectedValue(new Error("Razorpay down"));

    const res = await POST(makeRequest({ plan: "pro" }));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Failed to create payment order" });
  });
});
