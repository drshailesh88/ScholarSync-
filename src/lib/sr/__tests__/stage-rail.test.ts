import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveFunnelSummary } from "../funnel";
import { buildStageRail } from "../stage-rail";

const summary = deriveFunnelSummary(createMockReview());

describe("buildStageRail", () => {
  const items = buildStageRail(summary, {
    reviewId: "sglt2-hf",
    activeStage: "summary",
    enabledStages: ["summary", "import"],
  });

  it("lists Review Summary plus the nine funnel stages in order", () => {
    expect(items.map((item) => item.id)).toEqual([
      "summary",
      "import",
      "screen",
      "conflicts",
      "fulltext",
      "rob",
      "extract",
      "prisma",
      "report",
      "export",
    ]);
  });

  it("shows live counts from the funnel summary", () => {
    const byId = new Map(items.map((item) => [item.id, item]));
    expect(byId.get("import")?.count).toBe("412 · 24 dup");
    expect(byId.get("screen")?.count).toBe("114");
    expect(byId.get("conflicts")?.count).toBe("74");
    expect(byId.get("fulltext")?.count).toBe("124");
  });

  it("marks the active stage and links enabled stages to their routes", () => {
    const byId = new Map(items.map((item) => [item.id, item]));
    expect(byId.get("summary")?.active).toBe(true);
    expect(byId.get("import")?.href).toBe(
      "/systematic-review/sglt2-hf/import",
    );
    expect(byId.get("summary")?.href).toBe("/systematic-review/sglt2-hf");
    expect(byId.get("screen")?.href).toBeUndefined();
  });

  it("shows a plain zero for import before anything is imported", () => {
    const empty = buildStageRail(
      { ...summary, imported: 0, duplicatesRemoved: 0 },
      {
        reviewId: "new-review",
        activeStage: "summary",
        enabledStages: ["summary"],
      },
    );
    expect(empty.find((item) => item.id === "import")?.count).toBe("0");
    expect(empty.find((item) => item.id === "import")?.done).toBeFalsy();
  });

  it("flags conflict counts and completed stages", () => {
    const byId = new Map(items.map((item) => [item.id, item]));
    expect(byId.get("conflicts")?.conf).toBe(true);
    expect(byId.get("import")?.done).toBe(true);
  });
});
