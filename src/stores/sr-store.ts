import { create } from "zustand";
import { getReviewById } from "@/lib/sr/fixtures";
import { canRecordExclusion } from "@/lib/sr/fulltext";
import { deriveScreeningCriteria } from "@/lib/sr/protocol";
import type {
  Candidate,
  EligibilityCriterion,
  FullTextVote,
  Pico,
  Protocol,
  RobJudgment,
  RobSignalAnswer,
  SrReview,
  TaVote,
} from "@/lib/sr/types";

/**
 * Client state for the SR module. Holds the active review (seeded from the
 * mock fixtures while the module runs on mock data) and the mutations the
 * screens perform. All counts everywhere derive from this one record.
 */
interface SrStoreState {
  reviewId: string | null;
  review: SrReview | null;
  initReview: (reviewId: string) => void;
  mergeDuplicate: (candidateId: string) => void;
  markNotDuplicate: (candidateId: string) => void;
  undoImport: (batchId: string) => void;
  castTaVote: (candidateId: string, reviewerId: string, vote: TaVote) => void;
  resolveConflict: (
    candidateId: string,
    resolverId: string,
    decision: TaVote,
  ) => void;
  castFullTextVote: (
    candidateId: string,
    reviewerId: string,
    vote: FullTextVote,
    reasonCode?: string,
  ) => void;
  answerRobSignal: (
    candidateId: string,
    domainId: string,
    questionKey: string,
    answer: RobSignalAnswer,
  ) => void;
  setRobJudgment: (
    candidateId: string,
    domainId: string,
    judgment: RobJudgment,
  ) => void;
  resolveExtractionCell: (
    candidateId: string,
    fieldId: string,
    value: string,
  ) => void;
  setResearchQuestion: (question: string) => void;
  setPicoField: (key: keyof Pico, value: string) => void;
  updateCriterion: (
    criterionId: string,
    patch: Partial<Omit<EligibilityCriterion, "id">>,
  ) => void;
  addCriterion: (criterion: Omit<EligibilityCriterion, "id">) => void;
  removeCriterion: (criterionId: string) => void;
  approveProtocol: () => void;
}

function updateCandidate(
  review: SrReview,
  candidateId: string,
  update: (candidate: Candidate) => Candidate,
): SrReview {
  return {
    ...review,
    candidates: review.candidates.map((candidate) =>
      candidate.id === candidateId ? update(candidate) : candidate,
    ),
  };
}

function withProtocol(
  review: SrReview,
  patch: Partial<Protocol>,
): SrReview {
  return { ...review, protocol: { ...review.protocol, ...patch } };
}

/** Update the protocol criteria and re-derive the screening panel's criteria. */
function withCriteria(
  review: SrReview,
  criteria: EligibilityCriterion[],
): SrReview {
  const protocol = { ...review.protocol, criteria };
  const derived = deriveScreeningCriteria(protocol);
  return {
    ...review,
    protocol,
    criteria: {
      ...review.criteria,
      inclusion: derived.inclusion,
      exclusion: derived.exclusion,
    },
  };
}

function updateRobDomain(
  review: SrReview,
  candidateId: string,
  domainId: string,
  update: (
    domain: SrReview["robAssessments"][number]["domains"][number],
  ) => SrReview["robAssessments"][number]["domains"][number],
): SrReview {
  return {
    ...review,
    robAssessments: review.robAssessments.map((assessment) =>
      assessment.candidateId === candidateId
        ? {
            ...assessment,
            domains: assessment.domains.map((domain) =>
              domain.domainId === domainId ? update(domain) : domain,
            ),
          }
        : assessment,
    ),
  };
}

export const useSrStore = create<SrStoreState>((set, get) => ({
  reviewId: null,
  review: null,

  initReview: (reviewId) => {
    if (get().reviewId === reviewId && get().review) return;
    set({ reviewId, review: getReviewById(reviewId) });
  },

  mergeDuplicate: (candidateId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        dupe: candidate.dupe && { ...candidate.dupe, status: "merged" },
      })),
    });
  },

  markNotDuplicate: (candidateId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        dupe: candidate.dupe && { ...candidate.dupe, status: "kept" },
      })),
    });
  },

  castTaVote: (candidateId, reviewerId, vote) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        ta: {
          ...candidate.ta,
          votes: [
            ...candidate.ta.votes.filter((v) => v.reviewerId !== reviewerId),
            { reviewerId, vote },
          ],
        },
      })),
    });
  },

  resolveConflict: (candidateId, resolverId, decision) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        ta: {
          ...candidate.ta,
          resolution: decision,
          resolvedBy: resolverId,
        },
      })),
    });
  },

  castFullTextVote: (candidateId, reviewerId, vote, reasonCode) => {
    // Excluding without a structured reason is not a valid record.
    if (vote === "exclude" && !canRecordExclusion(reasonCode)) return;
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => {
        const decisions = (candidate.fullText?.decisions ?? []).filter(
          (d) => d.reviewerId !== reviewerId,
        );
        return {
          ...candidate,
          fullText: {
            ...candidate.fullText,
            decisions: [
              ...decisions,
              vote === "exclude"
                ? { reviewerId, vote, reasonCode }
                : { reviewerId, vote },
            ],
          },
        };
      }),
    });
  },

  answerRobSignal: (candidateId, domainId, questionKey, answer) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateRobDomain(review, candidateId, domainId, (domain) => ({
        ...domain,
        signallingAnswers: {
          ...domain.signallingAnswers,
          [questionKey]: answer,
        },
      })),
    });
  },

  setRobJudgment: (candidateId, domainId, judgment) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateRobDomain(review, candidateId, domainId, (domain) => ({
        ...domain,
        judgment,
      })),
    });
  },

  setResearchQuestion: (question) => {
    const { review } = get();
    if (!review) return;
    set({ review: withProtocol(review, { researchQuestion: question }) });
  },

  setPicoField: (key, value) => {
    const { review } = get();
    if (!review) return;
    set({
      review: withProtocol(review, {
        pico: { ...review.protocol.pico, [key]: value },
      }),
    });
  },

  updateCriterion: (criterionId, patch) => {
    const { review } = get();
    if (!review) return;
    set({
      review: withCriteria(
        review,
        review.protocol.criteria.map((c) =>
          c.id === criterionId ? { ...c, ...patch } : c,
        ),
      ),
    });
  },

  addCriterion: (criterion) => {
    const { review } = get();
    if (!review) return;
    const id = `crit-${review.protocol.criteria.length + 1}-${criterion.kind}`;
    set({
      review: withCriteria(review, [
        ...review.protocol.criteria,
        { ...criterion, id },
      ]),
    });
  },

  removeCriterion: (criterionId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: withCriteria(
        review,
        review.protocol.criteria.filter((c) => c.id !== criterionId),
      ),
    });
  },

  approveProtocol: () => {
    const { review } = get();
    if (!review) return;
    set({ review: withProtocol(review, { status: "approved" }) });
  },

  resolveExtractionCell: (candidateId, fieldId, value) => {
    const { review } = get();
    if (!review) return;
    set({
      review: {
        ...review,
        extractions: review.extractions.map((extraction) =>
          extraction.candidateId === candidateId
            ? {
                ...extraction,
                fields: extraction.fields.map((field) =>
                  field.id === fieldId
                    ? { ...field, finalValue: value }
                    : field,
                ),
              }
            : extraction,
        ),
      },
    });
  },

  undoImport: (batchId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: {
        ...review,
        batches: review.batches.filter((batch) => batch.id !== batchId),
        candidates: review.candidates.filter(
          (candidate) => candidate.batchId !== batchId,
        ),
      },
    });
  },
}));
