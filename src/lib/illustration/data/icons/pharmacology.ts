/**
 * Pharmacology Icon Library
 * Comprehensive SVG icons for pharmacology and drug science
 *
 * Categories:
 * - Drug Classes (antibiotics, antivirals, antihypertensives, analgesics, etc.)
 * - Drug Delivery (pills, capsules, injections, IV, patches, inhalers)
 * - Receptor Pharmacology (agonists, antagonists, receptors)
 * - Pharmacokinetics (absorption, distribution, metabolism, excretion - ADME)
 * - Drug Interactions
 * - Dose-Response Curves
 * - Therapeutic Drug Monitoring
 * - Adverse Drug Reactions
 * - Specific Drug Categories (cardiovascular, CNS, antimicrobial, etc.)
 *
 * Total: 95 icons
 */

import type { IconDefinition } from './index';

export const pharmacologyIcons: IconDefinition[] = [
  // ===========================================================================
  // DRUG DELIVERY FORMS
  // ===========================================================================
  {
    id: 'pharma-pill-tablet',
    name: 'Tablet/Pill',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['tablet', 'pill', 'oral', 'medication', 'solid dosage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="12"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" transform="rotate(90 32 32)"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'pharma-capsule',
    name: 'Capsule',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['capsule', 'gelatin', 'oral', 'medication', 'encapsulated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-8.8 7.2-16 16-16h0c8.8 0 16 7.2 16 16v0c0 8.8-7.2 16-16 16h0c-8.8 0-16-7.2-16-16z"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <path d="M16 32c0-8.8 7.2-16 16-16v32c-8.8 0-16-7.2-16-16z" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'pharma-syringe',
    name: 'Syringe Injection',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['syringe', 'injection', 'parenteral', 'IM', 'SC', 'IV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52l8-8"/>
      <rect x="18" y="18" width="28" height="12" rx="2" transform="rotate(-45 32 24)"/>
      <path d="M36 8l12 12"/>
      <path d="M48 8l8 8"/>
      <path d="M52 4l8 8"/>
      <line x1="26" y1="30" x2="38" y2="18"/>
      <path d="M8 56l4-4"/>
    </svg>`
  },
  {
    id: 'pharma-iv-bag',
    name: 'IV Infusion Bag',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['IV', 'infusion', 'intravenous', 'drip', 'parenteral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c2 0 4 2 4 4v32c0 4-4 8-8 8H24c-4 0-8-4-8-8V12c0-2 2-4 4-4z"/>
      <circle cx="32" cy="4" r="2"/>
      <line x1="32" y1="6" x2="32" y2="8"/>
      <line x1="32" y1="52" x2="32" y2="60"/>
      <path d="M28 60l4 4 4-4"/>
      <line x1="20" y1="16" x2="44" y2="16"/>
      <path d="M24 24h16c0 8-4 12-8 12s-8-4-8-12z" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'pharma-transdermal-patch',
    name: 'Transdermal Patch',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['patch', 'transdermal', 'topical', 'skin', 'controlled release'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <rect x="20" y="24" width="24" height="16" rx="2"/>
      <path d="M24 28h16"/>
      <path d="M24 32h16"/>
      <path d="M24 36h16"/>
      <path d="M8 48c0-4 4-8 8-8"/>
      <path d="M56 48c0-4-4-8-8-8"/>
    </svg>`
  },
  {
    id: 'pharma-inhaler',
    name: 'Metered Dose Inhaler',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['inhaler', 'MDI', 'respiratory', 'aerosol', 'pulmonary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16h16v32c0 4-4 8-8 8s-8-4-8-8V16z"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <path d="M28 48h8"/>
      <path d="M30 24c-2 4-2 8 0 12"/>
      <path d="M34 24c2 4 2 8 0 12"/>
      <circle cx="32" cy="4" r="2"/>
    </svg>`
  },
  {
    id: 'pharma-nebulizer',
    name: 'Nebulizer',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['nebulizer', 'respiratory', 'aerosol', 'pulmonary', 'mist'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="32" width="24" height="24" rx="4"/>
      <path d="M32 32v-8"/>
      <path d="M28 24h8"/>
      <ellipse cx="32" cy="20" rx="4" ry="4"/>
      <path d="M28 8c-2-4-4-4-8 0"/>
      <path d="M32 8c0-4 1-6 4-6"/>
      <path d="M36 8c2-4 4-4 8 0"/>
      <path d="M44 44h8"/>
      <path d="M12 44h8"/>
    </svg>`
  },
  {
    id: 'pharma-suppository',
    name: 'Suppository',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['suppository', 'rectal', 'vaginal', 'local', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-12 20-12 32 0 8 5 16 12 16s12-8 12-16c0-12-4-24-12-32z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-8 8-12 20-12 32 0 8 5 16 12 16s12-8 12-16c0-12-4-24-12-32z"/>
      <path d="M24 40c4 4 12 4 16 0" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'pharma-eye-drops',
    name: 'Eye Drops',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['eye drops', 'ophthalmic', 'topical', 'drops', 'ocular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l4 16v24c0 4-4 8-8 8h-8c-4 0-8-4-8-8V24l4-16z"/>
      <path d="M28 8v-4h8v4"/>
      <ellipse cx="32" cy="36" rx="8" ry="4"/>
      <path d="M32 52c2-4 2-8 0-12"/>
      <circle cx="32" cy="60" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'pharma-nasal-spray',
    name: 'Nasal Spray',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['nasal', 'spray', 'intranasal', 'decongestant', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 20h16v36c0 2-4 4-8 4s-8-2-8-4V20z"/>
      <rect x="20" y="12" width="24" height="8" rx="2"/>
      <path d="M32 12v-8"/>
      <ellipse cx="32" cy="4" rx="4" ry="2"/>
      <path d="M28 40h8"/>
      <path d="M28 48h8"/>
    </svg>`
  },
  {
    id: 'pharma-sublingual',
    name: 'Sublingual Tablet',
    domain: 'medicine',
    category: 'drug-delivery',
    tags: ['sublingual', 'under tongue', 'fast acting', 'buccal', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M12 48c8-8 32-8 40 0"/>
      <path d="M16 44c6-4 26-4 32 0"/>
      <path d="M32 24v-8"/>
      <path d="M26 18l6-4 6 4"/>
    </svg>`
  },

  // ===========================================================================
  // RECEPTOR PHARMACOLOGY
  // ===========================================================================
  {
    id: 'pharma-receptor',
    name: 'Cell Receptor',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['receptor', 'membrane', 'binding', 'signal', 'target'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-4 4-8 8-8h8c4 0 8 4 8 8s-4 8-8 8h-8c-4 0-8-4-8-8z"/>
      <path d="M32 24h8c4 0 8 4 8 8s-4 8-8 8h-8"/>
      <circle cx="52" cy="32" r="8"/>
      <path d="M16 16v8"/>
      <path d="M16 40v8"/>
      <text x="12" y="34" font-size="6" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'pharma-agonist',
    name: 'Agonist Binding',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['agonist', 'full agonist', 'activation', 'binding', 'efficacy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-6 6-12 12-12h12c6 0 12 6 12 12s-6 12-12 12H20c-6 0-12-6-12-12z"/>
      <circle cx="52" cy="32" r="8" fill="currentColor" opacity="0.4"/>
      <path d="M44 32h-4"/>
      <path d="M32 16l8 8-8 8"/>
      <text x="48" y="36" font-size="6" fill="currentColor" stroke="none">A</text>
      <path d="M16 48l8 8" stroke="#22c55e"/>
      <path d="M24 48l-8 8" stroke="#22c55e"/>
    </svg>`
  },
  {
    id: 'pharma-antagonist',
    name: 'Antagonist Blocking',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['antagonist', 'blocker', 'inhibition', 'competitive', 'binding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-6 6-12 12-12h12c6 0 12 6 12 12s-6 12-12 12H20c-6 0-12-6-12-12z"/>
      <circle cx="52" cy="32" r="8"/>
      <line x1="46" y1="26" x2="58" y2="38" stroke="#ef4444"/>
      <line x1="58" y1="26" x2="46" y2="38" stroke="#ef4444"/>
      <path d="M44 32h-4"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'pharma-partial-agonist',
    name: 'Partial Agonist',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['partial agonist', 'mixed', 'submaximal', 'efficacy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-6 6-12 12-12h12c6 0 12 6 12 12s-6 12-12 12H20c-6 0-12-6-12-12z"/>
      <circle cx="52" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M44 32h-4"/>
      <path d="M48 28v8"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">R</text>
      <text x="48" y="36" font-size="5" fill="currentColor" stroke="none">P</text>
    </svg>`
  },
  {
    id: 'pharma-inverse-agonist',
    name: 'Inverse Agonist',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['inverse agonist', 'negative efficacy', 'constitutive', 'activity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-6 6-12 12-12h12c6 0 12 6 12 12s-6 12-12 12H20c-6 0-12-6-12-12z"/>
      <circle cx="52" cy="32" r="8"/>
      <path d="M52 28v8"/>
      <path d="M52 40l-4 8"/>
      <path d="M52 40l4 8"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'pharma-gpcr',
    name: 'G-Protein Coupled Receptor',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['GPCR', 'G-protein', 'seven transmembrane', 'signaling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v48"/>
      <path d="M20 8v48"/>
      <path d="M28 8v48"/>
      <path d="M36 8v48"/>
      <path d="M44 8v48"/>
      <path d="M52 8v48"/>
      <path d="M8 4h48"/>
      <path d="M8 60h48"/>
      <ellipse cx="32" cy="48" rx="12" ry="6" fill="currentColor" opacity="0.3"/>
      <text x="26" y="52" font-size="6" fill="currentColor" stroke="none">Gq</text>
    </svg>`
  },
  {
    id: 'pharma-ion-channel',
    name: 'Ion Channel Receptor',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['ion channel', 'ligand gated', 'channel', 'ionotropic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="16" height="24" rx="2"/>
      <rect x="40" y="20" width="16" height="24" rx="2"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M32 12v8"/>
      <path d="M30 52l2 8 2-8" fill="currentColor"/>
      <path d="M34 52l2 8 2-8" fill="currentColor"/>
      <path d="M26 52l2 8 2-8" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'pharma-enzyme-target',
    name: 'Enzyme Target',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['enzyme', 'inhibitor', 'catalytic', 'active site', 'target'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <path d="M32 24v16"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.4"/>
      <text x="28" y="50" font-size="6" fill="currentColor" stroke="none">E</text>
    </svg>`
  },
  {
    id: 'pharma-nuclear-receptor',
    name: 'Nuclear Receptor',
    domain: 'medicine',
    category: 'receptor-pharmacology',
    tags: ['nuclear', 'intracellular', 'transcription', 'steroid', 'receptor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <circle cx="48" cy="16" r="6"/>
      <path d="M44 20l-8 8"/>
      <text x="44" y="20" font-size="5" fill="currentColor" stroke="none">H</text>
    </svg>`
  },

  // ===========================================================================
  // PHARMACOKINETICS (ADME)
  // ===========================================================================
  {
    id: 'pharma-absorption',
    name: 'Drug Absorption',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['absorption', 'bioavailability', 'GI tract', 'oral', 'ADME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 8-16 16-16h16c8 0 16 8 16 16v8c0 4-4 8-8 8H16c-4 0-8-4-8-8v-8z"/>
      <path d="M16 24h32" stroke-dasharray="2 2"/>
      <circle cx="24" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <path d="M24 40v12"/>
      <path d="M20 48l4 4 4-4"/>
      <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <path d="M40 40v12"/>
      <path d="M36 48l4 4 4-4"/>
      <text x="26" y="12" font-size="5" fill="currentColor" stroke="none">GI</text>
    </svg>`
  },
  {
    id: 'pharma-distribution',
    name: 'Drug Distribution',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['distribution', 'Vd', 'volume', 'plasma', 'tissue', 'ADME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8"/>
      <circle cx="16" cy="16" r="6"/>
      <circle cx="48" cy="16" r="6"/>
      <circle cx="16" cy="48" r="6"/>
      <circle cx="48" cy="48" r="6"/>
      <path d="M28 26l-8-6"/>
      <path d="M36 26l8-6"/>
      <path d="M28 38l-8 6"/>
      <path d="M36 38l8 6"/>
      <text x="28" y="36" font-size="6" fill="currentColor" stroke="none">D</text>
    </svg>`
  },
  {
    id: 'pharma-metabolism',
    name: 'Drug Metabolism',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['metabolism', 'liver', 'CYP450', 'biotransformation', 'ADME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-4 0-8 8-8 20s4 28 12 28h24c8 0 12-16 12-28s-4-20-8-20H16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 8c-4 0-8 8-8 20s4 28 12 28h24c8 0 12-16 12-28s-4-20-8-20H16z"/>
      <circle cx="24" cy="24" r="4"/>
      <path d="M28 24h8"/>
      <circle cx="40" cy="24" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="40" r="4"/>
      <path d="M28 40h8"/>
      <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.4"/>
      <text x="26" y="56" font-size="5" fill="currentColor" stroke="none">CYP</text>
    </svg>`
  },
  {
    id: 'pharma-excretion',
    name: 'Drug Excretion',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['excretion', 'kidney', 'renal', 'clearance', 'elimination', 'ADME'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 4-12 16-12 24s4 20 12 24c8-4 12-16 12-24s-4-20-12-24z" fill="currentColor" opacity="0.2"/>
      <path d="M20 8c-8 4-12 16-12 24s4 20 12 24c8-4 12-16 12-24s-4-20-12-24z"/>
      <path d="M44 8c8 4 12 16 12 24s-4 20-12 24c-8-4-12-16-12-24s4-20 12-24z" fill="currentColor" opacity="0.2"/>
      <path d="M44 8c8 4 12 16 12 24s-4 20-12 24c-8-4-12-16-12-24s4-20 12-24z"/>
      <path d="M20 56v4"/>
      <path d="M44 56v4"/>
      <path d="M32 60h-12"/>
      <path d="M32 60h12"/>
    </svg>`
  },
  {
    id: 'pharma-half-life',
    name: 'Drug Half-Life',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['half-life', 't1/2', 'elimination', 'kinetics', 'decay'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 12c8 0 16 8 20 20 4 12 8 20 20 20" stroke-width="2"/>
      <line x1="12" y1="32" x2="52" y2="32" stroke-dasharray="2 2"/>
      <text x="4" y="34" font-size="4" fill="currentColor" stroke="none">50%</text>
      <path d="M32 32v24"/>
      <text x="28" y="62" font-size="5" fill="currentColor" stroke="none">t½</text>
    </svg>`
  },
  {
    id: 'pharma-clearance',
    name: 'Drug Clearance',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['clearance', 'CL', 'elimination', 'renal', 'hepatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M12 20h40"/>
      <circle cx="24" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="44" r="4"/>
      <circle cx="40" cy="44" r="4"/>
      <path d="M28 44h8"/>
      <path d="M32 40v8"/>
      <text x="24" y="14" font-size="5" fill="currentColor" stroke="none">CL</text>
    </svg>`
  },
  {
    id: 'pharma-bioavailability',
    name: 'Bioavailability',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['bioavailability', 'F', 'absorption', 'first pass', 'oral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v48"/>
      <path d="M8 32h24" fill="currentColor" opacity="0.3"/>
      <path d="M32 8a24 24 0 0 1 0 48" fill="currentColor" opacity="0.3"/>
      <text x="20" y="36" font-size="8" fill="currentColor" stroke="none">F</text>
      <text x="38" y="28" font-size="5" fill="currentColor" stroke="none">IV</text>
      <text x="36" y="40" font-size="5" fill="currentColor" stroke="none">PO</text>
    </svg>`
  },
  {
    id: 'pharma-first-pass',
    name: 'First Pass Metabolism',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['first pass', 'presystemic', 'liver', 'hepatic', 'metabolism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="16" rx="12" ry="8"/>
      <path d="M20 24v8"/>
      <path d="M24 28l-4 4-4-4"/>
      <path d="M12 36c-4 0-8 8-4 20h24c4-12 0-20-4-20H12z" fill="currentColor" opacity="0.2"/>
      <path d="M12 36c-4 0-8 8-4 20h24c4-12 0-20-4-20H12z"/>
      <circle cx="48" cy="32" r="8"/>
      <path d="M32 44h8"/>
      <path d="M36 40l4 4-4 4"/>
      <text x="44" y="36" font-size="5" fill="currentColor" stroke="none">%</text>
    </svg>`
  },
  {
    id: 'pharma-plasma-binding',
    name: 'Plasma Protein Binding',
    domain: 'medicine',
    category: 'pharmacokinetics',
    tags: ['protein binding', 'albumin', 'plasma', 'bound', 'free'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <circle cx="24" cy="28" r="4" fill="currentColor"/>
      <circle cx="40" cy="28" r="4"/>
      <circle cx="24" cy="40" r="4" fill="currentColor"/>
      <circle cx="40" cy="40" r="4"/>
      <path d="M28 28h8"/>
      <path d="M28 40h8"/>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Bound</text>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">Free</text>
    </svg>`
  },

  // ===========================================================================
  // DOSE-RESPONSE
  // ===========================================================================
  {
    id: 'pharma-dose-response-curve',
    name: 'Dose-Response Curve',
    domain: 'medicine',
    category: 'dose-response',
    tags: ['dose-response', 'sigmoid', 'EC50', 'Emax', 'potency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 52c4 0 8-2 12-8 4-6 8-20 12-24 4-4 8-4 16-4" stroke-width="2"/>
      <line x1="8" y1="16" x2="52" y2="16" stroke-dasharray="2 2"/>
      <line x1="28" y1="32" x2="28" y2="56" stroke-dasharray="2 2"/>
      <text x="4" y="18" font-size="4" fill="currentColor" stroke="none">Emax</text>
      <text x="24" y="62" font-size="4" fill="currentColor" stroke="none">EC50</text>
    </svg>`
  },
  {
    id: 'pharma-therapeutic-window',
    name: 'Therapeutic Window',
    domain: 'medicine',
    category: 'dose-response',
    tags: ['therapeutic window', 'index', 'margin', 'safety', 'toxicity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 52c4 0 12-8 16-24 4-16 12-20 20-20" stroke-width="2"/>
      <path d="M12 52c8-4 16-4 20-4 4 0 8-4 16-36" stroke-width="2" stroke="#ef4444"/>
      <rect x="20" y="20" width="24" height="16" fill="currentColor" opacity="0.2"/>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">Safe</text>
    </svg>`
  },
  {
    id: 'pharma-ec50',
    name: 'EC50 Indicator',
    domain: 'medicine',
    category: 'dose-response',
    tags: ['EC50', 'potency', 'half-maximal', 'concentration', 'effect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8a24 24 0 0 1 0 48" fill="currentColor" opacity="0.3"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <text x="20" y="36" font-size="8" fill="currentColor" stroke="none">50</text>
      <text x="38" y="38" font-size="5" fill="currentColor" stroke="none">%</text>
    </svg>`
  },
  {
    id: 'pharma-potency',
    name: 'Drug Potency Comparison',
    domain: 'medicine',
    category: 'dose-response',
    tags: ['potency', 'comparison', 'EC50', 'relative', 'efficacy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 48c2-4 6-24 10-28 4-4 6-4 10-4" stroke-width="2"/>
      <path d="M24 48c4-4 10-24 14-28 4-4 6-4 10-4" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="28" y="12" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="48" y="12" font-size="5" fill="currentColor" stroke="none">B</text>
    </svg>`
  },
  {
    id: 'pharma-efficacy',
    name: 'Drug Efficacy',
    domain: 'medicine',
    category: 'dose-response',
    tags: ['efficacy', 'Emax', 'maximal', 'response', 'intrinsic activity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 48c4-4 12-32 20-36 4-2 8-2 16-2" stroke-width="2"/>
      <path d="M12 48c4-2 12-16 20-20 4-2 8-2 16-2" stroke-width="2" stroke-dasharray="4 2"/>
      <line x1="8" y1="12" x2="52" y2="12" stroke-dasharray="2 2"/>
      <line x1="8" y1="28" x2="52" y2="28" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // DRUG INTERACTIONS
  // ===========================================================================
  {
    id: 'pharma-drug-drug-interaction',
    name: 'Drug-Drug Interaction',
    domain: 'medicine',
    category: 'drug-interactions',
    tags: ['DDI', 'interaction', 'contraindication', 'combination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="12"/>
      <circle cx="40" cy="40" r="12"/>
      <path d="M32 28c-2 4-2 8 0 12"/>
      <path d="M28 32c4-2 8-2 12 0"/>
      <text x="20" y="28" font-size="6" fill="currentColor" stroke="none">A</text>
      <text x="36" y="44" font-size="6" fill="currentColor" stroke="none">B</text>
      <path d="M8 56l8-8" stroke="#ef4444"/>
      <path d="M56 8l-8 8" stroke="#ef4444"/>
    </svg>`
  },
  {
    id: 'pharma-synergy',
    name: 'Drug Synergy',
    domain: 'medicine',
    category: 'drug-interactions',
    tags: ['synergy', 'potentiation', 'additive', 'combination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="44" cy="32" r="12"/>
      <path d="M32 32v-20"/>
      <path d="M28 16l4-4 4 4"/>
      <path d="M32 32v20"/>
      <path d="M28 48l4 4 4-4"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">A</text>
      <text x="40" y="36" font-size="6" fill="currentColor" stroke="none">B</text>
      <text x="24" y="8" font-size="5" fill="currentColor" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'pharma-antagonism',
    name: 'Drug Antagonism',
    domain: 'medicine',
    category: 'drug-interactions',
    tags: ['antagonism', 'inhibition', 'blocking', 'interaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="44" cy="32" r="12"/>
      <line x1="28" y1="24" x2="36" y2="40" stroke="#ef4444" stroke-width="2"/>
      <line x1="36" y1="24" x2="28" y2="40" stroke="#ef4444" stroke-width="2"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">A</text>
      <text x="40" y="36" font-size="6" fill="currentColor" stroke="none">B</text>
    </svg>`
  },
  {
    id: 'pharma-cyp450-inhibition',
    name: 'CYP450 Inhibition',
    domain: 'medicine',
    category: 'drug-interactions',
    tags: ['CYP450', 'inhibition', 'metabolism', 'interaction', 'enzyme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <line x1="20" y1="20" x2="44" y2="44" stroke="#ef4444" stroke-width="2"/>
      <line x1="44" y1="20" x2="20" y2="44" stroke="#ef4444" stroke-width="2"/>
      <text x="20" y="62" font-size="5" fill="currentColor" stroke="none">CYP</text>
    </svg>`
  },
  {
    id: 'pharma-cyp450-induction',
    name: 'CYP450 Induction',
    domain: 'medicine',
    category: 'drug-interactions',
    tags: ['CYP450', 'induction', 'metabolism', 'interaction', 'enzyme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <path d="M32 16v-8"/>
      <path d="M28 12l4-4 4 4" stroke="#22c55e"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <text x="20" y="62" font-size="5" fill="currentColor" stroke="none">CYP</text>
    </svg>`
  },

  // ===========================================================================
  // THERAPEUTIC DRUG MONITORING
  // ===========================================================================
  {
    id: 'pharma-tdm',
    name: 'Therapeutic Drug Monitoring',
    domain: 'medicine',
    category: 'tdm',
    tags: ['TDM', 'monitoring', 'levels', 'therapeutic', 'concentration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <rect x="12" y="24" width="40" height="16" fill="currentColor" opacity="0.2"/>
      <path d="M12 48c4-8 8-8 12-16 4-8 8-8 12-8 4 0 8 4 12 12"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke-dasharray="2 2"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-dasharray="2 2"/>
      <text x="48" y="20" font-size="4" fill="currentColor" stroke="none">Toxic</text>
      <text x="48" y="46" font-size="4" fill="currentColor" stroke="none">Sub</text>
    </svg>`
  },
  {
    id: 'pharma-trough-level',
    name: 'Trough Level',
    domain: 'medicine',
    category: 'tdm',
    tags: ['trough', 'Cmin', 'minimum', 'concentration', 'timing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 24c4-8 8-8 12 8 4 16 8 16 12 8 4-8 8-8 12 8"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <circle cx="48" cy="32" r="3"/>
      <path d="M24 40v12"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Trough</text>
    </svg>`
  },
  {
    id: 'pharma-peak-level',
    name: 'Peak Level',
    domain: 'medicine',
    category: 'tdm',
    tags: ['peak', 'Cmax', 'maximum', 'concentration', 'timing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 44c4-8 8-24 12-28 4-4 8 8 12 16 4 8 8 8 12 8"/>
      <circle cx="24" cy="16" r="3" fill="currentColor"/>
      <path d="M24 8v4"/>
      <text x="20" y="6" font-size="4" fill="currentColor" stroke="none">Peak</text>
    </svg>`
  },
  {
    id: 'pharma-steady-state',
    name: 'Steady State',
    domain: 'medicine',
    category: 'tdm',
    tags: ['steady state', 'Css', 'equilibrium', 'accumulation', 'dosing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 8v48"/>
      <path d="M12 48c2-8 4-16 6-16 2 0 4 8 6 8s4-12 6-12 4 12 6 12 4-12 6-12 4 12 6 12 4-12 6-12"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke-dasharray="2 2"/>
      <text x="48" y="20" font-size="4" fill="currentColor" stroke="none">Css</text>
      <path d="M40 36h12"/>
      <path d="M48 32l4 4-4 4"/>
    </svg>`
  },

  // ===========================================================================
  // ADVERSE DRUG REACTIONS
  // ===========================================================================
  {
    id: 'pharma-side-effect',
    name: 'Side Effect Warning',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['side effect', 'adverse', 'reaction', 'warning', 'safety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l24 44H8L32 8z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8l24 44H8L32 8z"/>
      <line x1="32" y1="24" x2="32" y2="36"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">ADR</text>
    </svg>`
  },
  {
    id: 'pharma-allergic-reaction',
    name: 'Allergic Reaction',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['allergy', 'hypersensitivity', 'anaphylaxis', 'reaction', 'IgE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 20c-4 4-4 8 0 12"/>
      <path d="M40 20c4 4 4 8 0 12"/>
      <path d="M20 40c4 4 12 8 24 0"/>
      <circle cx="20" cy="24" r="3" fill="#ef4444"/>
      <circle cx="44" cy="24" r="3" fill="#ef4444"/>
      <circle cx="24" cy="40" r="2" fill="#ef4444"/>
      <circle cx="40" cy="40" r="2" fill="#ef4444"/>
    </svg>`
  },
  {
    id: 'pharma-hepatotoxicity',
    name: 'Hepatotoxicity',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['hepatotoxicity', 'liver', 'toxicity', 'injury', 'DILI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-4 0-8 8-8 20s4 28 12 28h24c8 0 12-16 12-28s-4-20-8-20H16z"/>
      <line x1="12" y1="12" x2="52" y2="52" stroke="#ef4444" stroke-width="2"/>
      <line x1="52" y1="12" x2="12" y2="52" stroke="#ef4444" stroke-width="2"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">DILI</text>
    </svg>`
  },
  {
    id: 'pharma-nephrotoxicity',
    name: 'Nephrotoxicity',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['nephrotoxicity', 'kidney', 'renal', 'toxicity', 'injury'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 4-16 16-16 24s8 24 16 24 16-16 16-24-8-20-16-24z"/>
      <line x1="16" y1="16" x2="48" y2="48" stroke="#ef4444" stroke-width="2"/>
      <line x1="48" y1="16" x2="16" y2="48" stroke="#ef4444" stroke-width="2"/>
      <text x="22" y="36" font-size="5" fill="currentColor" stroke="none">AKI</text>
    </svg>`
  },
  {
    id: 'pharma-cardiotoxicity',
    name: 'Cardiotoxicity',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['cardiotoxicity', 'heart', 'QT', 'arrhythmia', 'toxicity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-8-8-20-4-20 8 0 16 20 32 20 32s20-16 20-32c0-12-12-16-20-8z"/>
      <line x1="12" y1="20" x2="52" y2="52" stroke="#ef4444" stroke-width="2"/>
      <line x1="52" y1="20" x2="12" y2="52" stroke="#ef4444" stroke-width="2"/>
      <path d="M24 32h4l4-8 4 16 4-8h4"/>
    </svg>`
  },
  {
    id: 'pharma-teratogen',
    name: 'Teratogenic Warning',
    domain: 'medicine',
    category: 'adverse-reactions',
    tags: ['teratogen', 'pregnancy', 'fetal', 'contraindicated', 'birth defect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <line x1="12" y1="12" x2="52" y2="52" stroke="#ef4444" stroke-width="3"/>
      <ellipse cx="32" cy="36" rx="12" ry="16"/>
      <circle cx="32" cy="24" r="6"/>
      <text x="22" y="60" font-size="5" fill="currentColor" stroke="none">Cat X</text>
    </svg>`
  },

  // ===========================================================================
  // SPECIFIC DRUG CATEGORIES
  // ===========================================================================
  {
    id: 'pharma-antibiotic-general',
    name: 'Antibiotic',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antibiotic', 'antibacterial', 'antimicrobial', 'bacteria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <path d="M16 32c0 4 7.2 8 16 8s16-4 16-8" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="16" r="4"/>
      <circle cx="32" cy="12" r="4"/>
      <circle cx="44" cy="16" r="4"/>
      <line x1="22" y1="20" x2="28" y2="28" stroke="#ef4444"/>
      <line x1="32" y1="16" x2="32" y2="24" stroke="#ef4444"/>
      <line x1="42" y1="20" x2="36" y2="28" stroke="#ef4444"/>
    </svg>`
  },
  {
    id: 'pharma-antiviral',
    name: 'Antiviral',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antiviral', 'virus', 'antimicrobial', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M32 16v-8"/>
      <path d="M32 48v8"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <path d="M20 20l-6-6"/>
      <path d="M44 20l6-6"/>
      <path d="M20 44l-6 6"/>
      <path d="M44 44l6 6"/>
      <line x1="20" y1="20" x2="44" y2="44" stroke="#ef4444" stroke-width="2"/>
      <line x1="44" y1="20" x2="20" y2="44" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-antifungal',
    name: 'Antifungal',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antifungal', 'fungus', 'antimicrobial', 'azole'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56c-8 0-16-8-16-20 0-8 4-16 8-20 4-4 8-8 8-8s4 4 8 8c4 4 8 12 8 20 0 12-8 20-16 20z"/>
      <path d="M32 56v-24"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <line x1="20" y1="24" x2="44" y2="48" stroke="#ef4444" stroke-width="2"/>
      <line x1="44" y1="24" x2="20" y2="48" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-analgesic',
    name: 'Analgesic',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['analgesic', 'pain', 'painkiller', 'analgesia', 'opioid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 28l4-4 4 4 4-4 4 4" stroke="#22c55e"/>
      <path d="M24 40c4 4 12 4 16 0"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
      <text x="26" y="56" font-size="5" fill="currentColor" stroke="none">Rx</text>
    </svg>`
  },
  {
    id: 'pharma-sedative',
    name: 'Sedative/Hypnotic',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['sedative', 'hypnotic', 'sleep', 'benzodiazepine', 'CNS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 28c2-2 4-4 8-4s6 2 8 4"/>
      <path d="M24 36c4 4 12 4 16 0"/>
      <ellipse cx="24" cy="28" rx="4" ry="2"/>
      <ellipse cx="40" cy="28" rx="4" ry="2"/>
      <path d="M48 12c4 4 8 4 8 4"/>
      <path d="M52 8c4 4 8 4 8 4"/>
      <text x="2" y="10" font-size="5" fill="currentColor" stroke="none">Zzz</text>
    </svg>`
  },
  {
    id: 'pharma-antidepressant',
    name: 'Antidepressant',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antidepressant', 'SSRI', 'mood', 'serotonin', 'CNS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 36l4-4 4 4 4-4 4 4"/>
      <circle cx="24" cy="24" r="3"/>
      <circle cx="40" cy="24" r="3"/>
      <path d="M32 8v-4"/>
      <path d="M24 10l-4-4"/>
      <path d="M40 10l4-4"/>
      <path d="M28 4l4 4 4-4"/>
    </svg>`
  },
  {
    id: 'pharma-antipsychotic',
    name: 'Antipsychotic',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antipsychotic', 'dopamine', 'schizophrenia', 'CNS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M16 32h8"/>
      <path d="M40 32h8"/>
      <path d="M32 16v8"/>
      <path d="M32 40v8"/>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">D2R</text>
    </svg>`
  },
  {
    id: 'pharma-anticonvulsant',
    name: 'Anticonvulsant',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['anticonvulsant', 'antiepileptic', 'seizure', 'epilepsy', 'CNS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M16 32h4l4-12 4 24 4-24 4 12h12"/>
      <line x1="12" y1="12" x2="52" y2="12" stroke="#ef4444" stroke-dasharray="2 2"/>
      <path d="M16 12l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'pharma-anticoagulant',
    name: 'Anticoagulant',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['anticoagulant', 'blood thinner', 'warfarin', 'DOAC', 'coagulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-16 16-16 28 0 8 8 16 16 16s16-8 16-16c0-12-8-20-16-28z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-8 8-16 16-16 28 0 8 8 16 16 16s16-8 16-16c0-12-8-20-16-28z"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'pharma-antiplatelet',
    name: 'Antiplatelet',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antiplatelet', 'aspirin', 'P2Y12', 'platelet', 'aggregation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="10"/>
      <circle cx="40" cy="28" r="10"/>
      <circle cx="32" cy="42" r="10"/>
      <line x1="20" y1="24" x2="44" y2="48" stroke="#ef4444" stroke-width="2"/>
      <line x1="44" y1="24" x2="20" y2="48" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-diuretic',
    name: 'Diuretic',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['diuretic', 'kidney', 'loop', 'thiazide', 'fluid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-8 4-12 16-12 24s4 20 12 24c8-4 12-16 12-24s-4-20-12-24z"/>
      <path d="M40 8c8 4 12 16 12 24s-4 20-12 24c-8-4-12-16-12-24s4-20 12-24z"/>
      <path d="M24 56v4l-8 4"/>
      <path d="M40 56v4l8 4"/>
      <path d="M20 36l4 4-4 4"/>
      <path d="M44 36l-4 4 4 4"/>
    </svg>`
  },
  {
    id: 'pharma-beta-blocker',
    name: 'Beta Blocker',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['beta blocker', 'adrenergic', 'heart rate', 'blood pressure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-8-8-20-4-20 8 0 16 20 32 20 32s20-16 20-32c0-12-12-16-20-8z"/>
      <text x="24" y="36" font-size="12" fill="currentColor" stroke="none">B</text>
      <line x1="22" y1="28" x2="42" y2="40" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-calcium-channel-blocker',
    name: 'Calcium Channel Blocker',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['CCB', 'calcium', 'channel', 'antihypertensive', 'vasodilator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="12" height="32" rx="2"/>
      <rect x="36" y="16" width="12" height="32" rx="2"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
      <line x1="28" y1="24" x2="36" y2="40" stroke="#ef4444" stroke-width="2"/>
      <text x="18" y="12" font-size="4" fill="currentColor" stroke="none">Ca²⁺</text>
    </svg>`
  },
  {
    id: 'pharma-ace-inhibitor',
    name: 'ACE Inhibitor',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['ACEi', 'angiotensin', 'antihypertensive', 'renoprotective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="10" fill="currentColor" stroke="none">ACE</text>
      <line x1="16" y1="16" x2="48" y2="48" stroke="#ef4444" stroke-width="2"/>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
    </svg>`
  },
  {
    id: 'pharma-arb',
    name: 'ARB',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['ARB', 'angiotensin receptor', 'antihypertensive', 'sartan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-8 8-16 16-16s16 8 16 16-8 16-16 16-16-8-16-16z"/>
      <circle cx="40" cy="24" r="8"/>
      <line x1="36" y1="20" x2="44" y2="28" stroke="#ef4444" stroke-width="2"/>
      <line x1="44" y1="20" x2="36" y2="28" stroke="#ef4444" stroke-width="2"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">AT1</text>
    </svg>`
  },
  {
    id: 'pharma-statin',
    name: 'Statin',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['statin', 'HMG-CoA', 'cholesterol', 'lipid', 'cardiovascular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 36l4-8 4 4 4-8 4 4"/>
      <path d="M24 40l16-16" stroke="#22c55e"/>
      <text x="20" y="54" font-size="5" fill="currentColor" stroke="none">LDL↓</text>
    </svg>`
  },
  {
    id: 'pharma-insulin',
    name: 'Insulin',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['insulin', 'diabetes', 'glucose', 'hormone', 'injectable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v8l4 4v28c0 4-4 8-8 8h-8c-4 0-8-4-8-8V20l4-4V8z"/>
      <line x1="24" y1="16" x2="40" y2="16"/>
      <path d="M28 28h8"/>
      <path d="M32 24v8"/>
      <circle cx="32" cy="44" r="4" fill="currentColor" opacity="0.4"/>
      <text x="26" y="60" font-size="4" fill="currentColor" stroke="none">INS</text>
    </svg>`
  },
  {
    id: 'pharma-glucagon',
    name: 'Glucagon',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['glucagon', 'hypoglycemia', 'glucose', 'emergency', 'hormone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12h24v8l4 8v24c0 4-4 8-8 8H24c-4 0-8-4-8-8V28l4-8v-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 12h24v8l4 8v24c0 4-4 8-8 8H24c-4 0-8-4-8-8V28l4-8v-8z"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
      <path d="M32 40v8"/>
      <path d="M28 44l4 4 4-4"/>
      <text x="24" y="8" font-size="4" fill="currentColor" stroke="none">GCG</text>
    </svg>`
  },
  {
    id: 'pharma-sglt2-inhibitor',
    name: 'SGLT2 Inhibitor',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['SGLT2i', 'gliflozin', 'diabetes', 'cardiorenal', 'glucose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-8 4-12 16-12 24s4 20 12 24c8-4 12-16 12-24s-4-20-12-24z"/>
      <path d="M32 32h16"/>
      <circle cx="52" cy="32" r="6"/>
      <line x1="48" y1="28" x2="56" y2="36" stroke="#ef4444" stroke-width="2"/>
      <line x1="56" y1="28" x2="48" y2="36" stroke="#ef4444" stroke-width="2"/>
      <text x="16" y="36" font-size="4" fill="currentColor" stroke="none">Na⁺</text>
      <text x="48" y="44" font-size="4" fill="currentColor" stroke="none">Glu</text>
    </svg>`
  },
  {
    id: 'pharma-glp1-agonist',
    name: 'GLP-1 Agonist',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['GLP-1', 'incretin', 'diabetes', 'weight loss', 'semaglutide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32v32c0 4-4 8-8 8H24c-4 0-8-4-8-8V16z"/>
      <path d="M24 8h16v8H24z"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="4 2"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">GLP1</text>
    </svg>`
  },
  {
    id: 'pharma-ppi',
    name: 'Proton Pump Inhibitor',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['PPI', 'omeprazole', 'GERD', 'acid', 'gastric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <path d="M20 24c4 4 20 4 24 0"/>
      <path d="M20 40c4-4 20-4 24 0"/>
      <circle cx="32" cy="24" r="4"/>
      <path d="M32 28v8"/>
      <line x1="28" y1="20" x2="36" y2="28" stroke="#ef4444" stroke-width="2"/>
      <text x="26" y="50" font-size="4" fill="currentColor" stroke="none">H⁺K⁺</text>
    </svg>`
  },
  {
    id: 'pharma-h2-blocker',
    name: 'H2 Blocker',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['H2 blocker', 'histamine', 'ranitidine', 'GERD', 'gastric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <path d="M16 32c0-4 8-8 16-8s16 4 16 8"/>
      <circle cx="32" cy="24" r="6"/>
      <line x1="28" y1="20" x2="36" y2="28" stroke="#ef4444" stroke-width="2"/>
      <line x1="36" y1="20" x2="28" y2="28" stroke="#ef4444" stroke-width="2"/>
      <text x="26" y="48" font-size="6" fill="currentColor" stroke="none">H2</text>
    </svg>`
  },
  {
    id: 'pharma-bronchodilator',
    name: 'Bronchodilator',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['bronchodilator', 'beta2', 'LABA', 'SABA', 'asthma', 'COPD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v8"/>
      <path d="M32 16c-8 4-16 12-16 24 0 8 4 12 8 12h16c4 0 8-4 8-12 0-12-8-20-16-24z"/>
      <path d="M24 32c4-4 12-4 16 0"/>
      <path d="M24 40c4-4 12-4 16 0" stroke-dasharray="4 2"/>
      <path d="M16 24l8 4-8 4" stroke="#22c55e"/>
      <path d="M48 24l-8 4 8 4" stroke="#22c55e"/>
    </svg>`
  },
  {
    id: 'pharma-corticosteroid',
    name: 'Corticosteroid',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['corticosteroid', 'steroid', 'anti-inflammatory', 'prednisone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16l12 8 12-8v16l-12 8-12-8V16z" fill="currentColor" opacity="0.2"/>
      <path d="M20 16l12 8 12-8v16l-12 8-12-8V16z"/>
      <path d="M20 32l12 8 12-8v16l-12 8-12-8V32z"/>
      <path d="M32 24v16"/>
      <text x="22" y="60" font-size="5" fill="currentColor" stroke="none">GCS</text>
    </svg>`
  },
  {
    id: 'pharma-nsaid',
    name: 'NSAID',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['NSAID', 'ibuprofen', 'anti-inflammatory', 'COX', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M24 24c4 4 12 4 16 0"/>
      <path d="M24 40c4-4 12-4 16 0"/>
      <circle cx="32" cy="32" r="8"/>
      <line x1="28" y1="28" x2="36" y2="36" stroke="#ef4444"/>
      <line x1="36" y1="28" x2="28" y2="36" stroke="#ef4444"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">COX</text>
    </svg>`
  },
  {
    id: 'pharma-immunosuppressant',
    name: 'Immunosuppressant',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['immunosuppressant', 'transplant', 'tacrolimus', 'cyclosporine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M32 16v-8"/>
      <path d="M32 48v8"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <path d="M22 22l-6-6"/>
      <path d="M42 22l6-6"/>
      <path d="M22 42l-6 6"/>
      <path d="M42 42l6 6"/>
      <line x1="24" y1="24" x2="40" y2="40" stroke="#ef4444" stroke-width="2"/>
      <line x1="40" y1="24" x2="24" y2="40" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-chemotherapy',
    name: 'Chemotherapy Agent',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['chemotherapy', 'cytotoxic', 'cancer', 'oncology', 'antineoplastic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32v40c0 4-4 8-8 8H24c-4 0-8-4-8-8V8z"/>
      <line x1="16" y1="16" x2="48" y2="16"/>
      <path d="M24 24c4 8 12 8 16 0" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="36" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <circle cx="32" cy="44" r="4"/>
      <line x1="24" y1="36" x2="32" y2="44"/>
      <line x1="40" y1="36" x2="32" y2="44"/>
    </svg>`
  },
  {
    id: 'pharma-targeted-therapy',
    name: 'Targeted Therapy',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['targeted therapy', 'tyrosine kinase', 'monoclonal', 'cancer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M32 4v8"/>
      <path d="M28 8l4-4 4 4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'pharma-biologic',
    name: 'Biologic Agent',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['biologic', 'monoclonal antibody', 'mAb', 'immunotherapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 0-8 4-8 8v16c0 4 4 8 8 8v16h8v-16h8v16h8v-16c4 0 8-4 8-8V16c0-4-4-8-8-8"/>
      <ellipse cx="20" cy="24" rx="4" ry="8"/>
      <ellipse cx="44" cy="24" rx="4" ry="8"/>
      <path d="M24 24h16"/>
      <circle cx="32" cy="8" r="4" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'pharma-vaccine',
    name: 'Vaccine',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['vaccine', 'immunization', 'prophylaxis', 'antigen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12h24v8l4 8v24c0 4-4 8-8 8H24c-4 0-8-4-8-8V28l4-8v-8z"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <path d="M28 8v-4h8v4"/>
      <circle cx="32" cy="36" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M28 36h8"/>
      <path d="M32 32v8"/>
      <circle cx="24" cy="48" r="2"/>
      <circle cx="40" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'pharma-antidote',
    name: 'Antidote',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['antidote', 'reversal', 'overdose', 'toxicology', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 24l16 16" stroke="#22c55e" stroke-width="3"/>
      <path d="M24 40l16-16" stroke="#ef4444" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" stroke="#22c55e"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">Rx</text>
    </svg>`
  },
  {
    id: 'pharma-controlled-substance',
    name: 'Controlled Substance',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['controlled', 'scheduled', 'DEA', 'opioid', 'narcotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 16v8"/>
      <circle cx="32" cy="32" r="8"/>
      <text x="28" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <path d="M32 40v8"/>
      <path d="M20 28l-4-4"/>
      <path d="M44 28l4-4"/>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">II-V</text>
    </svg>`
  },
  {
    id: 'pharma-over-the-counter',
    name: 'OTC Medication',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['OTC', 'over-the-counter', 'non-prescription', 'self-care'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <line x1="12" y1="24" x2="52" y2="24"/>
      <text x="18" y="38" font-size="8" fill="currentColor" stroke="none">OTC</text>
      <circle cx="32" cy="44" r="3"/>
      <path d="M20 8h24v8H20z"/>
    </svg>`
  },
  {
    id: 'pharma-prescription',
    name: 'Prescription Drug',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['prescription', 'Rx', 'legend drug', 'pharmacy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <line x1="20" y1="16" x2="44" y2="16"/>
      <line x1="20" y1="24" x2="44" y2="24"/>
      <text x="18" y="42" font-size="14" fill="currentColor" stroke="none">Rx</text>
      <line x1="20" y1="48" x2="36" y2="48"/>
    </svg>`
  },
  {
    id: 'pharma-generic',
    name: 'Generic Drug',
    domain: 'medicine',
    category: 'drug-classes',
    tags: ['generic', 'bioequivalent', 'off-patent', 'formulary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="10"/>
      <line x1="12" y1="32" x2="52" y2="32"/>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">G</text>
      <path d="M24 16l8 8 8-8"/>
      <path d="M24 48l8-8 8 8"/>
    </svg>`
  },

  // ===========================================================================
  // PHARMACEUTICAL PROCESSES
  // ===========================================================================
  {
    id: 'pharma-drug-development',
    name: 'Drug Development Pipeline',
    domain: 'medicine',
    category: 'process',
    tags: ['drug development', 'pipeline', 'clinical trial', 'FDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="12" height="8" rx="1"/>
      <rect x="24" y="28" width="12" height="8" rx="1"/>
      <rect x="40" y="28" width="12" height="8" rx="1"/>
      <path d="M20 32h4"/>
      <path d="M36 32h4"/>
      <text x="10" y="24" font-size="4" fill="currentColor" stroke="none">P1</text>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">P2</text>
      <text x="42" y="24" font-size="4" fill="currentColor" stroke="none">P3</text>
      <path d="M52 32h4"/>
      <circle cx="58" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <text x="54" y="24" font-size="4" fill="currentColor" stroke="none">FDA</text>
    </svg>`
  },
  {
    id: 'pharma-clinical-trial',
    name: 'Clinical Trial',
    domain: 'medicine',
    category: 'process',
    tags: ['clinical trial', 'research', 'phase', 'study'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <line x1="24" y1="16" x2="40" y2="16"/>
      <line x1="24" y1="24" x2="40" y2="24"/>
      <circle cx="24" cy="36" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <path d="M28 36h8"/>
      <text x="22" y="52" font-size="4" fill="currentColor" stroke="none">RCT</text>
    </svg>`
  },
  {
    id: 'pharma-formulation',
    name: 'Drug Formulation',
    domain: 'medicine',
    category: 'process',
    tags: ['formulation', 'compounding', 'excipient', 'dosage form'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24l4 8v36c0 4-4 8-8 8H24c-4 0-8-4-8-8V16l4-8z"/>
      <line x1="24" y1="16" x2="40" y2="16"/>
      <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="36" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="44" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="48" r="3" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'pharma-quality-control',
    name: 'Quality Control',
    domain: 'medicine',
    category: 'process',
    tags: ['QC', 'quality', 'assay', 'testing', 'validation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M24 32l6 6 12-16" stroke="#22c55e" stroke-width="2"/>
      <text x="22" y="56" font-size="5" fill="currentColor" stroke="none">QC</text>
    </svg>`
  },

  // ===========================================================================
  // PHARMACY PRACTICE
  // ===========================================================================
  {
    id: 'pharma-medication-error',
    name: 'Medication Error Warning',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['medication error', 'safety', 'dispensing', 'prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l24 44H8L32 8z" fill="#ef4444" opacity="0.2"/>
      <path d="M32 8l24 44H8L32 8z"/>
      <line x1="32" y1="24" x2="32" y2="36"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
      <ellipse cx="32" cy="28" rx="4" ry="2"/>
    </svg>`
  },
  {
    id: 'pharma-drug-recall',
    name: 'Drug Recall',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['recall', 'safety', 'withdrawal', 'FDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="10"/>
      <line x1="12" y1="32" x2="52" y2="32"/>
      <path d="M32 22l8-12"/>
      <path d="M40 10h-8v8"/>
      <line x1="16" y1="16" x2="48" y2="48" stroke="#ef4444" stroke-width="2"/>
      <line x1="48" y1="16" x2="16" y2="48" stroke="#ef4444" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'pharma-expiration',
    name: 'Expiration Date',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['expiration', 'stability', 'shelf life', 'dating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 16v16l12 8"/>
      <circle cx="32" cy="32" r="4"/>
      <text x="22" y="56" font-size="5" fill="currentColor" stroke="none">EXP</text>
    </svg>`
  },
  {
    id: 'pharma-storage',
    name: 'Storage Conditions',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['storage', 'temperature', 'refrigeration', 'stability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <line x1="16" y1="20" x2="48" y2="20"/>
      <line x1="16" y1="36" x2="48" y2="36"/>
      <path d="M28 28h8"/>
      <path d="M32 24v8"/>
      <text x="22" y="50" font-size="5" fill="currentColor" stroke="none">2-8C</text>
    </svg>`
  },
  {
    id: 'pharma-pill-bottle',
    name: 'Pill Bottle',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['bottle', 'container', 'dispensing', 'prescription'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24v40c0 2-4 4-8 4H28c-4 0-8-2-8-4V16z"/>
      <rect x="16" y="8" width="32" height="8" rx="2"/>
      <line x1="20" y1="24" x2="44" y2="24"/>
      <ellipse cx="32" cy="40" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="36" r="3"/>
      <circle cx="36" cy="44" r="3"/>
    </svg>`
  },
  {
    id: 'pharma-blister-pack',
    name: 'Blister Pack',
    domain: 'medicine',
    category: 'pharmacy',
    tags: ['blister pack', 'packaging', 'unit dose', 'compliance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <ellipse cx="20" cy="28" rx="6" ry="4"/>
      <ellipse cx="36" cy="28" rx="6" ry="4"/>
      <ellipse cx="52" cy="28" rx="6" ry="4" stroke-dasharray="2 2"/>
      <ellipse cx="20" cy="40" rx="6" ry="4"/>
      <ellipse cx="36" cy="40" rx="6" ry="4"/>
      <ellipse cx="52" cy="40" rx="6" ry="4" stroke-dasharray="2 2"/>
    </svg>`
  },
];

export default pharmacologyIcons;
