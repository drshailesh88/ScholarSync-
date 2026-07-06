import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { cohensKappa, deriveConflictQueue } from "../conflicts";
import type { TaState } from "../types";

function ta(votes: Array<[string, "no" | "maybe" | "yes"]>): TaState {
  return { votes: votes.map(([reviewerId, vote]) => ({ reviewerId, vote })) };
}

describe("cohensKappa", () => {
  it("computes agreement on the include/exclude collapse of dual votes", () => {
    // 2 agree-include, 1 agree-exclude, 1 disagree → κ = 0.5 (moderate).
    const states = [
      ta([["a", "yes"], ["b", "maybe"]]),
      ta([["a", "yes"], ["b", "yes"]]),
      ta([["a", "no"], ["b", "no"]]),
      ta([["a", "yes"], ["b", "no"]]),
    ];
    const result = cohensKappa(states);
    expect(result.value).toBeCloseTo(0.5, 4);
    expect(result.label).toBe("Moderate");
  });

  it("ignores studies without two votes", () => {
    const result = cohensKappa([ta([["a", "yes"]]), ta([])]);
    expect(result.value).toBeNull();
    expect(result.label).toBe("Not enough data");
  });

  it("reports perfect agreement as 1.0", () => {
    const result = cohensKappa([
      ta([["a", "yes"], ["b", "yes"]]),
      ta([["a", "no"], ["b", "no"]]),
    ]);
    expect(result.value).toBe(1);
    expect(result.label).toBe("Almost perfect");
  });
});

describe("deriveConflictQueue", () => {
  const review = createMockReview();
  const queue = deriveConflictQueue(review);

  it("collects decision conflicts (one positive vs one No)", () => {
    expect(queue.decision).toHaveLength(74);
    expect(queue.reason).toHaveLength(0);
  });

  it("stays blinded — surfaces who voted, never what", () => {
    const first = queue.decision[0];
    expect(first.voters.map((v) => v.name).sort()).toEqual([
      "Emma Reyes",
      "Katherine Ng",
    ]);
    expect(JSON.stringify(first)).not.toMatch(/"vote"/);
  });

  it("reports a kappa readout for the review", () => {
    expect(queue.kappa.value).toBeGreaterThan(0);
    expect(queue.kappa.value).toBeLessThan(1);
    expect(typeof queue.kappa.label).toBe("string");
  });

  it("puts the DELIVER exemplar first in the decision queue", () => {
    expect(queue.decision[0].candidate.refId).toBe(1904);
  });
});
