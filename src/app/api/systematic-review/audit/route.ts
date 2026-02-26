/**
 * /api/systematic-review/audit
 *
 * RAISE-compliance audit trail for systematic review projects.
 *
 * GET  ?projectId=<n>&limit=<n>&offset=<n>&action=<str>&format=json|csv
 *   — Returns the audit log for the given project.
 *   — Any project member (owner or collaborator) may query the log.
 *   — When format=csv, responds with a downloadable CSV attachment.
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";
import {
  getAuditLog,
  exportAuditLog,
  getAuditSummary,
} from "@/lib/systematic-review/audit-trail";

// ---------------------------------------------------------------------------
// GET — Fetch or export the audit log
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);

    // ---- Parse query params ------------------------------------------------
    const projectId = parseInt(searchParams.get("projectId") ?? "0", 10);
    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // ---- Access control ----------------------------------------------------
    const { allowed } = await verifyProjectAccess(projectId, userId);
    if (!allowed) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 403 }
      );
    }

    const format = (searchParams.get("format") ?? "json").toLowerCase();
    const actionFilter = searchParams.get("action") ?? undefined;
    const userFilter = searchParams.get("userId") ?? undefined;
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10),
      500 // hard cap
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);

    // ---- CSV export --------------------------------------------------------
    if (format === "csv") {
      const csv = await exportAuditLog(projectId);
      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="audit-log-project-${projectId}.csv"`,
        },
      });
    }

    // ---- JSON response -----------------------------------------------------
    const [entries, summary] = await Promise.all([
      getAuditLog(projectId, {
        limit,
        offset,
        action: actionFilter,
        userId: userFilter,
      }),
      getAuditSummary(projectId),
    ]);

    return NextResponse.json({
      entries,
      summary,
      pagination: {
        limit,
        offset,
        returned: entries.length,
      },
    });
  } catch (error) {
    console.error("GET /systematic-review/audit error", error);
    return NextResponse.json(
      { error: "Failed to fetch audit log" },
      { status: 500 }
    );
  }
}
