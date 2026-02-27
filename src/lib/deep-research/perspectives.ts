/**
 * Perspective generation for deep research.
 *
 * Generates multiple research perspectives for a given topic, each with
 * 3-4 specific and varied search queries including MeSH terms, author
 * searches, and study-type filters.
 */

import { generateText } from "ai";
import { getDeepResearchModel } from "@/lib/ai/models";
import type { ResearchConfig, Perspective } from "./types";

/**
 * Generate research perspectives for a topic.
 *
 * Each perspective represents a distinct angle of inquiry (e.g., efficacy,
 * safety, mechanisms, population subgroups) with tailored search queries
 * designed to surface different evidence types.
 */
export async function generatePerspectives(
  topic: string,
  config: ResearchConfig
): Promise<Perspective[]> {
  const perspectiveCount = Math.min(config.breadth, 7);

  const { text } = await generateText({
    model: getDeepResearchModel(),
    system: `You are a medical research strategist designing a multi-perspective literature search.

Given a research topic, generate ${perspectiveCount} distinct research perspectives. Each perspective should explore a different angle of the topic (e.g., clinical efficacy, safety/adverse effects, mechanisms of action, specific populations, diagnostic approaches, economic/cost-effectiveness, guidelines/recommendations).

For each perspective, generate 3-4 search queries that are:
- Specific and varied (not just rephrasing the same query)
- Include at least one query with MeSH terms (formatted as "term"[MeSH])
- Include at least one query targeting specific study types (e.g., "systematic review", "randomized controlled trial", "meta-analysis")
- Include queries that would surface different evidence levels
- When relevant, include author name searches for known experts in the field

Also specify expectedPaperTypes: the types of studies you expect this perspective to surface (e.g., "RCTs", "meta-analyses", "cohort studies", "case reports", "guidelines").

Respond in this exact JSON format:
{
  "perspectives": [
    {
      "id": "perspective-1",
      "name": "Perspective Name",
      "description": "Brief description of what this perspective explores",
      "searchQueries": [
        "query 1 with MeSH terms",
        "query 2 targeting study type",
        "query 3 with different angle",
        "query 4 optional broader search"
      ],
      "expectedPaperTypes": ["RCTs", "systematic reviews"]
    }
  ]
}`,
    prompt: `Research topic: ${topic}

Generate ${perspectiveCount} distinct research perspectives with 3-4 search queries each.

Ensure the perspectives together provide comprehensive coverage of the topic from clinical, mechanistic, safety, and population-level angles as appropriate.`,
    maxOutputTokens: 3000,
    temperature: 0.4,
  });

  // Parse the AI response
  let cleaned = text.trim();
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) cleaned = fenceMatch[1].trim();

  try {
    const parsed = JSON.parse(cleaned) as {
      perspectives: Perspective[];
    };

    if (
      Array.isArray(parsed.perspectives) &&
      parsed.perspectives.length > 0
    ) {
      // Validate and ensure each perspective has required fields
      return parsed.perspectives.slice(0, perspectiveCount).map((p, idx) => ({
        id: p.id || `perspective-${idx + 1}`,
        name: p.name || `Perspective ${idx + 1}`,
        description: p.description || "",
        searchQueries: Array.isArray(p.searchQueries)
          ? p.searchQueries.slice(0, 4)
          : [topic],
        expectedPaperTypes: Array.isArray(p.expectedPaperTypes)
          ? p.expectedPaperTypes
          : [],
      }));
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: generate basic perspectives if AI parsing fails
  return generateFallbackPerspectives(topic, perspectiveCount);
}

/**
 * Fallback perspective generation when AI response cannot be parsed.
 */
function generateFallbackPerspectives(
  topic: string,
  count: number
): Perspective[] {
  const templates = [
    {
      suffix: "Clinical Efficacy",
      desc: "Clinical effectiveness and outcomes",
      queryTemplates: [
        `${topic} efficacy randomized controlled trial`,
        `"${topic}"[MeSH] AND "treatment outcome"[MeSH]`,
        `${topic} systematic review meta-analysis efficacy`,
        `${topic} clinical trial results outcomes`,
      ],
      expectedTypes: ["RCTs", "systematic reviews", "meta-analyses"],
    },
    {
      suffix: "Safety & Adverse Effects",
      desc: "Safety profile and adverse events",
      queryTemplates: [
        `${topic} adverse effects safety`,
        `"${topic}"[MeSH] AND "drug-related side effects and adverse reactions"[MeSH]`,
        `${topic} toxicity long-term safety cohort`,
        `${topic} contraindications risk factors`,
      ],
      expectedTypes: ["cohort studies", "case reports", "pharmacovigilance studies"],
    },
    {
      suffix: "Mechanisms & Pathophysiology",
      desc: "Underlying mechanisms of action and pathophysiology",
      queryTemplates: [
        `${topic} mechanism of action`,
        `"${topic}"[MeSH] AND "molecular mechanisms"`,
        `${topic} pathophysiology review`,
        `${topic} pharmacology pharmacokinetics`,
      ],
      expectedTypes: ["narrative reviews", "in vitro studies", "animal studies"],
    },
    {
      suffix: "Special Populations",
      desc: "Evidence in specific patient subgroups",
      queryTemplates: [
        `${topic} elderly geriatric population`,
        `${topic} pediatric children adolescents`,
        `"${topic}"[MeSH] AND ("aged"[MeSH] OR "child"[MeSH])`,
        `${topic} pregnancy comorbidities subgroup analysis`,
      ],
      expectedTypes: ["subgroup analyses", "cohort studies", "case series"],
    },
    {
      suffix: "Guidelines & Recommendations",
      desc: "Clinical practice guidelines and expert consensus",
      queryTemplates: [
        `${topic} clinical practice guideline`,
        `"${topic}"[MeSH] AND "practice guideline"[Publication Type]`,
        `${topic} expert consensus recommendation`,
        `${topic} treatment algorithm decision-making`,
      ],
      expectedTypes: ["guidelines", "consensus statements", "position papers"],
    },
    {
      suffix: "Comparative Effectiveness",
      desc: "Head-to-head comparisons with alternative treatments",
      queryTemplates: [
        `${topic} comparative effectiveness`,
        `${topic} versus comparison head-to-head trial`,
        `"${topic}"[MeSH] AND "comparative study"[Publication Type]`,
        `${topic} network meta-analysis indirect comparison`,
      ],
      expectedTypes: ["RCTs", "network meta-analyses", "comparative studies"],
    },
    {
      suffix: "Cost-Effectiveness & Access",
      desc: "Economic evaluation and healthcare access considerations",
      queryTemplates: [
        `${topic} cost-effectiveness economic evaluation`,
        `"${topic}"[MeSH] AND "cost-benefit analysis"[MeSH]`,
        `${topic} health economics QALY ICER`,
        `${topic} access disparities healthcare utilization`,
      ],
      expectedTypes: ["economic evaluations", "cost-effectiveness analyses", "health services research"],
    },
  ];

  return templates.slice(0, count).map((t, idx) => ({
    id: `perspective-${idx + 1}`,
    name: `${t.suffix}`,
    description: t.desc,
    searchQueries: t.queryTemplates,
    expectedPaperTypes: t.expectedTypes,
  }));
}
