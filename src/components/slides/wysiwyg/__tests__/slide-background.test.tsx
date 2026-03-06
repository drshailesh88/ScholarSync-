// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { useSlidesStore, type SlideState } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";
import { getSlideBackgroundStyle } from "@/components/slides/shared/slide-background";

vi.mock("../editable-text-block", () => ({
  EditableTextBlock: ({ content }: { content: string }) =>
    createElement("div", null, content),
  EditableBulletsBlock: () => null,
}));

vi.mock("../block-inserter", () => ({
  BlockInserter: () => null,
}));

import { SlideCanvasWYSIWYG } from "../slide-canvas-wysiwyg";

function renderCanvas(slideOverrides: Partial<SlideState>) {
  const slide: SlideState = {
    id: 1,
    sortOrder: 0,
    layout: "title_content",
    title: "Slide",
    subtitle: "Subtitle",
    contentBlocks: [],
    speakerNotes: "",
    ...slideOverrides,
  };

  useSlidesStore.setState({
    slides: [slide],
    activeSlideId: 1,
    themeKey: "modern",
    themeConfig: PRESET_THEMES.modern,
    selectedBlockIndices: new Set<number>(),
    editingBlockIndex: null,
    allBlocksSelected: false,
  });

  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

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

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

afterEach(() => {
  document.body.innerHTML = "";
  useSlidesStore.setState(useSlidesStore.getInitialState(), true);
  vi.clearAllMocks();
});

describe("Slide background rendering", () => {
  it("renders color background as frame backgroundColor", () => {
    const { host, cleanup } = renderCanvas({
      cardBackground: { color: "#112233" },
    });

    const frame = host.querySelector(".aspect-video") as HTMLDivElement | null;
    expect(frame).not.toBeNull();
    expect(frame?.style.backgroundColor).toBe("rgb(17, 34, 51)");

    cleanup();
  });

  it("renders gradient background as linear-gradient CSS", () => {
    const style = getSlideBackgroundStyle({
      gradientEnabled: true,
      gradientFrom: "#111111",
      gradientTo: "#222222",
      gradientDirection: "left-to-right",
    });

    expect(style.background).toBe("linear-gradient(to right, #111111, #222222)");
  });

  it("renders image background with backgroundImage style", () => {
    const { host, cleanup } = renderCanvas({
      cardBackground: {
        imageUrl: "https://example.com/bg.png",
        imagePosition: "contain",
      },
    });

    const frame = host.querySelector(".aspect-video") as HTMLDivElement | null;
    expect(frame).not.toBeNull();
    expect(frame?.style.backgroundImage).toContain("https://example.com/bg.png");
    expect(frame?.style.backgroundSize).toBe("contain");

    cleanup();
  });

  it("shows overlay with opacity from intensity", () => {
    const { host, cleanup } = renderCanvas({
      cardBackground: {
        imageUrl: "https://example.com/bg.png",
        overlayType: "frosted",
        overlayIntensity: 35,
        overlayColor: "#123456",
      },
    });

    const overlay = host.querySelector('[data-testid="slide-background-overlay"]') as HTMLDivElement | null;
    expect(overlay).not.toBeNull();
    expect(overlay?.style.opacity).toBe("0.35");

    cleanup();
  });
});
