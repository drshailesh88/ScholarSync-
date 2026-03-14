// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VersionHistoryPanel } from "../version-history-panel";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

describe("VersionHistoryPanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("confirm", vi.fn(() => true));
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders loading then empty state", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => ({ versions: [] }) } as Response);

    await act(async () => {
      root.render(<VersionHistoryPanel fileId="f1" onRestore={vi.fn()} />);
    });

    expect(container.textContent).toContain("No saved versions yet");
    expect(container.textContent).toContain("Save Current Version");
  });

  it("saves a new version and reloads list", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({ ok: true, json: async () => ({ versions: [] }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ versions: [{ id: "v1", description: "snapshot", createdAt: new Date().toISOString() }] }),
      } as Response);

    await act(async () => {
      root.render(<VersionHistoryPanel fileId="f1" onRestore={vi.fn()} onBeforeSave={vi.fn()} />);
    });

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Save Current Version"))?.click();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/latex/versions", expect.objectContaining({ method: "POST" }));
    expect(container.textContent).toContain("snapshot");
  });

  it("shows error banner when loading fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);

    await act(async () => {
      root.render(<VersionHistoryPanel fileId="f1" onRestore={vi.fn()} />);
    });

    expect(container.textContent).toContain("Failed to load versions");
  });
});
