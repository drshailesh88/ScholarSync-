/**
 * Antimicrobials Icon Library
 * Comprehensive SVG icons for antiviral, antifungal, and antiparasitic medications
 *
 * Categories:
 * - Antivirals (HIV, Hepatitis, Herpes, Influenza)
 * - Antifungals (Azoles, Echinocandins, Polyenes)
 * - Antiparasitics (Antimalarials, Anthelmintics)
 */

import type { IconDefinition } from './index';

export const antimicrobialsIcons: IconDefinition[] = [
  // ===========================================================================
  // ANTIVIRALS - HIV
  // ===========================================================================
  {
    id: 'antiviral-hiv-mechanism',
    name: 'HIV Drug Targets',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['HIV', 'antiretroviral', 'mechanism', 'lifecycle', 'ART'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#F44336" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="#F44336" opacity="0.3"/>
      <path d="M24 20l-8-8"/>
      <path d="M40 20l8-8"/>
      <path d="M24 44l-8 8"/>
      <path d="M40 44l8 8"/>
      <text x="28" y="36" font-size="5" fill="currentColor" stroke="none">RT</text>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">HIV Targets</text>
    </svg>`
  },
  {
    id: 'antiviral-tenofovir',
    name: 'Tenofovir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['tenofovir', 'TDF', 'TAF', 'NRTI', 'HIV', 'HBV', 'PrEP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">TDF</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Tenofovir</text>
    </svg>`
  },
  {
    id: 'antiviral-dolutegravir',
    name: 'Dolutegravir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['dolutegravir', 'DTG', 'INSTI', 'integrase', 'HIV', 'first-line'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">DTG</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Dolutegravir</text>
    </svg>`
  },
  {
    id: 'antiviral-bictegravir',
    name: 'Bictegravir (Biktarvy)',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['bictegravir', 'biktarvy', 'INSTI', 'single tablet', 'HIV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">BIC</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Biktarvy</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIVIRALS - HEPATITIS
  // ===========================================================================
  {
    id: 'antiviral-sofosbuvir',
    name: 'Sofosbuvir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['sofosbuvir', 'sovaldi', 'HCV', 'NS5B', 'hepatitis C'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">SOF</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Sofosbuvir</text>
    </svg>`
  },
  {
    id: 'antiviral-entecavir',
    name: 'Entecavir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['entecavir', 'baraclude', 'HBV', 'hepatitis B', 'nucleoside'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">ETV</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Entecavir</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIVIRALS - HERPES
  // ===========================================================================
  {
    id: 'antiviral-acyclovir',
    name: 'Acyclovir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['acyclovir', 'zovirax', 'HSV', 'VZV', 'herpes', 'shingles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#3F51B5" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">ACV</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Acyclovir</text>
    </svg>`
  },
  {
    id: 'antiviral-valacyclovir',
    name: 'Valacyclovir',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['valacyclovir', 'valtrex', 'HSV', 'prodrug', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#673AB7" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">VAL</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Valacyclovir</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIVIRALS - INFLUENZA
  // ===========================================================================
  {
    id: 'antiviral-oseltamivir',
    name: 'Oseltamivir (Tamiflu)',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['oseltamivir', 'tamiflu', 'influenza', 'neuraminidase', 'flu'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#00BCD4" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">OSE</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Tamiflu</text>
    </svg>`
  },
  {
    id: 'antiviral-baloxavir',
    name: 'Baloxavir (Xofluza)',
    domain: 'medicine',
    category: 'antimicrobials-antivirals',
    tags: ['baloxavir', 'xofluza', 'influenza', 'single dose', 'cap-dependent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#009688" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">BAL</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Xofluza</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIFUNGALS - AZOLES
  // ===========================================================================
  {
    id: 'antifungal-azole-mechanism',
    name: 'Azole Mechanism',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['azole', 'ergosterol', '14-alpha demethylase', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#795548" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 24l16 16" stroke-width="2"/>
      <path d="M40 24l-16 16" stroke-width="2"/>
      <path d="M32 16v32"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Ergosterol Block</text>
    </svg>`
  },
  {
    id: 'antifungal-fluconazole',
    name: 'Fluconazole',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['fluconazole', 'diflucan', 'azole', 'candida', 'yeast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">FLU</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Fluconazole</text>
    </svg>`
  },
  {
    id: 'antifungal-voriconazole',
    name: 'Voriconazole',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['voriconazole', 'vfend', 'azole', 'aspergillus', 'broad-spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#8D6E63" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">VOR</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Voriconazole</text>
    </svg>`
  },
  {
    id: 'antifungal-itraconazole',
    name: 'Itraconazole',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['itraconazole', 'sporanox', 'azole', 'histoplasma', 'onychomycosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#6D4C41" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">ITR</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Itraconazole</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIFUNGALS - ECHINOCANDINS
  // ===========================================================================
  {
    id: 'antifungal-caspofungin',
    name: 'Caspofungin',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['caspofungin', 'cancidas', 'echinocandin', 'candida', 'aspergillus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#4E342E" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">CAS</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Caspofungin</text>
    </svg>`
  },
  {
    id: 'antifungal-micafungin',
    name: 'Micafungin',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['micafungin', 'mycamine', 'echinocandin', 'candida', 'prophylaxis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#5D4037" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">MIC</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Micafungin</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIFUNGALS - POLYENES
  // ===========================================================================
  {
    id: 'antifungal-amphotericin',
    name: 'Amphotericin B',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['amphotericin', 'ambisome', 'polyene', 'broad-spectrum', 'nephrotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF5722" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">AMB</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Amphotericin B</text>
    </svg>`
  },
  {
    id: 'antifungal-nystatin',
    name: 'Nystatin',
    domain: 'medicine',
    category: 'antimicrobials-antifungals',
    tags: ['nystatin', 'mycostatin', 'topical', 'oral thrush', 'candida'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="#E64A19" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="18" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">NYS</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Nystatin</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIPARASITICS
  // ===========================================================================
  {
    id: 'antiparasitic-hydroxychloroquine',
    name: 'Hydroxychloroquine',
    domain: 'medicine',
    category: 'antimicrobials-antiparasitics',
    tags: ['hydroxychloroquine', 'plaquenil', 'antimalarial', 'lupus', 'RA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">HCQ</text>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Hydroxychloroquine</text>
    </svg>`
  },
  {
    id: 'antiparasitic-atovaquone',
    name: 'Atovaquone-Proguanil',
    domain: 'medicine',
    category: 'antimicrobials-antiparasitics',
    tags: ['atovaquone', 'malarone', 'malaria', 'prophylaxis', 'PCP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#8BC34A" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">ATO</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Malarone</text>
    </svg>`
  },
  {
    id: 'antiparasitic-ivermectin',
    name: 'Ivermectin',
    domain: 'medicine',
    category: 'antimicrobials-antiparasitics',
    tags: ['ivermectin', 'stromectol', 'anthelmintic', 'scabies', 'onchocerciasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">IVE</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Ivermectin</text>
    </svg>`
  },
  {
    id: 'antiparasitic-albendazole',
    name: 'Albendazole',
    domain: 'medicine',
    category: 'antimicrobials-antiparasitics',
    tags: ['albendazole', 'albenza', 'anthelmintic', 'tapeworm', 'roundworm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#FFC107" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">ALB</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Albendazole</text>
    </svg>`
  },
  {
    id: 'antiparasitic-metronidazole-gi',
    name: 'Metronidazole (Antiparasitic)',
    domain: 'medicine',
    category: 'antimicrobials-antiparasitics',
    tags: ['metronidazole', 'flagyl', 'giardia', 'amebiasis', 'trichomoniasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">MET</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Metronidazole</text>
    </svg>`
  },
];

export default antimicrobialsIcons;
