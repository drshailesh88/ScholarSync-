import { describe, it, expect, vi, beforeEach } from "vitest";

const getDocument = vi.fn();
const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);
vi.mock("pdfjs-dist", () => ({ getDocument }));

describe("pdf module helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("extracts text and section headings", async () => {
    getDocument.mockReturnValue({
      promise: Promise.resolve({
        numPages: 2,
        getPage: vi
          .fn()
          .mockResolvedValueOnce({ getTextContent: async () => ({ items: [{ str: "Abstract" }, { str: "Intro" }] }) })
          .mockResolvedValueOnce({ getTextContent: async () => ({ items: [{ str: "Methods" }] }) }),
      }),
    });
    const { extractTextFromPDF } = await import("../text-extraction");
    const result = await extractTextFromPDF("url");
    expect(result.pages).toHaveLength(2);
    expect(result.sectionHeadings).toEqual(expect.arrayContaining(["Abstract", "Methods"]));
  });

  it("parses page references and builds highlight context", async () => {
    const { parsePageReferences, buildHighlightsContext } = await import("../navigation");
    expect(parsePageReferences("see page 4 and p.4 and p 9")).toEqual([4, 9]);
    const context = buildHighlightsContext([{ pageNumber: 3, selectedText: "Important", color: "yellow", note: "check", targetSection: "Methods" }]);
    expect(context).toContain("Page 3");
    expect(context).toContain("User note");
  });

  it("creates and formats source quotes", async () => {
    const { createSourceQuote, addUsageToQuote, formatSourceQuoteForDisplay } = await import("../source-quotes");
    const q = createSourceQuote("p1", 2, "quoted", 1, 4, "Results");
    const updated = addUsageToQuote(q, "chat", "c1");
    expect(updated.usedIn).toHaveLength(1);
    expect(formatSourceQuoteForDisplay(updated)).toContain("Results");
  });

  it("highlight storage wrappers return booleans/arrays", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ highlights: [{ id: "1" }] }) });
    fetchMock.mockResolvedValue({ ok: true });
    const mod = await import("../highlight-storage");
    await expect(mod.fetchHighlights("p", "pr")).resolves.toEqual([{ id: "1" }]);
    await expect(mod.createHighlight({ id: "h" } as never)).resolves.toBe(true);
    await expect(mod.updateHighlight("h", { note: "n" })).resolves.toBe(true);
    await expect(mod.deleteHighlight("h")).resolves.toBe(true);
  });
});
