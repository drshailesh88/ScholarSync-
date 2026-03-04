/**
 * Tests for markdown-to-tiptap parser
 *
 * Tests conversion of markdown strings to Tiptap JSON format.
 */

import { describe, it, expect } from "vitest";
import { markdownToTiptap, type SourceReference } from "../markdown-to-tiptap";

describe("markdownToTiptap", () => {
  describe("basic structure", () => {
    it("empty string", () => {
      const result = markdownToTiptap("");
      expect(result.type).toBe("doc");
    });

    it("single paragraph", () => {
      const result = markdownToTiptap("Hello world");
      expect(result.content?.[0].type).toBe("paragraph");
    });

    it("multiple paragraphs", () => {
      const result = markdownToTiptap("First\n\nSecond");
      expect(result.content).toHaveLength(2);
    });
  });

  describe("headings", () => {
    it("# H1", () => {
      const result = markdownToTiptap("# Title");
      expect(result.content?.[0].type).toBe("heading");
      expect(result.content?.[0].attrs?.level).toBe(1);
    });

    it("## H2", () => {
      const result = markdownToTiptap("## Subtitle");
      expect(result.content?.[0].attrs?.level).toBe(2);
    });

    it("###-######", () => {
      const r3 = markdownToTiptap("### H3");
      const r4 = markdownToTiptap("#### H4");
      const r5 = markdownToTiptap("##### H5");
      const r6 = markdownToTiptap("###### H6");
      expect(r3.content?.[0].attrs?.level).toBe(3);
      expect(r4.content?.[0].attrs?.level).toBe(4);
      expect(r5.content?.[0].attrs?.level).toBe(5);
      expect(r6.content?.[0].attrs?.level).toBe(6);
    });
  });

  describe("inline formatting", () => {
    it("**bold**", () => {
      const result = markdownToTiptap("**bold**");
      expect(result.content?.[0].content?.[0].marks?.[0].type).toBe("bold");
    });

    it("*italic*", () => {
      const result = markdownToTiptap("*italic*");
      expect(result.content?.[0].content?.[0].marks?.[0].type).toBe("italic");
    });

    it("`code`", () => {
      const result = markdownToTiptap("`code`");
      expect(result.content?.[0].content?.[0].marks?.[0].type).toBe("code");
    });

    it("[link](url)", () => {
      const result = markdownToTiptap("[text](https://example.com)");
      const marks = result.content?.[0].content?.[0].marks;
      expect(marks?.[0].type).toBe("link");
      expect(marks?.[0].attrs?.href).toBe("https://example.com");
    });

    it("bold in context", () => {
      const result = markdownToTiptap("This is **bold** text");
      const content = result.content?.[0].content;
      expect(content?.[1].marks?.[0].type).toBe("bold");
    });
  });

  describe("lists", () => {
    it("bullet list", () => {
      const result = markdownToTiptap("- Item");
      expect(result.content?.[0].type).toBe("bulletList");
    });

    it("multiple bullets", () => {
      const result = markdownToTiptap("- One\n- Two\n- Three");
      expect(result.content?.[0].content).toHaveLength(3);
    });

    it("ordered list", () => {
      const result = markdownToTiptap("1. Item");
      expect(result.content?.[0].type).toBe("orderedList");
    });

    it("paragraph-list-paragraph", () => {
      const result = markdownToTiptap("Before\n\n- Item\n\nAfter");
      expect(result.content).toHaveLength(3);
    });
  });

  describe("blockquotes", () => {
    it("single line", () => {
      const result = markdownToTiptap("> Quote");
      expect(result.content?.[0].type).toBe("blockquote");
    });

    it("multiline", () => {
      const result = markdownToTiptap("> Line one\n> Line two");
      const text = result.content?.[0].content?.[0].content?.[0].text;
      expect(text).toBe("Line one Line two");
    });
  });

  describe("horizontal rules", () => {
    it("---", () => {
      expect(markdownToTiptap("---").content?.[0].type).toBe("horizontalRule");
    });

    it("***", () => {
      expect(markdownToTiptap("***").content?.[0].type).toBe("horizontalRule");
    });
  });

  describe("citations", () => {
    it("single [5]", () => {
      const result = markdownToTiptap("See [5]");
      expect(result.content?.[0].content?.[1].marks?.[0].type).toBe("bold");
    });

    it("multiple [5,12]", () => {
      const result = markdownToTiptap("[5,12]");
      expect(result.content?.[0].content).toHaveLength(2);
    });

    it("range [5-7]", () => {
      const result = markdownToTiptap("[5-7]");
      expect(result.content?.[0].content).toHaveLength(3);
    });

    it("semicolon [5;8;10]", () => {
      const result = markdownToTiptap("[5;8;10]");
      expect(result.content?.[0].content).toHaveLength(3);
    });

    it("with sources - DOI link", () => {
      const sources: SourceReference[] = [{ doi: "10.1234/test" }];
      const result = markdownToTiptap("[1]", sources);
      const href = result.content?.[0].content?.[0].marks?.[0].attrs?.href;
      expect(href).toBe("https://doi.org/10.1234/test");
    });

    it("with sources - PMID link", () => {
      const sources: SourceReference[] = [{ pmid: "12345" }];
      const result = markdownToTiptap("[1]", sources);
      const href = result.content?.[0].content?.[0].marks?.[0].attrs?.href;
      expect(href).toBe("https://pubmed.ncbi.nlm.nih.gov/12345");
    });
  });

  describe("edge cases", () => {
    it("whitespace only", () => {
      const result = markdownToTiptap("   \n   ");
      expect(result.type).toBe("doc");
    });

    it("no trailing newline", () => {
      const result = markdownToTiptap("Text");
      expect(result.content?.[0].content?.[0].text).toBe("Text");
    });

    it("long line", () => {
      const result = markdownToTiptap("A".repeat(1000));
      expect(result.type).toBe("doc");
    });

    it("unclosed bold", () => {
      const result = markdownToTiptap("**unclosed");
      expect(result.content?.[0].content?.[0].text).toBe("**unclosed");
    });

    it("empty brackets []", () => {
      const result = markdownToTiptap("[]");
      expect(result.content?.[0].content?.[0].text).toBe("[]");
    });

    it("em dash range [1—3]", () => {
      const result = markdownToTiptap("[1—3]");
      expect(result.content?.[0].content).toHaveLength(3);
    });

    it("en dash range [1–3]", () => {
      const result = markdownToTiptap("[1–3]");
      expect(result.content?.[0].content).toHaveLength(3);
    });

    it("unicode characters", () => {
      const result = markdownToTiptap("Café — naïve");
      expect(result.content?.[0].content?.[0].text).toBe("Café — naïve");
    });
  });

  describe("complex document", () => {
    it("deep research output", () => {
      const markdown = `# Synthesis

**Five studies** [1-3] examined.

## Findings

- Result A [4]
- Result B

> Evidence suggests caution.

---

See [1,3,5].`;

      const sources: SourceReference[] = [
        { doi: "10.1", pmid: "1" },
        { doi: "10.2", pmid: "2" },
        { doi: "10.3", pmid: "3" },
        { doi: "10.4", pmid: "4" },
        { doi: "10.5", pmid: "5" },
      ];

      const result = markdownToTiptap(markdown, sources);

      expect(result.type).toBe("doc");
      expect(result.content?.some((n) => n.type === "heading")).toBe(true);
      expect(result.content?.some((n) => n.type === "bulletList")).toBe(true);
      expect(result.content?.some((n) => n.type === "blockquote")).toBe(true);
      expect(result.content?.some((n) => n.type === "horizontalRule")).toBe(true);
    });
  });
});
