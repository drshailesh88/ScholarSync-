import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const mockDb = vi.hoisted(() => ({
  insert: vi.fn(),
  update: vi.fn(),
}));
const mockLoggerWithRequestId = vi.hoisted(() => vi.fn());
const mockLogError = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({ db: mockDb }));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: mockLoggerWithRequestId,
  },
}));

vi.mock("@/lib/db/schema", () => ({
  users: {
    id: "users.id",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn(() => "eq-filter"),
}));

import { POST } from "../route";

function makeRequest(payload: unknown): NextRequest {
  return new Request("http://localhost/api/webhooks/clerk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }) as NextRequest;
}

describe("POST /api/webhooks/clerk", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoggerWithRequestId.mockReturnValue({ error: mockLogError });

    const onConflictDoUpdate = vi.fn().mockResolvedValue(undefined);
    const values = vi.fn().mockReturnValue({ onConflictDoUpdate });
    mockDb.insert.mockReturnValue({ values });

    const where = vi.fn().mockResolvedValue(undefined);
    const set = vi.fn().mockReturnValue({ where });
    mockDb.update.mockReturnValue({ set });
  });

  it("upserts user data for user.created event", async () => {
    const res = await POST(
      makeRequest({
        type: "user.created",
        data: {
          id: "user_1",
          first_name: "Ada",
          last_name: "Lovelace",
          image_url: "https://avatar",
          email_addresses: [{ email_address: "ada@example.com" }],
        },
      })
    );

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(mockDb.insert).toHaveBeenCalledOnce();
  });

  it("returns 500 when required payload shape is missing", async () => {
    const res = await POST(makeRequest({ type: "user.created", data: null }));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Webhook processing failed" });
  });

  it("returns 500 when body is invalid json", async () => {
    const req = new Request("http://localhost/api/webhooks/clerk", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    }) as NextRequest;

    const res = await POST(req);

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Webhook processing failed" });
  });

  it("returns 500 when database operation fails", async () => {
    const onConflictDoUpdate = vi.fn().mockRejectedValue(new Error("db failed"));
    const values = vi.fn().mockReturnValue({ onConflictDoUpdate });
    mockDb.insert.mockReturnValue({ values });

    const res = await POST(
      makeRequest({
        type: "user.updated",
        data: { id: "user_1", email_addresses: [] },
      })
    );

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ error: "Webhook processing failed" });
  });
});
