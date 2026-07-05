import type {
  Candidate,
  ExtractionState,
  FullTextState,
  RobAssessment,
  RobDomainAssessment,
  SrReview,
  TaVote,
  TaVoteRecord,
} from "./types";

/**
 * Deterministic mock review used while the SR module runs on mock data.
 * Every count on every screen derives from this one candidate set, so the
 * funnel, queues, and PRISMA numbers always agree.
 */

export const MOCK_REVIEW_ID = "sglt2-hf";
export const CURRENT_REVIEWER_ID = "you";

const REVIEWERS = [
  { id: "emma", name: "Emma Reyes", initials: "ER" },
  { id: "kat", name: "Katherine Ng", initials: "KN" },
  { id: "you", name: "Shailesh S.", initials: "SS" },
];

const PROTOCOL = {
  researchQuestion:
    "In adults with heart failure, do SGLT2 inhibitors reduce heart-failure hospitalisation and cardiovascular mortality across the ejection-fraction spectrum?",
  pico: {
    population: "Adults (≥18y) with chronic heart failure, any ejection fraction",
    intervention: "An SGLT2 inhibitor (e.g. empagliflozin, dapagliflozin)",
    comparator: "Placebo or standard care",
    outcome: "HF hospitalisation and cardiovascular mortality",
    studyDesign: "Randomised controlled trials",
  },
  status: "draft" as const,
  criteria: [
    {
      id: "inc-population",
      kind: "include" as const,
      label: "Adults with heart failure",
      instruction:
        "Include studies enrolling adults (≥18y) with a diagnosis of heart failure, any ejection fraction.",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "inc-intervention",
      kind: "include" as const,
      label: "SGLT2-inhibitor intervention",
      instruction:
        "Include studies where the intervention is an SGLT2 inhibitor (empagliflozin, dapagliflozin, canagliflozin, …).",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "inc-design",
      kind: "include" as const,
      label: "Randomised controlled trial",
      instruction: "Include randomised controlled trials only.",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "inc-outcome",
      kind: "include" as const,
      label: "Reports HF hospitalisation or mortality",
      instruction:
        "Include studies reporting heart-failure hospitalisation or cardiovascular / all-cause mortality.",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "exc-abstract",
      kind: "exclude" as const,
      label: "Conference abstract only",
      instruction: "Exclude records available only as a conference abstract.",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "exc-nonhuman",
      kind: "exclude" as const,
      label: "Non-human / mechanistic",
      instruction: "Exclude non-human, in-vitro, or purely mechanistic studies.",
      answerStructure: "yes_no_maybe" as const,
    },
    {
      id: "exc-egfr",
      kind: "exclude" as const,
      label: "eGFR <20 populations",
      instruction: "Exclude studies restricted to populations with eGFR below 20.",
      answerStructure: "yes_no_maybe" as const,
    },
  ],
};

const EMPTY_PROTOCOL = {
  researchQuestion: "",
  pico: {
    population: "",
    intervention: "",
    comparator: "",
    outcome: "",
    studyDesign: "",
  },
  status: "draft" as const,
  criteria: [],
};

const CRITERIA = {
  inclusion: PROTOCOL.criteria
    .filter((c) => c.kind === "include")
    .map((c) => c.label),
  exclusion: PROTOCOL.criteria
    .filter((c) => c.kind === "exclude")
    .map((c) => c.label),
  highlightInclude: [
    "SGLT2 inhibitors",
    "heart failure",
    "randomised, double-blind trial",
    "ejection fraction of more than 40%",
    "HF hospitalisation",
    "preserved ejection fraction",
    "dapagliflozin",
    "ejection fraction >40%",
  ],
  highlightExclude: ["eGFR below 20"],
};

const ANKER_REASONING = {
  score: 4.9,
  verdict: "yes" as const,
  criteria: [
    {
      label: "Population",
      detail: "adults with HF (HFpEF, EF >40%)",
      met: true,
    },
    {
      label: "Intervention",
      detail: "empagliflozin, an SGLT2 inhibitor",
      met: true,
    },
    {
      label: "Design",
      detail: "randomised, double-blind RCT (n=5,988)",
      met: true,
    },
    {
      label: "Outcome",
      detail: "reports HF hospitalisation & CV death",
      met: true,
    },
  ],
};

interface BatchSpec {
  id: string;
  source: string;
  size: number;
  duplicates: number;
  ai?: boolean;
}

const BATCHES: BatchSpec[] = [
  { id: "batch-pubmed", source: "PubMed", size: 214, duplicates: 11 },
  { id: "batch-embase", source: "Embase, +2", size: 142, duplicates: 9 },
  { id: "batch-ai", source: "AI search", size: 56, duplicates: 4, ai: true },
];

/** Uncertain duplicate pairs left in the pool for human review. */
const UNCERTAIN_DUPES: Record<
  number,
  { title: string; year: number; ofRefId: number; matchedOn: string[] }
> = {
  275: {
    title:
      "Dapagliflozin in Patients with Heart Failure and a Reduced Ejection Fraction (DAPA-HF)",
    year: 2019,
    ofRefId: 1660,
    matchedOn: ["title", "year", "first author"],
  },
  276: {
    title:
      "Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction (DELIVER)",
    year: 2022,
    ofRefId: 1904,
    matchedOn: ["title", "authors"],
  },
};

/** Screening-pool targets (sum = 388 non-duplicate candidates). */
const TARGETS = { advanced: 124, irrelevant: 76, conflict: 74, noVotes: 114 };

const VOTER_PAIRS: Array<[string, string]> = [
  ["emma", "kat"],
  ["kat", "emma"],
  ["emma", "you"],
  ["kat", "you"],
];

const FILLER_TOPICS = [
  "SGLT2 inhibition and cardiovascular outcomes",
  "Dapagliflozin in chronic heart failure",
  "Empagliflozin and renal endpoints in HF",
  "Sodium-glucose cotransporter blockade in HFpEF",
  "Canagliflozin and hospitalisation for heart failure",
];

interface Exemplar {
  slot: number;
  refId: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract?: string;
}

const EXEMPLARS: Exemplar[] = [
  {
    // First study in the to-screen queue (prototype screen 3).
    slot: 274,
    refId: 2241,
    title: "Empagliflozin in Heart Failure with a Preserved Ejection Fraction",
    authors: [
      "Anker SD",
      "Butler J",
      "Filippatos G",
      "Ferreira JP",
      "Bocchi E",
      "Böhm M",
    ],
    journal: "New England Journal of Medicine",
    year: 2021,
    doi: "10.1056/NEJMoa2107038",
    abstract:
      "Background. SGLT2 inhibitors reduce the risk of hospitalisation for heart failure in patients with a reduced ejection fraction, but their effects in patients with a preserved ejection fraction are uncertain. Methods. In this randomised, double-blind trial, we assigned 5,988 patients with class II–IV heart failure and an ejection fraction of more than 40% to receive empagliflozin (10 mg once daily) or placebo. We excluded patients with an eGFR below 20 mL/min/1.73 m². Results. Empagliflozin reduced the composite of cardiovascular death or hospitalisation for heart failure (hazard ratio 0.79; 95% CI 0.69–0.90; P<0.001), driven principally by a lower risk of HF hospitalisation.",
  },
  {
    // First conflict in the adjudication queue (prototype screen 4).
    slot: 200,
    refId: 1904,
    title:
      "Dapagliflozin in Heart Failure with Mildly Reduced or Preserved Ejection Fraction (DELIVER)",
    authors: ["Solomon SD", "McMurray JJV", "Claggett B", "de Boer RA"],
    journal: "New England Journal of Medicine",
    year: 2022,
    doi: "10.1056/NEJMoa2206286",
    abstract:
      "Background. SGLT2 inhibitors reduce the risk of cardiovascular death or worsening heart failure in HFrEF; whether benefits extend to a mildly reduced or preserved ejection fraction is unclear. Methods. We randomly assigned 6,263 patients with HF and an ejection fraction >40% to dapagliflozin or placebo. Results. Dapagliflozin reduced the composite of worsening HF or CV death (HR 0.82; 95% CI 0.73–0.92; P<0.001).",
  },
  {
    // Already advanced — first full-text study (prototype screen 5).
    slot: 0,
    refId: 1660,
    title:
      "Dapagliflozin in Patients with Heart Failure and a Reduced Ejection Fraction (DAPA-HF)",
    authors: ["McMurray JJV", "Solomon SD", "Inzucchi SE", "Køber L"],
    journal: "New England Journal of Medicine",
    year: 2019,
    doi: "10.1056/NEJMoa1911303",
  },
  {
    slot: 1,
    refId: 2310,
    title:
      "SGLT2 inhibitors across the ejection-fraction spectrum: a meta-analysis",
    authors: ["Banerjee M", "Pal R"],
    journal: "The Lancet",
    year: 2023,
    doi: "10.1016/S0140-6736(23)01234-5",
  },
];

const EXCLUSION_REASONS = [
  { code: "wrong_population", label: "Wrong population" },
  { code: "wrong_intervention", label: "Wrong intervention" },
  { code: "wrong_comparator", label: "Wrong comparator" },
  { code: "wrong_outcome", label: "Wrong outcome" },
  { code: "wrong_design", label: "Wrong study design" },
  { code: "abstract_only", label: "Conference abstract only" },
  { code: "duplicate", label: "Duplicate" },
];

/**
 * Seed the full-text state for a study that advanced from screening. The
 * 124 advanced studies (ftIndex 0..123) split into a consistent set of
 * buckets so every downstream count agrees:
 *   12 included · 23 excluded-with-reasons · 6 conflicts · 40 awaiting-other
 *   · 43 still to review (incl. the DAPA-HF exemplar at ftIndex 0).
 */
function fullTextStateFor(ftIndex: number): FullTextState | undefined {
  // ftIndex 0 is the DAPA-HF exemplar — left untouched (first to review).
  if (ftIndex === 0) return { decisions: [] };
  if (ftIndex <= 12) {
    return {
      decisions: [
        { reviewerId: "you", vote: "include" },
        { reviewerId: "emma", vote: "include" },
      ],
    };
  }
  if (ftIndex <= 35) {
    return {
      decisions: [
        { reviewerId: "you", vote: "exclude", reasonCode: "wrong_population" },
        { reviewerId: "emma", vote: "exclude", reasonCode: "wrong_population" },
      ],
    };
  }
  if (ftIndex <= 41) {
    return {
      decisions: [
        { reviewerId: "you", vote: "include" },
        { reviewerId: "emma", vote: "exclude", reasonCode: "wrong_outcome" },
      ],
    };
  }
  if (ftIndex <= 81) {
    return { decisions: [{ reviewerId: "you", vote: "include" }] };
  }
  return { decisions: [] };
}

const ANKER_SLOT = 274;

/**
 * The AI's own read of a study, independent of the human vote buckets. It
 * suggests include on 124 studies total — the 123 most-confident plus the
 * Anker exemplar (a still-to-screen study the AI would include).
 */
function aiSuggestsInclude(poolIndex: number): boolean {
  return poolIndex === ANKER_SLOT || poolIndex < TARGETS.advanced - 1;
}

function aiSuggestionFor(poolIndex: number): TaVote {
  return aiSuggestsInclude(poolIndex) ? "yes" : "no";
}

function reasoningFor(poolIndex: number, refId: number) {
  if (refId === 2241) return ANKER_REASONING;
  const include = aiSuggestsInclude(poolIndex);
  return {
    score: include ? 4.2 : 1.6,
    verdict: (include ? "yes" : "no") as TaVote,
    criteria: [
      {
        label: "Population",
        detail: include ? "adults with heart failure" : "no HF population",
        met: include,
      },
      {
        label: "Intervention",
        detail: include ? "SGLT2 inhibitor" : "not an SGLT2 inhibitor",
        met: include,
      },
      {
        label: "Design",
        detail: include ? "randomised controlled trial" : "not an RCT",
        met: include,
      },
    ],
  };
}

/** Seed the consensus extraction grid for EMPEROR-Preserved (3 conflicts). */
function buildExtraction(candidateId: string): ExtractionState {
  return {
    candidateId,
    fields: [
      {
        id: "study_id",
        section: "General information",
        label: "Study ID",
        reviewer1: "EMPEROR-Preserved",
        reviewer2: "EMPEROR-Preserved",
        aiFinal: {
          value: "EMPEROR-Preserved",
          sourceQuote:
            "EMPEROR-Preserved (Empagliflozin Outcome Trial in Patients With Chronic Heart Failure With a Preserved Ejection Fraction).",
        },
      },
      {
        id: "study_type",
        section: "General information",
        label: "Study type",
        reviewer1: "RCT",
        reviewer2: "RCT",
        aiFinal: {
          value: "RCT",
          sourceQuote:
            "In this randomised, double-blind trial, we assigned 5,988 patients…",
        },
      },
      {
        id: "sample_size",
        section: "General information",
        label: "Sample size",
        reviewer1: "5,988",
        reviewer2: "5,888",
        conflict: true,
      },
      {
        id: "intervention",
        section: "General information",
        label: "Intervention",
        reviewer1: "Empagliflozin",
        reviewer2: "Empagliflozin 10 mg",
        aiFinal: {
          value: "Empagliflozin 10 mg",
          sourceQuote: "…to receive empagliflozin (10 mg once daily) or placebo.",
        },
      },
      {
        id: "ef_category",
        section: "Characteristics & outcomes",
        label: "EF category",
        reviewer1: "HFpEF",
        reviewer2: "HFpEF >40%",
        aiFinal: {
          value: "HFpEF (EF >40%)",
          sourceQuote:
            "…an ejection fraction of more than 40% (heart failure with preserved ejection fraction).",
        },
      },
      {
        id: "follow_up",
        section: "Characteristics & outcomes",
        label: "Follow-up",
        reviewer1: "26.2 months",
        reviewer2: "2.2 years",
        conflict: true,
      },
      {
        id: "diabetes",
        section: "Characteristics & outcomes",
        label: "Diabetes status",
        reviewer1: "Mixed",
        reviewer2: "",
        reviewer2NotReported: true,
        conflict: true,
      },
      {
        id: "primary_hr",
        section: "Characteristics & outcomes",
        label: "Primary HR (HF hosp.)",
        reviewer1: "0.73",
        reviewer2: "0.73 [0.61–0.88]",
        aiFinal: {
          value: "0.73 (0.61–0.88)",
          sourceQuote:
            "…a lower risk of hospitalisation for heart failure (hazard ratio 0.73; 95% CI 0.61–0.88).",
        },
      },
    ],
  };
}

type RobJ = "low" | "some_concerns" | "high";

/** Seed RoB 2 assessments for the four named exemplar studies, in display order. */
function buildRobAssessments(idByRefId: Map<number, string>): RobAssessment[] {
  const domainJudgments: Array<[number, RobJ[]]> = [
    // EMPEROR-Preserved (Anker) → some concerns from missing outcome data.
    [2241, ["low", "low", "some_concerns", "low", "low"]],
    [1660, ["low", "low", "low", "low", "low"]], // DAPA-HF → low
    [1904, ["low", "low", "low", "low", "low"]], // DELIVER → low
    [2310, ["some_concerns", "high", "some_concerns", "low", "high"]], // meta → high
  ];
  const domainIds = [
    "randomisation",
    "deviations",
    "missing",
    "measurement",
    "selection",
  ];
  const justifications: Record<string, string> = {
    randomisation:
      '"Computer-generated 1:1 randomisation, stratified by region and diabetes status; concealment via an interactive web system."',
    missing:
      '"Vital status was ascertained for 99.6% of participants; a small excess of withdrawals in the placebo group."',
  };

  return domainJudgments
    .filter(([refId]) => idByRefId.has(refId))
    .map(([refId, judgments]): RobAssessment => ({
      candidateId: idByRefId.get(refId)!,
      domains: domainIds.map((domainId, index): RobDomainAssessment => ({
        domainId,
        judgment: judgments[index],
        signallingAnswers:
          domainId === "randomisation" ? { "0": "yes", "1": "yes" } : {},
        aiJustification: justifications[domainId],
      })),
    }));
}

function votesFor(poolIndex: number): TaVoteRecord[] {
  const { advanced, irrelevant, conflict } = TARGETS;
  const [a, b] = VOTER_PAIRS[poolIndex % VOTER_PAIRS.length];

  if (poolIndex < advanced) {
    const second: TaVote = poolIndex % 3 === 0 ? "maybe" : "yes";
    return [
      { reviewerId: a, vote: "yes" },
      { reviewerId: b, vote: second },
    ];
  }
  if (poolIndex < advanced + irrelevant) {
    return [
      { reviewerId: a, vote: "no" },
      { reviewerId: b, vote: "no" },
    ];
  }
  if (poolIndex < advanced + irrelevant + conflict) {
    const positive: TaVote = poolIndex % 2 === 0 ? "yes" : "maybe";
    return [
      { reviewerId: a, vote: positive },
      { reviewerId: b, vote: "no" },
    ];
  }
  return [];
}

export function createMockReview(): SrReview {
  const candidates: Candidate[] = [];
  let poolIndex = 0;
  let sequence = 0;

  for (const batch of BATCHES) {
    for (let i = 0; i < batch.size; i += 1) {
      sequence += 1;
      const isAutoMerged = i >= batch.size - batch.duplicates;
      const exemplar = isAutoMerged
        ? undefined
        : EXEMPLARS.find((e) => e.slot === poolIndex);
      const uncertain = isAutoMerged ? undefined : UNCERTAIN_DUPES[poolIndex];

      const base: Candidate = exemplar
        ? {
            id: `cand-${sequence}`,
            refId: exemplar.refId,
            title: exemplar.title,
            authors: exemplar.authors,
            journal: exemplar.journal,
            year: exemplar.year,
            doi: exemplar.doi,
            abstract: exemplar.abstract,
            source: batch.source,
            batchId: batch.id,
            aiSuggestion: aiSuggestionFor(poolIndex),
            aiReasoning: reasoningFor(poolIndex, exemplar.refId),
            ta: { votes: votesFor(poolIndex) },
            fullText:
              poolIndex < TARGETS.advanced
                ? fullTextStateFor(poolIndex)
                : undefined,
          }
        : {
            id: `cand-${sequence}`,
            refId: 1000 + sequence,
            title: uncertain
              ? uncertain.title
              : `${FILLER_TOPICS[sequence % FILLER_TOPICS.length]} — cohort ${sequence}`,
            authors: uncertain ? ["McMurray JJV", "Solomon SD"] : ["Study Group"],
            journal: "Journal of Cardiac Failure",
            year: uncertain ? uncertain.year : 2018 + (sequence % 8),
            source: batch.source,
            batchId: batch.id,
            dupe: isAutoMerged
              ? {
                  status: "auto_merged",
                  matchedOn: ["title", "year", "volume", "authors"],
                }
              : uncertain
                ? {
                    status: "needs_review",
                    matchedOn: uncertain.matchedOn,
                    ofRefId: uncertain.ofRefId,
                  }
                : undefined,
            aiSuggestion: isAutoMerged ? undefined : aiSuggestionFor(poolIndex),
            aiReasoning: isAutoMerged
              ? undefined
              : reasoningFor(poolIndex, 1000 + sequence),
            ta: { votes: isAutoMerged ? [] : votesFor(poolIndex) },
            fullText:
              !isAutoMerged && poolIndex < TARGETS.advanced
                ? fullTextStateFor(poolIndex)
                : undefined,
          };

      candidates.push(base);
      if (!isAutoMerged) poolIndex += 1;
    }
  }

  const idByRefId = new Map(candidates.map((c) => [c.refId, c.id]));

  return {
    id: MOCK_REVIEW_ID,
    title: "SGLT2 inhibitors & heart failure",
    shortTitle: "SGLT2i & HF",
    reviewers: REVIEWERS,
    protocol: PROTOCOL,
    criteria: CRITERIA,
    exclusionReasons: EXCLUSION_REASONS,
    robAssessments: buildRobAssessments(idByRefId),
    extractions: idByRefId.has(2241)
      ? [buildExtraction(idByRefId.get(2241)!)]
      : [],
    batches: BATCHES.map(({ id, source, ai }) => ({
      id,
      source,
      target: "screen" as const,
      ai,
    })),
    candidates,
  };
}

/**
 * Resolve a review for a route param. While the module runs on mock data,
 * every id resolves to the seeded review; `new-review` shows first-run.
 */
export function getReviewById(id: string): SrReview {
  if (id === "new-review") return createEmptyReview();
  return createMockReview();
}

/** First-run review: protocol exists, nothing imported yet. */
export function createEmptyReview(): SrReview {
  return {
    id: "new-review",
    title: "Untitled systematic review",
    shortTitle: "New review",
    reviewers: REVIEWERS,
    protocol: EMPTY_PROTOCOL,
    criteria: CRITERIA,
    exclusionReasons: EXCLUSION_REASONS,
    robAssessments: [],
    extractions: [],
    batches: [],
    candidates: [],
  };
}
