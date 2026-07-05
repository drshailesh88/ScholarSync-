import { describe, it, expect } from "vitest";
import { gradedNdcgAtK, err, rbp, goldMapFromLabeled } from "../graded-metrics";

// gold: a=3 (highly), b=2 (relevant), c=1 (marginal), d/e = 0 (not)
const gold = new Map<string, number>([
  ["a.com", 3],
  ["b.com", 2],
  ["c.com", 1],
]);

describe("gradedNdcgAtK", () => {
  it("is 1.0 for the ideal ranking (grades descending)", () => {
    expect(gradedNdcgAtK(["a.com", "b.com", "c.com"], gold, 10)).toBeCloseTo(1, 5);
  });
  it("is lower for a worse ranking (a relevant doc buried below noise)", () => {
    const good = gradedNdcgAtK(["a.com", "b.com", "c.com"], gold, 10);
    const bad = gradedNdcgAtK(["d.com", "e.com", "a.com"], gold, 10);
    expect(bad).toBeLessThan(good);
    expect(bad).toBeGreaterThan(0);
  });
  it("rewards ranking the higher grade first", () => {
    const hiFirst = gradedNdcgAtK(["a.com", "b.com"], gold, 10);
    const loFirst = gradedNdcgAtK(["b.com", "a.com"], gold, 10);
    expect(hiFirst).toBeGreaterThan(loFirst);
  });
});

describe("err (Expected Reciprocal Rank)", () => {
  it("is higher when a highly-relevant doc leads", () => {
    const lead = err(["a.com", "d.com"], gold, 10);
    const buried = err(["d.com", "a.com"], gold, 10);
    expect(lead).toBeGreaterThan(buried);
  });
  it("is 0 when nothing relevant is retrieved", () => {
    expect(err(["d.com", "e.com"], gold, 10)).toBe(0);
  });
});

describe("rbp (Rank-Biased Precision)", () => {
  it("weights an early relevant doc more than a late one", () => {
    const early = rbp(["a.com", "x", "y"], gold, 0.8);
    const late = rbp(["x", "y", "a.com"], gold, 0.8);
    expect(early).toBeGreaterThan(late);
  });
});

describe("goldMapFromLabeled", () => {
  it("builds a url→grade map, keeping the max grade on duplicate urls", () => {
    const m = goldMapFromLabeled([
      { url: "a.com", grade: 2 },
      { url: "a.com", grade: 3 },
      { url: "b.com", grade: 0 },
    ]);
    expect(m.get("a.com")).toBe(3);
    expect(m.get("b.com")).toBe(0);
  });
});
