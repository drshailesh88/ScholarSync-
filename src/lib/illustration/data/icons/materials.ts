/**
 * Materials Engineering Icon Library
 * Comprehensive SVG icons for materials science and engineering
 *
 * Categories:
 * - Crystal Structures (lattices, unit cells, planes)
 * - Metals & Alloys (steel, aluminum, titanium)
 * - Polymers (chains, cross-linking, thermoplastics)
 * - Ceramics (oxides, glasses, refractories)
 * - Composites (fibers, matrix, laminates)
 * - Testing & Characterization (tensile, hardness, microscopy)
 */

import type { IconDefinition } from './index';

export const materialsIcons: IconDefinition[] = [
  // ===========================================================================
  // CRYSTAL STRUCTURES
  // ===========================================================================
  {
    id: 'mat-crystal-bcc',
    name: 'BCC Crystal Structure',
    domain: 'engineering',
    category: 'crystal-structures',
    tags: ['BCC', 'body-centered', 'cubic', 'crystal', 'iron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20h32l-8 24H8z"/>
      <path d="M16 20l8-12h32l-8 12"/>
      <path d="M48 8v24"/>
      <path d="M40 44v-24l8-12"/>
      <circle cx="16" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="8" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="56" cy="8" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="56" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="26" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-crystal-fcc',
    name: 'FCC Crystal Structure',
    domain: 'engineering',
    category: 'crystal-structures',
    tags: ['FCC', 'face-centered', 'cubic', 'crystal', 'aluminum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20h32l-8 24H8z"/>
      <path d="M16 20l8-12h32l-8 12"/>
      <path d="M48 8v24"/>
      <path d="M40 44v-24l8-12"/>
      <circle cx="16" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="8" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="56" cy="8" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="20" r="3" fill="currentColor"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <circle cx="40" cy="14" r="3" fill="currentColor"/>
      <circle cx="52" cy="20" r="3" fill="currentColor"/>
      <circle cx="28" cy="44" r="3" fill="currentColor"/>
      <circle cx="48" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-crystal-hcp',
    name: 'HCP Crystal Structure',
    domain: 'engineering',
    category: 'crystal-structures',
    tags: ['HCP', 'hexagonal', 'close-packed', 'crystal', 'titanium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,16 52,32 32,40 12,32 12,16"/>
      <polygon points="32,24 52,32 52,48 32,56 12,48 12,32"/>
      <circle cx="32" cy="8" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="52" cy="16" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="52" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="16" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="24" r="4" fill="currentColor"/>
      <circle cx="22" cy="28" r="3" fill="currentColor" opacity="0.7"/>
      <circle cx="42" cy="28" r="3" fill="currentColor" opacity="0.7"/>
      <circle cx="32" cy="56" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'mat-unit-cell',
    name: 'Unit Cell',
    domain: 'engineering',
    category: 'crystal-structures',
    tags: ['unit cell', 'lattice', 'parameter', 'crystal', 'primitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24h32v24H12z"/>
      <path d="M12 24l8-12h32l-8 12"/>
      <path d="M44 24v24l8-12v-24"/>
      <path d="M12 24l8-12"/>
      <path d="M44 48l8-12"/>
      <text x="28" y="40" font-size="6" fill="currentColor" stroke="none">a</text>
      <text x="48" y="32" font-size="6" fill="currentColor" stroke="none">b</text>
      <text x="20" y="16" font-size="6" fill="currentColor" stroke="none">c</text>
    </svg>`
  },
  {
    id: 'mat-grain-boundary',
    name: 'Grain Boundary',
    domain: 'engineering',
    category: 'crystal-structures',
    tags: ['grain', 'boundary', 'polycrystal', 'interface', 'microstructure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c16-8 16 8 24 0s24-8 24 0"/>
      <path d="M32 8v20"/>
      <path d="M32 36v20"/>
      <path d="M20 16l8 8-8 8"/>
      <path d="M44 16l-8 8 8 8"/>
      <path d="M20 40l8-8-8-8"/>
      <path d="M44 40l-8-8 8-8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // METALS & ALLOYS
  // ===========================================================================
  {
    id: 'mat-steel-beam',
    name: 'Steel Section',
    domain: 'engineering',
    category: 'metals',
    tags: ['steel', 'section', 'I-beam', 'structural', 'metal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12h32v8H16z" fill="currentColor" opacity="0.2"/>
      <path d="M28 20h8v24h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M16 44h32v8H16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 12h32v8H16z"/>
      <path d="M28 20h8v24h-8z"/>
      <path d="M16 44h32v8H16z"/>
    </svg>`
  },
  {
    id: 'mat-phase-diagram',
    name: 'Phase Diagram',
    domain: 'engineering',
    category: 'metals',
    tags: ['phase', 'diagram', 'equilibrium', 'alloy', 'binary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M8 16c16 0 20 20 24 24s12 8 24 8"/>
      <path d="M8 24c8 4 12 16 16 20s20 4 32 4"/>
      <text x="28" y="24" font-size="6" fill="currentColor" stroke="none">L</text>
      <text x="20" y="44" font-size="6" fill="currentColor" stroke="none">a</text>
      <text x="44" y="44" font-size="6" fill="currentColor" stroke="none">b</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">%B</text>
    </svg>`
  },
  {
    id: 'mat-heat-treatment',
    name: 'Heat Treatment Curve',
    domain: 'engineering',
    category: 'metals',
    tags: ['heat treatment', 'TTT', 'CCT', 'quench', 'temper'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 12h8v4h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M12 12h8v4"/>
      <path d="M20 16v24"/>
      <path d="M20 40h20"/>
      <path d="M40 40v8"/>
      <path d="M40 48h12"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="14" y="24" font-size="4" fill="currentColor" stroke="none">Q</text>
    </svg>`
  },
  {
    id: 'mat-dislocation',
    name: 'Dislocation',
    domain: 'engineering',
    category: 'metals',
    tags: ['dislocation', 'edge', 'defect', 'slip', 'deformation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M8 24h48"/>
      <path d="M8 32h20"/>
      <path d="M36 32h20"/>
      <path d="M8 40h48"/>
      <path d="M8 48h48"/>
      <path d="M28 24v8"/>
      <path d="M36 32v8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M32 28l4 4-4 4"/>
      <text x="40" y="20" font-size="5" fill="currentColor" stroke="none">b</text>
    </svg>`
  },
  {
    id: 'mat-precipitation',
    name: 'Precipitation',
    domain: 'engineering',
    category: 'metals',
    tags: ['precipitation', 'hardening', 'aging', 'particles', 'strengthening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="16" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="24" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="36" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="44" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="48" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="36" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },

  // ===========================================================================
  // POLYMERS
  // ===========================================================================
  {
    id: 'mat-polymer-chain',
    name: 'Polymer Chain',
    domain: 'engineering',
    category: 'polymers',
    tags: ['polymer', 'chain', 'molecule', 'backbone', 'linear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="56" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M12 32l4-4"/>
      <path d="M24 24l4 4"/>
      <path d="M36 32l4-4"/>
      <path d="M48 24l4 4"/>
    </svg>`
  },
  {
    id: 'mat-crosslink',
    name: 'Cross-Linked Polymer',
    domain: 'engineering',
    category: 'polymers',
    tags: ['crosslink', 'network', 'thermoset', 'vulcanization', 'rubber'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h48"/>
      <path d="M8 44h48"/>
      <path d="M16 20v24"/>
      <path d="M32 20v24"/>
      <path d="M48 20v24"/>
      <circle cx="16" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="44" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-crystalline-polymer',
    name: 'Semi-Crystalline Polymer',
    domain: 'engineering',
    category: 'polymers',
    tags: ['crystalline', 'amorphous', 'lamella', 'spherulite', 'polymer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <path d="M20 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M36 20h8v8h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M20 36h8v8h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M36 36h8v8h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M28 28c4 4 4 8 8 8"/>
      <path d="M36 28c-4 4-4 8-8 8"/>
      <text x="22" y="46" font-size="4" fill="currentColor" stroke="none">cryst</text>
    </svg>`
  },
  {
    id: 'mat-molecular-weight',
    name: 'Molecular Weight Distribution',
    domain: 'engineering',
    category: 'polymers',
    tags: ['molecular weight', 'distribution', 'Mn', 'Mw', 'PDI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52c4-4 8-32 20-40s16 0 24 4" fill="currentColor" opacity="0.1"/>
      <path d="M12 52c4-4 8-32 20-40s16 0 24 4"/>
      <path d="M32 12v44" stroke-dasharray="2 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">W</text>
      <text x="48" y="60" font-size="5" fill="currentColor" stroke="none">MW</text>
      <text x="28" y="60" font-size="4" fill="currentColor" stroke="none">Mn</text>
    </svg>`
  },
  {
    id: 'mat-copolymer',
    name: 'Block Copolymer',
    domain: 'engineering',
    category: 'polymers',
    tags: ['copolymer', 'block', 'graft', 'random', 'alternating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="blue" opacity="0.5"/>
      <circle cx="16" cy="32" r="4" fill="blue" opacity="0.5"/>
      <circle cx="24" cy="32" r="4" fill="blue" opacity="0.5"/>
      <circle cx="32" cy="32" r="4"/>
      <circle cx="40" cy="32" r="4" fill="red" opacity="0.5"/>
      <circle cx="48" cy="32" r="4" fill="red" opacity="0.5"/>
      <circle cx="56" cy="32" r="4" fill="red" opacity="0.5"/>
      <path d="M12 32h40"/>
      <text x="12" y="48" font-size="5" fill="currentColor" stroke="none">Block A</text>
      <text x="40" y="48" font-size="5" fill="currentColor" stroke="none">Block B</text>
    </svg>`
  },

  // ===========================================================================
  // CERAMICS
  // ===========================================================================
  {
    id: 'mat-ceramic-structure',
    name: 'Ceramic Crystal Structure',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['ceramic', 'ionic', 'crystal', 'oxide', 'structure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="blue" opacity="0.3"/>
      <circle cx="48" cy="16" r="6" fill="blue" opacity="0.3"/>
      <circle cx="16" cy="48" r="6" fill="blue" opacity="0.3"/>
      <circle cx="48" cy="48" r="6" fill="blue" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="red" opacity="0.5"/>
      <path d="M22 16h20"/>
      <path d="M22 48h20"/>
      <path d="M16 22v20"/>
      <path d="M48 22v20"/>
      <path d="M22 22l20 20"/>
      <path d="M42 22l-20 20"/>
      <text x="8" y="60" font-size="4" fill="blue" stroke="none">cation</text>
      <text x="40" y="60" font-size="4" fill="red" stroke="none">anion</text>
    </svg>`
  },
  {
    id: 'mat-glass-structure',
    name: 'Glass Network',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['glass', 'amorphous', 'network', 'silica', 'random'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 20l12-4"/>
      <path d="M40 16l8 8"/>
      <path d="M16 24l-4 12"/>
      <path d="M16 40l12-4"/>
      <path d="M36 36l8 8"/>
      <path d="M12 44l8 8"/>
      <path d="M28 52l16-8"/>
    </svg>`
  },
  {
    id: 'mat-sintering',
    name: 'Sintering Process',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['sintering', 'densification', 'powder', 'consolidation', 'ceramics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="6"/>
      <circle cx="32" cy="20" r="6"/>
      <circle cx="48" cy="20" r="6"/>
      <ellipse cx="24" cy="44" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="44" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <path d="M32 16v-8"/>
      <polygon points="32,4 28,10 36,10" fill="currentColor"/>
      <text x="4" y="44" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="52" y="44" font-size="4" fill="currentColor" stroke="none">P</text>
    </svg>`
  },
  {
    id: 'mat-porosity',
    name: 'Porosity',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['porosity', 'pores', 'voids', 'density', 'porous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="20" r="4"/>
      <circle cx="44" cy="16" r="3"/>
      <circle cx="16" cy="40" r="5"/>
      <circle cx="36" cy="32" r="6"/>
      <circle cx="48" cy="44" r="4"/>
      <circle cx="28" cy="48" r="3"/>
    </svg>`
  },
  {
    id: 'mat-refractory',
    name: 'Refractory Brick',
    domain: 'engineering',
    category: 'ceramics',
    tags: ['refractory', 'brick', 'high-temperature', 'insulation', 'kiln'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48v24H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 24l8-8h48l-8 8"/>
      <path d="M56 24v24l8-8V16"/>
      <path d="M8 48l8 8h48l-8-8"/>
      <path d="M8 24h48v24H8z"/>
      <path d="M24 24v24"/>
      <path d="M40 24v24"/>
      <path d="M8 36h48"/>
    </svg>`
  },

  // ===========================================================================
  // COMPOSITES
  // ===========================================================================
  {
    id: 'mat-fiber-composite',
    name: 'Fiber Composite',
    domain: 'engineering',
    category: 'composites',
    tags: ['fiber', 'composite', 'reinforcement', 'matrix', 'CFRP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M8 24h48" stroke-width="2"/>
      <path d="M8 32h48" stroke-width="2"/>
      <path d="M8 40h48" stroke-width="2"/>
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">fibers</text>
    </svg>`
  },
  {
    id: 'mat-laminate',
    name: 'Laminate Structure',
    domain: 'engineering',
    category: 'composites',
    tags: ['laminate', 'ply', 'layup', 'composite', 'orientation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16h40l-4 8H16z" fill="currentColor" opacity="0.2"/>
      <path d="M12 16h40l-4 8H16z"/>
      <path d="M16 24h32l-4 8H20z" fill="currentColor" opacity="0.3"/>
      <path d="M16 24h32l-4 8H20z"/>
      <path d="M20 32h24l-4 8H24z" fill="currentColor" opacity="0.2"/>
      <path d="M20 32h24l-4 8H24z"/>
      <path d="M24 40h16l-4 8H28z" fill="currentColor" opacity="0.3"/>
      <path d="M24 40h16l-4 8H28z"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="4" y="32" font-size="4" fill="currentColor" stroke="none">90</text>
      <text x="4" y="40" font-size="4" fill="currentColor" stroke="none">45</text>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">-45</text>
    </svg>`
  },
  {
    id: 'mat-particle-composite',
    name: 'Particle Reinforced',
    domain: 'engineering',
    category: 'composites',
    tags: ['particle', 'reinforced', 'composite', 'dispersion', 'metal matrix'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="16" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="28" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="36" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="44" cy="44" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="48" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'mat-sandwich',
    name: 'Sandwich Structure',
    domain: 'engineering',
    category: 'composites',
    tags: ['sandwich', 'honeycomb', 'core', 'lightweight', 'stiffness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="12" width="48" height="8"/>
      <rect x="8" y="44" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="44" width="48" height="8"/>
      <path d="M12 20l6 12-6 12"/>
      <path d="M24 20l6 12-6 12"/>
      <path d="M36 20l6 12-6 12"/>
      <path d="M48 20l6 12-6 12"/>
      <path d="M18 20l-6 12 6 12"/>
      <path d="M30 20l-6 12 6 12"/>
      <path d="M42 20l-6 12 6 12"/>
    </svg>`
  },
  {
    id: 'mat-interface',
    name: 'Fiber-Matrix Interface',
    domain: 'engineering',
    category: 'composites',
    tags: ['interface', 'bonding', 'fiber', 'matrix', 'adhesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="2 2"/>
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">interface</text>
    </svg>`
  },

  // ===========================================================================
  // TESTING & CHARACTERIZATION
  // ===========================================================================
  {
    id: 'mat-tensile-test',
    name: 'Tensile Test Specimen',
    domain: 'engineering',
    category: 'testing',
    tags: ['tensile', 'test', 'specimen', 'dogbone', 'mechanical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h8c4 0 8 4 8 8s-4 8-8 8h-8z"/>
      <path d="M56 24h-8c-4 0-8 4-8 8s4 8 8 8h8z"/>
      <rect x="24" y="28" width="16" height="8"/>
      <path d="M4 32h4"/>
      <path d="M56 32h4"/>
      <polygon points="4,32 8,28 8,36" fill="currentColor"/>
      <polygon points="60,32 56,28 56,36" fill="currentColor"/>
      <text x="28" y="44" font-size="5" fill="currentColor" stroke="none">F</text>
    </svg>`
  },
  {
    id: 'mat-stress-strain',
    name: 'Stress-Strain Curve',
    domain: 'engineering',
    category: 'testing',
    tags: ['stress', 'strain', 'curve', 'modulus', 'yield'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52l24-32c4 0 8 4 12 8"/>
      <path d="M36 20v36" stroke-dasharray="2 2"/>
      <circle cx="36" cy="20" r="2" fill="currentColor"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">s</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">e</text>
      <text x="38" y="18" font-size="4" fill="currentColor" stroke="none">yield</text>
    </svg>`
  },
  {
    id: 'mat-hardness',
    name: 'Hardness Test',
    domain: 'engineering',
    category: 'testing',
    tags: ['hardness', 'indentation', 'Vickers', 'Brinell', 'Rockwell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 28,24 36,24"/>
      <path d="M32 24v16"/>
      <rect x="8" y="40" width="48" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="40" width="48" height="16"/>
      <path d="M28 40l4 8 4-8"/>
      <path d="M24 44h16" stroke-dasharray="2 2"/>
      <text x="40" y="52" font-size="5" fill="currentColor" stroke="none">d</text>
    </svg>`
  },
  {
    id: 'mat-microscopy',
    name: 'Microscopy',
    domain: 'engineering',
    category: 'testing',
    tags: ['microscopy', 'SEM', 'TEM', 'optical', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M32 36v12"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <path d="M40 24h12"/>
      <path d="M32 12v-4"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.1"/>
      <circle cx="28" cy="22" r="1" fill="currentColor"/>
      <circle cx="34" cy="26" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mat-xrd',
    name: 'X-Ray Diffraction',
    domain: 'engineering',
    category: 'testing',
    tags: ['XRD', 'diffraction', 'crystallography', 'analysis', 'peaks'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V8"/>
      <path d="M8 56h48"/>
      <path d="M12 52v-8l4-24 4 24v8"/>
      <path d="M24 52v-4l4-16 4 16v4"/>
      <path d="M36 52v-6l4-20 4 20v6"/>
      <path d="M48 52v-3l4-10 4 10v3"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">I</text>
      <text x="48" y="60" font-size="5" fill="currentColor" stroke="none">2q</text>
    </svg>`
  }
];

export default materialsIcons;
