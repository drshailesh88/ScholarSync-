import { describe, expect, it } from "vitest";
import { getDefaultDraftPrompt, getDraftSystemPrompt } from "../draft";
import { getDefaultGuidePrompt, getGuideSystemPrompt } from "../guide";

describe("draft prompts", () => {
  it("builds draft prompts in base, intensity, ScholarRules, then context order", () => {
    const prompt = getDraftSystemPrompt({
      intensity: "accelerate",
      scholarRules: {
        document_type: "original_article",
        target_journal: "JAPI",
      },
      projectTitle: "Spec 28 Project",
      currentSection: "Discussion",
    });

    const baseIdx = prompt.indexOf("You are ScholarSync Draft Assistant");
    const intensityIdx = prompt.indexOf("--- INTENSITY SETTING ---");
    const scholarRulesIdx = prompt.indexOf(
      "PROJECT RULES (ScholarRules — follow these strictly):"
    );
    const contextIdx = prompt.indexOf("--- DOCUMENT CONTEXT ---");

    expect(baseIdx).toBeGreaterThanOrEqual(0);
    expect(intensityIdx).toBeGreaterThan(baseIdx);
    expect(scholarRulesIdx).toBeGreaterThan(intensityIdx);
    expect(contextIdx).toBeGreaterThan(scholarRulesIdx);
    expect(prompt).toContain("Project: Spec 28 Project");
    expect(prompt).toContain("Current section: Discussion");
  });

  it("falls back to collaborate intensity in the default draft prompt", () => {
    const prompt = getDefaultDraftPrompt();

    expect(prompt).toContain("--- INTENSITY SETTING ---");
    expect(prompt).toContain("MODE: COLLABORATE");
  });
});

describe("guide prompts", () => {
  it("varies by both document type and stage", () => {
    const understandCaseReport = getGuideSystemPrompt({
      documentType: "case_report",
      stage: "understand",
    });
    const draftCaseReport = getGuideSystemPrompt({
      documentType: "case_report",
      stage: "draft",
    });
    const understandOriginalArticle = getGuideSystemPrompt({
      documentType: "original_article",
      stage: "understand",
    });

    expect(understandCaseReport).toContain("DOCUMENT TYPE: Case Report");
    expect(understandCaseReport).toContain("CURRENT STAGE: UNDERSTAND");
    expect(draftCaseReport).toContain("CURRENT STAGE: DRAFT");
    expect(draftCaseReport).not.toBe(understandCaseReport);
    expect(understandOriginalArticle).toContain(
      "DOCUMENT TYPE: Original Research Article"
    );
    expect(understandOriginalArticle).not.toBe(understandCaseReport);
  });

  it("provides a generic default guide prompt", () => {
    const prompt = getDefaultGuidePrompt();

    expect(prompt).toContain("You are ScholarSync Guide");
    expect(prompt).toContain("Ask what type of document they're working on");
  });
});
