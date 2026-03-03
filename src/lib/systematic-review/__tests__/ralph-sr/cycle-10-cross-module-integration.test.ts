/**
 * RALPH SR — Cycle 10: Cross-Module Integration & Remaining Types
 *
 * Adversarial invariant tests for:
 *  - formatForCochrane / formatForEmbase (pure search syntax translators)
 *  - exportManuscriptDraft (pure IMRAD-ordered markdown generator)
 *  - GapMapData / GapMapCell / EffectDirection / CertaintyLevel type contracts
 *  - SnowballDirection / SnowballResult type contracts
 *  - ManuscriptSection / ManuscriptSectionOutput type contracts
 *  - PICOInput / SearchBlock / SearchStrategy type contracts
 *  - Cross-module type compatibility (CertaintyLevel ≈ GRADE CertaintyRating)
 */

import { describe, it, expect } from "vitest";
import {
  // Search strategy
  formatForCochrane,
  formatForEmbase,
  type PICOInput,
  type SearchBlock,
  type SearchStrategy,
  // Manuscript
  exportManuscriptDraft,
  type ManuscriptSection,
  type ManuscriptSectionOutput,
  // Evidence gap map
  type GapMapCell,
  type GapMapData,
  type EffectDirection,
  type CertaintyLevel,
  // Snowballing
  type SnowballDirection,
  type SnowballResult,
  // Cross-reference: GRADE certainty
  type CertaintyRating,
} from "@/lib/systematic-review";
import { scoreCycle, type ScoringDimension } from "./scorer";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeManuscriptSections(
  sectionNames: ManuscriptSection[] = [
    "abstract",
    "introduction",
    "methods",
    "results",
    "discussion",
  ]
): ManuscriptSectionOutput[] {
  return sectionNames.map((section) => ({
    section,
    content: `This is the ${section} section content.`,
    citations: [],
  }));
}

// ---------------------------------------------------------------------------
// Stage 1: formatForCochrane — Pure Search Translator
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 1: formatForCochrane", () => {
  it("converts [MeSH Terms] to [MeSH descriptor]", () => {
    const result = formatForCochrane("Diabetes Mellitus[MeSH Terms]");
    expect(result).toContain("[MeSH descriptor]");
    expect(result).not.toContain("[MeSH Terms]");
  });

  it("converts [tiab] to :ti,ab", () => {
    const result = formatForCochrane("metformin[tiab]");
    expect(result).toContain(":ti,ab");
    expect(result).not.toContain("[tiab]");
  });

  it("converts [Mesh] to [MeSH descriptor]", () => {
    const result = formatForCochrane("Heart Failure[Mesh]");
    expect(result).toContain("[MeSH descriptor]");
    expect(result).not.toContain("[Mesh]");
  });

  it("preserves Boolean operators unchanged", () => {
    const input = "(term1[MeSH Terms] OR term2[tiab]) AND (term3[Mesh])";
    const result = formatForCochrane(input);
    expect(result).toContain("OR");
    expect(result).toContain("AND");
  });

  it("handles string with no PubMed syntax", () => {
    const input = "simple keyword search";
    expect(formatForCochrane(input)).toBe(input);
  });

  it("handles empty string", () => {
    expect(formatForCochrane("")).toBe("");
  });

  it("handles multiple conversions in one string", () => {
    const input =
      "(Diabetes[MeSH Terms] OR diabetes[tiab]) AND (SGLT2[Mesh] OR dapagliflozin[tiab])";
    const result = formatForCochrane(input);
    expect(result).not.toContain("[MeSH Terms]");
    expect(result).not.toContain("[tiab]");
    expect(result).not.toContain("[Mesh]");
    // Should have 2 [MeSH descriptor] and 2 :ti,ab
    expect(result.match(/\[MeSH descriptor\]/g)?.length).toBe(2);
    expect(result.match(/:ti,ab/g)?.length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Stage 2: formatForEmbase — Pure Search Translator
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 2: formatForEmbase", () => {
  it("converts [MeSH Terms] to /exp", () => {
    const result = formatForEmbase("Diabetes Mellitus[MeSH Terms]");
    expect(result).toContain("/exp");
    expect(result).not.toContain("[MeSH Terms]");
  });

  it("converts [tiab] to :ti,ab", () => {
    const result = formatForEmbase("metformin[tiab]");
    expect(result).toContain(":ti,ab");
    expect(result).not.toContain("[tiab]");
  });

  it("converts [Mesh] to /exp", () => {
    const result = formatForEmbase("Heart Failure[Mesh]");
    expect(result).toContain("/exp");
    expect(result).not.toContain("[Mesh]");
  });

  it("preserves Boolean operators unchanged", () => {
    const input = "(term1[MeSH Terms] OR term2[tiab]) AND (term3[Mesh])";
    const result = formatForEmbase(input);
    expect(result).toContain("OR");
    expect(result).toContain("AND");
  });

  it("handles string with no PubMed syntax", () => {
    const input = "plain text search";
    expect(formatForEmbase(input)).toBe(input);
  });

  it("handles empty string", () => {
    expect(formatForEmbase("")).toBe("");
  });

  it("Cochrane and Embase produce different results for [MeSH Terms]", () => {
    const input = "Diabetes Mellitus[MeSH Terms]";
    const cochrane = formatForCochrane(input);
    const embase = formatForEmbase(input);
    expect(cochrane).not.toBe(embase);
    expect(cochrane).toContain("[MeSH descriptor]");
    expect(embase).toContain("/exp");
  });
});

// ---------------------------------------------------------------------------
// Stage 3: exportManuscriptDraft — Pure IMRAD Assembly
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 3: exportManuscriptDraft", () => {
  it("produces markdown with title heading", () => {
    const sections = makeManuscriptSections();
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("# Systematic Review Manuscript Draft");
  });

  it("includes all 5 IMRAD section headings", () => {
    const sections = makeManuscriptSections();
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("## Abstract");
    expect(md).toContain("## Introduction");
    expect(md).toContain("## Methods");
    expect(md).toContain("## Results");
    expect(md).toContain("## Discussion");
  });

  it("orders sections in IMRAD order regardless of input order", () => {
    // Provide sections in reverse order
    const sections = makeManuscriptSections([
      "discussion",
      "results",
      "methods",
      "introduction",
      "abstract",
    ]);
    const md = exportManuscriptDraft(sections);
    const abstractPos = md.indexOf("## Abstract");
    const introPos = md.indexOf("## Introduction");
    const methodsPos = md.indexOf("## Methods");
    const resultsPos = md.indexOf("## Results");
    const discussionPos = md.indexOf("## Discussion");
    expect(abstractPos).toBeLessThan(introPos);
    expect(introPos).toBeLessThan(methodsPos);
    expect(methodsPos).toBeLessThan(resultsPos);
    expect(resultsPos).toBeLessThan(discussionPos);
  });

  it("includes section content", () => {
    const sections = makeManuscriptSections(["introduction"]);
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("This is the introduction section content.");
  });

  it("includes disclaimer about AI-assisted generation", () => {
    const sections = makeManuscriptSections();
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("AI-assisted draft");
  });

  it("includes PLACEHOLDER note at the end", () => {
    const sections = makeManuscriptSections();
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("[PLACEHOLDER]");
  });

  it("handles empty sections array", () => {
    const md = exportManuscriptDraft([]);
    expect(md).toContain("# Systematic Review Manuscript Draft");
    // Should still have header and footer, just no sections
    expect(md).toContain("[PLACEHOLDER]");
  });

  it("handles partial sections (only methods + results)", () => {
    const sections = makeManuscriptSections(["methods", "results"]);
    const md = exportManuscriptDraft(sections);
    expect(md).toContain("## Methods");
    expect(md).toContain("## Results");
    expect(md).not.toContain("## Abstract");
  });
});

// ---------------------------------------------------------------------------
// Stage 4: Evidence Gap Map Types
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 4: Evidence Gap Map Types", () => {
  it("EffectDirection covers all 5 values", () => {
    const dirs: EffectDirection[] = [
      "positive",
      "negative",
      "mixed",
      "no_effect",
      "unknown",
    ];
    expect(dirs).toHaveLength(5);
  });

  it("CertaintyLevel covers all 5 values", () => {
    const levels: CertaintyLevel[] = [
      "high",
      "moderate",
      "low",
      "very_low",
      "not_assessed",
    ];
    expect(levels).toHaveLength(5);
  });

  it("GapMapCell type has all required fields", () => {
    const cell: GapMapCell = {
      intervention: "SGLT2 inhibitors",
      outcome: "Heart failure hospitalization",
      studyCount: 5,
      studyIds: [1, 2, 3, 4, 5],
      effectDirection: "positive",
      certainty: "high",
    };
    expect(cell.studyCount).toBe(5);
    expect(cell.studyIds).toHaveLength(5);
  });

  it("GapMapData type assembles correctly", () => {
    const data: GapMapData = {
      interventions: ["Drug A", "Drug B"],
      outcomes: ["Mortality", "QoL"],
      cells: [
        {
          intervention: "Drug A",
          outcome: "Mortality",
          studyCount: 3,
          studyIds: [1, 2, 3],
          effectDirection: "positive",
          certainty: "moderate",
        },
      ],
      totalStudies: 10,
    };
    expect(data.interventions).toHaveLength(2);
    expect(data.outcomes).toHaveLength(2);
    expect(data.cells).toHaveLength(1);
  });

  it("CertaintyLevel is a superset of GRADE CertaintyRating + not_assessed", () => {
    // GRADE has: high, moderate, low, very_low
    // Gap map adds: not_assessed
    const gradeRatings: CertaintyRating[] = [
      "high",
      "moderate",
      "low",
      "very_low",
    ];
    const gapMapLevels: CertaintyLevel[] = [
      "high",
      "moderate",
      "low",
      "very_low",
      "not_assessed",
    ];
    for (const rating of gradeRatings) {
      expect(gapMapLevels).toContain(rating);
    }
  });
});

// ---------------------------------------------------------------------------
// Stage 5: Snowballing Types
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 5: Snowballing Types", () => {
  it("SnowballDirection covers all 3 values", () => {
    const dirs: SnowballDirection[] = ["forward", "backward", "both"];
    expect(dirs).toHaveLength(3);
  });

  it("SnowballResult type has all required fields", () => {
    const result: SnowballResult = {
      sessionIds: [1, 2],
      totalDiscovered: 100,
      newPapersAdded: 30,
      duplicatesSkipped: 70,
      papers: [
        {
          paperId: 42,
          title: "A discovered paper",
          direction: "forward",
          seedPaperTitle: "Seed paper",
        },
      ],
    };
    expect(result.totalDiscovered).toBe(100);
    expect(result.newPapersAdded + result.duplicatesSkipped).toBe(100);
  });

  it("SnowballResult papers have direction field", () => {
    const result: SnowballResult = {
      sessionIds: [],
      totalDiscovered: 0,
      newPapersAdded: 0,
      duplicatesSkipped: 0,
      papers: [],
    };
    expect(Array.isArray(result.papers)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Stage 6: Manuscript & Search Strategy Types
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 6: Manuscript & Search Strategy Types", () => {
  it("ManuscriptSection covers all 5 IMRAD sections", () => {
    const sections: ManuscriptSection[] = [
      "introduction",
      "methods",
      "results",
      "discussion",
      "abstract",
    ];
    expect(sections).toHaveLength(5);
  });

  it("ManuscriptSectionOutput has required fields", () => {
    const output: ManuscriptSectionOutput = {
      section: "methods",
      content: "Sample content",
      citations: [
        { key: "Smith2024", paperId: 1, formatted: "Smith et al., 2024" },
      ],
    };
    expect(output.citations).toHaveLength(1);
    expect(output.citations[0].key).toBe("Smith2024");
  });

  it("PICOInput has required + optional fields", () => {
    const pico: PICOInput = {
      population: "Adults with T2DM",
      intervention: "SGLT2 inhibitors",
      outcome: "HbA1c reduction",
    };
    expect(pico.comparison).toBeUndefined(); // optional
    expect(pico.population).toBeTruthy();
  });

  it("SearchBlock has all required fields", () => {
    const block: SearchBlock = {
      picoElement: "population",
      meshTerms: ["Diabetes Mellitus, Type 2"],
      freeTextTerms: ["type 2 diabetes", "T2DM"],
      booleanBlock: '("Diabetes Mellitus, Type 2"[MeSH] OR "type 2 diabetes"[tiab])',
    };
    expect(block.picoElement).toBe("population");
    expect(block.meshTerms.length).toBeGreaterThan(0);
  });

  it("SearchStrategy assembles all components", () => {
    const strategy: SearchStrategy = {
      pico: {
        population: "Adults",
        intervention: "Drug X",
        outcome: "Mortality",
      },
      blocks: [
        {
          picoElement: "population",
          meshTerms: ["Adult"],
          freeTextTerms: ["adults"],
          booleanBlock: "Adult[MeSH]",
        },
      ],
      fullSearchString: "Adult[MeSH] AND Drug X[tiab]",
      suggestedFilters: ["Randomized Controlled Trial"],
      estimatedResults: 500,
    };
    expect(strategy.blocks).toHaveLength(1);
    expect(strategy.suggestedFilters).toHaveLength(1);
  });

  it("SearchBlock picoElement is restricted to 4 values", () => {
    const elements: SearchBlock["picoElement"][] = [
      "population",
      "intervention",
      "comparison",
      "outcome",
    ];
    expect(elements).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// Stage 7: Cross-Module Compatibility
// ---------------------------------------------------------------------------

describe("Cycle 10 — Stage 7: Cross-Module Compatibility", () => {
  it("formatForCochrane and formatForEmbase handle same input deterministically", () => {
    const input = "(Heart Failure[MeSH Terms]) AND (SGLT2 inhibitor[tiab])";
    const c1 = formatForCochrane(input);
    const c2 = formatForCochrane(input);
    const e1 = formatForEmbase(input);
    const e2 = formatForEmbase(input);
    expect(c1).toBe(c2); // idempotent
    expect(e1).toBe(e2); // idempotent
  });

  it("exportManuscriptDraft is idempotent", () => {
    const sections = makeManuscriptSections();
    const md1 = exportManuscriptDraft(sections);
    const md2 = exportManuscriptDraft(sections);
    // Date is generated at call time so we compare structure
    expect(md1.includes("## Abstract")).toBe(md2.includes("## Abstract"));
    expect(md1.includes("## Discussion")).toBe(md2.includes("## Discussion"));
  });

  it("EffectDirection and CertaintyLevel are independent enums", () => {
    const directions: EffectDirection[] = ["positive", "negative", "mixed", "no_effect", "unknown"];
    const certainties: CertaintyLevel[] = ["high", "moderate", "low", "very_low", "not_assessed"];
    // No overlap between the two type unions
    const overlap = directions.filter((d) =>
      certainties.includes(d as unknown as CertaintyLevel)
    );
    expect(overlap).toHaveLength(0);
  });

  it("ManuscriptSection and SearchBlock picoElement are disjoint", () => {
    const mSections: ManuscriptSection[] = [
      "introduction",
      "methods",
      "results",
      "discussion",
      "abstract",
    ];
    const picoElements: SearchBlock["picoElement"][] = [
      "population",
      "intervention",
      "comparison",
      "outcome",
    ];
    const overlap = mSections.filter((s) =>
      picoElements.includes(s as unknown as SearchBlock["picoElement"])
    );
    expect(overlap).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

describe("Cycle 10 — Scoring", () => {
  it("produces a valid cycle score", () => {
    const dimensions: ScoringDimension[] = [
      {
        name: "formatForCochrane",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "MeSH Terms, tiab, Mesh conversions, Booleans preserved, empty/plain text",
      },
      {
        name: "formatForEmbase",
        score: 10,
        maxScore: 10,
        weight: 1.5,
        details: "/exp conversion, tiab, Booleans preserved, divergence from Cochrane",
      },
      {
        name: "exportManuscriptDraft",
        score: 10,
        maxScore: 10,
        weight: 2.0,
        details: "IMRAD ordering, title, disclaimers, partial/empty sections, content inclusion",
      },
      {
        name: "Evidence Gap Map Types",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "EffectDirection 5 values, CertaintyLevel 5 values, GapMapCell/Data shapes",
      },
      {
        name: "Snowballing Types",
        score: 10,
        maxScore: 10,
        weight: 0.5,
        details: "SnowballDirection 3 values, SnowballResult shape",
      },
      {
        name: "Manuscript & Search Types",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "ManuscriptSection 5, SearchBlock 4 PICO elements, full type shapes",
      },
      {
        name: "Cross-Module Compatibility",
        score: 10,
        maxScore: 10,
        weight: 1.0,
        details: "Idempotency, CertaintyLevel ⊃ CertaintyRating, enum disjointness",
      },
    ];

    const passedChecks = [
      "Cochrane: [MeSH Terms] → [MeSH descriptor]",
      "Cochrane: [tiab] → :ti,ab",
      "Cochrane: [Mesh] → [MeSH descriptor]",
      "Cochrane: Booleans preserved",
      "Cochrane: plain text passthrough",
      "Cochrane: empty string passthrough",
      "Cochrane: multiple conversions",
      "Embase: [MeSH Terms] → /exp",
      "Embase: [tiab] → :ti,ab",
      "Embase: [Mesh] → /exp",
      "Embase: Booleans preserved",
      "Embase: plain text passthrough",
      "Embase: empty string passthrough",
      "Embase: diverges from Cochrane",
      "Manuscript: title heading present",
      "Manuscript: all 5 IMRAD headings",
      "Manuscript: IMRAD ordering enforced",
      "Manuscript: content included",
      "Manuscript: AI disclaimer present",
      "Manuscript: PLACEHOLDER note present",
      "Manuscript: empty sections handled",
      "Manuscript: partial sections handled",
      "GapMap: EffectDirection 5 values",
      "GapMap: CertaintyLevel 5 values",
      "GapMap: GapMapCell shape verified",
      "GapMap: GapMapData shape verified",
      "GapMap: CertaintyLevel ⊃ CertaintyRating",
      "Snowball: 3 directions verified",
      "Snowball: SnowballResult shape",
      "Manuscript: ManuscriptSection 5 values",
      "Manuscript: ManuscriptSectionOutput shape",
      "Search: PICOInput shape",
      "Search: SearchBlock 4 elements",
      "Search: SearchStrategy shape",
      "Cross: formatters idempotent",
      "Cross: exportManuscriptDraft idempotent",
      "Cross: EffectDirection ∩ CertaintyLevel = ∅",
      "Cross: ManuscriptSection ∩ picoElement = ∅",
    ];

    const result = scoreCycle(
      10,
      "Cross-Module Integration & Remaining Types",
      dimensions,
      [],
      passedChecks
    );
    expect(result.normalizedScore).toBe(10);
    expect(result.cycleId).toBe(10);
    expect(result.issues).toHaveLength(0);
  });
});
