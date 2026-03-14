// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SelectionToolbar } from "../SelectionToolbar";

type EditorEvent = "selectionUpdate" | "blur";

function createEditorMock() {
  const handlers: Partial<Record<EditorEvent, () => void>> = {};
  const chainState = {
    focus: vi.fn(),
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    toggleUnderline: vi.fn(),
    toggleStrike: vi.fn(),
    toggleCode: vi.fn(),
    run: vi.fn(),
  };

  chainState.focus.mockReturnValue(chainState);
  chainState.toggleBold.mockReturnValue(chainState);
  chainState.toggleItalic.mockReturnValue(chainState);
  chainState.toggleUnderline.mockReturnValue(chainState);
  chainState.toggleStrike.mockReturnValue(chainState);
  chainState.toggleCode.mockReturnValue(chainState);
  chainState.run.mockReturnValue(true);

  return {
    editor: {
      state: {
        selection: {
          from: 1,
          to: 5,
          empty: false,
        },
      },
      view: {
        coordsAtPos: vi.fn((pos: number) => ({
          left: pos * 10,
          top: 50,
          right: pos * 10 + 5,
          bottom: 60,
        })),
      },
      on: vi.fn((event: EditorEvent, handler: () => void) => {
        handlers[event] = handler;
      }),
      off: vi.fn(),
      chain: vi.fn(() => chainState),
      isActive: vi.fn(() => false),
      getAttributes: vi.fn(() => ({})),
    },
    chainState,
    emit(event: EditorEvent) {
      handlers[event]?.();
    },
  };
}

describe("SelectionToolbar", () => {
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

  function renderToolbar() {
    const mock = createEditorMock();

    act(() => {
      root?.render(<SelectionToolbar editor={mock.editor as never} />);
    });

    act(() => {
      mock.emit("selectionUpdate");
    });

    return mock;
  }

  it.each([
    ["Bold", "toggleBold"],
    ["Italic", "toggleItalic"],
    ["Underline", "toggleUnderline"],
    ["Strikethrough", "toggleStrike"],
    ["Inline Code", "toggleCode"],
  ] as const)(
    "applies %s formatting on mouse down without waiting for click",
    (label, method) => {
      const { chainState } = renderToolbar();
      const button = document.querySelector(
        `button[title="${label}"]`
      ) as HTMLButtonElement | null;

      act(() => {
        button?.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        );
      });

      expect(chainState.focus).toHaveBeenCalled();
      expect(chainState[method]).toHaveBeenCalledTimes(1);
      expect(chainState.run).toHaveBeenCalledTimes(1);
    }
  );
});
