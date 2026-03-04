/**
 * Solid State Physics Icon Library
 * Comprehensive SVG icons for condensed matter and solid state physics
 *
 * Categories:
 * - Band Structure (energy bands, gaps, Fermi level)
 * - Semiconductors (p-n junction, transistors, doping)
 * - Superconductors (Cooper pairs, Meissner, BCS)
 * - Crystal Structure (lattices, unit cells, defects)
 * - Magnetic Materials (ferromagnetism, domains, spin)
 */

import type { IconDefinition } from './index';

export const solidstateIcons: IconDefinition[] = [
  // ===========================================================================
  // BAND STRUCTURE
  // ===========================================================================
  {
    id: 'ss-band-diagram',
    name: 'Energy Band Diagram',
    domain: 'physics',
    category: 'band-structure',
    tags: ['band', 'energy', 'conduction', 'valence', 'gap'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="12" fill="#3B82F6" opacity="0.2"/>
      <rect x="12" y="8" width="40" height="12"/>
      <rect x="12" y="44" width="40" height="12" fill="#22C55E" opacity="0.3"/>
      <rect x="12" y="44" width="40" height="12"/>
      <text x="20" y="16" font-size="5" fill="currentColor" stroke="none">Conduction</text>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">Valence</text>
      <path d="M8 32h48" stroke-dasharray="4 2"/>
      <text x="4" y="36" font-size="5" fill="currentColor" stroke="none">Ef</text>
      <path d="M32 20v24" stroke-dasharray="3 2"/>
      <text x="36" y="36" font-size="5" fill="currentColor" stroke="none">Eg</text>
    </svg>`
  },
  {
    id: 'ss-fermi-level',
    name: 'Fermi Level',
    domain: 'physics',
    category: 'band-structure',
    tags: ['Fermi', 'level', 'energy', 'electrons', 'distribution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="8" y2="12"/>
      <line x1="8" y1="48" x2="56" y2="48"/>
      <path d="M8 44c16 0 24-32 48-32"/>
      <line x1="8" y1="28" x2="56" y2="28" stroke-dasharray="4 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="52" y="58" font-size="5" fill="currentColor" stroke="none">f(E)</text>
      <text x="40" y="24" font-size="5" fill="currentColor" stroke="none">Ef</text>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ss-band-gap',
    name: 'Band Gap Types',
    domain: 'physics',
    category: 'band-structure',
    tags: ['band gap', 'direct', 'indirect', 'semiconductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="8" y2="8"/>
      <line x1="8" y1="52" x2="56" y2="52"/>
      <path d="M12 40c8 8 16 8 24 0s16-8 24 0"/>
      <path d="M12 24c8-8 16-8 24 0s16 8 24 0"/>
      <path d="M32 40v-16" stroke="#22C55E" stroke-width="2"/>
      <path d="M28 28l4-4 4 4" stroke="#22C55E"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="50" y="58" font-size="5" fill="currentColor" stroke="none">k</text>
      <text x="36" y="36" font-size="4" fill="#22C55E" stroke="none">direct</text>
    </svg>`
  },
  {
    id: 'ss-brillouin-zone',
    name: 'Brillouin Zone',
    domain: 'physics',
    category: 'band-structure',
    tags: ['Brillouin', 'zone', 'reciprocal', 'k-space', 'lattice'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,20 52,44 32,56 12,44 12,20" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 52,20 52,44 32,56 12,44 12,20"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M32 32l20-12"/>
      <path d="M32 32l-20 12"/>
      <text x="28" y="36" font-size="5" fill="currentColor" stroke="none">Γ</text>
      <text x="48" y="20" font-size="5" fill="currentColor" stroke="none">X</text>
      <text x="48" y="48" font-size="5" fill="currentColor" stroke="none">L</text>
    </svg>`
  },

  // ===========================================================================
  // SEMICONDUCTORS
  // ===========================================================================
  {
    id: 'ss-pn-junction',
    name: 'P-N Junction',
    domain: 'physics',
    category: 'semiconductors',
    tags: ['p-n junction', 'diode', 'depletion', 'semiconductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="24" height="24" fill="#EF4444" opacity="0.2"/>
      <rect x="32" y="20" width="24" height="24" fill="#3B82F6" opacity="0.2"/>
      <rect x="8" y="20" width="48" height="24"/>
      <line x1="32" y1="20" x2="32" y2="44"/>
      <text x="14" y="36" font-size="8" fill="currentColor" stroke="none">p</text>
      <text x="46" y="36" font-size="8" fill="currentColor" stroke="none">n</text>
      <circle cx="20" cy="28" r="2"/>
      <circle cx="24" cy="36" r="2"/>
      <circle cx="44" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2" fill="currentColor"/>
      <path d="M26 32h12" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'ss-transistor',
    name: 'MOSFET Transistor',
    domain: 'physics',
    category: 'semiconductors',
    tags: ['MOSFET', 'transistor', 'gate', 'FET', 'semiconductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="48" height="16" fill="#6B7280" opacity="0.2"/>
      <rect x="8" y="32" width="48" height="16"/>
      <rect x="16" y="24" width="12" height="8" fill="#EF4444" opacity="0.3"/>
      <rect x="36" y="24" width="12" height="8" fill="#EF4444" opacity="0.3"/>
      <rect x="24" y="12" width="16" height="8" fill="#F59E0B" opacity="0.3"/>
      <rect x="24" y="12" width="16" height="8"/>
      <path d="M32 12v-8"/>
      <path d="M22 24v-8"/>
      <path d="M42 24v-8"/>
      <line x1="24" y1="20" x2="40" y2="20"/>
      <text x="28" y="56" font-size="5" fill="currentColor" stroke="none">substrate</text>
      <text x="30" y="10" font-size="4" fill="currentColor" stroke="none">G</text>
      <text x="18" y="22" font-size="4" fill="currentColor" stroke="none">S</text>
      <text x="42" y="22" font-size="4" fill="currentColor" stroke="none">D</text>
    </svg>`
  },
  {
    id: 'ss-n-type',
    name: 'N-Type Semiconductor',
    domain: 'physics',
    category: 'semiconductors',
    tags: ['n-type', 'doping', 'donor', 'electrons', 'phosphorus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" fill="#3B82F6" opacity="0.1"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="24" cy="28" r="4" fill="currentColor"/>
      <circle cx="40" cy="28" r="4" fill="currentColor"/>
      <circle cx="32" cy="40" r="4" fill="currentColor"/>
      <circle cx="32" cy="24" r="3" fill="#EF4444" opacity="0.5"/>
      <path d="M32 24v4" stroke-dasharray="2 2"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">n-type</text>
      <text x="28" y="20" font-size="4" fill="currentColor" stroke="none">donor</text>
    </svg>`
  },
  {
    id: 'ss-p-type',
    name: 'P-Type Semiconductor',
    domain: 'physics',
    category: 'semiconductors',
    tags: ['p-type', 'doping', 'acceptor', 'holes', 'boron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" fill="#EF4444" opacity="0.1"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="24" cy="28" r="4"/>
      <circle cx="40" cy="28" r="4"/>
      <circle cx="32" cy="40" r="4"/>
      <circle cx="32" cy="28" r="3" fill="#3B82F6" opacity="0.5"/>
      <path d="M32 28l4 4" stroke-dasharray="2 2"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">p-type</text>
      <text x="24" y="24" font-size="4" fill="currentColor" stroke="none">acceptor</text>
    </svg>`
  },
  {
    id: 'ss-led',
    name: 'LED Emission',
    domain: 'physics',
    category: 'semiconductors',
    tags: ['LED', 'light emitting', 'recombination', 'photon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="28" width="24" height="16" fill="#22C55E" opacity="0.2"/>
      <rect x="20" y="28" width="24" height="16" rx="2"/>
      <line x1="32" y1="28" x2="32" y2="44"/>
      <path d="M32 20l-8 8"/>
      <path d="M32 20l8 8"/>
      <path d="M32 20l0 8"/>
      <path d="M40 12l4-4"/>
      <path d="M44 16l4-4"/>
      <path d="M48 12l4-4"/>
      <path d="M8 36h12"/>
      <path d="M44 36h12"/>
      <text x="22" y="40" font-size="5" fill="currentColor" stroke="none">p</text>
      <text x="38" y="40" font-size="5" fill="currentColor" stroke="none">n</text>
    </svg>`
  },

  // ===========================================================================
  // SUPERCONDUCTORS
  // ===========================================================================
  {
    id: 'ss-cooper-pair',
    name: 'Cooper Pair',
    domain: 'physics',
    category: 'superconductors',
    tags: ['Cooper pair', 'BCS', 'electrons', 'phonon', 'pairing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="24" cy="32" r="8"/>
      <circle cx="40" cy="32" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="40" cy="32" r="8"/>
      <path d="M32 24c4 4 4 12 0 16" stroke-dasharray="3 2"/>
      <path d="M32 24c-4 4-4 12 0 16" stroke-dasharray="3 2"/>
      <path d="M24 24v-8"/>
      <path d="M20 20l4-4 4 4"/>
      <path d="M40 40v8"/>
      <path d="M36 44l4 4 4-4"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">phonon mediated</text>
    </svg>`
  },
  {
    id: 'ss-meissner',
    name: 'Meissner Effect',
    domain: 'physics',
    category: 'superconductors',
    tags: ['Meissner', 'effect', 'magnetic', 'expulsion', 'superconductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#6B7280" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 16c8 0 8 8 16 8s8-8 16-8 8 8 16 8"/>
      <path d="M8 48c8 0 8-8 16-8s8 8 16 8 8-8 16-8"/>
      <path d="M8 24c4 0 4 4 8 4"/>
      <path d="M8 40c4 0 4-4 8-4"/>
      <path d="M48 24c4 0 4 4 8 4"/>
      <path d="M48 40c4 0 4-4 8-4"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">B=0</text>
    </svg>`
  },
  {
    id: 'ss-tc-curve',
    name: 'Critical Temperature',
    domain: 'physics',
    category: 'superconductors',
    tags: ['critical temperature', 'Tc', 'transition', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="48" x2="12" y2="12"/>
      <line x1="12" y1="48" x2="56" y2="48"/>
      <path d="M12 16h20c4 0 4 32 24 32"/>
      <line x1="32" y1="48" x2="32" y2="52" stroke-dasharray="2 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">R</text>
      <text x="52" y="58" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="28" y="58" font-size="5" fill="currentColor" stroke="none">Tc</text>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ss-type-ii',
    name: 'Type II Superconductor',
    domain: 'physics',
    category: 'superconductors',
    tags: ['type II', 'vortices', 'mixed state', 'flux'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" fill="#6B7280" opacity="0.2"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="24" cy="28" r="4" stroke-dasharray="2 2"/>
      <circle cx="40" cy="28" r="4" stroke-dasharray="2 2"/>
      <circle cx="32" cy="40" r="4" stroke-dasharray="2 2"/>
      <path d="M24 24v-8"/>
      <path d="M40 24v-8"/>
      <path d="M32 36v-8"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">flux vortices</text>
    </svg>`
  },

  // ===========================================================================
  // CRYSTAL STRUCTURE
  // ===========================================================================
  {
    id: 'ss-cubic-lattice',
    name: 'Simple Cubic Lattice',
    domain: 'physics',
    category: 'crystal',
    tags: ['cubic', 'lattice', 'simple', 'unit cell', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 44l20 0"/>
      <path d="M20 44l0-20"/>
      <path d="M20 44l-8 8"/>
      <path d="M40 44l0-20"/>
      <path d="M40 44l-8 8"/>
      <path d="M20 24l20 0"/>
      <path d="M20 24l-8 8"/>
      <path d="M40 24l-8 8"/>
      <path d="M12 52l20 0"/>
      <path d="M12 52l0-20"/>
      <path d="M32 52l0-20"/>
      <circle cx="20" cy="44" r="3" fill="currentColor"/>
      <circle cx="40" cy="44" r="3" fill="currentColor"/>
      <circle cx="20" cy="24" r="3" fill="currentColor"/>
      <circle cx="40" cy="24" r="3" fill="currentColor"/>
      <circle cx="12" cy="52" r="3" fill="currentColor"/>
      <circle cx="32" cy="52" r="3" fill="currentColor"/>
      <circle cx="12" cy="32" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ss-bcc-lattice',
    name: 'BCC Lattice',
    domain: 'physics',
    category: 'crystal',
    tags: ['BCC', 'body centered', 'cubic', 'lattice', 'iron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 44l24 0"/>
      <path d="M16 44l0-20"/>
      <path d="M16 44l-8 8"/>
      <path d="M40 44l0-20"/>
      <path d="M40 44l-8 8"/>
      <path d="M16 24l24 0"/>
      <path d="M16 24l-8 8"/>
      <path d="M40 24l-8 8"/>
      <path d="M8 52l24 0"/>
      <path d="M8 52l0-20"/>
      <path d="M32 52l0-20"/>
      <circle cx="16" cy="44" r="2" fill="currentColor"/>
      <circle cx="40" cy="44" r="2" fill="currentColor"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="52" r="2" fill="currentColor"/>
      <circle cx="32" cy="52" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="24" cy="38" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'ss-fcc-lattice',
    name: 'FCC Lattice',
    domain: 'physics',
    category: 'crystal',
    tags: ['FCC', 'face centered', 'cubic', 'lattice', 'copper'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 44l24 0"/>
      <path d="M16 44l0-20"/>
      <path d="M16 44l-8 8"/>
      <path d="M40 44l0-20"/>
      <path d="M40 44l-8 8"/>
      <path d="M16 24l24 0"/>
      <path d="M8 52l24 0"/>
      <path d="M8 52l0-20"/>
      <path d="M32 52l0-20"/>
      <circle cx="16" cy="44" r="2" fill="currentColor"/>
      <circle cx="40" cy="44" r="2" fill="currentColor"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
      <circle cx="28" cy="44" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="16" cy="34" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="40" cy="34" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="28" cy="24" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="20" cy="48" r="3" fill="#22C55E" opacity="0.5"/>
      <circle cx="12" cy="42" r="3" fill="#22C55E" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'ss-defect',
    name: 'Crystal Defect',
    domain: 'physics',
    category: 'crystal',
    tags: ['defect', 'vacancy', 'interstitial', 'dislocation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="3" fill="currentColor"/>
      <circle cx="28" cy="16" r="3" fill="currentColor"/>
      <circle cx="44" cy="16" r="3" fill="currentColor"/>
      <circle cx="12" cy="32" r="3" fill="currentColor"/>
      <circle cx="28" cy="32" r="3" stroke-dasharray="2 2"/>
      <circle cx="44" cy="32" r="3" fill="currentColor"/>
      <circle cx="12" cy="48" r="3" fill="currentColor"/>
      <circle cx="28" cy="48" r="3" fill="currentColor"/>
      <circle cx="44" cy="48" r="3" fill="currentColor"/>
      <circle cx="36" cy="24" r="2" fill="#EF4444"/>
      <text x="48" y="32" font-size="4" fill="currentColor" stroke="none">vacancy</text>
      <text x="40" y="24" font-size="4" fill="#EF4444" stroke="none">interstit.</text>
    </svg>`
  },

  // ===========================================================================
  // MAGNETIC MATERIALS
  // ===========================================================================
  {
    id: 'ss-ferromagnet',
    name: 'Ferromagnetic Domains',
    domain: 'physics',
    category: 'magnetic',
    tags: ['ferromagnet', 'domains', 'magnetization', 'alignment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <line x1="24" y1="16" x2="24" y2="48"/>
      <line x1="40" y1="16" x2="40" y2="48"/>
      <path d="M12 28l4-4 4 4"/>
      <path d="M12 36l4-4 4 4"/>
      <path d="M28 28l4 4 4-4"/>
      <path d="M28 36l4 4 4-4"/>
      <path d="M44 28l4-4 4 4"/>
      <path d="M44 36l4-4 4 4"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">domains</text>
    </svg>`
  },
  {
    id: 'ss-hysteresis',
    name: 'Magnetic Hysteresis',
    domain: 'physics',
    category: 'magnetic',
    tags: ['hysteresis', 'loop', 'coercivity', 'remanence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M12 32c4-16 12-20 20-20s12 8 16 20c-4 16-12 20-20 20s-12-8-16-20z"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
      <circle cx="32" cy="52" r="2" fill="currentColor"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">M</text>
      <text x="52" y="28" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="34" y="12" font-size="4" fill="currentColor" stroke="none">Mr</text>
    </svg>`
  },
  {
    id: 'ss-antiferromagnet',
    name: 'Antiferromagnet',
    domain: 'physics',
    category: 'magnetic',
    tags: ['antiferromagnet', 'alternating', 'spins', 'Neel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="4"/>
      <circle cx="32" cy="20" r="4"/>
      <circle cx="48" cy="20" r="4"/>
      <circle cx="16" cy="36" r="4"/>
      <circle cx="32" cy="36" r="4"/>
      <circle cx="48" cy="36" r="4"/>
      <path d="M16 12v4"/>
      <path d="M14 14l2-2 2 2"/>
      <path d="M32 24v4"/>
      <path d="M30 26l2 2 2-2"/>
      <path d="M48 12v4"/>
      <path d="M46 14l2-2 2 2"/>
      <path d="M16 40v4"/>
      <path d="M14 42l2 2 2-2"/>
      <path d="M32 28v4"/>
      <path d="M30 30l2-2 2 2"/>
      <path d="M48 40v4"/>
      <path d="M46 42l2 2 2-2"/>
    </svg>`
  },
  {
    id: 'ss-spin-wave',
    name: 'Spin Wave (Magnon)',
    domain: 'physics',
    category: 'magnetic',
    tags: ['spin wave', 'magnon', 'excitation', 'collective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="3"/>
      <circle cx="24" cy="32" r="3"/>
      <circle cx="36" cy="32" r="3"/>
      <circle cx="48" cy="32" r="3"/>
      <path d="M12 24v4"/>
      <path d="M10 26l2-2 2 2"/>
      <path d="M24 20v4"/>
      <path d="M22 22l2-2 2 2"/>
      <path d="M36 24v4"/>
      <path d="M34 26l2-2 2 2"/>
      <path d="M48 28v4"/>
      <path d="M46 30l2-2 2 2"/>
      <path d="M8 20c8-8 16 0 24-8s16 0 24-8" stroke-dasharray="3 2"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">magnon</text>
    </svg>`
  },
  {
    id: 'ss-curie-temp',
    name: 'Curie Temperature',
    domain: 'physics',
    category: 'magnetic',
    tags: ['Curie', 'temperature', 'transition', 'paramagnetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="48" x2="12" y2="12"/>
      <line x1="12" y1="48" x2="56" y2="48"/>
      <path d="M12 16c20 0 24 28 44 28"/>
      <line x1="36" y1="44" x2="36" y2="52" stroke-dasharray="2 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">M</text>
      <text x="52" y="58" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="32" y="58" font-size="5" fill="currentColor" stroke="none">Tc</text>
      <text x="16" y="24" font-size="4" fill="currentColor" stroke="none">ferro</text>
      <text x="40" y="40" font-size="4" fill="currentColor" stroke="none">para</text>
    </svg>`
  },
];

export default solidstateIcons;
