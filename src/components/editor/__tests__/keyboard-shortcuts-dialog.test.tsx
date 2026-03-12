// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { KeyboardShortcutsDialog } from "../KeyboardShortcutsDialog";

function renderDialog(isOpen: boolean, onClose = vi.fn()) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(createElement(KeyboardShortcutsDialog, { isOpen, onClose }));
  });

  return {
    host,
    onClose,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

afterEach(() => {
  document.body.innerHTML = "";
});

beforeAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("KeyboardShortcutsDialog", () => {
  it("renders nothing when closed", () => {
    const { host, cleanup } = renderDialog(false);
    expect(host.textContent).toBe("");
    cleanup();
  });

  it("renders the header, categories, and expected shortcut descriptions when open", () => {
    const { host, cleanup } = renderDialog(true);

    const title = host.textContent ?? "";
    expect(title).toContain("Keyboard Shortcuts");

    const headers = Array.from(host.querySelectorAll("h3")).map((el) =>
      el.textContent?.trim()
    );
    expect(headers).toEqual([
      "Formatting",
      "Structure",
      "Academic",
      "Tools",
    ]);

    expect(title).toContain("Bold");
    expect(title).toContain("Italic");
    expect(title).toContain("Underline");
    expect(title).toContain("Heading 1");
    expect(title).toContain("Heading 4");
    expect(title).toContain("Insert Citation");
    expect(title).toContain("Toggle Comments");
    expect(title).toContain("Slash Commands");

    const grids = Array.from(host.querySelectorAll(".grid.grid-cols-2.gap-2"));
    expect(grids).toHaveLength(4);

    cleanup();
  });

  it("shows keyboard key pills for multi-key shortcuts", () => {
    const { host, cleanup } = renderDialog(true);

    const pills = Array.from(host.querySelectorAll("span"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean);

    expect(pills).toContain("Cmd");
    expect(pills).toContain("Shift");
    expect(pills).toContain("Enter");
    expect(pills).toContain("/");

    cleanup();
  });

  it("clicking the backdrop closes the dialog, but clicking inside does not", () => {
    const { host, onClose, cleanup } = renderDialog(true);

    const backdrop = host.querySelector(".fixed.inset-0") as HTMLDivElement | null;
    const panel = host.querySelector(".max-w-2xl") as HTMLDivElement | null;

    expect(backdrop).not.toBeNull();
    expect(panel).not.toBeNull();

    act(() => {
      panel?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      backdrop?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledOnce();

    cleanup();
  });
});
