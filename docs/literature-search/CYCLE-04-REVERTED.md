# Cycle 4 — Acronym-collision gating — REVERTED (no-op, caught by the harness)

## Hypothesis
For trial-acronym lookups, demoting results that never mention the trial acronym
(e.g. "Intimate Partner Violence" / "CONSORT guidelines" for a `PARTNER 3` query)
would raise the trial's best-in-top-3.

## Method — the reproducible harness in action
Froze the candidate pool for 8 trial queries once (`capture-candidates.ts`), then
re-ranked the IDENTICAL pools with and without the change (`rerank-offline.ts`,
deterministic, no network). The before/after delta is therefore 100% attributable
to the code — no live-retrieval/throttling noise.

## Result — zero improvement → REVERT
| query | best-rank before → after |
|---|---|
| acronym-aristotle | 1 → 1 |
| acronym-dapa-hf | 2 → 2 |
| acronym-empa-reg | 3 → 3 |
| acronym-partner-3 | 4 → 4 |
| acronym-sprint | 4 → 4 |
| acronym-keynote-189 | 10 → 10 |
| exact-dapa-hf | 1 → 1 |

**No best-rank moved on any query.** Inspection of the `acronym-partner-3` pool:
- The genuine collisions (IPV, CONSORT, veteran mental-health) were ALREADY below
  rank 8 — the existing cross-encoder + entity-drift pipeline handles them.
- The primary (`PARTNER 3` NEJM 2019) sits at rank 4 *behind its own sub-studies*
  ("Economic Outcomes…", "Five-Year Outcomes…") — which DO mention PARTNER 3 (covered),
  so acronym-coverage cannot help. That is a *secondary-literature* ranking problem,
  not a collision problem.

**Decision: REVERTED** (uncommitted; no PR). The change is redundant with current
relevance ranking and adds complexity for no measurable gain. The unit tests for
`hasAcronymCoverage` / `demoteAcronymCollisions` were also discarded with the revert.

## Value of this cycle
The reproducible harness deterministically proved a plausible-sounding change is a
no-op on current pools. Without it, the same change run through the live harness
would have shown a ±noise swing easily misread as "it helped" or "it hurt". This is
the harness paying for itself on its first real use.

## The real `acronym-partner-3` lacuna (for a future cycle)
Primary ranked behind its own non-meta sub-studies ("Economic Outcomes", "N-Year
Outcomes") that the cycle-2 secondary-marker set does not catch (they are RCT-typed
and lack the conservative markers). Extending primary-vs-secondary detection is the
real lever — but it must NOT demote a trial whose pivotal result IS an N-year report
(e.g. long-term-outcome trials), so it needs the frozen-pool A/B to tune safely.
