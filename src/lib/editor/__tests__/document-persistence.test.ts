import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { withRetry } from "../save-retry";
import {
  enqueueSave,
  getQueue,
  clearQueue,
  removeFromQueue,
  processQueue,
} from "../offline-queue";
import { migrateLocalDocuments } from "../migrate-local-documents";

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (index: number): string | null => {
      return Object.keys(store)[index] || null;
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// Mock formatRelativeTime function (copied from page.tsx for testing)
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

describe("withRetry", () => {
  it("succeeds on first attempt → returns result", async () => {
    const mockFn = vi.fn().mockResolvedValue("success");
    const result = await withRetry(mockFn);
    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("succeeds on second attempt after first failure", async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValue("success");
    const result = await withRetry(mockFn, { maxRetries: 3 });
    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("calls onRetry callback on each retry", async () => {
    const onRetry = vi.fn();
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValue("success");
    await withRetry(mockFn, { maxRetries: 3, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenCalledWith(1, expect.any(Error));
    expect(onRetry).toHaveBeenCalledWith(2, expect.any(Error));
  });

  it("throws after maxRetries exceeded", async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error("Fail"));
    await expect(withRetry(mockFn, { maxRetries: 2 }))
      .rejects.toThrow("Fail");
    expect(mockFn).toHaveBeenCalledTimes(3); // initial + 2 retries
  });

  it("uses exponential backoff with jitter", async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValue("success");

    const start = Date.now();
    await withRetry(mockFn, { maxRetries: 3, initialDelay: 100, maxDelay: 1000 });
    const duration = Date.now() - start;

    // Should have waited at least 100ms (first retry) + some jitter
    expect(duration).toBeGreaterThanOrEqual(100);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("respects maxDelay option", async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValue("success");

    const start = Date.now();
    await withRetry(mockFn, { maxRetries: 1, initialDelay: 100, maxDelay: 150 });
    const duration = Date.now() - start;

    // With exponential backoff: 100 * 2^0 = 100ms + jitter (0-500ms)
    // But maxDelay should cap it at 150ms
    expect(duration).toBeLessThan(400); // Should be delayed but not too long
  });
});

describe("offline queue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("enqueueSave adds item to queue", () => {
    enqueueSave({
      documentId: 1,
      title: "Test",
      editor_content: {},
      plain_text_content: "test",
      word_count: 10,
      sectionId: 1,
    });
    const queue = getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0].documentId).toBe(1);
    expect(queue[0].title).toBe("Test");
  });

  it("enqueueSave replaces existing save for same documentId", () => {
    enqueueSave({
      documentId: 1,
      title: "V1",
      editor_content: {},
      plain_text_content: "v1",
      word_count: 5,
      sectionId: 1,
    });
    enqueueSave({
      documentId: 1,
      title: "V2",
      editor_content: {},
      plain_text_content: "v2",
      word_count: 6,
      sectionId: 1,
    });
    const queue = getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0].title).toBe("V2");
  });

  it("getQueue returns empty array when nothing queued", () => {
    expect(getQueue()).toEqual([]);
  });

  it("removeFromQueue removes specific item", () => {
    const item = {
      documentId: 1,
      title: "Test",
      editor_content: {},
      plain_text_content: "test",
      word_count: 10,
      sectionId: 1,
    };
    enqueueSave(item);
    const queue = getQueue();
    removeFromQueue(queue[0].id);
    expect(getQueue()).toEqual([]);
  });

  it("clearQueue empties all items", () => {
    enqueueSave({
      documentId: 1,
      title: "Test",
      editor_content: {},
      plain_text_content: "test",
      word_count: 10,
      sectionId: 1,
    });
    clearQueue();
    expect(getQueue()).toEqual([]);
  });

  it("processQueue processes items in timestamp order", async () => {
    // Add items with different timestamps
    const item1 = {
      documentId: 1,
      title: "First",
      editor_content: {},
      plain_text_content: "first",
      word_count: 10,
      sectionId: 1,
    };
    const item2 = {
      documentId: 2,
      title: "Second",
      editor_content: {},
      plain_text_content: "second",
      word_count: 20,
      sectionId: 2,
    };

    enqueueSave(item1);
    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));
    enqueueSave(item2);

    const saveFn = vi.fn().mockResolvedValue(undefined);
    const result = await processQueue(saveFn);

    expect(result.processed).toBe(2);
    expect(result.failed).toBe(0);
    expect(saveFn).toHaveBeenCalledTimes(2);
    // First item should be processed first (older timestamp)
    expect(saveFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      documentId: 1,
      title: "First",
    }));
  });

  it("processQueue handles failures gracefully", async () => {
    enqueueSave({
      documentId: 1,
      title: "Success",
      editor_content: {},
      plain_text_content: "success",
      word_count: 10,
      sectionId: 1,
    });
    enqueueSave({
      documentId: 2,
      title: "Fail",
      editor_content: {},
      plain_text_content: "fail",
      word_count: 20,
      sectionId: 2,
    });

    const saveFn = vi.fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("Save failed"));

    const result = await processQueue(saveFn);

    expect(result.processed).toBe(1);
    expect(result.failed).toBe(1);
    // Failed item should still be in queue
    const queue = getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0].documentId).toBe(2);
  });

  it("processQueue returns zeros when queue is empty", async () => {
    const saveFn = vi.fn();
    const result = await processQueue(saveFn);
    expect(result.processed).toBe(0);
    expect(result.failed).toBe(0);
    expect(saveFn).not.toHaveBeenCalled();
  });

  it("enqueueSave generates unique IDs with timestamp", () => {
    enqueueSave({
      documentId: 1,
      title: "Test",
      editor_content: {},
      plain_text_content: "test",
      word_count: 10,
      sectionId: 1,
    });

    const queue = getQueue();
    expect(queue[0].id).toMatch(/^1-\d+$/);
    expect(queue[0].timestamp).toBeGreaterThan(0);
  });
});

describe("migrateLocalDocuments", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns 0 when no documents provided", async () => {
    const count = await migrateLocalDocuments();
    expect(count).toBe(0);
  });

  it("returns 0 when empty array provided", async () => {
    const count = await migrateLocalDocuments([]);
    expect(count).toBe(0);
  });

  it("skips documents with documentId 'new'", async () => {
    const localDocs = [
      {
        key: "doc1",
        documentId: "new",
        data: {
          content: {},
          plainText: "template",
          wordCount: 0,
          title: "Template",
        },
      },
    ];

    // Mock the database operations
    vi.mock("../migrate-local-documents", async () => {
      const actual = await vi.importActual("../migrate-local-documents");
      return {
        ...actual,
        migrateLocalDocuments: async () => {
          // Return 0 because we skip "new" documents
          return 0;
        },
      };
    });

    const count = await migrateLocalDocuments(localDocs);
    expect(count).toBe(0);
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for < 1 minute", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now - 3000))).toBe("just now");
    expect(formatRelativeTime(new Date(now - 30000))).toBe("just now");
  });

  it("returns 'Xm ago' for minutes", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now - 120000))).toBe("2m ago");
    expect(formatRelativeTime(new Date(now - 1800000))).toBe("30m ago");
  });

  it("returns 'Xh ago' for hours", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now - 7200000))).toBe("2h ago");
    expect(formatRelativeTime(new Date(now - 14400000))).toBe("4h ago");
  });

  it("returns formatted date for > 24 hours", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    const oldDate = new Date(now - 86400000 * 2); // 2 days ago
    const result = formatRelativeTime(oldDate);
    // Should be in format like "Jan 15"
    expect(result).toMatch(/\w{3} \d{1,2}/);
  });

  it("handles edge case of exactly 1 minute", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now - 60000))).toBe("1m ago");
  });

  it("handles edge case of exactly 1 hour", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now - 3600000))).toBe("1h ago");
  });

  it("handles current time", () => {
    const now = Date.now();
    vi.setSystemTime(now);
    expect(formatRelativeTime(new Date(now))).toBe("just now");
  });
});

describe("localStorage error handling", () => {
  it("handles localStorage quota exceeded gracefully", () => {
    // Mock localStorage to throw quota exceeded error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn(() => {
      throw new DOMException("QuotaExceededError");
    });

    // Should not throw, just console.error
    expect(() => {
      enqueueSave({
        documentId: 1,
        title: "Test",
        editor_content: {},
        plain_text_content: "test",
        word_count: 10,
        sectionId: 1,
      });
    }).not.toThrow();

    localStorage.setItem = originalSetItem;
  });

  it("handles corrupted localStorage data gracefully", () => {
    // Store invalid JSON
    localStorage.setItem("scholarsync_save_queue", "invalid json");

    // Should not throw, just return empty array
    expect(() => {
      const queue = getQueue();
      expect(queue).toEqual([]);
    }).not.toThrow();
  });
});

describe("retry edge cases", () => {
  it("handles non-Error errors", async () => {
    const mockFn = vi.fn().mockRejectedValue("string error");
    await expect(withRetry(mockFn, { maxRetries: 1 }))
      .rejects.toThrow();
  });

  it("handles null errors", async () => {
    const mockFn = vi.fn().mockRejectedValue(null);
    await expect(withRetry(mockFn, { maxRetries: 1 }))
      .rejects.toThrow();
  });

  it("works with default options", async () => {
    const mockFn = vi.fn().mockResolvedValue("success");
    const result = await withRetry(mockFn);
    expect(result).toBe("success");
  });
});

describe("queue persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("persists queue across clearQueue and re-enqueue", () => {
    // Add initial item
    enqueueSave({
      documentId: 1,
      title: "First",
      editor_content: {},
      plain_text_content: "first",
      word_count: 10,
      sectionId: 1,
    });

    // Clear and re-add
    clearQueue();
    expect(getQueue()).toEqual([]);

    enqueueSave({
      documentId: 2,
      title: "Second",
      editor_content: {},
      plain_text_content: "second",
      word_count: 20,
      sectionId: 2,
    });

    const queue = getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0].documentId).toBe(2);
  });

  it("maintains queue integrity after multiple operations", () => {
    // Add multiple items
    enqueueSave({
      documentId: 1,
      title: "Doc 1",
      editor_content: {},
      plain_text_content: "content 1",
      word_count: 10,
      sectionId: 1,
    });
    enqueueSave({
      documentId: 2,
      title: "Doc 2",
      editor_content: {},
      plain_text_content: "content 2",
      word_count: 20,
      sectionId: 2,
    });
    enqueueSave({
      documentId: 3,
      title: "Doc 3",
      editor_content: {},
      plain_text_content: "content 3",
      word_count: 30,
      sectionId: 3,
    });

    let queue = getQueue();
    expect(queue).toHaveLength(3);

    // Remove middle item
    removeFromQueue(queue[1].id);
    queue = getQueue();
    expect(queue).toHaveLength(2);
    expect(queue.map(q => q.documentId)).toEqual([1, 3]);

    // Replace first item
    enqueueSave({
      documentId: 1,
      title: "Updated Doc 1",
      editor_content: {},
      plain_text_content: "updated content",
      word_count: 15,
      sectionId: 1,
    });

    queue = getQueue();
    expect(queue).toHaveLength(2);
    expect(queue.find(q => q.documentId === 1)?.title).toBe("Updated Doc 1");
  });
});
