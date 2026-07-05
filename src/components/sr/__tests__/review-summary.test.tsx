// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReviewSummary } from "../summary/review-summary";
import {
  CURRENT_REVIEWER_ID,
  createEmptyReview,
  createMockReview,
} from "@/lib/sr/fixtures";
import { deriveFunnelSummary, deriveYourWork } from "@/lib/sr/funnel";

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

const review = createMockReview();
const summary = deriveFunnelSummary(review);
const yourWork = deriveYourWork(review, CURRENT_REVIEWER_ID);

describe("ReviewSummary", () => {
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

  function render(
    props: Partial<React.ComponentProps<typeof ReviewSummary>> = {},
  ) {
    act(() => {
      root.render(
        <ReviewSummary
          reviewId={review.id}
          reviewTitle={review.title}
          summary={summary}
          yourWork={yourWork}
          youFirstName="Shailesh"
          enabledStages={["summary", "import"]}
          {...props}
        />,
      );
    });
  }

  it("renders the four funnel stage cards with live counts", () => {
    render();
    const text = container.textContent ?? "";
    expect(text).toContain("Import references");
    expect(text).toContain("412 imported");
    expect(text).toContain("Title & abstract screening");
    expect(text).toContain("Full-text review");
    expect(text).toContain("124 to assess");
    expect(text).toContain("Extraction & quality assessment");
  });

  it("shows the AI strip with derived numbers and the system-of-record rule", () => {
    render();
    const text = container.textContent ?? "";
    expect(text).toContain("AI pre-screened 388 studies");
    expect(text).toContain("124 to include");
    expect(text).toContain("Human vote = system of record");
  });

  it("opens team progress with the four screening counters and contributions", () => {
    render();
    const text = container.textContent ?? "";
    expect(text).toContain("Team progress");
    expect(text).toContain("Done");
    expect(text).toContain("Conflicts");
    expect(text).toContain("One vote");
    expect(text).toContain("No votes");
    expect(text).toContain("Emma Reyes");
    expect(text).toContain("Katherine Ng");
  });

  it("gives the personal call to action with resolve/screen counts", () => {
    render();
    const text = container.textContent ?? "";
    expect(text).toContain("Shailesh, you can still");
    expect(text).toContain("74");
    expect(text).toContain("114");
  });

  it("disables CTAs whose stages are not built yet and links built ones", () => {
    render();
    const resolveBtn = Array.from(
      container.querySelectorAll("button, a"),
    ).find((el) => el.textContent?.includes("Resolve conflicts"));
    expect(resolveBtn?.tagName).toBe("BUTTON");
    expect(resolveBtn?.hasAttribute("disabled")).toBe(true);

    render({ enabledStages: ["summary", "import", "screen", "conflicts"] });
    const resolveLink = Array.from(container.querySelectorAll("a")).find(
      (el) => el.textContent?.includes("Resolve conflicts"),
    );
    expect(resolveLink?.getAttribute("href")).toBe(
      "/systematic-review/sglt2-hf/conflicts",
    );
  });

  it("toggles a collapsed stage card open on click", () => {
    render();
    const importCard = Array.from(
      container.querySelectorAll("section.fstage"),
    ).find((el) => el.textContent?.includes("Import references"));
    expect(importCard?.className).not.toContain("open");
    const toggle = importCard?.querySelector("[aria-expanded]");
    act(() => {
      toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(importCard?.className).toContain("open");
    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
  });

  it("renders first-run guidance when nothing has been imported", () => {
    const empty = createEmptyReview();
    render({
      reviewId: empty.id,
      reviewTitle: empty.title,
      summary: deriveFunnelSummary(empty),
      yourWork: deriveYourWork(empty, CURRENT_REVIEWER_ID),
    });
    const text = container.textContent ?? "";
    expect(text).toContain("No references yet");
    expect(text).toContain("Import your search results");
  });
});
