/**
 * Respiratory Drugs Icon Library
 * Comprehensive SVG icons for respiratory medication drug classes
 *
 * Categories:
 * - Bronchodilators (Beta-2 agonists, anticholinergics)
 * - Inhaled Corticosteroids
 * - Leukotriene modifiers
 * - Antihistamines
 * - Mucolytics and expectorants
 */

import type { IconDefinition } from './index';

export const respiratoryDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // BRONCHODILATORS - BETA-2 AGONISTS
  // ===========================================================================
  {
    id: 'resp-beta2-mechanism',
    name: 'Beta-2 Agonist Mechanism',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['beta-2', 'bronchodilator', 'receptor', 'smooth muscle', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-8 8-16 20-16s20 8 20 16-8 16-20 16-20-8-20-16z" fill="#2196F3" opacity="0.2"/>
      <path d="M12 32c0-8 8-16 20-16s20 8 20 16-8 16-20 16-20-8-20-16z"/>
      <path d="M20 32h24" stroke-width="3" stroke="#4CAF50"/>
      <circle cx="32" cy="32" r="6" fill="#4CAF50" opacity="0.5"/>
      <text x="28" y="36" font-size="5" fill="currentColor" stroke="none">B2</text>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Bronchodilation</text>
    </svg>`
  },
  {
    id: 'resp-albuterol',
    name: 'Albuterol (SABA)',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['albuterol', 'SABA', 'rescue', 'ventolin', 'proventil', 'short-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4" fill="#2196F3" opacity="0.3"/>
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <circle cx="32" cy="24" r="6" fill="#2196F3" opacity="0.5"/>
      <path d="M26 36h12"/>
      <path d="M26 42h12"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Albuterol</text>
    </svg>`
  },
  {
    id: 'resp-salmeterol',
    name: 'Salmeterol (LABA)',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['salmeterol', 'LABA', 'long-acting', 'serevent', 'maintenance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="14" width="32" height="36" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="16" y="14" width="32" height="36" rx="6"/>
      <path d="M24 28h16"/>
      <text x="26" y="42" font-size="5" fill="currentColor" stroke="none">12h</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Salmeterol</text>
    </svg>`
  },
  {
    id: 'resp-formoterol',
    name: 'Formoterol (LABA)',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['formoterol', 'LABA', 'long-acting', 'foradil', 'fast onset'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18" fill="#8BC34A" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="18"/>
      <path d="M22 32l10-10 10 10"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Formoterol</text>
    </svg>`
  },

  // ===========================================================================
  // ANTICHOLINERGICS
  // ===========================================================================
  {
    id: 'resp-ipratropium',
    name: 'Ipratropium (SAMA)',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['ipratropium', 'SAMA', 'atrovent', 'anticholinergic', 'short-acting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Ipratropium</text>
    </svg>`
  },
  {
    id: 'resp-tiotropium',
    name: 'Tiotropium (LAMA)',
    domain: 'medicine',
    category: 'respiratory-bronchodilators',
    tags: ['tiotropium', 'LAMA', 'spiriva', 'anticholinergic', 'long-acting', 'COPD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FF5722" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">24h</text>
      <circle cx="32" cy="32" r="10"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Tiotropium</text>
    </svg>`
  },

  // ===========================================================================
  // INHALED CORTICOSTEROIDS
  // ===========================================================================
  {
    id: 'resp-ics-mechanism',
    name: 'ICS Mechanism',
    domain: 'medicine',
    category: 'respiratory-ics',
    tags: ['ICS', 'corticosteroid', 'anti-inflammatory', 'mechanism', 'inhaled'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20h32v24H16z" fill="#9C27B0" opacity="0.2"/>
      <path d="M16 20h32v24H16z"/>
      <circle cx="26" cy="32" r="5" fill="#F44336" opacity="0.5"/>
      <circle cx="38" cy="32" r="5" fill="#F44336" opacity="0.5"/>
      <path d="M26 32l-6 12"/>
      <path d="M38 32l6 12"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Anti-inflammatory</text>
    </svg>`
  },
  {
    id: 'resp-fluticasone',
    name: 'Fluticasone',
    domain: 'medicine',
    category: 'respiratory-ics',
    tags: ['fluticasone', 'flovent', 'ICS', 'inhaled steroid', 'asthma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="18" y="14" width="28" height="36" rx="4" fill="#9C27B0" opacity="0.3"/>
      <rect x="18" y="14" width="28" height="36" rx="4"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">FLU</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Fluticasone</text>
    </svg>`
  },
  {
    id: 'resp-budesonide',
    name: 'Budesonide',
    domain: 'medicine',
    category: 'respiratory-ics',
    tags: ['budesonide', 'pulmicort', 'ICS', 'nebulized', 'inhaled steroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#673AB7" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">BUD</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Budesonide</text>
    </svg>`
  },
  {
    id: 'resp-beclomethasone',
    name: 'Beclomethasone',
    domain: 'medicine',
    category: 'respiratory-ics',
    tags: ['beclomethasone', 'QVAR', 'ICS', 'inhaled steroid', 'HFA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#E91E63" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">BEC</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Beclomethasone</text>
    </svg>`
  },

  // ===========================================================================
  // COMBINATION INHALERS
  // ===========================================================================
  {
    id: 'resp-ics-laba',
    name: 'ICS/LABA Combination',
    domain: 'medicine',
    category: 'respiratory-combinations',
    tags: ['ICS/LABA', 'advair', 'symbicort', 'combination', 'maintenance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="20" width="20" height="24" rx="4" fill="#9C27B0" opacity="0.3"/>
      <rect x="34" y="20" width="20" height="24" rx="4" fill="#4CAF50" opacity="0.3"/>
      <rect x="10" y="20" width="20" height="24" rx="4"/>
      <rect x="34" y="20" width="20" height="24" rx="4"/>
      <text x="13" y="36" font-size="5" fill="currentColor" stroke="none">ICS</text>
      <text x="35" y="36" font-size="4" fill="currentColor" stroke="none">LABA</text>
      <path d="M30 32h4"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Combination</text>
    </svg>`
  },
  {
    id: 'resp-triple-therapy',
    name: 'Triple Therapy (ICS/LABA/LAMA)',
    domain: 'medicine',
    category: 'respiratory-combinations',
    tags: ['triple therapy', 'trelegy', 'breztri', 'ICS/LABA/LAMA', 'COPD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="28" r="10" fill="#9C27B0" opacity="0.3"/>
      <circle cx="44" cy="28" r="10" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="44" r="10" fill="#FF9800" opacity="0.3"/>
      <circle cx="20" cy="28" r="10"/>
      <circle cx="44" cy="28" r="10"/>
      <circle cx="32" cy="44" r="10"/>
      <text x="14" y="32" font-size="4" fill="currentColor" stroke="none">ICS</text>
      <text x="36" y="32" font-size="4" fill="currentColor" stroke="none">LABA</text>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">LAMA</text>
    </svg>`
  },

  // ===========================================================================
  // LEUKOTRIENE MODIFIERS
  // ===========================================================================
  {
    id: 'resp-montelukast',
    name: 'Montelukast (Singulair)',
    domain: 'medicine',
    category: 'respiratory-leukotriene',
    tags: ['montelukast', 'singulair', 'leukotriene', 'LTRA', 'asthma', 'allergies'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#00BCD4" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">LT</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Montelukast</text>
    </svg>`
  },
  {
    id: 'resp-zafirlukast',
    name: 'Zafirlukast (Accolate)',
    domain: 'medicine',
    category: 'respiratory-leukotriene',
    tags: ['zafirlukast', 'accolate', 'leukotriene', 'LTRA', 'asthma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#009688" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">ZAF</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Zafirlukast</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIHISTAMINES
  // ===========================================================================
  {
    id: 'resp-antihistamine-mechanism',
    name: 'Antihistamine Mechanism',
    domain: 'medicine',
    category: 'respiratory-antihistamines',
    tags: ['antihistamine', 'H1', 'receptor', 'block', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#E91E63" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="3" stroke="#E91E63"/>
      <path d="M40 24l-16 16" stroke-width="3" stroke="#E91E63"/>
      <text x="26" y="58" font-size="5" fill="currentColor" stroke="none">H1</text>
    </svg>`
  },
  {
    id: 'resp-cetirizine',
    name: 'Cetirizine (Zyrtec)',
    domain: 'medicine',
    category: 'respiratory-antihistamines',
    tags: ['cetirizine', 'zyrtec', 'antihistamine', 'second generation', 'allergies'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#3F51B5" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">CTZ</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Zyrtec</text>
    </svg>`
  },
  {
    id: 'resp-loratadine',
    name: 'Loratadine (Claritin)',
    domain: 'medicine',
    category: 'respiratory-antihistamines',
    tags: ['loratadine', 'claritin', 'antihistamine', 'non-sedating', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#2196F3" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">LOR</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Claritin</text>
    </svg>`
  },
  {
    id: 'resp-fexofenadine',
    name: 'Fexofenadine (Allegra)',
    domain: 'medicine',
    category: 'respiratory-antihistamines',
    tags: ['fexofenadine', 'allegra', 'antihistamine', 'non-sedating', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#FF9800" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">FEX</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Allegra</text>
    </svg>`
  },
  {
    id: 'resp-diphenhydramine',
    name: 'Diphenhydramine (Benadryl)',
    domain: 'medicine',
    category: 'respiratory-antihistamines',
    tags: ['diphenhydramine', 'benadryl', 'antihistamine', 'first generation', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4" fill="#E91E63" opacity="0.3"/>
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">DPH</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Benadryl</text>
    </svg>`
  },

  // ===========================================================================
  // MUCOLYTICS
  // ===========================================================================
  {
    id: 'resp-guaifenesin',
    name: 'Guaifenesin',
    domain: 'medicine',
    category: 'respiratory-mucolytics',
    tags: ['guaifenesin', 'mucinex', 'expectorant', 'mucus', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 48c0-16 8-24 12-32 4 8 12 16 12 32z" fill="#4CAF50" opacity="0.3"/>
      <path d="M20 48c0-16 8-24 12-32 4 8 12 16 12 32z"/>
      <path d="M24 40c2-4 4-4 8 0s6 4 8 0"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Guaifenesin</text>
    </svg>`
  },
  {
    id: 'resp-acetylcysteine',
    name: 'N-Acetylcysteine',
    domain: 'medicine',
    category: 'respiratory-mucolytics',
    tags: ['NAC', 'acetylcysteine', 'mucomyst', 'mucolytic', 'CF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">NAC</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Mucomyst</text>
    </svg>`
  },
];

export default respiratoryDrugsIcons;
