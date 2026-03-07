// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { BlockSelectionWrapper } from "../block-selection-wrapper";
import type { ContentBlock } from "@/types/presentation";

function renderWrapper(onSelect: (options?: { addToSelection?: boolean }) => void) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  const block: ContentBlock = {
    type: "text",
    data: { text: "Hello", style: "body" },
  };

  act(() => {
    root.render(
      createElement(
        BlockSelectionWrapper,
        {
          block,
          blockIndex: 0,
          isSelected: false,
          isEditing: false,
          onSelect,
          onStartEdit: vi.fn(),
          onDelete: vi.fn(),
        },
        createElement("div", null, "Content")
      )
    );
  });

  const wrapper = host.querySelector('[data-block-index="0"]');
  if (!(wrapper instanceof HTMLDivElement)) {
    throw new Error("Block wrapper not found");
  }

  return {
    wrapper,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("BlockSelectionWrapper selection modifiers", () => {
  it("Shift+click requests additive selection", () => {
    const onSelect = vi.fn<(options?: { addToSelection?: boolean }) => void>();
    const { wrapper, cleanup } = renderWrapper(onSelect);

    act(() => {
      wrapper.dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
    });

    expect(onSelect).toHaveBeenCalledWith({ addToSelection: true });
    cleanup();
  });

  it("Ctrl+click toggles selection", () => {
    const onSelect = vi.fn<(options?: { addToSelection?: boolean }) => void>();
    const { wrapper, cleanup } = renderWrapper(onSelect);

    act(() => {
      wrapper.dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true }));
    });

    expect(onSelect).toHaveBeenCalledWith({ addToSelection: true });
    cleanup();
  });

  it("Cmd+click toggles selection", () => {
    const onSelect = vi.fn<(options?: { addToSelection?: boolean }) => void>();
    const { wrapper, cleanup } = renderWrapper(onSelect);

    act(() => {
      wrapper.dispatchEvent(new MouseEvent("click", { bubbles: true, metaKey: true }));
    });

    expect(onSelect).toHaveBeenCalledWith({ addToSelection: true });
    cleanup();
  });
});

describe("BlockSelectionWrapper rotation", () => {
  function renderRotatableWrapper(options?: {
    block?: ContentBlock;
    onRotate?: (rotation: number) => void;
  }) {
    const host = document.createElement("div");
    const canvas = document.createElement("div");
    canvas.appendChild(host);
    document.body.appendChild(canvas);
    const root: Root = createRoot(host);
    const onRotate = options?.onRotate ?? vi.fn<(rotation: number) => void>();

    const block: ContentBlock = options?.block ?? {
      type: "text",
      data: { text: "Hello", style: "body" },
      rotation: 0,
    };

    act(() => {
      root.render(
        createElement(
          BlockSelectionWrapper,
          {
            block,
            blockIndex: 0,
            isSelected: true,
            isEditing: false,
            onSelect: vi.fn(),
            onStartEdit: vi.fn(),
            onDelete: vi.fn(),
            onRotate,
            initialPosition: { x: 10, y: 10, width: 20, height: 20 },
            canvasRef: { current: canvas },
          },
          createElement("div", null, "Content")
        )
      );
    });

    const wrapper = host.querySelector('[data-block-index="0"]');
    if (!(wrapper instanceof HTMLDivElement)) {
      throw new Error("Block wrapper not found");
    }

    Object.defineProperty(wrapper, "getBoundingClientRect", {
      value: () => ({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        right: 300,
        bottom: 200,
        x: 100,
        y: 100,
        toJSON: () => {},
      }),
    });

    const rotateHandle = wrapper.querySelector('[data-rotation-handle="true"]');
    if (!(rotateHandle instanceof HTMLDivElement)) {
      throw new Error("Rotation handle not found");
    }

    return {
      wrapper,
      rotateHandle,
      onRotate,
      cleanup: () => {
        act(() => {
          root.unmount();
        });
        canvas.remove();
      },
    };
  }

  it("rotation handle calculates angle from block center", () => {
    const onRotate = vi.fn<(rotation: number) => void>();
    const { rotateHandle, cleanup } = renderRotatableWrapper({ onRotate });

    act(() => {
      rotateHandle.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, clientX: 200, clientY: 40 })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { bubbles: true, clientX: 260, clientY: 150 })
      );
      window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(onRotate).toHaveBeenCalled();
    expect(onRotate).toHaveBeenLastCalledWith(90);
    cleanup();
  });

  it("Shift+drag snaps rotation to 15 degree increments", () => {
    const onRotate = vi.fn<(rotation: number) => void>();
    const { rotateHandle, cleanup } = renderRotatableWrapper({ onRotate });

    act(() => {
      rotateHandle.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, clientX: 200, clientY: 40 })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { bubbles: true, shiftKey: true, clientX: 299, clientY: 136 })
      );
      window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(onRotate).toHaveBeenCalled();
    expect(onRotate).toHaveBeenLastCalledWith(75);
    cleanup();
  });

  it("applies CSS transform for rotation and flips", () => {
    const { wrapper, cleanup } = renderRotatableWrapper({
      block: {
        type: "text",
        data: { text: "Hello", style: "body" },
        rotation: 30,
        scaleX: -1,
        scaleY: 1,
      },
    });

    expect(wrapper.style.transform).toContain("rotate(30deg)");
    expect(wrapper.style.transform).toContain("scaleX(-1)");
    expect(wrapper.style.transform).toContain("scaleY(1)");
    cleanup();
  });
});
