// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TopBar } from "../TopBar";

const useEditorStoreMock = vi.hoisted(() => vi.fn());
const countSectionWordsMock = vi.hoisted(() => vi.fn());

vi.mock("@/stores/editor-store", () => ({
  useEditorStore: (selector?: (value: Record<string, unknown>) => unknown) => {
    const store = useEditorStoreMock();
    return selector ? selector(store) : store;
  },
}));

vi.mock("@/lib/editor/word-counter", () => ({
  countSectionWords: countSectionWordsMock,
}));

vi.mock("../KeyboardShortcutsDialog", () => ({
  KeyboardShortcutsDialog: () => null,
}));

describe("TopBar", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    useEditorStoreMock.mockReset();
    countSectionWordsMock.mockReset();
    countSectionWordsMock.mockReturnValue({});
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.restoreAllMocks();
  });

  function renderWithStatus(status: { state: string; lastSavedAt?: Date }) {
    useEditorStoreMock.mockReturnValue({
      mode: "editing",
      setMode: vi.fn(),
      wordCount: 10,
      saveStatus: status,
      referenceCount: 0,
      commentCount: 0,
      toggleReferenceSidebar: vi.fn(),
      toggleCommentSidebar: vi.fn(),
    });

    const editor = {
      state: { doc: {} },
      setEditable: vi.fn(),
      chain: vi.fn(() => ({
        focus: vi.fn().mockReturnThis(),
        undo: vi.fn().mockReturnThis(),
        redo: vi.fn().mockReturnThis(),
        run: vi.fn(),
      })),
      can: vi.fn(() => ({
        undo: vi.fn(() => true),
        redo: vi.fn(() => true),
      })),
    };

    act(() => {
      root?.render(<TopBar editor={editor as never} />);
    });
  }

  it("renders saved and saving indicators with the documented icon classes", () => {
    renderWithStatus({ state: "saved", lastSavedAt: new Date("2026-03-12T12:34:00Z") });

    const savedLabel = Array.from(container?.querySelectorAll("span") ?? []).find((span) =>
      span.textContent?.includes("Saved")
    );
    const savedIcon = savedLabel?.querySelector("svg");
    expect(savedIcon).toBeTruthy();
    expect(savedIcon?.getAttribute("width")).toBe("12");
    expect(savedIcon?.getAttribute("height")).toBe("12");

    act(() => {
      root?.unmount();
      root = createRoot(container!);
    });

    renderWithStatus({ state: "saving" });

    const savingLabel = Array.from(container?.querySelectorAll("span") ?? []).find(
      (span) => span.textContent === "Saving..."
    );
    const savingIcon = savingLabel?.querySelector("svg");
    expect(savingIcon).toBeTruthy();
    expect(savingIcon?.getAttribute("width")).toBe("12");
    expect(savingIcon?.getAttribute("height")).toBe("12");
    expect(savingIcon?.getAttribute("class")).toContain("text-brand");
    expect(savingIcon?.getAttribute("class")).toContain("animate-pulse");
  });

  it("renders no save indicator for unknown states", () => {
    renderWithStatus({ state: "mystery" });
    expect(container?.textContent).not.toContain("Saved");
    expect(container?.textContent).not.toContain("Saving...");
  });
});
