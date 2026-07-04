# BEIR biomedical regression harness

A standing, **external-benchmark** regression harness for our literature-search
ranking. It scores our ranking against public, labeled BEIR biomedical datasets
using the BEIR/trec_eval convention (nDCG@10, Recall@100), so quality is measured
on data the pipeline was **never tuned on** — the opposite of the frozen-pool 87q
harness that measured re-ranking against its own answer key.

## Datasets

| dataset      | on public mirror | corpus | test queries | notes |
|--------------|:----------------:|-------:|-------------:|-------|
| `nfcorpus`   | ✅ | 3.6K   | 323 | PubMed / NutritionFacts |
| `scifact`    | ✅ | 5.2K   | 300 | scientific claim verification |
| `trec-covid` | ✅ | 171K   | 50  | CORD-19; deep pools → low Recall@100 by construction |
| `bioasq`     | ❌ | —      | —   | **blocked**: needs BioASQ registration + a custom corpus build; not on the public mirror. The downloader skips it and the runner reports it rather than faking a number. |

## How it works

1. **First stage — BM25** (`bm25.ts`, Anserini/BEIR defaults k1=0.9, b=0.4) over the
   dataset corpus produces candidate docIds. Our production ranker is a *reranker*
   (it reorders candidates, it doesn't scan a corpus), so a lexical first stage is
   required on a fixed corpus.
2. **Ranking stage**
   - `--rank bm25` — score the BM25 ranking directly (the lexical baseline).
   - `--rank rerank` — hand the BM25 top-C to our **production reranker**
     (`src/lib/search/rerank.ts` → `cohere/rerank-4-pro` via OpenRouter) and score
     the reordered head. This is our system's ranking quality on external labels.
3. **Score** nDCG@10 + Recall@100 (`beir-score.ts`, verified against
   `usnistgov/trec_eval` `m_ndcg_cut.c`: linear gain, log2 discount, recall over rel>0).

### What it does and does not measure
On a fixed corpus we can only exercise our **ranking** quality, not our live
multi-source retrieval. **nDCG@10** is the metric reranking actually moves.
**Recall@100** is bounded by the candidate depth `C`: with `C=100` the reranked
top-100 is the same *set* as the BM25 top-100 (reranking reorders, it cannot add
docs), so Recall@100 equals the BM25 pool's recall. BEIR corpora carry no
journal/citation/evidence metadata, so our metadata quality signals don't apply
here — this isolates **relevance**.

## Running

```bash
# 1. Download datasets (public mirror; idempotent)
tsx eval/literature-search/beir/fetch-dataset.ts nfcorpus scifact trec-covid

# 2a. BM25 baseline (no secrets)
tsx eval/literature-search/beir/run-beir.ts --dataset nfcorpus --label baseline --rank bm25

# 2b. Our reranker (needs OPENROUTER_API_KEY — run under op-run)
op-run -- tsx eval/literature-search/beir/run-beir.ts \
  --dataset trec-covid --label rerank --rank rerank --candidates 100

# Optional cost/time cap for large query sets:
op-run -- tsx eval/literature-search/beir/run-beir.ts \
  --dataset nfcorpus --label rerank --rank rerank --max-queries 50
```

Output lands in `eval/literature-search/runs/beir-<label>/<dataset>.json` (the
`runs/` tree is gitignored — reproducible via this harness). Downloaded corpora
live in `.data/` (gitignored).

## Baseline numbers (BM25, this harness)

| dataset      | nDCG@10 | Recall@100 | published BM25 (BEIR) |
|--------------|--------:|-----------:|-----------------------|
| nfcorpus     | 0.307   | 0.232      | ~0.325 / ~0.250 |
| scifact      | 0.656   | 0.876      | ~0.665 / ~0.908 |
| trec-covid   | 0.600   | 0.104      | ~0.656 / ~0.109 |

Our BM25 sits just under the published Anserini BM25 (which adds Porter stemming +
the full Lucene analyzer) — close enough to confirm the harness is correct.
