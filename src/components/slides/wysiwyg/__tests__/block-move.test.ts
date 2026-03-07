// @vitest-environment jsdom

import { act, createElement, type RefObject } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import type { BlockPosition, ContentBlock } from "@/types/presentation";
import type { SlideState } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";
import { useSlidesStore } from "@/stores/slides-store";

vi.mock("../editable-text-block", () => ({
  EditableTextBlock: ({ content }: { content: string }) =>
    createElement("div", { "data-testid": "editable-text" }, content),
  EditableBulletsBlock: ({ items }: { items: string[] }) =>
    createElement(
      "ul",
      { "data-testid": "editable-bullets" },
      ...(items ?? []).map((item, index) =>
        createElement("li", { key: `${item}-${index}` }, item)
      )
    ),
}));

vi.mock("../block-inserter", () => ({
  BlockInserter: () => null,
}));

import { BlockSelectionWrapper } from "../block-selection-wrapper";
import { SlideCanvasWYSIWYG } from "../slide-canvas-wysiwyg";

type MoveSpy = ReturnType<typeof vi.fn<(position: BlockPosition) => void>>;
type UpdateSlideSpy = ReturnType<typeof vi.fn<(id: number, data: Partial<SlideState>) => void>>;

interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  toJSON: () => unknown;
}

interface RenderMoveWrapperOptions {
  initialPosition?: BlockPosition;
  wrapperRect?: RectLike;
  onMove?: MoveSpy;
  snapToGrid?: boolean;
  gridSize?: number;
}

interface RenderMoveWrapperResult {
  wrapper: HTMLDivElement;
  canvas: HTMLDivElement;
  onMove: MoveSpy;
  cleanup: () => void;
}

const CANVAS_RECT: RectLike = {
  left: 0,
  top: 0,
  width: 1000,
  height: 500,
  right: 1000,
  bottom: 500,
  x: 0,
  y: 0,
  toJSON: () => ({}),
};

function setElementRect(element: Element, rect: RectLike) {
  Object.defineProperty(element, "getBoundingClientRect", {
    configurable: true,
    value: () => rect,
  });
}

function makeTextBlock(position?: BlockPosition, animation?: ContentBlock["animation"]): ContentBlock {
  return {
    type: "text",
    data: {
      text: "Test block",
      style: "body",
    },
    position,
    animation,
  };
}

function renderMoveWrapper({
  initialPosition,
  wrapperRect,
  onMove,
  snapToGrid = false,
  gridSize = 5,
}: RenderMoveWrapperOptions): RenderMoveWrapperResult {
  const moveSpy: MoveSpy = onMove ?? vi.fn<(position: BlockPosition) => void>();
  const canvas = document.createElement("div");
  Object.defineProperty(canvas, "getBoundingClientRect", {
    configurable: true,
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
          block: makeTextBlock(initialPosition),
          blockIndex: 0,
          isSelected: true,
          isEditing: false,
          onSelect: vi.fn(),
          onStartEdit: vi.fn(),
          onDelete: vi.fn(),
          onResize: vi.fn(),
          onMove: moveSpy,
          snapToGrid,
          gridSize,
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

  if (wrapperRect) {
    Object.defineProperty(wrapper, "getBoundingClientRect", {
      configurable: true,
      value: () => wrapperRect,
    });
  }

  return {
    wrapper,
    canvas,
    onMove: moveSpy,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      canvas.remove();
    },
  };
}

interface SetupStoreOptions {
  showRulers?: boolean;
  selectedBlockIndices?: number[];
}

function setupSlidesStore(
  blocks: ContentBlock[],
  updateSlideSpy?: UpdateSlideSpy,
  options?: SetupStoreOptions
) {
  const slide: SlideState = {
    id: 1,
    sortOrder: 0,
    layout: "title_content",
    title: "Slide",
    subtitle: "",
    contentBlocks: blocks,
    speakerNotes: "",
  };

  const updateSpy: UpdateSlideSpy =
    updateSlideSpy ?? vi.fn<(id: number, data: Partial<SlideState>) => void>();

  useSlidesStore.setState({
    slides: [slide],
    activeSlideId: 1,
    selectedBlockIndices: new Set<number>(options?.selectedBlockIndices ?? []),
    editingBlockIndex: null,
    allBlocksSelected: false,
    clipboardBlocks: [],
    themeKey: "modern",
    themeConfig: PRESET_THEMES.modern,
    updateSlide: updateSpy as (id: number, data: Partial<SlideState>) => void,
    _debouncedSave: vi.fn(),
    showRulers: options?.showRulers ?? false,
    showGrid: false,
    gridSize: 5,
    snapToGrid: false,
  });

  return updateSpy;
}

function renderSlideCanvas() {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(createElement(SlideCanvasWYSIWYG));
  });

  return {
    host,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
  useSlidesStore.setState(useSlidesStore.getInitialState(), true);
  vi.clearAllMocks();
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("Block move behavior", () => {
  it("drag updates position correctly", () => {
    const result = renderMoveWrapper({
      wrapperRect: {
        left: 100,
        top: 50,
        width: 300,
        height: 100,
        right: 400,
        bottom: 150,
        x: 100,
        y: 50,
        toJSON: () => ({}),
      },
    });

    act(() => {
      result.wrapper.dispatchEvent(
        new MouseEvent("mousedown", { clientX: 100, clientY: 50, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 200, clientY: 100, bubbles: true })
      );
    });

    const ghost = result.canvas.querySelector('[data-drag-ghost="true"]');
    expect(ghost).not.toBeNull();

    act(() => {
      window.dispatchEvent(
        new MouseEvent("mouseup", { clientX: 200, clientY: 100, bubbles: true })
      );
    });

    expect(result.onMove).toHaveBeenCalledTimes(1);
    expect(result.onMove).toHaveBeenCalledWith({
      x: 20,
      y: 20,
      width: 30,
      height: 20,
    });

    result.cleanup();
  });

  it("snap-to-center locks to 50% when within 2% threshold", () => {
    const result = renderMoveWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
    });

    act(() => {
      result.wrapper.dispatchEvent(
        new MouseEvent("mousedown", { clientX: 0, clientY: 0, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 290, clientY: 0, bubbles: true })
      );
    });

    const verticalGuide = result.canvas.querySelector(
      '[data-alignment-guide-axis="vertical"]'
    );
    expect(verticalGuide).not.toBeNull();
    expect((verticalGuide as HTMLDivElement).style.borderLeft).toContain("dashed");

    act(() => {
      window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(result.onMove).toHaveBeenCalledWith({
      x: 40,
      y: 10,
      width: 20,
      height: 20,
    });

    result.cleanup();
  });

  it("snap-to-grid rounds move position to nearest grid point", () => {
    const result = renderMoveWrapper({
      initialPosition: { x: 10, y: 10, width: 20, height: 20 },
      snapToGrid: true,
      gridSize: 5,
    });

    act(() => {
      result.wrapper.dispatchEvent(
        new MouseEvent("mousedown", { clientX: 0, clientY: 0, bubbles: true })
      );
      window.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 123, clientY: 44, bubbles: true })
      );
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(result.onMove).toHaveBeenCalledWith({
      x: 20,
      y: 20,
      width: 20,
      height: 20,
    });

    result.cleanup();
  });

  it("blocks without position stay in flow layout", () => {
    setupSlidesStore([makeTextBlock()]);
    const { host, cleanup } = renderSlideCanvas();

    const wrapper = host.querySelector('[data-block-index="0"]');
    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect((wrapper as HTMLDivElement).className).not.toContain("absolute");
    expect((wrapper as HTMLDivElement).style.left).toBe("");
    expect((wrapper as HTMLDivElement).style.top).toBe("");

    cleanup();
  });

  it("blocks with position render absolutely", () => {
    setupSlidesStore([
      makeTextBlock({ x: 10, y: 20, width: 30, height: 15 }),
    ]);
    const { host, cleanup } = renderSlideCanvas();

    const wrapper = host.querySelector('[data-block-index="0"]');
    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect((wrapper as HTMLDivElement).className).toContain("absolute");
    expect((wrapper as HTMLDivElement).style.left).toBe("10%");
    expect((wrapper as HTMLDivElement).style.top).toBe("20%");
    expect((wrapper as HTMLDivElement).style.width).toBe("30%");
    expect((wrapper as HTMLDivElement).style.height).toBe("15%");

    cleanup();
  });

  it("preview hides, plays, and resets animated blocks on canvas", () => {
    vi.useFakeTimers();
    setupSlidesStore([
      makeTextBlock(undefined, {
        type: "fadeIn",
        delay: 0,
        duration: 0.1,
        order: 1,
      }),
    ]);
    const { host, cleanup } = renderSlideCanvas();

    const previewButton = host.querySelector('[data-testid="animation-timeline-preview"]');
    const content = host.querySelector(
      '[data-block-index="0"] [data-block-animation-content="true"]'
    ) as HTMLDivElement | null;

    expect(previewButton).toBeInstanceOf(HTMLButtonElement);
    expect(content).toBeInstanceOf(HTMLDivElement);
    expect((content as HTMLDivElement).style.opacity).toBe("1");

    act(() => {
      previewButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Preview starts from hidden state.
    expect((content as HTMLDivElement).style.opacity).toBe("0");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Preview completes and block returns to normal visible state.
    expect((content as HTMLDivElement).style.opacity).toBe("1");
    expect((previewButton as HTMLButtonElement).textContent).toContain("Preview");

    cleanup();
  });

  it("grid overlay is not rendered when showGrid is false", () => {
    setupSlidesStore([makeTextBlock()]);
    const { host, cleanup } = renderSlideCanvas();

    expect(host.querySelector('[data-testid="slide-grid-overlay"]')).toBeNull();

    cleanup();
  });

  it("ruler renders percentage tick labels in percent mode", () => {
    setupSlidesStore(
      [makeTextBlock({ x: 10, y: 20, width: 30, height: 15 })],
      undefined,
      { showRulers: true }
    );
    const { host, cleanup } = renderSlideCanvas();

    expect(host.querySelector('[data-testid="canvas-rulers"]')).not.toBeNull();
    expect(host.textContent).toContain("0%");
    expect(host.textContent).toContain("50%");
    expect(host.textContent).toContain("100%");

    cleanup();
  });

  it("mouse position indicator moves with cursor", () => {
    setupSlidesStore(
      [makeTextBlock({ x: 10, y: 20, width: 30, height: 15 })],
      undefined,
      { showRulers: true }
    );
    const { host, cleanup } = renderSlideCanvas();

    const surface = host.querySelector('[data-testid="slide-ruler-surface"]');
    if (!(surface instanceof HTMLDivElement)) {
      throw new Error("Ruler surface not found");
    }

    setElementRect(surface, {
      left: 0,
      top: 0,
      width: 1000,
      height: 500,
      right: 1000,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    act(() => {
      surface.dispatchEvent(
        new MouseEvent("mousemove", { bubbles: true, clientX: 250, clientY: 125 })
      );
    });

    const xIndicator = host.querySelector('[data-testid="ruler-mouse-indicator-x"]');
    const yIndicator = host.querySelector('[data-testid="ruler-mouse-indicator-y"]');
    expect(xIndicator).toBeInstanceOf(HTMLDivElement);
    expect(yIndicator).toBeInstanceOf(HTMLDivElement);
    expect((xIndicator as HTMLDivElement).style.left).toBe("25%");
    expect((yIndicator as HTMLDivElement).style.top).toBe("25%");

    cleanup();
  });

  it("selected block bounds highlight updates on rulers", async () => {
    setupSlidesStore(
      [makeTextBlock({ x: 10, y: 20, width: 30, height: 15 })],
      undefined,
      { showRulers: true, selectedBlockIndices: [0] }
    );
    const { host, cleanup } = renderSlideCanvas();

    const surface = host.querySelector('[data-testid="slide-ruler-surface"]');
    const block = host.querySelector('[data-block-index="0"]');
    if (!(surface instanceof HTMLDivElement) || !(block instanceof HTMLDivElement)) {
      throw new Error("Ruler test elements not found");
    }

    setElementRect(surface, {
      left: 0,
      top: 0,
      width: 1000,
      height: 500,
      right: 1000,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    setElementRect(block, {
      left: 100,
      top: 75,
      width: 300,
      height: 125,
      right: 400,
      bottom: 200,
      x: 100,
      y: 75,
      toJSON: () => ({}),
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });

    const xRegion = host.querySelector('[data-testid="ruler-selected-region-x"]');
    const yRegion = host.querySelector('[data-testid="ruler-selected-region-y"]');

    expect(xRegion).toBeInstanceOf(HTMLDivElement);
    expect(yRegion).toBeInstanceOf(HTMLDivElement);
    expect((xRegion as HTMLDivElement).style.left).toBe("10%");
    expect((xRegion as HTMLDivElement).style.width).toBe("30%");
    expect((yRegion as HTMLDivElement).style.top).toBe("15%");
    expect((yRegion as HTMLDivElement).style.height).toBe("25%");

    cleanup();
  });

  it("rulers are hidden when showRulers is false", () => {
    setupSlidesStore(
      [makeTextBlock({ x: 10, y: 20, width: 30, height: 15 })],
      undefined,
      { showRulers: false }
    );
    const { host, cleanup } = renderSlideCanvas();

    expect(host.querySelector('[data-testid="canvas-rulers"]')).toBeNull();

    cleanup();
  });

  it("Reset Position clears the position field", () => {
    const updateSlideSpy = vi.fn();
    setupSlidesStore([
      makeTextBlock({ x: 12, y: 18, width: 42, height: 20 }),
    ], updateSlideSpy);
    const { host, cleanup } = renderSlideCanvas();

    const wrapper = host.querySelector('[data-block-index="0"]');
    if (!(wrapper instanceof HTMLDivElement)) {
      throw new Error("Block wrapper not found");
    }

    act(() => {
      wrapper.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          clientX: 140,
          clientY: 120,
        })
      );
    });

    const resetButton = Array.from(
      document.querySelectorAll<HTMLButtonElement>('button[role="menuitem"]')
    ).find((button) => button.textContent?.trim() === "Reset Position");

    expect(resetButton).toBeInstanceOf(HTMLButtonElement);

    act(() => {
      resetButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(updateSlideSpy).toHaveBeenCalledTimes(1);
    expect(updateSlideSpy).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        contentBlocks: [
          expect.objectContaining({
            type: "text",
            position: undefined,
          }),
        ],
      })
    );

    cleanup();
  });
});
