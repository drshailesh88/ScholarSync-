/**
 * Organic Chemistry Icon Library
 * Comprehensive SVG icons for organic chemistry
 *
 * Categories:
 * - Functional Groups (alcohols, carbonyls, amines, etc.)
 * - Reaction Mechanisms (nucleophilic, electrophilic, radical)
 * - Stereochemistry (chirality, conformations, isomers)
 * - Aromatic Systems (benzene, heterocycles, polycyclic)
 */

import type { IconDefinition } from './index';

export const organicIcons: IconDefinition[] = [
  // ===========================================================================
  // FUNCTIONAL GROUPS
  // ===========================================================================
  {
    id: 'organic-alcohol',
    name: 'Alcohol Group (-OH)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['alcohol', 'hydroxyl', 'OH', 'functional group', 'primary', 'secondary', 'tertiary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="24" y2="32"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <line x1="40" y1="32" x2="52" y2="32"/>
      <circle cx="52" cy="32" r="8" fill="none" stroke="red"/>
      <text x="48" y="36" font-size="8" fill="red" stroke="none">O</text>
      <line x1="56" y1="26" x2="60" y2="22" stroke="red"/>
      <text x="58" y="20" font-size="6" fill="red" stroke="none">H</text>
      <text x="14" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'organic-aldehyde',
    name: 'Aldehyde Group (-CHO)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['aldehyde', 'carbonyl', 'CHO', 'formyl', 'oxidation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="28" y2="32"/>
      <text x="14" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <line x1="28" y1="32" x2="40" y2="32"/>
      <text x="32" y="28" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="40" y1="32" x2="40" y2="16" stroke="red"/>
      <line x1="44" y1="32" x2="44" y2="16" stroke="red"/>
      <text x="38" y="14" font-size="8" fill="red" stroke="none">O</text>
      <line x1="40" y1="40" x2="50" y2="48"/>
      <text x="48" y="54" font-size="6" fill="currentColor" stroke="none">H</text>
    </svg>`
  },
  {
    id: 'organic-ketone',
    name: 'Ketone Group (C=O)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['ketone', 'carbonyl', 'C=O', 'keto', 'acetone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="24" y2="32"/>
      <text x="10" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <text x="28" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="32" y1="24" x2="32" y2="12" stroke="red"/>
      <line x1="36" y1="24" x2="36" y2="12" stroke="red"/>
      <text x="30" y="10" font-size="8" fill="red" stroke="none">O</text>
      <line x1="40" y1="32" x2="56" y2="32"/>
      <text x="50" y="28" font-size="6" fill="currentColor" stroke="none">R'</text>
    </svg>`
  },
  {
    id: 'organic-carboxylic-acid',
    name: 'Carboxylic Acid (-COOH)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['carboxylic', 'acid', 'COOH', 'carboxyl', 'acetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="20" y2="32"/>
      <text x="8" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="28" y1="24" x2="28" y2="12" stroke="red"/>
      <line x1="32" y1="24" x2="32" y2="12" stroke="red"/>
      <text x="26" y="10" font-size="8" fill="red" stroke="none">O</text>
      <line x1="36" y1="36" x2="48" y2="44" stroke="red"/>
      <text x="46" y="50" font-size="8" fill="red" stroke="none">O</text>
      <line x1="54" y1="42" x2="60" y2="36" stroke="red"/>
      <text x="58" y="34" font-size="6" fill="red" stroke="none">H</text>
    </svg>`
  },
  {
    id: 'organic-ester',
    name: 'Ester Group (-COOR)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['ester', 'COOR', 'carboxylate', 'esterification', 'acetate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="16" y2="32"/>
      <text x="6" y="28" font-size="5" fill="currentColor" stroke="none">R</text>
      <text x="20" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="24" y1="24" x2="24" y2="14" stroke="red"/>
      <line x1="28" y1="24" x2="28" y2="14" stroke="red"/>
      <text x="22" y="12" font-size="7" fill="red" stroke="none">O</text>
      <line x1="32" y1="36" x2="42" y2="42" stroke="red"/>
      <text x="40" y="48" font-size="7" fill="red" stroke="none">O</text>
      <line x1="48" y1="44" x2="58" y2="44"/>
      <text x="54" y="40" font-size="5" fill="currentColor" stroke="none">R'</text>
    </svg>`
  },
  {
    id: 'organic-amine',
    name: 'Amine Group (-NH2)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['amine', 'amino', 'NH2', 'nitrogen', 'primary amine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="28" y2="32"/>
      <text x="14" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <circle cx="40" cy="32" r="10" fill="none" stroke="#0066cc"/>
      <text x="35" y="36" font-size="8" fill="#0066cc" stroke="none">N</text>
      <line x1="48" y1="26" x2="56" y2="20" stroke="#0066cc"/>
      <text x="54" y="18" font-size="6" fill="#0066cc" stroke="none">H</text>
      <line x1="48" y1="38" x2="56" y2="44" stroke="#0066cc"/>
      <text x="54" y="50" font-size="6" fill="#0066cc" stroke="none">H</text>
    </svg>`
  },
  {
    id: 'organic-amide',
    name: 'Amide Group (-CONH2)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['amide', 'CONH2', 'peptide bond', 'carbonyl', 'nitrogen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="16" y2="32"/>
      <text x="6" y="28" font-size="5" fill="currentColor" stroke="none">R</text>
      <text x="20" y="36" font-size="7" fill="currentColor" stroke="none">C</text>
      <line x1="24" y1="24" x2="24" y2="14" stroke="red"/>
      <line x1="28" y1="24" x2="28" y2="14" stroke="red"/>
      <text x="22" y="12" font-size="7" fill="red" stroke="none">O</text>
      <line x1="32" y1="36" x2="42" y2="42" stroke="#0066cc"/>
      <text x="40" y="48" font-size="7" fill="#0066cc" stroke="none">N</text>
      <line x1="48" y1="40" x2="54" y2="34" stroke="#0066cc"/>
      <text x="52" y="32" font-size="5" fill="#0066cc" stroke="none">H</text>
      <line x1="48" y1="50" x2="54" y2="56" stroke="#0066cc"/>
      <text x="52" y="60" font-size="5" fill="#0066cc" stroke="none">H</text>
    </svg>`
  },
  {
    id: 'organic-ether',
    name: 'Ether Group (R-O-R)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['ether', 'ROR', 'oxygen bridge', 'diethyl', 'anesthetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="20" y2="32"/>
      <text x="8" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <circle cx="32" cy="32" r="8" fill="none" stroke="red"/>
      <text x="28" y="36" font-size="8" fill="red" stroke="none">O</text>
      <line x1="44" y1="32" x2="60" y2="32"/>
      <text x="50" y="28" font-size="6" fill="currentColor" stroke="none">R'</text>
    </svg>`
  },
  {
    id: 'organic-nitrile',
    name: 'Nitrile Group (-CN)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['nitrile', 'cyano', 'CN', 'triple bond', 'cyanide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="24" y2="32"/>
      <text x="12" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <text x="26" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="36" y1="28" x2="50" y2="28" stroke="#0066cc"/>
      <line x1="36" y1="32" x2="50" y2="32" stroke="#0066cc"/>
      <line x1="36" y1="36" x2="50" y2="36" stroke="#0066cc"/>
      <text x="52" y="36" font-size="8" fill="#0066cc" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'organic-thiol',
    name: 'Thiol Group (-SH)',
    domain: 'chemistry',
    category: 'functional-groups',
    tags: ['thiol', 'sulfhydryl', 'SH', 'mercaptan', 'cysteine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="28" y2="32"/>
      <text x="14" y="28" font-size="6" fill="currentColor" stroke="none">R</text>
      <circle cx="42" cy="32" r="10" fill="none" stroke="#CCCC00"/>
      <text x="38" y="36" font-size="8" fill="#CCCC00" stroke="none">S</text>
      <line x1="52" y1="32" x2="60" y2="32" stroke="#CCCC00"/>
      <text x="58" y="28" font-size="6" fill="#CCCC00" stroke="none">H</text>
    </svg>`
  },

  // ===========================================================================
  // REACTION MECHANISMS
  // ===========================================================================
  {
    id: 'organic-sn1-mechanism',
    name: 'SN1 Mechanism',
    domain: 'chemistry',
    category: 'mechanisms',
    tags: ['SN1', 'substitution', 'nucleophilic', 'carbocation', 'unimolecular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8"/>
      <text x="12" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="24" y1="32" x2="8" y2="32"/>
      <text x="4" y="28" font-size="5" fill="currentColor" stroke="none">X</text>
      <path d="M28 32 L38 32" stroke="green" stroke-width="2" marker-end="url(#arrow)"/>
      <circle cx="48" cy="32" r="8" stroke="blue"/>
      <text x="44" y="36" font-size="8" fill="blue" stroke="none">C</text>
      <text x="56" y="28" font-size="6" fill="blue" stroke="none">+</text>
      <text x="28" y="48" font-size="5" fill="currentColor" stroke="none">Step 1</text>
      <text x="28" y="56" font-size="4" fill="currentColor" stroke="none">Slow</text>
    </svg>`
  },
  {
    id: 'organic-sn2-mechanism',
    name: 'SN2 Mechanism',
    domain: 'chemistry',
    category: 'mechanisms',
    tags: ['SN2', 'substitution', 'nucleophilic', 'bimolecular', 'backside attack'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="34" font-size="7" fill="blue" stroke="none">Nu</text>
      <text x="12" y="30" font-size="5" fill="blue" stroke="none">-</text>
      <path d="M18 32 C24 32, 28 28, 32 32" stroke="blue" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="28" y="36" font-size="7" fill="currentColor" stroke="none">C</text>
      <path d="M38 32 C42 28, 46 32, 50 32" stroke="red" stroke-dasharray="3 2"/>
      <text x="52" y="34" font-size="7" fill="red" stroke="none">LG</text>
      <text x="20" y="50" font-size="5" fill="currentColor" stroke="none">Concerted</text>
      <path d="M32 20 L32 8"/>
      <path d="M32 44 L32 56"/>
    </svg>`
  },
  {
    id: 'organic-e1-mechanism',
    name: 'E1 Elimination',
    domain: 'chemistry',
    category: 'mechanisms',
    tags: ['E1', 'elimination', 'unimolecular', 'carbocation', 'alkene'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="20" y2="32"/>
      <circle cx="24" cy="32" r="4"/>
      <line x1="28" y1="32" x2="36" y2="32"/>
      <circle cx="40" cy="32" r="4"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
      <text x="52" y="28" font-size="5" fill="red" stroke="none">X</text>
      <path d="M24 24 L24 16"/>
      <text x="20" y="14" font-size="5" fill="currentColor" stroke="none">H</text>
      <path d="M16 40 L32 48" stroke="green" marker-end="url(#arrow)"/>
      <line x1="28" y1="30" x2="36" y2="30" stroke="blue"/>
      <line x1="28" y1="34" x2="36" y2="34" stroke="blue"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Alkene</text>
    </svg>`
  },
  {
    id: 'organic-e2-mechanism',
    name: 'E2 Elimination',
    domain: 'chemistry',
    category: 'mechanisms',
    tags: ['E2', 'elimination', 'bimolecular', 'antiperiplanar', 'concerted'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="2" y="20" font-size="6" fill="blue" stroke="none">B:</text>
      <path d="M12 18 C16 22, 18 26, 20 32" stroke="blue" stroke-dasharray="2 2"/>
      <line x1="20" y1="36" x2="20" y2="24"/>
      <text x="16" y="22" font-size="5" fill="currentColor" stroke="none">H</text>
      <circle cx="24" cy="36" r="4"/>
      <line x1="28" y1="36" x2="36" y2="36"/>
      <circle cx="40" cy="36" r="4"/>
      <line x1="44" y1="36" x2="54" y2="36"/>
      <text x="50" y="32" font-size="5" fill="red" stroke="none">X</text>
      <path d="M54 38 C58 42, 60 48, 58 54" stroke="red" stroke-dasharray="2 2"/>
      <line x1="26" y1="34" x2="38" y2="34" stroke="green"/>
      <line x1="26" y1="38" x2="38" y2="38" stroke="green"/>
    </svg>`
  },
  {
    id: 'organic-addition-reaction',
    name: 'Addition Reaction',
    domain: 'chemistry',
    category: 'mechanisms',
    tags: ['addition', 'alkene', 'electrophilic', 'Markovnikov', 'pi bond'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="20" y2="32"/>
      <line x1="20" y1="30" x2="32" y2="30"/>
      <line x1="20" y1="34" x2="32" y2="34"/>
      <line x1="32" y1="32" x2="44" y2="32"/>
      <text x="18" y="46" font-size="6" fill="blue" stroke="none">H-X</text>
      <path d="M26 42 L26 36" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M48 24 L56 24" stroke="green" marker-end="url(#arrow)"/>
      <line x1="50" y1="32" x2="58" y2="32"/>
      <text x="54" y="28" font-size="5" fill="currentColor" stroke="none">H</text>
      <line x1="58" y1="32" x2="58" y2="40"/>
      <text x="56" y="46" font-size="5" fill="red" stroke="none">X</text>
    </svg>`
  },

  // ===========================================================================
  // STEREOCHEMISTRY
  // ===========================================================================
  {
    id: 'organic-chiral-center',
    name: 'Chiral Center',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['chiral', 'stereocenter', 'asymmetric', 'carbon', 'tetrahedral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <text x="28" y="36" font-size="7" fill="white" stroke="none">C*</text>
      <line x1="32" y1="26" x2="32" y2="8"/>
      <text x="28" y="6" font-size="6" fill="currentColor" stroke="none">A</text>
      <line x1="38" y1="32" x2="56" y2="32"/>
      <text x="54" y="28" font-size="6" fill="currentColor" stroke="none">B</text>
      <line x1="32" y1="38" x2="32" y2="56"/>
      <text x="28" y="62" font-size="6" fill="currentColor" stroke="none">C</text>
      <path d="M26 32 L14 26 L8 32 L14 38 Z" fill="currentColor" opacity="0.3"/>
      <text x="4" y="36" font-size="6" fill="currentColor" stroke="none">D</text>
    </svg>`
  },
  {
    id: 'organic-r-configuration',
    name: 'R Configuration',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['R', 'rectus', 'configuration', 'CIP', 'absolute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="none" stroke-dasharray="4 2"/>
      <path d="M22 22 A15 15 0 0 1 42 22" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M42 22 A15 15 0 0 1 42 42" stroke="blue" stroke-width="2"/>
      <path d="M42 42 A15 15 0 0 1 22 42" stroke="blue" stroke-width="2"/>
      <text x="26" y="18" font-size="6" fill="currentColor" stroke="none">1</text>
      <text x="46" y="36" font-size="6" fill="currentColor" stroke="none">2</text>
      <text x="26" y="50" font-size="6" fill="currentColor" stroke="none">3</text>
      <text x="26" y="36" font-size="12" fill="blue" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'organic-s-configuration',
    name: 'S Configuration',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['S', 'sinister', 'configuration', 'CIP', 'absolute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="none" stroke-dasharray="4 2"/>
      <path d="M42 22 A15 15 0 0 0 22 22" stroke="red" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M22 22 A15 15 0 0 0 22 42" stroke="red" stroke-width="2"/>
      <path d="M22 42 A15 15 0 0 0 42 42" stroke="red" stroke-width="2"/>
      <text x="26" y="18" font-size="6" fill="currentColor" stroke="none">1</text>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">2</text>
      <text x="26" y="50" font-size="6" fill="currentColor" stroke="none">3</text>
      <text x="28" y="36" font-size="12" fill="red" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'organic-enantiomers',
    name: 'Enantiomers',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['enantiomers', 'mirror image', 'optical isomers', 'chirality'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="4" x2="32" y2="60" stroke-dasharray="4 2" stroke="gray"/>
      <circle cx="16" cy="32" r="4" fill="currentColor"/>
      <line x1="16" y1="28" x2="16" y2="12"/>
      <line x1="12" y1="32" x2="4" y2="32"/>
      <line x1="20" y1="32" x2="26" y2="32"/>
      <line x1="16" y1="36" x2="16" y2="52"/>
      <circle cx="48" cy="32" r="4" fill="currentColor"/>
      <line x1="48" y1="28" x2="48" y2="12"/>
      <line x1="52" y1="32" x2="60" y2="32"/>
      <line x1="44" y1="32" x2="38" y2="32"/>
      <line x1="48" y1="36" x2="48" y2="52"/>
      <text x="10" y="8" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="50" y="8" font-size="5" fill="currentColor" stroke="none">A</text>
    </svg>`
  },
  {
    id: 'organic-diastereomers',
    name: 'Diastereomers',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['diastereomers', 'stereoisomers', 'non-mirror', 'meso'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="3" fill="blue"/>
      <circle cx="16" cy="44" r="3" fill="red"/>
      <line x1="16" y1="23" x2="16" y2="41"/>
      <text x="4" y="22" font-size="5" fill="blue" stroke="none">R</text>
      <text x="4" y="46" font-size="5" fill="red" stroke="none">S</text>
      <text x="28" y="34" font-size="8" fill="currentColor" stroke="none">vs</text>
      <circle cx="48" cy="20" r="3" fill="blue"/>
      <circle cx="48" cy="44" r="3" fill="blue"/>
      <line x1="48" y1="23" x2="48" y2="41"/>
      <text x="52" y="22" font-size="5" fill="blue" stroke="none">R</text>
      <text x="52" y="46" font-size="5" fill="blue" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'organic-cis-trans',
    name: 'Cis-Trans Isomers',
    domain: 'chemistry',
    category: 'stereochemistry',
    tags: ['cis', 'trans', 'geometric', 'isomers', 'alkene', 'E', 'Z'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="8" y="12" font-size="6" fill="currentColor" stroke="none">cis</text>
      <line x1="8" y1="24" x2="20" y2="24"/>
      <line x1="20" y1="22" x2="32" y2="22"/>
      <line x1="20" y1="26" x2="32" y2="26"/>
      <line x1="32" y1="24" x2="44" y2="24"/>
      <circle cx="8" cy="20" r="2" fill="blue"/>
      <circle cx="44" cy="20" r="2" fill="blue"/>
      <text x="8" y="44" font-size="6" fill="currentColor" stroke="none">trans</text>
      <line x1="8" y1="52" x2="20" y2="52"/>
      <line x1="20" y1="50" x2="32" y2="50"/>
      <line x1="20" y1="54" x2="32" y2="54"/>
      <line x1="32" y1="52" x2="44" y2="52"/>
      <circle cx="8" cy="56" r="2" fill="blue"/>
      <circle cx="44" cy="48" r="2" fill="blue"/>
    </svg>`
  },

  // ===========================================================================
  // AROMATIC SYSTEMS
  // ===========================================================================
  {
    id: 'organic-benzene',
    name: 'Benzene Ring',
    domain: 'chemistry',
    category: 'aromatics',
    tags: ['benzene', 'aromatic', 'phenyl', 'ring', 'pi electrons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,18 52,42 32,52 12,42 12,18"/>
      <circle cx="32" cy="30" r="10" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'organic-pyridine',
    name: 'Pyridine',
    domain: 'chemistry',
    category: 'aromatics',
    tags: ['pyridine', 'heterocycle', 'nitrogen', 'aromatic', 'six-membered'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8 L52 18 L52 42 L32 52 L12 42 L12 18 Z"/>
      <circle cx="32" cy="8" r="4" fill="#0066cc"/>
      <text x="28" y="10" font-size="6" fill="white" stroke="none">N</text>
      <circle cx="32" cy="30" r="10" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'organic-furan',
    name: 'Furan',
    domain: 'chemistry',
    category: 'aromatics',
    tags: ['furan', 'heterocycle', 'oxygen', 'five-membered', 'aromatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12 L50 26 L44 48 L20 48 L14 26 Z"/>
      <circle cx="32" cy="12" r="4" fill="red"/>
      <text x="28" y="14" font-size="6" fill="white" stroke="none">O</text>
      <line x1="18" y1="30" x2="26" y2="42"/>
      <line x1="38" y1="42" x2="46" y2="30"/>
    </svg>`
  },
  {
    id: 'organic-naphthalene',
    name: 'Naphthalene',
    domain: 'chemistry',
    category: 'aromatics',
    tags: ['naphthalene', 'polycyclic', 'fused rings', 'PAH', 'aromatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="20,12 32,6 44,12 44,28 32,34 20,28"/>
      <polygon points="32,34 44,28 56,34 56,50 44,56 32,50"/>
      <circle cx="32" cy="20" r="6" stroke-dasharray="2 1"/>
      <circle cx="44" cy="42" r="6" stroke-dasharray="2 1"/>
    </svg>`
  },
  {
    id: 'organic-imidazole',
    name: 'Imidazole',
    domain: 'chemistry',
    category: 'aromatics',
    tags: ['imidazole', 'heterocycle', 'nitrogen', 'histidine', 'five-membered'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10 L52 28 L44 52 L20 52 L12 28 Z"/>
      <circle cx="32" cy="10" r="4" fill="#0066cc"/>
      <text x="28" y="12" font-size="5" fill="white" stroke="none">N</text>
      <circle cx="16" cy="36" r="4" fill="#0066cc"/>
      <text x="12" y="38" font-size="5" fill="white" stroke="none">N</text>
      <text x="12" y="28" font-size="4" fill="#0066cc" stroke="none">H</text>
    </svg>`
  },
];

export default organicIcons;
