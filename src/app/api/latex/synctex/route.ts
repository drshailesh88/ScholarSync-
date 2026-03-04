import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexCompilations, latexProjects } from "@/lib/db/schema/editor";
import { eq, and, desc } from "drizzle-orm";
import {
  parseSyncTeX,
  forwardSearch,
  backwardSearch,
  type SyncTeXData,
} from "@/lib/latex/synctex";

// Cache for parsed SyncTeX data
const synctexCache = new Map<string, { data: SyncTeXData; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/** POST — forward search: source position → PDF position */
export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const { projectId, file, line } = body;

    if (!projectId || !file || typeof line !== "number") {
      return NextResponse.json(
        { error: "Missing required fields: projectId, file, line" },
        { status: 400 }
      );
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get the latest compilation with SyncTeX data
    const synctexData = await getSyncTeXData(projectId);
    if (!synctexData) {
      return NextResponse.json(
        { error: "No SyncTeX data available. Compile the document first." },
        { status: 404 }
      );
    }

    // Perform forward search
    const pdfPosition = forwardSearch(synctexData, file, line);

    return NextResponse.json({
      success: true,
      position: pdfPosition || null,
    });
  } catch (error) {
    console.error("SyncTeX forward search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** GET — backward search: PDF position → source position */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const page = parseInt(searchParams.get("page") || "0", 10);
    const x = parseFloat(searchParams.get("x") || "0");
    const y = parseFloat(searchParams.get("y") || "0");

    if (!projectId || !page) {
      return NextResponse.json(
        { error: "Missing required parameters: projectId, page" },
        { status: 400 }
      );
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get the latest compilation with SyncTeX data
    const synctexData = await getSyncTeXData(projectId);
    if (!synctexData) {
      return NextResponse.json(
        { error: "No SyncTeX data available. Compile the document first." },
        { status: 404 }
      );
    }

    // Perform backward search
    const sourcePosition = backwardSearch(synctexData, page, x, y);

    return NextResponse.json({
      success: true,
      position: sourcePosition || null,
    });
  } catch (error) {
    console.error("SyncTeX backward search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Get cached SyncTeX data for a project
 */
async function getSyncTeXData(projectId: string): Promise<SyncTeXData | null> {
  // Check cache first
  const cached = synctexCache.get(projectId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Get the latest compilation with SyncTeX data
  const [compilation] = await db
    .select()
    .from(latexCompilations)
    .where(eq(latexCompilations.latexProjectId, projectId))
    .orderBy(desc(latexCompilations.createdAt))
    .limit(1);

  if (!compilation || !compilation.synctexData) {
    return null;
  }

  try {
    // Parse the SyncTeX data (stored as base64-encoded gz content)
    const synctexBuffer = Buffer.from(compilation.synctexData, "base64");
    const data = await parseSyncTeX(synctexBuffer);

    // Cache the parsed data
    synctexCache.set(projectId, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error("Failed to parse SyncTeX data:", error);
    return null;
  }
}

/**
 * Clear the SyncTeX cache for a project
 */
export function clearSyncTeXCache(projectId: string): void {
  synctexCache.delete(projectId);
}
