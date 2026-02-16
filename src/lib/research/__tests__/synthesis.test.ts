import { describe, it, expect } from "vitest";
import { buildSynthesisPrompt, buildSynthesisPlanPrompt } from "../synthesis";
import type { SynthesisInput } from "../synthesis";

const makePapers = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    id: `p${i}`,
    title: `Paper ${i + 1}: Effects of Drug ${String.fromCharCode(65 + i)}`,
    authors: ["Author One", "Author Two", "Author Three", "Author Four"],
    journal: "Test Journal",
    year: 2020 + i,
    abstract: `This study examines drug ${String.fromCharCode(65 + i)} effects.`,
    pmid: `${10000 + i}`,
    doi: `10.1234/${i}`,
    studyType: "RCT",
    citationCount: 50,
    isOpenAccess: true,
    publicationTypes: [],
    sources: ["pubmed"],
    verificationStatus: "verified" as const,
    source: "pubmed" as const,
  }));

describe("buildSynthesisPrompt", () => {
  it("builds quick_summary prompt", () => {
    const input: SynthesisInput = { papers: makePapers(3), reportType: "quick_summary" };
    const result = buildSynthesisPrompt(input);
    expect(result.system).toContain("synthesis");
    expect(result.user).toContain("quick summary");
    expect(result.user).toContain("~250 words");
    expect(result.user).toContain("[1]");
    expect(result.user).toContain("[2]");
    expect(result.user).toContain("[3]");
  });

  it("builds literature_review prompt", () => {
    const input: SynthesisInput = { papers: makePapers(2), reportType: "literature_review" };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("structured literature review");
    expect(result.user).toContain("~800 words");
  });

  it("builds evidence_summary prompt", () => {
    const input: SynthesisInput = { papers: makePapers(2), reportType: "evidence_summary" };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("evidence summary");
    expect(result.user).toContain("~500 words");
  });

  it("builds custom prompt with instructions", () => {
    const input: SynthesisInput = {
      papers: makePapers(1),
      reportType: "custom",
      customInstructions: "Focus on safety data only",
    };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("Focus on safety data only");
  });

  it("respects custom word count", () => {
    const input: SynthesisInput = {
      papers: makePapers(1),
      reportType: "quick_summary",
      targetWordCount: 400,
    };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("~400 words");
  });

  it("truncates author list with et al", () => {
    const input: SynthesisInput = { papers: makePapers(1), reportType: "quick_summary" };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("et al.");
  });

  it("includes paper count", () => {
    const input: SynthesisInput = { papers: makePapers(5), reportType: "quick_summary" };
    const result = buildSynthesisPrompt(input);
    expect(result.user).toContain("5 total");
  });
});

describe("buildSynthesisPlanPrompt", () => {
  it("builds plan prompt", () => {
    const input: SynthesisInput = { papers: makePapers(3), reportType: "literature_review" };
    const result = buildSynthesisPlanPrompt(input);
    expect(result.system).toContain("synthesis planner");
    expect(result.user).toContain("literature_review");
    expect(result.user).toContain("[1]");
    expect(result.user).toContain("[2]");
    expect(result.user).toContain("[3]");
  });

  it("includes custom instructions in plan", () => {
    const input: SynthesisInput = {
      papers: makePapers(1),
      reportType: "custom",
      customInstructions: "Special focus",
    };
    const result = buildSynthesisPlanPrompt(input);
    expect(result.user).toContain("Special focus");
  });
});
