import { describe, it, expect } from "vitest";
import { formatCitation, formatInTextCitation, generateBibTeX } from "../citations";
import type { PaperData } from "../citations";

const fullPaper: PaperData = {
  title: "Effects of SGLT2 Inhibitors on Cardiovascular Outcomes",
  authors: ["John Smith", "Jane Doe", "Robert Johnson"],
  journal: "The New England Journal of Medicine",
  year: 2023,
  doi: "10.1056/NEJMoa2301422",
  volume: "389",
  issue: "12",
  pages: "1089-1098",
};

describe("formatCitation", () => {
  it("formats APA citation", () => {
    const result = formatCitation(fullPaper, "apa");
    expect(result).toContain("Smith");
    expect(result).toContain("2023");
  });
  it("formats Vancouver citation", () => {
    const result = formatCitation(fullPaper, "vancouver");
    expect(result).toContain("Smith");
  });
  it("formats MLA citation", () => {
    const result = formatCitation(fullPaper, "mla");
    expect(result).toContain("Smith");
  });
  it("formats Chicago citation", () => {
    const result = formatCitation(fullPaper, "chicago");
    expect(result).toContain("Smith");
    expect(result).toContain("2023");
  });
  it("formats Harvard citation", () => {
    const result = formatCitation(fullPaper, "harvard");
    expect(result).toContain("Smith");
    expect(result).toContain("2023");
  });
  it("handles paper with minimal fields", () => {
    const minimal: PaperData = { title: "Untitled Paper", authors: [] };
    const result = formatCitation(minimal, "apa");
    expect(result).toBeTruthy();
  });
  it("handles single author", () => {
    const paper: PaperData = { title: "Test Paper", authors: ["Smith, John"], year: 2024 };
    const result = formatCitation(paper, "apa");
    expect(result).toContain("Smith");
  });
  it("throws for unsupported style", () => {
    expect(() => formatCitation(fullPaper, "nonexistent" as never)).toThrow("Unsupported citation style");
  });
});

describe("formatInTextCitation", () => {
  it("formats APA in-text", () => {
    const result = formatInTextCitation(fullPaper, "apa");
    expect(result).toContain("Smith");
    expect(result).toContain("2023");
  });
  it("formats Vancouver in-text", () => {
    const result = formatInTextCitation(fullPaper, "vancouver");
    expect(result).toBeTruthy();
  });
  it("handles single author in-text", () => {
    const paper: PaperData = { title: "Test", authors: ["Jane Doe"], year: 2024 };
    const result = formatInTextCitation(paper, "apa");
    expect(result).toContain("Doe");
  });
  it("throws for unsupported style", () => {
    expect(() => formatInTextCitation(fullPaper, "xyz" as never)).toThrow("Unsupported citation style");
  });
});

describe("generateBibTeX", () => {
  it("generates valid BibTeX", () => {
    const result = generateBibTeX(fullPaper);
    expect(result).toContain("@article");
    expect(result).toContain("title");
    expect(result).toContain("SGLT2");
  });
  it("handles paper with only title and authors", () => {
    const result = generateBibTeX({ title: "Simple Paper", authors: ["Author One"] });
    expect(result).toContain("@article");
    expect(result).toContain("Simple");
    expect(result).toContain("Paper");
  });
  it("includes DOI when present", () => {
    const result = generateBibTeX(fullPaper);
    expect(result).toContain("10.1056");
  });
  it("includes year when present", () => {
    const result = generateBibTeX(fullPaper);
    expect(result).toContain("2023");
  });
});
