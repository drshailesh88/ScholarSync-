/**
 * Anticoagulants Icon Library
 * Comprehensive SVG icons for anticoagulant medication drug classes
 *
 * Categories:
 * - Heparins (UFH, LMWH)
 * - Vitamin K Antagonists (Warfarin)
 * - Direct Oral Anticoagulants (DOACs)
 * - Antiplatelets
 * - Thrombolytics
 * - Reversal Agents
 */

import type { IconDefinition } from './index';

export const anticoagulantsIcons: IconDefinition[] = [
  // ===========================================================================
  // COAGULATION CASCADE
  // ===========================================================================
  {
    id: 'anticoag-cascade',
    name: 'Coagulation Cascade',
    domain: 'medicine',
    category: 'anticoagulants-mechanism',
    tags: ['coagulation', 'cascade', 'clotting factors', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12h12l8 12-8 12h12l8 12-8 12" stroke-width="2"/>
      <circle cx="22" cy="12" r="4" fill="#F44336" opacity="0.5"/>
      <circle cx="28" cy="24" r="4" fill="#FF9800" opacity="0.5"/>
      <circle cx="40" cy="36" r="4" fill="#4CAF50" opacity="0.5"/>
      <circle cx="40" cy="48" r="4" fill="#2196F3" opacity="0.5"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Coagulation Cascade</text>
    </svg>`
  },

  // ===========================================================================
  // HEPARINS
  // ===========================================================================
  {
    id: 'anticoag-heparin-ufh',
    name: 'Unfractionated Heparin',
    domain: 'medicine',
    category: 'anticoagulants-heparins',
    tags: ['heparin', 'UFH', 'IV', 'antithrombin', 'PTT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c4-8 8-8 10 0s6 8 10 0 6-8 10 0 6 8 10 0" stroke-width="3" fill="none"/>
      <circle cx="22" cy="32" r="3" fill="#F44336"/>
      <circle cx="32" cy="32" r="3" fill="#F44336"/>
      <circle cx="42" cy="32" r="3" fill="#F44336"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Unfractionated Heparin</text>
    </svg>`
  },
  {
    id: 'anticoag-enoxaparin',
    name: 'Enoxaparin (Lovenox)',
    domain: 'medicine',
    category: 'anticoagulants-heparins',
    tags: ['enoxaparin', 'lovenox', 'LMWH', 'subcutaneous', 'anti-Xa'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4" fill="#E91E63" opacity="0.3"/>
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Lovenox</text>
    </svg>`
  },
  {
    id: 'anticoag-fondaparinux',
    name: 'Fondaparinux (Arixtra)',
    domain: 'medicine',
    category: 'anticoagulants-heparins',
    tags: ['fondaparinux', 'arixtra', 'factor Xa', 'synthetic', 'HIT safe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l18 12v16l-18 12-18-12V24z" fill="#9C27B0" opacity="0.3"/>
      <path d="M32 12l18 12v16l-18 12-18-12V24z"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">Xa</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Arixtra</text>
    </svg>`
  },

  // ===========================================================================
  // VITAMIN K ANTAGONISTS
  // ===========================================================================
  {
    id: 'anticoag-warfarin',
    name: 'Warfarin (Coumadin)',
    domain: 'medicine',
    category: 'anticoagulants-vka',
    tags: ['warfarin', 'coumadin', 'vitamin K antagonist', 'INR', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="24" y="28" font-size="6" fill="currentColor" stroke="none">Vit</text>
      <text x="28" y="40" font-size="8" fill="currentColor" stroke="none">K</text>
      <path d="M20 20l24 24" stroke="#F44336" stroke-width="3"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Coumadin</text>
    </svg>`
  },
  {
    id: 'anticoag-vitamin-k',
    name: 'Vitamin K (Reversal)',
    domain: 'medicine',
    category: 'anticoagulants-vka',
    tags: ['vitamin K', 'phytonadione', 'reversal', 'warfarin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#8BC34A" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="26" y="40" font-size="12" fill="currentColor" stroke="none">K</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Vitamin K</text>
    </svg>`
  },

  // ===========================================================================
  // DOACs
  // ===========================================================================
  {
    id: 'anticoag-doac-mechanism',
    name: 'DOAC Mechanism',
    domain: 'medicine',
    category: 'anticoagulants-doacs',
    tags: ['DOAC', 'direct', 'oral', 'mechanism', 'factor Xa', 'thrombin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="10" fill="#2196F3" opacity="0.3"/>
      <circle cx="40" cy="28" r="10" fill="#F44336" opacity="0.3"/>
      <circle cx="24" cy="28" r="10"/>
      <circle cx="40" cy="28" r="10"/>
      <text x="18" y="32" font-size="5" fill="currentColor" stroke="none">Xa</text>
      <text x="36" y="32" font-size="5" fill="currentColor" stroke="none">IIa</text>
      <path d="M24 38l-8 12"/>
      <path d="M40 38l8 12"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">DOACs</text>
    </svg>`
  },
  {
    id: 'anticoag-apixaban',
    name: 'Apixaban (Eliquis)',
    domain: 'medicine',
    category: 'anticoagulants-doacs',
    tags: ['apixaban', 'eliquis', 'DOAC', 'factor Xa', 'AFib', 'VTE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#2196F3" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">API</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Eliquis</text>
    </svg>`
  },
  {
    id: 'anticoag-rivaroxaban',
    name: 'Rivaroxaban (Xarelto)',
    domain: 'medicine',
    category: 'anticoagulants-doacs',
    tags: ['rivaroxaban', 'xarelto', 'DOAC', 'factor Xa', 'once daily'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF5722" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">RIV</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Xarelto</text>
    </svg>`
  },
  {
    id: 'anticoag-dabigatran',
    name: 'Dabigatran (Pradaxa)',
    domain: 'medicine',
    category: 'anticoagulants-doacs',
    tags: ['dabigatran', 'pradaxa', 'DOAC', 'thrombin inhibitor', 'AFib'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#E91E63" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">DAB</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Pradaxa</text>
    </svg>`
  },
  {
    id: 'anticoag-edoxaban',
    name: 'Edoxaban (Savaysa)',
    domain: 'medicine',
    category: 'anticoagulants-doacs',
    tags: ['edoxaban', 'savaysa', 'DOAC', 'factor Xa', 'once daily'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#9C27B0" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">EDO</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Savaysa</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIPLATELETS
  // ===========================================================================
  {
    id: 'anticoag-antiplatelet-mechanism',
    name: 'Antiplatelet Mechanism',
    domain: 'medicine',
    category: 'anticoagulants-antiplatelets',
    tags: ['antiplatelet', 'platelet', 'aggregation', 'mechanism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="8" fill="#FF9800" opacity="0.4"/>
      <circle cx="40" cy="28" r="8" fill="#FF9800" opacity="0.4"/>
      <circle cx="32" cy="40" r="8" fill="#FF9800" opacity="0.4"/>
      <circle cx="24" cy="28" r="8"/>
      <circle cx="40" cy="28" r="8"/>
      <circle cx="32" cy="40" r="8"/>
      <path d="M30 28h4" stroke="#F44336" stroke-width="2"/>
      <path d="M28 34l4 4" stroke="#F44336" stroke-width="2"/>
      <path d="M36 34l-4 4" stroke="#F44336" stroke-width="2"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Platelet Inhibition</text>
    </svg>`
  },
  {
    id: 'anticoag-aspirin',
    name: 'Aspirin (Antiplatelet)',
    domain: 'medicine',
    category: 'anticoagulants-antiplatelets',
    tags: ['aspirin', 'ASA', 'COX-1', 'antiplatelet', 'secondary prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#F44336" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">ASA</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Aspirin</text>
    </svg>`
  },
  {
    id: 'anticoag-clopidogrel',
    name: 'Clopidogrel (Plavix)',
    domain: 'medicine',
    category: 'anticoagulants-antiplatelets',
    tags: ['clopidogrel', 'plavix', 'P2Y12', 'antiplatelet', 'DAPT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#3F51B5" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">CLO</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Plavix</text>
    </svg>`
  },
  {
    id: 'anticoag-ticagrelor',
    name: 'Ticagrelor (Brilinta)',
    domain: 'medicine',
    category: 'anticoagulants-antiplatelets',
    tags: ['ticagrelor', 'brilinta', 'P2Y12', 'reversible', 'ACS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#FF9800" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">TIC</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Brilinta</text>
    </svg>`
  },
  {
    id: 'anticoag-prasugrel',
    name: 'Prasugrel (Effient)',
    domain: 'medicine',
    category: 'anticoagulants-antiplatelets',
    tags: ['prasugrel', 'effient', 'P2Y12', 'potent', 'PCI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l22 14v16l-22 14-22-14V24z" fill="#4CAF50" opacity="0.3"/>
      <path d="M32 10l22 14v16l-22 14-22-14V24z"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">PRA</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Effient</text>
    </svg>`
  },

  // ===========================================================================
  // THROMBOLYTICS
  // ===========================================================================
  {
    id: 'anticoag-tpa',
    name: 'Alteplase (tPA)',
    domain: 'medicine',
    category: 'anticoagulants-thrombolytics',
    tags: ['alteplase', 'tPA', 'thrombolytic', 'stroke', 'PE', 'STEMI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#F44336" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 32h16" stroke-width="3"/>
      <path d="M32 24v16" stroke-width="3"/>
      <path d="M24 24l16 16" stroke-width="2" stroke="#F44336"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">tPA</text>
    </svg>`
  },
  {
    id: 'anticoag-tenecteplase',
    name: 'Tenecteplase (TNK)',
    domain: 'medicine',
    category: 'anticoagulants-thrombolytics',
    tags: ['tenecteplase', 'TNK', 'thrombolytic', 'STEMI', 'bolus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#E91E63" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="4"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">TNK</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Tenecteplase</text>
    </svg>`
  },

  // ===========================================================================
  // REVERSAL AGENTS
  // ===========================================================================
  {
    id: 'anticoag-protamine',
    name: 'Protamine',
    domain: 'medicine',
    category: 'anticoagulants-reversal',
    tags: ['protamine', 'heparin reversal', 'antidote'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 32l6 6 10-12" stroke-width="3"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Protamine</text>
    </svg>`
  },
  {
    id: 'anticoag-idarucizumab',
    name: 'Idarucizumab (Praxbind)',
    domain: 'medicine',
    category: 'anticoagulants-reversal',
    tags: ['idarucizumab', 'praxbind', 'dabigatran reversal', 'antidote'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#2196F3" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="6"/>
      <path d="M22 32l8 8 12-16" stroke-width="2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Praxbind</text>
    </svg>`
  },
  {
    id: 'anticoag-andexanet',
    name: 'Andexanet Alfa (Andexxa)',
    domain: 'medicine',
    category: 'anticoagulants-reversal',
    tags: ['andexanet', 'andexxa', 'factor Xa reversal', 'antidote'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <path d="M24 32l6 6 10-12" stroke-width="2"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Andexxa</text>
    </svg>`
  },
  {
    id: 'anticoag-pcc',
    name: 'PCC (4-Factor)',
    domain: 'medicine',
    category: 'anticoagulants-reversal',
    tags: ['PCC', 'prothrombin complex', 'Kcentra', 'warfarin reversal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="22" cy="24" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="42" cy="24" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="22" cy="42" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="42" cy="42" r="8" fill="#673AB7" opacity="0.3"/>
      <circle cx="22" cy="24" r="8"/>
      <circle cx="42" cy="24" r="8"/>
      <circle cx="22" cy="42" r="8"/>
      <circle cx="42" cy="42" r="8"/>
      <text x="24" y="60" font-size="4" fill="currentColor" stroke="none">4-PCC</text>
    </svg>`
  },
];

export default anticoagulantsIcons;
