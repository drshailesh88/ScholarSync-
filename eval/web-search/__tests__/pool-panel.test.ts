import { describe, it, expect } from "vitest";
import { poolCandidates } from "../pool-panel";

describe("poolCandidates", () => {
  it("de-dupes across engines by canonical URL and records which engines surfaced each doc", () => {
    const pool = poolCandidates([
      { engine: "exa", results: [{ url: "https://www.cdc.gov/flu/", title: "CDC flu" }, { url: "https://a.com/1", title: "A" }] },
      { engine: "brave", results: [{ url: "https://cdc.gov/flu", title: "CDC flu dup" }, { url: "https://b.com/2", title: "B" }] },
    ]);
    const cdc = pool.find((d) => d.url === "cdc.gov/flu");
    expect(cdc).toBeDefined();
    expect(cdc!.engines.sort()).toEqual(["brave", "exa"]);
  });

  it("ranks consensus docs (more engines) above single-engine docs, then by best rank", () => {
    const pool = poolCandidates([
      { engine: "exa", results: [{ url: "https://solo.com/x", title: "solo" }, { url: "https://both.com/y", title: "both" }] },
      { engine: "brave", results: [{ url: "https://both.com/y", title: "both dup" }] },
    ]);
    expect(pool[0].url).toBe("both.com/y"); // 2 engines → first
    expect(pool[0].engines).toHaveLength(2);
  });

  it("tracks the best (lowest) rank a doc achieved across engines", () => {
    const pool = poolCandidates([
      { engine: "exa", results: [{ url: "https://x.com/1", title: "x" }, { url: "https://y.com/2", title: "y" }] },
      { engine: "brave", results: [{ url: "https://z.com/3", title: "z" }, { url: "https://x.com/1", title: "x dup" }] },
    ]);
    const x = pool.find((d) => d.url === "x.com/1");
    expect(x!.bestRank).toBe(1); // rank 1 in exa beats rank 2 in brave
  });

  it("skips results with no URL", () => {
    const pool = poolCandidates([{ engine: "exa", results: [{ title: "no url" }, { url: "https://ok.com/1", title: "ok" }] }]);
    expect(pool).toHaveLength(1);
    expect(pool[0].url).toBe("ok.com/1");
  });
});
