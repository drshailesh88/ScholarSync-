// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { BLOCK_REGISTRY } from "@/components/slides/blocks";
import type { ContentBlock } from "@/types/presentation";
import { InsertMenu } from "../insert-menu";

interface RenderResult {
  onInsert: ReturnType<typeof vi.fn>;
  onClose: ReturnType<typeof vi.fn>;
  cleanup: () => void;
}

function renderInsertMenu(): RenderResult {
  const host = document.createElement("div");
  const anchor = document.createElement("button");
  document.body.appendChild(anchor);
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  const onInsert = vi.fn();
  const onClose = vi.fn();

  act(() => {
    root.render(
      <InsertMenu
        isOpen
        anchorRef={{ current: anchor }}
        onInsert={onInsert}
        onClose={onClose}
      />
    );
  });

  return {
    onInsert,
    onClose,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
      anchor.remove();
    },
  };
}

function getSearchInput(): HTMLInputElement {
  const input = document.querySelector("[data-testid='insert-menu-search']");
  if (!(input instanceof HTMLInputElement)) {
    throw new Error("Search input not found");
  }
  return input;
}

function getMenuItems(): HTMLButtonElement[] {
  return Array.from(
    document.querySelectorAll("[data-testid='insert-menu-item']")
  ).filter((item): item is HTMLButtonElement => item instanceof HTMLButtonElement);
}

function setSearchValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )?.set;
  valueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
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

describe("InsertMenu", () => {
  it("renders all 21 block types", () => {
    const result = renderInsertMenu();
    expect(getMenuItems()).toHaveLength(Object.keys(BLOCK_REGISTRY).length);
    result.cleanup();
  });

  it("filters items by search query", () => {
    const result = renderInsertMenu();
    const input = getSearchInput();

    act(() => {
      setSearchValue(input, "equa");
    });

    // empty state: no data scenario tested
    const visibleTypes = getMenuItems().map((item) => item.dataset.type);
    expect(visibleTypes).toEqual(["math"]);
    expect(document.body.textContent).toContain("Equation");

    result.cleanup();
  });

  it("groups items into content, media, and academic categories", () => {
    const result = renderInsertMenu();

    expect(document.body.textContent).toContain("Content");
    expect(document.body.textContent).toContain("Media");
    expect(document.body.textContent).toContain("Academic");

    for (const item of getMenuItems()) {
      const type = item.dataset.type as ContentBlock["type"] | undefined;
      const category = item.dataset.category;
      expect(type).toBeTruthy();
      if (!type) continue;
      expect(category).toBe(BLOCK_REGISTRY[type].category);
    }

    result.cleanup();
  });

  it("ArrowDown moves active selection to the next item", () => {
    const result = renderInsertMenu();
    const input = getSearchInput();

    act(() => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    });

    const activeItem = getMenuItems().find((item) => item.getAttribute("aria-current") === "true");
    expect(activeItem?.dataset.type).toBe("bullets");

    result.cleanup();
  });

  it("clicking an item calls onInsert with the selected type", () => {
    const result = renderInsertMenu();
    const mathButton = document.querySelector("[data-type='math']");
    if (!(mathButton instanceof HTMLButtonElement)) {
      throw new Error("Math item not found");
    }

    act(() => {
      mathButton.click();
    });

    expect(result.onInsert).toHaveBeenCalledWith("math");
    expect(result.onInsert).toHaveBeenCalledTimes(1);
    expect(result.onClose).toHaveBeenCalledTimes(1);

    result.cleanup();
  });

  it("shows shape submenu and inserts selected shape type", () => {
    const result = renderInsertMenu();
    const shapeButton = document.querySelector("[data-type='shape']");
    if (!(shapeButton instanceof HTMLButtonElement)) {
      throw new Error("Shape item not found");
    }

    act(() => {
      shapeButton.click();
    });

    const shapeItems = document.querySelectorAll("[data-testid='insert-menu-shape-item']");
    expect(shapeItems).toHaveLength(36);

    const starButton = document.querySelector("[data-shape-type='star']");
    if (!(starButton instanceof HTMLButtonElement)) {
      throw new Error("Star shape item not found");
    }

    act(() => {
      starButton.click();
    });

    expect(result.onInsert).toHaveBeenCalledWith("shape", { shapeType: "star" });
    expect(result.onClose).toHaveBeenCalledTimes(1);

    result.cleanup();
  });
});
