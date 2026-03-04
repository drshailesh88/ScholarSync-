/**
 * Tests for section templates
 *
 * Tests document template definitions and template generation functions
 */

import { describe, it, expect } from "vitest";
import {
  DOCUMENT_TEMPLATES,
  buildPlaceholderMap,
  generateTemplateContent,
  type DocumentTemplate,
} from "../section-templates";

describe("DOCUMENT_TEMPLATES", () => {
  it("contains all expected document types", () => {
    expect(DOCUMENT_TEMPLATES).toHaveProperty("original-article");
    expect(DOCUMENT_TEMPLATES).toHaveProperty("case-report");
    expect(DOCUMENT_TEMPLATES).toHaveProperty("review-article");
    expect(DOCUMENT_TEMPLATES).toHaveProperty("meta-analysis");
  });

  it("has 4 template types", () => {
    const keys = Object.keys(DOCUMENT_TEMPLATES);
    expect(keys).toHaveLength(4);
  });

  describe("each template", () => {
    const templates = Object.entries(DOCUMENT_TEMPLATES) as [string, DocumentTemplate][];

    templates.forEach(([key, template]) => {
      describe(`${key}`, () => {
        it("has required type and label fields", () => {
          expect(template.type).toBe(key);
          expect(template.label).toBeTruthy();
          expect(typeof template.label).toBe("string");
        });

        it("has sections array", () => {
          expect(Array.isArray(template.sections)).toBe(true);
          expect(template.sections.length).toBeGreaterThan(0);
        });

        it("each section has required fields", () => {
          template.sections.forEach((section) => {
            expect(section.heading).toBeTruthy();
            expect(typeof section.heading).toBe("string");
            expect(section.level).toBeGreaterThan(0);
            expect(section.level).toBeLessThanOrEqual(6);
            expect(section.placeholder).toBeTruthy();
            expect(typeof section.placeholder).toBe("string");
          });
        });

        it("covers academic sections", () => {
          const headings = template.sections.map((s) => s.heading.toLowerCase());
          // All templates should have some common sections
          const hasCommonSection = headings.some((h) =>
            ["introduction", "methods", "results", "discussion", "conclusion"].includes(h)
          );
          expect(hasCommonSection).toBe(true);
        });

        it("has references section", () => {
          const headings = template.sections.map((s) => s.heading.toLowerCase());
          expect(headings).toContain("references");
        });
      });
    });
  });

  describe("original-article", () => {
    const template = DOCUMENT_TEMPLATES["original-article"];

    it("has methods subsections", () => {
      const methodsSection = template.sections.find((s) => s.heading === "Methods");
      expect(methodsSection?.subsections).toBeDefined();
      expect(methodsSection?.subsections?.length).toBe(4);
      expect(methodsSection?.subsections?.map((s) => s.heading)).toEqual([
        "Study Design",
        "Participants",
        "Outcomes",
        "Statistical Analysis",
      ]);
    });

    it("has results subsections", () => {
      const resultsSection = template.sections.find((s) => s.heading === "Results");
      expect(resultsSection?.subsections).toBeDefined();
      expect(resultsSection?.subsections?.length).toBe(2);
    });
  });

  describe("case-report", () => {
    const template = DOCUMENT_TEMPLATES["case-report"];

    it("has Case Presentation with subsections", () => {
      const caseSection = template.sections.find((s) => s.heading === "Case Presentation");
      expect(caseSection?.subsections).toBeDefined();
      expect(caseSection?.subsections?.length).toBe(5);
      expect(caseSection?.subsections?.map((s) => s.heading)).toContain("History");
      expect(caseSection?.subsections?.map((s) => s.heading)).toContain("Outcome");
    });
  });
});

describe("buildPlaceholderMap", () => {
  it("returns empty object for invalid document type", () => {
    const result = buildPlaceholderMap("invalid-type");
    expect(result).toEqual({});
  });

  it("builds map for original-article", () => {
    const result = buildPlaceholderMap("original-article");
    expect(Object.keys(result).length).toBeGreaterThan(0);
    expect(result["introduction"]).toBeTruthy();
    expect(result["methods"]).toBeTruthy();
    expect(result["results"]).toBeTruthy();
  });

  it("includes subsection placeholders", () => {
    const result = buildPlaceholderMap("original-article");
    expect(result["study design"]).toBeTruthy();
    expect(result["participants"]).toBeTruthy();
    expect(result["primary outcome"]).toBeTruthy();
  });

  it("keys are lowercase for case-insensitive lookup", () => {
    const result = buildPlaceholderMap("original-article");
    const keys = Object.keys(result);
    keys.forEach((key) => {
      expect(key).toBe(key.toLowerCase());
    });
  });
});

describe("generateTemplateContent", () => {
  it("returns doc with title and empty paragraph for invalid type", () => {
    const result = generateTemplateContent("invalid-type", "My Title");
    expect(result.type).toBe("doc");
    expect(result.content).toBeDefined();
    expect(result.content![0].type).toBe("heading");
    expect(result.content![0].attrs).toEqual({ level: 1 });
    expect(result.content![0].content).toEqual([{ type: "text", text: "My Title" }]);
    expect(result.content![1].type).toBe("paragraph");
  });

  it("generates content for original-article", () => {
    const result = generateTemplateContent("original-article", "Test Paper");
    expect(result.type).toBe("doc");
    expect(result.content![0].content).toEqual([{ type: "text", text: "Test Paper" }]);
  });

  it("generates all sections for original-article", () => {
    const result = generateTemplateContent("original-article");
    const headings = result.content!
      .filter((node) => node.type === "heading")
      .map((node) => node.content?.[0]?.text);
    expect(headings).toContain("Introduction");
    expect(headings).toContain("Methods");
    expect(headings).toContain("Results");
    expect(headings).toContain("Discussion");
    expect(headings).toContain("Conclusion");
    expect(headings).toContain("References");
  });

  it("includes empty paragraph after each heading", () => {
    const result = generateTemplateContent("case-report");
    for (let i = 1; i < result.content!.length - 1; i++) {
      if (result.content![i].type === "heading") {
        expect(result.content![i + 1].type).toBe("paragraph");
      }
    }
  });

  it("handles missing title", () => {
    const result = generateTemplateContent("original-article");
    expect(result.content![0].content).toBeUndefined();
  });

  it("includes subsections in correct order", () => {
    const result = generateTemplateContent("original-article");
    const headings = result.content!
      .filter((node) => node.type === "heading")
      .map((node) => node.content?.[0]?.text);
    const methodsIndex = headings.indexOf("Methods");
    const studyDesignIndex = headings.indexOf("Study Design");
    expect(studyDesignIndex).toBeGreaterThan(methodsIndex);
  });
});
