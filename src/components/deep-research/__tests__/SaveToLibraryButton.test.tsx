// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SaveToLibraryButton } from "../SaveToLibraryButton";

const baseProps = {
  topic: "Cancer biomarkers",
  mode: "standard",
  markdownReport: "# Report",
  sources: [],
  keyFindings: ["Finding A"],
  gaps: ["Gap A"],
  isComplete: true,
  isLoggedIn: true,
};

describe("SaveToLibraryButton", () => {
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

  it("renders disabled state for incomplete research", () => {
    act(() => {
      root.render(<SaveToLibraryButton {...baseProps} isComplete={false} />);
    });

    const button = container.querySelector("button");
    expect(button?.textContent).toContain("Save to Library");
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute("title")).toContain("must be complete");
  });

  it("submits and transitions to saved state", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    act(() => {
      root.render(<SaveToLibraryButton {...baseProps} />);
    });

    const button = container.querySelector("button")!;
    await act(async () => {
      button.click();
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(container.textContent).toContain("Saved");
  });

  it("shows error and retry label when request fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Backend unavailable" }),
    } as Response);

    act(() => {
      root.render(<SaveToLibraryButton {...baseProps} />);
    });

    await act(async () => {
      container.querySelector("button")?.click();
    });

    expect(container.textContent).toContain("Retry");
    expect(container.textContent).toContain("Backend unavailable");
  });
});
