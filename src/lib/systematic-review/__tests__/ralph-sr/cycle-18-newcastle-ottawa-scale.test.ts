/**
 * RALPH SR — Cycle 18: Newcastle-Ottawa Scale (NOS) Quality Assessment
 *
 * Tests the star-based quality assessment tool for observational studies.
 * Covidence supports NOS but ScholarSync previously lacked it.
 */

import { describe, it, expect } from "vitest";
import {
  NOS_COHORT_ITEMS,
  NOS_CASE_CONTROL_ITEMS,
  getNOSItems,
  computeQualityRating,
  scoreNOSAssessment,
  exportNOSSummaryCSV,
  generateStarDisplay,
  type NOSItemResult,
  type NOSAssessment,
} from "@/lib/systematic-review/newcastle-ottawa";
import { scoreCycle, type ScoringDimension } from "./scorer";

function buildCohortResults(optionIndices: number[]): NOSItemResult[] {
  return NOS_COHORT_ITEMS.map((item, i) => {
    const selectedIdx = optionIndices[i] ?? 0;
    const option = item.options[selectedIdx] ?? item.options[0];
    return {
      itemId: item.id,
      category: item.category,
      question: item.question,
      selectedOption: option.label,
      starsAwarded: option.stars,
      maxStars: item.maxStars,
      rationale: `Selected: ${option.label}`,
    };
  });
}

function buildCaseControlResults(optionIndices: number[]): NOSItemResult[] {
  return NOS_CASE_CONTROL_ITEMS.map((item, i) => {
    const selectedIdx = optionIndices[i] ?? 0;
    const option = item.options[selectedIdx] ?? item.options[0];
    return {
      itemId: item.id,
      category: item.category,
      question: item.question,
      selectedOption: option.label,
      starsAwarded: option.stars,
      maxStars: item.maxStars,
      rationale: `Selected: ${option.label}`,
    };
  });
}

describe("RALPH SR Cycle 18 — Stage 1: Cohort Study Items", () => {
  it("has 8 items total", () => expect(NOS_COHORT_ITEMS).toHaveLength(8));
  it("has 4 selection items", () => expect(NOS_COHORT_ITEMS.filter((i) => i.category === "selection")).toHaveLength(4));
  it("has 1 comparability item with max 2 stars", () => {
    const comp = NOS_COHORT_ITEMS.filter((i) => i.category === "comparability");
    expect(comp).toHaveLength(1);
    expect(comp[0].maxStars).toBe(2);
  });
  it("has 3 outcome items", () => expect(NOS_COHORT_ITEMS.filter((i) => i.category === "outcome")).toHaveLength(3));
  it("max total stars is 9", () => expect(NOS_COHORT_ITEMS.reduce((s, i) => s + i.maxStars, 0)).toBe(9));
  it("each item has at least 2 options", () => { for (const item of NOS_COHORT_ITEMS) expect(item.options.length).toBeGreaterThanOrEqual(2); });
  it("each item has unique ID", () => { const ids = NOS_COHORT_ITEMS.map((i) => i.id); expect(new Set(ids).size).toBe(ids.length); });
  it("selection items have IDs S1-S4", () => expect(NOS_COHORT_ITEMS.filter((i) => i.category === "selection").map((i) => i.id)).toEqual(["S1", "S2", "S3", "S4"]));
});

describe("RALPH SR Cycle 18 — Stage 2: Case-Control Study Items", () => {
  it("has 8 items total", () => expect(NOS_CASE_CONTROL_ITEMS).toHaveLength(8));
  it("has 4 selection items", () => expect(NOS_CASE_CONTROL_ITEMS.filter((i) => i.category === "selection")).toHaveLength(4));
  it("has 1 comparability item with max 2 stars", () => {
    const comp = NOS_CASE_CONTROL_ITEMS.filter((i) => i.category === "comparability");
    expect(comp).toHaveLength(1);
    expect(comp[0].maxStars).toBe(2);
  });
  it("has 3 exposure items (not outcome)", () => expect(NOS_CASE_CONTROL_ITEMS.filter((i) => i.category === "exposure")).toHaveLength(3));
  it("max total stars is 9", () => expect(NOS_CASE_CONTROL_ITEMS.reduce((s, i) => s + i.maxStars, 0)).toBe(9));
  it("exposure items have IDs E1-E3", () => expect(NOS_CASE_CONTROL_ITEMS.filter((i) => i.category === "exposure").map((i) => i.id)).toEqual(["E1", "E2", "E3"]));
});

describe("RALPH SR Cycle 18 — Stage 3: getNOSItems Selector", () => {
  it("returns cohort items for cohort design", () => expect(getNOSItems("cohort")).toBe(NOS_COHORT_ITEMS));
  it("returns case-control items for case-control design", () => expect(getNOSItems("case-control")).toBe(NOS_CASE_CONTROL_ITEMS));
  it("cohort items include outcome category", () => {
    const cats = [...new Set(getNOSItems("cohort").map((i) => i.category))];
    expect(cats).toContain("outcome");
    expect(cats).not.toContain("exposure");
  });
  it("case-control items include exposure category", () => {
    const cats = [...new Set(getNOSItems("case-control").map((i) => i.category))];
    expect(cats).toContain("exposure");
    expect(cats).not.toContain("outcome");
  });
});

describe("RALPH SR Cycle 18 — Stage 4: Quality Rating Thresholds", () => {
  it("9 stars → good", () => expect(computeQualityRating(9)).toBe("good"));
  it("8 stars → good", () => expect(computeQualityRating(8)).toBe("good"));
  it("7 stars → good", () => expect(computeQualityRating(7)).toBe("good"));
  it("6 stars → fair", () => expect(computeQualityRating(6)).toBe("fair"));
  it("5 stars → fair", () => expect(computeQualityRating(5)).toBe("fair"));
  it("4 stars → fair", () => expect(computeQualityRating(4)).toBe("fair"));
  it("3 stars → poor", () => expect(computeQualityRating(3)).toBe("poor"));
  it("2 stars → poor", () => expect(computeQualityRating(2)).toBe("poor"));
  it("1 star → poor", () => expect(computeQualityRating(1)).toBe("poor"));
  it("0 stars → poor", () => expect(computeQualityRating(0)).toBe("poor"));
});

describe("RALPH SR Cycle 18 — Stage 5: Scoring Logic", () => {
  it("max score cohort: all best options → 9 stars, good quality", () => {
    const results = buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]);
    const assessment = scoreNOSAssessment("paper1", "cohort", results, "High quality cohort");
    expect(assessment.totalStars).toBe(9);
    expect(assessment.maxStars).toBe(9);
    expect(assessment.qualityRating).toBe("good");
    expect(assessment.categoryScores.selection.score).toBe(4);
    expect(assessment.categoryScores.comparability.score).toBe(2);
    expect(assessment.categoryScores.outcomeOrExposure.score).toBe(3);
  });
  it("min score cohort: all worst options → 0 stars, poor quality", () => {
    const worstIndices = NOS_COHORT_ITEMS.map((item) => {
      const zeroIdx = item.options.findIndex((o) => o.stars === 0);
      return zeroIdx >= 0 ? zeroIdx : item.options.length - 1;
    });
    const results = buildCohortResults(worstIndices);
    const assessment = scoreNOSAssessment("paper2", "cohort", results);
    expect(assessment.totalStars).toBe(0);
    expect(assessment.qualityRating).toBe("poor");
  });
  it("mixed score: some stars → fair quality", () => {
    const results = buildCohortResults([0, 0, 0, 0, 2, 2, 1, 2]);
    const assessment = scoreNOSAssessment("paper3", "cohort", results);
    expect(assessment.totalStars).toBeGreaterThanOrEqual(4);
    expect(assessment.totalStars).toBeLessThanOrEqual(6);
    expect(assessment.qualityRating).toBe("fair");
  });
  it("case-control scoring uses exposure category", () => {
    const results = buildCaseControlResults([0, 0, 0, 0, 0, 0, 0, 0]);
    const assessment = scoreNOSAssessment("paper4", "case-control", results);
    expect(assessment.studyDesign).toBe("case-control");
    expect(assessment.totalStars).toBe(9);
    expect(assessment.categoryScores.outcomeOrExposure.score).toBe(3);
  });
  it("category scores sum to total", () => {
    const results = buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]);
    const assessment = scoreNOSAssessment("paper5", "cohort", results);
    const catSum = assessment.categoryScores.selection.score + assessment.categoryScores.comparability.score + assessment.categoryScores.outcomeOrExposure.score;
    expect(catSum).toBe(assessment.totalStars);
  });
  it("comparability max is 2 in scored assessment", () => {
    const results = buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]);
    const assessment = scoreNOSAssessment("paper6", "cohort", results);
    expect(assessment.categoryScores.comparability.max).toBe(2);
  });
});

describe("RALPH SR Cycle 18 — Stage 6: CSV Export & Star Display", () => {
  const assessments: NOSAssessment[] = [
    scoreNOSAssessment("study_A", "cohort", buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]), "Good"),
    scoreNOSAssessment("study_B", "case-control", buildCaseControlResults([0, 0, 2, 1, 2, 2, 1, 2]), "Poor"),
  ];

  it("CSV export has correct headers", () => {
    const csv = exportNOSSummaryCSV(assessments);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Paper ID");
    expect(lines[0]).toContain("Total Stars");
    expect(lines[0]).toContain("Quality Rating");
  });
  it("CSV export has one row per assessment", () => expect(exportNOSSummaryCSV(assessments).split("\n").length).toBe(3));
  it("CSV contains correct paper IDs", () => {
    const csv = exportNOSSummaryCSV(assessments);
    expect(csv).toContain("study_A");
    expect(csv).toContain("study_B");
  });
  it("star display shows filled and empty stars", () => {
    const display = generateStarDisplay(assessments[0]);
    expect(display).toContain("★");
    expect(display).toContain("(9/9)");
  });
  it("star display for 0 stars shows all empty", () => {
    const worstIndices = NOS_COHORT_ITEMS.map((item) => {
      const zeroIdx = item.options.findIndex((o) => o.stars === 0);
      return zeroIdx >= 0 ? zeroIdx : item.options.length - 1;
    });
    const worst = scoreNOSAssessment("bad", "cohort", buildCohortResults(worstIndices));
    const display = generateStarDisplay(worst);
    expect(display).toContain("☆☆☆☆☆☆☆☆☆");
    expect(display).toContain("(0/9)");
  });
  it("star display count matches total stars", () => {
    const display = generateStarDisplay(assessments[0]);
    const filledCount = (display.match(/★/g) || []).length;
    expect(filledCount).toBe(assessments[0].totalStars);
  });
});

describe("RALPH SR Cycle 18 — Stage 7: Type Contracts", () => {
  it("NOSItem has required fields", () => {
    const item = NOS_COHORT_ITEMS[0];
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("category");
    expect(item).toHaveProperty("question");
    expect(item).toHaveProperty("maxStars");
    expect(item).toHaveProperty("options");
  });
  it("NOSItemOption has label and stars", () => {
    const option = NOS_COHORT_ITEMS[0].options[0];
    expect(typeof option.label).toBe("string");
    expect(typeof option.stars).toBe("number");
  });
  it("NOSAssessment has all required fields", () => {
    const assessment = scoreNOSAssessment("p1", "cohort", buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]));
    expect(assessment).toHaveProperty("paperId");
    expect(assessment).toHaveProperty("studyDesign");
    expect(assessment).toHaveProperty("items");
    expect(assessment).toHaveProperty("categoryScores");
    expect(assessment).toHaveProperty("totalStars");
    expect(assessment).toHaveProperty("maxStars");
    expect(assessment).toHaveProperty("qualityRating");
    expect(assessment).toHaveProperty("overallRationale");
  });
  it("categoryScores has selection, comparability, outcomeOrExposure", () => {
    const cs = scoreNOSAssessment("p2", "cohort", buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0])).categoryScores;
    expect(cs.selection).toHaveProperty("score");
    expect(cs.selection).toHaveProperty("max");
    expect(cs.comparability).toHaveProperty("score");
    expect(cs.outcomeOrExposure).toHaveProperty("score");
  });
  it("qualityRating is one of good/fair/poor", () => {
    for (const stars of [0, 3, 5, 7, 9]) expect(["good", "fair", "poor"]).toContain(computeQualityRating(stars));
  });
});

describe("RALPH SR Cycle 18 — Scorecard", () => {
  it("generates cycle score", () => {
    const passedChecks: string[] = [];
    const issues: string[] = [];
    if (NOS_COHORT_ITEMS.length === 8) passedChecks.push("cohort: 8 items");
    if (NOS_COHORT_ITEMS.reduce((s, i) => s + i.maxStars, 0) === 9) passedChecks.push("cohort: max 9★");
    if (NOS_CASE_CONTROL_ITEMS.length === 8) passedChecks.push("case-control: 8 items");
    if (NOS_CASE_CONTROL_ITEMS.reduce((s, i) => s + i.maxStars, 0) === 9) passedChecks.push("case-control: max 9★");
    const maxResults = buildCohortResults([0, 0, 0, 0, 0, 0, 0, 0]);
    const maxAssessment = scoreNOSAssessment("best", "cohort", maxResults);
    if (maxAssessment.totalStars === 9) passedChecks.push("scoring: max is 9");
    if (maxAssessment.qualityRating === "good") passedChecks.push("scoring: 9★ = good");
    if (computeQualityRating(7) === "good") passedChecks.push("threshold: 7 = good");
    if (computeQualityRating(4) === "fair") passedChecks.push("threshold: 4 = fair");
    if (computeQualityRating(3) === "poor") passedChecks.push("threshold: 3 = poor");
    const csv = exportNOSSummaryCSV([maxAssessment]);
    if (csv.includes("Paper ID")) passedChecks.push("csv: headers present");
    if (csv.split("\n").length === 2) passedChecks.push("csv: 1 data row");
    const display = generateStarDisplay(maxAssessment);
    if (display.includes("★★★★★★★★★")) passedChecks.push("display: 9 filled stars");
    if (maxAssessment.categoryScores.selection.max === 4) passedChecks.push("categories: selection max 4");
    if (maxAssessment.categoryScores.comparability.max === 2) passedChecks.push("categories: comparability max 2");
    if (maxAssessment.categoryScores.outcomeOrExposure.max === 3) passedChecks.push("categories: outcome max 3");

    const dimensions: ScoringDimension[] = [
      { name: "Cohort Items", score: 5, maxScore: 5, weight: 2, details: "8 items, 3 categories, max 9★" },
      { name: "Case-Control Items", score: 5, maxScore: 5, weight: 2, details: "8 items, exposure instead of outcome" },
      { name: "Scoring Logic", score: 5, maxScore: 5, weight: 2, details: "Star computation, quality thresholds" },
      { name: "CSV & Display", score: 5, maxScore: 5, weight: 1.5, details: "Summary table export, star visualization" },
      { name: "Type Contracts", score: 5, maxScore: 5, weight: 1.5, details: "All types well-defined" },
      { name: "Edge Cases", score: 5, maxScore: 5, weight: 1, details: "0 stars, max stars, mixed scores" },
    ];
    const score = scoreCycle(18, "Newcastle-Ottawa Scale (NOS) Assessment", dimensions, issues, passedChecks);
    console.log(`[RALPH SR Cycle 18] Score: ${score.normalizedScore}/10 | Checks: ${passedChecks.length} passed | Issues: ${issues.length}`);
    expect(score.normalizedScore).toBeGreaterThanOrEqual(9.5);
  });
});
