import { describe, it, expect } from "vitest";
import { ndcgAtK, recallAtK, meanIgnoringNull, type Qrels } from "../beir-score";

// qrels: d1 highly relevant (2), d2 relevant (1), others unjudged (0).
const qrels: Qrels = new Map([
  ["d1", 2],
  ["d2", 1],
  ["d0", 0],
]);

describe("ndcgAtK (graded, linear gain, trec_eval convention)", () => {
  it("matches a hand-computed value", () => {
    // ranking [d3(0), d1(2), d2(1)]:
    //   DCG  = 0/log2(2) + 2/log2(3) + 1/log2(4) = 1.26186 + 0.5 = 1.76186
    //   IDCG = 2/log2(2) + 1/log2(3)             = 2 + 0.63093   = 2.63093
    //   nDCG = 0.66970
    const ndcg = ndcgAtK(["d3", "d1", "d2"], qrels, 3);
    expect(ndcg).not.toBeNull();
    expect(ndcg!).toBeCloseTo(0.6697, 4);
  });

  it("is 1.0 for the ideal ranking", () => {
    expect(ndcgAtK(["d1", "d2", "d0"], qrels, 3)!).toBeCloseTo(1.0, 6);
  });

  it("truncates at k", () => {
    // At k=1 only d3 (irrelevant) counts → DCG 0 → nDCG 0.
    expect(ndcgAtK(["d3", "d1", "d2"], qrels, 1)!).toBeCloseTo(0, 6);
  });

  it("returns null when the query has no positively judged docs", () => {
    expect(ndcgAtK(["a", "b"], new Map([["x", 0]]), 10)).toBeNull();
  });
});

describe("recallAtK (relevant = grade > 0)", () => {
  it("counts relevant docs retrieved over total relevant", () => {
    expect(recallAtK(["d3", "d1", "d2"], qrels, 3)!).toBeCloseTo(1.0, 6); // both found
    expect(recallAtK(["d3", "d1"], qrels, 2)!).toBeCloseTo(0.5, 6); // only d1 of {d1,d2}
    expect(recallAtK(["d3"], qrels, 1)!).toBeCloseTo(0, 6);
  });

  it("ignores graded value, only presence matters", () => {
    expect(recallAtK(["d2", "d1"], qrels, 100)!).toBeCloseTo(1.0, 6);
  });

  it("returns null when there are no relevant docs", () => {
    expect(recallAtK(["a"], new Map([["x", 0]]), 10)).toBeNull();
  });
});

describe("meanIgnoringNull", () => {
  it("averages only non-null values", () => {
    expect(meanIgnoringNull([1, null, 0])!).toBeCloseTo(0.5, 6);
    expect(meanIgnoringNull([null, null])).toBeNull();
  });
});
