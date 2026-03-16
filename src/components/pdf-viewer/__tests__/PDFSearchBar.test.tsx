// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PDFSearchBar } from "../PDFSearchBar";

describe("PDFSearchBar", () => {
  let container: HTMLDivElement;
  let root: Root;

  const onClose = vi.fn();
  const onSearch = vi.fn();
  const onNextMatch = vi.fn();
  const onPrevMatch = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
    onSearch.mockReset();
    onNextMatch.mockReset();
    onPrevMatch.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("does not render when closed", () => {
    act(() => {
      root.render(
        <PDFSearchBar
          isOpen={false}
          onClose={onClose}
          onSearch={onSearch}
          onNextMatch={onNextMatch}
          onPrevMatch={onPrevMatch}
          matchCount={0}
          currentMatch={0}
        />,
      );
    });

    expect(container.textContent).toBe("");
  });

  it("updates query and search callbacks", async () => {
    act(() => {
      root.render(
        <PDFSearchBar
          isOpen
          onClose={onClose}
          onSearch={onSearch}
          onNextMatch={onNextMatch}
          onPrevMatch={onPrevMatch}
          matchCount={3}
          currentMatch={1}
        />,
      );
    });

    const input = container.querySelector("input") as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    await act(async () => {
      setter?.call(input, "aspirin");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    expect(onSearch).toHaveBeenCalledWith("aspirin");
    expect(container.textContent).toContain("1/3");
  });

  it("handles keyboard and navigation actions", async () => {
    act(() => {
      root.render(
        <PDFSearchBar
          isOpen
          onClose={onClose}
          onSearch={onSearch}
          onNextMatch={onNextMatch}
          onPrevMatch={onPrevMatch}
          matchCount={2}
          currentMatch={1}
        />,
      );
    });

    const input = container.querySelector("input") as HTMLInputElement;
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", shiftKey: true, bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onNextMatch).toHaveBeenCalled();
    expect(onPrevMatch).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
