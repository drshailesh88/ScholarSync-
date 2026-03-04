/**
 * SciDraw-Inspired Scientific Illustrations
 *
 * High-quality scientific illustrations for research presentations and publications.
 * Inspired by SciDraw.io (Federico Claudi & Alex Harston) - the open repository
 * of scientific drawings for the research community.
 *
 * Categories:
 * - Model Organisms: Mice, rats, flies, zebrafish, C. elegans, etc.
 * - Neuroscience: Neurons, brain regions, synapses, neural circuits
 * - Lab Equipment: Microscopes, pipettes, recording equipment
 * - Scientific Setups: Behavioral rigs, electrophysiology, imaging
 * - Molecular: DNA, RNA, proteins, membranes
 * - Anatomy: Organs, tissues, systems
 * - Cell Biology: Cell division, cell death, transport, junctions
 *
 * License: CC-BY (Attribution required)
 * @see https://scidraw.io/
 */

/**
 * SciDraw icon metadata for search and categorization
 */
export interface SciDrawIcon {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
  viewBox: string;
  license: 'CC-BY';
  attribution?: string;
}

/**
 * SVG viewBox for all SciDraw icons (24x24 standard)
 */
const VIEWBOX = '0 0 24 24';

// ============================================================================
// Model Organisms - Lab animals and research specimens
// ============================================================================

const modelOrganismIcons: SciDrawIcon[] = [
  {
    id: 'mouse-side',
    name: 'Mouse (Side View)',
    category: 'model-organisms',
    keywords: ['mouse', 'mus musculus', 'rodent', 'mammal', 'model organism', 'animal'],
    svg: '<path d="M3 14c0-3 2-5 5-5h2c2 0 4-1 5-2l3-2c1 0 2 1 2 2v3c0 2-1 3-3 3h-2l-1 2c0 1-1 2-2 2H8c-3 0-5-1-5-3z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="1" fill="currentColor"/><path d="M3 12c-1 0-1-2 0-3s2-1 3-1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M21 15l2 1" stroke="currentColor" stroke-width="1"/><path d="M21 16l2 0" stroke="currentColor" stroke-width="1"/><path d="M21 17l2-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
    attribution: 'FINNISH/SciDraw-style',
  },
  {
    id: 'mouse-top',
    name: 'Mouse (Top View)',
    category: 'model-organisms',
    keywords: ['mouse', 'mus musculus', 'rodent', 'dorsal', 'top view', 'animal'],
    svg: '<ellipse cx="12" cy="10" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="17" rx="2" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="7" r="0.5" fill="currentColor"/><circle cx="14" cy="7" r="0.5" fill="currentColor"/><path d="M12 20v2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'rat',
    name: 'Rat',
    category: 'model-organisms',
    keywords: ['rat', 'rattus', 'rodent', 'mammal', 'model organism', 'animal'],
    svg: '<path d="M2 13c0-3 2-5 6-5h3c2 0 4-1 5-2l4-2c1 0 2 1 2 2v4c0 2-1 3-3 3h-3l-1 2c0 1-1 2-2 2H7c-3 0-5-1-5-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="8" r="1" fill="currentColor"/><path d="M2 11c-1-1 0-3 1-3s2 0 3 1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M22 14l2 2m-2 0l2 0m-2 1l2-1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'drosophila',
    name: 'Drosophila (Fruit Fly)',
    category: 'model-organisms',
    keywords: ['fly', 'drosophila', 'fruit fly', 'insect', 'genetics', 'model organism'],
    svg: '<ellipse cx="12" cy="14" rx="4" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="7" rx="3" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="1.5" fill="currentColor" opacity="0.6"/><circle cx="14" cy="6" r="1.5" fill="currentColor" opacity="0.6"/><path d="M8 14c-3-1-5 0-6 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 14c3-1 5 0 6 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 12l-3-4M16 12l3-4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'zebrafish',
    name: 'Zebrafish',
    category: 'model-organisms',
    keywords: ['zebrafish', 'danio rerio', 'fish', 'vertebrate', 'development', 'model organism'],
    svg: '<path d="M2 12c0-2 3-4 8-4h4c3 0 6-1 8 0 0 2-2 3-4 4h-2c-2 1-3 2-3 3s1 2 3 2c-3 1-6 0-8-1-4 0-6-2-6-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="11" r="1" fill="currentColor"/><path d="M5 10v4M7 9v6M9 10v4" stroke="currentColor" stroke-width="0.75" opacity="0.6"/><path d="M12 8l2-2M12 8l-2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'c-elegans',
    name: 'C. elegans',
    category: 'model-organisms',
    keywords: ['c elegans', 'worm', 'nematode', 'caenorhabditis', 'model organism', 'connectome'],
    svg: '<path d="M4 8c2-2 4-2 6 0s4 2 6 0c2 2 4 2 4 4s-2 2-4 4c-2 2-4 2-6 0s-4-2-6 0c-2-2-2-4 0-6s2-4 0-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="5" cy="8" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'xenopus',
    name: 'Xenopus (Frog)',
    category: 'model-organisms',
    keywords: ['xenopus', 'frog', 'amphibian', 'development', 'embryology', 'model organism'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/><path d="M4 14l-2 3M6 16l-1 3M20 14l2 3M18 16l1 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'macaque',
    name: 'Macaque',
    category: 'model-organisms',
    keywords: ['macaque', 'monkey', 'primate', 'NHP', 'non-human primate', 'model organism'],
    svg: '<circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="13" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><path d="M6 6c-1-2-2-2-3-1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M18 6c1-2 2-2 3-1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="19" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ferret',
    name: 'Ferret',
    category: 'model-organisms',
    keywords: ['ferret', 'mustela', 'carnivore', 'visual cortex', 'model organism'],
    svg: '<ellipse cx="14" cy="12" rx="7" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="6" cy="10" rx="3" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="0.7" fill="currentColor"/><path d="M4 7l-1-2M8 7l1-2" stroke="currentColor" stroke-width="1"/><path d="M21 12c2 0 2 2 1 3" stroke="currentColor" stroke-width="1"/><path d="M14 16l-1 2M16 16l0 2M18 16l1 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'marmoset',
    name: 'Marmoset',
    category: 'model-organisms',
    keywords: ['marmoset', 'callithrix', 'primate', 'NHP', 'model organism', 'small monkey'],
    svg: '<circle cx="12" cy="11" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 7c-2-1-3 0-3 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 7c2-1 3 0 3 2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/><ellipse cx="12" cy="13" rx="1.5" ry="1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="19" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'arabidopsis',
    name: 'Arabidopsis',
    category: 'model-organisms',
    keywords: ['arabidopsis', 'arabidopsis thaliana', 'thale cress', 'plant', 'model organism', 'flowering plant', 'genetics'],
    svg: '<path d="M12 22v-10" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="14" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-30 8 14)"/><ellipse cx="16" cy="14" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(30 16 14)"/><ellipse cx="6" cy="10" rx="2.5" ry="1.5" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-45 6 10)"/><ellipse cx="18" cy="10" rx="2.5" ry="1.5" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(45 18 10)"/><circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="0.75" fill="currentColor"/><path d="M10 4l-2-2M14 4l2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'e-coli',
    name: 'E. coli',
    category: 'model-organisms',
    keywords: ['e coli', 'escherichia coli', 'bacteria', 'prokaryote', 'model organism', 'microbiology', 'rod bacteria'],
    svg: '<ellipse cx="12" cy="12" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 12c-2 0-3-1-3-2s1-2 2-2" stroke="currentColor" stroke-width="1"/><path d="M5 12c-2 0-3 1-3 2s1 2 2 2" stroke="currentColor" stroke-width="1"/><path d="M5 12c-1-1-2-2-1-3" stroke="currentColor" stroke-width="1"/><path d="M5 12c-1 1-2 2-1 3" stroke="currentColor" stroke-width="1"/><circle cx="9" cy="11" r="0.5" fill="currentColor" opacity="0.5"/><circle cx="14" cy="13" r="0.5" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'saccharomyces',
    name: 'Saccharomyces (Budding Yeast)',
    category: 'model-organisms',
    keywords: ['saccharomyces', 'yeast', 'budding yeast', 'cerevisiae', 'fungus', 'model organism', 'eukaryote'],
    svg: '<ellipse cx="10" cy="12" rx="6" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="17" cy="8" rx="3" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="7" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M14 9l2 0" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 's-pombe',
    name: 'S. pombe (Fission Yeast)',
    category: 'model-organisms',
    keywords: ['s pombe', 'schizosaccharomyces pombe', 'fission yeast', 'yeast', 'model organism', 'cell division'],
    svg: '<rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v8" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="8" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'planaria',
    name: 'Planaria',
    category: 'model-organisms',
    keywords: ['planaria', 'flatworm', 'platyhelminthes', 'regeneration', 'model organism', 'dugesia'],
    svg: '<path d="M12 2c-3 0-5 2-5 4v12c0 2 2 4 5 4s5-2 5-4V6c0-2-2-4-5-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4c1 1 2 1 4 1s3 0 4-1" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="6" r="1" fill="currentColor"/><circle cx="14" cy="6" r="1" fill="currentColor"/><path d="M12 10v8" stroke="currentColor" stroke-width="0.75" opacity="0.5"/><path d="M9 16c1 0 2 1 3 1s2-1 3-1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'hydra',
    name: 'Hydra',
    category: 'model-organisms',
    keywords: ['hydra', 'cnidarian', 'polyp', 'regeneration', 'model organism', 'freshwater'],
    svg: '<path d="M12 22v-8" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8c-2-3-4-5-5-4" stroke="currentColor" stroke-width="1.5"/><path d="M11 8c-1-3-1-6 0-6" stroke="currentColor" stroke-width="1.5"/><path d="M13 8c1-3 1-6 0-6" stroke="currentColor" stroke-width="1.5"/><path d="M15 8c2-3 4-5 5-4" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c-1-2-3-4-4-3" stroke="currentColor" stroke-width="1"/><path d="M14 8c1-2 3-4 4-3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'sea-urchin',
    name: 'Sea Urchin',
    category: 'model-organisms',
    keywords: ['sea urchin', 'echinoderm', 'development', 'embryology', 'model organism', 'strongylocentrotus'],
    svg: '<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v-5M12 17v5" stroke="currentColor" stroke-width="1.5"/><path d="M7 12h-5M17 12h5" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 8.5l-3.5-3.5M15.5 8.5l3.5-3.5" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 15.5l-3.5 3.5M15.5 15.5l3.5 3.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'chicken-embryo',
    name: 'Chicken Embryo',
    category: 'model-organisms',
    keywords: ['chicken', 'chick embryo', 'gallus', 'development', 'model organism', 'avian'],
    svg: '<ellipse cx="12" cy="14" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8c-3 0-5 2-5 4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="9.5" r="0.75" fill="currentColor"/><path d="M7 8l-1-2" stroke="currentColor" stroke-width="1"/><path d="M14 16c1 0 2 1 2 2" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="14" rx="5" ry="3.5" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'axolotl',
    name: 'Axolotl',
    category: 'model-organisms',
    keywords: ['axolotl', 'salamander', 'ambystoma', 'regeneration', 'model organism', 'amphibian', 'neoteny'],
    svg: '<ellipse cx="12" cy="14" rx="6" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="10" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="9" r="1" fill="currentColor"/><circle cx="14" cy="9" r="1" fill="currentColor"/><path d="M8 7c-2-2-4-2-5 0" stroke="currentColor" stroke-width="1.5"/><path d="M7 8c-2-1-4-1-5 1" stroke="currentColor" stroke-width="1"/><path d="M6 9c-2 0-4 0-4 2" stroke="currentColor" stroke-width="1"/><path d="M16 7c2-2 4-2 5 0" stroke="currentColor" stroke-width="1.5"/><path d="M17 8c2-1 4-1 5 1" stroke="currentColor" stroke-width="1"/><path d="M18 9c2 0 4 0 4 2" stroke="currentColor" stroke-width="1"/><path d="M18 14l3 2M18 16l2 3" stroke="currentColor" stroke-width="1"/><path d="M6 14l-3 2M6 16l-2 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lamprey',
    name: 'Lamprey',
    category: 'model-organisms',
    keywords: ['lamprey', 'petromyzon', 'jawless fish', 'agnathan', 'model organism', 'vertebrate evolution'],
    svg: '<path d="M2 12c0-2 2-4 6-4h8c4 0 6 2 6 4s-2 4-6 4H8c-4 0-6-2-6-4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="12" r="0.5" fill="currentColor"/><path d="M10 10l1-2M12 10l0-2M14 10l-1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="18" cy="10" r="0.75" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'squid',
    name: 'Squid',
    category: 'model-organisms',
    keywords: ['squid', 'loligo', 'cephalopod', 'giant axon', 'model organism', 'neuroscience'],
    svg: '<path d="M8 4c0 2 2 6 4 6s4-4 4-6c0-1-2-2-4-2s-4 1-4 2z" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="4" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="6" r="1" fill="currentColor"/><circle cx="14" cy="6" r="1" fill="currentColor"/><path d="M8 17l-2 5M10 17l0 5M12 17l0 5M14 17l0 5M16 17l2 5" stroke="currentColor" stroke-width="1"/><path d="M8 17l-4 4M16 17l4 4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'aplysia',
    name: 'Aplysia (Sea Slug)',
    category: 'model-organisms',
    keywords: ['aplysia', 'sea slug', 'sea hare', 'mollusk', 'learning', 'memory', 'model organism', 'kandel'],
    svg: '<path d="M4 14c0-4 4-8 8-8s8 4 8 8c0 3-3 6-8 6s-8-3-8-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c-1-2-1-4 0-5s2 0 2 2" stroke="currentColor" stroke-width="1.5"/><path d="M16 8c1-2 1-4 0-5s-2 0-2 2" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/><path d="M8 16c2 1 4 1 8 0" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'daphnia',
    name: 'Daphnia (Water Flea)',
    category: 'model-organisms',
    keywords: ['daphnia', 'water flea', 'crustacean', 'model organism', 'ecotoxicology', 'cladocera'],
    svg: '<path d="M8 6c0-2 2-4 4-4s4 2 4 4v10c0 3-2 6-4 6s-4-3-4-6V6z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="3" fill="currentColor" opacity="0.3"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><path d="M8 10c-3 0-5 2-6 4" stroke="currentColor" stroke-width="1"/><path d="M8 12c-2 1-4 3-4 5" stroke="currentColor" stroke-width="1"/><path d="M10 4l-1-2M14 4l1-2" stroke="currentColor" stroke-width="1"/><path d="M10 18l1 2M14 18l-1 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'paramecium',
    name: 'Paramecium',
    category: 'model-organisms',
    keywords: ['paramecium', 'ciliate', 'protozoa', 'model organism', 'single cell', 'protist'],
    svg: '<ellipse cx="12" cy="12" rx="4" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c0 2 1 4 2 4s2-2 2-4" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="17" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M8 6l-1-1M8 8l-2 0M8 10l-1 1M8 12l-2 0M8 14l-1 1M8 16l-2 0M8 18l-1 1" stroke="currentColor" stroke-width="0.5"/><path d="M16 6l1-1M16 8l2 0M16 10l1 1M16 12l2 0M16 14l1 1M16 16l2 0M16 18l1 1" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'chlamydomonas',
    name: 'Chlamydomonas',
    category: 'model-organisms',
    keywords: ['chlamydomonas', 'green algae', 'flagella', 'photosynthesis', 'model organism', 'unicellular'],
    svg: '<circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c-1-4-2-6-1-6s2 2 3 6" stroke="currentColor" stroke-width="1.5"/><path d="M14 8c1-4 2-6 1-6s-2 2-3 6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="14" r="3" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5"/><circle cx="10" cy="14" r="0.5" fill="currentColor"/><circle cx="14" cy="14" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'dictyostelium',
    name: 'Dictyostelium (Slime Mold)',
    category: 'model-organisms',
    keywords: ['dictyostelium', 'slime mold', 'amoeba', 'social amoeba', 'model organism', 'development', 'chemotaxis'],
    svg: '<path d="M12 22v-10" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="5" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="5" r="1" fill="currentColor" opacity="0.5"/><circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.5"/><circle cx="11" cy="6" r="0.75" fill="currentColor" opacity="0.5"/><circle cx="13" cy="7" r="0.75" fill="currentColor" opacity="0.5"/><path d="M10 22c0-1 1-2 2-2s2 1 2 2" stroke="currentColor" stroke-width="1.5"/><path d="M8 22l2-2M16 22l-2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'medaka',
    name: 'Medaka (Rice Fish)',
    category: 'model-organisms',
    keywords: ['medaka', 'oryzias', 'rice fish', 'fish', 'model organism', 'vertebrate', 'teleost'],
    svg: '<path d="M3 12c0-3 4-5 9-5s9 2 9 5-4 5-9 5-9-2-9-5z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="11" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="7" cy="11" r="0.5" fill="currentColor"/><path d="M19 12l3-2v4l-3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7l0-2 2 1-2 1" stroke="currentColor" stroke-width="1"/><path d="M10 14l-1 2M12 14l0 2M14 14l1 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ciona',
    name: 'Ciona (Sea Squirt)',
    category: 'model-organisms',
    keywords: ['ciona', 'sea squirt', 'tunicate', 'ascidian', 'model organism', 'chordate', 'development'],
    svg: '<path d="M8 20c0-8 2-16 4-16s4 8 4 16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 20c-1 0-2-1-2-2v-2c0-1 1-2 2-2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 20c1 0 2-1 2-2v-2c0-1-1-2-2-2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="10" cy="6" rx="1" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="14" cy="6" rx="1" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 4l-1-2M14 4l1-2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'amphioxus',
    name: 'Amphioxus (Lancelet)',
    category: 'model-organisms',
    keywords: ['amphioxus', 'lancelet', 'branchiostoma', 'cephalochordate', 'model organism', 'evolution', 'chordate'],
    svg: '<path d="M2 12c0-2 2-3 4-3h12c3 0 4 1 4 3s-1 3-4 3H6c-2 0-4-1-4-3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9v6M9 9v6M12 9v6M15 9v6M18 9v6" stroke="currentColor" stroke-width="0.5" opacity="0.4"/><path d="M4 12h2" stroke="currentColor" stroke-width="1"/><circle cx="5" cy="11" r="0.5" fill="currentColor"/><path d="M20 12l2 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'tardigrade',
    name: 'Tardigrade (Water Bear)',
    category: 'model-organisms',
    keywords: ['tardigrade', 'water bear', 'moss piglet', 'extremophile', 'model organism', 'cryptobiosis'],
    svg: '<ellipse cx="12" cy="12" rx="6" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="7" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="11" cy="7" r="0.75" fill="currentColor"/><circle cx="13" cy="7" r="0.75" fill="currentColor"/><path d="M6 10l-3-2M6 12l-4 0M6 14l-3 2" stroke="currentColor" stroke-width="1.5"/><path d="M18 10l3-2M18 12l4 0M18 14l3 2" stroke="currentColor" stroke-width="1.5"/><path d="M10 17l-1 3M14 17l1 3" stroke="currentColor" stroke-width="1.5"/><circle cx="3" cy="8" r="0.75" fill="currentColor"/><circle cx="2" cy="12" r="0.75" fill="currentColor"/><circle cx="3" cy="16" r="0.75" fill="currentColor"/><circle cx="21" cy="8" r="0.75" fill="currentColor"/><circle cx="22" cy="12" r="0.75" fill="currentColor"/><circle cx="21" cy="16" r="0.75" fill="currentColor"/><circle cx="9" cy="20" r="0.75" fill="currentColor"/><circle cx="15" cy="20" r="0.75" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Neuroscience - Neural structures and brain anatomy
// ============================================================================

const neuroscienceIcons: SciDrawIcon[] = [
  {
    id: 'pyramidal-neuron',
    name: 'Pyramidal Neuron',
    category: 'neuroscience',
    keywords: ['neuron', 'pyramidal', 'cortex', 'excitatory', 'dendrite', 'axon'],
    svg: '<path d="M12 2v4" stroke="currentColor" stroke-width="1.5"/><path d="M10 3l2-1 2 1" stroke="currentColor" stroke-width="1"/><path d="M8 4l4-2 4 2" stroke="currentColor" stroke-width="1"/><polygon points="12,6 8,12 16,12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.5"/><path d="M12 12v10" stroke="currentColor" stroke-width="1.5"/><path d="M12 16l-3 2M12 16l3 2M12 19l-2 1M12 19l2 1" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
    attribution: 'FINNISH/SciDraw-style',
  },
  {
    id: 'purkinje-cell',
    name: 'Purkinje Cell',
    category: 'neuroscience',
    keywords: ['purkinje', 'cerebellum', 'neuron', 'dendrite', 'GABAergic', 'inhibitory'],
    svg: '<path d="M12 20v-6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="15" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 14c0-2-4-3-6-6s0-4 2-4c1 0 2 1 2 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 14c0-2 4-3 6-6s0-4-2-4c-1 0-2 1-2 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 5c-2-2-3-2-4-1M16 5c2-2 3-2 4-1" stroke="currentColor" stroke-width="0.75"/><path d="M10 8c-1-2-2-3-4-2M14 8c1-2 2-3 4-2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'interneuron',
    name: 'Interneuron',
    category: 'neuroscience',
    keywords: ['interneuron', 'inhibitory', 'GABAergic', 'local circuit', 'neuron'],
    svg: '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5"/><path d="M8 12l-4-2M8 12l-4 2M16 12l4-2M16 12l4 2" stroke="currentColor" stroke-width="1"/><path d="M12 8l-2-4M12 8l2-4M12 16l-2 4M12 16l2 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'synapse',
    name: 'Synapse',
    category: 'neuroscience',
    keywords: ['synapse', 'neurotransmitter', 'vesicle', 'receptor', 'synaptic cleft'],
    svg: '<rect x="2" y="4" width="8" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="8" r="1" fill="currentColor"/><circle cx="7" cy="10" r="1" fill="currentColor"/><circle cx="4" cy="10" r="1" fill="currentColor"/><path d="M10 8h4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/><circle cx="15" cy="10" r="0.5" fill="currentColor"/><circle cx="17" cy="8" r="0.5" fill="currentColor"/><circle cx="16" cy="12" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'brain-sagittal',
    name: 'Brain (Sagittal)',
    category: 'neuroscience',
    keywords: ['brain', 'sagittal', 'cortex', 'cerebellum', 'brainstem', 'neuroanatomy'],
    svg: '<path d="M4 10c0-4 3-7 8-7s8 3 8 7c0 3-2 5-4 6l-2 3c0 1-1 2-2 2s-2-1-2-2l-2-3c-2-1-4-3-4-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10c2 0 3 1 4 3" stroke="currentColor" stroke-width="1"/><path d="M18 10c-2 0-3 1-4 3" stroke="currentColor" stroke-width="1"/><ellipse cx="16" cy="14" rx="2" ry="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'brain-coronal',
    name: 'Brain (Coronal)',
    category: 'neuroscience',
    keywords: ['brain', 'coronal', 'section', 'cortex', 'hippocampus', 'neuroanatomy'],
    svg: '<ellipse cx="12" cy="10" rx="9" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v3M8 4v2M16 4v2" stroke="currentColor" stroke-width="1"/><ellipse cx="8" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="16" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 17l2 3 2-3" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'hippocampus',
    name: 'Hippocampus',
    category: 'neuroscience',
    keywords: ['hippocampus', 'memory', 'CA1', 'CA3', 'dentate gyrus', 'limbic'],
    svg: '<path d="M4 16c0-3 2-6 6-8 3-2 6-1 8 1s3 4 2 7c-1 2-3 3-6 3-4 0-7-1-9-2-1 0-1-1-1-1z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 14c1-2 3-3 5-3s4 1 5 2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 12c2 0 3 1 4 2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cortical-column',
    name: 'Cortical Column',
    category: 'neuroscience',
    keywords: ['cortex', 'column', 'layers', 'L1', 'L2/3', 'L4', 'L5', 'L6', 'barrel'],
    svg: '<rect x="6" y="2" width="12" height="20" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="5" x2="18" y2="5" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><line x1="6" y1="19" x2="18" y2="19" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><text x="4" y="4" font-size="2" fill="currentColor">1</text><text x="4" y="7" font-size="2" fill="currentColor">2</text><text x="4" y="10" font-size="2" fill="currentColor">4</text><text x="4" y="14" font-size="2" fill="currentColor">5</text><text x="4" y="18" font-size="2" fill="currentColor">6</text>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'action-potential',
    name: 'Action Potential',
    category: 'neuroscience',
    keywords: ['action potential', 'spike', 'depolarization', 'voltage', 'electrophysiology'],
    svg: '<path d="M2 16h4l1-2 2 8 2-14 2 6 1-2h8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h20" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'dendritic-spine',
    name: 'Dendritic Spine',
    category: 'neuroscience',
    keywords: ['spine', 'dendrite', 'synapse', 'plasticity', 'mushroom spine', 'PSD'],
    svg: '<path d="M4 20h16" stroke="currentColor" stroke-width="2"/><path d="M8 20v-4" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="14" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 20v-6" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="2.5" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 20v-8l2-4" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="7" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'astrocyte',
    name: 'Astrocyte',
    category: 'neuroscience',
    keywords: ['astrocyte', 'glia', 'glial cell', 'star cell', 'blood brain barrier'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9l0-6M12 15l0 6M9 12l-6 0M15 12l6 0" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 9.5l-4-4M14.5 9.5l4-4M9.5 14.5l-4 4M14.5 14.5l4 4" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.5"/><circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.5"/><circle cx="3" cy="12" r="1" fill="currentColor" opacity="0.5"/><circle cx="21" cy="12" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'microglia',
    name: 'Microglia',
    category: 'neuroscience',
    keywords: ['microglia', 'glia', 'immune', 'phagocyte', 'neuroinflammation'],
    svg: '<circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9.5c0-3-2-5-2-6M12 9.5c0-3 2-5 2-6" stroke="currentColor" stroke-width="1"/><path d="M14.5 12c3 0 5-2 6-2M14.5 12c3 0 5 2 6 2" stroke="currentColor" stroke-width="1"/><path d="M12 14.5c0 3-2 5-2 6M12 14.5c0 3 2 5 2 6" stroke="currentColor" stroke-width="1"/><path d="M9.5 12c-3 0-5-2-6-2M9.5 12c-3 0-5 2-6 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'motor-neuron',
    name: 'Motor Neuron',
    category: 'neuroscience',
    keywords: ['motor neuron', 'motoneuron', 'alpha motor neuron', 'spinal cord', 'muscle innervation', 'efferent'],
    svg: '<ellipse cx="8" cy="8" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.5"/><path d="M4 6l-2-3M5 5l-3-1M4 10l-2 2M5 11l-2 3" stroke="currentColor" stroke-width="1"/><path d="M12 8h8" stroke="currentColor" stroke-width="1.5"/><path d="M20 8l2 3M20 8l2-3M20 8l2 0" stroke="currentColor" stroke-width="1"/><path d="M14 8v-2M16 8v2M18 8v-2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'sensory-neuron',
    name: 'Sensory Neuron',
    category: 'neuroscience',
    keywords: ['sensory neuron', 'pseudounipolar', 'DRG', 'dorsal root ganglion', 'afferent', 'somatosensory'],
    svg: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5"/><path d="M12 9v-5" stroke="currentColor" stroke-width="1.5"/><path d="M12 4l-3-2M12 4l3-2M12 4l0-2" stroke="currentColor" stroke-width="1"/><path d="M12 15v5" stroke="currentColor" stroke-width="1.5"/><path d="M12 20l-2 2M12 20l2 2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'dopaminergic-neuron',
    name: 'Dopaminergic Neuron',
    category: 'neuroscience',
    keywords: ['dopamine', 'dopaminergic', 'substantia nigra', 'VTA', 'reward', 'parkinsons'],
    svg: '<ellipse cx="6" cy="16" rx="3" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.5"/><path d="M6 13.5c0-4 4-8 10-10" stroke="currentColor" stroke-width="1.5"/><path d="M16 3.5l2-1M16 3.5l1 2" stroke="currentColor" stroke-width="1"/><path d="M9 16l4-2M10 14l3 1M8 18l3 2" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="8" r="0.5" fill="currentColor"/><circle cx="13" cy="6" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'serotonergic-neuron',
    name: 'Serotonergic Neuron',
    category: 'neuroscience',
    keywords: ['serotonin', '5-HT', 'raphe nucleus', 'mood', 'neuromodulation'],
    svg: '<ellipse cx="12" cy="18" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="1" fill="currentColor" opacity="0.5"/><path d="M12 16v-6" stroke="currentColor" stroke-width="1.5"/><path d="M12 10l-6-6M12 10l6-6M12 10l-3-7M12 10l3-7M12 10v-8" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="4" r="0.7" fill="currentColor"/><circle cx="18" cy="4" r="0.7" fill="currentColor"/><circle cx="9" cy="3" r="0.7" fill="currentColor"/><circle cx="15" cy="3" r="0.7" fill="currentColor"/><circle cx="12" cy="2" r="0.7" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'basket-cell',
    name: 'GABAergic Basket Cell',
    category: 'neuroscience',
    keywords: ['basket cell', 'GABAergic', 'interneuron', 'inhibitory', 'perisomatic', 'PV positive'],
    svg: '<circle cx="12" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.5"/><path d="M12 8.5v3" stroke="currentColor" stroke-width="1.5"/><path d="M12 11.5c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><path d="M9 3l-2-1M15 3l2-1M10 4l-3 0M14 4l3 0" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="16.5" r="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'chandelier-cell',
    name: 'Chandelier Cell',
    category: 'neuroscience',
    keywords: ['chandelier cell', 'axo-axonic', 'GABAergic', 'interneuron', 'AIS', 'cartridge'],
    svg: '<circle cx="12" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="0.7" fill="currentColor" opacity="0.5"/><path d="M12 6v4" stroke="currentColor" stroke-width="1.5"/><path d="M8 10v6M10 10v8M12 10v6M14 10v8M16 10v6" stroke="currentColor" stroke-width="1"/><path d="M8 16l0 2M10 18l0 2M12 16l0 2M14 18l0 2M16 16l0 2" stroke="currentColor" stroke-width="1.5"/><path d="M10 2l-2-1M14 2l2-1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'granule-cell',
    name: 'Granule Cell',
    category: 'neuroscience',
    keywords: ['granule cell', 'cerebellum', 'dentate gyrus', 'parallel fiber', 'small neuron'],
    svg: '<circle cx="12" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="16" r="0.7" fill="currentColor" opacity="0.5"/><path d="M12 14v-4" stroke="currentColor" stroke-width="1.5"/><path d="M12 10l-8 0M12 10l8 0" stroke="currentColor" stroke-width="1.5"/><path d="M4 10l-2 0M20 10l2 0" stroke="currentColor" stroke-width="1"/><path d="M10 18l-2 2M14 18l2 2M11 18l-1 3M13 18l1 3" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'stellate-cell',
    name: 'Stellate Cell',
    category: 'neuroscience',
    keywords: ['stellate cell', 'star-shaped', 'interneuron', 'cortex', 'cerebellum', 'radial'],
    svg: '<circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5"/><path d="M12 9.5l0-6M12 14.5l0 6M9.5 12l-6 0M14.5 12l6 0" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l-4-4M14 10l4-4M10 14l-4 4M14 14l4 4" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="3.5" r="0.5" fill="currentColor"/><circle cx="12" cy="20.5" r="0.5" fill="currentColor"/><circle cx="3.5" cy="12" r="0.5" fill="currentColor"/><circle cx="20.5" cy="12" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'thalamus',
    name: 'Thalamus',
    category: 'neuroscience',
    keywords: ['thalamus', 'relay', 'sensory', 'diencephalon', 'thalamic nuclei', 'LGN', 'VPL'],
    svg: '<ellipse cx="8" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c1 0 2 2 2 4s-1 4-2 4" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M16 8c-1 0-2 2-2 4s1 4 2 4" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M3 12h2M19 12h2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'amygdala',
    name: 'Amygdala',
    category: 'neuroscience',
    keywords: ['amygdala', 'fear', 'emotion', 'limbic', 'basolateral', 'central nucleus'],
    svg: '<path d="M6 8c0-2 3-4 6-4s6 2 6 4c0 4-2 10-6 12-4-2-6-8-6-12z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 8c0 2 1 5 3 6" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M15 8c0 2-1 5-3 6" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="12" cy="10" rx="2" ry="3" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'striatum',
    name: 'Striatum / Basal Ganglia',
    category: 'neuroscience',
    keywords: ['striatum', 'basal ganglia', 'caudate', 'putamen', 'dopamine', 'motor control'],
    svg: '<path d="M4 6c0-1 2-2 4-2h8c2 0 4 1 4 2v12c0 1-2 2-4 2H8c-2 0-4-1-4-2V6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 8h12M6 11h12M6 14h12M6 17h12" stroke="currentColor" stroke-width="0.75" opacity="0.6"/><ellipse cx="12" cy="12" rx="3" ry="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'hypothalamus',
    name: 'Hypothalamus',
    category: 'neuroscience',
    keywords: ['hypothalamus', 'homeostasis', 'hormone', 'pituitary', 'circadian', 'feeding'],
    svg: '<ellipse cx="12" cy="10" rx="6" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 14v4" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="20" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="15" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="11" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cerebellum-detailed',
    name: 'Cerebellum (Detailed)',
    category: 'neuroscience',
    keywords: ['cerebellum', 'folia', 'vermis', 'purkinje', 'motor coordination', 'granule layer'],
    svg: '<path d="M2 14c0-4 4-8 10-8s10 4 10 8c0 3-4 6-10 6s-10-3-10-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2-1 4 0 4 2M8 12c2-1 4 0 4 2M12 12c2-1 4 0 4 2M16 12c2-1 4 0 4 2" stroke="currentColor" stroke-width="1"/><path d="M6 10c1-1 2 0 2 1M10 9c1-1 2 0 2 1M14 9c1-1 2 0 2 1M18 10c1-1 2 0 2 1" stroke="currentColor" stroke-width="0.75"/><path d="M12 6v4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'spinal-cord-cross-section',
    name: 'Spinal Cord Cross-Section',
    category: 'neuroscience',
    keywords: ['spinal cord', 'cross section', 'gray matter', 'white matter', 'dorsal horn', 'ventral horn'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4c-2 2-2 4-2 6s0 4-4 4c0-4-2-4-2-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4c2 2 2 4 2 6s0 4 4 4c0-4 2-4 2-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 20c-2-2-2-4-2-6s0-2-4-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 20c2-2 2-4 2-6s0-2 4-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'multi-electrode-array',
    name: 'Multi-Electrode Array',
    category: 'neuroscience',
    keywords: ['MEA', 'multi-electrode', 'recording', 'utah array', 'neural probe', 'electrophysiology'],
    svg: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="10" cy="7" r="1" fill="currentColor"/><circle cx="13" cy="7" r="1" fill="currentColor"/><circle cx="16" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="10" r="1" fill="currentColor"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="13" cy="10" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/><circle cx="7" cy="13" r="1" fill="currentColor"/><circle cx="10" cy="13" r="1" fill="currentColor"/><circle cx="13" cy="13" r="1" fill="currentColor"/><circle cx="16" cy="13" r="1" fill="currentColor"/><circle cx="7" cy="16" r="1" fill="currentColor"/><circle cx="10" cy="16" r="1" fill="currentColor"/><circle cx="13" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'patch-clamp-pipette',
    name: 'Patch Clamp Pipette',
    category: 'neuroscience',
    keywords: ['patch clamp', 'pipette', 'whole cell', 'gigaseal', 'electrophysiology', 'glass electrode'],
    svg: '<path d="M4 2h4l-1 8-2 10-1 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 2c0-1 4-1 4 0" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="21" r="1" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="18" cy="16" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 20l8-4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="18" cy="16" r="1.5" fill="currentColor" opacity="0.3"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'calcium-imaging-trace',
    name: 'Calcium Imaging Trace',
    category: 'neuroscience',
    keywords: ['calcium imaging', 'GCaMP', 'fluorescence', 'dF/F', 'neural activity', 'two-photon'],
    svg: '<path d="M2 18h2l1-2 1 0 1-8 1 0 1 6 1 0 1-4 1 0 1 2 1-10 1 4 1 1 1 0 1-2 1 0 2 0" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 20h20" stroke="currentColor" stroke-width="0.75"/><path d="M2 4v16" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lfp-eeg-trace',
    name: 'LFP / EEG Trace',
    category: 'neuroscience',
    keywords: ['LFP', 'EEG', 'local field potential', 'oscillation', 'brain waves', 'theta', 'gamma'],
    svg: '<path d="M2 12c1-2 2-4 3-4s2 2 3 4 2 4 3 4 2-2 3-4 2-4 3-4 2 2 3 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8c0.5-1 1-2 1.5-2s1 1 1.5 2 1 2 1.5 2 1-1 1.5-2 1-2 1.5-2 1 1 1.5 2 1 2 1.5 2 1-1 1.5-2 1-2 1.5-2 1 1 1.5 2" fill="none" stroke="currentColor" stroke-width="0.75" opacity="0.6"/><path d="M2 20h20" stroke="currentColor" stroke-width="0.5"/><path d="M2 4v16" stroke="currentColor" stroke-width="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'neural-spike-train',
    name: 'Neural Spike Train',
    category: 'neuroscience',
    keywords: ['spike train', 'action potential', 'raster', 'firing rate', 'neural code'],
    svg: '<path d="M2 20h20" stroke="currentColor" stroke-width="0.75"/><path d="M4 20v-12M5 20v-8M7 20v-14M10 20v-10M11 20v-12M12 20v-8M15 20v-14M16 20v-10M17 20v-6M19 20v-12M20 20v-8" stroke="currentColor" stroke-width="1.5"/><path d="M2 4h20" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'feedforward-circuit',
    name: 'Feedforward Circuit',
    category: 'neuroscience',
    keywords: ['feedforward', 'circuit', 'network', 'layer', 'connectivity', 'neural network'],
    svg: '<circle cx="4" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="15" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 6l4 2M6 12l4-2M6 12l4 2M6 18l4-2" stroke="currentColor" stroke-width="1"/><path d="M14 9l4 2M14 15l4-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'recurrent-circuit',
    name: 'Recurrent Circuit',
    category: 'neuroscience',
    keywords: ['recurrent', 'feedback', 'loop', 'circuit', 'attractor', 'neural network'],
    svg: '<circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 10.5l1-2.5" stroke="currentColor" stroke-width="1"/><path d="M14 7.5l2 2" stroke="currentColor" stroke-width="1"/><path d="M16 13.5l-2 2" stroke="currentColor" stroke-width="1"/><path d="M9.5 16.5l-1-2" stroke="currentColor" stroke-width="1"/><path d="M10 8l-2 2M14 8l2 2M14 16l2-2M10 16l-2-2" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lateral-inhibition',
    name: 'Lateral Inhibition',
    category: 'neuroscience',
    keywords: ['lateral inhibition', 'surround suppression', 'contrast', 'receptive field', 'center-surround'],
    svg: '<circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="19" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l-4 6" stroke="currentColor" stroke-width="1"/><path d="M14 10l4 6" stroke="currentColor" stroke-width="1"/><path d="M5 16v-2M19 16v-2" stroke="currentColor" stroke-width="1.5"/><line x1="4" y1="14" x2="6" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="18" y1="14" x2="20" y2="14" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'blood-brain-barrier',
    name: 'Blood-Brain Barrier',
    category: 'neuroscience',
    keywords: ['blood brain barrier', 'BBB', 'endothelium', 'tight junction', 'pericyte', 'astrocyte endfeet'],
    svg: '<rect x="2" y="10" width="20" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="5" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="10" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="15" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="20" cy="12" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M4 10l-1-4M8 10l0-3M12 10l1-4M16 10l0-3M20 10l1-4" stroke="currentColor" stroke-width="1"/><circle cx="4" cy="6" r="1" fill="currentColor" opacity="0.5"/><circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.5"/><circle cx="20" cy="6" r="1" fill="currentColor" opacity="0.5"/><path d="M7 10v-2l1 1-1 1M17 10v-2l1 1-1 1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'oligodendrocyte',
    name: 'Oligodendrocyte',
    category: 'neuroscience',
    keywords: ['oligodendrocyte', 'myelin', 'CNS', 'white matter', 'glia', 'myelination'],
    svg: '<circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5"/><path d="M9.5 12l-4 0" stroke="currentColor" stroke-width="1"/><path d="M14.5 12l4 0" stroke="currentColor" stroke-width="1"/><path d="M12 9.5l0-4" stroke="currentColor" stroke-width="1"/><path d="M12 14.5l0 4" stroke="currentColor" stroke-width="1"/><rect x="2" y="10" width="3" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="19" y="10" width="3" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="2" width="4" height="3" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="19" width="4" height="3" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'schwann-cell',
    name: 'Schwann Cell',
    category: 'neuroscience',
    keywords: ['schwann cell', 'myelin', 'PNS', 'peripheral nerve', 'node of ranvier', 'myelination'],
    svg: '<path d="M2 12h20" stroke="currentColor" stroke-width="1"/><path d="M4 8c0-1 2-2 4-2s4 1 4 2v8c0 1-2 2-4 2s-4-1-4-2V8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8c0-1 2-2 4-2s4 1 4 2v8c0 1-2 2-4 2s-4-1-4-2V8z" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="10" rx="1.5" ry="1" fill="currentColor" opacity="0.3"/><ellipse cx="16" cy="10" rx="1.5" ry="1" fill="currentColor" opacity="0.3"/><path d="M12 10v4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Lab Equipment - Scientific instruments and tools
// ============================================================================

const labEquipmentIcons: SciDrawIcon[] = [
  {
    id: 'microscope',
    name: 'Microscope',
    category: 'lab-equipment',
    keywords: ['microscope', 'optics', 'imaging', 'magnification', 'objective'],
    svg: '<path d="M8 20h8" stroke="currentColor" stroke-width="1.5"/><path d="M10 20v-4h4v4" stroke="currentColor" stroke-width="1.5"/><path d="M12 16v-4" stroke="currentColor" stroke-width="1.5"/><rect x="10" y="8" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="3" r="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 10h4l-2 3" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'pipette',
    name: 'Pipette',
    category: 'lab-equipment',
    keywords: ['pipette', 'micropipette', 'pipettor', 'liquid handling', 'tip'],
    svg: '<rect x="10" y="2" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4M10 10h4" stroke="currentColor" stroke-width="0.75"/><path d="M11 14v4l1 4 1-4v-4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'electrode',
    name: 'Recording Electrode',
    category: 'lab-equipment',
    keywords: ['electrode', 'recording', 'electrophysiology', 'patch clamp', 'probe'],
    svg: '<path d="M4 4l8 8" stroke="currentColor" stroke-width="1.5"/><path d="M12 12l4 4" stroke="currentColor" stroke-width="1"/><circle cx="17" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 4l-2 2M4 4l2-2" stroke="currentColor" stroke-width="1"/><path d="M20 20l2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'syringe',
    name: 'Syringe',
    category: 'lab-equipment',
    keywords: ['syringe', 'injection', 'needle', 'infusion', 'cannula'],
    svg: '<rect x="8" y="4" width="8" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4v-2h4v2" stroke="currentColor" stroke-width="1"/><path d="M11 16v4l1 2 1-2v-4" stroke="currentColor" stroke-width="1.5"/><path d="M8 8h8M8 12h8" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'petri-dish',
    name: 'Petri Dish',
    category: 'lab-equipment',
    keywords: ['petri dish', 'culture', 'plate', 'agar', 'bacteria', 'cell culture'],
    svg: '<ellipse cx="12" cy="14" rx="9" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 12v2M21 12v2" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'beaker',
    name: 'Beaker',
    category: 'lab-equipment',
    keywords: ['beaker', 'flask', 'glassware', 'chemistry', 'liquid'],
    svg: '<path d="M6 4h12v2l-2 14H8L6 6V4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 4h12" stroke="currentColor" stroke-width="2"/><path d="M8 10h8M8 14h6" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'test-tube',
    name: 'Test Tube',
    category: 'lab-equipment',
    keywords: ['test tube', 'tube', 'sample', 'chemistry', 'reaction'],
    svg: '<path d="M9 3h6v2l-1 14c0 1-1 2-2 2s-2-1-2-2L9 5V3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 3h6" stroke="currentColor" stroke-width="2"/><path d="M10 10c1 0 2 1 4 0" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'centrifuge-tube',
    name: 'Centrifuge Tube',
    category: 'lab-equipment',
    keywords: ['eppendorf', 'centrifuge tube', 'microcentrifuge', 'sample'],
    svg: '<path d="M8 4h8l-1 2v10l-3 5-3-5V6L8 4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4c0-1 2-2 4-2s4 1 4 2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 6h6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'multi-well-plate',
    name: 'Multi-Well Plate',
    category: 'lab-equipment',
    keywords: ['96 well plate', 'microplate', 'assay', 'high throughput', 'ELISA'],
    svg: '<rect x="2" y="6" width="20" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="5" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="9" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="5" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="12" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="5" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="11" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="14" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="17" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="15" r="1" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'stereotax',
    name: 'Stereotaxic Frame',
    category: 'lab-equipment',
    keywords: ['stereotax', 'stereotaxic', 'surgery', 'brain surgery', 'injection'],
    svg: '<rect x="4" y="18" width="16" height="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 18v-6h2v6M16 18v-6h2v6" stroke="currentColor" stroke-width="1.5"/><path d="M8 14h8" stroke="currentColor" stroke-width="1.5"/><path d="M12 14v-8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="4" r="1" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'headplate',
    name: 'Headplate',
    category: 'lab-equipment',
    keywords: ['headplate', 'head fixation', 'chronic implant', 'imaging window'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="4" width="8" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="14" r="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="6" cy="10" r="1" fill="currentColor"/><circle cx="18" cy="10" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'fiber-optic',
    name: 'Fiber Optic Cannula',
    category: 'lab-equipment',
    keywords: ['fiber optic', 'optogenetics', 'cannula', 'implant', 'light delivery'],
    svg: '<rect x="10" y="2" width="4" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 8v10l1 4 1-4V8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.5"/><path d="M10 22c-1-1 0-2 2-2s3 1 2 2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Scientific Setups - Behavioral and experimental rigs
// ============================================================================

const scientificSetupIcons: SciDrawIcon[] = [
  {
    id: 'treadmill-setup',
    name: 'Treadmill Setup',
    category: 'scientific-setups',
    keywords: ['treadmill', 'locomotion', 'running', 'behavior', 'virtual reality'],
    svg: '<ellipse cx="12" cy="16" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c0-2 2-4 4-4s4 2 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 16v-4M20 16v-4" stroke="currentColor" stroke-width="1.5"/><path d="M6 16l2-2 2 1 2-1 2 1 2-1 2 2" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'two-photon-setup',
    name: 'Two-Photon Setup',
    category: 'scientific-setups',
    keywords: ['two photon', '2P', 'microscopy', 'imaging', 'calcium imaging'],
    svg: '<rect x="8" y="2" width="8" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4" stroke="currentColor" stroke-width="1.5"/><path d="M8 12h8" stroke="currentColor" stroke-width="1.5"/><path d="M12 12v4" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="18" rx="4" ry="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 4l4 2M14 4l-4 2" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'maze-plus',
    name: 'Plus Maze',
    category: 'scientific-setups',
    keywords: ['elevated plus maze', 'EPM', 'anxiety', 'behavior', 'rodent'],
    svg: '<rect x="8" y="2" width="8" height="20" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="8" width="20" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8v8M16 8v8M8 8h8M8 16h8" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'maze-t',
    name: 'T-Maze',
    category: 'scientific-setups',
    keywords: ['T maze', 'alternation', 'working memory', 'choice', 'behavior'],
    svg: '<rect x="10" y="10" width="4" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="4" width="20" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10h4" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'open-field',
    name: 'Open Field',
    category: 'scientific-setups',
    keywords: ['open field', 'locomotion', 'anxiety', 'exploration', 'behavior'],
    svg: '<rect x="2" y="4" width="20" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="12" height="8" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'water-maze',
    name: 'Morris Water Maze',
    category: 'scientific-setups',
    keywords: ['water maze', 'morris', 'spatial memory', 'hippocampus', 'navigation'],
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 12h18" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1" opacity="0.5"/><path d="M12 3v18" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 1" opacity="0.5"/><path d="M5 10c1 0 2 1 3 0s2 1 3 0" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'operant-chamber',
    name: 'Operant Chamber',
    category: 'scientific-setups',
    keywords: ['operant', 'skinner box', 'lever press', 'conditioning', 'reward'],
    svg: '<rect x="3" y="4" width="18" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="8" width="4" height="2" fill="currentColor" opacity="0.5"/><rect x="14" y="8" width="4" height="2" fill="currentColor" opacity="0.5"/><circle cx="8" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="14" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 12v4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'patch-rig',
    name: 'Patch Clamp Rig',
    category: 'scientific-setups',
    keywords: ['patch clamp', 'electrophysiology', 'whole cell', 'recording', 'slice'],
    svg: '<rect x="4" y="14" width="16" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 14v-4h4v4" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="8" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 6l4 4" stroke="currentColor" stroke-width="1"/><path d="M4 4l2 1-1 1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lickometer',
    name: 'Lickometer',
    category: 'scientific-setups',
    keywords: ['lickometer', 'licking', 'drinking', 'reward', 'spout'],
    svg: '<rect x="8" y="2" width="8" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12v6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6h8" stroke="currentColor" stroke-width="0.5"/><circle cx="12" cy="20" r="0.5" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'running-wheel',
    name: 'Running Wheel',
    category: 'scientific-setups',
    keywords: ['running wheel', 'activity', 'circadian', 'exercise', 'voluntary'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="1"/><rect x="18" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Molecular - DNA, RNA, proteins, membranes
// ============================================================================

const molecularIcons: SciDrawIcon[] = [
  {
    id: 'dna-helix',
    name: 'DNA Helix',
    category: 'molecular',
    keywords: ['DNA', 'double helix', 'nucleotide', 'base pair', 'genetics'],
    svg: '<path d="M6 2c2 2 2 4 0 6s-2 4 0 6 2 4 0 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 2c-2 2-2 4 0 6s2 4 0 6 2 4 0 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 5h12M6 8h12M6 11h12M6 14h12M6 17h12M6 20h12" stroke="currentColor" stroke-width="0.75" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'rna-strand',
    name: 'RNA Strand',
    category: 'molecular',
    keywords: ['RNA', 'mRNA', 'transcript', 'single strand', 'nucleotide'],
    svg: '<path d="M4 4c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 3-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c2 0 3 2 5 2s3-2 5-2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="4" r="1" fill="currentColor"/><circle cx="14" cy="4" r="1" fill="currentColor"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'protein-structure',
    name: 'Protein Structure',
    category: 'molecular',
    keywords: ['protein', 'alpha helix', 'beta sheet', 'folding', 'tertiary'],
    svg: '<path d="M4 8c2-2 4 0 6 0s4-4 6-2 2 6 0 8-4 0-6 0-4 4-6 2-2-6 0-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="16" cy="10" r="1.5" fill="currentColor" opacity="0.5"/><circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'lipid-bilayer',
    name: 'Lipid Bilayer',
    category: 'molecular',
    keywords: ['lipid bilayer', 'membrane', 'phospholipid', 'cell membrane'],
    svg: '<circle cx="4" cy="6" r="1.5" fill="currentColor"/><path d="M4 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M3 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="6" r="1.5" fill="currentColor"/><path d="M8 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M7 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/><path d="M12 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M11 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="16" cy="6" r="1.5" fill="currentColor"/><path d="M16 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M15 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="6" r="1.5" fill="currentColor"/><path d="M20 7.5v4" stroke="currentColor" stroke-width="1"/><path d="M19 11.5l1 2 1-2" stroke="currentColor" stroke-width="0.75"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/><path d="M4 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M3 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="8" cy="18" r="1.5" fill="currentColor"/><path d="M8 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M7 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><path d="M12 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M11 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="16" cy="18" r="1.5" fill="currentColor"/><path d="M16 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M15 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/><circle cx="20" cy="18" r="1.5" fill="currentColor"/><path d="M20 16.5v-4" stroke="currentColor" stroke-width="1"/><path d="M19 12.5l1-2 1 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ion-channel',
    name: 'Ion Channel',
    category: 'molecular',
    keywords: ['ion channel', 'membrane protein', 'pore', 'conductance', 'gating'],
    svg: '<rect x="4" y="6" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="16" y="6" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10h8M8 14h8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="12" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path d="M12 4v2M12 18v2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'receptor',
    name: 'Receptor',
    category: 'molecular',
    keywords: ['receptor', 'GPCR', 'transmembrane', 'ligand', 'binding'],
    svg: '<path d="M8 2c-2 0-4 2-4 4v12c0 2 2 4 4 4h8c2 0 4-2 4-4V6c0-2-2-4-4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2h8" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="5" rx="3" ry="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M9 7v10M15 7v10M9 12h6" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'vesicle',
    name: 'Vesicle',
    category: 'molecular',
    keywords: ['vesicle', 'exocytosis', 'endocytosis', 'transport', 'membrane'],
    svg: '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.5"/><circle cx="14" cy="11" r="1" fill="currentColor" opacity="0.5"/><circle cx="11" cy="14" r="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'antibody',
    name: 'Antibody',
    category: 'molecular',
    keywords: ['antibody', 'immunoglobulin', 'IgG', 'antigen', 'immune'],
    svg: '<path d="M12 14v6" stroke="currentColor" stroke-width="1.5"/><path d="M12 14l-6-8" stroke="currentColor" stroke-width="1.5"/><path d="M12 14l6-8" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 20h6" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'enzyme',
    name: 'Enzyme',
    category: 'molecular',
    keywords: ['enzyme', 'catalyst', 'active site', 'substrate', 'reaction'],
    svg: '<path d="M4 8c0-2 3-4 8-4s8 2 8 4c0 3-3 4-4 6s0 4-4 4-3-2-4-4-4-3-4-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10c0 1 1 2 2 2s2-1 2-2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'atp',
    name: 'ATP Molecule',
    category: 'molecular',
    keywords: ['ATP', 'adenosine triphosphate', 'energy', 'phosphate', 'metabolism'],
    svg: '<circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="21" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h1M14 12h1M19 12h0.5" stroke="currentColor" stroke-width="1"/><path d="M6 9v-4l2 2-2 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Anatomy - Organs and systems (complements bioicons)
// ============================================================================

const anatomyIcons: SciDrawIcon[] = [
  {
    id: 'eye-detailed',
    name: 'Eye (Detailed)',
    category: 'anatomy',
    keywords: ['eye', 'retina', 'cornea', 'lens', 'optic nerve', 'vision'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M3 12c2 0 2 2 0 2" stroke="currentColor" stroke-width="1"/><ellipse cx="8" cy="12" rx="1" ry="2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'spinal-cord',
    name: 'Spinal Cord',
    category: 'anatomy',
    keywords: ['spinal cord', 'spine', 'vertebra', 'CNS', 'motor neuron'],
    svg: '<ellipse cx="12" cy="6" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v12c0 2 2 4 4 4s4-2 4-4V6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v16" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 1"/><path d="M4 10l4 0M16 10l4 0M4 14l4 0M16 14l4 0M4 18l4 0M16 18l4 0" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cochlea',
    name: 'Cochlea',
    category: 'anatomy',
    keywords: ['cochlea', 'ear', 'hearing', 'inner ear', 'auditory', 'spiral'],
    svg: '<path d="M12 20c-4 0-8-4-8-8s4-8 8-8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 16c-2 0-4-2-4-4s2-4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 12c0 0 0 0 0 0" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M20 12h-4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'muscle-fiber',
    name: 'Muscle Fiber',
    category: 'anatomy',
    keywords: ['muscle', 'fiber', 'sarcomere', 'myosin', 'actin', 'contraction'],
    svg: '<rect x="2" y="8" width="20" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 8v8M10 8v8M14 8v8M18 8v8" stroke="currentColor" stroke-width="0.75"/><path d="M4 10h4M4 14h4M8 10h4M8 14h4M12 10h4M12 14h4M16 10h4M16 14h4" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'blood-vessel',
    name: 'Blood Vessel',
    category: 'anatomy',
    keywords: ['blood vessel', 'artery', 'vein', 'capillary', 'endothelium'],
    svg: '<path d="M2 8c4 0 6 4 10 4s6-4 10-4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 16c4 0 6-4 10-4s6 4 10 4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/><ellipse cx="14" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/><ellipse cx="20" cy="12" rx="1.5" ry="1" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'alveolus',
    name: 'Alveolus',
    category: 'anatomy',
    keywords: ['alveolus', 'lung', 'respiration', 'gas exchange', 'pulmonary'],
    svg: '<circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'nephron',
    name: 'Nephron',
    category: 'anatomy',
    keywords: ['nephron', 'kidney', 'glomerulus', 'tubule', 'filtration', 'renal'],
    svg: '<circle cx="6" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c2 0 4 2 4 4v4c0 2 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 20c2 0 2-2 2-4v-8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'villus',
    name: 'Intestinal Villus',
    category: 'anatomy',
    keywords: ['villus', 'intestine', 'absorption', 'gut', 'epithelium'],
    svg: '<path d="M4 20c0-8 4-16 8-16s8 8 8 16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 20c0-4 2-8 4-8s4 4 4 8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 4v8" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Cell Biology - Cell division, death, transport, and junctions
// ============================================================================

const cellBiologyIcons: SciDrawIcon[] = [
  {
    id: 'mitosis-prophase',
    name: 'Mitosis Prophase',
    category: 'cell-biology',
    keywords: ['mitosis', 'prophase', 'cell division', 'chromosome condensation', 'nuclear envelope'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="5" ry="4" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><path d="M9 9c0 2 1 3 1 5M11 8c0 2 0 4 0 6M15 9c0 2-1 3-1 5M13 8c0 2 0 4 0 6" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="18" cy="6" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'mitosis-metaphase',
    name: 'Mitosis Metaphase',
    category: 'cell-biology',
    keywords: ['mitosis', 'metaphase', 'cell division', 'metaphase plate', 'spindle'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 5v14" stroke="currentColor" stroke-width="2"/><path d="M10 8h4M10 10h4M10 12h4M10 14h4M10 16h4" stroke="currentColor" stroke-width="1.5"/><path d="M4 6l6 6-6 6" stroke="currentColor" stroke-width="0.75" fill="none"/><path d="M20 6l-6 6 6 6" stroke="currentColor" stroke-width="0.75" fill="none"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="20" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'mitosis-anaphase',
    name: 'Mitosis Anaphase',
    category: 'cell-biology',
    keywords: ['mitosis', 'anaphase', 'cell division', 'chromosome separation', 'spindle fibers'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 8v8M7 9v6M8 10v4" stroke="currentColor" stroke-width="1.5"/><path d="M18 8v8M17 9v6M16 10v4" stroke="currentColor" stroke-width="1.5"/><path d="M3 12h3M18 12h3" stroke="currentColor" stroke-width="0.75"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="21" cy="12" r="1" fill="currentColor"/><path d="M9 12l6 0" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'mitosis-telophase',
    name: 'Mitosis Telophase',
    category: 'cell-biology',
    keywords: ['mitosis', 'telophase', 'cell division', 'nuclear reformation', 'cleavage furrow'],
    svg: '<ellipse cx="7" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="17" cy="12" rx="5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="7" cy="12" rx="3" ry="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><ellipse cx="17" cy="12" rx="3" ry="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><path d="M5 10v4M6 9v6M8 10v4M9 9v6" stroke="currentColor" stroke-width="0.75"/><path d="M15 10v4M16 9v6M18 10v4M19 9v6" stroke="currentColor" stroke-width="0.75"/><path d="M12 6v12" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cytokinesis',
    name: 'Cytokinesis',
    category: 'cell-biology',
    keywords: ['cytokinesis', 'cell division', 'cleavage furrow', 'contractile ring', 'daughter cells'],
    svg: '<path d="M4 6c0 4 2 6 4 6s4-2 4-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 18c0-4 2-6 4-6s4 2 4 6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6c0 4 2 6 4 6s4-2 4-6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 18c0-4 2-6 4-6s4 2 4 6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="8" cy="9" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="8" cy="15" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="16" cy="9" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><ellipse cx="16" cy="15" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M12 8v8" stroke="currentColor" stroke-width="2"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'meiosis-i',
    name: 'Meiosis I',
    category: 'cell-biology',
    keywords: ['meiosis', 'meiosis I', 'reduction division', 'homologous chromosomes', 'crossing over'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 8c0 3 0 5 0 8" stroke="currentColor" stroke-width="2"/><path d="M10 8c0 3 0 5 0 8" stroke="currentColor" stroke-width="2"/><path d="M14 8c0 3 0 5 0 8" stroke="currentColor" stroke-width="2"/><path d="M16 8c0 3 0 5 0 8" stroke="currentColor" stroke-width="2"/><path d="M9 11c2 0 4 0 6 0" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/><path d="M3 12h2M19 12h2" stroke="currentColor" stroke-width="0.75"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="21" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'meiosis-ii',
    name: 'Meiosis II',
    category: 'cell-biology',
    keywords: ['meiosis', 'meiosis II', 'equational division', 'sister chromatids', 'haploid'],
    svg: '<ellipse cx="6" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="18" cy="12" rx="4" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 9v6M7 9v6" stroke="currentColor" stroke-width="1.5"/><path d="M17 9v6M19 9v6" stroke="currentColor" stroke-width="1.5"/><path d="M2 12h2M22 12h-2M10 12h4" stroke="currentColor" stroke-width="0.75"/><circle cx="2" cy="12" r="0.75" fill="currentColor"/><circle cx="22" cy="12" r="0.75" fill="currentColor"/><circle cx="12" cy="6" r="0.75" fill="currentColor"/><circle cx="12" cy="18" r="0.75" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cell-cycle-diagram',
    name: 'Cell Cycle Diagram',
    category: 'cell-biology',
    keywords: ['cell cycle', 'G1', 'S phase', 'G2', 'M phase', 'interphase', 'checkpoint'],
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v9l6 3" stroke="currentColor" stroke-width="1"/><path d="M12 12l-4 6" stroke="currentColor" stroke-width="1"/><path d="M12 12l-6-3" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><text x="12" y="6" font-size="3" fill="currentColor" text-anchor="middle">M</text><text x="17" y="17" font-size="3" fill="currentColor" text-anchor="middle">G1</text><text x="7" y="17" font-size="3" fill="currentColor" text-anchor="middle">S</text><text x="6" y="9" font-size="3" fill="currentColor" text-anchor="middle">G2</text>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'apoptosis',
    name: 'Apoptosis',
    category: 'cell-biology',
    keywords: ['apoptosis', 'programmed cell death', 'caspase', 'apoptotic bodies', 'cell death'],
    svg: '<circle cx="6" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 8h2" stroke="currentColor" stroke-width="1"/><circle cx="15" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 1"/><circle cx="18" cy="9" r="2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 1"/><circle cx="14" cy="11" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 1"/><circle cx="17" cy="13" r="1" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="17" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="18" r="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="20" r="1" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'necrosis',
    name: 'Necrosis',
    category: 'cell-biology',
    keywords: ['necrosis', 'cell death', 'cell lysis', 'inflammation', 'membrane rupture'],
    svg: '<path d="M12 4c4 0 7 3 7 7s-2 6-4 7c-1 1-3 2-3 2s-2-1-3-2c-2-1-4-3-4-7s3-7 7-7z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><path d="M8 8l-3-2M16 8l3-2M7 12l-4 0M17 12l4 0M8 16l-3 2M16 16l3 2" stroke="currentColor" stroke-width="1"/><circle cx="5" cy="6" r="0.75" fill="currentColor"/><circle cx="19" cy="6" r="0.75" fill="currentColor"/><circle cx="3" cy="12" r="0.75" fill="currentColor"/><circle cx="21" cy="12" r="0.75" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'autophagy',
    name: 'Autophagy',
    category: 'cell-biology',
    keywords: ['autophagy', 'autophagosome', 'lysosome', 'degradation', 'recycling', 'LC3'],
    svg: '<ellipse cx="12" cy="12" rx="9" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 10c0-2 2-4 4-4h4c2 0 4 2 4 4v4c0 2-2 4-4 4h-4c-2 0-4-2-4-4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 1"/><circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.6"/><circle cx="14" cy="12" r="1" fill="currentColor" opacity="0.6"/><circle cx="11" cy="14" r="1.2" fill="currentColor" opacity="0.6"/><path d="M18 8c2 0 2 2 2 4s0 4-2 4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'phagocytosis',
    name: 'Phagocytosis',
    category: 'cell-biology',
    keywords: ['phagocytosis', 'macrophage', 'engulfment', 'phagosome', 'immune', 'bacteria'],
    svg: '<path d="M4 12c0-4 3-7 7-7s5 2 6 4c1 0 3 1 3 3s-2 3-3 3c-1 2-3 4-6 4s-7-3-7-7z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M14 10c1-1 2-1 3-1M14 14c1 1 2 1 3 1" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="8" cy="12" r="0.75" fill="currentColor" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'endocytosis',
    name: 'Endocytosis',
    category: 'cell-biology',
    keywords: ['endocytosis', 'receptor-mediated', 'clathrin', 'vesicle', 'internalization'],
    svg: '<path d="M2 10h20" stroke="currentColor" stroke-width="1.5"/><path d="M2 14h7c0-2 1-4 3-4s3 2 3 4h7" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="8" r="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9.5v1" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="14" r="2.5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1"/><circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.5"/><path d="M12 16.5v3" stroke="currentColor" stroke-width="1"/><path d="M10 19l2 2 2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'exocytosis',
    name: 'Exocytosis',
    category: 'cell-biology',
    keywords: ['exocytosis', 'secretion', 'vesicle fusion', 'SNARE', 'neurotransmitter release'],
    svg: '<path d="M2 14h20" stroke="currentColor" stroke-width="1.5"/><path d="M2 10h7c0 2 1 3 3 3s3-1 3-3h7" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.5"/><path d="M12 13.5v-2" stroke="currentColor" stroke-width="1"/><circle cx="10" cy="6" r="1" fill="currentColor" opacity="0.6"/><circle cx="14" cy="5" r="1" fill="currentColor" opacity="0.6"/><circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.6"/><path d="M10 7l-1-2M14 6l1-2M12 9l0-1" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cell-migration',
    name: 'Cell Migration',
    category: 'cell-biology',
    keywords: ['cell migration', 'lamellipodia', 'filopodia', 'motility', 'chemotaxis', 'actin'],
    svg: '<path d="M6 12c0-3 2-5 5-5h4c2 0 4 1 5 3 0 1-1 2-2 2h-2c-1 0-2 1-2 2v2c0 1-1 2-2 2h-1c-3 0-5-2-5-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 10l3-2M18 12l4 0M18 11l3 1" stroke="currentColor" stroke-width="1"/><path d="M16 14l2 2M14 15l1 3M12 16l0 2" stroke="currentColor" stroke-width="0.75"/><ellipse cx="9" cy="11" rx="2" ry="1.5" fill="none" stroke="currentColor" stroke-width="0.75"/><path d="M4 12l-2 0" stroke="currentColor" stroke-width="1" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'tight-junction',
    name: 'Tight Junction',
    category: 'cell-biology',
    keywords: ['tight junction', 'zonula occludens', 'claudin', 'occludin', 'epithelium', 'barrier'],
    svg: '<rect x="2" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4M10 8h4M10 10h4M10 12h4M10 14h4M10 16h4M10 18h4" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="18" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'gap-junction',
    name: 'Gap Junction',
    category: 'cell-biology',
    keywords: ['gap junction', 'connexin', 'connexon', 'intercellular communication', 'ion channel'],
    svg: '<rect x="2" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="8" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="8" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 8h4" stroke="currentColor" stroke-width="0.5"/><circle cx="10" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="12" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 12h4" stroke="currentColor" stroke-width="0.5"/><circle cx="10" cy="16" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="14" cy="16" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 16h4" stroke="currentColor" stroke-width="0.5"/><circle cx="6" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="0.75"/><circle cx="18" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'adherens-junction',
    name: 'Adherens Junction',
    category: 'cell-biology',
    keywords: ['adherens junction', 'cadherin', 'catenin', 'actin', 'cell adhesion', 'zonula adherens'],
    svg: '<rect x="2" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="4" width="8" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8c2 0 2 2 4 2M10 10c2 0 2 2 4 2M10 12c2 0 2 2 4 2M10 14c2 0 2 2 4 2" stroke="currentColor" stroke-width="1"/><path d="M4 8h4M4 12h4M4 16h4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/><path d="M16 8h4M16 12h4M16 16h4" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'desmosome',
    name: 'Desmosome',
    category: 'cell-biology',
    keywords: ['desmosome', 'desmoglein', 'desmocollin', 'keratin', 'cell adhesion', 'macula adherens'],
    svg: '<rect x="2" y="4" width="7" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="4" width="7" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="9" y="8" width="6" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 10h6M9 12h6M9 14h6" stroke="currentColor" stroke-width="0.75"/><path d="M4 6l3 4M4 10l3 4M4 14l3 4" stroke="currentColor" stroke-width="1"/><path d="M20 6l-3 4M20 10l-3 4M20 14l-3 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'focal-adhesion',
    name: 'Focal Adhesion',
    category: 'cell-biology',
    keywords: ['focal adhesion', 'integrin', 'FAK', 'paxillin', 'ECM', 'cell-matrix adhesion'],
    svg: '<path d="M2 6h20" stroke="currentColor" stroke-width="1.5"/><path d="M4 6v-2M8 6v-2M12 6v-2M16 6v-2M20 6v-2" stroke="currentColor" stroke-width="1"/><rect x="6" y="8" width="12" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12v3M12 12v3M16 12v3" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="18" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 15l-2 2M12 15v3M16 15l2 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Surgical Tools - For neuroscience and medical illustrations
// ============================================================================

const surgicalToolIcons: SciDrawIcon[] = [
  {
    id: 'scalpel',
    name: 'Scalpel',
    category: 'surgical-tools',
    keywords: ['scalpel', 'blade', 'surgery', 'incision', 'dissection', 'knife'],
    svg: '<path d="M4 20L18 6c1-1 2-1 2 0l0 2c0 1-1 2-2 2L4 20z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 8l2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'forceps',
    name: 'Forceps',
    category: 'surgical-tools',
    keywords: ['forceps', 'tweezers', 'surgery', 'grip', 'hold', 'dissection'],
    svg: '<path d="M8 4c-1 0-2 1-2 2v10c0 2 2 4 4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M16 4c1 0 2 1 2 2v10c0 2-2 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 20h4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'scissors-surgical',
    name: 'Surgical Scissors',
    category: 'surgical-tools',
    keywords: ['scissors', 'surgery', 'cutting', 'dissection', 'surgical scissors'],
    svg: '<circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 16l5-8 5 8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4l4 8M16 4l-4 8" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'retractor',
    name: 'Retractor',
    category: 'surgical-tools',
    keywords: ['retractor', 'surgery', 'exposure', 'surgical access', 'wound'],
    svg: '<path d="M6 4v16M18 4v16" stroke="currentColor" stroke-width="1.5"/><path d="M6 8h12M6 16h12" stroke="currentColor" stroke-width="1.5"/><path d="M4 4h4M16 4h4M4 20h4M16 20h4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'suture-needle',
    name: 'Suture Needle',
    category: 'surgical-tools',
    keywords: ['suture', 'needle', 'stitching', 'closure', 'surgery', 'thread'],
    svg: '<path d="M4 12c0-4 4-8 8-8s8 4 8 8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M20 12l-2-2M20 12l2-2" stroke="currentColor" stroke-width="1"/><path d="M4 12c0 4 3 6 6 8" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'cannula',
    name: 'Cannula',
    category: 'surgical-tools',
    keywords: ['cannula', 'tube', 'injection', 'chronic implant', 'guide cannula'],
    svg: '<rect x="10" y="2" width="4" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 6h4M10 10h4M10 14h4" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="22" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'drill-burr',
    name: 'Drill Burr',
    category: 'surgical-tools',
    keywords: ['drill', 'burr', 'craniotomy', 'bone', 'surgery', 'stereotaxic'],
    svg: '<rect x="10" y="2" width="4" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 14v4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="20" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 20h4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'hemostatic-clamp',
    name: 'Hemostatic Clamp',
    category: 'surgical-tools',
    keywords: ['hemostat', 'clamp', 'forceps', 'hemostasis', 'surgery', 'bleeding'],
    svg: '<path d="M6 4l4 8-4 8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 4l-4 8 4 8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/><path d="M4 8h4M16 8h4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Optogenetics - Light-based neural control
// ============================================================================

const optogeneticsIcons: SciDrawIcon[] = [
  {
    id: 'fiber-optic',
    name: 'Fiber Optic Cannula',
    category: 'optogenetics',
    keywords: ['fiber optic', 'optogenetics', 'light delivery', 'cannula', 'implant'],
    svg: '<rect x="9" y="2" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 8v12M14 8v12" stroke="currentColor" stroke-width="1.5"/><path d="M10 20l2 2 2-2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 14l-2-1M12 14l2-1M12 16l-2-1M12 16l2-1" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'led-array',
    name: 'LED Array',
    category: 'optogenetics',
    keywords: ['LED', 'light', 'optogenetics', 'stimulation', 'illumination'],
    svg: '<rect x="4" y="8" width="16" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 6v2M16 6v2" stroke="currentColor" stroke-width="1"/><path d="M6 4l2 2M10 4l-2 2M14 4l2 2M18 4l-2 2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'channelrhodopsin',
    name: 'Channelrhodopsin',
    category: 'optogenetics',
    keywords: ['ChR2', 'channelrhodopsin', 'opsin', 'blue light', 'excitation', 'cation channel'],
    svg: '<path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v2M12 18v2" stroke="currentColor" stroke-width="1"/><path d="M9 9l-3-3M15 9l3-3" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'halorhodopsin',
    name: 'Halorhodopsin',
    category: 'optogenetics',
    keywords: ['NpHR', 'halorhodopsin', 'opsin', 'yellow light', 'inhibition', 'chloride pump'],
    svg: '<path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v2M12 18v2" stroke="currentColor" stroke-width="1"/><path d="M9 15l-3 3M15 15l3 3" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/><path d="M10 12h4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'laser-source',
    name: 'Laser Source',
    category: 'optogenetics',
    keywords: ['laser', 'light source', 'optogenetics', 'coherent light', 'stimulation'],
    svg: '<rect x="2" y="8" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M14 12h8" stroke="currentColor" stroke-width="2"/><path d="M18 10v4" stroke="currentColor" stroke-width="0.75"/><path d="M20 9v6" stroke="currentColor" stroke-width="0.75"/><circle cx="6" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'optic-fiber-bundle',
    name: 'Fiber Bundle',
    category: 'optogenetics',
    keywords: ['fiber bundle', 'multi-fiber', 'optogenetics', 'array', 'light delivery'],
    svg: '<circle cx="12" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 10v10M8 12v8M16 12v8" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="20" width="12" height="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'photostimulation',
    name: 'Photostimulation',
    category: 'optogenetics',
    keywords: ['photostimulation', 'light pulse', 'optogenetics', 'neural activation'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1"/><path d="M5 5l3 3M16 5l-3 3M5 19l3-3M16 19l-3-3" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'dreadd',
    name: 'DREADD',
    category: 'optogenetics',
    keywords: ['DREADD', 'chemogenetics', 'CNO', 'designer receptor', 'hM3Dq', 'hM4Di'],
    svg: '<circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v12" stroke="currentColor" stroke-width="1"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="0.75"/><circle cx="12" cy="3" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="21" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Behavior - Experimental paradigms and setups
// ============================================================================

const behaviorIcons: SciDrawIcon[] = [
  {
    id: 't-maze',
    name: 'T-Maze',
    category: 'behavior',
    keywords: ['t-maze', 'maze', 'choice', 'decision', 'spatial', 'working memory'],
    svg: '<path d="M12 20v-10M4 10h16" stroke="currentColor" stroke-width="2"/><path d="M10 20h4M2 8h4M18 8h4" stroke="currentColor" stroke-width="1.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'y-maze',
    name: 'Y-Maze',
    category: 'behavior',
    keywords: ['y-maze', 'maze', 'alternation', 'spatial', 'exploration', 'memory'],
    svg: '<path d="M12 12v8M12 12l-7-10M12 12l7-10" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'morris-water-maze',
    name: 'Morris Water Maze',
    category: 'behavior',
    keywords: ['morris water maze', 'spatial', 'learning', 'hippocampus', 'platform', 'swimming'],
    svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'operant-chamber',
    name: 'Operant Chamber',
    category: 'behavior',
    keywords: ['operant', 'skinner box', 'lever', 'reward', 'conditioning', 'learning'],
    svg: '<rect x="4" y="4" width="16" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="14" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M14 16h4" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="8" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'open-field',
    name: 'Open Field',
    category: 'behavior',
    keywords: ['open field', 'locomotion', 'anxiety', 'exploration', 'activity'],
    svg: '<rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2"/><path d="M6 6l2 2 1 3 3-1 2 4 2-2" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'elevated-plus-maze',
    name: 'Elevated Plus Maze',
    category: 'behavior',
    keywords: ['elevated plus maze', 'EPM', 'anxiety', 'open arm', 'closed arm'],
    svg: '<path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="2"/><rect x="3" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1"/><rect x="17" y="10" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'fear-conditioning',
    name: 'Fear Conditioning Box',
    category: 'behavior',
    keywords: ['fear conditioning', 'shock', 'freezing', 'amygdala', 'memory', 'context'],
    svg: '<rect x="4" y="6" width="16" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 18h12" stroke="currentColor" stroke-width="1.5"/><path d="M7 18v-2M10 18v-2M13 18v-2M16 18v-2" stroke="currentColor" stroke-width="0.75"/><circle cx="16" cy="10" r="1.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 4v2M12 4v2M16 4v2" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'running-wheel',
    name: 'Running Wheel',
    category: 'behavior',
    keywords: ['running wheel', 'exercise', 'circadian', 'activity', 'voluntary running'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6 6l3 3M15 6l-3 3M6 18l3-3M15 18l-3-3" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'social-interaction',
    name: 'Social Interaction',
    category: 'behavior',
    keywords: ['social', 'interaction', 'behavior', 'sniffing', 'social preference'],
    svg: '<circle cx="8" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="10" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 14c0 2 1 4 2 4M10 14c0 2-1 4-2 4M14 14c0 2 1 4 2 4M18 14c0 2-1 4-2 4" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'head-fixation',
    name: 'Head Fixation',
    category: 'behavior',
    keywords: ['head fixation', 'head plate', 'two-photon', 'imaging', 'restrained'],
    svg: '<ellipse cx="12" cy="10" rx="6" ry="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 8h4M16 8h4" stroke="currentColor" stroke-width="1.5"/><rect x="2" y="6" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1"/><rect x="18" y="6" width="4" height="8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M10 14l2 6 2-6" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Cardiovascular - Heart and blood vessels
// ============================================================================

const cardiovascularIcons: SciDrawIcon[] = [
  {
    id: 'heart-anatomy',
    name: 'Heart (Anatomical)',
    category: 'cardiovascular',
    keywords: ['heart', 'cardiac', 'ventricle', 'atrium', 'cardiology'],
    svg: '<path d="M12 21c-6-5-10-9-10-13 0-3 2-5 5-5 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 2 5 5 0 4-4 8-10 13z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v8M8 11h8" stroke="currentColor" stroke-width="0.75"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'artery',
    name: 'Artery',
    category: 'cardiovascular',
    keywords: ['artery', 'blood vessel', 'aorta', 'circulation', 'vascular'],
    svg: '<path d="M4 12c4 0 6-4 8-4s4 4 8 4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 10c4 0 6-4 8-4s4 4 8 4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 14c4 0 6-4 8-4s4 4 8 4" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'capillary-bed',
    name: 'Capillary Bed',
    category: 'cardiovascular',
    keywords: ['capillary', 'microcirculation', 'exchange', 'bed', 'vessel'],
    svg: '<path d="M4 8h4c2 0 2 2 4 2s2-2 4-2h4" stroke="currentColor" stroke-width="1.5"/><path d="M4 12h4c2 0 2 2 4 2s2-2 4-2h4" stroke="currentColor" stroke-width="1.5"/><path d="M4 16h4c2 0 2 2 4 2s2-2 4-2h4" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="0.75" fill="currentColor"/><circle cx="14" cy="14" r="0.75" fill="currentColor"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'red-blood-cell',
    name: 'Red Blood Cell',
    category: 'cardiovascular',
    keywords: ['RBC', 'erythrocyte', 'red blood cell', 'hemoglobin', 'oxygen'],
    svg: '<ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="3" ry="1.5" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'blood-vessel-cross',
    name: 'Blood Vessel Cross-Section',
    category: 'cardiovascular',
    keywords: ['blood vessel', 'cross section', 'lumen', 'endothelium', 'wall'],
    svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
  {
    id: 'ecg-trace',
    name: 'ECG Trace',
    category: 'cardiovascular',
    keywords: ['ECG', 'EKG', 'electrocardiogram', 'heart rhythm', 'PQRST'],
    svg: '<path d="M2 12h4l1-4 2 8 2-8 1 4h10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 8h20M2 16h20" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.5"/>',
    viewBox: VIEWBOX,
    license: 'CC-BY',
  },
];

// ============================================================================
// Combine all icons
// ============================================================================

/**
 * All SciDraw icons combined
 */
export const scidrawIcons: SciDrawIcon[] = [
  ...modelOrganismIcons,
  ...neuroscienceIcons,
  ...labEquipmentIcons,
  ...scientificSetupIcons,
  ...molecularIcons,
  ...anatomyIcons,
  ...cellBiologyIcons,
  ...surgicalToolIcons,
  ...optogeneticsIcons,
  ...behaviorIcons,
  ...cardiovascularIcons,
];

/**
 * Get icons by category
 */
export function getIconsByCategory(category: string): SciDrawIcon[] {
  return scidrawIcons.filter((icon) => icon.category === category);
}

/**
 * Search icons by keyword
 */
export function searchSciDrawIcons(query: string): SciDrawIcon[] {
  const lowerQuery = query.toLowerCase();
  return scidrawIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery)) ||
      icon.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  return [...new Set(scidrawIcons.map((icon) => icon.category))];
}

/**
 * Get icon count
 */
export function getIconCount(): number {
  return scidrawIcons.length;
}

/**
 * Get icon by ID
 */
export function getIconById(id: string): SciDrawIcon | undefined {
  return scidrawIcons.find((icon) => icon.id === id);
}

/**
 * Convert SciDraw icon to full SVG string
 */
export function toSvgString(icon: SciDrawIcon): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="none">${icon.svg}</svg>`;
}

export default scidrawIcons;
