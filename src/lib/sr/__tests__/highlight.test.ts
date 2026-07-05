import { describe, expect, it } from "vitest";
import { highlightAbstract } from "../highlight";

describe("highlightAbstract", () => {
  const terms = {
    include: ["SGLT2 inhibitors", "randomised"],
    exclude: ["eGFR below 20"],
  };

  it("splits text into plain and highlighted segments", () => {
    const segs = highlightAbstract(
      "We ran a randomised trial of SGLT2 inhibitors.",
      terms,
    );
    expect(segs).toEqual([
      { text: "We ran a ", kind: "plain" },
      { text: "randomised", kind: "include" },
      { text: " trial of ", kind: "plain" },
      { text: "SGLT2 inhibitors", kind: "include" },
      { text: ".", kind: "plain" },
    ]);
  });

  it("marks exclusion terms distinctly and is case-insensitive", () => {
    const segs = highlightAbstract("Excluded patients with EGFR BELOW 20.", terms);
    expect(segs.find((s) => s.kind === "exclude")?.text).toBe("EGFR BELOW 20");
  });

  it("returns a single plain segment when nothing matches", () => {
    expect(highlightAbstract("No matching terms here.", terms)).toEqual([
      { text: "No matching terms here.", kind: "plain" },
    ]);
  });

  it("handles empty abstract text", () => {
    expect(highlightAbstract("", terms)).toEqual([]);
  });
});
