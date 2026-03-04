/**
 * data/index.ts
 * Data module exports for FINNISH
 *
 * Central export point for all data modules including templates,
 * icons, configuration data, and static assets.
 *
 * @module data
 */

// =============================================================================
// TEMPLATE EXPORTS
// =============================================================================

export * from './templates';

// Re-export commonly used items at the top level for convenience
export {
  // Types
  type DiagramTemplate,
  type TemplateDomain,
  type FilledTemplate,
  type TemplateSearchOptions,

  // Collections
  allTemplates,
  templatesByDomain,
  domainMetadata,

  // Functions
  getTemplatesByDomain,
  getTemplateById,
  searchTemplates,
  getAvailableDomains,
  getTemplateStats,
  fillTemplate,
  validateTemplateValues,
  extractPlaceholders,
  createTemplate,
  getDomainMetadata,

  // Domain-specific template arrays
  medicineTemplates,
  biologyTemplates,
  chemistryTemplates,
  physicsTemplates,
  engineeringTemplates,
} from './templates';

// =============================================================================
// COLOR SCHEME EXPORTS
// =============================================================================

export * from './colors';

// =============================================================================
// ICON LIBRARY EXPORTS
// =============================================================================

export * from './icons';

// Re-export commonly used icon items at the top level
export {
  // Types
  type IconDefinition,
  type IconDomain,
  type DomainMetadata as IconDomainMetadata,
  type IconSearchOptions,

  // Collections
  allIcons,
  iconsByDomain,
  domainMetadata as iconDomainMetadata,

  // Functions
  getAllIcons,
  getIconsByDomain,
  getIconById,
  getIconsByCategory,
  getCategories,
  searchIcons,
  getAvailableDomains as getAvailableIconDomains,
  getIconStats,
  parseSvgDimensions,
  iconToDataUrl,
  iconToBase64,

  // Domain-specific icon arrays
  medicineIcons,
  biologyIcons,
  chemistryIcons,
  physicsIcons,
  engineeringIcons,
} from './icons';
