/**
 * Bioicons Integration Module
 *
 * High-quality scientific icons for biological and life science illustrations.
 * These icons are designed for scientific diagrams and presentations.
 * Based on Bioicons (bioicons.com) - CC0/MIT/CC-BY licensed.
 *
 * Categories:
 * - Cell Biology: Cells, organelles, membranes
 * - Molecular Biology: DNA, RNA, proteins, enzymes
 * - Microbiology: Bacteria, viruses, fungi
 * - Biochemistry: Pathways, molecules, reactions
 * - Laboratory: Equipment, techniques
 * - Ecology: Ecosystems, food webs, biogeochemical cycles
 * - Anatomy: Organs, tissues, systems
 * - Genetics: Inheritance, chromosomes, epigenetics
 *
 * @see https://bioicons.com/
 */

/**
 * Bioicon metadata for search and categorization
 */
export interface BioiconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: 'CC0' | 'MIT' | 'CC-BY';
}

/**
 * SVG viewBox for all bioicons (24x24 standard)
 */
const VIEWBOX = '0 0 24 24';

/**
 * Cell Biology Icons
 */
const cellBiologyIcons: BioiconMeta[] = [
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    category: 'cell-biology',
    keywords: ['membrane', 'phospholipid', 'bilayer', 'plasma membrane', 'cell'],
    svg: '<path d="M2 12c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zm6 0c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zm6 0c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="10" r="1" fill="currentColor"/><circle cx="11" cy="10" r="1" fill="currentColor"/><circle cx="17" cy="10" r="1" fill="currentColor"/><circle cx="5" cy="14" r="1" fill="currentColor"/><circle cx="11" cy="14" r="1" fill="currentColor"/><circle cx="17" cy="14" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'animal-cell',
    name: 'Animal Cell',
    category: 'cell-biology',
    keywords: ['eukaryote', 'cell', 'animal', 'nucleus', 'organelles'],
    svg: '<ellipse cx="12" cy="12" rx="10" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><ellipse cx="6" cy="10" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="18" cy="10" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M7 15c1-1 2-1 3 0" stroke="currentColor" stroke-width="1" fill="none"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'plant-cell',
    name: 'Plant Cell',
    category: 'cell-biology',
    keywords: ['eukaryote', 'cell', 'plant', 'chloroplast', 'vacuole', 'cell wall'],
    svg: '<rect x="2" y="4" width="20" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><ellipse cx="12" cy="12" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="7" cy="9" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/><ellipse cx="17" cy="9" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/><ellipse cx="7" cy="15" rx="1.5" ry="1" fill="currentColor" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'nucleus',
    name: 'Nucleus',
    category: 'cell-biology',
    keywords: ['nucleus', 'nucleolus', 'nuclear envelope', 'chromatin', 'DNA'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    category: 'cell-biology',
    keywords: ['mitochondria', 'powerhouse', 'ATP', 'energy', 'organelle', 'cristae'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 12c0-2 2-3 3-3s2 1 2 3-1 3-2 3-3-1-3-3zm6 0c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3zm5 0c0-2 1-3 2-3s2 1 2 3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    category: 'cell-biology',
    keywords: ['chloroplast', 'photosynthesis', 'thylakoid', 'grana', 'plant'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="7" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><ellipse cx="12" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><ellipse cx="17" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.3"/><line x1="5" y1="10" x2="5" y2="14" stroke="currentColor" stroke-width="0.5"/><line x1="19" y1="10" x2="19" y2="14" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'endoplasmic-reticulum',
    name: 'Endoplasmic Reticulum',
    category: 'cell-biology',
    keywords: ['ER', 'rough ER', 'smooth ER', 'ribosomes', 'protein synthesis'],
    svg: '<path d="M4 8c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 16c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="0.7" fill="currentColor"/><circle cx="9" cy="8" r="0.7" fill="currentColor"/><circle cx="13" cy="8" r="0.7" fill="currentColor"/><circle cx="5" cy="12" r="0.7" fill="currentColor"/><circle cx="13" cy="12" r="0.7" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'golgi-apparatus',
    name: 'Golgi Apparatus',
    category: 'cell-biology',
    keywords: ['golgi', 'golgi body', 'cisternae', 'vesicles', 'protein modification'],
    svg: '<path d="M4 7c4 1 12 1 16 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 10c3 1 10 1 14 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 13c3 1 8 1 12 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 16c2 1 6 1 10 0" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="9" r="1" fill="currentColor"/><circle cx="18" cy="14" r="1" fill="currentColor"/><circle cx="5" cy="14" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ribosome',
    name: 'Ribosome',
    category: 'cell-biology',
    keywords: ['ribosome', 'protein synthesis', 'translation', 'RNA', 'subunit'],
    svg: '<ellipse cx="12" cy="10" rx="6" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="15" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10l-2 2" stroke="currentColor" stroke-width="1"/><path d="M18 10l2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lysosome',
    name: 'Lysosome',
    category: 'cell-biology',
    keywords: ['lysosome', 'digestion', 'enzyme', 'vesicle', 'autophagy'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="13" cy="13" r="1.5" fill="currentColor"/><circle cx="15" cy="15" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'vesicle',
    name: 'Vesicle',
    category: 'cell-biology',
    keywords: ['vesicle', 'transport', 'exocytosis', 'endocytosis', 'membrane'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'cytoskeleton',
    name: 'Cytoskeleton',
    category: 'cell-biology',
    keywords: ['cytoskeleton', 'microtubules', 'actin', 'filaments', 'structure'],
    svg: '<line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'centriole',
    name: 'Centriole',
    category: 'cell-biology',
    keywords: ['centriole', 'centrosome', 'cell division', 'microtubules', 'spindle'],
    svg: '<rect x="8" y="4" width="8" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" stroke-width="1"/><line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="1"/><line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1"/><line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'peroxisome',
    name: 'Peroxisome',
    category: 'cell-biology',
    keywords: ['peroxisome', 'oxidation', 'catalase', 'detoxification', 'organelle'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Molecular Biology Icons
 */
const molecularBiologyIcons: BioiconMeta[] = [
  {
    id: 'dna-helix',
    name: 'DNA Helix',
    category: 'molecular-biology',
    keywords: ['DNA', 'double helix', 'genetics', 'nucleotide', 'gene'],
    svg: '<path d="M6 2c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c0 4 4 5 6 5s6-1 6-5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="16" y2="4" stroke="currentColor" stroke-width="1"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="1"/><line x1="8" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'rna-strand',
    name: 'RNA Strand',
    category: 'molecular-biology',
    keywords: ['RNA', 'mRNA', 'tRNA', 'rRNA', 'transcription', 'single strand'],
    svg: '<path d="M4 4c2 2 4 0 6 2s4 0 6 2 2 4 4 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="1.5" fill="currentColor"/><circle cx="10" cy="6" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><path d="M4 14c2 2 4 0 6 2s4 0 6 2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="14" r="1.5" fill="currentColor"/><circle cx="10" cy="16" r="1.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'protein-structure',
    name: 'Protein Structure',
    category: 'molecular-biology',
    keywords: ['protein', 'amino acid', 'folding', 'tertiary', 'structure'],
    svg: '<path d="M4 12c0-4 3-6 6-6s4 2 4 4-2 4-4 6 2 4 6 4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.5"/><circle cx="10" cy="6" r="2" fill="currentColor" opacity="0.5"/><circle cx="14" cy="10" r="2" fill="currentColor" opacity="0.5"/><circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'enzyme',
    name: 'Enzyme',
    category: 'molecular-biology',
    keywords: ['enzyme', 'catalyst', 'active site', 'substrate', 'reaction'],
    svg: '<path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10c0-2 2-4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="12" r="3" fill="currentColor" opacity="0.3"/><path d="M18 8l3-3M18 16l3 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'amino-acid',
    name: 'Amino Acid',
    category: 'molecular-biology',
    keywords: ['amino acid', 'protein', 'peptide', 'residue', 'R group'],
    svg: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">R</text><text x="12" y="3" text-anchor="middle" font-size="3" fill="currentColor">NH2</text><text x="12" y="22" text-anchor="middle" font-size="3" fill="currentColor">COOH</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'nucleotide',
    name: 'Nucleotide',
    category: 'molecular-biology',
    keywords: ['nucleotide', 'base', 'sugar', 'phosphate', 'DNA', 'RNA'],
    svg: '<polygon points="12,4 16,8 16,14 12,18 8,14 8,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="20" r="1.5" fill="currentColor"/><line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'codon',
    name: 'Codon',
    category: 'molecular-biology',
    keywords: ['codon', 'triplet', 'genetic code', 'translation', 'mRNA'],
    svg: '<rect x="3" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9.5" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="5.5" y="13" text-anchor="middle" font-size="4" fill="currentColor">A</text><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">U</text><text x="18.5" y="13" text-anchor="middle" font-size="4" fill="currentColor">G</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gene',
    name: 'Gene',
    category: 'molecular-biology',
    keywords: ['gene', 'exon', 'intron', 'promoter', 'coding sequence'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><rect x="10" y="10" width="3" height="4" fill="currentColor" opacity="0.5"/><rect x="16" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><path d="M2 10L4 6M22 10L20 6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'promoter',
    name: 'Promoter',
    category: 'molecular-biology',
    keywords: ['promoter', 'transcription', 'TATA box', 'gene expression', 'regulation'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="8,6 14,6 11,10" fill="currentColor"/><path d="M11 6V3" stroke="currentColor" stroke-width="1.5"/><circle cx="11" cy="2" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'plasmid',
    name: 'Plasmid',
    category: 'molecular-biology',
    keywords: ['plasmid', 'vector', 'cloning', 'circular DNA', 'bacteria'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="12" r="1" fill="currentColor"/><circle cx="17" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chromosome',
    name: 'Chromosome',
    category: 'molecular-biology',
    keywords: ['chromosome', 'chromatin', 'centromere', 'sister chromatids', 'karyotype'],
    svg: '<path d="M8 4c-2 0-3 2-3 4s1 3 3 3h0c2 0 3 2 3 4s-1 5-3 5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 4c2 0 3 2 3 4s-1 3-3 3h0c-2 0-3 2-3 4s1 5 3 5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'helicase',
    name: 'Helicase',
    category: 'molecular-biology',
    keywords: ['helicase', 'DNA replication', 'unwinding', 'enzyme', 'replication fork'],
    svg: '<path d="M4 8c4 0 4 4 8 4s4-4 8-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 16c4 0 4-4 8-4s4 4 8 4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l4 4M14 10l-4 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Microbiology Icons
 */
const microbiologyIcons: BioiconMeta[] = [
  {
    id: 'bacterium',
    name: 'Bacterium',
    category: 'microbiology',
    keywords: ['bacteria', 'prokaryote', 'microbe', 'rod', 'bacillus'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="6" ry="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="8" cy="12" r="1" fill="currentColor"/><line x1="4" y1="8" x2="2" y2="5" stroke="currentColor" stroke-width="1"/><line x1="4" y1="16" x2="2" y2="19" stroke="currentColor" stroke-width="1"/><line x1="20" y1="8" x2="22" y2="5" stroke="currentColor" stroke-width="1"/><line x1="20" y1="16" x2="22" y2="19" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'coccus',
    name: 'Coccus',
    category: 'microbiology',
    keywords: ['coccus', 'bacteria', 'spherical', 'staphylococcus', 'streptococcus'],
    svg: '<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'spirillum',
    name: 'Spirillum',
    category: 'microbiology',
    keywords: ['spirillum', 'bacteria', 'spiral', 'helical', 'spirochete'],
    svg: '<path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="2" cy="12" r="1" fill="currentColor"/><circle cx="22" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'virus-particle',
    name: 'Virus Particle',
    category: 'microbiology',
    keywords: ['virus', 'virion', 'pathogen', 'infection', 'capsid'],
    svg: '<polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" stroke-width="1"/><line x1="22" y1="8" x2="19" y2="9" stroke="currentColor" stroke-width="1"/><line x1="22" y1="16" x2="19" y2="15" stroke="currentColor" stroke-width="1"/><line x1="12" y1="22" x2="12" y2="19" stroke="currentColor" stroke-width="1"/><line x1="2" y1="16" x2="5" y2="15" stroke="currentColor" stroke-width="1"/><line x1="2" y1="8" x2="5" y2="9" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bacteriophage',
    name: 'Bacteriophage',
    category: 'microbiology',
    keywords: ['phage', 'bacteriophage', 'virus', 'T4', 'bacteria eater'],
    svg: '<polygon points="12,2 18,8 12,10 6,8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" stroke-width="2"/><path d="M8 16l-4 6M12 16v6M16 16l4 6" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="13" x2="5" y2="15" stroke="currentColor" stroke-width="1"/><line x1="15" y1="13" x2="19" y2="15" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'coronavirus',
    name: 'Coronavirus',
    category: 'microbiology',
    keywords: ['coronavirus', 'covid', 'SARS', 'spike protein', 'pandemic'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="2" r="1.5" fill="currentColor"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="22" r="1.5" fill="currentColor"/><line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="2" cy="12" r="1.5" fill="currentColor"/><line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="22" cy="12" r="1.5" fill="currentColor"/><line x1="5" y1="5" x2="8" y2="8" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="4.5" r="1.5" fill="currentColor"/><line x1="19" y1="5" x2="16" y2="8" stroke="currentColor" stroke-width="1.5"/><circle cx="19.5" cy="4.5" r="1.5" fill="currentColor"/><line x1="5" y1="19" x2="8" y2="16" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="19.5" r="1.5" fill="currentColor"/><line x1="19" y1="19" x2="16" y2="16" stroke="currentColor" stroke-width="1.5"/><circle cx="19.5" cy="19.5" r="1.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'yeast',
    name: 'Yeast',
    category: 'microbiology',
    keywords: ['yeast', 'fungus', 'saccharomyces', 'budding', 'fermentation'],
    svg: '<ellipse cx="10" cy="12" rx="6" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="17" cy="8" rx="4" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="7" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'fungal-hyphae',
    name: 'Fungal Hyphae',
    category: 'microbiology',
    keywords: ['hyphae', 'fungus', 'mycelium', 'mold', 'filamentous'],
    svg: '<path d="M2 20c4-4 6-8 10-8s6 4 10 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12c2-4 4-6 6-8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12c2 2 4 4 8 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="4" r="1" fill="currentColor"/><circle cx="20" cy="14" r="1" fill="currentColor"/><circle cx="22" cy="16" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'amoeba',
    name: 'Amoeba',
    category: 'microbiology',
    keywords: ['amoeba', 'protozoa', 'pseudopod', 'protist', 'unicellular'],
    svg: '<path d="M4 12c0-2 1-4 3-5s4 0 5-2 3-1 5 1 3 4 3 6-1 4-3 5-4 0-5 2-3 1-5-1-3-4-3-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.5"/><circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'paramecium',
    name: 'Paramecium',
    category: 'microbiology',
    keywords: ['paramecium', 'protozoa', 'cilia', 'protist', 'unicellular'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 9c1 0.5 1 1 1 1.5M3 15c1-0.5 1-1 1-1.5M21 9c-1 0.5-1 1-1 1.5M21 15c-1-0.5-1-1-1-1.5" stroke="currentColor" stroke-width="0.5"/><ellipse cx="8" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M14 10c2 0 3 1 4 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Biochemistry Icons
 */
const biochemistryIcons: BioiconMeta[] = [
  {
    id: 'atp-molecule',
    name: 'ATP Molecule',
    category: 'biochemistry',
    keywords: ['ATP', 'energy', 'adenosine triphosphate', 'metabolism', 'phosphate'],
    svg: '<polygon points="12,4 16,8 16,12 12,16 8,12 8,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="16" stroke="currentColor" stroke-width="1"/><line x1="10" y1="18" x2="8" y2="20" stroke="currentColor" stroke-width="1"/><line x1="14" y1="18" x2="16" y2="20" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'glucose',
    name: 'Glucose',
    category: 'biochemistry',
    keywords: ['glucose', 'sugar', 'carbohydrate', 'metabolism', 'glycolysis'],
    svg: '<polygon points="12,4 18,8 18,16 12,20 6,16 6,8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="3" y2="6" stroke="currentColor" stroke-width="1"/><line x1="18" y1="8" x2="21" y2="6" stroke="currentColor" stroke-width="1"/><line x1="6" y1="16" x2="3" y2="18" stroke="currentColor" stroke-width="1"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="21" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lipid-bilayer',
    name: 'Lipid Bilayer',
    category: 'biochemistry',
    keywords: ['lipid', 'membrane', 'phospholipid', 'bilayer', 'hydrophobic'],
    svg: '<circle cx="4" cy="6" r="2" fill="currentColor"/><line x1="4" y1="8" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="2" fill="currentColor"/><line x1="10" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="6" r="2" fill="currentColor"/><line x1="16" y1="8" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="18" r="2" fill="currentColor"/><line x1="7" y1="16" x2="7" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="18" r="2" fill="currentColor"/><line x1="13" y1="16" x2="13" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2" fill="currentColor"/><line x1="19" y1="16" x2="19" y2="12" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'enzyme-substrate',
    name: 'Enzyme Substrate Complex',
    category: 'biochemistry',
    keywords: ['enzyme', 'substrate', 'active site', 'lock and key', 'catalysis'],
    svg: '<path d="M4 8c0-2 2-4 6-4s6 2 6 4v8c0 2-2 4-6 4s-6-2-6-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8v4h0c2 0 4 1 4 2v2" fill="none" stroke="currentColor" stroke-width="1"/><rect x="16" y="8" width="6" height="4" rx="1" fill="currentColor" opacity="0.5"/><path d="M16 10h-2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'metabolic-pathway',
    name: 'Metabolic Pathway',
    category: 'biochemistry',
    keywords: ['metabolism', 'pathway', 'reaction', 'cycle', 'biochemistry'],
    svg: '<circle cx="4" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 11l4-4M14 8l4 3M18 13l-4 4M10 17l-4-4" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow)"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'krebs-cycle',
    name: 'Krebs Cycle',
    category: 'biochemistry',
    keywords: ['krebs', 'citric acid', 'TCA', 'cycle', 'respiration'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="1.5" fill="currentColor"/><circle cx="19" cy="9" r="1.5" fill="currentColor"/><circle cx="19" cy="15" r="1.5" fill="currentColor"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/><circle cx="5" cy="15" r="1.5" fill="currentColor"/><circle cx="5" cy="9" r="1.5" fill="currentColor"/><path d="M11 5l2 0M17 8l1 1M18 14l-1 1M13 19l-2 0M6 14l-1-1M6 10l1-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'glycolysis',
    name: 'Glycolysis',
    category: 'biochemistry',
    keywords: ['glycolysis', 'glucose', 'pyruvate', 'metabolism', 'energy'],
    svg: '<polygon points="12,2 16,6 14,6 14,10 10,10 10,6 8,6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" stroke-width="1.5"/><polygon points="10,14 14,14 13,18 11,18" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="18" x2="9" y2="22" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="18" x2="15" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="22" r="1" fill="currentColor"/><circle cx="15" cy="22" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'electron-transport',
    name: 'Electron Transport Chain',
    category: 'biochemistry',
    keywords: ['electron transport', 'ETC', 'oxidative phosphorylation', 'ATP', 'mitochondria'],
    svg: '<rect x="2" y="8" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="6" width="4" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="8" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="20" y="4" width="2" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10l2-2M12 8l2 2M18 10l2-4" stroke="currentColor" stroke-width="1"/><circle cx="7" cy="9" r="0.5" fill="currentColor"/><circle cx="13" cy="9" r="0.5" fill="currentColor"/><circle cx="19" cy="7" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'water-molecule',
    name: 'Water Molecule',
    category: 'biochemistry',
    keywords: ['water', 'H2O', 'molecule', 'polar', 'solvent'],
    svg: '<circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="13" x2="7" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="13" x2="17" y2="14" stroke="currentColor" stroke-width="1.5"/><text x="12" y="11" text-anchor="middle" font-size="3" fill="currentColor">O</text><text x="6" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text><text x="18" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    category: 'biochemistry',
    keywords: ['CO2', 'carbon dioxide', 'respiration', 'photosynthesis', 'gas'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2"/><line x1="15" y1="12" x2="17" y2="12" stroke="currentColor" stroke-width="2"/><text x="12" y="13" text-anchor="middle" font-size="3" fill="currentColor">C</text><text x="5" y="13" text-anchor="middle" font-size="2.5" fill="currentColor">O</text><text x="19" y="13" text-anchor="middle" font-size="2.5" fill="currentColor">O</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Laboratory Equipment Icons
 */
const laboratoryIcons: BioiconMeta[] = [
  {
    id: 'test-tube',
    name: 'Test Tube',
    category: 'laboratory',
    keywords: ['test tube', 'tube', 'experiment', 'sample', 'chemistry'],
    svg: '<path d="M8 2h8v2H8zM9 4v14c0 2 1.5 4 3 4s3-2 3-4V4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 14c1.5 0 3 1 4.5 1s2.5-1 2.5-1" fill="currentColor" opacity="0.3"/><line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'erlenmeyer-flask',
    name: 'Erlenmeyer Flask',
    category: 'laboratory',
    keywords: ['flask', 'erlenmeyer', 'conical', 'chemistry', 'experiment'],
    svg: '<path d="M10 2h4v6l6 12H4l6-12V2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="2" x2="15" y2="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c2 0 4 1 6 1s4-1 6-1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'laboratory',
    keywords: ['beaker', 'container', 'chemistry', 'lab', 'glassware'],
    svg: '<path d="M4 4h16v14c0 2-2 4-4 4H8c-2 0-4-2-4-4V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4h4l-2-2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="8" y2="8" stroke="currentColor" stroke-width="1"/><line x1="6" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="1"/><line x1="6" y1="16" x2="8" y2="16" stroke="currentColor" stroke-width="1"/><path d="M4 14c4 0 8 2 12 2s4-2 4-2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pipette',
    name: 'Pipette',
    category: 'laboratory',
    keywords: ['pipette', 'transfer', 'precision', 'liquid', 'measure'],
    svg: '<path d="M12 2c1 0 2 1 2 2v4l2 2v8l-2 4h-4l-2-4v-8l2-2V4c0-1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="1"/><line x1="10" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="1"/><line x1="10" y1="16" x2="14" y2="16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'petri-dish',
    name: 'Petri Dish',
    category: 'laboratory',
    keywords: ['petri dish', 'culture', 'bacteria', 'agar', 'microbiology'],
    svg: '<ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="14" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="11" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="11" cy="13" r="0.8" fill="currentColor" opacity="0.5"/><circle cx="16" cy="13" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'microscope-slide',
    name: 'Microscope Slide',
    category: 'laboratory',
    keywords: ['slide', 'microscope', 'specimen', 'sample', 'histology'],
    svg: '<rect x="4" y="6" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="9" width="8" height="6" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'centrifuge-tube',
    name: 'Centrifuge Tube',
    category: 'laboratory',
    keywords: ['centrifuge', 'tube', 'eppendorf', 'microcentrifuge', 'sample'],
    svg: '<path d="M8 2h8l-1 2H9l-1-2zM9 4h6v8l-3 10-3-10V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8h6" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="14" rx="2" ry="1" fill="currentColor" opacity="0.4"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gel-electrophoresis',
    name: 'Gel Electrophoresis',
    category: 'laboratory',
    keywords: ['electrophoresis', 'gel', 'DNA', 'bands', 'separation'],
    svg: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="7" width="2" height="1" fill="currentColor"/><rect x="6" y="10" width="2" height="1" fill="currentColor"/><rect x="6" y="14" width="2" height="1" fill="currentColor"/><rect x="11" y="7" width="2" height="1" fill="currentColor"/><rect x="11" y="11" width="2" height="1" fill="currentColor"/><rect x="11" y="16" width="2" height="1" fill="currentColor"/><rect x="16" y="7" width="2" height="1" fill="currentColor"/><rect x="16" y="9" width="2" height="1" fill="currentColor"/><rect x="16" y="12" width="2" height="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pcr-tube',
    name: 'PCR Tube',
    category: 'laboratory',
    keywords: ['PCR', 'tube', 'thermocycler', 'amplification', 'DNA'],
    svg: '<path d="M8 4h8c1 0 2 1 2 2H6c0-1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 6h10v4l-2 10H9L7 10V6z" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3" ry="1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'well-plate',
    name: '96-Well Plate',
    category: 'laboratory',
    keywords: ['well plate', 'microplate', '96 well', 'assay', 'screening'],
    svg: '<rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="8" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="11" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="5" cy="12" r="1" fill="currentColor" opacity="0.4"/><circle cx="8" cy="12" r="1" fill="currentColor" opacity="0.4"/><circle cx="11" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="5" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="8" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="11" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="14" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="17" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/><circle cx="20" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner',
    category: 'laboratory',
    keywords: ['bunsen', 'burner', 'flame', 'heat', 'chemistry'],
    svg: '<rect x="8" y="14" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 14V10c0-1 1-2 2-2s2 1 2 2v4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2c-2 2-2 4 0 6 2-2 2-4 0-6z" fill="currentColor" opacity="0.6"/><line x1="8" y1="18" x2="6" y2="20" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lab-coat',
    name: 'Lab Coat',
    category: 'laboratory',
    keywords: ['lab coat', 'PPE', 'scientist', 'safety', 'clothing'],
    svg: '<path d="M8 4c0-1 2-2 4-2s4 1 4 2l2 6v10H6V10l2-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4l-4 4v6h4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4l4 4v6h-4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="6" x2="12" y2="20" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="10" r="0.8" fill="currentColor"/><circle cx="10" cy="13" r="0.8" fill="currentColor"/><circle cx="14" cy="10" r="0.8" fill="currentColor"/><circle cx="14" cy="13" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Ecology Icons
 */
const ecologyIcons: BioiconMeta[] = [
  {
    id: 'food-web',
    name: 'Food Web',
    category: 'ecology',
    keywords: ['food web', 'trophic', 'ecosystem', 'network', 'feeding relationships'],
    svg: '<circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v0l-5.5 4.5M12 6l5.5 4.5M6.5 13.5l2 5M17.5 13.5l-2 5M10 20h4M7 12h10" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'food-chain',
    name: 'Food Chain',
    category: 'ecology',
    keywords: ['food chain', 'linear', 'trophic level', 'predator prey', 'energy flow'],
    svg: '<circle cx="4" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 12h4M14 12h4" stroke="currentColor" stroke-width="1.5"/><path d="M9 10l1 2-1 2M17 10l1 2-1 2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'producer',
    name: 'Producer',
    category: 'ecology',
    keywords: ['producer', 'autotroph', 'plant', 'photosynthesis', 'primary producer'],
    svg: '<path d="M12 22v-10" stroke="currentColor" stroke-width="1.5"/><path d="M12 12c-4 0-6-4-4-7 1 2 3 3 4 3s3-1 4-3c2 3 0 7-4 7z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7c-2-3-1-5 1-5 0 2 1 3 2 4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M9 20c0-2 1-3 3-3s3 1 3 3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'primary-consumer',
    name: 'Primary Consumer',
    category: 'ecology',
    keywords: ['herbivore', 'primary consumer', 'grazer', 'plant eater', 'trophic level 2'],
    svg: '<ellipse cx="10" cy="12" rx="6" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="9" r="0.8" fill="currentColor"/><path d="M19 8l2-1M19 11l2 1" stroke="currentColor" stroke-width="1"/><path d="M4 14l-1 4M6 15l0 4M14 15l0 3M12 15l-1 3" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'secondary-consumer',
    name: 'Secondary Consumer',
    category: 'ecology',
    keywords: ['carnivore', 'secondary consumer', 'predator', 'meat eater', 'trophic level 3'],
    svg: '<ellipse cx="11" cy="12" rx="7" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 12c2 0 3-1 3-2s-1-2-3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="10" r="1" fill="currentColor"/><path d="M4 13l1 1 1-1 1 1 1-1" stroke="currentColor" stroke-width="1"/><path d="M5 15l-1 4M8 16l0 3M14 16l1 3M17 14l2 3" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'decomposer',
    name: 'Decomposer',
    category: 'ecology',
    keywords: ['decomposer', 'fungi', 'bacteria', 'detritivore', 'nutrient cycling'],
    svg: '<path d="M12 20c-3 0-5-2-5-4 0-3 2-4 3-6 0-2-1-4-1-6 0-1 1-2 3-2s3 1 3 2c0 2-1 4-1 6 1 2 3 3 3 6 0 2-2 4-5 4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="14" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="15" r="0.8" fill="currentColor" opacity="0.5"/><circle cx="12" cy="17" r="0.6" fill="currentColor" opacity="0.5"/><path d="M9 6c-2 1-3 0-4-1M15 6c2 1 3 0 4-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'energy-pyramid',
    name: 'Energy Pyramid',
    category: 'ecology',
    keywords: ['energy pyramid', 'trophic pyramid', 'biomass', 'ecological pyramid', 'energy transfer'],
    svg: '<path d="M12 2l10 18H2L12 2z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="14" x2="19" y2="14" stroke="currentColor" stroke-width="1"/><line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1"/><line x1="9" y1="6" x2="15" y2="6" stroke="currentColor" stroke-width="1"/><text x="12" y="18" text-anchor="middle" font-size="3" fill="currentColor">P</text><text x="12" y="13" text-anchor="middle" font-size="3" fill="currentColor">C1</text><text x="12" y="9" text-anchor="middle" font-size="3" fill="currentColor">C2</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'carbon-cycle',
    name: 'Carbon Cycle',
    category: 'ecology',
    keywords: ['carbon cycle', 'CO2', 'biogeochemical', 'respiration', 'photosynthesis'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="1"/><path d="M8 8l2 2M14 14l2 2M8 16l2-2M14 8l2-2" stroke="currentColor" stroke-width="1"/><text x="12" y="13" text-anchor="middle" font-size="4" font-weight="bold" fill="currentColor">C</text><path d="M6 5l1 1M18 5l-1 1M6 19l1-1M18 19l-1-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'nitrogen-cycle',
    name: 'Nitrogen Cycle',
    category: 'ecology',
    keywords: ['nitrogen cycle', 'N2', 'fixation', 'nitrification', 'denitrification'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4c0 3-2 4-2 6s2 3 2 6" stroke="currentColor" stroke-width="1"/><path d="M12 4c0 3 2 4 2 6s-2 3-2 6" stroke="currentColor" stroke-width="1"/><text x="12" y="13" text-anchor="middle" font-size="4" font-weight="bold" fill="currentColor">N</text><circle cx="12" cy="4" r="1" fill="currentColor"/><circle cx="12" cy="20" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="20" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'water-cycle',
    name: 'Water Cycle',
    category: 'ecology',
    keywords: ['water cycle', 'hydrological', 'evaporation', 'precipitation', 'condensation'],
    svg: '<path d="M4 18c0-2 2-3 4-3s4 1 4 3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 18c0-2 2-3 4-3s4 1 4 3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 14c2-4 4-8 6-10 2 2 4 6 6 10" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><path d="M4 6c2 0 3-1 5-1s3 1 5 1 3-1 5-1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="6" r="0.8" fill="currentColor"/><circle cx="12" cy="6" r="0.8" fill="currentColor"/><circle cx="18" cy="6" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    category: 'ecology',
    keywords: ['ecosystem', 'biome', 'community', 'habitat', 'environment'],
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 16c0-2 2-4 4-4s4 2 4 4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 12v-6" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c-2 0-3-2-2-4 1 1 2 2 2 2s1-1 2-2c1 2 0 4-2 4z" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="18" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 18c2-1 4-1 6 0M15 18c2-1 4-1 6 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'population-growth',
    name: 'Population Growth Curve',
    category: 'ecology',
    keywords: ['population growth', 'exponential', 'logistic', 'S curve', 'J curve'],
    svg: '<path d="M4 18L4 4M4 18h16" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c2-1 4-2 6-6s4-4 6-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="18" cy="6" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'carrying-capacity',
    name: 'Carrying Capacity',
    category: 'ecology',
    keywords: ['carrying capacity', 'K', 'logistic growth', 'population limit', 'equilibrium'],
    svg: '<path d="M4 18L4 4M4 18h16" stroke="currentColor" stroke-width="1.5"/><path d="M4 8h16" stroke="currentColor" stroke-width="1" stroke-dasharray="3 2"/><path d="M6 16c1-1 2-3 4-5s4-2 8-2" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="21" y="9" font-size="4" font-weight="bold" fill="currentColor">K</text><circle cx="6" cy="16" r="0.8" fill="currentColor"/><circle cx="10" cy="11" r="0.8" fill="currentColor"/><circle cx="18" cy="9" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'biodiversity',
    name: 'Biodiversity',
    category: 'ecology',
    keywords: ['biodiversity', 'species richness', 'diversity', 'variety', 'conservation'],
    svg: '<circle cx="8" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="6" cy="14" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="12" width="4" height="4" rx="0.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 18c-1-2 0-4 2-4M12 18c1-2 0-4-2-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="1" fill="currentColor"/><path d="M8 8v2M16 8v2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'habitat',
    name: 'Habitat',
    category: 'ecology',
    keywords: ['habitat', 'niche', 'environment', 'home range', 'territory'],
    svg: '<ellipse cx="12" cy="14" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 12c0-3 1-6 3-7" fill="none" stroke="currentColor" stroke-width="1"/><path d="M18 12c0-3-1-6-3-7" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 4v2M12 6c-1 0-2 1-2 2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="15" cy="13" r="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 17c1 0 2-1 2-1s1 1 2 1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Immunology Icons
 */
const immunologyIcons: BioiconMeta[] = [
  {
    id: 't-cell',
    name: 'T Cell',
    category: 'immunology',
    keywords: ['t cell', 't lymphocyte', 'thymus', 'adaptive immunity', 'lymphocyte', 'CD3'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1"/><text x="12" y="14" text-anchor="middle" font-size="6" font-weight="bold" fill="currentColor">T</text><path d="M5 12h-2M19 12h2M12 5v-2M12 19v2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'b-cell',
    name: 'B Cell',
    category: 'immunology',
    keywords: ['b cell', 'b lymphocyte', 'bone marrow', 'antibody production', 'plasma cell', 'lymphocyte'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1"/><text x="12" y="14" text-anchor="middle" font-size="6" font-weight="bold" fill="currentColor">B</text><circle cx="6" cy="8" r="1" fill="currentColor"/><circle cx="18" cy="8" r="1" fill="currentColor"/><circle cx="6" cy="16" r="1" fill="currentColor"/><circle cx="18" cy="16" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'helper-t-cell',
    name: 'Helper T Cell (CD4+)',
    category: 'immunology',
    keywords: ['helper t cell', 'CD4', 'th1', 'th2', 'cytokine', 'immune regulation', 'Th17'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="10" text-anchor="middle" font-size="4" font-weight="bold" fill="currentColor">Th</text><text x="12" y="16" text-anchor="middle" font-size="4" fill="currentColor">CD4+</text><path d="M5 8l-2-2M19 8l2-2M5 16l-2 2M19 16l2 2" stroke="currentColor" stroke-width="1"/><circle cx="3" cy="6" r="1" fill="currentColor" opacity="0.6"/><circle cx="21" cy="6" r="1" fill="currentColor" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'cytotoxic-t-cell',
    name: 'Cytotoxic T Cell (CD8+)',
    category: 'immunology',
    keywords: ['cytotoxic t cell', 'CD8', 'killer t cell', 'CTL', 'perforin', 'granzyme', 'cell lysis'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="10" text-anchor="middle" font-size="4" font-weight="bold" fill="currentColor">Tc</text><text x="12" y="16" text-anchor="middle" font-size="4" fill="currentColor">CD8+</text><path d="M19 12l3 0M21 10l2 2-2 2" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="10" r="0.8" fill="currentColor"/><circle cx="8" cy="14" r="0.8" fill="currentColor"/><circle cx="16" cy="12" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'regulatory-t-cell',
    name: 'Regulatory T Cell (Treg)',
    category: 'immunology',
    keywords: ['regulatory t cell', 'Treg', 'CD25', 'FoxP3', 'immune suppression', 'tolerance', 'autoimmunity'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="14" text-anchor="middle" font-size="5" font-weight="bold" fill="currentColor">Treg</text><path d="M4 12c0-1 1-2 2-2M20 12c0-1-1-2-2-2" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="10" x2="6" y2="10" stroke="currentColor" stroke-width="1"/><line x1="18" y1="10" x2="22" y2="10" stroke="currentColor" stroke-width="1"/><line x1="4" y1="8" x2="4" y2="12" stroke="currentColor" stroke-width="1"/><line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'natural-killer-cell',
    name: 'Natural Killer Cell',
    category: 'immunology',
    keywords: ['NK cell', 'natural killer', 'innate immunity', 'cytotoxic', 'tumor surveillance', 'viral infection'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="14" text-anchor="middle" font-size="5" font-weight="bold" fill="currentColor">NK</text><path d="M5 7l-2-3M19 7l2-3M5 17l-2 3M19 17l2 3" stroke="currentColor" stroke-width="1.5"/><circle cx="3" cy="4" r="1.5" fill="currentColor"/><circle cx="21" cy="4" r="1.5" fill="currentColor"/><circle cx="3" cy="20" r="1.5" fill="currentColor"/><circle cx="21" cy="20" r="1.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'macrophage',
    name: 'Macrophage',
    category: 'immunology',
    keywords: ['macrophage', 'phagocyte', 'monocyte', 'antigen presenting', 'innate immunity', 'phagocytosis'],
    svg: '<path d="M12 4c-5 0-8 4-8 8s3 8 8 8 8-4 8-8-3-8-8-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 10c-1 0-2 1-2 2s1 2 2 2M20 10c1 0 2 1 2 2s-1 2-2 2" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="15" cy="11" r="2" fill="currentColor" opacity="0.5"/><circle cx="10" cy="14" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="15" r="1.5" fill="currentColor" opacity="0.5"/><ellipse cx="12" cy="12" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'dendritic-cell',
    name: 'Dendritic Cell',
    category: 'immunology',
    keywords: ['dendritic cell', 'antigen presenting', 'APC', 'DC', 'immune activation', 'T cell priming'],
    svg: '<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l3 3M15.5 15.5l3 3M5.5 18.5l3-3M15.5 8.5l3-3" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="3" r="1" fill="currentColor"/><circle cx="12" cy="21" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="21" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="19" cy="19" r="1" fill="currentColor"/><circle cx="5" cy="19" r="1" fill="currentColor"/><circle cx="19" cy="5" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'neutrophil',
    name: 'Neutrophil',
    category: 'immunology',
    keywords: ['neutrophil', 'PMN', 'granulocyte', 'phagocyte', 'innate immunity', 'inflammation', 'pus'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10c0-1 1-2 2-2s2 1 2 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 10c0-1 1-2 2-2s2 1 2 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 14c0 1 1 2 2 2s2-1 2-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="1" fill="currentColor" opacity="0.3"/><circle cx="14" cy="10" r="1" fill="currentColor" opacity="0.3"/><circle cx="11" cy="14" r="1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'eosinophil',
    name: 'Eosinophil',
    category: 'immunology',
    keywords: ['eosinophil', 'granulocyte', 'allergy', 'parasites', 'inflammation', 'asthma'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="9" cy="11" rx="2.5" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="15" cy="13" rx="2.5" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="0.8" fill="currentColor"/><circle cx="9" cy="11" r="0.8" fill="currentColor"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/><circle cx="15" cy="11" r="0.8" fill="currentColor"/><circle cx="15" cy="13" r="0.8" fill="currentColor"/><circle cx="15" cy="15" r="0.8" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'basophil',
    name: 'Basophil',
    category: 'immunology',
    keywords: ['basophil', 'granulocyte', 'histamine', 'allergy', 'IgE', 'inflammation'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.6"/><circle cx="14" cy="9" r="2" fill="currentColor" opacity="0.6"/><circle cx="8" cy="14" r="2" fill="currentColor" opacity="0.6"/><circle cx="13" cy="14" r="2" fill="currentColor" opacity="0.6"/><circle cx="16" cy="12" r="1.5" fill="currentColor" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mast-cell',
    name: 'Mast Cell',
    category: 'immunology',
    keywords: ['mast cell', 'histamine', 'allergy', 'anaphylaxis', 'IgE receptor', 'degranulation'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="9" r="1.5" fill="currentColor"/><circle cx="7" cy="13" r="1.5" fill="currentColor"/><circle cx="11" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="13" r="1.5" fill="currentColor"/><circle cx="9" cy="16" r="1.5" fill="currentColor"/><circle cx="14" cy="16" r="1.5" fill="currentColor"/><path d="M19 6l2-2M5 6l-2-2M19 18l2 2" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'antibody-igg',
    name: 'Antibody (IgG)',
    category: 'immunology',
    keywords: ['antibody', 'IgG', 'immunoglobulin', 'Y-shaped', 'neutralization', 'opsonization', 'humoral'],
    svg: '<path d="M12 8v8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8l-6-4" stroke="currentColor" stroke-width="1.5"/><path d="M12 8l6-4" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="12" x2="14" y2="12" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'antibody-igm',
    name: 'Antibody (IgM Pentamer)',
    category: 'immunology',
    keywords: ['IgM', 'pentamer', 'immunoglobulin', 'primary response', 'complement', 'agglutination'],
    svg: '<circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 10v-4l-2-2M12 10v-4l2-2" stroke="currentColor" stroke-width="1"/><path d="M13.9 11l3.5-2 2.4 0.5M13.9 11l3.5-2 1.4-2" stroke="currentColor" stroke-width="1"/><path d="M13.2 13.5l2 3.5 2.4-0.5M13.2 13.5l2 3.5-0.5 2.2" stroke="currentColor" stroke-width="1"/><path d="M10.8 13.5l-2 3.5-2.4-0.5M10.8 13.5l-2 3.5 0.5 2.2" stroke="currentColor" stroke-width="1"/><path d="M10.1 11l-3.5-2-2.4 0.5M10.1 11l-3.5-2-1.4-2" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="4" r="1" fill="currentColor"/><circle cx="14" cy="4" r="1" fill="currentColor"/><circle cx="20" cy="9" r="1" fill="currentColor"/><circle cx="19" cy="7" r="1" fill="currentColor"/><circle cx="17" cy="17" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="4" cy="9" r="1" fill="currentColor"/><circle cx="5" cy="7" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'antibody-iga',
    name: 'Antibody (IgA Dimer)',
    category: 'immunology',
    keywords: ['IgA', 'dimer', 'secretory', 'mucosal immunity', 'immunoglobulin', 'gut'],
    svg: '<path d="M8 10v6" stroke="currentColor" stroke-width="1.5"/><path d="M8 10l-4-4" stroke="currentColor" stroke-width="1.5"/><path d="M8 10l4-4" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 10v6" stroke="currentColor" stroke-width="1.5"/><path d="M16 10l-4-4" stroke="currentColor" stroke-width="1.5"/><path d="M16 10l4-4" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="18" rx="5" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="16" x2="8" y2="17" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="16" x2="16" y2="17" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'complement-cascade',
    name: 'Complement Cascade',
    category: 'immunology',
    keywords: ['complement', 'cascade', 'MAC', 'C3', 'C5', 'innate immunity', 'lysis', 'opsonization'],
    svg: '<circle cx="6" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 6v2l3 2" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 10h2" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 12v2l-3 2" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M14 16l4 0" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="6" y="5" text-anchor="middle" font-size="2.5" fill="currentColor">C3</text><text x="15" y="11" text-anchor="middle" font-size="2.5" fill="currentColor">C5</text><text x="12" y="17" text-anchor="middle" font-size="2" fill="currentColor">MAC</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'antigen-presenting',
    name: 'Antigen Presenting',
    category: 'immunology',
    keywords: ['antigen presenting', 'APC', 'MHC', 'peptide', 'T cell activation', 'immune synapse'],
    svg: '<ellipse cx="8" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><path d="M10 12h-2M14 12h2" stroke="currentColor" stroke-width="1.5"/><text x="5" y="10" text-anchor="middle" font-size="3" fill="currentColor">APC</text><text x="19" y="10" text-anchor="middle" font-size="3" fill="currentColor">T</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mhc-class-i',
    name: 'MHC Class I',
    category: 'immunology',
    keywords: ['MHC class I', 'HLA', 'antigen presentation', 'CD8', 'cytotoxic', 'peptide binding'],
    svg: '<rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="7" width="6" height="4" fill="currentColor" opacity="0.4"/><line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" stroke-width="1"/><text x="12" y="16" text-anchor="middle" font-size="4" fill="currentColor">I</text><path d="M12 4v-2M12 20v2" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="2" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mhc-class-ii',
    name: 'MHC Class II',
    category: 'immunology',
    keywords: ['MHC class II', 'HLA-DR', 'antigen presentation', 'CD4', 'helper T cell', 'exogenous'],
    svg: '<rect x="4" y="4" width="7" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="7" width="8" height="4" fill="currentColor" opacity="0.4"/><line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="1"/><text x="7.5" y="16" text-anchor="middle" font-size="3" fill="currentColor">a</text><text x="16.5" y="16" text-anchor="middle" font-size="3" fill="currentColor">b</text><text x="12" y="15" text-anchor="middle" font-size="4" fill="currentColor">II</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'cytokine-release',
    name: 'Cytokine Release',
    category: 'immunology',
    keywords: ['cytokine', 'interleukin', 'IL', 'TNF', 'interferon', 'signaling', 'inflammation', 'immune response'],
    svg: '<circle cx="8" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M13 8l4-3" stroke="currentColor" stroke-width="1"/><path d="M13 10l5-1" stroke="currentColor" stroke-width="1"/><path d="M13 12l5 0" stroke="currentColor" stroke-width="1"/><path d="M13 14l5 1" stroke="currentColor" stroke-width="1"/><path d="M13 16l4 3" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="5" r="1.5" fill="currentColor"/><circle cx="18" cy="9" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="15" r="1.5" fill="currentColor"/><circle cx="17" cy="19" r="1.5" fill="currentColor"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Anatomy Icons
 */
const anatomyIcons: BioiconMeta[] = [
  {
    id: 'brain-anatomy',
    name: 'Brain',
    category: 'anatomy',
    keywords: ['brain', 'neurology', 'nervous system', 'cerebrum', 'cortex'],
    svg: '<path d="M12 4c-4 0-7 3-7 6 0 2 1 3 2 4-1 1-1 2-1 3 0 2 2 4 4 4h4c2 0 4-2 4-4 0-1 0-2-1-3 1-1 2-2 2-4 0-3-3-6-7-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c1-1 3-1 4 0M12 8c1-1 3-1 4 0" stroke="currentColor" stroke-width="1"/><path d="M7 12c2 0 3 1 5 1s3-1 5-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'heart-anatomy',
    name: 'Heart',
    category: 'anatomy',
    keywords: ['heart', 'cardiac', 'cardiovascular', 'organ', 'circulation'],
    svg: '<path d="M12 6c-1-2-3-4-5-4s-4 2-4 5c0 4 5 8 9 11 4-3 9-7 9-11 0-3-2-5-4-5s-4 2-5 4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v4M10 8h4" stroke="currentColor" stroke-width="1"/><path d="M8 14c2 1 4 1 6 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lungs-anatomy',
    name: 'Lungs',
    category: 'anatomy',
    keywords: ['lungs', 'pulmonary', 'respiratory', 'breathing', 'alveoli'],
    svg: '<path d="M12 4v8" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c-4 0-6 4-6 8s2 6 4 6c1 0 2-1 2-2v-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c4 0 6 4 6 8s-2 6-4 6c-1 0-2-1-2-2v-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10c-1 0-2 1-2 2M16 10c1 0 2 1 2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'liver-anatomy',
    name: 'Liver',
    category: 'anatomy',
    keywords: ['liver', 'hepatic', 'organ', 'digestive', 'metabolism'],
    svg: '<path d="M4 10c0-2 2-4 4-4h8c3 0 5 2 5 5 0 4-3 7-8 7H8c-3 0-4-2-4-4v-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v12" stroke="currentColor" stroke-width="1"/><path d="M8 10c0 2 2 4 4 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'kidney-anatomy',
    name: 'Kidney',
    category: 'anatomy',
    keywords: ['kidney', 'renal', 'nephron', 'urinary', 'organ'],
    svg: '<path d="M12 4c-4 0-6 4-6 8s2 8 6 8 6-4 6-8-2-8-6-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4c-2 2-2 6 0 8s2 6 0 8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M9 12h6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'stomach-anatomy',
    name: 'Stomach',
    category: 'anatomy',
    keywords: ['stomach', 'gastric', 'digestive', 'GI', 'organ'],
    svg: '<path d="M8 6c-3 0-5 3-5 6s2 6 5 6h6c2 0 4-2 5-5 1-3 0-6-3-7H8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v0c0-2 2-4 4-4" stroke="currentColor" stroke-width="1.5"/><path d="M19 11c-1 0-2 1-2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'intestine-anatomy',
    name: 'Intestines',
    category: 'anatomy',
    keywords: ['intestine', 'bowel', 'colon', 'GI tract', 'digestive'],
    svg: '<path d="M6 4c2 0 4 2 4 2s-2 2-2 4 2 4 4 4-2 2-2 4 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4c2 0 4 2 4 2s-2 2-2 4 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 10c0 2-2 4-2 4s2 2 2 4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bone-anatomy',
    name: 'Bone',
    category: 'anatomy',
    keywords: ['bone', 'skeletal', 'femur', 'orthopedic', 'skeleton'],
    svg: '<path d="M8 4c-2 0-3 1-3 2s1 2 2 2c-1 0-2 1-2 2v6c0 1 1 2 2 2-1 0-2 1-2 2s1 2 3 2h0c2 0 3-1 3-2s-1-2-2-2c1 0 2-1 2-2v-6c0-1-1-2-2-2 1 0 2-1 2-2s-1-2-3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4c2 0 3 1 3 2s-1 2-2 2c1 0 2 1 2 2v6c0 1-1 2-2 2 1 0 2 1 2 2s-1 2-3 2h0c-2 0-3-1-3-2s1-2 2-2c-1 0-2-1-2-2v-6c0-1 1-2 2-2-1 0-2-1-2-2s1-2 3-2z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'muscle-anatomy',
    name: 'Muscle',
    category: 'anatomy',
    keywords: ['muscle', 'skeletal muscle', 'fiber', 'myocyte', 'muscular'],
    svg: '<path d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" fill="none" stroke="currentColor" stroke-width="2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'neuron',
    name: 'Neuron',
    category: 'anatomy',
    keywords: ['neuron', 'nerve cell', 'axon', 'dendrite', 'synapse'],
    svg: '<circle cx="8" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12h8" stroke="currentColor" stroke-width="1.5"/><path d="M18 12l2 2M18 12l2-2M20 14v-4" stroke="currentColor" stroke-width="1"/><path d="M4 8l-2-2M4 8l-2 2M4 16l-2 2M4 16l-2-2M6 8l-3-4M10 8l3-4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'eye-anatomy',
    name: 'Eye',
    category: 'anatomy',
    keywords: ['eye', 'vision', 'retina', 'optic', 'ophthalmology'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M3 12c0-3 4-6 9-6s9 3 9 6" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'skin-layers',
    name: 'Skin Layers',
    category: 'anatomy',
    keywords: ['skin', 'epidermis', 'dermis', 'integumentary', 'tissue'],
    svg: '<path d="M2 6h20" stroke="currentColor" stroke-width="1.5"/><path d="M2 10c2 1 4 0 6 1s4 0 6 1 4 0 6 1" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c2 1 4 0 6 1s4 0 6 1 4 0 6 1" stroke="currentColor" stroke-width="1.5"/><path d="M2 18h20" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="8" r="0.5" fill="currentColor"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/><circle cx="18" cy="8" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Genetics Icons
 */
const geneticsIcons: BioiconMeta[] = [
  {
    id: 'mendelian-inheritance',
    name: 'Mendelian Inheritance',
    category: 'genetics',
    keywords: ['mendel', 'dominant', 'recessive', 'inheritance', 'trait', 'allele'],
    svg: '<circle cx="12" cy="4" r="2" fill="currentColor"/><line x1="12" y1="6" x2="12" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="6" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="8" x2="18" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="14" r="2" fill="currentColor"/><circle cx="18" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="16" x2="6" y2="18" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="16" x2="18" y2="18" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="20" r="2" fill="currentColor" opacity="0.5"/><circle cx="18" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'punnett-square',
    name: 'Punnett Square',
    category: 'genetics',
    keywords: ['punnett', 'genetics', 'cross', 'genotype', 'phenotype', 'probability'],
    svg: '<rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5"/><text x="8" y="10" text-anchor="middle" font-size="4" fill="currentColor">Aa</text><text x="16" y="10" text-anchor="middle" font-size="4" fill="currentColor">AA</text><text x="8" y="18" text-anchor="middle" font-size="4" fill="currentColor">aa</text><text x="16" y="18" text-anchor="middle" font-size="4" fill="currentColor">Aa</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pedigree-chart',
    name: 'Pedigree Chart',
    category: 'genetics',
    keywords: ['pedigree', 'family tree', 'inheritance', 'genetic disorder', 'lineage'],
    svg: '<rect x="4" y="2" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="14" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="4" x2="11" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="10" x2="17" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="10" x2="5" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="10" x2="11" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="17" y1="10" x2="17" y2="12" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="12" width="4" height="4" fill="currentColor"/><circle cx="11" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="14" r="2" fill="currentColor"/><line x1="5" y1="16" x2="5" y2="18" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="18" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'karyotype',
    name: 'Karyotype',
    category: 'genetics',
    keywords: ['karyotype', 'chromosome', 'cytogenetics', 'chromosome analysis', 'aneuploidy'],
    svg: '<path d="M3 4c0 2 1 4 1 6s-1 4-1 6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 4c0 2-1 4-1 6s1 4 1 6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 4c0 2 1 4 1 6s-1 4-1 6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 4c0 2-1 4-1 6s1 4 1 6" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M13 5c0 1.5 1 3 1 5s-1 3.5-1 5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M15 5c0 1.5-1 3-1 5s1 3.5 1 5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M18 6c0 1 1 2 1 4s-1 3-1 4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M20 6c0 1-1 2-1 4s1 3 1 4" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="2" y1="18" x2="22" y2="18" stroke="currentColor" stroke-width="1"/><text x="4" y="22" font-size="3" fill="currentColor">1</text><text x="9" y="22" font-size="3" fill="currentColor">2</text><text x="14" y="22" font-size="3" fill="currentColor">3</text><text x="19" y="22" font-size="3" fill="currentColor">4</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'x-chromosome',
    name: 'X Chromosome',
    category: 'genetics',
    keywords: ['X chromosome', 'sex chromosome', 'female', 'XX', 'genetics'],
    svg: '<path d="M8 2c-2 0-3 2-3 4s1 4 3 4c-2 0-3 2-3 4s1 6 3 6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 2c2 0 3 2 3 4s-1 4-3 4c2 0 3 2 3 4s-1 6-3 6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="10" rx="2" ry="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'y-chromosome',
    name: 'Y Chromosome',
    category: 'genetics',
    keywords: ['Y chromosome', 'sex chromosome', 'male', 'XY', 'genetics', 'SRY'],
    svg: '<path d="M9 2c-2 0-3 1-3 3s1 3 3 3c-2 0-3 2-3 3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 2c2 0 3 1 3 3s-1 3-3 3c2 0 3 2 3 3" fill="none" stroke="currentColor" stroke-width="2"/><line x1="9" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><ellipse cx="12" cy="8" rx="1.5" ry="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'autosome',
    name: 'Autosome',
    category: 'genetics',
    keywords: ['autosome', 'chromosome', 'non-sex chromosome', 'somatic', 'diploid'],
    svg: '<path d="M8 3c-2 0-3 2-3 5s1 3 3 3c-2 0-3 1-3 4s1 5 3 5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 3c2 0 3 2 3 5s-1 3-3 3c2 0 3 1 3 4s-1 5-3 5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="9" width="4" height="4" rx="1" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'centromere',
    name: 'Centromere',
    category: 'genetics',
    keywords: ['centromere', 'chromosome', 'kinetochore', 'spindle', 'cell division'],
    svg: '<path d="M7 2c-2 0-3 2-3 4s1 4 3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 2c2 0 3 2 3 4s-1 4-3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 14c-2 0-3 2-3 4s1 4 3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 14c2 0 3 2 3 4s-1 4-3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="11" rx="6" ry="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="11" r="1.5" fill="currentColor"/><line x1="7" y1="10" x2="7" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="17" y1="10" x2="17" y2="14" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'telomere',
    name: 'Telomere',
    category: 'genetics',
    keywords: ['telomere', 'chromosome end', 'aging', 'telomerase', 'TTAGGG'],
    svg: '<path d="M8 6c-2 0-3 2-3 4s1 4 3 4c-2 0-3 2-3 4s1 4 3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 6c2 0 3 2 3 4s-1 4-3 4c2 0 3 2 3 4s-1 4-3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="2" width="4" height="4" rx="2" fill="currentColor" opacity="0.6"/><rect x="14" y="2" width="4" height="4" rx="2" fill="currentColor" opacity="0.6"/><path d="M7 4h2M15 4h2" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'dna-methylation',
    name: 'DNA Methylation',
    category: 'genetics',
    keywords: ['methylation', 'epigenetics', 'CpG', 'gene silencing', '5mC'],
    svg: '<path d="M4 8c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="6" y2="14" stroke="currentColor" stroke-width="1"/><line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" stroke-width="1"/><line x1="18" y1="8" x2="18" y2="14" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="5" r="2" fill="currentColor"/><text x="6" y="6" text-anchor="middle" font-size="2.5" fill="white">M</text><circle cx="12" cy="5" r="2" fill="currentColor"/><text x="12" y="6" text-anchor="middle" font-size="2.5" fill="white">M</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'histone-modification',
    name: 'Histone Modification',
    category: 'genetics',
    keywords: ['histone', 'acetylation', 'methylation', 'epigenetics', 'chromatin', 'nucleosome'],
    svg: '<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2-4 4-6 8-6s6 2 8 6-4 6-8 6-6-2-8-6z" fill="none" stroke="currentColor" stroke-width="1"/><line x1="12" y1="7" x2="12" y2="3" stroke="currentColor" stroke-width="1.5"/><line x1="16" y1="9" x2="19" y2="6" stroke="currentColor" stroke-width="1.5"/><line x1="17" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="3" r="1" fill="currentColor"/><circle cx="19" cy="6" r="1" fill="currentColor"/><circle cx="21" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chromatin-remodeling',
    name: 'Chromatin Remodeling',
    category: 'genetics',
    keywords: ['chromatin', 'remodeling', 'nucleosome', 'SWI/SNF', 'gene expression'],
    svg: '<circle cx="6" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8c1-2 2-2 2 0" stroke="currentColor" stroke-width="1"/><path d="M2 8c1-4 2-4 4 0" stroke="currentColor" stroke-width="1"/><path d="M17 8c1-4 1-4 3 0" stroke="currentColor" stroke-width="1"/><path d="M4 14l4-2 4 2 4-2 4 2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 16h4" stroke="currentColor" stroke-width="1"/><path d="M12 12l0 2" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gene-knockout',
    name: 'Gene Knockout',
    category: 'genetics',
    keywords: ['knockout', 'KO', 'loss of function', 'deletion', 'null mutation'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><rect x="10" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><rect x="16" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><line x1="8" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2"/><line x1="16" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2"/><text x="12" y="22" text-anchor="middle" font-size="3" fill="currentColor">KO</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'gene-knockin',
    name: 'Gene Knockin',
    category: 'genetics',
    keywords: ['knockin', 'KI', 'insertion', 'transgene', 'targeted insertion'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><rect x="16" y="10" width="4" height="4" fill="currentColor" opacity="0.5"/><rect x="9" y="8" width="6" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v4M10 4l2 2 2-2" stroke="currentColor" stroke-width="1.5"/><text x="12" y="13" text-anchor="middle" font-size="3" fill="currentColor">+</text><circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'crispr-cas9',
    name: 'CRISPR Cas9',
    category: 'genetics',
    keywords: ['CRISPR', 'Cas9', 'gene editing', 'genome editing', 'nuclease', 'PAM'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c0-2 2-4 4-4h8c2 0 4 2 4 4" fill="none" stroke="currentColor" stroke-width="1"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l4 4M14 10l-4 4" stroke="currentColor" stroke-width="1.5"/><path d="M2 8c1 0 2-1 2-2" stroke="currentColor" stroke-width="1"/><path d="M22 8c-1 0-2-1-2-2" stroke="currentColor" stroke-width="1"/><text x="12" y="20" text-anchor="middle" font-size="3" fill="currentColor">Cas9</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'guide-rna',
    name: 'Guide RNA',
    category: 'genetics',
    keywords: ['gRNA', 'sgRNA', 'guide RNA', 'CRISPR', 'targeting', 'spacer'],
    svg: '<path d="M4 6c2 2 4 0 6 2s4 0 6 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 10c2 2 2 4 0 6s-4 2-6 0-2-4 0-6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="10" cy="8" r="1" fill="currentColor"/><path d="M12 14l6-6" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><rect x="16" y="4" width="6" height="4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'transgene',
    name: 'Transgene',
    category: 'genetics',
    keywords: ['transgene', 'transgenic', 'foreign gene', 'genetic engineering', 'GMO'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="10" width="4" height="4" fill="currentColor" opacity="0.3"/><rect x="16" y="10" width="4" height="4" fill="currentColor" opacity="0.3"/><rect x="9" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 1"/><path d="M12 6v2M9 6h6" stroke="currentColor" stroke-width="1"/><text x="12" y="14" text-anchor="middle" font-size="4" fill="currentColor">T</text><path d="M9 18c1-1 2-1 3 0s2 1 3 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'snp',
    name: 'SNP',
    category: 'genetics',
    keywords: ['SNP', 'single nucleotide polymorphism', 'mutation', 'variant', 'polymorphism'],
    svg: '<path d="M4 8c2 0 3 2 5 2s3-2 5-2 3 2 5 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 16c2 0 3-2 5-2s3 2 5 2 3-2 5-2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="8" x2="6" y2="16" stroke="currentColor" stroke-width="1"/><line x1="18" y1="8" x2="18" y2="16" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="16" r="2" fill="currentColor"/><text x="12" y="9" text-anchor="middle" font-size="2.5" fill="currentColor">A</text><text x="12" y="17" text-anchor="middle" font-size="2.5" fill="white">G</text><path d="M14 10l0 4" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

// ============================================================================
// Chemistry - Chemical molecules, reactions, and lab equipment
// ============================================================================

const chemistryIcons: BioiconMeta[] = [
  {
    id: 'benzene-ring',
    name: 'Benzene Ring',
    category: 'chemistry',
    keywords: ['benzene', 'aromatic', 'ring', 'organic chemistry', 'phenyl'],
    svg: '<polygon points="12,4 19,8 19,16 12,20 5,16 5,8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'molecule-simple',
    name: 'Molecule',
    category: 'chemistry',
    keywords: ['molecule', 'compound', 'bond', 'chemistry', 'organic'],
    svg: '<circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="8" x2="8" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="8" x2="16" y2="10" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'water-molecule',
    name: 'Water Molecule',
    category: 'chemistry',
    keywords: ['water', 'H2O', 'molecule', 'hydrogen', 'oxygen'],
    svg: '<circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="13" x2="7" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="13" x2="17" y2="14" stroke="currentColor" stroke-width="1.5"/><text x="12" y="11" text-anchor="middle" font-size="3" fill="currentColor">O</text><text x="6" y="17" text-anchor="middle" font-size="2.5" fill="currentColor">H</text><text x="18" y="17" text-anchor="middle" font-size="2.5" fill="currentColor">H</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'erlenmeyer-flask',
    name: 'Erlenmeyer Flask',
    category: 'chemistry',
    keywords: ['flask', 'erlenmeyer', 'conical flask', 'lab', 'glassware'],
    svg: '<path d="M9 4h6v4l5 12H4L9 8V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="16" y2="4" stroke="currentColor" stroke-width="1.5"/><path d="M6 16h12" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'round-bottom-flask',
    name: 'Round Bottom Flask',
    category: 'chemistry',
    keywords: ['flask', 'round bottom', 'boiling flask', 'lab', 'glassware'],
    svg: '<circle cx="12" cy="14" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 7V4h4v3" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="4" x2="15" y2="4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'chemistry',
    keywords: ['beaker', 'lab', 'glassware', 'container', 'chemistry'],
    svg: '<path d="M5 4h14v15c0 1-1 2-2 2H7c-1 0-2-1-2-2V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 4h-1v3h1" fill="none" stroke="currentColor" stroke-width="1"/><line x1="7" y1="8" x2="10" y2="8" stroke="currentColor" stroke-width="0.75"/><line x1="7" y1="11" x2="10" y2="11" stroke="currentColor" stroke-width="0.75"/><line x1="7" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'test-tube-chem',
    name: 'Test Tube',
    category: 'chemistry',
    keywords: ['test tube', 'tube', 'lab', 'sample', 'chemistry'],
    svg: '<path d="M9 4v12c0 2 1 4 3 4s3-2 3-4V4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="4" x2="17" y2="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h6" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner',
    category: 'chemistry',
    keywords: ['bunsen burner', 'flame', 'heat', 'lab', 'gas'],
    svg: '<rect x="8" y="16" width="8" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 16v-6c0-1 1-2 2-2s2 1 2 2v6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8c-1-2 0-4 0-6 0 2 1 4 0 6" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ph-scale',
    name: 'pH Scale',
    category: 'chemistry',
    keywords: ['pH', 'acid', 'base', 'scale', 'indicator'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 10v-2M8 10v-2M12 10v-3M16 10v-2M20 10v-2" stroke="currentColor" stroke-width="1"/><text x="4" y="8" text-anchor="middle" font-size="2.5" fill="currentColor">0</text><text x="12" y="6" text-anchor="middle" font-size="2.5" fill="currentColor">7</text><text x="20" y="8" text-anchor="middle" font-size="2.5" fill="currentColor">14</text><path d="M12 14v4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'chemical-reaction',
    name: 'Chemical Reaction',
    category: 'chemistry',
    keywords: ['reaction', 'arrow', 'equilibrium', 'chemistry', 'conversion'],
    svg: '<circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10h4l-2-2M10 14h4l-2 2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'periodic-table',
    name: 'Periodic Table Element',
    category: 'chemistry',
    keywords: ['element', 'periodic table', 'atom', 'atomic', 'chemistry'],
    svg: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="10" text-anchor="middle" font-size="3" fill="currentColor">79</text><text x="12" y="16" text-anchor="middle" font-size="6" fill="currentColor" font-weight="bold">Au</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'electron-orbital',
    name: 'Electron Orbital',
    category: 'chemistry',
    keywords: ['orbital', 'electron', 'atom', 'quantum', 'shell'],
    svg: '<circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-60 12 12)"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

// ============================================================================
// Physics - Physical concepts, optics, and measurements
// ============================================================================

const physicsIcons: BioiconMeta[] = [
  {
    id: 'wave',
    name: 'Wave',
    category: 'physics',
    keywords: ['wave', 'oscillation', 'frequency', 'amplitude', 'physics'],
    svg: '<path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'light-ray',
    name: 'Light Ray',
    category: 'physics',
    keywords: ['light', 'ray', 'optics', 'beam', 'photon'],
    svg: '<line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/><polygon points="22,12 18,9 18,15" fill="currentColor"/><path d="M6 8l2 4-2 4M10 8l2 4-2 4M14 8l2 4-2 4" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'lens-convex',
    name: 'Convex Lens',
    category: 'physics',
    keywords: ['lens', 'convex', 'optics', 'magnifying', 'converging'],
    svg: '<ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="1"/><line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1"/><circle cx="20" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'prism',
    name: 'Prism',
    category: 'physics',
    keywords: ['prism', 'refraction', 'spectrum', 'light', 'dispersion'],
    svg: '<polygon points="12,4 4,20 20,20" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="2" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="1"/><line x1="14" y1="14" x2="22" y2="10" stroke="currentColor" stroke-width="0.75"/><line x1="14" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="0.75"/><line x1="14" y1="14" x2="22" y2="18" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'magnet',
    name: 'Magnet',
    category: 'physics',
    keywords: ['magnet', 'magnetic', 'field', 'pole', 'electromagnet'],
    svg: '<path d="M6 6h4v12H6zM14 6h4v12h-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c4 0 4 8 0 8" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="8" y="13" text-anchor="middle" font-size="4" fill="currentColor">N</text><text x="16" y="13" text-anchor="middle" font-size="4" fill="currentColor">S</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'electric-field',
    name: 'Electric Field',
    category: 'physics',
    keywords: ['electric', 'field', 'charge', 'force', 'potential'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">+</text><path d="M12 5v-3M12 22v-3M5 12h-3M22 12h-3" stroke="currentColor" stroke-width="1"/><path d="M7 7l-2-2M17 7l2-2M7 17l-2 2M17 17l2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'force-vector',
    name: 'Force Vector',
    category: 'physics',
    keywords: ['force', 'vector', 'arrow', 'mechanics', 'newton'],
    svg: '<line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="2"/><polygon points="20,4 14,6 18,10" fill="currentColor"/><text x="8" y="18" font-size="4" fill="currentColor">F</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pendulum',
    name: 'Pendulum',
    category: 'physics',
    keywords: ['pendulum', 'oscillation', 'period', 'gravity', 'mechanics'],
    svg: '<line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2"/><line x1="12" y1="4" x2="8" y2="16" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4l6 12" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/><circle cx="18" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'thermometer-physics',
    name: 'Thermometer',
    category: 'physics',
    keywords: ['thermometer', 'temperature', 'heat', 'thermal', 'celsius'],
    svg: '<path d="M12 4v12" stroke="currentColor" stroke-width="4"/><circle cx="12" cy="18" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4c0-1 1-2 2-2s2 1 2 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="currentColor"/><path d="M16 8h2M16 12h2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'laser-beam',
    name: 'Laser Beam',
    category: 'physics',
    keywords: ['laser', 'beam', 'coherent', 'light', 'optics'],
    svg: '<rect x="2" y="9" width="8" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M18 10v4M20 9v6" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

// ============================================================================
// Medical Devices - Clinical and diagnostic equipment
// ============================================================================

const medicalDeviceIcons: BioiconMeta[] = [
  {
    id: 'stethoscope',
    name: 'Stethoscope',
    category: 'medical-devices',
    keywords: ['stethoscope', 'auscultation', 'heart', 'lungs', 'diagnosis'],
    svg: '<circle cx="12" cy="18" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 18c0-6 0-10 4-12 4 2 4 6 4 12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'syringe-device',
    name: 'Syringe',
    category: 'medical-devices',
    keywords: ['syringe', 'injection', 'needle', 'vaccine', 'medication'],
    svg: '<rect x="6" y="6" width="10" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="18" x2="11" y2="22" stroke="currentColor" stroke-width="2"/><path d="M9 6v-2h4v2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="10" x2="14" y2="10" stroke="currentColor" stroke-width="0.75"/><line x1="8" y1="14" x2="14" y2="14" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'mri-scanner',
    name: 'MRI Scanner',
    category: 'medical-devices',
    keywords: ['MRI', 'scanner', 'imaging', 'magnetic resonance', 'radiology'],
    svg: '<ellipse cx="8" cy="12" rx="6" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="12" rx="3" ry="5" fill="none" stroke="currentColor" stroke-width="1"/><rect x="14" y="8" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'xray-machine',
    name: 'X-Ray',
    category: 'medical-devices',
    keywords: ['xray', 'x-ray', 'radiograph', 'imaging', 'radiology'],
    svg: '<rect x="6" y="4" width="12" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 8l4 4M14 8l-4 4" stroke="currentColor" stroke-width="1"/><rect x="8" y="16" width="8" height="2" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ecg-monitor',
    name: 'ECG Monitor',
    category: 'medical-devices',
    keywords: ['ECG', 'EKG', 'monitor', 'heart', 'cardiac'],
    svg: '<rect x="2" y="4" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 11h3l1-3 2 6 2-6 1 3h7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'blood-pressure',
    name: 'Blood Pressure Cuff',
    category: 'medical-devices',
    keywords: ['blood pressure', 'sphygmomanometer', 'cuff', 'hypertension', 'vital signs'],
    svg: '<rect x="4" y="8" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="12" x2="14" y2="12" stroke="currentColor" stroke-width="1.5"/><path d="M18 10v4M16 12h4" stroke="currentColor" stroke-width="0.75"/><path d="M6 20c0-1 1-2 2-2h4c1 0 2 1 2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'ultrasound',
    name: 'Ultrasound Probe',
    category: 'medical-devices',
    keywords: ['ultrasound', 'probe', 'sonography', 'imaging', 'transducer'],
    svg: '<path d="M8 4c-2 0-4 2-4 4v8c0 2 2 4 4 4h8c2 0 4-2 4-4V8c0-2-2-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 6v12" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'defibrillator',
    name: 'Defibrillator',
    category: 'medical-devices',
    keywords: ['defibrillator', 'AED', 'shock', 'cardiac', 'emergency'],
    svg: '<rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12h2l1-2 2 4 1-2h2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 18v-2M16 18v-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pulse-oximeter',
    name: 'Pulse Oximeter',
    category: 'medical-devices',
    keywords: ['pulse oximeter', 'SpO2', 'oxygen', 'saturation', 'vital signs'],
    svg: '<path d="M6 8c0-2 2-4 4-4h4c2 0 4 2 4 4v8c0 2-2 4-4 4h-4c-2 0-4-2-4-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8v8M14 8v8" stroke="currentColor" stroke-width="0.75"/><text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">98</text><text x="12" y="17" text-anchor="middle" font-size="2" fill="currentColor">%</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'iv-drip',
    name: 'IV Drip',
    category: 'medical-devices',
    keywords: ['IV', 'drip', 'infusion', 'intravenous', 'fluid'],
    svg: '<path d="M10 2h4l2 6H8z" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="8" width="6" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M12 13v1" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

// ============================================================================
// Pharmacology - Drugs, receptors, and mechanisms
// ============================================================================

const pharmacologyIcons: BioiconMeta[] = [
  {
    id: 'pill-capsule',
    name: 'Pill Capsule',
    category: 'pharmacology',
    keywords: ['pill', 'capsule', 'medication', 'drug', 'oral'],
    svg: '<ellipse cx="8" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    category: 'pharmacology',
    keywords: ['tablet', 'pill', 'medication', 'drug', 'oral'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'drug-receptor',
    name: 'Drug-Receptor Binding',
    category: 'pharmacology',
    keywords: ['receptor', 'binding', 'ligand', 'agonist', 'antagonist'],
    svg: '<path d="M4 8c0-2 2-4 4-4h8c2 0 4 2 4 4v8c0 2-2 4-4 4H8c-2 0-4-2-4-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c-2 0-2 4 0 4h4c2 0 2 4 0 4" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="10" r="2" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'dose-response',
    name: 'Dose Response Curve',
    category: 'pharmacology',
    keywords: ['dose response', 'EC50', 'pharmacology', 'curve', 'potency'],
    svg: '<line x1="4" y1="20" x2="4" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/><path d="M6 18c2-1 4-2 6-8s4-4 6-4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'pharmacokinetics',
    name: 'Pharmacokinetics',
    category: 'pharmacology',
    keywords: ['pharmacokinetics', 'ADME', 'absorption', 'distribution', 'metabolism'],
    svg: '<circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 6h6M6 9v6M18 9v6M9 18h6" stroke="currentColor" stroke-width="1"/><text x="6" y="7" text-anchor="middle" font-size="2.5" fill="currentColor">A</text><text x="18" y="7" text-anchor="middle" font-size="2.5" fill="currentColor">D</text><text x="6" y="19" text-anchor="middle" font-size="2.5" fill="currentColor">M</text><text x="18" y="19" text-anchor="middle" font-size="2.5" fill="currentColor">E</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'vial',
    name: 'Medicine Vial',
    category: 'pharmacology',
    keywords: ['vial', 'bottle', 'medication', 'injectable', 'solution'],
    svg: '<rect x="7" y="6" width="10" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="2" width="6" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" stroke-width="0.75"/><path d="M9 14h6" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'half-life',
    name: 'Half-Life',
    category: 'pharmacology',
    keywords: ['half-life', 't1/2', 'elimination', 'decay', 'pharmacokinetics'],
    svg: '<line x1="4" y1="20" x2="4" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/><path d="M4 6c4 0 6 4 8 8s4 4 8 4" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/><text x="12" y="22" text-anchor="middle" font-size="2.5" fill="currentColor">t1/2</text>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
  {
    id: 'therapeutic-window',
    name: 'Therapeutic Window',
    category: 'pharmacology',
    keywords: ['therapeutic window', 'safety', 'toxicity', 'efficacy', 'margin'],
    svg: '<line x1="4" y1="20" x2="4" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/><line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/><rect x="6" y="8" width="12" height="6" fill="currentColor" opacity="0.2"/>',
    viewBox: VIEWBOX,
    license: 'CC0',
  },
];

/**
 * Combined bioicons list
 */
export const bioiconsList: BioiconMeta[] = [
  ...cellBiologyIcons,
  ...molecularBiologyIcons,
  ...microbiologyIcons,
  ...biochemistryIcons,
  ...laboratoryIcons,
  ...ecologyIcons,
  ...immunologyIcons,
  ...anatomyIcons,
  ...geneticsIcons,
  ...chemistryIcons,
  ...physicsIcons,
  ...medicalDeviceIcons,
  ...pharmacologyIcons,
];

/**
 * Bioicon categories
 */
export const bioiconCategories = {
  'cell-biology': {
    name: 'Cell Biology',
    description: 'Cells, organelles, and cellular structures',
    count: cellBiologyIcons.length,
  },
  'molecular-biology': {
    name: 'Molecular Biology',
    description: 'DNA, RNA, proteins, and genetic elements',
    count: molecularBiologyIcons.length,
  },
  'microbiology': {
    name: 'Microbiology',
    description: 'Bacteria, viruses, fungi, and microorganisms',
    count: microbiologyIcons.length,
  },
  'biochemistry': {
    name: 'Biochemistry',
    description: 'Molecules, pathways, and metabolic processes',
    count: biochemistryIcons.length,
  },
  'laboratory': {
    name: 'Laboratory',
    description: 'Lab equipment and techniques',
    count: laboratoryIcons.length,
  },
  'ecology': {
    name: 'Ecology',
    description: 'Ecosystems, food webs, and biogeochemical cycles',
    count: ecologyIcons.length,
  },
  'immunology': {
    name: 'Immunology',
    description: 'Immune cells and immune system components',
    count: immunologyIcons.length,
  },
  'anatomy': {
    name: 'Anatomy',
    description: 'Organs, tissues, and body systems',
    count: anatomyIcons.length,
  },
  'genetics': {
    name: 'Genetics',
    description: 'Genetic inheritance, chromosomes, and epigenetics',
    count: geneticsIcons.length,
  },
  'chemistry': {
    name: 'Chemistry',
    description: 'Chemical molecules, reactions, and lab equipment',
    count: chemistryIcons.length,
  },
  'physics': {
    name: 'Physics',
    description: 'Physical concepts, optics, and measurements',
    count: physicsIcons.length,
  },
  'medical-devices': {
    name: 'Medical Devices',
    description: 'Clinical and diagnostic equipment',
    count: medicalDeviceIcons.length,
  },
  'pharmacology': {
    name: 'Pharmacology',
    description: 'Drugs, receptors, and mechanisms',
    count: pharmacologyIcons.length,
  },
};

/**
 * Search bioicons by query
 */
export function searchBioicons(query: string): BioiconMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return bioiconsList;

  return bioiconsList.filter((icon) => {
    const searchText = [icon.name, icon.category, ...icon.keywords]
      .join(' ')
      .toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get bioicons by category
 */
export function getBioiconsByCategory(category: string): BioiconMeta[] {
  return bioiconsList.filter((icon) => icon.category === category);
}

/**
 * Get bioicon by ID
 */
export function getBioiconById(id: string): BioiconMeta | undefined {
  return bioiconsList.find((icon) => icon.id === id);
}

/**
 * Convert bioicon to full SVG string
 */
export function bioiconToSvg(
  icon: BioiconMeta,
  size: number = 24,
  color: string = 'currentColor'
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" stroke="${color}">${icon.svg}</svg>`;
}

/**
 * Get total bioicon count
 */
export function getBioiconCount(): number {
  return bioiconsList.length;
}

/**
 * Get bioicon counts by category
 */
export function getBioiconCountsByCategory(): Record<string, number> {
  return Object.entries(bioiconCategories).reduce(
    (acc, [key, value]) => {
      acc[key] = value.count;
      return acc;
    },
    {} as Record<string, number>
  );
}
