I want to understand how open-source AI-powered search/answer engines 
rank and filter their search results before feeding them to an LLM for 
synthesis. Specifically, I want to see the code that decides WHICH results 
are high quality and in what ORDER they should be presented.

Please find and analyze the ranking/filtering/scoring code in these repos:
- github.com/ItzCrazyKns/Perplexica (now called Vane) — 15k+ stars
- github.com/assafelovic/gpt-researcher — 20k+ stars  
- github.com/stanford-oval/storm — Stanford's research synthesis tool
- github.com/infiniflow/ragflow — RAG engine
- github.com/khoj-ai/khoj — AI personal assistant with search
- github.com/rashadphz/farfalle — open-source Perplexity clone
- github.com/leptonai/search_with_lepton — search with AI
- github.com/developersdigest/llm-answer-engine
- github.com/yokingma/search_with_ai

For each, tell me:
1. How do they decide which search results are relevant vs noise?
2. Do they use embedding similarity, cross-encoders, LLM-as-judge, 
   or simple heuristics?
3. Do they have any content quality scoring (not just relevance)?
4. Do they filter by source credibility/domain authority?
5. What specific files contain the ranking logic?

Also find any OTHER open-source repos (not in this list) that specifically 
tackle the problem of ranking web search results by quality rather than 
SEO signals. I'm looking for implementations, not papers.
Here’s the blunt answer: most open-source “Perplexity-like” answer engines do not own ranking in any serious sense. They rewrite the query, call Bing/Tavily/SearXNG/Brave, maybe dedupe or chunk the pages, and then hand the top results to the LLM. The repos with real second-stage ranking logic are RAGFlow, GPT Researcher, and Khoj. STORM has partial ranking depending on retriever. Vane/Perplexica, Farfalle, search_with_lepton, and llm-answer-engine mostly trust upstream search order. (GitHub)
1) ItzCrazyKns/Perplexica → Vane
How it separates relevance from noise: in the traced web path, it does not run a substantive second-stage reranker. webSearch.ts caps to 3 queries, calls searchSearxng, and maps res.results directly into chunks using r.content || r.title. searxng.ts itself just fetches SearXNG JSON and returns data.results and data.suggestions unchanged. So “relevance” is mostly whatever SearXNG already ranked, plus the agent’s choice of queries.Technique: query planning + simple heuristics. Not embeddings, not cross-encoders, not LLM-as-judge in the ranking path I traced.Content quality scoring: none I found.Source credibility/domain authority: none in the traced search path.Files: src/lib/agents/search/researcher/actions/webSearch.ts, src/lib/searxng.ts. (GitHub)
2) assafelovic/gpt-researcher
How it separates relevance from noise: this is one of the few that actually does it in two layers. First, content is compressed with embedding-based filtering using EmbeddingsFilter(similarity_threshold=...). Then an explicit SourceCurator calls an LLM to curate sources for the final report.Technique: embedding similarity for chunk filtering, then LLM-as-judge for source curation. I did not find a cross-encoder reranker.Content quality scoring: yes. The curation prompt explicitly tells the model to assess relevance, credibility, currency, objectivity, and quantitative value, and to favor authoritative sources without dropping useful minority viewpoints.Source credibility/domain authority: yes, but prompt-level rather than a deterministic domain score.Files: gpt_researcher/context/compression.py, gpt_researcher/skills/curator.py, gpt_researcher/prompts.py, gpt_researcher/skills/researcher.py. One oddity: URL order from search results is later shuffled before scraping, so upstream rank is not preserved cleanly. (GitHub)
3) stanford-oval/storm
How it separates relevance from noise: STORM mostly delegates ranking to the retriever you plug in. In knowledge_storm/rm.py, the Bing/You.com style retrievers mainly filter by is_valid_source(url) and exclude_urls, then keep the top k from the upstream engine. The vector retriever path uses qdrant.similarity_search_with_score. The Stanford OVAL arXiv retriever can send a rerank flag to an external endpoint, but that reranking is not implemented locally in the repo.Technique: upstream engine order, optional source allowlisting, and vector similarity in the vector path. No local LLM judge or local cross-encoder reranker in the files I traced.Content quality scoring: minimal. Mostly filtering, not scoring.Source credibility/domain authority: yes, but only through the is_valid_source callback or explicit URL exclusions.Files: knowledge_storm/rm.py. (GitHub)
4) infiniflow/ragflow
How it separates relevance from noise: this is the most serious ranking stack in your list. It combines lexical and dense retrieval with a weighted fusion, has retry logic when recall is poor, then reranks using extra rank features and optionally external rerank models. In the local rerank path it boosts tokens from title, important keywords, and question tokens, then adds a separate rank-feature score.Technique: hybrid lexical + dense retrieval, explicit reranking, and optional external rerank-model APIs. Those rerank backends include Jina, Cohere, HuggingFace and others.Content quality scoring: yes, in a practical IR sense. _rank_feature_scores adds priors like pagerank and tag-based features. That is not “credibility” in a journalistic sense, but it is more than pure semantic relevance.Source credibility/domain authority: no explicit domain-authority filter in the code I traced. It uses document-level priors, not reputation lists.Files: rag/nlp/search.py, rag/llm/rerank_model.py. (GitHub)
5) khoj-ai/khoj
How it separates relevance from noise: query embedding first, then vector retrieval, then optional cross-encoder reranking if enabled and there is more than one hit. Final ordering sorts by bi-encoder score and then by cross-encoder score.Technique: bi-encoder retrieval + cross-encoder rerank.Content quality scoring: none that I found. It is relevance-centric.Source credibility/domain authority: none. That makes sense because Khoj is mostly personal/workspace search, not web-trust scoring.Files: src/khoj/search_type/text_search.py, with retrieval plumbing in src/khoj/database/adapters/__init__.py. (GitHub)
6) rashadphz/farfalle
How it separates relevance from noise: in the direct chat path I traced, it does not. It may rephrase the query with conversation history, then perform_search(query), then formats the returned search results directly into the prompt. The repo README says it supports SearXNG, Tavily, Serper, and Bing, and advertises agentic search, but the standard answer path I traced does not include a real second-stage reranker.Technique: upstream provider order + query rephrasing.Content quality scoring: none I found.Source credibility/domain authority: none in the traced path.Files: src/backend/chat.py, plus provider selection/adapters under src/backend/search/. (GitHub)
7) leptonai/search_with_lepton
How it separates relevance from noise: it mostly slices the top N from the chosen provider. Bing uses webPages.value[:REFERENCE_COUNT]. Google uses items[:REFERENCE_COUNT]. Serper and SearchApi are slightly more opinionated: they prepend knowledge graph / answer box style results ahead of organics, then truncate. After that, query_function feeds contexts = self.search_function(query) directly to the prompt.Technique: provider order + simple heuristics for answer boxes / knowledge graph. No embeddings, no cross-encoder, no LLM judge for source ranking.Content quality scoring: none.Source credibility/domain authority: none explicit.Files: search_with_lepton.py. (GitHub)
8) developersdigest/llm-answer-engine
How it separates relevance from noise: better than a raw wrapper, but still not a real global reranker. The repo states it uses Brave Search, OpenAI embeddings, and Cheerio, and exposes config knobs for textChunkSize, textChunkOverlap, numberOfSimilarityResults, and numberOfPagesToScan. In the Express backend file I traced, it fetches a small set of Brave pages, chunks page text, embeds it, and retrieves similar chunks before answer synthesis. That is chunk-level relevance filtering, not quality-aware web ranking.Technique: Brave Search + embedding similarity over fetched page chunks. No cross-encoder or LLM judge in the core path I traced.Content quality scoring: only weak heuristics.Source credibility/domain authority: none I found.Files: express-api/index.js, app/config.tsx. (GitHub)
9) yokingma/search_with_ai
The requested URL now redirects to sear-chat/SearChat. The accessible repo surface shows a renamed project with packages/deepresearch, multiple search backends, and a Deep Research mode described as AI-driven iterative search and analysis. I could confirm the high-level workflow, but I could not isolate a dedicated ranking / quality-scoring module from the accessible code views in this pass. So I can’t honestly tell you whether it has a real local reranker or just agentic iteration over upstream search.What I can say: the repo worth checking is now sear-chat/SearChat; the likely code area is packages/deepresearch/, but this one remains unresolved. (GitHub)
My ranking of these repos by ranking sophistication
	1	RAGFlow
	2	GPT Researcher
	3	Khoj
	4	STORM
	5	developersdigest/llm-answer-engine
	6	Vane
	7	Farfalle
	8	search_with_lepton
	9	SearChat / search_with_ai unresolved
That ordering is not about product quality. It is about how much real, inspectable retrieval/reranking logic exists in the codebase before the LLM writes the answer. (GitHub)
Other open-source repos worth reading if you care about quality-first ranking
StractOrg/stractNot an LLM answer engine, but much closer to the real ranking problem. Its README says it can de-rank websites with third-party trackers, use “optics” to customize how signals are combined, and prioritize links (centrality) from sites you trust. That is directly about ranking by quality/trust preferences rather than just SEO position. If you want actual ranking experimentation, this is a better repo than most answer-engine clones. (GitHub)
mwmbl/mwmblAlso not LLM-first, but explicitly quality-oriented. The project states that the community determines the rankings, and its design is built around human/community curation of the index and results rather than inherited commercial search ranking. It also has a companion repo, mwmbl/rankeval, specifically for evaluating rankings. (GitHub)
The pattern that matters
The hard problem is not “retrieve documents.” It is “assign a score that blends topic relevance, source trust, freshness, novelty, evidence density, and duplication.” Almost none of these repos solve that cleanly.
They split into three buckets:
	•	Thin wrappers around upstream search order: Vane, Farfalle, search_with_lepton. (GitHub)
	•	Semantic retrieval, but mostly relevance-only: developersdigest, Khoj, STORM vector path. (GitHub)
	•	Actual second-stage quality triage: GPT Researcher and RAGFlow. GPT Researcher does it with an LLM judge prompt. RAGFlow does it with hybrid IR plus explicit rerank models and feature priors. (GitHub)
If you want the shortest practical takeaway: start by reading rag/nlp/search.py in RAGFlow and gpt_researcher/skills/curator.py plus context/compression.py in GPT Researcher. Those are the two clearest implementations of “don’t just trust the search engine, do your own triage before synthesis.” (GitHub)
If you want, I’ll turn this into a tighter artifact next: a side-by-side matrix with retrieval model, reranker, quality signals, trust signals, and exact code entrypoints.
I currently use Cohere's rerank-v3.5 API to re-rank search results 
using a cross-encoder model. I want to understand what open-source 
alternatives exist that I could either self-host or use as libraries.

Find me:

1. Open-source cross-encoder reranking models on HuggingFace that are 
   production-ready (not research toys). Specifically:
   - BAAI/bge-reranker series
   - Jina reranker models  
   - ColBERT v2 and ColBERTv2-based rerankers
   - Any other cross-encoder models with >1000 downloads/month
   
2. Libraries/frameworks that make it easy to use these models:
   - github.com/stanford-futuredata/ColBERT
   - github.com/castorini/pyserini (Anserini/Pyserini for BM25 + reranking)
   - github.com/UKPLab/sentence-transformers (cross-encoder module)
   - FlagEmbedding from BAAI
   - Any reranking-as-a-service open-source projects
   
3. Any GitHub repos that implement a full pipeline of: 
   web search → content extraction → embedding/reranking → quality scoring
   Similar to what Tavily or Exa do but open-source.

4. Specifically interested in repos that combine BM25 (keyword) + 
   semantic (embedding) + cross-encoder (reranking) in a hybrid pipeline.
   This is sometimes called "retrieve and rerank" architecture.

For each, give me: GitHub URL, stars, language, and the specific 
module/file that handles reranking. I need practical implementations 
I can integrate into a Next.js/TypeScript app (even if the model 
serving is in Python).
Bluntly: the easiest open-source replacement for Cohere rerank-v3.5 is a real cross-encoder behind a small service, not ColBERT. ColBERT is a late-interaction retriever/reranker with its own indexing model, so it is not a drop-in swap for a cross-encoder API. Jina’s reranker v3 also sits in that non-drop-in bucket, and Jina’s v2/v3 model cards carry non-commercial licensing constraints that matter if you want unrestricted self-hosted production use. (Hugging Face)
1) Models worth using
True cross-encoder rerankers
	•	BAAI/bge-reranker-v2-m3Good default if you want a multilingual, actively used reranker with clean FlagEmbedding support. The card positions it as a lightweight cross-encoder reranker, and it had about 5.72M downloads last month. The broader BGE reranker family also includes bge-reranker-v2-gemma, bge-reranker-v2-minicpm-layerwise, and bge-reranker-v2.5-gemma2-lightweight. The BGE/FlagEmbedding stack is MIT-licensed, and BGE’s base reranker card says the released models can be used commercially free of charge. (Hugging Face)
	•	BAAI/bge-reranker-baseStill a practical baseline. It is explicitly described as a cross-encoder reranker for query-passage scoring and had about 2.30M downloads last month. (Hugging Face)
	•	BAAI/bge-reranker-v2.5-gemma2-lightweightThis is the BGE option to watch if you care about controllable latency and smaller serving cost. The card emphasizes layerwise and compression knobs, and it had 5.8k downloads last month. (Hugging Face)
	•	cross-encoder/ms-marco-MiniLM-L6-v2This remains the boring, strong choice. It is trained for MS MARCO passage ranking, exposes a simple CrossEncoder path, and had about 14.79M downloads last month. The card reports 74.30 NDCG@10 and roughly 1800 docs/sec, which is why it is still everywhere. (Hugging Face)
	•	cross-encoder/ms-marco-MiniLM-L12-v2Slight quality bump over L6 with lower throughput. About 1.62M downloads last month. (Hugging Face)
	•	cross-encoder/ms-marco-MiniLM-L4-v2Faster, weaker, still useful for tight latency budgets. About 1.87M downloads last month. (Hugging Face)
	•	Alibaba-NLP/gte-multilingual-reranker-baseStrong multilingual candidate with Apache-2.0 licensing. The card shows usage paths for Transformers, Infinity, and TEI, and it had about 252k downloads last month. (Hugging Face)
	•	mixedbread-ai/mxbai-rerank-base-v1 / mxbai-rerank-xsmall-v1 / mxbai-rerank-large-v1Mixedbread’s v1 family is worth taking seriously. Their model listings show roughly 1.19M monthly downloads for base-v1, 912k for xsmall-v1, and 60.5k for large-v1. The large-v1 card is Apache-2.0. This is one of the cleaner open families if you want English-first or multilingual reranking without vendor lock-in. (Hugging Face)
	•	jinaai/jina-reranker-v2-base-multilingualArchitecturally this is the Jina model that actually belongs in the cross-encoder bucket. The card says it is a transformer-based cross-encoder, supports long inputs up to 1024 tokens with a sliding-window approach, and had about 873k downloads last month. The catch is licensing: the card says research and evaluation under CC-BY-NC-4.0, with commercial use pushed toward Jina’s hosted offerings. (Hugging Face)
Models you asked for that are not cross-encoders, but still matter
	•	colbert-ir/colbertv2.0Not a cross-encoder. It is a late-interaction retrieval model and had about 13.78M downloads last month. Use it when you are willing to own a ColBERT-style index and retrieval path. Do not treat it as a straight Cohere-rerank replacement. (Hugging Face)
	•	jinaai/jina-colbert-v2Also late interaction, ColBERT-style, with 8k context support. About 230k downloads last month. Good if you want ColBERT behavior without using the original checkpoints. (Hugging Face)
	•	jinaai/jina-reranker-v3Despite the name, this is not a standard cross-encoder. The card calls it a late-interaction architecture, and it had about 169k downloads last month. Same non-commercial licensing issue as above. (Hugging Face)
2) Libraries, frameworks, and services
Easiest libraries
	•	sentence-transformersURL: https://github.com/huggingface/sentence-transformersStars / language: 18.5k, Python 100%Reranking module: sentence_transformers/cross_encoder/CrossEncoder.pyWhy it matters: this is the cleanest library path for local cross-encoders. The CrossEncoder.rank(...) API is exactly the kind of thing you wrap behind a tiny FastAPI service for a Next.js app. (GitHub)
	•	FlagEmbeddingURL: https://github.com/FlagOpen/FlagEmbeddingStars / language: 11.5k, PythonReranking module: FlagEmbedding/inference/reranker/encoder_only/base.pyWhy it matters: best path for BGE rerankers. The repo explicitly separates embedder and reranker inference, and the reranker entrypoint is BaseReranker. (GitHub)
	•	ColBERTURL: https://github.com/stanford-futuredata/ColBERTStars / language: 3.8k, Python 93.3%, C++ 5.5%, CUDA 1.2%Reranking/search module: colbert/searcher.pyWhy it matters: best-known open late-interaction stack. Use it only if you want the ColBERT architecture, not as a trivial swap for cross-encoder reranking. (GitHub)
	•	PyseriniURL: https://github.com/castorini/pyseriniStars / language: 2.0k, Python 95.5%, Shell 3.7%Hybrid module: pyserini/search/hybrid/_searcher.pyWhy it matters: this is first-stage retrieval, not the final reranker. It is excellent for BM25 + dense candidate generation before you hand the top-k to a cross-encoder. (GitHub)
Reranking as a service
	•	text-embeddings-inferenceURL: https://github.com/huggingface/text-embeddings-inferenceStars / language: 4.6k, Rust 87.5%, Python 10.6%Reranking module: router/src/http/server.rsWhy it matters: probably the cleanest self-hosted HTTP layer for serving rerankers. The README explicitly documents reranker models and the /rerank endpoint. This is the easiest thing to call from Next.js. (GitHub)
	•	InfinityURL: https://github.com/michaelfeil/infinityStars / language: 2.7k, Python 96.5%Serving module: model selection under libs/infinity_emb/infinity_emb/inference/select_model.pyWhy it matters: strong OpenAI-style serving layer for embeddings and reranking. The README explicitly says it serves reranking models; the docs and discussions show /v1/rerank usage. I would use this if you want a Python-first serving stack instead of TEI. (GitHub)
	•	rerankersURL: https://github.com/AnswerDotAI/rerankersStars / language: 1.6k, Python 80.8%Entry module: rerankers/reranker.pyWhy it matters: useful unification layer if you want one API over cross-encoders, BGE layerwise models, ColBERT-based rerankers, and hosted APIs. Good glue code, not a full retrieval stack. (GitHub)
3) Full pipelines and hybrid “retrieve then rerank” repos
Strong practical choices
	•	OnyxURL: https://github.com/onyx-dot-app/onyxStars / language: 20.1k, Python 63.3%, TypeScript 31.2%Relevant files: backend/model_server/encoders.py, backend/danswer/natural_language_processing/search_nlp_models.pyWhy it matters: this is the closest mature open-source product to the thing you are describing. The repo advertises web search via Google PSE, Exa, Serper, Firecrawl and an in-house scraper, plus hybrid RAG. The rerank path is visible in issue stack traces through model_server/encoders.py and a /encoder/cross-encoder-scores endpoint. (GitHub)
	•	HaystackURL: https://github.com/deepset-ai/haystackStars / language: 24.6k, MDX 75.6%, Python 23.4%Relevant files: haystack/components/retrievers/in_memory/bm25_retriever.py, haystack/components/joiners/document_joiner.py, haystack/components/rankers/transformers_similarity.pyWhy it matters: strongest composable framework for BM25 + dense + fusion + cross-encoder rerank. It is not a Tavily clone, but it is the best OSS framework for assembling the ranking side of the stack. (GitHub)
	•	frankensearchURL: https://github.com/Dicklesworthstone/frankensearchStars / language: 49, Rust 97.0%Relevant files: crates/frankensearch-fusion/src/searcher.rs, crates/frankensearch-fusion/src/rrf.rs, plus the frankensearch-rerank crateWhy it matters: a compact hybrid engine with lexical BM25, semantic search, RRF, two-tier refinement, and optional cross-encoder reranking. Not a web-search product, but a nice reference if you want a lean ranking core. (GitHub)
	•	rag-hybrid-searchURL: https://github.com/adityavijay21/rag-hybrid-searchStars / language: 2, Python 100%Relevant files: src/hybrid_search.py, src/embedder.py, src/rag_pipeline.py, src/confidence.py, src/pdf_loader.pyWhy it matters: tiny repo, but unusually explicit. It spells out BM25 + FAISS fusion, cross-encoder reranking, and a confidence gate. Good reference implementation when you want to see the whole hybrid chain in one place. (GitHub)
Useful front-half building block
	•	ButterscoutURL: https://github.com/BoogieMonsta/butterscoutStars / language: 0, Python 97.8%Relevant files: butterscout/, openapi.yamlWhy it matters: this is the best open-source front half I found for a Tavily/Serper-style stack. It explicitly orchestrates SearXNG for search and Crawl4AI for extraction, and advertises a unified Search + Scrape + Rerank API. I would not treat it as your full ranking stack yet, but it is a solid open search/extraction layer to pair with Haystack + TEI. (GitHub)
4) What I would actually build for a Next.js / TypeScript app
My recommendation is narrow:
	•	Commercial-safe, lowest-friction stack: Next.js frontend, BM25 candidate generation in OpenSearch or Pyserini, embeddings from Sentence-Transformers or BGE, reranking served by TEI using BAAI/bge-reranker-v2-m3, cross-encoder/ms-marco-MiniLM-L6-v2, or Alibaba-NLP/gte-multilingual-reranker-base. TEI already exposes the right /rerank shape. (GitHub)
	•	If you want the simplest Python code path: use sentence-transformers or FlagEmbedding directly behind FastAPI. That is the shortest path from prototype to self-hosted production. (GitHub)
	•	If you want maximum retrieval sophistication later: add ColBERT only after you are ready to rework indexing and retrieval around late interaction. Do not start there if your current mental model is “Cohere rerank replacement.” (Hugging Face)
	•	What I would avoid: building around Jina v2/v3 for self-hosted commercial production unless their license terms fit your case. The quality is real. The licensing is the problem. (Hugging Face)
If you want, I can turn this into a tighter shortlist of 5 concrete stacks ranked by latency, license safety, and integration effort.
I am building a research platform that has a search feature. For academic papers, 
I already have a strong ranking pipeline (Reciprocal Rank Fusion across PubMed, 
Semantic Scholar, OpenAlex + Cohere rerank + evidence level scoring + journal 
quality from Scimago). 

Now I am adding web search via SearXNG (open-source metasearch engine that 
aggregates Google, Bing, DuckDuckGo). The problem: SearXNG returns results 
ranked by the underlying search engines, which are heavily influenced by SEO. 
I want to RE-RANK these results by actual content quality and relevance, 
not by SEO signals.

Find me open-source GitHub repos that solve any of these problems:
1. Re-ranking web search results using LLM-as-judge or cross-encoders 
   (not just embedding similarity, but actual quality assessment)
2. Domain/source credibility scoring (trust tiers for websites)
3. Content quality scoring for web pages (substance vs clickbait detection)
4. Search result re-ranking pipelines used by open-source AI search engines 
   (like Perplexica/Vane, GPT-Researcher, Khoj, RAGFlow, Farfalle, etc.)
5. Cross-encoder reranking models (like Cohere rerank but open-source — 
   ColBERT, BGE-reranker, cross-encoder models on HuggingFace)
6. Any implementation of "LLM-as-judge" for evaluating search result quality

I need repos with actual code, not papers. Preferably Python or TypeScript. 
Give me the GitHub URL, star count, what it does, and specifically which 
files/modules handle the ranking/scoring part.
The strongest repos for your use case are Khoj, RAGFlow, FlagEmbedding, and sentence-transformers. Those are the ones with code you can actually lift into a SearXNG post-processing layer. RankLLM and llm-rankers are useful if you want to experiment with listwise or pairwise LLM reranking. DeepEval and judges are not serving-time rerankers, but they are the best OSS pieces for building an offline “LLM-as-judge” evaluation loop. The credibility bucket is much weaker. Most open repos there are either news-specific or old. (GitHub)
Best direct references for production reranking
	•	khoj-ai/khoj — about 33.7k stars. This is the cleanest open-source example of a practical rerank layer you can adapt. The ranking code is in src/khoj/search_type/text_search.py, with rerank_and_sort_results(), cross_encoder_score(), and sort_results(). It explicitly scores hits with a cross-encoder and then sorts by cross-encoder score after initial retrieval. That is very close to what you want for SearXNG results. (GitHub)
	•	infiniflow/ragflow — about 71.4k stars. This is the strongest “full pipeline” reference. The README explicitly says it uses “multiple recall paired with fused re-ranking.” The concrete ranking logic is in rag/nlp/search.py, especially rerank(), rerank_by_model(), and retrieval(). Provider/model integration for rerank APIs lives in rag/llm/rerank_model.py, where similarity() is implemented for several rerank backends. If you want a hybrid score that mixes lexical, vector, and reranker signals, this is the repo to read first. (GitHub)
	•	FlagOpen/FlagEmbedding — about 11.4k stars. This is the best open-source replacement path for Cohere-style reranking if you want BGE rerankers. The repo documents multiple reranker families, including bge-reranker-v2-m3, bge-reranker-v2-gemma, bge-reranker-v2-minicpm-layerwise, and bge-reranker-v2.5-gemma2-lightweight. The core scoring code sits in FlagEmbedding/abc/inference/AbsReranker.py with compute_score(), then splits into FlagEmbedding/inference/reranker/encoder_only/base.py and .../decoder_only/base.py, both of which implement compute_score_single_gpu(). This is the repo I would use if you want a serious open reranker service. (GitHub)
	•	huggingface/sentence-transformers — about 18.5k stars. This is the easiest drop-in cross-encoder library. The relevant file is sentence_transformers/cross_encoder/CrossEncoder.py, and the important methods are predict() for pair scoring and rank() for query-document reranking. If you want the fastest path from “I have SearXNG URLs + snippets” to “I have an open-source reranker in production,” this is the lowest-friction option. (GitHub)
Best experimental LLM reranking repos
	•	castorini/rank_llm — about 586 stars. This is the most useful repo if you want to test pointwise, pairwise, and listwise reranking with open models instead of just a cross-encoder. The repo explicitly supports MonoT5, DuoT5, MonoELECTRA, RankZephyr/RankVicuna, LiT5, and first-token-logit reranking. The ranking code lives under src/rank_llm/rerank/; I checked the repo and the main dispatch point is src/rank_llm/rerank/reranker.py, which routes into pointwise, pairwise, and listwise implementations. Use this if you want a serious research sandbox for “LLM reranker as judge/ranker,” not if you want the shortest path to shipping. (GitHub)
	•	ielab/llm-rankers — about 205 stars on the repo page. Good research code for fast experimentation with prompting-based rankers. The repo documents pointwise, listwise, pairwise, and setwise methods. llmrankers/setwise.py defines SetwiseLlmRanker, and its rerank() method implements comparison-driven reranking with heapsort and bubblesort variants. run.py is the experiment harness. This is useful if you want to prototype listwise or setwise reranking ideas before hardening them. (GitHub)
	•	stanford-futuredata/ColBERT — about 3.8k stars. This is not a cross-encoder, so do not confuse it with Cohere-style rerankers. It is a late-interaction relevance model. Still, it belongs on your list because it is much stronger than plain embedding similarity and often cheaper than full cross-encoder reranking at scale. The relevant files are colbert/searcher.py, where Searcher.search() lives, and colbert/search/index_storage.py, where IndexScorer.rank() and score_pids() do the scoring work. I would use this only if cross-encoders are too slow and embedding-only rerank is too weak. (GitHub)
Best repos for offline LLM-as-judge evaluation
	•	confident-ai/deepeval — about 12.5k stars. This is the best OSS framework for building an evaluation harness around your reranker. It includes G-Eval and several RAG metrics. A useful starting point is deepeval/metrics/answer_relevancy/answer_relevancy.py, which defines AnswerRelevancyMetric and its measure() path. I would use this to compare candidate rerankers or calibrate thresholds, not to rank every SERP live. (GitHub)
	•	quotient-ai/judges — about 331 stars. Smaller than DeepEval, but more directly aligned with “LLM-as-judge” as a concept. The repo exposes judge classes and a Jury abstraction for ensemble voting. The most relevant file is judges/classifiers/correctness.py, which includes PollMultihopCorrectness and RAFTCorrectness. This is a good repo to mine if you want your own judge prompt stack for relevance, trustworthiness, or “substance versus fluff.” (GitHub)
Best starting points for source credibility and clickbait priors
	•	ramybaly/News-Media-Reliability — 61 stars. This is a source-level factuality/bias classifier for news media, not a generic web credibility system. The key code is train.py, and the engineered source features sit under data/{version}/features/. It is useful if you want a prior like “news domain reliability score” for a subset of domains. It is not enough for arbitrary web search. (GitHub)
	•	idiap/News-Media-Reliability — 7 stars. Tiny repo, but conceptually interesting. It computes graph-based source reliability from CC-News link structure and ships reliability_scores.json. The important pieces are ccnews_create_graph.py, ccnews_extract_content.py, and generate_subgraph.py. This is useful if you want a graph-propagated source prior. It is specialized and not plug-and-play. (GitHub)
	•	bhargaviparanjape/clickbait — 71 stars. Old, but still a decent baseline feature for penalizing clickbait titles. The core classifier is clickbait_classifier.py, with helpers in utility.py and hand-built feature resources under dependencies/. I would use this only as one weak feature in a larger scoring function. Alone, it is too primitive. (GitHub)
One repo I would not copy for this is Perplexica. Its README still advertises SearXNG plus reranking, but a maintainer later said they no longer use embeddings to rerank search results, so it is not a clean reference for a current rerank layer. (GitHub)
If I were building your stack, I’d do this:
	1	Online reranking with either FlagEmbedding BGE-reranker or sentence-transformers CrossEncoder.
	2	Add a domain prior from a stripped-down source-credibility model when the domain is known.
	3	Add a clickbait/substance penalty as a weak feature, never the main score.
	4	Use DeepEval or judges offline to train and calibrate an LLM-as-judge that scores “useful, trustworthy, substantive answer source” on your own SERP logs.
	5	Copy pipeline ideas from Khoj or RAGFlow, not from flashy “AI search” repos that hide the actual ranking logic. (GitHub)
If you want, I’ll turn this into a shortlist of the top 5 repos to fork first, with a concrete scoring architecture for your SearXNG reranker.

