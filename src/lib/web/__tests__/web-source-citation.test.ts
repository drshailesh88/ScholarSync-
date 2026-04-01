import { describe, expect, it } from "vitest";

import {
  formatWebSourceCitation,
  formatWebSourceInText,
  buildWebSourceReferenceSnapshot,
} from "../web-source-citation";

describe("web-source-citation", () => {
  const source = {
    id: 42,
    title: "Understanding AI Safety",
    url: "https://example.com/ai-safety",
    domain: "example.com",
    author: "Jane Doe, John Smith",
    publishDate: "2024-06-15T00:00:00Z",
  };

  describe("formatWebSourceCitation", () => {
    it("formats a full citation with author and year", () => {
      const citation = formatWebSourceCitation(source);

      expect(citation).toContain("Jane Doe, John Smith");
      expect(citation).toContain("2024");
      expect(citation).toContain("Understanding AI Safety");
      expect(citation).toContain("https://example.com/ai-safety");
    });

    it("falls back to domain when no author", () => {
      const citation = formatWebSourceCitation({
        ...source,
        author: null,
      });

      expect(citation).toContain("example.com");
    });

    it("shows n.d. when no date", () => {
      const citation = formatWebSourceCitation({
        ...source,
        publishDate: null,
      });

      expect(citation).toContain("(n.d.)");
    });
  });

  describe("formatWebSourceInText", () => {
    it("formats in-text citation with first author and year", () => {
      const inText = formatWebSourceInText(source);

      expect(inText).toBe("(Jane Doe, 2024)");
    });

    it("falls back to domain when no author", () => {
      const inText = formatWebSourceInText({ ...source, author: null });

      expect(inText).toBe("(example.com, 2024)");
    });

    it("shows n.d. when no date", () => {
      const inText = formatWebSourceInText({ ...source, publishDate: null });

      expect(inText).toBe("(Jane Doe, n.d.)");
    });
  });

  describe("buildWebSourceReferenceSnapshot", () => {
    it("builds a reference snapshot for the editor", () => {
      const snapshot = buildWebSourceReferenceSnapshot({
        ...source,
        highlightText: "key finding about safety",
      });

      expect(snapshot).toEqual({
        type: "web_source",
        id: 42,
        title: "Understanding AI Safety",
        url: "https://example.com/ai-safety",
        author: "Jane Doe, John Smith",
        year: 2024,
        highlightText: "key finding about safety",
      });
    });

    it("includes null highlight when no text provided", () => {
      const snapshot = buildWebSourceReferenceSnapshot(source);

      expect(snapshot.highlightText).toBeNull();
    });

    it("falls back to domain for author", () => {
      const snapshot = buildWebSourceReferenceSnapshot({
        ...source,
        author: null,
      });

      expect(snapshot.author).toBe("example.com");
    });
  });
});
