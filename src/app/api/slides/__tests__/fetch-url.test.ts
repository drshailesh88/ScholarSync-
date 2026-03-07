import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------
const mockGetCurrentUserId = vi.hoisted(() => vi.fn());
const mockCheckRateLimit = vi.hoisted(() => vi.fn());
const mockFetch = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth", () => ({
  getCurrentUserId: mockGetCurrentUserId,
}));

vi.mock("@/lib/rate-limit", () => ({
  checkRateLimit: mockCheckRateLimit,
  RATE_LIMITS: {
    ai: { limit: 60, windowSeconds: 3600 },
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

// Store the original fetch so we can restore later
const originalFetch = globalThis.fetch;

import { POST } from "@/app/api/slides/fetch-url/route";
import { NextResponse } from "next/server";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/slides/fetch-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockFetchResponse(html: string, status = 200) {
  mockFetch.mockResolvedValueOnce(
    new Response(html, {
      status,
      headers: { "Content-Type": "text/html" },
    })
  );
}

describe("POST /api/slides/fetch-url", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUserId.mockResolvedValue("dev_user_001");
    mockCheckRateLimit.mockResolvedValue(null);
    // Replace global fetch with our mock
    globalThis.fetch = mockFetch;
  });

  // Restore original fetch after all tests
  afterAll(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns extracted content for a valid URL", async () => {
    mockFetchResponse(`
      <html>
        <head><title>Test Article</title></head>
        <body>
          <nav>Navigation</nav>
          <article>
            <h1>Hello World</h1>
            <p>This is a test article with some content that should be extracted properly.</p>
          </article>
          <footer>Footer</footer>
        </body>
      </html>
    `);

    const res = await POST(makeRequest({ url: "https://example.com/article" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe("Test Article");
    expect(body.content).toContain("Hello World");
    expect(body.content).toContain("test article with some content");
    expect(body.wordCount).toBeGreaterThan(0);
    expect(body.excerpt).toBeTruthy();
    // Navigation and footer should be stripped
    expect(body.content).not.toContain("Navigation");
    expect(body.content).not.toContain("Footer");
  });

  it("returns 400 for invalid URL format", async () => {
    const res = await POST(makeRequest({ url: "not-a-url" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("returns 400 for non-HTTP URL", async () => {
    const res = await POST(makeRequest({ url: "ftp://example.com/file" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("returns 400 for missing URL", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("truncates content at 50,000 characters", async () => {
    const longContent = "x".repeat(60_000);
    mockFetchResponse(`
      <html>
        <head><title>Long Article</title></head>
        <body><article><p>${longContent}</p></article></body>
      </html>
    `);

    const res = await POST(makeRequest({ url: "https://example.com/long" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.content.length).toBeLessThanOrEqual(50_000);
    expect(body.truncated).toBe(true);
  });

  it("strips HTML tags from content", async () => {
    mockFetchResponse(`
      <html>
        <head><title>Formatted</title></head>
        <body>
          <article>
            <p>Hello <strong>bold</strong> and <em>italic</em> text.</p>
            <script>alert("xss")</script>
            <style>.hidden { display: none; }</style>
          </article>
        </body>
      </html>
    `);

    const res = await POST(makeRequest({ url: "https://example.com/formatted" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.content).toContain("Hello bold and italic text.");
    expect(body.content).not.toContain("<strong>");
    expect(body.content).not.toContain("<em>");
    expect(body.content).not.toContain("alert");
    expect(body.content).not.toContain(".hidden");
  });

  it("returns 429 when rate limited", async () => {
    const rateLimitResponse = NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
    mockCheckRateLimit.mockResolvedValue(rateLimitResponse);

    const res = await POST(makeRequest({ url: "https://example.com/article" }));
    expect(res.status).toBe(429);
  });

  it("returns 401 when not authenticated", async () => {
    mockGetCurrentUserId.mockRejectedValue(new Error("Not authenticated"));

    const res = await POST(makeRequest({ url: "https://example.com/article" }));
    expect(res.status).toBe(401);
  });

  it("returns 400 for blocked domains (localhost)", async () => {
    const res = await POST(makeRequest({ url: "https://localhost/secret" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("not allowed");
  });

  it("returns 400 when remote server returns non-200", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response("Not Found", { status: 404 })
    );

    const res = await POST(makeRequest({ url: "https://example.com/missing" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("404");
  });

  it("uses og:title when available", async () => {
    mockFetchResponse(`
      <html>
        <head>
          <title>Fallback Title</title>
          <meta property="og:title" content="Better OG Title" />
        </head>
        <body><article><p>Content here</p></article></body>
      </html>
    `);

    const res = await POST(makeRequest({ url: "https://example.com/og" }));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe("Better OG Title");
  });
});
