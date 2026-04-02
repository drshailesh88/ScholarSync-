/**
 * Data migration: Set workflow_state for existing records.
 *
 * - All userReferences -> workflow_state = 'inbox'
 * - Web sources with status='saved' -> workflow_state = 'inbox'
 * - Web sources with status='archived' -> workflow_state = 'archived'
 * - Web sources with content_extracted=true -> extraction_state = 'ready'
 * - Web sources with content_extracted=false -> extraction_state = 'pending'
 *
 * This is idempotent — safe to run multiple times.
 * Designed to run as a one-time script after the schema migration.
 */

import { db } from "@/lib/db";
import { userReferences, webSources } from "@/lib/db/schema";
import { isNull, eq, sql } from "drizzle-orm";

export async function seedWorkflowStates(): Promise<{
  papersProcessed: number;
  webSourcesProcessed: number;
}> {
  // 1. Set all userReferences to workflow_state='inbox' where null
  await db
    .update(userReferences)
    .set({ workflowState: "inbox" })
    .where(isNull(userReferences.workflowState));

  // 2. Set web sources workflow_state based on existing status
  // Archived web sources -> workflow_state='archived'
  await db
    .update(webSources)
    .set({ workflow_state: "archived" })
    .where(eq(webSources.status, "archived"));

  // Saved (non-archived) web sources -> workflow_state='inbox'
  await db
    .update(webSources)
    .set({ workflow_state: "inbox" })
    .where(isNull(webSources.workflow_state));

  // 3. Derive extraction_state from content_extracted boolean
  await db.execute(sql`
    UPDATE web_sources
    SET extraction_state = CASE
      WHEN content_extracted = true THEN 'ready'::extraction_state
      ELSE 'pending'::extraction_state
    END
    WHERE extraction_state IS NULL OR extraction_state = 'pending'
  `);

  // Count rows that now have workflow_state set (total processed, not "changed this run")
  const paperCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(userReferences)
    .where(sql`${userReferences.workflowState} IS NOT NULL`);
  const webCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(webSources)
    .where(sql`${webSources.workflow_state} IS NOT NULL`);

  return {
    papersProcessed: Number(paperCount[0]?.count ?? 0),
    webSourcesProcessed: Number(webCount[0]?.count ?? 0),
  };
}
