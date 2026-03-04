/**
 * Analytical Chemistry Icon Library
 * Comprehensive SVG icons for analytical chemistry
 *
 * Categories:
 * - Spectroscopy (UV-Vis, IR, NMR, Mass Spec)
 * - Chromatography (HPLC, GC, TLC, electrophoresis)
 * - Titration (acid-base, redox, complexometric)
 * - Electrochemistry (voltammetry, potentiometry)
 */

import type { IconDefinition } from './index';

export const analyticalIcons: IconDefinition[] = [
  // ===========================================================================
  // SPECTROSCOPY
  // ===========================================================================
  {
    id: 'analytical-uv-vis',
    name: 'UV-Vis Spectrophotometer',
    domain: 'chemistry',
    category: 'spectroscopy',
    tags: ['UV-Vis', 'spectrophotometer', 'absorption', 'Beer-Lambert', 'cuvette'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="28" rx="2"/>
      <rect x="26" y="24" width="12" height="20" fill="blue" opacity="0.3"/>
      <line x1="8" y1="34" x2="26" y2="34" stroke="purple" stroke-width="2"/>
      <line x1="38" y1="34" x2="56" y2="34" stroke="purple" stroke-width="2" stroke-dasharray="4 2"/>
      <circle cx="12" cy="34" r="4"/>
      <text x="10" y="37" font-size="5" fill="currentColor" stroke="none">S</text>
      <circle cx="52" cy="34" r="4"/>
      <text x="50" y="37" font-size="5" fill="currentColor" stroke="none">D</text>
      <text x="28" y="56" font-size="6" fill="currentColor" stroke="none">UV-Vis</text>
    </svg>`
  },
  {
    id: 'analytical-ir-spectrum',
    name: 'IR Spectrum',
    domain: 'chemistry',
    category: 'spectroscopy',
    tags: ['IR', 'infrared', 'FTIR', 'vibrational', 'functional groups'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <line x1="12" y1="48" x2="56" y2="48"/>
      <line x1="12" y1="48" x2="12" y2="16"/>
      <path d="M16 20 L20 20 L22 40 L24 20 L28 20 L30 35 L32 28 L36 20 L40 20 L44 30 L48 20 L52 20" fill="none" stroke="red"/>
      <text x="28" y="58" font-size="5" fill="currentColor" stroke="none">cm-1</text>
      <text x="4" y="36" font-size="5" fill="currentColor" stroke="none">%T</text>
    </svg>`
  },
  {
    id: 'analytical-nmr',
    name: 'NMR Spectrometer',
    domain: 'chemistry',
    category: 'spectroscopy',
    tags: ['NMR', 'nuclear magnetic resonance', 'proton', 'carbon-13', 'chemical shift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="none"/>
      <ellipse cx="32" cy="32" rx="8" ry="24" fill="none"/>
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <text x="28" y="35" font-size="6" fill="white" stroke="none">H</text>
      <path d="M8 32 C8 24, 16 20, 32 20" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M56 32 C56 40, 48 44, 32 44" stroke="blue" stroke-dasharray="2 2"/>
      <text x="4" y="28" font-size="5" fill="blue" stroke="none">B0</text>
      <text x="22" y="58" font-size="6" fill="currentColor" stroke="none">NMR</text>
    </svg>`
  },
  {
    id: 'analytical-mass-spec',
    name: 'Mass Spectrometer',
    domain: 'chemistry',
    category: 'spectroscopy',
    tags: ['mass spec', 'MS', 'm/z', 'ionization', 'fragmentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="16" width="16" height="32" rx="2"/>
      <text x="8" y="36" font-size="6" fill="currentColor" stroke="none">Ion</text>
      <path d="M20 32 L32 32 C40 32, 44 20, 52 20" stroke="blue"/>
      <path d="M20 32 L32 32 C40 32, 44 44, 52 44" stroke="red"/>
      <rect x="52" y="16" width="8" height="32" rx="1"/>
      <line x1="56" y1="20" x2="56" y2="26"/>
      <line x1="56" y1="30" x2="56" y2="34"/>
      <line x1="56" y1="38" x2="56" y2="44"/>
      <text x="24" y="56" font-size="6" fill="currentColor" stroke="none">MS</text>
    </svg>`
  },
  {
    id: 'analytical-aas',
    name: 'Atomic Absorption',
    domain: 'chemistry',
    category: 'spectroscopy',
    tags: ['AAS', 'atomic absorption', 'flame', 'hollow cathode', 'metals'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="12" height="16" rx="1"/>
      <text x="6" y="35" font-size="5" fill="currentColor" stroke="none">HC</text>
      <path d="M24 28 L24 44 L40 44 L40 28 Z" fill="orange" opacity="0.3"/>
      <path d="M28 44 C30 36, 34 36, 36 44" stroke="red" stroke-width="2"/>
      <path d="M30 44 C31 38, 33 38, 34 44" stroke="yellow"/>
      <line x1="16" y1="32" x2="24" y2="32" stroke="blue"/>
      <line x1="40" y1="32" x2="48" y2="32" stroke="blue" stroke-dasharray="2 2"/>
      <rect x="48" y="26" width="12" height="12" rx="1"/>
      <text x="50" y="35" font-size="5" fill="currentColor" stroke="none">D</text>
    </svg>`
  },

  // ===========================================================================
  // CHROMATOGRAPHY
  // ===========================================================================
  {
    id: 'analytical-hplc',
    name: 'HPLC System',
    domain: 'chemistry',
    category: 'chromatography',
    tags: ['HPLC', 'liquid chromatography', 'column', 'detector', 'pump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="12" height="20" rx="1"/>
      <text x="6" y="22" font-size="5" fill="currentColor" stroke="none">Sol</text>
      <circle cx="10" cy="38" r="6"/>
      <text x="6" y="41" font-size="5" fill="currentColor" stroke="none">P</text>
      <rect x="22" y="12" width="8" height="40" rx="2" fill="gray" opacity="0.3"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">C</text>
      <rect x="36" y="24" width="12" height="16" rx="1"/>
      <text x="38" y="36" font-size="5" fill="currentColor" stroke="none">Det</text>
      <rect x="52" y="20" width="8" height="24" rx="1"/>
      <path d="M10 44 L10 52 L22 52 L22 12"/>
      <path d="M30 32 L36 32"/>
      <path d="M48 32 L52 32"/>
    </svg>`
  },
  {
    id: 'analytical-gc',
    name: 'Gas Chromatograph',
    domain: 'chemistry',
    category: 'chromatography',
    tags: ['GC', 'gas chromatography', 'column', 'oven', 'FID'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <path d="M20 32 C20 24, 28 24, 32 24 C36 24, 44 24, 44 32 C44 40, 36 40, 32 40 C28 40, 20 40, 20 32" stroke="blue" stroke-width="2"/>
      <rect x="4" y="28" width="8" height="8" rx="1"/>
      <text x="5" y="35" font-size="4" fill="currentColor" stroke="none">Inj</text>
      <rect x="52" y="28" width="8" height="8" rx="1"/>
      <text x="53" y="35" font-size="4" fill="currentColor" stroke="none">Det</text>
      <text x="26" y="62" font-size="5" fill="currentColor" stroke="none">GC</text>
    </svg>`
  },
  {
    id: 'analytical-tlc',
    name: 'TLC Plate',
    domain: 'chemistry',
    category: 'chromatography',
    tags: ['TLC', 'thin layer', 'Rf', 'silica', 'spots'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="4" width="40" height="56" rx="1" fill="white"/>
      <rect x="12" y="4" width="40" height="56" rx="1"/>
      <line x1="12" y1="48" x2="52" y2="48" stroke-dasharray="4 2"/>
      <circle cx="24" cy="48" r="3" fill="blue"/>
      <circle cx="32" cy="48" r="3" fill="green"/>
      <circle cx="40" cy="48" r="3" fill="red"/>
      <circle cx="24" cy="20" r="4" fill="blue" opacity="0.5"/>
      <circle cx="32" cy="28" r="4" fill="green" opacity="0.5"/>
      <circle cx="40" cy="16" r="4" fill="red" opacity="0.5"/>
      <line x1="12" y1="52" x2="52" y2="52"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Origin</text>
    </svg>`
  },
  {
    id: 'analytical-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'chemistry',
    category: 'chromatography',
    tags: ['electrophoresis', 'gel', 'PAGE', 'DNA', 'proteins', 'bands'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="40" height="40" fill="blue" opacity="0.1"/>
      <line x1="20" y1="12" x2="20" y2="52" stroke-dasharray="8 4"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="8 4"/>
      <line x1="44" y1="12" x2="44" y2="52" stroke-dasharray="8 4"/>
      <rect x="16" y="18" width="8" height="3" fill="currentColor"/>
      <rect x="16" y="28" width="8" height="3" fill="currentColor"/>
      <rect x="16" y="40" width="8" height="3" fill="currentColor"/>
      <rect x="28" y="22" width="8" height="3" fill="currentColor"/>
      <rect x="28" y="36" width="8" height="3" fill="currentColor"/>
      <rect x="40" y="16" width="8" height="3" fill="currentColor"/>
      <rect x="40" y="24" width="8" height="3" fill="currentColor"/>
      <rect x="40" y="44" width="8" height="3" fill="currentColor"/>
      <text x="4" y="12" font-size="5" fill="red" stroke="none">-</text>
      <text x="56" y="56" font-size="5" fill="blue" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'analytical-column',
    name: 'Chromatography Column',
    domain: 'chemistry',
    category: 'chromatography',
    tags: ['column', 'stationary phase', 'separation', 'bands', 'elution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 4 L20 52 L24 60 L40 60 L44 52 L44 4 Z"/>
      <line x1="20" y1="4" x2="44" y2="4"/>
      <rect x="20" y="8" width="24" height="8" fill="gray" opacity="0.3"/>
      <ellipse cx="32" cy="24" rx="10" ry="4" fill="blue" opacity="0.5"/>
      <ellipse cx="32" cy="36" rx="10" ry="4" fill="red" opacity="0.5"/>
      <ellipse cx="32" cy="48" rx="10" ry="4" fill="green" opacity="0.5"/>
      <path d="M32 60 L32 64"/>
      <circle cx="32" cy="64" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // TITRATION
  // ===========================================================================
  {
    id: 'analytical-burette',
    name: 'Burette',
    domain: 'chemistry',
    category: 'titration',
    tags: ['burette', 'titration', 'volumetric', 'precision', 'stopcock'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="4" width="12" height="44" rx="1"/>
      <line x1="28" y1="10" x2="36" y2="10"/>
      <line x1="28" y1="20" x2="36" y2="20"/>
      <line x1="28" y1="30" x2="36" y2="30"/>
      <line x1="28" y1="40" x2="36" y2="40"/>
      <rect x="30" y="48" width="4" height="8"/>
      <circle cx="32" cy="52" r="4"/>
      <path d="M32 56 L32 64"/>
      <text x="38" y="12" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="38" y="22" font-size="4" fill="currentColor" stroke="none">10</text>
      <text x="38" y="32" font-size="4" fill="currentColor" stroke="none">20</text>
      <text x="38" y="42" font-size="4" fill="currentColor" stroke="none">30</text>
      <rect x="26" y="16" width="12" height="28" fill="blue" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'analytical-titration-curve',
    name: 'Titration Curve',
    domain: 'chemistry',
    category: 'titration',
    tags: ['titration curve', 'pH', 'equivalence point', 'buffer', 'endpoint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M12 52 C16 52, 24 50, 28 48 C32 46, 34 40, 36 32 C38 24, 38 18, 40 16 C42 14, 48 12, 52 12" stroke="blue" stroke-width="2" fill="none"/>
      <circle cx="37" cy="32" r="3" fill="red"/>
      <text x="40" y="36" font-size="5" fill="red" stroke="none">EP</text>
      <text x="4" y="8" font-size="5" fill="currentColor" stroke="none">pH</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">Vol</text>
    </svg>`
  },
  {
    id: 'analytical-indicator',
    name: 'pH Indicator',
    domain: 'chemistry',
    category: 'titration',
    tags: ['indicator', 'pH', 'phenolphthalein', 'color change', 'endpoint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56 L24 20 L40 20 L48 56 Z"/>
      <ellipse cx="32" cy="20" rx="8" ry="4"/>
      <rect x="16" y="36" width="32" height="20" fill="pink" opacity="0.5"/>
      <rect x="16" y="36" width="32" height="20" fill="none"/>
      <text x="4" y="32" font-size="5" fill="currentColor" stroke="none">acid</text>
      <text x="48" y="32" font-size="5" fill="currentColor" stroke="none">base</text>
      <path d="M24 32 L40 32" stroke="gray" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'analytical-redox-titration',
    name: 'Redox Titration',
    domain: 'chemistry',
    category: 'titration',
    tags: ['redox', 'titration', 'permanganate', 'oxidation', 'reduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56 L24 20 L40 20 L48 56 Z"/>
      <ellipse cx="32" cy="20" rx="8" ry="4"/>
      <rect x="16" y="36" width="32" height="20" fill="purple" opacity="0.5"/>
      <text x="24" y="50" font-size="6" fill="white" stroke="none">MnO4-</text>
      <path d="M28 8 L28 16" stroke="purple" stroke-width="2"/>
      <circle cx="28" cy="6" r="2" fill="purple"/>
      <text x="4" y="36" font-size="5" fill="currentColor" stroke="none">Ox</text>
      <text x="52" y="36" font-size="5" fill="currentColor" stroke="none">Red</text>
    </svg>`
  },
  {
    id: 'analytical-complexometric',
    name: 'Complexometric Titration',
    domain: 'chemistry',
    category: 'titration',
    tags: ['complexometric', 'EDTA', 'EBT', 'metal ions', 'chelate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56 L24 20 L40 20 L48 56 Z"/>
      <ellipse cx="32" cy="20" rx="8" ry="4"/>
      <circle cx="32" cy="40" r="8" fill="blue" opacity="0.3"/>
      <text x="28" y="44" font-size="6" fill="blue" stroke="none">M</text>
      <path d="M24 40 C20 36, 20 44, 24 40" stroke="currentColor"/>
      <path d="M40 40 C44 36, 44 44, 40 40" stroke="currentColor"/>
      <path d="M32 32 C28 28, 36 28, 32 32" stroke="currentColor"/>
      <path d="M32 48 C28 52, 36 52, 32 48" stroke="currentColor"/>
      <text x="20" y="62" font-size="5" fill="currentColor" stroke="none">EDTA</text>
    </svg>`
  },

  // ===========================================================================
  // ELECTROCHEMISTRY
  // ===========================================================================
  {
    id: 'analytical-voltammetry',
    name: 'Voltammetry Setup',
    domain: 'chemistry',
    category: 'electrochemistry',
    tags: ['voltammetry', 'electrode', 'cyclic', 'working', 'reference'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56 L20 20 L44 20 L52 56 Z"/>
      <ellipse cx="32" cy="20" rx="12" ry="4"/>
      <rect x="12" y="36" width="40" height="20" fill="blue" opacity="0.2"/>
      <line x1="24" y1="12" x2="24" y2="44" stroke="gray" stroke-width="3"/>
      <line x1="32" y1="12" x2="32" y2="40" stroke="currentColor" stroke-width="3"/>
      <line x1="40" y1="12" x2="40" y2="44" stroke="red" stroke-width="2"/>
      <text x="20" y="10" font-size="4" fill="gray" stroke="none">RE</text>
      <text x="28" y="10" font-size="4" fill="currentColor" stroke="none">WE</text>
      <text x="38" y="10" font-size="4" fill="red" stroke="none">CE</text>
    </svg>`
  },
  {
    id: 'analytical-cyclic-voltammogram',
    name: 'Cyclic Voltammogram',
    domain: 'chemistry',
    category: 'electrochemistry',
    tags: ['CV', 'cyclic voltammetry', 'peaks', 'redox', 'reversible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M12 32 C16 32, 20 20, 28 16 C32 14, 36 24, 40 32 C44 40, 48 48, 52 46 C56 44, 52 40, 48 32 C44 24, 40 16, 36 18 C32 20, 28 28, 24 32 C20 36, 16 32, 12 32" stroke="blue" stroke-width="2" fill="none"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">i</text>
      <text x="52" y="28" font-size="5" fill="currentColor" stroke="none">E</text>
      <circle cx="28" cy="16" r="2" fill="red"/>
      <circle cx="36" cy="48" r="2" fill="red"/>
    </svg>`
  },
  {
    id: 'analytical-potentiometer',
    name: 'Potentiometer',
    domain: 'chemistry',
    category: 'electrochemistry',
    tags: ['potentiometer', 'pH meter', 'potential', 'reference', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="24" rx="2"/>
      <text x="24" y="24" font-size="10" fill="currentColor" stroke="none">7.00</text>
      <line x1="24" y1="32" x2="24" y2="40"/>
      <line x1="40" y1="32" x2="40" y2="40"/>
      <rect x="20" y="40" width="8" height="20" rx="1"/>
      <rect x="36" y="40" width="8" height="20" rx="1"/>
      <text x="21" y="54" font-size="5" fill="currentColor" stroke="none">pH</text>
      <text x="37" y="54" font-size="5" fill="currentColor" stroke="none">Ref</text>
    </svg>`
  },
  {
    id: 'analytical-conductivity',
    name: 'Conductivity Meter',
    domain: 'chemistry',
    category: 'electrochemistry',
    tags: ['conductivity', 'conductance', 'ions', 'TDS', 'electrolyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="20" rx="2"/>
      <text x="20" y="22" font-size="7" fill="currentColor" stroke="none">1.5 mS</text>
      <line x1="32" y1="28" x2="32" y2="36"/>
      <rect x="24" y="36" width="16" height="24" rx="2"/>
      <line x1="28" y1="40" x2="28" y2="56" stroke-width="2"/>
      <line x1="36" y1="40" x2="36" y2="56" stroke-width="2"/>
      <path d="M28 48 L36 44" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M28 52 L36 48" stroke="blue" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'analytical-galvanic-cell',
    name: 'Galvanic Cell',
    domain: 'chemistry',
    category: 'electrochemistry',
    tags: ['galvanic', 'voltaic', 'cell', 'anode', 'cathode', 'salt bridge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="24" height="32" rx="2"/>
      <rect x="36" y="24" width="24" height="32" rx="2"/>
      <rect x="4" y="36" width="24" height="20" fill="blue" opacity="0.2"/>
      <rect x="36" y="36" width="24" height="20" fill="red" opacity="0.2"/>
      <line x1="12" y1="16" x2="12" y2="44" stroke="gray" stroke-width="4"/>
      <line x1="52" y1="16" x2="52" y2="44" stroke="orange" stroke-width="4"/>
      <path d="M28 32 C32 28, 32 28, 36 32" fill="none"/>
      <path d="M28 32 L28 28 L36 28 L36 32"/>
      <line x1="12" y1="16" x2="32" y2="8"/>
      <line x1="52" y1="16" x2="32" y2="8"/>
      <circle cx="32" cy="8" r="4"/>
      <text x="8" y="62" font-size="5" fill="currentColor" stroke="none">Zn</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">Cu</text>
    </svg>`
  },

  // ===========================================================================
  // LAB EQUIPMENT
  // ===========================================================================
  {
    id: 'analytical-balance',
    name: 'Analytical Balance',
    domain: 'chemistry',
    category: 'equipment',
    tags: ['balance', 'weighing', 'precision', 'analytical', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="44" width="48" height="12" rx="2"/>
      <rect x="12" y="24" width="40" height="20" rx="2"/>
      <text x="24" y="38" font-size="8" fill="currentColor" stroke="none">0.0000</text>
      <rect x="16" y="8" width="32" height="16" rx="2" fill="none" stroke-dasharray="2 2"/>
      <circle cx="32" cy="16" r="4"/>
    </svg>`
  },
  {
    id: 'analytical-volumetric-flask',
    name: 'Volumetric Flask',
    domain: 'chemistry',
    category: 'equipment',
    tags: ['volumetric', 'flask', 'standard', 'solution', 'meniscus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4 L28 20 L12 48 L12 56 L52 56 L52 48 L36 20 L36 4 Z"/>
      <line x1="28" y1="4" x2="36" y2="4"/>
      <line x1="12" y1="28" x2="52" y2="28" stroke-dasharray="4 2"/>
      <rect x="12" y="28" width="40" height="28" fill="blue" opacity="0.2"/>
      <path d="M26 28 C28 26, 36 26, 38 28" stroke="blue"/>
      <text x="54" y="30" font-size="5" fill="currentColor" stroke="none">100</text>
    </svg>`
  },
  {
    id: 'analytical-pipette',
    name: 'Pipette',
    domain: 'chemistry',
    category: 'equipment',
    tags: ['pipette', 'volumetric', 'transfer', 'micropipette', 'precision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="8" rx="8" ry="4"/>
      <path d="M24 8 L24 16 L28 24 L28 52 L30 60 L34 60 L36 52 L36 24 L40 16 L40 8"/>
      <line x1="24" y1="32" x2="40" y2="32" stroke-dasharray="2 2"/>
      <rect x="28" y="32" width="8" height="20" fill="blue" opacity="0.2"/>
      <text x="42" y="34" font-size="5" fill="currentColor" stroke="none">mL</text>
    </svg>`
  },
  {
    id: 'analytical-cuvette',
    name: 'Cuvette',
    domain: 'chemistry',
    category: 'equipment',
    tags: ['cuvette', 'spectroscopy', 'optical', 'quartz', 'absorbance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <rect x="20" y="24" width="24" height="32" fill="blue" opacity="0.3"/>
      <line x1="4" y1="40" x2="20" y2="40" stroke="purple" stroke-width="2"/>
      <line x1="44" y1="40" x2="60" y2="40" stroke="purple" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="6" y="36" font-size="5" fill="purple" stroke="none">I0</text>
      <text x="50" y="36" font-size="5" fill="purple" stroke="none">I</text>
      <text x="28" y="62" font-size="5" fill="currentColor" stroke="none">1 cm</text>
    </svg>`
  },
  {
    id: 'analytical-calibration-curve',
    name: 'Calibration Curve',
    domain: 'chemistry',
    category: 'equipment',
    tags: ['calibration', 'curve', 'standard', 'linear', 'regression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <line x1="8" y1="52" x2="52" y2="12" stroke="blue" stroke-width="2"/>
      <circle cx="12" cy="50" r="2" fill="red"/>
      <circle cx="20" cy="44" r="2" fill="red"/>
      <circle cx="28" cy="36" r="2" fill="red"/>
      <circle cx="36" cy="28" r="2" fill="red"/>
      <circle cx="44" cy="20" r="2" fill="red"/>
      <text x="4" y="8" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">C</text>
      <text x="36" y="44" font-size="5" fill="blue" stroke="none">R2=0.99</text>
    </svg>`
  },
];

export default analyticalIcons;
