/**
 * Self-Plagiarism Detection Engine
 *
 * Compares the current text against the user's previous submissions
 * stored in the integrityChecks table, using the same shingling/MinHash
 * pipeline as the plagiarism engine.
 */

import { db } from "@/lib/db";
import { integrityChecks } from "@/lib/db/schema";
import { eq, desc, isNotNull, and } from "drizzle-orm";
import {
  tokenize,
  createShingles,
  computeMinHash,
  estimateJaccard,
} from "./plagiarism-engine";
import type { SelfPlagiarismResult } from "./types";

/** Minimum Jaccard similarity to count as a self-plagiarism match. */
const SIMILARITY_THRESHOLD = 0.2;

/** Maximum number of previous checks to compare against. */
const MAX_PREVIOUS_CHECKS = 20;

/**
 * Run self-plagiarism detection by comparing the current text against
 * the user's most recent previous integrity checks.
 */
export async function runSelfPlagiarismCheck(
  text: string,
  userId: string,
): Promise<SelfPlagiarismResult> {
  if (!text || text.trim().length < 50) {
    return { selfSimilarityScore: 0, matchedDocuments: [] };
  }

  // Compute shingles/signature for the current text
  const currentTokens = tokenize(text);
  const currentShingles = createShingles(currentTokens);

  if (currentShingles.size === 0) {
    return { selfSimilarityScore: 0, matchedDocuments: [] };
  }

  const currentSignature = computeMinHash(currentShingles);

  // Fetch the user's most recent previous integrity checks
  const previousChecks = await db
    .select({
      id: integrityChecks.id,
      contentChecked: integrityChecks.contentChecked,
      createdAt: integrityChecks.createdAt,
    })
    .from(integrityChecks)
    .where(
      and(
        eq(integrityChecks.userId, userId),
        isNotNull(integrityChecks.contentChecked),
      ),
    )
    .orderBy(desc(integrityChecks.createdAt))
    .limit(MAX_PREVIOUS_CHECKS);

  if (previousChecks.length === 0) {
    return { selfSimilarityScore: 0, matchedDocuments: [] };
  }

  // Compare against each previous check
  const matchedDocuments: SelfPlagiarismResult["matchedDocuments"] = [];

  for (const check of previousChecks) {
    if (!check.contentChecked || check.contentChecked.trim().length < 50) {
      continue;
    }

    const prevTokens = tokenize(check.contentChecked);
    const prevShingles = createShingles(prevTokens);

    if (prevShingles.size === 0) continue;

    const prevSignature = computeMinHash(prevShingles);
    const similarity = estimateJaccard(currentSignature, prevSignature);

    if (similarity >= SIMILARITY_THRESHOLD) {
      const excerpt =
        check.contentChecked.length > 120
          ? check.contentChecked.slice(0, 117) + "..."
          : check.contentChecked;

      matchedDocuments.push({
        checkId: check.id,
        checkedAt: check.createdAt
          ? check.createdAt.toISOString()
          : new Date().toISOString(),
        similarity: Math.round(similarity * 1000) / 1000,
        excerpt,
      });
    }
  }

  // Sort by similarity descending
  matchedDocuments.sort((a, b) => b.similarity - a.similarity);

  // Overall score is the max similarity found
  const selfSimilarityScore =
    matchedDocuments.length > 0 ? matchedDocuments[0].similarity : 0;

  return { selfSimilarityScore, matchedDocuments };
}
