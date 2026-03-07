import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextResponse } from "next/server";

const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockLogger = vi.hoisted(() => ({
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
    "slide-images": { limit: 20, windowSeconds: 3600 },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    withRequestId: vi.fn(() => mockLogger),
  },
}));

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/slides/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/slides/generate-image", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    mockGetCurrentUserId.mockResolvedValue("user_123");
    mockCheckRateLimit.mockResolvedValue(null);
  });

  it("returns imageUrl for a valid prompt", async () => {
    const mockGenerateSlideImage = vi.fn().mockResolvedValue({
      imageUrl: "/api/slides/upload-image?key=slides%2Fimages%2Fgenerated.png",
      attribution: "AI-generated vector illustration",
      provider: "illustration",
    });

    vi.doMock("@/lib/slides/image-generation", () => ({
      generateSlideImage: mockGenerateSlideImage,
    }));

    const { POST } = await import("@/app/api/slides/generate-image/route");
    const res = await POST(makeRequest({ prompt: "Scientific microscope close-up" }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.imageUrl).toContain("/api/slides/upload-image");
    expect(mockGenerateSlideImage).toHaveBeenCalledWith({
      prompt: "Scientific microscope close-up",
      style: undefined,
      aspectRatio: undefined,
    });
  });

  it("returns 429 when rate limited", async () => {
    vi.doMock("@/lib/slides/image-generation", () => ({
      generateSlideImage: vi.fn(),
    }));

    mockCheckRateLimit.mockResolvedValue(
      NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    );

    const { POST } = await import("@/app/api/slides/generate-image/route");
    const res = await POST(makeRequest({ prompt: "Test prompt" }));

    expect(res.status).toBe(429);
  });

  it("passes the selected style through to generation", async () => {
    const mockGenerateSlideImage = vi.fn().mockResolvedValue({
      imageUrl: "/api/slides/upload-image?key=slides%2Fimages%2Fdiagram.png",
      attribution: "AI-generated via OpenAI",
      provider: "openai",
    });

    vi.doMock("@/lib/slides/image-generation", () => ({
      generateSlideImage: mockGenerateSlideImage,
    }));

    const { POST } = await import("@/app/api/slides/generate-image/route");
    const res = await POST(
      makeRequest({
        prompt: "Signal transduction pathway",
        style: "diagram",
        aspectRatio: "4:3",
      })
    );

    expect(res.status).toBe(200);
    expect(mockGenerateSlideImage).toHaveBeenCalledWith({
      prompt: "Signal transduction pathway",
      style: "diagram",
      aspectRatio: "4:3",
    });
  });

  it("returns 400 for an empty prompt", async () => {
    vi.doMock("@/lib/slides/image-generation", () => ({
      generateSlideImage: vi.fn(),
    }));

    const { POST } = await import("@/app/api/slides/generate-image/route");
    const res = await POST(makeRequest({ prompt: "   " }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBe("Invalid request body");
  });
});

describe("generateSlideImage fallback chain", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.doUnmock("@/lib/slides/image-generation");
  });

  it("falls back from primary provider to illustration to stock photo", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-openai-key");

    const mod = await import("@/lib/slides/image-generation");
    const openAiSpy = vi
      .spyOn(mod.slideImageProviders, "openai")
      .mockRejectedValueOnce(new Error("primary failed"));
    const illustrationSpy = vi
      .spyOn(mod.slideImageProviders, "illustration")
      .mockRejectedValueOnce(new Error("illustration failed"));
    const stockSpy = vi.spyOn(mod.slideImageProviders, "stock").mockResolvedValueOnce({
      imageUrl: "/api/slides/upload-image?key=slides%2Fimages%2Fstock.jpg",
      attribution: "Photo by Test Photographer on Unsplash",
      provider: "unsplash",
    });

    const result = await mod.generateSlideImage({
      prompt: "Researchers in a modern wet lab",
      style: "realistic",
      aspectRatio: "16:9",
    });

    expect(result.provider).toBe("unsplash");
    expect(openAiSpy).toHaveBeenCalledTimes(1);
    expect(illustrationSpy).toHaveBeenCalledTimes(1);
    expect(stockSpy).toHaveBeenCalledTimes(1);
  });
});
