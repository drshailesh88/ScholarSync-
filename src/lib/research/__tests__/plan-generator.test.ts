import { describe, it, expect } from "vitest";
import { buildPlanPrompt, parsePlanResponse } from "../plan-generator";

describe("buildPlanPrompt", () => {
  it("builds basic prompt", () => {
    const result = buildPlanPrompt({ question: "SGLT2 inhibitors in heart failure" });
    expect(result.system).toContain("medical librarian");
    expect(result.user).toContain("SGLT2 inhibitors in heart failure");
  });

  it("includes current filters when provided", () => {
    const result = buildPlanPrompt({
      question: "test",
      currentFilters: { dateFrom: 2020, dateTo: 2024, studyTypes: ["rct"] },
    });
    expect(result.user).toContain("2020");
    expect(result.user).toContain("2024");
    expect(result.user).toContain("rct");
  });

  it("includes document context when provided", () => {
    const result = buildPlanPrompt({
      question: "test",
      documentContext: { title: "My Paper", sectionHeadings: ["Introduction", "Methods"] },
    });
    expect(result.user).toContain("My Paper");
    expect(result.user).toContain("Introduction");
    expect(result.user).toContain("Methods");
  });

  it("works with no optional fields", () => {
    const result = buildPlanPrompt({ question: "simple query" });
    expect(result.user).toContain("simple query");
    expect(result.user).not.toContain("pre-selected");
    expect(result.user).not.toContain("Document context");
  });
});

describe("parsePlanResponse", () => {
  it("parses valid JSON response", () => {
    const json = JSON.stringify({
      pubmedQuery: "(SGLT2 inhibitors) AND (heart failure)",
      meshTerms: ["SGLT2", "Heart Failure"],
      synonyms: { SGLT2: ["gliflozin", "empagliflozin"] },
      suggestedFilters: { dateFrom: 2020, dateTo: 2024, studyTypes: ["rct"] },
      estimatedResults: "~150",
      rationale: "Focus on recent RCTs",
    });
    const result = parsePlanResponse("original query", json);
    expect(result.pubmedQuery).toBe("(SGLT2 inhibitors) AND (heart failure)");
    expect(result.meshTerms).toEqual(["SGLT2", "Heart Failure"]);
    expect(result.originalQuery).toBe("original query");
    expect(result.suggestedFilters.studyTypes).toEqual(["rct"]);
  });

  it("parses JSON from markdown code block", () => {
    const md = '```json\n{"pubmedQuery": "test query", "meshTerms": [], "synonyms": {}, "estimatedResults": "~50", "rationale": "simple"}\n```';
    const result = parsePlanResponse("test", md);
    expect(result.pubmedQuery).toBe("test query");
  });

  it("returns fallback for invalid JSON", () => {
    const result = parsePlanResponse("original", "not json at all");
    expect(result.originalQuery).toBe("original");
    expect(result.pubmedQuery).toBe("original");
    expect(result.meshTerms).toEqual([]);
    expect(result.rationale).toContain("Could not generate");
  });

  it("handles missing fields in JSON", () => {
    const result = parsePlanResponse("test", '{"pubmedQuery": "partial"}');
    expect(result.pubmedQuery).toBe("partial");
    expect(result.meshTerms).toEqual([]);
    expect(result.synonyms).toEqual({});
  });

  it("validates array fields", () => {
    const result = parsePlanResponse("test", '{"pubmedQuery": "q", "meshTerms": "not-an-array"}');
    expect(result.meshTerms).toEqual([]);
  });
});
