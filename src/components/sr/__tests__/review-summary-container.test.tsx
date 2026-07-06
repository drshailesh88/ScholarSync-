// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewSummaryContainer } from "../summary/review-summary-container";
import { deriveDupeQueue } from "@/lib/sr/import";
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

describe("ReviewSummaryContainer", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("reflects store mutations live — a merged duplicate moves the counts", () => {
    act(() => {
      root.render(<ReviewSummaryContainer reviewId="sglt2-hf" />);
    });
    expect(container.textContent).toContain("114 to screen");

    const target = deriveDupeQueue(useSrStore.getState().review!)[0]
      .candidate.id;
    act(() => {
      useSrStore.getState().mergeDuplicate(target);
    });

    expect(container.textContent).toContain("113 to screen");
    expect(container.textContent).toContain("25 duplicates removed");
  });
});
