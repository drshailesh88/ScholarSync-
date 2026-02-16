import { describe, it, expect } from "vitest";
import { journalTemplates, getTemplateById, getTemplatesByCategory } from "../journal-templates";

describe("journalTemplates data integrity", () => {
  it("has 5 templates", () => {
    expect(journalTemplates).toHaveLength(5);
  });

  it("each template has required fields", () => {
    for (const t of journalTemplates) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.citationStyle).toBeTruthy();
      expect(t.sections.length).toBeGreaterThan(0);
    }
  });

  it("each template has unique id", () => {
    const ids = journalTemplates.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all templates use vancouver citation style", () => {
    for (const t of journalTemplates) {
      expect(t.citationStyle).toBe("vancouver");
    }
  });

  it("all sections have heading and placeholder", () => {
    for (const t of journalTemplates) {
      for (const s of t.sections) {
        expect(s.heading).toBeTruthy();
        expect(s.placeholder).toBeTruthy();
      }
    }
  });
});

describe("getTemplateById", () => {
  it("finds IMRaD template", () => {
    const t = getTemplateById("imrad");
    expect(t).toBeDefined();
    expect(t!.name).toContain("IMRaD");
  });

  it("finds case report template", () => {
    const t = getTemplateById("case-report");
    expect(t).toBeDefined();
    expect(t!.category).toBe("case_report");
  });

  it("returns undefined for unknown id", () => {
    expect(getTemplateById("nonexistent")).toBeUndefined();
  });

  it("finds all templates by their ids", () => {
    for (const t of journalTemplates) {
      expect(getTemplateById(t.id)).toBe(t);
    }
  });
});

describe("getTemplatesByCategory", () => {
  it("finds research templates", () => {
    const templates = getTemplatesByCategory("research");
    expect(templates.length).toBeGreaterThan(0);
    templates.forEach(t => expect(t.category).toBe("research"));
  });

  it("finds review templates", () => {
    const templates = getTemplatesByCategory("review");
    expect(templates.length).toBeGreaterThan(0);
  });

  it("finds letter templates", () => {
    const templates = getTemplatesByCategory("letter");
    expect(templates.length).toBeGreaterThan(0);
  });

  it("returns empty array for unknown category", () => {
    expect(getTemplatesByCategory("nonexistent" as never)).toEqual([]);
  });

  it("finds meta_analysis templates", () => {
    const templates = getTemplatesByCategory("meta_analysis");
    expect(templates.length).toBeGreaterThan(0);
    templates.forEach(t => expect(t.category).toBe("meta_analysis"));
  });
});
