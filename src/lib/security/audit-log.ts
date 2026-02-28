import { logger } from "@/lib/logger";

export type AuditAction =
  | "billing.order_created"
  | "billing.payment_verified"
  | "share.permission_changed"
  | "share.password_set"
  | "collaborator.added"
  | "collaborator.removed"
  | "project.deleted"
  | "deck.deleted"
  | "admin.seed_executed"
  | "admin.migration_run"
  | "auth.login_failed"
  | "auth.session_revoked";

interface AuditEntry {
  action: AuditAction;
  userId: string;
  resourceType?: string;
  resourceId?: string | number;
  metadata?: Record<string, unknown>;
  ip?: string;
}

export function auditLog(entry: AuditEntry): void {
  // Structured log for audit trail
  // In production, this should write to a separate audit table or external service
  const logEntry = {
    timestamp: new Date().toISOString(),
    audit: true,
    ...entry,
  };

  logger.info(`AUDIT: ${entry.action}`, logEntry);
}

// NOTE: The following action files still contain bare .select() calls that
// should be updated with explicit column selection in a follow-up pass:
//   - src/lib/actions/analysis.ts (2 occurrences)
//   - src/lib/actions/latex.ts (7 occurrences)
//   - src/lib/actions/documents.ts (7 occurrences)
//   - src/lib/actions/versions.ts (5 occurrences)
//   - src/lib/actions/extraction.ts (2 occurrences)
//   - src/lib/actions/billing.ts (2 occurrences)
//   - src/lib/actions/dashboard.ts (1 occurrence)
//   - src/lib/actions/conversations.ts (3 occurrences)
//   - src/lib/actions/pdf-pipeline.ts (1 occurrence)
//   - src/lib/actions/papers.ts (3 occurrences)
//   - src/lib/actions/projects.ts (2 occurrences)
//   - src/lib/actions/comments.ts (2 occurrences)
//   - src/lib/actions/user.ts (2 occurrences)
// Additionally, the src/lib/systematic-review/ directory has bare .select()
// calls in internal modules (not direct API responses).
