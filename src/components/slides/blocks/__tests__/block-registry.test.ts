import { describe, it, expect } from "vitest";
import { BLOCK_REGISTRY, getBlocksByCategory, createDefaultBlock } from "../index";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Block Registry Tests
// ---------------------------------------------------------------------------
describe("block-registry", () => {
  // -----------------------------------------------------------------------
  // BLOCK_REGISTRY completeness
  // -----------------------------------------------------------------------
  describe("BLOCK_REGISTRY", () => {
    const expectedTypes: ContentBlock["type"][] = [
      "text",
      "bullets",
      "chart",
      "table",
      "image",
      "math",
      "diagram",
      "code",
      "citation",
      "callout",
      "stat_result",
      "bibliography",
      "timeline",
      "quote",
      "divider",
      "toggle",
      "embed",
      "nested_card",
    ];

    it("has entries for all 18 content block types", () => {
      expect(Object.keys(BLOCK_REGISTRY)).toHaveLength(18);
      for (const type of expectedTypes) {
        expect(BLOCK_REGISTRY[type]).toBeDefined();
      }
    });

    it("every entry has a render component", () => {
      for (const [, entry] of Object.entries(BLOCK_REGISTRY)) {
        expect(typeof entry.render).toBe("function");
      }
    });

    it("every entry has a label", () => {
      for (const [, entry] of Object.entries(BLOCK_REGISTRY)) {
        expect(entry.label).toBeTruthy();
        expect(typeof entry.label).toBe("string");
      }
    });

    it("every entry has an iconName", () => {
      for (const [, entry] of Object.entries(BLOCK_REGISTRY)) {
        expect(entry.iconName).toBeTruthy();
        expect(typeof entry.iconName).toBe("string");
      }
    });

    it("every entry has a defaultData factory", () => {
      for (const [, entry] of Object.entries(BLOCK_REGISTRY)) {
        expect(typeof entry.defaultData).toBe("function");
      }
    });

    it("every entry has a valid category", () => {
      const validCategories = ["content", "media", "academic"];
      for (const [, entry] of Object.entries(BLOCK_REGISTRY)) {
        expect(validCategories).toContain(entry.category);
      }
    });

    it("defaultData returns non-null objects", () => {
      for (const [_type, entry] of Object.entries(BLOCK_REGISTRY)) {
        const data = entry.defaultData();
        expect(data).toBeTruthy();
        expect(typeof data).toBe("object");
      }
    });
  });

  // -----------------------------------------------------------------------
  // getBlocksByCategory
  // -----------------------------------------------------------------------
  describe("getBlocksByCategory", () => {
    it("returns blocks grouped by category", () => {
      const groups = getBlocksByCategory();
      expect(groups).toHaveProperty("content");
      expect(groups).toHaveProperty("media");
      expect(groups).toHaveProperty("academic");
    });

    it("content category includes text, bullets, quote, citation, divider, toggle, nested_card", () => {
      const groups = getBlocksByCategory();
      const contentTypes = groups.content.map((b) => b.type);
      expect(contentTypes).toContain("text");
      expect(contentTypes).toContain("bullets");
      expect(contentTypes).toContain("quote");
      expect(contentTypes).toContain("divider");
      expect(contentTypes).toContain("toggle");
      expect(contentTypes).toContain("nested_card");
    });

    it("media category includes image, chart, table, embed", () => {
      const groups = getBlocksByCategory();
      const mediaTypes = groups.media.map((b) => b.type);
      expect(mediaTypes).toContain("image");
      expect(mediaTypes).toContain("chart");
      expect(mediaTypes).toContain("table");
      expect(mediaTypes).toContain("embed");
    });

    it("academic category includes math, diagram, code, callout, stat_result, bibliography, timeline", () => {
      const groups = getBlocksByCategory();
      const academicTypes = groups.academic.map((b) => b.type);
      expect(academicTypes).toContain("math");
      expect(academicTypes).toContain("diagram");
      expect(academicTypes).toContain("code");
      expect(academicTypes).toContain("callout");
      expect(academicTypes).toContain("stat_result");
      expect(academicTypes).toContain("bibliography");
      expect(academicTypes).toContain("timeline");
    });

    it("all blocks are assigned exactly once", () => {
      const groups = getBlocksByCategory();
      const allTypes = Object.values(groups).flatMap((g) => g.map((b) => b.type));
      expect(allTypes).toHaveLength(18);
      expect(new Set(allTypes).size).toBe(18);
    });
  });

  // -----------------------------------------------------------------------
  // createDefaultBlock
  // -----------------------------------------------------------------------
  describe("createDefaultBlock", () => {
    it("creates a text block with default data", () => {
      const block = createDefaultBlock("text");
      expect(block.type).toBe("text");
      expect(block.data).toHaveProperty("text");
      expect(block.data).toHaveProperty("style");
    });

    it("creates a bullets block with default items", () => {
      const block = createDefaultBlock("bullets");
      expect(block.type).toBe("bullets");
      expect(block.data).toHaveProperty("items");
      expect(Array.isArray((block.data as Record<string, unknown>).items)).toBe(true);
    });

    it("creates a chart block with default chart data", () => {
      const block = createDefaultBlock("chart");
      expect(block.type).toBe("chart");
      expect(block.data).toHaveProperty("chartType");
      expect(block.data).toHaveProperty("labels");
      expect(block.data).toHaveProperty("datasets");
    });

    it("creates a table block with headers and rows", () => {
      const block = createDefaultBlock("table");
      expect(block.type).toBe("table");
      expect(block.data).toHaveProperty("headers");
      expect(block.data).toHaveProperty("rows");
    });

    it("creates a math block with expression", () => {
      const block = createDefaultBlock("math");
      expect(block.type).toBe("math");
      expect(block.data).toHaveProperty("expression");
    });

    it("creates a diagram block with syntax", () => {
      const block = createDefaultBlock("diagram");
      expect(block.type).toBe("diagram");
      expect(block.data).toHaveProperty("syntax");
    });

    it("creates a timeline block with entries", () => {
      const block = createDefaultBlock("timeline");
      expect(block.type).toBe("timeline");
      expect(block.data).toHaveProperty("entries");
      expect(Array.isArray((block.data as Record<string, unknown>).entries)).toBe(true);
    });

    it("creates a callout block with type and text", () => {
      const block = createDefaultBlock("callout");
      expect(block.type).toBe("callout");
      expect(block.data).toHaveProperty("text");
      expect(block.data).toHaveProperty("type");
    });

    it("creates a stat_result block with label and value", () => {
      const block = createDefaultBlock("stat_result");
      expect(block.type).toBe("stat_result");
      expect(block.data).toHaveProperty("label");
      expect(block.data).toHaveProperty("value");
    });

    it("creates a divider block with style", () => {
      const block = createDefaultBlock("divider");
      expect(block.type).toBe("divider");
      expect(block.data).toHaveProperty("style");
    });

    it("creates a bibliography block", () => {
      const block = createDefaultBlock("bibliography");
      expect(block.type).toBe("bibliography");
      expect(block.data).toHaveProperty("style");
    });

    it("creates blocks for every registered type", () => {
      for (const type of Object.keys(BLOCK_REGISTRY) as ContentBlock["type"][]) {
        const block = createDefaultBlock(type);
        expect(block.type).toBe(type);
        expect(block.data).toBeTruthy();
      }
    });
  });
});
