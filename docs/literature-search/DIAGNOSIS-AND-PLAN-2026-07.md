# Academic Search — Diagnosis & Rebuild Plan (2026-07)

Consolidated from four parallel audits (live-pipeline trace, eval-harness autopsy,
competitor teardowns, IR-literature + OSS survey). This is the reference doc for the
academic-retrieval rebuild. Scope: academic/literature lane only (not web/news/discussions).

---

## Bottom line

The ingredients are right; the wiring is wrong. A MedCPT-embedded PubMed corpus in
turbopuffer is the exact architecture NCBI, Ai2 (SPECTER2), and Exa converged on, and
MedCPT is SOTA for zero-shot biomedical retrieval. Output is mediocre because of three
self-inflicted wounds, not because of the sources.

1. **We optimized a benchmark that cannot see the real problem.** The 87-query harness
   freezes the candidate pool and measures *reordering only*. First-stage recall — the
   biggest quality lever per all the research — is structurally invisible to it.
2. **The ranker dilutes and out-competes its own best signal.** The cross-encoder rescores
   only the top 50, but ranking runs over the full 150–250 pool, so saturated lexical
   scores (~1.0) beat calibrated model scores (0.4–0.7). A rank-55 keyword match can
   out-rank a rank-5 reranked paper.
3. **The signals the ranker weights are mostly empty.** Citation counts are hardcoded to 0
   in most sources; the OpenAlex backfill that fixed this was dropped and is now dead code.

The "leads Elicit 47/29/11" headline is a below-gate result reframed as a win: it is 67%
beat-or-tie against the project's own 80% gate, judged on **titles with no abstracts** and
**with the answer key handed to the judges**. On the seed TAVR query, Manan still misses
PARTNER 3 entirely and loses to Elicit — inside that same "winning" run.

Env note (verified 2026-07): OPENROUTER_API_KEY, COHERE_API_KEY, SERPAPI_API_KEY,
SPRINGER_API_KEY, ELSEVIER_API_KEY are all set in Vercel Production. The reranker key is
live — so the problem is dilution (wound #2), not a dead key.

---

## Diagnosis A — the eval is a rerank harness mistaken for a retrieval harness

- **Frozen pool = rerank-only.** `eval/literature-search/candidate-cache.ts` content-addresses
  the post-enrichment pool by `sha1(query + sources + year-window)` and replays it (30-day TTL).
  Every CYCLE (04/05/06, HyDE, MMR, floor A/Bs) measured reordering. A paper missing from the
  pool is invisible and unrecoverable. `REPRODUCIBLE-HARNESS.md` states this limit itself.
- **Live runs distrusted.** The one instrument that could catch recall drift (unfrozen live
  runs) is repeatedly dismissed as "throttle noise" — biasing the harness against seeing recall misses.
- **Headline is below-gate.** `council-2026-06-owned/council-summary.json`: `pctBeatTie:67` vs an
  ≥80% gate. Deterministic `remeasure-owned`: recall@10 **0.851** (gate 0.95 ✗), best-in-top-3
  **0.784** (gate 0.85 ✗). Both quality metrics fail the project's own gates.
- **Judges see less than a user.** `build-blinded-packet.ts` renders top-10 as title+year+venue+
  PMID+DOI only — no abstracts, studyType/citedByCount stripped — yet judges score clinical
  relevance and trust from titles. Blinding alone dropped one packet 74%→65%.
- **Council "recall" is not independent** — the rubric prints the must-have answer key above each
  query, so it re-derives the deterministic metric.
- **Overfitting: real, disciplined, non-transferable.** ~3.5 of 14 ranking modules (~40–50% of
  claimed ranking gain) are reverse-engineered from named benchmark failures: `entity-drift.ts`
  (hardcoded tirzepatide/empagliflozin/dapagliflozin tables), `trial-ranking.ts`
  (SECONDARY_TITLE_MARKERS built to demote PARTNER 3 sub-reports), query-planner skip-list. To
  their credit: no `if id===` cheats, all table-driven+gated, CYCLE-04 reverted when it showed no
  gain. But the vocabulary is cardiology/endo/onc-specific and the multi-domain tables are EMPTY —
  the headline wins do not transfer. The ralph-search scorecard self-grades 19 cycles at 9.8–10/10
  on the same SGLT2/HF vocabulary it was tuned on.

## Diagnosis B — the live pipeline (top root causes, ranked)

1. **Lexical vs model relevance share one sort.** Rerank touches `fused.slice(0,50)` but
   `rankAndAnnotate` runs on the full pool (`run-search.ts:784,819`); papers past 50 fall back to
   lexical relevance which saturates ~1.0 and out-competes calibrated 0.4–0.7 model scores. Genuine
   inversion. **Fix: rerank the whole ranked pool, or truncate the pool to exactly what was reranked.**
2. **Citation/journal signals near-zero.** citationCount hardcoded 0 in pubmed/springer/medcpt/crossref;
   real only from EuropePMC + key-gated Scopus. `enrichCitationsByIds` (OpenAlex) has zero non-test
   callers — dead. So the "metadata-dominant" composite collapses to ~0.70·relevance + 0.20·rrf.
3. **`isTrialLookup` fires on the bare word "trial"** (`query-planner.ts:200`) → skips rerank AND
   applies trial demotions to broad evidence queries. **Fix: gate on acronym/NCT only.**
4. **Relevance double-counted** — 0.50 linear weight AND a multiplicative gate on the noisiest signal.
5. **Scopus STANDARD view = no abstracts** (`scopus.ts:154`) → title-only docs dilute the pool and
   rerank budget; never sets studyType/pmid.
6. **Study-type blank for most non-PubMed candidates** → high-evidence papers default to Level V.
7. **Shallow, lexical-heavy recall** — 25/source, dense floor capped at 50, three of four lexical
   lanes send no sort param; dense backbone infra-gated on Modal+Turbopuffer.
8. **Reranker input truncated to 2000 chars** (`rerank.ts:41,47`) → structured abstracts lose
   Results/Conclusions, degrading the 0.50-weight signal.
9. **≥3-result cache guard + 1h TTL** can pin a thin/mediocre throttle-window result for everyone.
10. **Dedup keeps first-seen (PubMed-first) as primary**, merging richer records onto poorer ones
    (source-order wins, not richest-record wins).

**Through-line:** the last ~10 commits (#111–#120) added ranking sophistication while thinning the
substrate the rankers depend on (dropped OpenAlex citations, abstract-less Scopus, hardcoded
study-type/citation to zero, capped recall). A ranker can only sort what retrieval gives it.

**Docs actively mislead:** ARCHITECTURE.md / SOURCE-MATRIX.md describe the pre-#111 pipeline
(OpenAlex default, MedCPT reranker primary, relevance 0.30 not 0.50). Reconcile or delete.

---

## What the good engines do (competitor + literature, independently convergent)

Universal, table-stakes pattern (PubMed Best Match, S2, Elicit, Consensus, Perplexity, OpenScholar,
PaperQA2, Undermind): **hybrid retrieve (BM25 + dense, RRF-fused) → cross-encoder rerank a small
top-k → fold in citation + recency + venue + STUDY-TYPE → LLM re-score/summarize the final ~20.**
Missing any of these is a bug relative to the field. We are missing the BM25 lane, our rerank is
diluted, our quality signals are empty — three of five.

Differentiators (deep-search tier): adaptive agentic loop that reformulates from what it found;
**PaperQA2 RCS** (LLM scores each candidate 1–10 + writes a query-focused summary — the mechanism
behind its superhuman precision); Undermind's discovery-curve stopping rule; citation-graph traversal
for recall; LLM query understanding (NL/PICO → keyword queries per API, fixes PubMed/Scopus choking
on question-like input); Scite-style supporting/contradicting evidence signal (medical moat).

Legally stealable (Apache-2.0/MIT/public-domain, provider-agnostic → re-point onto OpenRouter/MedCPT):
- **ncbi/MedCPT** (public domain) — deploy the matched cross-encoder reranker we already have embeddings for.
- **Future-House/paper-qa** (Apache-2.0) — RCS pipeline + agent tool structure. Highest-value single lift.
- **AkariAsai/OpenScholar** (Apache-2.0) — self-feedback retrieval loop + science-tuned BGE reranker.
- **castorini/pyserini + rank_llm** (Apache-2.0) — BM25+dense fusion, RRF, listwise LLM rerank, BEIR eval.
- **beir-cellar/beir** (Apache-2.0) — TREC-COVID/NFCorpus/BioASQ/SciFact regression harness.
- **FlagOpen/FlagEmbedding** (MIT), **titipata/pubmed_parser** (MIT), **allenai/specter2 + SciNCL** — citation-proximity embeddings for the "similar papers" / landmark channel.

Full research: `scratchpad/biomedical-retrieval-playbook.md` (also mirrored in chat transcript).

---

## The plan (decisions locked with the owner)

Owner decisions: (1) **eval honesty first**; (2) overfit heuristics **frozen, deleted as replaced**;
(3) corpus-vs-federation **decided after the recall probe**.

### Phase 0 — make the eval honest (BEFORE any ranking change)
Everything else is unfalsifiable until this exists.
- **Unfrozen first-stage recall probe.** Separate "must-have present ANYWHERE in the pool" from
  "in top 10", averaged over N runs to beat throttle noise. This is the instrument the harness
  never had — and it also answers the corpus-vs-federation question (which lane is missing the
  landmark papers).
- **BEIR biomedical regression harness** (TREC-COVID / NFCorpus / BioASQ / SciFact): nDCG@10,
  Recall@100. Accept/reject every future change on these numbers.
- **Held-out query set** the pipeline was never tuned on; forbid CYCLE heuristics from referencing it.
- **Honest council**: show judges abstracts (or stop scoring relevance); stop handing them the answer
  key for the recall dimension; report the below-gate number as below-gate.
- **Sample real user queries** + add a non-clinical/multi-domain slice.

### Phase 1 — fix what we already own (highest impact ÷ effort; gated on Phase 0 metrics)
- Add BM25 lexical lane; RRF-fuse with MedCPT dense.
- Fix score-blending: rerank the whole ranked pool (or truncate pool to reranked set); stop averaging
  raw reranker into raw quality.
- Restore ONE citation/metadata source (rewire `enrichCitationsByIds` or re-add OpenAlex as default lane).
- Deploy the free `ncbi/MedCPT-Cross-Encoder` alongside/instead of Cohere; A/B on BEIR-biomedical.
- Narrow `isTrialLookup` to acronym/NCT; raise reranker char cap / smarter abstract slice; fix or drop Scopus.

### Phase 2 — precision jump
- LLM query understanding (NL/PICO → keyword queries per source).
- RCS contextual scoring on the reranked top-k.

### Phase 3 — differentiator tier (behind a "deep search" mode)
- Citation-graph traversal for recall; quality gate that re-queries instead of serving weak results;
  adaptive loop with Undermind-style saturation stopping.

Delete the overfit heuristic pile as the general pipeline demonstrably covers its cases.

### Guardrails
- No ranking change ships without moving the honest Phase-0 metrics (recall floor + BEIR + held-out).
- Every ranking signal must appear in `rankingTrace` (explainability).
- Missing metadata is flagged, never invented; retracted papers flagged + demoted, never dropped.
- Reconcile ARCHITECTURE.md / SOURCE-MATRIX.md to the pipeline as actually built.
