"use server";

import { and, asc, eq, sql } from "drizzle-orm";

import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { domainPreferences } from "@/lib/db/schema";
import { normalizeDomain } from "@/lib/search/domain-utils";

export type DomainPreferenceLevel = "mute" | "lower" | "higher" | "prefer";

export interface DomainPreferenceRecord {
  domain: string;
  level: DomainPreferenceLevel;
  createdAt: Date | null;
  updatedAt: Date | null;
}

function normalizePreferenceDomain(domain: string): string {
  const normalized = normalizeDomain(domain);
  if (!normalized) {
    throw new Error("A valid domain is required");
  }

  return normalized;
}

export async function setDomainPreference(
  domain: string,
  level: DomainPreferenceLevel
): Promise<DomainPreferenceRecord> {
  const userId = await getCurrentUserId();
  const normalizedDomain = normalizePreferenceDomain(domain);
  const now = new Date();
  const [existingPreference] = await db
    .select({ id: domainPreferences.id })
    .from(domainPreferences)
    .where(
      and(
        eq(domainPreferences.user_id, userId),
        eq(domainPreferences.domain, normalizedDomain)
      )
    );

  if (!existingPreference) {
    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(domainPreferences)
      .where(eq(domainPreferences.user_id, userId));

    const count = Number(countRow?.count ?? 0);
    if (count >= 1000) {
      throw new Error("Domain preference limit reached");
    }
  }

  const [record] = await db
    .insert(domainPreferences)
    .values({
      user_id: userId,
      domain: normalizedDomain,
      level,
      updated_at: now,
    })
    .onConflictDoUpdate({
      target: [domainPreferences.user_id, domainPreferences.domain],
      set: {
        level,
        updated_at: now,
      },
    })
    .returning({
      domain: domainPreferences.domain,
      level: domainPreferences.level,
      createdAt: domainPreferences.created_at,
      updatedAt: domainPreferences.updated_at,
    });

  return record;
}

export async function getDomainPreferences(
): Promise<DomainPreferenceRecord[]> {
  const userId = await getCurrentUserId();

  return db
    .select({
      domain: domainPreferences.domain,
      level: domainPreferences.level,
      createdAt: domainPreferences.created_at,
      updatedAt: domainPreferences.updated_at,
    })
    .from(domainPreferences)
    .where(eq(domainPreferences.user_id, userId))
    .orderBy(asc(domainPreferences.domain));
}

export async function removeDomainPreference(
  domain: string
): Promise<{ success: true; domain: string }> {
  const userId = await getCurrentUserId();
  const normalizedDomain = normalizePreferenceDomain(domain);

  await db
    .delete(domainPreferences)
    .where(
      and(
        eq(domainPreferences.user_id, userId),
        eq(domainPreferences.domain, normalizedDomain)
      )
    );

  return {
    success: true,
    domain: normalizedDomain,
  };
}
