import type { Candidate, SrReview, TaVote, TaVoteRecord } from "./types";

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

interface BatchSpec {
  source: string;
  size: number;
  duplicates: number;
}

const BATCHES: BatchSpec[] = [
  { source: "PubMed", size: 214, duplicates: 11 },
  { source: "Embase, +2", size: 142, duplicates: 9 },
  { source: "AI search", size: 56, duplicates: 4 },
];

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

function aiSuggestionFor(poolIndex: number): TaVote {
  return poolIndex < TARGETS.advanced ? "yes" : "no";
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
      const isDuplicate = i >= batch.size - batch.duplicates;
      const exemplar = isDuplicate
        ? undefined
        : EXEMPLARS.find((e) => e.slot === poolIndex);

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
            aiSuggestion: aiSuggestionFor(poolIndex),
            ta: { votes: votesFor(poolIndex) },
          }
        : {
            id: `cand-${sequence}`,
            refId: 1000 + sequence,
            title: `${FILLER_TOPICS[sequence % FILLER_TOPICS.length]} — cohort ${sequence}`,
            authors: ["Study Group"],
            journal: "Journal of Cardiac Failure",
            year: 2018 + (sequence % 8),
            source: batch.source,
            isDuplicate: isDuplicate || undefined,
            aiSuggestion: isDuplicate ? undefined : aiSuggestionFor(poolIndex),
            ta: { votes: isDuplicate ? [] : votesFor(poolIndex) },
          };

      candidates.push(base);
      if (!isDuplicate) poolIndex += 1;
    }
  }

  return {
    id: MOCK_REVIEW_ID,
    title: "SGLT2 inhibitors & heart failure",
    shortTitle: "SGLT2i & HF",
    reviewers: REVIEWERS,
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
    candidates: [],
  };
}
