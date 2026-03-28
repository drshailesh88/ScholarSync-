import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("ai", () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));
vi.mock("@/lib/db", () => ({
  db: {},
}));
vi.mock("@/lib/db/schema", () => ({
  papers: {},
}));
vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
}));

import { generateObject, generateText } from "ai";
import { multidisciplinaryDomain } from "@/lib/search/domains/multidisciplinary";
import { generateHypotheticalAnswer } from "../hyde";
import { generateMultiQueries } from "../query-enhancer";
import { generateSourceOverview } from "../source-summarizer";

const mockGenerateObject = vi.mocked(generateObject);
const mockGenerateText = vi.mocked(generateText);

describe("domain-aware RAG personas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("query-enhancer with undefined domain uses the medical persona", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { queries: ["v1", "v2", "v3"] },
    } as Awaited<ReturnType<typeof generateObject>>);

    await generateMultiQueries("heart failure");

    expect(mockGenerateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining("medical research librarian"),
      })
    );
  });

  it("query-enhancer with a domain uses the config persona", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { queries: ["v1", "v2", "v3"] },
    } as Awaited<ReturnType<typeof generateObject>>);

    await generateMultiQueries("graph neural networks", multidisciplinaryDomain);

    expect(mockGenerateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        system: multidisciplinaryDomain.personas.librarian,
      })
    );
  });

  it("hyde with undefined domain uses the medical textbook persona", async () => {
    mockGenerateText.mockResolvedValueOnce({
      text: "Medical answer",
    } as Awaited<ReturnType<typeof generateText>>);

    await generateHypotheticalAnswer("How does aspirin work?");

    expect(mockGenerateText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining("medical textbook"),
      })
    );
  });

  it("hyde with a domain uses the config persona", async () => {
    mockGenerateText.mockResolvedValueOnce({
      text: "Domain answer",
    } as Awaited<ReturnType<typeof generateText>>);

    await generateHypotheticalAnswer(
      "What are graph neural networks?",
      multidisciplinaryDomain
    );

    expect(mockGenerateText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: multidisciplinaryDomain.personas.textbook,
      })
    );
  });

  it("source-summarizer with undefined domain keeps the clinical-trial hint", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: {
        summary: "Summary",
        keyTopics: ["a", "b", "c", "d"],
        suggestedQuestions: ["q1", "q2", "q3"],
      },
    } as Awaited<ReturnType<typeof generateObject>>);

    await generateSourceOverview("Paper", ["Author"], [
      { text: "Trial excerpt", section_type: "abstract", chunk_index: 0 },
    ]);

    expect(mockGenerateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining("clinical trial"),
      })
    );
  });

  it("source-summarizer with a domain uses the domain-specific extraction hint", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: {
        summary: "Summary",
        keyTopics: ["a", "b", "c", "d"],
        suggestedQuestions: ["q1", "q2", "q3"],
      },
    } as Awaited<ReturnType<typeof generateObject>>);

    await generateSourceOverview(
      "Paper",
      ["Author"],
      [{ text: "Excerpt", section_type: "results", chunk_index: 0 }],
      multidisciplinaryDomain
    );

    expect(mockGenerateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining(
          `relevant to ${multidisciplinaryDomain.label}`
        ),
      })
    );
  });
});
