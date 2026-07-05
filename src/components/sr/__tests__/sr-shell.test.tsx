// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SrShell } from "../sr-shell";
import { createMockReview } from "@/lib/sr/fixtures";
import { deriveFunnelSummary } from "@/lib/sr/funnel";

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

vi.mock("next/navigation", () => ({
  usePathname: () => "/systematic-review/sglt2-hf",
}));

const review = createMockReview();
const summary = deriveFunnelSummary(review);

describe("SrShell", () => {
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

  function render() {
    act(() => {
      root.render(
        <SrShell
          reviewId={review.id}
          projectTitle={review.shortTitle}
          projectMeta="Cochrane-style review · 3 reviewers"
          summary={summary}
        >
          <div data-testid="stage-content">stage body</div>
        </SrShell>,
      );
    });
  }

  it("frames stage content with the funnel rail inside the scoped skin", () => {
    render();
    expect(container.querySelector(".sr-module")).not.toBeNull();
    expect(container.querySelector(".rail")).not.toBeNull();
    expect(container.textContent).toContain("stage body");
    // Summary is the active stage for this pathname.
    const active = container.querySelector('[aria-current="page"]');
    expect(active?.textContent).toContain("Review Summary");
  });

  it("shows the amber cached-view banner while offline and clears it back online", () => {
    render();
    expect(container.querySelector(".offlinebar")).toBeNull();

    const onLine = vi.spyOn(window.navigator, "onLine", "get");
    onLine.mockReturnValue(false);
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(container.querySelector(".offlinebar")?.textContent).toContain(
      "Offline",
    );

    onLine.mockReturnValue(true);
    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    expect(container.querySelector(".offlinebar")).toBeNull();
    onLine.mockRestore();
  });
});
