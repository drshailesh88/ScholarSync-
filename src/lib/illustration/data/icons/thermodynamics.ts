/**
 * Thermodynamics Icon Library
 * Comprehensive SVG icons for thermodynamics and statistical mechanics
 *
 * Categories:
 * - Heat Engines (Carnot, Otto, Diesel, Stirling)
 * - Thermodynamic Cycles (processes, PV diagrams)
 * - Entropy (disorder, microstates, irreversibility)
 * - Heat Transfer (conduction, convection, radiation)
 * - Phase Transitions (melting, boiling, sublimation)
 */

import type { IconDefinition } from './index';

export const thermodynamicsIcons: IconDefinition[] = [
  // ===========================================================================
  // HEAT ENGINES
  // ===========================================================================
  {
    id: 'thermo-carnot-engine',
    name: 'Carnot Engine',
    domain: 'physics',
    category: 'heat-engines',
    tags: ['Carnot', 'engine', 'efficiency', 'ideal', 'reversible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="8" fill="#EF4444" opacity="0.3"/>
      <text x="26" y="15" font-size="6" fill="currentColor" stroke="none">T_H</text>
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 16v8"/>
      <path d="M32 40v8"/>
      <rect x="20" y="48" width="24" height="8" fill="#3B82F6" opacity="0.3"/>
      <text x="26" y="55" font-size="6" fill="currentColor" stroke="none">T_C</text>
      <path d="M44 32h12"/>
      <text x="48" y="28" font-size="6" fill="currentColor" stroke="none">W</text>
    </svg>`
  },
  {
    id: 'thermo-otto-cycle',
    name: 'Otto Cycle Engine',
    domain: 'physics',
    category: 'heat-engines',
    tags: ['Otto', 'cycle', 'gasoline', 'engine', 'spark ignition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="32" rx="2"/>
      <rect x="26" y="8" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v12"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M28 36l8 0"/>
      <path d="M32 32v8"/>
      <path d="M24 28l16 16"/>
      <text x="20" y="58" font-size="6" fill="currentColor" stroke="none">Otto</text>
    </svg>`
  },
  {
    id: 'thermo-diesel-engine',
    name: 'Diesel Cycle Engine',
    domain: 'physics',
    category: 'heat-engines',
    tags: ['Diesel', 'cycle', 'compression', 'ignition', 'engine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="36" rx="2"/>
      <rect x="24" y="8" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="34" r="10"/>
      <path d="M32 24v20"/>
      <path d="M22 34h20"/>
      <path d="M28 8v8" stroke-dasharray="2 2"/>
      <path d="M36 8v8" stroke-dasharray="2 2"/>
      <text x="18" y="58" font-size="6" fill="currentColor" stroke="none">Diesel</text>
    </svg>`
  },
  {
    id: 'thermo-stirling-engine',
    name: 'Stirling Engine',
    domain: 'physics',
    category: 'heat-engines',
    tags: ['Stirling', 'engine', 'external combustion', 'regenerator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="44" cy="32" r="12"/>
      <path d="M32 32v-20"/>
      <rect x="28" y="8" width="8" height="8" fill="currentColor" opacity="0.2"/>
      <path d="M20 20v-4"/>
      <path d="M44 20v-4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <line x1="8" y1="48" x2="24" y2="48" stroke="#EF4444"/>
      <line x1="40" y1="48" x2="56" y2="48" stroke="#3B82F6"/>
    </svg>`
  },
  {
    id: 'thermo-refrigerator',
    name: 'Refrigeration Cycle',
    domain: 'physics',
    category: 'heat-engines',
    tags: ['refrigerator', 'heat pump', 'cooling', 'COP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="48" width="24" height="8" fill="#EF4444" opacity="0.3"/>
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <rect x="20" y="8" width="24" height="8" fill="#3B82F6" opacity="0.3"/>
      <path d="M32 16v8"/>
      <path d="M28 20l4-4 4 4"/>
      <path d="M32 40v8"/>
      <path d="M28 44l4 4 4-4"/>
      <path d="M8 32h12"/>
      <path d="M12 28l-4 4 4 4"/>
      <text x="4" y="28" font-size="5" fill="currentColor" stroke="none">W</text>
    </svg>`
  },

  // ===========================================================================
  // THERMODYNAMIC CYCLES
  // ===========================================================================
  {
    id: 'thermo-pv-diagram',
    name: 'PV Diagram',
    domain: 'physics',
    category: 'cycles',
    tags: ['PV diagram', 'pressure', 'volume', 'work', 'cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M12 20c8 0 12 8 20 8s12 8 20 8" fill="currentColor" opacity="0.1"/>
      <path d="M12 20c8 0 12 8 20 8s12 8 20 8"/>
      <path d="M52 36c-8 0-12 4-20 4s-12 8-20 8"/>
      <text x="4" y="16" font-size="8" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="8" fill="currentColor" stroke="none">V</text>
    </svg>`
  },
  {
    id: 'thermo-ts-diagram',
    name: 'TS Diagram',
    domain: 'physics',
    category: 'cycles',
    tags: ['TS diagram', 'temperature', 'entropy', 'heat', 'cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M16 16h32v24H16z" fill="currentColor" opacity="0.1"/>
      <path d="M16 16h32"/>
      <path d="M48 16v24"/>
      <path d="M48 40H16"/>
      <path d="M16 40V16"/>
      <text x="4" y="16" font-size="8" fill="currentColor" stroke="none">T</text>
      <text x="50" y="60" font-size="8" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'thermo-isothermal',
    name: 'Isothermal Process',
    domain: 'physics',
    category: 'cycles',
    tags: ['isothermal', 'constant temperature', 'process', 'ideal gas'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M16 20c12 8 24 16 36 24"/>
      <circle cx="16" cy="20" r="3" fill="currentColor"/>
      <circle cx="52" cy="44" r="3" fill="currentColor"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="32" y="24" font-size="5" fill="currentColor" stroke="none">T=const</text>
    </svg>`
  },
  {
    id: 'thermo-adiabatic',
    name: 'Adiabatic Process',
    domain: 'physics',
    category: 'cycles',
    tags: ['adiabatic', 'no heat', 'isentropic', 'process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M16 16c8 12 20 24 36 32"/>
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
      <circle cx="52" cy="48" r="3" fill="currentColor"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="32" y="24" font-size="5" fill="currentColor" stroke="none">Q=0</text>
    </svg>`
  },
  {
    id: 'thermo-isobaric',
    name: 'Isobaric Process',
    domain: 'physics',
    category: 'cycles',
    tags: ['isobaric', 'constant pressure', 'process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M16 28h36"/>
      <circle cx="16" cy="28" r="3" fill="currentColor"/>
      <circle cx="52" cy="28" r="3" fill="currentColor"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="28" y="24" font-size="5" fill="currentColor" stroke="none">P=const</text>
    </svg>`
  },
  {
    id: 'thermo-isochoric',
    name: 'Isochoric Process',
    domain: 'physics',
    category: 'cycles',
    tags: ['isochoric', 'constant volume', 'isometric', 'process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M32 16v32"/>
      <circle cx="32" cy="16" r="3" fill="currentColor"/>
      <circle cx="32" cy="48" r="3" fill="currentColor"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="36" y="32" font-size="5" fill="currentColor" stroke="none">V=const</text>
    </svg>`
  },

  // ===========================================================================
  // ENTROPY
  // ===========================================================================
  {
    id: 'thermo-entropy',
    name: 'Entropy Symbol',
    domain: 'physics',
    category: 'entropy',
    tags: ['entropy', 'S', 'disorder', 'thermodynamic', 'state function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="20" y="44" font-size="32" font-style="italic" fill="currentColor" stroke="none">S</text>
      <path d="M8 16c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0"/>
      <circle cx="16" cy="52" r="2"/>
      <circle cx="28" cy="56" r="2"/>
      <circle cx="40" cy="50" r="2"/>
      <circle cx="48" cy="54" r="2"/>
    </svg>`
  },
  {
    id: 'thermo-microstates',
    name: 'Microstates',
    domain: 'physics',
    category: 'entropy',
    tags: ['microstates', 'Boltzmann', 'statistical', 'multiplicity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <circle cx="16" cy="20" r="3" fill="currentColor"/>
      <circle cx="24" cy="28" r="3" fill="currentColor"/>
      <circle cx="20" cy="40" r="3" fill="currentColor"/>
      <circle cx="40" cy="16" r="3"/>
      <circle cx="48" cy="24" r="3"/>
      <circle cx="44" cy="36" r="3"/>
      <circle cx="40" cy="48" r="3"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Omega</text>
    </svg>`
  },
  {
    id: 'thermo-second-law',
    name: 'Second Law Arrow',
    domain: 'physics',
    category: 'entropy',
    tags: ['second law', 'arrow of time', 'irreversibility', 'increase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h40"/>
      <path d="M40 24l8 8-8 8"/>
      <text x="12" y="24" font-size="10" fill="currentColor" stroke="none">dS ≥ 0</text>
      <circle cx="16" cy="44" r="4"/>
      <circle cx="28" cy="44" r="6"/>
      <circle cx="44" cy="44" r="8"/>
    </svg>`
  },
  {
    id: 'thermo-boltzmann',
    name: 'Boltzmann Formula',
    domain: 'physics',
    category: 'entropy',
    tags: ['Boltzmann', 'formula', 'statistical mechanics', 'kB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="8" y="36" font-size="14" fill="currentColor" stroke="none">S = k ln W</text>
      <path d="M8 44h48"/>
      <text x="16" y="56" font-size="8" fill="currentColor" stroke="none">Boltzmann</text>
    </svg>`
  },

  // ===========================================================================
  // HEAT TRANSFER
  // ===========================================================================
  {
    id: 'thermo-conduction',
    name: 'Heat Conduction',
    domain: 'physics',
    category: 'heat-transfer',
    tags: ['conduction', 'Fourier', 'thermal', 'solid', 'gradient'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <path d="M8 20v24" stroke="#EF4444" stroke-width="3"/>
      <path d="M56 20v24" stroke="#3B82F6" stroke-width="3"/>
      <path d="M20 32h24"/>
      <path d="M36 28l8 4-8 4"/>
      <text x="4" y="16" font-size="6" fill="#EF4444" stroke="none">Hot</text>
      <text x="48" y="16" font-size="6" fill="#3B82F6" stroke="none">Cold</text>
    </svg>`
  },
  {
    id: 'thermo-convection',
    name: 'Heat Convection',
    domain: 'physics',
    category: 'heat-transfer',
    tags: ['convection', 'fluid', 'flow', 'natural', 'forced'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="48" width="32" height="8" fill="#EF4444" opacity="0.3"/>
      <path d="M24 48c0-16 8-24 8-32"/>
      <path d="M40 48c0-16-8-24-8-32"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M36 12l4-4 4 4"/>
      <path d="M20 12l4-4 4 4"/>
      <circle cx="32" cy="28" r="2" fill="#EF4444"/>
      <circle cx="24" cy="36" r="2" fill="#EF4444"/>
      <circle cx="40" cy="36" r="2" fill="#EF4444"/>
    </svg>`
  },
  {
    id: 'thermo-radiation',
    name: 'Thermal Radiation',
    domain: 'physics',
    category: 'heat-transfer',
    tags: ['radiation', 'blackbody', 'Stefan-Boltzmann', 'electromagnetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="#EF4444" opacity="0.3"/>
      <circle cx="16" cy="32" r="10"/>
      <path d="M26 32c4-6 8-6 12 0s8 6 12 0"/>
      <path d="M26 24c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M26 40c4-4 8-4 12 0s8 4 12 0"/>
      <rect x="50" y="24" width="8" height="16" rx="1"/>
    </svg>`
  },
  {
    id: 'thermo-heat-exchanger',
    name: 'Heat Exchanger',
    domain: 'physics',
    category: 'heat-transfer',
    tags: ['heat exchanger', 'counterflow', 'parallel', 'efficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <path d="M8 24h8"/>
      <path d="M48 24h8"/>
      <path d="M8 40h8"/>
      <path d="M48 40h8"/>
      <path d="M20 24h24" stroke="#EF4444"/>
      <path d="M44 24l-4-3v6z" fill="#EF4444"/>
      <path d="M20 40h24" stroke="#3B82F6"/>
      <path d="M20 40l4-3v6z" fill="#3B82F6"/>
      <line x1="32" y1="20" x2="32" y2="44" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // PHASE TRANSITIONS
  // ===========================================================================
  {
    id: 'thermo-phase-diagram',
    name: 'Phase Diagram',
    domain: 'physics',
    category: 'phases',
    tags: ['phase diagram', 'triple point', 'critical point', 'phases'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M12 40l20-20"/>
      <path d="M32 20c8 0 16 8 20 24"/>
      <path d="M32 20v24"/>
      <circle cx="32" cy="20" r="3" fill="currentColor"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">T</text>
      <text x="16" y="50" font-size="5" fill="currentColor" stroke="none">S</text>
      <text x="20" y="28" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="40" y="36" font-size="5" fill="currentColor" stroke="none">G</text>
    </svg>`
  },
  {
    id: 'thermo-melting',
    name: 'Melting/Freezing',
    domain: 'physics',
    category: 'phases',
    tags: ['melting', 'freezing', 'fusion', 'solid', 'liquid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="20" height="24" fill="currentColor" opacity="0.3"/>
      <path d="M36 32c0 12 4 24 20 24" fill="#3B82F6" opacity="0.2"/>
      <path d="M28 32h8"/>
      <path d="M32 28l4 4-4 4"/>
      <rect x="8" y="32" width="20" height="24"/>
      <path d="M36 32c0 12 4 24 20 24"/>
      <text x="12" y="28" font-size="6" fill="currentColor" stroke="none">Solid</text>
      <text x="40" y="28" font-size="6" fill="currentColor" stroke="none">Liquid</text>
    </svg>`
  },
  {
    id: 'thermo-boiling',
    name: 'Boiling/Condensation',
    domain: 'physics',
    category: 'phases',
    tags: ['boiling', 'condensation', 'vaporization', 'liquid', 'gas'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c0-16 8-24 16-24" fill="#3B82F6" opacity="0.2"/>
      <path d="M32 32c4 0 8-8 12-8s8 4 12 4"/>
      <circle cx="44" cy="20" r="3"/>
      <circle cx="52" cy="16" r="2"/>
      <circle cx="48" cy="28" r="2"/>
      <path d="M28 32h8"/>
      <path d="M32 28l4 4-4 4"/>
      <path d="M8 56c0-16 8-24 16-24"/>
      <text x="10" y="28" font-size="5" fill="currentColor" stroke="none">Liquid</text>
      <text x="44" y="44" font-size="5" fill="currentColor" stroke="none">Gas</text>
    </svg>`
  },
  {
    id: 'thermo-sublimation',
    name: 'Sublimation',
    domain: 'physics',
    category: 'phases',
    tags: ['sublimation', 'deposition', 'solid', 'gas', 'direct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="16" height="20" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="36" width="16" height="20"/>
      <path d="M28 44h12"/>
      <path d="M36 40l4 4-4 4"/>
      <circle cx="48" cy="24" r="4"/>
      <circle cx="56" cy="32" r="3"/>
      <circle cx="52" cy="44" r="3"/>
      <path d="M48 28c2 4 4 8 4 12" stroke-dasharray="2 2"/>
      <text x="8" y="32" font-size="5" fill="currentColor" stroke="none">Solid</text>
      <text x="46" y="56" font-size="5" fill="currentColor" stroke="none">Gas</text>
    </svg>`
  },
  {
    id: 'thermo-latent-heat',
    name: 'Latent Heat',
    domain: 'physics',
    category: 'phases',
    tags: ['latent heat', 'enthalpy', 'phase change', 'fusion', 'vaporization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 52V12"/>
      <path d="M8 52h48"/>
      <path d="M12 48l12-16h8l12-16h8"/>
      <line x1="24" y1="32" x2="32" y2="32" stroke-dasharray="2 2"/>
      <line x1="44" y1="16" x2="52" y2="16" stroke-dasharray="2 2"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">T</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">Q</text>
      <text x="24" y="44" font-size="4" fill="currentColor" stroke="none">L_f</text>
      <text x="40" y="28" font-size="4" fill="currentColor" stroke="none">L_v</text>
    </svg>`
  },
];

export default thermodynamicsIcons;
