import { describe, it, expect, vi, beforeEach } from "vitest";
import { resilientFetch } from "../resilient-fetch";

describe("resilientFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns response on success", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(new Response("ok", { status: 200 }));
    const res = await resilientFetch("http://example.com", undefined, { service: "test", maxRetries: 0 });
    expect(res.ok).toBe(true);
  });

  it("throws on non-retriable error", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(new Response("", { status: 400 }));
    await expect(resilientFetch("http://example.com", undefined, { service: "test", maxRetries: 3 }))
      .rejects.toThrow("HTTP 400");
  });

  it("retries on 429", async () => {
    const fetchMock = vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(new Response("", { status: 429 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));

    const res = await resilientFetch("http://example.com", undefined, {
      service: "test", maxRetries: 2, baseDelay: 1,
    });
    expect(res.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("retries on 503", async () => {
    const fetchMock = vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(new Response("", { status: 503 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));

    const res = await resilientFetch("http://example.com", undefined, {
      service: "test", maxRetries: 2, baseDelay: 1,
    });
    expect(res.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws after exhausting retries", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(new Response("", { status: 503 }));
    await expect(resilientFetch("http://example.com", undefined, {
      service: "test", maxRetries: 2, baseDelay: 1,
    })).rejects.toThrow("Failed after 2 retries");
  });

  it("calls onRetry callback", async () => {
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(new Response("", { status: 429 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));

    const onRetry = vi.fn();
    await resilientFetch("http://example.com", undefined, {
      service: "test", maxRetries: 2, baseDelay: 1, onRetry,
    });
    expect(onRetry).toHaveBeenCalledWith(1, 429);
  });

  it("does not retry on 404", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(new Response("", { status: 404 }));
    await expect(resilientFetch("http://example.com", undefined, {
      service: "test", maxRetries: 3,
    })).rejects.toThrow("HTTP 404");
  });
});
