"use server";

import { db } from "@/lib/db";
import {
  synthesisDocuments,
  synthesisSections,
  synthesisVersions,
  projects,
} from "@/lib/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Load a single document with its sections
// ---------------------------------------------------------------------------
export async function getDocument(id: number) {
  const [doc] = await db
    .select()
    .from(synthesisDocuments)
    .where(eq(synthesisDocuments.id, id));

  if (!doc) return null;

  const sections = await db
    .select()
    .from(synthesisSections)
    .where(eq(synthesisSections.document_id, id))
    .orderBy(synthesisSections.sort_order);

  return { ...doc, sections };
}

// ---------------------------------------------------------------------------
// Load the latest studio document for the current user.
// Optionally scoped to a project.
// If no document exists, one is created automatically.
// ---------------------------------------------------------------------------
export async function loadStudioDocument(projectId?: number | null) {
  const userId = await getCurrentUserId();

  // If a project is specified, load the most recent document for that project
  if (projectId) {
    const [existing] = await db
      .select()
      .from(synthesisDocuments)
      .where(
        and(
          eq(synthesisDocuments.project_id, projectId),
          isNull(synthesisDocuments.deleted_at)
        )
      )
      .orderBy(desc(synthesisDocuments.updated_at))
      .limit(1);

    if (existing) {
      const sections = await db
        .select()
        .from(synthesisSections)
        .where(eq(synthesisSections.document_id, existing.id))
        .orderBy(synthesisSections.sort_order);
      return { ...existing, sections };
    }

    // No document for this project yet -- create one
    return createStudioDocument(projectId, "Untitled Document");
  }

  // No project specified -- find the user's most recent document across their projects
  const userProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at))
    .limit(1);

  if (userProjects.length > 0) {
    const pid = userProjects[0].id;
    const [existing] = await db
      .select()
      .from(synthesisDocuments)
      .where(
        and(
          eq(synthesisDocuments.project_id, pid),
          isNull(synthesisDocuments.deleted_at)
        )
      )
      .orderBy(desc(synthesisDocuments.updated_at))
      .limit(1);

    if (existing) {
      const sections = await db
        .select()
        .from(synthesisSections)
        .where(eq(synthesisSections.document_id, existing.id))
        .orderBy(synthesisSections.sort_order);
      return { ...existing, sections };
    }

    // Project exists but no document -- create one
    return createStudioDocument(pid, "Untitled Document");
  }

  // No projects at all -- create a default project + document
  const [newProject] = await db
    .insert(projects)
    .values({
      user_id: userId,
      title: "My Research",
      project_type: "review_article",
      status: "drafting",
    })
    .returning();

  return createStudioDocument(newProject.id, "Untitled Document");
}

// ---------------------------------------------------------------------------
// Create a new document with default sections
// ---------------------------------------------------------------------------
async function createStudioDocument(projectId: number, title: string) {
  const [doc] = await db
    .insert(synthesisDocuments)
    .values({
      project_id: projectId,
      title,
      document_type: "review_article",
      overall_status: "drafting",
    })
    .returning();

  const defaultSections = [
    { type: "abstract" as const, title: "Abstract", order: 0 },
    { type: "introduction" as const, title: "Introduction", order: 1 },
    { type: "methodology" as const, title: "Methodology", order: 2 },
    { type: "results" as const, title: "Results", order: 3 },
    { type: "discussion" as const, title: "Discussion", order: 4 },
    { type: "conclusion" as const, title: "Conclusion", order: 5 },
    { type: "references" as const, title: "References", order: 6 },
  ];

  const sections = [];
  for (const section of defaultSections) {
    const [s] = await db
      .insert(synthesisSections)
      .values({
        document_id: doc.id,
        section_type: section.type,
        title: section.title,
        sort_order: section.order,
        status: "draft",
      })
      .returning();
    sections.push(s);
  }

  return { ...doc, sections };
}

// ---------------------------------------------------------------------------
// Public createDocument (kept for backwards compat)
// ---------------------------------------------------------------------------
export async function createDocument(projectId: number, title: string) {
  return createStudioDocument(projectId, title);
}

// ---------------------------------------------------------------------------
// Save document content.
// We store the entire editor JSON in the first "custom" section that acts as
// the single-blob section for the studio editor. If no such section exists
// we use the first section (introduction or whatever is sort_order 0).
// ---------------------------------------------------------------------------
export async function saveDocumentContent(data: {
  documentId: number;
  title: string;
  editor_content: unknown;
  plain_text_content: string;
  word_count: number;
  sectionId?: number;
}) {
  // Update the document title + updated_at
  await db
    .update(synthesisDocuments)
    .set({
      title: data.title,
      updated_at: new Date(),
    })
    .where(eq(synthesisDocuments.id, data.documentId));

  // Determine which section to save into
  let sectionId = data.sectionId;
  if (!sectionId) {
    // Use the first section by sort_order
    const [firstSection] = await db
      .select()
      .from(synthesisSections)
      .where(eq(synthesisSections.document_id, data.documentId))
      .orderBy(synthesisSections.sort_order)
      .limit(1);

    if (!firstSection) {
      // Shouldn't happen, but create a section just in case
      const [created] = await db
        .insert(synthesisSections)
        .values({
          document_id: data.documentId,
          section_type: "custom",
          title: "Content",
          sort_order: 0,
          status: "draft",
        })
        .returning();
      sectionId = created.id;
    } else {
      sectionId = firstSection.id;
    }
  }

  // Update section content
  const [section] = await db
    .update(synthesisSections)
    .set({
      editor_content: data.editor_content as any,
      plain_text_content: data.plain_text_content,
      word_count: data.word_count,
      updated_at: new Date(),
    })
    .where(eq(synthesisSections.id, sectionId))
    .returning();

  return { documentId: data.documentId, sectionId, updatedAt: new Date() };
}

// ---------------------------------------------------------------------------
// Save individual section content (finer grained)
// ---------------------------------------------------------------------------
export async function updateSection(
  sectionId: number,
  data: {
    editor_content?: unknown;
    plain_text_content?: string;
    word_count?: number;
    title?: string;
  }
) {
  const setData: Record<string, unknown> = { updated_at: new Date() };
  if (data.editor_content !== undefined) setData.editor_content = data.editor_content;
  if (data.plain_text_content !== undefined) setData.plain_text_content = data.plain_text_content;
  if (data.word_count !== undefined) setData.word_count = data.word_count;
  if (data.title !== undefined) setData.title = data.title;

  const [section] = await db
    .update(synthesisSections)
    .set(setData as any)
    .where(eq(synthesisSections.id, sectionId))
    .returning();
  return section;
}

// ---------------------------------------------------------------------------
// Update just the document title
// ---------------------------------------------------------------------------
export async function updateDocumentTitle(documentId: number, title: string) {
  const [doc] = await db
    .update(synthesisDocuments)
    .set({ title, updated_at: new Date() })
    .where(eq(synthesisDocuments.id, documentId))
    .returning();
  return doc;
}

// ---------------------------------------------------------------------------
// Auto-save a version snapshot
// ---------------------------------------------------------------------------
export async function autoSaveVersion(
  documentId: number,
  sectionId: number,
  content: unknown
) {
  await db.insert(synthesisVersions).values({
    document_id: documentId,
    section_id: sectionId,
    version_number: Date.now(),
    content_snapshot: content as any,
    auto_saved: true,
    saved_by: "auto",
  });
}

// ---------------------------------------------------------------------------
// List all projects for the current user (for project selector)
// ---------------------------------------------------------------------------
export async function listUserProjects() {
  const userId = await getCurrentUserId();
  return db
    .select({ id: projects.id, title: projects.title })
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at));
}
