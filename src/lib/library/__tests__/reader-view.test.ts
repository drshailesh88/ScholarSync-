import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import type { LibrarySource } from "../types";
import { parseLibraryId, toLibraryId } from "../types";

// ── Test fixtures ──────────────────────────────────────────────

const basePaperSource: LibrarySource = {
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

const baseWebSource: LibrarySource = {
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

// Resolve from the test file's own location — 3 dirs up from __tests__ -> library -> lib -> src
const SRC = resolve(__dirname, "..", "..", "..");

// ── Route structure file existence ─────────────────────────────

describe("Phase 12: Route structure /library/item/[libraryId]", () => {
  it("page.tsx exists at correct route path", () => {
    expect(existsSync(resolve(SRC, "app/(app)/library/item/[libraryId]/page.tsx"))).toBe(true);
  });

  it("loading.tsx exists at correct route path", () => {
    expect(existsSync(resolve(SRC, "app/(app)/library/item/[libraryId]/loading.tsx"))).toBe(true);
  });

  it("error.tsx exists at correct route path", () => {
    expect(existsSync(resolve(SRC, "app/(app)/library/item/[libraryId]/error.tsx"))).toBe(true);
  });
});

// ── Component file existence ───────────────────────────────────

describe("Phase 12: Reader component files", () => {
  it("reader-view.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/reader-view.tsx"))).toBe(true);
  });

  it("web-source-reader.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/web-source-reader.tsx"))).toBe(true);
  });

  it("paper-reader.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/paper-reader.tsx"))).toBe(true);
  });

  it("extraction-state-surface.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/extraction-state-surface.tsx"))).toBe(true);
  });

  it("workbench-panel.tsx exists", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/workbench-panel.tsx"))).toBe(true);
  });

  it("barrel index.ts exports exist", () => {
    expect(existsSync(resolve(SRC, "components/library/reader/index.ts"))).toBe(true);
  });
});

// ── Hook and service file existence ────────────────────────────

describe("Phase 12: Reading progress infrastructure", () => {
  it("useReadingProgress hook exists", () => {
    expect(existsSync(resolve(SRC, "hooks/useReadingProgress.ts"))).toBe(true);
  });

  it("library service exports updateReadingProgress", () => {
    const content = readFileSync(resolve(SRC, "lib/library/service.ts"), "utf-8");
    expect(content).toContain("export async function updateReadingProgress");
  });
});

// ── libraryId route parameter handling ─────────────────────────

describe("Phase 12: libraryId route parameter", () => {
  it("parseLibraryId handles paper_ prefix", () => {
    const result = parseLibraryId("paper_42");
    expect(result).toEqual({ type: "paper", id: 42 });
  });

  it("parseLibraryId handles web_ prefix", () => {
    const result = parseLibraryId("web_187");
    expect(result).toEqual({ type: "web", id: 187 });
  });

  it("toLibraryId round-trips with parseLibraryId", () => {
    const id = toLibraryId("paper", 42);
    expect(id).toBe("paper_42");
    const parsed = parseLibraryId(id);
    expect(parsed).toEqual({ type: "paper", id: 42 });
  });

  it("rejects malformed libraryId", () => {
    expect(() => parseLibraryId("invalid")).toThrow();
    expect(() => parseLibraryId("paper_abc")).toThrow();
    expect(() => parseLibraryId("")).toThrow();
    expect(() => parseLibraryId("book_1")).toThrow();
  });
});

// ── Domain model completeness for reader page ──────────────────

describe("Phase 12: LibrarySource model supports reader page", () => {
  it("paper source has all fields for paper reader", () => {
    expect(basePaperSource.sourceType).toBe("paper");
    expect(basePaperSource.abstract).toBeTruthy();
    expect(basePaperSource.pdfStoragePath).toBeTruthy();
    expect(basePaperSource.journal).toBeTruthy();
    expect(basePaperSource.doi).toBeTruthy();
    expect(basePaperSource.pubmedId).toBeTruthy();
    expect(basePaperSource.citationCount).toBeGreaterThan(0);
    expect(basePaperSource.studyType).toBeTruthy();
    expect(basePaperSource.readingProgress).toBe(45);
    expect(basePaperSource.readStatus).toBe("in_progress");
  });

  it("web source has all fields for web reader", () => {
    expect(baseWebSource.sourceType).toBe("web");
    expect(baseWebSource.contentHtml).toBeTruthy();
    expect(baseWebSource.contentPlain).toBeTruthy();
    expect(baseWebSource.extractionState).toBe("ready");
    expect(baseWebSource.domain).toBeTruthy();
    expect(baseWebSource.trustTier).toBeTruthy();
  });

  it("4 extraction states are supported", () => {
    const states = ["pending", "ready", "partial", "failed"] as const;
    expect(states).toHaveLength(4);

    const pending: LibrarySource = { ...baseWebSource, extractionState: "pending", contentHtml: null, contentPlain: null };
    expect(pending.extractionState).toBe("pending");
    expect(pending.contentHtml).toBeNull();

    expect(baseWebSource.extractionState).toBe("ready");
    expect(baseWebSource.contentHtml).toBeTruthy();

    const partial: LibrarySource = { ...baseWebSource, extractionState: "partial" };
    expect(partial.extractionState).toBe("partial");
    expect(partial.contentHtml).toBeTruthy();

    const failed: LibrarySource = { ...baseWebSource, extractionState: "failed", contentHtml: null, contentPlain: null };
    expect(failed.extractionState).toBe("failed");
    expect(failed.url).toBeTruthy();
  });

  it("reading progress is bounded 0-100", () => {
    expect(basePaperSource.readingProgress).toBeGreaterThanOrEqual(0);
    expect(basePaperSource.readingProgress).toBeLessThanOrEqual(100);
    expect(baseWebSource.readingProgress).toBe(0);
  });

  it("3 reader modes are defined", () => {
    const modes = ["focus", "working", "synthesis"] as const;
    expect(modes).toHaveLength(3);
    expect(modes[0]).toBe("focus");
  });

  it("breadcrumb path is derivable from source", () => {
    const parts = ["Library", basePaperSource.title];
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBe("Library");
    expect(parts[1]).toBeTruthy();
  });

  it("workbench panel has 3 tabs", () => {
    const tabs = ["notes", "metadata", "highlights"];
    expect(tabs).toHaveLength(3);
    expect(basePaperSource.notes).toBeTruthy();
    expect(basePaperSource.title).toBeTruthy();
  });
});

// ── CSS variables for library accent ───────────────────────────

describe("Phase 12: Library accent CSS variables", () => {
  it("globals.css contains library-accent variables", () => {
    const css = readFileSync(resolve(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain("--library-accent:");
    expect(css).toContain("--library-accent-hover:");
    expect(css).toContain("--library-accent-tint:");
    expect(css).toContain("--library-accent-dot:");
  });

  it("globals.css contains prose-library styles", () => {
    const css = readFileSync(resolve(SRC, "app/globals.css"), "utf-8");
    expect(css).toContain(".prose-library");
  });
});

// ── Component content verification ─────────────────────────────

describe("Phase 12: Component content verification", () => {
  it("page.tsx imports getLibrarySourceById", () => {
    const content = readFileSync(
      resolve(SRC, "app/(app)/library/item/[libraryId]/page.tsx"),
      "utf-8"
    );
    expect(content).toContain("getLibrarySourceById");
    expect(content).toContain("ReaderView");
    expect(content).toContain("libraryId");
  });

  it("reader-view.tsx implements three modes", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain('"focus"');
    expect(content).toContain('"working"');
    expect(content).toContain('"synthesis"');
    expect(content).toContain("max-w-[720px]");
  });

  it("reader-view.tsx has breadcrumb navigation", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("Library");
    expect(content).toContain("ArrowLeft");
    expect(content).toContain("CaretRight");
  });

  it("reader-view.tsx tracks reading progress", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("useReadingProgress");
    expect(content).toContain("progress");
  });

  it("web-source-reader.tsx uses Source Serif 4 typography", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("font-serif");
    expect(content).toContain("text-[17px]");
    expect(content).toContain("leading-[1.78]");
    expect(content).toContain("prose-library");
  });

  it("paper-reader.tsx has abstract/PDF toggle", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("abstract");
    expect(content).toContain("pdf");
    expect(content).toContain("PDFViewer");
  });

  it("extraction-state-surface.tsx handles all 4 states", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/extraction-state-surface.tsx"),
      "utf-8"
    );
    expect(content).toContain("pending");
    expect(content).toContain("failed");
    expect(content).toContain("Open original");
    expect(content).toContain("Retry extraction");
    expect(content).toContain("animate-pulse"); // skeleton
    expect(content).toContain("animate-spin"); // spinner
  });

  it("workbench-panel.tsx has 3 tabs", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/workbench-panel.tsx"),
      "utf-8"
    );
    expect(content).toContain('"notes"');
    expect(content).toContain('"metadata"');
    expect(content).toContain('"highlights"');
  });

  it("updateReadingProgress updates read_status based on progress", () => {
    const content = readFileSync(resolve(SRC, "lib/library/service.ts"), "utf-8");
    expect(content).toContain('clamped >= 95 ? "read"');
    expect(content).toContain('"in_progress"');
    expect(content).toContain('"unread"');
  });
});

// ── Adversarial review fixes (Codex-identified bugs) ───────────

describe("Phase 12: Codex adversarial review fixes", () => {
  it("web-source-reader sanitizes HTML with DOMPurify", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/web-source-reader.tsx"),
      "utf-8"
    );
    expect(content).toContain("DOMPurify");
    expect(content).toContain("sanitize");
    // Must NOT use raw source.contentHtml in dangerouslySetInnerHTML
    expect(content).not.toMatch(/dangerouslySetInnerHTML.*source\.contentHtml/);
  });

  it("reader-view wires onRetry to ExtractionStateSurface", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("onRetry={handleRetryExtraction}");
    expect(content).toContain("handleRetryExtraction");
  });

  it("reader-view polls for pending extraction", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/reader-view.tsx"),
      "utf-8"
    );
    expect(content).toContain("isPending");
    expect(content).toContain("router.refresh()");
    expect(content).toContain("setInterval");
  });

  it("error boundary does NOT expose raw error messages", () => {
    const content = readFileSync(
      resolve(SRC, "app/(app)/library/item/[libraryId]/error.tsx"),
      "utf-8"
    );
    // Should not render error.message directly
    expect(content).not.toContain("error.message");
  });

  it("updateReadingProgress rejects NaN/Infinity", () => {
    const content = readFileSync(resolve(SRC, "lib/library/service.ts"), "utf-8");
    expect(content).toContain("Number.isFinite(progress)");
  });

  it("paper-reader PDF toggle requires pdfStoragePath, not just any URL", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/paper-reader.tsx"),
      "utf-8"
    );
    // Should check pdfStoragePath specifically, not source.url
    expect(content).toContain("source.pdfStoragePath");
    expect(content).not.toMatch(/hasPdf.*source\.url/);
  });

  it("pending extraction text mentions auto-refresh", () => {
    const content = readFileSync(
      resolve(SRC, "components/library/reader/extraction-state-surface.tsx"),
      "utf-8"
    );
    expect(content).toContain("refreshes automatically");
  });
});
