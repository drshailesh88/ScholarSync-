import { beforeEach, describe, expect, it } from "vitest";
import { useSrStore } from "../sr-store";
import { deriveDupeQueue, deriveImportLedger } from "@/lib/sr/import";
import { deriveFunnelSummary } from "@/lib/sr/funnel";

function store() {
  return useSrStore.getState();
}

describe("sr-store", () => {
  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    store().initReview("sglt2-hf");
  });

  it("hydrates a review once per id and keeps state on re-init", () => {
    const before = store().review;
    store().initReview("sglt2-hf");
    expect(store().review).toBe(before);
    expect(store().reviewId).toBe("sglt2-hf");
  });

  it("merging an uncertain duplicate removes it from the pool and counts it", () => {
    const queue = deriveDupeQueue(store().review!);
    const target = queue[0].candidate.id;

    store().mergeDuplicate(target);

    const review = store().review!;
    expect(deriveDupeQueue(review)).toHaveLength(queue.length - 1);
    expect(deriveImportLedger(review).totalDuplicatesRemoved).toBe(25);
    expect(deriveFunnelSummary(review).screening.total).toBe(387);
  });

  it("keeping a record marks the pair resolved without shrinking the pool", () => {
    const queue = deriveDupeQueue(store().review!);
    const target = queue[0].candidate.id;

    store().markNotDuplicate(target);

    const review = store().review!;
    expect(deriveDupeQueue(review)).toHaveLength(queue.length - 1);
    expect(deriveImportLedger(review).totalDuplicatesRemoved).toBe(24);
    expect(deriveFunnelSummary(review).screening.total).toBe(388);
  });

  it("casting a blinded vote records it for the current reviewer", () => {
    const anker = store().review!.candidates.find((c) => c.refId === 2241)!;
    expect(anker.ta.votes).toHaveLength(0);

    store().castTaVote(anker.id, "you", "yes");

    const after = store().review!.candidates.find((c) => c.refId === 2241)!;
    expect(after.ta.votes).toEqual([{ reviewerId: "you", vote: "yes" }]);
  });

  it("re-voting replaces the reviewer's own vote instead of stacking", () => {
    const anker = store().review!.candidates.find((c) => c.refId === 2241)!;
    store().castTaVote(anker.id, "you", "yes");
    store().castTaVote(anker.id, "you", "no");

    const after = store().review!.candidates.find((c) => c.refId === 2241)!;
    expect(after.ta.votes).toEqual([{ reviewerId: "you", vote: "no" }]);
  });

  it("resolving a conflict records the agreed final decision and routes it", () => {
    const conflict = store().review!.candidates.find(
      (c) => c.refId === 1904,
    )!;

    store().resolveConflict(conflict.id, "you", "yes");

    const after = store().review!.candidates.find((c) => c.refId === 1904)!;
    expect(after.ta.resolution).toBe("yes");
    expect(after.ta.resolvedBy).toBe("you");
  });

  it("records a full-text include for the current reviewer", () => {
    const dapa = store().review!.candidates.find((c) => c.refId === 1660)!;
    store().castFullTextVote(dapa.id, "you", "include");
    const after = store().review!.candidates.find((c) => c.refId === 1660)!;
    expect(after.fullText?.decisions).toContainEqual({
      reviewerId: "you",
      vote: "include",
    });
  });

  it("refuses a full-text exclude with no structured reason", () => {
    const dapa = store().review!.candidates.find((c) => c.refId === 1660)!;
    const before = dapa.fullText?.decisions.length ?? 0;
    store().castFullTextVote(dapa.id, "you", "exclude");
    const after = store().review!.candidates.find((c) => c.refId === 1660)!;
    expect(after.fullText?.decisions.length).toBe(before);
  });

  it("records a full-text exclude with a reason code", () => {
    const dapa = store().review!.candidates.find((c) => c.refId === 1660)!;
    store().castFullTextVote(dapa.id, "you", "exclude", "wrong_design");
    const after = store().review!.candidates.find((c) => c.refId === 1660)!;
    expect(after.fullText?.decisions).toContainEqual({
      reviewerId: "you",
      vote: "exclude",
      reasonCode: "wrong_design",
    });
  });

  it("resolving an extraction cell clears the conflict with a final value", () => {
    const emperor = store().review!.candidates.find((c) => c.refId === 2241)!;
    store().resolveExtractionCell(emperor.id, "sample_size", "5,988");

    const extraction = store().review!.extractions.find(
      (e) => e.candidateId === emperor.id,
    )!;
    const field = extraction.fields.find((f) => f.id === "sample_size")!;
    expect(field.finalValue).toBe("5,988");
  });

  it("undoing an import removes the whole batch from the review", () => {
    store().undoImport("batch-ai");

    const review = store().review!;
    expect(deriveFunnelSummary(review).imported).toBe(412 - 56);
    expect(deriveImportLedger(review).batches.map((b) => b.id)).toEqual([
      "batch-pubmed",
      "batch-embase",
    ]);
  });
});
