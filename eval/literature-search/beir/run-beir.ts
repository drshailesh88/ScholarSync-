/**
 * BEIR biomedical regression harness — runs our retrieval+ranking against
 * external, labeled BEIR datasets and reports nDCG@10 + Recall@100 per dataset.
 *
 * Pipeline per query:
 *   1. BM25 first stage over the dataset corpus → ranked candidate docIds
 *      (our production ranker is a reranker, not a corpus scanner — see bm25.ts).
 *   2. Ranking stage:
 *        --rank bm25   : score the BM25 ranking directly (the lexical baseline).
 *        --rank rerank : hand the BM25 top-C to our PRODUCTION reranker
 *                        (src/lib/search/rerank.ts → cohere/rerank-4-pro via
 *                        OpenRouter) and score the reordered head + BM25 tail.
 *   3. Score nDCG@10 and Recall@100 (trec_eval/BEIR convention — see beir-score.ts).
 *
 * What this measures honestly: on a FIXED external corpus we can only exercise
 * our RANKING quality, not our live multi-source retrieval. nDCG@10 is the metric
 * reranking actually moves. Recall@100 is bounded by the candidate depth C: with
 * C=100 the reranked top-100 is the same SET as the BM25 top-100, so Recall@100
 * equals the BM25 pool's recall (reranking reorders, it cannot add docs). The
 * BEIR corpora also carry no journal/citation/evidence metadata, so our
 * metadata-based quality signals do not apply here — this isolates relevance.
 *
 * Output: eval/literature-search/runs/beir-<label>/<dataset>.json + summary.json
 * (the runs/ tree is gitignored — reproducible via this harness).
 *
 * Usage:
 *   op-run -- tsx eval/literature-search/beir/run-beir.ts \
 *     --dataset nfcorpus --label baseline --rank bm25
 *   op-run -- tsx eval/literature-search/beir/run-beir.ts \
 *     --dataset trec-covid --label rerank --rank rerank --candidates 100 [--max-queries N]
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { UnifiedSearchResult } from "@/types/search";
import { rerankResults, hasReranker } from "@/lib/search/rerank";
import { fetchDataset } from "./fetch-dataset";
import { readCorpus, readQueries, readQrels } from "./beir-io";
import { buildIndex, search } from "./bm25";
import { ndcgAtK, recallAtK, meanIgnoringNull, type Qrels } from "./beir-score";

const HERE = dirname(fileURLToPath(import.meta.url));
const RUNS_DIR = join(HERE, "..", "runs");
const SCORE_DEPTH = 1000; // BM25 ranking depth kept for Recall@100 scoring.

interface Args {
  dataset: string;
  label: string;
  rank: "bm25" | "rerank";
  candidates: number;
  maxQueries: number | null;
}

function parseArgs(argv: string[]): Args {
  const a: Args = {
    dataset: "nfcorpus",
    label: "baseline",
    rank: "bm25",
    candidates: 100,
    maxQueries: null,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dataset") a.dataset = argv[++i];
    else if (argv[i] === "--label") a.label = argv[++i];
    else if (argv[i] === "--rank") a.rank = argv[++i] === "rerank" ? "rerank" : "bm25";
    else if (argv[i] === "--candidates") a.candidates = Number(argv[++i]) || 100;
    else if (argv[i] === "--max-queries") a.maxQueries = Number(argv[++i]) || null;
  }
  return a;
}

interface CorpusDoc {
  title: string;
  text: string;
}

/** Rerank the BM25 top-C via our production reranker; return the full ranking
 * (reranked head ++ BM25 tail). Falls back to the BM25 order if no reranker. */
async function rerankHead(
  query: string,
  bm25Ranked: string[],
  corpus: Map<string, CorpusDoc>,
  candidates: number
): Promise<string[]> {
  const head = bm25Ranked.slice(0, candidates);
  const tail = bm25Ranked.slice(candidates);
  const inputs = head.map((docId) => {
    const doc = corpus.get(docId);
    return {
      __docId: docId,
      title: doc?.title ?? "",
      abstract: doc?.text ?? "",
    } as unknown as UnifiedSearchResult;
  });
  const reranked = await rerankResults(query, inputs, head.length);
  // rerankResults returns the head reordered (mapping by index), preserving our
  // __docId. If it fell back (same array / no scores) the order is unchanged.
  const rerankedIds = reranked.map(
    (r) => (r as unknown as { __docId: string }).__docId
  );
  return [...rerankedIds, ...tail];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(
    `[beir] dataset=${args.dataset} label=${args.label} rank=${args.rank} candidates=${args.candidates}` +
      (args.maxQueries ? ` maxQueries=${args.maxQueries}` : "")
  );
  if (args.rank === "rerank" && !hasReranker()) {
    throw new Error(
      "[beir] --rank rerank requires a reranker (OPENROUTER_API_KEY/COHERE_API_KEY). Run under `op-run --`."
    );
  }

  const dir = fetchDataset(args.dataset);
  const corpus = await readCorpus(dir);
  const queries = readQueries(dir);
  const qrels = readQrels(dir, "test");
  console.log(
    `[beir] corpus=${corpus.size} docs · queries(test qrels)=${qrels.size} · building BM25 index…`
  );

  const index = buildIndex([...corpus.entries()].map(([id, d]) => ({ id, text: `${d.title} ${d.text}` })));

  const queryIds = [...qrels.keys()].filter((qid) => queries.has(qid));
  const targets = args.maxQueries ? queryIds.slice(0, args.maxQueries) : queryIds;

  const ndcgs: (number | null)[] = [];
  const recalls: (number | null)[] = [];
  let done = 0;
  for (const qid of targets) {
    const q = queries.get(qid)!;
    const rel = qrels.get(qid) as Qrels;
    const bm25Ranked = search(index, q.text, SCORE_DEPTH);
    const ranking =
      args.rank === "rerank"
        ? await rerankHead(q.text, bm25Ranked, corpus, args.candidates)
        : bm25Ranked;
    ndcgs.push(ndcgAtK(ranking, rel, 10));
    recalls.push(recallAtK(ranking, rel, 100));
    done++;
    if (done % 25 === 0) console.log(`[beir]   scored ${done}/${targets.length}`);
  }

  const result = {
    dataset: args.dataset,
    label: args.label,
    rank: args.rank,
    candidates: args.candidates,
    scoredQueries: targets.length,
    totalTestQueries: queryIds.length,
    corpusDocs: corpus.size,
    metrics: {
      ndcgAt10: meanIgnoringNull(ndcgs),
      recallAt100: meanIgnoringNull(recalls),
    },
    generatedAt: new Date().toISOString(),
  };

  const outDir = join(RUNS_DIR, `beir-${args.label}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${args.dataset}.json`), JSON.stringify(result, null, 2));

  const nd = result.metrics.ndcgAt10;
  const rc = result.metrics.recallAt100;
  console.log(
    `[beir] ${args.dataset} (${args.rank}) → nDCG@10=${nd?.toFixed(4) ?? "n/a"} · ` +
      `Recall@100=${rc?.toFixed(4) ?? "n/a"} · scored ${targets.length} queries`
  );
  console.log(`[beir] wrote ${join(outDir, `${args.dataset}.json`)}`);
}

main();
