import { describe, expect, it } from "vitest";
import { deriveFunnelSummary, deriveYourWork } from "../funnel";
import type { Candidate, SrReview, TaVote } from "../types";

let nextRef = 1;

function cand(
  id: string,
  votes: Array<[string, TaVote]>,
  opts: { isDuplicate?: boolean; resolution?: TaVote } = {},
): Candidate {
  return {
    id,
    refId: nextRef++,
    title: `Study ${id}`,
    authors: ["Author A"],
    source: "PubMed",
    isDuplicate: opts.isDuplicate,
    ta: {
      votes: votes.map(([reviewerId, vote]) => ({ reviewerId, vote })),
      resolution: opts.resolution,
    },
  };
}

function review(candidates: Candidate[]): SrReview {
  return {
    id: "rev-test",
    title: "SGLT2 inhibitors & heart failure",
    shortTitle: "SGLT2i & HF",
    reviewers: [
      { id: "emma", name: "Emma Reyes", initials: "ER" },
      { id: "kat", name: "Katherine Ng", initials: "KN" },
    ],
    candidates,
  };
}

const sample = review([
  cand("c1", [], { isDuplicate: true }),
  cand("c2", []),
  cand("c3", []),
  cand("c4", [["emma", "yes"]]),
  cand("c5", [["emma", "yes"], ["kat", "no"]]),
  cand("c6", [["emma", "yes"], ["kat", "yes"]]),
  cand("c7", [["emma", "no"], ["kat", "no"]]),
  cand("c8", [["emma", "no"], ["kat", "maybe"]]),
]);

describe("deriveFunnelSummary", () => {
  it("counts imports, duplicates, and the screening breakdown from votes", () => {
    const summary = deriveFunnelSummary(sample);
    expect(summary.imported).toBe(8);
    expect(summary.duplicatesRemoved).toBe(1);
    expect(summary.screening).toEqual({
      total: 7,
      done: 2,
      conflicts: 2,
      oneVote: 1,
      noVotes: 2,
    });
  });

  it("feeds advanced studies into the full-text queue", () => {
    const summary = deriveFunnelSummary(sample);
    expect(summary.fullText).toEqual({ toAssess: 1 });
  });

  it("counts each reviewer's screening contribution", () => {
    const summary = deriveFunnelSummary(sample);
    expect(summary.contributions).toEqual([
      { reviewerId: "emma", name: "Emma Reyes", screened: 5 },
      { reviewerId: "kat", name: "Katherine Ng", screened: 4 },
    ]);
  });

  it("reports how many studies the AI pre-screened and suggested to include", () => {
    const withAi = review([
      { ...cand("a1", []), aiSuggestion: "yes" },
      { ...cand("a2", []), aiSuggestion: "no" },
      { ...cand("a3", []) },
      { ...cand("a4", [], { isDuplicate: true }), aiSuggestion: "yes" },
    ]);
    const summary = deriveFunnelSummary(withAi);
    expect(summary.ai).toEqual({ preScreened: 2, suggestedInclude: 1 });
  });
});

describe("deriveYourWork", () => {
  it("tells a reviewer what they can still resolve and screen", () => {
    expect(deriveYourWork(sample, "emma")).toEqual({
      toResolve: 2,
      toScreen: 2,
      screenedSoFar: 5,
    });
  });

  it("includes one-vote studies the reviewer has not voted on yet", () => {
    expect(deriveYourWork(sample, "kat")).toEqual({
      toResolve: 2,
      toScreen: 3,
      screenedSoFar: 4,
    });
  });
});
