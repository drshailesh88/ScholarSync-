import type { Reference } from "@/types/citation";
import { toSerializableJson } from "./serializable-json";

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

type JsonObject = { [key: string]: JsonValue };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeCitationNode(node: Record<string, unknown>): JsonObject | null {
  const attrs = isRecord(node.attrs) ? { ...node.attrs } : {};
  const rawReferenceIds = Array.isArray(attrs.referenceIds)
    ? attrs.referenceIds
    : [];
  const referenceIds = rawReferenceIds.filter(
    (referenceId): referenceId is string =>
      typeof referenceId === "string" && referenceId.trim().length > 0
  );

  if (referenceIds.length === 0) {
    return null;
  }

  const rawSnapshots = Array.isArray(attrs.referenceSnapshots)
    ? attrs.referenceSnapshots
    : [];
  const referenceSnapshots = rawSnapshots.filter((snapshot): snapshot is Reference =>
    isRecord(snapshot) &&
    typeof snapshot.id === "string" &&
    referenceIds.includes(snapshot.id)
  );

  return {
    ...(toSerializableJson(node) as JsonObject),
    attrs: {
      ...(toSerializableJson(attrs) as JsonObject),
      referenceIds,
      referenceSnapshots: toSerializableJson(referenceSnapshots) as unknown as JsonValue,
    },
  };
}

function sanitizeNode(
  value: unknown,
  bibliographySeen: { current: boolean }
): JsonValue | null {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeNode(item, bibliographySeen))
      .filter((item): item is JsonValue => item !== null);
  }

  if (!isRecord(value)) {
    return value as JsonValue;
  }

  if (value.type === "citation") {
    return sanitizeCitationNode(value);
  }

  if (value.type === "bibliography") {
    if (bibliographySeen.current) {
      return null;
    }
    bibliographySeen.current = true;
  }

  const nextNode = { ...(toSerializableJson(value) as JsonObject) };
  if (Array.isArray(value.content)) {
    nextNode.content = value.content
      .map((item) => sanitizeNode(item, bibliographySeen))
      .filter((item): item is JsonValue => item !== null);
  }

  return nextNode;
}

export function sanitizeEditorContent<T>(content: T): T {
  const bibliographySeen = { current: false };
  return sanitizeNode(content, bibliographySeen) as T;
}
