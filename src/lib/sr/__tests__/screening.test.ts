import { describe, expect, it } from "vitest";
import { deriveTaStatus } from "../screening";
import type { TaState } from "../types";

function ta(
  votes: Array<[string, "no" | "maybe" | "yes"]>,
  resolution?: "no" | "maybe" | "yes",
): TaState {
  return {
    votes: votes.map(([reviewerId, vote]) => ({ reviewerId, vote })),
    resolution,
  };
}

describe("deriveTaStatus", () => {
  it("advances a study when both reviewers vote positively (yes/maybe)", () => {
    expect(deriveTaStatus(ta([["emma", "yes"], ["kat", "maybe"]]))).toBe(
      "advanced",
    );
  });

  it("routes one positive vote against one No into the conflict queue", () => {
    expect(deriveTaStatus(ta([["emma", "maybe"], ["kat", "no"]]))).toBe(
      "conflict",
    );
    expect(deriveTaStatus(ta([["emma", "no"], ["kat", "yes"]]))).toBe(
      "conflict",
    );
  });

  it("marks a study awaiting the other reviewer after a single blinded vote", () => {
    expect(deriveTaStatus(ta([["emma", "yes"]]))).toBe("one_vote");
    expect(deriveTaStatus(ta([["kat", "no"]]))).toBe("one_vote");
  });

  it("removes a study as irrelevant when both reviewers vote No", () => {
    expect(deriveTaStatus(ta([["emma", "no"], ["kat", "no"]]))).toBe(
      "irrelevant",
    );
  });

  it("routes a resolved conflict by the agreed final decision", () => {
    expect(deriveTaStatus(ta([["emma", "yes"], ["kat", "no"]], "maybe"))).toBe(
      "advanced",
    );
    expect(deriveTaStatus(ta([["emma", "yes"], ["kat", "no"]], "no"))).toBe(
      "irrelevant",
    );
  });

  it("treats a study with no votes as still to screen", () => {
    expect(deriveTaStatus(ta([]))).toBe("no_votes");
  });
});
