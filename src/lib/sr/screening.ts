import type { TaState, TaStatus, TaVote } from "./types";

function isPositive(vote: TaVote): boolean {
  return vote === "yes" || vote === "maybe";
}

/** Route a study from its blinded dual-reviewer votes (Covidence model). */
export function deriveTaStatus(ta: TaState): TaStatus {
  if (ta.resolution) {
    return isPositive(ta.resolution) ? "advanced" : "irrelevant";
  }
  const [a, b] = ta.votes;
  if (a && b) {
    if (isPositive(a.vote) && isPositive(b.vote)) return "advanced";
    if (!isPositive(a.vote) && !isPositive(b.vote)) return "irrelevant";
    return "conflict";
  }
  if (a) return "one_vote";
  return "no_votes";
}
