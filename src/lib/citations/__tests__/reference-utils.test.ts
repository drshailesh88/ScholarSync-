import { describe, it, expect } from "vitest";
import { detectIdentifierType, extractDoi, crossrefToReference, referenceToCsl } from "../reference-utils";
import type { Reference } from "@/types/citation";

describe("detectIdentifierType", () => {
  it("detects DOI starting with 10.", () => {
    expect(detectIdentifierType("10.1056/NEJMoa2301422")).toBe("doi");
  });
  it("detects DOI URL", () => {
    expect(detectIdentifierType("https://doi.org/10.1056/test")).toBe("doi");
  });
  it("detects PMID", () => {
    expect(detectIdentifierType("12345678")).toBe("pmid");
  });
  it("detects PMCID", () => {
    expect(detectIdentifierType("PMC9876543")).toBe("pmcid");
  });
  it("detects pmcid case insensitive", () => {
    expect(detectIdentifierType("pmc123456")).toBe("pmcid");
  });
  it("detects URL", () => {
    expect(detectIdentifierType("https://example.com")).toBe("url");
    expect(detectIdentifierType("http://example.com")).toBe("url");
  });
  it("returns unknown for unrecognized", () => {
    expect(detectIdentifierType("some random text")).toBe("unknown");
  });
  it("handles whitespace", () => {
    expect(detectIdentifierType("  10.1056/test  ")).toBe("doi");
  });
  it("detects PMID with short digits", () => {
    expect(detectIdentifierType("1")).toBe("pmid");
  });
  it("does not detect too-long digits as PMID", () => {
    expect(detectIdentifierType("123456789")).toBe("unknown");
  });
});

describe("extractDoi", () => {
  it("extracts direct DOI", () => {
    expect(extractDoi("10.1056/NEJMoa2301422")).toBe("10.1056/NEJMoa2301422");
  });
  it("extracts DOI from doi.org URL", () => {
    expect(extractDoi("https://doi.org/10.1056/test")).toBe("10.1056/test");
  });
  it("extracts DOI from dx.doi.org URL", () => {
    expect(extractDoi("https://dx.doi.org/10.1234/abc")).toBe("10.1234/abc");
  });
  it("returns null for non-DOI", () => {
    expect(extractDoi("hello world")).toBeNull();
  });
  it("trims trailing characters", () => {
    const result = extractDoi("https://doi.org/10.1056/test)");
    expect(result).toBe("10.1056/test");
  });
});

describe("crossrefToReference", () => {
  it("converts CrossRef work to Reference", () => {
    const work = {
      title: ["Test Title"],
      author: [{ given: "John", family: "Smith" }],
      "container-title": ["Test Journal"],
      issued: { "date-parts": [[2023]] },
      DOI: "10.1234/test",
      volume: "1",
      issue: "2",
      page: "10-20",
      type: "journal-article",
      publisher: "Test Publisher",
      abstract: "<p>Test abstract</p>",
    };
    const ref = crossrefToReference(work, "doc_1");
    expect(ref.title).toBe("Test Title");
    expect(ref.authors[0].given).toBe("John");
    expect(ref.authors[0].family).toBe("Smith");
    expect(ref.year).toBe(2023);
    expect(ref.doi).toBe("10.1234/test");
    expect(ref.journal).toBe("Test Journal");
    expect(ref.documentId).toBe("doc_1");
    expect(ref.type).toBe("article");
    expect(ref.abstract).toBe("Test abstract");
  });

  it("handles missing fields gracefully", () => {
    const work = { title: "Minimal", type: "journal-article" };
    const ref = crossrefToReference(work as Record<string, unknown>, "doc_2");
    expect(ref.title).toBe("Minimal");
    expect(ref.authors).toEqual([]);
    expect(ref.year).toBe(0);
  });

  it("maps book type correctly", () => {
    const work = { title: ["Book Title"], type: "book", author: [] };
    const ref = crossrefToReference(work as Record<string, unknown>, "doc_3");
    expect(ref.type).toBe("book");
  });
});

describe("referenceToCsl", () => {
  it("returns existing cslData if present", () => {
    const ref: Reference = {
      id: "ref_1",
      documentId: "doc_1",
      type: "article",
      title: "Test",
      authors: [{ given: "J", family: "D" }],
      year: 2023,
      dateAdded: "2023-01-01",
      cslData: { id: "old", type: "article-journal", title: "Test CSL" },
    };
    const csl = referenceToCsl(ref);
    expect(csl.id).toBe("ref_1");
    expect(csl.title).toBe("Test CSL");
  });

  it("builds CSL from Reference when no cslData.title", () => {
    const ref: Reference = {
      id: "ref_2",
      documentId: "doc_1",
      type: "article",
      title: "Built from ref",
      authors: [{ given: "Jane", family: "Doe" }],
      year: 2024,
      journal: "Test J",
      volume: "5",
      doi: "10.1234/x",
      dateAdded: "2024-01-01",
      cslData: { id: "x", type: "article-journal" },
    };
    const csl = referenceToCsl(ref);
    expect(csl.title).toBe("Built from ref");
    expect(csl["container-title"]).toBe("Test J");
    expect(csl.DOI).toBe("10.1234/x");
    expect(csl.issued).toEqual({ "date-parts": [[2024]] });
  });

  it("maps reference types to CSL types", () => {
    const makeRef = (type: Reference["type"]): Reference => ({
      id: "r", documentId: "d", type, title: "T", authors: [], year: 2024, dateAdded: "x",
      cslData: { id: "r", type: "article-journal" },
    });
    expect(referenceToCsl(makeRef("book")).type).toBe("book");
    expect(referenceToCsl(makeRef("chapter")).type).toBe("chapter");
    expect(referenceToCsl(makeRef("website")).type).toBe("webpage");
    expect(referenceToCsl(makeRef("guideline")).type).toBe("report");
  });
});
