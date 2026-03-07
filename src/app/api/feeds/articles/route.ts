import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getArticles } from "@/lib/actions/feeds";

// GET — Get paginated articles
export async function GET(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    void userId;

    const { searchParams } = new URL(req.url);

    const filters: Parameters<typeof getArticles>[0] = {};

    const feedSourceId = searchParams.get("feedSourceId");
    if (feedSourceId) filters.feedSourceId = parseInt(feedSourceId, 10);

    const folder = searchParams.get("folder");
    if (folder !== null) filters.folder = folder;

    const isRead = searchParams.get("isRead");
    if (isRead === "true") filters.isRead = true;
    else if (isRead === "false") filters.isRead = false;

    const isStarred = searchParams.get("isStarred");
    if (isStarred === "true") filters.isStarred = true;

    const search = searchParams.get("search");
    if (search) filters.search = search;

    const dateFrom = searchParams.get("dateFrom");
    if (dateFrom) filters.dateFrom = dateFrom;

    const dateTo = searchParams.get("dateTo");
    if (dateTo) filters.dateTo = dateTo;

    const journal = searchParams.get("journal");
    if (journal) filters.journal = journal;

    const sortBy = (searchParams.get("sortBy") || undefined) as
      | "newest"
      | "oldest"
      | "relevance"
      | "published"
      | "added"
      | "title"
      | undefined;
    if (sortBy) filters.sortBy = sortBy;

    const sortDir = searchParams.get("sortDir") as "asc" | "desc" | null;
    if (sortDir) filters.sortDir = sortDir;

    const doi = searchParams.get("doi");
    if (doi) filters.doi = doi;

    const pmid = searchParams.get("pmid");
    if (pmid) filters.pmid = pmid;

    const page = searchParams.get("page");
    if (page) filters.page = parseInt(page, 10);

    const perPage = searchParams.get("perPage");
    if (perPage) filters.perPage = parseInt(perPage, 10);

    const result = await getArticles(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/feeds/articles error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
