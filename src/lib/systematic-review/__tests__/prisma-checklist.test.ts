import { describe, it, expect } from "vitest";
import {
  PRISMA_2020_ITEMS,
  exportChecklistCSV,
} from "@/lib/systematic-review/prisma-checklist";
import type {
  ComplianceResult,
  ChecklistItemResult,
} from "@/lib/systematic-review/prisma-checklist";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeItem(
  itemNumber: number,
  status: ChecklistItemResult["status"],
  overrides: Partial<ChecklistItemResult> = {}
): ChecklistItemResult {
  return {
    itemNumber,
    section: "METHODS",
    topic: `Topic ${itemNumber}`,
    description: `Description for item ${itemNumber}`,
    status,
    location: "",
    suggestion: "",
    ...overrides,
  };
}

function makeComplianceResult(
  items: ChecklistItemResult[]
): ComplianceResult {
  const reported = items.filter((r) => r.status === "reported").length;
  const partiallyReported = items.filter(
    (r) => r.status === "partially_reported"
  ).length;
  const notReported = items.filter((r) => r.status === "not_reported").length;
  const notApplicable = items.filter(
    (r) => r.status === "not_applicable"
  ).length;
  const applicable = items.length - notApplicable;
  const compliancePercentage =
    applicable > 0
      ? Math.round(((reported + partiallyReported * 0.5) / applicable) * 100)
      : 100;

  return {
    items,
    summary: {
      reported,
      partiallyReported,
      notReported,
      notApplicable,
      compliancePercentage,
    },
  };
}

// ---------------------------------------------------------------------------
// PRISMA_2020_ITEMS
// ---------------------------------------------------------------------------

describe("PRISMA_2020_ITEMS", () => {
  it("contains exactly 27 items", () => {
    expect(PRISMA_2020_ITEMS).toHaveLength(27);
  });

  it("has item numbers 1 through 27 without gaps or duplicates", () => {
    const numbers = PRISMA_2020_ITEMS.map((item) => item.number).sort(
      (a, b) => a - b
    );
    for (let i = 0; i < 27; i++) {
      expect(numbers[i]).toBe(i + 1);
    }
  });

  it("every item has a non-empty section, topic, and description", () => {
    for (const item of PRISMA_2020_ITEMS) {
      expect(item.section.trim()).not.toBe("");
      expect(item.topic.trim()).not.toBe("");
      expect(item.description.trim()).not.toBe("");
    }
  });

  it("item 1 is in the TITLE section with topic 'Title'", () => {
    const item1 = PRISMA_2020_ITEMS.find((i) => i.number === 1);
    expect(item1).toBeDefined();
    expect(item1!.section).toBe("TITLE");
    expect(item1!.topic).toBe("Title");
  });

  it("item 2 is in the ABSTRACT section with topic 'Abstract'", () => {
    const item2 = PRISMA_2020_ITEMS.find((i) => i.number === 2);
    expect(item2).toBeDefined();
    expect(item2!.section).toBe("ABSTRACT");
    expect(item2!.topic).toBe("Abstract");
  });

  it("items 3–4 are in the INTRODUCTION section", () => {
    const introItems = PRISMA_2020_ITEMS.filter(
      (i) => i.section === "INTRODUCTION"
    );
    expect(introItems).toHaveLength(2);
    const introNumbers = introItems.map((i) => i.number).sort((a, b) => a - b);
    expect(introNumbers).toEqual([3, 4]);
  });

  it("items 5–15 are in the METHODS section", () => {
    const methodItems = PRISMA_2020_ITEMS.filter(
      (i) => i.section === "METHODS"
    );
    expect(methodItems).toHaveLength(11);
    const methodNumbers = methodItems
      .map((i) => i.number)
      .sort((a, b) => a - b);
    expect(methodNumbers).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it("items 16–22 are in the RESULTS section", () => {
    const resultItems = PRISMA_2020_ITEMS.filter(
      (i) => i.section === "RESULTS"
    );
    expect(resultItems).toHaveLength(7);
    const resultNumbers = resultItems
      .map((i) => i.number)
      .sort((a, b) => a - b);
    expect(resultNumbers).toEqual([16, 17, 18, 19, 20, 21, 22]);
  });

  it("item 23 is in the DISCUSSION section", () => {
    const item23 = PRISMA_2020_ITEMS.find((i) => i.number === 23);
    expect(item23).toBeDefined();
    expect(item23!.section).toBe("DISCUSSION");
    expect(item23!.topic).toBe("Discussion");
  });

  it("items 24–27 are in the OTHER INFORMATION section", () => {
    const otherItems = PRISMA_2020_ITEMS.filter(
      (i) => i.section === "OTHER INFORMATION"
    );
    expect(otherItems).toHaveLength(4);
    const otherNumbers = otherItems
      .map((i) => i.number)
      .sort((a, b) => a - b);
    expect(otherNumbers).toEqual([24, 25, 26, 27]);
  });

  it("item 27 covers availability of data, code, and materials", () => {
    const item27 = PRISMA_2020_ITEMS.find((i) => i.number === 27);
    expect(item27).toBeDefined();
    expect(item27!.topic).toBe("Availability of data, code, and other materials");
  });
});

// ---------------------------------------------------------------------------
// compliancePercentage calculation (via makeComplianceResult helper)
// ---------------------------------------------------------------------------

describe("compliancePercentage calculation", () => {
  it("returns 100% when all 27 items are reported", () => {
    const items = Array.from({ length: 27 }, (_, i) =>
      makeItem(i + 1, "reported")
    );
    const result = makeComplianceResult(items);
    expect(result.summary.compliancePercentage).toBe(100);
    expect(result.summary.reported).toBe(27);
    expect(result.summary.partiallyReported).toBe(0);
    expect(result.summary.notReported).toBe(0);
    expect(result.summary.notApplicable).toBe(0);
  });

  it("returns 0% when all 27 items are not_reported", () => {
    const items = Array.from({ length: 27 }, (_, i) =>
      makeItem(i + 1, "not_reported")
    );
    const result = makeComplianceResult(items);
    expect(result.summary.compliancePercentage).toBe(0);
    expect(result.summary.notReported).toBe(27);
  });

  it("counts partially_reported items at 0.5 weight", () => {
    // 10 reported, 10 partially_reported, 7 not_reported — all applicable
    const items = [
      ...Array.from({ length: 10 }, (_, i) => makeItem(i + 1, "reported")),
      ...Array.from({ length: 10 }, (_, i) =>
        makeItem(i + 11, "partially_reported")
      ),
      ...Array.from({ length: 7 }, (_, i) =>
        makeItem(i + 21, "not_reported")
      ),
    ];
    const result = makeComplianceResult(items);
    // (10 + 10 * 0.5) / 27 = 15 / 27 ≈ 55.56 → rounds to 56
    expect(result.summary.compliancePercentage).toBe(56);
    expect(result.summary.reported).toBe(10);
    expect(result.summary.partiallyReported).toBe(10);
    expect(result.summary.notReported).toBe(7);
  });

  it("excludes not_applicable items from the denominator", () => {
    // 20 reported, 7 not_applicable → applicable = 20 → 100%
    const items = [
      ...Array.from({ length: 20 }, (_, i) => makeItem(i + 1, "reported")),
      ...Array.from({ length: 7 }, (_, i) =>
        makeItem(i + 21, "not_applicable")
      ),
    ];
    const result = makeComplianceResult(items);
    expect(result.summary.compliancePercentage).toBe(100);
    expect(result.summary.notApplicable).toBe(7);
  });

  it("returns 100% when every item is not_applicable", () => {
    const items = Array.from({ length: 27 }, (_, i) =>
      makeItem(i + 1, "not_applicable")
    );
    const result = makeComplianceResult(items);
    expect(result.summary.compliancePercentage).toBe(100);
  });

  it("handles mixed partially_reported and not_applicable correctly", () => {
    // 10 reported, 5 partially_reported, 2 not_applicable (applicable = 15)
    // (10 + 5*0.5) / 15 = 12.5 / 15 ≈ 83.33 → rounds to 83
    const items = [
      ...Array.from({ length: 10 }, (_, i) => makeItem(i + 1, "reported")),
      ...Array.from({ length: 5 }, (_, i) =>
        makeItem(i + 11, "partially_reported")
      ),
      ...Array.from({ length: 2 }, (_, i) =>
        makeItem(i + 16, "not_applicable")
      ),
    ];
    const result = makeComplianceResult(items);
    expect(result.summary.compliancePercentage).toBe(83);
  });
});

// ---------------------------------------------------------------------------
// exportChecklistCSV
// ---------------------------------------------------------------------------

describe("exportChecklistCSV", () => {
  const sampleItems: ChecklistItemResult[] = [
    {
      itemNumber: 1,
      section: "TITLE",
      topic: "Title",
      description: "Identify the report as a systematic review.",
      status: "reported",
      location: "Title section",
      suggestion: "",
    },
    {
      itemNumber: 2,
      section: "ABSTRACT",
      topic: "Abstract",
      description: 'Provide a structured summary including "background".',
      status: "partially_reported",
      location: "",
      suggestion: 'Add "objectives" to abstract',
    },
    {
      itemNumber: 3,
      section: "INTRODUCTION",
      topic: "Rationale",
      description: "Describe the rationale for the review.",
      status: "not_reported",
      location: "",
      suggestion: "Add a rationale paragraph",
    },
  ];

  const sampleResult: ComplianceResult = makeComplianceResult(sampleItems);

  it("produces a CSV with a header row and one row per item", () => {
    const csv = exportChecklistCSV(sampleResult);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(1 + sampleItems.length); // header + 3 data rows
  });

  it("header row contains the expected column names", () => {
    const csv = exportChecklistCSV(sampleResult);
    const header = csv.split("\n")[0];
    expect(header).toBe(
      "Item #,Section,Topic,Description,Status,Location,Suggestion"
    );
  });

  it("first data row has correct item number and status", () => {
    const csv = exportChecklistCSV(sampleResult);
    const firstRow = csv.split("\n")[1];
    expect(firstRow).toContain("1,");
    expect(firstRow).toContain('"reported"');
  });

  it("escapes double quotes in description fields with doubled quotes", () => {
    const csv = exportChecklistCSV(sampleResult);
    // Item 2 description contains a double-quoted word: 'including "background".'
    // CSV standard: inner " → ""
    expect(csv).toContain('""background""');
  });

  it("escapes double quotes in suggestion fields with doubled quotes", () => {
    const csv = exportChecklistCSV(sampleResult);
    // Item 2 suggestion: 'Add "objectives" to abstract'
    expect(csv).toContain('""objectives""');
  });

  it("each data row starts with the item number", () => {
    const csv = exportChecklistCSV(sampleResult);
    const [, row1, row2, row3] = csv.split("\n");
    expect(row1.startsWith("1,")).toBe(true);
    expect(row2.startsWith("2,")).toBe(true);
    expect(row3.startsWith("3,")).toBe(true);
  });

  it("all 27 real PRISMA items produce a 28-line CSV", () => {
    const allItems: ChecklistItemResult[] = PRISMA_2020_ITEMS.map((item) => ({
      itemNumber: item.number,
      section: item.section,
      topic: item.topic,
      description: item.description,
      status: "not_reported" as const,
      location: "",
      suggestion: "",
    }));
    const fullResult = makeComplianceResult(allItems);
    const csv = exportChecklistCSV(fullResult);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(28); // 1 header + 27 items
  });

  it("returns only the header when given an empty items list", () => {
    const emptyResult: ComplianceResult = makeComplianceResult([]);
    const csv = exportChecklistCSV(emptyResult);
    expect(csv).toBe(
      "Item #,Section,Topic,Description,Status,Location,Suggestion"
    );
  });
});
