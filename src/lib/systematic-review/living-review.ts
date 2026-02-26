/**
 * Living Review Engine
 *
 * Enables systematic reviews to stay current by periodically re-running
 * searches, detecting new papers, and auto-screening them against
 * existing criteria.
 */

import { db } from "@/lib/db";
import {
  searchAlerts,
  screeningCriteria,
} from "@/lib/db/schema";
import { papers, projectPapers } from "@/lib/db/schema";
import { eq, and, lte, sql } from "drizzle-orm";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { normalizeTitle } from "@/lib/search/dedup";
import { screenPaper } from "./screening-engine";
import type { ScreeningCriterion } from "./screening-engine";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AlertFrequency = "daily" | "weekly" | "monthly";

export interface CreateAlertInput {
  projectId: number;
  searchString: string;
  frequency: AlertFrequency;
}

export interface AlertCheckResult {
  alertId: number;
  newPapersFound: number;
  autoScreened: number;
  included: number;
  excluded: number;
}

// ---------------------------------------------------------------------------
// Create / update / delete alerts
// ---------------------------------------------------------------------------

export async function createSearchAlert(input: CreateAlertInput) {
  const nextCheck = computeNextCheck(input.frequency);

  const [alert] = await db
    .insert(searchAlerts)
    .values({
      projectId: input.projectId,
      searchString: input.searchString,
      frequency: input.frequency,
      status: "active",
      nextCheck,
    })
    .returning();

  return alert;
}

export async function updateAlertFrequency(
  alertId: number,
  frequency: AlertFrequency
) {
  const nextCheck = computeNextCheck(frequency);
  await db
    .update(searchAlerts)
    .set({ frequency, nextCheck, updatedAt: new Date() })
    .where(eq(searchAlerts.id, alertId));
}

export async function pauseAlert(alertId: number) {
  await db
    .update(searchAlerts)
    .set({ status: "paused", updatedAt: new Date() })
    .where(eq(searchAlerts.id, alertId));
}

export async function resumeAlert(alertId: number) {
  const nextCheck = new Date(); // Check immediately
  await db
    .update(searchAlerts)
    .set({ status: "active", nextCheck, updatedAt: new Date() })
    .where(eq(searchAlerts.id, alertId));
}

export async function deleteAlert(alertId: number) {
  await db.delete(searchAlerts).where(eq(searchAlerts.id, alertId));
}

// ---------------------------------------------------------------------------
// Get alerts for a project
// ---------------------------------------------------------------------------

export async function getProjectAlerts(projectId: number) {
  return db
    .select()
    .from(searchAlerts)
    .where(eq(searchAlerts.projectId, projectId))
    .orderBy(searchAlerts.createdAt);
}

// ---------------------------------------------------------------------------
// Check for new papers (single alert)
// ---------------------------------------------------------------------------

export async function checkAlertForNewPapers(
  alertId: number
): Promise<AlertCheckResult> {
  const [alert] = await db
    .select()
    .from(searchAlerts)
    .where(eq(searchAlerts.id, alertId));

  if (!alert || alert.status !== "active") {
    return { alertId, newPapersFound: 0, autoScreened: 0, included: 0, excluded: 0 };
  }

  // Build date-restricted search: papers since last check
  const sinceDate = alert.lastChecked || alert.createdAt;
  const dateFilter = sinceDate
    ? ` AND (${formatPubMedDate(sinceDate!)}[PDAT] : "3000"[PDAT])`
    : "";
  const searchQuery = alert.searchString + dateFilter;

  // Run PubMed search
  const { results } = await searchPubMed(searchQuery, { maxResults: 100 });

  // Get existing project papers to skip duplicates
  const existingPPs = await db
    .select({ paperId: projectPapers.paper_id })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, alert.projectId));
  const existingPaperIds = new Set(existingPPs.map((pp) => pp.paperId));

  // Import new papers
  let newPapersFound = 0;
  const newPaperIds: number[] = [];

  for (const result of results) {
    const paperId = await findOrCreatePaper(result);

    if (existingPaperIds.has(paperId)) continue;

    await db
      .insert(projectPapers)
      .values({
        project_id: alert.projectId,
        paper_id: paperId,
        added_by: "search",
        status: "saved",
      })
      .onConflictDoNothing();

    existingPaperIds.add(paperId);
    newPaperIds.push(paperId);
    newPapersFound++;
  }

  // Auto-screen new papers against existing criteria
  let autoScreened = 0;
  let included = 0;
  let excluded = 0;

  if (newPaperIds.length > 0) {
    const criteria = await db
      .select()
      .from(screeningCriteria)
      .where(eq(screeningCriteria.projectId, alert.projectId));

    if (criteria.length > 0) {
      const formattedCriteria: ScreeningCriterion[] = criteria.map((c) => ({
        id: c.id,
        type: c.criterionType as "inclusion" | "exclusion",
        description: c.description,
        category: c.category || undefined,
      }));

      // Get papers for screening
      const papersToScreen = await db
        .select({
          id: papers.id,
          title: papers.title,
          abstract: papers.abstract,
        })
        .from(papers)
        .where(
          sql`${papers.id} IN (${sql.join(
            newPaperIds.map((id) => sql`${id}`),
            sql`, `
          )})`
        );

      for (const paper of papersToScreen) {
        if (!paper.abstract) continue;

        try {
          const result = await screenPaper(
            alert.projectId,
            paper.id,
            paper.title,
            paper.abstract,
            formattedCriteria
          );

          if (result.finalDecision === "include") included++;
          else if (result.finalDecision === "exclude") excluded++;
          autoScreened++;
        } catch {
          // Skip papers that fail screening
        }
      }
    }
  }

  // Update alert
  const nextCheck = computeNextCheck(alert.frequency as AlertFrequency);
  await db
    .update(searchAlerts)
    .set({
      lastChecked: new Date(),
      nextCheck,
      newPapersFound: (alert.newPapersFound || 0) + newPapersFound,
      totalChecks: (alert.totalChecks || 0) + 1,
      updatedAt: new Date(),
    })
    .where(eq(searchAlerts.id, alertId));

  return { alertId, newPapersFound, autoScreened, included, excluded };
}

// ---------------------------------------------------------------------------
// Check all due alerts (for cron job)
// ---------------------------------------------------------------------------

export async function checkDueAlerts(): Promise<AlertCheckResult[]> {
  const now = new Date();

  const dueAlerts = await db
    .select()
    .from(searchAlerts)
    .where(
      and(
        eq(searchAlerts.status, "active"),
        lte(searchAlerts.nextCheck, now)
      )
    );

  const results: AlertCheckResult[] = [];

  for (const alert of dueAlerts) {
    try {
      const result = await checkAlertForNewPapers(alert.id);
      results.push(result);
    } catch (error) {
      console.error(`Alert ${alert.id} check failed:`, error);
      results.push({
        alertId: alert.id,
        newPapersFound: 0,
        autoScreened: 0,
        included: 0,
        excluded: 0,
      });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeNextCheck(frequency: AlertFrequency): Date {
  const now = new Date();
  switch (frequency) {
    case "daily":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case "weekly":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case "monthly":
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}

function formatPubMedDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

async function findOrCreatePaper(
  result: { title: string; authors?: string[]; journal?: string; year?: number; doi?: string; pmid?: string; abstract?: string; citationCount?: number; isOpenAccess?: boolean; publicationTypes?: string[] }
): Promise<number> {
  if (result.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, result.doi));
    if (existing) return existing.id;
  }

  if (result.pmid) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, result.pmid));
    if (existing) return existing.id;
  }

  if (result.title && result.year) {
    const normalized = normalizeTitle(result.title);
    const candidates = await db
      .select({ id: papers.id, title: papers.title })
      .from(papers)
      .where(eq(papers.year, result.year))
      .limit(100);

    for (const c of candidates) {
      if (normalizeTitle(c.title) === normalized) return c.id;
    }
  }

  const [newPaper] = await db
    .insert(papers)
    .values({
      title: result.title,
      authors: result.authors || [],
      journal: result.journal,
      year: result.year || 0,
      doi: result.doi || undefined,
      pubmed_id: result.pmid || undefined,
      abstract: result.abstract,
      source: "pubmed",
      citation_count: result.citationCount || 0,
      open_access: result.isOpenAccess,
      publication_types: result.publicationTypes || [],
    })
    .returning();

  return newPaper.id;
}
