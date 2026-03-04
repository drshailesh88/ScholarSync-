import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// GET /api/illustration/icons/search
// Searches icon metadata from FINNISH icon libraries
// ---------------------------------------------------------------------------

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
});

/**
 * Icon metadata structure (simplified for search results)
 */
interface IconMetadata {
  name: string;
  category: string;
  tags: string[];
  library: "tabler" | "healthicons" | "scienceicons" | "iconpark" | "simple" | "bioicons";
}

/**
 * Mock icon data — in production, this would query the icon database
 * For now, return placeholder results
 */
function searchIcons(query: string, category: string, limit: number): IconMetadata[] {
  // TODO: Implement actual icon search from FINNISH icon data
  // For now, return empty array with structure for future implementation

  const mockResults: IconMetadata[] = [
    {
      name: "dna",
      category: "biology",
      tags: ["genetics", "molecule", "helix"],
      library: "bioicons",
    },
    {
      name: "heart",
      category: "medicine",
      tags: ["cardiology", "organ", "health"],
      library: "healthicons",
    },
    {
      name: "atom",
      category: "physics",
      tags: ["quantum", "science", "electron"],
      library: "scienceicons",
    },
  ];

  let results = mockResults;

  // Filter by query
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (icon) =>
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Filter by category
  if (category && category !== "All") {
    results = results.filter((icon) => icon.category === category.toLowerCase());
  }

  return results.slice(0, limit);
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
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { q, category, limit } = parseResult.data;
    const results = searchIcons(q || "", category || "", limit);

    return NextResponse.json({
      icons: results,
      total: results.length,
      query: q,
      category,
    });
  } catch (error) {
    log.error("Icon search error", error);
    return NextResponse.json(
      { error: "Icon search failed" },
      { status: 500 }
    );
  }
}
