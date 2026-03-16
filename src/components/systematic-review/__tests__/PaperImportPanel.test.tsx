// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PaperImportPanel } from "../PaperImportPanel";

vi.mock("@/components/ui/glass-panel", () => ({
  GlassPanel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/stores/systematic-review-store", () => ({
  useSystematicReviewStore: () => ({
    generatedStrategy: { fullSearchString: "cancer AND trial", estimatedResults: 25 },
  }),
}));

describe("PaperImportPanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.restoreAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders import controls and loads papers", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({ papers: [] }) } as Response);

    await act(async () => {
      root.render(<PaperImportPanel projectId={7} />);
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/systematic-review/import?projectId=7");
    expect(container.textContent).toContain("Import from Databases");
    expect(container.textContent).toContain("Import Papers");
  });

  it("imports papers and shows success state", async () => {
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => ({ papers: [] }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ imported: 3, duplicatesSkipped: 1, totalFound: 9 }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ papers: [] }) } as Response);

    await act(async () => {
      root.render(<PaperImportPanel projectId={7} />);
    });

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Import Papers"))?.click();
    });

    expect(container.textContent).toContain("Imported");
    expect(container.textContent).toContain("3");
    expect(container.textContent).toContain("duplicates skipped");
  });

  it("shows error banner when initial load throws", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("network"));

    await act(async () => {
      root.render(<PaperImportPanel projectId={7} />);
    });

    expect(container.textContent).toContain("Failed to load papers");
  });

  it("disables import when all sources are deselected", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({ papers: [] }) } as Response);

    await act(async () => {
      root.render(<PaperImportPanel projectId={7} />);
    });

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "PubMed")?.click();
    });

    const importButton = Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Import Papers"));
    expect(importButton?.hasAttribute("disabled")).toBe(true);
  });

});
