// @vitest-environment jsdom

import { act } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import {
  ContextMenu,
  type ContextMenuItem,
} from "../context-menu";

interface RenderResult {
  onClose: ReturnType<typeof vi.fn>;
  cleanup: () => void;
}

function renderMenu(items: ContextMenuItem[]): RenderResult {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);
  const onClose = vi.fn();

  act(() => {
    root.render(
      <ContextMenu
        isOpen
        position={{ x: 120, y: 140 }}
        items={items}
        onClose={onClose}
      />
    );
  });

  return {
    onClose,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

function getMenuButton(label: string): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll("button")).find((candidate) =>
    candidate.textContent?.includes(label)
  );
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Button not found: ${label}`);
  }
  return button;
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

describe("ContextMenu", () => {
  it("renders with the provided items", () => {
    const result = renderMenu([
      { label: "New Slide", onClick: vi.fn() },
      { label: "Duplicate", onClick: vi.fn() },
      { label: "divider", divider: true, onClick: vi.fn() },
      { label: "Delete", danger: true, onClick: vi.fn() },
    ]);

    expect(document.querySelector('[data-testid="context-menu"]')).not.toBeNull();
    expect(document.body.textContent).toContain("New Slide");
    expect(document.body.textContent).toContain("Duplicate");
    expect(document.body.textContent).toContain("Delete");

    result.cleanup();
  });

  it("clicking an item triggers onClick and closes the menu", () => {
    const itemClick = vi.fn();
    const result = renderMenu([{ label: "Copy", onClick: itemClick }]);

    act(() => {
      getMenuButton("Copy").click();
    });

    expect(itemClick).toHaveBeenCalledTimes(1);
    expect(result.onClose).toHaveBeenCalledTimes(1);

    result.cleanup();
  });

  it("Escape key closes the menu", () => {
    const result = renderMenu([{ label: "Paste", onClick: vi.fn() }]);

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
    });

    expect(result.onClose).toHaveBeenCalledTimes(1);

    result.cleanup();
  });

  it("disabled items do not trigger onClick", () => {
    const itemClick = vi.fn();
    const result = renderMenu([
      { label: "Paste", disabled: true, onClick: itemClick },
    ]);

    act(() => {
      getMenuButton("Paste").click();
    });

    expect(itemClick).not.toHaveBeenCalled();
    expect(result.onClose).not.toHaveBeenCalled();

    result.cleanup();
  });

  it("danger items apply the red text style", () => {
    const result = renderMenu([
      { label: "Delete", danger: true, onClick: vi.fn() },
    ]);

    const deleteButton = getMenuButton("Delete");
    expect(deleteButton.className).toContain("text-red-500");

    result.cleanup();
  });
});
