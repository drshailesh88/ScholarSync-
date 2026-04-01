import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

import { extractContent } from "../content-extractor";

describe("content-extractor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("extracts HTML and plain text from a URL", async () => {
    mockFetch
      // HTML request
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "<h1>Test Article</h1><p>This is the article body with enough content to pass the minimum length check for extraction.</p>"
          ),
      })
      // Markdown request
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "# Test Article\n\nThis is the article body with enough content to pass the minimum length check for extraction."
          ),
      });

    const result = await extractContent("https://example.com/article");

    expect(result.contentHtml).toContain("<h1>Test Article</h1>");
    expect(result.contentPlain).toContain("Test Article");
    expect(result.wordCount).toBeGreaterThan(0);
  });

  it("removes script tags from HTML", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            '<h1>Title</h1><script>alert("xss")</script><p>This is safe content that has enough length to pass the minimum character requirement for extraction.</p>'
          ),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "# Title\n\nThis is safe content that has enough length to pass the minimum character requirement for extraction."
          ),
      });

    const result = await extractContent("https://example.com");

    expect(result.contentHtml).not.toContain("<script>");
    expect(result.contentHtml).not.toContain("alert");
  });

  it("strips Jina metadata from markdown", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "<p>Content that is long enough to pass the minimum length check for the content extractor module.</p>"
          ),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "Title: Test\nURL Source: https://example.com\nPublished Time: 2024\n\nContent that is long enough to pass the minimum length check for the content extractor module."
          ),
      });

    const result = await extractContent("https://example.com");

    expect(result.contentPlain).not.toContain("URL Source:");
    expect(result.contentPlain).not.toContain("Published Time:");
  });

  it("throws on too-short content", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve("<p>Hi</p>"),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve("Hi"),
      });

    await expect(extractContent("https://example.com")).rejects.toThrow(
      "too little text"
    );
  });

  it("throws on 404", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(extractContent("https://example.com/missing")).rejects.toThrow(
      "Page not found"
    );
  });

  it("throws on 403", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 403 });

    await expect(extractContent("https://blocked.com")).rejects.toThrow(
      "Access denied"
    );
  });

  it("throws on timeout", async () => {
    const timeoutError = new Error("timeout");
    timeoutError.name = "TimeoutError";
    mockFetch.mockRejectedValueOnce(timeoutError);

    await expect(extractContent("https://slow.com")).rejects.toThrow(
      "timed out"
    );
  });

  it("removes inline event handlers from HTML", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            '<div onclick="alert(1)"><p onmouseover="hack()">This is safe content that has enough length to pass the minimum character requirement for extraction tests.</p></div>'
          ),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            "This is safe content that has enough length to pass the minimum character requirement for extraction tests."
          ),
      });

    const result = await extractContent("https://example.com");

    expect(result.contentHtml).not.toContain("onclick");
    expect(result.contentHtml).not.toContain("onmouseover");
  });
});
