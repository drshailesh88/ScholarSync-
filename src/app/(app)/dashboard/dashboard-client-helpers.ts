import type { LocalDocument } from "@/lib/editor/migrate-local-documents";

export const LOCAL_DOCUMENT_PREFIX = "scholarsync_doc_";
export const LOCAL_DOCUMENT_MIGRATION_FLAG = "scholarsync_migration_completed";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "key" | "length">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function collectLocalDocuments(storage: StorageLike): LocalDocument[] {
  const docs: LocalDocument[] = [];

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key || !key.startsWith(LOCAL_DOCUMENT_PREFIX)) {
      continue;
    }

    const raw = storage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (!isRecord(parsed) || !("content" in parsed)) {
        continue;
      }

      docs.push({
        key,
        documentId: key.slice(LOCAL_DOCUMENT_PREFIX.length),
        data: {
          content: parsed.content,
          plainText:
            typeof parsed.plainText === "string" ? parsed.plainText : undefined,
          wordCount:
            typeof parsed.wordCount === "number" ? parsed.wordCount : undefined,
          title: typeof parsed.title === "string" ? parsed.title : undefined,
          documentType:
            typeof parsed.documentType === "string"
              ? parsed.documentType
              : undefined,
          timestamp:
            typeof parsed.timestamp === "number" ? parsed.timestamp : undefined,
        },
      });
    } catch (error) {
      console.error(`Failed to parse local dashboard document ${key}:`, error);
    }
  }

  return docs.sort(
    (left, right) => (left.data.timestamp ?? 0) - (right.data.timestamp ?? 0)
  );
}

export function hasCompletedLocalDocumentMigration(storage: StorageLike): boolean {
  return storage.getItem(LOCAL_DOCUMENT_MIGRATION_FLAG) === "true";
}

export function markLocalDocumentMigrationComplete(storage: StorageLike): void {
  storage.setItem(LOCAL_DOCUMENT_MIGRATION_FLAG, "true");
}
