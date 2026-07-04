/**
 * Download + extract a public BEIR dataset zip into `.data/<name>/`.
 *
 * Datasets live at the canonical UKP mirror the BEIR project publishes:
 *   https://public.ukp.informatik.tu-darmstadt.de/thakur/BEIR/datasets/<name>.zip
 * Each zip contains corpus.jsonl, queries.jsonl, and qrels/{train,dev,test}.tsv.
 *
 * Uses the system `curl` + `unzip` (present on macOS/Linux) to avoid adding a
 * zip dependency. Idempotent: skips extraction if the dataset dir already exists.
 *
 * Usage: tsx eval/literature-search/beir/fetch-dataset.ts <name> [<name> ...]
 *
 * NOTE ON BIOASQ: BioASQ is NOT on this public mirror — it requires BioASQ
 * account registration and a custom corpus build (see BEIR docs). It is skipped
 * by this downloader; the runner reports it as blocked rather than faking it.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = join(HERE, ".data");
const MIRROR = "https://public.ukp.informatik.tu-darmstadt.de/thakur/BEIR/datasets";

/** Datasets known to be on the public mirror (small + biomedical first). */
export const PUBLIC_BIOMED_DATASETS = ["nfcorpus", "scifact", "trec-covid"] as const;

export function datasetDir(name: string): string {
  return join(DATA_DIR, name);
}

export function fetchDataset(name: string): string {
  const dir = datasetDir(name);
  if (existsSync(join(dir, "corpus.jsonl"))) {
    console.log(`[beir] ${name}: already present at ${dir}`);
    return dir;
  }
  mkdirSync(DATA_DIR, { recursive: true });
  const zipPath = join(DATA_DIR, `${name}.zip`);
  const url = `${MIRROR}/${name}.zip`;
  console.log(`[beir] ${name}: downloading ${url}`);
  execFileSync("curl", ["-sS", "-L", "-f", "-o", zipPath, url], { stdio: "inherit" });
  console.log(`[beir] ${name}: extracting`);
  execFileSync("unzip", ["-o", "-q", zipPath, "-d", DATA_DIR], { stdio: "inherit" });
  rmSync(zipPath, { force: true });
  if (!existsSync(join(dir, "corpus.jsonl"))) {
    throw new Error(
      `[beir] ${name}: extraction did not produce ${dir}/corpus.jsonl — check the mirror layout`
    );
  }
  console.log(`[beir] ${name}: ready at ${dir}`);
  return dir;
}

function main() {
  const names = process.argv.slice(2);
  const targets = names.length ? names : [...PUBLIC_BIOMED_DATASETS];
  for (const name of targets) fetchDataset(name);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
