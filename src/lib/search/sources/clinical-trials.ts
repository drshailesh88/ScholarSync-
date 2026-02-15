import type { UnifiedSearchResult } from "@/types/search";
import { getEvidenceLevel } from "@/lib/search/evidence-level";
import { resilientFetch } from "@/lib/http/resilient-fetch";
import { createCircuitBreaker } from "@/lib/http/circuit-breaker";

const breaker = createCircuitBreaker({ service: "ClinicalTrials", failureThreshold: 5 });

interface ClinicalTrialsSearchOptions {
  maxResults?: number;
  page?: number;
  status?: string[];
}

interface CTStudy {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
      organization?: { fullName: string };
    };
    statusModule: {
      overallStatus: string;
      startDateStruct?: { date: string };
      completionDateStruct?: { date: string };
    };
    descriptionModule?: {
      briefSummary?: string;
      detailedDescription?: string;
    };
    designModule?: {
      studyType?: string;
      phases?: string[];
      designInfo?: {
        allocation?: string;
        interventionModel?: string;
        primaryPurpose?: string;
        maskingInfo?: { masking?: string };
      };
    };
    contactsLocationsModule?: {
      overallOfficials?: { name: string; affiliation?: string }[];
    };
    conditionsModule?: {
      conditions?: string[];
      keywords?: string[];
    };
    interventionsModule?: {
      interventions?: { type: string; name: string; description?: string }[];
    };
  };
}

interface CTResponse {
  studies: CTStudy[];
  totalCount: number;
  nextPageToken?: string;
}

function mapStudyType(study: CTStudy): string {
  const designModule = study.protocolSection.designModule;
  if (!designModule) return "other";

  const studyType = designModule.studyType?.toLowerCase() || "";
  const allocation = designModule.designInfo?.allocation?.toLowerCase() || "";

  if (studyType === "interventional") {
    if (allocation === "randomized") return "rct";
    return "rct";
  }
  if (studyType === "observational") return "observational";

  return "other";
}

function parseYear(dateStr?: string): number {
  if (!dateStr) return 0;
  const match = dateStr.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

function mapStudy(study: CTStudy): UnifiedSearchResult {
  const proto = study.protocolSection;
  const id = proto.identificationModule;
  const status = proto.statusModule;
  const desc = proto.descriptionModule;
  const design = proto.designModule;
  const contacts = proto.contactsLocationsModule;
  const conditions = proto.conditionsModule;

  const studyType = mapStudyType(study);
  const evidence = getEvidenceLevel(studyType);

  const authors = (contacts?.overallOfficials || []).map((o) => o.name);

  const phases = design?.phases?.join(", ") || "";
  const statusStr = status.overallStatus || "";

  const abstractParts: string[] = [];
  if (desc?.briefSummary) abstractParts.push(desc.briefSummary);
  if (phases) abstractParts.push(`Phase: ${phases}`);
  if (statusStr) abstractParts.push(`Status: ${statusStr}`);

  return {
    title: id.officialTitle || id.briefTitle,
    authors,
    journal: id.organization?.fullName || "ClinicalTrials.gov",
    year: parseYear(status.startDateStruct?.date),
    abstract: abstractParts.join(" | ") || undefined,
    citationCount: 0,
    publicationTypes: design?.phases || [],
    meshTerms: conditions?.conditions || [],
    studyType,
    evidenceLevel: evidence.level,
    isOpenAccess: true,
    sources: ["clinical_trials"],
  };
}

export async function searchClinicalTrials(
  query: string,
  options: ClinicalTrialsSearchOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number }> {
  if (!breaker.canRequest()) {
    console.warn("[ClinicalTrials] Circuit open — skipping");
    return { results: [], total: 0 };
  }

  const maxResults = options.maxResults || 20;
  const pageToken = options.page ? `&pageToken=${options.page}` : "";

  let url = `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(query)}&pageSize=${maxResults}${pageToken}&format=json`;

  if (options.status && options.status.length > 0) {
    url += `&filter.overallStatus=${options.status.join(",")}`;
  }

  try {
    const res = await resilientFetch(url, {}, { service: "ClinicalTrials", timeout: 15000 });
    const data: CTResponse = await res.json();

    const results = (data.studies || []).map(mapStudy);
    breaker.onSuccess();
    return { results, total: data.totalCount || 0 };
  } catch (error) {
    breaker.onFailure();
    console.error("[ClinicalTrials] Search failed:", error);
    return { results: [], total: 0 };
  }
}
