import type { DomainConfig, DomainId } from "./types";
import { medicineDomain } from "./medicine";
import { multidisciplinaryDomain } from "./multidisciplinary";

const domainRegistry: Record<string, DomainConfig> = {
  medicine: medicineDomain,
  multidisciplinary: multidisciplinaryDomain,
  // Additional domains will be added in Issue #25 (Content Curation)
};

/**
 * Get the domain configuration for a given domain ID.
 * Defaults to "medicine" if the domain is null, undefined, or unknown.
 *
 * This is the SINGLE entry point for all domain config lookups.
 * Resolve once at the route level and thread the config down.
 */
export function getDomainConfig(domainId?: string | null): DomainConfig {
  if (!domainId) return domainRegistry.medicine;
  return domainRegistry[domainId] ?? domainRegistry.medicine;
}

/**
 * Get all registered domain IDs (for onboarding picker, etc.)
 */
export function getRegisteredDomains(): DomainId[] {
  return Object.keys(domainRegistry) as DomainId[];
}

/**
 * Check if a domain ID is registered
 */
export function isDomainRegistered(domainId: string): boolean {
  return domainId in domainRegistry;
}
