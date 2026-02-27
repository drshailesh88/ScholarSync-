/**
 * Audit Trail — RAISE compliance for systematic review actions.
 *
 * Every significant action in a systematic review project is persisted to
 * `sr_audit_log` so that reviewers and auditors can reconstruct exactly what
 * happened, who did it, and whether AI was involved.
 *
 * RAISE 2025 guidelines require transparent AI-usage disclosure; the
 * `aiInvolved` flag on each event makes that disclosure machine-readable.
 */

import { db } from "@/lib/db";
import { srAuditLog } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuditEvent {
  projectId: number;
  userId: string;
  /** Controlled vocabulary:
   *  'screen' | 'extract' | 'rob2_assess' | 'resolve_conflict' |
   *  'import' | 'export' | 'config_change' | 'meta_analysis' | 'grade_assess'
   */
  action: string;
  /** 'paper' | 'decision' | 'extraction' | 'config' | 'analysis' */
  entityType: string;
  entityId?: number;
  details?: Record<string, unknown>;
  aiInvolved?: boolean;
}

export interface AuditLogEntry {
  id: number;
  userId: string;
  action: string;
  entityType: string;
  entityId: number | null;
  details: unknown;
  aiInvolved: boolean;
  createdAt: Date | null;
}

export interface AuditSummary {
  totalEvents: number;
  aiAssistedEvents: number;
  humanOnlyEvents: number;
  eventsByAction: Record<string, number>;
}

// ---------------------------------------------------------------------------
// logAuditEvent
// ---------------------------------------------------------------------------

/**
 * Persist a single audit event.  Fire-and-forget safe — caller does not need
 * to await this if they do not want to block on logging.
 */
export async function logAuditEvent(event: AuditEvent): Promise<void> {
  await db.insert(srAuditLog).values({
    projectId: event.projectId,
    userId: event.userId,
    action: event.action,
    entityType: event.entityType,
    entityId: event.entityId ?? null,
    details: event.details ?? null,
    aiInvolved: event.aiInvolved ?? false,
  });
}

// ---------------------------------------------------------------------------
// getAuditLog
// ---------------------------------------------------------------------------

/**
 * Fetch the audit log for a project with optional filters.
 *
 * @param projectId  — The project to query.
 * @param options.limit  — Maximum rows to return (default 100).
 * @param options.offset — Row offset for pagination (default 0).
 * @param options.action — Filter to a specific action type.
 * @param options.userId — Filter to a specific user.
 */
export async function getAuditLog(
  projectId: number,
  options?: {
    limit?: number;
    offset?: number;
    action?: string;
    userId?: string;
  }
): Promise<AuditLogEntry[]> {
  const limit = options?.limit ?? 100;
  const offset = options?.offset ?? 0;

  // Build the where conditions incrementally
  const conditions = [eq(srAuditLog.projectId, projectId)];

  if (options?.action) {
    conditions.push(eq(srAuditLog.action, options.action));
  }

  if (options?.userId) {
    conditions.push(eq(srAuditLog.userId, options.userId));
  }

  const rows = await db
    .select({
      id: srAuditLog.id,
      userId: srAuditLog.userId,
      action: srAuditLog.action,
      entityType: srAuditLog.entityType,
      entityId: srAuditLog.entityId,
      details: srAuditLog.details,
      aiInvolved: srAuditLog.aiInvolved,
      createdAt: srAuditLog.createdAt,
    })
    .from(srAuditLog)
    .where(and(...conditions))
    .orderBy(desc(srAuditLog.createdAt))
    .limit(limit)
    .offset(offset);

  return rows.map((r) => ({
    ...r,
    aiInvolved: r.aiInvolved ?? false,
  }));
}

// ---------------------------------------------------------------------------
// exportAuditLog
// ---------------------------------------------------------------------------

/**
 * Export the full audit log for a project as a CSV string.
 *
 * Columns: Timestamp, User, Action, Entity Type, Entity ID, AI Involved, Details
 */
export async function exportAuditLog(projectId: number): Promise<string> {
  const rows = await db
    .select({
      id: srAuditLog.id,
      userId: srAuditLog.userId,
      action: srAuditLog.action,
      entityType: srAuditLog.entityType,
      entityId: srAuditLog.entityId,
      details: srAuditLog.details,
      aiInvolved: srAuditLog.aiInvolved,
      createdAt: srAuditLog.createdAt,
    })
    .from(srAuditLog)
    .where(eq(srAuditLog.projectId, projectId))
    .orderBy(srAuditLog.createdAt);

  const header =
    "Timestamp,User,Action,Entity Type,Entity ID,AI Involved,Details";

  const csvRows = rows.map((row) => {
    const timestamp = row.createdAt
      ? row.createdAt.toISOString()
      : "";
    const details =
      row.details != null
        ? `"${JSON.stringify(row.details).replace(/"/g, '""')}"`
        : "";
    const entityId = row.entityId != null ? String(row.entityId) : "";
    const aiInvolved = row.aiInvolved ? "true" : "false";

    return [
      timestamp,
      csvEscape(row.userId),
      csvEscape(row.action),
      csvEscape(row.entityType),
      entityId,
      aiInvolved,
      details,
    ].join(",");
  });

  return [header, ...csvRows].join("\n");
}

// ---------------------------------------------------------------------------
// getAuditSummary
// ---------------------------------------------------------------------------

/**
 * Aggregate statistics for a project's audit log.
 */
export async function getAuditSummary(
  projectId: number
): Promise<AuditSummary> {
  // Total and AI-assisted counts via a single aggregate query
  const [counts] = await db
    .select({
      total: sql<number>`count(*)::int`,
      aiCount: sql<number>`count(*) filter (where ${srAuditLog.aiInvolved} = true)::int`,
    })
    .from(srAuditLog)
    .where(eq(srAuditLog.projectId, projectId));

  const totalEvents = counts?.total ?? 0;
  const aiAssistedEvents = counts?.aiCount ?? 0;

  // Per-action breakdown
  const actionRows = await db
    .select({
      action: srAuditLog.action,
      count: sql<number>`count(*)::int`,
    })
    .from(srAuditLog)
    .where(eq(srAuditLog.projectId, projectId))
    .groupBy(srAuditLog.action);

  const eventsByAction: Record<string, number> = {};
  for (const row of actionRows) {
    eventsByAction[row.action] = row.count;
  }

  return {
    totalEvents,
    aiAssistedEvents,
    humanOnlyEvents: totalEvents - aiAssistedEvents,
    eventsByAction,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
