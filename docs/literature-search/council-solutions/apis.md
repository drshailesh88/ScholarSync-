# Hosted Semantic-Search APIs — Council Solution (Search-Infrastructure Advisor)

**Date:** 2026-06-22
**Mandate:** Fix the stage-1 LEXICAL-ONLY recall gap (e.g. "TAVR low risk six year outcomes" never retrieves PARTNER 3) WITHOUT building/hosting our own dense vector index over millions of papers. Find hosted/managed APIs that provide neural/dense/semantic retrieval over scientific/biomedical literature so we get semantic RECALL for free.
**Angle:** Hosted semantic-search APIs only (no corpus to build).

---

## The root cause, restated precisely

Every stage-1 source we run today is a **lexical/keyword/BM25-style** matcher:

- **PubMed E-utilities (Best-Match)** — keyword matching against title/abstract/MeSH. No dense vectors. ([NCBI E-utilities](https://www.ncbi.nlm.nih.gov/books/NBK25501/))
- **OpenAlex `search`** — `relevance_score` = text similarity + citation weighting. Stemming + stop-word removal, whole-word matching. Lexical. ([OpenAlex searching guide](https://developers.openalex.org/guides/searching))
- **Crossref** — metadata/term matching. Lexical.
- **ClinicalTrials.gov** — field matching. Lexical.

RRF fusion of N lexical sources is still lexical: a paper sharing **zero surface terms** with the query is in **none** of the candidate sets, so it never reaches Cohere rerank-v3.5. The cross-encoder can only reorder what retrieval surfaced. **Recall is capped at stage 1.** No reranker fixes this. We need at least one stage-1 source whose retrieval is performed in **embedding space**, so "TAVR low risk six year outcomes" lands near "PARTNER 3 / transcatheter aortic-valve replacement in low-risk patients / 5-year follow-up" even with no shared tokens.

A hosted semantic API gives us exactly that: someone else has already embedded a multi-million-paper corpus and exposes nearest-neighbor retrieval over it. We send a query, we get back semantically-near papers (with PMIDs/DOIs), we **fuse them into our existing candidate pool before RRF**. Pure recall lift, no index to host.

---

## Evaluated options

For each: what it returns, biomedical coverage, **does it fix RECALL (retrieval) or only RERANK**, pricing, auth, integration sketch, and S2-dependency flag.

---

### 1. OpenAlex Semantic Search — `search.semantic` ⭐ TOP PICK

The single most important finding. OpenAlex **already shipped a true dense semantic retrieval endpoint**, and OpenAlex is **already in our pipeline**. This is a near drop-in.

- **What it is:** A query parameter `search.semantic` on the `/works` endpoint. Embeds your query with **GTE-Large-EN** (Alibaba DAMO, open-source, 1,024-dim) and does nearest-neighbor retrieval against pre-computed embeddings of every work's title+abstract. This is genuine embedding-space retrieval, NOT the lexical `search` param. ([OpenAlex Semantic Search guide](https://developers.openalex.org/guides/semantic-search))
- **What it returns:** Standard OpenAlex `Work` objects — title, abstract (invertable), DOI, PMID via `ids`, `publication_year`, `type`, `cited_by_count`, authors, venue. **Identical schema to the OpenAlex source we already parse**, so plumbing is trivial.
- **Biomedical coverage:** OpenAlex indexes ~250M+ works including the full PubMed/MEDLINE corpus, bioRxiv/medRxiv, Crossref. Biomedical coverage is comprehensive (it's a PubMed superset). ([OpenAlex vs S2 vs PubMed comparison](https://intuitionlabs.ai/articles/openalex-semantic-scholar-pubmed-comparison))
- **RECALL or RERANK?** ✅ **RECALL.** This is stage-1 dense retrieval over a hosted multi-million-paper corpus — exactly the gap. PARTNER 3 is in OpenAlex; semantic NN should surface it from a paraphrased query.
- **Pricing:** Usage-based. Official pricing table: list `$0.0001`, **search `$0.001`/call**, content/download `$0.01`. Every API key gets **$1 free usage/day** (= ~1,000 search-class calls/day free). Semantic is in the search family; treat budget as **~$0.001/query, verify exact semantic line-item against the live pricing page before launch** (one secondary source quotes `$0.01` for semantic specifically — confirm). API keys became **mandatory Feb 13, 2026.** ([Usage-based pricing blog](https://blog.openalex.org/openalex-api-new-features-and-usage-based-pricing/), [Authentication & Pricing](https://developers.openalex.org/api-reference/authentication))
- **Auth:** Free API key (email signup). Add `api_key` to requests.
- **Hard limits to design around:** **Max 50 results/query**, **2,000-char input cap** (queries truncated beyond), **1 req/sec**, and **only ONE of `search` / `search.exact` / `search.semantic` per request**. Two filters are incompatible with semantic mode: `last_known_institutions.country_code` and `cited_by_count` (so do citation-count filtering in our own re-rank stage, which we already do). ([Semantic Search guide](https://developers.openalex.org/guides/semantic-search))
- **Integration sketch:** In the OpenAlex stage-1 fetcher, fire a **second parallel call** with `search.semantic=<query>` (publication-type/year filters still apply) alongside the existing lexical `search` call. Merge both result sets into the OpenAlex candidate list before RRF. 50 semantic + existing lexical hits → fuse → unchanged downstream (citation backfill, quality re-rank, Cohere rerank). One new code path in an adapter we already own. Cost at our volume is negligible (free tier likely covers dev/early prod).
- **S2-dependent?** ❌ No.
- **Caveat:** GTE-Large is a strong general-science embedder but **not biomedically specialized** (it is NOT MedCPT). It will dramatically beat lexical-only on paraphrase recall, but for hyper-specialized clinical phrasing a biomedical embedder would do better. Good enough to close most of the gap at near-zero cost/effort; pair with a biomedical option (below) if recall on clinical edge cases is still short.

---

### 2. Exa (formerly Metaphor) — neural web/paper search ⭐ STRONG #2

Purpose-built embeddings-first search API for LLM/agent pipelines, with a **100M+ research-paper index** as a first-class category.

- **What it is:** Neural search that encodes every indexed doc as a vector and retrieves by embedding similarity (`type=neural`/`auto`). Has a dedicated research-paper vertical. ([Exa search API guide](https://exa.ai/docs/reference/search-api-guide), [Exa: embeddings-first](https://www.morphllm.com/exa-search-api))
- **What it returns:** URL, title, published date, author, and (with `contents`) full text + **highlights** (the semantically-matched snippets). Use `category="research paper"` to constrain to the paper index. We'd map results to DOI/PMID via the URL or a Crossref/OpenAlex lookup.
- **Biomedical coverage:** 100M+ research papers across verticals; not biomedical-specialized but covers the published literature broadly (publisher pages, PMC, preprints). ([Exa custom indexes](https://www.aipedia.wiki/tools/exa/))
- **RECALL or RERANK?** ✅ **RECALL.** True embedding retrieval over a hosted corpus — surfaces papers with no shared surface terms. Scored 81% on WebWalker multi-hop vs Tavily 71%. ([morphllm](https://www.morphllm.com/exa-search-api))
- **Pricing:** **1,000 free requests/month.** Search-with-contents **$7 / 1,000 requests** (≤10 results w/ text+highlights); deep search $12/1k; contents $1/1k pages. Startup/edu credits ($1,000) available. ([Exa pricing](https://exa.ai/pricing))
- **Auth:** API key (Bearer). Native LangChain/LlamaIndex connectors.
- **Integration sketch:** Add an Exa fetcher as an **optional** stage-1 source: `POST /search` with `category="research paper"`, `numResults`, `type="auto"`. Resolve each result URL → DOI/PMID (Crossref/OpenAlex), then fuse into the candidate pool before RRF. Highlights can also feed the reranker context. Gate behind a flag so cost is opt-in per query class.
- **S2-dependent?** ❌ No.
- **Caveat:** It's a web/paper index, not a clean PMID-keyed biomedical DB — needs a URL→PMID resolution step, and coverage of niche clinical journals is less guaranteed than OpenAlex/PubMed. Best as a **complementary recall booster**, especially for cross-disciplinary or recently-published work.

---

### 3. Elicit API — semantic search over 138M papers (incl. PubMed subset) ⭐ #3

A hosted academic semantic search that explicitly does "find relevant papers even when exact terms don't match." We already have `ELICIT_API_KEY` documented in env (per recent commit `a7552b1`), and an `mcp__elicit__search_papers` tool exists.

- **What it is:** `POST /api/v1/search` with semantic OR keyword mode over a **138M+ paper** index. Semantic mode = "natural language understanding to find relevant papers even when the exact terms don't match." Also `POST /api/v1/search/trials` (ClinicalTrials.gov) and report endpoints. ([Elicit API Reference](https://docs.elicit.com/))
- **What it returns:** Paper metadata; filter by `corpus` (`"pubmed"` or default `"elicit"`), publication year, journal quartile, study type (RCT, Meta-Analysis, Systematic Review), PDF availability, retraction status. The **`corpus="pubmed"` restriction is the killer feature for us** — semantic retrieval scoped to MEDLINE.
- **Biomedical coverage:** Full index 138M; PubMed-scopable. Trials from ClinicalTrials.gov. Strong biomedical fit. ([Elicit API Reference](https://docs.elicit.com/))
- **RECALL or RERANK?** ✅ **RECALL** (semantic mode is dense retrieval over a hosted corpus).
- **Pricing:** **No extra charge beyond subscription**, but **gated by plan + daily caps**: Pro = 100 results / 100 requests **per day**; Scale = 200/200/day; Enterprise = 10k results/request, unlimited. Basic/Plus = no API. ([Elicit API Reference](https://docs.elicit.com/))
- **Auth:** Bearer `elk_live_...`. Rate-limit headers returned (`X-RateLimit-*`), single shared bucket across search endpoints.
- **Integration sketch:** Add an Elicit fetcher: `POST /api/v1/search` with `mode="semantic"`, `corpus="pubmed"`, study-type filters mirroring ours. Fuse into candidate pool pre-RRF. Already have the key + an MCP path for prototyping today.
- **S2-dependent?** ❌ No (Elicit runs its own index).
- **Caveat:** **The 100/day request cap on Pro is a hard production blocker** — that's not per-user, it's per-key per-day. Viable for **prototyping and quality-benchmarking against OpenAlex semantic immediately**, but production needs Scale/Enterprise. Treat as: validate recall lift now with the key we have, then decide if the corpus quality justifies an Enterprise contract.

---

### 4. Consensus API — semantic search, 200M papers, medical_mode

- **What it is:** `GET https://api.consensus.app/v1/quick_search` over 200M+ peer-reviewed papers, with rich biomedical filters: `study_types`, `human`, `sample_size_min`, `sjr_max` (journal quartile), `exclude_preprints`, `clinical_guideline`, and **`medical_mode`** (restricts to top medical journals/guidelines, ~8M docs). ([Consensus quick_search](https://docs.consensus.app/reference/v1_quick_search), [Consensus API home](https://consensus.app/home/api/))
- **Biomedical coverage:** Strong; medical_mode is purpose-built for clinical evidence.
- **RECALL or RERANK?** ✅ Likely **RECALL** — Consensus is marketed as semantic/AI search; the quick_search doc doesn't explicitly state neural-vs-lexical, **flag for verification**. If semantic, it's a recall source; if lexical-with-filters, it's only a filtered-recall source. ([2025 deep dive](https://aarontay.substack.com/p/a-2025-deep-dive-of-consensus-promises))
- **Pricing:** **Application-only**, baseline **$0.10/call + platform fee**, custom quote. ([Consensus API home](https://consensus.app/home/api/))
- **Auth:** API key (by approval). MCP server also exists.
- **Integration sketch:** Same fetcher pattern; `medical_mode=true` + study-type filters for clinical queries. Fuse pre-RRF.
- **S2-dependent?** ❌ No.
- **Caveat:** **$0.10/call is 100× OpenAlex** and the neural-vs-lexical question is unconfirmed. Only pursue if OpenAlex+Exa+Elicit leave a recall gap AND the medical_mode curation proves worth the price.

---

### 5. MedCPT (NCBI) — biomedical-specialized dense retrieval (NO hosted search API)

The **best biomedical embedder in existence** for this exact task (255M PubMed query-article pairs, SOTA zero-shot biomedical IR), BUT it is **not offered as a hosted nearest-neighbor search API**.

- **What's hosted:** Model weights on HuggingFace (`ncbi/MedCPT-Query-Encoder`, `ncbi/MedCPT-Article-Encoder`); pre-computed embeddings of **all PubMed articles** as bulk files on NCBI FTP. ([MedCPT repo](https://github.com/ncbi/MedCPT), [Query encoder](https://huggingface.co/ncbi/MedCPT-Query-Encoder), [paper](https://academic.oup.com/bioinformatics/article/39/11/btad651/7335842))
- **RECALL or RERANK?** Could power **either**, but **using it for stage-1 retrieval = building the index we're forbidden to build** (download 35M PubMed embeddings, host an ANN index). ❌ Violates the hard constraint.
- **Hosted-only path:** Run **only the query encoder** via a HuggingFace Inference Endpoint (encode the query → 768-dim vector) and use it as a **biomedical cross-encoder/embedding reranker** over candidates we already retrieved. That's **RERANK, not RECALL** — it does NOT fix the root cause (we already have Cohere rerank).
- **Verdict:** Right model, wrong delivery shape for our constraint. **Park it.** If we ever lift the no-index rule, MedCPT + the FTP embeddings is the gold-standard biomedical recall play. Not now.
- **S2-dependent?** ❌ No.

---

### 6. Semantic Scholar API — relevance/bulk search + SPECTER2 (OPTIONAL, and it's LEXICAL retrieval)

- **What it is:** `/paper/search` (relevance) and `/paper/search/bulk`. Crucially, retrieval is a **custom-trained ranker matching query keywords against title+abstract — lexical**, NOT dense NN. SPECTER2 embeddings are **returned as a field** but are NOT used to power the search query. ([S2 Graph API](https://api.semanticscholar.org/api-docs/), [S2 tutorial](https://www.semanticscholar.org/product/api/tutorial), [SPECTER2](https://github.com/allenai/SPECTER2))
- **RECALL or RERANK?** ⚠️ The **search endpoint does NOT fix recall** (it's lexical, same failure mode as PubMed). The **value is SPECTER2 paper embeddings + the Recommendations API** (paper→similar-papers via embeddings): given a seed paper, get embedding-neighbors. That's a **recall booster via "find similar"**, not via query→paper semantic search.
- **Pricing:** Free for research; **commercial use requires a separate AI2 license**. Unauthenticated 1,000 rps shared/throttled; API key → ~1 rps. ([S2 product/API](https://www.semanticscholar.org/product/api), [rate limits](https://agentsapis.com/semantic-scholar-api/))
- **S2-dependent?** ✅ **Yes (definitionally).** Mandate says S2 is **optional only**.
- **Verdict:** Keep optional. Use SPECTER2/Recommendations as a **"more like this" expansion** once we have ≥1 seed hit, NOT as the primary recall fix. Commercial licensing + the optional-only constraint keep it off the critical path.

---

### 7. Europe PMC REST — better lexical + MeSH expansion (NOT semantic)

- **What it is:** REST search over 40M+ biomedical pubs; **expands queries with MeSH synonyms by default** and includes text-mined entities (genes, diseases, chemicals). Relevance-sorted. ([Europe PMC RESTful](https://europepmc.org/RestfulWebService))
- **RECALL or RERANK?** ⚠️ **Partial recall via synonym expansion**, but it's **still lexical** — MeSH synonyms catch terminology variants ("heart attack"↔"myocardial infarction") but NOT conceptual paraphrase ("TAVR low risk six year outcomes"→PARTNER 3). Does NOT fix the dense-retrieval gap.
- **Pricing:** **Free, no key.**
- **S2-dependent?** ❌ No.
- **Verdict:** **Cheap incremental recall — add it.** Free, biomedical, MeSH expansion is strictly better than raw PubMed keyword. But it is a complement, not the semantic fix. Low-cost addition to the lexical layer.

---

### 8–11. Lower priority / not-fit (brief)

- **Cohere rerank-v3.5 / Voyage rerank-2.5 / Jina** — ❌ **RERANK only.** Voyage rerank-2.5 reportedly +7.9% over Cohere v3.5, 32K context, 200M tokens free, instruction-following + biomedical-tuned eval. ([Voyage rerank-2.5](https://blog.voyageai.com/2025/08/11/rerank-2-5/), [Voyage pricing](https://docs.voyageai.com/docs/pricing)) **Worth A/B-testing as a drop-in upgrade to our Cohere stage**, but it does **NOT touch recall** — out of scope for the root cause. Note for the reranking-angle advisor.
- **Vespa Cloud** — ❌ A managed platform to **build/host your own hybrid index** → violates the no-index constraint. Not a turnkey literature corpus.
- **You.com / Brave / Tavily research APIs** — general web research, not paper-keyed biomedical retrieval; Exa beats Tavily on retrieval benchmarks (81% vs 71%). Skip for biomedical recall.
- **CORE API** — 200M+ OA papers, used for PDF fetch in evidence pipelines; search is largely lexical. Useful for **full-text/PDF retrieval**, not the semantic recall fix. ([Research paper APIs 2026](https://intuitionlabs.ai/articles/research-paper-apis-scientific-literature))
- **Lens.org** — unified scholarly+patent; **free tier 5,000 req + 5M records/month, approval + 14-day trial**, then paid. Metadata search is lexical. Park.
- **Dimensions / scite** — licensed/enterprise (contact sales). scite's edge is citation-context ("supporting/contrasting"), a **trust/quality signal**, not query→paper semantic recall. Out of scope for root cause.

---

## Ranked shortlist — by recall-impact ÷ engineering-cost

| # | Option | URL | How it fixes our root cause (one line) |
|---|--------|-----|----------------------------------------|
| **1** | **OpenAlex `search.semantic`** | https://developers.openalex.org/guides/semantic-search | Dense NN retrieval (GTE-Large, 1024-dim) over 250M+ works incl. all PubMed — **a second parallel call on a source we already parse**, near-zero cost, surfaces PARTNER 3 from a paraphrased query. |
| **2** | **Exa neural search** | https://exa.ai/docs/reference/search-api-guide | Embeddings-first retrieval over a 100M+ research-paper index (`category="research paper"`) — adds conceptual hits that keyword search misses entirely; opt-in per query. |
| **3** | **Elicit API (semantic, `corpus="pubmed"`)** | https://docs.elicit.com/ | Semantic retrieval scoped to MEDLINE over a 138M index — we already hold `ELICIT_API_KEY`, so we can A/B the recall lift today (mind the 100/day Pro cap before prod). |
| **4** | **Europe PMC REST** | https://europepmc.org/RestfulWebService | Free, keyless MeSH-synonym expansion — cheap incremental recall on terminology variants while the dense sources do the conceptual lift. |
| **5** | **Consensus API (`medical_mode`)** | https://docs.consensus.app/reference/v1_quick_search | Curated clinical-evidence semantic search (verify neural) for the hardest clinical queries — only if 1–4 leave a gap, at 100× the per-call cost. |

**Parked but important:** **MedCPT** (https://github.com/ncbi/MedCPT) is the SOTA biomedical embedder and the right answer the day the no-index constraint lifts; today it's only usable as a query-encoder reranker (RERANK, not RECALL). **Semantic Scholar SPECTER2/Recommendations** (https://api.semanticscholar.org/api-docs/) stays optional/S2-dependent — use as "find similar" expansion, never the primary fix.

**Recommended sequence:** Ship **OpenAlex `search.semantic`** first (one adapter, free, lowest risk, immediate recall lift, schema we already handle). In parallel, **A/B Elicit `corpus="pubmed"`** with the key we hold to measure biomedical recall delta. Add **Exa** as the opt-in cross-disciplinary booster and **Europe PMC** as the free lexical-plus layer. Hold Consensus/MedCPT/S2 in reserve.
