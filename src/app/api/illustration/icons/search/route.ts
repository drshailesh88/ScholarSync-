import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { expandWithSynonyms } from "@/lib/illustration/data/icon-synonyms";

// ---------------------------------------------------------------------------
// GET /api/illustration/icons/search
// Searches icon metadata from FINNISH icon libraries with synonym expansion
// ---------------------------------------------------------------------------

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  expand_synonyms: z.coerce.boolean().default(true),
  include_scores: z.coerce.boolean().default(false),
});

/**
 * Enhanced icon search result with optional score
 */
interface IconSearchResult {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  library: string;
  score?: number;
}

/**
 * Search icons with synonym expansion and scoring
 */
async function searchIcons(
  query: string,
  category: string,
  limit: number,
  offset: number,
  expandSynonyms: boolean,
  includeScores: boolean
): Promise<{ icons: IconSearchResult[]; total: number; expandedTerms: string[] }> {
  // Get base search term
  const searchTerm = query.trim();
  if (!searchTerm) {
    return { icons: [], total: 0, expandedTerms: [] };
  }

  // Expand with synonyms if enabled
  const expandedTerms = expandSynonyms
    ? expandWithSynonyms(searchTerm)
    : [searchTerm];

  // Use the unified search function (already does synonym expansion internally)
  // We'll do the search using the expanded query for the actual results
  const { searchAllIcons } = await import("@/lib/illustration/lib/icons");
  const allResults = searchAllIcons(searchTerm);

  // Filter by category if specified
  let filtered = allResults;
  if (category && category !== "all" && category !== "All") {
    filtered = allResults.filter((icon) => {
      const cat = icon.category.toLowerCase();
      const lib = icon.library.toLowerCase();

      // Match against category or library-specific categories
      if (category === "medical") {
        return lib === "health" || lib === "bioicons" || lib === "bioicons-full" ||
               ["anatomy", "equipment", "diagnostics", "conditions", "services", "biology"].includes(cat);
      }
      if (category === "science") {
        return lib === "science" || lib === "iconpark" || lib === "scidraw" ||
               ["laboratory", "data", "physics", "chemistry", "astronomy", "math", "nature", "technology"].includes(cat);
      }
      if (category === "general") {
        return lib === "tabler" || lib === "iconpark";
      }
      if (category === "brands") {
        return lib === "simple";
      }

      return cat === category.toLowerCase() || lib === category.toLowerCase();
    });
  }

  // Apply pagination
  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  // Map to response format
  const icons: IconSearchResult[] = paginated.map((icon) => ({
    id: icon.id,
    name: icon.name,
    category: icon.category,
    keywords: icon.keywords,
    library: icon.library,
    score: includeScores ? calculateScore(icon, searchTerm, expandedTerms) : undefined,
  }));

  return { icons, total, expandedTerms };
}

/**
 * Calculate search score for an icon (used when include_scores is true)
 */
function calculateScore(
  icon: { name: string; category: string; keywords: string[] },
  query: string,
  expandedTerms: string[]
): number {
  let score = 0;
  const nameLower = icon.name.toLowerCase();
  const categoryLower = icon.category.toLowerCase();
  const keywordsLower = icon.keywords.map((k) => k.toLowerCase());

  // Exact match on name: 100 points
  if (nameLower === query.toLowerCase()) {
    score += 100;
  }
  // Starts with query: 50 points
  else if (nameLower.startsWith(query.toLowerCase())) {
    score += 50;
  }
  // Contains query: 25 points
  else if (nameLower.includes(query.toLowerCase())) {
    score += 25;
  }

  // Category match: 20 points
  if (categoryLower.includes(query.toLowerCase())) {
    score += 20;
  }

  // Keyword matches: 30/15/10 points
  for (const keyword of keywordsLower) {
    if (keyword === query.toLowerCase()) {
      score += 30;
    } else if (keyword.startsWith(query.toLowerCase())) {
      score += 15;
    } else if (keyword.includes(query.toLowerCase())) {
      score += 10;
    }
  }

  // Synonym matches: 3 points per matching synonym term
  for (const synonym of expandedTerms) {
    if (synonym.toLowerCase() !== query.toLowerCase()) {
      if (nameLower.includes(synonym.toLowerCase()) || categoryLower.includes(synonym.toLowerCase())) {
        score += 3;
      }
      // Check keywords for synonym matches
      for (const keyword of keywordsLower) {
        if (keyword.includes(synonym.toLowerCase())) {
          score += 3;
          break;
        }
      }
    }
  }

  return score;
}

export async function GET(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parseResult = searchSchema.safeParse({
      q: searchParams.get("q") || undefined,
      category: searchParams.get("category") || undefined,
      limit: searchParams.get("limit") || undefined,
      offset: searchParams.get("offset") || undefined,
      expand_synonyms: searchParams.get("expand_synonyms") || undefined,
      include_scores: searchParams.get("include_scores") || undefined,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { q, category, limit, offset, expand_synonyms, include_scores } = parseResult.data;

    const { icons, total, expandedTerms } = await searchIcons(
      q || "",
      category || "",
      limit,
      offset,
      expand_synonyms,
      include_scores
    );

    return NextResponse.json({
      icons,
      total,
      query: q,
      category,
      offset,
      limit,
      expanded_terms: expand_synonyms ? expandedTerms : undefined,
    });
  } catch (error) {
    log.error("Icon search error", error);
    return NextResponse.json(
      { error: "Icon search failed" },
      { status: 500 }
    );
  }
}
