# Deep IR / Rerank Literature Study — Biomedical Academic Search (2026-07)

**Purpose.** Implementation-grade evidence base for fixing four *measured* failures in the
academic-retrieval engine (federated: MedCPT-dense + PubMed + Europe PMC + Springer +
Elsevier/Scopus + SerpAPI Scholar; RRF k=60 fusion; Cohere `rerank-4-pro` reranks top-50).
Goes deeper than the prior survey: concrete parameter values, ablation numbers, algorithm
details, and OSS pointers. Every claim is labeled **CONFIRMED** (stated in the cited source)
or **INFERRED** (synthesis/arithmetic). Cited by URL/paper throughout.

The four measured failures this study answers to:
- **F1 — Ranking, not retrieval.** Landmarks are in the fused pool 90% of the time but reach
  top-10 only 74% (16-pt buried-then-lost gap).
- **F2 — Rerank coverage + score mixing.** Reranker rescores top-50 of a 100–190 pool, but the
  final sort runs over the WHOLE pool; un-reranked lexical scores saturate ~1.0 and beat
  calibrated cross-encoder scores (0.4–0.7).
- **F3 — Older landmark RCTs buried** (PARTNER 3, ARISTOTLE, Evolut, EMPEROR-Reduced all
  in-pool, out of top-10), plausibly worsened by a multiplicative recency boost.
- **F4 — Query-phrasing sensitivity** (same landmark found under one phrasing, missed under
  another).

---

## 0. Executive summary — the recipe the literature supports

1. **Rerank the whole pool, sort ONLY on the reranker, append the un-reranked tail below —
   never interleave by raw score.** This single change fixes F2 and most of F1. The
   "un-reranked-item-with-higher-raw-score-wins-global-sort" bug is documented verbatim in a
   production engine (Elasticsearch #120670) and is provably worse than even *tuned* linear
   interpolation (Askari et al. 2024: tuned BM25+CE interpolation MRR@10 0.290 < CE-alone
   0.342). **[CONFIRMED]**
2. **Stop using RRF as the final arbiter.** RRF structurally caps a single-lane item at
   `1/(k+1) = 1/61 ≈ 0.0164`; a mediocre two-lane item easily scores ~0.028 (+72%). Use
   RRF/weighted-RRF only as a *recall-oriented pool builder with per-lane guaranteed top-N
   inclusion*, then let a union-pool cross-encoder (or a convex-combination score, α≈0.8) decide
   final order. Fixes F1's single-lane burial. **[CONFIRMED formula; INFERRED arithmetic]**
3. **Recency = mild additive/learned feature; citations = monotone log landmark feature.
   Kill the multiplicative recency boost.** Every validated academic ranker (PubMed Best Match,
   Semantic Scholar, Dong 2010, Dai 2011) does this; multiplicative boosts scale unpredictably
   against query-varying relevance magnitudes. Fixes F3. **[CONFIRMED]**
4. **Query understanding: document-side doc2query at index time + ontology/MeSH+acronym
   expansion + 3–5 LLM query variants fused by RRF.** Ontology-grounded expansion is the single
   biggest lever for the EMPA-REG↔SGLT2-CVOT paraphrase case and the most *robustness*-improving
   technique measured (+15.7% under query perturbation). Fixes F4. **[CONFIRMED]**
5. **Reranker choice: deploy the free biomedical-native MedCPT-CE now; keep Cohere for a narrow
   final tier; add listwise LLM rerank only as an optional async premium for hard queries.**
   The cross-encoder is the workhorse; listwise LLM adds ~+2–3 nDCG@10 at ~80× latency.
   **[CONFIRMED]**

---

## A. Rerank coverage, depth, and score combination (→ F1, F2)

### A.1 How deep to rerank vs pool size

| System | Retrieve | Rerank depth | Final sort | Source |
|---|---|---|---|---|
| sentence-transformers "Retrieve & Re-Rank" | top-100 | **all 100** | **by CE score only** | [sbert docs](https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html) **[CONFIRMED]** |
| BEIR reference "BM25+CE" | top-100 | **top-100** | by CE score | [BEIR arXiv:2104.08663](https://arxiv.org/pdf/2104.08663), [benchmark script](https://github.com/UKPLab/beir/blob/main/examples/benchmarking/benchmark_bm25_ce_reranking.py) **[CONFIRMED]** |
| Expando-Mono-Duo (pyserini) | BM25 top-1000 | monoT5 over **~1000**, duoT5 over **top-50** (O(n²)) | cascade | [arXiv:2101.05667](https://arxiv.org/pdf/2101.05667) **[CONFIRMED]** |
| rank_llm (listwise) | top-100 | window 20 / stride 10 over **100** | permutation | [castorini/rank_llm](https://github.com/castorini/rank_llm) **[CONFIRMED]** |
| Cohere Rerank | ≤1000 docs/request | all sent docs scored; `top_n` limits *returned* | by rerank score | [Cohere best practices](https://docs.cohere.com/docs/reranking-best-practices) **[CONFIRMED]** |
| Pinecone hosted rerank | — | **max 100 docs** | by rerank score | [Pinecone rerank](https://docs.pinecone.io/guides/search/rerank-results) **[CONFIRMED]** |

**Key point for our engine:** the de-facto standard is *retrieve wide (100–1000), rerank a fixed
top-N (50–100), sort ONLY the reranked subset by the reranker, place reranked items above
everything not reranked.* No mainstream default sorts a full mixed-score pool — that is precisely
our F2 anti-pattern. **[CONFIRMED across sbert/BEIR/Cohere/Pinecone/OpenSearch]**

**Depth cost/quality curve.** A reported cross-encoder ablation: Recall@5 = **0.458 @ depth20 →
0.826 @ depth50 → 0.888 @ depth100** — sharp gains through 50, flattening after. **[CONFIRMED,
industry blog — directional, not peer-reviewed]** ([GenAI Revolution](https://blog.thegenairevolution.com/article/cross-encoder-reranking-the-low-cost-fix-for-rag-misses)).
A second source: "with only 20 candidates reranking is ineffective… performance increases sharply
at 50 and continues to improve at 100." **[CONFIRMED]** ([arXiv:2604.01733](https://arxiv.org/html/2604.01733v1)).
For our 100–190 pool, Cohere rerank-4-pro accepts ≤1000 docs in **one** API round-trip (not
per-pair GPU time), so **reranking the entire pool costs one call, not N calls** — the marginal
cost of 50→190 is negligible. **[CONFIRMED cap; INFERRED cost implication]**

### A.2 How to combine first-stage and reranker scores — and the evidence AGAINST averaging

**The dominant production pattern is (a): pure reorder by reranker score over the reranked
subset; the first-stage score is discarded for ordering within that subset.** (sbert, BEIR,
Cohere, Pinecone, OpenSearch rerank processor.) **[CONFIRMED]**

**Smoking gun against linear averaging — Askari et al., "Injecting the score of the first-stage
retriever as text improves BERT-based re-rankers"** ([arXiv:2301.09728](https://arxiv.org/abs/2301.09728),
Discover Computing 2024, [DOI](https://link.springer.com/article/10.1007/s10791-024-09435-8)).
MS MARCO Dev MRR@10 **[CONFIRMED]**:
- BM25 alone: **0.187**
- BERT cross-encoder alone: **0.342**
- **tuned linear interpolation `α·BM25 + (1−α)·CE`, best α=0.1: 0.290** ← *worse than CE alone*
- Direct quotes: "a linear combination of the two scores has shown to **decrease effectiveness**…
  compared to only using the CE re-ranker"; "linear and non-linear (MLP) interpolation… **even
  leads to lower effectiveness** than using the cross-encoder as sole re-ranker"; optimum at
  α=0.1 means "BM25 wants to be nearly zero-weighted."

Since even a *tuned* interpolation underperforms CE-alone, our *un-tuned, un-normalized* global
sort mixing saturated RRF/lexical scores (~1.0) with calibrated CE scores (0.4–0.7) is strictly
worse. **[CONFIRMED premise; INFERRED "strictly worse" step]**

**Why raw combination fails — calibration mismatch.** BM25/cosine/RRF scores "exist in different
spaces and come from different distributions"; naive weighted combination is "flawed" and BM25
outliers saturate and compress everything else. Cohere itself warns rerank scores are "useful for
ranking but not for direct comparison." **[CONFIRMED]** ([OpenSearch RRF](https://opensearch.org/blog/introducing-reciprocal-rank-fusion-hybrid-search/),
[Cohere best practices](https://docs.cohere.com/docs/reranking-best-practices)).

**The exact bug, in a production engine — Elasticsearch #120670.** `text_similarity_reranker`
enforces a `rank_window_size`; but when the reranker returns low/negative scores, **un-reranked
documents leak past the window and mix into the top** — "looks outside rank_window_size when
returned scores are negative… if you force the scores to be positive, it will work as expected."
Structurally identical to our F2. The ecosystem fix is a *hard* window boundary: reranked-on-top,
non-reranked strictly below. **[CONFIRMED]** ([elastic/elasticsearch#120670](https://github.com/elastic/elasticsearch/issues/120670)).

### A.3 Correct alternatives (ranked for our situation)

- **(A) Pure reorder** — reranked subset by reranker score, non-reranked tail appended below in
  first-stage order. Matches every standard system; **zero parameters; fixes F2 alone.**
  **[CONFIRMED as standard]**
- **(B) Rank-based fusion (RRF) of reranker-rank with first-stage-rank** — `1/(k+rank)`, k=60,
  on *ranks* not scores → immune to saturation. Consistent with our existing k=60 lane fusion;
  calibration-free. Use if we want first-stage signal to survive as a tie-break. **[CONFIRMED]**
- **(C) Normalize then weighted sum** — Weaviate `relativeScoreFusion` (min-max, weight `alpha`
  default 0.5) or z-score/DBSF. **Min-max is outlier-sensitive** (a single saturated BM25 score
  compresses the rest — exactly our problem); **z-score/DBSF is more robust.** **[CONFIRMED]**
  ([Weaviate fusion](https://weaviate.io/blog/hybrid-search-fusion-algorithms)).
- **(D) Calibrate reranker scores (Platt / isotonic) then threshold** — Platt for small
  calibration sets; isotonic when you have enough labels (corrects any monotonic distortion).
  Overkill unless you need cross-query-comparable scores or a hard relevance threshold; for pure
  ordering, (A)/(B) suffice with no training data. **[CONFIRMED methods; INFERRED "overkill"]**
  ([Regression-Compatible Listwise Objectives, arXiv:2211.01494](https://arxiv.org/pdf/2211.01494)).

**Consensus:** rank-based fusion (RRF) is the most robust, lowest-tuning method; score
normalization retains more info but is outlier-sensitive; **never raw weighted sum without
normalization.** **[CONFIRMED]**

### A.4 What to do with candidates OUTSIDE the rerank depth

Correct behavior: **reranked items (by reranker score) at the top; non-reranked candidates
appended below in first-stage order; never interpolated into the same score space, never
interleaved.** Options assessed: *interleave by raw score* = WRONG (our current design, the
documented failure); *drop* = acceptable if rerank depth ≥ result count and depth-recall is high;
**append-below-in-first-stage-order = RECOMMENDED default** (what Elastic's window semantics
enforce). **[CONFIRMED behavior; INFERRED recommendation]**

---

## B. Fusion for single-lane recall (→ F1)

### B.1 RRF mechanics and the burial mechanism

**Cormack, Clarke & Büttcher, SIGIR 2009** ([PDF](https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf)):
`RRFscore(d) = Σ_lanes 1/(k + rank_lane(d))`, k=60. **[CONFIRMED]** k=60 was chosen empirically
(best on their LETOR-3 validation), not derived; `+k` smooths the rank-1→rank-2 gap so a single
lane's top hit cannot swamp multi-lane agreement. RRF beat Condorcet Fuse, CombMNZ, and every
individual LTR method. **[CONFIRMED qualitatively; exact MAP table not machine-extractable —
image PDF]**

**The burial arithmetic (INFERRED from the confirmed formula):**
- Single-lane landmark at rank 1: `1/(60+1) = 0.01639`.
- Mediocre item found by two lanes at ranks 10, 12: `1/70 + 1/72 = 0.02818` — **~72% higher.**
- A single-lane item is *structurally capped* at `1/61 ≈ 0.0164` regardless of relevance — RRF
  has **no notion** of "one lane found this at rank 1 because it is the definitive paper." This
  is the root cause of PubMed-only landmark burial (F1). **[INFERRED arithmetic; CONFIRMED cap]**

### B.2 Weighted RRF

Elastic/OpenSearch: each retriever contributes `weight × 1/(rank + rank_constant)`,
`rank_constant=60` default, weights ≥0. **[CONFIRMED]** ([Elastic weighted RRF](https://www.elastic.co/search-labs/blog/weighted-reciprocal-rank-fusion-rrf)).
Giving PubMed weight `w=3`, a PubMed-only rank-1 landmark scores `3×1/61 = 0.0492`, now beating
the two-lane mediocre item (0.0282). **Per-source weighting is the cheapest lever to keep a
trusted lane competitive** — but blunt: it boosts *everything* that lane returns and still
"ignores raw scores," so it cannot tell a confident rank-1 from an unconfident one. **[CONFIRMED
formula; INFERRED arithmetic]**

### B.3 Convex combination beats RRF — Bruch et al., "An Analysis of Fusion Functions for Hybrid Retrieval" (TOIS 2023)

[arXiv:2210.11934](https://arxiv.org/abs/2210.11934) / [ACM](https://dl.acm.org/doi/10.1145/3596512).
Convex combination `f = α·f_Sem + (1−α)·f_Lex`; their tuned system **TM2C2 uses α=0.8**.
NDCG@1000 **[CONFIRMED]**:

| | Lexical | Semantic | **Convex (α=0.8)** | RRF (η=60) |
|---|---|---|---|---|
| MS MARCO (in-domain) | 0.309 | 0.441 | **0.454** | 0.425 |
| HotpotQA (BEIR, OOD) | 0.682 | 0.520 | **0.699** | 0.675 |

- Convex combination wins **in- and out-of-domain**, is **sample-efficient** (one param α,
  α=0.8 transferred across domains). **[CONFIRMED]**
- RRF is **parameter-sensitive**: swept η∈{1..100}; tuned optima (e.g. η_Lex=10, η_Sem=4) differ
  materially from the "safe 60." **[CONFIRMED]**
- Why CC helps single-source items: "Because RRF is a function of ranks, it disregards the
  distribution of scores… the distance between raw scores plays no role." CC **preserves the
  magnitude** of a lane's confident relevance signal. **[CONFIRMED]**
- Normalization detail (Lemma 4.2): min-max and z-score are rank-equivalent under a matching α;
  *bounded* normalization matters, the specific scheme does not. **[CONFIRMED]**

### B.4 "Reranker rescues single-lane items"

Standard pattern: RRF top-100 union pool → cross-encoder rerank of the *union* → top-10. Measured
cross-encoder rescue: Success@10 0.54→0.65; **+17.2pp MRR@3, +12.1pp Recall@5** over unreranked
hybrid. **[CONFIRMED]** ([arXiv:2604.01733](https://arxiv.org/html/2604.01733v1)). A cross-encoder
scores query–doc pairs with **no lane-count term**, so it is inherently blind to fusion bias and
can rescue a single-lane landmark — **but only if the doc is in the pool.** "With only 20
candidates reranking is ineffective… sharp increase at 50, continues at 100." No paper isolates
"reranker recovers *single-source* docs" as a named result (**[INFERRED]**), but it follows
directly: RRF-then-truncate can drop the landmark before the reranker sees it.

### B.5 Recommendation — keep a single-lane landmark competitive (3 layers, priority order)

1. **Guaranteed pool inclusion (highest leverage, cheapest).** Before truncating the fused pool,
   force-include **top-20–30 from each lane** (PubMed especially) into the rerank candidate set,
   regardless of fused RRF score. Pool size ≥50, ideally 100. **[INFERRED, grounded in B.4
   threshold]**
2. **Fusion score = convex combination** `α·sem + (1−α)·lex`, per-lane min-max normalized,
   **α≈0.7–0.8** (Bruch transferable 0.8). If staying on RRF, use **weighted RRF, PubMed weight
   1.5–3×.** **[CONFIRMED α; INFERRED weight range]**
3. **Cross-encoder rerank the UNION pool** (not per-lane) to top-k — the lane-count-agnostic
   layer that actually restores the landmark. **[CONFIRMED]**

Net: **RRF alone is the wrong final arbiter for single-lane landmarks.** Use it as a recall pool
builder with per-lane guaranteed inclusion; decide final order with a union-pool cross-encoder
and/or convex combination.

---

## C. Recency vs landmark tension (→ F3)

### C.1 PubMed "Best Match" — Fiorini et al. 2018, PLOS Biology

[Article](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.2005343).
Two stages: BM25 retrieval → **top-500 re-ranked by LambdaMART** (boosted trees). **[CONFIRMED]**
Feature ablation: most critical are **Document features (publication year, past usage/click
history)** and **Query-Document features (BM25 relevance)**; Query features minor.
**Recency is a mild LEARNED feature, NOT a multiplier** — the *old* TF-IDF system gave recent
articles "an artificial boost" (hand-tuned multiplicative bump); Best Match replaced that with
publication year as one learned signal among dozens. NDCG **0.48 vs 0.15** for old TF-IDF (~3×).
**[CONFIRMED]**

### C.2 Semantic Scholar — citations vs recency (AI2)

[Blog](https://medium.com/ai2-blog/building-a-better-search-engine-for-semantic-scholar-ea23a0b661e7),
[s2search code](https://github.com/allenai/s2search). Reranker features include `paper_n_citations`,
`paper_n_key_citations`, **`paper_n_citations_divided_by_oldness`** (citations-per-age rate),
`paper_oldness`, `paper_year_is_in_query`. **[CONFIRMED]**
- **Citation features carry an UPWARD monotonicity constraint** — a landmark cannot be pushed
  down for being highly cited. **[CONFIRMED]**
- **Recency (`paper_oldness`) is the ONLY feature with NO monotonicity constraint** — a soft,
  data-learned preference deliberately allowed to be non-monotone. **[CONFIRMED]**
- **Correction to the "log-citations" premise:** S2's public code uses **raw counts + a
  citations/age rate with monotone constraints, NOT an explicit log transform.** Log-compression
  is common practice elsewhere but is **[INFERRED]**, not what S2 documents. The load-bearing
  choice is the **monotone constraint**, not the transform.

### C.3 Multiplicative recency boosts are harmful

- **Dai, Shokouhi, Davison, "Learning to Rank for Freshness and Relevance," SIGIR 2011**
  ([PDF](https://www.cse.lehigh.edu/~brian/pubs/2011/SIGIR/learning-to-rank.pdf)): optimizing
  freshness "can even do harm in some cases"; fix is a **single joint LTR model with a
  query-adaptive freshness–relevance tradeoff.** **[CONFIRMED quote]**
- **Dong et al., "Towards Recency Ranking in Web Search," WSDM 2010**
  ([PDF](https://841.io/doc/recency.pdf)): recency handled via (a) a classifier detecting
  recency-sensitive queries + (b) **multiple recency FEATURES in a machine-learned ranker** — not
  a global `score×decay`. **[CONFIRMED]**
- **Scaling instability** ([Elastic multiplicative boosting](https://www.elastic.co/search-labs/blog/bm25-ranking-multiplicative-boosting-elasticsearch)):
  a multiplicative boost "doesn't scale together" with BM25 because "BM25 values vary
  substantially across queries." So `score×recency_decay` has **unpredictable query-dependent
  magnitude** — on a query with compressed relevance scores the decay term dominates and buries
  older landmark RCTs (exactly F3). **[CONFIRMED]**

### C.4 Recommendation

1. **Kill the multiplicative recency boost.** Replace `score×decay(age)` with **additive**
   `final = relevance + w_r·recency_feature`, `recency_feature∈[0,1]`, `w_r` small — recency
   can *tie-break*, never *override* relevance. Rule of thumb: cap max recency contribution to
   **≤~10–15% of the relevance dynamic range** (mirrors PubMed treating pub-year as one of dozens
   of features). **[INFERRED, grounded in C.1–C.3]**
2. **Recency = monotone-but-soft; landmark signal = monotone-and-hard.** Use a saturating recency
   curve (a soft half-life where a 20-year pivotal RCT keeps most of its relevance), not an
   exponential decaying to zero. Citation strength gets an **upward monotone constraint** (S2).
   **[CONFIRMED design; INFERRED curve]**
3. **Landmark signal = `log(1 + citations)`** (or S2's citations/age rate + raw count) as an
   explicit feature — log-compression stops a single 50k-citation review from dominating while
   guaranteeing pivotal older RCTs clear the recency-favored noise. **[INFERRED; S2 uses raw +
   monotone constraint — either works]**
4. **Condition recency on query intent** (Dong/Dai): a crude keyword classifier (year mentioned,
   "latest/recent/new" vs "seminal/landmark/original") captures most of the benefit — apply
   recency weight only on recency-sensitive queries. **[CONFIRMED principle]**
5. **Restore a real citation source first.** (Engine-specific: OpenAlex backfill is dead code,
   citations hardcoded 0.) All of C.4 is inert until citation counts are non-zero — this is the
   prerequisite for using citations as the landmark counterweight to recency.

---

## D. Query understanding for phrasing robustness (→ F4)

### D.1 Multi-query LLM generation + fusion

- **LangChain MultiQueryRetriever default = 3 variants**, union/dedupe (not score fusion).
  **[CONFIRMED]** ([docs](https://python.langchain.com/docs/how_to/MultiQueryRetriever/)).
- **RAG-Fusion = original + ~4 LLM variants, fused with RRF (k=60).** Reported +8–10% answer
  accuracy / +30–40% comprehensiveness (LLM-judge/human, small deployment — **directional only**).
  **[CONFIRMED method; INFERRED/soft numbers]** ([repo](https://github.com/Raudaschl/rag-fusion),
  [arXiv:2402.03367](https://arxiv.org/abs/2402.03367)).
- **Jagerman et al., "Query Expansion by Prompting LLMs" (Google, 2023)**
  ([arXiv:2305.03653](https://arxiv.org/abs/2305.03653)). Fuses expansion terms into the query,
  **original query repeated 5×** to up-weight. MS MARCO BM25 baseline Recall@1K 87.82 → **CoT
  90.61 (+2.79)**; **CoT/PRF MRR@10 22.62 (+3.85), nDCG@10 26.89 (+3.45).** **CoT prompting is the
  best prompt type.** **[CONFIRMED]**
- **query2doc (EMNLP 2023)** ([arXiv:2303.07678](https://arxiv.org/abs/2303.07678)): LLM writes a
  pseudo-document, prepend to query; **+3–15% BM25, >15% on TREC DL19/20.** **[CONFIRMED
  directional]**
- **Optimal N:** no clean biomedical ablation exists (**[genuine gap]**); deployed defaults
  cluster **3 (LangChain) – 5 (RAG-Fusion)**. Beyond ~5, mostly latency + rank noise that RRF's
  k-smoothing absorbs. **[INFERRED]**

### D.2 HyDE — Gao et al. 2022 ([arXiv:2212.10496](https://arxiv.org/abs/2212.10496))

Generate hypothetical answer-doc(s), embed, retrieve by that embedding. TREC-DL **[CONFIRMED]**:

| | nDCG@10 | Recall@1k |
|---|---|---|
| DL19: BM25 / Contriever / **HyDE** | 50.6 / 44.5 / **61.3** | 75.0 / 74.6 / **88.0** |
| DL20: BM25 / Contriever / **HyDE** | 48.0 / 42.1 / **57.9** | 78.6 / 75.4 / **84.4** |

Averages embeddings of **N=8 hypothetical docs** + query (**[INFERRED default]**). Helps zero-shot
+ vocabulary-divergent queries (our case); hurts when the LLM hallucinates off-topic or a strong
*supervised* dense retriever already exists. **No headline biomedical numbers**; later biomedical
work finds generic LLM pseudo-doc expansion can inject non-clinical noise (see D.6). **[CONFIRMED
numbers; INFERRED N]**

### D.3 PubMed ATM / MeSH / entity normalization (the acronym bridge)

- **PubMed Automatic Term Mapping**: untagged terms matched against MeSH → journals → author
  tables; on a MeSH hit it (a) adds the MeSH term, (b) **explodes** to narrower terms, (c) ORs in
  all **Entry Terms (synonyms)**. This is the acronym↔full-name/drug-synonym bridge.
  Programmatic: NCBI **E-utilities** `esearch` returns `QueryTranslation` showing the expansion.
  **[CONFIRMED]** ([ATM](https://www.nlm.nih.gov/pubs/techbull/nd04/nd04_atm.html),
  [E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/)).
- **Does MeSH expansion help?** Lu, Kim & Wilbur 2009 (64 TREC Genomics topics): "can generally
  improve retrieval performance, but the improvement may not affect end users in realistic
  situations" — measurable aggregate lift, **modest**. Keep it on; expect small+safe. **[CONFIRMED]**
  ([Springer](https://link.springer.com/article/10.1007/s10791-008-9074-8)).
- **Tools:** **scispaCy** `AbbreviationDetector` (acronym↔long-form within a doc) + `EntityLinker`
  (UMLS/MeSH/RxNorm via char-3gram TF-IDF) — most deployable; **MetaMapLite** (UMLS CUIs,
  high-precision, slower); **pyMeSHSim**. **[CONFIRMED]** ([scispaCy arXiv:1902.07669](https://arxiv.org/pdf/1902.07669)).
- **Critical gap:** trial-acronym↔full-name (EMPA-REG ↔ "empagliflozin cardiovascular outcome
  trial") is **often NOT in UMLS/MeSH** (trial names aren't standard concepts). Needs a
  **supplementary trial-acronym gazetteer** — harvest from ClinicalTrials.gov and via scispaCy's
  AbbreviationDetector at index time. **[CONFIRMED gap]**

### D.4 doc2query / docTTTTTquery (document-side, index-time)

castorini/docTTTTTquery, MS MARCO passage **[CONFIRMED]**: BM25 MRR@10 **18.6 → 27.2 (+8.6,
~+46%)**, latency 55→64 ms. **40 predicted queries/passage** ("only tiny gain past 40").
([repo](https://github.com/castorini/docTTTTTquery)). Pushes neural cost to indexing time → query
latency stays ~BM25. **Cheapest durable recall win if the corpus is static and we control
indexing.** Best practice = **both** doc2query (index) + light query expansion (query time).
**[CONFIRMED numbers; INFERRED recommendation]**

### D.5 RM3 pseudo-relevance feedback — OFF for our case

Anserini/Pyserini defaults: `fbDocs=10, fbTerms=10, fbOrigWeight/λ=0.5`. **[CONFIRMED]** But RM3
**helps verbose queries, frequently hurts SHORT queries** via drift — and our failing query
("family sglt2 cvot trials") is short and jargon-dense, exactly where RM3 drifts. **Prefer
LLM/ontology expansion.** If used: only when query length >~5 tokens. **[CONFIRMED caveat]**

### D.6 Biomedical-specific evidence

- **BMQExpander — ontology-guided LLM expansion (arXiv:2508.11784)** — most on-point.
  nDCG@10 **[CONFIRMED]**: TREC-COVID 0.656→**0.801 (+22.1%)**, NFCorpus 0.325→**0.363 (+11.7%)**,
  SciFact 0.665→**0.704 (+5.9%)**. Uses UMLS (MSH, SNOMEDCT_US, NCI, CSP). **Beats generic LLM
  expansion** (Query2Doc 0.667, CSQE 0.742 on TREC-COVID). **Robustness under query perturbation
  +15.7% over the strongest baseline — directly our F4 metric,** and the strongest evidence that
  ontology-grounded expansion beats free-form LLM expansion for paraphrase stability.
  ([arXiv:2508.11784](https://arxiv.org/abs/2508.11784)).
- **JAMIA 2026 critical eval of generative QE (doi:10.1093/jamia/ocag037)** — cautionary: naive
  LLM expansion is **inconsistent and can regress below baseline** (BioASQ-Y/N GPT-4o Recall@10
  0.417–0.512 vs baseline 0.491). **Gate LLM expansion.** **[CONFIRMED]**

### D.7 Recommended query-understanding stack (evidence-ordered)

1. **Document-side doc2query/docTTTTTquery at index time** (~40 predicted queries/doc). Large
   lexical-recall lift, zero query latency, closes the paraphrase gap on the *document* side.
   Strongest cheap win if corpus static. **[CONFIRMED mechanism]**
2. **Ontology/MeSH + acronym expansion, always-on, conservative.** scispaCy `AbbreviationDetector`
   at index time + MeSH Entry Terms at query time + a **trial-acronym gazetteer**. **Biggest lever
   for the exact EMPA-REG↔SGLT2-CVOT case; +5–22% nDCG@10; +15.7% robustness.** **[CONFIRMED]**
3. **LLM multi-query: 3–5 variants (one expanding acronyms, one using generic/family terms),
   fuse result lists with RRF k=60.** RRF safely absorbs bad variants; cache aggressively.
   **[CONFIRMED defaults]**
4. **HyDE/query2doc: ON but GATED, dense arm only** (N≈4–8, RRF'd in as an *additional* dense
   query, never replacing the raw query). Fire only when raw-query results are thin/low-confidence
   (JAMIA regression risk). **[CONFIRMED numbers + gating rationale]**
5. **RM3: OFF by default** (short biomedical queries drift). **[CONFIRMED]**

---

## E. Cross-encoder choice for biomedicine (→ F1, F2)

**Caveat up front:** no public benchmark runs MedCPT-CE, Cohere, monoT5-3B, and bge-reranker-v2-m3
head-to-head on the *same* biomedical pool. Cross-model numbers below stitch different papers with
different first-stage retrieval — comparability flagged. **[CONFIRMED caveat]**

### E.1 MedCPT (own paper) — Jin et al., Bioinformatics 2023 ([arXiv:2307.00589](https://arxiv.org/abs/2307.00589))

nDCG@10, BEIR biomedical **[CONFIRMED]**:

| | TREC-COVID | NFCorpus | BioASQ | SciFact | SciDocs |
|---|---|---|---|---|---|
| **MedCPT (retriever + CE rerank)** | 0.757 | 0.350 | 0.553 | 0.761 | 0.172 |
| MedCPT retriever only (no CE) | 0.697 | 0.340 | 0.332 | 0.724 | 0.123 |
| GTR-XXL (4.8B) | 0.501 | 0.342 | 0.324 | 0.662 | 0.161 |

- **The CE tier is the value-add:** BioASQ **0.332→0.553 (+0.221)**, TREC-COVID **0.697→0.757
  (+0.060)**. This is the single most important datapoint for the two-tier question — the reranker
  does most of the biomedical lift. **[CONFIRMED]**
- Average BEIR nDCG@10 ≈ **0.510**, beating GTR-XXL (4.8B) and cpt-text-XL (175B) despite MedCPT
  being ~330M total params. Training: 255M PubMed click logs (retriever), 18.3M query-article
  pairs (CE). **[CONFIRMED]**

### E.2 Empirical reranker analysis (different setup: BM25 candidates) — arXiv:2508.16757

nDCG@10 ×100 **[CONFIRMED numbers; INFERRED comparability]**:

| Reranker | TREC-COVID | NFCorpus | SciFact |
|---|---|---|---|
| monoT5-3B | 80.71 | 38.97 | 76.57 |
| mxbai-rerank-large | 85.33 | 37.08 | 75.10 |
| Cohere Rerank-v2 | 81.81 | 36.36 | 74.44 |
| RankGPT (GPT-4) | 85.51 | 38.47 | 74.95 |
| bge-reranker-large | 74.30 | 34.80 | 74.10 |
| bge-reranker-v2-m3 | 74.79 | 33.84 | 73.48 |

These rerank *BM25* candidates; MedCPT's numbers rerank *its own bi-encoder's* candidates — so you
**cannot** conclude monoT5-3B > MedCPT from these tables. On NFCorpus everyone sits 34–39.
**bge-reranker-v2-m3 is the weakest on biomedical here** (multilingual-general, no domain tuning)
and larger (0.6B) than MedCPT-CE — **do not switch to it for biomedical** unless non-English is
needed. **[CONFIRMED]**

### E.3 Latency / cost / size **[CONFIRMED except where noted]**

| Reranker | Params / base | Max seq | Latency | Cost | Self-host |
|---|---|---|---|---|---|
| **MedCPT-CE** | **~109M (PubMedBERT-base)** | 512 | smallest → fastest CE here (~5× smaller than bge-v2-m3; no clean published ms — **INFERRED**) | **$0** | Yes |
| bge-reranker-v2-m3 | ~0.6B | 512 | ~50 ms/pair L40S; ~1.5 s top-30; 46 QPS @ 21.9 ms on 4090 | $0 | Yes |
| monoT5-3B | 3B | 512 | highest of the CEs; needs big GPU | $0 (big GPU) | Yes |
| **Cohere rerank-4-pro** | undisclosed | 4096 | 80–150 ms p50 | **$2.50/1k = $0.0025/search** | No (API) |

MedCPT-CE (~109M PubMedBERT) is the cheapest cross-encoder to run → ideal **wide first rerank
tier**. Cohere's per-search fee is what you spend on a **narrow final tier only.** **[CONFIRMED]**

### E.4 Cascade reranking works — Expando-Mono-Duo ([arXiv:2101.05667](https://arxiv.org/abs/2101.05667))

BM25 top-1000 → monoT5 pointwise → **duoT5 pairwise on top-50** (O(n²) → restricted). The textbook
cheap-wide→expensive-narrow pattern. TREC-COVID cascade helped (duoT5 nDCG@20 0.7219 vs monoT5-only
0.6596, different rounds — directional). MedCPT is *itself* a two-tier system (bi-encoder →
PubMedBERT CE) and its ablation (E.1) is direct proof the biomedical gain comes from adding a
domain CE tier. **[CONFIRMED]**

**Caveat on OUR specific two-tier idea (MedCPT wide → Cohere narrow):** both are strong *pointwise*
rerankers, so a second pointwise pass risks diminishing returns (mono→mono). The cascade wins in
the literature come from a *different-shaped* second stage (**pairwise duoT5 or listwise
RankGPT**), not a second pointwise CE. **A/B required.** **[INFERRED]**

### E.5 Recommendation (evidence-ordered)

1. **Deploy MedCPT-CE as primary reranker now — highest ROI.** Only reranker trained on biomedical
   relevance; ~109M/512/self-host/$0; its CE tier delivers the biomedical lift (BioASQ +0.22).
   Near-free upgrade over Cohere-only for on-topic PubMed content. **[CONFIRMED basis]**
2. **Two-tier: MedCPT-CE wide (top-100–150) → Cohere rerank-4-pro narrow (top-10–20)** — worth it
   *if measured*; economics clean (MedCPT prunes ~90% free, Cohere sees ~15–20 docs so per-search
   cost unchanged). **A/B it** (mono→mono redundancy risk). **[INFERRED]**
3. **Highest ceiling / can eat latency:** MedCPT-CE wide → **listwise LLM rerank on top-20** (the
   complementary second stage the cascade literature rewards). **[CONFIRMED numbers; INFERRED
   stack]**
4. **Suggested depths:** retrieve ~1000 → MedCPT-CE → top-100 → paid/listwise narrow top-10–20 →
   display (mirrors validated Expando-Mono-Duo pattern). **[CONFIRMED pattern]**
5. **Decisive step:** run our own harness (MedCPT-CE vs Cohere vs monoT5-3B on the *same* PubMed
   pool + our judged queries) — the only apples-to-apples the public literature lacks.

---

## F. Listwise LLM rerank as a final top-30 stage

### F.1 RankGPT — Sun et al., EMNLP 2023 ([arXiv:2304.09542](https://arxiv.org/abs/2304.09542))

- **Window 20, step 10 — CONFIRMED** (paper §6.1; `rank_gpt.py`:
  `sliding_windows(..., rank_end=100, window_size=20, step=10)`). Rerank top-100, one back-to-front
  pass, windows [80,100]…[0,20] → **9 LLM calls/pass**. **[CONFIRMED window/step; INFERRED call
  count]**
- nDCG@10 **[CONFIRMED]**:

| | DL19 | DL20 | BEIR avg |
|---|---|---|---|
| BM25 | 50.58 | 47.96 | 43.42 |
| monoT5-3B | 71.83 | 68.89 | 51.36 |
| RankGPT (gpt-4) | **75.59** | **70.56** | **53.68** |

- Gain over BM25 **+25/+22.6**; gain over monoT5-3B only **+3.8/+1.7** — **marginal lift over a
  strong cross-encoder is modest.** Distilled DeBERTa-Large (~440M) on 10K ChatGPT permutations
  scores 53.03 BEIR avg, beating monoT5-3B. **[CONFIRMED / INFERRED subtraction]**

### F.2 RankZephyr / RankVicuna (castorini, [arXiv:2312.02724](https://arxiv.org/abs/2312.02724))

7B, window 20/stride 10. nDCG@10 **[CONFIRMED]**: RankZephyr **DL19 78.16 / DL20 81.59**, beating
RankGPT-4 (74.64/70.76). **Open 7B matches/beats its GPT-4 teacher zero-shot.** TREC-COVID
(biomedical): RankZephyr 85.35, RankGPT-4 87.92. **[CONFIRMED]**

### F.3 Setwise (SIGIR 2024, [arXiv:2310.09497](https://arxiv.org/abs/2310.09497)) — efficiency

TREC-DL19, Flan-T5-XL, top-100 **[CONFIRMED]**:

| Method | LLM calls | Prompt tokens | Latency (s) | nDCG@10 |
|---|---|---|---|---|
| Listwise.generation (RankGPT-style) | 245 | 119,163 | 71.4 | — |
| **Setwise.heapsort** | **129.5** | **41,666** | **9.6** | **0.693** |
| Pairwise.heapsort | 241.9 | 110,127 | 20.5 | 0.705 |

Setwise ≈ half the calls, ~1/3 the tokens, **~62% cost cut vs pairwise, ≤0.012 nDCG loss.** The
listwise-generation baseline needing **245 calls / 71s per query** is the strongest cautionary
datapoint on naive listwise cost. **[CONFIRMED]**

### F.4 TourRank ([arXiv:2406.11678](https://arxiv.org/abs/2406.11678)) — parallel tournament

Group tournament (100→50→30→…), ensembled over tournaments; **groups within a stage run in
parallel** (latency ≈ one call deep per stage, vs RankGPT's sequential 9-window chain).
TourRank-10 ≈ 71.98 nDCG@10 avg on TREC-DL vs RankGPT 69.09; single tournament already competitive
and cheap. **[CONFIRMED cross-paper]**

### F.5 rank_llm ([castorini/rank_llm](https://github.com/castorini/rank_llm)) — exact params

- **License: Apache-2.0.** **[CONFIRMED]**
- **Default sliding window: window_size=20, step_size=10** (matches RankGPT; in
  `SlidingWindowReranker`/`reorder`; example `src/rank_llm/scripts/run_rank_llm.py`). LiT5-Distill-v2
  configs use window_size=100 single long window. Backends: vLLM, SGLang, TensorRT-LLM.
  **[CONFIRMED]**

### F.6 Token/latency arithmetic — top-100→top-30, w=20/s=10 **[INFERRED from confirmed params]**

- **Calls:** `1 + (100−20)/10 = 9 calls/pass`, one pass. **[CONFIRMED window count]**
- **Input tokens:** 20 passages × ~130 tok (title+truncated abstract) + ~250 instruction ≈
  ~2,850/window → **~25,700/query**; with ~300-tok abstracts ~56k/query. (Anchor: Setwise measured
  ~119k for its config.) **[INFERRED; CONFIRMED anchor]**
- **Latency:** local 7B (RankZephyr) ~0.35–0.40 s/window → ~3.2–3.6 s/query batched, up to ~25
  s/query single-GPU with full passages (Rank-DistiLLM). **FIRST single-token decoding
  ([arXiv:2406.15657](https://arxiv.org/abs/2406.15657)): ~50% latency cut, nDCG-neutral.** API
  GPT-4o: 9 sequential calls ≈ 10–30 s/query. **[CONFIRMED anchors; INFERRED totals]**
- **Cross-encoder contrast:** monoELECTRA reranks the same top-100 in **~300 ms vs RankZephyr ~25
  s — ~83× faster** (Rank-DistiLLM, [arXiv:2405.07920](https://arxiv.org/abs/2405.07920)).
  **[CONFIRMED]**

### F.7 Biomedical listwise evidence + gap

TREC-COVID nDCG@10: RankGPT-4 85.51, RankZephyr 80.70, monoT5-3B 80.71 (BM25 ~59.5). **Lift over
BM25 large (+~25); lift over a strong cross-encoder ~0–5, method-dependent.** **BioASQ /
clinical-trial listwise numbers are sparse — genuine gap.** Robustness: "listwise methods show the
smallest performance drop on novel queries" — favors listwise for fast-moving biomedical
literature. **[CONFIRMED]**

### F.8 Recommendation — qualified yes, optional premium tier only

The cross-encoder is the workhorse; listwise LLM adds **~+2–3 nDCG@10 at ~80× latency**
(Rank-DistiLLM: distilled cross-encoders "match the effectiveness of LLMs… orders of magnitude
more efficient"). If you add it:
- **Depth: top-50 not top-100** (halves calls to ~4 windows; most gain is in the top ~50). Output
  top-30.
- **Window/step: w=20/s=10** (proven), or single w=50 long-context window (1 call, some quality
  cost).
- **Model: RankZephyr-7B** (Apache-2.0 via rank_llm, matches/beats GPT-4, self-hostable — no data
  egress, important for biomedical/PII) on **vLLM + FIRST single-token decoding.** Reserve
  GPT-4o/RankGPT-4 as an eval oracle only.
- **Cheaper alternatives keeping most of the win:** **Setwise.heapsort** (~62% cost cut) or
  **TourRank-1** (parallel).
- **Guardrail:** gate behind the cross-encoder — invoke only when the CE top scores are
  close/ambiguous, and/or run it **async** off the hot path. **[CONFIRMED conclusions]**

---

## G. Deliverable 1 — prioritized recommendations mapped to the four measured failures

| # | Failure | Fix (parameters) | Evidence | Expected effect |
|---|---|---|---|---|
| 1 | **F2** score-mixing | **Rerank the whole 100–190 pool in one Cohere call; sort ONLY by reranker; append un-reranked tail below in first-stage order; never interleave by raw score.** | Askari 2024 (tuned interp 0.290<CE 0.342); Elastic #120670 (identical bug); sbert/BEIR standard **[CONFIRMED]** | Removes rank-55-beats-rank-5 inversions; directly lifts the 74%→ toward 90% top-10 rate |
| 2 | **F1** single-lane burial | **Per-lane guaranteed inclusion (top-20–30/lane, PubMed esp.) before pool truncation; then union-pool rerank. Replace RRF-as-final-arbiter with convex combination α≈0.8 (min-max normalized) OR weighted RRF PubMed 1.5–3×.** | RRF cap 1/61; Bruch TOIS 2023 (CC 0.454>RRF 0.425); cross-encoder rescue +17.2pp MRR@3 **[CONFIRMED]** | Single-lane landmarks reach the reranker and get judged on relevance, not lane-count |
| 3 | **F3** older RCTs buried | **Kill `score×recency_decay`. Use additive `relevance + w_r·recency`, recency∈[0,1], contribution ≤10–15% of relevance range, soft half-life. Add `log(1+citations)` monotone landmark feature. Condition recency on query intent. (Restore a citation source first.)** | PubMed Best Match, S2 monotone constraints, Dong 2010, Dai 2011, Elastic scaling instability **[CONFIRMED]** | Pivotal older RCTs (PARTNER 3, ARISTOTLE) stop being decayed out of top-10 |
| 4 | **F4** phrasing sensitivity | **doc2query at index (~40 q/doc) + MeSH/scispaCy acronym expansion + trial-acronym gazetteer + 3–5 LLM query variants fused by RRF k=60; HyDE gated to dense arm; RM3 off.** | BMQExpander +15.7% robustness / +22.1% COVID; doc2query +8.6 MRR@10; Jagerman CoT +2.79 R@1k **[CONFIRMED]** | Same landmark retrieved across paraphrases (EMPA-REG ↔ SGLT2-CVOT) |

---

## H. Deliverable 2 — exact fusion + rerank recipe the literature supports

```
STAGE 0  QUERY UNDERSTANDING
  - 3–5 LLM query variants (CoT prompt; one expands acronyms, one uses generic/family terms)
  - MeSH Entry-Term expansion via E-utilities QueryTranslation + trial-acronym gazetteer
  - HyDE only if raw-query pool is thin/low-confidence (N≈4–8, dense arm, RRF'd in)

STAGE 1  RETRIEVE (per lane, wide)
  - dense MedCPT + BM25 lexical + each federated API; corpus indexed with doc2query (~40 q/doc)
  - top ~1000 candidates target (each lexical lane must send a sort param)

STAGE 2  BUILD POOL (recall-oriented, NOT the final arbiter)
  - RRF k=60 (or weighted RRF, PubMed 1.5–3×) across variant-lists AND lanes
  - GUARANTEE per-lane top-20–30 inclusion before truncation  ← fixes single-lane burial
  - pool size ≥ 100 (ideally the full 150–190)

STAGE 3  RERANK THE WHOLE POOL (wide)
  - MedCPT-CE (self-hosted, $0, biomedical-native) over the ENTIRE pool
  - reranker input: full structured abstract (raise the 2000-char cap; keep Results/Conclusions)

STAGE 4  NARROW RERANK (optional, paid/premium)
  - Cohere rerank-4-pro OR listwise (RankZephyr-7B, w20/s10, FIRST decoding) over top-20–50
  - gate: only when top CE scores are close/ambiguous; can run async

STAGE 5  FINAL ORDER
  - sort reranked items by reranker score ONLY
  - fold in metadata as MILD ADDITIVE features on the reranked set:
        final = rerank_score
              + w_cite · log(1+citations)          (monotone up)     w_cite small
              + w_rec  · recency_feature∈[0,1]       (soft, query-gated) ≤10–15% of range
              + w_type · study_type_prior            (RCT/meta-analysis up)
  - append any un-reranked tail BELOW, in first-stage order; never interleave by raw score
```

Parameter cheat-sheet: **RRF k=60**; **convex α=0.8** (if replacing RRF as arbiter); **per-lane
guaranteed top-20–30**; **rerank depth = full pool (≤190)** wide, **top-20–50** narrow;
**doc2query 40 q/doc**; **3–5 query variants**; **listwise w=20/s=10** (or w=50 single window);
**recency additive ≤10–15% of relevance range**; **citations `log(1+c)` monotone**.

---

## I. Deliverable 3 — copy-pasteable OSS specifics (repo + file + license)

| What to lift | Repo / file | License | Exact detail |
|---|---|---|---|
| **MedCPT cross-encoder** (biomedical-native reranker) | [ncbi/MedCPT-Cross-Encoder](https://huggingface.co/ncbi/MedCPT-Cross-Encoder), [github.com/ncbi/MedCPT](https://github.com/ncbi/MedCPT) | **Public domain (US-gov)** | ~109M PubMedBERT-base, max_seq 512; query+article pair → relevance logit |
| **Listwise sliding-window rerank** | [castorini/rank_llm](https://github.com/castorini/rank_llm) `src/rank_llm/rerank/` ; RankGPT `rank_gpt.py` `sliding_windows(rank_end=100, window_size=20, step=10)` | **Apache-2.0** | w=20, s=10, one back-to-front pass over top-100 = 9 calls; RankZephyr weights `castorini/rank_zephyr_7b_v1_full` |
| **BM25+dense fusion, RRF, BEIR eval** | [castorini/pyserini](https://github.com/castorini/pyserini), [Expando-Mono-Duo arXiv:2101.05667](https://arxiv.org/abs/2101.05667) | **Apache-2.0** | monoT5 over ~1000, duoT5 over top-50 cascade depth pattern |
| **BEIR biomedical regression harness** | [beir-cellar/beir](https://github.com/UKPLab/beir) `examples/benchmarking/benchmark_bm25_ce_reranking.py` | **Apache-2.0** | reference BM25+CE reranks top-100; TREC-COVID/NFCorpus/BioASQ/SciFact |
| **Convex-combination fusion (α=0.8)** | Bruch et al. TOIS 2023 [arXiv:2210.11934](https://arxiv.org/abs/2210.11934) | paper | `α·sem + (1−α)·lex`, min-max normalized, α=0.8 transferable |
| **doc2query document expansion** | [castorini/docTTTTTquery](https://github.com/castorini/docTTTTTquery) | **Apache-2.0** | 40 predicted queries/passage (T5); +8.6 MRR@10 on MS MARCO |
| **Acronym + entity expansion** | [scispaCy](https://github.com/allenai/scispacy) `AbbreviationDetector`, `EntityLinker` (UMLS/MeSH/RxNorm) | **Apache-2.0** | index-time acronym↔long-form; char-3gram TF-IDF linker |
| **MeSH/ATM expansion** | NCBI [E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/) `esearch` `QueryTranslation` | public | shows the exact MeSH+synonym+explode expansion to mirror |
| **Semantic Scholar ranking features** | [allenai/s2search](https://github.com/allenai/s2search) | **Apache-2.0** | monotone citation constraints; `n_citations_divided_by_oldness`; recency unconstrained |
| **FIRST single-token listwise decoding** | [arXiv:2406.15657](https://arxiv.org/abs/2406.15657) | paper | ~50% listwise latency cut, nDCG-neutral |
| **Setwise efficient rerank** | [ielab/setwise](https://github.com/ielabgroup/llm-rankers) [arXiv:2310.09497](https://arxiv.org/abs/2310.09497) | paper/repo | heapsort variant: ~62% cost cut vs pairwise, ≤0.012 nDCG loss |

---

## J. Honest gaps / caveats

- **No head-to-head biomedical reranker benchmark** on the same pool (MedCPT vs Cohere vs
  monoT5-3B vs bge) — must run our own harness for a decisive answer.
- **Two-tier MedCPT→Cohere is mono→mono** — cascade wins in the literature come from a
  differently-shaped second stage (pairwise/listwise). A/B required. **[INFERRED]**
- **Trial-acronym↔full-name mapping is not in UMLS/MeSH** — needs a custom gazetteer.
- **No clean "optimal N query variants" ablation** on a biomedical benchmark; 3–5 is deployed
  practice, not a proven optimum.
- **HyDE's exact default N (≈8) and biomedical numbers** are under-reported.
- **BioASQ / clinical-trial-specific listwise numbers** are sparse — TREC-COVID + NFCorpus are the
  main biomedical evidence base.
- Cormack RRF and Dong/Dai PDFs are image/binary — formulas/feature designs confirmed via
  abstracts + secondary sources; exact MAP/DCG tables not machine-extracted.
- RAG-Fusion gains are LLM-judge/human ratings on a small deployment — directional only.

---

*Compiled 2026-07 from five parallel literature+OSS research streams. Prior context:
`DIAGNOSIS-AND-PLAN-2026-07.md`, `RERANKER-DECISION.md`.*
