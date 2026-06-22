# Why Manan Search Lags — Root-Cause Analysis

Not "which queries fail" but **why** they fail, framed the way IR / research-search
teams (Elicit, Consensus, Undermind, Semantic Scholar/Ai2) diagnose and fix
ranking. Evidence base + citations: `SEARCH-METHODOLOGY-RESEARCH.md`.

> Guiding principle: fix *causes*, not *queries*. Hardcoding "TAVR ⇒ PARTNER 3"
> patches one benchmark row and teaches us nothing. The questions worth answering
> are structural: *what class of relevant paper can our pipeline never surface, and
> why?*

---

## The field's reference architecture (what "good" looks like)

Every leading research-search engine converges on the **same three stages**:

| Stage | Purpose | Technique | Manan today |
|------|---------|-----------|-------------|
| 1. **Recall** | cast a wide net | **hybrid**: lexical (BM25 / PubMed Best-Match) **+ dense semantic** (embeddings over a pre-indexed corpus) | **lexical only** ❌ |
| 2. **Rerank** | order a shortlist by true relevance | **cross-encoder** (query+doc joint attention) | wired (Cohere), fail-open ✅ |
| 3. **Precision** | quality/credibility re-rank | evidence level, citations+velocity, journal, recency; optional LLM pass | quality composite ✅ |

Manan does stage 3 well and now does stage 2. **The lag is concentrated in stage 1:
our recall is lexical-only.**

---

## Root cause #1 (the deep one): lexical-only retrieval → semantic recall gap

**Mechanism.** PubMed Best-Match and OpenAlex both match on *surface terms* and
citation graph. A paper that is *semantically* on-topic but does not share the
query's words is **never retrieved** — and **no reranker can reorder a paper that
isn't in the candidate set.** Reranking (stage 2) only ever improves *precision*
over what stage 1 already recalled.

**Why this is THE cause of the landmark lag.** "TAVR low risk six year outcomes"
never retrieves PARTNER 3 — not because it ranks low, but because PARTNER 3's
title/abstract is about "low-risk balloon-expandable TAVR" and never says "six
year." It's outside PubMed's candidate set entirely. A dense semantic retriever
embeds the *meaning* of the query and the paper, so PARTNER 3 is retrieved on
concept similarity regardless of surface words.

**This is precisely Elicit's moat.** Elicit reports ~95% recall using only review
*titles* as queries — because it runs dense search over a **pre-embedded
~100–138M-paper corpus**. The honest framing: *we lag on the corpus and the
embedding index, not the algorithm.* (Sources in the research report.)

**Wrong fix (rejected):** a hardcoded "topic ⇒ landmark trial" map. It games the
benchmark, doesn't generalize, and rots. We removed it.

**Right fixes (general, ranked by cost):**
1. **Semantic query expansion / HyDE** — let an LLM rewrite the NL query into
   richer concept/MeSH phrasings (a "hypothetical PubMed strategy"), broadening
   *lexical* retrieval toward the semantically-relevant terms. The model supplies
   the domain knowledge generally (it "knows" TAVR-low-risk ↔ PARTNER/Evolut) —
   no hardcoded list, works for every topic. **Cheap: 1 LLM call/query, no index.**
2. **Dense reranking of the fused pool** — embed query + the ~50 candidate
   abstracts (MedCPT / PubMedBERT), rerank by semantic similarity. Improves
   *precision* but still can't recall what stage 1 missed. (Cohere cross-encoder
   already approximates this.)
3. **Dense first-stage retrieval over a pre-embedded corpus** — true Elicit
   parity. The only way to close the *recall* gap fully. Infra-heavy (vector store
   + embedding pipeline over millions of records). The honest long-term item.

**Cheap structural mitigations we DID ship (general, not query-specific):**
- **Query relaxation** — drop over-narrow qualifiers ("six year outcomes") to a
  broadened core-topic companion query, unioned in. Standard IR query reduction.
- **Over-fetch then rerank** — pull a larger candidate pool (~25/source) so a
  paper at lexical rank ~15 can still reach the page after reranking.
These widen the lexical net but do **not** replace dense retrieval — a paper with
zero surface-term overlap is still missed. That residue is root cause #1's tail.

---

## Root cause #2 (now fixed): the relevance signal was the weakest possible

**Mechanism.** Before this work, ranking "relevance" was binary keyword overlap
(`text.includes(keyword)`) — the weakest relevance estimator in IR. Worse, the
whole quality pipeline (`qualityRank`, cross-encoder, study-type/journal
enrichment) existed but **was never called** by the live search path, which did
only RRF + filter. So results were effectively "PubMed's default *recency* sort,
fused with a second source" — no relevance model at all.

**Fix (field-standard, shipped):**
- Call PubMed with **Best-Match (relevance) sort** (itself a LambdaMART
  learning-to-rank model trained on NIH-scale click logs) instead of recency.
- Wire the **cross-encoder rerank** (Cohere `rerank-v3.5`) as the dominant
  relevance signal *when present*, with adaptive fallback to the validated quality
  weights when it isn't (fail-open).
- Replace keyword-overlap as the primary relevance estimator.

---

## Secondary causes (mechanism → fix), all shipped

| Symptom | Root cause | General fix (shipped) |
|---|---|---|
| Exact-title query returned 0% | PubMed default **recency** sort buried the exact paper | Best-Match relevance sort |
| Natural-language queries → **empty sets** | verbose phrasing broke PubMed automatic term mapping | NL→keyword simplification + verbatim fallback |
| Acronym queries mis-resolved | bare acronym mapped to wrong MeSH ("PARTNER"→Sexual Partners) | pin acronyms as `[tiab]` phrases |
| Citations all 0 → no landmark signal | only citation source (S2) was a hard dep and was 403-ing | OpenAlex batch citation backfill by PMID/DOI (S2-independent) |
| Off-topic case reports in top-10 | no evidence-hierarchy / quality re-rank in the live path | wire `qualityRank` (evidence + citations + velocity + journal) |
| Requests could hang ~12h | uncapped `Retry-After` from a source | cap the retry delay |

---

## Conclusion — where the remaining lag lives

After the structural fixes, **the residual lag is one thing: no dense semantic
retrieval (root cause #1).** It manifests only as missed *semantically-relevant
papers with no surface-term overlap* on broad/recency queries — the long tail of
recall. Everything else (precision, metadata, trust, evidence hierarchy, empty
sets, citations) is addressed with field-standard methods.

**The principled path forward, in order:**
1. **Semantic query expansion (HyDE-lite)** — biggest recall gain per unit effort,
   no new infra. *Next implementation step.*
2. **Dense reranker (MedCPT)** — free, biomedical, self-hosted; removes the
   Cohere API dependency and adds biomedical-native relevance.
3. **Dense first-stage corpus index** — true Elicit-parity recall; the deferred,
   infra-heavy endgame.

None of these is query-specific. That is the point.
