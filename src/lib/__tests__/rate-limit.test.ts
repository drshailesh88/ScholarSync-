import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: Record<string, unknown>, opts?: { status?: number; headers?: Record<string, string> }) =>
      ({ body, status: opts?.status || 200, headers: opts?.headers }),
  },
}));

describe("RATE_LIMITS presets", () => {
  it("has correct preset values", async () => {
    const { RATE_LIMITS } = await import("../rate-limit");
    expect(RATE_LIMITS.ai.limit).toBe(60);
    expect(RATE_LIMITS.ai.windowSeconds).toBe(3600);
    expect(RATE_LIMITS.search.limit).toBe(120);
    expect(RATE_LIMITS.export.limit).toBe(30);
    expect(RATE_LIMITS.analysis.limit).toBe(20);
    expect(RATE_LIMITS.embed.limit).toBe(60);
  });
});

describe("checkRateLimit in-memory", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it("allows requests under limit", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const result = await checkRateLimit("user1", "test", { limit: 5, windowSeconds: 60 });
    expect(result).toBeNull();
  });

  it("blocks requests over limit", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const config = { limit: 2, windowSeconds: 60 };
    await checkRateLimit("user2", "endpoint", config);
    await checkRateLimit("user2", "endpoint", config);
    const blocked = await checkRateLimit("user2", "endpoint", config);
    expect(blocked).not.toBeNull();
    expect((blocked as unknown as { status: number }).status).toBe(429);
  });

  it("uses different keys for different users", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const config = { limit: 1, windowSeconds: 60 };
    await checkRateLimit("userA", "ep", config);
    const result = await checkRateLimit("userB", "ep", config);
    expect(result).toBeNull();
  });

  it("uses different keys for different endpoints", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const config = { limit: 1, windowSeconds: 60 };
    await checkRateLimit("user1", "ep1", config);
    const result = await checkRateLimit("user1", "ep2", config);
    expect(result).toBeNull();
  });
});
