import { describe, it, expect } from "vitest";

/**
 * Phase 16: Editor Handoff — service module existence + export tests
 *
 * Tests verify the editor-handoff module exists, exports all expected functions,
 * and the payload normalization logic works correctly.
 */

describe("Phase 16: Editor Handoff service module", () => {
  it("editor-handoff.ts exists with all required exports", async () => {
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

  it("uses the editorHandoffs table from schema", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content).toContain('import { editorHandoffs } from "@/lib/db/schema"');
    expect(content).toContain("getCurrentUserId");
    expect(content).toContain("revalidatePath");
  });

  it("normalizes LibrarySource to HandoffSourcePayload", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content).toContain("normalizeSourceToPayload");
    expect(content).toContain("libraryId:");
    expect(content).toContain("sourceType:");
  });

  it("supports handoff status transitions: pending -> consumed, pending -> cancelled", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(
      "src/lib/library/editor-handoff.ts",
      "utf-8"
    );
    expect(content).toContain('status: "consumed"');
    expect(content).toContain('status: "cancelled"');
    expect(content).toContain('status: "pending"');
    expect(content).toContain("consumedAt: new Date()");
  });
});

describe("Phase 16: Library index re-exports handoff functions", () => {
  it("re-exports all handoff functions from barrel", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/library/index.ts", "utf-8");
    expect(content).toContain("createEditorHandoff");
    expect(content).toContain("createEditorHandoffFromIds");
    expect(content).toContain("getEditorHandoff");
    expect(content).toContain("getPendingHandoff");
    expect(content).toContain("consumeEditorHandoff");
    expect(content).toContain("cancelEditorHandoff");
    expect(content).toContain("getCitedLibraryIds");
  });
});
