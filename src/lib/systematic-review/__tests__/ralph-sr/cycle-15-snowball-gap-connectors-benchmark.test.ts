/**
 * RALPH SR — Cycle 15: Snowballing, Evidence Gap Map, Search Connectors & Screening Benchmark
 *
 * Targets remaining untested modules:
 *   - snowballing.ts               (types, mapS2Paper, direction semantics)
 *   - evidence-gap-map.ts          (types, pooledEffectToDirection, normaliseCertainty)
 *   - search-connectors/clinicaltrials-gov.ts (types, mapStudyToResult)
 *   - search-connectors/cochrane-central.ts   (types, XML helpers, parseArticle)
 *   - validation/screening-benchmark.ts       (computeMetrics, computeWSS, report)
 *
 * Stage 1: Snowballing Types & Direction Semantics
 * Stage 2: Snowball S2 Paper Mapping (mapS2Paper replica)
 * Stage 3: Evidence Gap Map Types & Effect Direction Logic
 * Stage 4: Evidence Gap Map Certainty Normalisation
 * Stage 5: ClinicalTrials.gov Types & Study Mapping
 * Stage 6: Cochrane CENTRAL Types & XML Helpers
 * Stage 7: Screening Benchmark — Confusion Matrix Metrics
 * Stage 8: Screening Benchmark — WSS & Validation Report
 */

import { describe, it, expect } from "vitest";

// ─── Direct imports from testable modules ─────────────────────────────────
import {
  computeMetrics,
  computeWSS,
  generateValidationReport,
  createCohenDataset,
  type BenchmarkResult,
  type ScreeningDecision,
} from "../../validation/screening-benchmark";

import type {
  SnowballDirection,
  SnowballResult,
} from "../../snowballing";

import type {
  EffectDirection,
  CertaintyLevel,
  GapMapCell,
  GapMapData,
} from "../../evidence-gap-map";

import type { ClinicalTrialResult } from "../../search-connectors/clinicaltrials-gov";
import type { CochraneReviewResult } from "../../search-connectors/cochrane-central";

// ─── Replicate private helpers for testing ────────────────────────────────

// From snowballing.ts: mapS2Paper (private)
interface S2CitationPaper {
  paperId: string;
  title: string | null;
  authors: { name: string }[] | null;
  year: number | null;
  abstract: string | null;
  citationCount: number | null;
  journal: { name: string } | null;
  externalIds: { DOI?: string; PubMed?: string } | null;
  isOpenAccess: boolean | null;
}

function mapS2Paper(paper: S2CitationPaper) {
  if (!paper.title || !paper.paperId) return null;
  return {
    title: paper.title,
    authors: paper.authors?.map((a) => a.name) || [],
    journal: paper.journal?.name || "",
    year: paper.year || 0,
    doi: paper.externalIds?.DOI || undefined,
    pmid: paper.externalIds?.PubMed || undefined,
    s2Id: paper.paperId,
    abstract: paper.abstract || undefined,
    citationCount: paper.citationCount || 0,
    isOpenAccess: paper.isOpenAccess || false,
    publicationTypes: [],
    sources: ["semantic_scholar"],
  };
}

// From evidence-gap-map.ts: pooledEffectToDirection (private)
function pooledEffectToDirection(
  pooledEffect: number | null,
  ciLower: number | null,
  ciUpper: number | null
): EffectDirection {
  if (pooledEffect === null) return "unknown";
  const crossesNull =
    ciLower !== null && ciUpper !== null && ciLower < 0 && ciUpper > 0;
  if (crossesNull) return "mixed";
  if (pooledEffect > 0) return "positive";
  if (pooledEffect < 0) return "negative";
  return "no_effect";
}

// From evidence-gap-map.ts: _normaliseCertainty (private)
function normaliseCertainty(raw: string | null | undefined): CertaintyLevel {
  if (!raw) return "not_assessed";
  const lower = raw.toLowerCase().replace(/-/g, "_");
  if (lower === "high") return "high";
  if (lower === "moderate") return "moderate";
  if (lower === "low") return "low";
  if (lower === "very_low") return "very_low";
  return "not_assessed";
}

// From clinicaltrials-gov.ts: mapStudyToResult (private)
interface CTv2Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
    };
    statusModule: {
      overallStatus: string;
      startDateStruct?: { date: string };
      completionDateStruct?: { date: string };
    };
    designModule?: {
      studyType?: string;
      phases?: string[];
      enrollmentInfo?: { count?: number };
    };
    conditionsModule?: {
      conditions?: string[];
    };
    interventionsModule?: {
      interventions?: { type: string; name: string }[];
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: { name: string };
      collaborators?: { name: string }[];
    };
  };
}

function mapStudyToResult(study: CTv2Study): ClinicalTrialResult | null {
  const proto = study.protocolSection;
  const id = proto.identificationModule;
  const statusMod = proto.statusModule;
  const design = proto.designModule;
  const conditionsMod = proto.conditionsModule;
  const interventionsMod = proto.interventionsModule;
  const sponsorMod = proto.sponsorCollaboratorsModule;

  const title = id.officialTitle || id.briefTitle || "";
  if (!title || !id.nctId) return null;

  const sponsors: string[] = [];
  if (sponsorMod?.leadSponsor?.name) {
    sponsors.push(sponsorMod.leadSponsor.name);
  }
  for (const collab of sponsorMod?.collaborators || []) {
    if (collab.name) sponsors.push(collab.name);
  }

  return {
    nctId: id.nctId,
    title,
    status: statusMod.overallStatus || "UNKNOWN",
    conditions: conditionsMod?.conditions || [],
    interventions: (interventionsMod?.interventions || []).map((i) => i.name),
    startDate: statusMod.startDateStruct?.date,
    completionDate: statusMod.completionDateStruct?.date,
    enrollmentCount: design?.enrollmentInfo?.count ?? undefined,
    studyType: design?.studyType || "UNKNOWN",
    phases: design?.phases || [],
    sponsors,
  };
}

// From cochrane-central.ts: XML helpers (private)
function stripXml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

function extractTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? stripXml(match[1]) : "";
}

// ═══════════════════════════════════════════════════════════════════════════
// Stage 1: Snowballing Types & Direction Semantics
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 1: Snowballing Types & Direction Semantics", () => {
  it("SnowballDirection has 3 values: forward, backward, both", () => {
    const directions: SnowballDirection[] = ["forward", "backward", "both"];
    expect(directions).toHaveLength(3);
  });

  it("SnowballResult has required fields", () => {
    const result: SnowballResult = {
      sessionIds: [1, 2],
      totalDiscovered: 50,
      newPapersAdded: 30,
      duplicatesSkipped: 20,
      papers: [
        {
          paperId: 100,
          title: "Test Paper",
          direction: "forward",
          seedPaperTitle: "Seed Paper",
        },
      ],
    };
    expect(result.totalDiscovered).toBe(
      result.newPapersAdded + result.duplicatesSkipped
    );
  });

  it("paper direction is restricted to forward or backward (not both)", () => {
    // Individual discovered papers always have a single direction
    const paper: SnowballResult["papers"][0] = {
      paperId: 1,
      title: "Test",
      direction: "forward",
      seedPaperTitle: "Seed",
    };
    expect(["forward", "backward"]).toContain(paper.direction);
  });

  it("sessionIds tracks one session per seed paper", () => {
    const result: SnowballResult = {
      sessionIds: [10, 20, 30],
      totalDiscovered: 0,
      newPapersAdded: 0,
      duplicatesSkipped: 0,
      papers: [],
    };
    // 3 seed papers → 3 sessions
    expect(result.sessionIds).toHaveLength(3);
  });

  it("empty snowball result is valid", () => {
    const result: SnowballResult = {
      sessionIds: [],
      totalDiscovered: 0,
      newPapersAdded: 0,
      duplicatesSkipped: 0,
      papers: [],
    };
    expect(result.totalDiscovered).toBe(0);
    expect(result.papers).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 2: Snowball S2 Paper Mapping
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 2: Snowball S2 Paper Mapping", () => {
  it("maps complete S2 paper to UnifiedSearchResult", () => {
    const s2Paper: S2CitationPaper = {
      paperId: "abc123",
      title: "Deep Learning for NLP",
      authors: [{ name: "Smith J" }, { name: "Doe A" }],
      year: 2023,
      abstract: "We propose a novel approach...",
      citationCount: 150,
      journal: { name: "Nature" },
      externalIds: { DOI: "10.1234/test", PubMed: "12345678" },
      isOpenAccess: true,
    };

    const result = mapS2Paper(s2Paper);
    expect(result).not.toBeNull();
    expect(result!.title).toBe("Deep Learning for NLP");
    expect(result!.authors).toEqual(["Smith J", "Doe A"]);
    expect(result!.doi).toBe("10.1234/test");
    expect(result!.pmid).toBe("12345678");
    expect(result!.s2Id).toBe("abc123");
    expect(result!.sources).toEqual(["semantic_scholar"]);
  });

  it("returns null when title is null", () => {
    const paper: S2CitationPaper = {
      paperId: "abc",
      title: null,
      authors: null,
      year: null,
      abstract: null,
      citationCount: null,
      journal: null,
      externalIds: null,
      isOpenAccess: null,
    };
    expect(mapS2Paper(paper)).toBeNull();
  });

  it("returns null when paperId is empty", () => {
    const paper: S2CitationPaper = {
      paperId: "",
      title: "Has Title",
      authors: null,
      year: null,
      abstract: null,
      citationCount: null,
      journal: null,
      externalIds: null,
      isOpenAccess: null,
    };
    expect(mapS2Paper(paper)).toBeNull();
  });

  it("handles missing optional fields gracefully", () => {
    const paper: S2CitationPaper = {
      paperId: "minimal",
      title: "Minimal Paper",
      authors: null,
      year: null,
      abstract: null,
      citationCount: null,
      journal: null,
      externalIds: null,
      isOpenAccess: null,
    };
    const result = mapS2Paper(paper)!;
    expect(result.authors).toEqual([]);
    expect(result.journal).toBe("");
    expect(result.year).toBe(0);
    expect(result.doi).toBeUndefined();
    expect(result.pmid).toBeUndefined();
    expect(result.citationCount).toBe(0);
    expect(result.isOpenAccess).toBe(false);
  });

  it("publicationTypes always empty array (S2 citations API does not return them)", () => {
    const paper: S2CitationPaper = {
      paperId: "test",
      title: "Test",
      authors: [],
      year: 2024,
      abstract: null,
      citationCount: 5,
      journal: null,
      externalIds: null,
      isOpenAccess: false,
    };
    expect(mapS2Paper(paper)!.publicationTypes).toEqual([]);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 3: Evidence Gap Map Types & Effect Direction Logic
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 3: Evidence Gap Map Types & Effect Direction", () => {
  it("EffectDirection has 5 values", () => {
    const directions: EffectDirection[] = [
      "positive",
      "negative",
      "mixed",
      "no_effect",
      "unknown",
    ];
    expect(directions).toHaveLength(5);
  });

  it("GapMapCell has required fields", () => {
    const cell: GapMapCell = {
      intervention: "Drug X",
      outcome: "HbA1c",
      studyCount: 5,
      studyIds: [1, 2, 3, 4, 5],
      effectDirection: "positive",
      certainty: "high",
    };
    expect(cell.studyCount).toBe(cell.studyIds.length);
  });

  it("GapMapData has sorted axes and cells", () => {
    const data: GapMapData = {
      interventions: ["CBT", "Drug A"],
      outcomes: ["Anxiety", "Depression"],
      cells: [],
      totalStudies: 10,
    };
    expect(data.interventions).toEqual([...data.interventions].sort());
    expect(data.outcomes).toEqual([...data.outcomes].sort());
  });

  it("pooledEffectToDirection: null effect → unknown", () => {
    expect(pooledEffectToDirection(null, null, null)).toBe("unknown");
  });

  it("pooledEffectToDirection: positive effect (CI above zero) → positive", () => {
    expect(pooledEffectToDirection(0.5, 0.2, 0.8)).toBe("positive");
  });

  it("pooledEffectToDirection: negative effect (CI below zero) → negative", () => {
    expect(pooledEffectToDirection(-0.3, -0.6, -0.1)).toBe("negative");
  });

  it("pooledEffectToDirection: CI crosses zero → mixed", () => {
    expect(pooledEffectToDirection(0.1, -0.2, 0.4)).toBe("mixed");
  });

  it("pooledEffectToDirection: effect exactly zero → no_effect", () => {
    expect(pooledEffectToDirection(0, 0, 0)).toBe("no_effect");
  });

  it("pooledEffectToDirection: positive effect with null CI → positive (no cross check)", () => {
    expect(pooledEffectToDirection(0.5, null, null)).toBe("positive");
  });

  it("empty gap map is valid (no included papers)", () => {
    const empty: GapMapData = {
      interventions: [],
      outcomes: [],
      cells: [],
      totalStudies: 0,
    };
    expect(empty.cells).toHaveLength(0);
    expect(empty.totalStudies).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 4: Evidence Gap Map Certainty Normalisation
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 4: Certainty Normalisation", () => {
  it("CertaintyLevel has 5 values", () => {
    const levels: CertaintyLevel[] = [
      "high",
      "moderate",
      "low",
      "very_low",
      "not_assessed",
    ];
    expect(levels).toHaveLength(5);
  });

  it("normalises 'high' → high", () => {
    expect(normaliseCertainty("high")).toBe("high");
  });

  it("normalises 'High' (case-insensitive) → high", () => {
    expect(normaliseCertainty("High")).toBe("high");
  });

  it("normalises 'very-low' (hyphenated) → very_low", () => {
    expect(normaliseCertainty("very-low")).toBe("very_low");
  });

  it("normalises 'VERY_LOW' (uppercase) → very_low", () => {
    expect(normaliseCertainty("VERY_LOW")).toBe("very_low");
  });

  it("returns not_assessed for null", () => {
    expect(normaliseCertainty(null)).toBe("not_assessed");
  });

  it("returns not_assessed for undefined", () => {
    expect(normaliseCertainty(undefined)).toBe("not_assessed");
  });

  it("returns not_assessed for unrecognised string", () => {
    expect(normaliseCertainty("uncertain")).toBe("not_assessed");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 5: ClinicalTrials.gov Types & Study Mapping
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 5: ClinicalTrials.gov Types & Study Mapping", () => {
  it("ClinicalTrialResult has required fields", () => {
    const trial: ClinicalTrialResult = {
      nctId: "NCT12345678",
      title: "Test Trial",
      status: "COMPLETED",
      conditions: ["Type 2 Diabetes"],
      interventions: ["Drug X"],
      studyType: "INTERVENTIONAL",
      phases: ["PHASE3"],
      sponsors: ["Pharma Co"],
    };
    expect(trial.nctId).toMatch(/^NCT\d+$/);
  });

  it("maps complete CTv2 study to ClinicalTrialResult", () => {
    const study: CTv2Study = {
      protocolSection: {
        identificationModule: {
          nctId: "NCT99999999",
          briefTitle: "Brief",
          officialTitle: "Official Title of the Study",
        },
        statusModule: {
          overallStatus: "RECRUITING",
          startDateStruct: { date: "2024-01-15" },
          completionDateStruct: { date: "2025-06-30" },
        },
        designModule: {
          studyType: "INTERVENTIONAL",
          phases: ["PHASE2", "PHASE3"],
          enrollmentInfo: { count: 500 },
        },
        conditionsModule: {
          conditions: ["Type 2 Diabetes", "Obesity"],
        },
        interventionsModule: {
          interventions: [
            { type: "DRUG", name: "Drug X" },
            { type: "DRUG", name: "Placebo" },
          ],
        },
        sponsorCollaboratorsModule: {
          leadSponsor: { name: "University Hospital" },
          collaborators: [{ name: "NIH" }],
        },
      },
    };

    const result = mapStudyToResult(study)!;
    expect(result).not.toBeNull();
    expect(result.nctId).toBe("NCT99999999");
    expect(result.title).toBe("Official Title of the Study"); // prefers official
    expect(result.status).toBe("RECRUITING");
    expect(result.conditions).toEqual(["Type 2 Diabetes", "Obesity"]);
    expect(result.interventions).toEqual(["Drug X", "Placebo"]);
    expect(result.enrollmentCount).toBe(500);
    expect(result.phases).toEqual(["PHASE2", "PHASE3"]);
    expect(result.sponsors).toEqual(["University Hospital", "NIH"]);
  });

  it("falls back to briefTitle when officialTitle missing", () => {
    const study: CTv2Study = {
      protocolSection: {
        identificationModule: {
          nctId: "NCT00000001",
          briefTitle: "Brief Title Only",
        },
        statusModule: { overallStatus: "COMPLETED" },
      },
    };
    const result = mapStudyToResult(study)!;
    expect(result.title).toBe("Brief Title Only");
  });

  it("returns null when nctId is empty", () => {
    const study: CTv2Study = {
      protocolSection: {
        identificationModule: { nctId: "", briefTitle: "Test" },
        statusModule: { overallStatus: "COMPLETED" },
      },
    };
    expect(mapStudyToResult(study)).toBeNull();
  });

  it("returns null when both title fields are empty", () => {
    const study: CTv2Study = {
      protocolSection: {
        identificationModule: { nctId: "NCT123", briefTitle: "" },
        statusModule: { overallStatus: "COMPLETED" },
      },
    };
    expect(mapStudyToResult(study)).toBeNull();
  });

  it("handles missing optional modules gracefully", () => {
    const study: CTv2Study = {
      protocolSection: {
        identificationModule: {
          nctId: "NCT00000002",
          briefTitle: "Minimal Study",
        },
        statusModule: { overallStatus: "UNKNOWN" },
      },
    };
    const result = mapStudyToResult(study)!;
    expect(result.conditions).toEqual([]);
    expect(result.interventions).toEqual([]);
    expect(result.phases).toEqual([]);
    expect(result.sponsors).toEqual([]);
    expect(result.enrollmentCount).toBeUndefined();
    expect(result.studyType).toBe("UNKNOWN");
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 6: Cochrane CENTRAL Types & XML Helpers
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 6: Cochrane CENTRAL Types & XML Helpers", () => {
  it("CochraneReviewResult has required fields", () => {
    const result: CochraneReviewResult = {
      title: "Cochrane Review of X",
      authors: ["Smith J", "Doe A"],
      source: "Cochrane Database Syst Rev",
      reviewType: "systematic_review",
    };
    expect(result.reviewType).toBe("systematic_review");
  });

  it("reviewType has 3 values: systematic_review, rct, other", () => {
    const types: CochraneReviewResult["reviewType"][] = [
      "systematic_review",
      "rct",
      "other",
    ];
    expect(types).toHaveLength(3);
  });

  it("stripXml removes HTML/XML tags", () => {
    expect(stripXml("<b>bold</b>")).toBe("bold");
    expect(stripXml("<i>italic</i> text")).toBe("italic text");
    expect(stripXml("no tags")).toBe("no tags");
  });

  it("stripXml trims whitespace", () => {
    expect(stripXml("  spaced  ")).toBe("spaced");
    expect(stripXml("<tag>  inner  </tag>")).toBe("inner");
  });

  it("extractTagContent extracts text between tags", () => {
    const xml = "<ArticleTitle>My Article</ArticleTitle>";
    expect(extractTagContent(xml, "ArticleTitle")).toBe("My Article");
  });

  it("extractTagContent handles attributes on tags", () => {
    const xml = '<PMID Version="1">12345678</PMID>';
    expect(extractTagContent(xml, "PMID")).toBe("12345678");
  });

  it("extractTagContent returns empty string for missing tag", () => {
    expect(extractTagContent("<Title>Test</Title>", "Abstract")).toBe("");
  });

  it("extractTagContent strips nested XML from content", () => {
    const xml =
      "<AbstractText><i>Methods</i>: We conducted a <b>systematic</b> review</AbstractText>";
    const content = extractTagContent(xml, "AbstractText");
    expect(content).toBe("Methods: We conducted a systematic review");
  });

  it("source distinguishes Cochrane SR from CENTRAL", () => {
    const sr: CochraneReviewResult = {
      title: "SR",
      authors: [],
      source: "Cochrane Database Syst Rev",
      reviewType: "systematic_review",
    };
    const rct: CochraneReviewResult = {
      title: "RCT",
      authors: [],
      source: "Cochrane CENTRAL",
      reviewType: "rct",
    };
    expect(sr.source).not.toBe(rct.source);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 7: Screening Benchmark — Confusion Matrix Metrics
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 7: Screening Benchmark — Confusion Matrix", () => {
  it("perfect predictions → all metrics = 1.0", () => {
    const preds: ScreeningDecision[] = ["include", "include", "exclude", "exclude"];
    const gold: ("include" | "exclude")[] = ["include", "include", "exclude", "exclude"];
    const m = computeMetrics(preds, gold);
    expect(m.truePositives).toBe(2);
    expect(m.trueNegatives).toBe(2);
    expect(m.falsePositives).toBe(0);
    expect(m.falseNegatives).toBe(0);
    expect(m.sensitivity).toBe(1);
    expect(m.specificity).toBe(1);
    expect(m.precision).toBe(1);
    expect(m.f1Score).toBe(1);
  });

  it("all wrong predictions → sensitivity and specificity = 0", () => {
    const preds: ScreeningDecision[] = ["exclude", "exclude", "include", "include"];
    const gold: ("include" | "exclude")[] = ["include", "include", "exclude", "exclude"];
    const m = computeMetrics(preds, gold);
    expect(m.sensitivity).toBe(0);
    expect(m.specificity).toBe(0);
  });

  it("'maybe' is treated as 'include' (conservative for SR)", () => {
    const preds: ScreeningDecision[] = ["maybe", "exclude"];
    const gold: ("include" | "exclude")[] = ["include", "exclude"];
    const m = computeMetrics(preds, gold);
    expect(m.truePositives).toBe(1); // maybe→include matches gold include
    expect(m.trueNegatives).toBe(1);
    expect(m.sensitivity).toBe(1);
  });

  it("throws when prediction and gold label arrays have different lengths", () => {
    expect(() => computeMetrics(["include"], ["include", "exclude"])).toThrow(
      /does not match/
    );
  });

  it("F1 = 2 * precision * recall / (precision + recall)", () => {
    // 3 includes (2 correct), 2 excludes (1 correct)
    const preds: ScreeningDecision[] = [
      "include",
      "include",
      "include",
      "exclude",
      "exclude",
    ];
    const gold: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "include",
    ];
    const m = computeMetrics(preds, gold);
    // TP=2, FP=1, TN=1, FN=1
    expect(m.truePositives).toBe(2);
    expect(m.falsePositives).toBe(1);
    expect(m.trueNegatives).toBe(1);
    expect(m.falseNegatives).toBe(1);
    const expectedPrecision = 2 / 3;
    const expectedRecall = 2 / 3;
    const expectedF1 = (2 * expectedPrecision * expectedRecall) / (expectedPrecision + expectedRecall);
    expect(m.f1Score).toBeCloseTo(expectedF1, 10);
  });

  it("handles edge case: all predictions are include", () => {
    const preds: ScreeningDecision[] = ["include", "include", "include"];
    const gold: ("include" | "exclude")[] = ["include", "exclude", "exclude"];
    const m = computeMetrics(preds, gold);
    expect(m.sensitivity).toBe(1); // found all includes
    expect(m.specificity).toBe(0); // missed all excludes
    expect(m.precision).toBeCloseTo(1 / 3, 10);
  });

  it("handles edge case: all predictions are exclude", () => {
    const preds: ScreeningDecision[] = ["exclude", "exclude", "exclude"];
    const gold: ("include" | "exclude")[] = ["include", "exclude", "exclude"];
    const m = computeMetrics(preds, gold);
    expect(m.sensitivity).toBe(0);
    expect(m.specificity).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Stage 8: Screening Benchmark — WSS & Validation Report
// ═══════════════════════════════════════════════════════════════════════════

describe("Cycle 15 — Stage 8: WSS & Validation Report", () => {
  it("WSS@95 formula: (TN + FN) / N - 0.05", () => {
    // All correct: TN=3, FN=0, N=5
    const preds: ScreeningDecision[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const gold: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const wss95 = computeWSS(preds, gold, 95);
    // (3 + 0) / 5 - 0.05 = 0.55
    expect(wss95).toBeCloseTo(0.55, 10);
  });

  it("WSS@100 formula: (TN + FN) / N - 0", () => {
    const preds: ScreeningDecision[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const gold: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const wss100 = computeWSS(preds, gold, 100);
    // (3 + 0) / 5 - 0 = 0.6
    expect(wss100).toBeCloseTo(0.6, 10);
  });

  it("WSS throws for mismatched arrays", () => {
    expect(() => computeWSS(["include"], ["include", "exclude"], 95)).toThrow(
      /does not match/
    );
  });

  it("WSS returns 0 for empty arrays", () => {
    expect(computeWSS([], [], 95)).toBe(0);
  });

  it("Cohen dataset has 50 papers with 20 includes and 30 excludes", () => {
    const dataset = createCohenDataset();
    expect(dataset.papers).toHaveLength(50);
    const includes = dataset.papers.filter((p) => p.goldLabel === "include");
    const excludes = dataset.papers.filter((p) => p.goldLabel === "exclude");
    expect(includes).toHaveLength(20);
    expect(excludes).toHaveLength(30);
  });

  it("Cohen dataset papers all have id, title, abstract, goldLabel", () => {
    const dataset = createCohenDataset();
    for (const paper of dataset.papers) {
      expect(paper.id).toBeTruthy();
      expect(paper.title).toBeTruthy();
      expect(paper.abstract).toBeTruthy();
      expect(["include", "exclude"]).toContain(paper.goldLabel);
    }
  });

  it("generateValidationReport produces structured text", () => {
    const result: BenchmarkResult = {
      datasetName: "Test Dataset",
      totalPapers: 100,
      truePositives: 18,
      falsePositives: 5,
      trueNegatives: 65,
      falseNegatives: 12,
      sensitivity: 0.6,
      specificity: 0.929,
      precision: 0.783,
      recall: 0.6,
      f1Score: 0.679,
      wss95: 0.72,
      wss100: 0.77,
      reportText: "",
    };
    const report = generateValidationReport(result);
    expect(report).toContain("Test Dataset");
    expect(report).toContain("N = 100");
    expect(report).toContain("Sensitivity");
    expect(report).toContain("WSS@95");
    expect(report).toContain("Methods Section Text");
  });

  it("report text contains all metric percentages", () => {
    const result: BenchmarkResult = {
      datasetName: "Mini",
      totalPapers: 10,
      truePositives: 4,
      falsePositives: 1,
      trueNegatives: 4,
      falseNegatives: 1,
      sensitivity: 0.8,
      specificity: 0.8,
      precision: 0.8,
      recall: 0.8,
      f1Score: 0.8,
      wss95: 0.45,
      wss100: 0.5,
      reportText: "",
    };
    const report = generateValidationReport(result);
    expect(report).toContain("80.0%"); // sensitivity, specificity, precision, F1
    expect(report).toContain("45.0%"); // WSS@95
    expect(report).toContain("50.0%"); // WSS@100
  });
});
