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
