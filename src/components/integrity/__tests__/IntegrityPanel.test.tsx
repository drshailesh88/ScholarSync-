// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IntegrityPanel } from "../IntegrityPanel";

vi.mock("@/components/ui/circular-gauge", () => ({
  CircularGauge: ({ value, label }: { value: number; label: string }) => (
    <div>{label}:{value}</div>
  ),
}));

const successResult = {
  tier: "free",
  aiDetection: {
    humanScore: 82,
    aiScore: 18,
    overallRisk: "low",
    engine: "binoculars",
    stats: {
      avgSentenceLength: 10,
      sentenceLengthStdDev: 2,
      typeTokenRatio: 0.5,
      passiveVoicePercent: 5,
      readabilityGrade: 8,
      hedgingPhraseCount: 1,
      formulaicTransitionDensity: 0.1,
      paragraphLengthStdDev: 4,
      repetitiveSentenceOpeningRatio: 0.1,
      markdownHeadingCount: 0,
    },
    paragraphs: [],
  },
  plagiarism: { similarityScore: 0, sourcesScanned: 10, matches: [], engine: "shingling-scholarly" },
  citationAudit: { totalCitations: 0, verifiedCitations: 0, issues: [], verifiedReferences: [] },
  writingQuality: { passiveVoiceCount: 1, averageSentenceLength: 10, readabilityGrade: 8, suggestions: [] },
  checkedAt: new Date().toISOString(),
};

describe("IntegrityPanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.restoreAllMocks();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders initial idle state", () => {
    act(() => {
      root.render(<IntegrityPanel getEditorText={() => "a".repeat(100)} />);
    });

    expect(container.textContent).toContain("Integrity Check");
    expect(container.textContent).toContain("Run Integrity Check");
  });

  it("shows validation error for short text", async () => {
    act(() => {
      root.render(<IntegrityPanel getEditorText={() => "too short"} />);
    });

    await act(async () => {
      (Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Run Integrity Check")) as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("at least 50 characters");
    expect(container.textContent).toContain("Retry");
  });

  it("shows running and then success report", async () => {
    let resolveFetch: (value: Response) => void = () => {};
    vi.spyOn(global, "fetch").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }) as Promise<Response>,
    );

    act(() => {
      root.render(<IntegrityPanel getEditorText={() => "a".repeat(120)} />);
    });

    await act(async () => {
      (Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Run Integrity Check")) as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("Analyzing Document");

    await act(async () => {
      resolveFetch({ ok: true, json: async () => successResult } as Response);
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Integrity Report");
    expect(container.textContent).toContain("Human Score:82");
  });

  it("shows API error state when request fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "service down" }),
    } as Response);

    act(() => {
      root.render(<IntegrityPanel getEditorText={() => "a".repeat(120)} />);
    });

    await act(async () => {
      (Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Run Integrity Check")) as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("service down");
    expect(container.textContent).toContain("Retry");
  });

});
