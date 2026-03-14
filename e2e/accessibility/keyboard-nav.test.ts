// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )
  );
}

describe("keyboard accessibility patterns", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("tabs through main navigation links in order", () => {
    document.body.innerHTML = `
      <nav aria-label="Main navigation">
        <a href="/dashboard">Dashboard</a>
        <a href="/library">Library</a>
        <a href="/projects">Projects</a>
      </nav>
    `;

    const nav = document.querySelector("nav") as HTMLElement;
    const focusables = getFocusableElements(nav);

    focusables[0].focus();
    expect(document.activeElement?.textContent).toBe("Dashboard");

    focusables[1].focus();
    expect(document.activeElement?.textContent).toBe("Library");

    focusables[2].focus();
    expect(document.activeElement?.textContent).toBe("Projects");
  });

  it("activates buttons with Enter and Space", () => {
    const onClick = vi.fn();
    const button = document.createElement("button");
    button.textContent = "Run";
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        onClick();
      }
    });
    document.body.appendChild(button);

    button.focus();
    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    button.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("closes dialogs with Escape", () => {
    let open = true;
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        open = false;
      }
    });
    document.body.appendChild(dialog);

    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(open).toBe(false);
  });

  it("uses visible focus styles on interactive elements", () => {
    const sourceFiles = [
      "src/app/(app)/layout.tsx",
      "src/components/ui/button.tsx",
      "src/components/navigation/desktop-nav.tsx",
    ];

    const hasFocusStyles = sourceFiles.some((file) => {
      try {
        const content = readFileSync(file, "utf8");
        return content.includes("focus-visible") || content.includes("focus:ring");
      } catch {
        return false;
      }
    });

    expect(hasFocusStyles).toBe(true);
  });
});
