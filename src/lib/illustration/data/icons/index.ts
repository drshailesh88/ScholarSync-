/**
 * icons/index.ts
 * Icon Library for FINNISH Scientific Illustration Editor
 *
 * Provides a comprehensive library of scientific and technical icons
 * organized by domain with search and filter capabilities.
 *
 * @module data/icons
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Available icon domains/categories
 */
export type IconDomain =
  | 'medicine'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'engineering'
  | 'general';

/**
 * Complete definition of an icon in the library
 */
export interface IconDefinition {
  /** Unique identifier for the icon */
  id: string;
  /** Display name of the icon */
  name: string;
  /** Scientific domain the icon belongs to */
  domain: IconDomain;
  /** Sub-category within the domain */
  category: string;
  /** Searchable tags for the icon */
  tags: string[];
  /** SVG markup as a string */
  svg: string;
}

/**
 * Metadata about an icon domain
 */
export interface DomainMetadata {
  id: IconDomain;
  name: string;
  description: string;
  iconCount: number;
  color: string;
}

/**
 * Search options for filtering icons
 */
export interface IconSearchOptions {
  /** Filter by specific domain */
  domain?: IconDomain;
  /** Filter by category within domain */
  category?: string;
  /** Limit number of results */
  limit?: number;
  /** Sort results by field */
  sortBy?: 'name' | 'domain' | 'category';
}

// =============================================================================
// DOMAIN ICON IMPORTS
// =============================================================================

import { medicineIcons } from './medicine';
import { biologyIcons } from './biology';
import { chemistryIcons } from './chemistry';
import { physicsIcons } from './physics';
import { engineeringIcons } from './engineering';
import { cardiologyIcons } from './cardiology';
import { neurologyIcons } from './neurology';
import { gastroenterologyIcons } from './gastroenterology';
import { nephrologyIcons } from './nephrology';
import { anesthesiologyIcons } from './anesthesiology';
import { ophthalmologyIcons } from './ophthalmology';
import { radiologyIcons } from './radiology';
import { pathologyIcons } from './pathology';
import { rheumatologyIcons } from './rheumatology';
import { endocrinologyIcons } from './endocrinology';
import { psychiatryIcons } from './psychiatry';
import { infectiousIcons } from './infectious';
import { pediatricsIcons } from './pediatrics';
import { emergencyIcons } from './emergency';
import { orthopedicsIcons } from './orthopedics';
import { pulmonologyIcons } from './pulmonology';
import { entIcons } from './ent';
import { obgynIcons } from './obgyn';
import { physiologyIcons } from './physiology';
import { anatomyIcons } from './anatomy';
// Drug classes
import { analgesicsIcons } from './analgesics';
import { antibioticsIcons } from './antibiotics';
import { anticoagulantsIcons } from './anticoagulants';
import { antihypertensivesIcons } from './antihypertensives';
import { antimicrobialsIcons } from './antimicrobials';
import { endocrineDrugsIcons } from './endocrine_drugs';
import { giDrugsIcons } from './gi_drugs';
import { immunologyDrugsIcons } from './immunology_drugs';
import { neuroDrugsIcons } from './neuro_drugs';
import { oncologyDrugsIcons } from './oncology_drugs';
import { psychotropicsIcons } from './psychotropics';
import { respiratoryDrugsIcons } from './respiratory_drugs';
// Biology subspecialties
import { molecularIcons } from './molecular';
import { geneticsIcons } from './genetics';
import { ecologyIcons } from './ecology';
import { microbiologyIcons } from './microbiology';
import { zoologyIcons } from './zoology';
import { botanyIcons } from './botany';
import { cellbiologyIcons } from './cell-biology';
import { neuroscienceIcons } from './neuroscience';
// Chemistry subspecialties
import { analyticalIcons } from './analytical';
import { biochemistryIcons } from './biochemistry';
import { inorganicIcons } from './inorganic';
import { medicinalIcons } from './medicinal';
import { organicIcons } from './organic';
import { physicalIcons } from './physical';
import { polymerIcons } from './polymer';
// Physics subspecialties
import { astrophysicsIcons } from './astrophysics';
import { electromagnetismIcons } from './electromagnetism';
import { mechanicsIcons } from './mechanics';
import { nuclearIcons } from './nuclear';
import { opticsIcons } from './optics';
import { quantumIcons } from './quantum';
import { solidstateIcons } from './solidstate';
import { thermodynamicsIcons } from './thermodynamics';
// Engineering subspecialties
import { aerospaceIcons } from './aerospace';
import { biomedicalIcons } from './biomedical';
import { chemicalIcons } from './chemical';
import { civilIcons } from './civil';
import { computerIcons } from './computer';
import { electricalIcons } from './electrical';
import { materialsIcons } from './materials';
import { mechanicalIcons } from './mechanical';
// Additional science branches
import { geologyIcons } from './geology';
import { astronomyIcons } from './astronomy';
import { environmentalIcons } from './environmental';
import { materialsScienceIcons } from './materials_science';
import { oceanographyIcons } from './oceanography';
import { meteorologyIcons } from './meteorology';
import { agricultureIcons } from './agriculture';
import { forensicsIcons } from './forensics';
import { hematologyOncologyIcons } from './hematology-oncology';
import { dermatologyIcons } from './dermatology';
import { pharmacologyIcons } from './pharmacology';
import { mathematicsIcons } from './mathematics';

// =============================================================================
// ICON COLLECTIONS
// =============================================================================

/**
 * All icons from all domains combined
 */
export const allIcons: IconDefinition[] = [
  ...medicineIcons,
  ...cardiologyIcons,
  ...neurologyIcons,
  ...pulmonologyIcons,
  ...gastroenterologyIcons,
  ...nephrologyIcons,
  ...anesthesiologyIcons,
  ...ophthalmologyIcons,
  ...radiologyIcons,
  ...pathologyIcons,
  ...rheumatologyIcons,
  ...endocrinologyIcons,
  ...psychiatryIcons,
  ...emergencyIcons,
  ...infectiousIcons,
  ...pediatricsIcons,
  ...orthopedicsIcons,
  ...entIcons,
  ...obgynIcons,
  ...physiologyIcons,
  ...anatomyIcons,
  // Drug classes
  ...analgesicsIcons,
  ...antibioticsIcons,
  ...anticoagulantsIcons,
  ...antihypertensivesIcons,
  ...antimicrobialsIcons,
  ...endocrineDrugsIcons,
  ...giDrugsIcons,
  ...immunologyDrugsIcons,
  ...neuroDrugsIcons,
  ...oncologyDrugsIcons,
  ...psychotropicsIcons,
  ...respiratoryDrugsIcons,
  // Biology
  ...biologyIcons,
  ...molecularIcons,
  ...geneticsIcons,
  ...ecologyIcons,
  ...microbiologyIcons,
  ...zoologyIcons,
  ...botanyIcons,
  ...cellbiologyIcons,
  ...neuroscienceIcons,
  // Chemistry
  ...chemistryIcons,
  ...analyticalIcons,
  ...biochemistryIcons,
  ...inorganicIcons,
  ...medicinalIcons,
  ...organicIcons,
  ...physicalIcons,
  ...polymerIcons,
  // Physics
  ...physicsIcons,
  ...astrophysicsIcons,
  ...electromagnetismIcons,
  ...mechanicsIcons,
  ...nuclearIcons,
  ...opticsIcons,
  ...quantumIcons,
  ...solidstateIcons,
  ...thermodynamicsIcons,
  // Engineering
  ...engineeringIcons,
  ...aerospaceIcons,
  ...biomedicalIcons,
  ...chemicalIcons,
  ...civilIcons,
  ...computerIcons,
  ...electricalIcons,
  ...materialsIcons,
  ...mechanicalIcons,
  // Additional science branches
  ...geologyIcons,
  ...astronomyIcons,
  ...environmentalIcons,
  ...materialsScienceIcons,
  ...oceanographyIcons,
  ...meteorologyIcons,
  ...agricultureIcons,
  ...forensicsIcons,
  ...hematologyOncologyIcons,
  ...dermatologyIcons,
  ...pharmacologyIcons,
  ...mathematicsIcons,
];

/**
 * Icons organized by domain for quick access
 */
export const iconsByDomain: Record<IconDomain, IconDefinition[]> = {
  medicine: [
    ...medicineIcons, ...cardiologyIcons, ...neurologyIcons, ...pulmonologyIcons,
    ...gastroenterologyIcons, ...nephrologyIcons, ...anesthesiologyIcons,
    ...ophthalmologyIcons, ...radiologyIcons, ...pathologyIcons, ...pediatricsIcons,
    ...orthopedicsIcons, ...rheumatologyIcons, ...infectiousIcons, ...emergencyIcons,
    ...endocrinologyIcons, ...psychiatryIcons, ...entIcons, ...obgynIcons,
    ...hematologyOncologyIcons,
    ...dermatologyIcons,
    ...physiologyIcons,
    // Drug classes
    ...analgesicsIcons, ...antibioticsIcons, ...anticoagulantsIcons,
    ...antihypertensivesIcons, ...antimicrobialsIcons, ...endocrineDrugsIcons,
    ...giDrugsIcons, ...immunologyDrugsIcons, ...neuroDrugsIcons,
    ...oncologyDrugsIcons, ...psychotropicsIcons, ...respiratoryDrugsIcons,
    ...pharmacologyIcons,
  ],
  biology: [
    ...biologyIcons, ...molecularIcons, ...geneticsIcons, ...ecologyIcons,
    ...microbiologyIcons, ...zoologyIcons, ...botanyIcons, ...cellbiologyIcons,
    ...neuroscienceIcons, ...environmentalIcons, ...oceanographyIcons, ...agricultureIcons,
    ...anatomyIcons,
  ],
  chemistry: [
    ...chemistryIcons, ...forensicsIcons,
    // Chemistry subspecialties
    ...analyticalIcons, ...biochemistryIcons, ...inorganicIcons,
    ...medicinalIcons, ...organicIcons, ...physicalIcons, ...polymerIcons,
  ],
  physics: [
    ...physicsIcons, ...geologyIcons, ...astronomyIcons, ...meteorologyIcons,
    // Physics subspecialties
    ...astrophysicsIcons, ...electromagnetismIcons, ...mechanicsIcons,
    ...nuclearIcons, ...opticsIcons, ...quantumIcons, ...solidstateIcons,
    ...thermodynamicsIcons,
    // Mathematics
    ...mathematicsIcons,
  ],
  engineering: [
    ...engineeringIcons, ...materialsScienceIcons,
    // Engineering subspecialties
    ...aerospaceIcons, ...biomedicalIcons, ...chemicalIcons, ...civilIcons,
    ...computerIcons, ...electricalIcons, ...materialsIcons, ...mechanicalIcons,
  ],
  general: [], // Reserved for future general-purpose icons
};

/**
 * Metadata for each domain
 */
export const domainMetadata: Record<IconDomain, DomainMetadata> = {
  medicine: {
    id: 'medicine',
    name: 'Medicine',
    description: 'Medical, clinical, and healthcare icons including cardiology, anesthesiology, ophthalmology, radiology, and pharmacology drug classes',
    iconCount: medicineIcons.length + cardiologyIcons.length + neurologyIcons.length + pulmonologyIcons.length + gastroenterologyIcons.length + nephrologyIcons.length + anesthesiologyIcons.length + ophthalmologyIcons.length + radiologyIcons.length + rheumatologyIcons.length + orthopedicsIcons.length + psychiatryIcons.length + emergencyIcons.length + endocrinologyIcons.length + infectiousIcons.length + pediatricsIcons.length + pathologyIcons.length + entIcons.length + obgynIcons.length + analgesicsIcons.length + antibioticsIcons.length + anticoagulantsIcons.length + antihypertensivesIcons.length + antimicrobialsIcons.length + endocrineDrugsIcons.length + giDrugsIcons.length + immunologyDrugsIcons.length + neuroDrugsIcons.length + oncologyDrugsIcons.length + psychotropicsIcons.length + respiratoryDrugsIcons.length + pharmacologyIcons.length,
    color: '#ef4444', // Red
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    description: 'Biological sciences including molecular biology, genetics, ecology, microbiology, zoology, botany, cell biology, neuroscience, environmental science, oceanography, and agriculture',
    iconCount: biologyIcons.length + molecularIcons.length + geneticsIcons.length + ecologyIcons.length + microbiologyIcons.length + zoologyIcons.length + botanyIcons.length + cellbiologyIcons.length + neuroscienceIcons.length + environmentalIcons.length + oceanographyIcons.length + agricultureIcons.length,
    color: '#22c55e', // Green
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Chemical structures, lab equipment, reactions, forensic science, and chemistry subspecialties including analytical, biochemistry, inorganic, medicinal, organic, physical, and polymer chemistry',
    iconCount: chemistryIcons.length + forensicsIcons.length + analyticalIcons.length + biochemistryIcons.length + inorganicIcons.length + medicinalIcons.length + organicIcons.length + physicalIcons.length + polymerIcons.length,
    color: '#8b5cf6', // Purple
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    description: 'Physical phenomena including astrophysics, electromagnetism, mechanics, nuclear physics, optics, quantum mechanics, solid state physics, thermodynamics, geology, astronomy, and meteorology',
    iconCount: physicsIcons.length + geologyIcons.length + astronomyIcons.length + meteorologyIcons.length + astrophysicsIcons.length + electromagnetismIcons.length + mechanicsIcons.length + nuclearIcons.length + opticsIcons.length + quantumIcons.length + solidstateIcons.length + thermodynamicsIcons.length,
    color: '#3b82f6', // Blue
  },
  engineering: {
    id: 'engineering',
    name: 'Engineering',
    description: 'Engineering disciplines including aerospace, biomedical, chemical, civil, computer, electrical, materials, and mechanical engineering',
    iconCount: engineeringIcons.length + materialsScienceIcons.length + aerospaceIcons.length + biomedicalIcons.length + chemicalIcons.length + civilIcons.length + computerIcons.length + electricalIcons.length + materialsIcons.length + mechanicalIcons.length,
    color: '#f59e0b', // Orange
  },
  general: {
    id: 'general',
    name: 'General',
    description: 'General-purpose scientific icons',
    iconCount: 0,
    color: '#6b7280', // Gray
  },
};

// =============================================================================
// ICON RETRIEVAL FUNCTIONS
// =============================================================================

/**
 * Get all icons from all domains
 * @returns Array of all icon definitions
 */
export function getAllIcons(): IconDefinition[] {
  return [...allIcons];
}

/**
 * Get icons filtered by domain
 * @param domain - The domain to filter by
 * @returns Array of icons in the specified domain
 */
export function getIconsByDomain(domain: IconDomain): IconDefinition[] {
  return iconsByDomain[domain] || [];
}

/**
 * Get a single icon by its ID
 * @param id - The unique icon ID
 * @returns The icon definition or undefined if not found
 */
export function getIconById(id: string): IconDefinition | undefined {
  return allIcons.find((icon) => icon.id === id);
}

/**
 * Get icons filtered by category
 * @param category - The category to filter by
 * @param domain - Optional domain to further filter
 * @returns Array of icons in the specified category
 */
export function getIconsByCategory(
  category: string,
  domain?: IconDomain
): IconDefinition[] {
  let icons = domain ? iconsByDomain[domain] : allIcons;
  return icons.filter(
    (icon) => icon.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories across all icons or within a domain
 * @param domain - Optional domain to get categories from
 * @returns Array of unique category names
 */
export function getCategories(domain?: IconDomain): string[] {
  const icons = domain ? iconsByDomain[domain] : allIcons;
  const categories = new Set(icons.map((icon) => icon.category));
  return Array.from(categories).sort();
}

// =============================================================================
// SEARCH FUNCTIONS
// =============================================================================

/**
 * Search icons by query string
 * Searches in name, tags, category, and domain
 * @param query - Search query string
 * @param options - Optional search options
 * @returns Array of matching icons
 */
export function searchIcons(
  query: string,
  options: IconSearchOptions = {}
): IconDefinition[] {
  const { domain, category, limit, sortBy } = options;
  const normalizedQuery = query.toLowerCase().trim();

  // Start with all icons or domain-filtered icons
  let results = domain ? [...iconsByDomain[domain]] : [...allIcons];

  // Filter by category if specified
  if (category) {
    results = results.filter(
      (icon) => icon.category.toLowerCase() === category.toLowerCase()
    );
  }

  // If no query, return current results
  if (!normalizedQuery) {
    return applySearchOptions(results, { limit, sortBy });
  }

  // Search across multiple fields
  results = results.filter((icon) => {
    // Check name
    if (icon.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check tags
    if (icon.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }

    // Check category
    if (icon.category.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check domain
    if (icon.domain.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check ID (for specific lookups)
    if (icon.id.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    return false;
  });

  // Score and sort by relevance
  results = results
    .map((icon) => ({
      icon,
      score: calculateRelevanceScore(icon, normalizedQuery),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ icon }) => icon);

  return applySearchOptions(results, { limit, sortBy });
}

/**
 * Calculate relevance score for search ranking
 */
function calculateRelevanceScore(icon: IconDefinition, query: string): number {
  let score = 0;

  // Exact name match (highest priority)
  if (icon.name.toLowerCase() === query) {
    score += 100;
  } else if (icon.name.toLowerCase().startsWith(query)) {
    score += 50;
  } else if (icon.name.toLowerCase().includes(query)) {
    score += 25;
  }

  // Tag matches
  icon.tags.forEach((tag) => {
    if (tag.toLowerCase() === query) {
      score += 30;
    } else if (tag.toLowerCase().includes(query)) {
      score += 10;
    }
  });

  // Category match
  if (icon.category.toLowerCase().includes(query)) {
    score += 15;
  }

  return score;
}

/**
 * Apply search options (limit, sorting) to results
 */
function applySearchOptions(
  icons: IconDefinition[],
  options: Pick<IconSearchOptions, 'limit' | 'sortBy'>
): IconDefinition[] {
  let results = [...icons];

  // Apply sorting if specified
  if (options.sortBy) {
    results.sort((a, b) => {
      const aVal = a[options.sortBy!];
      const bVal = b[options.sortBy!];
      return aVal.localeCompare(bVal);
    });
  }

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return results;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get available domains with icon counts
 * @returns Array of domains with their metadata
 */
export function getAvailableDomains(): DomainMetadata[] {
  return Object.values(domainMetadata).filter((d) => d.iconCount > 0);
}

/**
 * Get statistics about the icon library
 */
export function getIconStats(): {
  totalIcons: number;
  byDomain: Record<IconDomain, number>;
  byCategory: Record<string, number>;
} {
  const byCategory: Record<string, number> = {};
  allIcons.forEach((icon) => {
    byCategory[icon.category] = (byCategory[icon.category] || 0) + 1;
  });

  return {
    totalIcons: allIcons.length,
    byDomain: {
      medicine: medicineIcons.length + cardiologyIcons.length + neurologyIcons.length + pulmonologyIcons.length + gastroenterologyIcons.length + nephrologyIcons.length + anesthesiologyIcons.length + ophthalmologyIcons.length + radiologyIcons.length + rheumatologyIcons.length + orthopedicsIcons.length + psychiatryIcons.length + emergencyIcons.length + endocrinologyIcons.length + infectiousIcons.length + pediatricsIcons.length + pathologyIcons.length + entIcons.length + obgynIcons.length + analgesicsIcons.length + antibioticsIcons.length + anticoagulantsIcons.length + antihypertensivesIcons.length + antimicrobialsIcons.length + endocrineDrugsIcons.length + giDrugsIcons.length + immunologyDrugsIcons.length + neuroDrugsIcons.length + oncologyDrugsIcons.length + psychotropicsIcons.length + respiratoryDrugsIcons.length + pharmacologyIcons.length,
      biology: biologyIcons.length + molecularIcons.length + geneticsIcons.length + ecologyIcons.length + microbiologyIcons.length + zoologyIcons.length + botanyIcons.length + cellbiologyIcons.length + neuroscienceIcons.length + environmentalIcons.length + oceanographyIcons.length + agricultureIcons.length,
      chemistry: chemistryIcons.length + forensicsIcons.length + analyticalIcons.length + biochemistryIcons.length + inorganicIcons.length + medicinalIcons.length + organicIcons.length + physicalIcons.length + polymerIcons.length,
      physics: physicsIcons.length + geologyIcons.length + astronomyIcons.length + meteorologyIcons.length + astrophysicsIcons.length + electromagnetismIcons.length + mechanicsIcons.length + nuclearIcons.length + opticsIcons.length + quantumIcons.length + solidstateIcons.length + thermodynamicsIcons.length + mathematicsIcons.length,
      engineering: engineeringIcons.length + materialsScienceIcons.length + aerospaceIcons.length + biomedicalIcons.length + chemicalIcons.length + civilIcons.length + computerIcons.length + electricalIcons.length + materialsIcons.length + mechanicalIcons.length,
      general: 0,
    },
    byCategory,
  };
}

/**
 * Parse SVG string to get width and height
 * @param svg - SVG string
 * @returns Object with width and height or null if parsing fails
 */
export function parseSvgDimensions(
  svg: string
): { width: number; height: number } | null {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    const [, , , width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }
  return null;
}

/**
 * Convert icon SVG to a data URL for embedding
 * @param icon - The icon definition
 * @returns Data URL string
 */
export function iconToDataUrl(icon: IconDefinition): string {
  const encodedSvg = encodeURIComponent(icon.svg);
  return `data:image/svg+xml,${encodedSvg}`;
}

/**
 * Convert icon SVG to base64 data URL
 * @param icon - The icon definition
 * @returns Base64 data URL string
 */
export function iconToBase64(icon: IconDefinition): string {
  if (typeof btoa === 'function') {
    const base64 = btoa(icon.svg);
    return `data:image/svg+xml;base64,${base64}`;
  }
  // Fallback for Node.js environment
  return iconToDataUrl(icon);
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

export { medicineIcons } from './medicine';
export { cardiologyIcons } from './cardiology';
export { neurologyIcons } from './neurology';
export { gastroenterologyIcons } from './gastroenterology';
export { nephrologyIcons } from './nephrology';
export { anesthesiologyIcons } from './anesthesiology';
export { ophthalmologyIcons } from './ophthalmology';
export { radiologyIcons } from './radiology';
export { rheumatologyIcons } from './rheumatology';
export { orthopedicsIcons } from './orthopedics';
export { psychiatryIcons } from './psychiatry';
export { biologyIcons } from './biology';
export { chemistryIcons } from './chemistry';
export { physicsIcons } from './physics';
export { engineeringIcons } from './engineering';
export { infectiousIcons } from './infectious';
export { pediatricsIcons } from './pediatrics';
export { emergencyIcons } from './emergency';
export { pulmonologyIcons } from './pulmonology';
export { endocrinologyIcons } from './endocrinology';
export { pathologyIcons } from './pathology';
export { entIcons } from './ent';
export { obgynIcons } from './obgyn';
export { physiologyIcons } from './physiology';
export { anatomyIcons } from './anatomy';
// Drug classes
export { analgesicsIcons } from './analgesics';
export { antibioticsIcons } from './antibiotics';
export { anticoagulantsIcons } from './anticoagulants';
export { antihypertensivesIcons } from './antihypertensives';
export { antimicrobialsIcons } from './antimicrobials';
export { endocrineDrugsIcons } from './endocrine_drugs';
export { giDrugsIcons } from './gi_drugs';
export { immunologyDrugsIcons } from './immunology_drugs';
export { neuroDrugsIcons } from './neuro_drugs';
export { oncologyDrugsIcons } from './oncology_drugs';
export { psychotropicsIcons } from './psychotropics';
export { respiratoryDrugsIcons } from './respiratory_drugs';
export { pharmacologyIcons } from './pharmacology';
// Biology subspecialties
export { molecularIcons } from './molecular';
export { geneticsIcons } from './genetics';
export { ecologyIcons } from './ecology';
export { microbiologyIcons } from './microbiology';
export { zoologyIcons } from './zoology';
export { botanyIcons } from './botany';
export { cellbiologyIcons } from './cell-biology';
export { neuroscienceIcons } from './neuroscience';
// Chemistry subspecialties
export { analyticalIcons } from './analytical';
export { biochemistryIcons } from './biochemistry';
export { inorganicIcons } from './inorganic';
export { medicinalIcons } from './medicinal';
export { organicIcons } from './organic';
export { physicalIcons } from './physical';
export { polymerIcons } from './polymer';
// Physics subspecialties
export { astrophysicsIcons } from './astrophysics';
export { electromagnetismIcons } from './electromagnetism';
export { mechanicsIcons } from './mechanics';
export { nuclearIcons } from './nuclear';
export { opticsIcons } from './optics';
export { quantumIcons } from './quantum';
export { solidstateIcons } from './solidstate';
export { thermodynamicsIcons } from './thermodynamics';
// Engineering subspecialties
export { aerospaceIcons } from './aerospace';
export { biomedicalIcons } from './biomedical';
export { chemicalIcons } from './chemical';
export { civilIcons } from './civil';
export { computerIcons } from './computer';
export { electricalIcons } from './electrical';
export { materialsIcons } from './materials';
export { mechanicalIcons } from './mechanical';
// Additional science branches
export { geologyIcons } from './geology';
export { astronomyIcons } from './astronomy';
export { environmentalIcons } from './environmental';
export { materialsScienceIcons } from './materials_science';
export { oceanographyIcons } from './oceanography';
export { meteorologyIcons } from './meteorology';
export { agricultureIcons } from './agriculture';
export { forensicsIcons } from './forensics';
export { hematologyOncologyIcons } from './hematology-oncology';
export { dermatologyIcons } from './dermatology';
export { mathematicsIcons } from './mathematics';

const iconLibrary = {
  allIcons,
  iconsByDomain,
  domainMetadata,
  getAllIcons,
  getIconsByDomain,
  getIconById,
  getIconsByCategory,
  getCategories,
  searchIcons,
  getAvailableDomains,
  getIconStats,
  parseSvgDimensions,
  iconToDataUrl,
  iconToBase64,
};

export default iconLibrary;
