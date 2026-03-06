// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { useSlidesStore, type SlideState } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";

vi.mock("@/components/presentation/theme-picker", () => ({
  ThemePicker: () => createElement("div"),
}));

vi.mock("@/components/presentation/layout-picker", () => ({
  LayoutPicker: () => createElement("div"),
}));

vi.mock("@/components/presentation/ai-tools-dropdown", () => ({
  AiToolsDropdown: () => createElement("div"),
}));

vi.mock("@/components/presentation/coach-panel", () => ({
  CoachPanel: () => createElement("div"),
}));

vi.mock("../block-property-editor", () => ({
  BlockPropertyEditor: () => createElement("div"),
}));

import { PropertiesPanel } from "../properties-panel";

function renderPanel(updateSlideSpy: ReturnType<typeof vi.fn>) {
  const slide: SlideState = {
    id: 1,
    sortOrder: 0,
    layout: "title_content",
    title: "Slide",
    subtitle: "",
    contentBlocks: [
      {
        type: "text",
        data: { text: "Rotate me", style: "body" },
      },
    ],
    speakerNotes: "",
    cardBackground: { color: "#112233" },
  };

  act(() => {
    useSlidesStore.setState({
      slides: [slide],
      activeSlideId: 1,
      themeKey: "modern",
      themeConfig: PRESET_THEMES.modern,
      updateSlide: updateSlideSpy as (id: number, data: Partial<SlideState>) => void,
    });
    useSlidesStore.getState().selectBlock(0);
  });

  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  act(() => {
    root.render(createElement(PropertiesPanel));
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

describe("Properties panel transform controls", () => {
  it("persists rotation updates in selected block data", () => {
    const updateSlideSpy = vi.fn<(id: number, data: Partial<SlideState>) => void>();
    const { host, cleanup } = renderPanel(updateSlideSpy);

    const rotate90Button = Array.from(host.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "90°"
    );
    if (!(rotate90Button instanceof HTMLButtonElement)) {
      throw new Error("90 degree button not found");
    }

    act(() => {
      rotate90Button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(updateSlideSpy).toHaveBeenCalledWith(1, {
      contentBlocks: [
        {
          type: "text",
          data: { text: "Rotate me", style: "body" },
          rotation: 90,
        },
      ],
    });

    cleanup();
  });

  it("flip controls update horizontal and vertical scale", () => {
    const updateSlideSpy = vi.fn<(id: number, data: Partial<SlideState>) => void>();
    const { host, cleanup } = renderPanel(updateSlideSpy);

    const flipHorizontalButton = Array.from(host.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Flip Horizontal"
    );
    const flipVerticalButton = Array.from(host.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Flip Vertical"
    );
    if (!(flipHorizontalButton instanceof HTMLButtonElement) || !(flipVerticalButton instanceof HTMLButtonElement)) {
      throw new Error("Flip buttons not found");
    }

    act(() => {
      flipHorizontalButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      flipVerticalButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(updateSlideSpy).toHaveBeenNthCalledWith(1, 1, {
      contentBlocks: [
        {
          type: "text",
          data: { text: "Rotate me", style: "body" },
          scaleX: -1,
        },
      ],
    });

    expect(updateSlideSpy).toHaveBeenNthCalledWith(2, 1, {
      contentBlocks: [
        {
          type: "text",
          data: { text: "Rotate me", style: "body" },
          scaleY: -1,
        },
      ],
    });

    cleanup();
  });
});
