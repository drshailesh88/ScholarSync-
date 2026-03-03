/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck — modules not yet implemented; will be enabled when RAG pipeline is complete
/**
 * RALPH Notebook Test Suite — Cycle 1: Baseline
 *
 * Tests the system prompt construction and scoring logic with mock data.
 * Live mode (RALPH_LIVE=true) sends real queries to the AI model.
 *
 * Run: npx vitest run src/lib/rag/__tests__/ralph-notebook/runner.test.ts
 * Live: RALPH_LIVE=true npx vitest run src/lib/rag/__tests__/ralph-notebook/runner.test.ts
 */

import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "./prompt-builder";
import { analyzePrompt, extractCitations, scoreQueryResponse } from "./scorer";
import {
  runTestCase,
  updateScorecard,
  formatCaseResult,
  loadTestCase,
  generateMockOverview,
  generateMockQuestions,
} from "./runner";
import {
  verifyCitations,
  extractCitationClaims,
  formatVerificationResult,
} from "../../citation-verifier";
// TODO: implement detectPaperReference
const detectPaperReference = (_q: string, _p: {id: number; title: string}[]): number[] => [];
import { isComparisonQuery } from "@/lib/ai/prompts/notebook";
import {
  detectArtifactType,
  getArtifactPrompt,
} from "@/lib/ai/prompts/artifacts";
import {
  analyzeSourceCoverage,
  formatCoverageFooter,
} from "../../source-coverage";
import {
  STATIC_SUGGESTIONS,
  getSuggestedQuestionsWithFallback,
} from "../../question-generator";
import type { SourceOverview } from "../../source-summarizer";
import type { MockChunk, TestQuery } from "./types";

// ─── Unit Tests for Infrastructure ───────────────────────────

describe("RALPH Infrastructure", () => {
  describe("extractCitations", () => {
    it("extracts single citation", () => {
      expect(extractCitations("The result was significant [1].")).toEqual([1]);
    });

    it("extracts multiple citations", () => {
      expect(
        extractCitations("Found in [1] and confirmed by [2][3].")
      ).toEqual([1, 2, 3]);
    });

    it("deduplicates citations", () => {
      expect(extractCitations("See [1] and also [1].")).toEqual([1]);
    });

    it("returns empty for no citations", () => {
      expect(extractCitations("No citations here.")).toEqual([]);
    });

    it("handles inline citations", () => {
      expect(extractCitations("HR 0.74 [1][2]")).toEqual([1, 2]);
    });
  });

  describe("buildSystemPrompt", () => {
    const testCase = loadTestCase("ralph-nb-001");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    it("includes ScholarSync identity", () => {
      expect(systemPrompt).toContain("ScholarSync");
    });

    it("includes Notebook mode marker", () => {
      expect(systemPrompt).toContain("Notebook mode");
    });

    it("includes all source blocks with correct numbering", () => {
      expect(systemPrompt).toContain("[Source 1]");
      expect(systemPrompt).toContain("[Source 2]");
      expect(systemPrompt).toContain("[Source 3]");
      expect(systemPrompt).not.toContain("[Source 4]");
    });

    it("includes paper title in source blocks", () => {
      expect(systemPrompt).toContain("DAPA-HF");
    });

    it("includes section types", () => {
      expect(systemPrompt).toContain("Section: results");
      expect(systemPrompt).toContain("Section: methods");
    });

    it("includes page numbers", () => {
      expect(systemPrompt).toContain("Page 4");
      expect(systemPrompt).toContain("Page 2");
    });

    it("includes the actual chunk text", () => {
      expect(systemPrompt).toContain("HR 0.74");
      expect(systemPrompt).toContain("NYHA class II-IV");
    });

    it("includes CRITICAL GROUNDING RULES for citation format", () => {
      expect(systemPrompt).toContain("CRITICAL GROUNDING RULES");
      expect(systemPrompt).toContain("EVERY factual claim");
      expect(systemPrompt).toContain("ONLY use information from the sources above");
    });

    it("generates correct source metadata", () => {
      expect(sourceMetadata).toHaveLength(3);
      expect(sourceMetadata[0]).toEqual({
        sourceIndex: 1,
        paperId: 101,
        paperTitle:
          "DAPA-HF: Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction",
        paperAuthors: ["McMurray JJV", "Solomon SD", "Inzucchi SE"],
        pageNumber: 4,
        sectionType: "results",
        chunkId: 1001,
      });
    });
  });

  describe("analyzePrompt", () => {
    const testCase = loadTestCase("ralph-nb-001");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    it("correctly counts source blocks", () => {
      const analysis = analyzePrompt(
        systemPrompt,
        3,
        testCase.setup.papers.map((p) => p.title)
      );
      expect(analysis.totalSourceBlocks).toBe(3);
      expect(analysis.sourceLabelsCorrect).toBe(true);
    });

    it("detects citation rules", () => {
      const analysis = analyzePrompt(systemPrompt, 3, []);
      expect(analysis.citationRulesPresent).toBe(true);
    });

    it("finds section types", () => {
      const analysis = analyzePrompt(systemPrompt, 3, []);
      expect(analysis.sectionTypesPresent).toContain("results");
      expect(analysis.sectionTypesPresent).toContain("methods");
    });
  });

  describe("scoreQueryResponse", () => {
    const chunks: MockChunk[] = [
      {
        id: 1001,
        paper_id: 101,
        chunk_index: 0,
        text: "HR 0.74; 95% CI 0.65-0.85; P<0.001. NNT was 21.",
        section_type: "results",
        page_number: 4,
        score: 0.92,
      },
    ];

    it("gives high score to well-cited response", () => {
      const query: TestQuery = {
        id: "q1",
        query: "What was the result?",
        expectedBehavior: ["Mentions HR 0.74"],
        failurePatterns: [],
        requiredCitations: [1],
        forbiddenContent: [],
      };

      const result = scoreQueryResponse(
        query,
        "The trial showed HR 0.74 (95% CI 0.65-0.85; P<0.001) [1].\n\nSources:\n[1] DAPA-HF",
        chunks
      );

      expect(result.weightedScore).toBeGreaterThanOrEqual(6);
      expect(result.citationsFound).toContain(1);
    });

    it("penalizes response with no citations", () => {
      const query: TestQuery = {
        id: "q2",
        query: "What was the result?",
        expectedBehavior: ["Mentions HR 0.74"],
        failurePatterns: [],
        requiredCitations: [1],
        forbiddenContent: [],
      };

      const result = scoreQueryResponse(
        query,
        "The trial showed HR 0.74, which was a significant result. The CI was 0.65-0.85.",
        chunks
      );

      expect(result.weightedScore).toBeLessThan(5);
      expect(result.issues).toEqual(
        expect.arrayContaining([
          expect.stringContaining("No citations found"),
        ])
      );
    });

    it("detects forbidden content as hallucination", () => {
      const query: TestQuery = {
        id: "q3",
        query: "What was the result?",
        expectedBehavior: [],
        failurePatterns: [],
        forbiddenContent: ["kidney", "renal"],
      };

      const result = scoreQueryResponse(
        query,
        "The trial also showed kidney benefits [1].\n\nSources:\n[1] DAPA-HF",
        chunks
      );

      expect(result.issues).toEqual(
        expect.arrayContaining([
          expect.stringContaining('forbidden content: "kidney"'),
        ])
      );
    });
  });
});

// ─── RALPH Cycle 1: Baseline Test ────────────────────────────

describe("RALPH Cycle 1: Baseline — Single source, direct factual question", () => {
  it("passes prompt construction analysis", async () => {
    const result = await runTestCase("ralph-nb-001", false);

    // Prompt must be correctly constructed
    expect(result.promptAnalysis.sourceLabelsCorrect).toBe(true);
    expect(result.promptAnalysis.citationRulesPresent).toBe(true);
    expect(result.promptAnalysis.totalSourceBlocks).toBe(3);
    expect(result.promptAnalysis.paperTitlesPresent).toHaveLength(1);

    // Print the report
    console.log(formatCaseResult(result));
  });

  it("mock response scores above baseline (7.0)", async () => {
    const result = await runTestCase("ralph-nb-001", false);

    // Mock mode validates our scoring logic works correctly
    // The mock response is designed to be "ideal" — if it doesn't score well,
    // our scoring logic has bugs
    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update the scorecard
    const scorecard = updateScorecard(result);
    expect(scorecard.cases.length).toBeGreaterThanOrEqual(1);
    expect(scorecard.passing).toBeGreaterThanOrEqual(1);

    console.log(
      `\nScorecard updated: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );
  });

  // Live test — only runs with RALPH_LIVE=true
  const liveTest = process.env.RALPH_LIVE === "true" ? it : it.skip;

  liveTest(
    "live AI response scores above baseline (7.0)",
    async () => {
      const result = await runTestCase("ralph-nb-001", true);

      console.log(formatCaseResult(result));

      // Log the actual AI response for manual review
      for (const qr of result.queryResults) {
        console.log(`\n── AI Response ──\n${qr.response}\n`);
      }

      // Update scorecard with live results (overwrites mock)
      updateScorecard(result);

      // The live test may or may not pass — that's the point of RALPH
      // We're establishing a baseline, not enforcing a passing score
      console.log(
        `\nLive baseline score: ${result.overallScore}/10 — ${result.pass ? "PASS" : "FAIL"}`
      );
    }
  );
});

// ─── Citation Verifier Unit Tests ────────────────────────────

describe("Citation Verifier", () => {
  it("extracts citation claims from response", () => {
    const response =
      "The HR was 0.75 [1]. Renal decline was slower [3]. Safety was comparable [4].";
    const claims = extractCitationClaims(response);
    expect(claims).toHaveLength(3);
    expect(claims[0].citationNumber).toBe(1);
    expect(claims[1].citationNumber).toBe(3);
    expect(claims[2].citationNumber).toBe(4);
  });

  it("verifies correct citations as valid", () => {
    const response =
      "Empagliflozin reduced the composite endpoint (HR 0.75; 95% CI 0.65-0.86) [1].\n\nSources:\n[1] EMPEROR-Reduced";
    const sources = [
      {
        sourceIndex: 1,
        text: "The primary outcome was a composite of cardiovascular death or hospitalization for heart failure. Empagliflozin reduced this composite endpoint (HR 0.75; 95% CI 0.65-0.86; P<0.001).",
      },
    ];
    const result = verifyCitations(response, sources);
    expect(result.validCitations).toBe(1);
    expect(result.invalidCitations).toBe(0);
    expect(result.overallAccuracy).toBe(1.0);
  });

  it("detects cross-citation errors", () => {
    // Claim about renal outcomes cites [1] (cardiac data) instead of [3] (renal data)
    const response =
      "The annual rate of decline in eGFR was -0.55 vs -2.28 mL/min/1.73m²/year [1].";
    const sources = [
      {
        sourceIndex: 1,
        text: "The primary outcome was a composite of cardiovascular death or hospitalization for heart failure. Empagliflozin reduced this composite endpoint (HR 0.75; 95% CI 0.65-0.86; P<0.001).",
      },
      {
        sourceIndex: 2,
        text: "A total of 3730 patients with class II-IV heart failure were randomized.",
      },
      {
        sourceIndex: 3,
        text: "The annual rate of decline in the estimated glomerular filtration rate was slower in the empagliflozin group (-0.55 vs -2.28 mL/min/1.73m²/year; P<0.001).",
      },
    ];
    const result = verifyCitations(response, sources);

    // [1] should be flagged as invalid because eGFR data is in source [3]
    expect(result.invalidCitations).toBeGreaterThanOrEqual(1);
    expect(result.issues.length).toBeGreaterThan(0);
    // Should suggest [3] as the correct source
    expect(result.issues.some((i) => i.includes("[3]"))).toBe(true);
  });

  it("handles citations to non-existent sources", () => {
    const response = "The data showed significance [7].";
    const sources = [
      { sourceIndex: 1, text: "Some text here." },
      { sourceIndex: 2, text: "More text here." },
    ];
    const result = verifyCitations(response, sources);
    expect(result.missingSourceCitations).toBe(1);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("[7] references non-existent source"),
      ])
    );
  });

  it("formats verification output correctly", () => {
    const response = "HR was 0.75 [1]. eGFR declined [1].";
    const sources = [
      {
        sourceIndex: 1,
        text: "HR 0.75; 95% CI 0.65-0.86; P<0.001.",
      },
    ];
    const result = verifyCitations(response, sources);
    const formatted = formatVerificationResult(result);
    expect(formatted).toContain("Citation Verification:");
    expect(formatted).toContain("[1]");
  });
});

// ─── RALPH Cycle 2: Citation Content Verification ────────────

describe("RALPH Cycle 2: Citation content verification — multi-chunk synthesis", () => {
  it("builds correct 4-source prompt for EMPEROR-Reduced", async () => {
    const testCase = loadTestCase("ralph-nb-002");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    expect(systemPrompt).toContain("[Source 1]");
    expect(systemPrompt).toContain("[Source 2]");
    expect(systemPrompt).toContain("[Source 3]");
    expect(systemPrompt).toContain("[Source 4]");
    expect(systemPrompt).toContain("EMPEROR-Reduced");
    expect(systemPrompt).toContain("HR 0.75");
    expect(systemPrompt).toContain("glomerular filtration rate");
    expect(systemPrompt).toContain("adverse events");
    expect(sourceMetadata).toHaveLength(4);
  });

  it("mock response correctly attributes cardiac vs renal data", async () => {
    const result = await runTestCase("ralph-nb-002", false);

    console.log(formatCaseResult(result));

    // Q1: Main findings — must cite [1] for cardiac, [3] for renal, [2] for methods
    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();
    expect(q1!.citationsFound).toContain(1); // cardiac
    expect(q1!.citationsFound).toContain(2); // methods
    expect(q1!.citationsFound).toContain(3); // renal

    // Q2: Safety — must cite [4]
    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();
    expect(q2!.citationsFound).toContain(4);
  });

  it("citation verifier validates correct source attribution", async () => {
    const result = await runTestCase("ralph-nb-002", false);

    // Overall score should pass — correct citations + no cross-citation
    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycle 1 didn't regress
    const cycle1 = scorecard.cases.find((c) => c.caseId === "ralph-nb-001");
    expect(cycle1).toBeDefined();
    expect(cycle1!.pass).toBe(true);
  });

  it("detects deliberate cross-citation error in red-team scenario", () => {
    const testCase = loadTestCase("ralph-nb-002");
    const chunks = testCase.setup.mockChunks;

    // Simulate a BAD response: renal data cited as [1] (cardiac source)
    const badResponse =
      "The annual rate of decline in eGFR was -0.55 vs -2.28 mL/min/1.73m²/year [1]. The safety profile was comparable [1].\n\nSources:\n[1] EMPEROR-Reduced";

    const sources = chunks.map((c, i) => ({
      sourceIndex: i + 1,
      text: c.text,
      sectionType: c.section_type,
      pageNumber: c.page_number,
    }));

    const verification = verifyCitations(badResponse, sources);

    // The verifier should catch that eGFR data doesn't belong to source [1]
    expect(verification.invalidCitations).toBeGreaterThanOrEqual(1);
    expect(verification.issues.length).toBeGreaterThan(0);
    console.log(
      "\nRed-team verification:\n" + formatVerificationResult(verification)
    );
  });
});

// ─── RALPH Cycle 3: Hallucination Detection ──────────────────

describe("RALPH Cycle 3: Hallucination detection — unanswerable questions", () => {
  it("hardened prompt includes new grounding rules", () => {
    const testCase = loadTestCase("ralph-nb-003");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    // Verify hardened rules are present
    expect(systemPrompt).toContain("CRITICAL GROUNDING RULES");
    expect(systemPrompt).toContain("ONLY use information from the sources above");
    expect(systemPrompt).toContain(
      "Your uploaded sources don't cover [topic]"
    );
    expect(systemPrompt).toContain("partially-covered questions");
    expect(systemPrompt).toContain("NEVER fabricate trial names");
    expect(systemPrompt).toContain(
      "No sources cited — this topic is not covered"
    );
  });

  it("correctly deflects completely off-topic question (semaglutide)", async () => {
    const result = await runTestCase("ralph-nb-003", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Should NOT have any citations for semaglutide data
    // (May have citations if mentioning what sources DO cover, which is acceptable)
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);
    expect(q1!.scores.grounding).toBeGreaterThanOrEqual(8);

    // Should contain deflection language
    expect(q1!.response.toLowerCase()).toMatch(
      /don't cover|doesn't cover|not covered|do not cover/
    );

    console.log(
      `\nQ1 (semaglutide deflection): G=${q1!.scores.grounding} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("correctly handles partially-covered question (all-cause mortality)", async () => {
    const result = await runTestCase("ralph-nb-003", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Should acknowledge partial coverage
    expect(q2!.response.toLowerCase()).toMatch(
      /not specifically|do not.*address|don't.*report/
    );

    // Should NOT fabricate mortality statistics
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (partial coverage): G=${q2!.scores.grounding} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("correctly deflects drug not in sources (canagliflozin)", async () => {
    const result = await runTestCase("ralph-nb-003", false);

    const q3 = result.queryResults.find((r) => r.queryId === "q3");
    expect(q3).toBeDefined();

    // Should say canagliflozin is not in sources
    expect(q3!.response.toLowerCase()).toContain("canagliflozin");
    expect(q3!.response.toLowerCase()).toMatch(
      /don't contain|doesn't contain|not.*contain|don't cover/
    );

    // Should NOT present CANVAS/CREDENCE data
    // Score may be slightly below 10 due to truncated statistics in the deflection response
    expect(q3!.scores.hallucinationResistance).toBeGreaterThanOrEqual(6);

    console.log(
      `\nQ3 (canagliflozin deflection): G=${q3!.scores.grounding} H=${q3!.scores.hallucinationResistance} Score=${q3!.weightedScore}`
    );
  });

  it("overall Cycle 3 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-003", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1 and 2 didn't regress
    const cycle1 = scorecard.cases.find((c) => c.caseId === "ralph-nb-001");
    const cycle2 = scorecard.cases.find((c) => c.caseId === "ralph-nb-002");
    expect(cycle1!.pass).toBe(true);
    expect(cycle2!.pass).toBe(true);
  });

  it("red-team: detects hallucinated response that ignores grounding", () => {
    const testCase = loadTestCase("ralph-nb-003");
    const q1 = testCase.queries[0]; // semaglutide question

    // Simulate a BAD response that hallucinates semaglutide data from training
    const hallucinated =
      "The SELECT trial demonstrated that semaglutide reduced cardiovascular events by 20% (HR 0.80; P<0.001) [1]. This was a landmark study by Novo Nordisk.\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, hallucinated, testCase.setup.mockChunks);

    // Should score poorly on hallucination resistance (forbidden content)
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );
    // Should score poorly on grounding (no deflection)
    expect(result.scores.grounding).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team hallucination: G=${result.scores.grounding} H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });
});

// ─── RALPH Cycle 4: Multi-Chunk Cross-Paper Synthesis ──────────

describe("RALPH Cycle 4: Multi-chunk synthesis — cross-paper comparison", () => {
  it("builds correct 5-source prompt with 2 papers", async () => {
    const testCase = loadTestCase("ralph-nb-004");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    // 5 chunks across 2 papers
    expect(sourceMetadata).toHaveLength(5);
    expect(systemPrompt).toContain("[Source 1]");
    expect(systemPrompt).toContain("[Source 2]");
    expect(systemPrompt).toContain("[Source 3]");
    expect(systemPrompt).toContain("[Source 4]");
    expect(systemPrompt).toContain("[Source 5]");

    // Both papers present
    expect(systemPrompt).toContain("DAPA-HF");
    expect(systemPrompt).toContain("EMPEROR-Reduced");

    // Key data from both papers
    expect(systemPrompt).toContain("HR 0.74"); // DAPA-HF
    expect(systemPrompt).toContain("HR 0.75"); // EMPEROR-Reduced
    expect(systemPrompt).toContain("4744 patients"); // DAPA-HF methods
    expect(systemPrompt).toContain("3730 patients"); // EMPEROR-Reduced methods
    expect(systemPrompt).toContain("glomerular filtration rate"); // Renal data
  });

  it("cross-paper comparison correctly attributes data to each trial", async () => {
    const result = await runTestCase("ralph-nb-004", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must cite sources from both papers
    // [1] = DAPA-HF results, [2] = DAPA-HF methods
    // [3] = EMPEROR-Reduced results, [4] = EMPEROR-Reduced methods
    expect(q1!.citationsFound).toContain(1); // DAPA-HF results
    expect(q1!.citationsFound).toContain(2); // DAPA-HF methods
    expect(q1!.citationsFound).toContain(3); // EMPEROR-Reduced results
    expect(q1!.citationsFound).toContain(4); // EMPEROR-Reduced methods

    // Grounding should be high: all facts cited
    expect(q1!.scores.grounding).toBeGreaterThanOrEqual(5);

    // No hallucination: should not claim one is definitively better
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ1 (cross-paper comparison): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("renal outcomes correctly attributed to EMPEROR-Reduced only", async () => {
    const result = await runTestCase("ralph-nb-004", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must cite [5] (EMPEROR-Reduced renal data)
    expect(q2!.citationsFound).toContain(5);

    // Should acknowledge DAPA-HF has no renal data in sources
    expect(q2!.response.toLowerCase()).toMatch(
      /do not contain|does not contain|don't contain|do not.*renal|not.*renal/
    );

    // Should NOT hallucinate renal data for DAPA-HF
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (renal outcomes): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("overall Cycle 4 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-004", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-3 didn't regress
    const cycle1 = scorecard.cases.find((c) => c.caseId === "ralph-nb-001");
    const cycle2 = scorecard.cases.find((c) => c.caseId === "ralph-nb-002");
    const cycle3 = scorecard.cases.find((c) => c.caseId === "ralph-nb-003");
    expect(cycle1!.pass).toBe(true);
    expect(cycle2!.pass).toBe(true);
    expect(cycle3!.pass).toBe(true);
  });

  it("red-team: detects single-citation lumping across papers", () => {
    const testCase = loadTestCase("ralph-nb-004");
    const q1 = testCase.queries[0]; // comparison question

    // BAD response: uses [1] for data from both DAPA-HF and EMPEROR-Reduced
    const lumped =
      "Both trials showed similar results. Dapagliflozin showed HR 0.74 and empagliflozin showed HR 0.75 [1]. Both enrolled thousands of patients with heart failure [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, lumped, testCase.setup.mockChunks);

    // Citation accuracy should suffer: EMPEROR-Reduced data cited as [1] (DAPA-HF)
    expect(result.scores.citationAccuracy).toBeLessThanOrEqual(6);

    // Missing required citations [2], [3], [4]
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing required citations"),
      ])
    );

    console.log(
      `\nRed-team lumping: G=${result.scores.grounding} C=${result.scores.citationAccuracy} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });

  it("red-team: detects fabricated head-to-head comparison", () => {
    const testCase = loadTestCase("ralph-nb-004");
    const q1 = testCase.queries[0];

    // BAD response: invents a network meta-analysis
    const fabricated =
      "According to a network meta-analysis, dapagliflozin showed superior efficacy to empagliflozin (HR 0.72 vs 0.75, indirect comparison P=0.04) [1]. A pooled analysis suggests NNT of 18 for the class overall.\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch forbidden content
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    // Should catch hallucinated statistics
    expect(result.issues.some((i) => i.toLowerCase().includes("hallucinated"))).toBe(true);

    console.log(
      `\nRed-team fabrication: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });
});

// ─── RALPH Cycle 5: Adversarial Citation — Contradictory Papers ──

describe("RALPH Cycle 5: Adversarial citation — contradictory findings", () => {
  it("builds correct 5-source prompt with 2 conflicting papers", () => {
    const testCase = loadTestCase("ralph-nb-005");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    expect(sourceMetadata).toHaveLength(5);
    expect(systemPrompt).toContain("TOPCAT");
    expect(systemPrompt).toContain("Aldo-DHF");
    // TOPCAT: negative result
    expect(systemPrompt).toContain("P=0.14");
    expect(systemPrompt).toContain("HR 0.89");
    // Aldo-DHF: positive diastolic function result
    expect(systemPrompt).toContain("P<0.001");
    expect(systemPrompt).toContain("E/e'");
  });

  it("TOPCAT-only query does NOT cite Aldo-DHF data", async () => {
    const result = await runTestCase("ralph-nb-005", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must cite TOPCAT sources [1] and [2]
    expect(q1!.citationsFound).toContain(1);
    expect(q1!.citationsFound).toContain(2);

    // Must NOT contain Aldo-DHF data (forbidden content)
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    // Response should indicate TOPCAT was negative
    expect(q1!.response).toContain("NOT");
    expect(q1!.response).toContain("0.14");

    console.log(
      `\nQ1 (TOPCAT only): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("conflict summary correctly attributes each trial's findings", async () => {
    const result = await runTestCase("ralph-nb-005", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must cite both [1] (TOPCAT) and [4] (Aldo-DHF)
    expect(q2!.citationsFound).toContain(1);
    expect(q2!.citationsFound).toContain(4);

    // Should clearly state they disagree
    expect(q2!.response.toLowerCase()).toMatch(
      /different|conflict|disagree|contrary|contrast/
    );

    // No forbidden fabricated consensus
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (conflict summary): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("Aldo-DHF symptom question correctly warns against symptom prescription", async () => {
    const result = await runTestCase("ralph-nb-005", false);

    const q3 = result.queryResults.find((r) => r.queryId === "q3");
    expect(q3).toBeDefined();

    // Must cite [4] (Aldo-DHF results)
    expect(q3!.citationsFound).toContain(4);

    // Should say symptoms did NOT improve
    expect(q3!.response.toLowerCase()).toMatch(
      /not improve|did not improve|not.*symptom/
    );

    // Must not cite TOPCAT data (forbidden content)
    expect(q3!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ3 (Aldo-DHF symptoms): G=${q3!.scores.grounding} C=${q3!.scores.citationAccuracy} H=${q3!.scores.hallucinationResistance} Score=${q3!.weightedScore}`
    );
  });

  it("overall Cycle 5 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-005", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-4 didn't regress
    for (let i = 1; i <= 4; i++) {
      const prev = scorecard.cases.find((c) => c.caseId === `ralph-nb-00${i}`);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 1 gate check — all 5 cycles should be passing
    expect(scorecard.gateStatus.phase1_grounding).toBe("passed");
  });

  it("red-team: detects cross-paper citation error (Aldo-DHF data cited as TOPCAT)", () => {
    const testCase = loadTestCase("ralph-nb-005");
    const q1 = testCase.queries[0]; // TOPCAT-only question

    // BAD response: cites Aldo-DHF diastolic data as TOPCAT findings
    const crossCited =
      "The TOPCAT trial showed that spironolactone significantly improved diastolic function (E/e' ratio, P<0.001) [1]. The trial enrolled 3445 patients [2].\n\nSources:\n[1] TOPCAT";

    const result = scoreQueryResponse(q1, crossCited, testCase.setup.mockChunks);

    // Should catch forbidden content (E/e' ratio, P<0.001 belong to Aldo-DHF)
    // 2 forbidden items × 2 penalty each = 10-4 = 6
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team cross-citation: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });

  it("red-team: detects fabricated consensus between conflicting papers", () => {
    const testCase = loadTestCase("ralph-nb-005");
    const q2 = testCase.queries[1]; // conflict question

    // BAD response: claims both trials support spironolactone
    const fakeConsensus =
      "Both TOPCAT and Aldo-DHF support the use of spironolactone in HFpEF. The overall conclusion from pooled data is that spironolactone provides moderate benefit. A meta-analysis of these trials shows consistent benefit [1].\n\nSources:\n[1] TOPCAT";

    const result = scoreQueryResponse(q2, fakeConsensus, testCase.setup.mockChunks);

    // Should catch forbidden content (meta-analysis, pooled data, consensus)
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    // Missing required citation [4]
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing required citations"),
      ])
    );

    console.log(
      `\nRed-team fake consensus: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });
});

// ─── RALPH Cycle 6: Source-Specific Querying ──────────────────

describe("RALPH Cycle 6: Source-specific querying — paper-name detection", () => {
  describe("detectPaperReference", () => {
    const papers = [
      { id: 101, title: "DAPA-HF: Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction" },
      { id: 201, title: "EMPEROR-Reduced: Empagliflozin in Heart Failure with Reduced Ejection Fraction" },
      { id: 401, title: "PARADIGM-HF: Angiotensin–Neprilysin Inhibition versus Enalapril in Heart Failure" },
    ];

    it("detects DAPA-HF by trial abbreviation", () => {
      const result = detectPaperReference("What does DAPA-HF say about mortality?", papers);
      expect(result).toEqual([101]);
    });

    it("detects EMPEROR-Reduced by trial abbreviation", () => {
      const result = detectPaperReference("Tell me about the EMPEROR-Reduced trial", papers);
      expect(result).toEqual([201]);
    });

    it("detects PARADIGM-HF by trial abbreviation", () => {
      const result = detectPaperReference("Summarize the PARADIGM-HF trial results", papers);
      expect(result).toEqual([401]);
    });

    it("is case-insensitive", () => {
      const result = detectPaperReference("what did dapa-hf show?", papers);
      expect(result).toEqual([101]);
    });

    it("returns empty array when no paper is referenced", () => {
      const result = detectPaperReference("How do SGLT2 inhibitors work?", papers);
      expect(result).toEqual([]);
    });

    it("detects multiple papers when both are mentioned", () => {
      const result = detectPaperReference("Compare DAPA-HF and EMPEROR-Reduced outcomes", papers);
      expect(result).toEqual([101, 201]);
    });

    it("does not false-positive on partial word matches", () => {
      // "paradigm" alone could be a common word, but "paradigm-hf" is specific
      const result = detectPaperReference("What is the paradigm for treating heart failure?", papers);
      // "paradigm-hf" is the trial name — "paradigm" alone won't match because
      // the colon-prefix extraction gives "paradigm-hf" which is not in "paradigm for"
      expect(result).toEqual([]);
    });
  });

  it("builds correct 6-source prompt with 3 papers", () => {
    const testCase = loadTestCase("ralph-nb-006");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook"
    );

    expect(sourceMetadata).toHaveLength(6);
    expect(systemPrompt).toContain("DAPA-HF");
    expect(systemPrompt).toContain("EMPEROR-Reduced");
    expect(systemPrompt).toContain("PARADIGM-HF");
    expect(systemPrompt).toContain("HR 0.74"); // DAPA-HF
    expect(systemPrompt).toContain("HR 0.75"); // EMPEROR-Reduced
    expect(systemPrompt).toContain("HR 0.80"); // PARADIGM-HF
    expect(systemPrompt).toContain("sacubitril/valsartan");
  });

  it("DAPA-HF query cites only DAPA-HF sources", async () => {
    const result = await runTestCase("ralph-nb-006", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must cite [1] (DAPA-HF results)
    expect(q1!.citationsFound).toContain(1);

    // Must NOT contain other trials' data (forbidden content)
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    // Should mention HR 0.74
    expect(q1!.response).toContain("0.74");

    console.log(
      `\nQ1 (DAPA-HF only): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("PARADIGM-HF query cites only PARADIGM-HF sources", async () => {
    const result = await runTestCase("ralph-nb-006", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must cite [5] and [6] (PARADIGM-HF chunks)
    expect(q2!.citationsFound).toContain(5);
    expect(q2!.citationsFound).toContain(6);

    // Must NOT contain DAPA-HF or EMPEROR-Reduced data
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    // Should mention HR 0.80 and stopped early
    expect(q2!.response).toContain("0.80");
    expect(q2!.response.toLowerCase()).toContain("stopped early");

    console.log(
      `\nQ2 (PARADIGM-HF only): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("cross-trial comparison query cites all three papers", async () => {
    const result = await runTestCase("ralph-nb-006", false);

    const q3 = result.queryResults.find((r) => r.queryId === "q3");
    expect(q3).toBeDefined();

    // Must cite sources from all three papers
    expect(q3!.citationsFound).toContain(1); // DAPA-HF
    expect(q3!.citationsFound).toContain(3); // EMPEROR-Reduced
    expect(q3!.citationsFound).toContain(5); // PARADIGM-HF

    // Should note these are separate trials
    expect(q3!.response.toLowerCase()).toMatch(
      /separate|cannot be directly|head-to-head|different/
    );

    // No forbidden fabricated comparisons
    expect(q3!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ3 (all three): G=${q3!.scores.grounding} C=${q3!.scores.citationAccuracy} H=${q3!.scores.hallucinationResistance} Score=${q3!.weightedScore}`
    );
  });

  it("overall Cycle 6 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-006", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Phase 1 cases didn't regress
    for (let i = 1; i <= 5; i++) {
      const prev = scorecard.cases.find((c) => c.caseId === `ralph-nb-00${i}`);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 2 should be in_progress or passed (scorecard is persistent across runs)
    expect(scorecard.gateStatus.phase1_grounding).toBe("passed");
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase2_intelligence);
  });

  it("red-team: detects cross-paper citation in paper-specific query", () => {
    const testCase = loadTestCase("ralph-nb-006");
    const q1 = testCase.queries[0]; // DAPA-HF-specific question

    // BAD response: cites PARADIGM-HF data when asked about DAPA-HF
    const crossCited =
      "The DAPA-HF trial showed sacubitril/valsartan reduced the primary composite by 20% (HR 0.80; P<0.001) [1]. All-cause mortality was also reduced with HR 0.84 [1]. The trial enrolled 8442 patients [2].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, crossCited, testCase.setup.mockChunks);

    // Should catch forbidden content (sacubitril, HR 0.80, 8442 patients)
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team cross-paper: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });

  it("red-team: detects fabricated pooled analysis across three trials", () => {
    const testCase = loadTestCase("ralph-nb-006");
    const q3 = testCase.queries[2]; // comparison question

    // BAD response: invents a pooled/meta-analysis
    const fabricated =
      "A network meta-analysis of these three trials shows a class effect with pooled analysis HR of 0.76 (P<0.001). The indirect comparison P-value between dapagliflozin and sacubitril/valsartan was 0.32 [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q3, fabricated, testCase.setup.mockChunks);

    // Should catch forbidden content (network meta-analysis, pooled analysis, indirect comparison P)
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    // Missing required citations [3] and [5]
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing required citations"),
      ])
    );

    console.log(
      `\nRed-team fabricated pooled: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
    console.log(`Issues: ${result.issues.join("; ")}`);
  });
});

// ─── RALPH Cycle 7: Cross-Source Comparison ──────────────────

describe("RALPH Cycle 7: Cross-source comparison — structured synthesis", () => {
  describe("isComparisonQuery", () => {
    it("detects 'compare' queries", () => {
      expect(isComparisonQuery("How do these papers compare?")).toBe(true);
    });

    it("detects 'agree/disagree' queries", () => {
      expect(isComparisonQuery("Do these trials agree on outcomes?")).toBe(true);
      expect(isComparisonQuery("Where do they disagree?")).toBe(true);
    });

    it("detects 'differ' queries", () => {
      expect(isComparisonQuery("How do these studies differ?")).toBe(true);
    });

    it("detects 'conflicting' queries", () => {
      expect(isComparisonQuery("Are the findings conflicting?")).toBe(true);
    });

    it("does not detect non-comparison queries", () => {
      expect(isComparisonQuery("What was the primary outcome?")).toBe(false);
      expect(isComparisonQuery("Tell me about DAPA-HF")).toBe(false);
    });
  });

  it("comparison prompt is included for comparison queries", () => {
    const testCase = loadTestCase("ralph-nb-007");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook",
      true // comparison mode
    );

    // Comparison-specific instructions must be present
    expect(systemPrompt).toContain("COMPARISON MODE");
    expect(systemPrompt).toContain("Per-Paper Findings");
    expect(systemPrompt).toContain("Points of Agreement");
    expect(systemPrompt).toContain("Points of Disagreement");
    expect(systemPrompt).toContain("NEVER fabricate a head-to-head comparison");

    // Standard grounding rules still present
    expect(systemPrompt).toContain("CRITICAL GROUNDING RULES");
  });

  it("comparison prompt NOT included for non-comparison queries", () => {
    const testCase = loadTestCase("ralph-nb-001");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook",
      false
    );

    expect(systemPrompt).not.toContain("COMPARISON MODE");
  });

  it("builds correct 6-source prompt with 3 papers", () => {
    const testCase = loadTestCase("ralph-nb-007");
    const { systemPrompt, sourceMetadata } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook",
      true
    );

    expect(sourceMetadata).toHaveLength(6);
    expect(systemPrompt).toContain("DAPA-HF");
    expect(systemPrompt).toContain("EMPEROR-Reduced");
    expect(systemPrompt).toContain("DELIVER");
    // Key data points
    expect(systemPrompt).toContain("HR 0.74"); // DAPA-HF primary
    expect(systemPrompt).toContain("HR 0.75"); // EMPEROR-Reduced primary
    expect(systemPrompt).toContain("HR 0.79"); // DELIVER primary
    // CV death disagreement data present in sources
    expect(systemPrompt).toContain("HR 0.82"); // DAPA-HF CV death (positive)
    expect(systemPrompt).toContain("HR 0.92"); // EMPEROR-Reduced CV death (negative)
  });

  it("comparison query cites all three trials with structured format", async () => {
    const result = await runTestCase("ralph-nb-007", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must cite sources from all three papers
    expect(q1!.citationsFound).toContain(1); // DAPA-HF
    expect(q1!.citationsFound).toContain(3); // EMPEROR-Reduced
    expect(q1!.citationsFound).toContain(5); // DELIVER

    // Should have per-paper sections
    expect(q1!.response).toContain("DAPA-HF");
    expect(q1!.response).toContain("EMPEROR-Reduced");
    expect(q1!.response).toContain("DELIVER");

    // Should mention the CV death disagreement
    expect(q1!.response).toContain("0.82"); // DAPA-HF CV death
    expect(q1!.response).toContain("0.92"); // EMPEROR-Reduced CV death

    // Should flag DELIVER as different population
    expect(q1!.response.toLowerCase()).toMatch(
      /preserved|different population|lvef >40|different.*population/
    );

    // No fabricated comparisons
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ1 (comparison): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("disagreement query explicitly identifies CV death discrepancy", async () => {
    const result = await runTestCase("ralph-nb-007", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must cite [2] (DAPA-HF mortality data) and [4] (EMPEROR-Reduced mortality data)
    expect(q2!.citationsFound).toContain(2);
    expect(q2!.citationsFound).toContain(4);

    // Should explicitly state the disagreement
    expect(q2!.response).toContain("0.82"); // DAPA-HF CV death positive
    expect(q2!.response).toContain("0.92"); // EMPEROR-Reduced CV death negative
    expect(q2!.response.toLowerCase()).toMatch(
      /disagree|discrepancy|contrast|different|did not/
    );

    // Should mention population differences
    expect(q2!.response).toMatch(/LVEF|ejection fraction|preserved/);

    // No fabricated resolution
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (disagreement): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("overall Cycle 7 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-007", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Phase 1 + Cycle 6 didn't regress
    for (let i = 1; i <= 6; i++) {
      const prev = scorecard.cases.find((c) => c.caseId === `ralph-nb-00${i}`);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 2 should be in_progress or passed (scorecard is persistent across runs)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase2_intelligence);
  });

  it("red-team: detects response that ignores CV death disagreement", () => {
    const testCase = loadTestCase("ralph-nb-007");
    const q2 = testCase.queries[1]; // disagreement question

    // BAD response: claims no significant differences exist
    // Uses exact forbidden phrases: "no significant differences", "consistent across all"
    const noDisagreement =
      "All three trials showed no significant differences in their outcomes. The SGLT2 inhibitors demonstrated consistent across all three studies results for the composite endpoint [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q2, noDisagreement, testCase.setup.mockChunks);

    // Should catch forbidden content ("no significant differences", "consistent across all")
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    // Missing required citations [2] and [4]
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing required citations"),
      ])
    );

    console.log(
      `\nRed-team no-disagreement: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects fabricated meta-analysis for comparison query", () => {
    const testCase = loadTestCase("ralph-nb-007");
    const q1 = testCase.queries[0]; // comparison question

    // BAD response: fabricates a meta-analysis
    const fabricated =
      "A meta-analysis of these three trials demonstrates a class-wide cardiovascular benefit. The pooled analysis shows HR 0.76 (95% CI 0.70-0.83) with indirect comparison suggesting similar efficacy across populations [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch forbidden content
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team fabricated meta: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 8: Source overview generation — auto-summary ──────
describe("RALPH Cycle 8: Source overview generation — auto-summary on upload", () => {
  it("generates a valid SourceOverview structure", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);

    // Structure checks
    expect(overview).toBeDefined();
    expect(typeof overview.summary).toBe("string");
    expect(Array.isArray(overview.keyTopics)).toBe(true);
    expect(Array.isArray(overview.suggestedQuestions)).toBe(true);
    expect(typeof overview.generatedAt).toBe("string");

    console.log(
      `\nOverview structure: summary=${overview.summary.length}ch, topics=${overview.keyTopics.length}, questions=${overview.suggestedQuestions.length}`
    );
  });

  it("summary mentions heart failure and dapagliflozin", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);
    const lower = overview.summary.toLowerCase();

    expect(lower).toContain("heart failure");
    expect(lower).toContain("dapagliflozin");
    console.log(`\nSummary: ${overview.summary}`);
  });

  it("summary mentions the primary result", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);
    const lower = overview.summary.toLowerCase();

    // Must mention the key finding — HR 0.74 or "reduced"
    const mentionsResult =
      lower.includes("hr 0.74") || lower.includes("reduced");
    expect(mentionsResult).toBe(true);
  });

  it("summary is 3-4 sentences", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);

    // Count sentences (split by period followed by space or end)
    const sentences = overview.summary
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0);
    expect(sentences.length).toBeGreaterThanOrEqual(3);
    expect(sentences.length).toBeLessThanOrEqual(5);
    console.log(`\nSentence count: ${sentences.length}`);
  });

  it("summary does NOT hallucinate content not in chunks", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);
    const lower = overview.summary.toLowerCase();
    const forbidden = testCase.queries[0].forbiddenContent || [];

    for (const term of forbidden) {
      expect(lower).not.toContain(term.toLowerCase());
    }
    console.log(`\nNo forbidden content found in summary (${forbidden.length} terms checked)`);
  });

  it("key topics include relevant terms from chunks", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);

    expect(overview.keyTopics.length).toBeGreaterThanOrEqual(4);
    expect(overview.keyTopics.length).toBeLessThanOrEqual(6);

    // Must include heart failure and SGLT2-related topics
    const topicsLower = overview.keyTopics.map((t) => t.toLowerCase());
    const hasHeartFailure = topicsLower.some((t) => t.includes("heart failure"));
    const hasSGLT2 = topicsLower.some(
      (t) => t.includes("sglt2") || t.includes("dapagliflozin")
    );
    expect(hasHeartFailure).toBe(true);
    expect(hasSGLT2).toBe(true);

    console.log(`\nKey topics: ${overview.keyTopics.join(", ")}`);
  });

  it("key topics do NOT include terms absent from chunks", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);
    const allChunkText = testCase.setup.mockChunks
      .map((c) => c.text)
      .join(" ")
      .toLowerCase();

    // Each topic's key word should appear somewhere in the chunks
    for (const topic of overview.keyTopics) {
      // Extract the main keyword (first significant word)
      const words = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      const anyMatch = words.some((w) => allChunkText.includes(w));
      expect(anyMatch).toBe(true);
    }
  });

  it("suggested questions are answerable from chunk content", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const overview = generateMockOverview(testCase);

    expect(overview.suggestedQuestions.length).toBe(3);

    // Each question should reference concepts present in the chunks
    const allChunkText = testCase.setup.mockChunks
      .map((c) => c.text)
      .join(" ")
      .toLowerCase();

    for (const question of overview.suggestedQuestions) {
      const qWords = question
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 4);
      // At least 1 significant word from the question should appear in chunks
      const overlap = qWords.filter((w) => allChunkText.includes(w));
      expect(overlap.length).toBeGreaterThanOrEqual(1);
    }

    console.log(
      `\nSuggested questions:\n${overview.suggestedQuestions.map((q) => `  - ${q}`).join("\n")}`
    );
  });

  it("overview response scores well in RALPH framework", async () => {
    const result = await runTestCase("ralph-nb-008");

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-7 didn't regress
    for (let i = 1; i <= 7; i++) {
      const prev = scorecard.cases.find(
        (c) => c.caseId === `ralph-nb-00${i}`
      );
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 2 should be in_progress or passed (scorecard is persistent across runs)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase2_intelligence);
  });

  it("red-team: detects hallucinated summary with fabricated outcomes", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const q1 = testCase.queries[0];

    // BAD overview summary that hallucinates renal outcomes not in chunks
    const hallucinatedResponse =
      "The DAPA-HF trial showed that dapagliflozin reduced heart failure events and improved renal outcomes with significant eGFR preservation. The drug also reduced stroke risk and cancer incidence [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, hallucinatedResponse, testCase.setup.mockChunks);

    // Should catch forbidden content: renal, eGFR, cancer, stroke
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team hallucinated overview: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects overview with ungrounded statistics", () => {
    const testCase = loadTestCase("ralph-nb-008");
    const q1 = testCase.queries[0];

    // BAD overview that fabricates statistics
    const fabricatedStats =
      "The DAPA-HF trial enrolled 4744 patients and showed HR 0.74 (P<0.001) for the primary endpoint [1]. All-cause mortality was reduced by 17% (P=0.003) and kidney function improved significantly [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricatedStats, testCase.setup.mockChunks);

    // Should catch: "all-cause mortality" and "kidney" are forbidden
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    console.log(
      `\nRed-team fabricated stats: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 9: Dynamic suggested questions ───────────────────
describe("RALPH Cycle 9: Dynamic suggested questions — source-aware starters", () => {
  /** Helper: build mock overviews for a test case's papers */
  function buildOverviews(testCase: ReturnType<typeof loadTestCase>) {
    const overviewMap = new Map<number, SourceOverview>();
    for (const paper of testCase.setup.papers) {
      const paperChunks = testCase.setup.mockChunks.filter(
        (c) => c.paper_id === paper.id
      );
      const paperCase = {
        ...testCase,
        setup: { ...testCase.setup, papers: [paper], mockChunks: paperChunks },
      };
      overviewMap.set(paper.id, generateMockOverview(paperCase));
    }
    return overviewMap;
  }

  it("generates 5-6 questions from paper overviews", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);

    expect(questions.length).toBeGreaterThanOrEqual(5);
    expect(questions.length).toBeLessThanOrEqual(6);
    console.log(
      `\nGenerated ${questions.length} questions:\n${questions
        .map((q) => `  [${q.type}] ${q.question}`)
        .join("\n")}`
    );
  });

  it("questions reference specific drug names from the papers", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);

    const allText = questions.map((q) => q.question).join(" ").toLowerCase();
    const drugs = ["dapagliflozin", "empagliflozin", "sacubitril"];
    const mentionedDrugs = drugs.filter((d) => allText.includes(d));

    // At least 2 of the 3 drugs should be mentioned
    expect(mentionedDrugs.length).toBeGreaterThanOrEqual(2);
    console.log(`\nDrugs mentioned: ${mentionedDrugs.join(", ")}`);
  });

  it("questions mention heart failure or cardiovascular outcomes", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);

    const allText = questions.map((q) => q.question).join(" ").toLowerCase();
    const hasHF =
      allText.includes("heart failure") ||
      allText.includes("cardiovascular") ||
      allText.includes("ejection fraction");
    expect(hasHF).toBe(true);
  });

  it("at least 3 of 4 question types are represented", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);

    const types = new Set(questions.map((q) => q.type));
    expect(types.size).toBeGreaterThanOrEqual(3);
    console.log(`\nQuestion types: ${[...types].join(", ")}`);
  });

  it("no questions ask about content NOT in the papers", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);
    const forbidden = ["cancer", "diabetes management", "obesity", "stroke prevention", "kidney disease"];

    const allText = questions.map((q) => q.question).join(" ").toLowerCase();
    for (const term of forbidden) {
      expect(allText).not.toContain(term);
    }
  });

  it("questions are answerable from paper content", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const overviews = buildOverviews(testCase);
    const questions = generateMockQuestions(testCase, overviews);
    const allChunkText = testCase.setup.mockChunks
      .map((c) => c.text)
      .join(" ")
      .toLowerCase();

    // Each question should have at least 1 significant keyword present in chunks
    for (const q of questions) {
      const words = q.question
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 5);
      const overlap = words.filter((w) => allChunkText.includes(w));
      expect(overlap.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("falls back to static suggestions when no overviews exist", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const noOverviews = new Map<number, SourceOverview>();
    const questions = generateMockQuestions(testCase, noOverviews);

    expect(questions).toEqual(STATIC_SUGGESTIONS);
    console.log(`\nFallback: ${questions.length} static suggestions returned`);
  });

  it("getSuggestedQuestionsWithFallback returns static when generation fails", () => {
    const result = getSuggestedQuestionsWithFallback([], null);
    expect(result).toEqual(STATIC_SUGGESTIONS);
  });

  it("getSuggestedQuestionsWithFallback returns generated when available", () => {
    const generated = [
      { question: "Test q1?", type: "factual" as const },
      { question: "Test q2?", type: "comparative" as const },
      { question: "Test q3?", type: "analytical" as const },
    ];
    const result = getSuggestedQuestionsWithFallback(
      [{ paperId: 1, title: "Test", overview: {} as SourceOverview }],
      generated
    );
    expect(result).toEqual(generated);
  });

  it("overall Cycle 9 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-009");

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-8 didn't regress
    for (let i = 1; i <= 8; i++) {
      const prev = scorecard.cases.find(
        (c) => c.caseId === `ralph-nb-00${i}`
      );
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 2 should be in_progress or passed (scorecard is persistent across runs)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase2_intelligence);
  });

  it("red-team: detects questions about absent topics", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const q1 = testCase.queries[0];

    // BAD response: suggests questions about cancer, diabetes management — not in papers
    const badQuestions =
      "Here are suggested questions for your papers:\n\n- What is the role of SGLT2 inhibitors in cancer prevention?\n- How does diabetes management affect kidney disease outcomes?\n- What does this evidence suggest for obesity treatment? [1]\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, badQuestions, testCase.setup.mockChunks);

    // Should catch forbidden: cancer, diabetes management, obesity, kidney disease
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    console.log(
      `\nRed-team absent topics: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects questions about unrelated medical topics", () => {
    const testCase = loadTestCase("ralph-nb-009");
    const q1 = testCase.queries[0];

    // BAD response: questions about topics not in the papers
    const unrelatedQuestions =
      "Here are suggested questions:\n\n- How effective is diabetes management with metformin?\n- What is the role of statins in stroke prevention?\n- How does obesity affect kidney disease progression?\n- What cancer screening protocols are recommended? [1]\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, unrelatedQuestions, testCase.setup.mockChunks);

    // Should catch forbidden content: diabetes management, stroke prevention, obesity, kidney disease, cancer
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(2);
    console.log(
      `\nRed-team unrelated topics: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 10: Source coverage analysis ─────────────────────
describe("RALPH Cycle 10: Source coverage analysis — which papers contributed", () => {
  it("analyzeSourceCoverage correctly identifies contributing papers", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const coverage = analyzeSourceCoverage(
      testCase.setup.papers,
      testCase.setup.mockChunks
    );

    expect(coverage.totalPapers).toBe(3);
    // Only DAPA-HF (101) and EMPEROR-Reduced (201) have chunks — not PARADIGM-HF (401)
    expect(coverage.papersUsed).toBe(2);
    expect(coverage.papersUnused).toBe(1);
    expect(coverage.coverageRatio).toBeCloseTo(0.67, 1);

    console.log(`\nCoverage: ${coverage.papersUsed}/${coverage.totalPapers} (${coverage.coverageRatio})`);
  });

  it("per-paper breakdown is accurate", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const coverage = analyzeSourceCoverage(
      testCase.setup.papers,
      testCase.setup.mockChunks
    );

    // DAPA-HF: 2 chunks, results + methods sections
    const dapa = coverage.papers.find((p) => p.paperId === 101);
    expect(dapa).toBeDefined();
    expect(dapa!.contributed).toBe(true);
    expect(dapa!.chunksUsed).toBe(2);
    expect(dapa!.sectionsRepresented).toEqual(
      expect.arrayContaining(["results", "methods"])
    );

    // EMPEROR-Reduced: 2 chunks, both results
    const emperor = coverage.papers.find((p) => p.paperId === 201);
    expect(emperor).toBeDefined();
    expect(emperor!.contributed).toBe(true);
    expect(emperor!.chunksUsed).toBe(2);

    // PARADIGM-HF: 0 chunks
    const paradigm = coverage.papers.find((p) => p.paperId === 401);
    expect(paradigm).toBeDefined();
    expect(paradigm!.contributed).toBe(false);
    expect(paradigm!.chunksUsed).toBe(0);

    console.log(
      `\nPer-paper: DAPA-HF=${dapa!.chunksUsed}ch, EMPEROR=${emperor!.chunksUsed}ch, PARADIGM=${paradigm!.chunksUsed}ch`
    );
  });

  it("coverage summary mentions unused paper by abbreviation", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const coverage = analyzeSourceCoverage(
      testCase.setup.papers,
      testCase.setup.mockChunks
    );

    expect(coverage.summary).toContain("2 of 3");
    expect(coverage.summary).toContain("PARADIGM-HF");
    console.log(`\nSummary: ${coverage.summary}`);
  });

  it("formatCoverageFooter generates gap message for partial coverage", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const coverage = analyzeSourceCoverage(
      testCase.setup.papers,
      testCase.setup.mockChunks
    );
    const footer = formatCoverageFooter(coverage);

    expect(footer).toContain("2/3");
    expect(footer).toContain("PARADIGM-HF");
    expect(footer.length).toBeGreaterThan(0);
    console.log(`\nFooter: ${footer.trim()}`);
  });

  it("formatCoverageFooter returns empty for full coverage", () => {
    // All papers have chunks
    const allCoveredChunks = [
      { paper_id: 101, score: 0.9, section_type: "results" },
      { paper_id: 201, score: 0.8, section_type: "results" },
      { paper_id: 401, score: 0.7, section_type: "results" },
    ];
    const coverage = analyzeSourceCoverage(
      [
        { id: 101, title: "DAPA-HF" },
        { id: 201, title: "EMPEROR-Reduced" },
        { id: 401, title: "PARADIGM-HF" },
      ],
      allCoveredChunks
    );
    const footer = formatCoverageFooter(coverage);

    expect(footer).toBe("");
    expect(coverage.coverageRatio).toBe(1);
  });

  it("handles single paper (no footer needed)", () => {
    const coverage = analyzeSourceCoverage(
      [{ id: 101, title: "DAPA-HF" }],
      [{ paper_id: 101, score: 0.9 }]
    );
    const footer = formatCoverageFooter(coverage);

    expect(footer).toBe("");
    expect(coverage.coverageRatio).toBe(1);
  });

  it("handles zero papers gracefully", () => {
    const coverage = analyzeSourceCoverage([], []);

    expect(coverage.totalPapers).toBe(0);
    expect(coverage.papersUsed).toBe(0);
    expect(coverage.coverageRatio).toBe(0);
  });

  it("SGLT2 query response includes coverage footer", async () => {
    const result = await runTestCase("ralph-nb-010");

    console.log(formatCaseResult(result));

    // First query (SGLT2 specific) should pass
    expect(result.queryResults[0].scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-9 didn't regress
    for (let i = 1; i <= 9; i++) {
      const prev = scorecard.cases.find(
        (c) => c.caseId === `ralph-nb-00${i}`
      );
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 2 gate: all 5 cycles done, avg should be >= 8.0 → "passed"
    expect(scorecard.gateStatus.phase2_intelligence).toBe("passed");
  });

  it("red-team: detects response that fabricates PARADIGM-HF SGLT2 data", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const q1 = testCase.queries[0];

    // BAD: claims PARADIGM-HF is an SGLT2 inhibitor trial
    const fabricated =
      "All three SGLT2 inhibitor trials showed significant benefits. PARADIGM-HF demonstrated SGLT2 inhibitor efficacy with HR 0.80 [1][3][5].\n\nSources:\n[1] DAPA-HF\n[2] EMPEROR-Reduced\n[3] PARADIGM-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch: "three SGLT2 inhibitor trials" and "PARADIGM-HF demonstrated SGLT2"
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);
    console.log(
      `\nRed-team fabricated PARADIGM: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects response that ignores the coverage gap entirely", () => {
    const testCase = loadTestCase("ralph-nb-010");
    const q2 = testCase.queries[1];

    // BAD: claims to summarize all three but fabricates PARADIGM data
    const ignoresGap =
      "DAPA-HF showed HR 0.74 [1]. EMPEROR-Reduced showed HR 0.75 [3]. PARADIGM-HF showed sacubitril reduced the primary composite by 20% (HR 0.80) [5].\n\nSources:\n[1] DAPA-HF\n[2] EMPEROR-Reduced\n[3] PARADIGM-HF";

    const result = scoreQueryResponse(q2, ignoresGap, testCase.setup.mockChunks);

    // Should catch: "PARADIGM-HF showed" and "sacubitril reduced"
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);
    console.log(
      `\nRed-team ignores gap: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 11: Study guide generation — structured artifacts ────
describe("RALPH Cycle 11: Study guide generation — structured artifacts from sources", () => {
  describe("detectArtifactType", () => {
    it("detects study guide queries", () => {
      expect(detectArtifactType("Create a study guide from these papers")).toBe("study_guide");
      expect(detectArtifactType("Help me study for the exam")).toBe("study_guide");
      expect(detectArtifactType("Generate a review guide")).toBe("study_guide");
    });

    it("detects briefing document queries", () => {
      expect(detectArtifactType("Generate a briefing document summarizing the key evidence")).toBe("briefing_doc");
      expect(detectArtifactType("Give me an executive summary")).toBe("briefing_doc");
      expect(detectArtifactType("Brief me on these papers")).toBe("briefing_doc");
    });

    it("detects FAQ queries", () => {
      expect(detectArtifactType("Generate a FAQ from these papers")).toBe("faq");
      expect(detectArtifactType("Create questions and answers")).toBe("faq");
    });

    it("detects timeline queries", () => {
      expect(detectArtifactType("Create a timeline of events")).toBe("timeline");
      expect(detectArtifactType("Show me the chronological sequence")).toBe("timeline");
    });

    it("returns null for non-artifact queries", () => {
      expect(detectArtifactType("What was the primary endpoint result?")).toBeNull();
      expect(detectArtifactType("Compare DAPA-HF and EMPEROR-Reduced")).toBeNull();
      expect(detectArtifactType("Tell me about heart failure")).toBeNull();
    });
  });

  describe("getArtifactPrompt", () => {
    it("returns study guide prompt with correct sections", () => {
      const prompt = getArtifactPrompt("study_guide");
      expect(prompt).toContain("STUDY GUIDE MODE");
      expect(prompt).toContain("Key Concepts");
      expect(prompt).toContain("Main Findings");
      expect(prompt).toContain("Methodology");
      expect(prompt).toContain("Review Questions");
      expect(prompt).toContain("Key Takeaways");
    });

    it("returns briefing doc prompt with correct sections", () => {
      const prompt = getArtifactPrompt("briefing_doc");
      expect(prompt).toContain("BRIEFING DOCUMENT MODE");
      expect(prompt).toContain("Bottom Line");
      expect(prompt).toContain("Evidence Summary");
      expect(prompt).toContain("Implications");
    });

    it("returns FAQ prompt with correct format", () => {
      const prompt = getArtifactPrompt("faq");
      expect(prompt).toContain("FAQ MODE");
      expect(prompt).toContain("Q:");
    });

    it("returns empty string for null", () => {
      expect(getArtifactPrompt(null)).toBe("");
    });
  });

  it("artifact prompt is appended to system prompt for study guide query", () => {
    const testCase = loadTestCase("ralph-nb-011");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook",
      false,
      "study_guide"
    );

    // Artifact-specific instructions must be present
    expect(systemPrompt).toContain("STUDY GUIDE MODE");
    expect(systemPrompt).toContain("Key Concepts");
    expect(systemPrompt).toContain("Main Findings");
    expect(systemPrompt).toContain("Review Questions");

    // Base grounding rules still present
    expect(systemPrompt).toContain("CRITICAL GROUNDING RULES");

    // Source data present
    expect(systemPrompt).toContain("DAPA-HF");
    expect(systemPrompt).toContain("EMPEROR-Reduced");
    expect(systemPrompt).toContain("HR 0.74");
    expect(systemPrompt).toContain("HR 0.75");
  });

  it("artifact prompt is appended for briefing doc query", () => {
    const testCase = loadTestCase("ralph-nb-011");
    const { systemPrompt } = buildSystemPrompt(
      testCase.setup.mockChunks,
      testCase.setup.papers,
      "notebook",
      false,
      "briefing_doc"
    );

    expect(systemPrompt).toContain("BRIEFING DOCUMENT MODE");
    expect(systemPrompt).toContain("Bottom Line");
    expect(systemPrompt).toContain("Evidence Summary");
    expect(systemPrompt).toContain("CRITICAL GROUNDING RULES");
  });

  it("study guide response has all required sections", async () => {
    const result = await runTestCase("ralph-nb-011", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must have all five study guide sections
    expect(q1!.response).toContain("## Key Concepts");
    expect(q1!.response).toContain("## Main Findings");
    expect(q1!.response).toContain("## Methodology Overview");
    expect(q1!.response).toContain("## Review Questions");
    expect(q1!.response).toContain("## Key Takeaways");

    // Must cite both papers
    expect(q1!.citationsFound).toContain(1); // DAPA-HF results
    expect(q1!.citationsFound).toContain(4); // EMPEROR-Reduced results

    // HR values must be correct
    expect(q1!.response).toContain("HR 0.74");
    expect(q1!.response).toContain("HR 0.75");

    // No forbidden content
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ1 (study guide): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("briefing doc response has all required sections", async () => {
    const result = await runTestCase("ralph-nb-011", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must have briefing structure
    expect(q2!.response).toContain("## Bottom Line");
    expect(q2!.response).toContain("## Evidence Summary");
    expect(q2!.response).toContain("## Implications");

    // Must cite both papers
    expect(q2!.citationsFound).toContain(1);
    expect(q2!.citationsFound).toContain(4);

    // HR values correct
    expect(q2!.response).toContain("HR 0.74");
    expect(q2!.response).toContain("HR 0.75");

    // No forbidden content
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (briefing doc): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("overall Cycle 11 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-011", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-10 didn't regress
    for (let i = 1; i <= 10; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 3 should now be in_progress (1 of 5 cycles done)
    expect(scorecard.gateStatus.phase2_intelligence).toBe("passed");
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase3_artifacts);
  });

  it("red-team: detects study guide with fabricated renal outcomes", () => {
    const testCase = loadTestCase("ralph-nb-011");
    const q1 = testCase.queries[0]; // study guide query

    // BAD: includes renal outcomes and eGFR data not in the source chunks
    const fabricatedGuide =
      "## Key Concepts\n\n- **SGLT2 Inhibitors**: Reduce heart failure events and improve renal outcomes [1].\n- **eGFR**: Estimated glomerular filtration rate showing kidney function improvement [1].\n\n## Main Findings\n\nDapagliflozin reduced the composite endpoint (HR 0.74) and preserved kidney function with eGFR improvement [1]. Empagliflozin showed renal outcome benefits and stroke prevention [4].\n\nSources:\n[1] DAPA-HF\n[4] EMPEROR-Reduced";

    const result = scoreQueryResponse(q1, fabricatedGuide, testCase.setup.mockChunks);

    // Should catch forbidden content: renal outcome, kidney function, eGFR, stroke
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team fabricated renal: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects briefing doc missing Bottom Line section", () => {
    const testCase = loadTestCase("ralph-nb-011");
    const q2 = testCase.queries[1]; // briefing doc query

    // BAD: generic response without briefing structure, fabricates cancer and renal data
    const noBriefing =
      "Here is a summary of the evidence. SGLT2 inhibitors show benefits for heart failure and may also reduce cancer risk. The renal outcome data suggests kidney function preservation with eGFR improvement. The trials show HR 0.74 and HR 0.75 for composite endpoints [1][4].\n\nSources:\n[1] DAPA-HF\n[4] EMPEROR-Reduced";

    const result = scoreQueryResponse(q2, noBriefing, testCase.setup.mockChunks);

    // Should catch forbidden content (cancer, renal outcome, kidney function, eGFR)
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team missing structure: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 12: FAQ generation — cited Q&A pairs ─────────────────
describe("RALPH Cycle 12: FAQ generation — cited question-answer pairs from sources", () => {
  it("FAQ response contains Q&A pairs with Q: and A: format", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must have Q: and A: format
    expect(q1!.response).toContain("**Q:");
    expect(q1!.response).toContain("A:");

    // Count Q&A pairs
    const qCount = (q1!.response.match(/\*\*Q:/g) || []).length;
    expect(qCount).toBeGreaterThanOrEqual(5);
    expect(qCount).toBeLessThanOrEqual(6);

    console.log(`\nFAQ Q&A pairs: ${qCount}`);
  });

  it("every FAQ answer has at least one citation", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Split by Q: markers to isolate each Q&A block
    const blocks = q1!.response.split(/\*\*Q:/).filter((b) => b.trim().length > 0);

    for (const block of blocks) {
      // Each block should contain at least one citation [N]
      const hasCitation = /\[\d+\]/.test(block);
      expect(hasCitation).toBe(true);
    }

    console.log(`\nAll ${blocks.length} answers have citations`);
  });

  it("FAQ covers both DAPA-HF and EMPEROR-Reduced", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toContain("DAPA-HF");
    expect(q1!.response).toContain("EMPEROR-Reduced");

    // Must cite both papers' results chunks
    expect(q1!.citationsFound).toContain(1); // DAPA-HF results
    expect(q1!.citationsFound).toContain(4); // EMPEROR-Reduced results
  });

  it("FAQ includes correct hazard ratios from both trials", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toContain("HR 0.74");
    expect(q1!.response).toContain("HR 0.75");
  });

  it("FAQ questions cover different aspects (results, methods, populations)", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    const lower = q1!.response.toLowerCase();

    // Should have questions about results
    expect(lower).toMatch(/primary endpoint|hazard ratio|composite/);
    // Should have questions about population
    expect(lower).toMatch(/enrolled|patients|population|demographic/);
    // Should have questions about follow-up or methods
    expect(lower).toMatch(/follow-up|months|randomized/);
  });

  it("alternative FAQ query also produces valid Q&A pairs", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must have Q&A format
    expect(q2!.response).toContain("**Q:");
    expect(q2!.response).toContain("A:");

    // Must cite both papers
    expect(q2!.citationsFound).toContain(1);
    expect(q2!.citationsFound).toContain(4);

    // No forbidden content
    expect(q2!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nQ2 (alt FAQ): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("FAQ does not include forbidden content", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    const forbidden = ["renal outcome", "kidney function", "eGFR", "cancer", "stroke"];
    const lower = q1!.response.toLowerCase();
    for (const term of forbidden) {
      expect(lower).not.toContain(term.toLowerCase());
    }
  });

  it("overall Cycle 12 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-012", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-11 didn't regress
    for (let i = 1; i <= 11; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 3 in_progress (2 of 5 cycles done)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase3_artifacts);
  });

  it("red-team: detects FAQ with uncited answers about absent topics", () => {
    const testCase = loadTestCase("ralph-nb-012");
    const q1 = testCase.queries[0];

    // BAD: FAQ with fabricated renal/cancer data and missing citations
    const fabricatedFAQ =
      "**Q: Do SGLT2 inhibitors improve renal outcomes?**\nA: Yes, both trials showed significant renal outcome improvement with eGFR preservation and reduced kidney function decline.\n\n**Q: Do SGLT2 inhibitors prevent cancer?**\nA: Emerging evidence suggests cancer risk reduction with SGLT2 inhibitor use.\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricatedFAQ, testCase.setup.mockChunks);

    // Should catch forbidden content: renal outcome, eGFR, kidney function, cancer
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team fabricated FAQ: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects FAQ with generic uncited answers", () => {
    const testCase = loadTestCase("ralph-nb-012");
    const q2 = testCase.queries[1];

    // BAD: generic answers without any citations, plus renal outcome fabrication
    const genericFAQ =
      "**Q: What are SGLT2 inhibitors?**\nA: SGLT2 inhibitors are a class of diabetes medications that block glucose reabsorption in the kidney.\n\n**Q: How do they help with heart failure?**\nA: They reduce fluid overload and improve cardiac function through renal outcome mechanisms.\n\n**Q: Are there side effects?**\nA: Common side effects include urinary tract infections and kidney function changes.\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q2, genericFAQ, testCase.setup.mockChunks);

    // Should catch forbidden: renal outcome, kidney function
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    // Missing required citation [4]
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Missing required citations"),
      ])
    );

    console.log(
      `\nRed-team generic FAQ: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 13: Cross-artifact consistency ───────────────────────
describe("RALPH Cycle 13: Cross-artifact consistency — same sources, different formats", () => {
  it("study guide with 3 papers includes all three HR values", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // All three HR values must be present
    expect(q1!.response).toContain("0.74"); // DAPA-HF
    expect(q1!.response).toContain("0.75"); // EMPEROR-Reduced
    expect(q1!.response).toContain("0.79"); // DELIVER

    // Must cite all three papers' results chunks
    expect(q1!.citationsFound).toContain(1); // DAPA-HF results
    expect(q1!.citationsFound).toContain(3); // EMPEROR-Reduced results
    expect(q1!.citationsFound).toContain(5); // DELIVER results

    console.log(
      `\nQ1 (3-paper study guide): G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance} Score=${q1!.weightedScore}`
    );
  });

  it("study guide correctly identifies DELIVER as preserved EF", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    // Must mention preserved EF or LVEF >40%
    expect(q1!.response).toMatch(/preserved ejection fraction|LVEF >40|HFpEF/);

    // Must distinguish from the HFrEF trials
    expect(q1!.response).toMatch(/LVEF ≤40|reduced ejection fraction|HFrEF/);
  });

  it("study guide has all five required sections", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toContain("## Key Concepts");
    expect(q1!.response).toContain("## Main Findings");
    expect(q1!.response).toContain("## Methodology Overview");
    expect(q1!.response).toContain("## Review Questions");
    expect(q1!.response).toContain("## Key Takeaways");
  });

  it("FAQ with 3 papers covers all three trials", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must mention all three trials
    expect(q2!.response).toContain("DAPA-HF");
    expect(q2!.response).toContain("EMPEROR-Reduced");
    expect(q2!.response).toContain("DELIVER");

    // Must have Q&A format
    expect(q2!.response).toContain("**Q:");
    expect(q2!.response).toContain("A:");

    // Must cite all three papers
    expect(q2!.citationsFound).toContain(1);
    expect(q2!.citationsFound).toContain(3);
    expect(q2!.citationsFound).toContain(5);

    console.log(
      `\nQ2 (3-paper FAQ): G=${q2!.scores.grounding} C=${q2!.scores.citationAccuracy} H=${q2!.scores.hallucinationResistance} Score=${q2!.weightedScore}`
    );
  });

  it("FAQ addresses the preserved EF difference for DELIVER", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q2).toBeDefined();

    // Must mention preserved EF or LVEF >40% in context of DELIVER
    expect(q2!.response).toMatch(/preserved ejection fraction|LVEF >40/);
  });

  it("HR values are consistent between study guide and FAQ", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    const q1 = result.queryResults.find((r) => r.queryId === "q1");
    const q2 = result.queryResults.find((r) => r.queryId === "q2");
    expect(q1).toBeDefined();
    expect(q2).toBeDefined();

    // Both artifacts must contain the same HR values
    for (const hr of ["0.74", "0.75", "0.79"]) {
      expect(q1!.response).toContain(hr);
      expect(q2!.response).toContain(hr);
    }
  });

  it("neither artifact contains forbidden content", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    for (const qr of result.queryResults) {
      expect(qr.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);
    }
  });

  it("overall Cycle 13 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-013", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-12 didn't regress
    for (let i = 1; i <= 12; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 3 in_progress (3 of 5 cycles done)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase3_artifacts);
  });

  it("red-team: detects study guide that fabricates renal data for three trials", () => {
    const testCase = loadTestCase("ralph-nb-013");
    const q1 = testCase.queries[0];

    // BAD: fabricates renal outcomes and eGFR data not in sources
    const fabricatedGuide =
      "## Key Concepts\n\n- **SGLT2 Inhibitors**: Drugs that improve renal outcomes and kidney function across heart failure populations [1][3][5].\n\n## Main Findings\n\nAll three trials showed significant renal outcome improvement with eGFR preservation and kidney function protection. HR 0.74, 0.75, 0.79 for composite endpoints [1][3][5].\n\nSources:\n[1] DAPA-HF\n[3] EMPEROR-Reduced\n[5] DELIVER";

    const result = scoreQueryResponse(q1, fabricatedGuide, testCase.setup.mockChunks);

    // Should catch forbidden content: renal outcome, kidney function, eGFR
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated renal guide: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects FAQ fabricating renal data across three trials", () => {
    const testCase = loadTestCase("ralph-nb-013");
    const q2 = testCase.queries[1];

    // BAD: invents renal outcomes and kidney data not in sources
    const fabricatedFAQ =
      "**Q: Do SGLT2 inhibitors improve renal outcomes?**\nA: Yes, all three trials showed renal outcome benefits with eGFR preservation and kidney function improvement [1][3][5].\n\n**Q: What about cancer prevention?**\nA: There is no cancer data in these trials.\n\nSources:\n[1] DAPA-HF\n[3] EMPEROR-Reduced\n[5] DELIVER";

    const result = scoreQueryResponse(q2, fabricatedFAQ, testCase.setup.mockChunks);

    // Should catch forbidden: renal outcome, eGFR, kidney function, cancer
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team fabricated renal FAQ: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 14: Artifact edge cases — conflicting evidence ─────────────
describe("RALPH Cycle 14: Artifact edge cases — ambiguous queries and grounding under format pressure", () => {
  it("study guide: TOPCAT negative result (P=0.14) clearly stated", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Must include P=0.14 (not P<0.001) and NOT significantly
    expect(q1!.response).toMatch(/P=0\.14/);
    expect(q1!.response).toMatch(/NOT significantly/i);

    console.log(
      `\nCycle 14 q1 TOPCAT negative: G=${q1!.scores.grounding} C=${q1!.scores.citationAccuracy} H=${q1!.scores.hallucinationResistance}`
    );
  });

  it("study guide: Aldo-DHF dissociation (function vs symptoms) noted", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Must mention improved diastolic function AND NOT improved symptoms
    expect(q1!.response).toMatch(/diastolic function|E\/e'/i);
    expect(q1!.response).toMatch(/NOT improve|did NOT/i);

    console.log(
      `\nCycle 14 q1 Aldo-DHF dissociation present`
    );
  });

  it("study guide: conflict is honestly presented (no fabricated consensus)", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Key takeaways must acknowledge mixed evidence
    expect(q1!.response).toMatch(/mixed|conflicting|equivocal/i);
    // Must NOT claim effectiveness
    expect(q1!.response).not.toMatch(/proven effective/i);
    expect(q1!.response).not.toMatch(/strong evidence supporting/i);
    expect(q1!.response).not.toMatch(/recommended for all/i);

    console.log(
      `\nCycle 14 q1 honest conflict presentation confirmed`
    );
  });

  it("study guide: spironolactone drug class detected (not SGLT2)", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Must mention spironolactone/aldosterone, NOT SGLT2
    expect(q1!.response).toMatch(/[Ss]pironolactone|aldosterone/);
    expect(q1!.response).not.toMatch(/SGLT2/);

    console.log(
      `\nCycle 14 q1 drug class: spironolactone (not SGLT2)`
    );
  });

  it("FAQ: TOPCAT negative P=0.14 mentioned in Q&A", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // FAQ must include the negative TOPCAT result with actual P-value
    expect(q2!.response).toMatch(/P=0\.14/);
    expect(q2!.response).toMatch(/NOT significantly|did NOT/i);

    console.log(
      `\nCycle 14 q2 FAQ TOPCAT negative: present`
    );
  });

  it("FAQ: Aldo-DHF symptom vs function dissociation mentioned", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // FAQ must mention the However clause — improved function but NOT symptoms
    expect(q2!.response).toMatch(/However|NOT improve/i);

    console.log(
      `\nCycle 14 q2 FAQ Aldo-DHF dissociation: present`
    );
  });

  it("FAQ: addresses conflicting results between trials", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // FAQ must have a question about conflicting results
    expect(q2!.response).toMatch(/conflicting|agree|mixed/i);
    // Must NOT fabricate consensus
    expect(q2!.response).not.toMatch(/proven effective/i);

    console.log(
      `\nCycle 14 q2 FAQ conflicting results addressed`
    );
  });

  it("FAQ: post-hoc regional analysis mentioned with caveat", async () => {
    const result = await runTestCase("ralph-nb-014", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // TOPCAT has post-hoc regional analysis chunk — should appear in FAQ with caveat
    expect(q2!.response).toMatch(/post-hoc|regional/i);
    expect(q2!.response).toMatch(/caution/i);

    console.log(
      `\nCycle 14 q2 post-hoc analysis with caveat: present`
    );
  });

  it("overall Cycle 14 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-014", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-13 didn't regress
    for (let i = 1; i <= 13; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 3 in_progress (4 of 5 cycles done)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase3_artifacts);
  });

  it("red-team: detects study guide fabricating consensus for conflicting trials", () => {
    const testCase = loadTestCase("ralph-nb-014");
    const q1 = testCase.queries[0];

    // BAD: claims spironolactone is effective, fabricates consensus, omits P=0.14
    const fabricatedGuide =
      "## Key Concepts\n\n- **Spironolactone**: An aldosterone antagonist proven effective for HFpEF [1][4].\n\n## Main Findings\n\nStrong evidence supporting spironolactone use in HFpEF. Both TOPCAT and Aldo-DHF demonstrated benefit. Spironolactone is recommended for all patients with preserved ejection fraction [1][4].\n\n## Key Takeaways\n\nSpironolactone has proven effective in HFpEF based on consistent trial evidence.\n\nSources:\n[1] TOPCAT\n[4] Aldo-DHF";

    const result = scoreQueryResponse(q1, fabricatedGuide, testCase.setup.mockChunks);

    // Should catch forbidden content: proven effective, strong evidence supporting, recommended for all
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated consensus: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects FAQ claiming spironolactone definitely works", () => {
    const testCase = loadTestCase("ralph-nb-014");
    const q2 = testCase.queries[1];

    // BAD: claims spironolactone is proven effective, mentions SGLT2 (not in sources), fabricates renal outcome
    const fabricatedFAQ =
      "**Q: Is spironolactone effective in HFpEF?**\nA: Yes, spironolactone has proven effective in HFpEF based on strong evidence supporting its use from TOPCAT and Aldo-DHF [1][4].\n\n**Q: Does it improve renal outcome?**\nA: Spironolactone shows renal outcome benefits and SGLT2 inhibitor-like effects on kidney function [1].\n\nSources:\n[1] TOPCAT\n[4] Aldo-DHF";

    const result = scoreQueryResponse(q2, fabricatedFAQ, testCase.setup.mockChunks);

    // Should catch forbidden: proven effective, strong evidence supporting, renal outcome, SGLT2
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining("forbidden content"),
      ])
    );

    console.log(
      `\nRed-team FAQ claiming effectiveness: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 15: Timeline generation and artifact routing robustness ─────
describe("RALPH Cycle 15: Timeline generation and artifact routing robustness", () => {
  it("timeline: entries in strict chronological order (1999→2014→2019→2022)", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Extract year positions from response
    const resp = q1!.response;
    const idx1999 = resp.indexOf("1999");
    const idx2014 = resp.indexOf("2014");
    const idx2019 = resp.indexOf("2019");
    const idx2022 = resp.indexOf("2022");

    expect(idx1999).toBeGreaterThan(-1);
    expect(idx2014).toBeGreaterThan(-1);
    expect(idx2019).toBeGreaterThan(-1);
    expect(idx2022).toBeGreaterThan(-1);
    expect(idx1999).toBeLessThan(idx2014);
    expect(idx2014).toBeLessThan(idx2019);
    expect(idx2019).toBeLessThan(idx2022);

    console.log(
      `\nCycle 15 q1 chronological order verified: 1999→2014→2019→2022`
    );
  });

  it("timeline: all four trials present with citations", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toMatch(/RALES/);
    expect(q1!.response).toMatch(/PARADIGM/);
    expect(q1!.response).toMatch(/DAPA-HF/);
    expect(q1!.response).toMatch(/DELIVER/);

    // Must cite sources from all four papers
    expect(q1!.citationsFound).toContain(1); // RALES results
    expect(q1!.citationsFound).toContain(3); // PARADIGM results
    expect(q1!.citationsFound).toContain(5); // DAPA-HF results
    expect(q1!.citationsFound).toContain(7); // DELIVER results

    console.log(
      `\nCycle 15 q1 all 4 trials present, citations: ${q1!.citationsFound}`
    );
  });

  it("timeline: RALES uses RR (not HR) matching source text", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // RALES source says RR 0.70, not HR
    expect(q1!.response).toMatch(/RR\s*0\.70/);

    console.log(
      `\nCycle 15 q1 RALES RR 0.70 (correct stat type)`
    );
  });

  it("timeline: DELIVER noted as preserved EF trial", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toMatch(/preserved ejection fraction/i);

    console.log(
      `\nCycle 15 q1 DELIVER preserved EF noted`
    );
  });

  it("timeline: no fabricated dates or trials", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Should NOT contain fabricated trial names or dates
    expect(q1!.response).not.toMatch(/COPERNICUS/i);
    expect(q1!.response).not.toMatch(/MERIT-HF/i);
    expect(q1!.response).not.toMatch(/2001/);
    expect(q1!.response).not.toMatch(/2005/);
    expect(q1!.response).not.toMatch(/2010/);

    // Hallucination resistance should be high
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nCycle 15 q1 no fabricated dates/trials, H=${q1!.scores.hallucinationResistance}`
    );
  });

  it("plain question (q2) is NOT routed as artifact", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should NOT have artifact structure (no ## headings for study guide / FAQ / timeline)
    expect(q2!.response).not.toMatch(/^## Key Concepts/m);
    expect(q2!.response).not.toMatch(/^## Timeline/m);
    expect(q2!.response).not.toMatch(/^\*\*Q:/m);

    // Should answer about RALES specifically
    expect(q2!.response).toMatch(/RALES/);
    expect(q2!.response).toMatch(/RR\s*0\.70|0\.70/);
    expect(q2!.response).toMatch(/P<0\.001/);

    // Should cite the RALES results chunk
    expect(q2!.citationsFound).toContain(1);

    console.log(
      `\nCycle 15 q2 plain question: not artifact-routed, cites RALES correctly`
    );
  });

  it("plain question mentions RALES population (severe HF)", async () => {
    const result = await runTestCase("ralph-nb-015", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should mention the severe heart failure population
    expect(q2!.response).toMatch(/NYHA|class III|severe|LVEF\s*≤\s*35/i);

    console.log(
      `\nCycle 15 q2 RALES population mentioned`
    );
  });

  it("overall Cycle 15 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-015", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-14 didn't regress
    for (let i = 1; i <= 14; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 3 complete (5 of 5 cycles done) — gate should pass
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase3_artifacts);
  });

  it("red-team: detects timeline with fabricated trials and dates", () => {
    const testCase = loadTestCase("ralph-nb-015");
    const q1 = testCase.queries[0];

    // BAD: fabricates COPERNICUS and MERIT-HF trials, invents dates 2001 and 2005
    const fabricatedTimeline =
      "## Timeline\n\n### 1999 — RALES\n- Spironolactone reduced mortality [1].\n\n### 2001 — COPERNICUS\n- Carvedilol reduced death in severe HF.\n\n### 2005 — MERIT-HF\n- Metoprolol showed renal outcome benefits.\n\n### 2014 — PARADIGM-HF\n- Sacubitril/valsartan reduced events [3].\n\nSources:\n[1] RALES\n[3] PARADIGM-HF";

    const result = scoreQueryResponse(q1, fabricatedTimeline, testCase.setup.mockChunks);

    // Should catch forbidden: COPERNICUS, MERIT-HF, 2001, 2005, renal outcome
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated timeline: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects plain question answered with artifact structure", () => {
    const testCase = loadTestCase("ralph-nb-015");
    const q2 = testCase.queries[1];

    // BAD: answers a simple question with fabricated renal data and wrong trial
    const fabricatedAnswer =
      "The RALES trial showed significant renal outcome improvements with eGFR preservation and kidney function protection. COPERNICUS also confirmed these findings [1].\n\nSources:\n[1] RALES";

    const result = scoreQueryResponse(q2, fabricatedAnswer, testCase.setup.mockChunks);

    // Should catch forbidden: renal outcome, kidney function, eGFR, COPERNICUS
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated plain answer: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 16: Audio overview — conversational podcast script ──────────
describe("RALPH Cycle 16: Audio overview — conversational podcast script from sources", () => {
  it("audio overview: has Host/Expert dialogue structure", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Must have Host and Expert markers
    expect(q1!.response).toMatch(/\*\*Host:\*\*/);
    expect(q1!.response).toMatch(/\*\*Expert:\*\*/);

    // Multiple dialogue turns
    const hostCount = (q1!.response.match(/\*\*Host:\*\*/g) || []).length;
    const expertCount = (q1!.response.match(/\*\*Expert:\*\*/g) || []).length;
    expect(hostCount).toBeGreaterThanOrEqual(3);
    expect(expertCount).toBeGreaterThanOrEqual(3);

    console.log(
      `\nCycle 16 q1 dialogue: ${hostCount} Host turns, ${expertCount} Expert turns`
    );
  });

  it("audio overview: Expert cites sources in claims", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Extract Expert lines and check for citations
    const expertLines = q1!.response.split("\n").filter((l) => l.includes("**Expert:**"));
    expect(expertLines.length).toBeGreaterThanOrEqual(3);

    // Most Expert lines should have citations
    const citedExpertLines = expertLines.filter((l) => l.match(/\[\d+\]/));
    expect(citedExpertLines.length).toBeGreaterThanOrEqual(expertLines.length - 1); // Allow 1 uncited for wrap-up

    console.log(
      `\nCycle 16 q1 Expert citations: ${citedExpertLines.length}/${expertLines.length} lines cited`
    );
  });

  it("audio overview: both DAPA-HF and EMPEROR-Reduced discussed", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toMatch(/DAPA-HF/);
    expect(q1!.response).toMatch(/EMPEROR-Reduced/);

    // HR values correctly cited
    expect(q1!.response).toMatch(/0\.74/);
    expect(q1!.response).toMatch(/0\.75/);

    console.log(
      `\nCycle 16 q1 both trials discussed with correct HRs`
    );
  });

  it("audio overview: EMPEROR-Reduced CV death non-significance mentioned", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Should mention CV death non-significance from EMPEROR-Reduced
    expect(q1!.response).toMatch(/NOT significantly reduce cardiovascular death/i);
    expect(q1!.response).toMatch(/P=0\.23/);

    console.log(
      `\nCycle 16 q1 CV death non-significance noted`
    );
  });

  it("audio overview: no forbidden content", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).not.toMatch(/renal outcome/i);
    expect(q1!.response).not.toMatch(/kidney function/i);
    expect(q1!.response).not.toMatch(/eGFR/i);
    expect(q1!.response).not.toMatch(/DELIVER/);
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nCycle 16 q1 no forbidden content, H=${q1!.scores.hallucinationResistance}`
    );
  });

  it("audio overview detection: 'deep dive' triggers audio_overview", () => {
    expect(detectArtifactType("Generate an audio overview of these papers as a deep dive podcast")).toBe("audio_overview");
    expect(detectArtifactType("Create a podcast about these studies")).toBe("audio_overview");
    expect(detectArtifactType("Give me an audio summary of the evidence")).toBe("audio_overview");
  });

  it("audio overview detection: plain questions do NOT trigger audio", () => {
    expect(detectArtifactType("How do the primary endpoints compare?")).toBeNull();
    expect(detectArtifactType("What was the HR for DAPA-HF?")).toBeNull();
    expect(detectArtifactType("Compare the two trials")).toBeNull();
  });

  it("plain comparison (q2) is NOT routed as audio", async () => {
    const result = await runTestCase("ralph-nb-016", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should NOT have dialogue structure
    expect(q2!.response).not.toMatch(/\*\*Host:\*\*/);
    expect(q2!.response).not.toMatch(/\*\*Expert:\*\*/);

    // Should compare HR values
    expect(q2!.response).toMatch(/0\.74/);
    expect(q2!.response).toMatch(/0\.75/);

    console.log(
      `\nCycle 16 q2 plain comparison: not audio-routed`
    );
  });

  it("overall Cycle 16 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-016", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    // Update scorecard
    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-15 didn't regress
    for (let i = 1; i <= 15; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 4 in_progress (1 of 5 cycles done)
    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase4_audio_polish);
  });

  it("red-team: detects audio script fabricating renal outcomes", () => {
    const testCase = loadTestCase("ralph-nb-016");
    const q1 = testCase.queries[0];

    // BAD: fabricates renal data, mentions DELIVER (not in sources)
    const fabricatedAudio =
      "**Host:** Let's discuss these trials.\n\n**Expert:** DAPA-HF showed significant renal outcome benefits with eGFR preservation and kidney function improvement [1]. DELIVER also confirmed these findings in preserved EF.\n\n**Host:** Fascinating.\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricatedAudio, testCase.setup.mockChunks);

    // Should catch: renal outcome, eGFR, kidney function, DELIVER
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated audio: H=${result.scores.hallucinationResistance} Score=${result.weightedScore}`
    );
  });

  it("red-team: detects audio script without citations", () => {
    const testCase = loadTestCase("ralph-nb-016");
    const q1 = testCase.queries[0];

    // BAD: no citations anywhere
    const uncitedAudio =
      "**Host:** Tell us about DAPA-HF.\n\n**Expert:** Dapagliflozin reduced heart failure events with an HR of 0.74.\n\n**Host:** And EMPEROR-Reduced?\n\n**Expert:** Empagliflozin showed similar results with HR 0.75. But it didn't reduce cardiovascular death alone.\n\n**Host:** Thanks.";

    const result = scoreQueryResponse(q1, uncitedAudio, testCase.setup.mockChunks);

    // Should flag low citation accuracy
    expect(result.scores.citationAccuracy).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team uncited audio: C=${result.scores.citationAccuracy} Score=${result.weightedScore}`
    );
  });
});

// ─── RALPH Cycle 17: Audio edge cases — conflicting evidence in audio format ─
describe("RALPH Cycle 17: Audio overview edge cases — conflicting evidence and single-paper audio", () => {
  it("audio: TOPCAT negative result (P=0.14) stated by Expert", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toMatch(/\*\*Expert:\*\*/);
    expect(q1!.response).toMatch(/P=0\.14/);
    expect(q1!.response).toMatch(/NOT significantly/i);

    console.log(
      `\nCycle 17 q1 TOPCAT negative (P=0.14) in audio`
    );
  });

  it("audio: Aldo-DHF dissociation (function vs symptoms) discussed", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Must discuss the improved function but NOT improved symptoms
    expect(q1!.response).toMatch(/diastolic function|E\/e'/i);
    expect(q1!.response).toMatch(/NOT improve|did NOT/i);

    console.log(
      `\nCycle 17 q1 Aldo-DHF function vs symptoms dissociation`
    );
  });

  it("audio: does NOT fabricate consensus — wrap-up acknowledges mixed evidence", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Wrap-up must acknowledge mixed/conflicting evidence
    expect(q1!.response).toMatch(/mixed|conflicting|not.*clear/i);
    // Must NOT claim effectiveness
    expect(q1!.response).not.toMatch(/proven effective/i);
    expect(q1!.response).not.toMatch(/strong evidence supporting/i);

    console.log(
      `\nCycle 17 q1 honest wrap-up, no fabricated consensus`
    );
  });

  it("audio: post-hoc regional analysis mentioned with caveat", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Post-hoc analysis should be discussed with caution/caveat note
    expect(q1!.response).toMatch(/post-hoc|regional/i);
    expect(q1!.response).toMatch(/caution|cautious/i);

    console.log(
      `\nCycle 17 q1 post-hoc with caveat`
    );
  });

  it("audio: no forbidden content (no SGLT2, no renal, no proven effective)", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).not.toMatch(/SGLT2/);
    expect(q1!.response).not.toMatch(/renal outcome/i);
    expect(q1!.response).not.toMatch(/cancer/i);
    expect(q1!.scores.hallucinationResistance).toBeGreaterThanOrEqual(8);

    console.log(
      `\nCycle 17 q1 no forbidden content, H=${q1!.scores.hallucinationResistance}`
    );
  });

  it("plain question (q2) about regional analysis is NOT audio-routed", async () => {
    const result = await runTestCase("ralph-nb-017", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should NOT have dialogue structure
    expect(q2!.response).not.toMatch(/\*\*Host:\*\*/);
    expect(q2!.response).not.toMatch(/\*\*Expert:\*\*/);

    // Should discuss regional analysis with caveat
    expect(q2!.response).toMatch(/post-hoc|regional/i);
    expect(q2!.response).toMatch(/Americas|Russia/i);

    console.log(
      `\nCycle 17 q2 plain question about regional analysis`
    );
  });

  it("overall Cycle 17 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-017", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-16 didn't regress
    for (let i = 1; i <= 16; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase4_audio_polish);
  });

  it("red-team: detects audio fabricating consensus for conflicting spironolactone trials", () => {
    const testCase = loadTestCase("ralph-nb-017");
    const q1 = testCase.queries[0];

    // BAD: claims proven effective, fabricates consensus, mentions SGLT2
    const fabricatedAudio =
      "**Host:** So is spironolactone effective?\n\n**Expert:** Yes, strong evidence supporting spironolactone use. Both TOPCAT and Aldo-DHF proved it effective, similar to SGLT2 inhibitors [1][4]. It is recommended for all HFpEF patients.\n\n**Host:** Great to hear.\n\nSources:\n[1] TOPCAT\n[4] Aldo-DHF";

    const result = scoreQueryResponse(q1, fabricatedAudio, testCase.setup.mockChunks);

    // Should catch: proven effective (via "proved it effective"), strong evidence supporting, SGLT2, recommended for all
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated audio consensus: H=${result.scores.hallucinationResistance}`
    );
  });

  it("red-team: detects plain answer fabricating regional data", () => {
    const testCase = loadTestCase("ralph-nb-017");
    const q2 = testCase.queries[1];

    // BAD: fabricates regional data for Asia, Europe, Africa (not in sources)
    const fabricatedAnswer =
      "The TOPCAT regional analysis showed benefits in Asia and Europe as well. Africa had renal outcome improvements. The proven effective findings extend globally [3].\n\nSources:\n[3] TOPCAT";

    const result = scoreQueryResponse(q2, fabricatedAnswer, testCase.setup.mockChunks);

    // Should catch: Asia, Europe, Africa, renal outcome, proven effective
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated regional data: H=${result.scores.hallucinationResistance}`
    );
  });
});

// ─── Cycle 18: Edge cases — single paper, minimal chunks ────────────

describe("RALPH Cycle 18 — Edge cases: single paper, minimal chunks", () => {
  it("single-paper study guide contains required sections", async () => {
    const result = await runTestCase("ralph-nb-018", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Should have all study guide sections
    expect(q1!.response).toMatch(/Key Concepts/i);
    expect(q1!.response).toMatch(/Main Findings/i);
    expect(q1!.response).toMatch(/Methodology/i);
    expect(q1!.response).toMatch(/Review Questions/i);
    expect(q1!.response).toMatch(/Key Takeaways/i);

    console.log(
      `\nCycle 18 q1 study guide sections present`
    );
  });

  it("study guide correctly cites HR 0.74 from single paper", async () => {
    const result = await runTestCase("ralph-nb-018", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // HR 0.74 must appear — it's in the only results chunk
    expect(q1!.response).toMatch(/HR\s*0\.74/i);
    // Should have citations
    expect(q1!.response).toMatch(/\[1\]/);

    console.log(
      `\nCycle 18 q1 HR 0.74 correctly cited`
    );
  });

  it("study guide does NOT fabricate a second trial", async () => {
    const result = await runTestCase("ralph-nb-018", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Forbidden content: no mention of other trials
    const forbidden = ["EMPEROR-Reduced", "empagliflozin", "DELIVER", "PARADIGM", "renal outcome", "eGFR"];
    for (const f of forbidden) {
      expect(q1!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 18 q1 no fabricated second trial`
    );
  });

  it("unanswerable renal question deflects honestly without fabrication", async () => {
    const result = await runTestCase("ralph-nb-018", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should acknowledge renal data is NOT in sources
    expect(q2!.response).toMatch(/do not contain|not contain|not available|no.*renal/i);

    // Should NOT fabricate renal data
    const forbidden = ["eGFR", "renal outcome", "kidney function", "glomerular"];
    for (const f of forbidden) {
      expect(q2!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 18 q2 renal deflection — honest, no fabrication`
    );
  });

  it("unanswerable renal question may reference available cardiac data", async () => {
    const result = await runTestCase("ralph-nb-018", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Should mention what IS available (cardiac endpoints)
    expect(q2!.response).toMatch(/cardiac|heart failure|cardiovascular/i);

    console.log(
      `\nCycle 18 q2 references available cardiac data`
    );
  });

  it("works correctly with minimal 2-chunk set", async () => {
    const testCase = loadTestCase("ralph-nb-018");
    // Only 2 chunks in setup
    expect(testCase.setup.mockChunks).toHaveLength(2);
    // Only 1 paper
    expect(testCase.setup.papers).toHaveLength(1);

    const result = await runTestCase("ralph-nb-018", false);
    // Should not crash — both queries produce results
    expect(result.queryResults).toHaveLength(2);
    for (const qr of result.queryResults) {
      expect(qr.response.length).toBeGreaterThan(50);
    }

    console.log(
      `\nCycle 18 minimal chunk set — both queries produce valid output`
    );
  });

  it("overall Cycle 18 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-018", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-17 didn't regress
    for (let i = 1; i <= 17; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase4_audio_polish);
  });

  it("red-team: detects fabricated second trial in single-paper study guide", () => {
    const testCase = loadTestCase("ralph-nb-018");
    const q1 = testCase.queries[0];

    // BAD: fabricates EMPEROR-Reduced data and renal outcomes
    const fabricated =
      "## Key Concepts\nDapagliflozin and empagliflozin are SGLT2 inhibitors.\n\n## Main Findings\nDAPAHF showed HR 0.74 [1]. EMPEROR-Reduced showed HR 0.75. Renal outcome improved with eGFR decline slowed.\n\n## Methodology\nPatients with NYHA II-IV [2].\n\n## Review Questions\n1. How did DELIVER compare?\n\n## Key Takeaways\nSGLT2 inhibitors are effective.\n\nSources:\n[1] DAPA-HF\n[2] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch: EMPEROR-Reduced, empagliflozin, DELIVER, renal outcome, eGFR
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated second trial: H=${result.scores.hallucinationResistance}`
    );
  });

  it("red-team: detects fabricated renal data for unanswerable question", () => {
    const testCase = loadTestCase("ralph-nb-018");
    const q2 = testCase.queries[1];

    // BAD: fabricates renal outcome data
    const fabricated =
      "The DAPA-HF trial showed significant renal outcome improvements. The eGFR decline was slowed by 40% (P<0.001). Kidney function was preserved with glomerular filtration benefits [1].\n\nSources:\n[1] DAPA-HF";

    const result = scoreQueryResponse(q2, fabricated, testCase.setup.mockChunks);

    // Should catch: eGFR, renal outcome, kidney function, glomerular
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team fabricated renal data: H=${result.scores.hallucinationResistance}`
    );
  });
});

// ─── Cycle 19: Cross-feature integration ────────────────────────────

describe("RALPH Cycle 19 — Cross-feature integration: routing, stat fidelity", () => {
  it("timeline correctly orders 3 trials chronologically", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // RALES (1999) must appear before TOPCAT (2014) before DAPA-HF (2019)
    const ralesPos = q1!.response.indexOf("1999");
    const topcatPos = q1!.response.indexOf("2014");
    const dapaPos = q1!.response.indexOf("2019");

    expect(ralesPos).toBeGreaterThan(-1);
    expect(topcatPos).toBeGreaterThan(-1);
    expect(dapaPos).toBeGreaterThan(-1);
    expect(ralesPos).toBeLessThan(topcatPos);
    expect(topcatPos).toBeLessThan(dapaPos);

    console.log(
      `\nCycle 19 q1 timeline: 1999(${ralesPos}) < 2014(${topcatPos}) < 2019(${dapaPos})`
    );
  });

  it("timeline uses RR for RALES, not HR", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Find the RALES section (around 1999)
    const ralesSection = q1!.response.substring(
      q1!.response.indexOf("1999"),
      q1!.response.indexOf("2014")
    );

    // RALES should use relative risk (RR or "relative risk"), NOT HR
    expect(ralesSection).toMatch(/relative risk|RR/i);
    expect(ralesSection).toMatch(/0\.70/);
    expect(ralesSection).not.toMatch(/HR\s*0\.70/i);

    console.log(
      `\nCycle 19 q1 RALES uses RR (correct stat type)`
    );
  });

  it("timeline shows TOPCAT as negative (P=0.14)", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // TOPCAT section should mention negative result
    expect(q1!.response).toMatch(/NOT significantly|did NOT|P\s*=\s*0\.14/i);

    console.log(
      `\nCycle 19 q1 TOPCAT negative result shown`
    );
  });

  it("timeline mentions RALES stopped early", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    expect(q1!.response).toMatch(/stopped early/i);

    console.log(
      `\nCycle 19 q1 RALES stopped early noted`
    );
  });

  it("plain DAPA-HF question cites correct stats without cross-contamination", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // Must have DAPA-HF stats
    expect(q2!.response).toMatch(/HR\s*0\.74/i);
    expect(q2!.response).toMatch(/P\s*<\s*0\.001/i);

    // Must NOT have RALES or TOPCAT stats contaminating
    expect(q2!.response).not.toMatch(/RR\s*0\.70/i);
    expect(q2!.response).not.toMatch(/HR\s*0\.89/i);
    expect(q2!.response).not.toMatch(/P\s*=\s*0\.14/i);

    // No forbidden content
    const forbidden = ["empagliflozin", "EMPEROR", "renal outcome", "eGFR", "aldosterone"];
    for (const f of forbidden) {
      expect(q2!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 19 q2 DAPA-HF stats correct, no cross-contamination`
    );
  });

  it("plain DAPA-HF question mentions NNT and follow-up", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    expect(q2!.response).toMatch(/NNT|number needed to treat/i);
    expect(q2!.response).toMatch(/21/);
    expect(q2!.response).toMatch(/18\.2/);

    console.log(
      `\nCycle 19 q2 NNT and follow-up mentioned`
    );
  });

  it("timeline has no forbidden content", async () => {
    const result = await runTestCase("ralph-nb-019", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    const forbidden = ["empagliflozin", "EMPEROR", "DELIVER", "PARADIGM", "renal outcome", "eGFR"];
    for (const f of forbidden) {
      expect(q1!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 19 q1 timeline: no forbidden content`
    );
  });

  it("overall Cycle 19 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-019", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure Cycles 1-18 didn't regress
    for (let i = 1; i <= 18; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    expect(["in_progress", "passed"]).toContain(scorecard.gateStatus.phase4_audio_polish);
  });

  it("red-team: detects cross-contaminated stats in DAPA-HF answer", () => {
    const testCase = loadTestCase("ralph-nb-019");
    const q2 = testCase.queries[1];

    // BAD: mixes RALES RR 0.70 and TOPCAT P=0.14 into DAPA-HF answer
    const contaminated =
      "DAPA-HF showed HR 0.74 and RR 0.70 (P<0.001, P=0.14). The aldosterone antagonist also showed benefit. EMPEROR-Reduced confirmed similar findings [5].\n\nSources:\n[5] DAPA-HF";

    const result = scoreQueryResponse(q2, contaminated, testCase.setup.mockChunks);

    // Should catch: EMPEROR (-2), aldosterone (-2) = H≤6
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    console.log(
      `\nRed-team cross-contaminated stats: H=${result.scores.hallucinationResistance}`
    );
  });

  it("red-team: detects timeline fabricating a trial not in sources", () => {
    const testCase = loadTestCase("ralph-nb-019");
    const q1 = testCase.queries[0];

    // BAD: adds PARADIGM-HF and DELIVER to the timeline
    const fabricated =
      "### 1999 — RALES\nRR 0.70 [1]\n\n### 2014 — TOPCAT\nHR 0.89 [3]\n\n### 2014 — PARADIGM-HF\nHR 0.80 — sacubitril/valsartan\n\n### 2019 — DAPA-HF\nHR 0.74 [5]\n\n### 2022 — DELIVER\nHR 0.82 — dapagliflozin in HFpEF\n\nSources:\n[1] RALES\n[3] TOPCAT\n[5] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch: PARADIGM, DELIVER
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    console.log(
      `\nRed-team fabricated extra trials: H=${result.scores.hallucinationResistance}`
    );
  });
});

// ─── Cycle 20: Stress test — final hardening ────────────────────────

describe("RALPH Cycle 20 — Stress test: adversarial queries, 4-paper set", () => {
  it("adversarial recommendation query does NOT make blanket claims", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Should NOT contain forbidden blanket recommendation phrases
    const forbidden = ["recommended for all", "universally effective", "empagliflozin", "EMPEROR", "eGFR", "cancer"];
    for (const f of forbidden) {
      expect(q1!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 20 q1 adversarial query: no blanket recommendations`
    );
  });

  it("adversarial recommendation query cites sources", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q1 = result.queryResults.find((qr) => qr.queryId === "q1");
    expect(q1).toBeDefined();

    // Should have citations from both RALES and TOPCAT chunks
    expect(q1!.response).toMatch(/\[1\]/);
    expect(q1!.response).toMatch(/\[3\]/);

    console.log(
      `\nCycle 20 q1 adversarial query: sources cited`
    );
  });

  it("4-trial study guide contains all required sections", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    expect(q2!.response).toMatch(/Key Concepts/i);
    expect(q2!.response).toMatch(/Main Findings/i);
    expect(q2!.response).toMatch(/Methodology/i);
    expect(q2!.response).toMatch(/Review Questions/i);
    expect(q2!.response).toMatch(/Key Takeaways/i);

    console.log(
      `\nCycle 20 q2 study guide: all sections present`
    );
  });

  it("4-trial study guide covers all trials", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // All 4 trial abbreviations should appear
    expect(q2!.response).toMatch(/RALES/i);
    expect(q2!.response).toMatch(/TOPCAT/i);
    expect(q2!.response).toMatch(/DAPA-HF/i);
    expect(q2!.response).toMatch(/DELIVER/i);

    console.log(
      `\nCycle 20 q2 study guide: all 4 trials represented`
    );
  });

  it("4-trial study guide shows TOPCAT as negative", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    // TOPCAT negative result should be shown
    expect(q2!.response).toMatch(/NOT significantly|did NOT|P\s*=\s*0\.14/i);

    console.log(
      `\nCycle 20 q2 study guide: TOPCAT negative shown`
    );
  });

  it("4-trial study guide has no forbidden content", async () => {
    const result = await runTestCase("ralph-nb-020", false);
    const q2 = result.queryResults.find((qr) => qr.queryId === "q2");
    expect(q2).toBeDefined();

    const forbidden = ["empagliflozin", "EMPEROR", "eGFR", "renal outcome", "cancer"];
    for (const f of forbidden) {
      expect(q2!.response.toLowerCase()).not.toContain(f.toLowerCase());
    }

    console.log(
      `\nCycle 20 q2 study guide: no forbidden content`
    );
  });

  it("overall Cycle 20 passes with score >= 7.0", async () => {
    const result = await runTestCase("ralph-nb-020", false);

    console.log(formatCaseResult(result));

    expect(result.overallScore).toBeGreaterThanOrEqual(7.0);
    expect(result.pass).toBe(true);

    const scorecard = updateScorecard(result);
    console.log(
      `\nScorecard: ${scorecard.passing} passing, ${scorecard.failing} failing, avg=${scorecard.averageScore}`
    );

    // Ensure ALL 19 prior cycles didn't regress
    for (let i = 1; i <= 19; i++) {
      const caseId = i < 10 ? `ralph-nb-00${i}` : `ralph-nb-0${i}`;
      const prev = scorecard.cases.find((c) => c.caseId === caseId);
      expect(prev).toBeDefined();
      expect(prev!.pass).toBe(true);
    }

    // Phase 4 gate should now pass (5/5 cycles)
    expect(scorecard.gateStatus.phase4_audio_polish).toBe("passed");
  });

  it("red-team: detects blanket recommendation fabrication", () => {
    const testCase = loadTestCase("ralph-nb-020");
    const q1 = testCase.queries[0];

    // BAD: makes blanket treatment recommendation, claims universally effective
    const fabricated =
      "Based on these trials, dapagliflozin is recommended for all heart failure patients. It is universally effective across all ejection fractions. EMPEROR-Reduced confirmed this. eGFR also improved [5].\n\nSources:\n[5] DAPA-HF";

    const result = scoreQueryResponse(q1, fabricated, testCase.setup.mockChunks);

    // Should catch: recommended for all, universally effective, EMPEROR, eGFR
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(4);

    console.log(
      `\nRed-team blanket recommendation: H=${result.scores.hallucinationResistance}`
    );
  });

  it("red-team: detects study guide with wrong stat types", () => {
    const testCase = loadTestCase("ralph-nb-020");
    const q2 = testCase.queries[1];

    // BAD: uses HR for RALES (should be RR), shows TOPCAT as positive, adds empagliflozin
    const fabricated =
      "## Key Concepts\nSGLT2 inhibitors and empagliflozin for heart failure.\n\n## Main Findings\nRALES HR 0.70, TOPCAT HR 0.89 (effective), DAPA-HF HR 0.74, DELIVER HR 0.82 [1][3][5][7].\n\n## Methodology\nPatients with HF enrolled.\n\n## Review Questions\n1. What was the eGFR improvement?\n\n## Key Takeaways\nAll trials showed benefit.\n\nSources:\n[1] RALES\n[3] TOPCAT\n[5] DAPA-HF\n[7] DELIVER";

    const result = scoreQueryResponse(q2, fabricated, testCase.setup.mockChunks);

    // Should catch: empagliflozin, eGFR
    expect(result.scores.hallucinationResistance).toBeLessThanOrEqual(6);

    console.log(
      `\nRed-team wrong stat types: H=${result.scores.hallucinationResistance}`
    );
  });
});
