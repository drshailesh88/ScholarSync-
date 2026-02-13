"use server";

import { db } from "@/lib/db";
import { synthesisDocuments, synthesisSections, synthesisVersions } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

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

export async function createDocument(projectId: number, title: string) {
  const [doc] = await db
    .insert(synthesisDocuments)
    .values({
      project_id: projectId,
      title,
      document_type: "review_article",
      overall_status: "drafting",
    })
    .returning();

  // Create default sections
  const defaultSections = [
    { type: "abstract" as const, title: "Abstract", order: 0 },
    { type: "introduction" as const, title: "Introduction", order: 1 },
    { type: "methodology" as const, title: "Methodology", order: 2 },
    { type: "results" as const, title: "Results", order: 3 },
    { type: "discussion" as const, title: "Discussion", order: 4 },
    { type: "conclusion" as const, title: "Conclusion", order: 5 },
    { type: "references" as const, title: "References", order: 6 },
  ];

  for (const section of defaultSections) {
    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: section.type,
      title: section.title,
      sort_order: section.order,
      status: "draft",
    });
  }

  return doc;
}

export async function updateSection(
  sectionId: number,
  data: {
    editor_content?: unknown;
    plain_text_content?: string;
    word_count?: number;
  }
) {
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
  return section;
}

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
