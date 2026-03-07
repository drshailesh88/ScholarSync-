/**
 * templates/index.ts
 * Template data system for FINNISH scientific diagram generation
 *
 * Provides pre-defined templates for common scientific and technical diagrams
 * across multiple domains including medicine, biology, chemistry, physics,
 * and engineering.
 *
 * @module data/templates
 */

// =============================================================================
// RE-EXPORT DOMAIN TEMPLATES
// =============================================================================

export * from './medicine';
export * from './cardiology';
export * from './neurology';
export * from './gastroenterology';
export * from './nephrology';
export * from './anesthesiology';
export * from './ophthalmology';
export * from './radiology';
export * from './rheumatology';
export * from './endocrinology';
export * from './biology';
export * from './chemistry';
export * from './physics';
export * from './engineering';
export * from './pediatrics';
export * from './orthopedics';
export * from './infectious';
export * from './psychiatry';
export * from './emergency';
export * from './pulmonology';
export * from './pathology';
export * from './ent';
export * from './obgyn';
export * from './hematology-oncology';
export {
  cardiacCycleDiagram,
  frankStarlingMechanism,
  pressureVolumeLooP,
  oxygenDissociationCurve,
  vqMatching,
  spirometryTemplate,
  nephronFunction,
  raasSystem,
  countercurrentMechanism,
  actionPotential,
  synapticTransmission,
  slidingFilamentModel,
  excitationContractionCoupling,
  hypothalamicPituitaryAxis,
  insulinGlucoseRegulation,
  cellularRespirationOverview,
  krebsCycleTemplate,
  acidBaseDisorders,
  bodyFluidCompartments,
  starlingForcesTemplate,
  reflexArc,
  // Note: autonomicNervousSystem excluded to avoid conflict with anesthesiology
  physiologyTemplates,
} from './physiology';
export * from './dermatology';
export { anatomyTemplates } from './anatomy';
// Biology subspecialties - use explicit exports to avoid duplicates
export { molecularTemplates } from './molecular';
export { geneticsTemplates } from './genetics';
export * from './ecology';
export * from './microbiology';
export * from './zoology';
export * from './botany';
export { cellbiologyTemplates } from './cell-biology';
export * from './neuroscience';
// Additional science branches - use explicit exports to avoid duplicates
export * from './geology';
export { astronomyTemplates } from './astronomy';
export {
  globalCarbonCycle,
  waterCycleDiagram,
  greenhouseEffectDiagram,
  foodWebDiagram,
  environmentalImpactAssessment,
  waterQualityMonitoring,
  biodiversitySurvey,
  // Note: biomeClassification excluded to avoid conflict with biology
  pollutionClassification,
  iucnConservationStatus,
  nitrogenCycleDiagram,
  ecologicalSuccession,
  wasteManagementHierarchy,
  climateChangeImpacts,
  lifeCycleAssessment,
  renewableEnergySystems,
  environmentalTemplates,
} from './environmental';
export * from './materials_science';
export * from './oceanography';
export * from './meteorology';
export * from './agriculture';
export * from './forensics';
// Physics subspecialties - use explicit exports to avoid duplicates
export { quantumTemplates } from './quantum';
export { thermodynamicsTemplates } from './thermodynamics';
export * from './electromagnetism';
export * from './optics';
export * from './nuclear';
export { mechanicsTemplates } from './mechanics';
export { astrophysicsTemplates } from './astrophysics';
// Chemistry subspecialties
export * from './biochemistry';
export * from './organic';
export * from './inorganic';
export * from './analytical';
// Engineering subspecialties - use explicit exports to avoid duplicates
export { aerospaceTemplates } from './aerospace';
export { mechanicalTemplates } from './mechanical';
export { electricalTemplates } from './electrical';
export * from './civil';
export { chemicalTemplates } from './chemical';
export { computerTemplates } from './computer';
export * from './biomedical';
// Pharmacology/Medicine subspecialties - use explicit exports to avoid duplicates
export * from './analgesics';
export * from './antibiotics';
export * from './psychotropics';
export { endocrineDrugsTemplates } from './endocrine_drugs';
export { pharmacologyTemplates } from './pharmacology';
// Mathematics
export { mathematicsTemplates } from './mathematics';
// General-purpose
export * from './general-purpose';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Represents a diagram template with placeholders for customization.
 * Templates provide structured prompts that guide AI generation of
 * domain-specific scientific diagrams.
 */
export interface DiagramTemplate {
  /** Unique identifier for the template (format: domain-type) */
  id: string;

  /** Human-readable name of the template */
  name: string;

  /** Detailed description of what the template produces */
  description: string;

  /** Scientific domain category */
  domain: TemplateDomain;

  /**
   * Prompt template with {{placeholders}} for variable substitution.
   * Supports Mustache-like syntax including conditionals:
   * - {{placeholder}} - Simple substitution
   * - {{#conditional}}content{{/conditional}} - Conditional block
   */
  promptTemplate: string;

  /** List of placeholder names used in the promptTemplate */
  placeholders: string[];

  /** Optional thumbnail image URL for template preview */
  thumbnail?: string;

  /** Optional Mermaid DSL example showing expected output */
  mermaidExample?: string;
}

/**
 * Supported template domains
 */
export type TemplateDomain =
  | 'medicine'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'engineering'
  | 'general';

/**
 * Template with filled placeholder values
 */
export interface FilledTemplate {
  /** The original template */
  template: DiagramTemplate;

  /** Map of placeholder names to their filled values */
  values: Record<string, string>;

  /** The resulting prompt after substitution */
  filledPrompt: string;
}

/**
 * Search options for finding templates
 */
export interface TemplateSearchOptions {
  /** Filter by domain */
  domain?: TemplateDomain;

  /** Search term to match against name and description */
  searchTerm?: string;

  /** Maximum number of results to return */
  limit?: number;
}

// =============================================================================
// IMPORT DOMAIN TEMPLATES
// =============================================================================

import { medicineTemplates } from './medicine';
import { cardiologyTemplates } from './cardiology';
import { neurologyTemplates } from './neurology';
import { gastroenterologyTemplates } from './gastroenterology';
import { nephrologyTemplates } from './nephrology';
import { anesthesiologyTemplates } from './anesthesiology';
import { ophthalmologyTemplates } from './ophthalmology';
import { radiologyTemplates } from './radiology';
import { rheumatologyTemplates } from './rheumatology';
import { endocrinologyTemplates } from './endocrinology';
import { biologyTemplates } from './biology';
import { chemistryTemplates } from './chemistry';
import { physicsTemplates } from './physics';
import { engineeringTemplates } from './engineering';
import { pediatricsTemplates } from './pediatrics';
import { orthopedicsTemplates } from './orthopedics';
import { infectiousTemplates } from './infectious';
import { psychiatryTemplates } from './psychiatry';
import { emergencyTemplates } from './emergency';
import { pulmonologyTemplates } from './pulmonology';
import { pathologyTemplates } from './pathology';
import { entTemplates } from './ent';
import { obgynTemplates } from './obgyn';
import { hematologyOncologyTemplates } from './hematology-oncology';
import { physiologyTemplates } from './physiology';
import { dermatologyTemplates } from './dermatology';
import { anatomyTemplates } from './anatomy';
// Biology subspecialties
import { molecularTemplates } from './molecular';
import { geneticsTemplates } from './genetics';
import { ecologyTemplates } from './ecology';
import { microbiologyTemplates } from './microbiology';
import { zoologyTemplates } from './zoology';
import { botanyTemplates } from './botany';
import { cellbiologyTemplates } from './cell-biology';
import { neuroscienceTemplates } from './neuroscience';
// Additional science branches
import { geologyTemplates } from './geology';
import { astronomyTemplates } from './astronomy';
import { environmentalTemplates } from './environmental';
import { materialsScienceTemplates } from './materials_science';
import { oceanographyTemplates } from './oceanography';
import { meteorologyTemplates } from './meteorology';
import { agricultureTemplates } from './agriculture';
import { forensicsTemplates } from './forensics';
// Physics subspecialties
import { quantumTemplates } from './quantum';
import { thermodynamicsTemplates } from './thermodynamics';
import { electromagnetismTemplates } from './electromagnetism';
import { opticsTemplates } from './optics';
import { nuclearTemplates } from './nuclear';
import { mechanicsTemplates } from './mechanics';
import { astrophysicsTemplates } from './astrophysics';
// Chemistry subspecialties
import { biochemistryTemplates } from './biochemistry';
import { organicTemplates } from './organic';
import { inorganicTemplates } from './inorganic';
import { analyticalTemplates } from './analytical';
// Engineering subspecialties
import { aerospaceTemplates } from './aerospace';
import { mechanicalTemplates } from './mechanical';
import { electricalTemplates } from './electrical';
import { civilTemplates } from './civil';
import { chemicalTemplates } from './chemical';
import { computerTemplates } from './computer';
import { biomedicalTemplates } from './biomedical';
// Pharmacology/Medicine subspecialties
import { analgesicsTemplates } from './analgesics';
import { antibioticsTemplates } from './antibiotics';
import { psychotropicsTemplates } from './psychotropics';
import { endocrineDrugsTemplates } from './endocrine_drugs';
import { pharmacologyTemplates } from './pharmacology';
// Mathematics
import { mathematicsTemplates } from './mathematics';
// General-purpose
import { generalPurposeTemplates } from './general-purpose';

// =============================================================================
// AGGREGATED TEMPLATE COLLECTIONS
// =============================================================================

/**
 * All available templates across all domains
 */
export const allTemplates: DiagramTemplate[] = [
  ...medicineTemplates,
  ...cardiologyTemplates,
  ...neurologyTemplates,
  ...gastroenterologyTemplates,
  ...nephrologyTemplates,
  ...anesthesiologyTemplates,
  ...ophthalmologyTemplates,
  ...radiologyTemplates,
  ...rheumatologyTemplates,
  ...endocrinologyTemplates,
  ...biologyTemplates,
  ...molecularTemplates,
  ...geneticsTemplates,
  ...ecologyTemplates,
  ...microbiologyTemplates,
  ...zoologyTemplates,
  ...botanyTemplates,
  ...cellbiologyTemplates,
  ...neuroscienceTemplates,
  ...chemistryTemplates,
  ...physicsTemplates,
  ...engineeringTemplates,
  ...infectiousTemplates,
  ...orthopedicsTemplates,
  ...pediatricsTemplates,
  ...psychiatryTemplates,
  ...emergencyTemplates,
  ...pulmonologyTemplates,
  ...pathologyTemplates,
  ...entTemplates,
  ...obgynTemplates,
  ...hematologyOncologyTemplates,
  ...dermatologyTemplates,
  ...physiologyTemplates,
  ...anatomyTemplates,
  // Additional science branches
  ...geologyTemplates,
  ...astronomyTemplates,
  ...environmentalTemplates,
  ...materialsScienceTemplates,
  ...oceanographyTemplates,
  ...meteorologyTemplates,
  ...agricultureTemplates,
  ...forensicsTemplates,
  // Physics subspecialties
  ...quantumTemplates,
  ...thermodynamicsTemplates,
  ...electromagnetismTemplates,
  ...opticsTemplates,
  ...nuclearTemplates,
  ...mechanicsTemplates,
  ...astrophysicsTemplates,
  // Chemistry subspecialties
  ...biochemistryTemplates,
  ...organicTemplates,
  ...inorganicTemplates,
  ...analyticalTemplates,
  // Engineering subspecialties
  ...aerospaceTemplates,
  ...mechanicalTemplates,
  ...electricalTemplates,
  ...civilTemplates,
  ...chemicalTemplates,
  ...computerTemplates,
  ...biomedicalTemplates,
  // Pharmacology/Medicine subspecialties
  ...analgesicsTemplates,
  ...antibioticsTemplates,
  ...psychotropicsTemplates,
  ...endocrineDrugsTemplates,
  ...pharmacologyTemplates,
  // Mathematics
  ...mathematicsTemplates,
  // General-purpose
  ...generalPurposeTemplates,
];

/**
 * Templates organized by domain
 */
export const templatesByDomain: Record<TemplateDomain, DiagramTemplate[]> = {
  medicine: [...medicineTemplates, ...cardiologyTemplates, ...neurologyTemplates,
  ...gastroenterologyTemplates,
  ...nephrologyTemplates, ...anesthesiologyTemplates, ...ophthalmologyTemplates, ...radiologyTemplates, ...rheumatologyTemplates, ...orthopedicsTemplates, ...endocrinologyTemplates, ...pediatricsTemplates, ...infectiousTemplates, ...psychiatryTemplates, ...emergencyTemplates, ...pulmonologyTemplates, ...pathologyTemplates, ...entTemplates, ...obgynTemplates, ...hematologyOncologyTemplates, ...dermatologyTemplates, ...physiologyTemplates, ...anatomyTemplates, ...analgesicsTemplates, ...antibioticsTemplates, ...psychotropicsTemplates, ...endocrineDrugsTemplates, ...pharmacologyTemplates],
  biology: [...biologyTemplates, ...molecularTemplates, ...geneticsTemplates, ...ecologyTemplates, ...microbiologyTemplates, ...zoologyTemplates, ...botanyTemplates, ...cellbiologyTemplates, ...neuroscienceTemplates, ...environmentalTemplates, ...oceanographyTemplates, ...agricultureTemplates],
  chemistry: [...chemistryTemplates, ...forensicsTemplates, ...biochemistryTemplates, ...organicTemplates, ...inorganicTemplates, ...analyticalTemplates],
  physics: [...physicsTemplates, ...geologyTemplates, ...astronomyTemplates, ...meteorologyTemplates, ...quantumTemplates, ...thermodynamicsTemplates, ...electromagnetismTemplates, ...opticsTemplates, ...nuclearTemplates, ...mechanicsTemplates, ...astrophysicsTemplates, ...mathematicsTemplates],
  engineering: [...engineeringTemplates, ...materialsScienceTemplates, ...aerospaceTemplates, ...mechanicalTemplates, ...electricalTemplates, ...civilTemplates, ...chemicalTemplates, ...computerTemplates, ...biomedicalTemplates],
  general: [...generalPurposeTemplates],
};

/**
 * Template ID to template mapping for quick lookup
 */
const templateIndex: Map<string, DiagramTemplate> = new Map(
  allTemplates.map((template) => [template.id, template])
);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all templates for a specific domain
 *
 * @param domain - The domain to filter by
 * @returns Array of templates in the specified domain
 *
 * @example
 * ```typescript
 * const medicalTemplates = getTemplatesByDomain('medicine');
 * console.log(medicalTemplates.length); // 7
 * ```
 */
export function getTemplatesByDomain(domain: TemplateDomain): DiagramTemplate[] {
  return templatesByDomain[domain] ?? [];
}

/**
 * Get a template by its unique ID
 *
 * @param id - The template ID to look up
 * @returns The template if found, undefined otherwise
 *
 * @example
 * ```typescript
 * const consort = getTemplateById('med-consort-flow');
 * console.log(consort?.name); // 'CONSORT Flow Diagram'
 * ```
 */
export function getTemplateById(id: string): DiagramTemplate | undefined {
  return templateIndex.get(id);
}

/**
 * Search templates by name, description, or domain
 *
 * @param options - Search options
 * @returns Array of matching templates
 *
 * @example
 * ```typescript
 * const results = searchTemplates({
 *   searchTerm: 'flow',
 *   domain: 'medicine',
 *   limit: 5
 * });
 * ```
 */
export function searchTemplates(options: TemplateSearchOptions): DiagramTemplate[] {
  let results = allTemplates;

  // Filter by domain
  if (options.domain) {
    results = results.filter((t) => t.domain === options.domain);
  }

  // Filter by search term
  if (options.searchTerm) {
    const term = options.searchTerm.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.id.toLowerCase().includes(term)
    );
  }

  // Apply limit
  if (options.limit && options.limit > 0) {
    results = results.slice(0, options.limit);
  }

  return results;
}

/**
 * Get all available domain names
 *
 * @returns Array of domain names
 */
export function getAvailableDomains(): TemplateDomain[] {
  return Object.keys(templatesByDomain) as TemplateDomain[];
}

/**
 * Get template count statistics
 *
 * @returns Object with template counts per domain and total
 */
export function getTemplateStats(): {
  total: number;
  byDomain: Record<TemplateDomain, number>;
} {
  return {
    total: allTemplates.length,
    byDomain: {
      medicine: medicineTemplates.length + cardiologyTemplates.length + neurologyTemplates.length + gastroenterologyTemplates.length + nephrologyTemplates.length + anesthesiologyTemplates.length + ophthalmologyTemplates.length + radiologyTemplates.length + rheumatologyTemplates.length + orthopedicsTemplates.length + endocrinologyTemplates.length + pediatricsTemplates.length + infectiousTemplates.length + psychiatryTemplates.length + emergencyTemplates.length + pulmonologyTemplates.length + pathologyTemplates.length + entTemplates.length + obgynTemplates.length + hematologyOncologyTemplates.length + dermatologyTemplates.length + physiologyTemplates.length + anatomyTemplates.length + analgesicsTemplates.length + antibioticsTemplates.length + psychotropicsTemplates.length + endocrineDrugsTemplates.length + pharmacologyTemplates.length,
      biology: biologyTemplates.length + molecularTemplates.length + geneticsTemplates.length + ecologyTemplates.length + microbiologyTemplates.length + zoologyTemplates.length + botanyTemplates.length + cellbiologyTemplates.length + neuroscienceTemplates.length,
      chemistry: chemistryTemplates.length + forensicsTemplates.length + biochemistryTemplates.length + organicTemplates.length + inorganicTemplates.length + analyticalTemplates.length,
      physics: physicsTemplates.length + geologyTemplates.length + astronomyTemplates.length + meteorologyTemplates.length + quantumTemplates.length + thermodynamicsTemplates.length + electromagnetismTemplates.length + opticsTemplates.length + nuclearTemplates.length + mechanicsTemplates.length + astrophysicsTemplates.length + mathematicsTemplates.length,
      engineering: engineeringTemplates.length + materialsScienceTemplates.length + aerospaceTemplates.length + mechanicalTemplates.length + electricalTemplates.length + civilTemplates.length + chemicalTemplates.length + computerTemplates.length + biomedicalTemplates.length,
      general: generalPurposeTemplates.length,
    },
  };
}

// =============================================================================
// TEMPLATE FILLING FUNCTIONS
// =============================================================================

/**
 * Fill a template with provided values
 *
 * @param template - The template to fill
 * @param values - Object mapping placeholder names to values
 * @returns FilledTemplate with the resulting prompt
 *
 * @example
 * ```typescript
 * const template = getTemplateById('med-consort-flow')!;
 * const filled = fillTemplate(template, {
 *   totalAssessed: '250',
 *   randomized: '200',
 *   // ... other values
 * });
 * console.log(filled.filledPrompt);
 * ```
 */
export function fillTemplate(
  template: DiagramTemplate,
  values: Record<string, string>
): FilledTemplate {
  let filledPrompt = template.promptTemplate;

  // Replace simple placeholders
  for (const [key, value] of Object.entries(values)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    filledPrompt = filledPrompt.replace(regex, value);
  }

  // Handle conditional blocks
  // Pattern: {{#key}}content{{/key}}
  const conditionalRegex = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  filledPrompt = filledPrompt.replace(conditionalRegex, (_match, key, content) => {
    const value = values[key];
    if (value && value.trim()) {
      // Replace the placeholder within the conditional block
      return content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    }
    return ''; // Remove the block if no value provided
  });

  // Remove any remaining unfilled placeholders
  filledPrompt = filledPrompt.replace(/\{\{\w+\}\}/g, '');

  // Clean up extra whitespace
  filledPrompt = filledPrompt
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line, index, arr) => {
      // Remove consecutive empty lines
      if (line === '' && index > 0 && arr[index - 1] === '') {
        return false;
      }
      return true;
    })
    .join('\n')
    .trim();

  return {
    template,
    values,
    filledPrompt,
  };
}

/**
 * Validate that all required placeholders are provided
 *
 * @param template - The template to validate against
 * @param values - The values to validate
 * @returns Object with validation result and missing placeholders
 *
 * @example
 * ```typescript
 * const validation = validateTemplateValues(template, values);
 * if (!validation.valid) {
 *   console.log('Missing:', validation.missing);
 * }
 * ```
 */
export function validateTemplateValues(
  template: DiagramTemplate,
  values: Record<string, string>
): { valid: boolean; missing: string[]; extra: string[] } {
  const providedKeys = new Set(Object.keys(values));
  const requiredKeys = new Set(template.placeholders);

  const missing = template.placeholders.filter((key) => !providedKeys.has(key));
  const extra = Object.keys(values).filter((key) => !requiredKeys.has(key));

  return {
    valid: missing.length === 0,
    missing,
    extra,
  };
}

/**
 * Extract placeholders from a prompt template string
 *
 * @param promptTemplate - The template string to parse
 * @returns Array of unique placeholder names found
 *
 * @example
 * ```typescript
 * const placeholders = extractPlaceholders('Hello {{name}}, welcome to {{place}}!');
 * // Returns: ['name', 'place']
 * ```
 */
export function extractPlaceholders(promptTemplate: string): string[] {
  const placeholderRegex = /\{\{#?(\w+)\}\}/g;
  const placeholders = new Set<string>();

  let match;
  while ((match = placeholderRegex.exec(promptTemplate)) !== null) {
    placeholders.add(match[1]);
  }

  return Array.from(placeholders);
}

/**
 * Create a new custom template
 *
 * @param params - Template parameters
 * @returns A new DiagramTemplate object
 *
 * @example
 * ```typescript
 * const customTemplate = createTemplate({
 *   id: 'custom-my-diagram',
 *   name: 'My Custom Diagram',
 *   description: 'A custom diagram template',
 *   domain: 'engineering',
 *   promptTemplate: 'Create a diagram showing {{items}} connected by {{connections}}',
 * });
 * ```
 */
export function createTemplate(params: {
  id: string;
  name: string;
  description: string;
  domain: TemplateDomain;
  promptTemplate: string;
  thumbnail?: string;
  mermaidExample?: string;
}): DiagramTemplate {
  return {
    ...params,
    placeholders: extractPlaceholders(params.promptTemplate),
  };
}

// =============================================================================
// DOMAIN METADATA
// =============================================================================

/**
 * Metadata about each template domain
 */
export const domainMetadata: Record<
  TemplateDomain,
  {
    name: string;
    description: string;
    icon: string;
    color: string;
  }
> = {
  medicine: {
    name: 'Medicine',
    description: 'Clinical trials, patient flows, and medical research diagrams',
    icon: 'stethoscope',
    color: '#dc2626',
  },
  biology: {
    name: 'Biology',
    description: 'Cell pathways, gene expression, and ecological diagrams',
    icon: 'dna',
    color: '#16a34a',
  },
  chemistry: {
    name: 'Chemistry',
    description: 'Reaction mechanisms, molecular structures, and phase diagrams',
    icon: 'flask',
    color: '#9333ea',
  },
  physics: {
    name: 'Physics',
    description: 'Force diagrams, circuits, waves, and energy systems',
    icon: 'atom',
    color: '#2563eb',
  },
  engineering: {
    name: 'Engineering',
    description: 'System design, software architecture, and technical diagrams',
    icon: 'cog',
    color: '#d97706',
  },
  general: {
    name: 'General Purpose',
    description: 'Business analysis, project management, and universal diagram templates',
    icon: 'grid',
    color: '#6366f1',
  },
};

/**
 * Get metadata for a specific domain
 *
 * @param domain - The domain to get metadata for
 * @returns Domain metadata object
 */
export function getDomainMetadata(domain: TemplateDomain): {
  name: string;
  description: string;
  icon: string;
  color: string;
} {
  return domainMetadata[domain];
}
