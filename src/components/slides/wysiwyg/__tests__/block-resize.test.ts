// @vitest-environment jsdom

import { act, createElement, type RefObject } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { BlockSelectionWrapper } from "../block-selection-wrapper";
import type { BlockPosition, ContentBlock } from "@/types/presentation";

type ResizeSpy = ReturnType<typeof vi.fn<(position: BlockPosition) => void>>;

interface RenderResizeWrapperOptions {
  initialPosition: BlockPosition;
  onResize?: ResizeSpy;
  maintainAspectRatio?: boolean;
}

interface RenderResizeWrapperResult {
  wrapper: HTMLDivElement;
  getHandle: (handle: string) => HTMLDivElement;
  onResize: ResizeSpy;
  cleanup: () => void;
}

const CANVAS_RECT = {
  left: 0,
  top: 0,
  width: 1000,
  height: 500,
  right: 1000,
  bottom: 500,
  x: 0,
  y: 0,
  toJSON: () => {},
};

function makeTextBlock(): ContentBlock {
  return {
    type: "text",
    data: {
      text: "Test block",
      style: "body",
    },
  };
}

function renderResizeWrapper({
  initialPosition,
  onResize,
  maintainAspectRatio,
}: RenderResizeWrapperOptions): RenderResizeWrapperResult {
  const resizeSpy: ResizeSpy = onResize ?? vi.fn<(position: BlockPosition) => void>();
  const canvas = document.createElement("div");
  Object.defineProperty(canvas, "getBoundingClientRect", {
    value: () => CANVAS_RECT,
  });
  document.body.appendChild(canvas);

  const host = document.createElement("div");
  canvas.appendChild(host);
  const root: Root = createRoot(host);
  const canvasRef = { current: canvas } as RefObject<HTMLDivElement | null>;

  act(() => {
    root.render(
      createElement(
        BlockSelectionWrapper,
        {
          block: makeTextBlock(),
          blockIndex: 0,
          isSelected: true,
          isEditing: false,
          maintainAspectRatio,
          onSelect: vi.fn(),
          onStartEdit: vi.fn(),
          onDelete: vi.fn(),
          onResize: resizeSpy,
          initialPosition,
          canvasRef,
        },
        createElement("div", null, "Content")
      )
    );
  });

  const wrapper = canvas.querySelector('[data-block-index="0"]');
  if (!(wrapper instanceof HTMLDivElement)) {
    throw new Error("Wrapper not found");
  }

  return {
    wrapper,
    getHandle: (handle: string) => {
      const node = wrapper.querySelector(`[data-resize-handle="${handle}"]`);
      if (!(node instanceof HTMLDivElement)) {
        throw new Error(`Handle not found: ${handle}`);
      }
      return node;
    },
    onResize: resizeSpy,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      canvas.remove();
    },
  };
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("Block resize handles", () => {
  it("starts resize tracking on mousedown", () => {
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
    });

    act(() => {
      result.getHandle("bottom-right").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
    });

    expect(result.wrapper.dataset.resizing).toBe("true");

    result.cleanup();
  });

  it("updates dimensions during mousemove", () => {
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
    });

    act(() => {
      result.getHandle("bottom-right").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 300, clientY: 150, bubbles: true })
      );
    });

    expect(result.wrapper.style.width).toBe("30%");
    expect(result.wrapper.style.height).toBe("30%");

    result.cleanup();
  });

  it("calls onResize with updated position on mouseup", () => {
    const onResize = vi.fn();
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
      onResize,
    });

    act(() => {
      result.getHandle("bottom-right").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 300, clientY: 150, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 300, clientY: 150, bubbles: true })
      );
    });

    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith({
      x: 10,
      y: 10,
      width: 30,
      height: 30,
    });

    result.cleanup();
  });

  it("enforces a minimum block size of 5%", () => {
    const onResize = vi.fn();
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
      onResize,
    });

    act(() => {
      result.getHandle("left").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 100, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 290, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 290, clientY: 100, bubbles: true })
      );
    });

    expect(onResize).toHaveBeenCalledWith({
      x: 25,
      y: 10,
      width: 5,
      height: 20,
    });

    result.cleanup();
  });

  it("corner handles resize both width and height", () => {
    const onResize = vi.fn();
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
      onResize,
    });

    act(() => {
      result.getHandle("top-left").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 150, clientY: 75, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 150, clientY: 75, bubbles: true })
      );
    });

    expect(onResize).toHaveBeenCalledWith({
      x: 5,
      y: 5,
      width: 25,
      height: 25,
    });

    result.cleanup();
  });

  it("edge handles resize only one dimension", () => {
    const onResize = vi.fn();
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
      onResize,
    });

    act(() => {
      result.getHandle("right").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 300, clientY: 150, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 300, clientY: 150, bubbles: true })
      );
    });

    expect(onResize).toHaveBeenCalledWith({
      x: 10,
      y: 10,
      width: 30,
      height: 20,
    });

    result.cleanup();
  });

  it("keeps aspect ratio locked when enabled", () => {
    const onResize = vi.fn();
    const result = renderResizeWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 10 },
      onResize,
      maintainAspectRatio: true,
    });

    act(() => {
      result.getHandle("bottom-right").dispatchEvent(
        new MouseEvent("mousedown", { clientX: 200, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 300, clientY: 100, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 300, clientY: 100, bubbles: true })
      );
    });

    expect(onResize).toHaveBeenCalledWith({
      x: 10,
      y: 10,
      width: 30,
      height: 15,
    });

    result.cleanup();
  });
});
