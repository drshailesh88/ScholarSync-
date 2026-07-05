import { deriveTaStatus } from "./screening";
import { deriveFullTextStatus } from "./fulltext";
import { isRemovedDuplicate, type SrReview } from "./types";

export interface PrismaCounts {
  identified: number;
  duplicatesRemoved: number;
  screened: number;
  /** Excluded at title & abstract (screened − advanced to full text). */
  irrelevantAtScreening: number;
  fullTextAssessed: number;
  fullTextExcluded: number;
  included: number;
  /** Studies still ongoing / awaiting classification (PRISMA 2020 box). */
  ongoing: number;
}

/** Auto-generate the PRISMA 2020 flow from the live review state. */
export function derivePrismaCounts(review: SrReview): PrismaCounts {
  const pool = review.candidates.filter((c) => !isRemovedDuplicate(c));
  const advanced = pool.filter(
    (c) => deriveTaStatus(c.ta) === "advanced",
  ).length;

  const fullTextAssessed = pool.filter((c) => c.fullText).length;
  const fullTextExcluded = pool.filter(
    (c) => deriveFullTextStatus(c.fullText) === "excluded",
  ).length;
  const included = pool.filter(
    (c) => deriveFullTextStatus(c.fullText) === "included",
  ).length;

  return {
    identified: review.candidates.length,
    duplicatesRemoved: review.candidates.length - pool.length,
    screened: pool.length,
    irrelevantAtScreening: pool.length - advanced,
    fullTextAssessed,
    fullTextExcluded,
    included,
    ongoing: fullTextAssessed - fullTextExcluded - included,
  };
}

export interface ExclusionReasonCount {
  code: string;
  label: string;
  count: number;
}

/** Full-text exclusions grouped by reason (the "excluded with reasons" drill). */
export function deriveExclusionReasonCounts(
  review: SrReview,
): ExclusionReasonCount[] {
  const labelByCode = new Map(
    review.exclusionReasons.map((r) => [r.code, r.label]),
  );
  const tally = new Map<string, number>();

  for (const candidate of review.candidates) {
    if (deriveFullTextStatus(candidate.fullText) !== "excluded") continue;
    const reason = candidate.fullText?.decisions.find(
      (d) => d.vote === "exclude" && d.reasonCode,
    );
    const code = reason?.reasonCode;
    if (!code) continue;
    tally.set(code, (tally.get(code) ?? 0) + 1);
  }

  return [...tally.entries()].map(([code, count]) => ({
    code,
    label: labelByCode.get(code) ?? code,
    count,
  }));
}
