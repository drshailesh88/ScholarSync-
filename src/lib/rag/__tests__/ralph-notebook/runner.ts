/**
 * RALPH Notebook Test Runner
 *
 * Runs RALPH test cases in two modes:
 * - Mock mode (default): Tests system prompt construction, citation format,
 *   and retrieval pipeline logic without calling the LLM.
 * - Live mode (RALPH_LIVE=true): Sends the constructed prompt to the actual
 *   AI model and validates the response for citation accuracy and grounding.
 *
 * Usage:
 *   npx vitest run src/lib/rag/__tests__/ralph-notebook/runner.test.ts
 *   RALPH_LIVE=true npx vitest run src/lib/rag/__tests__/ralph-notebook/runner.test.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildSystemPrompt } from "./prompt-builder";
import { scoreQueryResponse, analyzePrompt } from "./scorer";
import type {
  TestCase,
  CaseResult,
  QueryResult,
  Scorecard,
} from "./types";

const __dirname_resolved =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

/**
 * Load a test case from the cases directory.
 */
export function loadTestCase(caseId: string): TestCase {
  const filePath = join(__dirname_resolved, "cases", `${caseId}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as TestCase;
}

/**
 * Load and update the scorecard.
 */
export function loadScorecard(): Scorecard {
  const filePath = join(__dirname_resolved, "scorecard.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Scorecard;
}

export function saveScorecard(scorecard: Scorecard): void {
  const filePath = join(__dirname_resolved, "scorecard.json");
  writeFileSync(filePath, JSON.stringify(scorecard, null, 2) + "\n");
}

/**
 * Generate a mock AI response for testing prompt construction logic.
 *
 * This simulates what a well-behaved LLM would produce given proper
 * source chunks and citation rules. Used for fast, deterministic testing.
 */
function generateMockResponse(testCase: TestCase, queryIndex: number): string {
  const query = testCase.queries[queryIndex];
  const chunks = testCase.setup.mockChunks;
  // Build a response that uses the chunks properly
  // This tests whether our SCORING logic is correct, not the AI
  const lines: string[] = [];

  if (
    query.query.toLowerCase().includes("primary result") ||
    query.query.toLowerCase().includes("primary outcome")
  ) {
    // For the DAPA-HF baseline test
    const resultsChunk = chunks.find((c) => c.section_type === "results");
    if (resultsChunk) {
      const chunkIndex =
        chunks.indexOf(resultsChunk) + 1;
      lines.push(
        `The DAPA-HF trial demonstrated that dapagliflozin significantly reduced the composite of worsening heart failure or cardiovascular death, with a hazard ratio (HR) of 0.74 (95% CI 0.65-0.85; P<0.001) [${chunkIndex}]. The number needed to treat was 21 over a median follow-up of 18.2 months [${chunkIndex}].`
      );
    }

    const methodsChunk = chunks.find((c) => c.section_type === "methods");
    if (methodsChunk) {
      const chunkIndex =
        chunks.indexOf(methodsChunk) + 1;
      lines.push(
        `\nThe trial enrolled patients aged ≥18 years with NYHA class II-IV heart failure and reduced ejection fraction (LVEF ≤40%), who were randomized 1:1 to dapagliflozin 10mg or placebo [${chunkIndex}].`
      );
    }
  } else if (
    query.query.toLowerCase().includes("main findings") ||
    query.query.toLowerCase().includes("cardiac and renal")
  ) {
    // Cycle 2: Multi-chunk synthesis — correctly attributes cardiac vs renal
    const cardiacChunk = chunks.find(
      (c) => c.text.toLowerCase().includes("composite") && c.text.includes("HR")
    );
    const renalChunk = chunks.find(
      (c) => c.text.toLowerCase().includes("glomerular") || c.text.toLowerCase().includes("egfr")
    );
    const methodsChunk = chunks.find((c) => c.section_type === "methods");

    if (cardiacChunk) {
      const idx = chunks.indexOf(cardiacChunk) + 1;
      lines.push(
        `The EMPEROR-Reduced trial demonstrated that empagliflozin significantly reduced the primary composite of cardiovascular death or hospitalization for heart failure (HR 0.75; 95% CI 0.65-0.86; P<0.001) [${idx}].`
      );
    }
    if (methodsChunk) {
      const idx = chunks.indexOf(methodsChunk) + 1;
      lines.push(
        `\nThe trial enrolled 3730 patients with class II-IV heart failure and ejection fraction ≤40%, with a median follow-up of 16 months [${idx}].`
      );
    }
    if (renalChunk) {
      const idx = chunks.indexOf(renalChunk) + 1;
      lines.push(
        `\nRegarding renal outcomes, the annual rate of decline in eGFR was significantly slower in the empagliflozin group compared to placebo (-0.55 vs -2.28 mL/min/1.73m²/year; P<0.001) [${idx}].`
      );
    }
  } else if (
    query.query.toLowerCase().includes("safe") ||
    query.query.toLowerCase().includes("side effect")
  ) {
    // Cycle 2: Safety data — correctly cites source [4]
    const safetyChunk = chunks.find(
      (c) => c.text.toLowerCase().includes("adverse") || c.text.toLowerCase().includes("infection")
    );
    if (safetyChunk) {
      const idx = chunks.indexOf(safetyChunk) + 1;
      lines.push(
        `Empagliflozin showed a comparable safety profile to placebo. Serious adverse events were reported in 39.3% of patients in the empagliflozin group and 39.1% in the placebo group [${idx}]. Uncomplicated genital tract infections were more common with empagliflozin [${idx}].`
      );
    }
  } else if (
    query.query.toLowerCase().includes("semaglutide") ||
    query.query.toLowerCase().includes("glp-1") ||
    query.query.toLowerCase().includes("obesity")
  ) {
    // Cycle 3: Question about topic NOT in sources — correct deflection
    const paperTitles = testCase.setup.papers.map((p) => p.title).join("; ");
    lines.push(
      `Your uploaded sources don't cover semaglutide or GLP-1 agonists. The papers you've uploaded focus on SGLT2 inhibitors in heart failure: ${paperTitles}.`
    );
    lines.push(
      `\nIf you'd like, I can analyze what your sources say about SGLT2 inhibitors and cardiovascular outcomes instead.`
    );
  } else if (
    query.query.toLowerCase().includes("all-cause mortality")
  ) {
    // Cycle 3: Partially-covered question — honest partial answer
    const resultsChunks = chunks.filter((c) => c.section_type === "results");
    lines.push(
      `Your sources report cardiovascular death as part of composite endpoints, but do not specifically report all-cause mortality data.`
    );
    if (resultsChunks.length > 0) {
      lines.push(`\nHere is what your sources do cover:`);
      for (const rc of resultsChunks) {
        const idx = chunks.indexOf(rc) + 1;
        const snippet = rc.text.substring(0, 150);
        lines.push(`\n${snippet}... [${idx}]`);
      }
    }
    lines.push(
      `\nHowever, your sources do not specifically address all-cause mortality as a separate endpoint.`
    );
  } else if (
    query.query.toLowerCase().includes("canagliflozin")
  ) {
    // Cycle 3: Drug not in sources but related class is
    lines.push(
      `Your uploaded sources don't contain information about canagliflozin. They cover two other SGLT2 inhibitors:`
    );
    const resultsChunks = chunks.filter((c) => c.section_type === "results");
    for (const rc of resultsChunks) {
      const idx = chunks.indexOf(rc) + 1;
      const paperInfo = testCase.setup.papers.find((p) => p.id === rc.paper_id);
      lines.push(
        `\n- ${paperInfo?.title || "Unknown"}: ${rc.text.substring(0, 100)}... [${idx}]`
      );
    }
    lines.push(
      `\nTo compare canagliflozin with these drugs, you would need to upload papers covering canagliflozin trials.`
    );
  } else if (
    query.query.toLowerCase().includes("compare") &&
    query.query.toLowerCase().includes("efficacy")
  ) {
    // Cycle 4: Cross-paper comparison — correctly attributes each fact to its source
    // Find chunks from each paper
    const paper1 = testCase.setup.papers[0];
    const paper2 = testCase.setup.papers[1];
    const p1Results = chunks.find(
      (c) => c.paper_id === paper1.id && c.section_type === "results"
    );
    const p1Methods = chunks.find(
      (c) => c.paper_id === paper1.id && c.section_type === "methods"
    );
    const p2Results = chunks.find(
      (c) =>
        c.paper_id === paper2.id &&
        c.section_type === "results" &&
        c.text.includes("HR")
    );
    const p2Methods = chunks.find(
      (c) => c.paper_id === paper2.id && c.section_type === "methods"
    );

    if (p1Results && p2Results) {
      const p1Idx = chunks.indexOf(p1Results) + 1;
      const p2Idx = chunks.indexOf(p2Results) + 1;
      const p1MIdx = p1Methods ? chunks.indexOf(p1Methods) + 1 : null;
      const p2MIdx = p2Methods ? chunks.indexOf(p2Methods) + 1 : null;

      lines.push(
        `Both DAPA-HF and EMPEROR-Reduced demonstrated significant benefits for SGLT2 inhibitors in heart failure with reduced ejection fraction.`
      );
      lines.push(
        `\n\n**DAPA-HF (Dapagliflozin)**\nDapagliflozin reduced the composite of worsening heart failure or cardiovascular death with a hazard ratio of 0.74 (95% CI 0.65-0.85; P<0.001), with a number needed to treat of 21 over a median follow-up of 18.2 months [${p1Idx}].`
      );
      if (p1MIdx) {
        lines.push(
          ` The trial enrolled 4744 patients with NYHA class II-IV heart failure and LVEF ≤40% [${p1MIdx}].`
        );
      }
      lines.push(
        `\n\n**EMPEROR-Reduced (Empagliflozin)**\nEmpagliflozin reduced the composite of cardiovascular death or hospitalization for heart failure (HR 0.75; 95% CI 0.65-0.86; P<0.001) [${p2Idx}].`
      );
      if (p2MIdx) {
        lines.push(
          ` The trial enrolled 3730 patients with a median follow-up of 16 months [${p2MIdx}].`
        );
      }
      lines.push(
        `\n\n**Comparison**\nThe hazard ratios were similar (0.74 for dapagliflozin [${p1Idx}] vs 0.75 for empagliflozin [${p2Idx}]), suggesting comparable efficacy. However, these were separate trials with different patient populations and follow-up durations, so a direct head-to-head comparison cannot be made from these data alone.`
      );
    }
  } else if (
    query.query.toLowerCase().includes("renal") &&
    (query.query.toLowerCase().includes("benefit") ||
      query.query.toLowerCase().includes("outcome"))
  ) {
    // Cycle 4: Renal outcomes — only EMPEROR-Reduced has renal data
    const renalChunk = chunks.find(
      (c) =>
        c.text.toLowerCase().includes("glomerular") ||
        c.text.toLowerCase().includes("egfr")
    );
    const dapaResultsChunk = chunks.find(
      (c) =>
        c.paper_id === testCase.setup.papers[0]?.id &&
        c.section_type === "results"
    );

    lines.push(
      `Of the two trials in your sources, only EMPEROR-Reduced reported specific renal outcomes.`
    );
    if (renalChunk) {
      const idx = chunks.indexOf(renalChunk) + 1;
      lines.push(
        `\n\n**EMPEROR-Reduced Renal Data**\nThe annual rate of decline in eGFR was significantly slower in the empagliflozin group compared to placebo (-0.55 vs -2.28 mL/min/1.73m²/year; P<0.001). Empagliflozin was also associated with a lower risk of serious renal outcomes [${idx}].`
      );
    }
    lines.push(
      `\n\n**DAPA-HF**\nYour uploaded DAPA-HF sources do not contain renal outcome data. The DAPA-HF results in your sources focus on the composite of worsening heart failure or cardiovascular death.`
    );
    if (dapaResultsChunk) {
      const idx = chunks.indexOf(dapaResultsChunk) + 1;
      lines.push(
        ` The primary result was HR 0.74 (95% CI 0.65-0.85; P<0.001) [${idx}].`
      );
    }
    lines.push(
      `\n\nTherefore, based on your sources, only empagliflozin (EMPEROR-Reduced) has demonstrated renal preservation benefits.`
    );
  } else {
    // Generic mock response — cites all available chunks
    lines.push(
      `Based on the available sources, here is what the research shows:`
    );
    chunks.forEach((chunk, i) => {
      const summary = chunk.text.substring(0, 100);
      lines.push(`\n${summary}... [${i + 1}]`);
    });
  }

  // Build Sources section listing all papers
  const paperSet = new Map<number, (typeof testCase.setup.papers)[number]>();
  for (const chunk of chunks) {
    const p = testCase.setup.papers.find((pp) => pp.id === chunk.paper_id);
    if (p && !paperSet.has(p.id)) paperSet.set(p.id, p);
  }
  const sourcesSection = [...paperSet.values()]
    .map(
      (p, i) =>
        `[${i + 1}] ${p.title} — ${p.authors.slice(0, 3).join(", ")} (${p.year})`
    )
    .join("\n");
  lines.push(`\n\nSources:\n${sourcesSection}`);

  return lines.join("");
}

/**
 * Generate a live AI response using the actual model.
 */
async function generateLiveResponse(
  systemPrompt: string,
  query: string
): Promise<string> {
  // Dynamic import to avoid loading AI SDK in mock mode
  const { generateText } = await import("ai");
  const { getModel } = await import("@/lib/ai/models");

  const result = await generateText({
    model: getModel(),
    system: systemPrompt,
    messages: [{ role: "user", content: query }],
    maxOutputTokens: 1000,
  });

  return result.text;
}

/**
 * Run a single RALPH test case.
 */
export async function runTestCase(
  caseId: string,
  live: boolean = false
): Promise<CaseResult> {
  const testCase = loadTestCase(caseId);
  const { papers, mockChunks } = testCase.setup;

  // Step 1: Build the system prompt using our mock data
  const { systemPrompt, sourceMetadata: _sourceMetadata } = buildSystemPrompt(
    mockChunks,
    papers,
    "notebook"
  );

  // Step 2: Analyze the prompt construction
  const promptAnalysis = analyzePrompt(
    systemPrompt,
    mockChunks.length,
    papers.map((p) => p.title)
  );

  // Step 3: Run each query
  const queryResults: QueryResult[] = [];

  for (let i = 0; i < testCase.queries.length; i++) {
    const query = testCase.queries[i];

    let response: string;
    if (live) {
      response = await generateLiveResponse(systemPrompt, query.query);
    } else {
      response = generateMockResponse(testCase, i);
    }

    const result = scoreQueryResponse(query, response, mockChunks);
    queryResults.push(result);
  }

  // Step 4: Calculate overall score
  const overallScore =
    queryResults.length > 0
      ? queryResults.reduce((sum, r) => sum + r.weightedScore, 0) /
        queryResults.length
      : 0;

  // Step 5: Check for regressions against previous runs
  const scorecard = loadScorecard();
  const previousResult = scorecard.cases.find((c) => c.caseId === caseId);
  const regressions: string[] = [];
  if (previousResult && previousResult.overallScore > overallScore + 0.5) {
    regressions.push(
      `Score regressed from ${previousResult.overallScore} to ${overallScore}`
    );
  }

  const caseResult: CaseResult = {
    caseId: testCase.id,
    caseName: testCase.name,
    category: testCase.category,
    timestamp: new Date().toISOString(),
    mode: live ? "live" : "mock",
    promptAnalysis,
    queryResults,
    overallScore: Math.round(overallScore * 100) / 100,
    pass: overallScore >= 7.0,
    regressions,
  };

  return caseResult;
}

/**
 * Update the scorecard with a new case result.
 */
export function updateScorecard(result: CaseResult): Scorecard {
  const scorecard = loadScorecard();

  // Replace or append the case result
  const existingIndex = scorecard.cases.findIndex(
    (c) => c.caseId === result.caseId
  );
  if (existingIndex >= 0) {
    scorecard.cases[existingIndex] = result;
  } else {
    scorecard.cases.push(result);
  }

  // Recalculate aggregates
  scorecard.passing = scorecard.cases.filter((c) => c.pass).length;
  scorecard.failing = scorecard.cases.filter((c) => !c.pass).length;
  scorecard.averageScore =
    scorecard.cases.length > 0
      ? Math.round(
          (scorecard.cases.reduce((sum, c) => sum + c.overallScore, 0) /
            scorecard.cases.length) *
            100
        ) / 100
      : 0;
  scorecard.lastUpdated = new Date().toISOString();

  // Update phase gate status
  const phase1Cases = scorecard.cases.filter(
    (c) => c.caseId.match(/ralph-nb-00[1-5]/)
  );
  if (phase1Cases.length > 0) {
    const phase1Avg =
      phase1Cases.reduce((s, c) => s + c.overallScore, 0) / phase1Cases.length;
    scorecard.gateStatus.phase1_grounding =
      phase1Avg >= 8.0
        ? "passed"
        : phase1Cases.length > 0
          ? "in_progress"
          : "not_started";
    scorecard.gateStatus.phase2_intelligence =
      phase1Avg >= 8.0 ? "not_started" : "blocked";
  }

  saveScorecard(scorecard);
  return scorecard;
}

/**
 * Pretty-print a case result for console output.
 */
export function formatCaseResult(result: CaseResult): string {
  const lines: string[] = [];
  lines.push(`\n${"═".repeat(60)}`);
  lines.push(`RALPH CYCLE REPORT: ${result.caseId}`);
  lines.push(`${"═".repeat(60)}`);
  lines.push(`Case: ${result.caseName}`);
  lines.push(`Category: ${result.category}`);
  lines.push(`Mode: ${result.mode}`);
  lines.push(`Time: ${result.timestamp}`);

  lines.push(`\n── Prompt Analysis ──`);
  lines.push(
    `  Source blocks: ${result.promptAnalysis.totalSourceBlocks} (labels correct: ${result.promptAnalysis.sourceLabelsCorrect})`
  );
  lines.push(
    `  Citation rules present: ${result.promptAnalysis.citationRulesPresent}`
  );
  lines.push(
    `  Paper titles: ${result.promptAnalysis.paperTitlesPresent.join(", ") || "none"}`
  );
  lines.push(
    `  Section types: ${result.promptAnalysis.sectionTypesPresent.join(", ") || "none"}`
  );
  lines.push(
    `  System prompt length: ${result.promptAnalysis.systemPromptLength} chars`
  );

  for (const qr of result.queryResults) {
    lines.push(`\n── Query: "${qr.query}" ──`);
    lines.push(`  Citations found: [${qr.citationsFound.join("], [")}]`);
    lines.push(
      `  Scores: G=${qr.scores.grounding} C=${qr.scores.citationAccuracy} H=${qr.scores.hallucinationResistance} Comp=${qr.scores.completeness} R=${qr.scores.readability}`
    );
    lines.push(`  Weighted: ${qr.weightedScore}`);
    if (qr.passedChecks.length > 0) {
      lines.push(`  ✓ ${qr.passedChecks.join("\n  ✓ ")}`);
    }
    if (qr.issues.length > 0) {
      lines.push(`  ✗ ${qr.issues.join("\n  ✗ ")}`);
    }
  }

  lines.push(`\n${"─".repeat(60)}`);
  lines.push(
    `OVERALL: ${result.overallScore}/10 — ${result.pass ? "PASS ✓" : "FAIL ✗"}`
  );
  if (result.regressions.length > 0) {
    lines.push(`REGRESSIONS: ${result.regressions.join("; ")}`);
  }
  lines.push(`${"═".repeat(60)}\n`);

  return lines.join("\n");
}
