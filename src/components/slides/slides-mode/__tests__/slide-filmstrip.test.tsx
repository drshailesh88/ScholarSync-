// @vitest-environment jsdom

import { act } from "react";
import type { ReactNode } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { SlideFilmstrip } from "../slide-filmstrip";
import {
  useSlidesStore,
  type SlideState,
  type SlidesStore,
} from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  closestCenter: () => null,
  KeyboardSensor: class {},
  PointerSensor: class {},
  useSensor: () => ({}),
  useSensors: (...sensors: unknown[]) => sensors,
}));

vi.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  sortableKeyboardCoordinates: () => ({ x: 0, y: 0 }),
  verticalListSortingStrategy: {},
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: "",
    isDragging: false,
  }),
}));

vi.mock("@dnd-kit/utilities", () => ({
  CSS: {
    Transform: {
      toString: () => undefined,
    },
  },
}));

interface RenderResult {
  cleanup: () => void;
}

interface FilmstripSpies {
  setActiveSlide: ReturnType<typeof vi.fn>;
  addSlide: ReturnType<typeof vi.fn>;
  deleteSlide: ReturnType<typeof vi.fn>;
  duplicateSlide: ReturnType<typeof vi.fn>;
  copySlide: ReturnType<typeof vi.fn>;
  pasteSlide: ReturnType<typeof vi.fn>;
  reorderSlides: ReturnType<typeof vi.fn>;
  updateSlide: ReturnType<typeof vi.fn>;
}

function getSlide(id: number, sortOrder: number, hidden = false): SlideState {
  return {
    id,
    sortOrder,
    layout: "title_content",
    title: `Slide ${id}`,
    subtitle: "",
    contentBlocks: [],
    speakerNotes: "",
    hidden,
  };
}

function renderFilmstrip(overrides: Partial<FilmstripSpies> = {}): RenderResult {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);
  const spies = createSpies(overrides);

  useSlidesStore.setState({
    slides: [getSlide(1, 0), getSlide(2, 1), getSlide(3, 2)],
    activeSlideId: 1,
    themeKey: "modern",
    themeConfig: PRESET_THEMES.modern,
    setActiveSlide: spies.setActiveSlide as SlidesStore["setActiveSlide"],
    addSlide: spies.addSlide as SlidesStore["addSlide"],
    deleteSlide: spies.deleteSlide as SlidesStore["deleteSlide"],
    duplicateSlide: spies.duplicateSlide as SlidesStore["duplicateSlide"],
    copySlide: spies.copySlide as SlidesStore["copySlide"],
    pasteSlide: spies.pasteSlide as SlidesStore["pasteSlide"],
    reorderSlides: spies.reorderSlides as SlidesStore["reorderSlides"],
    updateSlide: spies.updateSlide as SlidesStore["updateSlide"],
    clipboardSlide: null,
  });

  act(() => {
    root.render(<SlideFilmstrip />);
  });

  return {
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

function createSpies(overrides: Partial<FilmstripSpies> = {}): FilmstripSpies {
  return {
    setActiveSlide: overrides.setActiveSlide ?? vi.fn(),
    addSlide: overrides.addSlide ?? vi.fn(async () => null),
    deleteSlide: overrides.deleteSlide ?? vi.fn(async () => undefined),
    duplicateSlide: overrides.duplicateSlide ?? vi.fn(async () => undefined),
    copySlide: overrides.copySlide ?? vi.fn(),
    pasteSlide: overrides.pasteSlide ?? vi.fn(async () => undefined),
    reorderSlides: overrides.reorderSlides ?? vi.fn(async () => undefined),
    updateSlide: overrides.updateSlide ?? vi.fn(),
  };
}

function openContextMenu(slideId: number) {
  const slide = document.querySelector(
    `[data-testid="filmstrip-slide-${slideId}"] button`
  );
  if (!(slide instanceof HTMLButtonElement)) {
    throw new Error(`Slide button not found: ${slideId}`);
  }

  act(() => {
    slide.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        clientX: 120,
        clientY: 140,
      })
    );
  });
}

function clickMenuItem(label: string) {
  const menu = document.querySelector('[data-testid="context-menu"]');
  if (!(menu instanceof HTMLElement)) {
    throw new Error("Context menu not found");
  }
  const button = Array.from(menu.querySelectorAll("button")).find((node) =>
    node.textContent?.includes(label)
  );
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Menu item not found: ${label}`);
  }

  act(() => {
    button.click();
  });
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

describe("SlideFilmstrip context menu", () => {
  it("Hide Slide toggles hidden field", () => {
    const updateSlide = vi.fn();
    const { cleanup } = renderFilmstrip({ updateSlide });

    openContextMenu(1);
    clickMenuItem("Hide Slide");

    expect(updateSlide).toHaveBeenCalledWith(1, { hidden: true });
    cleanup();
  });

  it("hidden slides have faded opacity styling", () => {
    const { cleanup } = renderFilmstrip();
    act(() => {
      useSlidesStore.setState({
        slides: [getSlide(1, 0, true), getSlide(2, 1), getSlide(3, 2)],
      });
    });

    const hiddenSlide = document.querySelector('[data-testid="filmstrip-slide-1"]');
    expect(hiddenSlide?.className).toContain("opacity-50");
    expect(document.querySelector('[aria-label="Hidden slide"]')).not.toBeNull();
    cleanup();
  });

  it("Move to Beginning reorders slide ids", () => {
    const reorderSlides = vi.fn(async () => undefined);
    const { cleanup } = renderFilmstrip({ reorderSlides });

    openContextMenu(3);
    clickMenuItem("Move to Beginning");

    expect(reorderSlides).toHaveBeenCalledWith([3, 1, 2]);
    cleanup();
  });

  it("Move to End reorders slide ids", () => {
    const reorderSlides = vi.fn(async () => undefined);
    const { cleanup } = renderFilmstrip({ reorderSlides });

    openContextMenu(1);
    clickMenuItem("Move to End");

    expect(reorderSlides).toHaveBeenCalledWith([2, 3, 1]);
    cleanup();
  });

  it("Cut Slide copies then deletes", () => {
    const copySlide = vi.fn();
    const deleteSlide = vi.fn(async () => undefined);
    const { cleanup } = renderFilmstrip({ copySlide, deleteSlide });

    openContextMenu(2);
    clickMenuItem("Cut Slide");

    expect(copySlide).toHaveBeenCalledWith(2);
    expect(deleteSlide).toHaveBeenCalledWith(2);
    cleanup();
  });
});
