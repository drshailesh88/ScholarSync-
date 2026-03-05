/**
 * Inorganic Chemistry Icon Library
 * Comprehensive SVG icons for inorganic chemistry
 *
 * Categories:
 * - Coordination Compounds (complexes, ligands, geometries)
 * - Crystal Field Theory (splitting, diagrams, colors)
 * - Metals and Alloys (transition metals, metalloids)
 * - Inorganic Structures (crystals, cages, clusters)
 */

import type { IconDefinition } from './index';

export const inorganicIcons: IconDefinition[] = [
  // ===========================================================================
  // COORDINATION COMPOUNDS
  // ===========================================================================
  {
    id: 'inorganic-octahedral',
    name: 'Octahedral Complex',
    domain: 'chemistry',
    category: 'coordination',
    tags: ['octahedral', 'coordination', 'ML6', 'geometry', 'd2sp3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <text x="28" y="36" font-size="8" fill="white" stroke="none">M</text>
      <line x1="32" y1="24" x2="32" y2="4"/>
      <line x1="32" y1="40" x2="32" y2="60"/>
      <line x1="24" y1="32" x2="4" y2="32"/>
      <line x1="40" y1="32" x2="60" y2="32"/>
      <line x1="26" y1="26" x2="12" y2="12"/>
      <line x1="38" y1="38" x2="52" y2="52"/>
      <circle cx="32" cy="4" r="3" fill="#0066cc"/>
      <circle cx="32" cy="60" r="3" fill="#0066cc"/>
      <circle cx="4" cy="32" r="3" fill="#0066cc"/>
      <circle cx="60" cy="32" r="3" fill="#0066cc"/>
      <circle cx="12" cy="12" r="3" fill="#0066cc"/>
      <circle cx="52" cy="52" r="3" fill="#0066cc"/>
    </svg>`
  },
  {
    id: 'inorganic-tetrahedral',
    name: 'Tetrahedral Complex',
    domain: 'chemistry',
    category: 'coordination',
    tags: ['tetrahedral', 'coordination', 'ML4', 'geometry', 'sp3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <text x="28" y="36" font-size="8" fill="white" stroke="none">M</text>
      <line x1="32" y1="24" x2="32" y2="6"/>
      <line x1="26" y1="38" x2="10" y2="54"/>
      <line x1="38" y1="38" x2="54" y2="54"/>
      <line x1="32" y1="36" x2="32" y2="50" stroke-dasharray="2 2"/>
      <circle cx="32" cy="6" r="3" fill="#0066cc"/>
      <circle cx="10" cy="54" r="3" fill="#0066cc"/>
      <circle cx="54" cy="54" r="3" fill="#0066cc"/>
      <circle cx="32" cy="54" r="3" fill="#0066cc" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'inorganic-square-planar',
    name: 'Square Planar Complex',
    domain: 'chemistry',
    category: 'coordination',
    tags: ['square planar', 'coordination', 'ML4', 'dsp2', 'd8'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <text x="28" y="36" font-size="8" fill="white" stroke="none">M</text>
      <line x1="24" y1="24" x2="8" y2="8"/>
      <line x1="40" y1="24" x2="56" y2="8"/>
      <line x1="24" y1="40" x2="8" y2="56"/>
      <line x1="40" y1="40" x2="56" y2="56"/>
      <circle cx="8" cy="8" r="3" fill="#0066cc"/>
      <circle cx="56" cy="8" r="3" fill="#0066cc"/>
      <circle cx="8" cy="56" r="3" fill="#0066cc"/>
      <circle cx="56" cy="56" r="3" fill="#0066cc"/>
      <rect x="8" y="8" width="48" height="48" fill="none" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'inorganic-trigonal-bipyramidal',
    name: 'Trigonal Bipyramidal',
    domain: 'chemistry',
    category: 'coordination',
    tags: ['trigonal bipyramidal', 'ML5', 'coordination', 'dsp3', 'axial equatorial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <text x="28" y="35" font-size="6" fill="white" stroke="none">M</text>
      <line x1="32" y1="26" x2="32" y2="4"/>
      <line x1="32" y1="38" x2="32" y2="60"/>
      <line x1="26" y1="32" x2="6" y2="32"/>
      <line x1="36" y1="28" x2="54" y2="16"/>
      <line x1="36" y1="36" x2="54" y2="48"/>
      <circle cx="32" cy="4" r="3" fill="red"/>
      <circle cx="32" cy="60" r="3" fill="red"/>
      <circle cx="6" cy="32" r="3" fill="#0066cc"/>
      <circle cx="54" cy="16" r="3" fill="#0066cc"/>
      <circle cx="54" cy="48" r="3" fill="#0066cc"/>
      <text x="4" y="12" font-size="5" fill="red" stroke="none">ax</text>
      <text x="56" y="32" font-size="5" fill="#0066cc" stroke="none">eq</text>
    </svg>`
  },
  {
    id: 'inorganic-chelate',
    name: 'Chelate Complex',
    domain: 'chemistry',
    category: 'coordination',
    tags: ['chelate', 'bidentate', 'EDTA', 'polydentate', 'ring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <text x="28" y="36" font-size="7" fill="white" stroke="none">M</text>
      <path d="M24 32 C16 20, 32 8, 40 32" stroke="#0066cc" stroke-width="2"/>
      <path d="M24 32 C16 44, 32 56, 40 32" stroke="#0066cc" stroke-width="2"/>
      <circle cx="24" cy="32" r="3" fill="#0066cc"/>
      <circle cx="40" cy="32" r="3" fill="#0066cc"/>
      <text x="28" y="16" font-size="5" fill="#0066cc" stroke="none">N</text>
      <text x="28" y="52" font-size="5" fill="#0066cc" stroke="none">N</text>
    </svg>`
  },

  // ===========================================================================
  // CRYSTAL FIELD THEORY
  // ===========================================================================
  {
    id: 'inorganic-cft-octahedral',
    name: 'CFT Octahedral Splitting',
    domain: 'chemistry',
    category: 'crystal-field',
    tags: ['crystal field', 'octahedral', 't2g', 'eg', 'splitting', 'delta o'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="28" y2="40"/>
      <line x1="36" y1="40" x2="56" y2="40"/>
      <line x1="32" y1="44" x2="32" y2="36" stroke-dasharray="2 2"/>
      <line x1="12" y1="16" x2="24" y2="16"/>
      <line x1="40" y1="16" x2="52" y2="16"/>
      <text x="28" y="12" font-size="6" fill="currentColor" stroke="none">eg</text>
      <text x="24" y="52" font-size="6" fill="currentColor" stroke="none">t2g</text>
      <path d="M4 28 L4 48" stroke="blue"/>
      <path d="M4 28 L8 32"/>
      <path d="M4 48 L8 44"/>
      <text x="6" y="40" font-size="5" fill="blue" stroke="none">Δo</text>
      <circle cx="14" cy="40" r="2" fill="blue"/>
      <circle cx="20" cy="40" r="2" fill="blue"/>
      <circle cx="44" cy="40" r="2" fill="blue"/>
    </svg>`
  },
  {
    id: 'inorganic-cft-tetrahedral',
    name: 'CFT Tetrahedral Splitting',
    domain: 'chemistry',
    category: 'crystal-field',
    tags: ['crystal field', 'tetrahedral', 't2', 'e', 'splitting', 'delta t'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="20" x2="28" y2="20"/>
      <line x1="36" y1="20" x2="56" y2="20"/>
      <line x1="32" y1="24" x2="32" y2="16" stroke-dasharray="2 2"/>
      <line x1="16" y1="44" x2="28" y2="44"/>
      <line x1="36" y1="44" x2="48" y2="44"/>
      <text x="28" y="16" font-size="6" fill="currentColor" stroke="none">t2</text>
      <text x="28" y="56" font-size="6" fill="currentColor" stroke="none">e</text>
      <path d="M4 28 L4 40" stroke="red"/>
      <path d="M4 28 L8 32"/>
      <path d="M4 40 L8 36"/>
      <text x="6" y="36" font-size="5" fill="red" stroke="none">Δt</text>
      <circle cx="14" cy="20" r="2" fill="blue"/>
      <circle cx="20" cy="20" r="2" fill="blue"/>
      <circle cx="44" cy="20" r="2" fill="blue"/>
    </svg>`
  },
  {
    id: 'inorganic-high-spin',
    name: 'High Spin Configuration',
    domain: 'chemistry',
    category: 'crystal-field',
    tags: ['high spin', 'paramagnetic', 'weak field', 'unpaired electrons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="16" x2="56" y2="16"/>
      <text x="4" y="14" font-size="5" fill="currentColor" stroke="none">eg</text>
      <text x="4" y="52" font-size="5" fill="currentColor" stroke="none">t2g</text>
      <path d="M16 44 L16 52" stroke="blue" stroke-width="2"/>
      <path d="M14 46 L18 42" stroke="blue"/>
      <path d="M26 44 L26 52" stroke="blue" stroke-width="2"/>
      <path d="M24 46 L28 42" stroke="blue"/>
      <path d="M36 44 L36 52" stroke="blue" stroke-width="2"/>
      <path d="M34 46 L38 42" stroke="blue"/>
      <path d="M20 12 L20 20" stroke="blue" stroke-width="2"/>
      <path d="M18 14 L22 10" stroke="blue"/>
      <path d="M44 12 L44 20" stroke="blue" stroke-width="2"/>
      <path d="M42 14 L46 10" stroke="blue"/>
      <text x="24" y="32" font-size="6" fill="currentColor" stroke="none">High Spin</text>
    </svg>`
  },
  {
    id: 'inorganic-low-spin',
    name: 'Low Spin Configuration',
    domain: 'chemistry',
    category: 'crystal-field',
    tags: ['low spin', 'diamagnetic', 'strong field', 'paired electrons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="16" x2="56" y2="16"/>
      <text x="4" y="14" font-size="5" fill="currentColor" stroke="none">eg</text>
      <text x="4" y="52" font-size="5" fill="currentColor" stroke="none">t2g</text>
      <path d="M16 44 L16 52" stroke="blue" stroke-width="2"/>
      <path d="M14 46 L18 42" stroke="blue"/>
      <path d="M18 52 L18 44" stroke="red" stroke-width="2"/>
      <path d="M16 50 L20 54" stroke="red"/>
      <path d="M30 44 L30 52" stroke="blue" stroke-width="2"/>
      <path d="M28 46 L32 42" stroke="blue"/>
      <path d="M32 52 L32 44" stroke="red" stroke-width="2"/>
      <path d="M30 50 L34 54" stroke="red"/>
      <path d="M44 44 L44 52" stroke="blue" stroke-width="2"/>
      <path d="M42 46 L46 42" stroke="blue"/>
      <path d="M46 52 L46 44" stroke="red" stroke-width="2"/>
      <path d="M44 50 L48 54" stroke="red"/>
      <text x="24" y="32" font-size="6" fill="currentColor" stroke="none">Low Spin</text>
    </svg>`
  },
  {
    id: 'inorganic-d-orbital',
    name: 'd-Orbital Diagram',
    domain: 'chemistry',
    category: 'crystal-field',
    tags: ['d orbital', 'dxy', 'dz2', 'dx2-y2', 'dxz', 'dyz'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(45 32 32)" fill="none" stroke="blue"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(-45 32 32)" fill="none" stroke="blue"/>
      <circle cx="32" cy="32" r="4" fill="blue" opacity="0.3"/>
      <text x="4" y="12" font-size="5" fill="blue" stroke="none">+</text>
      <text x="52" y="12" font-size="5" fill="blue" stroke="none">+</text>
      <text x="4" y="58" font-size="5" fill="red" stroke="none">-</text>
      <text x="52" y="58" font-size="5" fill="red" stroke="none">-</text>
      <text x="22" y="62" font-size="5" fill="currentColor" stroke="none">dxy</text>
    </svg>`
  },

  // ===========================================================================
  // METALS AND ALLOYS
  // ===========================================================================
  {
    id: 'inorganic-transition-metal',
    name: 'Transition Metal',
    domain: 'chemistry',
    category: 'metals',
    tags: ['transition metal', 'd-block', 'variable oxidation', 'colored'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <text x="24" y="38" font-size="16" fill="currentColor" stroke="none">Fe</text>
      <text x="44" y="20" font-size="6" fill="currentColor" stroke="none">26</text>
      <circle cx="32" cy="52" r="2" fill="blue"/>
      <circle cx="26" cy="52" r="2" fill="blue"/>
      <circle cx="38" cy="52" r="2" fill="blue"/>
    </svg>`
  },
  {
    id: 'inorganic-lanthanide',
    name: 'Lanthanide Element',
    domain: 'chemistry',
    category: 'metals',
    tags: ['lanthanide', 'f-block', 'rare earth', '4f'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="#90EE90" opacity="0.3"/>
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <text x="22" y="38" font-size="14" fill="currentColor" stroke="none">Ce</text>
      <text x="44" y="20" font-size="6" fill="currentColor" stroke="none">58</text>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">4f block</text>
    </svg>`
  },
  {
    id: 'inorganic-metallic-bond',
    name: 'Metallic Bonding',
    domain: 'chemistry',
    category: 'metals',
    tags: ['metallic bond', 'electron sea', 'delocalized', 'conductivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="currentColor"/>
      <circle cx="32" cy="16" r="6" fill="currentColor"/>
      <circle cx="48" cy="16" r="6" fill="currentColor"/>
      <circle cx="24" cy="32" r="6" fill="currentColor"/>
      <circle cx="40" cy="32" r="6" fill="currentColor"/>
      <circle cx="16" cy="48" r="6" fill="currentColor"/>
      <circle cx="32" cy="48" r="6" fill="currentColor"/>
      <circle cx="48" cy="48" r="6" fill="currentColor"/>
      <circle cx="20" cy="24" r="2" fill="blue"/>
      <circle cx="36" cy="20" r="2" fill="blue"/>
      <circle cx="44" cy="40" r="2" fill="blue"/>
      <circle cx="28" cy="44" r="2" fill="blue"/>
      <circle cx="12" cy="36" r="2" fill="blue"/>
      <circle cx="52" cy="28" r="2" fill="blue"/>
      <text x="2" y="62" font-size="5" fill="blue" stroke="none">e- sea</text>
    </svg>`
  },
  {
    id: 'inorganic-alloy',
    name: 'Alloy Structure',
    domain: 'chemistry',
    category: 'metals',
    tags: ['alloy', 'substitutional', 'interstitial', 'solid solution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="6" fill="gray"/>
      <circle cx="32" cy="12" r="6" fill="gray"/>
      <circle cx="52" cy="12" r="6" fill="orange"/>
      <circle cx="12" cy="32" r="6" fill="gray"/>
      <circle cx="32" cy="32" r="6" fill="orange"/>
      <circle cx="52" cy="32" r="6" fill="gray"/>
      <circle cx="12" cy="52" r="6" fill="gray"/>
      <circle cx="32" cy="52" r="6" fill="gray"/>
      <circle cx="52" cy="52" r="6" fill="gray"/>
      <text x="4" y="62" font-size="5" fill="currentColor" stroke="none">Substitutional</text>
    </svg>`
  },

  // ===========================================================================
  // INORGANIC STRUCTURES
  // ===========================================================================
  {
    id: 'inorganic-ionic-crystal',
    name: 'Ionic Crystal Structure',
    domain: 'chemistry',
    category: 'structures',
    tags: ['ionic', 'crystal', 'NaCl', 'lattice', 'unit cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="6" fill="blue"/>
      <circle cx="32" cy="12" r="4" fill="green"/>
      <circle cx="52" cy="12" r="6" fill="blue"/>
      <circle cx="12" cy="32" r="4" fill="green"/>
      <circle cx="32" cy="32" r="6" fill="blue"/>
      <circle cx="52" cy="32" r="4" fill="green"/>
      <circle cx="12" cy="52" r="6" fill="blue"/>
      <circle cx="32" cy="52" r="4" fill="green"/>
      <circle cx="52" cy="52" r="6" fill="blue"/>
      <line x1="12" y1="12" x2="52" y2="12" stroke-dasharray="2 2"/>
      <line x1="12" y1="32" x2="52" y2="32" stroke-dasharray="2 2"/>
      <line x1="12" y1="12" x2="12" y2="52" stroke-dasharray="2 2"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'inorganic-bcc',
    name: 'Body-Centered Cubic',
    domain: 'chemistry',
    category: 'structures',
    tags: ['BCC', 'body centered', 'cubic', 'crystal structure', 'iron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20 L48 20 L56 36 L24 36 Z"/>
      <path d="M16 20 L16 44 L24 60 L24 36"/>
      <path d="M48 20 L56 36 L56 60 L48 44 L48 20"/>
      <path d="M16 44 L48 44"/>
      <path d="M24 60 L56 60"/>
      <circle cx="16" cy="20" r="4" fill="currentColor"/>
      <circle cx="48" cy="20" r="4" fill="currentColor"/>
      <circle cx="24" cy="36" r="4" fill="currentColor"/>
      <circle cx="56" cy="36" r="4" fill="currentColor"/>
      <circle cx="16" cy="44" r="4" fill="currentColor"/>
      <circle cx="48" cy="44" r="4" fill="currentColor"/>
      <circle cx="24" cy="60" r="4" fill="currentColor"/>
      <circle cx="56" cy="60" r="4" fill="currentColor"/>
      <circle cx="36" cy="40" r="5" fill="red"/>
    </svg>`
  },
  {
    id: 'inorganic-fcc',
    name: 'Face-Centered Cubic',
    domain: 'chemistry',
    category: 'structures',
    tags: ['FCC', 'face centered', 'cubic', 'crystal structure', 'copper'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16 L48 16 L56 32 L24 32 Z"/>
      <path d="M16 16 L16 48 L24 64 L24 32"/>
      <path d="M48 16 L56 32 L56 64 L48 48 L48 16"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
      <circle cx="48" cy="16" r="3" fill="currentColor"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <circle cx="56" cy="32" r="3" fill="currentColor"/>
      <circle cx="32" cy="16" r="3" fill="blue"/>
      <circle cx="20" cy="24" r="3" fill="blue"/>
      <circle cx="52" cy="24" r="3" fill="blue"/>
      <circle cx="40" cy="32" r="3" fill="blue"/>
    </svg>`
  },
  {
    id: 'inorganic-wurtzite',
    name: 'Wurtzite Structure',
    domain: 'chemistry',
    category: 'structures',
    tags: ['wurtzite', 'ZnS', 'hexagonal', 'crystal', 'semiconductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 48,18 48,42 32,52 16,42 16,18" fill="none"/>
      <circle cx="32" cy="8" r="4" fill="blue"/>
      <circle cx="48" cy="18" r="4" fill="blue"/>
      <circle cx="48" cy="42" r="4" fill="blue"/>
      <circle cx="32" cy="52" r="4" fill="blue"/>
      <circle cx="16" cy="42" r="4" fill="blue"/>
      <circle cx="16" cy="18" r="4" fill="blue"/>
      <circle cx="32" cy="24" r="3" fill="yellow"/>
      <circle cx="40" cy="34" r="3" fill="yellow"/>
      <circle cx="24" cy="34" r="3" fill="yellow"/>
    </svg>`
  },
  {
    id: 'inorganic-coordination-number',
    name: 'Coordination Number',
    domain: 'chemistry',
    category: 'structures',
    tags: ['coordination number', 'CN', 'nearest neighbors', 'geometry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="currentColor"/>
      <text x="26" y="36" font-size="10" fill="white" stroke="none">M</text>
      <circle cx="32" cy="8" r="4" fill="blue"/>
      <circle cx="56" cy="20" r="4" fill="blue"/>
      <circle cx="56" cy="44" r="4" fill="blue"/>
      <circle cx="32" cy="56" r="4" fill="blue"/>
      <circle cx="8" cy="44" r="4" fill="blue"/>
      <circle cx="8" cy="20" r="4" fill="blue"/>
      <line x1="32" y1="22" x2="32" y2="12"/>
      <line x1="40" y1="26" x2="52" y2="20"/>
      <line x1="40" y1="38" x2="52" y2="44"/>
      <line x1="32" y1="42" x2="32" y2="52"/>
      <line x1="24" y1="38" x2="12" y2="44"/>
      <line x1="24" y1="26" x2="12" y2="20"/>
      <text x="24" y="62" font-size="5" fill="currentColor" stroke="none">CN = 6</text>
    </svg>`
  },

  // ===========================================================================
  // LIGANDS
  // ===========================================================================
  {
    id: 'inorganic-monodentate',
    name: 'Monodentate Ligand',
    domain: 'chemistry',
    category: 'ligands',
    tags: ['monodentate', 'ligand', 'single donor', 'ammonia', 'chloride'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="44" cy="32" r="12" fill="currentColor"/>
      <text x="38" y="36" font-size="10" fill="white" stroke="none">M</text>
      <line x1="32" y1="32" x2="16" y2="32" stroke="blue" stroke-width="2"/>
      <circle cx="12" cy="32" r="6" fill="blue"/>
      <text x="8" y="35" font-size="7" fill="white" stroke="none">L</text>
      <path d="M16 32 L20 28 M16 32 L20 36" stroke="blue"/>
    </svg>`
  },
  {
    id: 'inorganic-bidentate',
    name: 'Bidentate Ligand',
    domain: 'chemistry',
    category: 'ligands',
    tags: ['bidentate', 'chelate', 'ethylenediamine', 'oxalate', 'two donors'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="40" cy="32" r="10" fill="currentColor"/>
      <text x="34" y="36" font-size="9" fill="white" stroke="none">M</text>
      <path d="M30 26 C16 20, 10 32, 16 38 C10 44, 16 56, 30 38" stroke="blue" stroke-width="2" fill="none"/>
      <circle cx="30" cy="26" r="4" fill="#0066cc"/>
      <circle cx="30" cy="38" r="4" fill="#0066cc"/>
      <text x="24" y="28" font-size="5" fill="white" stroke="none">N</text>
      <text x="24" y="40" font-size="5" fill="white" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'inorganic-polydentate',
    name: 'Polydentate Ligand (EDTA)',
    domain: 'chemistry',
    category: 'ligands',
    tags: ['polydentate', 'EDTA', 'hexadentate', 'chelate', 'sequestering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <text x="27" y="35" font-size="7" fill="white" stroke="none">M</text>
      <circle cx="32" cy="12" r="3" fill="#0066cc"/>
      <circle cx="52" cy="22" r="3" fill="red"/>
      <circle cx="52" cy="42" r="3" fill="red"/>
      <circle cx="32" cy="52" r="3" fill="#0066cc"/>
      <circle cx="12" cy="42" r="3" fill="red"/>
      <circle cx="12" cy="22" r="3" fill="red"/>
      <path d="M32 24 L32 15" stroke="blue"/>
      <path d="M39 27 L49 22" stroke="blue"/>
      <path d="M39 37 L49 42" stroke="blue"/>
      <path d="M32 40 L32 49" stroke="blue"/>
      <path d="M25 37 L15 42" stroke="blue"/>
      <path d="M25 27 L15 22" stroke="blue"/>
      <text x="24" y="62" font-size="5" fill="currentColor" stroke="none">EDTA</text>
    </svg>`
  },
  {
    id: 'inorganic-pi-donor',
    name: 'Pi-Donor Ligand',
    domain: 'chemistry',
    category: 'ligands',
    tags: ['pi donor', 'CO', 'carbonyl', 'backbonding', 'synergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="48" cy="32" r="10" fill="currentColor"/>
      <text x="42" y="36" font-size="9" fill="white" stroke="none">M</text>
      <line x1="38" y1="32" x2="24" y2="32" stroke="blue" stroke-width="2"/>
      <text x="14" y="36" font-size="8" fill="currentColor" stroke="none">C</text>
      <line x1="12" y1="28" x2="12" y2="20" stroke="red"/>
      <line x1="16" y1="28" x2="16" y2="20" stroke="red"/>
      <line x1="8" y1="28" x2="8" y2="20" stroke="red"/>
      <text x="8" y="18" font-size="7" fill="red" stroke="none">O</text>
      <path d="M34 28 C28 24, 28 40, 34 36" stroke="green" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-size="5" fill="green" stroke="none">backbond</text>
    </svg>`
  },
  {
    id: 'inorganic-ambidentate',
    name: 'Ambidentate Ligand',
    domain: 'chemistry',
    category: 'ligands',
    tags: ['ambidentate', 'thiocyanate', 'nitrite', 'linkage isomer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2" fill="none" stroke="currentColor"/>
      <text x="24" y="36" font-size="8" fill="currentColor" stroke="none">SCN</text>
      <circle cx="8" cy="32" r="6" fill="currentColor"/>
      <text x="4" y="35" font-size="7" fill="white" stroke="none">M</text>
      <line x1="14" y1="32" x2="20" y2="32" stroke="blue" stroke-width="2"/>
      <circle cx="56" cy="32" r="6" fill="currentColor"/>
      <text x="52" y="35" font-size="7" fill="white" stroke="none">M</text>
      <line x1="44" y1="32" x2="50" y2="32" stroke="red" stroke-width="2"/>
      <text x="6" y="48" font-size="5" fill="blue" stroke="none">S-bound</text>
      <text x="44" y="48" font-size="5" fill="red" stroke="none">N-bound</text>
    </svg>`
  },
];

export default inorganicIcons;
