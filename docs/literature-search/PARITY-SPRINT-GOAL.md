# Parity Sprint — continuous quality-ratchet goal (Manan OS literature search)

> Reconciles three prompts into ONE looping goal: a blinded LLM council, a larger
> multi-specialty benchmark, mainstream-weighted quality gates, and a concrete
> Tier 1/2/3 technical roadmap. Run via `/goal` with the companion one-liner.
> The loop keeps running until the Stop Criteria hold.

## Objective
Make Manan OS literature search **consistently excellent for mainstream biomedical
use** — landmark trials, landmark papers, systematic reviews / meta-analyses, and
major guidelines — at or above Elicit quality, judged by a **blinded** LLM council
plus deterministic metrics. **Do not over-optimize exotic edge cases at the cost of
mainstream landmark/guideline retrieval.** A change that improves edge cases but
worsens any mainstream class is a BAD change — revert it.

## Scope
Biomedical/clinical literature search quality only: retrieval, source selection,
query planning, MeSH/PICO expansion, metadata normalization/repair, dedupe,
reranking, provenance, explanations, evaluation, and MCP output quality. Do not
refactor unrelated modules.

## Operating model: a continuous ratchet loop
Each cycle: (1) ensure/extend the benchmark, (2) run Manan + Elicit, (3) deterministic
metrics + blinded council, (4) identify the highest-impact lacunae, (5) plan, (6) make
ONE coherent change, (7) targeted eval → full eval → council, (8) keep only if metrics
AND council improve with no mainstream regression (else revert), (9) when no major
lacunae remain, add 25–50 fresh unseen queries and repeat. Loop until Stop Criteria.

### Phase 0 — one-time blind baseline (independent bias check)
On first entry ONLY: before reading any prior parity/council/benchmark *result*
summaries, run an independent baseline + diagnosis of current Manan vs Elicit on a
first benchmark batch, and record it. You MAY read implementation code and tests. AFTER
the blind baseline is recorded, read the prior work to avoid re-doing solved problems:
`docs/literature-search/{SESSION-2026-06-PARITY-RERUN.md,NEXT-PHASE-GOAL.md,BACKLOG.md,ETIOLOGY.md,ARCHITECTURE.md,SOURCE-MATRIX.md,SEARCH-METHODOLOGY-RESEARCH.md}`
and `/tmp/manan-elicit-parity-handoff.md`. From then on, build incrementally on the
confirmed floor (do not re-derive). Treat the blind baseline as the unbiased starting line.

### Phase 1 — research (parallel agents, if available)
Spawn parallel research agents to investigate, then write a findings report
(`docs/literature-search/RESEARCH-FINDINGS.md`): biomedical IR methods; PubMed/MeSH/PICO
expansion; scholarly/clinical reranking (incl. MedCPT); OSS for biomedical search,
entity extraction, citation repair, dedupe, ranking; PubMed/Crossref/OpenAlex/
ClinicalTrials.gov/Europe PMC/SearXNG/Tavily approaches; LLM-as-judge failure modes.
If "Rishad's agent findings" exist in the repo or are provided, triage them into
**incorporate / reject / needs-council-decision**. Verify any library/API with Context7
before adopting.

## Benchmark (build once, then ratchet)
Author a NEW benchmark ≥ **75 queries** (extend the existing 34; keep the seed
"TAVR low risk six year outcomes"). Save fixtures + per-query artifacts (Elicit top-10,
Manan top-10, raw upstream candidates, normalized candidates, final ranking, provenance,
eval outputs, must-have papers where identifiable).

**Multi-specialty:** cardiology (incl. TAVR low-risk), oncology, neurology, infectious
disease, endocrinology, nephrology, psychiatry.

**Query types:** exact-paper lookup; exact title with punctuation variants; DOI/PMID
lookup; trial-acronym lookup; trial-family (PARTNER, Evolut, NOTION…); broad clinical;
PICO; recency-sensitive; long-term outcomes; safety/adverse events; device/drug
comparison; guidelines; SR/MA; landmark-RCT retrieval; ambiguous acronyms;
**negative controls** (famous-but-irrelevant papers must NOT rank).

**Weighting (do not let edge cases dominate):** 50% mainstream clinical · 20%
landmark-trial / trial-family · 15% guidelines + SR/MA · 10% recency · 5% adversarial.

**Ratchet:** each cycle add 25–50 fresh, previously-unseen queries preserving the weighting.

## Deterministic metrics (compute where feasible, per cycle)
recall@10 vs must-haves · best-paper rank · best-in-top-3 · nDCG@10 · MRR · DOI fill ·
PMID fill · duplicate rate · irrelevant-top-10 rate · source-failure rate · latency ·
recency correctness · metadata-hallucination rate.

## Blinded LLM council (governance — STRICT)
Members: fresh-context **Opus + Codex + a cross-family third** (Grok if available; else
Gemini; else DeepSeek). Isolation rules:
- Judges see ONLY: the query, **anonymized Engine A / Engine B** top-10 outputs,
  source/provenance traces, deterministic metrics, and the rubric.
- **Randomize/blind the engine labels per query** (A/B), so no judge knows which is Manan.
- Judges must NOT see builder reasoning/scratchpads or any other judge's vote; each votes
  independently, then aggregate by majority.
- Persist judge prompts, visible inputs, per-judge scores, and the final decision under
  `eval/literature-search/council/<cycle>/`.
- Run ONE council per genuine change (or per cycle) — never re-roll a noisy council.
- Rubric, score 0–5: recall · ranking · clinical relevance · evidence-hierarchy/study-type ·
  PICO match · metadata correctness/completeness · provenance/trust · explanation quality ·
  usefulness to clinician/researcher.

## Quality gates (must hold to pass a cycle)
- Landmark must-have in top-10 for ≥ **95%** of landmark queries
- Best/canonical paper in top-3 for ≥ **85%**
- DOI fill ≥ **98%** · PMID fill ≥ **90%** (where PubMed-indexed)
- Duplicate rate ≤ **2%** · irrelevant-top-10 ≤ **5%**
- Zero hallucinated metadata · provenance present on every result · explanations specific
  to the paper and query

## Prioritized technical backlog (the menu the loop pulls from)
Pick the highest-impact lacuna each cycle; put significant methodology choices to the council.
**Tier 1 (close current gaps):**
1. **Dense semantic-lane reliability** — OpenAlex `search.semantic` is server-throttled, so
   the 5s fan-out deadline (`run-search.ts FANOUT_DEADLINE_MS`) drops it on ~18% of queries
   and dense landmarks vanish from the pool. Give it a dedicated rate budget / its own
   circuit breaker / lane-specific deadline; re-validate p95.
2. **PICO intervention+outcome entity matching** — extend `query-expander.ts SYNONYM_MAP`
   into an entity matcher; gently demote off-intervention/off-outcome drift WITHOUT hurting
   comparison/safety queries.
3. **Broad-query curation** — prioritize high-quality reviews/guidelines for broad overview intent.
**Tier 2 (exceed Elicit):**
4. **Multi-query / HyDE expansion** in `query-planner.ts` (principled fix for landmarks
   absent from the pool, e.g. PARTNER 3). The landmark-map hack is REJECTED.
5. **MedCPT** (NCBI biomedical reranker) behind a Python/HF **sidecar**; A/B vs Cohere.
6. **Full-text + structured extraction** (Unpaywall PDF → chunk → PICO/outcomes/effect-sizes table).
**Tier 3 (productionize):**
7. Surface `whyRelevant`/`flags`/`rankingTrace`/retrieval-path in the UI.
8. PR-D latency: error-rate breaker + bulkhead (`cockatiel`) + streaming (NDJSON/SSE).

## Parallelization: worktree vs serial (READ THIS)
- **Core ranking/retrieval = ONE serial lane.** All edits to `run-search.ts`, `pipeline.ts`,
  `quality-ranker.ts`, `query-planner.ts`, `rerank.ts` happen one change at a time. Do NOT
  run two agents editing these concurrently.
- **Parallel-safe in separate git worktrees:** benchmark authoring, the MedCPT sidecar
  (new Python service), full-text extraction (new module), UI surfacing, and research.
  These are new files/services; their *integration* into the core lane still serializes.
- **Never run two full benchmarks/councils at once** — PubMed/OpenAlex/Elicit/Cohere quotas
  are shared; concurrent runs cause 429 storms (the very reliability bug Tier-1 #1 fixes).
  Pace eval runs sequentially.

## Hard constraints
Elicit only in eval, never a runtime path. No hardcoding/overfitting to game the benchmark.
Semantic Scholar optional (degrade gracefully). Missing metadata flagged, never invented.
Every result exposes provenance; every ranking is traceable/explainable. Prefer stable
primary sources: PubMed/NCBI, Crossref, OpenAlex, ClinicalTrials.gov, Europe PMC, publisher
DOI pages, official guideline sites. Cache + trace aggressively for reproducibility. No
hardcoded secrets — `op-run --` only (`PUBMED_API_KEYS`, `OPENALEX_API_KEY`, `COHERE_API_KEY`,
`TAVILY_API_KEY`, `ELICIT_API_KEY`, `DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`).
Verify library/API docs with Context7 before adding deps. Production-quality, fully
unit-tested (TDD: RED→GREEN), CI-green before merge; commit each change on a feature branch
and open a PR.

## Deliverables (each cycle)
benchmark batch · lacunae report · implementation plan · executed change(s) · targeted eval ·
full eval · blinded council judgment + decision log · keep/revert decision · next-cycle harder
query plan. Maintained docs: baseline report, research findings, before/after/Elicit report,
dependency matrix (required/optional/fallback/rejected), backlog.

## Stop Criteria (end the loop only when ALL hold)
Stop after **3 consecutive cycles** where:
- Manan beats or ties Elicit by **blinded council majority on ≥ 80%** of benchmark queries,
- ALL quality gates pass,
- no critical lacunae found,
- deterministic metrics change by **< 2%** between cycles (converged),
- no mainstream query class regresses.
Then produce the final report + backlog. If a residual gap genuinely requires
full-text/proprietary data the system cannot obtain, document it explicitly and treat it
as out-of-scope rather than looping forever.

## Definition of Done
Manan OS matches or beats Elicit on **most** benchmark queries by **blinded** LLM-council
majority, deterministic metrics improve or hold, all quality gates pass, and there are no
critical regressions in citation reliability, metadata correctness, clinical relevance,
provenance, or reproducibility — sustained across 3 stable cycles.
