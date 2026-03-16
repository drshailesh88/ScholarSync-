import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockStreamText = vi.hoisted(() => vi.fn());
const mockIsAIConfigured = vi.hoisted(() => vi.fn());
const mockGetModel = vi.hoisted(() => vi.fn());
const mockToTextStreamResponse = vi.hoisted(() => vi.fn());

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

vi.mock("ai", () => ({
  streamText: mockStreamText,
}));

vi.mock("@/lib/ai/models", () => ({
  isAIConfigured: mockIsAIConfigured,
  getModel: mockGetModel,
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

vi.mock("@/lib/ai/prompts/guide", () => ({
  getGuideSystemPrompt: vi.fn().mockReturnValue("guide-system-prompt"),
  getDefaultGuidePrompt: vi.fn().mockReturnValue("default-guide-prompt"),
}));

vi.mock("@/lib/ai/prompts/draft", () => ({
  getDraftSystemPrompt: vi.fn().mockReturnValue("draft-system-prompt"),
  getDefaultDraftPrompt: vi.fn().mockReturnValue("default-draft-prompt"),
}));

import { POST } from "../route";
import {
  getDefaultDraftPrompt,
  getDraftSystemPrompt,
} from "@/lib/ai/prompts/draft";
import {
  getDefaultGuidePrompt,
  getGuideSystemPrompt,
} from "@/lib/ai/prompts/guide";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);
    mockIsAIConfigured.mockReturnValue(true);
    mockGetModel.mockReturnValue("mock-model");
    mockStreamText.mockReturnValue({
      toTextStreamResponse: mockToTextStreamResponse.mockReturnValue(
        new Response("stream")
      ),
    });
  });

  it("returns a stream response for valid messages", async () => {
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "Hello" }],
      })
    );
    expect(res.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledOnce();
    expect(mockToTextStreamResponse).toHaveBeenCalledOnce();
  });

  it("uses guide prompt in learn mode with context", async () => {
    await POST(
      makeRequest({
        messages: [{ role: "user", content: "Help me write" }],
        mode: "learn",
        guideContext: { documentType: "research-article", stage: "introduction" },
      })
    );
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ system: "guide-system-prompt" })
    );
  });

  it("uses draft prompt in draft mode with context", async () => {
    await POST(
      makeRequest({
        messages: [{ role: "user", content: "Draft text" }],
        mode: "draft",
        draftContext: { intensity: "heavy" },
      })
    );
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ system: "draft-system-prompt" })
    );
  });

  it("falls back to the default draft prompt when draft intensity is missing", async () => {
    await POST(
      makeRequest({
        messages: [{ role: "user", content: "Draft text" }],
        mode: "draft",
      })
    );

    expect(getDraftSystemPrompt).not.toHaveBeenCalled();
    expect(getDefaultDraftPrompt).toHaveBeenCalledOnce();
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ system: "default-draft-prompt" })
    );
  });

  it("falls back to the default guide prompt when learn mode context is incomplete", async () => {
    await POST(
      makeRequest({
        messages: [{ role: "user", content: "Teach me" }],
        mode: "learn",
        guideContext: { documentType: "review_article" },
      })
    );

    expect(getGuideSystemPrompt).not.toHaveBeenCalled();
    expect(getDefaultGuidePrompt).toHaveBeenCalledOnce();
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ system: "default-guide-prompt" })
    );
  });

  it("returns 401 when authentication fails", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "Hello" }],
      })
    );
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/authentication/i);
  });

  it("returns rate limit response when rate limited", async () => {
    const rateLimitRes = new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      { status: 429 }
    );
    mockCheckRateLimit.mockResolvedValue(rateLimitRes);
    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "Hello" }],
      })
    );
    expect(res.status).toBe(429);
  });

  it("returns 400 for invalid input", async () => {
    const res = await POST(
      makeRequest({
        messages: "not-an-array",
      })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("returns 400 when more than 50 chat messages are submitted", async () => {
    const res = await POST(
      makeRequest({
        messages: Array.from({ length: 51 }, () => ({
          role: "user",
          content: "Hello",
        })),
      })
    );

    expect(res.status).toBe(400);
    expect(mockStreamText).not.toHaveBeenCalled();
  });

  it("returns 503 when the AI service is not configured", async () => {
    mockIsAIConfigured.mockReturnValue(false);

    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "Hello" }],
      })
    );

    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toBe(
      "AI service is not configured. Please contact an administrator."
    );
  });

  it("returns 500 for uncaught server errors", async () => {
    mockStreamText.mockImplementation(() => {
      throw new Error("boom");
    });

    const res = await POST(
      makeRequest({
        messages: [{ role: "user", content: "Hello" }],
      })
    );

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe(
      "An unexpected error occurred. Please try again."
    );
  });
});
