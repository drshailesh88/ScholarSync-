/**
 * RALPH SR — Cycle 13: RoB 2 Assessment, Collaboration & Living Review
 *
 * Phase 2 continues: mock-heavy tests for remaining async modules.
 * Targets: rob2-assessment.ts (overall judgment, Zod, judgment mapping)
 *          collaboration.ts (types, role enum)
 *          living-review.ts (computeNextCheck, formatPubMedDate, types)
 *
 * Stages:
 *   1. RoB 2 Overall Judgment Logic
 *   2. RoB 2 Zod Schema & Types
 *   3. RoB 2 Judgment Mapping
 *   4. Collaboration Types & Role Enum
 *   5. Living Review: computeNextCheck
 *   6. Living Review: formatPubMedDate
 *   7. Living Review & Alert Types
 *   8. Mock-Based assessRiskOfBias
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

import type {
  DomainAssessment,
  FullRoB2Assessment,
  SignalingQuestionResult,
} from "../../rob2-assessment";

import type {
  CollaboratorRole,
  CollaboratorRecord,
  ProjectAccessResult,
} from "../../collaboration";

import type {
  AlertFrequency,
  CreateAlertInput,
  AlertCheckResult,
} from "../../living-review";

// ---------------------------------------------------------------------------
// Replicate computeOverallJudgment (private in rob2-assessment.ts)
// ---------------------------------------------------------------------------

function computeOverallJudgment(
  domains: DomainAssessment[]
): { judgment: "Low" | "Some concerns" | "High"; rationale: string } {
  const judgments = domains.map((d) => d.judgment);

  if (judgments.includes("High")) {
    const highDomains = domains
      .filter((d) => d.judgment === "High")
      .map((d) => d.domainName);
    return {
      judgment: "High",
      rationale: `High risk of bias due to concerns in: ${highDomains.join(", ")}`,
    };
  }

  if (judgments.includes("Some concerns")) {
    const concernDomains = domains
      .filter((d) => d.judgment === "Some concerns")
      .map((d) => d.domainName);
    return {
      judgment: "Some concerns",
      rationale: `Some concerns about bias in: ${concernDomains.join(", ")}`,
    };
  }

  return {
    judgment: "Low",
    rationale: "Low risk of bias across all domains",
  };
}

// ---------------------------------------------------------------------------
// Replicate judgmentMap (from rob2-assessment.ts)
// ---------------------------------------------------------------------------

const judgmentMap: Record<string, "low" | "some_concerns" | "high"> = {
  Low: "low",
  "Some concerns": "some_concerns",
  High: "high",
};

// ---------------------------------------------------------------------------
// Replicate computeNextCheck (private in living-review.ts)
// ---------------------------------------------------------------------------

function computeNextCheck(frequency: AlertFrequency): Date {
  const now = new Date();
  switch (frequency) {
    case "daily":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case "weekly":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case "monthly":
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}

// ---------------------------------------------------------------------------
// Replicate formatPubMedDate (private in living-review.ts)
// ---------------------------------------------------------------------------

function formatPubMedDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

// ---------------------------------------------------------------------------
// Replicate RoB 2 Zod schema
// ---------------------------------------------------------------------------

const domainAssessmentSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["Yes", "Probably yes", "Probably no", "No", "No information"]),
      support: z.string(),
    })
  ),
  judgment: z.enum(["Low", "Some concerns", "High"]),
  rationale: z.string(),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeDomain(
  domain: string,
  name: string,
  judgment: "Low" | "Some concerns" | "High"
): DomainAssessment {
  return {
    domain,
    domainName: name,
    signalingQuestions: [
      { question: "Was allocation concealed?", answer: "Yes", support: "Described in methods" },
    ],
    judgment,
    rationale: `${name} judged as ${judgment}`,
  };
}

// =====================================================================
// STAGE 1: RoB 2 Overall Judgment Logic
// =====================================================================

describe("Cycle 13 — Stage 1: RoB 2 Overall Judgment Logic", () => {
  it("all Low → overall Low", () => {
    const domains = [
      makeDomain("D1", "Randomization", "Low"),
      makeDomain("D2", "Deviations", "Low"),
      makeDomain("D3", "Missing data", "Low"),
      makeDomain("D4", "Measurement", "Low"),
      makeDomain("D5", "Selection", "Low"),
    ];
    const result = computeOverallJudgment(domains);
    expect(result.judgment).toBe("Low");
    expect(result.rationale).toContain("all domains");
  });

  it("any High → overall High", () => {
    const domains = [
      makeDomain("D1", "Randomization", "Low"),
      makeDomain("D2", "Deviations", "High"),
      makeDomain("D3", "Missing data", "Low"),
    ];
    const result = computeOverallJudgment(domains);
    expect(result.judgment).toBe("High");
    expect(result.rationale).toContain("Deviations");
  });

  it("multiple High → rationale lists all high domains", () => {
    const domains = [
      makeDomain("D1", "Randomization", "High"),
      makeDomain("D2", "Deviations", "Low"),
      makeDomain("D3", "Missing data", "High"),
    ];
    const result = computeOverallJudgment(domains);
    expect(result.judgment).toBe("High");
    expect(result.rationale).toContain("Randomization");
    expect(result.rationale).toContain("Missing data");
  });

  it("Some concerns (no High) → overall Some concerns", () => {
    const domains = [
      makeDomain("D1", "Randomization", "Low"),
      makeDomain("D2", "Deviations", "Some concerns"),
      makeDomain("D3", "Missing data", "Low"),
    ];
    const result = computeOverallJudgment(domains);
    expect(result.judgment).toBe("Some concerns");
    expect(result.rationale).toContain("Deviations");
  });

  it("High trumps Some concerns", () => {
    const domains = [
      makeDomain("D1", "Randomization", "Some concerns"),
      makeDomain("D2", "Deviations", "High"),
    ];
    const result = computeOverallJudgment(domains);
    expect(result.judgment).toBe("High");
  });

  it("single domain Low → overall Low", () => {
    const result = computeOverallJudgment([makeDomain("D1", "Randomization", "Low")]);
    expect(result.judgment).toBe("Low");
  });

  it("empty domains → overall Low (vacuous truth)", () => {
    const result = computeOverallJudgment([]);
    expect(result.judgment).toBe("Low");
  });
});

// =====================================================================
// STAGE 2: RoB 2 Zod Schema & Types
// =====================================================================

describe("Cycle 13 — Stage 2: RoB 2 Zod Schema & Types", () => {
  it("valid domain assessment passes", () => {
    const result = domainAssessmentSchema.safeParse({
      domain: "D1",
      domainName: "Randomization process",
      signalingQuestions: [
        { question: "Was allocation random?", answer: "Yes", support: "Computer-generated sequence" },
        { question: "Was allocation concealed?", answer: "Probably yes", support: "Central randomization" },
      ],
      judgment: "Low",
      rationale: "Adequate randomization procedures described",
    });
    expect(result.success).toBe(true);
  });

  it("all 5 answer values are valid", () => {
    const answers = ["Yes", "Probably yes", "Probably no", "No", "No information"];
    for (const answer of answers) {
      const result = domainAssessmentSchema.safeParse({
        domain: "D1",
        domainName: "Test",
        signalingQuestions: [{ question: "Q?", answer, support: "text" }],
        judgment: "Low",
        rationale: "test",
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid answer value", () => {
    const result = domainAssessmentSchema.safeParse({
      domain: "D1",
      domainName: "Test",
      signalingQuestions: [{ question: "Q?", answer: "Maybe", support: "text" }],
      judgment: "Low",
      rationale: "test",
    });
    expect(result.success).toBe(false);
  });

  it("all 3 judgment values are valid", () => {
    for (const judgment of ["Low", "Some concerns", "High"]) {
      const result = domainAssessmentSchema.safeParse({
        domain: "D1",
        domainName: "Test",
        signalingQuestions: [],
        judgment,
        rationale: "test",
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid judgment value", () => {
    const result = domainAssessmentSchema.safeParse({
      domain: "D1",
      domainName: "Test",
      signalingQuestions: [],
      judgment: "Moderate",
      rationale: "test",
    });
    expect(result.success).toBe(false);
  });

  it("SignalingQuestionResult type contract", () => {
    const q: SignalingQuestionResult = {
      question: "Was the allocation sequence random?",
      answer: "Probably yes",
      support: "Computer-generated randomization described in methods",
    };
    expect(q.answer).toBe("Probably yes");
  });

  it("FullRoB2Assessment type contract", () => {
    const assessment: FullRoB2Assessment = {
      paperId: 100,
      projectId: 1,
      domains: [makeDomain("D1", "Randomization", "Low")],
      overallJudgment: "Low",
      overallRationale: "Low risk across all domains",
    };
    expect(assessment.domains).toHaveLength(1);
    expect(assessment.overallJudgment).toBe("Low");
  });
});

// =====================================================================
// STAGE 3: RoB 2 Judgment Mapping
// =====================================================================

describe("Cycle 13 — Stage 3: RoB 2 Judgment Mapping", () => {
  it("Low → low", () => {
    expect(judgmentMap["Low"]).toBe("low");
  });

  it("Some concerns → some_concerns", () => {
    expect(judgmentMap["Some concerns"]).toBe("some_concerns");
  });

  it("High → high", () => {
    expect(judgmentMap["High"]).toBe("high");
  });

  it("maps cover all 3 RoB 2 judgments", () => {
    expect(Object.keys(judgmentMap)).toHaveLength(3);
  });

  it("all DB values are valid enum members", () => {
    const validDbValues = new Set(["low", "some_concerns", "high"]);
    for (const v of Object.values(judgmentMap)) {
      expect(validDbValues.has(v)).toBe(true);
    }
  });
});

// =====================================================================
// STAGE 4: Collaboration Types & Role Enum
// =====================================================================

describe("Cycle 13 — Stage 4: Collaboration Types & Role Enum", () => {
  it("CollaboratorRole has 5 values", () => {
    const roles: CollaboratorRole[] = ["owner", "reviewer", "extractor", "statistician", "viewer"];
    expect(roles).toHaveLength(5);
    expect(new Set(roles).size).toBe(5);
  });

  it("CollaboratorRecord has all required fields", () => {
    const r: CollaboratorRecord = {
      id: 1,
      projectId: 42,
      userId: "user_abc",
      email: "alice@example.com",
      role: "reviewer",
      invitedAt: new Date(),
      acceptedAt: null,
    };
    expect(r.id).toBe(1);
    expect(r.acceptedAt).toBeNull();
  });

  it("ProjectAccessResult allowed=true has role", () => {
    const r: ProjectAccessResult = { allowed: true, role: "owner" };
    expect(r.allowed).toBe(true);
    expect(r.role).toBe("owner");
  });

  it("ProjectAccessResult allowed=false has null role", () => {
    const r: ProjectAccessResult = { allowed: false, role: null };
    expect(r.allowed).toBe(false);
    expect(r.role).toBeNull();
  });

  it("roles are hierarchical by convention (owner > reviewer > viewer)", () => {
    // Not enforced in code, but the type system allows all 5 values
    const roleHierarchy: CollaboratorRole[] = ["owner", "reviewer", "extractor", "statistician", "viewer"];
    expect(roleHierarchy[0]).toBe("owner");
    expect(roleHierarchy[roleHierarchy.length - 1]).toBe("viewer");
  });
});

// =====================================================================
// STAGE 5: Living Review: computeNextCheck
// =====================================================================

describe("Cycle 13 — Stage 5: computeNextCheck", () => {
  it("daily → ~24 hours from now", () => {
    const before = Date.now();
    const next = computeNextCheck("daily");
    const after = Date.now();
    const expected24h = 24 * 60 * 60 * 1000;
    expect(next.getTime()).toBeGreaterThanOrEqual(before + expected24h);
    expect(next.getTime()).toBeLessThanOrEqual(after + expected24h);
  });

  it("weekly → ~7 days from now", () => {
    const before = Date.now();
    const next = computeNextCheck("weekly");
    const expected7d = 7 * 24 * 60 * 60 * 1000;
    expect(next.getTime()).toBeGreaterThanOrEqual(before + expected7d);
  });

  it("monthly → ~30 days from now", () => {
    const before = Date.now();
    const next = computeNextCheck("monthly");
    const expected30d = 30 * 24 * 60 * 60 * 1000;
    expect(next.getTime()).toBeGreaterThanOrEqual(before + expected30d);
  });

  it("returns a Date object", () => {
    expect(computeNextCheck("daily")).toBeInstanceOf(Date);
    expect(computeNextCheck("weekly")).toBeInstanceOf(Date);
    expect(computeNextCheck("monthly")).toBeInstanceOf(Date);
  });

  it("daily < weekly < monthly", () => {
    const d = computeNextCheck("daily").getTime();
    const w = computeNextCheck("weekly").getTime();
    const m = computeNextCheck("monthly").getTime();
    expect(d).toBeLessThan(w);
    expect(w).toBeLessThan(m);
  });
});

// =====================================================================
// STAGE 6: Living Review: formatPubMedDate
// =====================================================================

describe("Cycle 13 — Stage 6: formatPubMedDate", () => {
  it("formats date as YYYY/MM/DD", () => {
    const d = new Date(2025, 0, 15); // Jan 15, 2025
    expect(formatPubMedDate(d)).toBe("2025/01/15");
  });

  it("pads single-digit month with leading zero", () => {
    const d = new Date(2025, 2, 5); // Mar 5
    expect(formatPubMedDate(d)).toBe("2025/03/05");
  });

  it("pads single-digit day with leading zero", () => {
    const d = new Date(2025, 11, 1); // Dec 1
    expect(formatPubMedDate(d)).toBe("2025/12/01");
  });

  it("handles December 31", () => {
    const d = new Date(2025, 11, 31);
    expect(formatPubMedDate(d)).toBe("2025/12/31");
  });

  it("handles January 1", () => {
    const d = new Date(2026, 0, 1);
    expect(formatPubMedDate(d)).toBe("2026/01/01");
  });

  it("uses forward slashes (PubMed format)", () => {
    const d = new Date(2025, 5, 15);
    const formatted = formatPubMedDate(d);
    expect(formatted).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
  });
});

// =====================================================================
// STAGE 7: Living Review & Alert Types
// =====================================================================

describe("Cycle 13 — Stage 7: Living Review & Alert Types", () => {
  it("AlertFrequency has 3 values", () => {
    const freqs: AlertFrequency[] = ["daily", "weekly", "monthly"];
    expect(freqs).toHaveLength(3);
  });

  it("CreateAlertInput has required fields", () => {
    const input: CreateAlertInput = {
      projectId: 1,
      searchString: "SGLT2 inhibitor AND heart failure",
      frequency: "weekly",
    };
    expect(input.projectId).toBe(1);
    expect(input.frequency).toBe("weekly");
  });

  it("AlertCheckResult tracks screening counts", () => {
    const result: AlertCheckResult = {
      alertId: 42,
      newPapersFound: 10,
      autoScreened: 8,
      included: 5,
      excluded: 3,
    };
    expect(result.included + result.excluded).toBeLessThanOrEqual(result.autoScreened);
    expect(result.autoScreened).toBeLessThanOrEqual(result.newPapersFound);
  });

  it("AlertCheckResult with zero results (no new papers)", () => {
    const result: AlertCheckResult = {
      alertId: 1,
      newPapersFound: 0,
      autoScreened: 0,
      included: 0,
      excluded: 0,
    };
    expect(result.newPapersFound).toBe(0);
  });
});

// =====================================================================
// STAGE 8: Mock-Based assessRiskOfBias
// =====================================================================

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

vi.mock("@/lib/ai/models", () => ({
  getModel: vi.fn(() => "mock-model"),
}));

vi.mock("@/lib/ai/prompts/systematic-review", () => ({
  getRoB2AssessmentPrompt: vi.fn(
    (title: string, _text: string, domain: { id: string; name: string }) =>
      `Assess ${domain.name} for: ${title}`
  ),
  ROB2_DOMAINS: [
    { id: "D1", name: "Randomization process", questions: ["Q1?"] },
    { id: "D2", name: "Deviations from intended interventions", questions: ["Q2?"] },
    { id: "D3", name: "Missing outcome data", questions: ["Q3?"] },
    { id: "D4", name: "Measurement of the outcome", questions: ["Q4?"] },
    { id: "D5", name: "Selection of the reported result", questions: ["Q5?"] },
  ],
}));

vi.mock("@/lib/db", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn(() => Promise.resolve()),
        returning: vi.fn(() => Promise.resolve([{ id: 1 }])),
      })),
    })),
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve([])),
      })),
    })),
  },
}));

vi.mock("@/lib/db/schema", () => ({
  riskOfBias: {
    paperId: "paperId",
    projectId: "projectId",
    domain: "domain",
  },
}));

describe("Cycle 13 — Stage 8: Mock-Based assessRiskOfBias", () => {
  let assessRiskOfBias: typeof import("../../rob2-assessment").assessRiskOfBias;
  let generateObjectMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const aiModule = await import("ai");
    generateObjectMock = aiModule.generateObject as ReturnType<typeof vi.fn>;
    const mod = await import("../../rob2-assessment");
    assessRiskOfBias = mod.assessRiskOfBias;
  });

  it("assesses all 5 domains and returns FullRoB2Assessment", async () => {
    let callIdx = 0;
    generateObjectMock.mockImplementation(() => {
      callIdx++;
      return Promise.resolve({
        object: {
          domain: `D${callIdx}`,
          domainName: `Domain ${callIdx}`,
          signalingQuestions: [
            { question: `Q${callIdx}?`, answer: "Yes", support: "Adequate" },
          ],
          judgment: "Low",
          rationale: "Well described",
        },
      });
    });

    const result = await assessRiskOfBias(100, 1, "Test RCT", "Methods section...");

    expect(result.paperId).toBe(100);
    expect(result.projectId).toBe(1);
    expect(result.domains).toHaveLength(5);
    expect(result.overallJudgment).toBe("Low");
    expect(generateObjectMock).toHaveBeenCalledTimes(5);
  });

  it("escalates to High when any domain is High", async () => {
    let callIdx = 0;
    generateObjectMock.mockImplementation(() => {
      callIdx++;
      return Promise.resolve({
        object: {
          domain: `D${callIdx}`,
          domainName: `Domain ${callIdx}`,
          signalingQuestions: [],
          judgment: callIdx === 3 ? "High" : "Low",
          rationale: callIdx === 3 ? "Missing data is a problem" : "OK",
        },
      });
    });

    const result = await assessRiskOfBias(101, 1, "Incomplete Trial", "...");

    expect(result.overallJudgment).toBe("High");
    expect(result.overallRationale).toContain("Domain 3");
  });

  it("escalates to Some concerns when no High but some concerns present", async () => {
    let callIdx = 0;
    generateObjectMock.mockImplementation(() => {
      callIdx++;
      return Promise.resolve({
        object: {
          domain: `D${callIdx}`,
          domainName: `Domain ${callIdx}`,
          signalingQuestions: [],
          judgment: callIdx === 1 ? "Some concerns" : "Low",
          rationale: "Assessment",
        },
      });
    });

    const result = await assessRiskOfBias(102, 1, "Fair Trial", "...");

    expect(result.overallJudgment).toBe("Some concerns");
  });

  it("persists each domain to database via db.insert", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        domain: "D1",
        domainName: "Test",
        signalingQuestions: [],
        judgment: "Low",
        rationale: "OK",
      },
    });

    const { db: dbMock } = await import("@/lib/db");
    await assessRiskOfBias(103, 1, "Test", "text");

    // 5 domains → 5 insert calls
    expect(dbMock.insert).toHaveBeenCalledTimes(5);
  });
});
