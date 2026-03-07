import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextResponse } from "next/server";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockGenerateText = vi.hoisted(() => vi.fn());
const mockGetModel = vi.hoisted(() => vi.fn());
const mockTraceEnd = vi.hoisted(() => vi.fn());
const mockTraceGeneration = vi.hoisted(() =>
  vi.fn(() => ({
    end: mockTraceEnd,
  }))
);
const mockGetDeck = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
  },
}));

vi.mock("ai", () => ({
  generateText: mockGenerateText,
}));

vi.mock("@/lib/ai/models", () => ({
  getModel: mockGetModel,
  traceGeneration: mockTraceGeneration,
}));

vi.mock("@/lib/actions/presentations", () => ({
  getDeck: mockGetDeck,
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: vi.fn().mockReturnValue({
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    }),
  },
}));

import {
  POST,
} from "@/app/api/slides/regenerate/route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/slides/regenerate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function getDeckFixture() {
  return {
    id: 42,
    title: "Cardiology Grand Rounds",
    audienceType: "grand_rounds",
    slides: [
      {
        id: 1,
        sortOrder: 0,
        title: "Background",
        subtitle: "",
        layout: "title_content",
        contentBlocks: [],
        speakerNotes: "",
      },
      {
        id: 2,
        sortOrder: 1,
        title: "Current Results",
        subtitle: "",
        layout: "title_content",
        contentBlocks: [{ type: "bullets", data: { items: ["Old point"] } }],
        speakerNotes: "Old notes",
      },
      {
        id: 3,
        sortOrder: 2,
        title: "Clinical Implications",
        subtitle: "",
        layout: "title_content",
        contentBlocks: [],
        speakerNotes: "",
      },
    ],
  };
}

describe("POST /api/slides/regenerate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);
    mockGetModel.mockReturnValue({ provider: "test-model" });
    mockGetDeck.mockResolvedValue(getDeckFixture());
    mockGenerateText.mockResolvedValue({
      text: JSON.stringify({
        title: "Updated Results",
        subtitle: "Cleaner framing",
        layout: "title_content",
        contentBlocks: [
          { type: "bullets", data: { items: ["New point", "Second point"] } },
        ],
        speakerNotes: "New speaker notes",
      }),
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
    });
  });

  it("returns a valid generated slide structure", async () => {
    const res = await POST(
      makeRequest({
        deckId: 42,
        slideId: 2,
        instruction: "Make this slide sharper.",
        tone: "keep_similar",
        context: {
          prevSlideTitle: "Background",
          nextSlideTitle: "Clinical Implications",
          deckTitle: "Cardiology Grand Rounds",
          audienceType: "grand_rounds",
        },
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      title: "Updated Results",
      subtitle: "Cleaner framing",
      layout: "title_content",
      contentBlocks: [
        { type: "bullets", data: { items: ["New point", "Second point"] } },
      ],
      speakerNotes: "New speaker notes",
    });
  });

  it("includes previous and next slide titles in the system prompt", async () => {
    await POST(
      makeRequest({
        deckId: 42,
        slideId: 2,
        instruction: "Tie this more closely to the story arc.",
        tone: "keep_similar",
        context: {
          prevSlideTitle: "Background",
          nextSlideTitle: "Clinical Implications",
          deckTitle: "Cardiology Grand Rounds",
          audienceType: "grand_rounds",
        },
      })
    );

    expect(mockGenerateText).toHaveBeenCalledTimes(1);
    const call = mockGenerateText.mock.calls[0][0];
    expect(call.system).toContain("Previous slide title: Background");
    expect(call.system).toContain("Next slide title: Clinical Implications");
    expect(call.system).toContain("User instruction: Tie this more closely to the story arc.");
  });

  it("applies tone guidance to the system prompt", async () => {
    await POST(
      makeRequest({
        deckId: 42,
        slideId: 2,
        instruction: "Trim this down.",
        tone: "more_concise",
        context: {
          prevSlideTitle: "Background",
          nextSlideTitle: "Clinical Implications",
          deckTitle: "Cardiology Grand Rounds",
          audienceType: "grand_rounds",
        },
      })
    );

    const call = mockGenerateText.mock.calls[0][0];
    expect(call.system).toContain(
      "Make the slide tighter and easier to scan while preserving the essential message."
    );
  });

  it("returns 404 for an invalid slideId", async () => {
    const res = await POST(
      makeRequest({
        deckId: 42,
        slideId: 999,
        instruction: "Rewrite it.",
        tone: "different_approach",
        context: {
          deckTitle: "Cardiology Grand Rounds",
          audienceType: "grand_rounds",
        },
      })
    );

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toContain("Slide");
  });

  it("returns 429 when rate limited", async () => {
    mockCheckRateLimit.mockResolvedValue(
      NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    );

    const res = await POST(
      makeRequest({
        deckId: 42,
        slideId: 2,
        instruction: "Rewrite it.",
        tone: "keep_similar",
        context: {
          deckTitle: "Cardiology Grand Rounds",
          audienceType: "grand_rounds",
        },
      })
    );

    expect(res.status).toBe(429);
    expect(mockGenerateText).not.toHaveBeenCalled();
  });
});

