// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResearchPlan } from "../ResearchPlan";

const plan = {
  originalQuery: "Does aspirin help prevent stroke?",
  pubmedQuery: "aspirin AND stroke prevention",
  meshTerms: ["Aspirin", "Stroke"],
  synonyms: {},
  suggestedFilters: { dateFrom: 2018, dateTo: 2024, studyTypes: ["RCT"] },
  estimatedResults: "120",
  rationale: "Focus on modern randomized evidence",
};

describe("ResearchPlan", () => {
  let container: HTMLDivElement;
  let root: Root;

  const onRunSearch = vi.fn();
  const onCancel = vi.fn();
  const onUpdatePlan = vi.fn();

  beforeEach(() => {
    onRunSearch.mockReset();
    onCancel.mockReset();
    onUpdatePlan.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders loading state", () => {
    act(() => {
      root.render(
        <ResearchPlan
          plan={plan as never}
          isLoading
          onRunSearch={onRunSearch}
          onCancel={onCancel}
          onUpdatePlan={onUpdatePlan}
        />,
      );
    });

    expect(container.textContent).toContain("Generating search plan");
  });

  it("renders plan details and handles run/cancel actions", async () => {
    act(() => {
      root.render(
        <ResearchPlan
          plan={plan as never}
          isLoading={false}
          onRunSearch={onRunSearch}
          onCancel={onCancel}
          onUpdatePlan={onUpdatePlan}
        />,
      );
    });

    expect(container.textContent).toContain("Research Plan");
    expect(container.textContent).toContain("MeSH Terms");

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Run Search"))?.click();
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Cancel")?.click();
    });

    expect(onRunSearch).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it("toggles query edit mode", async () => {
    act(() => {
      root.render(
        <ResearchPlan
          plan={plan as never}
          isLoading={false}
          onRunSearch={onRunSearch}
          onCancel={onCancel}
          onUpdatePlan={onUpdatePlan}
        />,
      );
    });

    expect(container.querySelector("textarea")).toBeNull();

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Edit"))?.click();
    });
    expect(container.querySelector("textarea")).toBeTruthy();

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Done"))?.click();
    });
    expect(container.querySelector("textarea")).toBeNull();
  });

});
