/**
 * Nuclear Physics Icon Library
 * Comprehensive SVG icons for nuclear physics and particle physics
 *
 * Categories:
 * - Radioactive Decay (alpha, beta, gamma, half-life)
 * - Nuclear Fission (chain reaction, reactors, criticality)
 * - Nuclear Fusion (stellar, tokamak, binding energy)
 * - Reactors (components, cooling, control)
 * - Particles (quarks, leptons, bosons, hadrons)
 */

import type { IconDefinition } from './index';

export const nuclearIcons: IconDefinition[] = [
  // ===========================================================================
  // RADIOACTIVE DECAY
  // ===========================================================================
  {
    id: 'nuclear-radiation-symbol',
    name: 'Radiation Symbol',
    domain: 'physics',
    category: 'decay',
    tags: ['radiation', 'symbol', 'trefoil', 'hazard', 'radioactive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 24c-8-12-16-12-16 0 4 8 12 8 16 0z" fill="currentColor" opacity="0.7"/>
      <path d="M40 32c12-8 12-16 0-16-8 4-8 12 0 16z" fill="currentColor" opacity="0.7"/>
      <path d="M32 40c8 12 16 12 16 0-4-8-12-8-16 0z" fill="currentColor" opacity="0.7"/>
      <path d="M24 32c-12 8-12 16 0 16 8-4 8-12 0-16z" fill="currentColor" opacity="0.7"/>
      <path d="M24 24c-8-8-16-8-16 8 4 8 16 4 16-8z" fill="currentColor" opacity="0.7"/>
      <path d="M40 40c8 8 16 8 16-8-4-8-16-4-16 8z" fill="currentColor" opacity="0.7"/>
    </svg>`
  },
  {
    id: 'nuclear-alpha-decay',
    name: 'Alpha Decay',
    domain: 'physics',
    category: 'decay',
    tags: ['alpha', 'decay', 'helium', 'particle', 'emission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="32" r="16"/>
      <circle cx="52" cy="24" r="6" fill="#EF4444" opacity="0.3"/>
      <circle cx="52" cy="24" r="6" stroke="#EF4444"/>
      <path d="M40 28h8" stroke="#EF4444"/>
      <path d="M44 24l4 4-4 4" stroke="#EF4444"/>
      <text x="48" y="20" font-size="6" fill="#EF4444" stroke="none">alpha</text>
      <text x="18" y="36" font-size="8" fill="currentColor" stroke="none">X</text>
      <text x="8" y="28" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="8" y="40" font-size="5" fill="currentColor" stroke="none">Z</text>
    </svg>`
  },
  {
    id: 'nuclear-beta-decay',
    name: 'Beta Decay',
    domain: 'physics',
    category: 'decay',
    tags: ['beta', 'decay', 'electron', 'positron', 'neutrino'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="32" r="16"/>
      <circle cx="52" cy="24" r="3" fill="#3B82F6"/>
      <circle cx="52" cy="40" r="3"/>
      <path d="M40 28l8-4" stroke="#3B82F6"/>
      <path d="M40 36l8 4" stroke-dasharray="3 2"/>
      <text x="48" y="20" font-size="5" fill="#3B82F6" stroke="none">e-</text>
      <text x="48" y="48" font-size="5" fill="currentColor" stroke="none">nu</text>
      <text x="18" y="36" font-size="8" fill="currentColor" stroke="none">X</text>
    </svg>`
  },
  {
    id: 'nuclear-gamma-decay',
    name: 'Gamma Decay',
    domain: 'physics',
    category: 'decay',
    tags: ['gamma', 'decay', 'photon', 'electromagnetic', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="32" r="16"/>
      <path d="M40 32c4-8 8-8 12 0s8 8 12 0" stroke="#8B5CF6" stroke-width="2"/>
      <text x="50" y="24" font-size="8" fill="#8B5CF6" stroke="none">gamma</text>
      <text x="18" y="36" font-size="8" fill="currentColor" stroke="none">X*</text>
      <circle cx="24" cy="32" r="20" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'nuclear-half-life',
    name: 'Half-Life Curve',
    domain: 'physics',
    category: 'decay',
    tags: ['half-life', 'decay curve', 'exponential', 'activity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="52" x2="12" y2="12"/>
      <line x1="12" y1="52" x2="56" y2="52"/>
      <path d="M12 16c12 0 20 16 44 32"/>
      <line x1="12" y1="34" x2="24" y2="34" stroke-dasharray="3 2"/>
      <line x1="24" y1="34" x2="24" y2="52" stroke-dasharray="3 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">N0</text>
      <text x="4" y="36" font-size="5" fill="currentColor" stroke="none">N0/2</text>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">t1/2</text>
      <text x="48" y="60" font-size="5" fill="currentColor" stroke="none">t</text>
    </svg>`
  },

  // ===========================================================================
  // NUCLEAR FISSION
  // ===========================================================================
  {
    id: 'nuclear-fission',
    name: 'Nuclear Fission',
    domain: 'physics',
    category: 'fission',
    tags: ['fission', 'split', 'uranium', 'plutonium', 'energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="32" r="10"/>
      <circle cx="4" cy="32" r="2" fill="#3B82F6"/>
      <path d="M6 32h10" stroke="#3B82F6"/>
      <circle cx="44" cy="20" r="6" fill="#EF4444" opacity="0.3"/>
      <circle cx="44" cy="44" r="6" fill="#22C55E" opacity="0.3"/>
      <circle cx="44" cy="20" r="6"/>
      <circle cx="44" cy="44" r="6"/>
      <path d="M26 28l12-8"/>
      <path d="M26 36l12 8"/>
      <circle cx="54" cy="16" r="2" fill="#3B82F6"/>
      <circle cx="58" cy="24" r="2" fill="#3B82F6"/>
      <circle cx="54" cy="48" r="2" fill="#3B82F6"/>
      <path d="M32 32c4-4 8-4 12 0" stroke="#F59E0B"/>
    </svg>`
  },
  {
    id: 'nuclear-chain-reaction',
    name: 'Chain Reaction',
    domain: 'physics',
    category: 'fission',
    tags: ['chain reaction', 'multiplication', 'criticality', 'neutrons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="6"/>
      <circle cx="32" cy="20" r="5"/>
      <circle cx="32" cy="44" r="5"/>
      <circle cx="52" cy="12" r="4"/>
      <circle cx="52" cy="28" r="4"/>
      <circle cx="52" cy="40" r="4"/>
      <circle cx="52" cy="52" r="4"/>
      <path d="M18 32l8-8"/>
      <path d="M18 32l8 8"/>
      <path d="M37 20l10-8"/>
      <path d="M37 20l10 4"/>
      <path d="M37 44l10-4"/>
      <path d="M37 44l10 8"/>
      <circle cx="4" cy="32" r="2" fill="#3B82F6"/>
      <path d="M6 32h6" stroke="#3B82F6"/>
    </svg>`
  },
  {
    id: 'nuclear-criticality',
    name: 'Criticality',
    domain: 'physics',
    category: 'fission',
    tags: ['criticality', 'k factor', 'multiplication', 'sustained'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.5"/>
      <path d="M32 12v-8"/>
      <path d="M32 60v-8"/>
      <path d="M12 32h-8"/>
      <path d="M60 32h-8"/>
      <text x="4" y="60" font-size="6" fill="currentColor" stroke="none">k=1</text>
      <circle cx="24" cy="24" r="2" fill="#3B82F6"/>
      <circle cx="40" cy="24" r="2" fill="#3B82F6"/>
      <circle cx="24" cy="40" r="2" fill="#3B82F6"/>
      <circle cx="40" cy="40" r="2" fill="#3B82F6"/>
    </svg>`
  },
  {
    id: 'nuclear-control-rod',
    name: 'Control Rod',
    domain: 'physics',
    category: 'fission',
    tags: ['control rod', 'absorption', 'reactor control', 'boron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="40" rx="2" fill="#6B7280" opacity="0.5"/>
      <rect x="24" y="4" width="16" height="40" rx="2"/>
      <rect x="20" y="44" width="24" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="44" width="24" height="16" rx="2"/>
      <path d="M20 48h24"/>
      <path d="M20 52h24"/>
      <path d="M20 56h24"/>
      <path d="M32 4v-2"/>
      <path d="M28 2h8"/>
      <circle cx="28" cy="52" r="1" fill="#3B82F6"/>
      <circle cx="36" cy="48" r="1" fill="#3B82F6"/>
      <circle cx="32" cy="56" r="1" fill="#3B82F6"/>
    </svg>`
  },

  // ===========================================================================
  // NUCLEAR FUSION
  // ===========================================================================
  {
    id: 'nuclear-fusion',
    name: 'Nuclear Fusion',
    domain: 'physics',
    category: 'fusion',
    tags: ['fusion', 'hydrogen', 'deuterium', 'tritium', 'helium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="28" r="6" fill="#3B82F6" opacity="0.3"/>
      <circle cx="16" cy="28" r="6"/>
      <circle cx="16" cy="40" r="6" fill="#EF4444" opacity="0.3"/>
      <circle cx="16" cy="40" r="6"/>
      <path d="M22 28l8 4"/>
      <path d="M22 40l8-4"/>
      <circle cx="40" cy="32" r="10" fill="#22C55E" opacity="0.3"/>
      <circle cx="40" cy="32" r="10"/>
      <circle cx="56" cy="24" r="2" fill="#3B82F6"/>
      <path d="M50 28l6-4" stroke="#3B82F6"/>
      <path d="M32 32c4-4 8-4 12 0" stroke="#F59E0B" stroke-width="2"/>
      <text x="12" y="32" font-size="5" fill="currentColor" stroke="none">D</text>
      <text x="12" y="44" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="36" y="36" font-size="5" fill="currentColor" stroke="none">He</text>
    </svg>`
  },
  {
    id: 'nuclear-tokamak',
    name: 'Tokamak Reactor',
    domain: 'physics',
    category: 'fusion',
    tags: ['tokamak', 'magnetic confinement', 'plasma', 'fusion reactor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="#EF4444" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <path d="M16 32c0-8 16-8 16 0s16 8 16 0" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M8 20l48 24"/>
      <path d="M8 44l48-24"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">plasma</text>
    </svg>`
  },
  {
    id: 'nuclear-stellar-fusion',
    name: 'Stellar Fusion',
    domain: 'physics',
    category: 'fusion',
    tags: ['stellar', 'sun', 'proton-proton', 'CNO cycle', 'stars'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#F59E0B" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="#EF4444" opacity="0.5"/>
      <path d="M32 8v-4"/>
      <path d="M32 60v-4"/>
      <path d="M8 32h-4"/>
      <path d="M60 32h-4"/>
      <path d="M48 16l3-3"/>
      <path d="M16 48l-3 3"/>
      <path d="M48 48l3 3"/>
      <path d="M16 16l-3-3"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">core</text>
    </svg>`
  },
  {
    id: 'nuclear-binding-energy',
    name: 'Binding Energy Curve',
    domain: 'physics',
    category: 'fusion',
    tags: ['binding energy', 'mass defect', 'stability', 'iron peak'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="52" x2="12" y2="12"/>
      <line x1="12" y1="52" x2="56" y2="52"/>
      <path d="M12 48c8-24 16-32 24-32s12 4 16 8"/>
      <circle cx="36" cy="16" r="2" fill="currentColor"/>
      <line x1="12" y1="16" x2="36" y2="16" stroke-dasharray="3 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">B/A</text>
      <text x="50" y="60" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="32" y="12" font-size="5" fill="currentColor" stroke="none">Fe</text>
    </svg>`
  },

  // ===========================================================================
  // REACTORS
  // ===========================================================================
  {
    id: 'nuclear-reactor-core',
    name: 'Reactor Core',
    domain: 'physics',
    category: 'reactors',
    tags: ['reactor', 'core', 'fuel rods', 'moderator', 'fission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <line x1="20" y1="12" x2="20" y2="52" stroke="#EF4444"/>
      <line x1="28" y1="12" x2="28" y2="52" stroke="#6B7280"/>
      <line x1="36" y1="12" x2="36" y2="52" stroke="#EF4444"/>
      <line x1="44" y1="12" x2="44" y2="52" stroke="#6B7280"/>
      <rect x="16" y="16" width="32" height="32" fill="#3B82F6" opacity="0.1"/>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">fuel</text>
      <text x="36" y="60" font-size="5" fill="currentColor" stroke="none">ctrl</text>
    </svg>`
  },
  {
    id: 'nuclear-coolant-loop',
    name: 'Coolant Loop',
    domain: 'physics',
    category: 'reactors',
    tags: ['coolant', 'loop', 'heat exchanger', 'primary', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="16" height="16" rx="2" fill="#EF4444" opacity="0.2"/>
      <rect x="8" y="24" width="16" height="16" rx="2"/>
      <rect x="40" y="24" width="16" height="16" rx="2"/>
      <path d="M24 28h16" stroke="#EF4444"/>
      <path d="M36 24l4 4-4 4" stroke="#EF4444"/>
      <path d="M24 36h16" stroke="#3B82F6"/>
      <path d="M28 40l-4-4 4-4" stroke="#3B82F6"/>
      <path d="M48 24v-8h-32v8"/>
      <path d="M48 40v8h-32v-8"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">reactor</text>
      <text x="40" y="56" font-size="5" fill="currentColor" stroke="none">exchanger</text>
    </svg>`
  },
  {
    id: 'nuclear-containment',
    name: 'Containment Building',
    domain: 'physics',
    category: 'reactors',
    tags: ['containment', 'building', 'safety', 'shielding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V32c0-12 16-24 16-24s16 12 16 24v24z"/>
      <ellipse cx="32" cy="56" rx="16" ry="4"/>
      <rect x="24" y="36" width="16" height="12" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-4 4-8 12-8 24"/>
      <path d="M32 8c4 4 8 12 8 24"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="#EF4444" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'nuclear-cooling-tower',
    name: 'Cooling Tower',
    domain: 'physics',
    category: 'reactors',
    tags: ['cooling tower', 'heat rejection', 'steam', 'condensation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56c0-16 8-24 8-40h16c0 16 8 24 8 40z"/>
      <ellipse cx="32" cy="56" rx="16" ry="4"/>
      <ellipse cx="32" cy="16" rx="8" ry="2"/>
      <path d="M28 8c0-4 8-4 8 0" stroke="#9CA3AF"/>
      <path d="M24 4c0-4 16-4 16 0" stroke="#9CA3AF"/>
      <path d="M32 12v4"/>
      <path d="M28 14l4 4 4-4"/>
    </svg>`
  },

  // ===========================================================================
  // PARTICLES
  // ===========================================================================
  {
    id: 'nuclear-proton',
    name: 'Proton',
    domain: 'physics',
    category: 'particles',
    tags: ['proton', 'nucleon', 'positive', 'hydrogen', 'baryon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">p+</text>
      <circle cx="24" cy="28" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="40" cy="28" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="32" cy="40" r="4" fill="#3B82F6" opacity="0.5"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">uud quarks</text>
    </svg>`
  },
  {
    id: 'nuclear-neutron',
    name: 'Neutron',
    domain: 'physics',
    category: 'particles',
    tags: ['neutron', 'nucleon', 'neutral', 'baryon', 'decay'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#6B7280" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">n0</text>
      <circle cx="24" cy="28" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="40" cy="28" r="4" fill="#3B82F6" opacity="0.5"/>
      <circle cx="32" cy="40" r="4" fill="#3B82F6" opacity="0.5"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">udd quarks</text>
    </svg>`
  },
  {
    id: 'nuclear-electron',
    name: 'Electron',
    domain: 'physics',
    category: 'particles',
    tags: ['electron', 'lepton', 'negative', 'beta particle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="#3B82F6" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">e-</text>
      <ellipse cx="32" cy="32" rx="20" ry="8" stroke-dasharray="3 2"/>
      <circle cx="52" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'nuclear-neutrino',
    name: 'Neutrino',
    domain: 'physics',
    category: 'particles',
    tags: ['neutrino', 'lepton', 'weak force', 'oscillation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 2"/>
      <text x="26" y="38" font-size="12" fill="currentColor" stroke="none">nu</text>
      <path d="M8 32c4-4 8-4 12 0" stroke-dasharray="3 2"/>
      <path d="M44 32c4-4 8-4 12 0" stroke-dasharray="3 2"/>
      <path d="M32 8v8" stroke-dasharray="3 2"/>
      <path d="M32 48v8" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'nuclear-quark',
    name: 'Quark',
    domain: 'physics',
    category: 'particles',
    tags: ['quark', 'up', 'down', 'strange', 'charm', 'bottom', 'top'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="8" fill="#EF4444" opacity="0.3"/>
      <circle cx="44" cy="24" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="32" cy="44" r="8" fill="#22C55E" opacity="0.3"/>
      <circle cx="20" cy="24" r="8"/>
      <circle cx="44" cy="24" r="8"/>
      <circle cx="32" cy="44" r="8"/>
      <text x="17" y="28" font-size="8" fill="currentColor" stroke="none">u</text>
      <text x="41" y="28" font-size="8" fill="currentColor" stroke="none">d</text>
      <text x="29" y="48" font-size="8" fill="currentColor" stroke="none">s</text>
      <path d="M28 24h8" stroke-dasharray="3 2"/>
      <path d="M24 32l4 8"/>
      <path d="M40 32l-4 8"/>
    </svg>`
  },
  {
    id: 'nuclear-atom-model',
    name: 'Bohr Atom Model',
    domain: 'physics',
    category: 'particles',
    tags: ['atom', 'Bohr model', 'electron orbits', 'nucleus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="8"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="8" ry="20" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="16" ry="16" transform="rotate(45 32 32)" stroke-dasharray="3 2"/>
      <circle cx="52" cy="32" r="2" fill="#3B82F6"/>
      <circle cx="32" cy="12" r="2" fill="#3B82F6"/>
      <circle cx="20" cy="44" r="2" fill="#3B82F6"/>
    </svg>`
  },
];

export default nuclearIcons;
