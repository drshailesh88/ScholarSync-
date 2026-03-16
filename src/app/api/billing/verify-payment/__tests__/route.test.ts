import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockVerifyPaymentSignature = vi.hoisted(() => vi.fn());
const mockCreateSubscription = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/billing/razorpay", () => ({
  verifyPaymentSignature: mockVerifyPaymentSignature,
  PLAN_PRICES: { free: 0, basic: 100000, pro: 200000 },
}));

vi.mock("@/lib/actions/billing", () => ({
  createSubscription: mockCreateSubscription,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    analysis: { limit: 20, windowSeconds: 3600 },
  },
}));

import { POST } from "../route";

function makeRequest(body: unknown): NextRequest {
  return new Request("http://localhost/api/billing/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as NextRequest;
}

describe("POST /api/billing/verify-payment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockCheckRateLimit.mockResolvedValue(null);
    mockVerifyPaymentSignature.mockResolvedValue(true);
    mockCreateSubscription.mockResolvedValue({
      plan: "pro",
      status: "active",
      currentPeriodEnd: new Date("2026-01-01T00:00:00.000Z"),
    });
  });

  it("returns success payload for valid payment details", async () => {
    const res = await POST(
      makeRequest({
        orderId: "order_1",
        paymentId: "pay_1",
        signature: "sig_1",
        plan: "pro",
      })
    );

    expect(res.status).toBe(200);
    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
    expect(mockVerifyPaymentSignature).toHaveBeenCalledWith("order_1", "pay_1", "sig_1");
    expect(mockCreateSubscription).toHaveBeenCalledWith({
      plan: "pro",
      razorpaySubscriptionId: "pay_1",
      razorpayCustomerId: "order_1",
    });
  });

  it("enforces auth by calling getCurrentUserId and fails when unauthenticated", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));

    const res = await POST(
      makeRequest({
        orderId: "order_1",
        paymentId: "pay_1",
        signature: "sig_1",
        plan: "pro",
      })
    );

    expect(mockGetCurrentUserId).toHaveBeenCalledOnce();
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Payment verification failed" });
  });

  it("returns 400 for missing required fields", async () => {
    const res = await POST(
      makeRequest({
        orderId: "order_1",
        paymentId: "pay_1",
        signature: "sig_1",
      })
    );

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Missing required fields: orderId, paymentId, signature, plan",
    });
  });

  it("returns 500 when subscription creation throws", async () => {
    mockCreateSubscription.mockRejectedValue(new Error("db failed"));

    const res = await POST(
      makeRequest({
        orderId: "order_1",
        paymentId: "pay_1",
        signature: "sig_1",
        plan: "basic",
      })
    );

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Payment verification failed" });
  });
});
