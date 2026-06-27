// eval/web-search/__tests__/run.test.ts
import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runFromCache } from "../run";
import { cacheKey } from "../capture-searxng";
import { BENCHMARK_QUERIES } from "../queries";


describe("runFromCache", () => {
  it("scores each query whose pool is cached and aggregates per-tab", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wsrun-"));
    const q = BENCHMARK_QUERIES.find((x) => x.id === "news-h5n1-dairy")!;
    // freeze a tiny pool that contains the must-have domain (cdc.gov)
    writeFileSync(
      join(dir, cacheKey(q.tab, q.query)),
      JSON.stringify({
        tab: q.tab, query: q.query, capturedAt: "FROZEN",
        results: [
          { title: "CDC avian influenza", url: "https://www.cdc.gov/bird-flu", domain: "cdc.gov", publishedAt: "2026-06-10", year: 2026, authors: [], journal: "", citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["news"] },
        ],
      }),
    );
    const card = await runFromCache({ cacheDir: dir, label: "test", now: new Date("2026-06-24").getTime() });
    const row = card.perQuery.find((p) => p.id === "news-h5n1-dairy");
    expect(row).toBeDefined();
    expect(row!.dimensions.relevance).toBe(10); // must-have present
    expect(card.tabAverages.news).toBeGreaterThan(0);
  });

  it("returns per-query rows (top-10 engine output) for the packet builder", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wsrun-rows-"));
    const q = BENCHMARK_QUERIES.find((x) => x.id === "news-h5n1-dairy")!;
    writeFileSync(
      join(dir, cacheKey(q.tab, q.query)),
      JSON.stringify({
        tab: q.tab, query: q.query, capturedAt: "FROZEN",
        results: [
          { title: "CDC avian influenza", url: "https://www.cdc.gov/bird-flu", domain: "cdc.gov", publishedAt: "2026-06-10", abstract: "outbreak update", year: 2026, authors: [], journal: "", citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["news"] },
        ],
      }),
    );
    const card = await runFromCache({ cacheDir: dir, label: "test", now: new Date("2026-06-24").getTime() });
    const row = card.perQuery.find((p) => p.id === "news-h5n1-dairy")!;
    expect(row.rows).toBeDefined();
    expect(row.rows[0]).toMatchObject({ url: "https://www.cdc.gov/bird-flu", domain: "cdc.gov", publishedDate: "2026-06-10" });
  });
});
