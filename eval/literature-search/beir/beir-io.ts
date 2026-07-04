/**
 * Readers for the BEIR on-disk format (as shipped in the public zips):
 *   corpus.jsonl   — {"_id","title","text",...} one JSON object per line
 *   queries.jsonl  — {"_id","text","metadata"}   one JSON object per line
 *   qrels/<split>.tsv — TSV "query-id\tcorpus-id\tscore" with a header row
 *
 * corpus.jsonl is streamed line-by-line (TREC-COVID's is large), so we never
 * hold the whole file as one string.
 */

import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface BeirDoc {
  title: string;
  text: string;
}

/** Stream corpus.jsonl into a Map<docId, {title, text}>. */
export async function readCorpus(datasetDir: string): Promise<Map<string, BeirDoc>> {
  const corpus = new Map<string, BeirDoc>();
  const rl = createInterface({
    input: createReadStream(join(datasetDir, "corpus.jsonl"), "utf8"),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const obj = JSON.parse(trimmed) as { _id: string; title?: string; text?: string };
    corpus.set(String(obj._id), { title: obj.title ?? "", text: obj.text ?? "" });
  }
  return corpus;
}

export interface BeirQuery {
  id: string;
  text: string;
}

export function readQueries(datasetDir: string): Map<string, BeirQuery> {
  const out = new Map<string, BeirQuery>();
  const raw = readFileSync(join(datasetDir, "queries.jsonl"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const obj = JSON.parse(trimmed) as { _id: string; text?: string };
    out.set(String(obj._id), { id: String(obj._id), text: obj.text ?? "" });
  }
  return out;
}

/** qrels/<split>.tsv → Map<queryId, Map<docId, score>>. Ignores the header row. */
export function readQrels(
  datasetDir: string,
  split = "test"
): Map<string, Map<string, number>> {
  const out = new Map<string, Map<string, number>>();
  const raw = readFileSync(join(datasetDir, "qrels", `${split}.tsv`), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const [qid, docId, scoreStr] = trimmed.split(/\t/);
    if (qid === "query-id" || scoreStr === undefined) continue; // header / malformed
    const score = Number(scoreStr);
    if (Number.isNaN(score)) continue;
    if (!out.has(qid)) out.set(qid, new Map());
    out.get(qid)!.set(docId, score);
  }
  return out;
}
