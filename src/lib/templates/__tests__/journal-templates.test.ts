import { describe, it, expect } from "vitest";
import {
  journalTemplates,
  getTemplateById,
  getTemplatesByCategory,
} from "../journal-templates";

describe("journalTemplates", () => {
  it("should have at least 5 templates", () => {
    expect(journalTemplates.length).toBeGreaterThanOrEqual(5);
  });

  it("each template should have required fields", () => {
    for (const t of journalTemplates) {
      expect(t.id).toBeDefined();
      expect(t.name).toBeDefined();
      expect(t.category).toBeDefined();
      expect(t.description).toBeDefined();
      expect(t.citationStyle).toBeDefined();
      expect(t.sections.length).toBeGreaterThan(0);
    }
  });

  it("each section should have heading and placeholder", () => {
    for (const t of journalTemplates) {
      for (const section of t.sections) {
        expect(section.heading).toBeDefined();
        expect(section.placeholder).toBeDefined();
        expect(section.heading.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("getTemplateById", () => {
  it("should find IMRaD template", () => {
    const template = getTemplateById("imrad");
    expect(template).toBeDefined();
    expect(template!.name).toContain("IMRaD");
  });

  it("should find case report template", () => {
    const template = getTemplateById("case-report");
    expect(template).toBeDefined();
    expect(template!.category).toBe("case_report");
  });

  it("should return undefined for unknown id", () => {
    expect(getTemplateById("nonexistent")).toBeUndefined();
  });
});

describe("getTemplatesByCategory", () => {
  it("should return research templates", () => {
    const templates = getTemplatesByCategory("research");
    expect(templates.length).toBeGreaterThan(0);
    templates.forEach((t) => expect(t.category).toBe("research"));
  });

  it("should return empty for non-existent category", () => {
    // @ts-expect-error testing invalid category
    const templates = getTemplatesByCategory("nonexistent");
    expect(templates.length).toBe(0);
  });
});
