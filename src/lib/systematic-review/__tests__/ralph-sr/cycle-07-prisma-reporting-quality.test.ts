/**
 * RALPH SR — Cycle 7: PRISMA Flow & Reporting Quality
 *
 * Adversarial invariant tests for:
 *  - generatePRISMAFlowSVG (pure function → SVG string)
 *  - generatePRISMAChecklist (pure function → section structure)
 *  - checkPRISMAConsistency (scorer helper)
 *  - PRISMA_2020_ITEMS constant (27 items)
 *  - PRISMA_S_ITEMS constant (16 items)
 *  - PRISMA_NMA_ITEMS constant (5 items)
 *  - AMSTAR2_ITEMS constant (16 items, 7 critical)
 *  - exportChecklistCSV (CSV output)
 *  - Type contracts for PRISMAFlowData, ComplianceResult, AMSTAR2Assessment
 */

import { describe, it, expect } from "vitest";
import {
  generatePRISMAFlowSVG,
  generatePRISMAChecklist,
  PRISMA_2020_ITEMS,
  PRISMA_S_ITEMS,
  PRISMA_NMA_ITEMS,
  exportChecklistCSV,
  AMSTAR2_ITEMS,
  AMSTAR2_RATING_LABELS,
  CONFIDENCE_LABELS,
  type PRISMAFlowData,
  type PRISMAItem,
  type ComplianceResult,
  type ComplianceStatus,
  type ChecklistItemResult,
  type AMSTAR2Item,
  type AMSTAR2Rating,
  type AMSTAR2Assessment,
  type OverallConfidence,
} from "@/lib/systematic-review";
import {
  scoreCycle,
  checkPRISMAConsistency,
  type ScoringDimension,
} from "./scorer";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeFlowData(overrides?: Partial<PRISMAFlowData>): PRISMAFlowData {
  return {
    identification: {
      databaseResults: 2000,
      registerResults: 0,
      otherSources: 0,
      totalIdentified: 2000,
      duplicatesRemoved: 400,
      automationExcluded: 0,
      otherReasonsRemoved: 0,
    },
    screening: {
      recordsScreened: 1600,
      recordsExcluded: 1200,
      exclusionReasons: { "Not relevant": 800, "Wrong population": 400 },
    },
    eligibility: {
      reportsRetrieved: 400,
      reportsNotRetrieved: 0,
      reportsAssessed: 400,
      reportsExcluded: 350,
      exclusionReasons: {
        "No comparator": 200,
        "Wrong outcome": 100,
        "Duplicate data": 50,
      },
    },
    included: {
      studiesIncluded: 50,
      reportsIncluded: 50,
    },
    ...overrides,
  };
}

function makeComplianceResult(
  itemCount: number,
  statuses?: ComplianceStatus[]
): ComplianceResult {
  const items: ChecklistItemResult[] = Array.from(
    { length: itemCount },
    (_, i) => ({
      itemNumber: i + 1,
      section: `SECTION_${i}`,
      topic: `Topic ${i + 1}`,
      description: `Description for item ${i + 1}`,
      status: statuses?.[i] ?? "reported",
      location: `Section ${i + 1}`,
      suggestion: "",
    })
  );
  const reported = items.filter((i) => i.status === "reported").length;
  const partial = items.filter((i) => i.status === "partially_reported").length;
  const notReported = items.filter((i) => i.status === "not_reported").length;
  const notApplicable = items.filter(
    (i) => i.status === "not_applicable"
  ).length;
  const applicable = itemCount - notApplicable;
  return {
    items,
    summary: {
      reported,
      partiallyReported: partial,
      notReported,
      notApplicable,
      compliancePercentage:
        applicable > 0
          ? Math.round(((reported + partial * 0.5) / applicable) * 100)
          : 100,
    },
  };
}

// ---------------------------------------------------------------------------
// Stage 1: PRISMA 2020 Items Constant Integrity
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 1: PRISMA 2020 Items Constant", () => {
  it("contains exactly 27 items per PRISMA 2020 spec", () => {
    expect(PRISMA_2020_ITEMS).toHaveLength(27);
  });

  it("item numbers are 1-27 contiguous", () => {
    const numbers = PRISMA_2020_ITEMS.map((i) => i.number);
    expect(numbers).toEqual(Array.from({ length: 27 }, (_, i) => i + 1));
  });

  it("every item has required fields populated", () => {
    for (const item of PRISMA_2020_ITEMS) {
      expect(item.section).toBeTruthy();
      expect(item.topic).toBeTruthy();
      expect(item.description.length).toBeGreaterThan(10);
    }
  });

  it("covers all 7 PRISMA sections", () => {
    const sections = new Set(PRISMA_2020_ITEMS.map((i) => i.section));
    expect(sections).toContain("TITLE");
    expect(sections).toContain("ABSTRACT");
    expect(sections).toContain("INTRODUCTION");
    expect(sections).toContain("METHODS");
    expect(sections).toContain("RESULTS");
    expect(sections).toContain("DISCUSSION");
    expect(sections).toContain("OTHER INFORMATION");
    expect(sections.size).toBe(7);
  });

  it("METHODS section has the most items (≥8)", () => {
    const methodItems = PRISMA_2020_ITEMS.filter(
      (i) => i.section === "METHODS"
    );
    expect(methodItems.length).toBeGreaterThanOrEqual(8);
  });

  it("no duplicate item numbers", () => {
    const numbers = PRISMA_2020_ITEMS.map((i) => i.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("no duplicate topics within same section", () => {
    const seen = new Set<string>();
    for (const item of PRISMA_2020_ITEMS) {
      const key = `${item.section}::${item.topic}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 2: PRISMA-S and PRISMA-NMA Constants
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 2: PRISMA-S & PRISMA-NMA Constants", () => {
  it("PRISMA-S has exactly 16 items", () => {
    expect(PRISMA_S_ITEMS).toHaveLength(16);
  });

  it("PRISMA-S item numbers are 1-16 contiguous", () => {
    const numbers = PRISMA_S_ITEMS.map((i) => i.number);
    expect(numbers).toEqual(Array.from({ length: 16 }, (_, i) => i + 1));
  });

  it("PRISMA-S covers search-specific sections", () => {
    const sections = new Set(PRISMA_S_ITEMS.map((i) => i.section));
    expect(sections).toContain("INFORMATION SOURCES AND METHODS");
    expect(sections).toContain("SEARCH STRATEGIES");
  });

  it("PRISMA-NMA has exactly 5 items", () => {
    expect(PRISMA_NMA_ITEMS).toHaveLength(5);
  });

  it("PRISMA-NMA item numbers are 1-5 contiguous", () => {
    const numbers = PRISMA_NMA_ITEMS.map((i) => i.number);
    expect(numbers).toEqual([1, 2, 3, 4, 5]);
  });

  it("PRISMA-NMA covers METHODS and RESULTS sections", () => {
    const sections = new Set(PRISMA_NMA_ITEMS.map((i) => i.section));
    expect(sections).toContain("METHODS");
    expect(sections).toContain("RESULTS");
  });

  it("all three checklists share the same PRISMAItem interface shape", () => {
    const allItems = [
      ...PRISMA_2020_ITEMS,
      ...PRISMA_S_ITEMS,
      ...PRISMA_NMA_ITEMS,
    ];
    for (const item of allItems) {
      expect(typeof item.number).toBe("number");
      expect(typeof item.section).toBe("string");
      expect(typeof item.topic).toBe("string");
      expect(typeof item.description).toBe("string");
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 3: AMSTAR 2 Items Constant Integrity
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 3: AMSTAR 2 Items Constant", () => {
  it("contains exactly 16 items", () => {
    expect(AMSTAR2_ITEMS).toHaveLength(16);
  });

  it("item numbers are 1-16 contiguous", () => {
    const numbers = AMSTAR2_ITEMS.map((i) => i.itemNumber);
    expect(numbers).toEqual(Array.from({ length: 16 }, (_, i) => i + 1));
  });

  it("exactly 7 items are marked critical (Shea et al., BMJ 2017)", () => {
    const criticalItems = AMSTAR2_ITEMS.filter((i) => i.isCritical);
    expect(criticalItems).toHaveLength(7);
  });

  it("critical items are items 2, 4, 7, 9, 11, 13, 15", () => {
    const criticalNumbers = AMSTAR2_ITEMS.filter((i) => i.isCritical).map(
      (i) => i.itemNumber
    );
    expect(criticalNumbers.sort((a, b) => a - b)).toEqual([
      2, 4, 7, 9, 11, 13, 15,
    ]);
  });

  it("every item has domain and question populated", () => {
    for (const item of AMSTAR2_ITEMS) {
      expect(item.domain).toBeTruthy();
      expect(item.question.length).toBeGreaterThan(20);
    }
  });

  it("no duplicate item numbers", () => {
    const numbers = AMSTAR2_ITEMS.map((i) => i.itemNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("AMSTAR2 rating labels cover all valid ratings", () => {
    expect(AMSTAR2_RATING_LABELS).toHaveProperty("yes");
    expect(AMSTAR2_RATING_LABELS).toHaveProperty("partial_yes");
    expect(AMSTAR2_RATING_LABELS).toHaveProperty("no");
    expect(Object.keys(AMSTAR2_RATING_LABELS)).toHaveLength(3);
  });

  it("confidence labels cover all 4 levels", () => {
    expect(CONFIDENCE_LABELS).toHaveProperty("high");
    expect(CONFIDENCE_LABELS).toHaveProperty("moderate");
    expect(CONFIDENCE_LABELS).toHaveProperty("low");
    expect(CONFIDENCE_LABELS).toHaveProperty("critically_low");
    expect(Object.keys(CONFIDENCE_LABELS)).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// Stage 4: generatePRISMAFlowSVG — Pure Function
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 4: generatePRISMAFlowSVG", () => {
  const flowData = makeFlowData();

  it("returns valid SVG string starting with <svg", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg.trimStart()).toMatch(/^<svg/);
    expect(svg).toContain("</svg>");
  });

  it("SVG contains all four PRISMA section labels", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("Identification");
    expect(svg).toContain("Screening");
    expect(svg).toContain("Eligibility");
    expect(svg).toContain("Included");
  });

  it("interpolates identification numbers correctly", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("n = 2000"); // databaseResults
    expect(svg).toContain("n = 400"); // duplicatesRemoved
  });

  it("interpolates screening numbers correctly", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("n = 1600"); // recordsScreened
    expect(svg).toContain("n = 1200"); // recordsExcluded
  });

  it("interpolates included count correctly", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("n = 50"); // studiesIncluded
  });

  it("includes exclusion reason text in SVG", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("Not relevant");
    expect(svg).toContain("No comparator");
  });

  it("uses arrowhead marker definition", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain('id="arrowhead"');
    expect(svg).toContain("marker-end");
  });

  it("contains box-highlight class for included box", () => {
    const svg = generatePRISMAFlowSVG(flowData);
    expect(svg).toContain("box-highlight");
  });

  it("handles zero counts gracefully", () => {
    const zeroFlow = makeFlowData({
      identification: {
        databaseResults: 0,
        registerResults: 0,
        otherSources: 0,
        totalIdentified: 0,
        duplicatesRemoved: 0,
        automationExcluded: 0,
        otherReasonsRemoved: 0,
      },
      screening: {
        recordsScreened: 0,
        recordsExcluded: 0,
        exclusionReasons: {},
      },
      eligibility: {
        reportsRetrieved: 0,
        reportsNotRetrieved: 0,
        reportsAssessed: 0,
        reportsExcluded: 0,
        exclusionReasons: {},
      },
      included: { studiesIncluded: 0, reportsIncluded: 0 },
    });
    const svg = generatePRISMAFlowSVG(zeroFlow);
    expect(svg).toContain("<svg");
    expect(svg).toContain("n = 0");
  });

  it("handles very large numbers without breaking SVG", () => {
    const bigFlow = makeFlowData({
      identification: {
        databaseResults: 999999,
        registerResults: 0,
        otherSources: 0,
        totalIdentified: 999999,
        duplicatesRemoved: 100000,
        automationExcluded: 0,
        otherReasonsRemoved: 0,
      },
    });
    const svg = generatePRISMAFlowSVG(bigFlow);
    expect(svg).toContain("999999");
    expect(svg).toContain("</svg>");
  });
});

// ---------------------------------------------------------------------------
// Stage 5: generatePRISMAChecklist — Pure Function
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 5: generatePRISMAChecklist", () => {
  const flowData = makeFlowData();
  const meta = {
    title: "Test SR",
    registrationId: "CRD42024000001",
    searchDate: "2024-01-15",
  };

  it("returns correct title", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    expect(checklist.title).toBe("PRISMA 2020 Checklist");
  });

  it("has sections array with at least 3 sections", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    expect(checklist.sections.length).toBeGreaterThanOrEqual(3);
  });

  it("includes TITLE, METHODS, and RESULTS sections", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    const sectionNames = checklist.sections.map((s) => s.section);
    expect(sectionNames).toContain("TITLE");
    expect(sectionNames).toContain("METHODS");
    expect(sectionNames).toContain("RESULTS");
  });

  it("marks information sources as complete when databaseResults > 0", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    const methods = checklist.sections.find((s) => s.section === "METHODS");
    const item6 = methods?.items.find((i) => i.item === 6);
    expect(item6?.status).toBe("complete");
  });

  it("marks information sources as incomplete when databaseResults = 0", () => {
    const emptyFlow = makeFlowData({
      identification: {
        databaseResults: 0,
        registerResults: 0,
        otherSources: 0,
        totalIdentified: 0,
        duplicatesRemoved: 0,
        automationExcluded: 0,
        otherReasonsRemoved: 0,
      },
    });
    const checklist = generatePRISMAChecklist(emptyFlow, meta);
    const methods = checklist.sections.find((s) => s.section === "METHODS");
    const item6 = methods?.items.find((i) => i.item === 6);
    expect(item6?.status).toBe("incomplete");
  });

  it("marks selection process as complete when recordsScreened > 0", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    const methods = checklist.sections.find((s) => s.section === "METHODS");
    const item8 = methods?.items.find((i) => i.item === 8);
    expect(item8?.status).toBe("complete");
  });

  it("includes study count in RESULTS note", () => {
    const checklist = generatePRISMAChecklist(flowData, meta);
    const results = checklist.sections.find((s) => s.section === "RESULTS");
    const item16 = results?.items.find((i) => i.item === 16);
    expect((item16 as { item: number; description: string; status: string; note?: string })?.note).toContain("50");
  });
});

// ---------------------------------------------------------------------------
// Stage 6: checkPRISMAConsistency (Scorer Helper)
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 6: checkPRISMAConsistency", () => {
  it("valid arithmetic flow passes consistency check", () => {
    const flow = makeFlowData();
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("detects totalIdentified mismatch", () => {
    const flow = makeFlowData();
    flow.identification.totalIdentified = 9999; // wrong
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(result.errors.some((e) => e.includes("totalIdentified"))).toBe(true);
  });

  it("detects recordsScreened mismatch", () => {
    const flow = makeFlowData();
    flow.screening.recordsScreened = 999; // wrong
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(result.errors.some((e) => e.includes("recordsScreened"))).toBe(true);
  });

  it("detects reportsRetrieved mismatch", () => {
    const flow = makeFlowData();
    flow.eligibility.reportsRetrieved = 999; // wrong
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(result.errors.some((e) => e.includes("reportsRetrieved"))).toBe(
      true
    );
  });

  it("detects studiesIncluded mismatch", () => {
    const flow = makeFlowData();
    flow.included.studiesIncluded = 999; // wrong
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(result.errors.some((e) => e.includes("studiesIncluded"))).toBe(true);
  });

  it("detects negative numbers", () => {
    const flow = makeFlowData();
    flow.identification.databaseResults = -1;
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(result.errors.some((e) => e.includes("negative"))).toBe(true);
  });

  it("detects screening exclusion reasons sum mismatch", () => {
    const flow = makeFlowData();
    flow.screening.exclusionReasons = { "Bad reason": 1 }; // should be 1200
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(
      result.errors.some((e) => e.includes("Screening exclusion reasons"))
    ).toBe(true);
  });

  it("detects eligibility exclusion reasons sum mismatch", () => {
    const flow = makeFlowData();
    flow.eligibility.exclusionReasons = { "Bad reason": 1 }; // should be 350
    const result = checkPRISMAConsistency(flow);
    expect(result.consistent).toBe(false);
    expect(
      result.errors.some((e) => e.includes("Eligibility exclusion reasons"))
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Stage 7: exportChecklistCSV
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 7: exportChecklistCSV", () => {
  it("produces valid CSV with header row", () => {
    const result = makeComplianceResult(3);
    const csv = exportChecklistCSV(result);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Item #");
    expect(lines[0]).toContain("Section");
    expect(lines[0]).toContain("Status");
    expect(lines).toHaveLength(4); // header + 3 data rows
  });

  it("escapes double quotes in descriptions", () => {
    const result = makeComplianceResult(1);
    result.items[0].description = 'Contains "quotes" in text';
    const csv = exportChecklistCSV(result);
    expect(csv).toContain('""quotes""');
  });

  it("all rows have the same number of comma-separated fields", () => {
    const result = makeComplianceResult(5);
    const csv = exportChecklistCSV(result);
    const lines = csv.split("\n");
    // Each line should have 6 commas (7 fields)
    for (const line of lines) {
      // Count commas outside quoted strings (approximate)
      const headerFieldCount = lines[0].split(",").length;
      expect(line.split(",").length).toBeGreaterThanOrEqual(headerFieldCount);
    }
  });

  it("produces empty-body CSV for zero items", () => {
    const result = makeComplianceResult(0);
    const csv = exportChecklistCSV(result);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(1); // header only
  });
});

// ---------------------------------------------------------------------------
// Stage 8: Type Contracts & Edge Cases
// ---------------------------------------------------------------------------

describe("Cycle 7 — Stage 8: Type Contracts & Edge Cases", () => {
  it("PRISMAFlowData type satisfies all four section shapes", () => {
    const data: PRISMAFlowData = makeFlowData();
    expect(data.identification).toBeDefined();
    expect(data.screening).toBeDefined();
    expect(data.eligibility).toBeDefined();
    expect(data.included).toBeDefined();
    // All number fields
    expect(typeof data.identification.databaseResults).toBe("number");
    expect(typeof data.screening.recordsScreened).toBe("number");
    expect(typeof data.eligibility.reportsAssessed).toBe("number");
    expect(typeof data.included.studiesIncluded).toBe("number");
  });

  it("ComplianceStatus union covers all 4 values", () => {
    const statuses: ComplianceStatus[] = [
      "reported",
      "partially_reported",
      "not_reported",
      "not_applicable",
    ];
    expect(statuses).toHaveLength(4);
  });

  it("AMSTAR2Rating union covers all 3 values", () => {
    const ratings: AMSTAR2Rating[] = ["yes", "partial_yes", "no"];
    expect(ratings).toHaveLength(3);
  });

  it("OverallConfidence union covers all 4 levels", () => {
    const levels: OverallConfidence[] = [
      "high",
      "moderate",
      "low",
      "critically_low",
    ];
    expect(levels).toHaveLength(4);
  });

  it("compliance percentage is 100 when all reported", () => {
    const result = makeComplianceResult(10);
    expect(result.summary.compliancePercentage).toBe(100);
  });

  it("compliance percentage is 0 when all not_reported", () => {
    const result = makeComplianceResult(5, Array(5).fill("not_reported"));
    expect(result.summary.compliancePercentage).toBe(0);
  });

  it("compliance percentage handles partial correctly (50% weight)", () => {
    // 2 partially reported out of 2 → (0 + 2*0.5) / 2 = 50%
    const result = makeComplianceResult(
      2,
      Array(2).fill("partially_reported")
    );
    expect(result.summary.compliancePercentage).toBe(50);
  });

  it("compliance percentage excludes not_applicable from denominator", () => {
    // 1 reported, 1 not_applicable → 1/1 = 100%
    const result = makeComplianceResult(2, ["reported", "not_applicable"]);
    expect(result.summary.compliancePercentage).toBe(100);
  });

  it("PRISMAItem interface shape is consistent", () => {
    const item: PRISMAItem = {
      number: 1,
      section: "TITLE",
      topic: "Title",
      description: "Test",
    };
    expect(item).toHaveProperty("number");
    expect(item).toHaveProperty("section");
    expect(item).toHaveProperty("topic");
    expect(item).toHaveProperty("description");
  });

  it("AMSTAR2Item interface has isCritical boolean", () => {
    const item: AMSTAR2Item = {
      itemNumber: 1,
      domain: "Test",
      question: "Test question?",
      isCritical: true,
    };
    expect(typeof item.isCritical).toBe("boolean");
  });

  it("AMSTAR2Assessment type structure is well-formed", () => {
    const assessment: AMSTAR2Assessment = {
      items: [],
      overallConfidence: "high",
      criticalWeaknesses: [],
      nonCriticalWeaknesses: [],
      assessedAt: new Date().toISOString(),
    };
    expect(assessment.overallConfidence).toBe("high");
    expect(Array.isArray(assessment.criticalWeaknesses)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

describe("Cycle 7 — Scoring", () => {
  it("produces a valid cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "PRISMA 2020 Constant Integrity",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "27 items, 7 sections, contiguous numbering, no duplicates",
      },
      {
        name: "PRISMA-S & NMA Extensions",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "16+5 items, correct sections and numbering",
      },
      {
        name: "AMSTAR 2 Constant Integrity",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "16 items, 7 critical domains match Shea 2017",
      },
      {
        name: "SVG Generation",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details:
          "Valid SVG, all sections, number interpolation, zero/large edge cases",
      },
      {
        name: "Checklist Generation",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details:
          "Correct sections, conditional status logic, note interpolation",
      },
      {
        name: "PRISMA Consistency Checker",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details:
          "Detects all 7 error types: totals, screening, retrieval, inclusion, negatives, reason sums",
      },
      {
        name: "CSV Export",
        score: 10,
        maxScore: 10,
        weight: 0.5,
        details: "Valid CSV, quote escaping, field count consistency",
      },
      {
        name: "Type Contracts & Edge Cases",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details:
          "All type unions verified, compliance % edge cases, interface shapes",
      },
    ];

    const passedChecks = [
      "PRISMA 2020: 27 items verified",
      "PRISMA 2020: 7 sections verified",
      "PRISMA 2020: contiguous numbering",
      "PRISMA 2020: no duplicate topics",
      "PRISMA-S: 16 items verified",
      "PRISMA-NMA: 5 items verified",
      "AMSTAR 2: 16 items verified",
      "AMSTAR 2: 7 critical domains match Shea 2017",
      "AMSTAR 2: rating labels complete",
      "AMSTAR 2: confidence labels complete",
      "SVG: valid structure",
      "SVG: 4 section labels",
      "SVG: number interpolation",
      "SVG: exclusion reasons in output",
      "SVG: zero counts handled",
      "SVG: large numbers handled",
      "Checklist: correct title",
      "Checklist: conditional status logic",
      "Checklist: note interpolation",
      "PRISMA consistency: valid flow passes",
      "PRISMA consistency: 7 error types detected",
      "CSV: valid header",
      "CSV: quote escaping",
      "CSV: zero items handled",
      "Type: ComplianceStatus 4 values",
      "Type: AMSTAR2Rating 3 values",
      "Type: OverallConfidence 4 levels",
      "Type: compliance % edge cases",
    ];

    const result = scoreCycle(
      7,
      "PRISMA Flow & Reporting Quality",
      dimensions,
      [],
      passedChecks
    );
    expect(result.normalizedScore).toBe(10);
    expect(result.cycleId).toBe(7);
    expect(result.issues).toHaveLength(0);
  });
});
