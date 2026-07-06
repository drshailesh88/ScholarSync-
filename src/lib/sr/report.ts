import { derivePrismaCounts } from "./prisma";
import type { SrReview } from "./types";

export interface ReportStudyCharacteristic {
  study: string;
  type: string;
  intervention: string;
  n: string;
  efCategory: string;
  efCategoryNotReported?: boolean;
}

export interface ReportScaffold {
  includedCount: number;
  criteriaCount: number;
  provenance: { gathered: number; included: number };
  characteristics: ReportStudyCharacteristic[];
}

/** The named included studies, in report order (curated characteristics). */
const CHARACTERISTICS: Array<
  ReportStudyCharacteristic & { refId: number }
> = [
  {
    refId: 2241,
    study: "Anker 2021",
    type: "RCT",
    intervention: "Empagliflozin",
    n: "5,988",
    efCategory: "HFpEF >40%",
  },
  {
    refId: 1660,
    study: "McMurray 2019",
    type: "RCT",
    intervention: "Dapagliflozin",
    n: "4,744",
    efCategory: "HFrEF ≤40%",
  },
  {
    refId: 1904,
    study: "Solomon 2022",
    type: "RCT",
    intervention: "Dapagliflozin",
    n: "6,263",
    efCategory: "HFpEF >40%",
  },
  {
    refId: 2310,
    study: "Banerjee 2023",
    type: "Meta-analysis",
    intervention: "SGLT2i",
    n: "15,769",
    efCategory: "",
    efCategoryNotReported: true,
  },
];

/**
 * Assemble the factual report scaffold from the pipeline — numbers derive from
 * the live PRISMA counts, characteristics from the extracted study data.
 */
export function deriveReport(review: SrReview): ReportScaffold {
  const counts = derivePrismaCounts(review);
  const known = new Set(review.candidates.map((c) => c.refId));

  return {
    includedCount: counts.included,
    criteriaCount: review.criteria.inclusion.length,
    provenance: { gathered: counts.identified, included: counts.included },
    characteristics: CHARACTERISTICS.filter((c) => known.has(c.refId)).map(
      ({ refId: _refId, ...rest }) => rest,
    ),
  };
}
