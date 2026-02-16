import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockEmbedPaperChunks = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
    search: { limit: 120, windowSeconds: 3600 },
    export: { limit: 30, windowSeconds: 3600 },
    analysis: { limit: 20, windowSeconds: 3600 },
    embed: { limit: 60, windowSeconds: 3600 },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    withRequestId: vi.fn().mockReturnValue({
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

vi.mock("@/lib/actions/embeddings", () => ({
  embedPaperChunks: mockEmbedPaperChunks,
}));

import { POST } from "../route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/embed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);
    mockEmbedPaperChunks.mockResolvedValue({ chunksCreated: 5 });
  });

  it("returns result for a valid paperId", async () => {
    const res = await POST(makeRequest({ paperId: 42 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.chunksCreated).toBe(5);
    expect(mockEmbedPaperChunks).toHaveBeenCalledWith(42);
  });

  it("returns 400 for missing paperId", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/invalid/i);
  });

  it("returns 400 for invalid paperId type", async () => {
    const res = await POST(makeRequest({ paperId: "not-a-number" }));
    expect(res.status).toBe(400);
  });

  it("returns 500 when auth throws (unauthenticated)", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));
    const res = await POST(makeRequest({ paperId: 1 }));
    // The embed route doesn't have a dedicated auth catch block,
    // so the error falls through to the generic catch => 500
    expect(res.status).toBe(500);
  });
});
