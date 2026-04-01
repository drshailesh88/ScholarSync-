"use server";

import DOMPurify from "isomorphic-dompurify";

const JINA_READER_BASE = "https://r.jina.ai/";
const MAX_CONTENT_LENGTH = 200_000;
const MIN_CONTENT_LENGTH = 50;

export interface ExtractedContent {
  contentHtml: string;
  contentPlain: string;
  wordCount: number;
}

/**
 * Extract clean, readable content from a URL using Jina Reader.
 * Returns both HTML (for rendering/highlighting) and plain text (for search/LLM).
 */
export async function extractContent(url: string): Promise<ExtractedContent> {
  const [html, markdown] = await Promise.all([
    fetchFromJina(url, "html"),
    fetchFromJina(url, "markdown"),
  ]);

  const cleanHtml = sanitizeHtml(html);
  const cleanPlain = sanitizeMarkdownToPlain(markdown);

  if (cleanPlain.length < MIN_CONTENT_LENGTH) {
    throw new Error("The page has too little text content to extract.");
  }

  return {
    contentHtml: cleanHtml.slice(0, MAX_CONTENT_LENGTH),
    contentPlain: cleanPlain.slice(0, MAX_CONTENT_LENGTH),
    wordCount: cleanPlain.split(/\s+/).filter(Boolean).length,
  };
}

async function fetchFromJina(
  url: string,
  format: "html" | "markdown"
): Promise<string> {
  const accept = format === "html" ? "text/html" : "text/markdown";
  const returnFormat = format === "html" ? "html" : "markdown";

  try {
    const response = await fetch(
      `${JINA_READER_BASE}${url}`,
      {
        headers: {
          Accept: accept,
          "X-Return-Format": returnFormat,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Page not found. Check the URL and try again.");
      }
      if (response.status === 403) {
        throw new Error(
          "Access denied. This website may block automated access."
        );
      }
      throw new Error(`Failed to fetch page (HTTP ${response.status}).`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") {
        throw new Error(
          "Request timed out. The website took too long to respond."
        );
      }
      if (
        error.message.startsWith("Page not found") ||
        error.message.startsWith("Access denied") ||
        error.message.startsWith("Failed to fetch") ||
        error.message.startsWith("Request timed out")
      ) {
        throw error;
      }
    }
    throw new Error(
      "Could not fetch the URL. Check your connection and try again."
    );
  }
}

/**
 * Clean Jina Reader HTML output using DOMPurify for XSS safety.
 * Keeps semantic HTML structure for highlighting.
 */
function sanitizeHtml(html: string): string {
  const clean = DOMPurify.sanitize(html, {
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "noscript"],
    FORBID_ATTR: ["onerror", "onclick", "onload", "onmouseover", "onfocus", "onblur"],
  });

  // Remove Jina metadata lines at the top
  return clean
    .replace(
      /^(Title:|URL Source:|Published Time:|Markdown Content:).*$/gm,
      ""
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Convert Jina Reader markdown output to plain text.
 */
function sanitizeMarkdownToPlain(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const cleanedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip Jina metadata
    if (
      /^(Title:|URL Source:|Published Time:|Markdown Content:)/i.test(trimmed)
    ) {
      continue;
    }

    // Strip markdown formatting
    let clean = trimmed;
    clean = clean.replace(/^#{1,6}\s+/, ""); // headings
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // links
    clean = clean.replace(/[*_`~]/g, ""); // bold/italic/code
    clean = clean.replace(/^[-*+]\s+/, ""); // list markers
    clean = clean.replace(/^\d+\.\s+/, ""); // numbered lists
    clean = clean.replace(/^>\s+/, ""); // blockquotes

    cleanedLines.push(clean);
  }

  return cleanedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
