// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { JournalQuartileBadge } from "../JournalQuartileBadge";

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

describe("JournalQuartileBadge", () => {
  it("renders the quartile label for a rated journal", () => {
    act(() => root.render(<JournalQuartileBadge quartile="Q1" />));
    expect(container.textContent).toContain("Q1");
    // emerald is the Q1 colour (matches journal-quality QUARTILE_COLORS)
    expect(container.querySelector("span")?.className).toContain("emerald");
  });

  it("uses a distinct colour per quartile", () => {
    act(() => root.render(<JournalQuartileBadge quartile="Q3" />));
    expect(container.textContent).toContain("Q3");
    expect(container.querySelector("span")?.className).toContain("amber");
  });

  it("renders nothing for an unrated journal (null / undefined)", () => {
    act(() => root.render(<JournalQuartileBadge quartile={null} />));
    expect(container.querySelector("span")).toBeNull();
    act(() => root.render(<JournalQuartileBadge quartile={undefined} />));
    expect(container.querySelector("span")).toBeNull();
  });
});
