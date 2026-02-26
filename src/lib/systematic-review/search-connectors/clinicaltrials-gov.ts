/**
 * ClinicalTrials.gov Search Connector
 *
 * Searches the ClinicalTrials.gov v2 API and returns structured
 * ClinicalTrialResult objects for use in systematic review imports.
 *
 * This connector is a typed, systematic-review-facing wrapper around the
 * lower-level search source at src/lib/search/sources/clinical-trials.ts.
 *
 * API: GET https://clinicaltrials.gov/api/v2/studies
 */

import { resilientFetch } from "@/lib/http/resilient-fetch";
import { createCircuitBreaker } from "@/lib/http/circuit-breaker";

const breaker = createCircuitBreaker({
  service: "ClinicalTrialsConnector",
  failureThreshold: 5,
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ClinicalTrialResult {
  nctId: string;
  title: string;
  status: string;
  conditions: string[];
  interventions: string[];
  startDate?: string;
  completionDate?: string;
  enrollmentCount?: number;
  studyType: string;
  phases: string[];
  sponsors: string[];
}

// ---------------------------------------------------------------------------
// Internal API response types (ClinicalTrials.gov v2)
// ---------------------------------------------------------------------------

interface CTv2Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle?: string;
    };
    statusModule: {
      overallStatus: string;
      startDateStruct?: { date: string };
      completionDateStruct?: { date: string };
    };
    designModule?: {
      studyType?: string;
      phases?: string[];
      enrollmentInfo?: { count?: number };
    };
    conditionsModule?: {
      conditions?: string[];
    };
    interventionsModule?: {
      interventions?: { type: string; name: string }[];
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: { name: string };
      collaborators?: { name: string }[];
    };
  };
}

interface CTv2Response {
  studies: CTv2Study[];
  totalCount: number;
  nextPageToken?: string;
}

// ---------------------------------------------------------------------------
// Mapper
// ---------------------------------------------------------------------------

function mapStudyToResult(study: CTv2Study): ClinicalTrialResult | null {
  const proto = study.protocolSection;
  const id = proto.identificationModule;
  const statusMod = proto.statusModule;
  const design = proto.designModule;
  const conditionsMod = proto.conditionsModule;
  const interventionsMod = proto.interventionsModule;
  const sponsorMod = proto.sponsorCollaboratorsModule;

  const title = id.officialTitle || id.briefTitle || "";
  if (!title || !id.nctId) return null;

  const sponsors: string[] = [];
  if (sponsorMod?.leadSponsor?.name) {
    sponsors.push(sponsorMod.leadSponsor.name);
  }
  for (const collab of sponsorMod?.collaborators || []) {
    if (collab.name) sponsors.push(collab.name);
  }

  return {
    nctId: id.nctId,
    title,
    status: statusMod.overallStatus || "UNKNOWN",
    conditions: conditionsMod?.conditions || [],
    interventions: (interventionsMod?.interventions || []).map((i) => i.name),
    startDate: statusMod.startDateStruct?.date,
    completionDate: statusMod.completionDateStruct?.date,
    enrollmentCount: design?.enrollmentInfo?.count ?? undefined,
    studyType: design?.studyType || "UNKNOWN",
    phases: design?.phases || [],
    sponsors,
  };
}

// ---------------------------------------------------------------------------
// Public search function
// ---------------------------------------------------------------------------

/**
 * Search ClinicalTrials.gov v2 API.
 *
 * @param query      Free-text search term(s)
 * @param options    Optional filters: maxResults, status (filter by trial status)
 * @returns          Array of ClinicalTrialResult
 *
 * @example
 * const trials = await searchClinicalTrials("metformin type 2 diabetes", {
 *   maxResults: 50,
 *   status: ["COMPLETED", "RECRUITING"],
 * });
 */
export async function searchClinicalTrials(
  query: string,
  options?: { maxResults?: number; status?: string[] }
): Promise<ClinicalTrialResult[]> {
  if (!breaker.canRequest()) {
    console.warn("[ClinicalTrialsConnector] Circuit open — skipping");
    return [];
  }

  const maxResults = options?.maxResults ?? 50;

  const params = new URLSearchParams();
  params.set("query.term", query);
  params.set("pageSize", String(Math.min(maxResults, 1000)));
  params.set("sort", "@relevance");
  params.set("format", "json");
  params.set("countTotal", "true");

  // Filter by one or more statuses (e.g. ["COMPLETED", "RECRUITING"])
  if (options?.status && options.status.length > 0) {
    params.set("filter.overallStatus", options.status.join(","));
  }

  const url = `https://clinicaltrials.gov/api/v2/studies?${params.toString()}`;

  try {
    const res = await resilientFetch(
      url,
      {},
      { service: "ClinicalTrialsConnector", timeout: 20000 }
    );
    const data: CTv2Response = await res.json();

    const results: ClinicalTrialResult[] = [];
    for (const study of data.studies || []) {
      const mapped = mapStudyToResult(study);
      if (mapped) results.push(mapped);
    }

    breaker.onSuccess();
    return results;
  } catch (error) {
    breaker.onFailure();
    console.error("[ClinicalTrialsConnector] Search failed:", error);
    return [];
  }
}
