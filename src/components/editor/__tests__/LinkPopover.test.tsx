// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LinkPopover } from "../LinkPopover";

function createEditorMock(editorDom: HTMLElement) {
  const chainState = {
    focus: vi.fn(),
    setTextSelection: vi.fn(),
    extendMarkRange: vi.fn(),
    setLink: vi.fn(),
    unsetLink: vi.fn(),
    run: vi.fn(),
  };

  chainState.focus.mockReturnValue(chainState);
  chainState.setTextSelection.mockReturnValue(chainState);
  chainState.extendMarkRange.mockReturnValue(chainState);
  chainState.setLink.mockReturnValue(chainState);
  chainState.unsetLink.mockReturnValue(chainState);
  chainState.run.mockReturnValue(true);

  return {
    editor: {
      chain: vi.fn(() => chainState),
      view: {
        dom: editorDom,
        posAtDOM: vi.fn((node: Node) => {
          const text = node.textContent ?? "";
          return text === "linked-text" ? 12 : 1;
        }),
      },
    },
    chainState,
  };
}

describe("LinkPopover", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let editorDom: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    editorDom = document.createElement("div");
    document.body.appendChild(editorDom);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    editorDom?.remove();
    container = null;
    root = null;
    editorDom = null;
    vi.restoreAllMocks();
  });

  function renderPopover() {
    const dom = editorDom as HTMLDivElement;
    const { editor, chainState } = createEditorMock(dom);

    act(() => {
      root?.render(<LinkPopover editor={editor as never} />);
    });

    const link = document.createElement("a");
    link.href = "https://example.com/original";
    link.textContent = "linked-text";
    link.addEventListener("click", (event) => event.preventDefault());
    link.getBoundingClientRect = () =>
      ({
        left: 100,
        top: 100,
        width: 80,
        height: 20,
        right: 180,
        bottom: 120,
        x: 100,
        y: 100,
        toJSON: () => ({}),
      }) as DOMRect;
    dom.appendChild(link);

    act(() => {
      link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });

    return { link, chainState };
  }

  it("switches into inline edit mode and autofocuses the full URL selection", () => {
    renderPopover();

    const editButton = document.querySelector(
      'button[title="Edit link"]'
    ) as HTMLButtonElement | null;

    act(() => {
      editButton?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      editButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = document.querySelector(
      'input[placeholder="https://..."]'
    ) as HTMLInputElement | null;

    expect(input).toBeTruthy();
    expect(document.activeElement).toBe(input);
    expect(input?.selectionStart).toBe(0);
    expect(input?.selectionEnd).toBe("https://example.com/original".length);
  });

  it("updates the clicked link range on Enter and opens links in a new tab safely", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const { chainState } = renderPopover();

    const openButton = document.querySelector(
      'button[title="Open in new tab"]'
    ) as HTMLButtonElement | null;

    act(() => {
      openButton?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      openButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(openSpy).toHaveBeenCalledWith(
      "https://example.com/original",
      "_blank",
      "noopener,noreferrer"
    );

    const editButton = document.querySelector(
      'button[title="Edit link"]'
    ) as HTMLButtonElement | null;

    act(() => {
      editButton?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      editButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const input = document.querySelector(
      'input[placeholder="https://..."]'
    ) as HTMLInputElement | null;

    act(() => {
      if (!input) return;
      const valueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set;
      valueSetter?.call(input, "https://example.com/updated");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    });

    expect(chainState.setTextSelection).toHaveBeenCalledWith({
      from: 12,
      to: 23,
    });
    expect(chainState.extendMarkRange).toHaveBeenCalledWith("link");
    expect(chainState.setLink).toHaveBeenCalledWith({
      href: "https://example.com/updated",
    });
  });

  it("removes the clicked link and closes the popover", () => {
    const { chainState } = renderPopover();

    const removeButton = document.querySelector(
      'button[title="Remove link"]'
    ) as HTMLButtonElement | null;

    act(() => {
      removeButton?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      removeButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(chainState.setTextSelection).toHaveBeenCalledWith({
      from: 12,
      to: 23,
    });
    expect(chainState.unsetLink).toHaveBeenCalled();
    expect(document.querySelector('button[title="Remove link"]')).toBeNull();
  });
});
