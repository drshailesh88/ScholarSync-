import { describe, expect, it, vi } from "vitest";

vi.mock("ai", () => ({
  generateText: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getDeepResearchModel: vi.fn(() => "mock-model"),
}));

import { generateText } from "ai";
import { medicineDomain } from "@/lib/search/domains/medicine";
import { multidisciplinaryDomain } from "@/lib/search/domains/multidisciplinary";
import {
  generateDomainPerspectives,
  generatePerspectives,
} from "../perspectives";
import { buildConfig } from "../types";

const mockGenerateText = vi.mocked(generateText);

describe("deep research domain branching", () => {
  it("keeps the existing medical perspective generator on the proven path", async () => {
    mockGenerateText.mockResolvedValueOnce({
      text: JSON.stringify({
        perspectives: [
          {
            id: "perspective-1",
            name: "Clinical Efficacy",
            description: "Clinical effectiveness and outcomes",
            searchQueries: ["heart failure efficacy randomized controlled trial"],
            expectedPaperTypes: ["RCTs"],
          },
        ],
      }),
    } as Awaited<ReturnType<typeof generateText>>);

    const result = await generatePerspectives(
      "heart failure",
      buildConfig("quick")
    );

    expect(medicineDomain.useProvenDeepResearch).toBe(true);
    expect(result).toEqual([
      {
        id: "perspective-1",
        name: "Clinical Efficacy",
        description: "Clinical effectiveness and outcomes",
        searchQueries: ["heart failure efficacy randomized controlled trial"],
        expectedPaperTypes: ["RCTs"],
      },
    ]);
    expect(mockGenerateText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining("medical research strategist"),
      })
    );
  });

  it("returns generic academic perspectives when a domain has no templates", () => {
    const result = generateDomainPerspectives("graph neural networks", {
      ...multidisciplinaryDomain,
      perspectiveTemplates: [],
    });

    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      id: "perspective-1",
      name: "Foundational Research",
      description: "Core theoretical and empirical foundations",
      searchQueries: [
        "graph neural networks foundational research theory",
        "graph neural networks seminal papers",
      ],
      expectedPaperTypes: ["journal_article", "review"],
    });
  });

  it("maps custom domain templates into perspectives", () => {
    const result = generateDomainPerspectives("battery recycling", {
      ...multidisciplinaryDomain,
      perspectiveTemplates: [
        {
          name: "Lifecycle Analysis",
          description: "Environmental and systems-level evaluation",
          queryTemplates: [
            "${topic} life cycle assessment",
            "${topic} systems analysis",
          ],
          expectedStudyTypes: ["journal_article", "review"],
        },
      ],
    });

    expect(result).toEqual([
      {
        id: "perspective-1",
        name: "Lifecycle Analysis",
        description: "Environmental and systems-level evaluation",
        searchQueries: [
          "battery recycling life cycle assessment",
          "battery recycling systems analysis",
        ],
        expectedPaperTypes: ["journal_article", "review"],
      },
    ]);
  });

  it("replaces every ${topic} placeholder in query templates", () => {
    const result = generateDomainPerspectives("causal inference", {
      ...multidisciplinaryDomain,
      perspectiveTemplates: [
        {
          name: "Methods",
          description: "Method development",
          queryTemplates: [
            "${topic} methodology",
            "applications of ${topic}",
            "${topic} vs ${topic} alternatives",
          ],
          expectedStudyTypes: ["journal_article"],
        },
      ],
    });

    expect(result[0]?.searchQueries).toEqual([
      "causal inference methodology",
      "applications of causal inference",
      "causal inference vs causal inference alternatives",
    ]);
  });
});
