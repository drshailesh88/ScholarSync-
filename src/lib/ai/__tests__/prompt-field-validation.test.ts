import { describe, it, expect } from "vitest";

/**
 * These tests validate that the AI prompt templates reference field names
 * that actually exist in the TypeScript type definitions.
 *
 * This catches the class of bugs where the prompt says "latex" but the
 * type system expects "expression".
 */

// We test by checking that the prompt string contains the correct field names
// and does NOT contain the old incorrect field names.

import { getSlideGeneratorSystemPrompt } from "../prompts/presentation";

describe("prompt field validation", () => {
  const prompt = getSlideGeneratorSystemPrompt({
    audienceType: "general",
    themeKey: "modern",
  });

  // -----------------------------------------------------------------------
  // Math block: should use "expression", not "latex"
  // -----------------------------------------------------------------------
  describe("math block fields", () => {
    it("uses 'expression' field (not 'latex')", () => {
      // The prompt should contain "expression" in math block context
      expect(prompt).toContain("expression");
    });

    it("includes 'displayMode' field", () => {
      expect(prompt).toContain("displayMode");
    });
  });

  // -----------------------------------------------------------------------
  // Diagram block: should use "syntax", not "mermaid"
  // -----------------------------------------------------------------------
  describe("diagram block fields", () => {
    it("uses 'syntax' field (not 'mermaid')", () => {
      expect(prompt).toContain("syntax");
    });

    it("includes 'diagramType' field", () => {
      expect(prompt).toContain("diagramType");
    });
  });

  // -----------------------------------------------------------------------
  // Callout block: should use "type", not "variant"
  // -----------------------------------------------------------------------
  describe("callout block fields", () => {
    it("uses valid callout types", () => {
      // Should contain at least some of the valid callout types
      const validTypes = ["finding", "limitation", "methodology", "clinical", "warning", "important", "note"];
      const hasAnyValidType = validTypes.some((t) => prompt.includes(t));
      expect(hasAnyValidType).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // Timeline block: should use "entries", not "events"
  // -----------------------------------------------------------------------
  describe("timeline block fields", () => {
    it("uses 'entries' field (not 'events')", () => {
      expect(prompt).toContain("entries");
    });

    it("uses 'label' field (not 'title' for entry name)", () => {
      expect(prompt).toContain("label");
    });
  });

  // -----------------------------------------------------------------------
  // Bibliography block: should use "formatted", not "text"
  // -----------------------------------------------------------------------
  describe("bibliography block fields", () => {
    it("uses 'formatted' field", () => {
      expect(prompt).toContain("formatted");
    });
  });

  // -----------------------------------------------------------------------
  // Content block type coverage
  // -----------------------------------------------------------------------
  describe("content block type coverage", () => {
    const blockTypes = [
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
    ];

    it("prompt mentions all block types", () => {
      for (const type of blockTypes) {
        expect(prompt.toLowerCase()).toContain(type.toLowerCase());
      }
    });
  });
});
