/**
 * Medicinal Chemistry Icon Library
 * Comprehensive SVG icons for medicinal chemistry
 *
 * Categories:
 * - Drug Design (structure-based, ligand-based, virtual screening)
 * - Structure-Activity Relationships (SAR, bioisosteres, pharmacophores)
 * - Pharmacophores (features, mapping, 3D)
 * - Lead Optimization (ADMET, prodrugs, analogs)
 */

import type { IconDefinition } from './index';

export const medicinalIcons: IconDefinition[] = [
  // ===========================================================================
  // DRUG DESIGN
  // ===========================================================================
  {
    id: 'medicinal-drug-target',
    name: 'Drug-Target Interaction',
    domain: 'chemistry',
    category: 'drug-design',
    tags: ['drug', 'target', 'binding', 'receptor', 'protein'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24 L8 40 L24 40 L24 32 L16 32 L16 24 Z" fill="blue" opacity="0.2"/>
      <path d="M8 24 L8 40 L24 40 L24 32 L16 32 L16 24 Z"/>
      <text x="10" y="36" font-size="5" fill="currentColor" stroke="none">Target</text>
      <rect x="24" y="28" width="12" height="8" rx="2" fill="red" opacity="0.3"/>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">Drug</text>
      <path d="M36 32 L44 32" stroke="green" stroke-dasharray="2 2"/>
      <text x="40" y="28" font-size="4" fill="green" stroke="none">Kd</text>
      <rect x="44" y="20" width="16" height="24" rx="4" fill="purple" opacity="0.2"/>
      <text x="46" y="34" font-size="4" fill="currentColor" stroke="none">Effect</text>
    </svg>`
  },
  {
    id: 'medicinal-sbdd',
    name: 'Structure-Based Drug Design',
    domain: 'chemistry',
    category: 'drug-design',
    tags: ['SBDD', 'structure-based', 'docking', 'binding site', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="blue" opacity="0.1"/>
      <path d="M20 24 L20 40 L32 40 L32 28 L24 28 L24 24 Z" fill="blue" opacity="0.3"/>
      <text x="22" y="36" font-size="4" fill="currentColor" stroke="none">Site</text>
      <polygon points="32,28 40,24 44,32 40,40 32,40" fill="red" opacity="0.5"/>
      <text x="34" y="34" font-size="4" fill="currentColor" stroke="none">Lig</text>
      <path d="M28 26 L34 26" stroke="green" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M28 38 L34 38" stroke="green" stroke-width="2" stroke-dasharray="2 2"/>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">H-bond</text>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Docking</text>
    </svg>`
  },
  {
    id: 'medicinal-lbdd',
    name: 'Ligand-Based Drug Design',
    domain: 'chemistry',
    category: 'drug-design',
    tags: ['LBDD', 'ligand-based', 'QSAR', 'similarity', 'pharmacophore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="blue" opacity="0.3"/>
      <text x="12" y="22" font-size="5" fill="currentColor" stroke="none">L1</text>
      <circle cx="40" cy="20" r="8" fill="green" opacity="0.3"/>
      <text x="36" y="22" font-size="5" fill="currentColor" stroke="none">L2</text>
      <circle cx="28" cy="40" r="8" fill="red" opacity="0.3"/>
      <text x="24" y="42" font-size="5" fill="currentColor" stroke="none">L3</text>
      <path d="M24 20 L32 20" stroke-dasharray="4 2"/>
      <path d="M20 28 L24 36" stroke-dasharray="4 2"/>
      <path d="M36 28 L32 36" stroke-dasharray="4 2"/>
      <rect x="16" y="52" width="32" height="8" rx="2" fill="orange" opacity="0.3"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Common Features</text>
    </svg>`
  },
  {
    id: 'medicinal-virtual-screening',
    name: 'Virtual Screening',
    domain: 'chemistry',
    category: 'drug-design',
    tags: ['virtual screening', 'library', 'hits', 'filtering', 'HTS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="20" rx="2"/>
      <circle cx="8" cy="14" r="1" fill="blue"/>
      <circle cx="12" cy="14" r="1" fill="blue"/>
      <circle cx="16" cy="14" r="1" fill="blue"/>
      <circle cx="8" cy="18" r="1" fill="blue"/>
      <circle cx="12" cy="18" r="1" fill="blue"/>
      <circle cx="16" cy="18" r="1" fill="blue"/>
      <circle cx="8" cy="22" r="1" fill="blue"/>
      <circle cx="12" cy="22" r="1" fill="blue"/>
      <circle cx="16" cy="22" r="1" fill="blue"/>
      <text x="6" y="6" font-size="4" fill="currentColor" stroke="none">Library</text>
      <path d="M20 18 L28 18" marker-end="url(#arrow)"/>
      <rect x="28" y="12" width="12" height="12" rx="2" fill="yellow" opacity="0.3"/>
      <text x="30" y="20" font-size="4" fill="currentColor" stroke="none">Filter</text>
      <path d="M40 18 L48 18" marker-end="url(#arrow)"/>
      <rect x="48" y="14" width="12" height="8" rx="2"/>
      <circle cx="52" cy="18" r="2" fill="green"/>
      <circle cx="56" cy="18" r="2" fill="green"/>
      <text x="50" y="10" font-size="4" fill="green" stroke="none">Hits</text>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">1M compounds → 100 hits</text>
    </svg>`
  },
  {
    id: 'medicinal-fragment',
    name: 'Fragment-Based Design',
    domain: 'chemistry',
    category: 'drug-design',
    tags: ['FBDD', 'fragment', 'linking', 'growing', 'merging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="24" r="8" fill="blue" opacity="0.3"/>
      <text x="12" y="26" font-size="5" fill="currentColor" stroke="none">F1</text>
      <circle cx="48" cy="24" r="8" fill="red" opacity="0.3"/>
      <text x="44" y="26" font-size="5" fill="currentColor" stroke="none">F2</text>
      <path d="M24 24 L40 24" stroke="green" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="28" y="20" font-size="4" fill="green" stroke="none">Link</text>
      <path d="M32 32 L32 44"/>
      <rect x="16" y="44" width="32" height="12" rx="4" fill="purple" opacity="0.3"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">Merged</text>
      <text x="4" y="62" font-size="4" fill="currentColor" stroke="none">Fragment linking</text>
    </svg>`
  },

  // ===========================================================================
  // STRUCTURE-ACTIVITY RELATIONSHIPS
  // ===========================================================================
  {
    id: 'medicinal-sar',
    name: 'SAR Analysis',
    domain: 'chemistry',
    category: 'sar',
    tags: ['SAR', 'structure-activity', 'potency', 'modification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="16" rx="2" fill="blue" opacity="0.2"/>
      <text x="12" y="18" font-size="5" fill="currentColor" stroke="none">Core</text>
      <circle cx="8" cy="16" r="4" fill="red" opacity="0.5"/>
      <text x="4" y="18" font-size="4" fill="currentColor" stroke="none">R1</text>
      <circle cx="28" cy="16" r="4" fill="green" opacity="0.5"/>
      <text x="26" y="18" font-size="4" fill="currentColor" stroke="none">R2</text>
      <circle cx="18" cy="24" r="4" fill="orange" opacity="0.5"/>
      <text x="14" y="26" font-size="4" fill="currentColor" stroke="none">R3</text>
      <path d="M32 16 L44 16" marker-end="url(#arrow)"/>
      <rect x="44" y="8" width="16" height="16" rx="2"/>
      <text x="46" y="14" font-size="4" fill="currentColor" stroke="none">IC50</text>
      <text x="46" y="20" font-size="4" fill="currentColor" stroke="none">1 nM</text>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">R1=OH → 10x potency</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">R2=Me → 2x selectivity</text>
    </svg>`
  },
  {
    id: 'medicinal-bioisostere',
    name: 'Bioisosteres',
    domain: 'chemistry',
    category: 'sar',
    tags: ['bioisostere', 'replacement', 'equivalent', 'swap'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="20" rx="2"/>
      <circle cx="16" cy="18" r="6" fill="red" opacity="0.3"/>
      <text x="12" y="20" font-size="5" fill="currentColor" stroke="none">OH</text>
      <path d="M28 18 L36 18" stroke="green" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="30" y="14" font-size="4" fill="green" stroke="none">swap</text>
      <rect x="36" y="8" width="24" height="20" rx="2"/>
      <circle cx="48" cy="18" r="6" fill="blue" opacity="0.3"/>
      <text x="44" y="20" font-size="5" fill="currentColor" stroke="none">NH2</text>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">COOH ↔ tetrazole</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">-H ↔ -F</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">-S- ↔ -O-</text>
    </svg>`
  },
  {
    id: 'medicinal-scaffold-hopping',
    name: 'Scaffold Hopping',
    domain: 'chemistry',
    category: 'sar',
    tags: ['scaffold hopping', 'core', 'replacement', 'novelty', 'IP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,8 28,8 28,24 16,24" fill="blue" opacity="0.3"/>
      <text x="18" y="18" font-size="5" fill="currentColor" stroke="none">A</text>
      <path d="M32 16 L40 16" stroke="green" stroke-width="2" marker-end="url(#arrow)"/>
      <circle cx="52" cy="16" r="10" fill="red" opacity="0.3"/>
      <text x="48" y="18" font-size="5" fill="currentColor" stroke="none">B</text>
      <circle cx="8" cy="16" r="3" fill="orange"/>
      <circle cx="28" cy="12" r="3" fill="orange"/>
      <circle cx="42" cy="12" r="3" fill="orange"/>
      <circle cx="58" cy="20" r="3" fill="orange"/>
      <text x="8" y="40" font-size="4" fill="currentColor" stroke="none">Same pharmacophore</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Different scaffold</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">New IP space</text>
    </svg>`
  },
  {
    id: 'medicinal-qsar',
    name: 'QSAR Model',
    domain: 'chemistry',
    category: 'sar',
    tags: ['QSAR', 'quantitative', 'model', 'prediction', 'descriptors'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 48 L24 36 L36 24 L48 12" stroke="blue" stroke-width="2"/>
      <circle cx="14" cy="46" r="2" fill="red"/>
      <circle cx="22" cy="40" r="2" fill="red"/>
      <circle cx="28" cy="32" r="2" fill="red"/>
      <circle cx="38" cy="22" r="2" fill="red"/>
      <circle cx="46" cy="14" r="2" fill="red"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">pIC50</text>
      <text x="42" y="58" font-size="5" fill="currentColor" stroke="none">Descriptor</text>
      <text x="36" y="36" font-size="4" fill="blue" stroke="none">R2=0.95</text>
    </svg>`
  },
  {
    id: 'medicinal-selectivity',
    name: 'Selectivity Profile',
    domain: 'chemistry',
    category: 'sar',
    tags: ['selectivity', 'off-target', 'panel', 'specificity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="8" height="40" fill="blue" opacity="0.3"/>
      <rect x="8" y="8" width="8" height="40"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">T1</text>
      <rect x="20" y="28" width="8" height="20" fill="green" opacity="0.3"/>
      <rect x="20" y="28" width="8" height="20"/>
      <text x="22" y="52" font-size="4" fill="currentColor" stroke="none">T2</text>
      <rect x="32" y="38" width="8" height="10" fill="yellow" opacity="0.3"/>
      <rect x="32" y="38" width="8" height="10"/>
      <text x="34" y="52" font-size="4" fill="currentColor" stroke="none">T3</text>
      <rect x="44" y="42" width="8" height="6" fill="red" opacity="0.3"/>
      <rect x="44" y="42" width="8" height="6"/>
      <text x="46" y="52" font-size="4" fill="currentColor" stroke="none">T4</text>
      <text x="4" y="6" font-size="4" fill="currentColor" stroke="none">Binding (%)</text>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Target selectivity</text>
    </svg>`
  },

  // ===========================================================================
  // PHARMACOPHORES
  // ===========================================================================
  {
    id: 'medicinal-pharmacophore',
    name: 'Pharmacophore Model',
    domain: 'chemistry',
    category: 'pharmacophores',
    tags: ['pharmacophore', '3D', 'features', 'HBA', 'HBD', 'hydrophobic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="red" opacity="0.3"/>
      <text x="10" y="22" font-size="4" fill="currentColor" stroke="none">HBA</text>
      <circle cx="48" cy="20" r="8" fill="blue" opacity="0.3"/>
      <text x="42" y="22" font-size="4" fill="currentColor" stroke="none">HBD</text>
      <circle cx="32" cy="44" r="8" fill="yellow" opacity="0.3"/>
      <text x="26" y="46" font-size="4" fill="currentColor" stroke="none">Hyd</text>
      <line x1="22" y1="24" x2="44" y2="24" stroke-dasharray="4 2"/>
      <line x1="18" y1="28" x2="28" y2="38" stroke-dasharray="4 2"/>
      <line x1="46" y1="28" x2="36" y2="38" stroke-dasharray="4 2"/>
      <text x="28" y="28" font-size="4" fill="currentColor" stroke="none">5A</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">3-point pharmacophore</text>
    </svg>`
  },
  {
    id: 'medicinal-hba',
    name: 'H-Bond Acceptor',
    domain: 'chemistry',
    category: 'pharmacophores',
    tags: ['HBA', 'hydrogen bond', 'acceptor', 'oxygen', 'nitrogen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="red" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">HBA</text>
      <path d="M48 32 L56 32" stroke="blue" stroke-dasharray="4 2"/>
      <circle cx="60" cy="32" r="3" fill="blue"/>
      <text x="56" y="28" font-size="4" fill="blue" stroke="none">H</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Lone pair accepts H</text>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">(O, N, F)</text>
    </svg>`
  },
  {
    id: 'medicinal-hbd',
    name: 'H-Bond Donor',
    domain: 'chemistry',
    category: 'pharmacophores',
    tags: ['HBD', 'hydrogen bond', 'donor', 'NH', 'OH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="blue" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">HBD</text>
      <circle cx="48" cy="32" r="3" fill="blue"/>
      <text x="46" y="28" font-size="4" fill="blue" stroke="none">H</text>
      <path d="M51 32 L60 32" stroke="blue" stroke-dasharray="4 2"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Donates H to acceptor</text>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">(OH, NH)</text>
    </svg>`
  },
  {
    id: 'medicinal-hydrophobic',
    name: 'Hydrophobic Feature',
    domain: 'chemistry',
    category: 'pharmacophores',
    tags: ['hydrophobic', 'lipophilic', 'aromatic', 'aliphatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="yellow" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">Hyd</text>
      <polygon points="32,20 42,28 42,40 32,48 22,40 22,28" fill="none" stroke-dasharray="2 2"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Lipophilic interaction</text>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">(aromatic, alkyl)</text>
    </svg>`
  },
  {
    id: 'medicinal-aromatic',
    name: 'Aromatic Feature',
    domain: 'chemistry',
    category: 'pharmacophores',
    tags: ['aromatic', 'pi-pi', 'stacking', 'ring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" fill="purple" opacity="0.2"/>
      <polygon points="32,12 48,22 48,42 32,52 16,42 16,22"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="3 2"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">Ar</text>
      <path d="M32 4 L32 12" stroke="purple" stroke-dasharray="2 2"/>
      <path d="M32 52 L32 60" stroke="purple" stroke-dasharray="2 2"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">π-π stacking</text>
    </svg>`
  },

  // ===========================================================================
  // LEAD OPTIMIZATION
  // ===========================================================================
  {
    id: 'medicinal-admet',
    name: 'ADMET Properties',
    domain: 'chemistry',
    category: 'optimization',
    tags: ['ADMET', 'absorption', 'distribution', 'metabolism', 'excretion', 'toxicity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="10" rx="2" fill="blue" opacity="0.2"/>
      <text x="20" y="16" font-size="6" fill="currentColor" stroke="none">ADMET</text>
      <rect x="4" y="22" width="10" height="36" rx="1" fill="green" opacity="0.3"/>
      <text x="5" y="42" font-size="4" fill="currentColor" stroke="none">A</text>
      <rect x="16" y="26" width="10" height="32" rx="1" fill="blue" opacity="0.3"/>
      <text x="18" y="44" font-size="4" fill="currentColor" stroke="none">D</text>
      <rect x="28" y="30" width="10" height="28" rx="1" fill="orange" opacity="0.3"/>
      <text x="30" y="46" font-size="4" fill="currentColor" stroke="none">M</text>
      <rect x="40" y="34" width="10" height="24" rx="1" fill="purple" opacity="0.3"/>
      <text x="43" y="48" font-size="4" fill="currentColor" stroke="none">E</text>
      <rect x="52" y="38" width="8" height="20" rx="1" fill="red" opacity="0.3"/>
      <text x="54" y="50" font-size="4" fill="currentColor" stroke="none">T</text>
    </svg>`
  },
  {
    id: 'medicinal-lipinski',
    name: "Lipinski's Rule of 5",
    domain: 'chemistry',
    category: 'optimization',
    tags: ['Lipinski', 'rule of 5', 'druglikeness', 'oral', 'bioavailability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="green" opacity="0.1"/>
      <text x="26" y="12" font-size="8" fill="currentColor" stroke="none">Ro5</text>
      <text x="8" y="28" font-size="4" fill="currentColor" stroke="none">MW ≤ 500</text>
      <text x="8" y="36" font-size="4" fill="currentColor" stroke="none">LogP ≤ 5</text>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">HBD ≤ 5</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">HBA ≤ 10</text>
      <circle cx="52" cy="26" r="3" fill="green"/>
      <circle cx="52" cy="34" r="3" fill="green"/>
      <circle cx="52" cy="42" r="3" fill="green"/>
      <circle cx="52" cy="50" r="3" fill="green"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Oral bioavailability</text>
    </svg>`
  },
  {
    id: 'medicinal-prodrug',
    name: 'Prodrug Strategy',
    domain: 'chemistry',
    category: 'optimization',
    tags: ['prodrug', 'inactive', 'activation', 'metabolism', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="16" height="24" rx="4" fill="gray" opacity="0.3"/>
      <text x="6" y="36" font-size="5" fill="currentColor" stroke="none">Pro</text>
      <rect x="8" y="28" width="8" height="8" fill="blue" opacity="0.5"/>
      <text x="10" y="34" font-size="4" fill="currentColor" stroke="none">D</text>
      <path d="M20 32 L32 32" stroke="green" marker-end="url(#arrow)"/>
      <text x="22" y="28" font-size="4" fill="green" stroke="none">Body</text>
      <circle cx="44" cy="32" r="10" fill="blue" opacity="0.3"/>
      <text x="38" y="36" font-size="5" fill="currentColor" stroke="none">Drug</text>
      <path d="M54 32 L60 32" marker-end="url(#arrow)"/>
      <text x="56" y="28" font-size="4" fill="red" stroke="none">Active</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Inactive → Active</text>
    </svg>`
  },
  {
    id: 'medicinal-metabolism',
    name: 'Drug Metabolism',
    domain: 'chemistry',
    category: 'optimization',
    tags: ['metabolism', 'CYP450', 'phase I', 'phase II', 'clearance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="blue" opacity="0.3"/>
      <text x="10" y="22" font-size="5" fill="currentColor" stroke="none">Drug</text>
      <path d="M24 20 L32 20" marker-end="url(#arrow)"/>
      <rect x="32" y="14" width="12" height="12" rx="2" fill="orange" opacity="0.3"/>
      <text x="34" y="22" font-size="4" fill="currentColor" stroke="none">CYP</text>
      <path d="M44 20 L52 20" marker-end="url(#arrow)"/>
      <circle cx="58" cy="20" r="4" fill="green" opacity="0.3"/>
      <text x="56" y="22" font-size="4" fill="currentColor" stroke="none">M</text>
      <text x="4" y="40" font-size="4" fill="currentColor" stroke="none">Phase I: Oxidation</text>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Phase II: Conjugation</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">→ Excretion</text>
    </svg>`
  },
  {
    id: 'medicinal-bioavailability',
    name: 'Bioavailability',
    domain: 'chemistry',
    category: 'optimization',
    tags: ['bioavailability', 'F%', 'oral', 'absorption', 'first pass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M12 48 C16 20, 24 12, 32 12 C40 12, 48 36, 52 48" stroke="blue" stroke-width="2" fill="blue" opacity="0.2"/>
      <path d="M12 48 C16 36, 24 28, 32 28 C40 28, 48 40, 52 48" stroke="green" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">Cp</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="40" y="18" font-size="4" fill="blue" stroke="none">IV</text>
      <text x="40" y="34" font-size="4" fill="green" stroke="none">Oral</text>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">F = AUC(oral)/AUC(iv)</text>
    </svg>`
  },
  {
    id: 'medicinal-lead-compound',
    name: 'Lead Compound',
    domain: 'chemistry',
    category: 'optimization',
    tags: ['lead', 'compound', 'optimization', 'series', 'SAR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="24" rx="4" fill="gold" opacity="0.3"/>
      <rect x="20" y="16" width="24" height="24" rx="4"/>
      <text x="26" y="32" font-size="6" fill="currentColor" stroke="none">Lead</text>
      <circle cx="16" cy="28" r="3" fill="red"/>
      <circle cx="48" cy="28" r="3" fill="blue"/>
      <circle cx="32" cy="44" r="3" fill="green"/>
      <circle cx="32" cy="12" r="3" fill="orange"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Potent</text>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Selective</text>
      <text x="36" y="54" font-size="4" fill="currentColor" stroke="none">Drug-like</text>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Optimizable</text>
    </svg>`
  },
];

export default medicinalIcons;
