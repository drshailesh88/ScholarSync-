// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ActionsMenu } from "../ActionsMenu";

function makeCallbacks() {
  return {
    onSave: vi.fn(),
    onOpenOriginal: vi.fn(),
    onMoreFromSource: vi.fn(),
    onCopyLink: vi.fn(),
    onBlock: vi.fn(),
  };
}

describe("ActionsMenu", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders trigger button", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]');
    expect(trigger).toBeTruthy();
    expect(trigger?.getAttribute("aria-label")).toBe("More actions");
  });

  it("opens dropdown on click", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    expect(container.querySelector('[data-testid="actions-menu-dropdown"]')).toBeNull();

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    expect(container.querySelector('[data-testid="actions-menu-dropdown"]')).toBeTruthy();
  });

  it("shows all menu items with keyboard shortcuts", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    const dropdown = container.querySelector('[data-testid="actions-menu-dropdown"]')!;
    const text = dropdown.textContent!;

    expect(text).toContain("Save to Library");
    expect(text).toContain("Open Original");
    expect(text).toContain("More from this source");
    expect(text).toContain("Copy Link");
    expect(text).toContain("Block this source");

    // Removed stubs should not appear
    expect(text).not.toContain("Save to Project");
    expect(text).not.toContain("Cite in Draft");
    expect(text).not.toContain("Summarize Page");
    expect(text).not.toContain("Ask About Page");

    // Keyboard shortcut labels
    expect(text).toContain("S");
    expect(text).toContain("O");
    expect(text).toContain("B");
  });

  it("hides Save to Library when already saved", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={true} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    const menuItems = container.querySelectorAll('[role="menuitem"]');
    const labels = Array.from(menuItems).map((el) => el.textContent);
    expect(labels.some((l) => l?.includes("Save to Library"))).toBe(false);
  });

  it("calls the correct callback when clicking menu items", () => {
    const callbacks = makeCallbacks();
    act(() => {
      root.render(
        <ActionsMenu callbacks={callbacks} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    const menuItems = container.querySelectorAll('[role="menuitem"]');
    // Click "Block this source"
    const blockItem = Array.from(menuItems).find(
      (el) => el.textContent?.includes("Block this source")
    ) as HTMLButtonElement;
    expect(blockItem).toBeTruthy();

    act(() => {
      blockItem.click();
    });

    expect(callbacks.onBlock).toHaveBeenCalledOnce();
  });

  it("closes dropdown after item click", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    const menuItems = container.querySelectorAll('[role="menuitem"]');
    act(() => {
      (menuItems[0] as HTMLButtonElement).click();
    });

    expect(container.querySelector('[data-testid="actions-menu-dropdown"]')).toBeNull();
  });

  it("closes on Escape key", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    act(() => {
      trigger.click();
    });

    expect(container.querySelector('[data-testid="actions-menu-dropdown"]')).toBeTruthy();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(container.querySelector('[data-testid="actions-menu-dropdown"]')).toBeNull();
  });

  it("has proper ARIA attributes", () => {
    act(() => {
      root.render(
        <ActionsMenu callbacks={makeCallbacks()} isSaved={false} />
      );
    });

    const trigger = container.querySelector('[data-testid="actions-menu-trigger"]') as HTMLButtonElement;
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    act(() => {
      trigger.click();
    });

    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    const dropdown = container.querySelector('[data-testid="actions-menu-dropdown"]');
    expect(dropdown?.getAttribute("role")).toBe("menu");
  });
});
