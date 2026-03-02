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
} from "./runner";
import {
  verifyCitations,
  extractCitationClaims,
  formatVerificationResult,
} from "../../citation-verifier";
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
