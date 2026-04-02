import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import type { LibrarySource } from "../types";

// Resolve from the test file's own location — 3 dirs up from __tests__ -> library -> lib -> src
const SRC = resolve(__dirname, "..", "..", "..");

// ── Test fixtures ──────────────────────────────────────────────

const _basePaperSource: LibrarySource = {
  libraryId: "paper_42",
  sourceType: "paper",
  title: "Efficacy of Treatment X",
  authors: ["Smith J", "Doe A"],
  year: 2025,
  url: "https://doi.org/10.1016/S0140-6736(25)00001-1",
  doi: "10.1016/S0140-6736(25)00001-1",
  domain: null,
  snippet: "Background: Treatment X has shown promise...",
  thumbnailUrl: null,
  journal: "The Lancet",
  volume: "401",
  issue: "3",
  citationCount: 150,
  studyType: "rct",
  pubmedId: "38000001",
  abstract: "Background: Treatment X has shown promise in reducing...",
  pdfStoragePath: "/papers/42.pdf",
  sourceCategory: null,
  trustTier: null,
  contentHtml: null,
  contentPlain: null,
  extractionState: null,
  workflowState: "core",
  readingProgress: 45,
  readStatus: "in_progress",
  lastReadAt: "2026-03-15T10:00:00Z",
  isFavorite: true,
  tags: ["systematic-review"],
  notes: "Good methodology",
  collection: "Core",
  addedAt: "2026-03-01T08:00:00Z",
  projectIds: [1, 3],
};

const _baseWebSource: LibrarySource = {
  libraryId: "web_187",
  sourceType: "web",
  title: "Understanding mRNA Vaccine Technology",
  authors: ["National Geographic"],
  year: 2024,
  url: "https://www.nationalgeographic.com/science/article/mrna-vaccines",
  doi: null,
  domain: "nationalgeographic.com",
  snippet: "A deep dive into how mRNA vaccines work...",
  thumbnailUrl: "https://example.com/thumb.jpg",
  journal: null,
  volume: null,
  issue: null,
  citationCount: null,
  studyType: null,
  pubmedId: null,
  abstract: null,
  pdfStoragePath: null,
  sourceCategory: "journalism",
  trustTier: "established",
  contentHtml: "<h2>Introduction</h2><p>mRNA technology represents a breakthrough...</p>",
  contentPlain: "Introduction\nmRNA technology represents a breakthrough...",
  extractionState: "ready",
  workflowState: "inbox",
  readingProgress: 0,
  readStatus: "unread",
  lastReadAt: null,
  isFavorite: false,
  tags: [],
  notes: null,
  collection: null,
  addedAt: "2026-03-20T14:30:00Z",
  projectIds: [2],
};

// ── Annotation service file existence ─────────────────────────

describe("Phase 14: Annotation service layer", () => {
  it("annotations.ts exists in library service directory", () => {
    expect(existsSync(resolve(SRC, "lib/library/annotations.ts"))).toBe(true);
  });

  it("annotations.ts exports CRUD functions", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("export async function getAnnotations");
    expect(content).toContain("export async function createHighlight");
    expect(content).toContain("export async function createSourceNote");
    expect(content).toContain("export async function updateAnnotation");
    expect(content).toContain("export async function deleteAnnotation");
  });

  it("annotations.ts uses 'use server' directive", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content.startsWith('"use server"')).toBe(true);
  });

  it("annotations.ts imports libraryAnnotations table", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("libraryAnnotations");
  });

  it("annotations.ts uses parseLibraryId for dispatch", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("parseLibraryId");
  });

  it("annotations.ts validates ownership with getCurrentUserId", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("getCurrentUserId");
  });

  it("annotations.ts revalidates /library cache on mutations", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain('revalidatePath("/library")');
  });
});

// ── API route ─────────────────────────────────────────────────

describe("Phase 14: Annotation API route", () => {
  it("annotations route.ts exists", () => {
    expect(existsSync(resolve(SRC, "app/api/library/annotations/route.ts"))).toBe(true);
  });

  it("annotations route handles GET, POST, PATCH, DELETE", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("export async function POST");
    expect(content).toContain("export async function PATCH");
    expect(content).toContain("export async function DELETE");
  });

  it("POST route supports highlight and note types", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    expect(content).toContain('"highlight"');
    expect(content).toContain('"note"');
    expect(content).toContain("createHighlight");
    expect(content).toContain("createSourceNote");
  });
});

// ── Annotation types ──────────────────────────────────────────

describe("Phase 14: Annotation type definitions", () => {
  it("annotations.ts exports AnnotationColor type with yellow and blue", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain('"yellow"');
    expect(content).toContain('"blue"');
    expect(content).toContain("AnnotationColor");
  });

  it("annotations.ts exports AnchorType and AnchorPayload", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("AnchorType");
    expect(content).toContain("AnchorPayload");
    expect(content).toContain("text_offset");
    expect(content).toContain("startOffset");
    expect(content).toContain("endOffset");
  });

  it("Annotation interface has all required fields", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("interface Annotation");
    expect(content).toContain("id: number");
    expect(content).toContain("libraryId: string");
    expect(content).toContain("selectedText: string | null");
    expect(content).toContain("note: string | null");
    expect(content).toContain("color: AnnotationColor");
    expect(content).toContain("anchorType: AnchorType");
    expect(content).toContain("anchorPayload: AnchorPayload");
  });
});

// ── Client hooks ──────────────────────────────────────────────

describe("Phase 14: Client-side hooks", () => {
  it("useAnnotations hook exists", () => {
    expect(existsSync(resolve(SRC, "hooks/useAnnotations.ts"))).toBe(true);
  });

  it("useAnnotations returns annotations, highlights, notes, and CRUD functions", () => {
    const content = readFileSync(resolve(SRC, "hooks/useAnnotations.ts"), "utf-8");
    expect(content).toContain("annotations");
    expect(content).toContain("highlights");
    expect(content).toContain("notes");
    expect(content).toContain("createHighlight");
    expect(content).toContain("createNote");
    expect(content).toContain("updateAnnotation");
    expect(content).toContain("deleteAnnotation");
  });

  it("useTextHighlighter hook exists", () => {
    expect(existsSync(resolve(SRC, "hooks/useTextHighlighter.ts"))).toBe(true);
  });

  it("useTextHighlighter handles text selection and highlight restoration", () => {
    const content = readFileSync(resolve(SRC, "hooks/useTextHighlighter.ts"), "utf-8");
    expect(content).toContain("selection");
    expect(content).toContain("clearSelection");
    expect(content).toContain("handleMouseUp");
    expect(content).toContain("applyHighlights");
    expect(content).toContain("removeHighlightMarks");
  });

  it("useTextHighlighter calculates character offsets", () => {
    const content = readFileSync(resolve(SRC, "hooks/useTextHighlighter.ts"), "utf-8");
    expect(content).toContain("startOffset");
    expect(content).toContain("endOffset");
    expect(content).toContain("createRange");
    expect(content).toContain("selectNodeContents");
  });
});

// ── Highlight popover component ───────────────────────────────

describe("Phase 14: Highlight popover UI", () => {
  it("highlight-popover.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/highlight-popover.tsx"))).toBe(true);
  });

  it("popover supports two highlight colors (yellow + blue)", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/highlight-popover.tsx"),
      "utf-8"
    );
    expect(content).toContain('"yellow"');
    expect(content).toContain('"blue"');
    expect(content).toContain("Default highlight");
    expect(content).toContain("Important highlight");
  });

  it("popover supports adding notes to highlights", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/highlight-popover.tsx"),
      "utf-8"
    );
    expect(content).toContain("Add a note");
    expect(content).toContain("textarea");
    expect(content).toContain("handleSubmitWithNote");
  });

  it("popover supports keyboard shortcuts (Cmd+Enter to save, Escape to close)", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/highlight-popover.tsx"),
      "utf-8"
    );
    expect(content).toContain("e.metaKey || e.ctrlKey");
    expect(content).toContain('e.key === "Escape"');
  });
});

// ── Web source reader with highlighting ───────────────────────

describe("Phase 14: Web source reader highlighting", () => {
  it("web-source-reader accepts highlight props", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("highlights");
    expect(content).toContain("onCreateHighlight");
    expect(content).toContain("onHighlightClick");
  });

  it("web-source-reader uses useTextHighlighter", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("useTextHighlighter");
    expect(content).toContain("selection");
    expect(content).toContain("clearSelection");
  });

  it("web-source-reader renders HighlightPopover on selection", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("HighlightPopover");
  });

  it("web-source-reader still sanitizes HTML with DOMPurify", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("DOMPurify");
    expect(content).toContain("sanitize");
  });

  it("web-source-reader adds ref to content container", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("contentRef");
    expect(content).toContain("ref={contentRef}");
  });
});

// ── Paper reader with highlighting ────────────────────────────

describe("Phase 14: Paper reader highlighting (abstract text)", () => {
  it("paper-reader accepts highlight props", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("highlights");
    expect(content).toContain("onCreateHighlight");
    expect(content).toContain("onHighlightClick");
  });

  it("paper-reader uses useTextHighlighter", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("useTextHighlighter");
    expect(content).toContain("abstractRef");
  });

  it("paper-reader shows popover only in abstract view", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    // Popover should be gated behind viewMode === "abstract"
    expect(content).toContain('viewMode === "abstract"');
    expect(content).toContain("HighlightPopover");
  });

  it("paper-reader still has PDF toggle", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("PDFViewer");
    expect(content).toContain("source.pdfStoragePath");
  });
});

// ── Workbench panel — highlights tab ──────────────────────────

describe("Phase 14: Workbench highlights tab", () => {
  it("workbench-panel accepts annotation props", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("annotations");
    expect(content).toContain("onCreateNote");
    expect(content).toContain("onUpdateAnnotation");
    expect(content).toContain("onDeleteAnnotation");
  });

  it("highlights tab lists highlights with quoted text and color border", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("selectedText");
    expect(content).toContain("border-yellow");
    expect(content).toContain("library-accent");
  });

  it("highlights tab supports click to jump to source position", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("onHighlightClick");
  });

  it("highlights tab shows notes on highlights", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("h.note");
  });

  it("highlights tab supports editing and deleting", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("editingId");
    expect(content).toContain("onDeleteAnnotation");
    expect(content).toContain("Trash");
    expect(content).toContain("PencilSimple");
  });
});

// ── Workbench panel — notes tab (general notes) ───────────────

describe("Phase 14: Workbench notes tab (general source notes)", () => {
  it("notes tab supports creating new general notes", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("Add Note");
    expect(content).toContain("newNote");
    expect(content).toContain("onCreateNote");
  });

  it("notes tab displays legacy source.notes", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("source.notes");
    expect(content).toContain("Source Note");
  });

  it("notes tab supports editing and deleting notes", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("Edit note");
    expect(content).toContain("Delete note");
  });
});

// ── Reader view wiring ────────────────────────────────────────

describe("Phase 14: Reader view annotation wiring", () => {
  it("reader-view uses useAnnotations hook", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("useAnnotations");
    expect(content).toContain("annotations");
    expect(content).toContain("highlights");
    expect(content).toContain("createHighlight");
    expect(content).toContain("createNote");
  });

  it("reader-view passes highlight props to WebSourceReader", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("highlights={highlights}");
    expect(content).toContain("onCreateHighlight={handleCreateHighlight}");
  });

  it("reader-view passes highlight props to PaperReader", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    // Both WebSourceReader and PaperReader should receive highlights
    const content2 = content.split("PaperReader")[1] ?? "";
    expect(content2).toContain("highlights=");
    expect(content2).toContain("onCreateHighlight=");
  });

  it("reader-view passes annotation props to WorkbenchPanel", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("annotations={annotations}");
    expect(content).toContain("onCreateNote={handleCreateNote}");
    expect(content).toContain("onUpdateAnnotation={updateAnnotation}");
    expect(content).toContain("onDeleteAnnotation={deleteAnnotation}");
  });
});

// ── CSS highlight styles ──────────────────────────────────────

describe("Phase 14: CSS highlight styles", () => {
  it("globals.css contains library-highlight styles", () => {
    const css = readFileSync(resolve(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain("library-highlight");
    expect(css).toContain("library-highlight--default");
    expect(css).toContain("library-highlight--important");
  });

  it("default highlight uses yellow", () => {
    const css = readFileSync(resolve(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain("library-highlight--default");
    // Should reference a yellow color
    expect(css).toMatch(/library-highlight--default[\s\S]*?yellow|rgba\(253/);
  });

  it("important highlight uses library accent", () => {
    const css = readFileSync(resolve(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain("library-highlight--important");
    expect(css).toContain("library-accent");
  });
});

// ── Cross-source-type consistency ─────────────────────────────

describe("Phase 14: Cross-source-type annotation consistency", () => {
  it("annotation service uses the same libraryAnnotations table for both source types", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    // Should NOT have separate tables for papers vs web
    expect(content).toContain("libraryAnnotations");
    expect(content).not.toContain("webSourceHighlights");
    expect(content).not.toContain("pdfAnnotations");
  });

  it("anchor_type supports text_offset for both source types", () => {
    const content = readFileSync(resolve(SRC, "lib/library/annotations.ts"), "utf-8");
    expect(content).toContain("text_offset");
    // Both web reader and paper reader use the same anchor approach
  });

  it("both readers use the same useTextHighlighter hook", () => {
    const webReader = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    const paperReader = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(webReader).toContain("useTextHighlighter");
    expect(paperReader).toContain("useTextHighlighter");
  });

  it("both readers use the same HighlightPopover component", () => {
    const webReader = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    const paperReader = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(webReader).toContain("HighlightPopover");
    expect(paperReader).toContain("HighlightPopover");
  });
});

// ── Barrel export ─────────────────────────────────────────────

describe("Phase 14: Barrel exports", () => {
  it("reader/index.ts exports HighlightPopover", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/index.ts"),
      "utf-8"
    );
    expect(content).toContain("HighlightPopover");
  });
});

// ── Schema table exists ───────────────────────────────────────

describe("Phase 14: Schema — library_annotations table", () => {
  it("library_annotations table is defined in schema", () => {
    const content = readFileSync(resolve(SRC, "lib/db/schema/explore.ts"), "utf-8");
    expect(content).toContain("library_annotations");
    expect(content).toContain("anchor_type");
    expect(content).toContain("anchor_payload");
    expect(content).toContain("selected_text");
    expect(content).toContain("source_type");
    expect(content).toContain("source_id");
  });

  it("annotation_color enum includes yellow and blue variants", () => {
    const content = readFileSync(resolve(SRC, "lib/db/schema/enums.ts"), "utf-8");
    expect(content).toContain("annotation_color");
    expect(content).toContain('"yellow"');
    expect(content).toContain('"blue"');
  });

  it("anchor_type enum includes text_offset", () => {
    const content = readFileSync(resolve(SRC, "lib/db/schema/enums.ts"), "utf-8");
    expect(content).toContain("anchor_type");
    expect(content).toContain('"text_offset"');
  });
});

// ── Backward compatibility ────────────────────────────────────

describe("Phase 14: Backward compatibility", () => {
  it("web-source-reader still works without highlight props (defaults)", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    // highlights should default to empty array
    expect(content).toContain("highlights = []");
  });

  it("paper-reader still works without highlight props (defaults)", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("highlights = []");
  });

  it("workbench-panel still works without annotation props (defaults)", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain("annotations = []");
  });

  it("reader-view still has reading progress tracking", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("useReadingProgress");
    expect(content).toContain("progress");
  });

  it("reader-view still has extraction state handling", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("ExtractionStateSurface");
    expect(content).toContain("isPending");
    expect(content).toContain("handleRetryExtraction");
  });
});

// ── Codex adversarial review fixes ────────────────────────────

describe("Phase 14: Codex adversarial review fixes", () => {
  it("DELETE route rejects non-numeric ids (e.g. '12abc')", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    // Must validate with strict numeric regex before using parseInt
    expect(content).toContain("/^\\d+$/");
  });

  it("DELETE route maps 'not found' errors to 404 status", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    // The DELETE handler must check for not-found and return 404
    expect(content).toContain("isNotFound");
    expect(content).toContain("404");
  });

  it("GET route maps invalid libraryId errors to 400 status", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    // The GET handler should catch invalid libraryId and return 400
    expect(content).toContain("isInvalidLibraryId");
    const getSection = content.split("export async function GET")[1]?.split("export async function")[0] ?? "";
    expect(getSection).toContain("400");
  });

  it("PATCH route validates that id field exists and is a number", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    const patchSection = content.split("export async function PATCH")[1]?.split("export async function")[0] ?? "";
    // Must validate body.id before calling updateAnnotation
    expect(patchSection).toContain("body.id");
    expect(patchSection).toContain("400");
  });

  it("PATCH route maps 'not found' errors to 404 status", () => {
    const content = readFileSync(resolve(SRC, "app/api/library/annotations/route.ts"), "utf-8");
    const patchSection = content.split("export async function PATCH")[1]?.split("export async function")[0] ?? "";
    expect(patchSection).toContain("isNotFound");
    expect(patchSection).toContain("404");
  });
});
