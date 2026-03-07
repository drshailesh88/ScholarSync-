"use server";

import { savePaper, autoChunkPaper } from "@/lib/actions/papers";
import { embedPaperChunks } from "@/lib/actions/embeddings";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { paperChunks, papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const JINA_READER_BASE = "https://r.jina.ai/";
const MAX_CONTENT_LENGTH = 100_000;
const MIN_CONTENT_LENGTH = 50;

type IngestStatus = "ready" | "embed_failed";

export async function ingestUrl(url: string): Promise<{
  paperId: number;
  title: string;
  wordCount: number;
  status: IngestStatus;
}> {
  await getCurrentUserId();

  const normalizedUrl = validateUrl(url);
  const markdown = await fetchReaderMarkdown(normalizedUrl);
  const cleanText = sanitizeReaderMarkdown(markdown);

  if (cleanText.length < MIN_CONTENT_LENGTH) {
    throw new Error("The page has too little text content to be useful as a source.");
  }

  const truncatedText = cleanText.slice(0, MAX_CONTENT_LENGTH).trim();
  const title = extractTitle(truncatedText, normalizedUrl);
  const abstract = extractAbstract(truncatedText);

  const paperId = await savePaper({
    title,
    authors: [],
    source: "user_upload",
    abstract,
  });

  const [paper] = await db
    .select({ metadata: papers.metadata })
    .from(papers)
    .where(eq(papers.id, paperId))
    .limit(1);

  await db
    .update(papers)
    .set({
      full_text_plain: truncatedText,
      full_text_available: true,
      is_chunked: false,
      metadata: mergeMetadata(paper?.metadata, normalizedUrl),
      updated_at: new Date(),
    })
    .where(eq(papers.id, paperId));

  await db.delete(paperChunks).where(eq(paperChunks.paper_id, paperId));

  let status: IngestStatus = "ready";

  try {
    const chunksCreated = await autoChunkPaper(paperId);
    if (chunksCreated === 0) {
      throw new Error("No chunks created from URL content.");
    }

    await embedPaperChunks(paperId);
  } catch (error) {
    status = "embed_failed";
    console.error("URL ingest: chunking or embedding failed:", error);
  }

  try {
    const { generateSourceOverview, storeSourceOverview } = await import(
      "@/lib/rag/source-summarizer"
    );

    const chunks = await db
      .select({
        text: paperChunks.text,
        section_type: paperChunks.section_type,
        chunk_index: paperChunks.chunk_index,
      })
      .from(paperChunks)
      .where(eq(paperChunks.paper_id, paperId))
      .orderBy(paperChunks.chunk_index)
      .limit(10);

    if (chunks.length > 0) {
      const overview = await generateSourceOverview(title, [], chunks);
      await storeSourceOverview(paperId, overview);
    }
  } catch (error) {
    console.error("URL ingest: source overview generation failed:", error);
  }

  return {
    paperId,
    title,
    wordCount: countWords(truncatedText),
    status,
  };
}

function validateUrl(url: string): string {
  const trimmedUrl = url.trim();

  let parsed: URL;
  try {
    parsed = new URL(trimmedUrl);
  } catch {
    throw new Error("Invalid URL. Must start with http:// or https://");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Invalid URL. Must start with http:// or https://");
  }

  return parsed.toString();
}

async function fetchReaderMarkdown(url: string): Promise<string> {
  try {
    const response = await fetch(`${JINA_READER_BASE}${encodeURIComponent(url)}`, {
      headers: {
        Accept: "text/markdown",
        "X-Return-Format": "markdown",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Page not found. Check the URL and try again.");
      }
      if (response.status === 403) {
        throw new Error("Access denied. This website may block automated access.");
      }
      throw new Error(`Failed to fetch page (HTTP ${response.status}).`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") {
        throw new Error("Request timed out. The website took too long to respond.");
      }

      if (
        error.message.startsWith("Page not found") ||
        error.message.startsWith("Access denied") ||
        error.message.startsWith("Failed to fetch")
      ) {
        throw error;
      }
    }

    throw new Error("Could not fetch the URL. Check your connection and try again.");
  }
}

function sanitizeReaderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const cleanedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      cleanedLines.push("");
      continue;
    }

    if (/^Title:\s+/i.test(trimmed)) {
      cleanedLines.push(`# ${trimmed.replace(/^Title:\s+/i, "").trim()}`);
      continue;
    }

    if (/^(URL Source|Published Time|Markdown Content):/i.test(trimmed)) {
      continue;
    }

    cleanedLines.push(line);
  }

  return cleanedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extractTitle(markdown: string, fallbackUrl: string): string {
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match?.[1]) {
    return stripInlineMarkdown(h1Match[1]).slice(0, 200);
  }

  const lines = markdown.split("\n");
  for (const line of lines) {
    const cleaned = stripInlineMarkdown(line);
    if (cleaned.length > 3 && cleaned.length < 200) {
      return cleaned;
    }
  }

  try {
    const parsed = new URL(fallbackUrl);
    return `${parsed.hostname}${parsed.pathname}`.slice(0, 200);
  } catch {
    return fallbackUrl.slice(0, 200);
  }
}

function extractAbstract(markdown: string): string {
  const bodyLines = markdown
    .split("\n")
    .slice(1)
    .map((line) => stripInlineMarkdown(line))
    .filter((line) => line.length > 0);

  return bodyLines.join(" ").replace(/\s+/g, " ").trim().slice(0, 500);
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/^[#>*`\-\s]+/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function mergeMetadata(
  existing: unknown,
  sourceUrl: string
): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? (existing as Record<string, unknown>)
      : {};

  return {
    ...base,
    sourceUrl,
    sourceType: "url",
  };
}
