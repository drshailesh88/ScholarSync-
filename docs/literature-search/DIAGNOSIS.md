# Manan OS Literature Search — Quality Diagnosis (vs. Elicit)

**Scope:** search quality only — retrieval, query planning, metadata normalization,
dedupe, reranking, provenance, explanations, eval. Elicit is used **only** as a
benchmark/calibration target, never as a runtime dependency.

**Date:** 2026-06-22. **Baseline commit:** see `git log` at time of `eval/literature-search` run.

---

## TL;DR

Manan OS already has a rich, well-built search toolkit — PubMed/OpenAlex/Semantic Scholar
providers, RRF fusion, dedup, a quality re-ranker, a Cohere reranker, a query expander, a
study-type/evidence classifier, journal-quality lookup, and a ClinicalTrials.gov source.
**The problem is orchestration: almost none of it is wired into the live search path.**

`runLiteratureSearch()` (the single entry point behind both the web API and the `/api/mcp`
tool) does only:

```
fan out to PubMed + Semantic Scholar  →  reciprocalRankFusion()  →  filter  →  return
```

It never calls `qualityRank`, `enrichJournalQuality`, `rerankResults`, `expandQuery`,
`deduplicateResults` (beyond what RRF does inline), `searchClinicalTrials`, or any metadata
repair. So the ranking a clinician sees is essentially **"PubMed's default sort (most-recent-first)
fused with Semantic Scholar"** — with no relevance model, no evidence hierarchy, and no
citation/landmark signal.

## The seed query, side by side

Query: **"TAVR low risk six year outcomes"** (`maxResults: 10`).

| Rank | Manan (current/deployed) | Elicit |
|------|--------------------------|--------|
| 1 | Evolut Low Risk **6-yr** (Forrest 2026, JACC) ✅ | **PARTNER 3** (Mack/Leon, NEJM 2019) ✅ landmark RCT, 3610 cites |
| 2 | Updated 5-yr meta (Heart 2026) | Evolut Low Risk **6-yr** (Forrest 2026) ✅ |
| 3 | Mid-term meta (Braz J Cardiovasc Surg) | LRT 1-yr (Waksman 2018) |
| 4 | ❌ Apical-sparing strain imaging (irrelevant) | Review of late outcomes |
| 5 | ❌ Infected-prosthesis explantation case report | Short/intermediate meta |
| 6 | Updated low-risk RCT meta (2025) | **Evolut 2-yr** (Forrest 2022) ✅ |
| 7 | Reconstructed time-to-event meta (2025) | **Waksman LRT** (2018) ✅ |
| 8 | Reddy lower-risk meta (JACC 2025) | **PARTNER 3 2-yr** (Leon 2021) ✅ |
| 9 | ❌ FRANCE reintervention registry (tangential) | Long-term meta (2024) |
| 10 | ❌ Recurrent-stroke bicuspid **case report** | Kolte meta (2019) |

Observations that generalize:

1. **Semantic Scholar returned 0 results** on this run (`sourceCounts.semantic_scholar: 0`).
   Because S2 is also the **only** source of citation counts, **every result came back with
   `citationCount: 0`**. The system degraded silently to PubMed-only with no citation signal.
2. **Manan missed PARTNER 3 entirely** — the single most important paper for this query — because
   PubMed's default sort is most-recent-first and PARTNER 3 is a 2019 paper. Elicit ranks it #1.
3. **3–4 of Manan's top 10 are irrelevant** (case reports about endocarditis/strokes, a strain-imaging
   paper). Elicit's top 10 are all on-topic landmark trials and their meta-analyses.
4. **`relevanceScore` is just the raw RRF score** (~0.016, monotonic in rank) — there is no
   real relevance model surfaced to the caller.

## Gap inventory

### G1 — Ranking is recency, not relevance/evidence (highest impact)
- PubMed `esearch` is called with **no `sort` parameter** → MEDLINE default = most-recent-first.
- RRF preserves source rank but adds no quality signal. The existing `qualityRank()`
  (evidence level + citations + journal quartile + keyword relevance) and the Cohere
  `rerankResults()` are **never called**.
- Consequence: landmark older RCTs are buried; recent low-quality papers and case reports rank high.

### G2 — Hard Semantic Scholar dependency (violates "S2 must be optional")
- `DEFAULT_SOURCES = ["pubmed", "semantic_scholar"]` → S2 is on by default.
- `fetchPaperById()` resolves **only** through `getSemanticScholarPaper()` — `fetch_paper` is
  100% broken when S2 is down or rate-limited.
- S2 is the only citation-count provider in the default set, so S2 outages silently zero out the
  citation signal that `qualityRank` needs.

### G3 — No citation/landmark signal without S2
- PubMed provides `citationCount: 0` always. **OpenAlex provides `cited_by_count` and is
  S2-independent** but is **off by default** (`default: false`).

### G4 — No query planning for clinical search
- `expandQuery()` (drug-class → drug-name + MeSH expansion) exists but is **not wired in**.
- No **trial-acronym / NCT detection**, no **PICO** decomposition, no MeSH-structured PubMed query,
  no multi-query retrieval. A query like "TAVR low risk" is sent verbatim; PubMed never sees
  "transcatheter aortic valve replacement"[MeSH] or the landmark trial synonyms.

### G5 — No ClinicalTrials.gov linking
- `searchClinicalTrials()` and the systematic-review connectors exist but are unused in the main
  path. Trial-acronym queries ("DAPA-HF", "PARTNER 3") never surface the registry record.

### G6 — No metadata repair / completeness flags
- No Crossref source exists at all. PubMed-only results frequently lack journal quartile, and
  OA/PDF links; S2-down results lack citations. Nothing repairs DOIs/PMIDs across sources or
  **flags** which fields are missing vs. genuinely absent. Risk of silent under-reporting.

### G7 — No provenance / ranking trace / "why this matters"
- Results expose `sources[]` but not **why** a paper ranks where it does (which signals fired),
  and there is no per-result rationale a clinician can trust or reproduce.

### G8 — No eval harness
- There is a `ralph-search` scorecard but no benchmark of clinical queries, no deterministic
  metrics (recall@10, nDCG@10, fill rates, dup rate, irrelevant rate, source-failure rate, latency),
  and no Manan-vs-Elicit comparison. Improvements cannot be measured.

## What is already good (keep / build on)
- Solid provider layer with circuit breakers, resilient fetch, API-key rotation, and per-source
  status classification (`source-status.ts`) — the failure plumbing exists; it just isn't surfaced
  in ranking decisions.
- `qualityRank`, `enrichJournalQuality`, `expandQuery`, `deduplicateResults`, `study-type-detector`,
  `evidence-level`, `journal-quality`, `searchClinicalTrials` are all implemented and unit-shaped —
  the work is integration, not greenfield.
- Clean separation: one orchestrator (`run-search.ts`) behind both transports — fix it once, both
  the web app and the MCP improve together.

## Improvement thesis (drives the iteration plan)
1. **Make OpenAlex a default source and PubMed relevance-sorted** → citations + landmark signal
   without S2; fixes G1/G3 cheaply.
2. **Wire the ranking pipeline** dedup → enrich (journal/evidence) → `qualityRank` → optional Cohere
   rerank, with **case-report/observational down-weighting** → fixes G1.
3. **Make S2 optional** (default off; graceful when absent) and give `fetch_paper` PubMed/Crossref/
   OpenAlex resolvers → fixes G2.
4. **Query planning**: trial-acronym/NCT detection, MeSH/synonym expansion, multi-query retrieval,
   ClinicalTrials.gov linking for trial/PICO queries → fixes G4/G5.
5. **Crossref/OpenAlex metadata repair + completeness flags** (never hallucinate; flag missing) →
   fixes G6.
6. **Provenance + ranking trace + "why this matters"** on every result → fixes G7.
7. **Eval harness first** (G8) so every change is measured against deterministic metrics + an
   LLM council vs. Elicit.
