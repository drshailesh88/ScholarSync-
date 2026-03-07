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
    contentBlocks: [],
    speakerNotes: "",
    cardBackground: { color: "#112233" },
  };

  useSlidesStore.setState({
    slides: [slide],
    activeSlideId: 1,
    themeKey: "modern",
    themeConfig: PRESET_THEMES.modern,
    updateSlide: updateSlideSpy as (id: number, data: Partial<SlideState>) => void,
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

describe("Properties panel background reset", () => {
  it("Reset clears cardBackground to undefined", () => {
    const updateSlideSpy = vi.fn<(id: number, data: Partial<SlideState>) => void>();
    const { host, cleanup } = renderPanel(updateSlideSpy);

    const resetButton = Array.from(host.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Reset to Theme Default"
    ) as HTMLButtonElement | undefined;

    expect(resetButton).toBeDefined();

    act(() => {
      resetButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(updateSlideSpy).toHaveBeenCalledWith(1, { cardBackground: undefined });

    cleanup();
  });
});
