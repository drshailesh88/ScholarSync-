import { describe, it, expect, vi } from "vitest";

import {
  computeMetrics,
  computeWSS,
  generateValidationReport,
  runBenchmark,
  createCohenDataset,
  type BenchmarkDataset,
  type BenchmarkResult,
  type ScreeningDecision,
} from "@/lib/systematic-review/validation/screening-benchmark";

// ---------------------------------------------------------------------------
// computeMetrics
// ---------------------------------------------------------------------------

describe("computeMetrics", () => {
  it("perfect classifier returns sensitivity=1, specificity=1, F1=1", () => {
    const predictions: ScreeningDecision[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBe(1);
    expect(metrics.specificity).toBe(1);
    expect(metrics.precision).toBe(1);
    expect(metrics.recall).toBe(1);
    expect(metrics.f1Score).toBe(1);
    expect(metrics.truePositives).toBe(2);
    expect(metrics.trueNegatives).toBe(3);
    expect(metrics.falsePositives).toBe(0);
    expect(metrics.falseNegatives).toBe(0);
  });

  it("all-include classifier returns sensitivity=1, specificity=0", () => {
    const predictions: ScreeningDecision[] = [
      "include",
      "include",
      "include",
      "include",
      "include",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBe(1);
    expect(metrics.specificity).toBe(0);
    expect(metrics.truePositives).toBe(2);
    expect(metrics.falsePositives).toBe(3);
    expect(metrics.trueNegatives).toBe(0);
    expect(metrics.falseNegatives).toBe(0);
  });

  it("all-exclude classifier returns sensitivity=0, specificity=1", () => {
    const predictions: ScreeningDecision[] = [
      "exclude",
      "exclude",
      "exclude",
      "exclude",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBe(0);
    expect(metrics.specificity).toBe(1);
    expect(metrics.truePositives).toBe(0);
    expect(metrics.falsePositives).toBe(0);
    expect(metrics.trueNegatives).toBe(3);
    expect(metrics.falseNegatives).toBe(2);
  });

  it("random-like classifier yields metrics near 0.5", () => {
    // Simulate a ~50/50 split that's approximately random
    const predictions: ScreeningDecision[] = [
      "include",
      "exclude",
      "include",
      "exclude",
      "include",
      "exclude",
      "include",
      "exclude",
      "include",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "exclude",
      "exclude",
      "include",
      "include",
      "exclude",
      "exclude",
      "include",
      "include",
      "exclude",
    ];

    // With alternating predictions vs shuffled gold labels:
    // (i, i), (e, e), (i, e), (e, i), (i, i), (e, e), (i, e), (e, i), (i, i), (e, e)
    // TP=3, TN=3, FP=2, FN=2
    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBeCloseTo(0.6, 1);
    expect(metrics.specificity).toBeCloseTo(0.6, 1);
    expect(metrics.f1Score).toBeCloseTo(0.6, 1);
  });

  it("treats 'maybe' predictions as 'include' (conservative)", () => {
    const predictions: ScreeningDecision[] = ["maybe", "maybe", "exclude"];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "exclude",
      "exclude",
    ];

    const metrics = computeMetrics(predictions, goldLabels);

    // "maybe" → "include": (include, include) = TP, (include, exclude) = FP, (exclude, exclude) = TN
    expect(metrics.truePositives).toBe(1);
    expect(metrics.falsePositives).toBe(1);
    expect(metrics.trueNegatives).toBe(1);
    expect(metrics.falseNegatives).toBe(0);
    expect(metrics.sensitivity).toBe(1);
  });

  it("throws when predictions and gold labels have different lengths", () => {
    expect(() => computeMetrics(["include"], ["include", "exclude"])).toThrow(
      /does not match/
    );
  });

  it("handles empty arrays", () => {
    const metrics = computeMetrics([], []);

    expect(metrics.truePositives).toBe(0);
    expect(metrics.falsePositives).toBe(0);
    expect(metrics.trueNegatives).toBe(0);
    expect(metrics.falseNegatives).toBe(0);
    expect(metrics.sensitivity).toBe(0);
    expect(metrics.specificity).toBe(0);
    expect(metrics.f1Score).toBe(0);
  });

  it("handles all-include gold labels (no negatives)", () => {
    const predictions: ScreeningDecision[] = ["include", "include"];
    const goldLabels: ("include" | "exclude")[] = ["include", "include"];

    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBe(1);
    expect(metrics.specificity).toBe(0); // no negatives to get right
    expect(metrics.precision).toBe(1);
  });

  it("handles all-exclude gold labels (no positives)", () => {
    const predictions: ScreeningDecision[] = ["exclude", "exclude"];
    const goldLabels: ("include" | "exclude")[] = ["exclude", "exclude"];

    const metrics = computeMetrics(predictions, goldLabels);

    expect(metrics.sensitivity).toBe(0); // no positives to recall
    expect(metrics.specificity).toBe(1);
    expect(metrics.precision).toBe(0); // no predicted positives
  });
});

// ---------------------------------------------------------------------------
// computeWSS
// ---------------------------------------------------------------------------

describe("computeWSS", () => {
  it("WSS@95 for perfect classifier is (TN+FN)/N - 0.05", () => {
    // Perfect classifier: 2 includes, 3 excludes
    const predictions: ScreeningDecision[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    // TN=3, FN=0, N=5 → (3+0)/5 - (1 - 95/100) = 0.6 - 0.05 = 0.55
    const wss95 = computeWSS(predictions, goldLabels, 95);
    expect(wss95).toBeCloseTo(0.55, 5);
  });

  it("WSS@100 for perfect classifier is (TN+FN)/N - 0", () => {
    const predictions: ScreeningDecision[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    // TN=3, FN=0, N=5 → (3+0)/5 - (1 - 100/100) = 0.6 - 0 = 0.6
    const wss100 = computeWSS(predictions, goldLabels, 100);
    expect(wss100).toBeCloseTo(0.6, 5);
  });

  it("WSS@95 for all-include classifier is negative (no work saved)", () => {
    const predictions: ScreeningDecision[] = [
      "include",
      "include",
      "include",
      "include",
      "include",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    // TN=0, FN=0, N=5 → 0/5 - 0.05 = -0.05
    const wss95 = computeWSS(predictions, goldLabels, 95);
    expect(wss95).toBeCloseTo(-0.05, 5);
  });

  it("WSS returns 0 for empty input", () => {
    expect(computeWSS([], [], 95)).toBe(0);
  });

  it("WSS@95 for all-exclude classifier", () => {
    const predictions: ScreeningDecision[] = [
      "exclude",
      "exclude",
      "exclude",
      "exclude",
      "exclude",
    ];
    const goldLabels: ("include" | "exclude")[] = [
      "include",
      "include",
      "exclude",
      "exclude",
      "exclude",
    ];

    // TN=3, FN=2, N=5 → (3+2)/5 - 0.05 = 1.0 - 0.05 = 0.95
    const wss95 = computeWSS(predictions, goldLabels, 95);
    expect(wss95).toBeCloseTo(0.95, 5);
  });

  it("throws when predictions and gold labels have different lengths", () => {
    expect(() => computeWSS(["include"], ["include", "exclude"], 95)).toThrow(
      /does not match/
    );
  });
});

// ---------------------------------------------------------------------------
// generateValidationReport
// ---------------------------------------------------------------------------

describe("generateValidationReport", () => {
  const sampleResult: BenchmarkResult = {
    datasetName: "Test Dataset",
    totalPapers: 100,
    truePositives: 18,
    falsePositives: 5,
    trueNegatives: 72,
    falseNegatives: 5,
    sensitivity: 0.7826,
    specificity: 0.9351,
    precision: 0.7826,
    recall: 0.7826,
    f1Score: 0.7826,
    wss95: 0.72,
    wss100: 0.77,
    reportText: "",
  };

  it("includes dataset name", () => {
    const report = generateValidationReport(sampleResult);
    expect(report).toContain("Test Dataset");
  });

  it("includes all required metrics", () => {
    const report = generateValidationReport(sampleResult);

    expect(report).toContain("Sensitivity");
    expect(report).toContain("Specificity");
    expect(report).toContain("Precision");
    expect(report).toContain("F1 Score");
    expect(report).toContain("WSS@95");
    expect(report).toContain("WSS@100");
  });

  it("includes confusion matrix values", () => {
    const report = generateValidationReport(sampleResult);

    expect(report).toContain("True Positives:  18");
    expect(report).toContain("False Positives: 5");
    expect(report).toContain("True Negatives:  72");
    expect(report).toContain("False Negatives: 5");
  });

  it("includes total paper count", () => {
    const report = generateValidationReport(sampleResult);
    expect(report).toContain("N = 100");
  });

  it("includes methods section text", () => {
    const report = generateValidationReport(sampleResult);
    expect(report).toContain("Methods Section Text");
    expect(report).toContain("validated against the Test Dataset");
    expect(report).toContain("benchmark dataset comprising 100 studies");
  });

  it("formats percentages correctly", () => {
    const report = generateValidationReport(sampleResult);
    // 0.7826 → 78.3%
    expect(report).toContain("78.3%");
    // 0.9351 → 93.5%
    expect(report).toContain("93.5%");
    // 0.72 → 72.0%
    expect(report).toContain("72.0%");
  });
});

// ---------------------------------------------------------------------------
// runBenchmark
// ---------------------------------------------------------------------------

describe("runBenchmark", () => {
  it("runs screening function on all papers and returns correct result", async () => {
    const dataset: BenchmarkDataset = {
      name: "Tiny Test",
      papers: [
        { id: "1", title: "RCT of Drug X", abstract: "A randomized trial...", goldLabel: "include" },
        { id: "2", title: "Case report", abstract: "A single case...", goldLabel: "exclude" },
        { id: "3", title: "RCT of Drug X dose", abstract: "Phase II trial...", goldLabel: "include" },
        { id: "4", title: "Editorial", abstract: "Opinion piece...", goldLabel: "exclude" },
      ],
    };

    // Perfect screening function
    const screeningFn = vi.fn(async (title: string) => {
      return title.includes("RCT") ? "include" as ScreeningDecision : "exclude" as ScreeningDecision;
    });

    const result = await runBenchmark(dataset, screeningFn);

    expect(result.datasetName).toBe("Tiny Test");
    expect(result.totalPapers).toBe(4);
    expect(result.truePositives).toBe(2);
    expect(result.trueNegatives).toBe(2);
    expect(result.falsePositives).toBe(0);
    expect(result.falseNegatives).toBe(0);
    expect(result.sensitivity).toBe(1);
    expect(result.specificity).toBe(1);
    expect(result.f1Score).toBe(1);
    expect(result.reportText).toContain("Tiny Test");
    expect(screeningFn).toHaveBeenCalledTimes(4);
  });

  it("calls onProgress after each paper", async () => {
    const dataset: BenchmarkDataset = {
      name: "Progress Test",
      papers: [
        { id: "1", title: "A", abstract: "A", goldLabel: "include" },
        { id: "2", title: "B", abstract: "B", goldLabel: "exclude" },
        { id: "3", title: "C", abstract: "C", goldLabel: "include" },
      ],
    };

    const onProgress = vi.fn();
    const screeningFn = vi.fn(async () => "include" as ScreeningDecision);

    await runBenchmark(dataset, screeningFn, onProgress);

    expect(onProgress).toHaveBeenCalledTimes(3);
    expect(onProgress).toHaveBeenNthCalledWith(1, 1, 3);
    expect(onProgress).toHaveBeenNthCalledWith(2, 2, 3);
    expect(onProgress).toHaveBeenNthCalledWith(3, 3, 3);
  });

  it("handles empty dataset", async () => {
    const dataset: BenchmarkDataset = { name: "Empty", papers: [] };
    const screeningFn = vi.fn(async () => "include" as ScreeningDecision);

    const result = await runBenchmark(dataset, screeningFn);

    expect(result.totalPapers).toBe(0);
    expect(screeningFn).not.toHaveBeenCalled();
  });

  it("treats 'maybe' from screening function as 'include'", async () => {
    const dataset: BenchmarkDataset = {
      name: "Maybe Test",
      papers: [
        { id: "1", title: "Study", abstract: "Abstract", goldLabel: "include" },
        { id: "2", title: "Review", abstract: "Abstract", goldLabel: "exclude" },
      ],
    };

    // Returns "maybe" for everything
    const screeningFn = vi.fn(async () => "maybe" as ScreeningDecision);

    const result = await runBenchmark(dataset, screeningFn);

    // maybe → include: (include, include) = TP, (include, exclude) = FP
    expect(result.truePositives).toBe(1);
    expect(result.falsePositives).toBe(1);
    expect(result.sensitivity).toBe(1);
    expect(result.specificity).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// createCohenDataset
// ---------------------------------------------------------------------------

describe("createCohenDataset", () => {
  it("returns a dataset with 50 papers", () => {
    const dataset = createCohenDataset();
    expect(dataset.papers).toHaveLength(50);
  });

  it("has a non-empty name", () => {
    const dataset = createCohenDataset();
    expect(dataset.name.length).toBeGreaterThan(0);
  });

  it("contains both include and exclude labels", () => {
    const dataset = createCohenDataset();
    const includes = dataset.papers.filter((p) => p.goldLabel === "include");
    const excludes = dataset.papers.filter((p) => p.goldLabel === "exclude");

    expect(includes.length).toBeGreaterThan(0);
    expect(excludes.length).toBeGreaterThan(0);
  });

  it("has 20 includes and 30 excludes", () => {
    const dataset = createCohenDataset();
    const includes = dataset.papers.filter((p) => p.goldLabel === "include");
    const excludes = dataset.papers.filter((p) => p.goldLabel === "exclude");

    expect(includes.length).toBe(20);
    expect(excludes.length).toBe(30);
  });

  it("all papers have id, title, abstract, and goldLabel", () => {
    const dataset = createCohenDataset();

    for (const paper of dataset.papers) {
      expect(paper.id).toBeTruthy();
      expect(paper.title).toBeTruthy();
      expect(paper.abstract).toBeTruthy();
      expect(["include", "exclude"]).toContain(paper.goldLabel);
    }
  });

  it("all paper IDs are unique", () => {
    const dataset = createCohenDataset();
    const ids = dataset.papers.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
