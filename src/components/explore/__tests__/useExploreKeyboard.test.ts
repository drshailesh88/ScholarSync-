// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { useExploreKeyboard } from "../useExploreKeyboard";
import type { ExploreKeyboardActions } from "../useExploreKeyboard";

function press(key: string, opts: Partial<KeyboardEventInit> = {}) {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, ...opts })
  );
}

// Simple wrapper that renders hook state into DOM for inspection
function HookTester({
  resultCount,
  activeTab,
  hasSearched,
  actions,
}: {
  resultCount: number;
  activeTab: "academic" | "web" | "news" | "discussions" | "more";
  hasSearched: boolean;
  actions: ExploreKeyboardActions;
}) {
  const state = useExploreKeyboard(resultCount, activeTab, hasSearched, actions);
  return createElement(
    "div",
    { "data-testid": "hook-state" },
    createElement("span", { id: "highlighted" }, String(state.highlightedIndex)),
    createElement("span", { id: "selected" }, JSON.stringify([...state.selectedIndices])),
    createElement("span", { id: "overlay" }, String(state.shortcutsOverlayOpen))
  );
}

function createActions() {
  return {
    onTabChange: vi.fn() as unknown as ExploreKeyboardActions["onTabChange"],
    onSearch: vi.fn() as unknown as ExploreKeyboardActions["onSearch"],
    focusSearchBar: vi.fn() as unknown as ExploreKeyboardActions["focusSearchBar"],
    onSave: vi.fn() as unknown as ExploreKeyboardActions["onSave"],
    onOpen: vi.fn() as unknown as ExploreKeyboardActions["onOpen"],
    onSynthesize: vi.fn() as unknown as ExploreKeyboardActions["onSynthesize"],
  } satisfies ExploreKeyboardActions;
}

describe("useExploreKeyboard", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    (document.activeElement as HTMLElement)?.blur?.();
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function getHighlighted(): number {
    return Number(container.querySelector("#highlighted")?.textContent ?? "-1");
  }

  function getSelected(): number[] {
    return JSON.parse(
      container.querySelector("#selected")?.textContent ?? "[]"
    );
  }

  function getOverlay(): boolean {
    return container.querySelector("#overlay")?.textContent === "true";
  }

  it("j/k navigates highlighted index within bounds", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    expect(getHighlighted()).toBe(-1);

    act(() => press("j"));
    expect(getHighlighted()).toBe(0);

    act(() => press("j"));
    expect(getHighlighted()).toBe(1);

    act(() => press("k"));
    expect(getHighlighted()).toBe(0);

    act(() => press("k"));
    expect(getHighlighted()).toBe(0);
  });

  it("ArrowDown/ArrowUp also navigates", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 3,
          activeTab: "web",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("ArrowDown"));
    expect(getHighlighted()).toBe(0);

    act(() => press("ArrowDown"));
    expect(getHighlighted()).toBe(1);

    act(() => press("ArrowUp"));
    expect(getHighlighted()).toBe(0);
  });

  it("does not navigate beyond last result", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 2,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("j"));
    act(() => press("j"));
    expect(getHighlighted()).toBe(1);

    act(() => press("j"));
    expect(getHighlighted()).toBe(1);
  });

  it("/ focuses the search bar", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("/"));
    expect(actions.focusSearchBar).toHaveBeenCalledTimes(1);
  });

  it("1-4 switches tabs", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("1"));
    expect(actions.onTabChange).toHaveBeenCalledWith("academic");

    act(() => press("2"));
    expect(actions.onTabChange).toHaveBeenCalledWith("web");

    act(() => press("3"));
    expect(actions.onTabChange).toHaveBeenCalledWith("news");

    act(() => press("4"));
    expect(actions.onTabChange).toHaveBeenCalledWith("discussions");
  });

  it("] and [ cycle tabs", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("]"));
    expect(actions.onTabChange).toHaveBeenCalledWith("web");

    act(() => press("["));
    expect(actions.onTabChange).toHaveBeenCalledWith("more");
  });

  it("S triggers save on highlighted result", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("s"));
    expect(actions.onSave).not.toHaveBeenCalled();

    act(() => press("j"));
    act(() => press("s"));
    expect(actions.onSave).toHaveBeenCalledWith(0);
  });

  it("Q triggers synthesize", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("q"));
    expect(actions.onSynthesize).toHaveBeenCalledTimes(1);
  });

  it("X toggles selection on highlighted result", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("j"));
    act(() => press("x"));
    expect(getSelected()).toContain(0);

    act(() => press("x"));
    expect(getSelected()).not.toContain(0);
  });

  it("Shift+ArrowDown extends selection", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    act(() => press("j"));
    act(() => press("ArrowDown", { shiftKey: true }));
    expect(getHighlighted()).toBe(1);
    expect(getSelected()).toContain(1);
  });

  it("? toggles shortcuts overlay", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    expect(getOverlay()).toBe(false);

    act(() => press("?"));
    expect(getOverlay()).toBe(true);

    act(() => press("?"));
    expect(getOverlay()).toBe(false);
  });

  it("ignores shortcuts when an input is focused", () => {
    const actions = createActions();
    act(() => {
      root.render(
        createElement(HookTester, {
          resultCount: 5,
          activeTab: "academic",
          hasSearched: true,
          actions,
        })
      );
    });

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    act(() => press("j"));
    act(() => press("/"));

    expect(actions.focusSearchBar).not.toHaveBeenCalled();

    input.remove();
  });
});
