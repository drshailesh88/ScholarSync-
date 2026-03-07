import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const MAX_CONTENT_LENGTH = 50_000;

const BLOCKED_DOMAINS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "10.",
  "172.16.",
  "192.168.",
  "169.254.",
];

const schema = z.object({
  url: z
    .string()
    .url("Invalid URL format")
    .refine((u) => /^https?:\/\//i.test(u), "Only HTTP and HTTPS URLs are allowed"),
});

function isBlockedDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return BLOCKED_DOMAINS.some((d) => hostname.startsWith(d) || hostname === d);
  } catch {
    return true;
  }
}

/**
 * Extract clean readable text from raw HTML.
 * Prioritises <article>, <main>, or the largest text block.
 */
function extractContent(html: string, url: string): { title: string; content: string } {
  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : "";
  title = title
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"');

  // Try to extract og:title as fallback / better title
  const ogTitleMatch = html.match(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i
  );
  if (ogTitleMatch) {
    title = ogTitleMatch[1].trim();
  }

  // Remove script, style, nav, header, footer, aside tags entirely
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Try to find <article> or <main> content
  const articleMatch = cleaned.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  const mainMatch = cleaned.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);

  const contentSource = articleMatch?.[1] ?? mainMatch?.[1] ?? cleaned;

  // Strip remaining HTML tags
  const text = contentSource
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    // Decode common HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    // Normalize whitespace
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!title) {
    title = new URL(url).hostname;
  }

  return { title, content: text };
}

export async function POST(req: Request) {
  const log = logger.withRequestId();
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "fetch-url", {
      limit: 10,
      windowSeconds: 3600,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = schema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { url } = parseResult.data;

    if (isBlockedDomain(url)) {
      return NextResponse.json(
        { error: "This domain is not allowed" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "ScholarSync/1.0 (URL content fetcher)",
        Accept: "text/html,application/xhtml+xml,text/plain",
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL (HTTP ${response.status})` },
        { status: 400 }
      );
    }

    const rawHtml = await response.text();
    const { title, content } = extractContent(rawHtml, url);

    let truncated = false;
    let finalContent = content;
    if (finalContent.length > MAX_CONTENT_LENGTH) {
      finalContent = finalContent.slice(0, MAX_CONTENT_LENGTH);
      truncated = true;
    }

    const wordCount = finalContent.split(/\s+/).filter(Boolean).length;
    const excerpt =
      finalContent.slice(0, 200).trim() + (finalContent.length > 200 ? "..." : "");

    return NextResponse.json({
      title,
      content: finalContent,
      wordCount,
      excerpt,
      truncated,
    });
  } catch (error) {
    log.error("URL fetch error", error);
    return NextResponse.json(
      { error: "Failed to fetch URL content" },
      { status: 500 }
    );
  }
}
