# Corpus-Free Recall Algorithms for Stage-1 Retrieval

**Advisor angle:** IR algorithms that raise *recall* in stage-1 retrieval **without** a persistent
dense index over millions of papers, using only the APIs already wired into Manan OS / ScholarSync
(PubMed E-utilities, OpenAlex incl. its references/citations graph, Crossref). On-the-fly embedding of
small per-query candidate pools (≤ a few hundred docs) is permitted; hosting a vector DB is not.

---

## The root cause, stated precisely

Stage-1 is **lexical-only** (PubMed Best Match + OpenAlex/Crossref keyword search → RRF). Lexical
retrieval fails on the **vocabulary-mismatch** problem: a relevant document that shares *zero surface
terms* with the query is assigned BM25 score 0 and is **never in the candidate set**. The Cohere
rerank-v3.5 stage is a *cross-encoder over the candidate set* — it can only reorder what stage-1
already pulled. So the fix must happen **before or during candidate generation**, by either
(a) reformulating the query to overlap the missing document's vocabulary, or (b) reaching the
document through a non-lexical channel (the citation graph, or a dense neighborhood). This document
ranks seven techniques on **recall-impact ÷ engineering-cost**, with attention to whether each
actually fixes the "*never retrieved*" case — using PARTNER 3 for the query *"TAVR low risk six year
outcomes"* as the canonical hard case (the trial is officially named "PARTNER 3"; its title/abstract
may not contain the tokens "TAVR" / "low risk" / "six year" in the searched fields, yet it is cited by
essentially every downstream TAVR-low-risk paper).

---

## 1. Citation-graph expansion / snowballing  ★ TOP PICK

**Mechanism.** Take the top *k* lexical hits (the seed set), then traverse the OpenAlex citation graph
one hop in both directions:

- **Backward (references):** the seed's `referenced_works` is already on the work object — *zero extra
  calls*. For *"TAVR low risk … outcomes"* the seed papers' reference lists almost certainly contain
  PARTNER 3.
- **Forward (citations):** `GET /works?filter=cites:<W_seed>` returns papers citing the seed.
- **Co-citation / bibliographic coupling** as a re-rank signal: count how many *distinct seeds* a
  candidate is connected to. A paper referenced by 8 of your top-10 seeds is almost certainly central
  — this is exactly the signal that surfaces a landmark like PARTNER 3, which sits in the reference
  list of nearly every low-risk-TAVR paper.

**Does it fix "never retrieved"?** **Yes — this is the only technique that recovers a landmark paper
with *no* lexical overlap at all,** because it reaches the paper through the graph rather than through
text. Lexical query expansion (techniques 2–5) still requires *some* term overlap to exist after
reformulation; citation expansion does not. Mechanistically it is the only one whose recall does not
depend on surface vocabulary.

**Evidence.**
- Citation chasing identifies studies "that might otherwise not be retrieved … because they did not
  use the … search terms" — its defining property
  (https://onlinelibrary.wiley.com/doi/full/10.1002/jrsm.1563).
- Automatic citation-snowballing systems reach **66.7–85.5 % recall at 97.7 % precision** in
  systematic-review settings (https://arxiv.org/pdf/2402.08339).
- Most rigorous head-to-head: Sjögårde 2024 (JASIST), "Seed-based information retrieval in networks of
  research publications," evaluates direct citation, bibliographic coupling, co-citation, and the
  PubMed related-article score against systematic-review baselines using the NIH Open Citation
  Collection (https://asistdl.onlinelibrary.wiley.com/doi/10.1002/asi.24951 ; preprint
  https://arxiv.org/pdf/2403.09295). **Bibliographic coupling captures the most unique information and
  surfaces recent/niche papers** that co-citation misses (co-citation favors older, highly-cited work)
  (https://en.wikipedia.org/wiki/Bibliographic_coupling).
- Citation-cluster retrieval evaluated in-depth on systematic reviews
  (https://arxiv.org/pdf/2207.03299).

**Honest caveat.** A Cochrane cross-sectional study notes the *incremental unique-study yield* of
citation searching as a standalone replacement for database search is **uncertain** — it is a
*supplement*, not a substitute (https://pmc.ncbi.nlm.nih.gov/articles/PMC7079050/). For our purpose
(broadening an already-lexical candidate pool) this is exactly the right framing: use it as an
additional channel feeding RRF, never as the sole retriever.

**Maps onto our APIs.**
- Backward: `referenced_works` (free, on the seed object — request with `select=id,referenced_works`).
- Forward: `?filter=cites:W123` (one call/seed; 10 credits each).
- **Batch the OR:** OpenAlex supports up to **100 IDs OR-ed per filter** (`?filter=openalex:W1|W2|…`,
  `per_page=200`), so resolving the metadata of a few-hundred-id frontier is a handful of calls, not
  hundreds (https://blog.openalex.org/fetch-multiple-dois-in-one-openalex-api-request/ ;
  https://docs.openalex.org/how-to-use-the-api/get-lists-of-entities/filter-entity-lists).

**Eng-cost.** **Low-to-moderate.** No model, no index. Logic = graph BFS over 1 hop + dedupe + a
coupling counter + feed into existing RRF. Use `select=` to slim payloads.

**Latency.** Backward hop is ~free (already in the seed payload). Forward hop = N parallel calls (or
batched). Budget ~200–600 ms for one hop at k≈10 seeds with concurrency; bound it (cap seeds, 1 hop,
timeout) so a slow OpenAlex call can't stall the request.

**Failure modes.** (a) *Citation lag* — a 2024 paper not yet cited won't be reached by forward
expansion; backward + bibliographic coupling mitigate. (b) *Hubs* — review articles cite hundreds of
works; cap fan-out and weight by coupling degree, not raw adjacency, to avoid flooding the pool with
weakly-related papers. (c) *OpenAlex coverage gaps* in references for some publishers.

> **Operational note — OpenAlex pricing changed.** As of **Feb 13, 2026** OpenAlex **requires an API
> key** (the email/`mailto` polite pool is gone). Free tier = **100,000 credits/day**; **list
> endpoints cost ~10 credits each**; no-key = 100 credits/day (demo only)
> (https://docs.openalex.org/how-to-use-the-api/rate-limits-and-authentication ;
> https://blog.openalex.org/openalex-api-new-features-and-usage-based-pricing/). Citation expansion is
> list-endpoint-heavy, so **batch with the 100-ID OR filter** and cache the graph per work to stay
> well inside the free budget. This is a real, current constraint — wire in the key before shipping.

---

## 2. Multi-query / RAG-fusion (LLM generates N query variants → fuse)  ★ STRONG #2

**Mechanism.** An LLM rewrites the query into N (3–5) variants — synonym swaps, decompositions, and
crucially **terminology reformulations** ("TAVR" → "transcatheter aortic valve replacement" /
"…implantation" / "TAVI"; "low risk" → "low surgical risk"; "six year" → "long-term / 5-year /
mid-term outcomes"). Each variant runs through the existing lexical retrievers; results fuse via the
RRF you already have.

**Does it fix "never retrieved"?** **Partially-to-mostly.** It fixes the case where the document
*does* contain standard terminology the user didn't type — which is most vocabulary-mismatch cases in
biomedicine (acronym/synonym/British-vs-US spelling). It will recover papers titled "Transcatheter
Aortic-Valve Replacement … Low-Risk Patients." It will **not** recover a paper with *zero* shared
vocabulary even after expansion (that's what technique 1 is for).

**Evidence.** RAG-Fusion (Rackauckas 2024) raises answer comprehensiveness +30–40 % over vanilla RAG;
RRF naturally suppresses topic-drift because docs consistently surfaced across variants rise while
single-variant noise sinks (https://github.com/Raudaschl/rag-fusion ;
https://www.promptlayer.com/glossary/rag-fusion/). RRF is robust and parameter-light
(https://www.emergentmind.com/topics/reciprocal-rank-fusion-rrf).

**Eng-cost.** **Low.** One extra LLM call (you already call Cohere; add a fast model for rewriting) +
fan-out the existing retrievers + reuse existing RRF. Highest leverage-per-line of any option.

**Latency.** One LLM call (~300–800 ms) + N parallel retrievals (overlaps with existing latency).

**Failure modes.** Variant explosion adds noise (keep N≤5); RRF mitigates. LLM may hallucinate a wrong
synonym — constrain the prompt to "rephrasings/synonyms/expansions of acronyms, do not change intent."

---

## 3. HyDE / LLM query expansion (hypothetical abstract → query)  ★ #3

**Mechanism.** Prompt an LLM to write a **hypothetical abstract** that *would* answer the query, then
either (a) extract its salient terms/MeSH-like phrases and re-issue them lexically, or (b) embed the
hypothetical doc and KNN against an on-the-fly candidate pool (overlaps with technique 7). Even a
factually-wrong hypothetical carries the *right vocabulary distribution* — it will naturally write
"transcatheter aortic valve replacement," "Kaplan–Meier," "all-cause mortality at 5 years," etc.,
which the bare query lacked.

**Does it fix "never retrieved"?** In its **lexical** form: same ceiling as technique 2 (needs term
overlap to exist post-expansion). In its **embedding** form (HyDE proper): yes for the dense channel,
but only over whatever candidate pool you embed — so its reach is bounded by the pool, which is why it
pairs with techniques 1 & 7 to assemble that pool.

**Evidence.** Gao et al. 2022, "Precise Zero-Shot Dense Retrieval without Relevance Labels"
(https://arxiv.org/abs/2212.10496) — HyDE beats unsupervised Contriever (nDCG@10 61.3 vs 44.5 on
DL-20). The encoder bottleneck filters the hypothetical's false details. Astronomy literature-review
framework "pathfinder" uses HyDE in production (https://arxiv.org/pdf/2408.01556).

**Eng-cost.** **Low** (lexical form, ~= technique 2) to **Moderate** (embedding form, needs technique
7's machinery).

**Latency.** One LLM generation (~0.5–1.5 s for a short abstract).

**Failure modes.** Hypothetical can drift to an adjacent topic; ground the prompt in the query's key
entities. Adds an LLM dependency on the hot path.

---

## 4. Pseudo-relevance feedback — RM3 / Rocchio  ★ #4 (cheap guardrailed add-on)

**Mechanism.** Assume the top-k stage-1 docs are relevant; extract high-weight expansion terms (RM3 =
relevance-model term distribution; Rocchio = move query vector toward the centroid of top-k); re-issue
the expanded query. Classic, model-free, automatic.

**Does it fix "never retrieved"?** **Weakly for the landmark case.** PRF can only borrow vocabulary
from documents *already retrieved*. If PARTNER 3 shares no terms with the top-k, PRF won't add the
exact terms that surface it — though it *can* widen the net enough to pull in *intermediate* papers
whose references then point to PARTNER 3 (i.e., PRF feeds technique 1). Best as a recall-widener for
near-miss vocabulary, not landmark recovery.

**Evidence.** Long-established for recall (Rocchio, RM3, KL, LCE); parametrized Rocchio in dense
retrieval improves Recall@1000 by 1–5 % (https://en.wikipedia.org/wiki/Relevance_feedback ;
https://arxiv.org/pdf/2305.07477). Semantic/LLM-assisted PRF variants are active research
(https://pmc.ncbi.nlm.nih.gov/articles/PMC11686017/ ; https://arxiv.org/pdf/2601.11238).

**Eng-cost.** **Low** (term-frequency math over top-k abstracts you already fetched). No new service.

**Latency.** Negligible compute + one extra retrieval round-trip.

**Failure modes — significant.** **Topic drift** is the well-documented Achilles' heel: if top-k is
off-topic (ambiguous query), expansion terms steer *further* wrong and recall *degrades*
(canonical "Jaguar animal→car" failure) (https://medium.com/@simantmishra6106/...,
https://arxiv.org/html/2605.00560 "When More Reformulations Hurt"). **Guardrail:** apply selectively
(only when top-k looks coherent), cap expansion terms (~10), keep original-query weight high (Rocchio
α≫β), and always fuse rather than replace. Lower upside than 1–3 for the landmark case; include only as
a cheap, guarded recall widener.

---

## 5. MeSH / UMLS expansion via E-utilities  ★ domain-specific booster (not standalone)

**Mechanism.** Map query terms to controlled vocabulary and OR-in the synonyms/entry-terms:
PubMed's **Automatic Term Mapping (ATM)** already does this server-side; you can *augment* it by
pulling MeSH entry terms (E-utilities / `einfo`, MeSH database) or UMLS synonyms and explicitly OR-ing
them, plus **MeSH tree explosion** (a term's narrower descendants).

**Does it fix "never retrieved"?** **For the medical-terminology slice, yes** — it bridges
acronym↔expansion and lay↔technical gaps deterministically (no hallucination risk). But it's **PubMed
/ MEDLINE-only** (OpenAlex/Crossref aren't MeSH-indexed), and ATM "increases recall but often decreases
precision," with **no single best expansion strategy across descriptors**.

**Evidence.** Trani et al., "Evaluation of Query Expansion Using MeSH in PubMed"
(https://pubmed.ncbi.nlm.nih.gov/19774223/ ; https://link.springer.com/article/10.1007/s10791-008-9074-8).
Massonnaud et al. JMIR 2020 tested 4 strategies across all 28,313 MeSH descriptors (239,724 queries):
**plain ATM was the *worst* of the four**, and the best strategy is descriptor-dependent
(https://pmc.ncbi.nlm.nih.gov/articles/PMC7303830/ ;
https://onlinelibrary.wiley.com/doi/10.1111/hir.12291).

**Eng-cost.** **Low-moderate** (an extra E-utilities/UMLS lookup + query rewriting). **Caveat:** since
PubMed already runs ATM, naive MeSH OR-ing yields *diminishing* returns; the win is in
acronym/synonym + tree explosion the user didn't supply. Cheaper and lower-risk to let technique 2's
LLM emit MeSH-style reformulations than to maintain a UMLS pipeline. Treat as a domain booster, not a
primary lever.

**Latency / failure modes.** One extra lookup; precision loss from over-explosion; multi-domain
expansion makes a MeSH-only path less attractive going forward.

---

## 6. Learned-sparse retrieval (SPLADE) — hosted option  ★ powerful but mismatched to constraints

**Mechanism.** SPLADE expands query *and document* into sparse term-weight vectors via a BERT MLM head
— "learned term expansion" living in an inverted index, so it captures synonymy/implication while
staying lexical-index-shaped.

**Does it fix "never retrieved"?** **Yes in principle** (document-side expansion adds the missing
vocabulary at *index* time). **But** SPLADE's recall advantage comes from indexing the corpus with the
*document* expansion — which means **building and hosting a SPLADE inverted index over the corpus**.
That is exactly the persistent-index the constraints forbid. Query-side SPLADE *without* a
SPLADE-indexed corpus loses most of the benefit (it would query PubMed/OpenAlex's plain BM25 index with
expanded terms — degenerating into technique 2/4 with extra cost).

**Evidence.** SPLADE v2 (https://arxiv.org/abs/2109.10086); naver/splade
(https://github.com/naver/splade); LSR overview
(https://en.wikipedia.org/wiki/Learned_sparse_retrieval). Strong BEIR zero-shot generalization;
DF-FLOPS pruning gets p99 < 200 ms — *on your own index*.

**Eng-cost.** **High and constraint-violating** for the document-side win (host an index) — **out of
scope.** Query-side-only is **Low** but **low-value** here. **Defer.**

---

## 7. On-the-fly bi-encoder embedding + KNN over a per-query candidate pool  ★ the recall *amplifier*

**Mechanism.** This is the constraint-respecting form of dense retrieval. Don't index millions of
papers — instead, (1) assemble a **broad candidate pool of a few hundred docs per query** from
techniques 1–5 (lexical hits + citation frontier + expanded-query hits), (2) embed query + pool **at
request time** with a biomedical bi-encoder, (3) KNN/cosine-rank within the pool. Pure semantic
re-ranking with **no persistent index** — fully inside the "≤ a few hundred docs/query" budget.

**Does it fix "never retrieved"?** **Only as an amplifier, not an originator.** KNN can only rank what
techniques 1–5 put in the pool — it cannot reach a document outside the pool, so **it does not by
itself solve "never retrieved."** Its job is to *promote* a semantically-perfect-but-lexically-weak
paper that the citation/expansion channels dragged into the pool but that BM25/RRF would have buried.
Think of it as a recall-preserving *re-ranker* over a union-of-channels pool, complementary to Cohere
(which is a cross-encoder; this is the cheaper bi-encoder first pass).

**Model choice — biomedical fit matters.**
- **MedCPT** (NCBI): query+article bi-encoder contrastively trained on **255M PubMed search-log
  query–article pairs**, SOTA on 6 biomedical IR tasks; *the same lineage that improved PubMed Best
  Match.* Best in-domain fit (https://arxiv.org/abs/2307.00589 ;
  https://academic.oup.com/bioinformatics/article/39/11/btad651/7335842).
- **SPECTER2** (AllenAI): scientific-paper embeddings, good for multi-domain expansion beyond medicine.
- Contriever / ModernBERT-bi-encoder as general fallbacks
  (https://arxiv.org/pdf/2510.04757).

**Eng-cost.** **Moderate.** Embedding endpoint (hosted or local), pool assembly, KNN math. No vector
DB. Pairs naturally with techniques 1–2 (they build the pool).

**Latency.** Embedding a few-hundred-doc pool on the hot path is the cost (~hundreds of ms with a
hosted endpoint / batching). Cache embeddings by work-id to amortize.

**Failure modes.** Bounded by pool quality (garbage-in); domain-mismatched encoder hurts; hot-path
embedding latency. Mitigate with id-keyed embedding cache + pool size cap.

---

## How they compose (the actual recommended pipeline)

These are **not** competitors — the highest-recall design is a small stack:

```
query
 → (2) multi-query LLM variants  ── widen lexical surface (acronyms/synonyms/MeSH-ish)
 → existing lexical retrievers (PubMed/OpenAlex/Crossref) per variant
 → (1) citation-graph expansion on the top seeds  ── reach landmark papers w/ zero term overlap
        (backward refs = free; forward `cites:` batched; bibliographic-coupling re-weight)
 → union pool (≤ few hundred docs)
 → (7) on-the-fly MedCPT bi-encoder KNN  ── promote semantic-but-lexically-weak papers
 → existing RRF
 → existing Cohere rerank-v3.5  ── final precision
```

Technique 1 is what makes PARTNER 3 *appear in the pool at all*; technique 2 maximizes the odds the
seeds that cite it are themselves retrieved; technique 7 makes sure it isn't buried once present.

---

## Ranked shortlist — by recall-impact ÷ engineering-cost

1. **Citation-graph expansion (snowballing + bibliographic coupling)** — *the only technique that
   recovers a landmark with zero lexical overlap; backward refs are free, forward `cites:` batches 100
   IDs/call.* Highest recall-impact per eng-dollar.
   https://onlinelibrary.wiley.com/doi/full/10.1002/jrsm.1563 ·
   https://asistdl.onlinelibrary.wiley.com/doi/10.1002/asi.24951 ·
   https://docs.openalex.org/api-entities/works/filter-works

2. **Multi-query / RAG-fusion** — *one LLM call + fan-out existing retrievers + reuse existing RRF;
   fixes acronym/synonym mismatch, the bulk of biomedical vocabulary gaps.* Lowest cost, broad win.
   https://github.com/Raudaschl/rag-fusion · https://www.promptlayer.com/glossary/rag-fusion/

3. **HyDE / LLM query expansion** — *hypothetical abstract injects the correct terminology
   distribution; lexical form is ~free, embedding form upgrades into #5.*
   https://arxiv.org/abs/2212.10496

4. **On-the-fly MedCPT bi-encoder KNN over the union pool** — *recall amplifier, not originator;
   promotes semantic-but-lexically-weak papers the channels dragged in; no persistent index, in-domain
   model.* https://arxiv.org/abs/2307.00589

5. **PRF (RM3/Rocchio), guardrailed** — *near-zero cost recall widener over top-k; gate on top-k
   coherence to avoid topic drift; mainly feeds #1.*
   https://arxiv.org/pdf/2305.07477 · https://arxiv.org/html/2605.00560

*Below the line:* **MeSH/UMLS expansion** — useful PubMed-only booster but ATM already runs server-side
and it doesn't generalize to OpenAlex/Crossref or future non-medical domains; prefer letting #2's LLM
emit MeSH-style reformulations. **SPLADE** — strong, but its recall win requires a hosted corpus index
(constraint violation); defer.

**One-line bottom line:** Ship **#1 + #2** first (low cost, directly attack the "never retrieved" case
from two complementary angles), then add **#4** as the bi-encoder amplifier — and register an OpenAlex
API key now that the email polite-pool is retired.
