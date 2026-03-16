// @vitest-environment jsdom

import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { VersionHistory } from "../VersionHistory";
import type { JSONContent } from "@tiptap/core";

const actionsMock = vi.hoisted(() => ({
  getDocumentVersions: vi.fn(),
  getVersionContent: vi.fn(),
  restoreDocumentVersion: vi.fn(),
  saveNamedVersion: vi.fn(),
}));

vi.mock("@/lib/actions/documents", () => ({
  getDocumentVersions: actionsMock.getDocumentVersions,
  getVersionContent: actionsMock.getVersionContent,
  restoreDocumentVersion: actionsMock.restoreDocumentVersion,
  saveNamedVersion: actionsMock.saveNamedVersion,
}));

describe("VersionHistory", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  const content: JSONContent = { type: "doc", content: [] };

  beforeEach(() => {
    actionsMock.getDocumentVersions.mockReset();
    actionsMock.getVersionContent.mockReset();
    actionsMock.restoreDocumentVersion.mockReset();
    actionsMock.saveNamedVersion.mockReset();
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  function renderPanel(currentContent: JSONContent | null = content) {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <VersionHistory
          documentId={1}
          sectionId={2}
          currentContent={currentContent}
          onRestore={vi.fn()}
          onClose={vi.fn()}
        />
      );
    });
  }

  it("shows the loading spinner while versions are still loading and disables saving", async () => {
    actionsMock.getDocumentVersions.mockImplementation(
      () => new Promise(() => undefined)
    );

    renderPanel();

    const saveButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Save Current Version"
    ) as HTMLButtonElement | undefined;

    expect(saveButton?.disabled).toBe(true);
    expect(
      !!document.querySelector(".animate-spin")
    ).toBe(true);
  });

  it("renders the empty state when there are no versions", async () => {
    actionsMock.getDocumentVersions.mockResolvedValue([]);

    await act(async () => {
      renderPanel();
      await Promise.resolve();
    });

    expect(document.body.textContent).toContain("No versions yet");
  });

  it("renders fallback labels for unnamed auto and manual versions", async () => {
    actionsMock.getDocumentVersions.mockResolvedValue([
      {
        id: 1,
        versionNumber: 3,
        versionName: null,
        autoSaved: true,
        savedBy: "auto",
        createdAt: new Date("2026-03-11T18:16:06.175Z"),
      },
      {
        id: 2,
        versionNumber: 4,
        versionName: null,
        autoSaved: false,
        savedBy: "user",
        createdAt: new Date("2026-03-11T18:17:06.175Z"),
      },
    ]);

    await act(async () => {
      renderPanel();
      await Promise.resolve();
    });

    expect(document.body.textContent).toContain("Auto-save");
    expect(document.body.textContent).toContain("Manual save");
  });

  it("ignores blank prompt input when saving a named version", async () => {
    actionsMock.getDocumentVersions.mockResolvedValue([]);
    vi.stubGlobal("prompt", vi.fn(() => "   "));

    await act(async () => {
      renderPanel();
      await Promise.resolve();
    });

    const saveButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Save Current Version"
    );

    await act(async () => {
      saveButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await Promise.resolve();
    });

    expect(globalThis.prompt).toHaveBeenCalledWith(
      "Version name (e.g., 'Before methods rewrite'):"
    );
    expect(actionsMock.saveNamedVersion).not.toHaveBeenCalled();
  });

  it("disables manual save when there is no current content", async () => {
    actionsMock.getDocumentVersions.mockResolvedValue([]);

    await act(async () => {
      renderPanel(null);
      await Promise.resolve();
    });

    const saveButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Save Current Version"
    ) as HTMLButtonElement | undefined;

    expect(saveButton?.disabled).toBe(true);
  });
});
