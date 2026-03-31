"use server";

import { and, asc, eq } from "drizzle-orm";

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
  userId: string,
  domain: string,
  level: DomainPreferenceLevel
): Promise<DomainPreferenceRecord> {
  const normalizedDomain = normalizePreferenceDomain(domain);
  const now = new Date();

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
  userId: string
): Promise<DomainPreferenceRecord[]> {
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
  userId: string,
  domain: string
): Promise<{ success: true; domain: string }> {
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
