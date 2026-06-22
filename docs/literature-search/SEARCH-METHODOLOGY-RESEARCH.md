# Building an Elicit-Level Biomedical Literature Search & Reranking Engine

Research report for **Manan OS / ScholarSync** (`/Users/shaileshsingh/ScholarSync`, search code in `src/lib/search/`).

Audience: the engineers wiring up `run-search.ts` → `pipeline.ts` → ranking. Every external claim is cited with a URL. Elicit is a **benchmark only** — never a runtime dependency. Semantic Scholar must remain **optional**. No proprietary full-text. Missing metadata is **flagged, never hallucinated**.

---

## (a) Executive Summary

The leading research-search engines (Elicit, Undermind, Consensus, Semantic Scholar) all converge on the **same three-stage shape**, and Manan OS currently implements only the first stage well:

1. **Recall stage** — cast a wide net with *hybrid retrieval* (lexical BM25/Best-Match + dense semantic embeddings), over-fetch (~100–1500 candidates).
2. **Rerank stage** — a *cross-encoder* (query+document jointly attended) reorders a shortlist by true semantic relevance. This is the single biggest quality lever and the one Manan is missing in production.
3. **Quality/precision stage** — re-score the top-N by *research-quality metadata* (evidence level, citation count + velocity, journal quartile, recency) and, optionally, an expensive LLM precision pass on just the top ~20.

**Manan OS today** does stage 1 (PubMed Best-Match + OpenAlex → RRF) and stage 3 (the heuristic weighted composite in `quality-ranker.ts`), but **skips stage 2 entirely** — `rerank.ts` (Cohere `rerank-v3.5`) exists and is *never called by `run-search.ts`*. The current "relevance" signal is naive binary keyword overlap (`text.includes(kw)` in `quality-ranker.ts`), which is the weakest possible relevance estimator. **Wiring the existing Cohere reranker into the pipeline is the highest impact/effort change available and requires zero new infra.**

The honest gap vs. Elicit is **the corpus and the embedding index**, not the algorithm. Elicit/Consensus run dense semantic search over a *pre-embedded* 125–138M-paper corpus ([Elicit](https://elicit.com/blog/how-we-evaluated-elicit-systematic-review), [Anara on Elicit](https://anara.com/blog/elicit-literature-reviews)). Manan retrieves live from PubMed/OpenAlex and therefore inherits *their* first-stage recall — which is actually fine, because **PubMed Best Match is itself a learning-to-rank system** ([Fiorini et al., PLOS Biology](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2005343)) and OpenAlex adds citation-graph recall. What Manan can fully replicate without a vector store is a **cross-encoder rerank of the fused candidate set** — which is exactly where Elicit, Consensus, and Undermind get most of their precision.

The closest open, free, S2-independent analog to Elicit's secret sauce is **MedCPT** (NCBI), a contrastively pre-trained retriever+reranker trained on **255M PubMed click logs**, available as open weights and a free API ([MedCPT, Bioinformatics 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12478430/), [GitHub](https://github.com/ncbi/MedCPT)). It is the recommended *local/free* upgrade path beyond Cohere.

---

## (b) Per-Technique Sections (with citations)

### 1. PubMed "Best Match" — learning-to-rank (the system you already lean on)

**What it is.** A two-stage ranker: BM25 term-weighting retrieves, then the **top 500 are re-ranked by LambdaMART**, a gradient-boosted learning-to-rank model. It trains on past user searches with dozens of signals; the most important are **past usage (clicks) of an article, publication date, a relevance score, and article type**. It beat the old TF–IDF ranker 0.48 vs 0.15 NDCG and lifted click-through >20% ([Fiorini et al., *Best Match: New relevance search for PubMed*, PLOS Biology 2018](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2005343); [JMLA explainer](https://pmc.ncbi.nlm.nih.gov/articles/PMC8830327/); [reference impl](https://github.com/ncbi-nlp/PubMed-Best-Match)).

**Why it helps clinical search.** It is already tuned on real biomedical user behaviour and embeds article-type/recency priors that match clinical intent. When `query-planner.ts` sends `sort=relevance`, you get Best-Match for free.

**Feasibility in Manan.** Already used. **Action: never override Best Match's order with RRF unless you have a stronger reranker** — RRF currently blends Best-Match rank with OpenAlex's weaker `search` rank, which can *dilute* PubMed's tuned ordering. Treat PubMed rank as a strong prior into RRF/rerank, not an equal vote.

### 2. Dense bi-encoders / semantic search (the Elicit/Consensus first stage)

**What it is.** Encode query and each document (title+abstract) independently into vectors; retrieve by cosine/dot-product nearest-neighbour. Elicit: "a query is passed to an embedding model… that vector is then matched against Elicit's corpus" over 138M papers, achieving **95.0% recall** using only review titles as the query ([Elicit SLR eval](https://elicit.com/blog/evaluating-elicit-slr); [How we evaluated](https://elicit.com/blog/how-we-evaluated-elicit-systematic-review)). Consensus combines "semantic vector search… with traditional BM25 keyword matching" ([How Consensus Works](https://help.consensus.app/en/articles/9922673-how-consensus-works)).

**Why it helps biomedical search.** Catches papers that use different terminology (drug name vs class, synonym vs MeSH) without the user knowing the right keywords — the exact recall gap `query-expander.ts` tries to patch with hand-coded synonym lists.

**Feasibility in Manan.** *Medium-high cost.* True dense first-stage retrieval needs a **pre-embedded corpus + vector store** (you can't embed 35M PubMed records on demand). That's the one thing Manan can't cheaply replicate. **But you don't need it for stage-1 recall** — PubMed+OpenAlex already retrieve. Where embeddings pay off cheaply is **reranking the ~50 fused candidates** (you only embed 50 abstracts per query, no index needed). Best biomedical embedders: **MedCPT** (255M PubMed click logs, [paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12478430/)), **NeuML/pubmedbert-base-embeddings** (768-dim, PubMedBERT fine-tuned, [HF](https://huggingface.co/NeuML/pubmedbert-base-embeddings)), or **SPECTER2** proximity adapter (free via S2 `embedding.specter_v2`, but that's an S2 dependency so keep it optional) ([SPECTER2 blog](https://medium.com/ai2-blog/specter2-adapting-scientific-document-embeddings-to-multiple-fields-and-task-formats-c95686c06567)).

### 3. Cross-encoder rerankers (the missing stage — highest ROI)

**What it is.** Concatenate query+document and run them jointly through a transformer, producing a single relevance score with full cross-attention. "Considerably higher precision but at much greater computational cost, making it suitable only for reranking a shortlist (e.g., top 100)" ([Towards Data Science](https://towardsdatascience.com/advanced-rag-retrieval-cross-encoders-reranking/); [AppScale](https://appscale.blog/en/blog/hybrid-search-and-reranking-production-rag-bm25-dense-cross-encoder-2026)). Options:
- **Cohere `rerank-v3.5`** — API, ~595–603ms latency, "high uplift for medical documents," recommended "when budget is not a constraint… paying for reliability" ([BSWEN reranker comparison 2026](https://docs.bswen.com/blog/2026-02-25-best-reranker-models/); [Local AI Master](https://localaimaster.com/blog/reranking-cross-encoders-guide)). **Already integrated in `rerank.ts`, just not wired in.**
- **BGE-reranker-v2-m3** — open weights (Apache-2.0), 100+ languages, 50–100ms GPU latency, "topped the chart for multi-hop/fuzzy intent" ([BSWEN](https://docs.bswen.com/blog/2026-02-25-best-reranker-models/)).
- **mxbai-rerank-large-v2** (1.5B, Qwen-2.5 based) — open weights, runs in your VPC on one A10/L4 ([BSWEN](https://docs.bswen.com/blog/2026-02-25-best-reranker-models/)).
- **MedCPT cross-encoder** — biomedical-native reranker half of MedCPT ([GitHub](https://github.com/ncbi/MedCPT)).

**Why it helps clinical search.** Cross-encoders "outperform bi-encoders by 10–30% on semantic retrieval" ([ZeroEntropy](https://zeroentropy.dev/articles/should-you-use-llms-for-reranking-a-deep-dive-into-pointwise-listwise-and-cross-encoders/)). For a query like "newest evidence on lecanemab for Alzheimer disease," it reads the abstract and *understands* the intervention/outcome rather than counting keyword hits.

**Feasibility in Manan.** **Cohere path = trivial** (key already supported, code already written, just call it after RRF on ≤50 docs ⇒ one API call, ~600ms, fail-open). MedCPT/BGE path = needs a small Python inference service or ONNX/transformers.js (more infra). **Start with Cohere; graduate to MedCPT if you want zero API spend + biomedical specialization.**

### 4. Reciprocal Rank Fusion (you have this — use it correctly)

**What it is.** Combine ranked lists by summing `1/(k+rank)`, `k≈60` — exactly `rank-fusion.ts`. Standard for fusing lexical+dense or multi-source ([AppScale](https://appscale.blog/en/blog/hybrid-search-and-reranking-production-rag-bm25-dense-cross-encoder-2026)).

**Why/feasibility.** Already implemented and correct. Caveat (see §1): RRF treats PubMed Best-Match and OpenAlex's plainer relevance as equal votes; consider **weighting RRF by source trust** (PubMed > OpenAlex for clinical) or letting the cross-encoder be the final arbiter so RRF only governs *candidate recall*, not final order.

### 5. LLM-as-reranker / listwise (RankGPT) — the Undermind/Consensus precision stage

**What it is.** Feed the LLM a query + a list of candidates and have it output a reordered list (listwise) or per-doc relevance (pointwise). **Undermind**: GPT-4 directly classifies each paper as "highly relevant / closely relevant / not relevant," with ~2% false-negative on highly-relevant papers and <4% false-positive, run over **3 adaptive search cycles** with capture-recapture recall estimation ([Aaron Tay analysis](https://aarontay.substack.com/p/undermindai-different-type-of-ai-agent); [Undermind](https://www.undermind.ai/)). **Consensus**: final stage "recalculates textual relevance using a larger, more powerful AI model optimized for precision… runs only on the top 20 papers" ([How Consensus Works](https://help.consensus.app/en/articles/9922673-how-consensus-works)).

**Why it helps.** Best precision on hard, multi-constraint clinical questions; can also produce the per-paper "why relevant" you currently template deterministically.

**Cost/feasibility.** "Listwise improvement is modest (0.78 vs 0.74 NDCG@10) but 9x the cost and 35x the latency vs specialized rerankers" ([WebSearch synthesis / ZeroEntropy](https://zeroentropy.dev/articles/llm-as-reranker-guide/)). **Recommendation: hybrid** — cross-encoder narrows to top-10, LLM listwise re-orders only those, *opt-in* (e.g., a "deep search" toggle) to bound cost/latency. Never make it the default path.

### 6. ColBERT / late interaction

**What it is.** Per-token embeddings with MaxSim late interaction — "near cross-encoder quality at medium speed"; at 40 QPS ColBERT p50 ≈ 23ms vs cross-encoder p99.9 > 21s ([ColBERT paper](https://arxiv.org/pdf/2004.12832); [AppScale](https://appscale.blog/en/blog/hybrid-search-and-reranking-production-rag-bm25-dense-cross-encoder-2026)).

**Feasibility in Manan.** *Low priority.* Its win is high-QPS index-time retrieval; you rerank only ~50 docs per query where a cross-encoder's latency is fine. Skip unless you later build your own embedded corpus.

### 7. HyDE (Hypothetical Document Embeddings)

**What it is.** Zero-shot prompt an LLM to write a *fake ideal answer/abstract* for the query, embed that, and retrieve neighbours — bridges the query↔document vocabulary gap ([emergentmind](https://www.emergentmind.com/topics/hypothetical-document-embeddings-hyde); [Haystack docs](https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde)). Domain role-conditioning ("As a board-certified physician…") materially helps in medicine ([survey](https://arxiv.org/pdf/2412.17558)).

**Feasibility in Manan.** *Medium.* Cheaper, query-planner-adjacent variant: have an LLM expand the NL query into a **richer keyword/MeSH boolean** (a "hypothetical PubMed strategy") rather than a fake abstract — this slots directly into `query-planner.ts`/`query-expander.ts` and needs no vector store. Full embedding-HyDE only pays off once you have dense retrieval.

### 8. MeSH-based query expansion

**What it is.** Map free text to MeSH descriptors and OR them in. PubMed already auto-maps; explicit expansion "generally improves retrieval… increases recall but often decreases precision," and the best strategy *varies by descriptor* — MeSH best precision (51%), UMLS best recall/F (41%/36%) ([Lu et al.](https://pubmed.ncbi.nlm.nih.gov/19774223/); [JMIR comparative study](https://medinform.jmir.org/2020/6/e12799)).

**Feasibility in Manan.** *Medium.* `query-expander.ts` already hand-codes drug-class→drug-name synonyms; a principled upgrade is to call NCBI's **E-utilities/MeSH API** (free) to fetch entry terms dynamically instead of maintaining a static map. Apply expansion to the **fallback** query only (precision-preserving), since the primary already uses Best-Match.

### 9. Evidence hierarchy / study-type weighting

**What it is.** Up-weight SR/MA > RCT > cohort > case-report. Already in `evidence-level.ts` + `quality-ranker.ts` (`evidenceWeight 0.25`). Consensus likewise re-ranks by "how strong the research is" ([How Consensus Works](https://help.consensus.app/en/articles/9922673-how-consensus-works)).

**Feasibility.** Done. Improvement: detection currently leans on OpenAlex `type` (mostly "article"/"review") which under-classifies; prefer **PubMed Publication Types** (which carry "Randomized Controlled Trial", "Meta-Analysis", "Systematic Review", "Practice Guideline") as the authoritative study-type source — already mapped in `mapPubMedPublicationType`. Make PubMed the source of truth for `studyType` whenever a PMID exists.

### 10. Citation count, citation velocity, and landmark vs recency balance

**What it is.** Citations signal impact; **velocity** (citations/year since publication) separates fast-rising new work from old-but-stale; landmark trials need a recency-independent boost. Consensus explicitly blends "citation count, velocity of citations, and publish date" ([How Consensus Works](https://help.consensus.app/en/articles/9922673-how-consensus-works)).

**Feasibility in Manan.** *Low cost, high value.* `quality-ranker.ts` uses log-citations only. You already enrich `citationCount` + `year` from OpenAlex. Add a derived **velocity = citationCount / max(1, currentYear − year)** signal so a 2-year-old, 400-citation trial isn't buried under a 20-year-old review. This directly fixes the recency-vs-landmark tension `rankAndAnnotate`'s `recency` flag handles too bluntly (pure year sort).

### 11. Retraction / erratum detection

**What it is.** Flag retracted/corrected papers. **Crossref now hosts the Retraction Watch database** — query `api.crossref.org/works/{DOI}` and read the `update-to` / `relation` fields (source = `retraction-watch` or `publisher`); updated every working day ([Crossref RW docs](https://www.crossref.org/documentation/retrieve-metadata/retraction-watch/); [announcement](https://www.crossref.org/blog/retraction-watch-retractions-now-in-the-crossref-api/)). PubMed independently links retraction notices and supports the `"Retracted Publication"[pt]` / `"Retraction of Publication"[pt]` filters ([NLM errata policy](https://www.nlm.nih.gov/bsd/policy/errata.html); [HSLS filters](https://hsls.libguides.com/PubMed-search-filters/retractions-corrections)). Coverage differs — RW has more than Crossref, so check both ([comparison study](https://www.tandfonline.com/doi/full/10.1080/08989621.2025.2484555)).

**Feasibility in Manan.** *Medium, high trust-value.* This is **task #6**. Add a Crossref source/enricher: for each result with a DOI, check the Crossref `update-to`/`relation`; add a `retracted` / `has_erratum` flag (surface it, like other `flags[]` in `pipeline.ts`) and **down-rank or badge** retracted papers. Never silently drop — flag per the no-hallucination rule.

### 12. Journal quality (you have Scimago — keep it)

Already implemented via `journal-quality.ts` (Scimago quartile + cites/doc). Aligns with Consensus's quality re-rank. No change needed beyond ensuring `enrichJournalQuality` runs before scoring (it does, in `pipeline.ts`).

### 13. MMR diversity

**What it is.** `MMR = (1−λ)·relevance − λ·max_sim(selected)` to reduce near-duplicate results ([OpenSearch](https://docs.opensearch.org/latest/vector-search/specialized-operations/vector-search-mmr/); [Qdrant](https://qdrant.tech/blog/mmr-diversity-aware-reranking/)). Prevents the top-10 from being ten near-identical meta-analyses of the same trial.

**Feasibility in Manan.** *Low-medium.* Needs a cheap similarity between results — title/abstract token-Jaccard works without embeddings. Apply as a *light* post-rerank pass (λ≈0.3) on the top-N so the result page shows complementary evidence. Optional polish, not core.

### 14. PICO extraction

**What it is.** Structure the query/abstracts into Population/Intervention/Comparison/Outcome. GPT-4o extracted PICO from ~683k abstracts at up to 98% accuracy ([Springer PoC](https://link.springer.com/article/10.1007/s40290-024-00539-6); [AlpaPICO](https://arxiv.org/html/2409.09704v1)). The `pico` field already exists in `UnifiedSearchResult` but is unpopulated.

**Feasibility in Manan.** *Medium.* Use an LLM to extract PICO from the *query* (cheap, one call) to drive better expansion and to power a structured "why relevant" (matches on Intervention + Outcome). Per-result PICO extraction is more expensive — reserve for the top-N shown.

---

## (c) Prioritized, Actionable Backlog (ordered by impact ÷ effort)

| # | Technique | Impact | Effort | Infra / Cost | Maps to file |
|---|-----------|:---:|:---:|---|---|
| 1 | **Wire Cohere `rerank-v3.5` into the pipeline** (rerank top ~50 fused candidates by query↔title+abstract, fail-open to current order) | **High** | **XS** | Existing `COHERE_API_KEY`; 1 API call ~600ms | `run-search.ts` (call `rerankResults` after `enrichCitationsByIds`, before `rankAndAnnotate`), `rerank.ts` (already built), `pipeline.ts` (consume `rerankScore`) |
| 2 | **Use rerank score as the dominant relevance signal** in the composite (replace/augment binary keyword overlap) | **High** | **XS** | none | `quality-ranker.ts` (`relevanceWeight` → driven by `rerankScore` when present), `types/search.ts` (`rerankScore` exists) |
| 3 | **Retraction/erratum flagging via Crossref Retraction Watch + PubMed pubtypes** (badge + down-rank, never drop) | **High** | **S** | Crossref REST API (free) | new `sources/crossref.ts` enricher, `pipeline.ts` `buildFlags`, `quality-ranker.ts` penalty — **(task #6)** |
| 4 | **Citation velocity signal** (citations ÷ years-since-pub) to balance landmark vs recency | Med-High | **XS** | none (already have citations+year) | `quality-ranker.ts` (add `velocity` signal), `pipeline.ts` trace |
| 5 | **Make PubMed Publication Types the authoritative study-type** when a PMID exists (fixes OpenAlex under-classification) | Med-High | **S** | none | `study-type-detector.ts`, `sources/pubmed.ts`, `evidence-level.ts` |
| 6 | **Weight RRF by source trust** (PubMed Best-Match > OpenAlex) so tuned PubMed order isn't diluted | Medium | **XS** | none | `rank-fusion.ts` (per-source weight), `run-search.ts` |
| 7 | **LLM query→boolean expansion (lightweight HyDE)** for the fallback query (NL → MeSH/keyword strategy) | Medium | **S** | 1 LLM call (opt-in) | `query-planner.ts`, `query-expander.ts` |
| 8 | **Dynamic MeSH expansion via NCBI E-utilities** (replace static synonym map) | Medium | **M** | E-utilities (free) | `query-expander.ts` |
| 9 | **Optional LLM listwise rerank on top-10** behind a "deep search" toggle (Undermind/Consensus precision stage) | Medium | **M** | LLM cost; opt-in only | `pipeline.ts`, new `llm-rerank.ts` — **(task #7 reranking)** |
| 10 | **MedCPT cross-encoder as a free, biomedical, self-hosted reranker** (alternative/fallback to Cohere) | Medium | **L** | Python/ONNX inference service or transformers.js | new `rerank-medcpt.ts`, swap behind `rerank.ts` interface |
| 11 | **MMR diversity pass** (token-Jaccard, λ≈0.3) on top-N to de-duplicate near-identical results | Low-Med | **S** | none | `pipeline.ts` post-rank |
| 12 | **PICO extraction of the query** to power expansion + structured "why relevant" | Low-Med | **M** | 1 LLM call | `query-planner.ts`, `pipeline.ts` (`pico` field exists) |
| 13 | **Dense semantic first-stage retrieval over a pre-embedded corpus** (true Elicit parity) | High | **XL** | Vector store + embedding pipeline over millions of records | net-new subsystem — *defer; not cost-justified now* |

**Why this order:** items 1–2 are a few hours of wiring that activate the most powerful relevance technique in IR using infra you already pay for, and they directly serve the in-progress **task #4** ("wire ranking pipeline"). Items 3–6 are small, high-trust correctness wins. Items 9–10 map to **task #7**. Item 13 is the only thing Manan genuinely *can't* cheaply match and should stay deferred.

---

## (d) Recommended Target Reranking Architecture

A staged cascade that degrades gracefully and bounds latency:

```
Stage 0  RETRIEVE (recall)        PubMed Best-Match + OpenAlex  [+ optional S2/CT.gov]
            │  over-fetch ~50–80 per source
Stage 1  FUSE                      RRF (rank-fusion.ts), source-trust weighted
            │  dedup (dedup.ts) → ~50 unique candidates
Stage 2  ENRICH                    OpenAlex citations + Scimago quartile
            │                      + Crossref retraction/erratum flags
Stage 3  RERANK (relevance)  ◀── THE NEW STAGE
            │  Primary:   Cohere rerank-v3.5 on top ~50 (query ↔ title+abstract)
            │  Fallback A: MedCPT / BGE cross-encoder (self-hosted, no API)
            │  Fallback B: current binary keyword overlap (today's behaviour)
            │  → writes rerankScore
Stage 4  QUALITY COMPOSITE         weighted blend, rerankScore as dominant relevance:
            │  relevance(rerankScore) · 0.40
            │  evidence-level         · 0.20
            │  citation (log) + VELOCITY · 0.15
            │  journal quartile       · 0.10
            │  RRF prior              · 0.10
            │  recency (when intent)  · 0.05
            │  − retraction penalty
Stage 5  DIVERSIFY (optional)      MMR λ≈0.3 on top-N (token-Jaccard)
Stage 6  DEEP (opt-in toggle)      LLM listwise rerank on top-10 only
            → annotate (trace, flags, whyRelevant) — pipeline.ts
```

**Signal set into the final score:** rerank relevance (dominant), evidence level, log-citations + velocity, journal quartile, RRF prior, recency-when-asked, retraction penalty. Drop binary keyword overlap to a *fallback-only* role.

**Model choice & fallback order:** `Cohere rerank-v3.5` (default, you already have the key) → `MedCPT`/`BGE-reranker-v2-m3` self-hosted (if you want zero per-query API cost + biomedical specialization) → heuristic keyword overlap (always-available floor). Each layer fails open to the next (the existing `rerank.ts` try/catch pattern).

**Latency budget:** Stages 0–2 dominated by network fan-out (already 8–9s timeouts). Stage 3 adds **one Cohere call (~600ms)** over ≤50 docs — negligible and parallelizable. Keep Stage 6 (LLM listwise, +2–10x latency, [ZeroEntropy](https://zeroentropy.dev/articles/llm-as-reranker-guide/)) strictly opt-in. Total added p50 for the default path: **<1s**.

**Constraint compliance:** No S2 dependency (Cohere/MedCPT are S2-independent); Elicit never called; missing metadata still flagged via `buildFlags`; retraction *flagged*, not hidden.

---

## (e) What Makes Elicit Good — What We Can / Can't Replicate

**Can replicate (and should):**
- **Cross-encoder/semantic reranking of candidates.** This is most of the precision and is fully reproducible with Cohere or MedCPT on the fused set. *(Backlog #1–2,10)*
- **Quality-aware re-ranking** (evidence level, citations, velocity, journal, recency). Already partly done; Consensus's exact recipe is matchable. *(#4–5)*
- **Conservative, recall-first screening + honest "we don't know" surfacing.** Elicit advances papers on "yes/maybe," never silently drops; Manan's `flags[]`/`whyRelevant` no-hallucination posture is the same philosophy. *(already aligned)*
- **Adaptive multi-cycle search + LLM relevance judging** (Undermind's 3 cycles, capture-recapture recall estimate). Reproducible as an opt-in "deep search" loop. *(#9)*
- **Retraction/quality trust signals** Elicit/Consensus surface. *(#3)*

**Can replicate but not cheaply (defer):**
- **Dense first-stage retrieval over a pre-embedded 100M+ corpus.** Elicit's 95% title-only recall comes from embedding *their whole corpus* ([Elicit eval](https://elicit.com/blog/evaluating-elicit-slr)). Manan would need a vector store + an embedding pipeline over millions of records — real infra spend. **Mitigation:** PubMed Best-Match + OpenAlex already deliver strong first-stage recall, and a cross-encoder rerank closes much of the *precision* gap without the index. The relevant honest framing: *we match Elicit's reranking, not its corpus pre-embedding.*

**Can't / shouldn't replicate:**
- **Proprietary full-text indexing and screening models** validated on Cochrane reviews ([Elicit SLR eval](https://elicit.com/blog/how-we-evaluated-elicit-slr)) — out of scope (no proprietary full-text per constraints).
- **Their private click/usage signal.** Elicit and PubMed Best-Match both exploit usage logs Manan doesn't have. **Partial substitute:** lean on PubMed Best-Match order (which *encodes* NIH-scale click data) as a strong prior — i.e., let PubMed's tuned ranking do that job for you rather than re-deriving it.

---

## (f) Web-Fallback Role (Tavily / web search) — Scoped to Not Pollute Clinical Rankings

Per **task #7**, web search has three *safe* uses, all kept **out of the primary relevance ranking**:
1. **Identifier repair.** Given a title/partial citation with a missing/broken DOI or PMID, use Tavily/web to find the canonical DOI, then re-resolve through Crossref/PubMed. The *web result itself never enters the ranked list* — only the repaired identifier does, and the paper is then re-fetched from a primary source.
2. **Recency / grey literature / guidelines.** For "latest guideline on X" where PubMed indexing lags, web search can surface a society guideline URL. Surface these in a **separate, clearly-labelled "web / grey literature" lane** with `trustTier` set (the type already has `trustTier` + `domainPreferenceLevel`), never interleaved into the peer-reviewed clinical ranking.
3. **Disambiguation context** for query planning (e.g., confirming a trial acronym maps to a specific NCT id) — used to improve the *query*, not as a result.

**Guardrail:** the existing `trust-tier.ts` + `domainPreferenceLevel` machinery is exactly the right gate — web results get `trustTier: "other"`/`"major_journalism"` and are `mute`/`lower` by default in clinical mode, so a blog post can never out-rank a Q1 RCT.

---

## Sources

- Elicit — [Evaluating Elicit's SLR](https://elicit.com/blog/evaluating-elicit-slr) · [How we evaluated Elicit Systematic Review](https://elicit.com/blog/how-we-evaluated-elicit-systematic-review) · [Anara: Elicit for literature reviews](https://anara.com/blog/elicit-literature-reviews) · [SMU Libraries on Elicit](https://library.smu.edu.sg/topics-insights/elicitorg-impressive-new-academic-search-engine-leverages-large-language-models)
- Undermind — [Aaron Tay deep analysis](https://aarontay.substack.com/p/undermindai-different-type-of-ai-agent) · [Undermind.ai](https://www.undermind.ai/) · [Katina Magazine](https://katinamagazine.org/content/article/main-section/2024/undermind-ai-shows-the-power-of-successive-search)
- Consensus — [How Consensus Works (Help Center)](https://help.consensus.app/en/articles/9922673-how-consensus-works) · [Consensus + Elastic/ELSER](https://www.elastic.co/customers/consensus)
- PubMed Best Match — [Fiorini et al., PLOS Biology 2018](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2005343) · [JMLA explainer](https://pmc.ncbi.nlm.nih.gov/articles/PMC8830327/) · [ncbi-nlp/PubMed-Best-Match](https://github.com/ncbi-nlp/PubMed-Best-Match)
- SPECTER2 — [Ai2 blog](https://medium.com/ai2-blog/specter2-adapting-scientific-document-embeddings-to-multiple-fields-and-task-formats-c95686c06567) · [allenai/SPECTER2](https://github.com/allenai/SPECTER2) · [HF allenai/specter2](https://huggingface.co/allenai/specter2)
- MedCPT — [Bioinformatics 2023 (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12478430/) · [arXiv](https://arxiv.org/pdf/2307.00589) · [ncbi/MedCPT](https://github.com/ncbi/MedCPT) · [NeuML/pubmedbert-base-embeddings](https://huggingface.co/NeuML/pubmedbert-base-embeddings)
- Rerankers — [BSWEN reranker comparison 2026](https://docs.bswen.com/blog/2026-02-25-best-reranker-models/) · [Local AI Master reranking guide](https://localaimaster.com/blog/reranking-cross-encoders-guide) · [ZeroEntropy LLM-as-reranker](https://zeroentropy.dev/articles/should-you-use-llms-for-reranking-a-deep-dive-into-pointwise-listwise-and-cross-encoders/) · [ZeroEntropy guide](https://zeroentropy.dev/articles/llm-as-reranker-guide/)
- IR techniques — [ColBERT](https://arxiv.org/pdf/2004.12832) · [AppScale hybrid search & reranking 2026](https://appscale.blog/en/blog/hybrid-search-and-reranking-production-rag-bm25-dense-cross-encoder-2026) · [TDS cross-encoders & reranking](https://towardsdatascience.com/advanced-rag-retrieval-cross-encoders-reranking/)
- HyDE — [emergentmind](https://www.emergentmind.com/topics/hypothetical-document-embeddings-hyde) · [Haystack docs](https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde) · [Query optimization survey](https://arxiv.org/pdf/2412.17558)
- MeSH expansion — [Lu et al. 2009](https://pubmed.ncbi.nlm.nih.gov/19774223/) · [JMIR 2020 comparative study](https://medinform.jmir.org/2020/6/e12799)
- Retraction — [Crossref Retraction Watch docs](https://www.crossref.org/documentation/retrieve-metadata/retraction-watch/) · [Crossref RW announcement](https://www.crossref.org/blog/retraction-watch-retractions-now-in-the-crossref-api/) · [NLM errata policy](https://www.nlm.nih.gov/bsd/policy/errata.html) · [HSLS retraction filters](https://hsls.libguides.com/PubMed-search-filters/retractions-corrections) · [RW vs PubMed vs WoS comparison](https://www.tandfonline.com/doi/full/10.1080/08989621.2025.2484555)
- MMR — [OpenSearch MMR](https://docs.opensearch.org/latest/vector-search/specialized-operations/vector-search-mmr/) · [Qdrant MMR](https://qdrant.tech/blog/mmr-diversity-aware-reranking/)
- PICO — [GPT-4o PICO PoC (Springer)](https://link.springer.com/article/10.1007/s40290-024-00539-6) · [AlpaPICO](https://arxiv.org/html/2409.09704v1)
</content>
</invoke>
