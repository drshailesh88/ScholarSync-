import crypto from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { subscriptions, users } from "@/lib/db/schema";

const mockDb = vi.hoisted(() => ({
  update: vi.fn(),
}));
const mockEq = vi.hoisted(() => vi.fn());

let subscriptionSetMock: ReturnType<typeof vi.fn>;
let subscriptionWhereMock: ReturnType<typeof vi.fn>;
let subscriptionReturningMock: ReturnType<typeof vi.fn>;
let userSetMock: ReturnType<typeof vi.fn>;
let userWhereMock: ReturnType<typeof vi.fn>;

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

vi.mock("drizzle-orm", () => ({
  eq: mockEq,
}));

vi.mock("@/lib/db/schema", () => ({
  subscriptions: {
    razorpaySubscriptionId: "subscriptions.razorpaySubscriptionId",
    id: "subscriptions.id",
    userId: "subscriptions.userId",
  },
  users: {
    id: "users.id",
  },
}));

import { POST } from "../route";

function signPayload(secret: string, body: string): string {
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}

function makeRequest(payload: unknown, signature?: string): NextRequest {
  const body = JSON.stringify(payload);
  const headers = new Headers({ "Content-Type": "application/json" });
  if (signature) headers.set("x-razorpay-signature", signature);

  return new Request("http://localhost/api/billing/webhook", {
    method: "POST",
    headers,
    body,
  }) as NextRequest;
}

describe("POST /api/billing/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret";

    subscriptionReturningMock = vi.fn().mockResolvedValue([]);
    subscriptionWhereMock = vi.fn().mockReturnValue({ returning: subscriptionReturningMock });
    subscriptionSetMock = vi.fn().mockReturnValue({ where: subscriptionWhereMock });
    userWhereMock = vi.fn().mockResolvedValue(undefined);
    userSetMock = vi.fn().mockReturnValue({ where: userWhereMock });
    mockDb.update
      .mockReturnValueOnce({ set: subscriptionSetMock })
      .mockReturnValueOnce({ set: userSetMock });
  });

  it("returns received true for valid signed webhook", async () => {
    const payload = { event: "payment.captured", payload: {} };
    const signature = signPayload(process.env.RAZORPAY_WEBHOOK_SECRET!, JSON.stringify(payload));

    const res = await POST(makeRequest(payload, signature));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ received: true });
  });

  it("returns 401 when signature header is missing", async () => {
    const res = await POST(makeRequest({ event: "payment.captured" }));

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: "Missing signature" });
  });

  it("returns 401 for invalid signatures", async () => {
    const payload = { event: "payment.captured" };
    const res = await POST(makeRequest(payload, "bad-signature"));

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: "Invalid signature" });
  });

  it("cancels the subscription and downgrades the owning user", async () => {
    const payload = {
      event: "subscription.cancelled",
      payload: { subscription: { entity: { id: "sub_123" } } },
    };
    const signature = signPayload(process.env.RAZORPAY_WEBHOOK_SECRET!, JSON.stringify(payload));

    subscriptionReturningMock.mockResolvedValue([{ userId: "user_42" }]);
    mockEq.mockReturnValue("eq-filter");
    mockDb.update.mockReset();
    mockDb.update
      .mockReturnValueOnce({ set: subscriptionSetMock })
      .mockReturnValueOnce({ set: userSetMock });

    const res = await POST(makeRequest(payload, signature));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ received: true });
    expect(mockDb.update).toHaveBeenNthCalledWith(1, subscriptions);
    expect(subscriptionSetMock).toHaveBeenCalledWith({
      status: "cancelled",
      updatedAt: expect.any(Date),
    });
    expect(mockEq).toHaveBeenNthCalledWith(1, subscriptions.razorpaySubscriptionId, "sub_123");
    expect(mockDb.update).toHaveBeenNthCalledWith(2, users);
    expect(userSetMock).toHaveBeenCalledWith({
      plan: "free",
      updated_at: expect.any(Date),
    });
    expect(mockEq).toHaveBeenNthCalledWith(2, users.id, "user_42");
  });

  it("returns 500 when db update throws during cancellation event", async () => {
    const payload = {
      event: "subscription.cancelled",
      payload: { subscription: { entity: { id: "sub_123" } } },
    };
    const signature = signPayload(process.env.RAZORPAY_WEBHOOK_SECRET!, JSON.stringify(payload));

    mockEq.mockReturnValue("eq-filter");
    const returning = vi.fn().mockRejectedValue(new Error("db down"));
    const where = vi.fn().mockReturnValue({ returning });
    const set = vi.fn().mockReturnValue({ where });
    mockDb.update.mockReset();
    mockDb.update.mockReturnValue({ set });

    const res = await POST(makeRequest(payload, signature));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Webhook processing failed" });
  });
});
