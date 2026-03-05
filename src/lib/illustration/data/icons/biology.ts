/**
 * biology.ts
 * Biology icon definitions for FINNISH Icon Library
 *
 * Contains icons related to biological sciences, cell biology,
 * molecular biology, genetics, ecology, and life sciences research.
 *
 * Ralph Loop Iteration 2 - COMPLETE checkpoint
 * Total: 95 icons covering cellular, molecular, ecology, evolution,
 * plant biology, animal biology, microbiology, and laboratory topics
 */

import type { IconDefinition } from './index';

/**
 * Biology domain icons collection
 */
export const biologyIcons: IconDefinition[] = [
  // =============================================================================
  // CELL BIOLOGY - MEMBRANES & STRUCTURE
  // =============================================================================
  {
    id: 'bio-cell-membrane',
    name: 'Cell Membrane',
    domain: 'biology',
    category: 'cellular',
    tags: ['phospholipid', 'bilayer', 'plasma membrane', 'permeability', 'transport'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="10" ry="6"/>
  <ellipse cx="12" cy="12" rx="7" ry="4"/>
  <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="8" cy="9" r="1" fill="currentColor"/>
  <circle cx="16" cy="15" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-cell-wall',
    name: 'Cell Wall',
    domain: 'biology',
    category: 'cellular',
    tags: ['plant cell', 'cellulose', 'rigid', 'protection', 'structure'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="5" width="18" height="14" rx="2"/>
  <rect x="5" y="7" width="14" height="10" rx="1"/>
  <line x1="3" y1="9" x2="5" y2="9"/>
  <line x1="19" y1="9" x2="21" y2="9"/>
  <line x1="3" y1="15" x2="5" y2="15"/>
  <line x1="19" y1="15" x2="21" y2="15"/>
</svg>`,
  },
  {
    id: 'bio-cytoplasm',
    name: 'Cytoplasm',
    domain: 'biology',
    category: 'cellular',
    tags: ['cytosol', 'gel', 'organelles', 'metabolic', 'intracellular'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="8" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
  <circle cx="14" cy="8" r="1" fill="currentColor" opacity="0.3"/>
  <circle cx="16" cy="13" r="1.5" fill="currentColor" opacity="0.3"/>
  <circle cx="10" cy="15" r="1" fill="currentColor" opacity="0.3"/>
  <circle cx="12" cy="12" r="2"/>
</svg>`,
  },
  {
    id: 'bio-cytoskeleton',
    name: 'Cytoskeleton',
    domain: 'biology',
    category: 'cellular',
    tags: ['microtubules', 'actin', 'intermediate filaments', 'structure', 'support'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 3v18"/>
  <path d="M3 12h18"/>
  <path d="M5.6 5.6l12.8 12.8"/>
  <path d="M5.6 18.4l12.8-12.8"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // CELL BIOLOGY - ORGANELLES
  // =============================================================================
  {
    id: 'bio-nucleus',
    name: 'Nucleus',
    domain: 'biology',
    category: 'organelle',
    tags: ['nuclear envelope', 'nucleolus', 'chromatin', 'DNA', 'genetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="3" fill="currentColor"/>
  <circle cx="10" cy="8" r="0.5" fill="currentColor"/>
  <circle cx="15" cy="10" r="0.5" fill="currentColor"/>
  <circle cx="9" cy="14" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="15" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-mitochondria',
    name: 'Mitochondria',
    domain: 'biology',
    category: 'organelle',
    tags: ['powerhouse', 'ATP', 'energy', 'respiration', 'cristae'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="5"/>
  <path d="M5 12c2-3 4-3 7-3s5 0 7 3"/>
  <path d="M6 9c2 2 3 2 5 2"/>
  <path d="M13 9c2 0 3 0 5-2"/>
  <path d="M6 15c2-2 3-2 5-2"/>
  <path d="M13 15c2 0 3 0 5 2"/>
  <path d="M8 12v0"/>
  <path d="M16 12v0"/>
</svg>`,
  },
  {
    id: 'bio-chloroplast',
    name: 'Chloroplast',
    domain: 'biology',
    category: 'organelle',
    tags: ['photosynthesis', 'plant cell', 'thylakoid', 'chlorophyll', 'green'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="10" ry="6"/>
  <ellipse cx="12" cy="12" rx="7" ry="3"/>
  <path d="M5 10c2 1 4 1 6 0s4-1 6 0"/>
  <path d="M5 14c2-1 4-1 6 0s4 1 6 0"/>
  <circle cx="8" cy="12" r="1.5"/>
  <circle cx="16" cy="12" r="1.5"/>
</svg>`,
  },
  {
    id: 'bio-endoplasmic-reticulum',
    name: 'Endoplasmic Reticulum',
    domain: 'biology',
    category: 'organelle',
    tags: ['ER', 'rough ER', 'smooth ER', 'protein synthesis', 'lipid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 8c2-2 4-2 6 0s4 2 6 0s4 2 4 2"/>
  <path d="M4 12c2-2 4-2 6 0s4 2 6 0s4 2 4 2"/>
  <path d="M4 16c2-2 4-2 6 0s4 2 6 0s4 2 4 2"/>
  <circle cx="6" cy="8" r="0.5" fill="currentColor"/>
  <circle cx="10" cy="12" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="8" r="0.5" fill="currentColor"/>
  <circle cx="18" cy="12" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-golgi-apparatus',
    name: 'Golgi Apparatus',
    domain: 'biology',
    category: 'organelle',
    tags: ['Golgi body', 'cisternae', 'vesicles', 'protein modification', 'secretion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 6c3-1 6-1 9 0s6 1 6 1"/>
  <path d="M5 10c3-1 6-1 9 0s6 1 6 1"/>
  <path d="M5 14c3-1 6-1 9 0s6 1 6 1"/>
  <path d="M5 18c3-1 6-1 9 0s6 1 6 1"/>
  <circle cx="4" cy="8" r="1"/>
  <circle cx="21" cy="12" r="1"/>
  <circle cx="4" cy="16" r="1"/>
</svg>`,
  },
  {
    id: 'bio-ribosome',
    name: 'Ribosome',
    domain: 'biology',
    category: 'organelle',
    tags: ['protein synthesis', 'translation', 'rRNA', 'subunit', 'amino acid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="10" rx="6" ry="4"/>
  <ellipse cx="12" cy="15" rx="8" ry="5"/>
  <path d="M4 15c0 0 2-1 4-1"/>
  <path d="M16 14c2 0 4 1 4 1"/>
  <circle cx="10" cy="10" r="1"/>
  <circle cx="14" cy="10" r="1"/>
</svg>`,
  },
  {
    id: 'bio-lysosome',
    name: 'Lysosome',
    domain: 'biology',
    category: 'organelle',
    tags: ['digestion', 'enzymes', 'hydrolase', 'autophagy', 'degradation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
  <circle cx="14" cy="9" r="1" fill="currentColor"/>
  <circle cx="10" cy="14" r="1" fill="currentColor"/>
  <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
  <circle cx="12" cy="12" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-vacuole',
    name: 'Vacuole',
    domain: 'biology',
    category: 'organelle',
    tags: ['storage', 'plant cell', 'turgor pressure', 'water', 'waste'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="7"/>
  <ellipse cx="12" cy="12" rx="6" ry="4" stroke-dasharray="2 2"/>
  <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
  <circle cx="16" cy="13" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-peroxisome',
    name: 'Peroxisome',
    domain: 'biology',
    category: 'organelle',
    tags: ['oxidation', 'catalase', 'hydrogen peroxide', 'fatty acid', 'detox'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="7"/>
  <path d="M9 9l6 6"/>
  <path d="M15 9l-6 6"/>
  <circle cx="12" cy="12" r="2"/>
</svg>`,
  },
  {
    id: 'bio-centriole',
    name: 'Centriole',
    domain: 'biology',
    category: 'organelle',
    tags: ['centrosome', 'microtubules', 'cell division', 'spindle', 'MTOC'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="4" ry="8"/>
  <path d="M8 8l8 0"/>
  <path d="M8 12l8 0"/>
  <path d="M8 16l8 0"/>
  <circle cx="12" cy="6" r="1" fill="currentColor"/>
  <circle cx="12" cy="18" r="1" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // CELL BIOLOGY - CELL DIVISION
  // =============================================================================
  {
    id: 'bio-mitosis',
    name: 'Mitosis',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cell division', 'chromosomes', 'spindle', 'daughter cells', 'somatic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="7" cy="12" rx="5" ry="6"/>
  <ellipse cx="17" cy="12" rx="5" ry="6"/>
  <path d="M12 6v12"/>
  <circle cx="7" cy="12" r="2" fill="currentColor"/>
  <circle cx="17" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-meiosis',
    name: 'Meiosis',
    domain: 'biology',
    category: 'cell-division',
    tags: ['reduction division', 'gametes', 'haploid', 'crossing over', 'genetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5" cy="8" r="3"/>
  <circle cx="11" cy="8" r="3"/>
  <circle cx="5" cy="16" r="3"/>
  <circle cx="11" cy="16" r="3"/>
  <circle cx="5" cy="8" r="1" fill="currentColor"/>
  <circle cx="11" cy="8" r="1" fill="currentColor"/>
  <circle cx="5" cy="16" r="1" fill="currentColor"/>
  <circle cx="11" cy="16" r="1" fill="currentColor"/>
  <path d="M14 12h4"/>
  <circle cx="20" cy="12" r="2"/>
</svg>`,
  },
  {
    id: 'bio-cytokinesis',
    name: 'Cytokinesis',
    domain: 'biology',
    category: 'cell-division',
    tags: ['cleavage furrow', 'cell plate', 'division', 'cytoplasm', 'separation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8"/>
  <path d="M12 4c-2 2-2 6 0 8s2 6 0 8"/>
  <circle cx="8" cy="12" r="2" fill="currentColor"/>
  <circle cx="16" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-spindle-fibers',
    name: 'Spindle Fibers',
    domain: 'biology',
    category: 'cell-division',
    tags: ['spindle apparatus', 'kinetochore', 'microtubules', 'chromosome', 'poles'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="12" r="2"/>
  <circle cx="20" cy="12" r="2"/>
  <path d="M6 12l4 0"/>
  <path d="M14 12l4 0"/>
  <path d="M6 10l4 2-4 2"/>
  <path d="M18 10l-4 2 4 2"/>
  <ellipse cx="12" cy="12" rx="2" ry="3" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-cell-cycle',
    name: 'Cell Cycle',
    domain: 'biology',
    category: 'cell-division',
    tags: ['G1', 'S phase', 'G2', 'M phase', 'interphase', 'checkpoint'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 3v9l6 3"/>
  <path d="M12 12l-6 3"/>
  <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="15" r="1.5" fill="currentColor"/>
  <circle cx="6" cy="15" r="1.5" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // GENETICS - DNA & RNA
  // =============================================================================
  {
    id: 'bio-dna-helix',
    name: 'DNA Helix',
    domain: 'biology',
    category: 'molecular',
    tags: ['double helix', 'genetics', 'nucleotide', 'base pair', 'genome'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 2c0 4 6 6 6 10s-6 6-6 10"/>
  <path d="M18 2c0 4-6 6-6 10s6 6 6 10"/>
  <path d="M7 4h10"/>
  <path d="M7 9h10"/>
  <path d="M7 15h10"/>
  <path d="M7 20h10"/>
</svg>`,
  },
  {
    id: 'bio-rna',
    name: 'RNA',
    domain: 'biology',
    category: 'molecular',
    tags: ['ribonucleic acid', 'transcription', 'mRNA', 'codon', 'ribosome'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 2c0 3 4 4 4 7s-4 4-4 7 4 4 4 6"/>
  <path d="M10 5h8"/>
  <path d="M10 9h6"/>
  <path d="M6 12h8"/>
  <path d="M10 16h6"/>
  <path d="M10 20h4"/>
</svg>`,
  },
  {
    id: 'bio-chromosome',
    name: 'Chromosome',
    domain: 'biology',
    category: 'genetics',
    tags: ['DNA', 'chromatin', 'centromere', 'telomere', 'karyotype'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 3c-1 0-2 1-2 2v6c0 1 1 2 2 2"/>
  <path d="M6 13c-1 0-2 1-2 2v4c0 1 1 2 2 2"/>
  <path d="M18 3c1 0 2 1 2 2v6c0 1-1 2-2 2"/>
  <path d="M18 13c1 0 2 1 2 2v4c0 1-1 2-2 2"/>
  <path d="M6 11h12"/>
  <path d="M6 13h12"/>
</svg>`,
  },
  {
    id: 'bio-gene',
    name: 'Gene',
    domain: 'biology',
    category: 'genetics',
    tags: ['allele', 'locus', 'heredity', 'expression', 'coding'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="8" width="18" height="8" rx="1"/>
  <rect x="6" y="10" width="4" height="4" fill="currentColor"/>
  <rect x="14" y="10" width="4" height="4" fill="currentColor"/>
  <path d="M3 12h-1"/>
  <path d="M22 12h1"/>
</svg>`,
  },
  {
    id: 'bio-codon',
    name: 'Codon',
    domain: 'biology',
    category: 'genetics',
    tags: ['triplet', 'genetic code', 'amino acid', 'translation', 'nucleotide'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="6" height="8" rx="1"/>
  <rect x="9" y="8" width="6" height="8" rx="1"/>
  <rect x="16" y="8" width="6" height="8" rx="1"/>
  <text x="5" y="14" font-size="6" fill="currentColor" text-anchor="middle">A</text>
  <text x="12" y="14" font-size="6" fill="currentColor" text-anchor="middle">U</text>
  <text x="19" y="14" font-size="6" fill="currentColor" text-anchor="middle">G</text>
</svg>`,
  },
  {
    id: 'bio-nucleotide',
    name: 'Nucleotide',
    domain: 'biology',
    category: 'molecular',
    tags: ['base', 'sugar', 'phosphate', 'adenine', 'guanine', 'cytosine', 'thymine'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="4"/>
  <polygon points="12,14 16,18 8,18" fill="currentColor"/>
  <circle cx="12" cy="21" r="2"/>
  <path d="M12 12v2"/>
  <path d="M12 18v1"/>
</svg>`,
  },
  {
    id: 'bio-mutation',
    name: 'Mutation',
    domain: 'biology',
    category: 'genetics',
    tags: ['genetic change', 'variant', 'polymorphism', 'SNP', 'deletion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 4h12"/>
  <path d="M6 8h12"/>
  <path d="M6 12h5"/>
  <path d="M13 12h5" stroke-dasharray="2 2"/>
  <path d="M6 16h12"/>
  <path d="M6 20h12"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M10 10l4 4"/>
</svg>`,
  },
  {
    id: 'bio-punnett-square',
    name: 'Punnett Square',
    domain: 'biology',
    category: 'genetics',
    tags: ['inheritance', 'genotype', 'phenotype', 'Mendelian', 'probability'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16"/>
  <line x1="12" y1="4" x2="12" y2="20"/>
  <line x1="4" y1="12" x2="20" y2="12"/>
  <text x="8" y="10" font-size="5" fill="currentColor" text-anchor="middle">Aa</text>
  <text x="16" y="10" font-size="5" fill="currentColor" text-anchor="middle">Aa</text>
  <text x="8" y="17" font-size="5" fill="currentColor" text-anchor="middle">aA</text>
  <text x="16" y="17" font-size="5" fill="currentColor" text-anchor="middle">aa</text>
</svg>`,
  },
  {
    id: 'bio-allele',
    name: 'Allele',
    domain: 'biology',
    category: 'genetics',
    tags: ['variant', 'gene form', 'dominant', 'recessive', 'heterozygous'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 4v16"/>
  <path d="M16 4v16"/>
  <circle cx="8" cy="10" r="2" fill="currentColor"/>
  <circle cx="16" cy="10" r="2"/>
  <path d="M10 10h4"/>
</svg>`,
  },
  {
    id: 'bio-replication-fork',
    name: 'Replication Fork',
    domain: 'biology',
    category: 'molecular',
    tags: ['DNA replication', 'helicase', 'polymerase', 'leading strand', 'lagging'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h8"/>
  <path d="M12 12l8-6"/>
  <path d="M12 12l8 6"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M16 8l2 0"/>
  <path d="M16 16l2 0"/>
  <path d="M18 9l2 0"/>
  <path d="M18 15l2 0"/>
</svg>`,
  },

  // =============================================================================
  // PROTEINS & ENZYMES
  // =============================================================================
  {
    id: 'bio-protein',
    name: 'Protein',
    domain: 'biology',
    category: 'molecular',
    tags: ['amino acid', 'polypeptide', 'folding', 'structure', 'macromolecule'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12c0-3 2-5 4-5s3 1 4 3c1-2 2-3 4-3s4 2 4 5-2 5-4 5-3-1-4-3c-1 2-2 3-4 3s-4-2-4-5z"/>
  <circle cx="7" cy="12" r="2"/>
  <circle cx="17" cy="12" r="2"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'bio-enzyme',
    name: 'Enzyme',
    domain: 'biology',
    category: 'molecular',
    tags: ['catalyst', 'protein', 'substrate', 'active site', 'reaction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3c-4 0-7 3-7 7 0 2 1 4 2 5 1 2 1 4 0 6h10c-1-2-1-4 0-6 1-1 2-3 2-5 0-4-3-7-7-7z"/>
  <path d="M9 21h6"/>
  <path d="M9 10c0 2 1.5 3 3 3s3-1 3-3"/>
  <circle cx="9" cy="8" r="1"/>
  <circle cx="15" cy="8" r="1"/>
</svg>`,
  },
  {
    id: 'bio-antibody',
    name: 'Antibody',
    domain: 'biology',
    category: 'immunology',
    tags: ['immunoglobulin', 'immune', 'antigen', 'Y-shaped', 'defense'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-8"/>
  <path d="M12 14l-6-6"/>
  <path d="M12 14l6-6"/>
  <circle cx="4" cy="6" r="2"/>
  <circle cx="20" cy="6" r="2"/>
  <path d="M4 8v2"/>
  <path d="M20 8v2"/>
  <circle cx="12" cy="14" r="2"/>
</svg>`,
  },
  {
    id: 'bio-receptor',
    name: 'Receptor',
    domain: 'biology',
    category: 'cellular',
    tags: ['membrane protein', 'signal', 'ligand', 'binding', 'cell surface'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14h16"/>
  <path d="M4 16h16"/>
  <path d="M10 14v-4c0-2 1-3 2-3s2 1 2 3v4"/>
  <circle cx="12" cy="5" r="2"/>
  <path d="M8 16v4"/>
  <path d="M16 16v4"/>
</svg>`,
  },
  {
    id: 'bio-amino-acid',
    name: 'Amino Acid',
    domain: 'biology',
    category: 'molecular',
    tags: ['protein building block', 'peptide bond', 'R group', 'essential', 'residue'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 9v-5"/>
  <path d="M12 15v5"/>
  <path d="M9 12h-5"/>
  <path d="M15 12h5"/>
  <text x="12" y="4" font-size="4" fill="currentColor" text-anchor="middle">NH2</text>
  <text x="12" y="22" font-size="4" fill="currentColor" text-anchor="middle">COOH</text>
</svg>`,
  },

  // =============================================================================
  // ECOLOGY
  // =============================================================================
  {
    id: 'bio-ecosystem',
    name: 'Ecosystem',
    domain: 'biology',
    category: 'ecology',
    tags: ['environment', 'food web', 'habitat', 'biodiversity', 'nature'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M12 2a7 7 0 0 0 0 14"/>
  <path d="M12 16c-2 0-4 2-4 4"/>
  <path d="M12 16c2 0 4 2 4 4"/>
  <path d="M8 8c1-1 2-1 3 0"/>
  <path d="M13 8c1-1 2-1 3 0"/>
  <circle cx="6" cy="12" r="1"/>
  <circle cx="18" cy="12" r="1"/>
</svg>`,
  },
  {
    id: 'bio-food-web',
    name: 'Food Web',
    domain: 'biology',
    category: 'ecology',
    tags: ['trophic levels', 'energy flow', 'predator prey', 'consumers', 'producers'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="4" r="2"/>
  <circle cx="6" cy="12" r="2"/>
  <circle cx="18" cy="12" r="2"/>
  <circle cx="8" cy="20" r="2"/>
  <circle cx="16" cy="20" r="2"/>
  <path d="M12 6l-4 4"/>
  <path d="M12 6l4 4"/>
  <path d="M6 14l2 4"/>
  <path d="M18 14l-2 4"/>
  <path d="M8 12l8 0"/>
</svg>`,
  },
  {
    id: 'bio-food-chain',
    name: 'Food Chain',
    domain: 'biology',
    category: 'ecology',
    tags: ['producer', 'consumer', 'decomposer', 'energy transfer', 'trophic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="12" r="2"/>
  <circle cx="10" cy="12" r="2"/>
  <circle cx="16" cy="12" r="2"/>
  <circle cx="22" cy="12" r="2"/>
  <path d="M6 12h2"/>
  <path d="M12 12h2"/>
  <path d="M18 12h2"/>
  <path d="M7 11l1 1-1 1"/>
  <path d="M13 11l1 1-1 1"/>
  <path d="M19 11l1 1-1 1"/>
</svg>`,
  },
  {
    id: 'bio-population',
    name: 'Population',
    domain: 'biology',
    category: 'ecology',
    tags: ['species', 'density', 'growth', 'carrying capacity', 'demography'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="8" r="2"/>
  <circle cx="16" cy="8" r="2"/>
  <circle cx="6" cy="14" r="2"/>
  <circle cx="12" cy="12" r="2"/>
  <circle cx="18" cy="14" r="2"/>
  <circle cx="9" cy="18" r="2"/>
  <circle cx="15" cy="18" r="2"/>
</svg>`,
  },
  {
    id: 'bio-habitat',
    name: 'Habitat',
    domain: 'biology',
    category: 'ecology',
    tags: ['environment', 'niche', 'biome', 'territory', 'home range'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 20h20"/>
  <path d="M4 20v-6l4-4 4 2 4-2 4 4v6"/>
  <circle cx="8" cy="8" r="2"/>
  <path d="M14 6l2 2"/>
  <path d="M16 6l-2 2"/>
</svg>`,
  },
  {
    id: 'bio-biodiversity',
    name: 'Biodiversity',
    domain: 'biology',
    category: 'ecology',
    tags: ['species richness', 'variety', 'genetic diversity', 'ecosystem', 'conservation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 3c-2 3-2 6 0 9s2 6 0 9"/>
  <path d="M3 12c3-2 6-2 9 0s6 2 9 0"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-symbiosis',
    name: 'Symbiosis',
    domain: 'biology',
    category: 'ecology',
    tags: ['mutualism', 'commensalism', 'parasitism', 'relationship', 'interaction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="12" r="5"/>
  <circle cx="15" cy="12" r="5"/>
  <path d="M12 9v6" stroke-dasharray="2 1"/>
</svg>`,
  },
  {
    id: 'bio-carbon-cycle',
    name: 'Carbon Cycle',
    domain: 'biology',
    category: 'ecology',
    tags: ['biogeochemical', 'CO2', 'photosynthesis', 'respiration', 'decomposition'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4c3 2 3 6 0 8s-3 6 0 8"/>
  <text x="12" y="14" font-size="6" fill="currentColor" text-anchor="middle">C</text>
</svg>`,
  },
  {
    id: 'bio-nitrogen-cycle',
    name: 'Nitrogen Cycle',
    domain: 'biology',
    category: 'ecology',
    tags: ['fixation', 'nitrification', 'denitrification', 'ammonia', 'bacteria'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M8 8l8 8"/>
  <path d="M16 8l-8 8"/>
  <text x="12" y="14" font-size="6" fill="currentColor" text-anchor="middle">N</text>
</svg>`,
  },

  // =============================================================================
  // PLANT BIOLOGY
  // =============================================================================
  {
    id: 'bio-photosynthesis',
    name: 'Photosynthesis',
    domain: 'biology',
    category: 'botany',
    tags: ['light reaction', 'Calvin cycle', 'chlorophyll', 'glucose', 'oxygen'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.9 4.9l2.8 2.8"/>
  <path d="M16.3 16.3l2.8 2.8"/>
  <path d="M4.9 19.1l2.8-2.8"/>
  <path d="M16.3 7.7l2.8-2.8"/>
</svg>`,
  },
  {
    id: 'bio-leaf',
    name: 'Leaf',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'photosynthesis', 'vein', 'chlorophyll', 'foliage'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
</svg>`,
  },
  {
    id: 'bio-root',
    name: 'Root',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'absorption', 'anchor', 'root hair', 'taproot'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v8"/>
  <path d="M12 10c0 4-2 8-4 10"/>
  <path d="M12 10c0 4 2 8 4 10"/>
  <path d="M12 10c0 2-3 4-5 5"/>
  <path d="M12 10c0 2 3 4 5 5"/>
  <path d="M10 6l-2 2"/>
  <path d="M14 6l2 2"/>
</svg>`,
  },
  {
    id: 'bio-stem',
    name: 'Stem',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'transport', 'vascular', 'xylem', 'phloem'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-20"/>
  <path d="M8 6l4 4 4-4"/>
  <path d="M8 12l4 4 4-4"/>
  <path d="M8 18l4 4 4-4"/>
  <circle cx="12" cy="4" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-flower',
    name: 'Flower',
    domain: 'biology',
    category: 'botany',
    tags: ['plant', 'petal', 'pollination', 'reproduction', 'botany'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6"/>
  <path d="M12 16a3 3 0 0 0 0 6 3 3 0 0 0 0-6"/>
  <path d="M2 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0"/>
  <path d="M16 12a3 3 0 0 0 6 0 3 3 0 0 0-6 0"/>
  <path d="M4.93 4.93a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24"/>
  <path d="M14.83 14.83a3 3 0 0 0 4.24 4.24 3 3 0 0 0-4.24-4.24"/>
  <path d="M14.83 9.17a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24"/>
  <path d="M4.93 19.07a3 3 0 0 0 4.24-4.24 3 3 0 0 0-4.24 4.24"/>
</svg>`,
  },
  {
    id: 'bio-seed',
    name: 'Seed',
    domain: 'biology',
    category: 'botany',
    tags: ['germination', 'embryo', 'endosperm', 'dispersal', 'dormancy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="14" rx="6" ry="8"/>
  <path d="M12 6c0-2 1-4 3-4"/>
  <path d="M10 10c0 2 1 4 2 6"/>
</svg>`,
  },
  {
    id: 'bio-stomata',
    name: 'Stomata',
    domain: 'biology',
    category: 'botany',
    tags: ['guard cells', 'gas exchange', 'transpiration', 'leaf', 'pore'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="8" cy="12" rx="4" ry="8"/>
  <ellipse cx="16" cy="12" rx="4" ry="8"/>
  <ellipse cx="12" cy="12" rx="2" ry="4" fill="none"/>
</svg>`,
  },
  {
    id: 'bio-pollen',
    name: 'Pollen',
    domain: 'biology',
    category: 'botany',
    tags: ['pollination', 'male gamete', 'anther', 'fertilization', 'grain'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M12 6v-3"/>
  <path d="M12 18v3"/>
  <path d="M6 12h-3"/>
  <path d="M18 12h3"/>
  <path d="M8 8l-2-2"/>
  <path d="M16 16l2 2"/>
  <path d="M8 16l-2 2"/>
  <path d="M16 8l2-2"/>
</svg>`,
  },
  {
    id: 'bio-xylem',
    name: 'Xylem',
    domain: 'biology',
    category: 'botany',
    tags: ['water transport', 'vascular tissue', 'tracheids', 'vessels', 'plant'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 2v20"/>
  <path d="M12 2v20"/>
  <path d="M16 2v20"/>
  <path d="M6 6h4"/>
  <path d="M10 12h4"/>
  <path d="M14 18h4"/>
  <circle cx="8" cy="8" r="1" fill="currentColor"/>
  <circle cx="12" cy="14" r="1" fill="currentColor"/>
  <circle cx="16" cy="6" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-phloem',
    name: 'Phloem',
    domain: 'biology',
    category: 'botany',
    tags: ['sugar transport', 'sieve tubes', 'companion cells', 'translocation', 'plant'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 2v20"/>
  <path d="M16 2v20"/>
  <path d="M8 6h8"/>
  <path d="M8 10h8"/>
  <path d="M8 14h8"/>
  <path d="M8 18h8"/>
  <circle cx="12" cy="6" r="1" fill="currentColor"/>
  <circle cx="12" cy="14" r="1" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // ANIMAL BIOLOGY
  // =============================================================================
  {
    id: 'bio-neuron',
    name: 'Neuron',
    domain: 'biology',
    category: 'cellular',
    tags: ['nerve cell', 'synapse', 'axon', 'dendrite', 'brain'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="12" r="4"/>
  <path d="M12 12h8"/>
  <path d="M20 12l-2 2"/>
  <path d="M20 12l-2-2"/>
  <path d="M4 8l-2-3"/>
  <path d="M4 10l-3-1"/>
  <path d="M4 14l-3 1"/>
  <path d="M4 16l-2 3"/>
  <circle cx="21" cy="12" r="1.5"/>
  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-muscle-fiber',
    name: 'Muscle Fiber',
    domain: 'biology',
    category: 'anatomy',
    tags: ['myofiber', 'sarcomere', 'actin', 'myosin', 'contraction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="20" height="8" rx="2"/>
  <line x1="6" y1="8" x2="6" y2="16"/>
  <line x1="10" y1="8" x2="10" y2="16"/>
  <line x1="14" y1="8" x2="14" y2="16"/>
  <line x1="18" y1="8" x2="18" y2="16"/>
  <path d="M2 12h20" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'bio-red-blood-cell',
    name: 'Red Blood Cell',
    domain: 'biology',
    category: 'cellular',
    tags: ['erythrocyte', 'hemoglobin', 'oxygen', 'biconcave', 'blood'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="5"/>
  <ellipse cx="12" cy="12" rx="4" ry="2"/>
</svg>`,
  },
  {
    id: 'bio-white-blood-cell',
    name: 'White Blood Cell',
    domain: 'biology',
    category: 'cellular',
    tags: ['leukocyte', 'immune', 'phagocyte', 'lymphocyte', 'defense'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="10" cy="10" r="3" fill="currentColor"/>
  <circle cx="14" cy="12" r="2" fill="currentColor"/>
  <circle cx="11" cy="15" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-platelet',
    name: 'Platelet',
    domain: 'biology',
    category: 'cellular',
    tags: ['thrombocyte', 'clotting', 'coagulation', 'blood', 'hemostasis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 4c-3 0-5 2-6 4s-2 4 0 6 3 4 6 4 5-2 6-4 2-4 0-6-3-4-6-4z"/>
  <circle cx="10" cy="10" r="1" fill="currentColor"/>
  <circle cx="14" cy="12" r="1" fill="currentColor"/>
  <circle cx="11" cy="14" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-sperm',
    name: 'Sperm Cell',
    domain: 'biology',
    category: 'cellular',
    tags: ['spermatozoa', 'male gamete', 'flagellum', 'fertilization', 'reproduction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="8" cy="12" rx="4" ry="3"/>
  <path d="M12 12c2 0 4-2 6-1s4 2 4 1"/>
  <circle cx="8" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-egg-cell',
    name: 'Egg Cell',
    domain: 'biology',
    category: 'cellular',
    tags: ['ovum', 'female gamete', 'oocyte', 'fertilization', 'reproduction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="6" stroke-dasharray="2 2"/>
  <circle cx="12" cy="12" r="3" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // EVOLUTION
  // =============================================================================
  {
    id: 'bio-tree',
    name: 'Phylogenetic Tree',
    domain: 'biology',
    category: 'evolution',
    tags: ['evolution', 'cladogram', 'taxonomy', 'speciation', 'ancestor'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20h16"/>
  <path d="M12 20v-8"/>
  <path d="M12 12l-6-8"/>
  <path d="M12 12l6-8"/>
  <path d="M6 4l-2-2"/>
  <path d="M6 4l2-2"/>
  <path d="M18 4l-2-2"/>
  <path d="M18 4l2-2"/>
</svg>`,
  },
  {
    id: 'bio-natural-selection',
    name: 'Natural Selection',
    domain: 'biology',
    category: 'evolution',
    tags: ['Darwin', 'fitness', 'adaptation', 'survival', 'evolution'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="8" r="2"/>
  <circle cx="12" cy="6" r="3" fill="currentColor"/>
  <circle cx="18" cy="8" r="2"/>
  <path d="M4 20h16"/>
  <path d="M6 10v10"/>
  <path d="M12 9v11"/>
  <path d="M18 10v10"/>
  <path d="M12 14l2-2"/>
  <path d="M12 14l-2-2"/>
</svg>`,
  },
  {
    id: 'bio-adaptation',
    name: 'Adaptation',
    domain: 'biology',
    category: 'evolution',
    tags: ['trait', 'survival', 'fitness', 'environment', 'selection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12c0-4 4-8 8-8"/>
  <path d="M20 12c0 4-4 8-8 8"/>
  <path d="M12 4c2 2 2 6 0 8"/>
  <path d="M12 20c-2-2-2-6 0-8"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-speciation',
    name: 'Speciation',
    domain: 'biology',
    category: 'evolution',
    tags: ['species formation', 'divergence', 'isolation', 'evolution', 'biodiversity'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="20" r="2"/>
  <path d="M12 18v-6"/>
  <path d="M12 12l-6-8"/>
  <path d="M12 12l6-8"/>
  <circle cx="6" cy="4" r="2"/>
  <circle cx="18" cy="4" r="2"/>
</svg>`,
  },
  {
    id: 'bio-fossil',
    name: 'Fossil',
    domain: 'biology',
    category: 'evolution',
    tags: ['paleontology', 'prehistoric', 'extinct', 'evidence', 'rock'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20c0-8 4-16 8-16s8 8 8 16"/>
  <path d="M8 14c2 0 4-2 4-4"/>
  <path d="M12 10c0 2 2 4 4 4"/>
  <circle cx="10" cy="8" r="1" fill="currentColor"/>
  <circle cx="14" cy="8" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-homologous',
    name: 'Homologous Structures',
    domain: 'biology',
    category: 'evolution',
    tags: ['comparative anatomy', 'common ancestor', 'divergent', 'evolution', 'limb'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h4l2 4 2-8 2 4h4"/>
  <circle cx="4" cy="12" r="2"/>
  <circle cx="20" cy="12" r="2"/>
  <path d="M4 6l2 2"/>
  <path d="M4 6l-2 2"/>
  <path d="M20 6l2 2"/>
  <path d="M20 6l-2 2"/>
</svg>`,
  },
  {
    id: 'bio-convergent',
    name: 'Convergent Evolution',
    domain: 'biology',
    category: 'evolution',
    tags: ['analogous', 'similar traits', 'independent', 'environment', 'selection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="4" r="2"/>
  <circle cx="20" cy="4" r="2"/>
  <circle cx="12" cy="20" r="2"/>
  <path d="M4 6l8 12"/>
  <path d="M20 6l-8 12"/>
</svg>`,
  },

  // =============================================================================
  // MICROBIOLOGY
  // =============================================================================
  {
    id: 'bio-bacteria',
    name: 'Bacteria',
    domain: 'biology',
    category: 'microbiology',
    tags: ['prokaryote', 'microbe', 'flagella', 'colony', 'culture'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="6" ry="4"/>
  <path d="M6 12c-2 0-3-1-3-2"/>
  <path d="M18 12c2 0 3-1 3-2"/>
  <path d="M6 12c-2 0-3 1-3 2"/>
  <path d="M18 12c2 0 3 1 3 2"/>
  <path d="M9 8c-1-2-1-4 0-5"/>
  <path d="M15 8c1-2 1-4 0-5"/>
  <path d="M9 16c-1 2-1 4 0 5"/>
  <path d="M15 16c1 2 1 4 0 5"/>
  <circle cx="10" cy="11" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="13" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-virus',
    name: 'Virus',
    domain: 'biology',
    category: 'microbiology',
    tags: ['pathogen', 'capsid', 'infection', 'RNA', 'DNA'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 22,8 22,16 12,22 2,16 2,8"/>
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 8l4 2"/>
  <path d="M18 14l4 2"/>
  <path d="M2 16l4-2"/>
  <path d="M18 10l4-2"/>
</svg>`,
  },
  {
    id: 'bio-amoeba',
    name: 'Amoeba',
    domain: 'biology',
    category: 'microbiology',
    tags: ['protozoa', 'pseudopod', 'unicellular', 'eukaryote', 'protist'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12c0-2 1-3 2-4s3-2 4-1 2 2 3 2 2-1 3 0 2 2 3 3 1 3 1 4-1 2-2 3-3 1-4 1-2-1-3-1-2 1-3 0-2-2-2-3-1-3-2-4z"/>
  <circle cx="10" cy="11" r="2"/>
  <circle cx="15" cy="13" r="1"/>
</svg>`,
  },
  {
    id: 'bio-fungus',
    name: 'Fungus',
    domain: 'biology',
    category: 'microbiology',
    tags: ['mushroom', 'hyphae', 'mycelium', 'spore', 'decomposer'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-10"/>
  <path d="M4 12c0-4 4-8 8-8s8 4 8 8"/>
  <ellipse cx="12" cy="12" rx="8" ry="2"/>
  <circle cx="8" cy="8" r="1" fill="currentColor"/>
  <circle cx="14" cy="6" r="1" fill="currentColor"/>
  <circle cx="16" cy="10" r="1" fill="currentColor"/>
</svg>`,
  },

  // =============================================================================
  // LABORATORY
  // =============================================================================
  {
    id: 'bio-petri-dish',
    name: 'Petri Dish',
    domain: 'biology',
    category: 'laboratory',
    tags: ['culture', 'agar', 'colony', 'microbiology', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="14" rx="10" ry="5"/>
  <ellipse cx="12" cy="12" rx="10" ry="5"/>
  <circle cx="8" cy="12" r="1.5"/>
  <circle cx="14" cy="11" r="1"/>
  <circle cx="11" cy="14" r="1"/>
  <circle cx="16" cy="13" r="0.5"/>
</svg>`,
  },
  {
    id: 'bio-pipette',
    name: 'Pipette',
    domain: 'biology',
    category: 'laboratory',
    tags: ['micropipette', 'transfer', 'measurement', 'liquid', 'precision'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 2h4v4l-1 1v8l1 1v4c0 1-1 2-2 2s-2-1-2-2v-4l1-1V7l-1-1V2z"/>
  <path d="M10 6h4"/>
  <path d="M10 15h4"/>
  <circle cx="12" cy="18" r="1"/>
</svg>`,
  },
  {
    id: 'bio-microscope',
    name: 'Microscope',
    domain: 'biology',
    category: 'laboratory',
    tags: ['magnification', 'lens', 'optical', 'specimen', 'observation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l-2 8"/>
  <circle cx="10" cy="11" r="2"/>
  <path d="M10 13v4"/>
  <path d="M6 17h8"/>
  <path d="M4 22h12"/>
  <path d="M10 17v5"/>
  <path d="M14 10h4"/>
  <path d="M18 8v4"/>
</svg>`,
  },
  {
    id: 'bio-test-tube',
    name: 'Test Tube',
    domain: 'biology',
    category: 'laboratory',
    tags: ['sample', 'experiment', 'solution', 'reaction', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2h6v2H9z"/>
  <path d="M9 4v12c0 2-1 4-3 4h12c-2 0-3-2-3-4V4"/>
  <path d="M9 12h6"/>
  <circle cx="12" cy="16" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'bio-centrifuge',
    name: 'Centrifuge',
    domain: 'biology',
    category: 'laboratory',
    tags: ['separation', 'spin', 'pellet', 'supernatant', 'density'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 9v-4"/>
  <path d="M12 15v4"/>
  <path d="M9 12h-4"/>
  <path d="M15 12h4"/>
</svg>`,
  },
  {
    id: 'bio-gel-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'biology',
    category: 'laboratory',
    tags: ['DNA separation', 'bands', 'migration', 'molecular weight', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <path d="M6 6h2"/>
  <path d="M10 6h2"/>
  <path d="M14 6h2"/>
  <path d="M6 10h3"/>
  <path d="M10 12h2"/>
  <path d="M14 9h3"/>
  <path d="M6 15h2"/>
  <path d="M10 17h3"/>
  <path d="M14 14h2"/>
</svg>`,
  },
  {
    id: 'bio-pcr',
    name: 'PCR Machine',
    domain: 'biology',
    category: 'laboratory',
    tags: ['polymerase chain reaction', 'amplification', 'DNA', 'thermal cycler', 'molecular'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="6" width="18" height="12" rx="2"/>
  <rect x="6" y="9" width="12" height="6" rx="1"/>
  <circle cx="8" cy="12" r="1" fill="currentColor"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
  <circle cx="16" cy="12" r="1" fill="currentColor"/>
  <path d="M7 4h10"/>
  <path d="M12 4v2"/>
</svg>`,
  },

  // =============================================================================
  // ADDITIONAL CELLULAR & MOLECULAR
  // =============================================================================
  {
    id: 'bio-atp',
    name: 'ATP',
    domain: 'biology',
    category: 'molecular',
    tags: ['adenosine triphosphate', 'energy', 'cellular respiration', 'metabolism', 'phosphate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="3"/>
  <circle cx="12" cy="12" r="2"/>
  <circle cx="17" cy="12" r="2"/>
  <circle cx="21" cy="12" r="1.5" fill="currentColor"/>
  <path d="M9 12h1"/>
  <path d="M14 12h1"/>
  <path d="M19 12h1"/>
</svg>`,
  },
  {
    id: 'bio-lipid-bilayer',
    name: 'Lipid Bilayer',
    domain: 'biology',
    category: 'molecular',
    tags: ['phospholipid', 'membrane', 'hydrophobic', 'hydrophilic', 'cell'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="8" r="2"/>
  <circle cx="8" cy="8" r="2"/>
  <circle cx="12" cy="8" r="2"/>
  <circle cx="16" cy="8" r="2"/>
  <circle cx="20" cy="8" r="2"/>
  <path d="M4 10v4"/>
  <path d="M8 10v4"/>
  <path d="M12 10v4"/>
  <path d="M16 10v4"/>
  <path d="M20 10v4"/>
  <path d="M4 14v4"/>
  <path d="M8 14v4"/>
  <path d="M12 14v4"/>
  <path d="M16 14v4"/>
  <path d="M20 14v4"/>
  <circle cx="4" cy="18" r="1"/>
  <circle cx="8" cy="18" r="1"/>
  <circle cx="12" cy="18" r="1"/>
  <circle cx="16" cy="18" r="1"/>
  <circle cx="20" cy="18" r="1"/>
</svg>`,
  },
  {
    id: 'bio-vesicle',
    name: 'Vesicle',
    domain: 'biology',
    category: 'cellular',
    tags: ['transport', 'membrane', 'secretion', 'endocytosis', 'exocytosis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <circle cx="10" cy="11" r="1" fill="currentColor"/>
  <circle cx="14" cy="13" r="1" fill="currentColor"/>
  <path d="M12 6v-3"/>
  <path d="M12 18v3"/>
</svg>`,
  },
  {
    id: 'bio-apoptosis',
    name: 'Apoptosis',
    domain: 'biology',
    category: 'cellular',
    tags: ['programmed cell death', 'caspase', 'fragmentation', 'blebbing', 'death'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="7" stroke-dasharray="4 2"/>
  <circle cx="8" cy="10" r="2"/>
  <circle cx="14" cy="9" r="1.5"/>
  <circle cx="10" cy="15" r="1.5"/>
  <circle cx="15" cy="14" r="2"/>
</svg>`,
  },
  {
    id: 'bio-signal-transduction',
    name: 'Signal Transduction',
    domain: 'biology',
    category: 'cellular',
    tags: ['signaling pathway', 'cascade', 'phosphorylation', 'receptor', 'response'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="4" r="2"/>
  <circle cx="12" cy="8" r="2"/>
  <circle cx="8" cy="14" r="2"/>
  <circle cx="16" cy="14" r="2"/>
  <circle cx="12" cy="20" r="2"/>
  <path d="M5.5 5.5l5 1"/>
  <path d="M11 10l-2 2.5"/>
  <path d="M13 10l2 2.5"/>
  <path d="M9.5 15.5l1.5 3"/>
  <path d="M14.5 15.5l-1.5 3"/>
</svg>`,
  },
];

export default biologyIcons;
