import type { EvidenceLevel } from "@/types/search";

interface EvidenceLevelInfo {
  level: EvidenceLevel;
  label: string;
  color: string;
}

export function getEvidenceLevel(studyType: string): EvidenceLevelInfo {
  switch (studyType) {
    case "meta_analysis":
    case "systematic_review":
      return { level: "I", label: "Systematic Review / Meta-Analysis", color: "emerald" };
    case "rct":
      return { level: "II", label: "Randomized Controlled Trial", color: "sky" };
    case "cohort":
    case "observational":
      return { level: "III", label: "Cohort / Observational Study", color: "amber" };
    case "case_control":
    case "case_report":
      return { level: "IV", label: "Case Report / Case Series", color: "orange" };
    default:
      return { level: "V", label: "Expert Opinion / Other", color: "slate" };
  }
}

export function mapPubMedPublicationType(pubType: string): string {
  const normalized = pubType.toLowerCase().trim();
  if (normalized.includes("meta-analysis")) return "meta_analysis";
  if (normalized.includes("systematic review")) return "systematic_review";
  if (normalized.includes("randomized controlled trial")) return "rct";
  if (normalized.includes("clinical trial")) return "rct";
  if (normalized.includes("observational study")) return "observational";
  if (normalized.includes("cohort")) return "cohort";
  if (normalized.includes("case-control")) return "case_control";
  if (normalized.includes("case report")) return "case_report";
  if (normalized.includes("review")) return "review";
  return "other";
}

export function mapS2PublicationType(pubType: string): string {
  const normalized = pubType.toLowerCase().trim();
  if (normalized === "review") return "review";
  if (normalized === "journalarticle" || normalized === "journal article") return "other";
  if (normalized === "casereport" || normalized === "case report") return "case_report";
  if (normalized === "clinicaltrial" || normalized === "clinical trial") return "rct";
  if (normalized === "metaanalysis" || normalized === "meta-analysis") return "meta_analysis";
  if (normalized === "editorial") return "other";
  if (normalized === "letter") return "other";
  return "other";
}

export function mapOpenAlexType(type: string): string {
  const normalized = type.toLowerCase().trim();
  if (normalized === "review") return "review";
  if (normalized === "article") return "other";
  if (normalized === "preprint") return "other";
  if (normalized === "editorial") return "other";
  if (normalized === "letter") return "other";
  if (normalized === "book-chapter") return "other";
  return "other";
}
