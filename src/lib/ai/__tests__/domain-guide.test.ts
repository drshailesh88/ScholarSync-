import { describe, expect, it } from "vitest";
import { getDefaultGuidePrompt, getGuideSystemPrompt } from "../prompts/guide";
import { medicineDomain } from "@/lib/search/domains/medicine";
import { multidisciplinaryDomain } from "@/lib/search/domains/multidisciplinary";
import type { DomainConfig } from "@/lib/search/domains/types";

describe("guide prompt domain branching", () => {
  const context = {
    documentType: "case_report" as const,
    stage: "understand" as const,
  };

  it("keeps the proven medical guide prompt for medicine", () => {
    const prompt = getGuideSystemPrompt(context, medicineDomain);

    expect(prompt).toContain("CARE checklist");
    expect(prompt).toContain("Indian medical education context");
  });

  it("keeps the proven medical guide prompt when domain is undefined", () => {
    const prompt = getGuideSystemPrompt(context);
    const defaultPrompt = getDefaultGuidePrompt();

    expect(prompt).toContain("CARE checklist");
    expect(defaultPrompt).toContain("Welcome to Guided Mode!");
    expect(defaultPrompt).toContain("scientific writing");
  });

  it("uses config-driven guidance for multidisciplinary domains", () => {
    const prompt = getGuideSystemPrompt(context, multidisciplinaryDomain);

    expect(prompt).toContain("AI research mentor for Multidisciplinary / Not Sure researchers.");
    expect(prompt).toContain("TARGET READER: researcher or graduate student");
    expect(prompt).toContain("AVAILABLE DOCUMENT TYPES:");
    expect(prompt).not.toContain("CARE checklist");
  });

  it("includes the configured target reader and reporting guidelines", () => {
    const customDomain: DomainConfig = {
      ...multidisciplinaryDomain,
      id: "physics",
      label: "Physics",
      guidanceContext: {
        targetReader: "physics graduate student",
        reportingGuidelines: ["APS journal article conventions", "arXiv preprint norms"],
        writingConventions: "Define symbols before using them. State assumptions explicitly.",
        documentTypes: ["original_article", "review_article", "conference_paper"],
      },
    };

    const prompt = getGuideSystemPrompt(context, customDomain);

    expect(prompt).toContain("TARGET READER: physics graduate student");
    expect(prompt).toContain("- APS journal article conventions");
    expect(prompt).toContain("- arXiv preprint norms");
    expect(prompt).toContain("Define symbols before using them.");
  });
});
