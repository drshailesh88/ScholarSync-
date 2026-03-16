// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toolbar } from "../toolbar";

function createEditorMock() {
  const chainState = {
    focus: vi.fn(),
    toggleHeading: vi.fn(),
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    toggleBulletList: vi.fn(),
    toggleOrderedList: vi.fn(),
    toggleBlockquote: vi.fn(),
    run: vi.fn(),
  };

  chainState.focus.mockReturnValue(chainState);
  chainState.toggleHeading.mockReturnValue(chainState);
  chainState.toggleBold.mockReturnValue(chainState);
  chainState.toggleItalic.mockReturnValue(chainState);
  chainState.toggleBulletList.mockReturnValue(chainState);
  chainState.toggleOrderedList.mockReturnValue(chainState);
  chainState.toggleBlockquote.mockReturnValue(chainState);
  chainState.run.mockReturnValue(true);

  return {
    chainState,
    editor: {
      chain: vi.fn(() => chainState),
      isActive: vi.fn(() => false),
    },
  };
}

describe("Toolbar", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
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

  it("renders nothing when editor is null", () => {
    act(() => {
      root?.render(<Toolbar editor={null} />);
    });

    expect(container?.innerHTML).toBe("");
  });

  it("renders the glass-panel shell, separator, and reference badge styles", () => {
    const { editor } = createEditorMock();

    act(() => {
      root?.render(
        <Toolbar
          editor={editor as never}
          onOpenCitationDialog={vi.fn()}
          onToggleReferenceSidebar={vi.fn()}
          referenceCount={3}
        />
      );
    });

    const toolbar = container?.firstElementChild as HTMLDivElement | null;
    expect(toolbar?.className).toContain("glass-panel");
    expect(toolbar?.className).toContain("border-b");
    expect(toolbar?.className).toContain("border-border");

    const separator = Array.from(container?.querySelectorAll("div") ?? []).find(
      (div) => div.className.includes("w-px h-5 bg-border mx-1")
    );
    expect(separator).toBeTruthy();

    const citeButton = document.querySelector(
      'button[title="Insert Citation (Cmd+Shift+C)"]'
    ) as HTMLButtonElement | null;
    const referenceButton = document.querySelector(
      'button[title="Toggle Reference Sidebar (Cmd+Shift+R)"]'
    ) as HTMLButtonElement | null;

    expect(citeButton).toBeTruthy();
    expect(referenceButton).toBeTruthy();
    expect(document.body.textContent).toContain("Cite");

    const badge = Array.from(container?.querySelectorAll("span") ?? []).find(
      (span) => span.textContent === "3"
    ) as HTMLSpanElement | undefined;

    expect(badge?.className).toContain("bg-blue-100");
    expect(badge?.className).toContain("dark:bg-blue-900/40");
    expect(badge?.className).toContain("text-blue-600");
    expect(badge?.className).toContain("dark:text-blue-400");
    expect(badge?.className).toContain("text-[10px]");
    expect(badge?.className).toContain("font-medium");
    expect(badge?.className).toContain("rounded-full");
    expect(badge?.className).toContain("px-1.5");
    expect(badge?.className).toContain("py-0.5");
    expect(badge?.className).toContain("leading-none");
  });

  it("uses onMouseDown prevention to preserve selection before actions", () => {
    const { editor, chainState } = createEditorMock();
    const onOpenCitationDialog = vi.fn();
    const onToggleReferenceSidebar = vi.fn();

    act(() => {
      root?.render(
        <Toolbar
          editor={editor as never}
          onOpenCitationDialog={onOpenCitationDialog}
          onToggleReferenceSidebar={onToggleReferenceSidebar}
          referenceCount={1}
        />
      );
    });

    const boldButton = document.querySelector(
      'button[title="Bold"]'
    ) as HTMLButtonElement | null;
    const citeButton = document.querySelector(
      'button[title="Insert Citation (Cmd+Shift+C)"]'
    ) as HTMLButtonElement | null;
    const referenceButton = document.querySelector(
      'button[title="Toggle Reference Sidebar (Cmd+Shift+R)"]'
    ) as HTMLButtonElement | null;

    const boldEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    const citeEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    const referenceEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    act(() => {
      boldButton?.dispatchEvent(boldEvent);
      citeButton?.dispatchEvent(citeEvent);
      referenceButton?.dispatchEvent(referenceEvent);
    });

    expect(boldEvent.defaultPrevented).toBe(true);
    expect(citeEvent.defaultPrevented).toBe(true);
    expect(referenceEvent.defaultPrevented).toBe(true);
    expect(chainState.focus).toHaveBeenCalled();
    expect(chainState.toggleBold).toHaveBeenCalled();
    expect(onOpenCitationDialog).toHaveBeenCalledOnce();
    expect(onToggleReferenceSidebar).toHaveBeenCalledOnce();
  });
});
