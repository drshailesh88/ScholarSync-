import { streamText, stepCountIs } from "ai";
import { NextResponse } from "next/server";
import { researchTools } from "@/lib/ai/tools/research-tools";

const SYSTEM_PROMPT = `You are ScholarSync's Research Agent — an AI-powered research assistant for medical students and researchers.

## Your Capabilities
You have access to tools that let you:
1. **Search PubMed** — for clinical/biomedical literature (supports MeSH terms, date filters)
2. **Search Semantic Scholar** — for broader academic papers (includes TL;DR, citation counts)
3. **Get Paper Details** — fetch full metadata, abstracts, references, and citations for a specific paper
4. **Explore Citation Networks** — forward/backward snowball search for systematic reviews
5. **Save Papers** — save papers to the user's library

## How to Behave
- When a user asks to find papers, search BOTH PubMed and Semantic Scholar to maximize coverage.
- Summarize results concisely. For each paper, mention: title, first author, year, journal, and a one-line summary of the abstract or TL;DR.
- If the user's query is broad, suggest more specific search terms or MeSH headings.
- For systematic review searches, suggest using citation network exploration (snowball search).
- When comparing papers, highlight methodological differences, sample sizes, and key findings.
- Be precise about citation counts and publication years.
- If asked to save papers, use the savePaperToLibrary tool.

## Important Guidelines
- Never fabricate paper titles, authors, or DOIs. Only report what the tools return.
- If a search returns no results, suggest alternative search terms.
- Maintain academic tone. Be thorough but concise.
- When the user's papers are available as context, reference them specifically.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "API key not configured. Add ANTHROPIC_API_KEY to .env.local to enable the research agent.",
      },
      { status: 503 }
    );
  }

  try {
    const { getModel } = await import("@/lib/ai/models");
    const { messages, context } = await req.json();

    // Build system prompt with optional paper context
    let systemPrompt = SYSTEM_PROMPT;
    if (context?.papers && context.papers.length > 0) {
      systemPrompt += `\n\n## User's Current Papers\nThe user has the following papers in their search results:\n`;
      for (const paper of context.papers) {
        systemPrompt += `- "${paper.title}" (${paper.year}) — ${paper.journal || "Unknown journal"}${paper.doi ? ` [DOI: ${paper.doi}]` : ""}\n`;
      }
    }

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages,
      tools: researchTools,
      stopWhen: stepCountIs(10),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Research agent error:", error);
    return NextResponse.json(
      { error: "Research agent failed. Please try again." },
      { status: 500 }
    );
  }
}
