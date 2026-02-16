import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyPaper } from "../verify";
import type { PaperResult } from "../types";

const makePaper = (overrides: Partial<PaperResult> = {}): PaperResult => ({
  id: "p1",
  title: "Effect of Empagliflozin on Heart Failure",
  authors: ["Author One"],
  journal: "NEJM",
  year: 2023,
  citationCount: 100,
  isOpenAccess: false,
  publicationTypes: [],
  sources: ["pubmed"],
  verificationStatus: "pending",
  source: "pubmed",
  ...overrides,
});

describe("verifyPaper", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns verified when PMID matches", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("esummary")) {
        return new Response(JSON.stringify({
          result: { "12345": { title: "Effect of Empagliflozin on Heart Failure", pubdate: "2023 Jan" } }
        }));
      }
      if (urlStr.includes("esearch")) {
        return new Response(JSON.stringify({ esearchresult: { count: "0" } }));
      }
      return new Response("", { status: 404 });
    });

    const result = await verifyPaper(makePaper({ pmid: "12345" }));
    expect(result.status).toBe("verified");
    expect(result.pmidVerified).toBe(true);
  });

  it("returns verified when DOI matches", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("crossref")) {
        return new Response(JSON.stringify({
          message: {
            title: ["Effect of Empagliflozin on Heart Failure"],
            published: { "date-parts": [[2023]] },
          }
        }));
      }
      if (urlStr.includes("esearch")) {
        return new Response(JSON.stringify({ esearchresult: { count: "0" } }));
      }
      return new Response("", { status: 404 });
    });

    const result = await verifyPaper(makePaper({ doi: "10.1056/test" }));
    expect(result.status).toBe("verified");
    expect(result.doiVerified).toBe(true);
  });

  it("returns retracted when retraction found", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("esummary")) {
        return new Response(JSON.stringify({
          result: { "12345": { title: "Effect of Empagliflozin on Heart Failure", pubdate: "2023" } }
        }));
      }
      if (urlStr.includes("esearch")) {
        return new Response(JSON.stringify({ esearchresult: { count: "1" } }));
      }
      return new Response("", { status: 404 });
    });

    const result = await verifyPaper(makePaper({ pmid: "12345" }));
    expect(result.status).toBe("retracted");
    expect(result.retractionNotice?.isRetracted).toBe(true);
  });

  it("returns unverified when no identifiers", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify({ esearchresult: { count: "0" } }));
    });

    const result = await verifyPaper(makePaper());
    expect(result.status).toBe("unverified");
  });

  it("returns partial when PMID found but title mismatch", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("esummary")) {
        return new Response(JSON.stringify({
          result: { "12345": { title: "Completely Different Paper", pubdate: "2023" } }
        }));
      }
      if (urlStr.includes("esearch")) {
        return new Response(JSON.stringify({ esearchresult: { count: "0" } }));
      }
      return new Response("", { status: 404 });
    });

    const result = await verifyPaper(makePaper({ pmid: "12345" }));
    expect(result.status).toBe("partial");
    expect(result.metadataMatches.title).toBe(false);
  });

  it("handles fetch errors gracefully", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));
    const result = await verifyPaper(makePaper({ pmid: "12345", doi: "10.1/x" }));
    expect(result.status).toBe("unverified");
  });

  it("allows year difference of 1", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("esummary")) {
        return new Response(JSON.stringify({
          result: { "12345": { title: "Effect of Empagliflozin on Heart Failure", pubdate: "2024" } }
        }));
      }
      if (urlStr.includes("esearch")) {
        return new Response(JSON.stringify({ esearchresult: { count: "0" } }));
      }
      return new Response("", { status: 404 });
    });

    const result = await verifyPaper(makePaper({ pmid: "12345", year: 2023 }));
    expect(result.metadataMatches.year).toBe(true);
  });
});
