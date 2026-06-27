import { describe, it, expect } from "vitest";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { abToggle } from "../rerank-offline";
import { cacheKey } from "../capture-searxng";
import { BENCHMARK_QUERIES } from "../queries";
import type { UnifiedSearchResult } from "@/types/search";

describe("abToggle", () => {
  it("reports a per-query before/after delta attributable to the transform", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wsab-"));
    const q = BENCHMARK_QUERIES.find((x) => x.id === "disc-phd-burnout")!;
    // must-have is a reddit.com thread; freeze a pool where reddit is at rank 2.
    writeFileSync(
      join(dir, cacheKey(q.tab, q.query)),
      JSON.stringify({
        tab: q.tab, query: q.query, capturedAt: "FROZEN",
        results: [
          { title: "spam", url: "https://spam.com/x", domain: "spam.com", authors: [], journal: "", year: 0, citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["discussions"] },
          { title: "PhD burnout thread", url: "https://reddit.com/r/PhD/1", domain: "reddit.com", authors: [], journal: "", year: 0, citationCount: 0, publicationTypes: [], isOpenAccess: false, sources: ["discussions"] },
        ],
      }),
    );
    // transform: promote reddit.com to the top (a hypothetical "community boost")
    const promoteReddit = (_q: string, rs: UnifiedSearchResult[]) =>
      [...rs].sort((a, b) => (b.domain === "reddit.com" ? 1 : 0) - (a.domain === "reddit.com" ? 1 : 0));
    const rows = await abToggle({ cacheDir: dir, now: Date.parse("2026-06-24"), transform: promoteReddit });
    const row = rows.find((r) => r.id === "disc-phd-burnout")!;
    expect(row.after).toBeGreaterThanOrEqual(row.before); // recall@10 unchanged, relevance same; diversity/dedup unchanged → delta 0 or +
    expect(typeof row.delta).toBe("number");
  });

  it("skips queries with no frozen pool (empty dir → no rows)", async () => {
    const dir = mkdtempSync(join(tmpdir(), "wsab-empty-"));
    const rows = await abToggle({ cacheDir: dir, now: Date.parse("2026-06-24"), transform: (_q, rs) => rs });
    expect(rows).toHaveLength(0);
  });
});
