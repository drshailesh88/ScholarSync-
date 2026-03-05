import { beforeEach, describe, expect, it, vi } from "vitest";
import { paperToReference, inferReferenceType, type LibraryPaper } from "../paper-to-reference";
import { formatCitationNumbers, tiptapToDocx } from "@/components/export/tiptap-to-docx";
import { useReferenceStore } from "@/stores/reference-store";

const { capturedDocs, mockToBuffer } = vi.hoisted(() => ({
  capturedDocs: [] as Array<{ sections?: Array<{ children?: unknown[] }> }>,
  mockToBuffer: vi.fn(async () => new Uint8Array([1, 2, 3])),
}));

vi.mock("docx", () => {
  class Document {
    options: { sections?: Array<{ children?: unknown[] }> };
    constructor(options: { sections?: Array<{ children?: unknown[] }> }) {
      this.options = options;
      capturedDocs.push(options);
    }
  }

  class Paragraph {
    options: Record<string, unknown>;
    constructor(options: Record<string, unknown> = {}) {
      this.options = options;
    }
  }

  class TextRun {
    options: Record<string, unknown>;
    constructor(options: Record<string, unknown> = {}) {
      this.options = options;
    }
  }

  class Table {
    options: Record<string, unknown>;
    constructor(options: Record<string, unknown> = {}) {
      this.options = options;
    }
  }

  class TableRow {
    options: Record<string, unknown>;
    constructor(options: Record<string, unknown> = {}) {
      this.options = options;
    }
  }

  class TableCell {
    options: Record<string, unknown>;
    constructor(options: Record<string, unknown> = {}) {
      this.options = options;
    }
  }

  return {
    Document,
    Packer: { toBuffer: mockToBuffer },
    Paragraph,
    TextRun,
    HeadingLevel: {
      HEADING_1: "HEADING_1",
      HEADING_2: "HEADING_2",
      HEADING_3: "HEADING_3",
      HEADING_4: "HEADING_4",
    },
    AlignmentType: {
      CENTER: "CENTER",
      RIGHT: "RIGHT",
      JUSTIFIED: "JUSTIFIED",
    },
    Table,
    TableRow,
    TableCell,
    WidthType: {
      AUTO: "AUTO",
      PERCENTAGE: "PERCENTAGE",
    },
    BorderStyle: {
      NONE: "NONE",
      SINGLE: "SINGLE",
    },
    convertInchesToTwip: (n: number) => n * 1440,
  };
});

function makeLibraryPaper(overrides: Partial<LibraryPaper> = {}): LibraryPaper {
  return {
    id: 1,
    title: "Trial Paper",
    authors: ["Smith JA", "Doe B"],
    journal: "N Engl J Med",
    year: 2024,
    doi: "10.1000/test",
    pmid: "123456",
    abstract: "Abstract text",
    study_type: "randomized trial",
    volume: "12",
    issue: "3",
    pages: "10-20",
    pdf_url: null,
    open_access_url: null,
    ...overrides,
  };
}

function makeReference(id: string, title = "Ref"): ReturnType<typeof paperToReference> {
  return paperToReference(
    makeLibraryPaper({
      id: Number(id.replace(/\D/g, "")) || 1,
      title,
    }),
    "doc-1"
  );
}

function createQueryBuilder(result: unknown = []) {
  const builder: Record<string, unknown> = {};
  const methods = [
    "select",
    "selectDistinct",
    "insert",
    "update",
    "delete",
    "from",
    "innerJoin",
    "leftJoin",
    "where",
    "orderBy",
    "groupBy",
    "limit",
    "offset",
    "set",
    "values",
    "returning",
    "onConflictDoNothing",
    "on",
  ];

  for (const method of methods) {
    builder[method] = vi.fn().mockReturnValue(builder);
  }

  builder.then = (resolve: (value: unknown) => unknown) => resolve(result);
  return builder;
}

function getLastChildren(): unknown[] {
  const lastDoc = capturedDocs[capturedDocs.length - 1];
  return lastDoc?.sections?.[0]?.children || [];
}

function paragraphText(node: unknown): string {
  const children = (node as { options?: { children?: Array<{ options?: { text?: string } }> } })
    ?.options?.children;
  if (!children) return "";
  return children.map((run) => run?.options?.text || "").join("");
}

describe("paperToReference", () => {
  it("creates valid Reference with expected id", () => {
    const ref = paperToReference(makeLibraryPaper({ id: 42 }), "doc-123");
    expect(ref.id).toBe("ref-paper-42");
    expect(ref.documentId).toBe("doc-123");
  });

  it("parses string[] authors like Smith JA", () => {
    const ref = paperToReference(
      makeLibraryPaper({ authors: ["Smith JA", "Doe B"] }),
      "doc-1"
    );
    expect(ref.authors[0]).toEqual({ family: "Smith", given: "JA" });
    expect(ref.authors[1]).toEqual({ family: "Doe", given: "B" });
  });

  it("parses object authors with firstName/lastName", () => {
    const ref = paperToReference(
      makeLibraryPaper({
        authors: [{ firstName: "John", lastName: "Smith" }],
      }),
      "doc-1"
    );
    expect(ref.authors).toEqual([{ family: "Smith", given: "John" }]);
  });

  it("handles null authors gracefully", () => {
    const ref = paperToReference(makeLibraryPaper({ authors: null }), "doc-1");
    expect(ref.authors).toEqual([]);
  });

  it("creates CSL data with DOI and journal", () => {
    const ref = paperToReference(makeLibraryPaper(), "doc-1");
    expect(ref.cslData.DOI).toBe("10.1000/test");
    expect(ref.cslData["container-title"]).toBe("N Engl J Med");
  });

  it("infers reference type from study type", () => {
    expect(inferReferenceType("book chapter")).toBe("book");
    expect(inferReferenceType("conference abstract")).toBe("conference");
    expect(inferReferenceType("doctoral thesis")).toBe("thesis");
    expect(inferReferenceType("preprint")).toBe("preprint");
    expect(inferReferenceType("clinical guideline")).toBe("guideline");
    expect(inferReferenceType(null)).toBe("article");
  });
});

describe("formatCitationNumbers", () => {
  it("formats single number", () => {
    expect(formatCitationNumbers([1])).toBe("1");
  });

  it("formats consecutive range", () => {
    expect(formatCitationNumbers([1, 2, 3])).toBe("1-3");
  });

  it("formats non-consecutive list", () => {
    expect(formatCitationNumbers([1, 3, 5])).toBe("1,3,5");
  });

  it("formats mixed ranges and singles", () => {
    expect(formatCitationNumbers([1, 2, 3, 5, 7, 8])).toBe("1-3,5,7-8");
  });
});

describe("DOCX citation export", () => {
  beforeEach(() => {
    capturedDocs.length = 0;
    mockToBuffer.mockClear();
  });

  it("renders citation nodes as superscript runs", async () => {
    await tiptapToDocx(
      {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Finding " },
              { type: "citation", attrs: { referenceIds: ["ref-1"] } },
            ],
          },
        ],
      },
      {
        referenceNumberMap: new Map([["ref-1", 1]]),
      }
    );

    const firstParagraph = getLastChildren()[0] as {
      options?: { children?: Array<{ options?: { superScript?: boolean; text?: string } }> };
    };
    const citationRun = firstParagraph.options?.children?.find(
      (run) => run?.options?.superScript
    );
    expect(citationRun?.options?.text).toBe("[1]");
  });

  it("skips bibliography node in body content", async () => {
    await tiptapToDocx({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Body" }] },
        { type: "bibliography" },
      ],
    });

    const bodyText = getLastChildren().map((node) => paragraphText(node)).join("\n");
    expect(bodyText).not.toContain("References");
  });

  it("appends references section with bibliography entries", async () => {
    await tiptapToDocx(
      {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "Body" }] }],
      },
      {
        bibliographyEntries: [
          { id: "r1", html: "<i>Paper 1</i>", text: "Paper 1" },
          { id: "r2", html: "<i>Paper 2</i>", text: "Paper 2" },
        ],
        referenceNumberMap: new Map([
          ["r1", 1],
          ["r2", 2],
        ]),
      }
    );

    const allText = getLastChildren().map((node) => paragraphText(node)).join("\n");
    expect(allText).toContain("References");
    expect(allText).toContain("1. Paper 1");
    expect(allText).toContain("2. Paper 2");
  });

  it("does not append references heading when bibliography is empty", async () => {
    await tiptapToDocx(
      {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "Body" }] }],
      },
      {
        bibliographyEntries: [],
      }
    );

    const allText = getLastChildren().map((node) => paragraphText(node)).join("\n");
    expect(allText).not.toContain("References");
  });
});

describe("reference store integration", () => {
  beforeEach(() => {
    useReferenceStore.getState().clearReferences();
  });

  it("addReferences populates the store", () => {
    const store = useReferenceStore.getState();
    store.addReferences([makeReference("ref-1"), makeReference("ref-2")]);
    expect(useReferenceStore.getState().references.size).toBe(2);
  });

  it("clearReferences empties references and citation maps", () => {
    const store = useReferenceStore.getState();
    store.addReferences([makeReference("ref-1"), makeReference("ref-2")]);
    store.setReferenceNumberMap(
      new Map([
        ["ref-paper-1", 1],
        ["ref-paper-2", 2],
      ])
    );

    store.clearReferences();

    const state = useReferenceStore.getState();
    expect(state.references.size).toBe(0);
    expect(state.referenceNumberMap.size).toBe(0);
    expect(state.citationDisplayMap.size).toBe(0);
    expect(state.bibliographyEntries).toEqual([]);
  });

  it("addReferences dedupes by id", () => {
    const store = useReferenceStore.getState();
    store.addReferences([
      makeReference("ref-1", "V1"),
      makeReference("ref-1", "V2"),
    ]);

    const state = useReferenceStore.getState();
    expect(state.references.size).toBe(1);
    expect(state.references.get("ref-paper-1")?.title).toBe("V2");
  });
});

describe("searchPapersInLibrary", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns papers for empty query", async () => {
    const mockDb = {
      select: vi.fn(() => createQueryBuilder([{ id: 1, title: "Paper A" }])),
    };

    vi.doMock("@/lib/db", () => ({ db: mockDb }));
    vi.doMock("@/lib/auth", () => ({
      getCurrentUserId: vi.fn().mockResolvedValue("user-1"),
    }));
    vi.doMock("next/cache", () => ({ revalidatePath: vi.fn() }));

    const { searchPapersInLibrary } = await import("@/lib/actions/papers");
    const results = await searchPapersInLibrary("");
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
  });

  it("returns empty array for no matches", async () => {
    const mockDb = {
      select: vi.fn(() => createQueryBuilder([])),
    };

    vi.doMock("@/lib/db", () => ({ db: mockDb }));
    vi.doMock("@/lib/auth", () => ({
      getCurrentUserId: vi.fn().mockResolvedValue("user-1"),
    }));
    vi.doMock("next/cache", () => ({ revalidatePath: vi.fn() }));

    const { searchPapersInLibrary } = await import("@/lib/actions/papers");
    const results = await searchPapersInLibrary("nonexistent");
    expect(results).toEqual([]);
  });
});
