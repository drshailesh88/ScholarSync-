import type { UnifiedSearchResult } from "@/types/search";
import { mapClinicalTrialPhase, getEvidenceLevel } from "@/lib/search/evidence-level";

interface ClinicalTrialsSearchOptions {
  limit?: number;
  offset?: number;
  yearStart?: number;
  yearEnd?: number;
  status?: "recruiting" | "completed" | "any";
  phase?: string;
}

interface CTStudy {
  protocolSection: {
    identificationModule: {
      nctId: string;
      officialTitle?: string;
      briefTitle?: string;
    };
    statusModule: {
      overallStatus: string;
      startDateStruct?: {
        date: string;
      };
    };
    descriptionModule?: {
      briefSummary?: string;
    };
    designModule?: {
      studyType?: string;
      phases?: string[];
    };
    contactsLocationsModule?: {
      overallOfficials?: {
        name: string;
        role?: string;
        affiliation?: string;
      }[];
    };
  };
}

interface CTResponse {
  totalCount: number;
  studies: CTStudy[];
}

async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  baseDelay: number = 400
): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url);
    if (response.ok) return response;
    if (response.status === 429 || response.status >= 500) {
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    throw new Error(`ClinicalTrials.gov API error: ${response.status}`);
  }
  throw new Error("ClinicalTrials.gov API: max retries exceeded");
}

function parseYear(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const match = dateStr.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

function mapStudy(study: CTStudy): UnifiedSearchResult {
  const proto = study.protocolSection;
  const identification = proto.identificationModule;
  const status = proto.statusModule;
  const description = proto.descriptionModule;
  const design = proto.designModule;
  const contacts = proto.contactsLocationsModule;

  const title = identification.officialTitle || identification.briefTitle || "";
  if (!title) return null as unknown as UnifiedSearchResult;

  const piName = contacts?.overallOfficials?.[0]?.name;
  const authors = piName ? [piName] : [];

  const year = parseYear(status.startDateStruct?.date);

  const phases = design?.phases || [];
  const trialPhase = phases.join(" / ") || undefined;
  const studyType = mapClinicalTrialPhase(phases, design?.studyType);
  const evidence = getEvidenceLevel(studyType);

  return {
    title,
    authors,
    journal: "ClinicalTrials.gov",
    year,
    abstract: description?.briefSummary || undefined,
    citationCount: 0,
    isOpenAccess: true,
    doi: undefined,
    pmid: undefined,
    sources: ["clinical_trials"],
    studyType,
    evidenceLevel: evidence.level,
    publicationTypes: ["clinical_trial_registration"],
    nctId: identification.nctId,
    trialStatus: status.overallStatus,
    trialPhase,
  };
}

export async function searchClinicalTrials(
  query: string,
  options: ClinicalTrialsSearchOptions = {}
): Promise<{ results: UnifiedSearchResult[]; total: number }> {
  const limit = options.limit || 20;
  const offset = options.offset || 0;

  const params = new URLSearchParams();
  params.set("query.term", query);
  params.set("pageSize", String(limit));
  params.set("sort", "@relevance");
  params.set("format", "json");

  if (offset > 0) {
    // ClinicalTrials.gov v2 uses pageToken or countTotal; offset via pageSize * page
    // Use the nextPageToken approach if needed, but for simplicity use min_rnk
    params.set("countTotal", "true");
  } else {
    params.set("countTotal", "true");
  }

  if (options.status && options.status !== "any") {
    const statusMap: Record<string, string> = {
      recruiting: "RECRUITING",
      completed: "COMPLETED",
    };
    const mapped = statusMap[options.status];
    if (mapped) {
      params.set("filter.overallStatus", mapped);
    }
  }

  if (options.phase) {
    params.set("filter.phase", options.phase);
  }

  const url = `https://clinicaltrials.gov/api/v2/studies?${params.toString()}`;
  const res = await fetchWithRetry(url);
  const data: CTResponse = await res.json();

  const results: UnifiedSearchResult[] = [];
  for (const study of data.studies || []) {
    const mapped = mapStudy(study);
    if (mapped && mapped.title) {
      results.push(mapped);
    }
  }

  return { results, total: data.totalCount || results.length };
}
