/**
 * Materials Science Icon Library
 * Comprehensive SVG icons for materials science and engineering
 *
 * Categories:
 * - Nanomaterials (nanotubes, quantum dots, nanoparticles)
 * - Composites (fiber reinforced, laminates, matrix)
 * - Ceramics (crystalline, glass, refractories)
 * - Biomaterials (scaffolds, implants, biocompatible)
 * - Characterization (microscopy, spectroscopy, testing)
 */

import type { IconDefinition } from './index';

export const materialsScienceIcons: IconDefinition[] = [
  // ===========================================================================
  // NANOMATERIALS
  // ===========================================================================
  {
    id: 'mat-nanotube',
    name: 'Carbon Nanotube',
    domain: 'engineering',
    category: 'nanomaterials',
    tags: ['nanotube', 'carbon', 'CNT', 'SWNT', 'MWNT', 'graphene'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="8" rx="16" ry="4"/>
      <path d="M16 8v48c0 2.2 7.2 4 16 4s16-1.8 16-4V8"/>
      <ellipse cx="32" cy="56" rx="16" ry="4"/>
      <path d="M16 16h32" stroke-dasharray="4 2"/>
      <path d="M16 24h32" stroke-dasharray="4 2"/>
      <path d="M16 32h32" stroke-dasharray="4 2"/>
      <path d="M16 40h32" stroke-dasharray="4 2"/>
      <path d="M16 48h32" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'mat-quantum-dot',
    name: 'Quantum Dot',
    domain: 'engineering',
    category: 'nanomaterials',
    tags: ['quantum dot', 'nanocrystal', 'semiconductor', 'fluorescent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="18" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 3"/>
      <path d="M32 4v8"/>
      <path d="M32 52v8"/>
      <path d="M4 32h8"/>
      <path d="M52 32h8"/>
    </svg>`
  },
  {
    id: 'mat-nanoparticle',
    name: 'Nanoparticle',
    domain: 'engineering',
    category: 'nanomaterials',
    tags: ['nanoparticle', 'colloid', 'nanosphere', 'surface area'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="20" r="8"/>
      <circle cx="44" cy="20" r="6"/>
      <circle cx="32" cy="40" r="10" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="10"/>
      <circle cx="52" cy="44" r="4"/>
      <circle cx="12" cy="44" r="5"/>
      <path d="M28 20l-4 12"/>
      <path d="M38 20l-2 12"/>
    </svg>`
  },
  {
    id: 'mat-graphene',
    name: 'Graphene Sheet',
    domain: 'engineering',
    category: 'nanomaterials',
    tags: ['graphene', '2D material', 'carbon', 'hexagonal', 'monolayer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16l8-4 8 4 8-4 8 4"/>
      <path d="M16 16v8l8 4v8l-8 4v8"/>
      <path d="M32 12v8l8 4v8l-8 4v8l-8-4"/>
      <path d="M48 16v8l-8 4v8l8 4v8"/>
      <path d="M24 28h16"/>
      <path d="M24 44h16"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
      <circle cx="48" cy="16" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-nanowire',
    name: 'Nanowire',
    domain: 'engineering',
    category: 'nanomaterials',
    tags: ['nanowire', 'nanorod', 'semiconductor', 'metal', 'whisker'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="8" stroke-width="4"/>
      <line x1="12" y1="48" x2="48" y2="12" stroke-width="3"/>
      <line x1="20" y1="56" x2="56" y2="20" stroke-width="2"/>
      <circle cx="8" cy="56" r="3"/>
      <circle cx="56" cy="8" r="3"/>
      <circle cx="12" cy="48" r="2"/>
      <circle cx="48" cy="12" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // COMPOSITES
  // ===========================================================================
  {
    id: 'mat-fiber-composite',
    name: 'Fiber Reinforced Composite',
    domain: 'engineering',
    category: 'composites',
    tags: ['composite', 'fiber', 'reinforced', 'matrix', 'CFRP', 'GFRP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <line x1="12" y1="24" x2="52" y2="24"/>
      <line x1="12" y1="32" x2="52" y2="32"/>
      <line x1="12" y1="40" x2="52" y2="40"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <circle cx="48" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-laminate',
    name: 'Laminate Structure',
    domain: 'engineering',
    category: 'composites',
    tags: ['laminate', 'layers', 'ply', 'stacking', 'composite'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12h48v8H8z" fill="currentColor" opacity="0.3"/>
      <path d="M8 20h48v8H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 28h48v8H8z" fill="currentColor" opacity="0.3"/>
      <path d="M8 36h48v8H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 44h48v8H8z" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="12" width="48" height="40"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="28" x2="56" y2="28"/>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
    </svg>`
  },
  {
    id: 'mat-particle-reinforced',
    name: 'Particle Reinforced',
    domain: 'engineering',
    category: 'composites',
    tags: ['particle', 'reinforced', 'dispersion', 'MMC', 'filler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="20" cy="20" r="4" fill="currentColor"/>
      <circle cx="44" cy="16" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
      <circle cx="16" cy="40" r="3" fill="currentColor"/>
      <circle cx="40" cy="44" r="4" fill="currentColor"/>
      <circle cx="28" cy="48" r="2" fill="currentColor"/>
      <circle cx="52" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-sandwich-panel',
    name: 'Sandwich Panel',
    domain: 'engineering',
    category: 'composites',
    tags: ['sandwich', 'core', 'honeycomb', 'foam', 'lightweight'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8"/>
      <rect x="8" y="48" width="48" height="8"/>
      <path d="M12 16l6 16-6 16"/>
      <path d="M24 16l6 16-6 16"/>
      <path d="M36 16l6 16-6 16"/>
      <path d="M48 16l6 16-6 16"/>
      <path d="M18 16l-6 16 6 16"/>
      <path d="M30 16l-6 16 6 16"/>
      <path d="M42 16l-6 16 6 16"/>
    </svg>`
  },

  // ===========================================================================
  // CERAMICS
  // ===========================================================================
  {
    id: 'mat-crystal-lattice',
    name: 'Crystal Lattice',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['crystal', 'lattice', 'unit cell', 'crystalline', 'structure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="4" fill="currentColor"/>
      <circle cx="48" cy="16" r="4" fill="currentColor"/>
      <circle cx="16" cy="48" r="4" fill="currentColor"/>
      <circle cx="48" cy="48" r="4" fill="currentColor"/>
      <circle cx="32" cy="32" r="4"/>
      <line x1="16" y1="16" x2="48" y2="16"/>
      <line x1="16" y1="48" x2="48" y2="48"/>
      <line x1="16" y1="16" x2="16" y2="48"/>
      <line x1="48" y1="16" x2="48" y2="48"/>
      <line x1="16" y1="16" x2="32" y2="32"/>
      <line x1="48" y1="16" x2="32" y2="32"/>
      <line x1="16" y1="48" x2="32" y2="32"/>
      <line x1="48" y1="48" x2="32" y2="32"/>
    </svg>`
  },
  {
    id: 'mat-glass',
    name: 'Amorphous Glass',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['glass', 'amorphous', 'vitreous', 'silica', 'transparent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24l8 48H12L20 8z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24l8 48H12L20 8z"/>
      <path d="M16 32l8-4 8 6 8-4 8 2"/>
      <circle cx="24" cy="20" r="2"/>
      <circle cx="36" cy="24" r="2"/>
      <circle cx="28" cy="44" r="3"/>
      <circle cx="40" cy="40" r="2"/>
    </svg>`
  },
  {
    id: 'mat-ceramic-oxide',
    name: 'Ceramic Oxide',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['oxide', 'alumina', 'zirconia', 'ceramic', 'refractory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 56,24 56,48 32,56 8,48 8,24" fill="currentColor" opacity="0.2"/>
      <polygon points="32,8 56,24 56,48 32,56 8,48 8,24"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="8" y1="24" x2="56" y2="48"/>
      <line x1="56" y1="24" x2="8" y2="48"/>
      <circle cx="32" cy="32" r="4"/>
    </svg>`
  },
  {
    id: 'mat-piezoelectric',
    name: 'Piezoelectric Material',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['piezoelectric', 'PZT', 'transducer', 'sensor', 'actuator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="20" width="32" height="24"/>
      <line x1="16" y1="16" x2="48" y2="16"/>
      <line x1="16" y1="48" x2="48" y2="48"/>
      <path d="M24 28v8"/>
      <path d="M20 32h8"/>
      <path d="M36 28v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M4 28l4 4-4 4"/>
      <path d="M60 28l-4 4 4 4"/>
    </svg>`
  },

  // ===========================================================================
  // BIOMATERIALS
  // ===========================================================================
  {
    id: 'mat-scaffold',
    name: 'Tissue Scaffold',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['scaffold', 'tissue engineering', 'porous', 'biodegradable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="20" cy="20" r="4"/>
      <circle cx="36" cy="20" r="4"/>
      <circle cx="52" cy="20" r="4"/>
      <circle cx="12" cy="36" r="4"/>
      <circle cx="28" cy="36" r="4"/>
      <circle cx="44" cy="36" r="4"/>
      <circle cx="20" cy="52" r="4"/>
      <circle cx="36" cy="52" r="4"/>
      <circle cx="52" cy="52" r="4"/>
    </svg>`
  },
  {
    id: 'mat-implant',
    name: 'Medical Implant',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['implant', 'prosthetic', 'biocompatible', 'titanium', 'medical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <path d="M16 16c0 4 4 12 8 20s8 20 8 24"/>
      <path d="M48 16c0 4-4 12-8 20s-8 20-8 24"/>
      <circle cx="32" cy="60" r="4"/>
      <line x1="24" y1="28" x2="40" y2="28"/>
      <line x1="26" y1="40" x2="38" y2="40"/>
    </svg>`
  },
  {
    id: 'mat-hydrogel',
    name: 'Hydrogel',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['hydrogel', 'polymer', 'water', 'swelling', 'drug delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M16 24c4-4 12-4 16 0s12 4 16 0"/>
      <path d="M16 32c4-4 12-4 16 0s12 4 16 0"/>
      <path d="M16 40c4-4 12-4 16 0s12 4 16 0"/>
      <circle cx="24" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-bioactive-glass',
    name: 'Bioactive Glass',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['bioactive', 'glass', 'bone', 'regeneration', 'Bioglass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l8 24-8 24H24l-8-24 8-24z" fill="currentColor" opacity="0.15"/>
      <path d="M24 8h16l8 24-8 24H24l-8-24 8-24z"/>
      <circle cx="32" cy="28" r="4"/>
      <circle cx="24" cy="40" r="3"/>
      <circle cx="40" cy="40" r="3"/>
      <path d="M28 28l-4 12"/>
      <path d="M36 28l4 12"/>
    </svg>`
  },

  // ===========================================================================
  // CHARACTERIZATION
  // ===========================================================================
  {
    id: 'mat-electron-microscope',
    name: 'Electron Microscope',
    domain: 'engineering',
    category: 'characterization',
    tags: ['SEM', 'TEM', 'microscopy', 'electron', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="12" rx="2"/>
      <path d="M28 16v8"/>
      <path d="M36 16v8"/>
      <rect x="16" y="24" width="32" height="8"/>
      <path d="M24 32v8"/>
      <path d="M40 32v8"/>
      <rect x="12" y="40" width="40" height="8"/>
      <circle cx="32" cy="56" r="4"/>
      <path d="M28 48v4"/>
      <path d="M36 48v4"/>
    </svg>`
  },
  {
    id: 'mat-xrd',
    name: 'X-Ray Diffraction',
    domain: 'engineering',
    category: 'characterization',
    tags: ['XRD', 'diffraction', 'crystallography', 'phase', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32l24-24"/>
      <path d="M32 8l24 24"/>
      <path d="M8 32l24 24"/>
      <path d="M32 56l24-24"/>
      <rect x="24" y="24" width="16" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="16" height="16"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M4 28l4 4-4 4"/>
      <path d="M60 28l-4 4 4 4"/>
    </svg>`
  },
  {
    id: 'mat-tensile-test',
    name: 'Tensile Testing',
    domain: 'engineering',
    category: 'characterization',
    tags: ['tensile', 'strength', 'mechanical', 'testing', 'stress-strain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="8"/>
      <rect x="24" y="48" width="16" height="8"/>
      <path d="M28 16v8c-4 4-4 16 0 20v8"/>
      <path d="M36 16v8c4 4 4 16 0 20v8"/>
      <path d="M32 4v4"/>
      <path d="M32 56v4"/>
      <path d="M28 4l4-2 4 2"/>
      <path d="M28 60l4 2 4-2"/>
    </svg>`
  },
  {
    id: 'mat-hardness-test',
    name: 'Hardness Testing',
    domain: 'engineering',
    category: 'characterization',
    tags: ['hardness', 'indentation', 'Vickers', 'Rockwell', 'mechanical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="48" height="20" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="36" width="48" height="20"/>
      <path d="M32 8l-8 28h16L32 8z"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M24 40l8 8 8-8"/>
      <path d="M32 48v4"/>
    </svg>`
  },
  {
    id: 'mat-thermal-analysis',
    name: 'Thermal Analysis',
    domain: 'engineering',
    category: 'characterization',
    tags: ['DSC', 'TGA', 'thermal', 'calorimetry', 'phase transition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M16 48l8-16 8 8 8-24 8 16 8-8"/>
      <line x1="16" y1="48" x2="48" y2="48" stroke-dasharray="2 2"/>
      <line x1="16" y1="16" x2="16" y2="48"/>
      <text x="12" y="14" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="50" y="52" font-size="4" fill="currentColor" stroke="none">t</text>
    </svg>`
  },
  {
    id: 'mat-spectroscopy',
    name: 'Spectroscopy',
    domain: 'engineering',
    category: 'characterization',
    tags: ['spectroscopy', 'FTIR', 'Raman', 'spectrum', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M12 40l4-8 4 16 4-20 4 12 4-4 4 8 4-12 4 8 4-8"/>
      <line x1="12" y1="40" x2="52" y2="40" stroke-dasharray="2 1"/>
      <path d="M4 24l4 8"/>
      <path d="M4 32h4"/>
      <path d="M60 32h-4"/>
    </svg>`
  },
  {
    id: 'mat-afm',
    name: 'Atomic Force Microscopy',
    domain: 'engineering',
    category: 'characterization',
    tags: ['AFM', 'probe', 'surface', 'topography', 'nanoscale'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="8"/>
      <path d="M32 12v16"/>
      <path d="M28 28l4 8 4-8"/>
      <path d="M32 36v4"/>
      <path d="M8 48c4-4 8 4 12 0s8 4 12 0s8 4 12 0s8 4 12 0"/>
      <path d="M8 56c4-4 8 4 12 0s8 4 12 0s8 4 12 0s8 4 12 0"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
    </svg>`
  },
];

export default materialsScienceIcons;
