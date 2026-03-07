"use server";

import { db } from "@/lib/db";
import { papers, paperChunks, userReferences } from "@/lib/db/schema";
import { and, asc, eq, inArray, isNull } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import {
  generateSourceOverview,
  storeSourceOverview,
  getStoredOverview,
} from "@/lib/rag/source-summarizer";
import type { SourceOverview } from "@/lib/rag/source-summarizer";

export interface PaperNotes {
  paperId: number;
  title: string;
  authors: string[];
  abstract: string | null;
  overview: SourceOverview | null;
  isGenerating?: boolean;
}

function normalizeAuthors(authors: unknown): string[] {
  if (!Array.isArray(authors)) return [];

  return authors
    .map((author) => {
      if (typeof author === "string") return author.trim();
      if (!author || typeof author !== "object") return "";

      const record = author as Record<string, unknown>;
      const name =
        (typeof record.name === "string" && record.name) ||
        (typeof record.full_name === "string" && record.full_name) ||
        (typeof record.author === "string" && record.author);

      return name ? name.trim() : "";
    })
    .filter(Boolean)
    .slice(0, 5);
}

function metadataToOverview(metadata: unknown): SourceOverview | null {
  if (!metadata || typeof metadata !== "object") return null;

  const sourceOverview = (metadata as Record<string, unknown>).sourceOverview;
  if (!sourceOverview || typeof sourceOverview !== "object") return null;

  const overview = sourceOverview as Record<string, unknown>;

  if (
    typeof overview.summary !== "string" ||
    !Array.isArray(overview.keyTopics) ||
    !Array.isArray(overview.suggestedQuestions) ||
    typeof overview.generatedAt !== "string"
  ) {
    return null;
  }

  return {
    summary: overview.summary,
    keyTopics: overview.keyTopics.filter((t): t is string => typeof t === "string"),
    suggestedQuestions: overview.suggestedQuestions.filter(
      (q): q is string => typeof q === "string"
    ),
    generatedAt: overview.generatedAt,
  };
}

/**
 * Get source notes for a single paper.
 * Returns cached overview if available, null overview if not yet generated.
 */
export async function getPaperNotes(paperId: number): Promise<PaperNotes | null> {
  const userId = await getCurrentUserId();

  const [paper] = await db
    .select({
      id: papers.id,
      title: papers.title,
      authors: papers.authors,
      abstract: papers.abstract,
    })
    .from(papers)
    .innerJoin(userReferences, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(papers.id, paperId),
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt)
      )
    )
    .limit(1);

  if (!paper) return null;

  const overview = await getStoredOverview(paperId);

  return {
    paperId: paper.id,
    title: paper.title,
    authors: normalizeAuthors(paper.authors),
    abstract: paper.abstract,
    overview,
  };
}

/**
 * Get source notes for multiple papers at once.
 * Reads cached overviews only (no AI generation).
 */
export async function getBatchPaperNotes(paperIds: number[]): Promise<PaperNotes[]> {
  const userId = await getCurrentUserId();

  const uniquePaperIds = [...new Set(paperIds)].filter((id) => Number.isInteger(id) && id > 0);
  if (uniquePaperIds.length === 0) return [];

  const rows = await db
    .select({
      id: papers.id,
      title: papers.title,
      authors: papers.authors,
      abstract: papers.abstract,
      metadata: papers.metadata,
    })
    .from(papers)
    .innerJoin(userReferences, eq(userReferences.paperId, papers.id))
    .where(
      and(
        inArray(papers.id, uniquePaperIds),
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt)
      )
    );

  return rows.map((paper) => ({
    paperId: paper.id,
    title: paper.title,
    authors: normalizeAuthors(paper.authors),
    abstract: paper.abstract,
    overview: metadataToOverview(paper.metadata),
  }));
}

/**
 * Generate (or regenerate) a source overview for a paper.
 * Fetches the paper's chunks, runs AI summarization, caches the result.
 */
export async function generatePaperOverview(paperId: number): Promise<SourceOverview> {
  const userId = await getCurrentUserId();

  const [paper] = await db
    .select({
      id: papers.id,
      title: papers.title,
      authors: papers.authors,
    })
    .from(papers)
    .innerJoin(userReferences, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(papers.id, paperId),
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt)
      )
    )
    .limit(1);

  if (!paper) {
    throw new Error(`Paper ${paperId} not found`);
  }

  const chunks = await db
    .select({
      text: paperChunks.text,
      section_type: paperChunks.section_type,
      chunk_index: paperChunks.chunk_index,
    })
    .from(paperChunks)
    .where(eq(paperChunks.paper_id, paperId))
    .orderBy(asc(paperChunks.chunk_index))
    .limit(10);

  if (chunks.length === 0) {
    throw new Error("No text chunks available. Upload and process the PDF first.");
  }

  const authors = normalizeAuthors(paper.authors).slice(0, 3);
  const overview = await generateSourceOverview(paper.title, authors, chunks);

  await storeSourceOverview(paperId, overview);

  return overview;
}
