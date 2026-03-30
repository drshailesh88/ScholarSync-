# Planning Session: Open-Source Reranking & Search Quality Infrastructure
**Date:** 2026-03-30
**Source:** ChatGPT (deep research session)
**Status:** captured

## Context
ScholarSync uses Cohere rerank-v3.5 for academic search results. With the planned SearXNG integration for web/news/discussion tabs, we need a strategy for ranking web results by actual content quality rather than SEO signals. This research session surveyed the open-source landscape for reranking models, quality scoring approaches, and production search pipelines.

---

## Key Decisions Made

1. **Most open-source "AI search" engines do NOT own ranking.** They rewrite the query, call SearXNG/Tavily/Brave, and hand top results to the LLM. The repos with real second-stage ranking: RAGFlow, GPT Researcher, Khoj. Vane/Perplexica, Farfalle, search_with_lepton mostly trust upstream search order. Rejected: treating any of these as complete ranking solutions to copy wholesale.

2. **GPT Researcher's curator pattern is the best reference for LLM-as-judge quality scoring.** File: `gpt_researcher/skills/curator.py`. It uses embedding similarity for chunk filtering, then an LLM call to curate sources assessing relevance, credibility, currency, objectivity, and quantitative value. This is the closest to what we need for web result quality triage.

3. **RAGFlow has the most serious ranking stack.** File: `rag/nlp/search.py`. Combines lexical + dense retrieval with weighted fusion, retry logic for poor recall, reranking with extra rank features (pagerank, tag-based priors), and optional external rerank model APIs (Jina, Cohere, HuggingFace). Best reference for hybrid scoring.

4. **Khoj's cross-encoder pattern is the cleanest simple rerank reference.** File: `src/khoj/search_type/text_search.py`. Bi-encoder retrieval → cross-encoder rerank → sort by cross-encoder score. Very close to what we'd want for SearXNG post-processing.

5. **Cohere rerank-v3.5 can be replaced with open-source models for cost savings.** Top candidates:
   - **BAAI/bge-reranker-v2-m3** — MIT licensed, multilingual, 5.72M downloads/month, works with FlagEmbedding library
   - **cross-encoder/ms-marco-MiniLM-L6-v2** — boring but strong, 14.79M downloads/month, 1800 docs/sec
   - **Alibaba-NLP/gte-multilingual-reranker-base** — Apache-2.0, strong multilingual
   - **mixedbread-ai/mxbai-rerank-base-v1** — Apache-2.0, 1.19M downloads/month
   Decision: keep Cohere for now (it works, quality is proven), but have a migration path to self-hosted BGE or MiniLM via TEI if costs become an issue.

6. **ColBERT is NOT a cross-encoder replacement.** It's a late-interaction retriever/reranker with its own indexing model. Don't confuse it with Cohere-style reranking. Only use if willing to rework indexing and retrieval. Rejected: treating ColBERT as a drop-in Cohere swap.

7. **Jina reranker models have non-commercial licensing constraints.** v2/v3 model cards carry CC-BY-NC-4.0. Avoid for self-hosted commercial production unless license terms change. Rejected: building around Jina for self-hosted use.

8. **For serving open-source rerankers, use HuggingFace Text Embeddings Inference (TEI).** URL: github.com/huggingface/text-embeddings-inference (4.6k stars, Rust). Exposes `/rerank` HTTP endpoint. Cleanest self-hosted HTTP layer, easy to call from Next.js. Alternative: Infinity (github.com/michaelfeil/infinity, 2.7k stars, Python, OpenAI-style API).

9. **Domain/source credibility scoring is weak in open-source.** Best available:
   - ramybaly/News-Media-Reliability (61 stars) — source-level factuality/bias for news media
   - idiap/News-Media-Reliability (7 stars) — graph-based source reliability from CC-News
   - bhargaviparanjape/clickbait (71 stars) — clickbait title classifier (weak feature only)
   Decision: build a static domain tier list (government=gold, major journalism=silver, known unreliable=penalized) as a starting point. Don't try to build a full PageRank equivalent.

10. **The recommended web search quality stack is:** Online reranking with BGE or MiniLM cross-encoder → domain prior from static credibility tiers → clickbait/substance penalty as weak feature → offline LLM-as-judge (DeepEval or judges) to calibrate scoring on SERP logs.

---

## Open Questions

- [ ] Should we self-host a reranker for web results or use Cohere for everything? Cost vs complexity tradeoff.
- [ ] How to build the domain authority tier list — manual curation? Scrape from existing datasets? Start with top 1000 domains?
- [ ] Should web result reranking use the same quality-ranker.ts weights as academic results, or a separate scoring config?
- [ ] LLM-as-judge for offline evaluation — when to build this? Need SERP logs first.
- [ ] Butterscout repo (SearXNG + Crawl4AI orchestration) — worth evaluating as the front-half of the web search pipeline?
- [ ] StractOrg/stract — custom search engine with trust-based ranking — worth deeper investigation?

---

## Constraints & Requirements

- Must work with Next.js/TypeScript app (model serving can be Python behind HTTP)
- Must be commercially licensable (no CC-BY-NC models in production)
- Must not add >2 seconds latency to search results
- Must degrade gracefully if reranker service is down (fall back to SearXNG order)
- Academic search must continue using Cohere rerank (proven quality) — web reranking is additive

---

## Next Steps

- Evaluate TEI deployment for self-hosted reranking (Docker, GCP)
- Build static domain credibility tier list (top 500 domains, 3 tiers)
- Prototype web result quality scoring: Cohere rerank + domain tier + freshness boost
- Study RAGFlow's `rag/nlp/search.py` and GPT Researcher's `curator.py` for architecture patterns
- When SearXNG is deployed, run A/B comparison: raw SearXNG order vs reranked order

---

## Repo Reference Matrix

### Ranking Sophistication (high to low)

| Repo | Stars | Technique | Quality Scoring | Trust Scoring | Key Files |
|------|-------|-----------|----------------|---------------|-----------|
| RAGFlow | 71.4k | Hybrid lexical+dense, rerank models, rank features | Yes (pagerank, tag priors) | No | `rag/nlp/search.py`, `rag/llm/rerank_model.py` |
| GPT Researcher | 20k | Embedding filter + LLM-as-judge curator | Yes (credibility, currency, objectivity) | Yes (prompt-level) | `skills/curator.py`, `context/compression.py` |
| Khoj | 33.7k | Bi-encoder + cross-encoder rerank | No | No | `src/khoj/search_type/text_search.py` |
| STORM | — | Upstream engine order + source allowlisting | Minimal | Yes (is_valid_source) | `knowledge_storm/rm.py` |
| llm-answer-engine | — | Brave + embedding similarity on chunks | Weak heuristics | No | `express-api/index.js` |
| Vane/Perplexica | 15k | Query planning + SearXNG order | No | No | `src/lib/agents/search/researcher/actions/webSearch.ts` |
| Farfalle | — | Upstream provider order + query rephrasing | No | No | `src/backend/chat.py` |
| search_with_lepton | — | Provider order + answer box heuristics | No | No | `search_with_lepton.py` |

### Open-Source Reranker Models (production-ready)

| Model | License | Downloads/mo | Type | Notes |
|-------|---------|-------------|------|-------|
| cross-encoder/ms-marco-MiniLM-L6-v2 | Apache-2.0 | 14.79M | Cross-encoder | Boring, strong, fast (1800 docs/sec) |
| BAAI/bge-reranker-v2-m3 | MIT | 5.72M | Cross-encoder | Multilingual, FlagEmbedding support |
| mixedbread-ai/mxbai-rerank-base-v1 | Apache-2.0 | 1.19M | Cross-encoder | Clean family (base/xsmall/large) |
| Alibaba-NLP/gte-multilingual-reranker-base | Apache-2.0 | 252k | Cross-encoder | Strong multilingual |
| jinaai/jina-reranker-v2-base-multilingual | CC-BY-NC-4.0 | 873k | Cross-encoder | NON-COMMERCIAL — avoid for production |
| colbert-ir/colbertv2.0 | — | 13.78M | Late-interaction | NOT a cross-encoder, needs own index |

### Serving Infrastructure

| Repo | Stars | Language | Endpoint | Notes |
|------|-------|----------|----------|-------|
| text-embeddings-inference (TEI) | 4.6k | Rust | `/rerank` | Cleanest self-hosted option |
| Infinity | 2.7k | Python | `/v1/rerank` | OpenAI-style API, Python-first |
| rerankers (AnswerDotAI) | 1.6k | Python | Library | Unification layer over multiple backends |
| sentence-transformers | 18.5k | Python | Library | `CrossEncoder.rank()` — lowest friction |
| FlagEmbedding | 11.5k | Python | Library | Best for BGE rerankers |

### Evaluation / LLM-as-Judge

| Repo | Stars | What It Does |
|------|-------|-------------|
| confident-ai/deepeval | 12.5k | Evaluation harness with G-Eval and RAG metrics |
| quotient-ai/judges | 331 | LLM-as-judge with Jury ensemble voting |

---

## Raw Notes

[Full ChatGPT research output preserved in the Key Decisions and Repo Reference Matrix sections above. The research covered three prompts: (1) open-source repos for reranking web search results, (2) ranking/filtering code analysis in 9 AI search engines, (3) open-source cross-encoder models and serving infrastructure. Total research time: ~48 minutes of ChatGPT deep research across 3 queries.]
