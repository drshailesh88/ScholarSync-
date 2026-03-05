"use server";

import { db } from "@/lib/db";
import { projects, synthesisDocuments, synthesisSections } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

const _MIGRATION_FLAG_KEY = "scholarsync_migration_completed";

export interface MigrationResult {
  migrated: number;
  skipped: number;
  errors: string[];
}

export interface LocalDocument {
  key: string;
  documentId: string;
  data: {
    content: unknown;
    plainText?: string;
    wordCount?: number;
    title?: string;
    documentType?: string;
    timestamp?: number;
  };
}

/**
 * One-time migration of localStorage documents to database storage.
 *
 * This server action:
 * 1. Accepts localStorage documents from the client
 * 2. Gets the current user's ID
 * 3. Creates a default project if none exists
 * 4. Migrates each document to the database as a synthesis_document
 *
 * This is called from the client with localStorage data.
 */
export async function migrateLocalDocuments(
  localDocs?: LocalDocument[]
): Promise<number> {
  const result: MigrationResult = {
    migrated: 0,
    skipped: 0,
    errors: [],
  };

  try {
    // If no documents provided, return 0 (nothing to migrate)
    if (!localDocs || localDocs.length === 0) {
      console.log("No local documents to migrate");
      return 0;
    }

    // Get current user
    const userId = await getCurrentUserId();

    // Get or create default project
    let projectId: number;

    const existingProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.user_id, userId))
      .limit(1);

    if (existingProjects.length > 0) {
      projectId = existingProjects[0].id;
    } else {
      const [newProject] = await db
        .insert(projects)
        .values({
          user_id: userId,
          title: "My Research",
          project_type: "review_article",
          status: "drafting",
        })
        .returning();
      projectId = newProject.id;
    }

    // Migrate each document
    for (const { documentId, data } of localDocs) {
      try {
        // Skip "new" documents (they're just templates)
        if (documentId === "new") {
          result.skipped++;
          continue;
        }

        // Create synthesis document
        const [doc] = await db
          .insert(synthesisDocuments)
          .values({
            project_id: projectId,
            title: data.title || `Migrated Document ${documentId}`,
            document_type:
              (data.documentType as "original_article" | "case_report" | "review_article" | "meta_analysis") ||
              "original_article",
            overall_status: "drafting",
          })
          .returning();

        // Create section with content
        await db.insert(synthesisSections).values({
          document_id: doc.id,
          section_type: "custom",
          title: "Content",
          sort_order: 0,
          editor_content: data.content as Record<string, unknown>,
          plain_text_content: data.plainText || "",
          word_count: data.wordCount || 0,
          status: "draft",
        });

        result.migrated++;
        console.log(`Migrated document ${documentId} → DB ID ${doc.id}`);
      } catch (error) {
        const errorMsg = `Failed to migrate ${documentId}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    console.log(
      `Migration complete: ${result.migrated} migrated, ${result.skipped} skipped, ${result.errors.length} errors`
    );

    if (result.errors.length > 0) {
      console.error("Migration errors:", result.errors);
    }

    return result.migrated;
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}
