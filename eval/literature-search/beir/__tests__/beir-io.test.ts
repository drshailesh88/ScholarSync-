import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readCorpus, readQueries, readQrels } from "../beir-io";

let dir: string;

beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "beir-io-"));
  writeFileSync(
    join(dir, "corpus.jsonl"),
    [
      JSON.stringify({ _id: "MED-1", title: "Aspirin", text: "reduces risk" }),
      "", // blank line must be tolerated
      JSON.stringify({ _id: "MED-2", title: "Statins", text: "cholesterol" }),
    ].join("\n")
  );
  writeFileSync(
    join(dir, "queries.jsonl"),
    [
      JSON.stringify({ _id: "Q1", text: "aspirin risk", metadata: {} }),
      JSON.stringify({ _id: "Q2", text: "statins" }),
    ].join("\n")
  );
  mkdirSync(join(dir, "qrels"), { recursive: true });
  writeFileSync(
    join(dir, "qrels", "test.tsv"),
    ["query-id\tcorpus-id\tscore", "Q1\tMED-1\t2", "Q1\tMED-2\t0", "Q2\tMED-2\t1"].join("\n")
  );
});

afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe("beir-io", () => {
  it("streams corpus.jsonl into a docId→{title,text} map, tolerating blank lines", async () => {
    const corpus = await readCorpus(dir);
    expect(corpus.size).toBe(2);
    expect(corpus.get("MED-1")).toEqual({ title: "Aspirin", text: "reduces risk" });
  });

  it("reads queries keyed by id", () => {
    const q = readQueries(dir);
    expect(q.size).toBe(2);
    expect(q.get("Q1")!.text).toBe("aspirin risk");
  });

  it("parses qrels TSV, skipping the header, into nested graded maps", () => {
    const qrels = readQrels(dir, "test");
    expect(qrels.get("Q1")!.get("MED-1")).toBe(2);
    expect(qrels.get("Q1")!.get("MED-2")).toBe(0);
    expect(qrels.get("Q2")!.get("MED-2")).toBe(1);
    expect(qrels.has("query-id")).toBe(false);
  });
});
