// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import type { ContentBlock, BlockAnimation } from "@/types/presentation";
import { AnimationTimeline } from "../animation-timeline";

function makeTextBlock(animation?: BlockAnimation): ContentBlock {
  return {
    type: "text",
    data: { text: "Block", style: "body" },
    animation,
  };
}

function renderTimeline(props?: {
  blocks?: ContentBlock[];
  onSelectBlock?: ReturnType<typeof vi.fn<(index: number) => void>>;
  onUpdateAnimation?: ReturnType<typeof vi.fn<(index: number, patch: Partial<BlockAnimation>) => void>>;
  onPreview?: ReturnType<typeof vi.fn<() => void>>;
}) {
  const blocks = props?.blocks ?? [
    makeTextBlock({ type: "fadeIn", delay: 1, duration: 2, order: 2 }),
    makeTextBlock({ type: "slideUp", delay: 0.5, duration: 1, order: 1 }),
  ];

  const onSelectBlock = props?.onSelectBlock ?? vi.fn<(index: number) => void>();
  const onUpdateAnimation = props?.onUpdateAnimation ?? vi.fn<(index: number, patch: Partial<BlockAnimation>) => void>();
  const onPreview = props?.onPreview ?? vi.fn<() => void>();

  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  act(() => {
    root.render(
      createElement(AnimationTimeline, {
        blocks,
        selectedBlockIndex: null,
        onSelectBlock,
        onUpdateAnimation,
        onPreview,
      })
    );
  });

  return {
    host,
    onSelectBlock,
    onUpdateAnimation,
    onPreview,
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

describe("AnimationTimeline", () => {
  it("renders bar positions from delay and duration", () => {
    const { host, cleanup } = renderTimeline();

    const firstBar = host.querySelector('[data-testid="animation-timeline-bar-0"]') as HTMLButtonElement | null;
    const secondBar = host.querySelector('[data-testid="animation-timeline-bar-1"]') as HTMLButtonElement | null;

    expect(firstBar).not.toBeNull();
    expect(secondBar).not.toBeNull();

    // PIXELS_PER_SECOND is 80 in animation-timeline.tsx.
    expect(firstBar?.style.left).toBe("80px");
    expect(firstBar?.style.width).toBe("160px");
    expect(secondBar?.style.left).toBe("40px");
    expect(secondBar?.style.width).toBe("80px");

    cleanup();
  });

  it("selects block on bar click", () => {
    const { host, onSelectBlock, cleanup } = renderTimeline();

    const bar = host.querySelector('[data-testid="animation-timeline-bar-1"]');
    expect(bar).not.toBeNull();

    act(() => {
      bar?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onSelectBlock).toHaveBeenCalledWith(1);

    cleanup();
  });
});
