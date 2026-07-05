// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConflictsScreen } from "../conflicts/conflicts-screen";
import { useSrStore } from "@/stores/sr-store";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

function findByText(text: string, selector = "button") {
  return Array.from(document.querySelectorAll(selector)).find((el) =>
    el.textContent?.includes(text),
  );
}

describe("ConflictsScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<ConflictsScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the two conflict-type tabs with counts", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Decision conflicts");
    expect(text).toContain("74");
    expect(text).toContain("Reason conflicts");
  });

  it("shows the kappa readout with its label", () => {
    const text = container.textContent ?? "";
    expect(text).toMatch(/κ|Cohen/);
    expect(text).toMatch(/Moderate|Substantial|Fair|Slight|Almost perfect/);
  });

  it("names who voted but hides what they voted (anti-anchoring)", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Emma Reyes");
    expect(text).toContain("Katherine Ng");
    expect(text).toContain("voted");
    expect(text).not.toMatch(/voted:? (yes|no|maybe)/i);
  });

  it("records an agreed final decision that clears the conflict", () => {
    expect(container.textContent).toContain("Conflict 1 of 74");

    act(() => {
      (findByText("Yes", ".vote") as HTMLElement)?.dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });

    // The resolved study leaves the conflict queue.
    expect(container.textContent).toContain("Conflict 1 of 73");
  });

  it("states the resolver permission rule", () => {
    expect(container.textContent).toContain("1st or 2nd reviewer");
  });
});
