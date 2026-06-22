# Open-Source Prior Art for Biomedical Literature-Search Recall

**Advisor angle:** OSS / GitHub prior art we can adopt rather than reinvent.
**Date:** 2026-06-22. Stars/dates from live `gh repo view` / `npm` / `pip` lookups this session.

## The problem restated (so we don't solve the wrong thing)

Stage-1 retrieval in the Manan OS pipeline (PubMed + OpenAlex + Crossref + ClinicalTrials.gov → RRF → OpenAlex citation backfill → quality re-rank → Cohere rerank-v3.5) is **lexical-only**. PubMed's own "Best Match" relevance sort does **not** save us: it is **BM25 + a LambdaMART learning-to-rank reranker over the first 500 BM25 hits** ([PLOS Biology / Best Match](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6112631/)). If the lexically-matched candidate set never contains PARTNER 3 for "TAVR low risk six year outcomes," no reranker — Cohere, LambdaMART, or MedCPT cross-encoder — can recover it. **This is a candidate-generation (recall) problem, not a rerank problem.** Most of the famous repos below are rerank-or-RAG-only and do NOT fix recall. I flag that explicitly per repo.

The hard constraint — **no self-hosted million-doc vector index** — eliminates the entire class of "embed all of PubMed into FAISS/Qdrant/Weaviate" solutions as the *primary* fix. That forces the realistic OSS-derived options into three buckets:

1. **Query-time semantic expansion** via APIs that already encode a corpus we don't host (NCBI `elink`/PMRA, OpenAlex `related_works`). Zero new infra.
2. **Re-embed a query-time candidate pool** with a biomedical dual-encoder (MedCPT) — over-fetch lexically (e.g. 500–1000), embed *only that pool* at request time, dense-rank against the MedCPT-encoded query. No standing index.
3. **Hosted learned-sparse / managed hybrid** (Elastic ELSER on EIS, Weaviate/Qdrant Cloud) — these are real and managed, but they still require *ingesting a corpus*, so they violate the spirit of the constraint unless scoped to a curated sub-corpus. Documented for completeness, ranked low.

---

## Candidate-by-candidate

### 1. ncbi/MedCPT — biomedical dual-encoder + cross-encoder (THE central find)
- **Repo:** https://github.com/ncbi/MedCPT — **262★**, license "Other" (NCBI/US-Gov work product; models on HF are MIT-style permissive but verify), last push **2024-03-24** (model is stable, not abandoned — it's a frozen artifact).
- **Models:** [MedCPT-Query-Encoder](https://huggingface.co/ncbi/MedCPT-Query-Encoder), MedCPT-Article-Encoder, MedCPT-Cross-Encoder. All PubMedBERT-initialized, **768-dim**, ~109M params each (paper cites 330M for the full system).
- **What it is:** Trained on **255M PubMed query→click pairs** — i.e. it learned exactly the query↔article semantic mapping our lexical stage is missing. **State-of-the-art zero-shot** on BEIR biomedical tasks, beating GTR-XXL (4.8B) and OpenAI cpt-text-XL (175B) at 330M ([MedCPT paper, Bioinformatics 2023](https://academic.oup.com/bioinformatics/article/39/11/btad651/7335842); [arXiv 2307.00589](https://arxiv.org/pdf/2307.00589v2)).
- **Recall vs rerank:** **BOTH, and that's why it's #1.**
  - *Cross-encoder* → drop-in **rerank upgrade**: Cohere rerank-v3.5 is general-domain; MedCPT cross-encoder is PubMed-native. Rerank-only, does not fix recall, but cheap to add.
  - *Query+Article encoders* → the **recall fix that respects the constraint**: do NOT pre-index PubMed. Instead over-fetch a query-time candidate pool from existing sources, encode the pool with the Article Encoder and the query with the Query Encoder *at request time*, and dense-rank. Catches semantically-related-but-lexically-disjoint papers within the pool. NCBI also ship pre-computed embeddings of the **latest 1M articles** + FAISS demo code if we ever want a bounded recent-corpus index (still far from "million-doc self-hosted" if scoped/managed).
- **TS/Node fit:** Models are PyTorch/HF → **Python sidecar** (FastAPI microservice) or a hosted inference endpoint (HF Inference Endpoints / Replicate / Modal). Not callable from pure Node. This is the only real eng cost. ~400MB model, CPU-tolerable for query encoding + small-pool encoding; GPU helps for large pools.

### 2. NCBI E-utilities `elink` (PMRA related-articles) — zero-infra recall expansion
- **Not a repo — an API we already have keys for** ([E-utilities In-Depth, NBK25499](https://www.ncbi.nlm.nih.gov/books/NBK25499/)). The `pubmed_pubmed` neighbor uses the **PMRA** probabilistic topic-similarity model over title+abstract+MeSH ([PMRA paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2212667/)).
- **Recall vs rerank:** **Pure recall expansion.** Take our top lexical hits, call `elink` to pull PMRA neighbors, merge into the candidate pool before RRF. PMRA is content-similarity not lexical-overlap, so it surfaces the PARTNER 3-style neighbors. This is the **lowest-cost, highest-certainty** recall lever — pure Node HTTP, no model, no infra.
- **TS/Node fit:** trivial — `fetch` against eutils, same as current PubMed integration. Mind the 3/sec (10/sec with key) rate limit.

### 3. OpenAlex `related_works` — second zero-infra recall expansion
- We already call OpenAlex. Each work exposes a `related_works` list (concept/embedding-derived neighbors) and `cited_by`/`references` we partly use. Adding `related_works` of top hits to the pool is another free recall lever, complementary to PMRA (broader, cross-publisher; less biomedical-precise). Pure Node.

### 4. Future-House/paper-qa (PaperQA2) — **NOT a recall fix; wrong layer**
- https://github.com/Future-House/paper-qa — **8,748★**, Apache-2.0, last push **2026-06-11** (very active, well-funded).
- **What it is:** high-accuracy **RAG answer generation** over **PDFs you supply**. It builds local embeddings over your provided docs and does evidence-gathering + answer synthesis. It can pull metadata from S2/Crossref but **does not retrieve content from an external biomedical corpus at query time**, and requires you to bring the documents.
- **Verdict:** Excellent as a *downstream answer/synthesis* layer if ScholarSync ever wants grounded Q&A, but it **does not address stage-1 recall** over PubMed. Out of scope for this problem.

### 5. neuml/txtai — embeddings/hybrid framework (enabler, not the answer)
- https://github.com/neuml/txtai — **12,673★**, Apache-2.0, last push **2026-06-19** (extremely active), pip `txtai==9.10.0`.
- All-in-one semantic-search/hybrid framework (BM25+dense+graph). Clean way to *host the MedCPT sidecar* and do hybrid scoring/RRF inside Python. But it presumes you build an index → if pointed at all of PubMed it violates the constraint. **Use only as the implementation substrate for the bounded query-time pool re-ranking in #1**, not as a corpus host.

### 6. deepset-ai/haystack — production RAG/retrieval orchestration (enabler, heavy)
- https://github.com/deepset-ai/haystack — **25,629★**, Apache-2.0, last push **2026-06-22** (most active here). Pipelines with hybrid retrieval + rerankers. Same caveat as txtai: it's an orchestration layer that wants a document store. Overkill for plugging one encoder into an existing TS pipeline; would mean adopting a Python service for the whole retrieval stack. Note only if we re-platform retrieval into Python.

### 7. castorini/pyserini (Anserini) — hybrid BM25+dense research toolkit (research, not prod-drop-in)
- https://github.com/castorini/pyserini — **2,092★**, Apache-2.0, last push **2026-06-22** (active). Reference implementation of **BM25 + dense fusion / RRF** done right, with prebuilt indexes for BEIR. Great for *offline evaluation* of any recall change (it has BEIR-bio indexes), but it builds Lucene/FAISS indexes → not a query-time-no-corpus tool for prod. **Adopt as the offline benchmark harness**, not the runtime.

### 8. SPLADE (naver/splade) & learned-sparse — strong recall idea, needs ingestion
- https://github.com/naver/splade — **995★**, license "Other" (non-commercial CC-BY-NC-SA on weights — **commercial-use blocker**), last push **2024-05-03**. Learned-sparse expands terms semantically into the inverted index → exactly the recall mechanism we want, but it **requires indexing the corpus with SPLADE expansions**. Constraint violation for full PubMed; also the license blocks commercial use. **Skip for prod.** (The hosted, commercially-clean equivalent is ELSER — see #11.)

### 9. ColBERT (stanford-futuredata) + RAGatouille (AnswerDotAI) — late-interaction; index-heavy
- ColBERT https://github.com/stanford-futuredata/ColBERT — **3,889★**, MIT, last push **2025-10-14**. RAGatouille https://github.com/AnswerDotAI/RAGatouille — **3,937★**, Apache-2.0, last push **2025-05-17** (slowing). Best-in-class late-interaction retrieval, but ColBERT's multi-vector index is **the most storage-heavy of all** (per-token vectors) → directly violates the no-self-hosted-index constraint at PubMed scale. Viable only for a small curated sub-corpus. **Skip for the recall problem.**

### 10. MedRAG / BMRetriever / gpt-researcher — biomedical RAG repos (mostly research / wrong layer)
- **MedRAG** (gzxiong/MedRAG **575★**; SNOWTEAM2023/MedRAG **283★**) — biomedical RAG *toolkits/benchmarks* that assume a prebuilt MedCorpus index (PubMed/StatPearls/textbooks). Useful as a **reference for which corpora + retrievers help in biomed** (they use MedCPT among others), and as an eval benchmark, but they build indexes. **Reference, not runtime.**
- **BMRetriever** (ritaranx/BMRetriever **26★**, EMNLP'24) — LLM-as-biomedical-retriever; research-grade, low adoption, index-based. Skip.
- **gpt-researcher** (assafelovic/gpt-researcher **27,840★**, Apache-2.0, 2026-05-28) — autonomous web-research agent. General, not biomedical-recall. Wrong layer (answer-orchestration). Skip for this problem.

### 11. Hosted learned-sparse / managed hybrid (ELSER, Weaviate/Qdrant Cloud, Vespa) — real but corpus-required
- **Elastic ELSER** ([docs](https://www.elastic.co/guide/en/machine-learning/current/ml-nlp-elser.html)): out-of-domain learned-sparse, **no fine-tuning**, **+18% nDCG@10 vs BM25** on BEIR, and runnable as **managed Elastic Inference Service** (no infra to manage). This is the cleanest *hosted* recall upgrade — but you still **ingest documents into an Elastic index**. Acceptable only if we scope to a curated/recent sub-corpus rather than all of PubMed.
- **Qdrant** (32,554★, Apache-2.0) / **Weaviate** (16,394★, BSD-3) Cloud and **Vespa sample-apps** (409★, Apache-2.0): managed hybrid (BM25+dense+RRF) stores. Same story — managed infra, but corpus ingestion required. Rank low against the constraint.

### Noted-and-dismissed
- **allenai/s2search** (112★, Apache-2.0, last push **2020-10-26**) — Semantic Scholar's *reranker*, abandoned, rerank-only. Skip.
- **allenai/SPECTER2** (137★) — document embeddings for paper similarity; would still require indexing a corpus to use for recall. Reference only.

---

## Ranked shortlist (recall-impact ÷ eng-cost)

| # | Solution | URL | Stars | License | Fit |
|---|----------|-----|-------|---------|-----|
| 1 | **NCBI `elink` PMRA related-articles** | https://www.ncbi.nlm.nih.gov/books/NBK25499/ | n/a (API) | US-Gov / free | **Highest ratio.** Pure-Node, zero infra, content-similarity neighbors merged into pool pre-RRF — directly fixes the PARTNER 3 lexical gap. Ship first. |
| 2 | **OpenAlex `related_works` expansion** | https://docs.openalex.org/ | n/a (API) | CC0 | Already integrated source; add neighbor expansion. Pure Node, free, complementary to #1. |
| 3 | **ncbi/MedCPT (query+article encoders, query-time pool re-embed)** | https://github.com/ncbi/MedCPT | 262 | Other/MIT-ish (verify) | **Biggest recall ceiling.** SOTA biomedical zero-shot; re-embeds a query-time over-fetched pool — no standing index. Cost: one Python/HF sidecar. |
| 4 | **ncbi/MedCPT cross-encoder (rerank swap)** | https://huggingface.co/ncbi/MedCPT-Query-Encoder | 262 | Other/MIT-ish | Rerank-only (not recall), but a near-free biomedical upgrade to Cohere rerank-v3.5 once the #3 sidecar exists. |
| 5 | **castorini/pyserini as offline BEIR-bio eval harness** | https://github.com/castorini/pyserini | 2,092 | Apache-2.0 | Not runtime — the measurement rig to prove any recall change before shipping. |

**Bottom line:** the cheapest, constraint-respecting recall wins are API-based neighbor expansion (#1, #2) shipped immediately; the highest-ceiling win is MedCPT re-embedding a query-time candidate pool (#3) behind a small Python sidecar, with its cross-encoder (#4) as a bonus rerank upgrade. Everything that requires hosting a PubMed-scale index (SPLADE, ColBERT, Weaviate/Qdrant/Vespa, ELSER-over-all-PubMed) is correctly out of scope.
