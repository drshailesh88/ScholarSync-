import { describe, it, expect } from "vitest";
import type { EvalResultItem } from "@/lib/search/eval/metrics";
import {
  classifyResult,
  classifyResults,
  computePrecisionMetrics,
  matchedIntruder,
  meanPrecision,
  type PrecisionSpec,
} from "../precision-metric";
import { PRECISION_QUERIES } from "../precision-queries";

const paper = (title: string, abstract?: string): EvalResultItem => ({ title, abstract });

/** A small synthetic spec: on-topic = contrast nephropathy; PRISMA is an intruder. */
const SPEC: PrecisionSpec = {
  onTopic: ["contrast-induced nephropathy", "periprocedural hydration contrast"],
  offTopic: [
    { label: "PRISMA", phrases: ["prisma statement", "preferred reporting items"] },
    { label: "diabetic nephropathy", phrases: ["diabetic nephropathy"] },
  ],
};

describe("classifyResult", () => {
  it("labels a genuinely on-topic paper on_topic", () => {
    expect(classifyResult(paper("Contrast-induced nephropathy after PCI"), SPEC)).toBe("on_topic");
  });

  it("labels a paper matching no signal unknown (NOT credited as on-topic)", () => {
    expect(classifyResult(paper("A history of cardiology"), SPEC)).toBe("unknown");
  });

  it("labels a known intruder off_topic", () => {
    expect(classifyResult(paper("The PRISMA Statement for systematic reviews"), SPEC)).toBe(
      "off_topic"
    );
  });

  it("gives intruders PRECEDENCE over on-topic lexical overlap", () => {
    // A diabetic-nephropathy paper that also name-drops the contrast topic in its
    // abstract must still be an intrusion, not credited as on-topic.
    const sneaky = paper(
      "Diabetic nephropathy progression",
      "we also discuss contrast-induced nephropathy in passing"
    );
    expect(classifyResult(sneaky, SPEC)).toBe("off_topic");
    expect(matchedIntruder(sneaky, SPEC)?.label).toBe("diabetic nephropathy");
  });

  it("requires ALL tokens of a phrase to be present (AND within a phrase)", () => {
    // "periprocedural hydration contrast" needs all three tokens.
    expect(classifyResult(paper("periprocedural hydration strategies"), SPEC)).toBe("unknown");
    expect(
      classifyResult(paper("periprocedural hydration with contrast media"), SPEC)
    ).toBe("on_topic");
  });
});

describe("computePrecisionMetrics — the headline behaviors", () => {
  it("an all-on-topic top-10 scores precision 1.0 and zero intrusion", () => {
    const results = Array.from({ length: 10 }, (_, i) =>
      paper(`Contrast-induced nephropathy study ${i}`)
    );
    const m = computePrecisionMetrics(results, SPEC);
    expect(m.count).toBe(10);
    expect(m.onTopic).toBe(10);
    expect(m.precisionAtK).toBe(1.0);
    expect(m.precisionAt3).toBe(1.0);
    expect(m.offTopicIntrusionRate).toBe(0);
    expect(m.labeledPrecision).toBe(1.0);
    expect(m.firstIntruderRank).toBeNull();
    expect(m.intruders).toEqual([]);
  });

  it("a PRISMA-style intruder is PENALIZED (precision drops, intrusion rises)", () => {
    const results = [
      paper("The PRISMA Statement: preferred reporting items"), // rank 1 intruder
      ...Array.from({ length: 9 }, (_, i) => paper(`Contrast-induced nephropathy study ${i}`)),
    ];
    const m = computePrecisionMetrics(results, SPEC);
    expect(m.offTopic).toBe(1);
    expect(m.onTopic).toBe(9);
    expect(m.precisionAtK).toBeCloseTo(0.9);
    expect(m.offTopicIntrusionRate).toBeCloseTo(0.1);
    // A rank-1 intrusion is the worst kind — it craters top-of-list precision.
    expect(m.firstIntruderRank).toBe(1);
    expect(m.precisionAt3).toBeCloseTo(2 / 3);
    expect(m.intruders[0]).toEqual({
      rank: 1,
      title: "The PRISMA Statement: preferred reporting items",
      label: "PRISMA",
    });
  });

  it("treats unknown results as not-credited (precision counts them against)", () => {
    const results = [
      paper("Contrast-induced nephropathy review"),
      paper("Unrelated bench study on zebrafish"), // unknown
    ];
    const m = computePrecisionMetrics(results, SPEC);
    expect(m.onTopic).toBe(1);
    expect(m.unknown).toBe(1);
    expect(m.offTopic).toBe(0);
    expect(m.precisionAtK).toBeCloseTo(0.5);
    expect(m.offTopicIntrusionRate).toBe(0);
    // labeledPrecision ignores `unknown`: purity among confidently-labeled = 1/1.
    expect(m.labeledPrecision).toBe(1.0);
  });

  it("honors k (only the top-k are scored)", () => {
    const results = [
      paper("The PRISMA Statement"), // intruder at rank 1
      paper("Contrast-induced nephropathy A"),
      paper("Contrast-induced nephropathy B"),
      paper("Contrast-induced nephropathy C"),
    ];
    const m = computePrecisionMetrics(results, SPEC, 3);
    expect(m.count).toBe(3);
    expect(m.offTopic).toBe(1);
    expect(m.onTopic).toBe(2);
  });

  it("handles an empty list without throwing (all rates 0, nulls where undefined)", () => {
    const m = computePrecisionMetrics([], SPEC);
    expect(m.count).toBe(0);
    expect(m.precisionAtK).toBe(0);
    expect(m.precisionAt3).toBe(0);
    expect(m.offTopicIntrusionRate).toBe(0);
    expect(m.labeledPrecision).toBeNull();
    expect(m.firstIntruderRank).toBeNull();
  });

  it("classifyResults returns rank-ordered labels with the matched intruder class", () => {
    const labels = classifyResults(
      [paper("Contrast-induced nephropathy"), paper("Diabetic nephropathy outcomes")],
      SPEC
    );
    expect(labels).toEqual([
      { rank: 1, title: "Contrast-induced nephropathy", label: "on_topic" },
      {
        rank: 2,
        title: "Diabetic nephropathy outcomes",
        label: "off_topic",
        intruder: "diabetic nephropathy",
      },
    ]);
  });
});

describe("meanPrecision", () => {
  it("averages a numeric field and ignores nulls", () => {
    const rows = [
      computePrecisionMetrics([paper("Contrast-induced nephropathy")], SPEC), // labeled 1.0
      computePrecisionMetrics([], SPEC), // labeledPrecision null → ignored
    ];
    expect(meanPrecision(rows, (m) => m.labeledPrecision)).toBe(1.0);
    expect(meanPrecision(rows, (m) => m.precisionAtK)).toBeCloseTo(0.5); // (1 + 0) / 2
  });

  it("returns null when every row is null for the picked field", () => {
    const rows = [computePrecisionMetrics([], SPEC)];
    expect(meanPrecision(rows, (m) => m.labeledPrecision)).toBeNull();
  });
});

describe("the curated NICHE/BROAD specs actually encode the failure class", () => {
  const hfpef = PRECISION_QUERIES.find((q) => q.id === "prec-hfpef-management")!;

  it("classifies a genuine HFpEF trial on_topic", () => {
    expect(
      classifyResult(
        paper("Empagliflozin in Heart Failure with a Preserved Ejection Fraction"),
        hfpef
      )
    ).toBe("on_topic");
  });

  it("classifies the famous HFrEF blockbuster as an off-topic intrusion", () => {
    expect(
      classifyResult(
        paper("Dapagliflozin in Patients with Heart Failure and Reduced Ejection Fraction"),
        hfpef
      )
    ).toBe("off_topic");
  });

  it("does NOT misclassify PARAGON-HF (a real HFpEF trial) as the HFrEF intruder", () => {
    // The HFrEF marker is "enalapril"/"paradigm-hf"/"reduced ejection fraction" —
    // deliberately NOT "sacubitril valsartan", which PARAGON-HF also carries.
    expect(
      classifyResult(
        paper("Sacubitril–Valsartan in Heart Failure with Preserved Ejection Fraction"),
        hfpef
      )
    ).toBe("on_topic");
  });

  it("classifies PRISMA as an intruder across every curated query", () => {
    const prisma = paper("PRISMA 2020 statement: preferred reporting items for systematic reviews");
    for (const q of PRECISION_QUERIES) {
      expect(classifyResult(prisma, q)).toBe("off_topic");
    }
  });

  it("every curated query carries at least one on-topic signal and one intruder class", () => {
    for (const q of PRECISION_QUERIES) {
      expect(q.onTopic.length).toBeGreaterThan(0);
      expect(q.offTopic.length).toBeGreaterThan(0);
    }
  });
});
