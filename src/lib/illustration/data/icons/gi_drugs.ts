/**
 * GI Drugs Icon Library
 * Comprehensive SVG icons for gastrointestinal medication drug classes
 *
 * Categories:
 * - Proton Pump Inhibitors (PPIs)
 * - H2 Receptor Blockers
 * - Antiemetics
 * - Laxatives
 * - Antidiarrheals
 * - Antispasmodics
 */

import type { IconDefinition } from './index';

export const giDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // PROTON PUMP INHIBITORS
  // ===========================================================================
  {
    id: 'gi-ppi-mechanism',
    name: 'PPI Mechanism',
    domain: 'medicine',
    category: 'gi-ppi',
    tags: ['PPI', 'proton pump', 'acid suppression', 'mechanism', 'H+K+ATPase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="#9C27B0" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <circle cx="26" cy="32" r="6" fill="#FF9800" opacity="0.5"/>
      <path d="M32 32l8 0" stroke-width="2"/>
      <path d="M40 26l0 12" stroke-width="2"/>
      <path d="M40 32l6 -6"/>
      <text x="22" y="35" font-size="4" fill="currentColor" stroke="none">H+</text>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Proton Pump Block</text>
    </svg>`
  },
  {
    id: 'gi-omeprazole',
    name: 'Omeprazole (Prilosec)',
    domain: 'medicine',
    category: 'gi-ppi',
    tags: ['omeprazole', 'prilosec', 'PPI', 'GERD', 'ulcer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">OME</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Prilosec</text>
    </svg>`
  },
  {
    id: 'gi-pantoprazole',
    name: 'Pantoprazole (Protonix)',
    domain: 'medicine',
    category: 'gi-ppi',
    tags: ['pantoprazole', 'protonix', 'PPI', 'IV', 'GERD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#673AB7" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">PAN</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Protonix</text>
    </svg>`
  },
  {
    id: 'gi-esomeprazole',
    name: 'Esomeprazole (Nexium)',
    domain: 'medicine',
    category: 'gi-ppi',
    tags: ['esomeprazole', 'nexium', 'PPI', 'erosive esophagitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#E91E63" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">ESO</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Nexium</text>
    </svg>`
  },
  {
    id: 'gi-lansoprazole',
    name: 'Lansoprazole (Prevacid)',
    domain: 'medicine',
    category: 'gi-ppi',
    tags: ['lansoprazole', 'prevacid', 'PPI', 'H pylori'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#3F51B5" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">LAN</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Prevacid</text>
    </svg>`
  },

  // ===========================================================================
  // H2 RECEPTOR BLOCKERS
  // ===========================================================================
  {
    id: 'gi-h2-mechanism',
    name: 'H2 Blocker Mechanism',
    domain: 'medicine',
    category: 'gi-h2blockers',
    tags: ['H2', 'receptor', 'histamine', 'acid', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="2"/>
      <path d="M40 24l-16 16" stroke-width="2"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">H2</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">H2 Receptor Block</text>
    </svg>`
  },
  {
    id: 'gi-famotidine',
    name: 'Famotidine (Pepcid)',
    domain: 'medicine',
    category: 'gi-h2blockers',
    tags: ['famotidine', 'pepcid', 'H2 blocker', 'heartburn', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#2196F3" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">FAM</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Pepcid</text>
    </svg>`
  },
  {
    id: 'gi-ranitidine',
    name: 'Ranitidine (Zantac)',
    domain: 'medicine',
    category: 'gi-h2blockers',
    tags: ['ranitidine', 'zantac', 'H2 blocker', 'withdrawn'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#607D8B" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">RAN</text>
      <path d="M20 20l24 24" stroke="#F44336" stroke-width="2"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Zantac</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIEMETICS
  // ===========================================================================
  {
    id: 'gi-ondansetron',
    name: 'Ondansetron (Zofran)',
    domain: 'medicine',
    category: 'gi-antiemetics',
    tags: ['ondansetron', 'zofran', '5HT3', 'antiemetic', 'PONV', 'chemo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M26 38c3-8 9-8 12 0"/>
      <circle cx="26" cy="28" r="2" fill="currentColor"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Zofran</text>
    </svg>`
  },
  {
    id: 'gi-metoclopramide',
    name: 'Metoclopramide (Reglan)',
    domain: 'medicine',
    category: 'gi-antiemetics',
    tags: ['metoclopramide', 'reglan', 'prokinetic', 'antiemetic', 'gastroparesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#FF9800" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M22 32h10l4-8 4 16 4-8h6"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Reglan</text>
    </svg>`
  },
  {
    id: 'gi-promethazine',
    name: 'Promethazine (Phenergan)',
    domain: 'medicine',
    category: 'gi-antiemetics',
    tags: ['promethazine', 'phenergan', 'antiemetic', 'antihistamine', 'sedating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="6" fill="#9C27B0" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="6"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PRO</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Phenergan</text>
    </svg>`
  },
  {
    id: 'gi-prochlorperazine',
    name: 'Prochlorperazine (Compazine)',
    domain: 'medicine',
    category: 'gi-antiemetics',
    tags: ['prochlorperazine', 'compazine', 'antiemetic', 'phenothiazine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#3F51B5" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PCZ</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Compazine</text>
    </svg>`
  },
  {
    id: 'gi-scopolamine',
    name: 'Scopolamine',
    domain: 'medicine',
    category: 'gi-antiemetics',
    tags: ['scopolamine', 'transderm', 'motion sickness', 'patch', 'anticholinergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="#795548" opacity="0.5"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Scopolamine</text>
    </svg>`
  },

  // ===========================================================================
  // LAXATIVES
  // ===========================================================================
  {
    id: 'gi-polyethylene-glycol',
    name: 'Polyethylene Glycol (Miralax)',
    domain: 'medicine',
    category: 'gi-laxatives',
    tags: ['PEG', 'miralax', 'osmotic', 'laxative', 'constipation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 52v-20c0-8 6-16 12-16s12 8 12 16v20" fill="#00BCD4" opacity="0.3"/>
      <path d="M20 52v-20c0-8 6-16 12-16s12 8 12 16v20"/>
      <path d="M16 52h32"/>
      <circle cx="28" cy="36" r="2" fill="#00BCD4"/>
      <circle cx="36" cy="40" r="2" fill="#00BCD4"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Miralax</text>
    </svg>`
  },
  {
    id: 'gi-docusate',
    name: 'Docusate (Colace)',
    domain: 'medicine',
    category: 'gi-laxatives',
    tags: ['docusate', 'colace', 'stool softener', 'surfactant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="#FF9800" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="18" ry="14"/>
      <text x="18" y="36" font-size="6" fill="currentColor" stroke="none">DOC</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Colace</text>
    </svg>`
  },
  {
    id: 'gi-bisacodyl',
    name: 'Bisacodyl (Dulcolax)',
    domain: 'medicine',
    category: 'gi-laxatives',
    tags: ['bisacodyl', 'dulcolax', 'stimulant', 'laxative', 'bowel prep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="18" width="32" height="28" rx="4" fill="#E91E63" opacity="0.3"/>
      <rect x="16" y="18" width="32" height="28" rx="4"/>
      <path d="M24 32h16" stroke-width="2"/>
      <path d="M36 26l6 6-6 6"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Dulcolax</text>
    </svg>`
  },
  {
    id: 'gi-lactulose',
    name: 'Lactulose',
    domain: 'medicine',
    category: 'gi-laxatives',
    tags: ['lactulose', 'osmotic', 'hepatic encephalopathy', 'ammonia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FFC107" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">LAC</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Lactulose</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIDIARRHEALS
  // ===========================================================================
  {
    id: 'gi-loperamide',
    name: 'Loperamide (Imodium)',
    domain: 'medicine',
    category: 'gi-antidiarrheals',
    tags: ['loperamide', 'imodium', 'antidiarrheal', 'opioid', 'OTC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <path d="M22 32h20"/>
      <path d="M26 28l-4 4 4 4"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Imodium</text>
    </svg>`
  },
  {
    id: 'gi-bismuth',
    name: 'Bismuth Subsalicylate',
    domain: 'medicine',
    category: 'gi-antidiarrheals',
    tags: ['bismuth', 'pepto bismol', 'antidiarrheal', 'H pylori'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 48l10-32 10 32z" fill="#E91E63" opacity="0.3"/>
      <path d="M22 48l10-32 10 32z"/>
      <text x="28" y="42" font-size="5" fill="currentColor" stroke="none">Bi</text>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Pepto Bismol</text>
    </svg>`
  },

  // ===========================================================================
  // ANTISPASMODICS
  // ===========================================================================
  {
    id: 'gi-dicyclomine',
    name: 'Dicyclomine (Bentyl)',
    domain: 'medicine',
    category: 'gi-antispasmodics',
    tags: ['dicyclomine', 'bentyl', 'antispasmodic', 'IBS', 'anticholinergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c8-16 16-16 16 0s8 16 16 0" fill="none" stroke-width="3"/>
      <circle cx="32" cy="32" r="14" fill="#673AB7" opacity="0.2"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Bentyl</text>
    </svg>`
  },
  {
    id: 'gi-hyoscyamine',
    name: 'Hyoscyamine (Levsin)',
    domain: 'medicine',
    category: 'gi-antispasmodics',
    tags: ['hyoscyamine', 'levsin', 'antispasmodic', 'IBS', 'anticholinergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">HYO</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Levsin</text>
    </svg>`
  },
];

export default giDrugsIcons;
