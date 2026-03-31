"use server";

import { and, asc, eq, sql } from "drizzle-orm";

import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { scopes } from "@/lib/db/schema";

const MAX_SCOPES_PER_USER = 20;

export interface ScopeRecord {
  id: number;
  name: string;
  includedDomains: string[];
  excludedDomains: string[];
  includedKeywords: string[];
  excludedKeywords: string[];
  dateFrom: Date | null;
  dateTo: Date | null;
  region: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CreateScopeInput {
  name: string;
  includedDomains?: string[];
  excludedDomains?: string[];
  includedKeywords?: string[];
  excludedKeywords?: string[];
  dateFrom?: Date | null;
  dateTo?: Date | null;
  region?: string | null;
}

export interface UpdateScopeInput {
  name?: string;
  includedDomains?: string[];
  excludedDomains?: string[];
  includedKeywords?: string[];
  excludedKeywords?: string[];
  dateFrom?: Date | null;
  dateTo?: Date | null;
  region?: string | null;
  isActive?: boolean;
}

function toScopeRecord(row: typeof scopes.$inferSelect): ScopeRecord {
  return {
    id: row.id,
    name: row.name,
    includedDomains: (row.included_domains ?? []) as string[],
    excludedDomains: (row.excluded_domains ?? []) as string[],
    includedKeywords: (row.included_keywords ?? []) as string[],
    excludedKeywords: (row.excluded_keywords ?? []) as string[],
    dateFrom: row.date_from,
    dateTo: row.date_to,
    region: row.region,
    isActive: row.is_active ?? true,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createScope(
  input: CreateScopeInput
): Promise<ScopeRecord> {
  const userId = await getCurrentUserId();

  if (!input.name || input.name.trim().length === 0) {
    throw new Error("Scope name is required");
  }
  if (input.name.length > 100) {
    throw new Error("Scope name must not exceed 100 characters");
  }

  const [countRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(scopes)
    .where(eq(scopes.user_id, userId));

  if (Number(countRow?.count ?? 0) >= MAX_SCOPES_PER_USER) {
    throw new Error(`Maximum ${MAX_SCOPES_PER_USER} scopes allowed`);
  }

  // Get next sort order
  const [maxSort] = await db
    .select({ max: sql<number>`coalesce(max(sort_order), -1)` })
    .from(scopes)
    .where(eq(scopes.user_id, userId));

  const [row] = await db
    .insert(scopes)
    .values({
      user_id: userId,
      name: input.name.trim(),
      included_domains: input.includedDomains ?? [],
      excluded_domains: input.excludedDomains ?? [],
      included_keywords: input.includedKeywords ?? [],
      excluded_keywords: input.excludedKeywords ?? [],
      date_from: input.dateFrom ?? null,
      date_to: input.dateTo ?? null,
      region: input.region ?? null,
      sort_order: (maxSort?.max ?? -1) + 1,
    })
    .returning();

  return toScopeRecord(row);
}

export async function updateScope(
  scopeId: number,
  input: UpdateScopeInput
): Promise<ScopeRecord> {
  const userId = await getCurrentUserId();

  if (input.name !== undefined) {
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Scope name is required");
    }
    if (input.name.length > 100) {
      throw new Error("Scope name must not exceed 100 characters");
    }
  }

  const [row] = await db
    .update(scopes)
    .set({
      ...(input.name !== undefined && { name: input.name.trim() }),
      ...(input.includedDomains !== undefined && {
        included_domains: input.includedDomains,
      }),
      ...(input.excludedDomains !== undefined && {
        excluded_domains: input.excludedDomains,
      }),
      ...(input.includedKeywords !== undefined && {
        included_keywords: input.includedKeywords,
      }),
      ...(input.excludedKeywords !== undefined && {
        excluded_keywords: input.excludedKeywords,
      }),
      ...(input.dateFrom !== undefined && { date_from: input.dateFrom }),
      ...(input.dateTo !== undefined && { date_to: input.dateTo }),
      ...(input.region !== undefined && { region: input.region }),
      ...(input.isActive !== undefined && { is_active: input.isActive }),
      updated_at: new Date(),
    })
    .where(and(eq(scopes.id, scopeId), eq(scopes.user_id, userId)))
    .returning();

  if (!row) {
    throw new Error("Scope not found");
  }

  return toScopeRecord(row);
}

export async function deleteScope(scopeId: number): Promise<{ success: true }> {
  const userId = await getCurrentUserId();

  await db
    .delete(scopes)
    .where(and(eq(scopes.id, scopeId), eq(scopes.user_id, userId)));

  return { success: true };
}

export async function getUserScopes(): Promise<ScopeRecord[]> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select()
    .from(scopes)
    .where(eq(scopes.user_id, userId))
    .orderBy(asc(scopes.sort_order));

  return rows.map(toScopeRecord);
}

export async function reorderScopes(
  scopeIds: number[]
): Promise<ScopeRecord[]> {
  const userId = await getCurrentUserId();

  // Update sort_order for each scope
  await Promise.all(
    scopeIds.map((id, index) =>
      db
        .update(scopes)
        .set({ sort_order: index, updated_at: new Date() })
        .where(and(eq(scopes.id, id), eq(scopes.user_id, userId)))
    )
  );

  return getUserScopes();
}
