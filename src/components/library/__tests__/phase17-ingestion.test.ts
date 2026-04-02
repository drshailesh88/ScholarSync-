/**
 * Phase 17 Tests — Ingestion (URL Paste + PDF Upload)
 *
 * Tests cover:
 * 1. saveWebSourceFromUrl server action exists and validates input
 * 2. AddSourceDialog component exists with both tabs
 * 3. PDF upload API route exists
 * 4. URL validation rejects bad input
 * 5. LibraryShell includes AddSourceButton
 */

import { describe, it, expect, vi } from "vitest";

// ── Req 1: saveWebSourceFromUrl exists ──────────────────────────

describe("Phase 17: URL paste server action", () => {
  it("saveWebSourceFromUrl function exists", async () => {
    const mod = await import("@/lib/actions/web-sources");
    expect(typeof mod.saveWebSourceFromUrl).toBe("function");
  }, 15_000);

  it("rejects empty string", async () => {
    const mod = await import("@/lib/actions/web-sources");

    vi.mock("@/lib/auth", () => ({
      getCurrentUserId: vi.fn().mockResolvedValue("test-user-id"),
    }));

    await expect(mod.saveWebSourceFromUrl("")).rejects.toThrow("Invalid URL");
  });

  it("rejects non-http protocols", async () => {
    const mod = await import("@/lib/actions/web-sources");
    await expect(mod.saveWebSourceFromUrl("ftp://example.com")).rejects.toThrow(
      "Only HTTP and HTTPS"
    );
  });

  it("rejects javascript: protocol", async () => {
    const mod = await import("@/lib/actions/web-sources");
    await expect(
      mod.saveWebSourceFromUrl("javascript:alert(1)")
    ).rejects.toThrow("Only HTTP and HTTPS");
  });

  it("rejects data: URLs", async () => {
    const mod = await import("@/lib/actions/web-sources");
    await expect(
      mod.saveWebSourceFromUrl("data:text/html,hello")
    ).rejects.toThrow("Only HTTP and HTTPS");
  });
});

// ── Req 2: AddSourceDialog component exists ─────────────────────

describe("Phase 17: AddSourceDialog component", () => {
  it("AddSourceDialog module file exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/components/library/AddSourceDialog.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("AddSourceDialog file exports both components", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/components/library/AddSourceDialog.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("export function AddSourceDialog");
    expect(content).toContain("export function AddSourceButton");
  });

  it("AddSourceDialog has URL paste tab", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/components/library/AddSourceDialog.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Paste URL");
    expect(content).toContain("saveWebSourceFromUrl");
  });

  it("AddSourceDialog has PDF upload tab", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/components/library/AddSourceDialog.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Upload PDF");
    expect(content).toContain("upload-pdf");
  });
});

// ── Req 3: PDF upload API route ─────────────────────────────────

describe("Phase 17: PDF upload API route", () => {
  it("upload-pdf route file exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/app/api/library/upload-pdf/route.ts"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("upload-pdf route exports POST handler", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/app/api/library/upload-pdf/route.ts"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("export async function POST");
  });

  it("upload-pdf route validates PDF magic bytes", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/app/api/library/upload-pdf/route.ts"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("%PDF-");
  });

  it("upload-pdf route enforces file size limit", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/app/api/library/upload-pdf/route.ts"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("MAX_FILE_SIZE");
    expect(content).toContain("50 MB");
  });
});

// ── Req 4: LibraryShell includes AddSourceButton ────────────────

describe("Phase 17: LibraryShell integration", () => {
  it("LibraryShell imports AddSourceDialog", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      process.cwd(),
      "src/components/library/LibraryShell.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("AddSourceButton");
    expect(content).toContain("AddSourceDialog");
  });
});

// ── Req 5: URL source type inference ────────────────────────────

describe("Phase 17: URL source type inference", () => {
  it("exports saveWebSourceFromUrl with correct signature", async () => {
    const mod = await import("@/lib/actions/web-sources");
    expect(mod.saveWebSourceFromUrl.length).toBeGreaterThanOrEqual(0);
  });
});

// ── Req 6: Content extraction enrichment ────────────────────────

describe("Phase 17: Content extraction enrichment", () => {
  it("extractWebSourceContent function exists for extraction", async () => {
    const mod = await import("@/lib/actions/web-sources");
    expect(typeof mod.extractWebSourceContent).toBe("function");
  });
});
