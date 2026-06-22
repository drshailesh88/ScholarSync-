# Solutions Council — Closing the Recall Gap Without a Corpus Index

A 5-model council (3 web-enabled Opus advisors on distinct angles + Codex + Grok)
was asked: *how do we add semantic recall to a PubMed/OpenAlex search without
building/hosting our own dense corpus — what have others done?* Each searched the
web/GitHub for prior art. Full advisor write-ups: `council-solutions/{apis,oss,algorithms}.md`,
`council-solutions/raw-codex.md`. (Grok hit auth/connection errors and did not
return a clean shortlist.) Every claim below is empirically tested or cited.

---

## Unanimous diagnosis

**It is a candidate-generation (recall) problem, not a reranking problem.** Every
stage-1 source we use (PubMed Best-Match — itself just BM25→LambdaMART over the
top-500 BM25 hits — plus OpenAlex `search`, Crossref, CT.gov) matches on *surface
terms*. RRF over lexical sources is still lexical. **No reranker can reorder a paper
that was never retrieved.** The fix is to add ≥1 candidate lane that retrieves in
*meaning* space, fused into the pool **before** RRF/rerank.

The council also agreed on what to **exclude**: self-hosted dense indexes
(SPLADE / ColBERT / Weaviate / Qdrant / Vespa / ELSER — all need an ingested
corpus), and rerank/answer frameworks (paper-qa, haystack, gpt-researcher, MedRAG)
which don't touch recall. **Elicit stays benchmark-only** (an advisor suggested
A/B-ing it in prod — rejected per our hard constraint; it can *evaluate*, not serve).

---

## The recommended architecture (where all advisors converged)

```
query
 → multi-query expansion         LLM variants: acronyms / synonyms / MeSH / timepoint-stripped / PICO
 → LEXICAL lanes (per variant)   PubMed Best-Match + OpenAlex search + Crossref      [have]
 → DENSE lane                    OpenAlex search.semantic (GTE-Large, hosted)        [NEW ⭐]
 → GRAPH expansion on top seeds  PubMed PMRA (elink) + OpenAlex referenced/related/citing  [NEW]
 → union candidate pool (≤ few hundred), dedup by PMID/DOI/OpenAlexID, keep retrieval-path
 → RRF fusion                                                                         [have]
 → on-the-fly MedCPT bi-encoder KNN (optional, sidecar)  promote semantic-but-lexically-weak [later]
 → Cohere / MedCPT cross-encoder rerank   final precision                            [have]
 → quality composite (evidence/citations/velocity/journal) + provenance + flags      [have]
```

The three new lanes are **all corpus-free** and use sources we already integrate
(OpenAlex) or free NCBI APIs. No vector DB, no standing index.

---

## Ranked solution set (impact ÷ engineering cost) — with evidence

### 1. OpenAlex `search.semantic` — dense stage-1 lane ⭐ SHIP FIRST
- **What:** true dense nearest-neighbour search (GTE-Large, 1024-dim, cosine) over
  250M+ works **including all of PubMed**. `GET /works?search.semantic=<text>` —
  no key, ≤50 results, 2,000-char input, 1 rps.
  https://developers.openalex.org/guides/semantic-search
- **Cost:** one extra call on a source whose schema we already parse. ~hours.
- **EMPIRICALLY VALIDATED (this session):**
  - "newest evidence on lecanemab for Alzheimer disease" → **CLARITY-AD (van Dyck 2022) ranked #1** — the exact pivotal trial lexical/recency search buried under 2026 papers.
  - "TAVR low risk six year outcomes" → all highly-relevant low-risk TAVR outcome papers, PARTNER 3's 2-year follow-up at #2.
- Backed by: APIs advisor #1, Codex #1.
- ⚠️ Verify exact per-call price (docs: search $0.001; one source quoted $0.01 for semantic). Free tier ~$1/day.

### 2. Citation-graph + neighbour expansion — corpus-free landmark recovery
- **What:** for the top lexical/semantic seeds, pull **PubMed PMRA related articles**
  (`elink ... linkname=pubmed_pubmed`), **OpenAlex `referenced_works` (backward,
  free), `related_works`, and forward `cites:` (batched 100/call)**; merge into the
  pool. Bibliographic-coupling / co-citation re-weight. A landmark is, by definition,
  the paper everyone in the topic cites.
  https://www.ncbi.nlm.nih.gov/books/NBK25499/ · https://docs.openalex.org/api-entities/works/filter-works
- **Prior art:** automatic citation snowballing reaches **66.7–85.5% recall at
  ~97.7% precision** in systematic-review screening (algorithms advisor).
  https://onlinelibrary.wiley.com/doi/full/10.1002/jrsm.1563
- **EMPIRICALLY VALIDATED (this session):** Evolut-6yr's PMRA neighbours include
  PARTNER 3; co-citation of the top-10 TAVR hits surfaces the foundational trials
  (PARTNER 1/2, CoreValve). Pure Node, zero infra.
- Backed by: OSS advisor #1/#2, algorithms #1, Codex #2.

### 3. Multi-query (RAG-fusion) + HyDE — vocabulary-gap fix
- **What:** one LLM call → 5–10 retrieval-only query variants (expanded acronyms,
  synonyms, MeSH terms, timepoint-stripped, PICO form) and/or a HyDE hypothetical
  abstract; fan out existing retrievers; reuse RRF. Turns "TAVR low risk six year
  outcomes" into variants containing "transcatheter aortic-valve replacement",
  "low surgical risk", etc.
  https://github.com/Raudaschl/rag-fusion · https://arxiv.org/abs/2212.10496
- **Cost:** 1 fast LLM call/query, fail-open. Backed by: algorithms #2/#3, Codex #5.
- Note: this is the *general* version of the (rejected) hardcoded landmark map — the
  LLM supplies domain knowledge for every topic instead of a brittle list.

### 4. MedCPT on-the-fly — SOTA biomedical, query-time only (the big lever, deferred)
- **What:** NCBI's MedCPT (trained on 255M PubMed click pairs; beats GTR-XXL 4.8B &
  OpenAI cpt-text-XL 175B at 330M params). Use the **bi-encoder to KNN-rank the
  over-fetched query-time pool** and/or the **cross-encoder to rerank** — *no
  standing index*. https://github.com/ncbi/MedCPT · https://arxiv.org/abs/2307.00589
- **Cost:** a small Python/HF sidecar (not callable from pure Node) — the only
  non-trivial infra here, but far below a corpus index. Removes the Cohere API dep.
- Backed by: OSS #3/#4, algorithms #4, Codex OSS, APIs (parked as rerank-only).

### 5. Guardrailed PRF (RM3/Rocchio) — near-free recall widener
- Extract expansion terms from top-k, re-query; gate on top-k coherence to avoid
  drift. Mainly feeds #2. https://arxiv.org/pdf/2305.07477 · algorithms #5.

### Optional / situational
- **Semantic Scholar Recommendations API** — seed with top fused papers → related
  papers from S2's hosted corpus, **optional only** (S2 dependency/quota). Codex #3.
- **Exa neural search** — embeddings-first over 100M+ papers; opt-in web/grey-lit
  booster, needs URL→PMID resolve. APIs #2.
- **Europe PMC REST** — free MeSH-synonym expansion (lexical-plus). APIs #4.
- **ClinicalTrials.gov / NCT publication expansion** — for trial queries, resolve
  trial→result-paper. Codex #4 (we already link CT.gov).

### Overrated / excluded (council consensus)
- Better reranking *alone* — can't rank what isn't in the pool.
- HyDE *without* dense retrieval — query expansion, not magic.
- Crossref as a recall engine — it's a metadata resolver.
- Self-hosted dense corpus (SPLADE/ColBERT/Weaviate/Qdrant/Vespa/ELSER) — out of
  scope (corpus ingest).
- General web APIs (Exa/Tavily) as the *primary* clinical recall source.

---

## Recommended build plan (all corpus-free)

**Phase 1 — ship now (~hours, zero infra, pure Node):**
1. Add **OpenAlex `search.semantic`** as a parallel candidate lane in `run-search.ts`
   (own circuit breaker + pacing; dedup into the pool before RRF).
2. Add **neighbour/citation expansion** (`sources/expansion.ts`): PMRA `elink` +
   OpenAlex `referenced_works`/`related_works` on the top ~10 seeds, merged pre-RRF.
3. Tag each result with its **retrieval path** (lexical / semantic / pmra / citation)
   for provenance + debugging.
4. Add a **canary eval**: "TAVR low risk six year outcomes" must contain PARTNER 3,
   "lecanemab" must contain CLARITY-AD, in the candidate pool before rerank.

**Phase 2 — days (1 LLM call/query, fail-open):**
5. **Multi-query / RAG-fusion + HyDE** in the query planner (replaces the rejected
   hardcoded landmark map with general LLM-driven expansion).

**Phase 3 — later (small sidecar, no corpus):**
6. **MedCPT** bi-encoder KNN + cross-encoder over the query-time pool; A/B vs Cohere
   (and Voyage rerank-2.5) as the rerank stage.

**Eval throughout:** our 34-query benchmark + the LLM council vs **Elicit (benchmark
only)**; optionally `pyserini`/BEIR-bio offline to prove a recall delta before shipping.

---

## Bottom line

We were right that we're not the first to face this. The field's corpus-free answer
is: **add a hosted dense lane (OpenAlex `search.semantic`) + citation-graph
expansion before fusion, keep the cross-encoder for precision.** Both new lanes are
validated to recover the exact landmarks we were missing, cost ~hours of pure-Node
work, and need no vector database. MedCPT is the SOTA upgrade when a small sidecar
is justified. A self-hosted corpus index — the one expensive option — stays
deferred until a customer justifies it.
