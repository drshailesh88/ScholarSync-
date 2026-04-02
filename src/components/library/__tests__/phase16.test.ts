/**
 * Phase 16 Tests — Citation Handoff + Editor Integration
 *
 * Tests cover:
 * 1. Editor handoff server actions (create, consume, cancel, get)
 * 2. Single-source citation flow (SendToEditorButton component)
 * 3. Bulk citation flow (BulkSelectionToolbar + multi-select)
 * 4. Editor consumption (HandoffConsumptionPanel component)
 * 5. Cited badge (getCitedLibraryIds + card badge)
 * 6. Handoff-to-reference conversion
 * 7. Integration: SourceList multi-select support
 */

import { describe, it, expect } from "vitest";

// ── Req 1: Editor Handoff server actions ────────────────────────

describe("Phase 16: Editor Handoff service", () => {
  it("editor-handoff.ts exports all required functions", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content).toContain("export async function createEditorHandoff");
    expect(content).toContain("export async function createEditorHandoffFromIds");
    expect(content).toContain("export async function getEditorHandoff");
    expect(content).toContain("export async function getPendingHandoff");
    expect(content).toContain("export async function consumeEditorHandoff");
    expect(content).toContain("export async function cancelEditorHandoff");
    expect(content).toContain("export async function getCitedLibraryIds");
  });

  it("uses 'use server' directive", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content.trimStart().startsWith('"use server"')).toBe(true);
  });

  it("library barrel re-exports handoff functions", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/library/index.ts", "utf-8");
    expect(content).toContain("createEditorHandoff");
    expect(content).toContain("consumeEditorHandoff");
    expect(content).toContain("getCitedLibraryIds");
    expect(content).toContain("getPendingHandoff");
  });
});

// ── Req 2: Single-source citation flow ──────────────────────────

describe("Phase 16: SendToEditorButton component", () => {
  it("SendToEditorButton component exists", async () => {
    const fs = await import("fs");
    const exists = fs.existsSync(
      "src/components/library/reader/send-to-editor-button.tsx"
    );
    expect(exists).toBe(true);
    const content = fs.readFileSync(
      "src/components/library/reader/send-to-editor-button.tsx",
      "utf-8"
    );
    expect(content).toContain("export function SendToEditorButton");
    expect(content).toContain("createEditorHandoffFromIds");
    expect(content).toContain("Cite in Editor");
    expect(content).toContain("libraryId");
  });

  it("reader-view imports SendToEditorButton", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/components/library/reader/reader-view.tsx",
      "utf-8"
    );
    expect(content).toContain("SendToEditorButton");
  });
});

// ── Req 3: Bulk citation flow ───────────────────────────────────

describe("Phase 16: Bulk selection + Send to Editor", () => {
  it("BulkSelectionToolbar component exists", async () => {
    const fs = await import("fs");
    const exists = fs.existsSync(
      "src/components/library/BulkSelectionToolbar.tsx"
    );
    expect(exists).toBe(true);
    const content = fs.readFileSync(
      "src/components/library/BulkSelectionToolbar.tsx",
      "utf-8"
    );
    expect(content).toContain("export function BulkSelectionToolbar");
    expect(content).toContain("Send to Editor");
  });

  it("SourceList supports multi-select (citedIds prop)", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/components/library/SourceList.tsx",
      "utf-8"
    );
    expect(content).toContain("selectedIds");
    expect(content).toContain("onToggleSelect");
    expect(content).toContain("BulkSelectionToolbar");
    expect(content).toContain("citedIds");
  });

  it("LibrarySourceCard supports selection + cited props", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/components/library/LibrarySourceCard.tsx",
      "utf-8"
    );
    expect(content).toContain("onToggleSelect");
    expect(content).toContain("selected");
    expect(content).toContain("isCited");
  });
});

// ── Req 4: Editor consumption panel ─────────────────────────────

describe("Phase 16: Editor Handoff consumption", () => {
  it("HandoffConsumptionPanel component exists", async () => {
    const fs = await import("fs");
    const exists = fs.existsSync(
      "src/components/editor/HandoffConsumptionPanel.tsx"
    );
    expect(exists).toBe(true);
    const content = fs.readFileSync(
      "src/components/editor/HandoffConsumptionPanel.tsx",
      "utf-8"
    );
    expect(content).toContain("export function HandoffConsumptionPanel");
    expect(content).toContain("onImportCitations");
  });

  it("editor page imports HandoffConsumptionPanel", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/app/(app)/editor/[id]/page.tsx",
      "utf-8"
    );
    expect(content).toContain("HandoffConsumptionPanel");
    expect(content).toContain("handleImportHandoffCitations");
  });
});

// ── Req 5: Cited badge ──────────────────────────────────────────

describe("Phase 16: Cited badge on source cards", () => {
  it("LibrarySourceCard renders Cited badge markup", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/components/library/LibrarySourceCard.tsx",
      "utf-8"
    );
    expect(content).toContain("Cited");
    expect(content).toContain("isCited");
  });

  it("StateViewClient passes citedIds to SourceList", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/app/(app)/library/[state]/StateViewClient.tsx",
      "utf-8"
    );
    expect(content).toContain("citedIds");
    expect(content).toContain("citedIdSet");
  });

  it("State page fetches citedIds", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/app/(app)/library/[state]/page.tsx",
      "utf-8"
    );
    expect(content).toContain("getCitedLibraryIds");
  });
});

// ── Req 6: Handoff status consumed after import ─────────────────

describe("Phase 16: Handoff lifecycle (status transitions)", () => {
  it("HandoffConsumptionPanel calls consumeEditorHandoff before importing (atomic)", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/components/editor/HandoffConsumptionPanel.tsx",
      "utf-8"
    );
    expect(content).toContain("consumeEditorHandoff");
    expect(content).toContain('status === "pending"');
    // BUG #2: Consume first, then import
    expect(content).toContain("const consumed = await consumeEditorHandoff");
    expect(content).toContain("if (!consumed) return");
    // BUG #5: Dismiss cancels server-side
    expect(content).toContain("cancelEditorHandoff");
    // BUG #4: editorReady prop
    expect(content).toContain("editorReady");
  });

  it("editor-handoff service sets consumed status and timestamp", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content).toContain('status: "consumed"');
    expect(content).toContain("consumedAt: new Date()");
  });
});

// ── Handoff-to-reference conversion ─────────────────────────────

describe("Phase 16: Handoff source to Reference conversion", () => {
  it("handoffSourceToReference function exists", async () => {
    const mod = await import("@/lib/library/handoff-to-reference");
    expect(typeof mod.handoffSourceToReference).toBe("function");
  });

  it("converts a paper source to a Reference with correct type", async () => {
    const { handoffSourceToReference } = await import(
      "@/lib/library/handoff-to-reference"
    );
    const ref = handoffSourceToReference(
      {
        libraryId: "paper_42",
        title: "Test Paper",
        authors: ["Smith J", "Doe A"],
        year: 2024,
        journal: "Nature",
        doi: "10.1234/test",
        url: undefined,
        sourceType: "paper",
      },
      "doc-1"
    );
    expect(ref.id).toBe("ref-paper-42");
    expect(ref.documentId).toBe("doc-1");
    expect(ref.type).toBe("article");
    expect(ref.title).toBe("Test Paper");
    expect(ref.authors.length).toBe(2);
    // BUG #7: "Smith J" should parse as family=Smith, given=J (PubMed style)
    expect(ref.authors[0].family).toBe("Smith");
    expect(ref.authors[0].given).toBe("J");
    expect(ref.year).toBe(2024);
    expect(ref.journal).toBe("Nature");
    expect(ref.cslData.type).toBe("article-journal");
  });

  it("converts a web source to a Reference with correct type", async () => {
    const { handoffSourceToReference } = await import(
      "@/lib/library/handoff-to-reference"
    );
    const ref = handoffSourceToReference(
      {
        libraryId: "web_187",
        title: "Web Article",
        authors: undefined,
        year: undefined,
        journal: undefined,
        doi: undefined,
        url: "https://example.com/article",
        sourceType: "web",
      },
      "doc-2"
    );
    expect(ref.id).toBe("ref-web-187");
    expect(ref.type).toBe("website");
    expect(ref.url).toBe("https://example.com/article");
    expect(ref.cslData.type).toBe("webpage");
    expect(ref.authors).toEqual([]);
  });

  it("handles edge case: undefined doi and url", async () => {
    const { handoffSourceToReference } = await import(
      "@/lib/library/handoff-to-reference"
    );
    const ref = handoffSourceToReference(
      {
        libraryId: "paper_1",
        title: "Minimal Paper",
        sourceType: "paper",
        authors: undefined,
        year: undefined,
        journal: undefined,
        doi: undefined,
        url: undefined,
      },
      "doc-3"
    );
    expect(ref.doi).toBeUndefined();
    expect(ref.url).toBeUndefined();
    expect(ref.year).toBe(0);
  });
});
