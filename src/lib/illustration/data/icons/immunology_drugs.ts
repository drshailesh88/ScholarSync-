/**
 * Immunology Drugs Icon Library
 * Comprehensive SVG icons for immunology medication drug classes
 *
 * Categories:
 * - Immunosuppressants
 * - Biologics (TNF inhibitors, IL inhibitors)
 * - Vaccines
 * - Antiallergics
 * - Immunomodulators
 */

import type { IconDefinition } from './index';

export const immunologyDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // IMMUNOSUPPRESSANTS
  // ===========================================================================
  {
    id: 'immuno-mechanism',
    name: 'Immunosuppression Mechanism',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['immunosuppression', 'T cell', 'mechanism', 'transplant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#F44336" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="3" stroke="#F44336"/>
      <path d="M40 24l-16 16" stroke-width="3" stroke="#F44336"/>
      <circle cx="24" cy="20" r="4" fill="#2196F3"/>
      <circle cx="40" cy="20" r="4" fill="#2196F3"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">T Cell Suppression</text>
    </svg>`
  },
  {
    id: 'immuno-tacrolimus',
    name: 'Tacrolimus (Prograf)',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['tacrolimus', 'prograf', 'calcineurin inhibitor', 'transplant', 'FK506'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">TAC</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Prograf</text>
    </svg>`
  },
  {
    id: 'immuno-cyclosporine',
    name: 'Cyclosporine (Sandimmune)',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['cyclosporine', 'sandimmune', 'calcineurin inhibitor', 'transplant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z" fill="#9C27B0" opacity="0.3"/>
      <path d="M32 12c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20z"/>
      <circle cx="32" cy="32" r="8"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Cyclosporine</text>
    </svg>`
  },
  {
    id: 'immuno-mycophenolate',
    name: 'Mycophenolate (Cellcept)',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['mycophenolate', 'cellcept', 'MMF', 'transplant', 'antiproliferative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="6" fill="#3F51B5" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="6"/>
      <text x="18" y="38" font-size="5" fill="currentColor" stroke="none">MMF</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Cellcept</text>
    </svg>`
  },
  {
    id: 'immuno-azathioprine',
    name: 'Azathioprine (Imuran)',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['azathioprine', 'imuran', 'antimetabolite', 'transplant', 'autoimmune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#FF9800" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">AZA</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Imuran</text>
    </svg>`
  },
  {
    id: 'immuno-sirolimus',
    name: 'Sirolimus (Rapamune)',
    domain: 'medicine',
    category: 'immunology-immunosuppressants',
    tags: ['sirolimus', 'rapamune', 'mTOR inhibitor', 'transplant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l22 14v16l-22 14-22-14V24z" fill="#00BCD4" opacity="0.3"/>
      <path d="M32 10l22 14v16l-22 14-22-14V24z"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">SIR</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Rapamune</text>
    </svg>`
  },

  // ===========================================================================
  // BIOLOGICS - TNF INHIBITORS
  // ===========================================================================
  {
    id: 'immuno-tnf-mechanism',
    name: 'TNF Inhibitor Mechanism',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['TNF', 'inhibitor', 'mechanism', 'biologic', 'anti-TNF'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="12" fill="#F44336" opacity="0.3"/>
      <circle cx="40" cy="32" r="12" fill="#4CAF50" opacity="0.3"/>
      <circle cx="24" cy="32" r="12"/>
      <circle cx="40" cy="32" r="12"/>
      <path d="M30 32h4"/>
      <text x="18" y="36" font-size="4" fill="currentColor" stroke="none">TNF</text>
      <text x="35" y="36" font-size="4" fill="currentColor" stroke="none">Ab</text>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">TNF Neutralization</text>
    </svg>`
  },
  {
    id: 'immuno-adalimumab',
    name: 'Adalimumab (Humira)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['adalimumab', 'humira', 'TNF inhibitor', 'RA', 'Crohns', 'psoriasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20l12 24 12-24" fill="#673AB7" opacity="0.3"/>
      <path d="M20 20l12 24 12-24"/>
      <path d="M16 20h32"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Humira</text>
    </svg>`
  },
  {
    id: 'immuno-infliximab',
    name: 'Infliximab (Remicade)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['infliximab', 'remicade', 'TNF inhibitor', 'IV', 'Crohns', 'UC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#2196F3" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="4"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">IFX</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Remicade</text>
    </svg>`
  },
  {
    id: 'immuno-etanercept',
    name: 'Etanercept (Enbrel)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['etanercept', 'enbrel', 'TNF receptor', 'RA', 'psoriasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <text x="20" y="38" font-size="6" fill="currentColor" stroke="none">ETN</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Enbrel</text>
    </svg>`
  },

  // ===========================================================================
  // BIOLOGICS - IL INHIBITORS
  // ===========================================================================
  {
    id: 'immuno-ustekinumab',
    name: 'Ustekinumab (Stelara)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['ustekinumab', 'stelara', 'IL-12/23', 'psoriasis', 'Crohns'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="#E91E63" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">UST</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Stelara</text>
    </svg>`
  },
  {
    id: 'immuno-secukinumab',
    name: 'Secukinumab (Cosentyx)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['secukinumab', 'cosentyx', 'IL-17', 'psoriasis', 'AS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12l20 12v16l-20 12-20-12V24z" fill="#FF5722" opacity="0.3"/>
      <path d="M32 12l20 12v16l-20 12-20-12V24z"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">SEC</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Cosentyx</text>
    </svg>`
  },
  {
    id: 'immuno-tocilizumab',
    name: 'Tocilizumab (Actemra)',
    domain: 'medicine',
    category: 'immunology-biologics',
    tags: ['tocilizumab', 'actemra', 'IL-6', 'RA', 'GCA', 'CRS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#9C27B0" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="8"/>
      <text x="20" y="38" font-size="5" fill="currentColor" stroke="none">TCZ</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Actemra</text>
    </svg>`
  },

  // ===========================================================================
  // VACCINES
  // ===========================================================================
  {
    id: 'immuno-vaccine-mechanism',
    name: 'Vaccine Mechanism',
    domain: 'medicine',
    category: 'immunology-vaccines',
    tags: ['vaccine', 'immunization', 'antibody', 'mechanism', 'immunity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40l16-28 16 28z" fill="#4CAF50" opacity="0.2"/>
      <path d="M16 40l16-28 16 28z"/>
      <circle cx="32" cy="28" r="6" fill="#4CAF50" opacity="0.5"/>
      <path d="M20 44l24 0"/>
      <path d="M24 48l16 0"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Immunization</text>
    </svg>`
  },
  {
    id: 'immuno-mrna-vaccine',
    name: 'mRNA Vaccine',
    domain: 'medicine',
    category: 'immunology-vaccines',
    tags: ['mRNA', 'vaccine', 'COVID', 'Pfizer', 'Moderna'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c4-8 8-8 8 0s4 8 8 0 4-8 8 0 4 8 8 0" stroke-width="3" fill="none"/>
      <circle cx="20" cy="32" r="3" fill="#2196F3"/>
      <circle cx="32" cy="32" r="3" fill="#2196F3"/>
      <circle cx="44" cy="32" r="3" fill="#2196F3"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">mRNA Vaccine</text>
    </svg>`
  },
  {
    id: 'immuno-live-vaccine',
    name: 'Live Attenuated Vaccine',
    domain: 'medicine',
    category: 'immunology-vaccines',
    tags: ['live vaccine', 'MMR', 'varicella', 'attenuated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#FF9800" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="#FF9800" opacity="0.5"/>
      <path d="M26 28l6 4-6 4"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Live Attenuated</text>
    </svg>`
  },
  {
    id: 'immuno-inactivated-vaccine',
    name: 'Inactivated Vaccine',
    domain: 'medicine',
    category: 'immunology-vaccines',
    tags: ['inactivated', 'vaccine', 'flu', 'hepatitis', 'killed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#607D8B" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="2"/>
      <path d="M40 24l-16 16" stroke-width="2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Inactivated</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIALLERGICS
  // ===========================================================================
  {
    id: 'immuno-epinephrine',
    name: 'Epinephrine (EpiPen)',
    domain: 'medicine',
    category: 'immunology-antiallergics',
    tags: ['epinephrine', 'epipen', 'anaphylaxis', 'allergy', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="4" fill="#F44336" opacity="0.3"/>
      <rect x="24" y="8" width="16" height="48" rx="4"/>
      <path d="M28 20h8"/>
      <path d="M28 28h8"/>
      <circle cx="32" cy="40" r="6" fill="#F44336" opacity="0.5"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">EpiPen</text>
    </svg>`
  },
  {
    id: 'immuno-cromolyn',
    name: 'Cromolyn Sodium',
    domain: 'medicine',
    category: 'immunology-antiallergics',
    tags: ['cromolyn', 'mast cell stabilizer', 'allergies', 'prophylaxis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 16v-8"/>
      <path d="M32 56v-8"/>
      <path d="M16 32h-8"/>
      <path d="M56 32h-8"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Cromolyn</text>
    </svg>`
  },
  {
    id: 'immuno-omalizumab',
    name: 'Omalizumab (Xolair)',
    domain: 'medicine',
    category: 'immunology-antiallergics',
    tags: ['omalizumab', 'xolair', 'anti-IgE', 'asthma', 'urticaria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20l12 24 12-24" fill="#00BCD4" opacity="0.3"/>
      <path d="M20 20l12 24 12-24"/>
      <path d="M16 20h32"/>
      <circle cx="32" cy="32" r="6" fill="#00BCD4" opacity="0.5"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Xolair</text>
    </svg>`
  },
];

export default immunologyDrugsIcons;
