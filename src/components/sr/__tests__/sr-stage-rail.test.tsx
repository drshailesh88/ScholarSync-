// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SrStageRail } from "../sr-stage-rail";
import { createMockReview } from "@/lib/sr/fixtures";
import { deriveFunnelSummary } from "@/lib/sr/funnel";
import { buildStageRail } from "@/lib/sr/stage-rail";

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
const items = buildStageRail(summary, {
  reviewId: review.id,
  activeStage: "summary",
  enabledStages: ["summary", "import"],
});

describe("SrStageRail", () => {
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
        <SrStageRail
          items={items}
          projectTitle={review.shortTitle}
          projectMeta="Cochrane-style review · 2 reviewers"
        />,
      );
    });
  }

  it("renders the project identity and every funnel stage", () => {
    render();
    expect(container.textContent).toContain("SGLT2i & HF");
    for (const label of [
      "Review Summary",
      "Import",
      "Title & abstract",
      "Resolve conflicts",
      "Full-text review",
      "Risk of bias",
      "Data extraction",
      "PRISMA",
      "Report",
      "Export",
    ]) {
      expect(container.textContent).toContain(label);
    }
  });

  it("marks the active stage with aria-current", () => {
    render();
    const active = container.querySelector('[aria-current="page"]');
    expect(active?.textContent).toContain("Review Summary");
  });

  it("links enabled stages and locks unbuilt ones", () => {
    render();
    const links = Array.from(container.querySelectorAll("a[href]"));
    const hrefs = links.map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/systematic-review/sglt2-hf/import");
    // Screening is not enabled yet — it must not be a link.
    expect(hrefs.some((h) => h?.endsWith("/screening"))).toBe(false);
    const locked = container.querySelectorAll('[aria-disabled="true"]');
    expect(locked.length).toBeGreaterThan(0);
  });

  it("shows live counts including the violet conflict count", () => {
    render();
    expect(container.textContent).toContain("412 · 24 dup");
    const conf = container.querySelector(".ct.conf");
    expect(conf?.textContent).toBe("74");
  });
});
