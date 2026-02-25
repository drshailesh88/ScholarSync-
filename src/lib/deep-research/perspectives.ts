/**
 * Perspective generation for deep research.
 *
 * Uses AI to generate 3-5 expert viewpoints on a research topic,
 * each with optimized search queries.
 */

import { generateText } from "ai";
import { getBigModel } from "@/lib/ai/models";
import type { Perspective, ResearchConfig } from "./types";

/**
 * Generate expert perspectives for a research topic.
 * Each perspective represents a different angle of investigation.
 */
export async function generatePerspectives(
  topic: string,
  config: ResearchConfig
): Promise<Perspective[]> {
  const count = Math.min(config.breadth, 5);

  const { text } = await generateText({
    model: getBigModel(),
    system: `You are an expert research strategist for academic literature review.
Given a research topic, generate ${count} distinct expert perspectives to explore.
Each perspective should represent a different angle (e.g., clinical outcomes,
mechanisms, methodology, ethics, policy, economics, epidemiology).

For each perspective, provide 2-3 optimized search queries suitable for
PubMed, Semantic Scholar, and OpenAlex.

Respond in JSON format:
[
  {
    "id": "perspective-1",
    "name": "Clinical Outcomes",
    "description": "Examining patient outcomes and treatment efficacy",
    "searchQueries": ["query1 for databases", "query2 for databases"]
  }
]

Only output the JSON array, no other text.`,
    prompt: `Research topic: "${topic}"

Generate ${count} expert perspectives with search queries.`,
    maxOutputTokens: 2000,
  });

  try {
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as Perspective[];
    return parsed.slice(0, count);
  } catch {
    // Fallback: create a single perspective from the topic
    return [
      {
        id: "perspective-1",
        name: "General Overview",
        description: `Comprehensive search for: ${topic}`,
        searchQueries: [topic],
      },
    ];
  }
}
