# Cycle 1 — Off-entity drift demotion (Tier-1 #2)

## Lacuna (from the blind baseline)
Manan's biggest blinded-council losses concentrated on **off-entity drift the
cross-encoder cannot discriminate**: `broad-hfref-management` returned HF**p**EF
(preserved EF) papers for an HF**r**EF query (council mean 2.78, the worst single
query); `recency-semaglutide-cv-2025` was contaminated with tirzepatide/HFpEF;
`sr-statins-primary-prevention` mixed in secondary-prevention work. These papers
share most surface terms with the query and ride high citation/journal priors into
the top-10, so the Cohere cross-encoder rates them as relevant.

## Change (ONE coherent, TDD)
New pure module `src/lib/search/entity-drift.ts`: `entityDriftPenalty(query, result)`
→ multiplier in (0,1]. Two bounded, table-driven rules:
1. **Contrastive subtype** — query names exactly ONE member of a contrast group
   (reduced vs preserved vs mid-range EF; primary vs secondary prevention;
   conservative vs liberal oxygen) and the result TITLE names a DIFFERENT member
   (and not the queried one) → ×0.65.
2. **Off-specific-drug** — non-comparison query naming exactly ONE specific drug of
   a class (GLP-1 / SGLT2 / statins), result title about a DIFFERENT drug of the
   same class and not the class itself → ×0.80.
Exempt: comparison queries (name two members), class-level queries, and results
that cover the queried entity or are class-level reviews. Wired into
`quality-ranker.ts` as a multiplicative factor on the composite (traceable via a
new `RankingTrace.entityDrift`), and surfaced as an `off_topic_entity` flag in
`pipeline.ts`. 13 unit tests (RED→GREEN), incl. counter-examples proving no fire
for comparisons/class queries.

## Result (keep)
| signal | baseline | cycle 1 | verdict |
|---|---|---|---|
| deterministic recall@10 | 88% | 88% | held (no must-have lost) |
| deterministic best-in-top-3 | 67% | 67% | held |
| deterministic head-to-head vs Elicit | 2/2/8 | 2/2/8 | held |
| blinded council beat-or-tie | 65% | **68%** | improved |
| council Manan / Elicit / tie | 20/12/2 | 19/11/4 | Elicit wins ↓ |
| `broad-hfref-management` council Manan-mean | 2.78 | **3.50** | HFpEF demoted out |
| `sr-statins-primary-prevention` | Elicit 4.11/4.33 | **Manan 4.78/3.61** | flipped |

**Decision: KEEP.** The change is conservative by construction (only demotes a
paper about a *different* subtype/drug than asked — never a correct answer for that
query), deterministically tested, holds all ground-truth metrics, and directly
fixes the two clearest losses. Verified by direct ranking inspection: the
Spironolactone-HFpEF / SPIRRIT-HFpEF / HFpEF-population papers left the
`broad-hfref` top-10; the "Preserved **and** Reduced EF" paper correctly stayed.

## Honest caveat — harness noise (next-cycle priority)
The eval hits **live** PubMed/OpenAlex/Cohere, so two runs differ even on queries
the code never touches (new papers, candidate-pool drift, Cohere variance), and the
council is re-rolled per run. Several council majority "flips" (`recency-lecanemab`,
`recency-cart-myeloma`) are on rankings entity-drift provably never altered → pure
judge/API noise. This makes small cycle-to-cycle deltas hard to read and threatens
the Stop criterion "deterministic metrics move <2% between cycles," which **requires
a reproducible harness**. **Next priority:** cache raw upstream candidates per query
so re-ranking is deterministic and councils can be PAIRED (same pool, A=old ranker /
B=new ranker), isolating the code change from API/judge noise. Aligns with Tier-1 #1
(OpenAlex pacing/cache) and backlog #16/#17.
