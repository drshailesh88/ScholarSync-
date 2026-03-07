// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createRoot } from "react-dom/client";
import { GridOverlay } from "../grid-overlay";
import { snapPercentToGrid } from "../grid-utils";

function renderOverlay(visible: boolean, gridSize: number) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(
      createElement(
        "div",
        { style: { position: "relative", width: 1000, height: 500 } },
        createElement(GridOverlay, { visible, gridSize })
      )
    );
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

afterEach(() => {
  document.body.innerHTML = "";
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("grid-overlay", () => {
  it("renders the expected number of lines for gridSize", () => {
    const { host, cleanup } = renderOverlay(true, 5);

    const vertical = host.querySelectorAll('[data-grid-line-axis="vertical"]');
    const horizontal = host.querySelectorAll('[data-grid-line-axis="horizontal"]');

    expect(vertical).toHaveLength(20);
    expect(horizontal).toHaveLength(20);

    cleanup();
  });

  it("does not render when disabled", () => {
    const { host, cleanup } = renderOverlay(false, 5);
    expect(host.querySelector('[data-testid="slide-grid-overlay"]')).toBeNull();
    cleanup();
  });

  it("uses pointer-events none", () => {
    const { host, cleanup } = renderOverlay(true, 5);
    const overlay = host.querySelector('[data-testid="slide-grid-overlay"]') as HTMLDivElement | null;
    expect(overlay).not.toBeNull();
    expect(overlay?.style.pointerEvents).toBe("none");
    cleanup();
  });

  it("snap-to-grid rounds to nearest grid point", () => {
    expect(snapPercentToGrid(12.2, 5)).toBe(10);
    expect(snapPercentToGrid(12.6, 5)).toBe(15);
    expect(snapPercentToGrid(47.49, 5)).toBe(45);
    expect(snapPercentToGrid(47.5, 5)).toBe(50);
  });
});
