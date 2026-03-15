import { beforeEach, describe, expect, it, vi } from "vitest";

const getMock = vi.fn();
const CiteMock = function (this: any) {
  this.get = getMock;
} as unknown as ReturnType<typeof vi.fn>;
(CiteMock as unknown as { async: unknown }).async = vi.fn();

vi.mock("@citation-js/core", () => ({ Cite: CiteMock }));
vi.mock("@citation-js/plugin-csl", () => ({}));
vi.mock("@citation-js/plugin-bibtex", () => ({}));
vi.mock("@citation-js/plugin-ris", () => ({}));
vi.mock("@citation-js/plugin-doi", () => ({}));

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("references module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("formats references for content ingestion", async () => {
    const { formatReferencesAsContent } = await import("../format");
    const text = formatReferencesAsContent([{ id: "1", title: "Paper", authors: ["Doe, J."], year: 2023, type: "article" }]);
    expect(text).toContain("Reference 1");
    expect(text).toContain("Doe, J.");
  });

  it("parses bibtex/ris/json and maps types", async () => {
    getMock.mockReturnValue([{ id: "x", title: "T", author: [{ family: "Doe", given: "Jane A" }], type: "paper-conference", issued: { "date-parts": [[2021]] } }]);
    const mod = await import("../import");
    expect(mod.parseBibTeX("@article{}")[0].type).toBe("conference");
    expect(mod.parseRIS("TY  - JOUR")[0].authors[0]).toBe("Doe, J. A.");
    expect(mod.parseCslJson({ title: "A" })[0].title).toBe("A");
  });

  it("resolveDoiToReference returns null on failure", async () => {
    (CiteMock as unknown as { async: ReturnType<typeof vi.fn> }).async.mockRejectedValueOnce(new Error("bad"));
    const mod = await import("../import");
    await expect(mod.resolveDoiToReference("10.1/x")).resolves.toBeNull();
  });

  it("fetches zotero library across pages and handles errors", async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: "1", title: "A", type: "article-journal" }], headers: { get: () => '<https://api.zotero.org/next>; rel="next"' } })
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: "2", title: "B", type: "book" }], headers: { get: () => null } });
    const { fetchZoteroLibrary } = await import("../zotero");
    const refs = await fetchZoteroLibrary({ apiKey: "k", userId: "u" });
    expect(refs.map((r) => r.type)).toEqual(["article", "book"]);

    fetchMock.mockResolvedValueOnce({ ok: false, status: 403, statusText: "Forbidden" });
    await expect(fetchZoteroLibrary({ apiKey: "k", userId: "u" })).rejects.toThrow("Invalid Zotero API key");
  });
});
