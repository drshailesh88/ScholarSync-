import { describe, expect, it } from "vitest";
import {
  relativeLuminance,
  contrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AAA,
  suggestAccessibleColor,
} from "../color-contrast";
import {
  checkAccessibility,
  calculateAccessibilityScore,
  type A11yIssue,
} from "../accessibility-checker";
import type { SlideState } from "@/stores/slides-store";
import type { ThemeConfig, ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helper factories
// ---------------------------------------------------------------------------

const goodTheme: ThemeConfig = {
  name: "Test",
  primaryColor: "#1D4ED8",
  secondaryColor: "#7C3AED",
  backgroundColor: "#FFFFFF",
  textColor: "#111827",
  accentColor: "#DC2626",
};

function makeSlide(overrides: Partial<SlideState> = {}): SlideState {
  return {
    id: 1,
    sortOrder: 0,
    layout: "title_content",
    title: "Test Slide",
    subtitle: "",
    contentBlocks: [],
    speakerNotes: "Some notes",
    ...overrides,
  };
}

function makeImageBlock(alt: string): ContentBlock {
  return {
    type: "image",
    data: { url: "https://example.com/img.png", alt },
  };
}

function makeTextBlock(text: string): ContentBlock {
  return { type: "text", data: { text, style: "body" } };
}

function makeTableBlock(headers: string[]): ContentBlock {
  return { type: "table", data: { headers, rows: [["a", "b"]] } };
}

function makeChartBlock(title: string): ContentBlock {
  return {
    type: "chart",
    data: {
      chartType: "bar",
      title,
      labels: ["A"],
      datasets: [{ label: "D", data: [1] }],
    },
  };
}

// ---------------------------------------------------------------------------
// Color contrast utility tests
// ---------------------------------------------------------------------------

describe("relativeLuminance", () => {
  it("returns ~1.0 for white", () => {
    expect(relativeLuminance("#FFFFFF")).toBeCloseTo(1.0, 2);
  });

  it("returns 0.0 for black", () => {
    expect(relativeLuminance("#000000")).toBeCloseTo(0.0, 4);
  });
});

describe("contrastRatio", () => {
  it("returns 21:1 for black on white", () => {
    const ratio = contrastRatio("#000000", "#FFFFFF");
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("returns 1:1 for same color", () => {
    expect(contrastRatio("#336699", "#336699")).toBeCloseTo(1, 1);
  });
});

describe("meetsWCAG_AA", () => {
  it("returns true for black on white", () => {
    expect(meetsWCAG_AA("#000000", "#FFFFFF")).toBe(true);
  });

  it("returns false for gray on white below 4.5:1", () => {
    // #999999 on #FFFFFF has contrast ~2.85:1
    expect(meetsWCAG_AA("#999999", "#FFFFFF")).toBe(false);
  });

  it("accepts large text at 3:1", () => {
    // #767676 on #FFFFFF is ~4.54:1 — passes normal too
    // Use a color that only passes at large text threshold
    // #949494 on #FFFFFF => ~2.53:1, still fails large text
    // #737373 on #FFFFFF => ~4.97:1 passes both
    // Let's pick #888888 => ~3.54:1 — fails normal, passes large
    expect(meetsWCAG_AA("#888888", "#FFFFFF", false)).toBe(false);
    expect(meetsWCAG_AA("#888888", "#FFFFFF", true)).toBe(true);
  });
});

describe("meetsWCAG_AAA", () => {
  it("returns true for black on white (21:1 >= 7)", () => {
    expect(meetsWCAG_AAA("#000000", "#FFFFFF")).toBe(true);
  });

  it("returns false when ratio is between 4.5 and 7", () => {
    // #595959 on #FFFFFF => ~7.0:1 — borderline, pick something lower
    // #666666 on #FFFFFF => ~5.74:1
    expect(meetsWCAG_AAA("#666666", "#FFFFFF")).toBe(false);
  });
});

describe("suggestAccessibleColor", () => {
  it("returns a color that passes AA", () => {
    const result = suggestAccessibleColor("#999999", "#FFFFFF");
    expect(meetsWCAG_AA(result, "#FFFFFF")).toBe(true);
  });

  it("returns the original color if it already passes", () => {
    const result = suggestAccessibleColor("#000000", "#FFFFFF");
    expect(result).toBe("#000000");
  });

  it("works for light background", () => {
    const result = suggestAccessibleColor("#CCCCCC", "#FFFFFF");
    expect(meetsWCAG_AA(result, "#FFFFFF")).toBe(true);
  });

  it("works for dark background", () => {
    const result = suggestAccessibleColor("#333333", "#000000");
    expect(meetsWCAG_AA(result, "#000000")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Accessibility checker tests
// ---------------------------------------------------------------------------

describe("checkAccessibility", () => {
  it("detects missing alt text", () => {
    const slides = [makeSlide({ contentBlocks: [makeImageBlock("")] })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "missing-alt-text")).toBe(true);
  });

  it("detects 'Image description' as missing alt text", () => {
    const slides = [
      makeSlide({ contentBlocks: [makeImageBlock("Image description")] }),
    ];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "missing-alt-text")).toBe(true);
  });

  it("detects empty title", () => {
    const slides = [makeSlide({ title: "" })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "missing-slide-title")).toBe(true);
  });

  it("detects low contrast text", () => {
    const badTheme: ThemeConfig = {
      ...goodTheme,
      textColor: "#AAAAAA",
      backgroundColor: "#FFFFFF",
    };
    const slides = [makeSlide()];
    const issues = checkAccessibility(slides, badTheme);
    expect(issues.some((i) => i.ruleId === "low-contrast-text")).toBe(true);
  });

  it("detects low contrast primary", () => {
    const badTheme: ThemeConfig = {
      ...goodTheme,
      primaryColor: "#DDDDDD",
      backgroundColor: "#FFFFFF",
    };
    const slides = [makeSlide()];
    const issues = checkAccessibility(slides, badTheme);
    expect(issues.some((i) => i.ruleId === "low-contrast-primary")).toBe(true);
  });

  it("detects too many blocks (>8)", () => {
    const blocks: ContentBlock[] = Array.from({ length: 9 }, (_, i) =>
      makeTextBlock(`Block ${i}`),
    );
    const slides = [makeSlide({ contentBlocks: blocks })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "too-many-blocks")).toBe(true);
  });

  it("does not flag 8 blocks", () => {
    const blocks: ContentBlock[] = Array.from({ length: 8 }, (_, i) =>
      makeTextBlock(`Block ${i}`),
    );
    const slides = [makeSlide({ contentBlocks: blocks })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "too-many-blocks")).toBe(false);
  });

  it("detects too much text (>100 words)", () => {
    const longText = Array.from({ length: 101 }, (_, i) => `word${i}`).join(" ");
    const slides = [makeSlide({ contentBlocks: [makeTextBlock(longText)] })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "too-much-text")).toBe(true);
  });

  it("detects duplicate titles", () => {
    const slides = [
      makeSlide({ id: 1, title: "Same Title" }),
      makeSlide({ id: 2, title: "Same Title" }),
    ];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.filter((i) => i.ruleId === "duplicate-slide-title").length).toBe(2);
  });

  it("detects empty slides", () => {
    const slides = [makeSlide({ contentBlocks: [] })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "empty-slide")).toBe(true);
  });

  it("detects missing speaker notes", () => {
    const slides = [makeSlide({ speakerNotes: "" })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "missing-speaker-notes")).toBe(true);
  });

  it("detects table with missing headers", () => {
    const slides = [makeSlide({ contentBlocks: [makeTableBlock(["", ""])] })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "table-missing-headers")).toBe(true);
  });

  it("detects chart with missing title", () => {
    const slides = [makeSlide({ contentBlocks: [makeChartBlock("")] })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "chart-missing-title")).toBe(true);
  });

  it("detects reading order issues", () => {
    const blocks: ContentBlock[] = [
      makeTextBlock("A"),
      makeTextBlock("B"),
    ];
    const slides = [makeSlide({ contentBlocks: blocks })];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues.some((i) => i.ruleId === "reading-order")).toBe(true);
  });

  it("returns empty array for a perfect presentation", () => {
    const slides = [
      makeSlide({
        id: 1,
        title: "Unique Title",
        speakerNotes: "Some notes here",
        contentBlocks: [
          { ...makeTextBlock("Short text"), zIndex: 0 },
          { ...makeImageBlock("A photo of a chart showing results"), zIndex: 1 },
        ],
      }),
    ];
    const issues = checkAccessibility(slides, goodTheme);
    expect(issues).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Score calculation tests
// ---------------------------------------------------------------------------

describe("calculateAccessibilityScore", () => {
  it("returns 100 for 0 issues", () => {
    expect(calculateAccessibilityScore([])).toBe(100);
  });

  it("returns 80 for 2 errors", () => {
    const issues: A11yIssue[] = [
      {
        slideId: 1,
        slideIndex: 0,
        severity: "error",
        ruleId: "test",
        message: "",
        suggestion: "",
      },
      {
        slideId: 1,
        slideIndex: 0,
        severity: "error",
        ruleId: "test2",
        message: "",
        suggestion: "",
      },
    ];
    expect(calculateAccessibilityScore(issues)).toBe(80);
  });

  it("deducts 5 per warning", () => {
    const issues: A11yIssue[] = [
      {
        slideId: 1,
        slideIndex: 0,
        severity: "warning",
        ruleId: "test",
        message: "",
        suggestion: "",
      },
    ];
    expect(calculateAccessibilityScore(issues)).toBe(95);
  });

  it("deducts 2 per info", () => {
    const issues: A11yIssue[] = [
      {
        slideId: 1,
        slideIndex: 0,
        severity: "info",
        ruleId: "test",
        message: "",
        suggestion: "",
      },
    ];
    expect(calculateAccessibilityScore(issues)).toBe(98);
  });

  it("floors at 0", () => {
    const issues: A11yIssue[] = Array.from({ length: 20 }, (_, i) => ({
      slideId: 1,
      slideIndex: 0,
      severity: "error" as const,
      ruleId: `test-${i}`,
      message: "",
      suggestion: "",
    }));
    expect(calculateAccessibilityScore(issues)).toBe(0);
  });
});
