"use server";

import { db } from "@/lib/db";
import {
  synthesisDocuments,
  synthesisSections,
  projects,
} from "@/lib/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { analyzeWriting, type WritingIssue, type WritingMetrics } from "@/lib/writing-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DocumentForAnalysis {
  documentId: number;
  documentTitle: string;
  projectId: number;
  projectTitle: string;
  plainText: string;
  wordCount: number;
}

export interface FullWritingAnalysis {
  document: DocumentForAnalysis;
  issues: WritingIssue[];
  metrics: WritingMetrics;
}

// ---------------------------------------------------------------------------
// Load the active document's plain text for analysis
// ---------------------------------------------------------------------------
export async function getActiveDocumentForAnalysis(
  projectId?: number | null
): Promise<DocumentForAnalysis | null> {
  const userId = await getCurrentUserId();

  let targetProjectId = projectId;

  if (!targetProjectId) {
    // Find the user's most recent project
    const [latestProject] = await db
      .select({ id: projects.id, title: projects.title })
      .from(projects)
      .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
      .orderBy(desc(projects.updated_at))
      .limit(1);

    if (!latestProject) return null;
    targetProjectId = latestProject.id;
  }

  // Find the most recent document for this project
  const [doc] = await db
    .select()
    .from(synthesisDocuments)
    .where(
      and(
        eq(synthesisDocuments.project_id, targetProjectId),
        isNull(synthesisDocuments.deleted_at)
      )
    )
    .orderBy(desc(synthesisDocuments.updated_at))
    .limit(1);

  if (!doc) return null;

  // Get all sections and concatenate their plain text
  const sections = await db
    .select()
    .from(synthesisSections)
    .where(eq(synthesisSections.document_id, doc.id))
    .orderBy(synthesisSections.sort_order);

  const plainTextParts: string[] = [];
  let totalWordCount = 0;

  for (const section of sections) {
    if (section.plain_text_content && section.plain_text_content.trim()) {
      plainTextParts.push(section.plain_text_content.trim());
      totalWordCount += section.word_count ?? 0;
    }
  }

  const plainText = plainTextParts.join("\n\n");

  if (!plainText.trim()) return null;

  // Get project title
  const [project] = await db
    .select({ title: projects.title })
    .from(projects)
    .where(eq(projects.id, targetProjectId));

  return {
    documentId: doc.id,
    documentTitle: doc.title,
    projectId: targetProjectId,
    projectTitle: project?.title ?? "Untitled Project",
    plainText,
    wordCount: totalWordCount || plainText.split(/\s+/).filter(Boolean).length,
  };
}

// ---------------------------------------------------------------------------
// Run local writing analysis on the active document
// ---------------------------------------------------------------------------
export async function runWritingAnalysis(
  projectId?: number | null
): Promise<FullWritingAnalysis | null> {
  const doc = await getActiveDocumentForAnalysis(projectId);
  if (!doc) return null;

  const { issues, metrics } = analyzeWriting(doc.plainText);

  return {
    document: doc,
    issues,
    metrics,
  };
}

// ---------------------------------------------------------------------------
// Run writing analysis on arbitrary text (for manual paste mode)
// ---------------------------------------------------------------------------
export async function analyzeText(
  text: string
): Promise<{ issues: WritingIssue[]; metrics: WritingMetrics }> {
  return analyzeWriting(text);
}

// ---------------------------------------------------------------------------
// List user projects (for project selector in analysis pages)
// ---------------------------------------------------------------------------
export async function listProjectsForAnalysis(): Promise<
  { id: number; title: string }[]
> {
  const userId = await getCurrentUserId();
  return db
    .select({ id: projects.id, title: projects.title })
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at));
}
