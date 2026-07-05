import { describe, it, expect } from "vitest";
import { buildLabelingPrompt, parseLabels } from "../prelabel";

describe("buildLabelingPrompt", () => {
  it("includes the query, the 0-3 scale, and every doc indexed by position", () => {
    const { system, user } = buildLabelingPrompt("crispr base editing", [
      { title: "A clinical roadmap", url: "nature.com/x" },
      { title: "Base editing explained", url: "genecopoeia.com/y" },
    ]);
    expect(system).toMatch(/0.*3|0-3/);
    expect(user).toContain("crispr base editing");
    expect(user).toContain("0. A clinical roadmap");
    expect(user).toContain("1. Base editing explained");
  });
});

describe("parseLabels", () => {
  const docs = [
    { url: "a.com/1", title: "A" },
    { url: "b.com/2", title: "B" },
    { url: "c.com/3", title: "C" },
  ];

  it("maps grades to docs by index", () => {
    const raw = '[{"index":0,"grade":3,"reason":"authoritative"},{"index":1,"grade":1,"reason":"tangential"},{"index":2,"grade":0,"reason":"off-topic"}]';
    const labeled = parseLabels(raw, docs);
    expect(labeled.map((l) => l.grade)).toEqual([3, 1, 0]);
    expect(labeled[0].reason).toBe("authoritative");
  });

  it("defaults a missing or out-of-range grade to 0 (conservative)", () => {
    const raw = '[{"index":0,"grade":2,"reason":"ok"},{"index":1,"grade":9,"reason":"bad"}]'; // idx 2 missing, idx1 out of range
    const labeled = parseLabels(raw, docs);
    expect(labeled[0].grade).toBe(2);
    expect(labeled[1].grade).toBe(0);
    expect(labeled[2].grade).toBe(0);
  });

  it("tolerates a fenced / prose-wrapped JSON reply", () => {
    const raw = 'Here are the grades:\n```json\n[{"index":0,"grade":3,"reason":"x"}]\n```';
    const labeled = parseLabels(raw, docs);
    expect(labeled[0].grade).toBe(3);
  });
});
