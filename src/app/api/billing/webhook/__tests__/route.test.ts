import crypto from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const mockDb = vi.hoisted(() => ({
  update: vi.fn(),
}));
const mockEq = vi.hoisted(() => vi.fn());

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
    mockDb.update.mockReturnValue({ set });

    const res = await POST(makeRequest(payload, signature));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Webhook processing failed" });
  });
});
