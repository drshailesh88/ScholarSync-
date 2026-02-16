import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getModel, isAIConfigured } from "@/lib/ai/models";

const PDF_CHAT_SYSTEM_PROMPT = `You are a medical paper reading assistant. The user is reading a specific paper and asking questions about it.

Rules:
- Answer ONLY from the paper's content and the context provided. Do not use training knowledge.
- Always reference specific pages: "As described on page 4..." or "(p.5)"
- When citing specific data (numbers, statistics), quote the exact text and page
- If the user asks about something not covered in this paper, say: "This paper doesn't address that topic. Would you like me to search for related papers?"
- For statistical methods: explain what the test measures and what the result means clinically
- For medical jargon: define the term, then explain its significance in this paper's context
- For figures/tables: describe what the figure shows and what conclusion it supports
- Structure responses: lead with the direct answer, then provide context
- Keep responses concise (2-4 paragraphs) unless the user asks for detail
- At the end of each response, include a source reference with page number(s) and section

When the user has highlighted passages, use them as additional context for better answers.`;

export async function POST(request: NextRequest) {
  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: "AI provider not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { paperId, message, highlights, paperMetadata } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build context from highlights
    let highlightsContext = "";
    if (highlights && highlights.length > 0) {
      highlightsContext = "\n\nUser's highlights and annotations on this paper:\n";
      for (const hl of highlights) {
        highlightsContext += `\n[Page ${hl.pageNumber}, ${hl.color}${hl.targetSection ? `, Target: ${hl.targetSection}` : ""}]`;
        highlightsContext += `\n"${hl.text}"`;
        if (hl.note) {
          highlightsContext += `\nUser note: "${hl.note}"`;
        }
        highlightsContext += "\n";
      }
    }

    // Build paper context
    let paperContext = "";
    if (paperMetadata) {
      paperContext = `\nPaper: ${paperMetadata.title || "Unknown"}`;
      if (paperMetadata.authors?.length) {
        paperContext += `\nAuthors: ${paperMetadata.authors.join(", ")}`;
      }
      if (paperMetadata.journal) {
        paperContext += `\nJournal: ${paperMetadata.journal}`;
      }
      if (paperMetadata.year) {
        paperContext += `\nYear: ${paperMetadata.year}`;
      }
      if (paperMetadata.doi) {
        paperContext += `\nDOI: ${paperMetadata.doi}`;
      }
    }

    const systemPrompt =
      PDF_CHAT_SYSTEM_PROMPT + paperContext + highlightsContext;

    const result = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: message,
    });

    // Parse source quotes from the response (basic extraction)
    const sourceQuotes = extractSourceQuotes(result.text, paperId);

    return NextResponse.json({
      content: result.text,
      sourceQuotes,
      usage: result.usage,
    });
  } catch (error) {
    console.error("PDF chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

/**
 * Extract page references from the AI response to build source quotes.
 * Looks for patterns like "page 4", "p.5", "(p.4, Methods)"
 */
function extractSourceQuotes(text: string, paperId: string) {
  const pageRefPattern = /(?:page\s+(\d+)|p\.?\s*(\d+))/gi;
  const quotes: Array<{
    id: string;
    paperId: string;
    pageNumber: number;
    sectionName?: string;
    startOffset: number;
    endOffset: number;
    quotedText: string;
    usedIn: Array<{ type: "ai_chat" }>;
  }> = [];
  const seenPages = new Set<number>();

  let match;
  while ((match = pageRefPattern.exec(text)) !== null) {
    const pageNum = parseInt(match[1] || match[2], 10);
    if (!isNaN(pageNum) && !seenPages.has(pageNum)) {
      seenPages.add(pageNum);

      // Extract nearby text as the "quoted" content
      const start = Math.max(0, match.index - 100);
      const end = Math.min(text.length, match.index + match[0].length + 100);
      const context = text.slice(start, end).trim();

      quotes.push({
        id: `sq-${Date.now()}-${pageNum}`,
        paperId,
        pageNumber: pageNum,
        startOffset: 0,
        endOffset: 0,
        quotedText: context,
        usedIn: [{ type: "ai_chat" }],
      });
    }
  }

  return quotes;
}
