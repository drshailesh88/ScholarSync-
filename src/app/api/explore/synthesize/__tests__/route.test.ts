import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: vi.fn().mockResolvedValue("user_123"),
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
  RATE_LIMITS: { ai: { maxRequests: 100, windowMs: 60_000 } },
}));

vi.mock("@/lib/ai/models", () => ({
  isAIConfigured: vi.fn().mockReturnValue(true),
  getModel: vi.fn().mockReturnValue("mock-model"),
}));

vi.mock("ai", () => ({
  streamText: vi.fn().mockReturnValue({
    toTextStreamResponse: () =>
      new Response("Synthesis output [1] with citations [2].", {
        headers: { "Content-Type": "text/plain" },
      }),
  }),
}));

import { POST } from "../route";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/explore/synthesize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/explore/synthesize", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when sources is missing", async () => {
    const res = await POST(makeRequest({ query: "test" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("sources");
  });

  it("returns 400 when query is missing", async () => {
    const res = await POST(
      makeRequest({
        sources: [{ title: "Source 1", domain: "example.com" }],
      })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("query");
  });

  it("returns 400 when sources is empty array", async () => {
    const res = await POST(
      makeRequest({ sources: [], query: "test" })
    );
    expect(res.status).toBe(400);
  });

  it("streams synthesis text for valid request", async () => {
    const res = await POST(
      makeRequest({
        sources: [
          { title: "Source 1", domain: "example.gov", trustTier: "government" },
          { title: "Source 2", domain: "nytimes.com", trustTier: "major_journalism" },
        ],
        query: "climate change effects",
      })
    );
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain("Synthesis output");
    expect(text).toContain("[1]");
  });

  it("returns 503 when AI is not configured", async () => {
    const { isAIConfigured } = await import("@/lib/ai/models");
    (isAIConfigured as ReturnType<typeof vi.fn>).mockReturnValueOnce(false);

    const res = await POST(
      makeRequest({
        sources: [{ title: "S1", domain: "x.com" }],
        query: "test",
      })
    );
    expect(res.status).toBe(503);
  });

  it("limits sources to 8", async () => {
    const { streamText } = await import("ai");

    const sources = Array.from({ length: 12 }, (_, i) => ({
      title: `Source ${i + 1}`,
      domain: `example${i}.com`,
    }));

    await POST(makeRequest({ sources, query: "test" }));

    // streamText should have been called with a prompt containing only 8 sources
    const call = (streamText as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call.prompt).toContain("8 sources");
    expect(call.prompt).not.toContain("Source 9");
  });
});
