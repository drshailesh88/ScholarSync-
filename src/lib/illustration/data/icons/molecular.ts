/**
 * Molecular Biology Icon Library
 * Comprehensive SVG icons for molecular biology
 *
 * Categories:
 * - DNA & RNA (structure, replication, transcription)
 * - Proteins (structure, synthesis, enzymes)
 * - Gene Expression (regulation, CRISPR, epigenetics)
 * - Laboratory Techniques (PCR, gel electrophoresis, sequencing)
 */

import type { IconDefinition } from './index';

export const molecularIcons: IconDefinition[] = [
  // ===========================================================================
  // DNA STRUCTURE & REPLICATION
  // ===========================================================================
  {
    id: 'mol-dna-helix',
    name: 'DNA Double Helix',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['DNA', 'double helix', 'nucleotides', 'base pairs', 'Watson-Crick'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c8 8 16 8 24 0"/>
      <path d="M20 20c8-8 16-8 24 0"/>
      <path d="M20 32c8 8 16 8 24 0"/>
      <path d="M20 44c8-8 16-8 24 0"/>
      <path d="M20 56c8 8 16 8 24 0"/>
      <line x1="20" y1="8" x2="20" y2="56"/>
      <line x1="44" y1="8" x2="44" y2="56"/>
      <line x1="24" y1="14" x2="40" y2="14" stroke-dasharray="2 2"/>
      <line x1="24" y1="26" x2="40" y2="26" stroke-dasharray="2 2"/>
      <line x1="24" y1="38" x2="40" y2="38" stroke-dasharray="2 2"/>
      <line x1="24" y1="50" x2="40" y2="50" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'mol-dna-replication',
    name: 'DNA Replication Fork',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['replication', 'fork', 'helicase', 'polymerase', 'leading strand', 'lagging strand'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48l24-24"/>
      <path d="M8 52l24-24"/>
      <path d="M32 24l24 24"/>
      <path d="M32 28l24 24"/>
      <path d="M32 24v-16"/>
      <path d="M28 8h8"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <text x="36" y="12" font-size="4" fill="currentColor" stroke="none">5'</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">3'</text>
      <text x="52" y="56" font-size="4" fill="currentColor" stroke="none">5'</text>
    </svg>`
  },
  {
    id: 'mol-nucleotide',
    name: 'Nucleotide Structure',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['nucleotide', 'base', 'sugar', 'phosphate', 'monomer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="10" fill="#FF6B6B" opacity="0.5"/>
      <text x="14" y="24" font-size="6" fill="currentColor" stroke="none">P</text>
      <pentagon cx="36" cy="32"/>
      <path d="M30 20l6 8"/>
      <rect x="40" y="36" width="16" height="12" rx="2" fill="#4ECDC4" opacity="0.5"/>
      <path d="M40 42h-4"/>
      <text x="44" y="46" font-size="5" fill="currentColor" stroke="none">Base</text>
      <path d="M32 40c-4 4-8 8-8 16"/>
    </svg>`
  },
  {
    id: 'mol-base-pairs',
    name: 'Base Pairing (A-T, G-C)',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['adenine', 'thymine', 'guanine', 'cytosine', 'hydrogen bonds', 'complementary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="20" rx="2" fill="#FF6B6B" opacity="0.4"/>
      <text x="8" y="22" font-size="8" fill="currentColor" stroke="none">A</text>
      <rect x="44" y="8" width="16" height="20" rx="2" fill="#45B7D1" opacity="0.4"/>
      <text x="49" y="22" font-size="8" fill="currentColor" stroke="none">T</text>
      <line x1="20" y1="16" x2="44" y2="16" stroke-dasharray="4 2"/>
      <line x1="20" y1="22" x2="44" y2="22" stroke-dasharray="4 2"/>
      <rect x="4" y="36" width="16" height="20" rx="2" fill="#96CEB4" opacity="0.4"/>
      <text x="8" y="50" font-size="8" fill="currentColor" stroke="none">G</text>
      <rect x="44" y="36" width="16" height="20" rx="2" fill="#FFEAA7" opacity="0.4"/>
      <text x="49" y="50" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="20" y1="42" x2="44" y2="42" stroke-dasharray="4 2"/>
      <line x1="20" y1="48" x2="44" y2="48" stroke-dasharray="4 2"/>
      <line x1="20" y1="54" x2="44" y2="54" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'mol-chromosome',
    name: 'Chromosome Structure',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['chromosome', 'chromatin', 'centromere', 'telomere', 'condensed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 0-8 4-8 8v12c0 4 4 4 8 4"/>
      <path d="M20 32c-4 0-8 0-8 4v12c0 4 4 8 8 8"/>
      <path d="M28 8c4 0 8 4 8 8v12c0 4-4 4-8 4"/>
      <path d="M28 32c4 0 8 0 8 4v12c0 4-4 8-8 8"/>
      <ellipse cx="24" cy="32" rx="8" ry="3" fill="currentColor" opacity="0.3"/>
      <text x="40" y="34" font-size="4" fill="currentColor" stroke="none">Centromere</text>
      <text x="40" y="12" font-size="4" fill="currentColor" stroke="none">p arm</text>
      <text x="40" y="54" font-size="4" fill="currentColor" stroke="none">q arm</text>
    </svg>`
  },

  // ===========================================================================
  // RNA TYPES & STRUCTURE
  // ===========================================================================
  {
    id: 'mol-mrna',
    name: 'Messenger RNA (mRNA)',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['mRNA', 'messenger RNA', 'transcript', 'codon', 'protein synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0"/>
      <circle cx="8" cy="32" r="3" fill="#FF6B6B"/>
      <text x="4" y="46" font-size="4" fill="currentColor" stroke="none">5' Cap</text>
      <circle cx="56" cy="32" r="6" fill="#4ECDC4" opacity="0.5"/>
      <text x="46" y="46" font-size="3" fill="currentColor" stroke="none">Poly-A tail</text>
      <rect x="20" y="20" width="24" height="6" fill="currentColor" opacity="0.2"/>
      <text x="24" y="18" font-size="4" fill="currentColor" stroke="none">AUG...UAA</text>
    </svg>`
  },
  {
    id: 'mol-trna',
    name: 'Transfer RNA (tRNA)',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['tRNA', 'transfer RNA', 'anticodon', 'amino acid', 'cloverleaf'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v8"/>
      <path d="M28 8h8"/>
      <ellipse cx="32" cy="24" rx="8" ry="6"/>
      <path d="M24 24h-8c-4 0-6 4-6 8s2 8 6 8h8"/>
      <path d="M40 24h8c4 0 6 4 6 8s-2 8-6 8h-8"/>
      <path d="M32 30v16"/>
      <ellipse cx="32" cy="52" rx="10" ry="6"/>
      <circle cx="32" cy="8" r="3" fill="#96CEB4"/>
      <text x="36" y="10" font-size="4" fill="currentColor" stroke="none">AA</text>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Anticodon</text>
    </svg>`
  },
  {
    id: 'mol-rrna',
    name: 'Ribosomal RNA (rRNA)',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['rRNA', 'ribosomal', 'ribosome', '28S', '18S', 'subunit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="12" fill="#DDA0DD" opacity="0.4"/>
      <ellipse cx="32" cy="44" rx="16" ry="10" fill="#87CEEB" opacity="0.4"/>
      <text x="24" y="28" font-size="5" fill="currentColor" stroke="none">60S</text>
      <text x="24" y="48" font-size="5" fill="currentColor" stroke="none">40S</text>
      <path d="M12 34h8"/>
      <path d="M44 34h8"/>
      <circle cx="8" cy="34" r="2" fill="currentColor"/>
      <circle cx="56" cy="34" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mol-splicing',
    name: 'RNA Splicing',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['splicing', 'intron', 'exon', 'spliceosome', 'pre-mRNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="12" height="8" fill="#4ECDC4" opacity="0.5"/>
      <rect x="20" y="12" width="12" height="8" fill="#FFB6C1" opacity="0.5"/>
      <rect x="36" y="12" width="12" height="8" fill="#4ECDC4" opacity="0.5"/>
      <rect x="52" y="12" width="8" height="8" fill="#FFB6C1" opacity="0.5"/>
      <text x="6" y="18" font-size="4" fill="currentColor" stroke="none">E1</text>
      <text x="24" y="18" font-size="4" fill="currentColor" stroke="none">I1</text>
      <text x="38" y="18" font-size="4" fill="currentColor" stroke="none">E2</text>
      <path d="M32 24v8"/>
      <path d="M28 32l8 0"/>
      <rect x="8" y="44" width="12" height="8" fill="#4ECDC4" opacity="0.5"/>
      <rect x="24" y="44" width="12" height="8" fill="#4ECDC4" opacity="0.5"/>
      <text x="10" y="50" font-size="4" fill="currentColor" stroke="none">E1</text>
      <text x="26" y="50" font-size="4" fill="currentColor" stroke="none">E2</text>
      <circle cx="52" cy="48" r="8" stroke-dasharray="2 2"/>
      <text x="48" y="52" font-size="4" fill="currentColor" stroke="none">I1</text>
    </svg>`
  },

  // ===========================================================================
  // PROTEINS & ENZYMES
  // ===========================================================================
  {
    id: 'mol-protein-primary',
    name: 'Primary Structure',
    domain: 'biology',
    category: 'proteins',
    tags: ['primary structure', 'amino acid', 'peptide bond', 'sequence', 'polypeptide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="22" cy="32" r="6" fill="#4ECDC4" opacity="0.5"/>
      <circle cx="36" cy="32" r="6" fill="#45B7D1" opacity="0.5"/>
      <circle cx="50" cy="32" r="6" fill="#96CEB4" opacity="0.5"/>
      <line x1="14" y1="32" x2="16" y2="32"/>
      <line x1="28" y1="32" x2="30" y2="32"/>
      <line x1="42" y1="32" x2="44" y2="32"/>
      <line x1="56" y1="32" x2="60" y2="32"/>
      <line x1="2" y1="32" x2="2" y2="32"/>
      <text x="4" y="46" font-size="4" fill="currentColor" stroke="none">Met</text>
      <text x="18" y="46" font-size="4" fill="currentColor" stroke="none">Ala</text>
      <text x="32" y="46" font-size="4" fill="currentColor" stroke="none">Gly</text>
      <text x="46" y="46" font-size="4" fill="currentColor" stroke="none">Leu</text>
      <text x="24" y="20" font-size="5" fill="currentColor" stroke="none">N-terminus</text>
    </svg>`
  },
  {
    id: 'mol-protein-secondary',
    name: 'Secondary Structure',
    domain: 'biology',
    category: 'proteins',
    tags: ['secondary structure', 'alpha helix', 'beta sheet', 'hydrogen bonds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c0 8 8 8 8 16s-8 8-8 16 8 8 8 16" stroke-width="2"/>
      <path d="M36 8v48" stroke-width="2"/>
      <path d="M44 8v48" stroke-width="2"/>
      <path d="M52 8v48" stroke-width="2"/>
      <line x1="36" y1="16" x2="52" y2="16" stroke-dasharray="2 2"/>
      <line x1="36" y1="32" x2="52" y2="32" stroke-dasharray="2 2"/>
      <line x1="36" y1="48" x2="52" y2="48" stroke-dasharray="2 2"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Alpha</text>
      <text x="38" y="58" font-size="4" fill="currentColor" stroke="none">Beta</text>
    </svg>`
  },
  {
    id: 'mol-protein-tertiary',
    name: 'Tertiary Structure',
    domain: 'biology',
    category: 'proteins',
    tags: ['tertiary structure', 'folding', '3D structure', 'domains', 'globular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 0 16 4 20 12s-4 16-12 20-16-4-16-12 4-16 8-20z" fill="currentColor" opacity="0.1"/>
      <path d="M20 12c4 4 12 8 16 16"/>
      <path d="M36 28c-4 8-12 12-20 8"/>
      <path d="M16 36c4-8 8-16 16-12"/>
      <circle cx="16" cy="16" r="3" fill="#FF6B6B"/>
      <circle cx="48" cy="48" r="3" fill="#4ECDC4"/>
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none">N</text>
      <text x="52" y="52" font-size="4" fill="currentColor" stroke="none">C</text>
    </svg>`
  },
  {
    id: 'mol-enzyme',
    name: 'Enzyme-Substrate Complex',
    domain: 'biology',
    category: 'proteins',
    tags: ['enzyme', 'substrate', 'active site', 'catalysis', 'lock and key'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-12 8-20 20-20h4c12 0 20 8 20 20s-8 20-20 20h-4c-12 0-20-8-20-20z" fill="currentColor" opacity="0.1"/>
      <path d="M28 20v-8h8v8"/>
      <path d="M28 20c0 4 8 4 8 0"/>
      <rect x="30" y="6" width="4" height="8" fill="#FF6B6B" opacity="0.5"/>
      <text x="26" y="4" font-size="4" fill="currentColor" stroke="none">Substrate</text>
      <text x="20" y="40" font-size="4" fill="currentColor" stroke="none">Active Site</text>
      <text x="44" y="28" font-size="4" fill="currentColor" stroke="none">Enzyme</text>
    </svg>`
  },
  {
    id: 'mol-dna-polymerase',
    name: 'DNA Polymerase',
    domain: 'biology',
    category: 'proteins',
    tags: ['DNA polymerase', 'replication', 'synthesis', 'proofreading', 'enzyme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#4ECDC4" opacity="0.3"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <path d="M8 28h8"/>
      <path d="M8 36h8"/>
      <path d="M48 28h8"/>
      <path d="M48 36h8"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="28" y="36" font-size="4" fill="currentColor" stroke="none">Pol</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Template</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">New</text>
    </svg>`
  },

  // ===========================================================================
  // GENE EXPRESSION & REGULATION
  // ===========================================================================
  {
    id: 'mol-transcription',
    name: 'Transcription Process',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['transcription', 'RNA polymerase', 'promoter', 'template', 'mRNA synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <line x1="4" y1="36" x2="60" y2="36"/>
      <ellipse cx="32" cy="34" rx="12" ry="16" fill="#DDA0DD" opacity="0.3"/>
      <path d="M32 18c4 4 8 8 16 8" stroke="#FF6B6B"/>
      <text x="50" y="24" font-size="4" fill="currentColor" stroke="none">mRNA</text>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">RNAP</text>
      <path d="M8 28v-8h12"/>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">Promoter</text>
    </svg>`
  },
  {
    id: 'mol-translation',
    name: 'Translation Process',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['translation', 'ribosome', 'mRNA', 'tRNA', 'protein synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40c8-4 16 4 24 0s16 4 24 0"/>
      <ellipse cx="32" cy="28" rx="16" ry="10" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="12" ry="6" fill="#DDA0DD" opacity="0.3"/>
      <path d="M24 28v-12"/>
      <path d="M32 28v-14"/>
      <path d="M40 28v-10"/>
      <circle cx="24" cy="12" r="3" fill="#96CEB4"/>
      <circle cx="32" cy="10" r="3" fill="#FF6B6B"/>
      <circle cx="40" cy="14" r="3" fill="#4ECDC4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">mRNA</text>
      <text x="44" y="12" font-size="3" fill="currentColor" stroke="none">Peptide</text>
    </svg>`
  },
  {
    id: 'mol-promoter',
    name: 'Promoter Region',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['promoter', 'TATA box', 'transcription factor', 'regulatory', 'upstream'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32" stroke-width="2"/>
      <rect x="8" y="28" width="12" height="8" fill="#FF6B6B" opacity="0.4"/>
      <rect x="24" y="28" width="8" height="8" fill="#4ECDC4" opacity="0.4"/>
      <rect x="36" y="28" width="20" height="8" fill="#96CEB4" opacity="0.4"/>
      <text x="8" y="26" font-size="3" fill="currentColor" stroke="none">-35 box</text>
      <text x="22" y="26" font-size="3" fill="currentColor" stroke="none">TATA</text>
      <text x="40" y="26" font-size="3" fill="currentColor" stroke="none">TSS +1</text>
      <path d="M44 28l4-8 4 8"/>
      <text x="46" y="16" font-size="3" fill="currentColor" stroke="none">+1</text>
    </svg>`
  },
  {
    id: 'mol-operon',
    name: 'Operon Structure',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['operon', 'lac operon', 'operator', 'repressor', 'gene regulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="40" x2="60" y2="40" stroke-width="2"/>
      <rect x="4" y="36" width="8" height="8" fill="#DDA0DD" opacity="0.5"/>
      <rect x="16" y="36" width="6" height="8" fill="#FF6B6B" opacity="0.5"/>
      <rect x="26" y="36" width="10" height="8" fill="#4ECDC4" opacity="0.5"/>
      <rect x="40" y="36" width="10" height="8" fill="#4ECDC4" opacity="0.5"/>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="16" y="34" font-size="3" fill="currentColor" stroke="none">O</text>
      <text x="26" y="34" font-size="3" fill="currentColor" stroke="none">Gene 1</text>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">Gene 2</text>
      <ellipse cx="19" cy="24" rx="6" ry="4" fill="#FFEAA7" opacity="0.5"/>
      <text x="14" y="26" font-size="3" fill="currentColor" stroke="none">Rep</text>
    </svg>`
  },
  {
    id: 'mol-crispr',
    name: 'CRISPR-Cas9 System',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['CRISPR', 'Cas9', 'gene editing', 'guide RNA', 'PAM', 'genome engineering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="28" x2="60" y2="28"/>
      <line x1="4" y1="36" x2="60" y2="36"/>
      <ellipse cx="32" cy="32" rx="14" ry="18" fill="#9B59B6" opacity="0.3"/>
      <path d="M24 28c-4-8-4-16 4-20" stroke="#FF6B6B"/>
      <text x="30" y="8" font-size="3" fill="currentColor" stroke="none">gRNA</text>
      <rect x="44" y="26" width="8" height="12" fill="#F39C12" opacity="0.5"/>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">PAM</text>
      <text x="26" y="48" font-size="4" fill="currentColor" stroke="none">Cas9</text>
      <path d="M32 18v-4"/>
      <path d="M32 46v4"/>
    </svg>`
  },
  {
    id: 'mol-epigenetics',
    name: 'Epigenetic Modifications',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['epigenetics', 'methylation', 'acetylation', 'histone', 'chromatin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="24" r="8" fill="#4ECDC4" opacity="0.4"/>
      <circle cx="32" cy="24" r="8" fill="#4ECDC4" opacity="0.4"/>
      <circle cx="48" cy="24" r="8" fill="#4ECDC4" opacity="0.4"/>
      <path d="M8 32c8 4 16 4 24 0s16 4 24 0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3" fill="#FF6B6B"/>
      <circle cx="32" cy="16" r="3" fill="#96CEB4"/>
      <text x="10" y="10" font-size="3" fill="currentColor" stroke="none">Me</text>
      <text x="26" y="10" font-size="3" fill="currentColor" stroke="none">Ac</text>
      <text x="10" y="50" font-size="4" fill="currentColor" stroke="none">Histones</text>
      <text x="40" y="50" font-size="4" fill="currentColor" stroke="none">DNA</text>
    </svg>`
  },

  // ===========================================================================
  // LABORATORY TECHNIQUES
  // ===========================================================================
  {
    id: 'mol-pcr',
    name: 'PCR Amplification',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['PCR', 'amplification', 'primers', 'thermal cycling', 'Taq polymerase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="8" x2="56" y2="8"/>
      <line x1="8" y1="12" x2="56" y2="12"/>
      <text x="28" y="6" font-size="3" fill="currentColor" stroke="none">1x</text>
      <line x1="8" y1="24" x2="28" y2="24"/>
      <line x1="8" y1="28" x2="28" y2="28"/>
      <line x1="36" y1="24" x2="56" y2="24"/>
      <line x1="36" y1="28" x2="56" y2="28"/>
      <text x="28" y="22" font-size="3" fill="currentColor" stroke="none">2x</text>
      <line x1="8" y1="40" x2="18" y2="40"/>
      <line x1="8" y1="44" x2="18" y2="44"/>
      <line x1="24" y1="40" x2="34" y2="40"/>
      <line x1="24" y1="44" x2="34" y2="44"/>
      <line x1="40" y1="40" x2="50" y2="40"/>
      <line x1="40" y1="44" x2="50" y2="44"/>
      <text x="28" y="38" font-size="3" fill="currentColor" stroke="none">4x</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Cycles</text>
    </svg>`
  },
  {
    id: 'mol-gel-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['gel electrophoresis', 'agarose', 'DNA separation', 'bands', 'ladder'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="8" height="3" fill="currentColor"/>
      <rect x="24" y="12" width="8" height="3" fill="currentColor"/>
      <rect x="36" y="12" width="8" height="3" fill="currentColor"/>
      <rect x="12" y="20" width="8" height="2" fill="currentColor" opacity="0.8"/>
      <rect x="12" y="28" width="8" height="2" fill="currentColor" opacity="0.6"/>
      <rect x="12" y="36" width="8" height="2" fill="currentColor" opacity="0.4"/>
      <rect x="24" y="32" width="8" height="3" fill="#4ECDC4"/>
      <rect x="36" y="24" width="8" height="3" fill="#4ECDC4"/>
      <rect x="36" y="40" width="8" height="3" fill="#4ECDC4"/>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="24" y="52" font-size="4" fill="currentColor" stroke="none">S1</text>
      <text x="36" y="52" font-size="4" fill="currentColor" stroke="none">S2</text>
      <text x="52" y="16" font-size="3" fill="currentColor" stroke="none">-</text>
      <text x="52" y="52" font-size="3" fill="currentColor" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'mol-western-blot',
    name: 'Western Blot',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['western blot', 'protein detection', 'antibody', 'immunoblot', 'SDS-PAGE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="16" width="6" height="3" fill="currentColor" opacity="0.8"/>
      <rect x="12" y="28" width="6" height="2" fill="currentColor" opacity="0.5"/>
      <rect x="12" y="40" width="6" height="2" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="24" width="6" height="4" fill="#FF6B6B"/>
      <rect x="36" y="24" width="6" height="4" fill="#FF6B6B" opacity="0.7"/>
      <rect x="48" y="24" width="4" height="4" fill="#FF6B6B" opacity="0.4"/>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">MW</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Ctrl</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">Exp</text>
    </svg>`
  },
  {
    id: 'mol-sequencing',
    name: 'DNA Sequencing',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['sequencing', 'Sanger', 'NGS', 'chromatogram', 'nucleotide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2"/>
      <path d="M8 40c4-16 4-16 8 0" stroke="#27AE60" stroke-width="2"/>
      <path d="M16 40c4-12 4-12 8 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M24 40c4-20 4-20 8 0" stroke="#E74C3C" stroke-width="2"/>
      <path d="M32 40c4-8 4-8 8 0" stroke="#F1C40F" stroke-width="2"/>
      <path d="M40 40c4-14 4-14 8 0" stroke="#27AE60" stroke-width="2"/>
      <path d="M48 40c4-18 4-18 8 0" stroke="#3498DB" stroke-width="2"/>
      <text x="10" y="52" font-size="4" fill="#27AE60" stroke="none">A</text>
      <text x="18" y="52" font-size="4" fill="#3498DB" stroke="none">C</text>
      <text x="26" y="52" font-size="4" fill="#E74C3C" stroke="none">T</text>
      <text x="34" y="52" font-size="4" fill="#F1C40F" stroke="none">G</text>
      <text x="42" y="52" font-size="4" fill="#27AE60" stroke="none">A</text>
      <text x="50" y="52" font-size="4" fill="#3498DB" stroke="none">C</text>
    </svg>`
  },
  {
    id: 'mol-cloning',
    name: 'Molecular Cloning',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['cloning', 'plasmid', 'vector', 'insert', 'restriction enzyme', 'ligation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="14"/>
      <rect x="16" y="28" width="8" height="8" fill="#FF6B6B" opacity="0.5"/>
      <text x="17" y="34" font-size="4" fill="currentColor" stroke="none">ori</text>
      <circle cx="20" cy="18" r="3" fill="#4ECDC4"/>
      <text x="26" y="20" font-size="3" fill="currentColor" stroke="none">Amp</text>
      <rect x="40" y="28" width="16" height="8" fill="#96CEB4" opacity="0.5"/>
      <text x="42" y="34" font-size="4" fill="currentColor" stroke="none">Insert</text>
      <path d="M34 32h6" stroke-dasharray="2 2"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Vector</text>
    </svg>`
  },

  // ===========================================================================
  // ADVANCED DNA/RNA STRUCTURES
  // ===========================================================================
  {
    id: 'mol-telomere',
    name: 'Telomere Structure',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['telomere', 'telomerase', 'chromosome end', 'TTAGGG', 'aging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h32"/>
      <path d="M8 36h32"/>
      <path d="M40 28c8 0 16-4 16-8"/>
      <path d="M40 36c4 0 8 2 10 4"/>
      <circle cx="56" cy="20" r="4" fill="#FF6B6B" opacity="0.3"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">5'</text>
      <text x="4" y="44" font-size="4" fill="currentColor" stroke="none">3'</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">T-loop</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">TTAGGG repeats</text>
    </svg>`
  },
  {
    id: 'mol-g-quadruplex',
    name: 'G-Quadruplex',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['G-quadruplex', 'G4', 'guanine', 'secondary structure', 'telomere'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <circle cx="24" cy="24" r="4" fill="#F39C12" opacity="0.5"/>
      <circle cx="40" cy="24" r="4" fill="#F39C12" opacity="0.5"/>
      <circle cx="24" cy="40" r="4" fill="#F39C12" opacity="0.5"/>
      <circle cx="40" cy="40" r="4" fill="#F39C12" opacity="0.5"/>
      <line x1="28" y1="24" x2="36" y2="24" stroke-dasharray="2 2"/>
      <line x1="24" y1="28" x2="24" y2="36" stroke-dasharray="2 2"/>
      <line x1="40" y1="28" x2="40" y2="36" stroke-dasharray="2 2"/>
      <line x1="28" y1="40" x2="36" y2="40" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="4" fill="#4ECDC4" opacity="0.3"/>
      <text x="28" y="34" font-size="4" fill="currentColor" stroke="none">K+</text>
    </svg>`
  },
  {
    id: 'mol-hairpin',
    name: 'Hairpin Loop',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['hairpin', 'stem-loop', 'secondary structure', 'RNA folding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56v-24"/>
      <path d="M40 56v-24"/>
      <path d="M24 32c0-12 16-12 16 0"/>
      <line x1="28" y1="40" x2="36" y2="40" stroke-dasharray="2 2"/>
      <line x1="28" y1="48" x2="36" y2="48" stroke-dasharray="2 2"/>
      <circle cx="32" cy="20" r="8" stroke-dasharray="2 2"/>
      <text x="28" y="22" font-size="4" fill="currentColor" stroke="none">Loop</text>
      <text x="14" y="46" font-size="3" fill="currentColor" stroke="none">Stem</text>
    </svg>`
  },
  {
    id: 'mol-pseudoknot',
    name: 'RNA Pseudoknot',
    domain: 'biology',
    category: 'rna-structure',
    tags: ['pseudoknot', 'RNA structure', 'tertiary structure', 'riboswitch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40h16"/>
      <path d="M40 40h16"/>
      <path d="M24 40c0-16 16-16 16 0"/>
      <path d="M16 40c0-24 32-24 32 0"/>
      <circle cx="16" cy="40" r="3" fill="#E74C3C" opacity="0.5"/>
      <circle cx="48" cy="40" r="3" fill="#E74C3C" opacity="0.5"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Pseudoknot</text>
    </svg>`
  },
  {
    id: 'mol-origin-replication',
    name: 'Origin of Replication',
    domain: 'biology',
    category: 'dna-structure',
    tags: ['origin', 'ORC', 'replication initiation', 'ARS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="24" cy="32" r="4" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="40" cy="32" r="4" fill="#FF6B6B" opacity="0.5"/>
      <text x="20" y="28" font-size="3" fill="currentColor" stroke="none">ORC</text>
      <text x="36" y="28" font-size="3" fill="currentColor" stroke="none">ORC</text>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">oriC</text>
    </svg>`
  },

  // ===========================================================================
  // REPLICATION ENZYMES
  // ===========================================================================
  {
    id: 'mol-helicase',
    name: 'Helicase',
    domain: 'biology',
    category: 'enzymes',
    tags: ['helicase', 'unwinding', 'replication', 'ATP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="#E74C3C" opacity="0.3"/>
      <path d="M8 28h12"/>
      <path d="M8 36h12"/>
      <path d="M44 24l12-8"/>
      <path d="M44 40l12 8"/>
      <text x="26" y="36" font-size="5" fill="currentColor" stroke="none">Hel</text>
      <circle cx="52" cy="32" r="6" stroke-dasharray="2 2"/>
      <text x="48" y="34" font-size="4" fill="currentColor" stroke="none">ATP</text>
    </svg>`
  },
  {
    id: 'mol-primase',
    name: 'Primase',
    domain: 'biology',
    category: 'enzymes',
    tags: ['primase', 'primer', 'RNA primer', 'replication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="10" ry="8" fill="#F39C12" opacity="0.3"/>
      <path d="M8 40h48"/>
      <rect x="24" y="36" width="16" height="4" fill="#E74C3C" opacity="0.5"/>
      <text x="22" y="32" font-size="5" fill="currentColor" stroke="none">Prim</text>
      <text x="26" y="48" font-size="4" fill="currentColor" stroke="none">Primer</text>
    </svg>`
  },
  {
    id: 'mol-ligase',
    name: 'DNA Ligase',
    domain: 'biology',
    category: 'enzymes',
    tags: ['ligase', 'ligation', 'nick sealing', 'ATP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h20"/>
      <path d="M36 28h20"/>
      <path d="M8 36h20"/>
      <path d="M36 36h20"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#9B59B6" opacity="0.3"/>
      <path d="M28 32h8" stroke-width="2"/>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">Ligase</text>
    </svg>`
  },
  {
    id: 'mol-topoisomerase',
    name: 'Topoisomerase',
    domain: 'biology',
    category: 'enzymes',
    tags: ['topoisomerase', 'supercoiling', 'gyrase', 'DNA topology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 8-8 16 0 24s-8 8 0 16"/>
      <path d="M48 16c-8 8 8 16 0 24s8 8 0 16"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#1ABC9C" opacity="0.3"/>
      <text x="26" y="36" font-size="5" fill="currentColor" stroke="none">Topo</text>
    </svg>`
  },
  {
    id: 'mol-ssb',
    name: 'Single-Strand Binding Protein',
    domain: 'biology',
    category: 'enzymes',
    tags: ['SSB', 'single-strand', 'replication', 'stabilization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 16 8 24 0s16 8 24 0"/>
      <circle cx="20" cy="28" r="6" fill="#3498DB" opacity="0.4"/>
      <circle cx="32" cy="36" r="6" fill="#3498DB" opacity="0.4"/>
      <circle cx="44" cy="28" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">SSB proteins</text>
    </svg>`
  },
  {
    id: 'mol-sliding-clamp',
    name: 'Sliding Clamp (PCNA)',
    domain: 'biology',
    category: 'enzymes',
    tags: ['PCNA', 'sliding clamp', 'processivity', 'replication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#8E44AD" opacity="0.2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">PCNA</text>
    </svg>`
  },

  // ===========================================================================
  // TRANSCRIPTION MACHINERY
  // ===========================================================================
  {
    id: 'mol-rnap-ii',
    name: 'RNA Polymerase II',
    domain: 'biology',
    category: 'transcription',
    tags: ['RNA polymerase II', 'Pol II', 'transcription', 'CTD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="16" ry="12" fill="#9B59B6" opacity="0.3"/>
      <path d="M8 40h48"/>
      <path d="M8 44h48"/>
      <path d="M40 28c8-8 16-8 16 0"/>
      <text x="22" y="32" font-size="5" fill="currentColor" stroke="none">Pol II</text>
      <text x="48" y="18" font-size="3" fill="currentColor" stroke="none">mRNA</text>
      <circle cx="20" cy="48" r="4" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">CTD</text>
    </svg>`
  },
  {
    id: 'mol-tfiid',
    name: 'TFIID Complex',
    domain: 'biology',
    category: 'transcription',
    tags: ['TFIID', 'TBP', 'TATA binding', 'transcription factor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="36" width="32" height="8" fill="#F39C12" opacity="0.5"/>
      <text x="24" y="43" font-size="4" fill="currentColor" stroke="none">TATA</text>
      <ellipse cx="32" cy="24" rx="16" ry="10" fill="#27AE60" opacity="0.3"/>
      <text x="22" y="28" font-size="5" fill="currentColor" stroke="none">TFIID</text>
      <circle cx="32" cy="28" r="6"/>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">TBP</text>
    </svg>`
  },
  {
    id: 'mol-mediator',
    name: 'Mediator Complex',
    domain: 'biology',
    category: 'transcription',
    tags: ['mediator', 'coactivator', 'transcription regulation', 'enhancer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="24" cy="28" rx="8" ry="6" fill="#E74C3C" opacity="0.4"/>
      <ellipse cx="40" cy="36" rx="8" ry="6" fill="#27AE60" opacity="0.4"/>
      <ellipse cx="32" cy="24" rx="6" ry="4" fill="#F39C12" opacity="0.4"/>
      <text x="18" y="52" font-size="4" fill="currentColor" stroke="none">Mediator</text>
    </svg>`
  },
  {
    id: 'mol-enhancer',
    name: 'Enhancer Element',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['enhancer', 'cis-regulatory', 'transcription factor', 'activation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="40" x2="60" y2="40"/>
      <rect x="8" y="36" width="12" height="8" fill="#27AE60" opacity="0.5"/>
      <rect x="44" y="36" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <path d="M20 40c8-16 16-16 24 0" stroke-dasharray="4 2"/>
      <text x="28" y="20" font-size="4" fill="currentColor" stroke="none">Loop</text>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Enhancer</text>
      <text x="44" y="54" font-size="3" fill="currentColor" stroke="none">Promoter</text>
    </svg>`
  },
  {
    id: 'mol-silencer',
    name: 'Silencer Element',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['silencer', 'repression', 'transcription factor', 'cis-regulatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="40" x2="60" y2="40"/>
      <rect x="8" y="36" width="12" height="8" fill="#E74C3C" opacity="0.5"/>
      <rect x="44" y="36" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <path d="M20 40h24"/>
      <line x1="32" y1="32" x2="32" y2="48" stroke-width="2"/>
      <line x1="26" y1="36" x2="38" y2="44"/>
      <text x="8" y="54" font-size="3" fill="currentColor" stroke="none">Silencer</text>
      <text x="44" y="54" font-size="3" fill="currentColor" stroke="none">Promoter</text>
    </svg>`
  },

  // ===========================================================================
  // RIBOSOME AND TRANSLATION
  // ===========================================================================
  {
    id: 'mol-ribosome-detailed',
    name: 'Ribosome (Detailed)',
    domain: 'biology',
    category: 'translation',
    tags: ['ribosome', '40S', '60S', 'translation', 'protein synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="10" fill="#DDA0DD" opacity="0.4"/>
      <ellipse cx="32" cy="38" rx="16" ry="8" fill="#87CEEB" opacity="0.4"/>
      <text x="24" y="24" font-size="5" fill="currentColor" stroke="none">60S</text>
      <text x="24" y="42" font-size="5" fill="currentColor" stroke="none">40S</text>
      <rect x="20" y="28" width="8" height="6" stroke-dasharray="2 2"/>
      <rect x="28" y="28" width="8" height="6" stroke-dasharray="2 2"/>
      <rect x="36" y="28" width="8" height="6" stroke-dasharray="2 2"/>
      <text x="22" y="54" font-size="3" fill="currentColor" stroke="none">E</text>
      <text x="30" y="54" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="38" y="54" font-size="3" fill="currentColor" stroke="none">A</text>
    </svg>`
  },
  {
    id: 'mol-trna-detailed',
    name: 'tRNA (Detailed)',
    domain: 'biology',
    category: 'translation',
    tags: ['tRNA', 'cloverleaf', 'anticodon', 'amino acid', 'aminoacyl'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v8"/>
      <circle cx="32" cy="6" r="4" fill="#96CEB4"/>
      <text x="38" y="8" font-size="3" fill="currentColor" stroke="none">AA</text>
      <ellipse cx="32" cy="20" rx="6" ry="4"/>
      <path d="M20 20c-6 4-8 8-4 12"/>
      <path d="M44 20c6 4 8 8 4 12"/>
      <ellipse cx="16" cy="28" rx="6" ry="4"/>
      <ellipse cx="48" cy="28" rx="6" ry="4"/>
      <path d="M32 24v20"/>
      <ellipse cx="32" cy="52" rx="10" ry="6" fill="#E74C3C" opacity="0.3"/>
      <text x="22" y="54" font-size="4" fill="currentColor" stroke="none">Anticodon</text>
    </svg>`
  },
  {
    id: 'mol-polysome',
    name: 'Polysome',
    domain: 'biology',
    category: 'translation',
    tags: ['polysome', 'polyribosome', 'mRNA', 'translation', 'efficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c8-4 16 4 24 0s16 4 24 0"/>
      <ellipse cx="16" cy="32" rx="6" ry="8" fill="#87CEEB" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#87CEEB" opacity="0.4"/>
      <ellipse cx="48" cy="32" rx="6" ry="8" fill="#87CEEB" opacity="0.4"/>
      <path d="M16 24v-8"/>
      <path d="M32 24v-12"/>
      <path d="M48 24v-16"/>
      <text x="16" y="54" font-size="3" fill="currentColor" stroke="none">mRNA</text>
    </svg>`
  },
  {
    id: 'mol-eif4e',
    name: 'Cap-Binding Complex (eIF4E)',
    domain: 'biology',
    category: 'translation',
    tags: ['eIF4E', 'cap binding', 'translation initiation', 'mRNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="#F39C12" opacity="0.5"/>
      <text x="12" y="34" font-size="4" fill="currentColor" stroke="none">Cap</text>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="#27AE60" opacity="0.3"/>
      <text x="24" y="34" font-size="4" fill="currentColor" stroke="none">eIF4E</text>
      <path d="M42 32c8-4 8 8 16 0"/>
      <text x="48" y="48" font-size="3" fill="currentColor" stroke="none">mRNA</text>
    </svg>`
  },

  // ===========================================================================
  // CRISPR AND GENE EDITING
  // ===========================================================================
  {
    id: 'mol-cas9-detailed',
    name: 'Cas9 Protein (Detailed)',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['Cas9', 'CRISPR', 'nuclease', 'HNH', 'RuvC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="24" cy="28" rx="8" ry="6" fill="#E74C3C" opacity="0.4"/>
      <text x="20" y="30" font-size="4" fill="currentColor" stroke="none">HNH</text>
      <ellipse cx="40" cy="36" rx="8" ry="6" fill="#27AE60" opacity="0.4"/>
      <text x="34" y="38" font-size="4" fill="currentColor" stroke="none">RuvC</text>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <text x="22" y="54" font-size="4" fill="currentColor" stroke="none">Cas9</text>
    </svg>`
  },
  {
    id: 'mol-sgrna',
    name: 'Single Guide RNA (sgRNA)',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['sgRNA', 'guide RNA', 'CRISPR', 'spacer', 'scaffold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="24" height="8" fill="#E74C3C" opacity="0.4"/>
      <text x="12" y="35" font-size="4" fill="currentColor" stroke="none">Spacer</text>
      <path d="M32 32c4-8 12-8 16 0"/>
      <path d="M48 32c4 8 4 16 0 20"/>
      <path d="M48 52c-8 0-12-4-8-12"/>
      <text x="50" y="36" font-size="3" fill="currentColor" stroke="none">Scaffold</text>
    </svg>`
  },
  {
    id: 'mol-pam',
    name: 'PAM Sequence',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['PAM', 'NGG', 'CRISPR', 'target recognition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="28" x2="56" y2="28"/>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <rect x="40" y="24" width="12" height="16" fill="#F39C12" opacity="0.5"/>
      <text x="42" y="34" font-size="5" fill="currentColor" stroke="none">NGG</text>
      <text x="42" y="50" font-size="4" fill="currentColor" stroke="none">PAM</text>
      <path d="M36 32h-16"/>
      <text x="16" y="50" font-size="3" fill="currentColor" stroke="none">Target site</text>
    </svg>`
  },
  {
    id: 'mol-nhej',
    name: 'NHEJ Repair',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['NHEJ', 'repair', 'indel', 'knockout'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h20"/>
      <path d="M36 16h20"/>
      <path d="M8 20h20"/>
      <path d="M36 20h20"/>
      <path d="M28 18v28"/>
      <path d="M36 18v28"/>
      <path d="M8 52h48"/>
      <rect x="24" y="48" width="16" height="8" fill="#95A5A6" opacity="0.5"/>
      <text x="26" y="56" font-size="4" fill="currentColor" stroke="none">Indel</text>
      <text x="20" y="38" font-size="4" fill="currentColor" stroke="none">NHEJ</text>
    </svg>`
  },
  {
    id: 'mol-hdr',
    name: 'HDR Repair',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['HDR', 'homology directed repair', 'template', 'knock-in'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12h48"/>
      <path d="M8 16h48"/>
      <rect x="24" y="8" width="16" height="12" stroke-dasharray="2 2"/>
      <path d="M8 28h16"/>
      <rect x="24" y="24" width="16" height="8" fill="#27AE60" opacity="0.5"/>
      <path d="M40 28h16"/>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">Insert</text>
      <path d="M32 36v8"/>
      <path d="M8 48h48"/>
      <rect x="24" y="44" width="16" height="8" fill="#27AE60" opacity="0.5"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">HDR</text>
    </svg>`
  },
  {
    id: 'mol-base-editor',
    name: 'Base Editor',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['base editing', 'CBE', 'ABE', 'deaminase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="16" ry="12" fill="#9B59B6" opacity="0.2"/>
      <circle cx="24" cy="28" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="20" y="30" font-size="4" fill="currentColor" stroke="none">DA</text>
      <path d="M8 44h48"/>
      <circle cx="32" cy="44" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 40v-8"/>
      <text x="36" y="40" font-size="3" fill="currentColor" stroke="none">C to T</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Base Editor</text>
    </svg>`
  },
  {
    id: 'mol-prime-editor',
    name: 'Prime Editor',
    domain: 'biology',
    category: 'gene-editing',
    tags: ['prime editing', 'pegRNA', 'reverse transcriptase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="28" rx="16" ry="12" fill="#9B59B6" opacity="0.2"/>
      <circle cx="40" cy="24" r="8" fill="#E74C3C" opacity="0.3"/>
      <text x="36" y="26" font-size="4" fill="currentColor" stroke="none">RT</text>
      <path d="M8 44h48"/>
      <path d="M48 24c8 8 4 16-4 20"/>
      <text x="50" y="36" font-size="3" fill="currentColor" stroke="none">pegRNA</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Prime Editor</text>
    </svg>`
  },

  // ===========================================================================
  // EPIGENETICS
  // ===========================================================================
  {
    id: 'mol-nucleosome',
    name: 'Nucleosome Structure',
    domain: 'biology',
    category: 'epigenetics',
    tags: ['nucleosome', 'histone', 'octamer', 'chromatin', '147 bp'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#4ECDC4" opacity="0.4"/>
      <path d="M8 32c12-12 12 12 24 0"/>
      <path d="M32 32c12-12 12 12 24 0"/>
      <circle cx="26" cy="28" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="38" cy="28" r="4" fill="#27AE60" opacity="0.5"/>
      <circle cx="26" cy="36" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="38" cy="36" r="4" fill="#F39C12" opacity="0.5"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Nucleosome</text>
    </svg>`
  },
  {
    id: 'mol-histone-tails',
    name: 'Histone Tails',
    domain: 'biology',
    category: 'epigenetics',
    tags: ['histone tail', 'modification', 'acetylation', 'methylation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="12" fill="#4ECDC4" opacity="0.3"/>
      <path d="M24 24v-12"/>
      <path d="M32 24v-16"/>
      <path d="M40 24v-12"/>
      <circle cx="24" cy="10" r="3" fill="#27AE60"/>
      <circle cx="32" cy="6" r="3" fill="#E74C3C"/>
      <circle cx="40" cy="10" r="3" fill="#F39C12"/>
      <text x="18" y="8" font-size="3" fill="currentColor" stroke="none">Ac</text>
      <text x="28" y="4" font-size="3" fill="currentColor" stroke="none">Me</text>
      <text x="38" y="8" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Histone Tails</text>
    </svg>`
  },
  {
    id: 'mol-cpg-island',
    name: 'CpG Island',
    domain: 'biology',
    category: 'epigenetics',
    tags: ['CpG', 'island', 'methylation', 'promoter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32"/>
      <rect x="16" y="24" width="32" height="16" fill="#3498DB" opacity="0.2"/>
      <circle cx="20" cy="32" r="3" fill="#3498DB"/>
      <circle cx="28" cy="32" r="3" fill="#3498DB"/>
      <circle cx="36" cy="32" r="3" fill="#3498DB"/>
      <circle cx="44" cy="32" r="3" fill="#3498DB"/>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">CpG</text>
      <text x="20" y="56" font-size="3" fill="currentColor" stroke="none">Island</text>
    </svg>`
  },
  {
    id: 'mol-dnmt',
    name: 'DNA Methyltransferase',
    domain: 'biology',
    category: 'epigenetics',
    tags: ['DNMT', 'methyltransferase', 'methylation', 'epigenetics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <ellipse cx="32" cy="28" rx="14" ry="10" fill="#E74C3C" opacity="0.3"/>
      <text x="22" y="32" font-size="5" fill="currentColor" stroke="none">DNMT</text>
      <circle cx="32" cy="40" r="4" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="54" font-size="3" fill="currentColor" stroke="none">5mC</text>
    </svg>`
  },
  {
    id: 'mol-tet-enzyme',
    name: 'TET Enzyme',
    domain: 'biology',
    category: 'epigenetics',
    tags: ['TET', 'demethylation', '5hmC', 'epigenetics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <ellipse cx="32" cy="28" rx="14" ry="10" fill="#27AE60" opacity="0.3"/>
      <text x="26" y="32" font-size="5" fill="currentColor" stroke="none">TET</text>
      <circle cx="24" cy="40" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M28 40h8"/>
      <circle cx="40" cy="40" r="4" fill="#27AE60" opacity="0.5"/>
      <text x="18" y="54" font-size="3" fill="currentColor" stroke="none">5mC</text>
      <text x="34" y="54" font-size="3" fill="currentColor" stroke="none">5hmC</text>
    </svg>`
  },

  // ===========================================================================
  // LAB EQUIPMENT AND TECHNIQUES
  // ===========================================================================
  {
    id: 'mol-thermal-cycler',
    name: 'Thermal Cycler',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['thermal cycler', 'PCR machine', 'thermocycler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="12" y="20" width="40" height="24" rx="2" fill="#3498DB" opacity="0.2"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="22" cy="28" r="2" fill="currentColor"/>
      <circle cx="28" cy="28" r="2" fill="currentColor"/>
      <circle cx="16" cy="34" r="2" fill="currentColor"/>
      <circle cx="22" cy="34" r="2" fill="currentColor"/>
      <circle cx="28" cy="34" r="2" fill="currentColor"/>
      <rect x="36" y="24" width="12" height="8" rx="1"/>
      <text x="38" y="30" font-size="4" fill="currentColor" stroke="none">95C</text>
      <rect x="12" y="48" width="8" height="4" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'mol-micropipette',
    name: 'Micropipette',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['micropipette', 'pipette', 'pipettor', 'volume'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="36" rx="4"/>
      <rect x="28" y="40" width="8" height="16" rx="1"/>
      <path d="M28 56l4 4 4-4"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="24" width="8" height="8" fill="#3498DB" opacity="0.3"/>
      <text x="29" y="30" font-size="4" fill="currentColor" stroke="none">10</text>
    </svg>`
  },
  {
    id: 'mol-centrifuge',
    name: 'Centrifuge',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['centrifuge', 'spin', 'separation', 'pellet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="28" width="12" height="8" rx="2" fill="#3498DB" opacity="0.5"/>
      <rect x="44" y="28" width="12" height="8" rx="2" fill="#3498DB" opacity="0.5"/>
      <rect x="28" y="8" width="8" height="12" rx="2" fill="#3498DB" opacity="0.5"/>
      <rect x="28" y="44" width="8" height="12" rx="2" fill="#3498DB" opacity="0.5"/>
      <path d="M28 28l8 8M28 36l8-8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'mol-electrophoresis-apparatus',
    name: 'Electrophoresis Apparatus',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['electrophoresis', 'gel box', 'power supply', 'separation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="2"/>
      <rect x="12" y="28" width="40" height="20" fill="#F5F5DC" opacity="0.5"/>
      <line x1="16" y1="28" x2="16" y2="48"/>
      <line x1="24" y1="28" x2="24" y2="48"/>
      <line x1="32" y1="28" x2="32" y2="48"/>
      <circle cx="16" cy="16" r="4" fill="#E74C3C"/>
      <circle cx="48" cy="16" r="4" fill="#27AE60"/>
      <text x="14" y="18" font-size="4" fill="currentColor" stroke="none">-</text>
      <text x="46" y="18" font-size="4" fill="currentColor" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'mol-ngs-sequencer',
    name: 'NGS Sequencer',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['NGS', 'sequencer', 'Illumina', 'next-generation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="44" rx="4"/>
      <rect x="12" y="16" width="28" height="20" rx="2" fill="#3498DB" opacity="0.2"/>
      <rect x="44" y="16" width="8" height="20"/>
      <path d="M16 24c4-4 8 4 12 0s8 4 12 0"/>
      <path d="M16 30c4-4 8 4 12 0s8 4 12 0"/>
      <circle cx="48" cy="22" r="2" fill="#27AE60"/>
      <circle cx="48" cy="30" r="2" fill="#F39C12"/>
      <rect x="12" y="40" width="12" height="12" rx="2"/>
      <text x="14" y="48" font-size="4" fill="currentColor" stroke="none">FC</text>
    </svg>`
  },
  {
    id: 'mol-flow-cell',
    name: 'Flow Cell',
    domain: 'biology',
    category: 'lab-equipment',
    tags: ['flow cell', 'sequencing', 'Illumina', 'NGS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <line x1="16" y1="24" x2="48" y2="24"/>
      <line x1="16" y1="32" x2="48" y2="32"/>
      <line x1="16" y1="40" x2="48" y2="40"/>
      <line x1="20" y1="20" x2="20" y2="44"/>
      <line x1="28" y1="20" x2="28" y2="44"/>
      <line x1="36" y1="20" x2="36" y2="44"/>
      <line x1="44" y1="20" x2="44" y2="44"/>
      <circle cx="24" cy="28" r="2" fill="#27AE60"/>
      <circle cx="32" cy="36" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="28" r="2" fill="#3498DB"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Flow Cell</text>
    </svg>`
  },
  {
    id: 'mol-nanopore',
    name: 'Nanopore',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['nanopore', 'sequencing', 'long-read', 'MinION'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="#F39C12" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#3498DB" opacity="0.3"/>
      <path d="M28 16c-2 4 4 4 4 8s-6 4-4 8 6 4 4 8"/>
      <path d="M36 16c2 4-4 4-4 8s6 4 4 8-6 4-4 8"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Nanopore</text>
    </svg>`
  },

  // ===========================================================================
  // MOLECULAR PATHWAYS
  // ===========================================================================
  {
    id: 'mol-mapk-pathway',
    name: 'MAPK Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['MAPK', 'ERK', 'signaling', 'kinase cascade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="28" y="10" font-size="4" fill="currentColor" stroke="none">GF</text>
      <circle cx="32" cy="22" r="6" fill="#F39C12" opacity="0.4"/>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">Ras</text>
      <circle cx="32" cy="36" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="26" y="38" font-size="4" fill="currentColor" stroke="none">Raf</text>
      <circle cx="32" cy="50" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">ERK</text>
      <path d="M32 14v2"/>
      <path d="M32 28v2"/>
      <path d="M32 42v2"/>
    </svg>`
  },
  {
    id: 'mol-pi3k-akt',
    name: 'PI3K-Akt Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['PI3K', 'Akt', 'mTOR', 'signaling', 'survival'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="26" y="10" font-size="4" fill="currentColor" stroke="none">PI3K</text>
      <circle cx="32" cy="24" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="27" y="26" font-size="4" fill="currentColor" stroke="none">PIP3</text>
      <circle cx="32" cy="40" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="28" y="42" font-size="4" fill="currentColor" stroke="none">Akt</text>
      <circle cx="32" cy="56" r="6" fill="#F39C12" opacity="0.4"/>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">mTOR</text>
      <path d="M32 14v4"/>
      <path d="M32 30v4"/>
      <path d="M32 46v4"/>
    </svg>`
  },
  {
    id: 'mol-nfkb-pathway',
    name: 'NF-kB Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['NF-kB', 'inflammation', 'signaling', 'immune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="26" y="14" font-size="4" fill="currentColor" stroke="none">TNF</text>
      <ellipse cx="32" cy="28" rx="10" ry="6" fill="#95A5A6" opacity="0.4"/>
      <text x="22" y="30" font-size="4" fill="currentColor" stroke="none">IkB-NFkB</text>
      <circle cx="32" cy="44" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="25" y="46" font-size="4" fill="currentColor" stroke="none">NFkB</text>
      <rect x="24" y="52" width="16" height="8" fill="#3498DB" opacity="0.3"/>
      <text x="26" y="58" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
      <path d="M32 18v4"/>
      <path d="M32 34v4"/>
      <path d="M42 28l8-8"/>
      <circle cx="52" cy="18" r="4" fill="#F39C12" opacity="0.4"/>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">IkB</text>
    </svg>`
  },
  {
    id: 'mol-wnt-pathway',
    name: 'Wnt Pathway',
    domain: 'biology',
    category: 'signaling',
    tags: ['Wnt', 'beta-catenin', 'signaling', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="27" y="10" font-size="4" fill="currentColor" stroke="none">Wnt</text>
      <rect x="24" y="18" width="16" height="8" rx="2"/>
      <text x="26" y="24" font-size="3" fill="currentColor" stroke="none">Frizzled</text>
      <circle cx="32" cy="36" r="6" fill="#F39C12" opacity="0.4"/>
      <text x="26" y="38" font-size="3" fill="currentColor" stroke="none">B-cat</text>
      <rect x="24" y="46" width="16" height="12" fill="#3498DB" opacity="0.3"/>
      <text x="26" y="54" font-size="3" fill="currentColor" stroke="none">Nucleus</text>
      <path d="M32 14v4"/>
      <path d="M32 42v4"/>
    </svg>`
  },
  {
    id: 'mol-ubiquitin',
    name: 'Ubiquitin System',
    domain: 'biology',
    category: 'signaling',
    tags: ['ubiquitin', 'proteasome', 'degradation', 'E1', 'E2', 'E3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="13" y="18" font-size="4" fill="currentColor" stroke="none">E1</text>
      <circle cx="32" cy="16" r="6" fill="#F39C12" opacity="0.4"/>
      <text x="29" y="18" font-size="4" fill="currentColor" stroke="none">E2</text>
      <circle cx="48" cy="16" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="45" y="18" font-size="4" fill="currentColor" stroke="none">E3</text>
      <circle cx="32" cy="36" r="8" fill="#3498DB" opacity="0.3"/>
      <text x="26" y="38" font-size="3" fill="currentColor" stroke="none">Target</text>
      <circle cx="24" cy="30" r="3" fill="#9B59B6"/>
      <circle cx="28" cy="28" r="3" fill="#9B59B6"/>
      <circle cx="36" cy="28" r="3" fill="#9B59B6"/>
      <circle cx="40" cy="30" r="3" fill="#9B59B6"/>
      <ellipse cx="32" cy="52" rx="12" ry="6" fill="#95A5A6" opacity="0.4"/>
      <text x="20" y="54" font-size="3" fill="currentColor" stroke="none">Proteasome</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL MOLECULAR TOOLS
  // ===========================================================================
  {
    id: 'mol-restriction-enzyme',
    name: 'Restriction Enzyme',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['restriction enzyme', 'endonuclease', 'EcoRI', 'cutting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h20"/>
      <path d="M36 24h20"/>
      <path d="M8 28h20"/>
      <path d="M36 28h20"/>
      <path d="M8 36h20"/>
      <path d="M36 36h20"/>
      <path d="M8 40h20"/>
      <path d="M36 40h20"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#E74C3C" opacity="0.3"/>
      <path d="M28 24v16"/>
      <path d="M36 24v16"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">EcoRI</text>
    </svg>`
  },
  {
    id: 'mol-gibson-assembly',
    name: 'Gibson Assembly',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['Gibson assembly', 'cloning', 'seamless', 'isothermal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h16" stroke="#3498DB" stroke-width="2"/>
      <path d="M24 20h16" stroke="#27AE60" stroke-width="2"/>
      <path d="M40 20h16" stroke="#E74C3C" stroke-width="2"/>
      <path d="M20 24l8 8-8 8"/>
      <path d="M44 24l-8 8 8 8"/>
      <path d="M8 44h48" stroke-width="2"/>
      <text x="12" y="54" font-size="4" fill="currentColor" stroke="none">Gibson Assembly</text>
    </svg>`
  },
  {
    id: 'mol-golden-gate',
    name: 'Golden Gate Assembly',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['Golden Gate', 'cloning', 'Type IIS', 'modular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <rect x="24" y="16" width="12" height="8" fill="#27AE60" opacity="0.5"/>
      <rect x="40" y="16" width="12" height="8" fill="#E74C3C" opacity="0.5"/>
      <path d="M20 20l4 4-4 4"/>
      <path d="M36 20l4 4-4 4"/>
      <rect x="8" y="36" width="44" height="8" rx="2"/>
      <rect x="12" y="38" width="8" height="4" fill="#3498DB" opacity="0.5"/>
      <rect x="24" y="38" width="8" height="4" fill="#27AE60" opacity="0.5"/>
      <rect x="36" y="38" width="12" height="4" fill="#E74C3C" opacity="0.5"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Golden Gate</text>
    </svg>`
  },
  {
    id: 'mol-qpcr-curve',
    name: 'qPCR Amplification Curve',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['qPCR', 'real-time PCR', 'amplification curve', 'Ct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52h44"/>
      <path d="M12 52V12"/>
      <path d="M16 48c4 0 8-2 12-4s8-8 12-20 8-12 16-12" stroke="#27AE60" stroke-width="2"/>
      <path d="M16 48c8 0 16-4 20-8s8-16 12-24" stroke="#3498DB" stroke-width="2"/>
      <line x1="12" y1="28" x2="56" y2="28" stroke-dasharray="2 2" stroke="#E74C3C"/>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">Ct</text>
      <text x="28" y="60" font-size="3" fill="currentColor" stroke="none">Cycles</text>
    </svg>`
  },
  {
    id: 'mol-rt-pcr',
    name: 'RT-PCR',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['RT-PCR', 'reverse transcription', 'cDNA', 'mRNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8-4 16 4 24 0" stroke="#E74C3C"/>
      <text x="36" y="16" font-size="4" fill="currentColor" stroke="none">mRNA</text>
      <path d="M20 20v8"/>
      <ellipse cx="20" cy="32" rx="8" ry="6" fill="#F39C12" opacity="0.3"/>
      <text x="16" y="34" font-size="4" fill="currentColor" stroke="none">RT</text>
      <path d="M20 38v8"/>
      <path d="M8 50h24" stroke="#3498DB"/>
      <text x="36" y="50" font-size="4" fill="currentColor" stroke="none">cDNA</text>
    </svg>`
  },
  {
    id: 'mol-southern-blot',
    name: 'Southern Blot',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['Southern blot', 'DNA detection', 'hybridization', 'probe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="48" rx="2"/>
      <rect x="12" y="16" width="12" height="2" fill="currentColor"/>
      <rect x="12" y="24" width="12" height="2" fill="currentColor"/>
      <rect x="12" y="32" width="12" height="2" fill="currentColor"/>
      <rect x="12" y="44" width="12" height="2" fill="currentColor"/>
      <path d="M28 32h8"/>
      <rect x="36" y="8" width="20" height="48" rx="2" fill="#FFFFFF"/>
      <rect x="40" y="24" width="12" height="4" fill="#27AE60" opacity="0.5"/>
      <rect x="40" y="44" width="12" height="4" fill="#27AE60" opacity="0.5"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Gel</text>
      <text x="36" y="62" font-size="3" fill="currentColor" stroke="none">Blot</text>
    </svg>`
  },
  {
    id: 'mol-northern-blot',
    name: 'Northern Blot',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['Northern blot', 'RNA detection', 'hybridization', 'expression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="20" width="8" height="4" fill="#E74C3C"/>
      <rect x="24" y="20" width="8" height="6" fill="#E74C3C"/>
      <rect x="36" y="20" width="8" height="3" fill="#E74C3C"/>
      <text x="12" y="16" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="24" y="16" font-size="3" fill="currentColor" stroke="none">2</text>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">3</text>
      <line x1="12" y1="32" x2="48" y2="32" stroke-dasharray="2 2"/>
      <rect x="12" y="36" width="8" height="2" fill="currentColor" opacity="0.5"/>
      <rect x="24" y="36" width="8" height="2" fill="currentColor" opacity="0.5"/>
      <rect x="36" y="36" width="8" height="2" fill="currentColor" opacity="0.5"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">28S</text>
      <text x="4" y="38" font-size="3" fill="currentColor" stroke="none">18S</text>
    </svg>`
  },
  {
    id: 'mol-chip-seq',
    name: 'ChIP-seq',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['ChIP-seq', 'chromatin immunoprecipitation', 'protein-DNA', 'peaks'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c4-4 8 4 12 0s8 4 12 0 8 4 12 0 8 4 12 0"/>
      <circle cx="20" cy="28" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="44" cy="28" r="6" fill="#27AE60" opacity="0.3"/>
      <path d="M20 22v-8"/>
      <path d="M44 22v-8"/>
      <circle cx="20" cy="10" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="44" cy="10" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M8 44h48"/>
      <path d="M16 44v-8"/>
      <path d="M24 44v-12"/>
      <path d="M40 44v-6"/>
      <path d="M48 44v-10"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">ChIP-seq</text>
    </svg>`
  },
  {
    id: 'mol-rna-seq',
    name: 'RNA-seq',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['RNA-seq', 'transcriptomics', 'gene expression', 'FPKM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c4-4 8 4 12 0s8 4 12 0" stroke="#E74C3C"/>
      <path d="M8 24c4-4 8 4 12 0s8 4 12 0" stroke="#E74C3C"/>
      <path d="M8 32c4-4 8 4 12 0s8 4 12 0" stroke="#E74C3C"/>
      <path d="M36 24h8"/>
      <rect x="48" y="16" width="8" height="24" fill="#3498DB" opacity="0.3"/>
      <rect x="52" y="24" width="4" height="12" fill="#3498DB"/>
      <rect x="52" y="20" width="4" height="8" fill="#27AE60"/>
      <rect x="52" y="32" width="4" height="4" fill="#F39C12"/>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">RNA-seq</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ICONS - COMPLETING 90+ TARGET
  // ===========================================================================
  {
    id: 'mol-codon-table',
    name: 'Codon Table',
    domain: 'biology',
    category: 'translation',
    tags: ['codon', 'genetic code', 'amino acid', 'translation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <line x1="20" y1="8" x2="20" y2="56"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="44" y1="8" x2="44" y2="56"/>
      <text x="10" y="16" font-size="4" fill="currentColor" stroke="none">UUU</text>
      <text x="22" y="16" font-size="4" fill="currentColor" stroke="none">UUC</text>
      <text x="46" y="28" font-size="4" fill="currentColor" stroke="none">Met</text>
    </svg>`
  },
  {
    id: 'mol-polymerase-complex',
    name: 'Polymerase Complex',
    domain: 'biology',
    category: 'replication',
    tags: ['polymerase', 'holoenzyme', 'replication complex', 'replisome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#27AE60" opacity="0.2"/>
      <circle cx="20" cy="28" r="8" fill="#3498DB" opacity="0.4"/>
      <circle cx="44" cy="28" r="8" fill="#E74C3C" opacity="0.4"/>
      <circle cx="32" cy="40" r="6" fill="#F39C12" opacity="0.4"/>
      <path d="M4 32h8"/>
      <path d="M52 32h8"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Replisome</text>
    </svg>`
  },
  {
    id: 'mol-promoter',
    name: 'Promoter Region',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['promoter', 'TATA', 'transcription start', 'TSS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="36" x2="60" y2="36"/>
      <rect x="12" y="28" width="16" height="16" fill="#E74C3C" opacity="0.3"/>
      <rect x="36" y="28" width="8" height="16" fill="#F39C12" opacity="0.3"/>
      <path d="M44 32l8-12h8"/>
      <text x="14" y="38" font-size="4" fill="currentColor" stroke="none">TATA</text>
      <text x="38" y="38" font-size="4" fill="currentColor" stroke="none">+1</text>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Promoter</text>
    </svg>`
  },
  {
    id: 'mol-terminator',
    name: 'Terminator Sequence',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['terminator', 'transcription termination', 'poly-U', 'Rho'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="36" x2="60" y2="36"/>
      <path d="M32 36c0-16 8-16 8 0"/>
      <path d="M24 24c8 0 8 12 16 12"/>
      <rect x="44" y="28" width="12" height="16" fill="#E74C3C" opacity="0.3"/>
      <text x="46" y="38" font-size="4" fill="currentColor" stroke="none">Stop</text>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">Terminator</text>
    </svg>`
  },
  {
    id: 'mol-aminoacyl-trna',
    name: 'Aminoacyl-tRNA Synthetase',
    domain: 'biology',
    category: 'translation',
    tags: ['aminoacyl-tRNA synthetase', 'charging', 'tRNA', 'amino acid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#9B59B6" opacity="0.3"/>
      <circle cx="16" cy="20" r="6" fill="#27AE60" opacity="0.4"/>
      <text x="12" y="22" font-size="4" fill="currentColor" stroke="none">AA</text>
      <path d="M22 20h8"/>
      <path d="M48 32c4-8 4-16 0-20"/>
      <ellipse cx="52" cy="8" rx="4" ry="6"/>
      <text x="48" y="10" font-size="3" fill="currentColor" stroke="none">tRNA</text>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">aaRS</text>
    </svg>`
  },
  {
    id: 'mol-riboswitch',
    name: 'Riboswitch',
    domain: 'biology',
    category: 'gene-expression',
    tags: ['riboswitch', 'aptamer', 'regulatory RNA', 'ligand binding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 44h16"/>
      <path d="M24 44c0-12 16-12 16 0"/>
      <path d="M40 44h16"/>
      <circle cx="32" cy="28" r="8" fill="#27AE60" opacity="0.3"/>
      <circle cx="32" cy="28" r="4" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Riboswitch</text>
    </svg>`
  },
  {
    id: 'mol-splicing-variant',
    name: 'Alternative Splicing',
    domain: 'biology',
    category: 'rna-processing',
    tags: ['alternative splicing', 'exon skipping', 'isoform', 'splice variant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <rect x="20" y="12" width="8" height="8" fill="#27AE60" opacity="0.5"/>
      <rect x="32" y="12" width="8" height="8" fill="#F39C12" opacity="0.5"/>
      <rect x="44" y="12" width="16" height="8" fill="#E74C3C" opacity="0.5"/>
      <path d="M16 36h32"/>
      <rect x="4" y="32" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <rect x="48" y="32" width="12" height="8" fill="#E74C3C" opacity="0.5"/>
      <path d="M16 56h32"/>
      <rect x="4" y="52" width="12" height="8" fill="#3498DB" opacity="0.5"/>
      <rect x="20" y="52" width="8" height="8" fill="#F39C12" opacity="0.5"/>
      <rect x="32" y="52" width="28" height="8" fill="#E74C3C" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'mol-nmd',
    name: 'Nonsense-Mediated Decay',
    domain: 'biology',
    category: 'rna-processing',
    tags: ['NMD', 'quality control', 'PTC', 'mRNA decay'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8-4 16 4 24 0s16 4 24 0" stroke="#E74C3C"/>
      <circle cx="32" cy="24" r="6" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="26" font-size="4" fill="currentColor" stroke="none">PTC</text>
      <path d="M32 32v8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8" fill="#95A5A6" opacity="0.3"/>
      <text x="24" y="50" font-size="4" fill="currentColor" stroke="none">NMD</text>
      <path d="M16 44l4-4M48 44l-4-4"/>
    </svg>`
  },
  {
    id: 'mol-emsa',
    name: 'EMSA (Gel Shift)',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['EMSA', 'gel shift', 'DNA-protein', 'binding assay'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="#F5F5DC" opacity="0.5"/>
      <rect x="16" y="16" width="8" height="4" fill="#3498DB"/>
      <rect x="28" y="16" width="8" height="4" fill="#3498DB"/>
      <rect x="40" y="16" width="8" height="4" fill="#3498DB"/>
      <rect x="16" y="32" width="8" height="4" fill="#3498DB"/>
      <rect x="28" y="24" width="8" height="4" fill="#27AE60"/>
      <rect x="40" y="20" width="8" height="4" fill="#27AE60"/>
      <text x="14" y="48" font-size="3" fill="currentColor" stroke="none">Free</text>
      <text x="26" y="48" font-size="3" fill="currentColor" stroke="none">Bound</text>
    </svg>`
  },
  {
    id: 'mol-luciferase',
    name: 'Luciferase Reporter',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['luciferase', 'reporter', 'bioluminescence', 'gene expression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="8"/>
      <path d="M32 32v-8"/>
      <circle cx="32" cy="20" r="8" fill="#F1C40F" opacity="0.5"/>
      <path d="M24 12l-4-8M32 10v-8M40 12l4-8"/>
      <path d="M24 16l-4-4M40 16l4-4"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Luciferase</text>
    </svg>`
  },
  {
    id: 'mol-fret',
    name: 'FRET',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['FRET', 'fluorescence', 'energy transfer', 'protein interaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="10" fill="#27AE60" opacity="0.4"/>
      <circle cx="44" cy="32" r="10" fill="#E74C3C" opacity="0.4"/>
      <path d="M30 32h4" stroke="#F1C40F" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M16 20l-4-8M24 18l4-8"/>
      <path d="M40 20l-4-8M48 18l4-8" stroke="#E74C3C"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Donor</text>
      <text x="38" y="52" font-size="3" fill="currentColor" stroke="none">Acceptor</text>
    </svg>`
  },
  {
    id: 'mol-transfection',
    name: 'Transfection',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['transfection', 'lipofection', 'DNA delivery', 'gene transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="40" r="16"/>
      <circle cx="32" cy="40" r="8" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="16" r="8" fill="#3498DB" opacity="0.4"/>
      <circle cx="32" cy="16" r="4"/>
      <path d="M32 24v8"/>
      <path d="M28 32l4 4 4-4"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Transfection</text>
    </svg>`
  },
  {
    id: 'mol-lentivirus',
    name: 'Lentivirus',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['lentivirus', 'viral vector', 'transduction', 'gene delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#9B59B6" opacity="0.2"/>
      <circle cx="32" cy="32" r="8" fill="#3498DB" opacity="0.4"/>
      <path d="M12 24l-4-8M52 24l4-8"/>
      <path d="M12 40l-4 8M52 40l4 8"/>
      <path d="M20 16l-4-4M44 16l4-4"/>
      <path d="M20 48l-4 4M44 48l4 4"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Lentivirus</text>
    </svg>`
  },
  {
    id: 'mol-coip',
    name: 'Co-IP',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['Co-IP', 'immunoprecipitation', 'protein interaction', 'pulldown'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="8" fill="#3498DB" opacity="0.4"/>
      <circle cx="40" cy="24" r="6" fill="#27AE60" opacity="0.4"/>
      <path d="M32 24h-8"/>
      <ellipse cx="32" cy="44" rx="20" ry="8" fill="#F39C12" opacity="0.2"/>
      <circle cx="24" cy="44" r="4"/>
      <path d="M24 32v8"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Co-IP</text>
    </svg>`
  },
  {
    id: 'mol-atac-seq',
    name: 'ATAC-seq',
    domain: 'biology',
    category: 'lab-techniques',
    tags: ['ATAC-seq', 'chromatin accessibility', 'open chromatin', 'Tn5'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c4-4 8 4 12 0s8 4 12 0 8 4 12 0 8 4 12 0"/>
      <circle cx="20" cy="28" r="6" fill="#4ECDC4" opacity="0.4"/>
      <circle cx="44" cy="28" r="6" fill="#4ECDC4" opacity="0.4"/>
      <rect x="16" y="40" width="8" height="12" fill="#27AE60" opacity="0.5"/>
      <rect x="40" y="40" width="8" height="16" fill="#27AE60" opacity="0.5"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">ATAC-seq</text>
    </svg>`
  },
];

export default molecularIcons;
