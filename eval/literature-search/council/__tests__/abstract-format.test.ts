import { describe, it, expect } from "vitest";
import {
  normalizeAbstract,
  ABSTRACT_MAX_CHARS,
  ABSTRACT_UNAVAILABLE,
} from "../abstract-format";

describe("normalizeAbstract", () => {
  it("returns empty string for empty/nullish input", () => {
    expect(normalizeAbstract("")).toBe("");
    expect(normalizeAbstract(undefined)).toBe("");
    expect(normalizeAbstract(null)).toBe("");
    expect(normalizeAbstract("   \n\t ")).toBe("");
  });

  it("collapses all whitespace to single spaces", () => {
    expect(normalizeAbstract("a\n\n  b\t c")).toBe("a b c");
  });

  it("strips Europe PMC HTML tags and keeps heading words readable", () => {
    const raw =
      "<h4>Background</h4>In patients with heart failure, dapagliflozin reduced events.<h4>Methods</h4>A randomized trial.";
    const out = normalizeAbstract(raw);
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    // Leading structured heading is stripped; interior heading kept as readable text.
    expect(out.startsWith("In patients")).toBe(true);
    expect(out).toContain("Methods: A randomized trial");
  });

  it("strips a leading plain-text section heading with a colon", () => {
    expect(normalizeAbstract("Background: The disease is common.")).toBe(
      "The disease is common."
    );
    expect(normalizeAbstract("RESULTS — 200 patients enrolled.")).toBe(
      "200 patients enrolled."
    );
  });

  it("decodes the common HTML entities", () => {
    expect(normalizeAbstract("aspirin &amp; warfarin &lt; placebo")).toBe(
      "aspirin & warfarin < placebo"
    );
  });

  it("truncates on a word boundary with an ellipsis", () => {
    const long = "word ".repeat(300).trim(); // ~1500 chars
    const out = normalizeAbstract(long, 50);
    expect(out.length).toBeLessThanOrEqual(51); // 50 + ellipsis char
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toContain("wor…"); // clipped at a space, not mid-word
  });

  it("does not truncate text at or under the limit", () => {
    const short = "A concise abstract.";
    expect(normalizeAbstract(short, ABSTRACT_MAX_CHARS)).toBe(short);
    expect(normalizeAbstract(short, ABSTRACT_MAX_CHARS).endsWith("…")).toBe(false);
  });

  it("exposes a stable placeholder distinct from any normalized abstract", () => {
    expect(ABSTRACT_UNAVAILABLE).toContain("unavailable");
    expect(normalizeAbstract(ABSTRACT_UNAVAILABLE)).not.toBe("");
  });
});
