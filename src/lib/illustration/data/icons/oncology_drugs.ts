/**
 * Oncology Drugs Icon Library
 * Comprehensive SVG icons for chemotherapy and cancer medication drug classes
 *
 * Categories:
 * - Alkylating Agents
 * - Antimetabolites
 * - Targeted Therapy
 * - Immunotherapy
 * - Hormonal Therapy
 * - Supportive Care
 */

import type { IconDefinition } from './index';

export const oncologyDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // ALKYLATING AGENTS
  // ===========================================================================
  {
    id: 'onc-alkylating-mechanism',
    name: 'Alkylating Agent Mechanism',
    domain: 'medicine',
    category: 'oncology-alkylating',
    tags: ['alkylating', 'DNA crosslink', 'mechanism', 'cell cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0 8 8 8 8 16s-8 8-8 16" stroke-width="2"/>
      <path d="M48 16c0 8-8 8-8 16s8 8 8 16" stroke-width="2"/>
      <path d="M24 24l16 0" stroke="#F44336" stroke-width="2"/>
      <path d="M24 40l16 0" stroke="#F44336" stroke-width="2"/>
      <circle cx="20" cy="24" r="3" fill="#2196F3"/>
      <circle cx="44" cy="24" r="3" fill="#2196F3"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">DNA Crosslinking</text>
    </svg>`
  },
  {
    id: 'onc-cyclophosphamide',
    name: 'Cyclophosphamide',
    domain: 'medicine',
    category: 'oncology-alkylating',
    tags: ['cyclophosphamide', 'cytoxan', 'alkylating', 'lymphoma', 'breast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">CYC</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Cyclophosphamide</text>
    </svg>`
  },
  {
    id: 'onc-cisplatin',
    name: 'Cisplatin',
    domain: 'medicine',
    category: 'oncology-alkylating',
    tags: ['cisplatin', 'platinum', 'testicular', 'lung', 'nephrotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#607D8B" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">Pt</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Cisplatin</text>
    </svg>`
  },
  {
    id: 'onc-carboplatin',
    name: 'Carboplatin',
    domain: 'medicine',
    category: 'oncology-alkylating',
    tags: ['carboplatin', 'paraplatin', 'platinum', 'ovarian', 'less nephrotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#78909C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">CAR</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Carboplatin</text>
    </svg>`
  },
  {
    id: 'onc-temozolomide',
    name: 'Temozolomide',
    domain: 'medicine',
    category: 'oncology-alkylating',
    tags: ['temozolomide', 'temodar', 'GBM', 'brain tumor', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#673AB7" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">TMZ</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Temozolomide</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIMETABOLITES
  // ===========================================================================
  {
    id: 'onc-antimetabolite-mechanism',
    name: 'Antimetabolite Mechanism',
    domain: 'medicine',
    category: 'oncology-antimetabolites',
    tags: ['antimetabolite', 'DNA synthesis', 'S phase', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="8" fill="#4CAF50" opacity="0.3"/>
      <circle cx="40" cy="24" r="8" fill="#F44336" opacity="0.3"/>
      <circle cx="24" cy="24" r="8"/>
      <circle cx="40" cy="24" r="8"/>
      <path d="M24 32l-4 16"/>
      <path d="M40 32l4 16"/>
      <text x="20" y="28" font-size="4" fill="currentColor" stroke="none">N</text>
      <text x="36" y="28" font-size="4" fill="currentColor" stroke="none">F</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Base Substitution</text>
    </svg>`
  },
  {
    id: 'onc-methotrexate',
    name: 'Methotrexate',
    domain: 'medicine',
    category: 'oncology-antimetabolites',
    tags: ['methotrexate', 'MTX', 'folate antagonist', 'ALL', 'RA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">MTX</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Methotrexate</text>
    </svg>`
  },
  {
    id: 'onc-5fu',
    name: '5-Fluorouracil (5-FU)',
    domain: 'medicine',
    category: 'oncology-antimetabolites',
    tags: ['5-FU', 'fluorouracil', 'colorectal', 'breast', 'pyrimidine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#E91E63" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">5-FU</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">5-FU</text>
    </svg>`
  },
  {
    id: 'onc-gemcitabine',
    name: 'Gemcitabine',
    domain: 'medicine',
    category: 'oncology-antimetabolites',
    tags: ['gemcitabine', 'gemzar', 'pancreatic', 'lung', 'nucleoside'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#00BCD4" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">GEM</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Gemcitabine</text>
    </svg>`
  },
  {
    id: 'onc-cytarabine',
    name: 'Cytarabine (Ara-C)',
    domain: 'medicine',
    category: 'oncology-antimetabolites',
    tags: ['cytarabine', 'ara-C', 'AML', 'leukemia', 'high-dose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#3F51B5" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">ARA</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Cytarabine</text>
    </svg>`
  },

  // ===========================================================================
  // TARGETED THERAPY
  // ===========================================================================
  {
    id: 'onc-targeted-mechanism',
    name: 'Targeted Therapy Mechanism',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['targeted', 'TKI', 'kinase', 'specific', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#2196F3" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="#F44336" opacity="0.4"/>
      <circle cx="32" cy="32" r="2" fill="#F44336"/>
      <path d="M18 18l28 28" stroke-dasharray="4 2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Targeted Inhibition</text>
    </svg>`
  },
  {
    id: 'onc-imatinib',
    name: 'Imatinib (Gleevec)',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['imatinib', 'gleevec', 'TKI', 'CML', 'BCR-ABL', 'GIST'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF5722" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">IMA</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Gleevec</text>
    </svg>`
  },
  {
    id: 'onc-osimertinib',
    name: 'Osimertinib (Tagrisso)',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['osimertinib', 'tagrisso', 'EGFR', 'T790M', 'NSCLC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">OSI</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Tagrisso</text>
    </svg>`
  },
  {
    id: 'onc-trastuzumab',
    name: 'Trastuzumab (Herceptin)',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['trastuzumab', 'herceptin', 'HER2', 'breast', 'monoclonal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20l12 24 12-24" fill="#E91E63" opacity="0.3"/>
      <path d="M20 20l12 24 12-24"/>
      <path d="M16 20h32"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Herceptin</text>
    </svg>`
  },
  {
    id: 'onc-bevacizumab',
    name: 'Bevacizumab (Avastin)',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['bevacizumab', 'avastin', 'VEGF', 'anti-angiogenesis', 'colorectal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#F44336" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <path d="M22 28c4 8 12 8 20 0"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Avastin</text>
    </svg>`
  },
  {
    id: 'onc-rituximab',
    name: 'Rituximab (Rituxan)',
    domain: 'medicine',
    category: 'oncology-targeted',
    tags: ['rituximab', 'rituxan', 'CD20', 'lymphoma', 'B-cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#2196F3" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">RIT</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Rituxan</text>
    </svg>`
  },

  // ===========================================================================
  // IMMUNOTHERAPY
  // ===========================================================================
  {
    id: 'onc-checkpoint-mechanism',
    name: 'Checkpoint Inhibitor Mechanism',
    domain: 'medicine',
    category: 'oncology-immunotherapy',
    tags: ['checkpoint', 'PD-1', 'CTLA-4', 'immunotherapy', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="10" fill="#4CAF50" opacity="0.3"/>
      <circle cx="40" cy="28" r="10" fill="#F44336" opacity="0.3"/>
      <circle cx="24" cy="28" r="10"/>
      <circle cx="40" cy="28" r="10"/>
      <path d="M34 28h-8" stroke="#2196F3" stroke-width="3"/>
      <text x="20" y="32" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="35" y="32" font-size="4" fill="currentColor" stroke="none">Tu</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Checkpoint Release</text>
    </svg>`
  },
  {
    id: 'onc-pembrolizumab',
    name: 'Pembrolizumab (Keytruda)',
    domain: 'medicine',
    category: 'oncology-immunotherapy',
    tags: ['pembrolizumab', 'keytruda', 'PD-1', 'melanoma', 'NSCLC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">PEM</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Keytruda</text>
    </svg>`
  },
  {
    id: 'onc-nivolumab',
    name: 'Nivolumab (Opdivo)',
    domain: 'medicine',
    category: 'oncology-immunotherapy',
    tags: ['nivolumab', 'opdivo', 'PD-1', 'melanoma', 'lung'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#673AB7" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">NIV</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Opdivo</text>
    </svg>`
  },
  {
    id: 'onc-ipilimumab',
    name: 'Ipilimumab (Yervoy)',
    domain: 'medicine',
    category: 'oncology-immunotherapy',
    tags: ['ipilimumab', 'yervoy', 'CTLA-4', 'melanoma', 'combination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#795548" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="24" y="38" font-size="5" fill="currentColor" stroke="none">IPI</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Yervoy</text>
    </svg>`
  },

  // ===========================================================================
  // SUPPORTIVE CARE
  // ===========================================================================
  {
    id: 'onc-granulocyte',
    name: 'G-CSF (Neupogen/Neulasta)',
    domain: 'medicine',
    category: 'oncology-supportive',
    tags: ['G-CSF', 'filgrastim', 'neupogen', 'neulasta', 'neutropenia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="6" fill="#4CAF50" opacity="0.4"/>
      <circle cx="40" cy="28" r="6" fill="#4CAF50" opacity="0.4"/>
      <circle cx="32" cy="40" r="6" fill="#4CAF50" opacity="0.4"/>
      <circle cx="24" cy="28" r="6"/>
      <circle cx="40" cy="28" r="6"/>
      <circle cx="32" cy="40" r="6"/>
      <path d="M24 34l8 6"/>
      <path d="M40 34l-8 6"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">G-CSF</text>
    </svg>`
  },
  {
    id: 'onc-antiemetic-5ht3',
    name: 'Antiemetic (5-HT3)',
    domain: 'medicine',
    category: 'oncology-supportive',
    tags: ['antiemetic', 'ondansetron', 'granisetron', 'CINV', '5-HT3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#00BCD4" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M26 38c4-8 8-8 12 0"/>
      <circle cx="26" cy="28" r="2" fill="currentColor"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Antiemetic</text>
    </svg>`
  },
];

export default oncologyDrugsIcons;
