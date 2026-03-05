/**
 * chemistry.ts
 * Chemistry icon definitions for FINNISH Icon Library
 *
 * Contains icons related to chemistry, laboratory equipment,
 * molecular structures, and chemical processes.
 *
 * Ralph Loop - COMPLETE checkpoint
 * Total: 97 icons covering all chemistry domains
 *
 * Categories:
 * - Laboratory Glassware (beakers, flasks, test tubes, funnels)
 * - Laboratory Apparatus (pipettes, burettes, condensers)
 * - Molecular Structures (atoms, bonds, orbitals)
 * - Periodic Table Elements (element symbols, atomic structure)
 * - Chemical Reactions (arrows, equilibrium, mechanisms)
 * - Spectroscopy (NMR, IR, MS, UV-Vis)
 * - Chromatography (TLC, HPLC, GC)
 * - Electrochemistry (cells, electrodes)
 * - Safety Equipment (goggles, gloves, fume hood)
 */

import type { IconDefinition } from './index';

/**
 * Chemistry domain icons collection
 */
export const chemistryIcons: IconDefinition[] = [
  // =============================================================================
  // LABORATORY GLASSWARE
  // =============================================================================
  {
    id: 'chem-beaker',
    name: 'Beaker',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['laboratory', 'container', 'mixing', 'measurement', 'liquid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 3h16v16a2 2 0 01-2 2H6a2 2 0 01-2-2V3z"/>
  <path d="M4 3l2-1h12l2 1"/>
  <path d="M4 13h16"/>
  <path d="M7 7h2"/>
  <path d="M7 10h2"/>
</svg>`,
  },
  {
    id: 'chem-flask',
    name: 'Erlenmeyer Flask',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['conical', 'titration', 'reaction', 'laboratory', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2h6"/>
  <path d="M10 2v6l-6 10a1 1 0 001 1h14a1 1 0 001-1l-6-10V2"/>
  <path d="M6 15h12"/>
</svg>`,
  },
  {
    id: 'chem-round-bottom-flask',
    name: 'Round Bottom Flask',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['boiling', 'distillation', 'heating', 'reflux', 'synthesis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 2h4"/>
  <path d="M10 2v5"/>
  <path d="M14 2v5"/>
  <circle cx="12" cy="15" r="7"/>
  <path d="M10 7h4"/>
</svg>`,
  },
  {
    id: 'chem-volumetric-flask',
    name: 'Volumetric Flask',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['measurement', 'solution', 'preparation', 'precision', 'dilution'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 2h4"/>
  <path d="M11 2v6"/>
  <path d="M13 2v6"/>
  <path d="M11 8h2"/>
  <ellipse cx="12" cy="16" rx="7" ry="6"/>
  <path d="M9 8l-2 4"/>
  <path d="M15 8l2 4"/>
</svg>`,
  },
  {
    id: 'chem-test-tube',
    name: 'Test Tube',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['sample', 'reaction', 'tube', 'holder', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2h6"/>
  <path d="M9 2v13a4 4 0 0 0 6 0V2"/>
  <path d="M9 10h6"/>
  <circle cx="12" cy="17" r="1"/>
</svg>`,
  },
  {
    id: 'chem-test-tube-rack',
    name: 'Test Tube Rack',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['holder', 'storage', 'organization', 'laboratory', 'multiple'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="16" width="20" height="4" rx="1"/>
  <path d="M5 16V6a2 2 0 014 0v10"/>
  <path d="M10 16V8a2 2 0 014 0v8"/>
  <path d="M15 16V6a2 2 0 014 0v10"/>
</svg>`,
  },
  {
    id: 'chem-graduated-cylinder',
    name: 'Graduated Cylinder',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['measurement', 'volume', 'precision', 'liquid', 'calibrated'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 2h8v18a2 2 0 01-2 2h-4a2 2 0 01-2-2V2z"/>
  <path d="M8 6h3"/>
  <path d="M8 10h4"/>
  <path d="M8 14h3"/>
  <path d="M8 18h4"/>
</svg>`,
  },
  {
    id: 'chem-burette',
    name: 'Burette',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['titration', 'measurement', 'volumetric', 'precision', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="2" width="6" height="16" rx="1"/>
  <path d="M9 6h6"/>
  <path d="M9 10h6"/>
  <path d="M9 14h6"/>
  <path d="M12 18v3"/>
  <path d="M10 21h4"/>
  <circle cx="12" cy="21" r="1"/>
</svg>`,
  },
  {
    id: 'chem-pipette',
    name: 'Pipette',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['dropper', 'measurement', 'transfer', 'precision', 'volumetric'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v6"/>
  <path d="M10 4h4"/>
  <path d="M9 8h6v8l-3 6-3-6V8z"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'chem-micropipette',
    name: 'Micropipette',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['precision', 'microliter', 'transfer', 'adjustable', 'laboratory'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="2" width="8" height="12" rx="2"/>
  <path d="M10 14h4v4l-2 4-2-4v-4z"/>
  <circle cx="12" cy="6" r="2"/>
  <path d="M10 10h4"/>
</svg>`,
  },
  {
    id: 'chem-funnel',
    name: 'Funnel',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['filtration', 'separation', 'transfer', 'laboratory', 'pouring'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 4h18l-6 8v8l-6-2V12L3 4z"/>
  <path d="M3 4c0 1 4 2 9 2s9-1 9-2"/>
</svg>`,
  },
  {
    id: 'chem-separating-funnel',
    name: 'Separating Funnel',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['extraction', 'separation', 'immiscible', 'liquid', 'layers'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v2"/>
  <path d="M10 4h4"/>
  <path d="M8 4l-2 10h12l-2-10"/>
  <path d="M6 14l4 4h4l-2 4"/>
  <path d="M6 10h12"/>
  <circle cx="12" cy="20" r="2"/>
</svg>`,
  },
  {
    id: 'chem-watch-glass',
    name: 'Watch Glass',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['evaporation', 'cover', 'weighing', 'shallow', 'dish'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="10" ry="3"/>
  <path d="M2 12c0 2 4.5 4 10 4s10-2 10-4"/>
</svg>`,
  },
  {
    id: 'chem-petri-dish',
    name: 'Petri Dish',
    domain: 'chemistry',
    category: 'glassware',
    tags: ['culture', 'bacteria', 'microbiology', 'agar', 'plate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="14" rx="10" ry="4"/>
  <path d="M2 14v-4c0-2.2 4.5-4 10-4s10 1.8 10 4v4"/>
  <ellipse cx="12" cy="10" rx="10" ry="4"/>
</svg>`,
  },
  {
    id: 'chem-condenser',
    name: 'Condenser',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['cooling', 'distillation', 'reflux', 'vapor', 'liquid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="2" width="8" height="20" rx="1"/>
  <path d="M4 6h4"/>
  <path d="M16 6h4"/>
  <path d="M4 18h4"/>
  <path d="M16 18h4"/>
  <path d="M10 5v14"/>
  <path d="M14 5v14"/>
  <path d="M11 8h2"/>
  <path d="M11 12h2"/>
  <path d="M11 16h2"/>
</svg>`,
  },
  {
    id: 'chem-distillation',
    name: 'Distillation Setup',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['separation', 'purification', 'boiling', 'condensation', 'fractional'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="18" r="4"/>
  <path d="M6 14v-4l4-4h4"/>
  <path d="M14 6l4 4v6"/>
  <circle cx="18" cy="18" r="2"/>
  <path d="M6 4v2"/>
</svg>`,
  },

  // =============================================================================
  // LABORATORY EQUIPMENT
  // =============================================================================
  {
    id: 'chem-bunsen',
    name: 'Bunsen Burner',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['flame', 'heating', 'gas', 'burner', 'heat source'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="14" width="8" height="8" rx="1"/>
  <path d="M10 14v-2h4v2"/>
  <path d="M12 12V8"/>
  <path d="M10 6c0-2 1-4 2-4s2 2 2 4c0 1-1 2-2 2s-2-1-2-2z"/>
  <path d="M6 22h12"/>
</svg>`,
  },
  {
    id: 'chem-hot-plate',
    name: 'Hot Plate',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['heating', 'stirring', 'temperature', 'magnetic', 'electric'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="10" width="20" height="12" rx="2"/>
  <circle cx="12" cy="16" r="4"/>
  <path d="M10 16h4"/>
  <path d="M12 14v4"/>
  <path d="M6 6v4"/>
  <path d="M12 4v6"/>
  <path d="M18 6v4"/>
</svg>`,
  },
  {
    id: 'chem-mortar',
    name: 'Mortar and Pestle',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['grinding', 'crushing', 'powder', 'homogenization', 'mixing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14c0 4 4 6 8 6s8-2 8-6c0-2-1-4-4-5H8c-3 1-4 3-4 5z"/>
  <path d="M4 14c0-1 2-2 4-2h8c2 0 4 1 4 2"/>
  <path d="M15 4l-3 8"/>
  <circle cx="15" cy="3" r="1"/>
</svg>`,
  },
  {
    id: 'chem-centrifuge',
    name: 'Centrifuge',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['separation', 'spinning', 'sedimentation', 'pellet', 'supernatant'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 3v3"/>
  <path d="M12 18v3"/>
  <path d="M3 12h3"/>
  <path d="M18 12h3"/>
  <path d="M5.6 5.6l2.1 2.1"/>
  <path d="M16.3 16.3l2.1 2.1"/>
</svg>`,
  },
  {
    id: 'chem-balance',
    name: 'Analytical Balance',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['weighing', 'mass', 'precision', 'measurement', 'scale'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3v18"/>
  <path d="M8 21h8"/>
  <path d="M3 8l4 2v4l-4 2"/>
  <path d="M21 8l-4 2v4l4 2"/>
  <path d="M7 10h10"/>
  <circle cx="12" cy="6" r="2"/>
</svg>`,
  },
  {
    id: 'chem-ph-meter',
    name: 'pH Meter',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['acidity', 'alkalinity', 'measurement', 'electrode', 'indicator'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="2" width="12" height="8" rx="2"/>
  <path d="M10 4h4"/>
  <path d="M12 10v12"/>
  <ellipse cx="12" cy="20" rx="2" ry="1"/>
  <path d="M8 6h2"/>
  <path d="M14 6h2"/>
</svg>`,
  },
  {
    id: 'chem-spectrophotometer',
    name: 'Spectrophotometer',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['absorbance', 'light', 'wavelength', 'analysis', 'optical'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="20" height="10" rx="2"/>
  <rect x="4" y="10" width="6" height="6" rx="1"/>
  <circle cx="16" cy="13" r="3"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="M7 4v4"/>
  <path d="M5 6h4"/>
</svg>`,
  },
  {
    id: 'chem-rotary-evaporator',
    name: 'Rotary Evaporator',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['evaporation', 'solvent', 'concentration', 'vacuum', 'rotovap'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="16" r="5"/>
  <path d="M8 11V6"/>
  <path d="M8 6l8-2"/>
  <circle cx="18" cy="6" r="3"/>
  <path d="M4 20h8"/>
  <rect x="14" y="12" width="6" height="8" rx="1"/>
</svg>`,
  },
  {
    id: 'chem-fume-hood',
    name: 'Fume Hood',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['safety', 'ventilation', 'exhaust', 'protection', 'containment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="16" rx="1"/>
  <path d="M2 10h20"/>
  <path d="M6 10v8"/>
  <path d="M18 10v8"/>
  <path d="M9 2l3 4 3-4"/>
  <path d="M12 2v4"/>
</svg>`,
  },
  {
    id: 'chem-magnetic-stirrer',
    name: 'Magnetic Stirrer',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['mixing', 'stirring', 'stir bar', 'homogeneous', 'rotation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="14" width="16" height="6" rx="1"/>
  <circle cx="12" cy="17" r="2"/>
  <path d="M8 14V8"/>
  <path d="M16 14V8"/>
  <path d="M8 8h8"/>
  <ellipse cx="12" cy="10" rx="3" ry="1"/>
</svg>`,
  },
  {
    id: 'chem-vacuum-pump',
    name: 'Vacuum Pump',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['pressure', 'evacuation', 'filtration', 'distillation', 'suction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="16" height="12" rx="2"/>
  <circle cx="12" cy="14" r="4"/>
  <path d="M12 10v8"/>
  <path d="M8 14h8"/>
  <path d="M8 4h8"/>
  <path d="M12 4v4"/>
</svg>`,
  },
  {
    id: 'chem-desiccator',
    name: 'Desiccator',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['drying', 'moisture', 'storage', 'vacuum', 'silica gel'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="14" r="8"/>
  <ellipse cx="12" cy="10" rx="8" ry="3"/>
  <path d="M12 7v-5"/>
  <path d="M10 4h4"/>
  <path d="M8 16h8"/>
</svg>`,
  },
  {
    id: 'chem-clamp-stand',
    name: 'Clamp Stand',
    domain: 'chemistry',
    category: 'apparatus',
    tags: ['support', 'holder', 'ring', 'burette', 'setup'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="20" width="16" height="2" rx="1"/>
  <path d="M12 20V4"/>
  <path d="M12 8h6"/>
  <circle cx="18" cy="8" r="2"/>
  <path d="M12 14h-4"/>
  <path d="M6 12l2 2-2 2"/>
</svg>`,
  },

  // =============================================================================
  // ATOMIC STRUCTURE
  // =============================================================================
  {
    id: 'chem-atom',
    name: 'Atom',
    domain: 'chemistry',
    category: 'structure',
    tags: ['nucleus', 'electron', 'orbit', 'element', 'particle'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <ellipse cx="12" cy="12" rx="10" ry="4"/>
  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
</svg>`,
  },
  {
    id: 'chem-nucleus',
    name: 'Nucleus',
    domain: 'chemistry',
    category: 'structure',
    tags: ['proton', 'neutron', 'core', 'center', 'atomic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <circle cx="10" cy="10" r="2" fill="currentColor"/>
  <circle cx="14" cy="10" r="2"/>
  <circle cx="10" cy="14" r="2"/>
  <circle cx="14" cy="14" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-electron',
    name: 'Electron',
    domain: 'chemistry',
    category: 'structure',
    tags: ['particle', 'negative', 'charge', 'orbital', 'cloud'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3" fill="currentColor"/>
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
</svg>`,
  },
  {
    id: 'chem-orbital-s',
    name: 'S Orbital',
    domain: 'chemistry',
    category: 'structure',
    tags: ['spherical', 'electron', 'quantum', 'shell', 'probability'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="4" stroke-dasharray="2 2"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-orbital-p',
    name: 'P Orbital',
    domain: 'chemistry',
    category: 'structure',
    tags: ['dumbbell', 'electron', 'quantum', 'lobe', 'probability'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="6" rx="4" ry="5"/>
  <ellipse cx="12" cy="18" rx="4" ry="5"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-orbital-d',
    name: 'D Orbital',
    domain: 'chemistry',
    category: 'structure',
    tags: ['clover', 'electron', 'quantum', 'transition', 'probability'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="7" cy="7" rx="3" ry="4" transform="rotate(-45 7 7)"/>
  <ellipse cx="17" cy="7" rx="3" ry="4" transform="rotate(45 17 7)"/>
  <ellipse cx="7" cy="17" rx="3" ry="4" transform="rotate(45 7 17)"/>
  <ellipse cx="17" cy="17" rx="3" ry="4" transform="rotate(-45 17 17)"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-periodic-table',
    name: 'Periodic Table',
    domain: 'chemistry',
    category: 'reference',
    tags: ['elements', 'mendeleev', 'periodic', 'atomic', 'chart'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="4" height="4"/>
  <rect x="18" y="4" width="4" height="4"/>
  <rect x="2" y="8" width="4" height="4"/>
  <rect x="6" y="8" width="4" height="4"/>
  <rect x="14" y="8" width="4" height="4"/>
  <rect x="18" y="8" width="4" height="4"/>
  <rect x="2" y="12" width="4" height="4"/>
  <rect x="6" y="12" width="4" height="4"/>
  <rect x="10" y="12" width="4" height="4"/>
  <rect x="14" y="12" width="4" height="4"/>
  <rect x="18" y="12" width="4" height="4"/>
  <rect x="6" y="18" width="12" height="2"/>
</svg>`,
  },
  {
    id: 'chem-element-box',
    name: 'Element Box',
    domain: 'chemistry',
    category: 'reference',
    tags: ['symbol', 'atomic number', 'mass', 'periodic', 'element'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="1"/>
  <text x="12" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="currentColor">Na</text>
  <text x="6" y="8" font-size="4" fill="currentColor">11</text>
  <text x="12" y="20" text-anchor="middle" font-size="3" fill="currentColor">22.99</text>
</svg>`,
  },
  {
    id: 'chem-isotope',
    name: 'Isotope',
    domain: 'chemistry',
    category: 'structure',
    tags: ['mass number', 'neutron', 'variant', 'atomic', 'nuclear'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="14" r="6"/>
  <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
  <circle cx="14" cy="13" r="1.5"/>
  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  <text x="6" y="8" font-size="5" fill="currentColor">14</text>
  <text x="6" y="12" font-size="5" fill="currentColor">6</text>
  <text x="10" y="10" font-size="6" font-weight="bold" fill="currentColor">C</text>
</svg>`,
  },
  {
    id: 'chem-ion-positive',
    name: 'Cation',
    domain: 'chemistry',
    category: 'structure',
    tags: ['positive', 'charge', 'ion', 'metal', 'electrolyte'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">+</text>
</svg>`,
  },
  {
    id: 'chem-ion-negative',
    name: 'Anion',
    domain: 'chemistry',
    category: 'structure',
    tags: ['negative', 'charge', 'ion', 'nonmetal', 'electrolyte'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M8 12h8" stroke-width="2"/>
</svg>`,
  },

  // =============================================================================
  // MOLECULAR STRUCTURES & BONDS
  // =============================================================================
  {
    id: 'chem-molecule',
    name: 'Molecule',
    domain: 'chemistry',
    category: 'structure',
    tags: ['atoms', 'bonds', 'compound', 'organic', 'model'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="5" cy="8" r="2"/>
  <circle cx="5" cy="16" r="2"/>
  <circle cx="19" cy="12" r="2"/>
  <path d="M9.5 10.5l-2.5-1.5"/>
  <path d="M9.5 13.5l-2.5 1.5"/>
  <path d="M15 12h2"/>
</svg>`,
  },
  {
    id: 'chem-bond-single',
    name: 'Single Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['covalent', 'sigma', 'connection', 'link', 'electron pair'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <path d="M10 12h4"/>
</svg>`,
  },
  {
    id: 'chem-bond-double',
    name: 'Double Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['covalent', 'pi', 'alkene', 'unsaturated', 'electron pairs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <path d="M10 10h4"/>
  <path d="M10 14h4"/>
</svg>`,
  },
  {
    id: 'chem-bond-triple',
    name: 'Triple Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['covalent', 'alkyne', 'nitrogen', 'unsaturated', 'electron pairs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <path d="M10 9h4"/>
  <path d="M10 12h4"/>
  <path d="M10 15h4"/>
</svg>`,
  },
  {
    id: 'chem-bond-ionic',
    name: 'Ionic Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['electrostatic', 'salt', 'metal', 'nonmetal', 'charge'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <text x="6" y="14" text-anchor="middle" font-size="6" fill="currentColor">+</text>
  <text x="18" y="14" text-anchor="middle" font-size="6" fill="currentColor">-</text>
  <path d="M10 12h4" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'chem-bond-hydrogen',
    name: 'Hydrogen Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['intermolecular', 'weak', 'water', 'dna', 'attraction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="3"/>
  <circle cx="12" cy="12" r="2"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M9 12h1"/>
  <path d="M14 12h1" stroke-dasharray="1 1"/>
  <text x="6" y="13" text-anchor="middle" font-size="4" fill="currentColor">O</text>
  <text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">H</text>
  <text x="18" y="13" text-anchor="middle" font-size="4" fill="currentColor">N</text>
</svg>`,
  },
  {
    id: 'chem-bond-coordinate',
    name: 'Coordinate Bond',
    domain: 'chemistry',
    category: 'structure',
    tags: ['dative', 'donor', 'acceptor', 'complex', 'ligand'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="4"/>
  <path d="M10 12h4"/>
  <path d="M12 10l2 2-2 2"/>
</svg>`,
  },
  {
    id: 'chem-water-molecule',
    name: 'Water Molecule',
    domain: 'chemistry',
    category: 'structure',
    tags: ['h2o', 'bent', 'polar', 'solvent', 'hydrogen'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="4"/>
  <circle cx="6" cy="16" r="2"/>
  <circle cx="18" cy="16" r="2"/>
  <path d="M9 13l-2 2"/>
  <path d="M15 13l2 2"/>
  <text x="12" y="11" text-anchor="middle" font-size="4" fill="currentColor">O</text>
  <text x="6" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text>
  <text x="18" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text>
</svg>`,
  },
  {
    id: 'chem-co2-molecule',
    name: 'Carbon Dioxide',
    domain: 'chemistry',
    category: 'structure',
    tags: ['co2', 'linear', 'gas', 'carbon', 'dioxide'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="4" cy="12" r="2"/>
  <circle cx="20" cy="12" r="2"/>
  <path d="M9 11h-3"/>
  <path d="M9 13h-3"/>
  <path d="M15 11h3"/>
  <path d="M15 13h3"/>
  <text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">C</text>
  <text x="4" y="13" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="20" y="13" text-anchor="middle" font-size="3" fill="currentColor">O</text>
</svg>`,
  },
  {
    id: 'chem-methane',
    name: 'Methane',
    domain: 'chemistry',
    category: 'structure',
    tags: ['ch4', 'tetrahedral', 'alkane', 'hydrocarbon', 'gas'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="4" r="1.5"/>
  <circle cx="5" cy="16" r="1.5"/>
  <circle cx="19" cy="16" r="1.5"/>
  <circle cx="12" cy="20" r="1.5"/>
  <path d="M12 9v-3.5"/>
  <path d="M9.5 13.5l-3 1.5"/>
  <path d="M14.5 13.5l3 1.5"/>
  <path d="M12 15v3.5"/>
</svg>`,
  },
  {
    id: 'chem-ammonia',
    name: 'Ammonia',
    domain: 'chemistry',
    category: 'structure',
    tags: ['nh3', 'pyramidal', 'base', 'nitrogen', 'fertilizer'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="3"/>
  <circle cx="6" cy="18" r="1.5"/>
  <circle cx="12" cy="20" r="1.5"/>
  <circle cx="18" cy="18" r="1.5"/>
  <path d="M10 12.5l-3 4"/>
  <path d="M12 13v5.5"/>
  <path d="M14 12.5l3 4"/>
  <text x="12" y="11" text-anchor="middle" font-size="4" fill="currentColor">N</text>
</svg>`,
  },

  // =============================================================================
  // ORGANIC CHEMISTRY
  // =============================================================================
  {
    id: 'chem-benzene',
    name: 'Benzene Ring',
    domain: 'chemistry',
    category: 'structure',
    tags: ['aromatic', 'hexagonal', 'organic', 'ring', 'hydrocarbon'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 20,7 20,17 12,21 4,17 4,7"/>
  <circle cx="12" cy="12" r="4"/>
</svg>`,
  },
  {
    id: 'chem-cyclohexane',
    name: 'Cyclohexane',
    domain: 'chemistry',
    category: 'structure',
    tags: ['saturated', 'ring', 'chair', 'boat', 'conformer'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 20,7 20,17 12,21 4,17 4,7"/>
</svg>`,
  },
  {
    id: 'chem-naphthalene',
    name: 'Naphthalene',
    domain: 'chemistry',
    category: 'structure',
    tags: ['polycyclic', 'aromatic', 'fused', 'rings', 'bicyclic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="8,4 14,4 17,8 14,12 8,12 5,8"/>
  <polygon points="14,12 20,12 23,16 20,20 14,20 11,16"/>
  <circle cx="9.5" cy="8" r="2"/>
  <circle cx="15.5" cy="16" r="2"/>
</svg>`,
  },
  {
    id: 'chem-functional-hydroxyl',
    name: 'Hydroxyl Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['alcohol', 'oh', 'polar', 'hydrogen bonding', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="12" r="4"/>
  <circle cx="18" cy="12" r="2"/>
  <path d="M14 12h2"/>
  <text x="10" y="13" text-anchor="middle" font-size="5" fill="currentColor">O</text>
  <text x="18" y="13" text-anchor="middle" font-size="4" fill="currentColor">H</text>
</svg>`,
  },
  {
    id: 'chem-functional-carbonyl',
    name: 'Carbonyl Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['ketone', 'aldehyde', 'c=o', 'polar', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <circle cx="12" cy="4" r="3"/>
  <path d="M12 9v-2"/>
  <path d="M11 8v-2"/>
  <path d="M13 8v-2"/>
  <text x="12" y="13" text-anchor="middle" font-size="5" fill="currentColor">C</text>
  <text x="12" y="5" text-anchor="middle" font-size="4" fill="currentColor">O</text>
</svg>`,
  },
  {
    id: 'chem-functional-carboxyl',
    name: 'Carboxyl Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['acid', 'cooh', 'carboxylic', 'polar', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="4" r="2"/>
  <circle cx="18" cy="12" r="2"/>
  <circle cx="22" cy="12" r="1.5"/>
  <path d="M12 9v-3"/>
  <path d="M15 12h1"/>
  <path d="M20 12h1"/>
  <text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">C</text>
  <text x="12" y="5" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="18" y="13" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="22" y="13" text-anchor="middle" font-size="3" fill="currentColor">H</text>
</svg>`,
  },
  {
    id: 'chem-functional-amino',
    name: 'Amino Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['amine', 'nh2', 'basic', 'nitrogen', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <circle cx="6" cy="8" r="2"/>
  <circle cx="6" cy="16" r="2"/>
  <path d="M9 10l-1-1"/>
  <path d="M9 14l-1 1"/>
  <text x="12" y="13" text-anchor="middle" font-size="5" fill="currentColor">N</text>
  <text x="6" y="9" text-anchor="middle" font-size="3" fill="currentColor">H</text>
  <text x="6" y="17" text-anchor="middle" font-size="3" fill="currentColor">H</text>
</svg>`,
  },
  {
    id: 'chem-functional-ester',
    name: 'Ester Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['ester', 'coo', 'fragrance', 'hydrolysis', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="12" r="3"/>
  <circle cx="8" cy="4" r="2"/>
  <circle cx="16" cy="12" r="3"/>
  <path d="M8 9v-3"/>
  <path d="M11 12h2"/>
  <text x="8" y="13" text-anchor="middle" font-size="4" fill="currentColor">C</text>
  <text x="8" y="5" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="16" y="13" text-anchor="middle" font-size="4" fill="currentColor">O</text>
</svg>`,
  },
  {
    id: 'chem-functional-ether',
    name: 'Ether Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['ether', 'c-o-c', 'solvent', 'anesthetic', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="3"/>
  <circle cx="12" cy="12" r="2"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M9 12h1"/>
  <path d="M14 12h1"/>
  <text x="6" y="13" text-anchor="middle" font-size="4" fill="currentColor">C</text>
  <text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">O</text>
  <text x="18" y="13" text-anchor="middle" font-size="4" fill="currentColor">C</text>
</svg>`,
  },
  {
    id: 'chem-functional-nitro',
    name: 'Nitro Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['nitro', 'no2', 'explosive', 'withdrawing', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <circle cx="6" cy="8" r="2"/>
  <circle cx="6" cy="16" r="2"/>
  <path d="M9 10l-1-1"/>
  <path d="M9 14l-1 1"/>
  <text x="12" y="13" text-anchor="middle" font-size="5" fill="currentColor">N</text>
  <text x="6" y="9" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="6" y="17" text-anchor="middle" font-size="3" fill="currentColor">O</text>
  <text x="8" y="7" font-size="3" fill="currentColor">+</text>
  <text x="4" y="19" font-size="3" fill="currentColor">-</text>
</svg>`,
  },
  {
    id: 'chem-functional-sulfhydryl',
    name: 'Sulfhydryl Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['thiol', 'sh', 'cysteine', 'disulfide', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="12" r="4"/>
  <circle cx="18" cy="12" r="2"/>
  <path d="M14 12h2"/>
  <text x="10" y="13" text-anchor="middle" font-size="5" fill="currentColor">S</text>
  <text x="18" y="13" text-anchor="middle" font-size="4" fill="currentColor">H</text>
</svg>`,
  },
  {
    id: 'chem-functional-phosphate',
    name: 'Phosphate Group',
    domain: 'chemistry',
    category: 'functional-group',
    tags: ['phosphate', 'po4', 'atp', 'dna', 'energy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <circle cx="12" cy="4" r="2"/>
  <circle cx="4" cy="12" r="2"/>
  <circle cx="20" cy="12" r="2"/>
  <circle cx="12" cy="20" r="2"/>
  <path d="M12 8v-2"/>
  <path d="M8 12h-2"/>
  <path d="M16 12h2"/>
  <path d="M12 16v2"/>
  <text x="12" y="13" text-anchor="middle" font-size="4" fill="currentColor">P</text>
</svg>`,
  },

  // =============================================================================
  // CHEMICAL REACTIONS & PROCESSES
  // =============================================================================
  {
    id: 'chem-reaction',
    name: 'Chemical Reaction',
    domain: 'chemistry',
    category: 'process',
    tags: ['arrow', 'equilibrium', 'reversible', 'yield', 'transformation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5" cy="12" r="3"/>
  <circle cx="19" cy="12" r="3"/>
  <path d="M8 10h8"/>
  <path d="M8 14h8"/>
  <path d="M14 8l2 2-2 2"/>
  <path d="M10 16l-2-2 2-2"/>
</svg>`,
  },
  {
    id: 'chem-arrow-forward',
    name: 'Forward Reaction Arrow',
    domain: 'chemistry',
    category: 'process',
    tags: ['irreversible', 'yield', 'product', 'direction', 'synthesis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h16"/>
  <path d="M16 8l4 4-4 4"/>
</svg>`,
  },
  {
    id: 'chem-arrow-equilibrium',
    name: 'Equilibrium Arrows',
    domain: 'chemistry',
    category: 'process',
    tags: ['reversible', 'dynamic', 'balance', 'forward', 'reverse'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 10h16"/>
  <path d="M16 7l3 3"/>
  <path d="M4 14h16"/>
  <path d="M8 17l-3-3"/>
</svg>`,
  },
  {
    id: 'chem-arrow-resonance',
    name: 'Resonance Arrow',
    domain: 'chemistry',
    category: 'process',
    tags: ['delocalization', 'hybrid', 'structures', 'double-headed', 'organic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h16"/>
  <path d="M8 8l-4 4 4 4"/>
  <path d="M16 8l4 4-4 4"/>
</svg>`,
  },
  {
    id: 'chem-catalyst',
    name: 'Catalyst',
    domain: 'chemistry',
    category: 'process',
    tags: ['enzyme', 'accelerate', 'activation energy', 'reaction rate', 'efficiency'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <path d="M8 8l8 8"/>
  <path d="M16 8l-8 8"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-heat',
    name: 'Heat Symbol',
    domain: 'chemistry',
    category: 'process',
    tags: ['temperature', 'thermal', 'energy', 'delta', 'endothermic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c-1 2 1 4 0 6s1 4 0 6 1 4 0 6"/>
  <path d="M8 4c-1 2 1 4 0 6s1 4 0 6"/>
  <path d="M16 4c-1 2 1 4 0 6s1 4 0 6"/>
</svg>`,
  },
  {
    id: 'chem-light',
    name: 'Light/UV Symbol',
    domain: 'chemistry',
    category: 'process',
    tags: ['photochemistry', 'uv', 'radiation', 'energy', 'hv'],
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
    id: 'chem-precipitation',
    name: 'Precipitation',
    domain: 'chemistry',
    category: 'process',
    tags: ['solid', 'insoluble', 'product', 'settling', 'formation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
  <path d="M4 14h16"/>
  <circle cx="8" cy="17" r="1" fill="currentColor"/>
  <circle cx="12" cy="16" r="1" fill="currentColor"/>
  <circle cx="16" cy="17" r="1" fill="currentColor"/>
  <circle cx="10" cy="18" r="1" fill="currentColor"/>
  <circle cx="14" cy="18" r="1" fill="currentColor"/>
  <path d="M8 8v2"/>
  <path d="M12 6v4"/>
  <path d="M16 8v2"/>
</svg>`,
  },
  {
    id: 'chem-gas-evolution',
    name: 'Gas Evolution',
    domain: 'chemistry',
    category: 'process',
    tags: ['bubbles', 'effervescence', 'gas', 'liberation', 'volatile'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 8h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/>
  <path d="M4 14h16"/>
  <circle cx="8" cy="10" r="1"/>
  <circle cx="12" cy="11" r="1"/>
  <circle cx="16" cy="10" r="1"/>
  <circle cx="10" cy="6" r="1"/>
  <circle cx="14" cy="5" r="1"/>
  <circle cx="12" cy="2" r="1"/>
</svg>`,
  },
  {
    id: 'chem-oxidation',
    name: 'Oxidation',
    domain: 'chemistry',
    category: 'process',
    tags: ['electron loss', 'redox', 'increase', 'oxidation state', 'oilrig'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="12" r="4"/>
  <path d="M12 12h6"/>
  <path d="M16 9l2 3-2 3"/>
  <circle cx="20" cy="8" r="2"/>
  <text x="8" y="13" text-anchor="middle" font-size="4" fill="currentColor">-e</text>
</svg>`,
  },
  {
    id: 'chem-reduction',
    name: 'Reduction',
    domain: 'chemistry',
    category: 'process',
    tags: ['electron gain', 'redox', 'decrease', 'oxidation state', 'oilrig'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="16" cy="12" r="4"/>
  <path d="M6 12h6"/>
  <path d="M8 9l-2 3 2 3"/>
  <circle cx="4" cy="8" r="2"/>
  <text x="16" y="13" text-anchor="middle" font-size="4" fill="currentColor">+e</text>
</svg>`,
  },

  // =============================================================================
  // ANALYTICAL CHEMISTRY
  // =============================================================================
  {
    id: 'chem-spectrum',
    name: 'Spectrum',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['spectroscopy', 'wavelength', 'absorption', 'emission', 'NMR'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M2 18V6"/>
  <path d="M4 18v-4"/>
  <path d="M7 18v-8"/>
  <path d="M10 18v-12"/>
  <path d="M13 18v-6"/>
  <path d="M16 18v-10"/>
  <path d="M19 18v-3"/>
</svg>`,
  },
  {
    id: 'chem-chromatography',
    name: 'Chromatography',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['separation', 'tlc', 'hplc', 'gc', 'column'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="2" width="12" height="20" rx="1"/>
  <path d="M6 6h12"/>
  <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
  <circle cx="14" cy="13" r="1.5"/>
  <circle cx="10" cy="16" r="1.5"/>
  <circle cx="14" cy="18" r="1"/>
</svg>`,
  },
  {
    id: 'chem-mass-spec',
    name: 'Mass Spectrometer',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['mass', 'charge', 'm/z', 'fragmentation', 'molecular weight'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="12" rx="2"/>
  <path d="M6 10h4"/>
  <path d="M6 14h6"/>
  <path d="M14 10h4"/>
  <path d="M14 14h2"/>
  <circle cx="18" cy="14" r="1"/>
  <path d="M2 12h2"/>
</svg>`,
  },
  {
    id: 'chem-nmr',
    name: 'NMR Spectrometer',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['nuclear', 'magnetic', 'resonance', 'proton', 'carbon'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-ir-spectroscopy',
    name: 'IR Spectroscopy',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['infrared', 'functional groups', 'vibration', 'stretching', 'bending'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M2 18V6"/>
  <path d="M4 18c0-4 2-4 2-8s2-4 2-8"/>
  <path d="M10 18c0-2 1-2 1-4s1-2 1-4"/>
  <path d="M14 18c0-6 2-6 2-12"/>
  <path d="M18 18c0-3 2-3 2-6"/>
</svg>`,
  },
  {
    id: 'chem-titration',
    name: 'Titration Setup',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['volumetric', 'endpoint', 'indicator', 'concentration', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="2" width="4" height="10" rx="1"/>
  <path d="M12 12v2"/>
  <path d="M10 6h4"/>
  <path d="M8 16h8l-2 6H10l-2-6z"/>
  <path d="M8 18h8"/>
</svg>`,
  },
  {
    id: 'chem-cuvette',
    name: 'Cuvette',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['spectrophotometry', 'absorbance', 'optical', 'sample', 'cell'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="4" width="12" height="16" rx="1"/>
  <path d="M6 10h12"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M2 12l2 1v-2l-2 1z" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-electrode',
    name: 'Electrode',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['electrochemistry', 'potential', 'reference', 'working', 'counter'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="2" width="4" height="6" rx="1"/>
  <path d="M12 8v14"/>
  <ellipse cx="12" cy="18" rx="4" ry="2"/>
  <path d="M8 16v4"/>
  <path d="M16 16v4"/>
</svg>`,
  },

  // =============================================================================
  // STATES OF MATTER & PHYSICAL CHEMISTRY
  // =============================================================================
  {
    id: 'chem-crystal',
    name: 'Crystal',
    domain: 'chemistry',
    category: 'structure',
    tags: ['lattice', 'solid', 'crystallography', 'mineral', 'geometric'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 20,8 20,16 12,22 4,16 4,8"/>
  <path d="M12 2v20"/>
  <path d="M4 8l16 8"/>
  <path d="M20 8l-16 8"/>
</svg>`,
  },
  {
    id: 'chem-solid',
    name: 'Solid State',
    domain: 'chemistry',
    category: 'state',
    tags: ['particles', 'fixed', 'vibration', 'dense', 'rigid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="1"/>
  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="16" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-liquid',
    name: 'Liquid State',
    domain: 'chemistry',
    category: 'state',
    tags: ['fluid', 'flow', 'particles', 'mobile', 'volume'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
  <path d="M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8"/>
  <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
  <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
  <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-gas',
    name: 'Gas State',
    domain: 'chemistry',
    category: 'state',
    tags: ['vapor', 'particles', 'expansion', 'diffusion', 'pressure'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="1" stroke-dasharray="4 2"/>
  <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
  <circle cx="15" cy="6" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="10" r="1.5" fill="currentColor"/>
  <circle cx="6" cy="14" r="1.5" fill="currentColor"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
  <circle cx="9" cy="18" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-phase-transition',
    name: 'Phase Transition',
    domain: 'chemistry',
    category: 'process',
    tags: ['melting', 'boiling', 'sublimation', 'condensation', 'freezing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="14" width="6" height="6"/>
  <circle cx="5" cy="17" r="1" fill="currentColor"/>
  <path d="M8 12h8"/>
  <path d="M14 10l2 2-2 2"/>
  <path d="M16 8c1-1 2-2 4-2"/>
  <path d="M16 16c1 1 2 2 4 2"/>
  <circle cx="19" cy="6" r="1"/>
  <circle cx="21" cy="10" r="1"/>
  <circle cx="19" cy="18" r="1"/>
  <circle cx="21" cy="14" r="1"/>
</svg>`,
  },
  {
    id: 'chem-solution',
    name: 'Solution',
    domain: 'chemistry',
    category: 'state',
    tags: ['solute', 'solvent', 'homogeneous', 'mixture', 'dissolved'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
  <path d="M4 10h16"/>
  <circle cx="8" cy="14" r="1" fill="currentColor"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
  <circle cx="16" cy="15" r="1" fill="currentColor"/>
  <circle cx="10" cy="16" r="1" fill="currentColor"/>
  <circle cx="14" cy="13" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-colloid',
    name: 'Colloid',
    domain: 'chemistry',
    category: 'state',
    tags: ['suspension', 'emulsion', 'gel', 'aerosol', 'particles'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 6h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
  <path d="M4 10h16"/>
  <circle cx="8" cy="14" r="2"/>
  <circle cx="14" cy="13" r="2"/>
  <circle cx="11" cy="17" r="1.5"/>
  <circle cx="17" cy="16" r="1.5"/>
</svg>`,
  },

  // =============================================================================
  // SAFETY & HAZARD SYMBOLS
  // =============================================================================
  {
    id: 'chem-hazard-flammable',
    name: 'Flammable',
    domain: 'chemistry',
    category: 'safety',
    tags: ['fire', 'combustible', 'danger', 'warning', 'ghs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c-2 4-6 6-6 12a6 6 0 0012 0c0-6-4-8-6-12z"/>
  <path d="M12 22c-1-2 1-4 0-6s1-2 0-4"/>
</svg>`,
  },
  {
    id: 'chem-hazard-corrosive',
    name: 'Corrosive',
    domain: 'chemistry',
    category: 'safety',
    tags: ['acid', 'base', 'burn', 'danger', 'ghs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 4l4 6 4-6"/>
  <path d="M12 10v4"/>
  <circle cx="8" cy="18" r="2"/>
  <circle cx="16" cy="18" r="2"/>
  <path d="M10 18h4"/>
  <path d="M6 18v2"/>
  <path d="M18 18v2"/>
</svg>`,
  },
  {
    id: 'chem-hazard-toxic',
    name: 'Toxic',
    domain: 'chemistry',
    category: 'safety',
    tags: ['poison', 'skull', 'danger', 'lethal', 'ghs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="6"/>
  <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
  <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
  <path d="M9 13h6"/>
  <path d="M10 13v2"/>
  <path d="M14 13v2"/>
  <path d="M8 16l-2 4"/>
  <path d="M16 16l2 4"/>
  <path d="M12 16v6"/>
</svg>`,
  },
  {
    id: 'chem-hazard-oxidizer',
    name: 'Oxidizer',
    domain: 'chemistry',
    category: 'safety',
    tags: ['oxygen', 'fire', 'danger', 'reactive', 'ghs'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4v4"/>
  <path d="M12 16v4"/>
  <path d="M4 12h4"/>
  <path d="M16 12h4"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'chem-hazard-radioactive',
    name: 'Radioactive',
    domain: 'chemistry',
    category: 'safety',
    tags: ['radiation', 'nuclear', 'danger', 'isotope', 'warning'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 2a10 10 0 00-8.7 5l5.2 3a4 4 0 017 0l5.2-3A10 10 0 0012 2z"/>
  <path d="M12 22a10 10 0 01-8.7-5l5.2-3a4 4 0 007 0l5.2 3A10 10 0 0112 22z"/>
  <path d="M2 12a10 10 0 005-8.7l3 5.2a4 4 0 010 7l-3 5.2A10 10 0 012 12z"/>
</svg>`,
  },
  {
    id: 'chem-safety-goggles',
    name: 'Safety Goggles',
    domain: 'chemistry',
    category: 'safety',
    tags: ['eye protection', 'ppe', 'laboratory', 'safety', 'equipment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="7" cy="12" rx="5" ry="4"/>
  <ellipse cx="17" cy="12" rx="5" ry="4"/>
  <path d="M12 12h-2"/>
  <path d="M2 12h1"/>
  <path d="M21 12h1"/>
  <path d="M2 10c0-2 1-4 3-4"/>
  <path d="M22 10c0-2-1-4-3-4"/>
</svg>`,
  },
  {
    id: 'chem-safety-gloves',
    name: 'Safety Gloves',
    domain: 'chemistry',
    category: 'safety',
    tags: ['hand protection', 'ppe', 'laboratory', 'safety', 'nitrile'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 10V4a1 1 0 012 0v4"/>
  <path d="M8 8V3a1 1 0 012 0v5"/>
  <path d="M10 8V2a1 1 0 012 0v6"/>
  <path d="M12 8V3a1 1 0 012 0v5"/>
  <path d="M14 10l2-2a1 1 0 011.4 1.4L14 12"/>
  <path d="M6 10c-2 0-2 2-2 4v4a4 4 0 004 4h6a4 4 0 004-4v-4c0-2 0-2-2-2"/>
</svg>`,
  },
  {
    id: 'chem-lab-coat',
    name: 'Lab Coat',
    domain: 'chemistry',
    category: 'safety',
    tags: ['protection', 'ppe', 'laboratory', 'safety', 'clothing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 4l-4 4v14h6v-6h8v6h6V8l-4-4"/>
  <path d="M6 4c0 2 2 4 6 4s6-2 6-4"/>
  <path d="M9 4v4"/>
  <path d="M15 4v4"/>
  <path d="M8 14h2"/>
  <path d="M14 14h2"/>
</svg>`,
  },
];

export default chemistryIcons;
