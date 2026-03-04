/**
 * Biochemistry Icon Library
 * Comprehensive SVG icons for biochemistry
 *
 * Categories:
 * - Metabolism (glycolysis, TCA, oxidative phosphorylation)
 * - Enzyme Kinetics (Michaelis-Menten, inhibition, regulation)
 * - Metabolic Pathways (biosynthesis, catabolism)
 * - Cofactors and Coenzymes (NAD, FAD, ATP, CoA)
 */

import type { IconDefinition } from './index';

export const biochemistryIcons: IconDefinition[] = [
  // ===========================================================================
  // METABOLISM
  // ===========================================================================
  {
    id: 'biochem-glycolysis',
    name: 'Glycolysis Pathway',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['glycolysis', 'glucose', 'pyruvate', 'ATP', 'pathway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="11" font-size="5" fill="currentColor" stroke="none">Glucose</text>
      <path d="M32 14 L32 24" marker-end="url(#arrow)"/>
      <rect x="24" y="24" width="16" height="8" fill="green" opacity="0.2"/>
      <path d="M32 32 L32 42" marker-end="url(#arrow)"/>
      <circle cx="32" cy="50" r="6" fill="red" opacity="0.3"/>
      <text x="22" y="53" font-size="5" fill="currentColor" stroke="none">Pyruvate</text>
      <text x="40" y="38" font-size="5" fill="green" stroke="none">2 ATP</text>
      <text x="40" y="44" font-size="5" fill="blue" stroke="none">2 NADH</text>
    </svg>`
  },
  {
    id: 'biochem-tca-cycle',
    name: 'TCA/Krebs Cycle',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['TCA', 'Krebs', 'citric acid', 'cycle', 'mitochondria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="none"/>
      <circle cx="32" cy="12" r="4" fill="blue"/>
      <circle cx="52" cy="32" r="4" fill="green"/>
      <circle cx="32" cy="52" r="4" fill="red"/>
      <circle cx="12" cy="32" r="4" fill="orange"/>
      <path d="M36 14 C44 18, 50 26, 50 32" stroke="blue"/>
      <path d="M50 36 C48 44, 40 50, 32 50" stroke="green"/>
      <path d="M28 50 C20 48, 14 40, 14 32" stroke="red"/>
      <path d="M14 28 C16 20, 24 14, 32 14" stroke="orange"/>
      <text x="26" y="8" font-size="4" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">TCA</text>
    </svg>`
  },
  {
    id: 'biochem-etc',
    name: 'Electron Transport Chain',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['ETC', 'oxidative phosphorylation', 'ATP synthase', 'mitochondria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="56" height="16" fill="gray" opacity="0.2"/>
      <rect x="8" y="28" width="8" height="8" fill="blue"/>
      <text x="10" y="34" font-size="4" fill="white" stroke="none">I</text>
      <rect x="20" y="28" width="8" height="8" fill="green"/>
      <text x="21" y="34" font-size="4" fill="white" stroke="none">III</text>
      <rect x="32" y="28" width="8" height="8" fill="red"/>
      <text x="33" y="34" font-size="4" fill="white" stroke="none">IV</text>
      <circle cx="52" cy="32" r="6" fill="orange"/>
      <text x="48" y="35" font-size="4" fill="white" stroke="none">ATP</text>
      <path d="M16 32 L20 32" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M28 32 L32 32" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M40 32 L46 32" stroke="blue" marker-end="url(#arrow)"/>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">NADH</text>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">O2</text>
      <path d="M12 20 L12 12 L52 12 L52 20" stroke="red" stroke-dasharray="2 2"/>
      <text x="28" y="10" font-size="4" fill="red" stroke="none">H+</text>
    </svg>`
  },
  {
    id: 'biochem-beta-oxidation',
    name: 'Beta Oxidation',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['beta oxidation', 'fatty acid', 'acetyl-CoA', 'lipid', 'catabolism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16 L56 16" stroke-width="3" stroke="orange"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">FA-CoA</text>
      <path d="M32 20 L32 28"/>
      <rect x="24" y="28" width="16" height="12" rx="2" fill="green" opacity="0.2"/>
      <text x="26" y="36" font-size="4" fill="currentColor" stroke="none">Cycle</text>
      <path d="M32 40 L32 48"/>
      <circle cx="24" cy="52" r="4" fill="blue"/>
      <circle cx="40" cy="52" r="4" fill="blue"/>
      <text x="18" y="54" font-size="4" fill="white" stroke="none">Ac</text>
      <text x="34" y="54" font-size="4" fill="white" stroke="none">Ac</text>
      <text x="48" y="36" font-size="4" fill="blue" stroke="none">FADH2</text>
      <text x="48" y="42" font-size="4" fill="blue" stroke="none">NADH</text>
    </svg>`
  },
  {
    id: 'biochem-gluconeogenesis',
    name: 'Gluconeogenesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['gluconeogenesis', 'glucose', 'pyruvate', 'liver', 'anabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="52" r="6" fill="red" opacity="0.3"/>
      <text x="22" y="55" font-size="5" fill="currentColor" stroke="none">Pyruvate</text>
      <path d="M32 46 L32 36" stroke="green" marker-end="url(#arrow)"/>
      <rect x="24" y="28" width="16" height="8" fill="green" opacity="0.2"/>
      <path d="M32 28 L32 18" stroke="green" marker-end="url(#arrow)"/>
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="13" font-size="5" fill="currentColor" stroke="none">Glucose</text>
      <text x="42" y="36" font-size="4" fill="red" stroke="none">-6 ATP</text>
      <path d="M20 40 L12 40 L12 20 L20 20" stroke="purple" stroke-dasharray="2 2"/>
      <text x="4" y="32" font-size="4" fill="purple" stroke="none">Bypass</text>
    </svg>`
  },

  // ===========================================================================
  // ENZYME KINETICS
  // ===========================================================================
  {
    id: 'biochem-michaelis-menten',
    name: 'Michaelis-Menten Curve',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['Michaelis-Menten', 'Km', 'Vmax', 'kinetics', 'saturation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 52 C16 32, 32 20, 56 16" stroke="blue" stroke-width="2" fill="none"/>
      <line x1="8" y1="16" x2="56" y2="16" stroke-dasharray="4 2" stroke="red"/>
      <text x="48" y="12" font-size="5" fill="red" stroke="none">Vmax</text>
      <line x1="8" y1="34" x2="56" y2="34" stroke-dasharray="2 2" stroke="gray"/>
      <text x="36" y="30" font-size="4" fill="gray" stroke="none">Vmax/2</text>
      <line x1="24" y1="34" x2="24" y2="56" stroke-dasharray="2 2" stroke="green"/>
      <text x="20" y="62" font-size="5" fill="green" stroke="none">Km</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">V</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">[S]</text>
    </svg>`
  },
  {
    id: 'biochem-lineweaver-burk',
    name: 'Lineweaver-Burk Plot',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['Lineweaver-Burk', 'double reciprocal', 'Km', 'Vmax'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40"/>
      <line x1="24" y1="56" x2="24" y2="8"/>
      <line x1="12" y1="48" x2="52" y2="16" stroke="blue" stroke-width="2"/>
      <circle cx="24" cy="32" r="2" fill="red"/>
      <text x="4" y="36" font-size="4" fill="red" stroke="none">1/Vmax</text>
      <circle cx="16" cy="40" r="2" fill="green"/>
      <text x="8" y="48" font-size="4" fill="green" stroke="none">-1/Km</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">1/V</text>
      <text x="48" y="48" font-size="5" fill="currentColor" stroke="none">1/[S]</text>
    </svg>`
  },
  {
    id: 'biochem-competitive-inhibition',
    name: 'Competitive Inhibition',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['competitive', 'inhibition', 'Km', 'enzyme', 'active site'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12" fill="blue" opacity="0.2"/>
      <path d="M24 28 L24 36 L40 36 L40 28 Z" fill="none"/>
      <text x="28" y="34" font-size="6" fill="currentColor" stroke="none">E</text>
      <circle cx="20" cy="16" r="6" fill="green"/>
      <text x="18" y="18" font-size="5" fill="white" stroke="none">S</text>
      <circle cx="44" cy="16" r="6" fill="red"/>
      <text x="42" y="18" font-size="5" fill="white" stroke="none">I</text>
      <path d="M20 22 L28 28" stroke="green" stroke-dasharray="2 2"/>
      <path d="M44 22 L36 28" stroke="red" stroke-dasharray="2 2"/>
      <text x="18" y="52" font-size="5" fill="currentColor" stroke="none">Compete for</text>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">active site</text>
    </svg>`
  },
  {
    id: 'biochem-allosteric',
    name: 'Allosteric Regulation',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['allosteric', 'regulation', 'effector', 'conformational', 'sigmoidal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="16" ry="10" fill="blue" opacity="0.2"/>
      <path d="M16 28 L16 36 L24 36 L24 28 Z" fill="none"/>
      <ellipse cx="44" cy="32" rx="8" ry="6" fill="green" opacity="0.3"/>
      <text x="18" y="34" font-size="5" fill="currentColor" stroke="none">AS</text>
      <text x="40" y="34" font-size="4" fill="currentColor" stroke="none">Allo</text>
      <circle cx="52" cy="24" r="4" fill="red"/>
      <text x="50" y="26" font-size="4" fill="white" stroke="none">E</text>
      <path d="M52 28 L48 30" stroke="red"/>
      <circle cx="8" cy="24" r="4" fill="green"/>
      <text x="6" y="26" font-size="4" fill="white" stroke="none">S</text>
      <path d="M8 28 L16 28" stroke="green"/>
      <path d="M24 20 C32 20, 44 20, 44 26" stroke="purple" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biochem-enzyme-substrate',
    name: 'Enzyme-Substrate Complex',
    domain: 'chemistry',
    category: 'enzyme-kinetics',
    tags: ['enzyme', 'substrate', 'ES complex', 'lock and key', 'induced fit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24 L8 40 L32 40 L32 32 L24 32 L24 24 Z" fill="blue" opacity="0.2"/>
      <path d="M8 24 L8 40 L32 40 L32 32 L24 32 L24 24 Z"/>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">E</text>
      <path d="M32 24 L40 24 L40 32 L32 32 Z" fill="green" opacity="0.3"/>
      <path d="M32 24 L40 24 L40 32 L32 32 Z"/>
      <text x="34" y="30" font-size="5" fill="currentColor" stroke="none">S</text>
      <path d="M44 28 L52 28" marker-end="url(#arrow)"/>
      <text x="16" y="52" font-size="5" fill="currentColor" stroke="none">E + S → ES</text>
    </svg>`
  },

  // ===========================================================================
  // METABOLIC PATHWAYS
  // ===========================================================================
  {
    id: 'biochem-pentose-phosphate',
    name: 'Pentose Phosphate Pathway',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['pentose phosphate', 'NADPH', 'ribose', 'nucleotides'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="15" font-size="4" fill="currentColor" stroke="none">G6P</text>
      <path d="M32 18 L32 26"/>
      <rect x="24" y="26" width="16" height="6" fill="green" opacity="0.2"/>
      <text x="26" y="31" font-size="4" fill="currentColor" stroke="none">Ox</text>
      <path d="M32 32 L32 40"/>
      <circle cx="32" cy="46" r="6" fill="red" opacity="0.3"/>
      <text x="24" y="49" font-size="4" fill="currentColor" stroke="none">R5P</text>
      <text x="44" y="30" font-size="4" fill="blue" stroke="none">NADPH</text>
      <path d="M32 52 L32 58"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Nucleotides</text>
    </svg>`
  },
  {
    id: 'biochem-urea-cycle',
    name: 'Urea Cycle',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['urea cycle', 'nitrogen', 'ammonia', 'liver', 'ornithine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="none"/>
      <circle cx="32" cy="14" r="4" fill="blue"/>
      <text x="28" y="16" font-size="4" fill="white" stroke="none">Orn</text>
      <circle cx="50" cy="32" r="4" fill="green"/>
      <text x="46" y="34" font-size="4" fill="white" stroke="none">Cit</text>
      <circle cx="32" cy="50" r="4" fill="red"/>
      <text x="28" y="52" font-size="4" fill="white" stroke="none">Arg</text>
      <circle cx="14" cy="32" r="4" fill="orange"/>
      <text x="10" y="34" font-size="4" fill="white" stroke="none">AS</text>
      <path d="M36 16 C44 20, 48 28, 48 32"/>
      <path d="M48 36 C46 44, 40 50, 36 50"/>
      <path d="M28 48 C20 46, 16 40, 16 36"/>
      <path d="M16 28 C18 20, 24 16, 28 16"/>
      <text x="52" y="16" font-size="4" fill="currentColor" stroke="none">NH3</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">Urea</text>
    </svg>`
  },
  {
    id: 'biochem-fatty-acid-synthesis',
    name: 'Fatty Acid Synthesis',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['fatty acid synthesis', 'acetyl-CoA', 'malonyl', 'palmitate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="blue" opacity="0.3"/>
      <text x="22" y="15" font-size="4" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <path d="M32 18 L32 24"/>
      <rect x="22" y="24" width="20" height="8" rx="4" fill="green" opacity="0.2"/>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">FAS</text>
      <path d="M32 32 L32 40"/>
      <path d="M12 44 L52 44" stroke-width="3" stroke="orange"/>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">Palmitate (C16)</text>
      <text x="44" y="18" font-size="4" fill="blue" stroke="none">NADPH</text>
    </svg>`
  },
  {
    id: 'biochem-amino-acid-catabolism',
    name: 'Amino Acid Catabolism',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['amino acid', 'catabolism', 'transamination', 'deamination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="28" y="13" font-size="5" fill="currentColor" stroke="none">AA</text>
      <path d="M28 16 L20 28"/>
      <path d="M36 16 L44 28"/>
      <circle cx="16" cy="34" r="6" fill="red" opacity="0.3"/>
      <text x="10" y="37" font-size="4" fill="currentColor" stroke="none">NH3</text>
      <circle cx="48" cy="34" r="6" fill="green" opacity="0.3"/>
      <text x="40" y="37" font-size="4" fill="currentColor" stroke="none">Carbon</text>
      <path d="M16 40 L16 48"/>
      <path d="M48 40 L48 48"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Urea</text>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">TCA/Gluc</text>
    </svg>`
  },
  {
    id: 'biochem-photosynthesis',
    name: 'Photosynthesis',
    domain: 'chemistry',
    category: 'pathways',
    tags: ['photosynthesis', 'Calvin cycle', 'light reactions', 'chloroplast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="32" rx="4" fill="green" opacity="0.2"/>
      <rect x="8" y="20" width="20" height="24" fill="yellow" opacity="0.3"/>
      <text x="12" y="34" font-size="5" fill="currentColor" stroke="none">Light</text>
      <rect x="32" y="20" width="24" height="24" fill="blue" opacity="0.2"/>
      <text x="36" y="34" font-size="5" fill="currentColor" stroke="none">Calvin</text>
      <path d="M28 32 L32 32" marker-end="url(#arrow)"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">H2O, CO2</text>
      <text x="40" y="58" font-size="4" fill="currentColor" stroke="none">Glucose, O2</text>
      <circle cx="12" cy="12" r="4" fill="yellow"/>
    </svg>`
  },

  // ===========================================================================
  // COFACTORS AND COENZYMES
  // ===========================================================================
  {
    id: 'biochem-nad',
    name: 'NAD+/NADH',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['NAD', 'NADH', 'coenzyme', 'electron carrier', 'oxidation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4" fill="blue" opacity="0.2"/>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">NAD+</text>
      <path d="M28 32 L36 32" stroke="green" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="29" y="28" font-size="4" fill="green" stroke="none">+2e-</text>
      <text x="29" y="40" font-size="4" fill="green" stroke="none">+H+</text>
      <rect x="36" y="16" width="20" height="32" rx="4" fill="red" opacity="0.2"/>
      <text x="38" y="36" font-size="5" fill="currentColor" stroke="none">NADH</text>
    </svg>`
  },
  {
    id: 'biochem-fad',
    name: 'FAD/FADH2',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['FAD', 'FADH2', 'flavin', 'electron carrier', 'succinate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="4" fill="yellow" opacity="0.3"/>
      <text x="14" y="36" font-size="6" fill="currentColor" stroke="none">FAD</text>
      <path d="M28 32 L36 32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="29" y="28" font-size="4" fill="blue" stroke="none">+2e-</text>
      <text x="29" y="40" font-size="4" fill="blue" stroke="none">+2H+</text>
      <rect x="36" y="16" width="20" height="32" rx="4" fill="orange" opacity="0.3"/>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">FADH2</text>
    </svg>`
  },
  {
    id: 'biochem-atp',
    name: 'ATP Structure',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['ATP', 'adenosine triphosphate', 'energy', 'phosphate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="16" height="16" rx="2" fill="purple" opacity="0.3"/>
      <text x="6" y="36" font-size="5" fill="currentColor" stroke="none">Ade</text>
      <rect x="20" y="28" width="8" height="8" rx="1" fill="blue" opacity="0.3"/>
      <text x="22" y="34" font-size="4" fill="currentColor" stroke="none">Rib</text>
      <circle cx="36" cy="32" r="4" fill="red"/>
      <text x="34" y="34" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="46" cy="32" r="4" fill="red"/>
      <text x="44" y="34" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="56" cy="32" r="4" fill="red"/>
      <text x="54" y="34" font-size="4" fill="white" stroke="none">P</text>
      <path d="M40 32 L42 32" stroke="yellow" stroke-width="2"/>
      <path d="M50 32 L52 32" stroke="yellow" stroke-width="2"/>
      <text x="44" y="46" font-size="4" fill="yellow" stroke="none">~7.3 kcal</text>
    </svg>`
  },
  {
    id: 'biochem-coenzyme-a',
    name: 'Coenzyme A',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['CoA', 'coenzyme A', 'acetyl', 'thioester', 'acyl carrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="12" height="16" rx="2" fill="purple" opacity="0.3"/>
      <text x="6" y="36" font-size="4" fill="currentColor" stroke="none">Pan</text>
      <rect x="18" y="26" width="12" height="12" rx="1" fill="blue" opacity="0.3"/>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">β-Ala</text>
      <rect x="32" y="26" width="12" height="12" rx="1" fill="green" opacity="0.3"/>
      <text x="34" y="36" font-size="4" fill="currentColor" stroke="none">Cys</text>
      <circle cx="52" cy="32" r="6" fill="yellow"/>
      <text x="48" y="35" font-size="5" fill="currentColor" stroke="none">SH</text>
      <path d="M44 32 L46 32"/>
      <text x="44" y="48" font-size="5" fill="currentColor" stroke="none">Thiol group</text>
    </svg>`
  },
  {
    id: 'biochem-biotin',
    name: 'Biotin',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['biotin', 'carboxylase', 'CO2 carrier', 'vitamin H'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20 L32 12 L44 20 L44 36 L32 44 L20 36 Z" fill="orange" opacity="0.3"/>
      <path d="M20 20 L32 12 L44 20 L44 36 L32 44 L20 36 Z"/>
      <circle cx="32" cy="12" r="4" fill="blue"/>
      <text x="28" y="14" font-size="4" fill="white" stroke="none">N</text>
      <circle cx="20" cy="28" r="3" fill="red"/>
      <text x="17" y="30" font-size="4" fill="white" stroke="none">S</text>
      <path d="M32 44 L32 56"/>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">Enzyme</text>
      <text x="20" y="8" font-size="5" fill="currentColor" stroke="none">CO2 carrier</text>
    </svg>`
  },
  {
    id: 'biochem-thiamine',
    name: 'Thiamine (TPP)',
    domain: 'chemistry',
    category: 'cofactors',
    tags: ['thiamine', 'TPP', 'vitamin B1', 'decarboxylation', 'pyruvate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="16" rx="2" fill="yellow" opacity="0.3"/>
      <text x="12" y="32" font-size="5" fill="currentColor" stroke="none">Thia</text>
      <rect x="32" y="20" width="16" height="16" rx="2" fill="blue" opacity="0.3"/>
      <text x="36" y="32" font-size="5" fill="currentColor" stroke="none">Pyr</text>
      <circle cx="56" cy="28" r="3" fill="red"/>
      <text x="54" y="30" font-size="4" fill="white" stroke="none">P</text>
      <circle cx="56" cy="36" r="3" fill="red"/>
      <text x="54" y="38" font-size="4" fill="white" stroke="none">P</text>
      <path d="M48 28 L53 28"/>
      <text x="14" y="48" font-size="4" fill="currentColor" stroke="none">Decarboxylation</text>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">reactions</text>
    </svg>`
  },

  // ===========================================================================
  // AMINO ACIDS AND PROTEINS
  // ===========================================================================
  {
    id: 'biochem-amino-acid',
    name: 'Amino Acid Structure',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['amino acid', 'peptide', 'amine', 'carboxyl', 'R group'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="gray" opacity="0.3"/>
      <text x="28" y="35" font-size="5" fill="currentColor" stroke="none">Cα</text>
      <circle cx="16" cy="24" r="5" fill="blue" opacity="0.4"/>
      <text x="11" y="27" font-size="5" fill="currentColor" stroke="none">NH2</text>
      <circle cx="48" cy="24" r="5" fill="red" opacity="0.4"/>
      <text x="42" y="27" font-size="4" fill="currentColor" stroke="none">COOH</text>
      <circle cx="32" cy="48" r="5" fill="green" opacity="0.4"/>
      <text x="30" y="51" font-size="5" fill="currentColor" stroke="none">R</text>
      <circle cx="32" cy="16" r="3" fill="white"/>
      <text x="30" y="18" font-size="4" fill="currentColor" stroke="none">H</text>
      <path d="M26 30 L20 26"/>
      <path d="M38 30 L44 26"/>
      <path d="M32 38 L32 44"/>
      <path d="M32 26 L32 20"/>
    </svg>`
  },
  {
    id: 'biochem-peptide-bond',
    name: 'Peptide Bond',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['peptide bond', 'amide', 'condensation', 'dehydration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="20" height="24" rx="2" fill="blue" opacity="0.2"/>
      <text x="8" y="35" font-size="5" fill="currentColor" stroke="none">AA1</text>
      <rect x="40" y="20" width="20" height="24" rx="2" fill="green" opacity="0.2"/>
      <text x="44" y="35" font-size="5" fill="currentColor" stroke="none">AA2</text>
      <path d="M24 32 L40 32" stroke-width="2" stroke="red"/>
      <text x="28" y="28" font-size="4" fill="red" stroke="none">C-N</text>
      <path d="M32 36 L32 48"/>
      <circle cx="32" cy="52" r="4" fill="cyan" opacity="0.4"/>
      <text x="26" y="55" font-size="4" fill="currentColor" stroke="none">H2O</text>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Condensation</text>
    </svg>`
  },
  {
    id: 'biochem-alpha-helix',
    name: 'Alpha Helix',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['alpha helix', 'secondary structure', 'protein', 'hydrogen bond'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8 C40 12, 44 20, 24 24 C4 28, 8 36, 28 40 C48 44, 44 52, 24 56" stroke="purple" stroke-width="3" fill="none"/>
      <path d="M24 12 L36 18" stroke-dasharray="2 2" stroke="blue"/>
      <path d="M16 28 L28 34" stroke-dasharray="2 2" stroke="blue"/>
      <path d="M24 44 L36 50" stroke-dasharray="2 2" stroke="blue"/>
      <text x="44" y="20" font-size="4" fill="blue" stroke="none">H-bond</text>
      <text x="44" y="40" font-size="5" fill="currentColor" stroke="none">3.6 AA</text>
      <text x="44" y="48" font-size="5" fill="currentColor" stroke="none">per turn</text>
    </svg>`
  },
  {
    id: 'biochem-beta-sheet',
    name: 'Beta Sheet',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['beta sheet', 'secondary structure', 'protein', 'pleated sheet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12 L8 52" stroke="green" stroke-width="3"/>
      <path d="M24 52 L24 12" stroke="green" stroke-width="3"/>
      <path d="M40 12 L40 52" stroke="green" stroke-width="3"/>
      <path d="M56 52 L56 12" stroke="green" stroke-width="3"/>
      <path d="M8 20 L24 20" stroke-dasharray="2 2" stroke="blue"/>
      <path d="M24 32 L40 32" stroke-dasharray="2 2" stroke="blue"/>
      <path d="M40 44 L56 44" stroke-dasharray="2 2" stroke="blue"/>
      <polygon points="8,8 12,12 4,12" fill="green"/>
      <polygon points="24,56 20,52 28,52" fill="green"/>
      <polygon points="40,8 44,12 36,12" fill="green"/>
      <polygon points="56,56 52,52 60,52" fill="green"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Antiparallel</text>
    </svg>`
  },
  {
    id: 'biochem-protein-folding',
    name: 'Protein Folding Levels',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['protein folding', 'tertiary', 'quaternary', 'structure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12 L16 12" stroke="gray" stroke-width="2"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">1°</text>
      <path d="M20 8 C28 8, 28 16, 20 16 C28 16, 28 24, 20 24" stroke="purple" stroke-width="2" fill="none"/>
      <text x="30" y="18" font-size="3" fill="currentColor" stroke="none">2°</text>
      <ellipse cx="44" cy="16" rx="8" ry="10" fill="blue" opacity="0.3"/>
      <path d="M38 12 C44 8, 50 12, 48 18 C46 24, 40 22, 38 16" stroke="blue" stroke-width="1.5" fill="none"/>
      <text x="54" y="18" font-size="3" fill="currentColor" stroke="none">3°</text>
      <ellipse cx="20" cy="48" rx="8" ry="6" fill="red" opacity="0.3"/>
      <ellipse cx="36" cy="48" rx="8" ry="6" fill="green" opacity="0.3"/>
      <ellipse cx="28" cy="40" rx="6" ry="5" fill="blue" opacity="0.3"/>
      <ellipse cx="28" cy="56" rx="6" ry="5" fill="orange" opacity="0.3"/>
      <text x="48" y="50" font-size="3" fill="currentColor" stroke="none">4°</text>
    </svg>`
  },
  {
    id: 'biochem-disulfide-bond',
    name: 'Disulfide Bond',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['disulfide', 'cysteine', 'S-S bond', 'protein stability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="blue" opacity="0.2"/>
      <text x="10" y="23" font-size="5" fill="currentColor" stroke="none">Cys</text>
      <circle cx="48" cy="20" r="8" fill="blue" opacity="0.2"/>
      <text x="42" y="23" font-size="5" fill="currentColor" stroke="none">Cys</text>
      <circle cx="24" cy="36" r="5" fill="yellow"/>
      <text x="22" y="39" font-size="5" fill="currentColor" stroke="none">S</text>
      <circle cx="40" cy="36" r="5" fill="yellow"/>
      <text x="38" y="39" font-size="5" fill="currentColor" stroke="none">S</text>
      <path d="M29 36 L35 36" stroke-width="3" stroke="yellow"/>
      <path d="M20 26 L24 32"/>
      <path d="M44 26 L40 32"/>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">S-S Bridge</text>
    </svg>`
  },
  {
    id: 'biochem-chaperone',
    name: 'Chaperone Protein',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['chaperone', 'heat shock', 'HSP', 'protein folding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="blue" opacity="0.2"/>
      <path d="M16 32 C20 24, 28 24, 32 32 C36 40, 44 40, 48 32" stroke="red" stroke-width="2" fill="none"/>
      <text x="26" y="28" font-size="4" fill="currentColor" stroke="none">unfolded</text>
      <path d="M12 44 L20 44" stroke="green"/>
      <path d="M44 44 L52 44" stroke="green"/>
      <text x="4" y="48" font-size="4" fill="green" stroke="none">ATP</text>
      <text x="44" y="48" font-size="4" fill="green" stroke="none">ADP</text>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Chaperonin</text>
    </svg>`
  },

  // ===========================================================================
  // NUCLEIC ACIDS
  // ===========================================================================
  {
    id: 'biochem-dna-double-helix',
    name: 'DNA Double Helix',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['DNA', 'double helix', 'Watson-Crick', 'nucleotide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4 C32 8, 48 16, 32 24 C16 32, 32 40, 48 44 C32 48, 16 56, 32 60" stroke="blue" stroke-width="2"/>
      <path d="M48 4 C32 8, 16 16, 32 24 C48 32, 32 40, 16 44 C32 48, 48 56, 32 60" stroke="red" stroke-width="2"/>
      <path d="M24 12 L40 12" stroke="green" stroke-width="1"/>
      <path d="M28 24 L36 24" stroke="green" stroke-width="1"/>
      <path d="M24 36 L40 36" stroke="green" stroke-width="1"/>
      <path d="M28 48 L36 48" stroke="green" stroke-width="1"/>
      <text x="52" y="14" font-size="3" fill="currentColor" stroke="none">A-T</text>
      <text x="52" y="26" font-size="3" fill="currentColor" stroke="none">G-C</text>
    </svg>`
  },
  {
    id: 'biochem-nucleotide',
    name: 'Nucleotide Structure',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['nucleotide', 'base', 'sugar', 'phosphate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="8" fill="red" opacity="0.4"/>
      <text x="6" y="35" font-size="5" fill="currentColor" stroke="none">PO4</text>
      <polygon points="32,24 40,32 32,40 24,32" fill="blue" opacity="0.3"/>
      <text x="26" y="35" font-size="4" fill="currentColor" stroke="none">Sugar</text>
      <rect x="44" y="24" width="16" height="16" rx="2" fill="green" opacity="0.3"/>
      <text x="48" y="35" font-size="4" fill="currentColor" stroke="none">Base</text>
      <path d="M20 32 L24 32"/>
      <path d="M40 32 L44 32"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Phosphate</text>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">Ribose</text>
      <text x="44" y="52" font-size="4" fill="currentColor" stroke="none">A/G/C/T</text>
    </svg>`
  },
  {
    id: 'biochem-rna-structure',
    name: 'RNA Structure',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['RNA', 'mRNA', 'tRNA', 'rRNA', 'single strand'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8 L8 56" stroke="orange" stroke-width="2"/>
      <circle cx="16" cy="12" r="4" fill="blue"/>
      <circle cx="16" cy="24" r="4" fill="green"/>
      <circle cx="16" cy="36" r="4" fill="red"/>
      <circle cx="16" cy="48" r="4" fill="purple"/>
      <text x="22" y="14" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="22" y="26" font-size="5" fill="currentColor" stroke="none">U</text>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">G</text>
      <text x="22" y="50" font-size="5" fill="currentColor" stroke="none">C</text>
      <path d="M36 20 C48 16, 56 24, 48 32 C40 40, 48 48, 56 44" stroke="orange" stroke-width="2" fill="none"/>
      <text x="36" y="58" font-size="4" fill="currentColor" stroke="none">Hairpin loop</text>
    </svg>`
  },
  {
    id: 'biochem-base-pairing',
    name: 'Base Pairing',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['base pairing', 'A-T', 'G-C', 'hydrogen bonds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="20" rx="2" fill="blue" opacity="0.3"/>
      <text x="10" y="22" font-size="8" fill="currentColor" stroke="none">A</text>
      <rect x="40" y="8" width="20" height="20" rx="2" fill="green" opacity="0.3"/>
      <text x="47" y="22" font-size="8" fill="currentColor" stroke="none">T</text>
      <path d="M24 14 L40 14" stroke-dasharray="3 2" stroke="red"/>
      <path d="M24 22 L40 22" stroke-dasharray="3 2" stroke="red"/>
      <text x="28" y="12" font-size="3" fill="red" stroke="none">2 H-bonds</text>
      <rect x="4" y="36" width="20" height="20" rx="2" fill="purple" opacity="0.3"/>
      <text x="10" y="50" font-size="8" fill="currentColor" stroke="none">G</text>
      <rect x="40" y="36" width="20" height="20" rx="2" fill="orange" opacity="0.3"/>
      <text x="47" y="50" font-size="8" fill="currentColor" stroke="none">C</text>
      <path d="M24 42 L40 42" stroke-dasharray="3 2" stroke="red"/>
      <path d="M24 46 L40 46" stroke-dasharray="3 2" stroke="red"/>
      <path d="M24 50 L40 50" stroke-dasharray="3 2" stroke="red"/>
      <text x="28" y="40" font-size="3" fill="red" stroke="none">3 H-bonds</text>
    </svg>`
  },
  {
    id: 'biochem-replication-fork',
    name: 'DNA Replication Fork',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['replication', 'helicase', 'leading strand', 'lagging strand'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16 L32 32 L8 48" stroke="blue" stroke-width="2" fill="none"/>
      <path d="M8 20 L32 32 L8 44" stroke="red" stroke-width="2" fill="none"/>
      <path d="M32 32 L56 20" stroke="blue" stroke-width="2"/>
      <path d="M32 32 L40 38 M44 38 L52 38 M56 38 L60 38" stroke="red" stroke-width="2"/>
      <circle cx="32" cy="32" r="4" fill="green"/>
      <text x="28" y="28" font-size="3" fill="currentColor" stroke="none">Hel</text>
      <text x="44" y="16" font-size="4" fill="blue" stroke="none">Leading</text>
      <text x="44" y="50" font-size="4" fill="red" stroke="none">Lagging</text>
      <polygon points="56,18 60,20 56,22" fill="blue"/>
    </svg>`
  },
  {
    id: 'biochem-transcription',
    name: 'Transcription',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['transcription', 'RNA polymerase', 'mRNA', 'template'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24 L56 24" stroke="blue" stroke-width="2"/>
      <path d="M8 28 L56 28" stroke="blue" stroke-width="2"/>
      <text x="4" y="22" font-size="4" fill="currentColor" stroke="none">DNA</text>
      <ellipse cx="32" cy="26" rx="8" ry="10" fill="green" opacity="0.3"/>
      <text x="26" y="29" font-size="4" fill="currentColor" stroke="none">RNAP</text>
      <path d="M32 36 L32 44 C28 48, 20 48, 16 44" stroke="orange" stroke-width="2" fill="none"/>
      <text x="4" y="50" font-size="4" fill="orange" stroke="none">mRNA</text>
      <polygon points="16,42 12,44 16,46" fill="orange"/>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">5' → 3'</text>
    </svg>`
  },
  {
    id: 'biochem-translation',
    name: 'Translation',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['translation', 'ribosome', 'tRNA', 'protein synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40 L56 40" stroke="orange" stroke-width="2"/>
      <text x="4" y="48" font-size="4" fill="orange" stroke="none">mRNA</text>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="blue" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="12" ry="6" fill="purple" opacity="0.3"/>
      <text x="24" y="30" font-size="4" fill="currentColor" stroke="none">Ribosome</text>
      <path d="M28 20 L28 12" stroke="green" stroke-width="1.5"/>
      <circle cx="28" cy="10" r="3" fill="green"/>
      <text x="32" y="14" font-size="3" fill="currentColor" stroke="none">tRNA</text>
      <path d="M8 16 L20 16" stroke="gray" stroke-width="1.5"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">Protein</text>
    </svg>`
  },
  {
    id: 'biochem-codon',
    name: 'Codon Table',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['codon', 'genetic code', 'amino acid', 'triplet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="none"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <line x1="20" y1="8" x2="20" y2="56"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="44" y1="8" x2="44" y2="56"/>
      <text x="10" y="16" font-size="4" fill="currentColor" stroke="none">AUG</text>
      <text x="22" y="16" font-size="4" fill="currentColor" stroke="none">Met</text>
      <text x="34" y="16" font-size="4" fill="green" stroke="none">Start</text>
      <text x="10" y="28" font-size="4" fill="currentColor" stroke="none">UAA</text>
      <text x="22" y="28" font-size="4" fill="red" stroke="none">Stop</text>
      <text x="10" y="40" font-size="4" fill="currentColor" stroke="none">GGU</text>
      <text x="22" y="40" font-size="4" fill="currentColor" stroke="none">Gly</text>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">UUU</text>
      <text x="22" y="52" font-size="4" fill="currentColor" stroke="none">Phe</text>
    </svg>`
  },

  // ===========================================================================
  // CARBOHYDRATES
  // ===========================================================================
  {
    id: 'biochem-glucose-ring',
    name: 'Glucose Ring Structure',
    domain: 'chemistry',
    category: 'carbohydrates',
    tags: ['glucose', 'hexose', 'pyranose', 'monosaccharide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="20,16 44,16 52,32 44,48 20,48 12,32" fill="cyan" opacity="0.2"/>
      <polygon points="20,16 44,16 52,32 44,48 20,48 12,32" fill="none"/>
      <circle cx="44" cy="16" r="2" fill="red"/>
      <text x="46" y="14" font-size="4" fill="currentColor" stroke="none">O</text>
      <circle cx="20" cy="16" r="2" fill="blue"/>
      <circle cx="12" cy="32" r="2" fill="blue"/>
      <circle cx="20" cy="48" r="2" fill="blue"/>
      <circle cx="44" cy="48" r="2" fill="blue"/>
      <circle cx="52" cy="32" r="2" fill="blue"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">OH groups</text>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">Glc</text>
    </svg>`
  },
  {
    id: 'biochem-glycogen',
    name: 'Glycogen Structure',
    domain: 'chemistry',
    category: 'carbohydrates',
    tags: ['glycogen', 'storage', 'branched', 'polysaccharide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="blue" opacity="0.3"/>
      <circle cx="20" cy="20" r="4" fill="cyan" opacity="0.3"/>
      <circle cx="44" cy="20" r="4" fill="cyan" opacity="0.3"/>
      <circle cx="20" cy="44" r="4" fill="cyan" opacity="0.3"/>
      <circle cx="44" cy="44" r="4" fill="cyan" opacity="0.3"/>
      <circle cx="12" cy="12" r="3" fill="green" opacity="0.3"/>
      <circle cx="28" cy="12" r="3" fill="green" opacity="0.3"/>
      <circle cx="52" cy="12" r="3" fill="green" opacity="0.3"/>
      <path d="M32 26 L20 20 L12 12"/>
      <path d="M32 26 L20 20 L28 12"/>
      <path d="M32 26 L44 20 L52 12"/>
      <path d="M32 38 L20 44"/>
      <path d="M32 38 L44 44"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">α-1,4 & α-1,6</text>
    </svg>`
  },
  {
    id: 'biochem-disaccharide',
    name: 'Disaccharide',
    domain: 'chemistry',
    category: 'carbohydrates',
    tags: ['disaccharide', 'sucrose', 'maltose', 'lactose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,20 24,20 28,32 24,44 12,44 8,32" fill="cyan" opacity="0.3"/>
      <polygon points="40,20 52,20 56,32 52,44 40,44 36,32" fill="pink" opacity="0.3"/>
      <path d="M28 32 L36 32" stroke-width="2" stroke="orange"/>
      <text x="10" y="35" font-size="5" fill="currentColor" stroke="none">Glc</text>
      <text x="42" y="35" font-size="5" fill="currentColor" stroke="none">Fru</text>
      <text x="28" y="28" font-size="3" fill="orange" stroke="none">1-2</text>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Sucrose</text>
    </svg>`
  },
  {
    id: 'biochem-cellulose',
    name: 'Cellulose',
    domain: 'chemistry',
    category: 'carbohydrates',
    tags: ['cellulose', 'fiber', 'plant', 'beta linkage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="12" height="12" fill="green" opacity="0.3"/>
      <rect x="18" y="28" width="12" height="12" fill="green" opacity="0.3"/>
      <rect x="32" y="24" width="12" height="12" fill="green" opacity="0.3"/>
      <rect x="46" y="28" width="12" height="12" fill="green" opacity="0.3"/>
      <path d="M16 30 L18 30"/>
      <path d="M30 34 L32 30"/>
      <path d="M44 30 L46 34"/>
      <text x="6" y="32" font-size="4" fill="currentColor" stroke="none">β</text>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">β</text>
      <text x="34" y="32" font-size="4" fill="currentColor" stroke="none">β</text>
      <text x="48" y="36" font-size="4" fill="currentColor" stroke="none">β</text>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">β-1,4 glycosidic</text>
      <path d="M4 16 L60 16" stroke="brown" stroke-width="1" stroke-dasharray="2 2"/>
      <path d="M4 44 L60 44" stroke="brown" stroke-width="1" stroke-dasharray="2 2"/>
      <text x="4" y="12" font-size="3" fill="brown" stroke="none">H-bonds</text>
    </svg>`
  },

  // ===========================================================================
  // LIPIDS
  // ===========================================================================
  {
    id: 'biochem-fatty-acid',
    name: 'Fatty Acid',
    domain: 'chemistry',
    category: 'lipids',
    tags: ['fatty acid', 'carboxyl', 'hydrocarbon', 'saturated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="red" opacity="0.4"/>
      <text x="2" y="35" font-size="4" fill="currentColor" stroke="none">COOH</text>
      <path d="M14 32 L56 32" stroke="orange" stroke-width="3"/>
      <text x="20" y="28" font-size="4" fill="currentColor" stroke="none">CH2-CH2-CH2...</text>
      <text x="8" y="48" font-size="4" fill="currentColor" stroke="none">Hydrophilic</text>
      <text x="32" y="48" font-size="4" fill="currentColor" stroke="none">Hydrophobic</text>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">Saturated FA</text>
    </svg>`
  },
  {
    id: 'biochem-phospholipid',
    name: 'Phospholipid',
    domain: 'chemistry',
    category: 'lipids',
    tags: ['phospholipid', 'membrane', 'bilayer', 'amphipathic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="blue" opacity="0.4"/>
      <text x="26" y="15" font-size="4" fill="currentColor" stroke="none">Head</text>
      <path d="M28 20 L24 56" stroke="orange" stroke-width="2"/>
      <path d="M36 20 L40 56" stroke="orange" stroke-width="2"/>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">Tail 1</text>
      <text x="42" y="40" font-size="4" fill="currentColor" stroke="none">Tail 2</text>
      <text x="4" y="12" font-size="3" fill="blue" stroke="none">Polar</text>
      <text x="4" y="48" font-size="3" fill="orange" stroke="none">Nonpolar</text>
    </svg>`
  },
  {
    id: 'biochem-lipid-bilayer',
    name: 'Lipid Bilayer',
    domain: 'chemistry',
    category: 'lipids',
    tags: ['bilayer', 'membrane', 'cell membrane', 'phospholipid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="4" fill="blue"/>
      <circle cx="24" cy="16" r="4" fill="blue"/>
      <circle cx="36" cy="16" r="4" fill="blue"/>
      <circle cx="48" cy="16" r="4" fill="blue"/>
      <path d="M12 20 L10 32 M14 20 L16 32"/>
      <path d="M24 20 L22 32 M26 20 L28 32"/>
      <path d="M36 20 L34 32 M38 20 L40 32"/>
      <path d="M48 20 L46 32 M50 20 L52 32"/>
      <circle cx="12" cy="48" r="4" fill="blue"/>
      <circle cx="24" cy="48" r="4" fill="blue"/>
      <circle cx="36" cy="48" r="4" fill="blue"/>
      <circle cx="48" cy="48" r="4" fill="blue"/>
      <path d="M12 44 L10 32 M14 44 L16 32"/>
      <path d="M24 44 L22 32 M26 44 L28 32"/>
      <path d="M36 44 L34 32 M38 44 L40 32"/>
      <path d="M48 44 L46 32 M50 44 L52 32"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Extracellular</text>
    </svg>`
  },
  {
    id: 'biochem-cholesterol',
    name: 'Cholesterol',
    domain: 'chemistry',
    category: 'lipids',
    tags: ['cholesterol', 'steroid', 'membrane fluidity', 'sterol'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,24 24,16 36,16 48,24 48,40 36,48 24,48 12,40" fill="yellow" opacity="0.3"/>
      <polygon points="12,24 24,16 36,16 48,24 48,40 36,48 24,48 12,40" fill="none"/>
      <polygon points="20,24 28,20 36,24 36,36 28,40 20,36" fill="none"/>
      <path d="M48 32 L56 28 L56 20"/>
      <circle cx="12" cy="32" r="3" fill="red"/>
      <text x="6" y="35" font-size="4" fill="currentColor" stroke="none">OH</text>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Steroid ring</text>
    </svg>`
  },
  {
    id: 'biochem-triglyceride',
    name: 'Triglyceride',
    domain: 'chemistry',
    category: 'lipids',
    tags: ['triglyceride', 'fat', 'glycerol', 'ester'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="12" height="24" fill="blue" opacity="0.3"/>
      <text x="6" y="35" font-size="4" fill="currentColor" stroke="none">Gly</text>
      <path d="M16 24 L56 24" stroke="orange" stroke-width="2"/>
      <path d="M16 32 L56 32" stroke="orange" stroke-width="2"/>
      <path d="M16 40 L56 40" stroke="orange" stroke-width="2"/>
      <text x="32" y="20" font-size="4" fill="currentColor" stroke="none">FA 1</text>
      <text x="32" y="30" font-size="4" fill="currentColor" stroke="none">FA 2</text>
      <text x="32" y="48" font-size="4" fill="currentColor" stroke="none">FA 3</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Triacylglycerol</text>
    </svg>`
  },

  // ===========================================================================
  // CELL SIGNALING
  // ===========================================================================
  {
    id: 'biochem-gpcr',
    name: 'G-Protein Coupled Receptor',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['GPCR', 'receptor', 'G protein', '7TM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="4" fill="gray" opacity="0.3"/>
      <path d="M12 20 L12 8 L16 8 L16 20 L20 20 L20 8 L24 8 L24 20 L28 20 L28 8 L32 8 L32 20" stroke="purple" stroke-width="2" fill="none"/>
      <path d="M32 24 L32 36 L36 36 L36 24 L40 24 L40 36 L44 36 L44 24 L48 24 L48 36 L52 36 L52 24" stroke="purple" stroke-width="2" fill="none"/>
      <circle cx="20" cy="4" r="3" fill="green"/>
      <text x="24" y="6" font-size="3" fill="currentColor" stroke="none">Ligand</text>
      <ellipse cx="40" cy="44" rx="12" ry="6" fill="blue" opacity="0.3"/>
      <text x="34" y="46" font-size="4" fill="currentColor" stroke="none">G-prot</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">7-TM receptor</text>
    </svg>`
  },
  {
    id: 'biochem-camp-pathway',
    name: 'cAMP Signaling Pathway',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['cAMP', 'adenylyl cyclase', 'PKA', 'second messenger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="6" fill="green" opacity="0.4"/>
      <text x="6" y="15" font-size="4" fill="currentColor" stroke="none">GPCR</text>
      <path d="M18 12 L26 12"/>
      <circle cx="32" cy="12" r="6" fill="blue" opacity="0.4"/>
      <text x="28" y="15" font-size="4" fill="currentColor" stroke="none">AC</text>
      <path d="M32 18 L32 26"/>
      <circle cx="32" cy="32" r="6" fill="orange" opacity="0.4"/>
      <text x="26" y="35" font-size="4" fill="currentColor" stroke="none">cAMP</text>
      <path d="M32 38 L32 46"/>
      <circle cx="32" cy="52" r="6" fill="red" opacity="0.4"/>
      <text x="26" y="55" font-size="4" fill="currentColor" stroke="none">PKA</text>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">ATP→cAMP</text>
    </svg>`
  },
  {
    id: 'biochem-receptor-tyrosine-kinase',
    name: 'Receptor Tyrosine Kinase',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['RTK', 'tyrosine kinase', 'phosphorylation', 'growth factor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="4" height="20" fill="purple"/>
      <rect x="44" y="16" width="4" height="20" fill="purple"/>
      <circle cx="18" cy="12" r="4" fill="green"/>
      <circle cx="46" cy="12" r="4" fill="green"/>
      <rect x="4" y="20" width="56" height="4" fill="gray" opacity="0.3"/>
      <ellipse cx="18" cy="44" rx="6" ry="8" fill="red" opacity="0.3"/>
      <ellipse cx="46" cy="44" rx="6" ry="8" fill="red" opacity="0.3"/>
      <text x="14" y="46" font-size="4" fill="currentColor" stroke="none">Tyr</text>
      <text x="42" y="46" font-size="4" fill="currentColor" stroke="none">Tyr</text>
      <circle cx="18" cy="40" r="2" fill="yellow"/>
      <circle cx="46" cy="40" r="2" fill="yellow"/>
      <text x="50" y="42" font-size="3" fill="yellow" stroke="none">P</text>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Dimerization</text>
    </svg>`
  },
  {
    id: 'biochem-mapk-cascade',
    name: 'MAPK Cascade',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['MAPK', 'ERK', 'kinase cascade', 'signal transduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="10" rx="2" fill="blue" opacity="0.3"/>
      <text x="24" y="12" font-size="5" fill="currentColor" stroke="none">MAPKKK</text>
      <path d="M32 14 L32 20"/>
      <rect x="20" y="20" width="24" height="10" rx="2" fill="green" opacity="0.3"/>
      <text x="26" y="28" font-size="5" fill="currentColor" stroke="none">MAPKK</text>
      <path d="M32 30 L32 36"/>
      <rect x="20" y="36" width="24" height="10" rx="2" fill="red" opacity="0.3"/>
      <text x="28" y="44" font-size="5" fill="currentColor" stroke="none">MAPK</text>
      <path d="M32 46 L32 52"/>
      <rect x="16" y="52" width="32" height="8" rx="2" fill="purple" opacity="0.3"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Transcription</text>
      <text x="48" y="12" font-size="3" fill="currentColor" stroke="none">Raf</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">MEK</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">ERK</text>
    </svg>`
  },
  {
    id: 'biochem-calcium-signaling',
    name: 'Calcium Signaling',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['calcium', 'IP3', 'calmodulin', 'second messenger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="56" height="4" fill="gray" opacity="0.3"/>
      <circle cx="20" cy="12" r="4" fill="green"/>
      <text x="26" y="14" font-size="3" fill="currentColor" stroke="none">PLC</text>
      <path d="M20 20 L20 28"/>
      <circle cx="12" cy="34" r="4" fill="orange"/>
      <text x="8" y="36" font-size="4" fill="currentColor" stroke="none">IP3</text>
      <circle cx="28" cy="34" r="4" fill="yellow"/>
      <text x="23" y="36" font-size="3" fill="currentColor" stroke="none">DAG</text>
      <path d="M12 38 L12 44"/>
      <ellipse cx="12" cy="50" rx="8" ry="4" fill="blue" opacity="0.3"/>
      <text x="6" y="52" font-size="3" fill="currentColor" stroke="none">ER</text>
      <circle cx="28" cy="52" r="3" fill="cyan"/>
      <text x="24" y="54" font-size="4" fill="currentColor" stroke="none">Ca2+</text>
      <path d="M20 50 L24 52" stroke-dasharray="2 2"/>
      <text x="40" y="52" font-size="4" fill="currentColor" stroke="none">Calmodulin</text>
    </svg>`
  },

  // ===========================================================================
  // LAB TECHNIQUES
  // ===========================================================================
  {
    id: 'biochem-gel-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['electrophoresis', 'gel', 'DNA', 'protein separation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="blue" opacity="0.1"/>
      <rect x="12" y="12" width="8" height="4" fill="blue"/>
      <rect x="24" y="12" width="8" height="4" fill="blue"/>
      <rect x="36" y="12" width="8" height="4" fill="blue"/>
      <rect x="12" y="20" width="8" height="2" fill="purple"/>
      <rect x="12" y="26" width="8" height="2" fill="purple"/>
      <rect x="12" y="34" width="8" height="2" fill="purple"/>
      <rect x="24" y="22" width="8" height="2" fill="green"/>
      <rect x="24" y="32" width="8" height="2" fill="green"/>
      <rect x="36" y="18" width="8" height="2" fill="red"/>
      <rect x="36" y="24" width="8" height="2" fill="red"/>
      <rect x="36" y="30" width="8" height="2" fill="red"/>
      <rect x="36" y="36" width="8" height="2" fill="red"/>
      <text x="4" y="10" font-size="4" fill="currentColor" stroke="none">-</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">+</text>
      <path d="M8 8 L8 56" stroke="red" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biochem-pcr',
    name: 'PCR (Polymerase Chain Reaction)',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['PCR', 'amplification', 'DNA', 'polymerase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8 L16 16 M20 8 L20 16" stroke="blue" stroke-width="2"/>
      <text x="24" y="14" font-size="4" fill="currentColor" stroke="none">Denature 95°C</text>
      <path d="M12 24 L16 28 L16 32 M20 24 L24 24" stroke="blue" stroke-width="2"/>
      <rect x="8" y="26" width="4" height="4" fill="green"/>
      <rect x="24" y="22" width="4" height="4" fill="green"/>
      <text x="32" y="28" font-size="4" fill="currentColor" stroke="none">Anneal 55°C</text>
      <path d="M8 40 L24 40 M8 44 L24 44" stroke="blue" stroke-width="2"/>
      <path d="M16 40 L16 44" stroke="red" stroke-width="1"/>
      <text x="28" y="44" font-size="4" fill="currentColor" stroke="none">Extend 72°C</text>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">2^n copies</text>
    </svg>`
  },
  {
    id: 'biochem-western-blot',
    name: 'Western Blot',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['western blot', 'protein', 'antibody', 'immunoblot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="white"/>
      <rect x="8" y="8" width="48" height="48" fill="none"/>
      <rect x="16" y="16" width="8" height="3" fill="blue"/>
      <rect x="16" y="24" width="8" height="3" fill="blue" opacity="0.7"/>
      <rect x="16" y="32" width="8" height="3" fill="blue" opacity="0.4"/>
      <rect x="32" y="20" width="8" height="3" fill="green"/>
      <rect x="32" y="28" width="8" height="3" fill="green" opacity="0.6"/>
      <rect x="48" y="18" width="8" height="3" fill="red"/>
      <text x="10" y="48" font-size="4" fill="currentColor" stroke="none">Lane 1</text>
      <text x="30" y="48" font-size="4" fill="currentColor" stroke="none">Lane 2</text>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">Lane 3</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">kDa</text>
    </svg>`
  },
  {
    id: 'biochem-chromatography',
    name: 'Column Chromatography',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['chromatography', 'separation', 'column', 'purification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="52" rx="2" fill="gray" opacity="0.1"/>
      <rect x="20" y="4" width="24" height="52" rx="2" fill="none"/>
      <rect x="22" y="8" width="20" height="6" fill="blue" opacity="0.4"/>
      <rect x="22" y="20" width="20" height="4" fill="green" opacity="0.6"/>
      <rect x="22" y="30" width="20" height="4" fill="red" opacity="0.6"/>
      <rect x="22" y="40" width="20" height="4" fill="purple" opacity="0.6"/>
      <path d="M32 56 L32 60"/>
      <ellipse cx="32" cy="62" rx="4" ry="2" fill="cyan"/>
      <path d="M16 8 L20 8" stroke="blue"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">Sample</text>
      <text x="48" y="24" font-size="3" fill="currentColor" stroke="none">Bands</text>
    </svg>`
  },
  {
    id: 'biochem-spectrophotometer',
    name: 'Spectrophotometry',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['spectrophotometry', 'absorbance', 'wavelength', 'concentration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="6" fill="yellow"/>
      <text x="8" y="35" font-size="4" fill="currentColor" stroke="none">Light</text>
      <path d="M18 32 L26 32" stroke="yellow" stroke-width="2"/>
      <rect x="26" y="24" width="12" height="16" fill="blue" opacity="0.3"/>
      <text x="28" y="34" font-size="4" fill="currentColor" stroke="none">Sample</text>
      <path d="M38 32 L46 32" stroke="yellow" stroke-width="1" stroke-dasharray="2 2"/>
      <rect x="46" y="28" width="12" height="8" fill="gray"/>
      <text x="48" y="34" font-size="3" fill="currentColor" stroke="none">Det</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">A = εlc</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Beer-Lambert</text>
    </svg>`
  },
  {
    id: 'biochem-centrifugation',
    name: 'Centrifugation',
    domain: 'chemistry',
    category: 'lab-techniques',
    tags: ['centrifuge', 'separation', 'sedimentation', 'density'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="gray" opacity="0.1"/>
      <circle cx="32" cy="32" r="24" fill="none"/>
      <ellipse cx="32" cy="16" rx="6" ry="10" fill="blue" opacity="0.3" transform="rotate(0 32 32)"/>
      <ellipse cx="48" cy="32" rx="6" ry="10" fill="blue" opacity="0.3" transform="rotate(90 32 32)"/>
      <ellipse cx="32" cy="48" rx="6" ry="10" fill="blue" opacity="0.3" transform="rotate(180 32 32)"/>
      <ellipse cx="16" cy="32" rx="6" ry="10" fill="blue" opacity="0.3" transform="rotate(270 32 32)"/>
      <circle cx="32" cy="32" r="4" fill="gray"/>
      <path d="M28 32 L20 32 L16 28" stroke="green" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">RCF = ω²r</text>
    </svg>`
  },

  // ===========================================================================
  // VITAMINS AND MINERALS
  // ===========================================================================
  {
    id: 'biochem-vitamin-c',
    name: 'Vitamin C (Ascorbic Acid)',
    domain: 'chemistry',
    category: 'vitamins',
    tags: ['vitamin C', 'ascorbic acid', 'antioxidant', 'collagen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="20,16 44,16 52,32 44,48 20,48 12,32" fill="orange" opacity="0.3"/>
      <circle cx="20" cy="24" r="3" fill="red"/>
      <circle cx="44" cy="24" r="3" fill="red"/>
      <text x="16" y="27" font-size="4" fill="currentColor" stroke="none">OH</text>
      <text x="40" y="27" font-size="4" fill="currentColor" stroke="none">OH</text>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">Vit C</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Antioxidant</text>
      <path d="M52 32 L58 32" stroke="blue" stroke-dasharray="2 2"/>
      <text x="54" y="28" font-size="3" fill="blue" stroke="none">e-</text>
    </svg>`
  },
  {
    id: 'biochem-vitamin-d',
    name: 'Vitamin D',
    domain: 'chemistry',
    category: 'vitamins',
    tags: ['vitamin D', 'calciferol', 'calcium', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,20 28,16 40,20 44,32 40,44 28,48 16,44 12,32" fill="yellow" opacity="0.3"/>
      <polygon points="16,20 28,16 40,20 44,32 40,44 28,48 16,44 12,32" fill="none"/>
      <path d="M44 32 L56 28 L56 20"/>
      <circle cx="8" cy="12" r="4" fill="yellow"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">UV</text>
      <path d="M12 12 L16 20" stroke="yellow" stroke-dasharray="2 2"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">D3</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Ca2+ absorption</text>
    </svg>`
  },
  {
    id: 'biochem-vitamin-b12',
    name: 'Vitamin B12',
    domain: 'chemistry',
    category: 'vitamins',
    tags: ['vitamin B12', 'cobalamin', 'cobalt', 'methylation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,16 56,32 48,48 16,48 8,32" fill="red" opacity="0.3"/>
      <circle cx="32" cy="32" r="8" fill="pink"/>
      <text x="28" y="35" font-size="5" fill="currentColor" stroke="none">Co</text>
      <circle cx="20" cy="24" r="3" fill="blue"/>
      <circle cx="44" cy="24" r="3" fill="blue"/>
      <circle cx="20" cy="40" r="3" fill="blue"/>
      <circle cx="44" cy="40" r="3" fill="blue"/>
      <text x="18" y="26" font-size="3" fill="white" stroke="none">N</text>
      <text x="42" y="26" font-size="3" fill="white" stroke="none">N</text>
      <text x="18" y="42" font-size="3" fill="white" stroke="none">N</text>
      <text x="42" y="42" font-size="3" fill="white" stroke="none">N</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Corrin ring</text>
    </svg>`
  },
  {
    id: 'biochem-iron-heme',
    name: 'Heme Iron',
    domain: 'chemistry',
    category: 'vitamins',
    tags: ['heme', 'iron', 'hemoglobin', 'porphyrin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,16 56,32 48,48 16,48 8,32" fill="red" opacity="0.2"/>
      <circle cx="32" cy="32" r="6" fill="red"/>
      <text x="28" y="35" font-size="5" fill="white" stroke="none">Fe</text>
      <path d="M20 20 L26 26"/>
      <path d="M44 20 L38 26"/>
      <path d="M20 44 L26 38"/>
      <path d="M44 44 L38 38"/>
      <circle cx="16" cy="16" r="2" fill="blue"/>
      <circle cx="48" cy="16" r="2" fill="blue"/>
      <circle cx="16" cy="48" r="2" fill="blue"/>
      <circle cx="48" cy="48" r="2" fill="blue"/>
      <path d="M32 8 L32 26" stroke="cyan" stroke-dasharray="2 2"/>
      <text x="34" y="12" font-size="3" fill="cyan" stroke="none">O2</text>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Porphyrin ring</text>
    </svg>`
  },

  // ===========================================================================
  // MOLECULAR STRUCTURES
  // ===========================================================================
  {
    id: 'biochem-hydrogen-bond',
    name: 'Hydrogen Bond',
    domain: 'chemistry',
    category: 'molecular',
    tags: ['hydrogen bond', 'H-bond', 'intermolecular', 'weak bond'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="red" opacity="0.4"/>
      <text x="12" y="35" font-size="6" fill="currentColor" stroke="none">O</text>
      <circle cx="32" cy="24" r="4" fill="white"/>
      <text x="30" y="27" font-size="5" fill="currentColor" stroke="none">H</text>
      <path d="M24 28 L28 26" stroke-width="2"/>
      <path d="M36 26 L44 30" stroke-dasharray="3 2" stroke="blue" stroke-width="2"/>
      <circle cx="52" cy="32" r="8" fill="blue" opacity="0.4"/>
      <text x="48" y="35" font-size="6" fill="currentColor" stroke="none">N</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Donor</text>
      <text x="40" y="52" font-size="4" fill="currentColor" stroke="none">Acceptor</text>
      <text x="28" y="14" font-size="4" fill="blue" stroke="none">H-bond</text>
    </svg>`
  },
  {
    id: 'biochem-ionic-bond',
    name: 'Ionic Bond',
    domain: 'chemistry',
    category: 'molecular',
    tags: ['ionic bond', 'electrostatic', 'salt bridge', 'charge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12" fill="red" opacity="0.3"/>
      <text x="12" y="36" font-size="8" fill="currentColor" stroke="none">COO</text>
      <text x="26" y="28" font-size="6" fill="red" stroke="none">-</text>
      <circle cx="48" cy="32" r="10" fill="blue" opacity="0.3"/>
      <text x="40" y="36" font-size="6" fill="currentColor" stroke="none">NH3</text>
      <text x="54" y="28" font-size="6" fill="blue" stroke="none">+</text>
      <path d="M32 32 L38 32" stroke="purple" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Glu/Asp</text>
      <text x="40" y="54" font-size="4" fill="currentColor" stroke="none">Lys/Arg</text>
    </svg>`
  },
  {
    id: 'biochem-hydrophobic',
    name: 'Hydrophobic Interaction',
    domain: 'chemistry',
    category: 'molecular',
    tags: ['hydrophobic', 'nonpolar', 'van der Waals', 'protein core'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="blue" opacity="0.1"/>
      <text x="4" y="32" font-size="4" fill="blue" stroke="none">H2O</text>
      <circle cx="24" cy="28" r="6" fill="orange" opacity="0.5"/>
      <circle cx="40" cy="28" r="6" fill="orange" opacity="0.5"/>
      <circle cx="32" cy="40" r="6" fill="orange" opacity="0.5"/>
      <text x="20" y="30" font-size="4" fill="currentColor" stroke="none">Leu</text>
      <text x="36" y="30" font-size="4" fill="currentColor" stroke="none">Ile</text>
      <text x="28" y="42" font-size="4" fill="currentColor" stroke="none">Val</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Hydrophobic core</text>
    </svg>`
  },
  {
    id: 'biochem-functional-groups',
    name: 'Functional Groups',
    domain: 'chemistry',
    category: 'molecular',
    tags: ['functional group', 'organic', 'hydroxyl', 'carboxyl', 'amino'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="12" fill="red" opacity="0.2"/>
      <text x="8" y="13" font-size="5" fill="currentColor" stroke="none">-OH</text>
      <rect x="36" y="4" width="24" height="12" fill="blue" opacity="0.2"/>
      <text x="38" y="13" font-size="5" fill="currentColor" stroke="none">-NH2</text>
      <rect x="4" y="20" width="24" height="12" fill="green" opacity="0.2"/>
      <text x="6" y="29" font-size="4" fill="currentColor" stroke="none">-COOH</text>
      <rect x="36" y="20" width="24" height="12" fill="orange" opacity="0.2"/>
      <text x="40" y="29" font-size="5" fill="currentColor" stroke="none">-SH</text>
      <rect x="4" y="36" width="24" height="12" fill="purple" opacity="0.2"/>
      <text x="6" y="45" font-size="4" fill="currentColor" stroke="none">-PO4</text>
      <rect x="36" y="36" width="24" height="12" fill="yellow" opacity="0.2"/>
      <text x="38" y="45" font-size="4" fill="currentColor" stroke="none">C=O</text>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">Key functional groups</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL METABOLISM
  // ===========================================================================
  {
    id: 'biochem-glycogenesis',
    name: 'Glycogenesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['glycogenesis', 'glycogen synthesis', 'glucose storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="12" r="6" fill="blue" opacity="0.3"/>
      <text x="10" y="15" font-size="4" fill="currentColor" stroke="none">Glc</text>
      <path d="M16 18 L16 26"/>
      <circle cx="16" cy="32" r="6" fill="cyan" opacity="0.3"/>
      <text x="8" y="35" font-size="4" fill="currentColor" stroke="none">G6P</text>
      <path d="M16 38 L16 46"/>
      <ellipse cx="32" cy="52" rx="20" ry="8" fill="purple" opacity="0.3"/>
      <text x="20" y="55" font-size="5" fill="currentColor" stroke="none">Glycogen</text>
      <text x="28" y="32" font-size="3" fill="currentColor" stroke="none">Glycogen</text>
      <text x="28" y="38" font-size="3" fill="currentColor" stroke="none">synthase</text>
      <text x="44" y="20" font-size="4" fill="green" stroke="none">Insulin ↑</text>
    </svg>`
  },
  {
    id: 'biochem-glycogenolysis',
    name: 'Glycogenolysis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['glycogenolysis', 'glycogen breakdown', 'phosphorylase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="20" ry="8" fill="purple" opacity="0.3"/>
      <text x="20" y="15" font-size="5" fill="currentColor" stroke="none">Glycogen</text>
      <path d="M32 20 L32 28"/>
      <circle cx="32" cy="34" r="6" fill="cyan" opacity="0.3"/>
      <text x="24" y="37" font-size="4" fill="currentColor" stroke="none">G1P</text>
      <path d="M32 40 L32 48"/>
      <circle cx="32" cy="54" r="6" fill="blue" opacity="0.3"/>
      <text x="26" y="57" font-size="4" fill="currentColor" stroke="none">Glc</text>
      <text x="40" y="28" font-size="3" fill="currentColor" stroke="none">Phosphorylase</text>
      <text x="44" y="48" font-size="4" fill="red" stroke="none">Glucagon ↑</text>
      <text x="44" y="54" font-size="4" fill="orange" stroke="none">Epi ↑</text>
    </svg>`
  },
  {
    id: 'biochem-ketogenesis',
    name: 'Ketogenesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['ketogenesis', 'ketone bodies', 'acetoacetate', 'liver'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="22" y="13" font-size="4" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <path d="M32 16 L32 24"/>
      <rect x="20" y="24" width="24" height="10" fill="green" opacity="0.2"/>
      <text x="24" y="32" font-size="4" fill="currentColor" stroke="none">HMG-CoA</text>
      <path d="M32 34 L32 42"/>
      <circle cx="16" cy="52" r="6" fill="orange" opacity="0.4"/>
      <text x="8" y="55" font-size="3" fill="currentColor" stroke="none">AcAc</text>
      <circle cx="32" cy="52" r="6" fill="orange" opacity="0.4"/>
      <text x="26" y="55" font-size="3" fill="currentColor" stroke="none">βHB</text>
      <circle cx="48" cy="52" r="6" fill="orange" opacity="0.4"/>
      <text x="42" y="55" font-size="3" fill="currentColor" stroke="none">Acet</text>
      <path d="M24 44 L16 48"/>
      <path d="M32 42 L32 46"/>
      <path d="M40 44 L48 48"/>
    </svg>`
  },
  {
    id: 'biochem-cholesterol-synthesis',
    name: 'Cholesterol Synthesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['cholesterol synthesis', 'HMG-CoA reductase', 'mevalonate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="5" fill="blue" opacity="0.3"/>
      <text x="22" y="11" font-size="3" fill="currentColor" stroke="none">Acetyl-CoA</text>
      <path d="M32 13 L32 19"/>
      <rect x="20" y="19" width="24" height="8" fill="red" opacity="0.3"/>
      <text x="22" y="25" font-size="3" fill="currentColor" stroke="none">HMG-CoA</text>
      <path d="M32 27 L32 33"/>
      <text x="40" y="30" font-size="3" fill="red" stroke="none">Statins ⊗</text>
      <rect x="20" y="33" width="24" height="8" fill="green" opacity="0.3"/>
      <text x="22" y="39" font-size="3" fill="currentColor" stroke="none">Mevalonate</text>
      <path d="M32 41 L32 47"/>
      <polygon points="24,48 40,48 44,56 36,60 28,60 20,56" fill="yellow" opacity="0.3"/>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">Chol</text>
    </svg>`
  },
  {
    id: 'biochem-purine-synthesis',
    name: 'Purine Synthesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['purine', 'nucleotide synthesis', 'IMP', 'de novo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="blue" opacity="0.3"/>
      <text x="24" y="13" font-size="4" fill="currentColor" stroke="none">PRPP</text>
      <path d="M32 16 L32 24"/>
      <rect x="20" y="24" width="24" height="12" fill="purple" opacity="0.2"/>
      <text x="28" y="33" font-size="5" fill="currentColor" stroke="none">IMP</text>
      <path d="M26 36 L18 44"/>
      <path d="M38 36 L46 44"/>
      <circle cx="14" cy="50" r="6" fill="green" opacity="0.3"/>
      <text x="8" y="53" font-size="4" fill="currentColor" stroke="none">AMP</text>
      <circle cx="50" cy="50" r="6" fill="orange" opacity="0.3"/>
      <text x="44" y="53" font-size="4" fill="currentColor" stroke="none">GMP</text>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">Gln, Gly</text>
      <text x="4" y="22" font-size="3" fill="currentColor" stroke="none">Asp, CO2</text>
    </svg>`
  },
  {
    id: 'biochem-pyrimidine-synthesis',
    name: 'Pyrimidine Synthesis',
    domain: 'chemistry',
    category: 'metabolism',
    tags: ['pyrimidine', 'nucleotide synthesis', 'UMP', 'de novo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="10" r="5" fill="blue" opacity="0.3"/>
      <text x="10" y="13" font-size="3" fill="currentColor" stroke="none">Gln</text>
      <circle cx="32" cy="10" r="5" fill="red" opacity="0.3"/>
      <text x="26" y="13" font-size="3" fill="currentColor" stroke="none">CO2</text>
      <circle cx="48" cy="10" r="5" fill="green" opacity="0.3"/>
      <text x="42" y="13" font-size="3" fill="currentColor" stroke="none">Asp</text>
      <path d="M24 15 L28 20 M40 15 L36 20"/>
      <rect x="20" y="20" width="24" height="10" fill="orange" opacity="0.2"/>
      <text x="22" y="28" font-size="4" fill="currentColor" stroke="none">Orotate</text>
      <path d="M32 30 L32 38"/>
      <rect x="20" y="38" width="24" height="10" fill="purple" opacity="0.2"/>
      <text x="28" y="46" font-size="4" fill="currentColor" stroke="none">UMP</text>
      <path d="M26 48 L18 54"/>
      <path d="M38 48 L46 54"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">CTP</text>
      <text x="44" y="58" font-size="4" fill="currentColor" stroke="none">TMP</text>
    </svg>`
  },

  // ===========================================================================
  // INDIVIDUAL AMINO ACIDS
  // ===========================================================================
  {
    id: 'biochem-glycine',
    name: 'Glycine (Gly)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['glycine', 'Gly', 'G', 'simplest amino acid', 'nonpolar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="gray" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Gly</text>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">R = H</text>
      <text x="16" y="14" font-size="4" fill="gray" stroke="none">MW: 75</text>
    </svg>`
  },
  {
    id: 'biochem-alanine',
    name: 'Alanine (Ala)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['alanine', 'Ala', 'A', 'nonpolar', 'aliphatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="green" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Ala</text>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">R = CH3</text>
      <text x="16" y="14" font-size="4" fill="gray" stroke="none">MW: 89</text>
    </svg>`
  },
  {
    id: 'biochem-serine',
    name: 'Serine (Ser)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['serine', 'Ser', 'S', 'polar', 'hydroxyl', 'phosphorylation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="cyan" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Ser</text>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">R = CH2OH</text>
      <circle cx="48" cy="32" r="4" fill="yellow"/>
      <text x="46" y="34" font-size="4" fill="currentColor" stroke="none">P</text>
    </svg>`
  },
  {
    id: 'biochem-cysteine',
    name: 'Cysteine (Cys)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['cysteine', 'Cys', 'C', 'thiol', 'disulfide', 'redox'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="yellow" opacity="0.3"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Cys</text>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">R = CH2SH</text>
      <circle cx="48" cy="32" r="4" fill="yellow"/>
      <text x="46" y="34" font-size="4" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'biochem-methionine',
    name: 'Methionine (Met)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['methionine', 'Met', 'M', 'start codon', 'sulfur', 'essential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="orange" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Met</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Start codon AUG</text>
      <text x="16" y="14" font-size="4" fill="green" stroke="none">Essential</text>
    </svg>`
  },
  {
    id: 'biochem-lysine',
    name: 'Lysine (Lys)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['lysine', 'Lys', 'K', 'basic', 'charged', 'essential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="blue" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Lys</text>
      <text x="48" y="28" font-size="6" fill="blue" stroke="none">+</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">pKa = 10.5</text>
    </svg>`
  },
  {
    id: 'biochem-glutamate',
    name: 'Glutamate (Glu)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['glutamate', 'Glu', 'E', 'acidic', 'charged', 'neurotransmitter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="red" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Glu</text>
      <text x="48" y="28" font-size="6" fill="red" stroke="none">-</text>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">pKa = 4.1</text>
    </svg>`
  },
  {
    id: 'biochem-tryptophan',
    name: 'Tryptophan (Trp)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['tryptophan', 'Trp', 'W', 'aromatic', 'indole', 'essential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="purple" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Trp</text>
      <polygon points="48,24 56,32 52,42 44,42 40,32" fill="purple" opacity="0.3"/>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">280nm absorb</text>
    </svg>`
  },
  {
    id: 'biochem-histidine',
    name: 'Histidine (His)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['histidine', 'His', 'H', 'imidazole', 'catalytic', 'buffer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="cyan" opacity="0.2"/>
      <text x="24" y="36" font-size="10" fill="currentColor" stroke="none">His</text>
      <polygon points="48,28 54,32 52,40 44,40 42,32" fill="cyan" opacity="0.4"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">pKa = 6.0</text>
    </svg>`
  },
  {
    id: 'biochem-proline',
    name: 'Proline (Pro)',
    domain: 'chemistry',
    category: 'amino-acids',
    tags: ['proline', 'Pro', 'P', 'cyclic', 'helix breaker', 'collagen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="orange" opacity="0.2"/>
      <text x="22" y="36" font-size="10" fill="currentColor" stroke="none">Pro</text>
      <path d="M48 28 C52 24, 56 28, 56 32 C56 36, 52 40, 48 36" fill="none" stroke="orange" stroke-width="2"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Ring structure</text>
    </svg>`
  },

  // ===========================================================================
  // ENZYME CLASSES
  // ===========================================================================
  {
    id: 'biochem-oxidoreductase',
    name: 'Oxidoreductase (EC 1)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['oxidoreductase', 'EC 1', 'redox', 'electron transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="blue" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 1</text>
      <path d="M8 24 L16 32" stroke="green" stroke-width="2"/>
      <path d="M48 32 L56 40" stroke="red" stroke-width="2"/>
      <text x="4" y="22" font-size="4" fill="green" stroke="none">Red</text>
      <text x="48" y="48" font-size="4" fill="red" stroke="none">Ox</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Oxidoreductase</text>
    </svg>`
  },
  {
    id: 'biochem-transferase',
    name: 'Transferase (EC 2)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['transferase', 'EC 2', 'group transfer', 'kinase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="green" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 2</text>
      <circle cx="12" cy="32" r="4" fill="purple"/>
      <circle cx="52" cy="32" r="4" fill="none" stroke-dasharray="2 2"/>
      <path d="M16 32 L24 32" stroke="purple"/>
      <path d="M40 32 L48 32" stroke="purple" stroke-dasharray="2 2"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Transferase</text>
    </svg>`
  },
  {
    id: 'biochem-hydrolase',
    name: 'Hydrolase (EC 3)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['hydrolase', 'EC 3', 'hydrolysis', 'protease'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="red" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 3</text>
      <path d="M8 28 L18 28 L18 36 L8 36" fill="orange" opacity="0.4"/>
      <path d="M46 28 L56 28" stroke="orange" stroke-width="2"/>
      <path d="M46 36 L56 36" stroke="orange" stroke-width="2"/>
      <circle cx="32" cy="48" r="4" fill="cyan"/>
      <text x="28" y="50" font-size="3" fill="currentColor" stroke="none">H2O</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Hydrolase</text>
    </svg>`
  },
  {
    id: 'biochem-lyase',
    name: 'Lyase (EC 4)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['lyase', 'EC 4', 'elimination', 'addition', 'decarboxylase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="orange" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 4</text>
      <path d="M8 32 L18 32" stroke="blue" stroke-width="2"/>
      <path d="M46 28 L56 24" stroke="blue" stroke-width="2"/>
      <path d="M46 36 L56 40" stroke="blue" stroke-width="2"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Lyase</text>
    </svg>`
  },
  {
    id: 'biochem-isomerase',
    name: 'Isomerase (EC 5)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['isomerase', 'EC 5', 'isomerization', 'racemase', 'mutase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="purple" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 5</text>
      <rect x="8" y="24" width="12" height="16" fill="cyan" opacity="0.3"/>
      <rect x="44" y="24" width="12" height="16" fill="cyan" opacity="0.3"/>
      <path d="M20 32 L24 28 L28 32 L24 36 Z" fill="none"/>
      <path d="M36 32 L40 28 L44 32 L40 36 Z" fill="none"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Isomerase</text>
    </svg>`
  },
  {
    id: 'biochem-ligase',
    name: 'Ligase (EC 6)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['ligase', 'EC 6', 'bond formation', 'synthetase', 'ATP-dependent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="cyan" opacity="0.2"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">EC 6</text>
      <rect x="6" y="28" width="10" height="8" fill="blue" opacity="0.4"/>
      <rect x="48" y="28" width="10" height="8" fill="green" opacity="0.4"/>
      <path d="M16 32 L24 32" stroke="red"/>
      <path d="M40 32 L48 32" stroke="red"/>
      <circle cx="32" cy="48" r="4" fill="yellow"/>
      <text x="28" y="50" font-size="3" fill="currentColor" stroke="none">ATP</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Ligase</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PATHWAY ICONS
  // ===========================================================================
  {
    id: 'biochem-pyruvate-dehydrogenase',
    name: 'Pyruvate Dehydrogenase Complex',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['PDH', 'pyruvate dehydrogenase', 'acetyl-CoA', 'bridge reaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="8" fill="red" opacity="0.3"/>
      <text x="8" y="19" font-size="4" fill="currentColor" stroke="none">Pyr</text>
      <path d="M24 16 L32 16"/>
      <ellipse cx="40" cy="24" rx="16" ry="12" fill="purple" opacity="0.2"/>
      <text x="32" y="28" font-size="4" fill="currentColor" stroke="none">PDH</text>
      <path d="M40 36 L40 44"/>
      <circle cx="40" cy="52" r="8" fill="blue" opacity="0.3"/>
      <text x="30" y="55" font-size="4" fill="currentColor" stroke="none">Ac-CoA</text>
      <text x="48" y="18" font-size="3" fill="currentColor" stroke="none">NAD+</text>
      <text x="48" y="24" font-size="3" fill="currentColor" stroke="none">CoA</text>
    </svg>`
  },
  {
    id: 'biochem-atp-synthase',
    name: 'ATP Synthase',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['ATP synthase', 'F0F1', 'oxidative phosphorylation', 'proton gradient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="4" fill="gray" opacity="0.3"/>
      <ellipse cx="32" cy="12" rx="12" ry="8" fill="blue" opacity="0.2"/>
      <text x="26" y="15" font-size="4" fill="currentColor" stroke="none">F1</text>
      <rect x="28" y="24" width="8" height="12" fill="green" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="10" ry="6" fill="orange" opacity="0.2"/>
      <text x="26" y="47" font-size="4" fill="currentColor" stroke="none">F0</text>
      <path d="M18 8 L22 12" stroke="red" marker-end="url(#arrow)"/>
      <path d="M42 12 L46 8" stroke="red"/>
      <text x="8" y="6" font-size="3" fill="red" stroke="none">H+</text>
      <circle cx="52" cy="12" r="4" fill="yellow"/>
      <text x="48" y="14" font-size="3" fill="currentColor" stroke="none">ATP</text>
    </svg>`
  },
  {
    id: 'biochem-cytochrome-c',
    name: 'Cytochrome c',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['cytochrome c', 'electron carrier', 'ETC', 'apoptosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="red" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="red"/>
      <text x="28" y="35" font-size="4" fill="white" stroke="none">Fe</text>
      <text x="20" y="14" font-size="5" fill="currentColor" stroke="none">Cyt c</text>
      <path d="M8 32 L16 32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M48 32 L56 32" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">e-</text>
      <text x="52" y="28" font-size="3" fill="currentColor" stroke="none">e-</text>
    </svg>`
  },
  {
    id: 'biochem-hexokinase',
    name: 'Hexokinase',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['hexokinase', 'glycolysis', 'glucose phosphorylation', 'regulatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="green" opacity="0.2"/>
      <text x="24" y="28" font-size="4" fill="currentColor" stroke="none">Hexo-</text>
      <text x="24" y="36" font-size="4" fill="currentColor" stroke="none">kinase</text>
      <circle cx="8" cy="24" r="6" fill="blue" opacity="0.3"/>
      <text x="4" y="27" font-size="4" fill="currentColor" stroke="none">Glc</text>
      <circle cx="56" cy="24" r="6" fill="cyan" opacity="0.3"/>
      <text x="50" y="27" font-size="4" fill="currentColor" stroke="none">G6P</text>
      <path d="M14 24 L14 24"/>
      <circle cx="32" cy="52" r="4" fill="yellow"/>
      <text x="28" y="54" font-size="3" fill="currentColor" stroke="none">ATP</text>
      <path d="M32 46 L32 40" stroke="yellow"/>
    </svg>`
  },
  {
    id: 'biochem-pfk1',
    name: 'Phosphofructokinase-1 (PFK-1)',
    domain: 'chemistry',
    category: 'enzymes',
    tags: ['PFK-1', 'glycolysis', 'rate-limiting', 'regulatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="red" opacity="0.2"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">PFK-1</text>
      <text x="8" y="14" font-size="4" fill="green" stroke="none">⊕ AMP</text>
      <text x="8" y="20" font-size="4" fill="green" stroke="none">⊕ F2,6BP</text>
      <text x="40" y="14" font-size="4" fill="red" stroke="none">⊖ ATP</text>
      <text x="40" y="20" font-size="4" fill="red" stroke="none">⊖ Citrate</text>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Rate-limiting step</text>
    </svg>`
  },

  // ===========================================================================
  // DNA/RNA MACHINERY
  // ===========================================================================
  {
    id: 'biochem-dna-polymerase',
    name: 'DNA Polymerase',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['DNA polymerase', 'replication', 'proofreading', 'synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="blue" opacity="0.2"/>
      <text x="18" y="36" font-size="5" fill="currentColor" stroke="none">DNA Pol</text>
      <path d="M8 24 L20 24" stroke="blue" stroke-width="2"/>
      <path d="M8 40 L20 40" stroke="red" stroke-width="2"/>
      <path d="M44 24 L56 24" stroke="blue" stroke-width="2"/>
      <path d="M44 40 L56 40" stroke="red" stroke-width="2"/>
      <text x="4" y="22" font-size="3" fill="currentColor" stroke="none">5'</text>
      <text x="56" y="22" font-size="3" fill="currentColor" stroke="none">3'</text>
      <text x="20" y="52" font-size="4" fill="currentColor" stroke="none">5' → 3' synthesis</text>
    </svg>`
  },
  {
    id: 'biochem-rna-polymerase',
    name: 'RNA Polymerase',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['RNA polymerase', 'transcription', 'RNAP', 'synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="12" fill="green" opacity="0.2"/>
      <text x="18" y="32" font-size="4" fill="currentColor" stroke="none">RNA Pol</text>
      <path d="M8 20 L52 20" stroke="blue" stroke-width="2"/>
      <path d="M8 24 L52 24" stroke="blue" stroke-width="2"/>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">DNA</text>
      <path d="M32 40 L32 48 C28 52, 20 52, 16 48" stroke="orange" stroke-width="2"/>
      <text x="4" y="52" font-size="4" fill="orange" stroke="none">mRNA</text>
    </svg>`
  },
  {
    id: 'biochem-ribosome',
    name: 'Ribosome Structure',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['ribosome', 'translation', '40S', '60S', 'protein synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="10" fill="purple" opacity="0.3"/>
      <text x="24" y="23" font-size="5" fill="currentColor" stroke="none">60S</text>
      <ellipse cx="32" cy="38" rx="12" ry="8" fill="blue" opacity="0.3"/>
      <text x="24" y="41" font-size="5" fill="currentColor" stroke="none">40S</text>
      <path d="M8 32 L56 32" stroke="orange" stroke-width="2"/>
      <text x="4" y="30" font-size="3" fill="orange" stroke="none">mRNA</text>
      <rect x="28" y="16" width="4" height="4" fill="green"/>
      <rect x="34" y="16" width="4" height="4" fill="red"/>
      <text x="26" y="14" font-size="3" fill="currentColor" stroke="none">A P E</text>
    </svg>`
  },
  {
    id: 'biochem-trna-structure',
    name: 'tRNA Structure',
    domain: 'chemistry',
    category: 'nucleic-acids',
    tags: ['tRNA', 'cloverleaf', 'anticodon', 'amino acid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8 L32 16" stroke="orange" stroke-width="2"/>
      <text x="36" y="12" font-size="3" fill="currentColor" stroke="none">AA</text>
      <ellipse cx="32" cy="24" rx="8" ry="6" fill="orange" opacity="0.3"/>
      <ellipse cx="18" cy="32" rx="6" ry="8" fill="green" opacity="0.3"/>
      <ellipse cx="46" cy="32" rx="6" ry="8" fill="green" opacity="0.3"/>
      <path d="M32 30 L32 44" stroke="orange" stroke-width="2"/>
      <ellipse cx="32" cy="52" rx="8" ry="6" fill="blue" opacity="0.3"/>
      <text x="24" y="55" font-size="4" fill="currentColor" stroke="none">Anti</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Cloverleaf</text>
    </svg>`
  },

  // ===========================================================================
  // REGULATORY MOLECULES
  // ===========================================================================
  {
    id: 'biochem-camp',
    name: 'Cyclic AMP (cAMP)',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['cAMP', 'cyclic AMP', 'second messenger', 'PKA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="yellow" opacity="0.3"/>
      <circle cx="32" cy="32" r="16" fill="none"/>
      <circle cx="32" cy="24" r="4" fill="red"/>
      <text x="30" y="26" font-size="4" fill="white" stroke="none">P</text>
      <path d="M28 28 L24 36 L40 36 L36 28" fill="none"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">cAMP</text>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">ATP → cAMP</text>
    </svg>`
  },
  {
    id: 'biochem-ip3',
    name: 'IP3 (Inositol Triphosphate)',
    domain: 'chemistry',
    category: 'signaling',
    tags: ['IP3', 'inositol triphosphate', 'calcium release', 'PLC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="20,20 44,20 52,32 44,44 20,44 12,32" fill="pink" opacity="0.3"/>
      <circle cx="20" cy="20" r="3" fill="red"/>
      <circle cx="44" cy="20" r="3" fill="red"/>
      <circle cx="32" cy="44" r="3" fill="red"/>
      <text x="18" y="22" font-size="3" fill="white" stroke="none">P</text>
      <text x="42" y="22" font-size="3" fill="white" stroke="none">P</text>
      <text x="30" y="46" font-size="3" fill="white" stroke="none">P</text>
      <text x="24" y="35" font-size="5" fill="currentColor" stroke="none">IP3</text>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Ca2+ release</text>
    </svg>`
  },
];

export default biochemistryIcons;
