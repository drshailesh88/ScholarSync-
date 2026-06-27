import { describe, it, expect, vi, beforeEach } from "vitest";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { UnifiedSearchResult } from "@/types/search";

const { mockFederateWith } = vi.hoisted(() => ({ mockFederateWith: vi.fn() }));

vi.mock("@/lib/search/web/federate", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/search/web/federate")>();
  return { ...actual, federateWith: mockFederateWith };
});

import { captureProviders } from "../capture-providers";
import type { WebBenchmarkQuery } from "../types";

function row(url: string, title: string): UnifiedSearchResult {
  return { title, authors: [], journal: "", year: 0, url, sources: ["discussions"], citationCount: 0, publicationTypes: ["discussions"], isOpenAccess: false };
}

describe("captureProviders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("freezes the fused pool with a per-row provider tag and provider list", async () => {
    const hn = row("https://news.ycombinator.com/item?id=1", "thread");
    const se = row("https://stats.stackexchange.com/q/2", "question");
    mockFederateWith.mockResolvedValue({
      results: [hn, se],
      perSource: [],
      perSourceRows: [
        { id: "hacker-news", results: [hn] },
        { id: "stackexchange", results: [se] },
      ],
      degraded: false,
    });

    const dir = mkdtempSync(join(tmpdir(), "providers-"));
    const queries: WebBenchmarkQuery[] = [
      { id: "disc-x", tab: "discussions", queryClass: "methodology", query: "peer review", intent: "", recencyBiased: false, mustHaves: [{ label: "a", domain: "reddit.com", rule: "consensus" }] },
    ];

    const n = await captureProviders(queries, dir, null, 0);
    expect(n).toBe(1);

    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files).toHaveLength(1);
    const body = JSON.parse(readFileSync(join(dir, files[0]), "utf8"));
    expect(body.tab).toBe("discussions");
    expect(body.results).toHaveLength(2);
    expect(body.results[0].provider).toBe("hacker-news");
    expect(body.results[1].provider).toBe("stackexchange");
    // provider list reflects the full discussions source set
    expect(body.providers).toContain("hacker-news");
  });

  it("skips (does not freeze) a degraded federation", async () => {
    mockFederateWith.mockResolvedValue({ results: [], perSource: [], perSourceRows: [], degraded: true });
    const dir = mkdtempSync(join(tmpdir(), "providers-"));
    const queries: WebBenchmarkQuery[] = [
      { id: "disc-y", tab: "discussions", queryClass: "niche", query: "x", intent: "", recencyBiased: false, mustHaves: [] },
    ];
    const n = await captureProviders(queries, dir, null, 0);
    expect(n).toBe(0);
    expect(readdirSync(dir).filter((f) => f.endsWith(".json"))).toHaveLength(0);
  });
});
