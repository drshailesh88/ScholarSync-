import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getCuratedFeeds } from "@/lib/actions/feeds";

type DiscoverFilters = {
  category?: string;
  specialty?: string;
  search?: string;
};

type DiscoverValidationResult =
  | { error: NextResponse }
  | { filters: DiscoverFilters };

function validateDiscoverFilters(req: NextRequest): DiscoverValidationResult {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category")?.trim();
  const specialty = searchParams.get("specialty")?.trim();
  const search = searchParams.get("search")?.trim();

  if (category && category.length > 100) {
    return {
      error: NextResponse.json(
        { error: "Query parameter 'category' is too long" },
        { status: 400 }
      ),
    };
  }

  if (specialty && specialty.length > 100) {
    return {
      error: NextResponse.json(
        { error: "Query parameter 'specialty' is too long" },
        { status: 400 }
      ),
    };
  }

  if (search && search.length > 200) {
    return {
      error: NextResponse.json(
        { error: "Query parameter 'search' is too long" },
        { status: 400 }
      ),
    };
  }

  return {
    filters: {
      ...(category ? { category } : {}),
      ...(specialty ? { specialty } : {}),
      ...(search ? { search } : {}),
    },
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    void userId;

    const parsed = validateDiscoverFilters(req);
    if ("error" in parsed) {
      return parsed.error;
    }

    const result = await getCuratedFeeds(parsed.filters);
    return NextResponse.json({
      feeds: result.feeds,
      categories: result.categories,
      specialties: result.specialties,
      suggestedFeeds: result.suggestedFeeds,
      pubmedSuggestion: result.pubmedSuggestion,
      journals: result.feeds,
    });
  } catch (error) {
    console.error("GET /api/feeds/discover error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
