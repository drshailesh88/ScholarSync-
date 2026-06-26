// eval/web-search/council/__tests__/aggregate-blinded.test.ts
import { describe, it, expect } from "vitest";
import { deanon, majority, aggregate } from "../aggregate-blinded";
import type { Verdict } from "../judge-schema";
import { BENCHMARK_QUERIES } from "../../queries";

const sc = { relevance: 4, authority: 4, recency: 4, diversity: 4, dedup: 4, usefulness: 4 };
const verdict = (id: string, winner: "A" | "B" | "tie"): Verdict => ({
  perQuery: [{ id, A: sc, B: sc, winner }],
  overall: { winner, summary: "s" },
});

describe("deanon", () => {
  it("maps blinded A/B back to ours/exa via the key", () => {
    expect(deanon("ours", "A")).toBe("ours");
    expect(deanon("ours", "B")).toBe("exa");
    expect(deanon("exa", "A")).toBe("exa");
    expect(deanon("exa", "B")).toBe("ours");
    expect(deanon("tie" as never, "tie")).toBe("tie");
  });
});

describe("majority", () => {
  it("returns the plurality winner, tie on a draw", () => {
    expect(majority(["ours", "ours", "exa"])).toBe("ours");
    expect(majority(["ours", "exa"])).toBe("tie");
  });
});

describe("aggregate", () => {
  const id = "news-h5n1-dairy"; // a news-tab query in the seed set
  const queriesById = new Map(BENCHMARK_QUERIES.map((q) => [q.id, q]));
  it("de-anonymizes, takes per-query majority, and tallies beat-or-tie per tab", () => {
    // key says ours is 'A'; two judges pick 'A' (=ours), one picks 'B' (=exa) → majority ours.
    const res = aggregate({
      key: { aIs: { [id]: "ours" } },
      verdicts: { opus: verdict(id, "A"), codex: verdict(id, "A"), grok: verdict(id, "B") },
      queriesById,
    });
    const row = res.rows.find((r) => r.id === id)!;
    expect(row.majority).toBe("ours");
    expect(res.tally.ours).toBe(1);
    expect(res.perTab.news.beatTie).toBe(1);
    expect(res.pctBeatTie).toBe(100);
  });

  it("de-anonymizes per-engine mean scores by aIs (A-scores → ours when ours is A)", () => {
    const hi = { relevance: 5, authority: 5, recency: 5, diversity: 5, dedup: 5, usefulness: 5 };
    const lo = { relevance: 3, authority: 3, recency: 3, diversity: 3, dedup: 3, usefulness: 3 };
    const v = (): Verdict => ({ perQuery: [{ id, A: hi, B: lo, winner: "A" }], overall: { winner: "A", summary: "s" } });
    const res = aggregate({ key: { aIs: { [id]: "ours" } }, verdicts: { opus: v(), codex: v(), grok: v() }, queriesById });
    const row = res.rows.find((r) => r.id === id)!;
    expect(row.oursMean).toBe(5);
    expect(row.exaMean).toBe(3);
  });
});
