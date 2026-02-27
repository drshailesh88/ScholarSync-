import { describe, it, expect } from "vitest";
import { formatForCochrane, formatForEmbase } from "@/lib/systematic-review/search-strategy";

// ---------------------------------------------------------------------------
// formatForCochrane
// ---------------------------------------------------------------------------

describe("formatForCochrane", () => {
  it("converts [MeSH Terms] to [MeSH descriptor]", () => {
    const input = "hypertension[MeSH Terms]";
    expect(formatForCochrane(input)).toBe("hypertension[MeSH descriptor]");
  });

  it("converts [Mesh] to [MeSH descriptor]", () => {
    const input = "diabetes mellitus[Mesh]";
    expect(formatForCochrane(input)).toBe("diabetes mellitus[MeSH descriptor]");
  });

  it("converts [tiab] to :ti,ab", () => {
    const input = "insulin resistance[tiab]";
    expect(formatForCochrane(input)).toBe("insulin resistance:ti,ab");
  });

  it("converts all three tag types in a combined boolean string", () => {
    const input =
      "(hypertension[MeSH Terms] OR blood pressure[tiab]) AND (antihypertensives[Mesh] OR drug therapy[tiab])";
    const result = formatForCochrane(input);
    expect(result).toBe(
      "(hypertension[MeSH descriptor] OR blood pressure:ti,ab) AND (antihypertensives[MeSH descriptor] OR drug therapy:ti,ab)"
    );
  });

  it("replaces all occurrences of [MeSH Terms] when present multiple times", () => {
    const input = "term1[MeSH Terms] AND term2[MeSH Terms]";
    const result = formatForCochrane(input);
    expect(result).toBe("term1[MeSH descriptor] AND term2[MeSH descriptor]");
  });

  it("replaces all occurrences of [tiab] when present multiple times", () => {
    const input = "term1[tiab] OR term2[tiab]";
    const result = formatForCochrane(input);
    expect(result).toBe("term1:ti,ab OR term2:ti,ab");
  });

  it("replaces all occurrences of [Mesh] when present multiple times", () => {
    const input = "cancer[Mesh] AND tumor[Mesh]";
    const result = formatForCochrane(input);
    expect(result).toBe("cancer[MeSH descriptor] AND tumor[MeSH descriptor]");
  });

  it("returns unchanged string when no PubMed tags are present", () => {
    const input = "plain text query without any tags";
    expect(formatForCochrane(input)).toBe(input);
  });

  it("handles an empty string", () => {
    expect(formatForCochrane("")).toBe("");
  });

  it("does not alter unrecognised bracket content", () => {
    const input = "term[tw] AND other[all]";
    expect(formatForCochrane(input)).toBe("term[tw] AND other[all]");
  });

  it("does not produce raw .mp. suffixes (Cochrane format does not use them)", () => {
    // Cochrane format uses :ti,ab — NOT .mp. which belongs to Ovid/Embase
    const input = "obesity[tiab]";
    const result = formatForCochrane(input);
    expect(result).not.toContain(".mp.");
    expect(result).toContain(":ti,ab");
  });
});

// ---------------------------------------------------------------------------
// formatForEmbase
// ---------------------------------------------------------------------------

describe("formatForEmbase", () => {
  it("converts [MeSH Terms] to /exp", () => {
    const input = "hypertension[MeSH Terms]";
    expect(formatForEmbase(input)).toBe("hypertension/exp");
  });

  it("converts [Mesh] to /exp", () => {
    const input = "diabetes mellitus[Mesh]";
    expect(formatForEmbase(input)).toBe("diabetes mellitus/exp");
  });

  it("converts [tiab] to :ti,ab", () => {
    const input = "insulin resistance[tiab]";
    expect(formatForEmbase(input)).toBe("insulin resistance:ti,ab");
  });

  it("converts all three tag types in a combined boolean string", () => {
    const input =
      "(hypertension[MeSH Terms] OR blood pressure[tiab]) AND (antihypertensives[Mesh] OR drug therapy[tiab])";
    const result = formatForEmbase(input);
    expect(result).toBe(
      "(hypertension/exp OR blood pressure:ti,ab) AND (antihypertensives/exp OR drug therapy:ti,ab)"
    );
  });

  it("replaces all occurrences of [MeSH Terms] when present multiple times", () => {
    const input = "term1[MeSH Terms] AND term2[MeSH Terms]";
    const result = formatForEmbase(input);
    expect(result).toBe("term1/exp AND term2/exp");
  });

  it("replaces all occurrences of [tiab] when present multiple times", () => {
    const input = "term1[tiab] OR term2[tiab]";
    const result = formatForEmbase(input);
    expect(result).toBe("term1:ti,ab OR term2:ti,ab");
  });

  it("replaces all occurrences of [Mesh] when present multiple times", () => {
    const input = "cancer[Mesh] AND tumor[Mesh]";
    const result = formatForEmbase(input);
    expect(result).toBe("cancer/exp AND tumor/exp");
  });

  it("returns unchanged string when no PubMed tags are present", () => {
    const input = "plain text query without any tags";
    expect(formatForEmbase(input)).toBe(input);
  });

  it("handles an empty string", () => {
    expect(formatForEmbase("")).toBe("");
  });

  it("does not alter unrecognised bracket content", () => {
    const input = "term[tw] AND other[all]";
    expect(formatForEmbase(input)).toBe("term[tw] AND other[all]");
  });

  it("uses Emtree /exp suffix rather than [MeSH descriptor]", () => {
    const input = "obesity[Mesh]";
    const result = formatForEmbase(input);
    expect(result).toContain("/exp");
    expect(result).not.toContain("[MeSH descriptor]");
  });
});

// ---------------------------------------------------------------------------
// Cross-format correctness
// ---------------------------------------------------------------------------

describe("formatForCochrane vs formatForEmbase — divergent outputs", () => {
  it("produces different MeSH tag representations for the same input", () => {
    const input = "stroke[MeSH Terms]";
    expect(formatForCochrane(input)).toBe("stroke[MeSH descriptor]");
    expect(formatForEmbase(input)).toBe("stroke/exp");
  });

  it("both agree on :ti,ab conversion for free-text tags", () => {
    const input = "stroke prevention[tiab]";
    expect(formatForCochrane(input)).toContain(":ti,ab");
    expect(formatForEmbase(input)).toContain(":ti,ab");
  });
});
