/**
 * Electromagnetism Icon Library
 * Comprehensive SVG icons for electricity, magnetism, and electromagnetic theory
 *
 * Categories:
 * - Electric Fields (charges, dipoles, field lines)
 * - Magnetic Fields (magnets, solenoids, field patterns)
 * - Electromagnetic Waves (propagation, spectrum, polarization)
 * - Circuits (components, analysis, AC/DC)
 * - Maxwell's Equations (fundamental laws, visualizations)
 */

import type { IconDefinition } from './index';

export const electromagnetismIcons: IconDefinition[] = [
  // ===========================================================================
  // ELECTRIC FIELDS
  // ===========================================================================
  {
    id: 'em-positive-charge',
    name: 'Positive Charge',
    domain: 'physics',
    category: 'electric-fields',
    tags: ['positive', 'charge', 'proton', 'source', 'Coulomb'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <line x1="32" y1="24" x2="32" y2="40"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M16 16l6 6"/>
      <path d="M42 42l6 6"/>
      <path d="M16 48l6-6"/>
      <path d="M42 22l6-6"/>
    </svg>`
  },
  {
    id: 'em-negative-charge',
    name: 'Negative Charge',
    domain: 'physics',
    category: 'electric-fields',
    tags: ['negative', 'charge', 'electron', 'sink', 'Coulomb'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#3B82F6" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <path d="M32 8l0 8"/>
      <path d="M32 48l0 8"/>
      <path d="M8 32l8 0"/>
      <path d="M48 32l8 0"/>
      <path d="M28 4l4 4"/>
      <path d="M28 56l4 4"/>
      <path d="M4 28l4 4"/>
      <path d="M56 28l4 4"/>
    </svg>`
  },
  {
    id: 'em-electric-dipole',
    name: 'Electric Dipole',
    domain: 'physics',
    category: 'electric-fields',
    tags: ['dipole', 'moment', 'polarization', 'field lines'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="8" fill="#EF4444" opacity="0.3"/>
      <circle cx="44" cy="32" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="20" cy="32" r="8"/>
      <circle cx="44" cy="32" r="8"/>
      <text x="17" y="35" font-size="10" fill="currentColor" stroke="none">+</text>
      <text x="42" y="35" font-size="10" fill="currentColor" stroke="none">-</text>
      <path d="M12 20c8-4 16-4 24 0s16 4 24 0"/>
      <path d="M12 44c8 4 16 4 24 0s16-4 24 0"/>
      <path d="M28 32h8"/>
      <path d="M32 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'em-electric-field-lines',
    name: 'Electric Field Lines',
    domain: 'physics',
    category: 'electric-fields',
    tags: ['field lines', 'electric field', 'flux', 'vector field'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M32 8v16"/>
      <path d="M28 20l4-4 4 4"/>
      <path d="M32 56v-16"/>
      <path d="M28 44l4 4 4-4"/>
      <path d="M8 32h16"/>
      <path d="M20 28l-4 4 4 4"/>
      <path d="M56 32h-16"/>
      <path d="M44 28l4 4-4 4"/>
      <path d="M14 14l12 12"/>
      <path d="M50 50l-12-12"/>
      <path d="M14 50l12-12"/>
      <path d="M50 14l-12 12"/>
    </svg>`
  },
  {
    id: 'em-capacitor',
    name: 'Parallel Plate Capacitor',
    domain: 'physics',
    category: 'electric-fields',
    tags: ['capacitor', 'parallel plate', 'electric field', 'charge storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="20" y1="16" x2="20" y2="48" stroke-width="3"/>
      <line x1="44" y1="16" x2="44" y2="48" stroke-width="3"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M28 24h8" stroke-dasharray="2 2"/>
      <path d="M28 32h8" stroke-dasharray="2 2"/>
      <path d="M28 40h8" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="6" fill="currentColor" stroke="none">+</text>
      <text x="42" y="58" font-size="6" fill="currentColor" stroke="none">-</text>
      <text x="28" y="58" font-size="5" fill="currentColor" stroke="none">E</text>
    </svg>`
  },

  // ===========================================================================
  // MAGNETIC FIELDS
  // ===========================================================================
  {
    id: 'em-bar-magnet',
    name: 'Bar Magnet',
    domain: 'physics',
    category: 'magnetic-fields',
    tags: ['magnet', 'bar', 'north', 'south', 'poles'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="24" height="16" fill="#EF4444" opacity="0.3"/>
      <rect x="32" y="24" width="24" height="16" fill="#3B82F6" opacity="0.3"/>
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <line x1="32" y1="24" x2="32" y2="40"/>
      <text x="14" y="35" font-size="8" fill="currentColor" stroke="none">N</text>
      <text x="46" y="35" font-size="8" fill="currentColor" stroke="none">S</text>
      <path d="M8 20c-4-8 4-16 12-12"/>
      <path d="M56 20c4-8-4-16-12-12"/>
      <path d="M8 44c-4 8 4 16 12 12"/>
      <path d="M56 44c4 8-4 16-12 12"/>
    </svg>`
  },
  {
    id: 'em-magnetic-field-lines',
    name: 'Magnetic Field Lines',
    domain: 'physics',
    category: 'magnetic-fields',
    tags: ['magnetic field', 'field lines', 'flux', 'dipole'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="24"/>
      <circle cx="20" cy="32" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="44" cy="32" r="4" fill="#3B82F6" opacity="0.5"/>
      <text x="18" y="35" font-size="6" fill="currentColor" stroke="none">N</text>
      <text x="42" y="35" font-size="6" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'em-solenoid',
    name: 'Solenoid',
    domain: 'physics',
    category: 'magnetic-fields',
    tags: ['solenoid', 'coil', 'electromagnet', 'inductor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c4-4 8-4 12 0"/>
      <path d="M24 28c4-4 8-4 12 0"/>
      <path d="M36 28c4-4 8-4 12 0"/>
      <path d="M12 36c4 4 8 4 12 0"/>
      <path d="M24 36c4 4 8 4 12 0"/>
      <path d="M36 36c4 4 8 4 12 0"/>
      <line x1="4" y1="32" x2="12" y2="32"/>
      <line x1="48" y1="32" x2="56" y2="32"/>
      <path d="M24 16h16" stroke-dasharray="3 2"/>
      <path d="M36 12l4 4-4 4"/>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">B field</text>
    </svg>`
  },
  {
    id: 'em-current-loop',
    name: 'Current Loop',
    domain: 'physics',
    category: 'magnetic-fields',
    tags: ['current loop', 'magnetic moment', 'dipole', 'Biot-Savart'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="8"/>
      <path d="M32 8v20"/>
      <path d="M28 24l4-4 4 4"/>
      <path d="M32 44v12"/>
      <path d="M28 52l4 4 4-4"/>
      <path d="M48 32l4 4"/>
      <text x="44" y="28" font-size="5" fill="currentColor" stroke="none">I</text>
      <text x="28" y="16" font-size="5" fill="currentColor" stroke="none">B</text>
    </svg>`
  },
  {
    id: 'em-toroid',
    name: 'Toroidal Coil',
    domain: 'physics',
    category: 'magnetic-fields',
    tags: ['toroid', 'toroidal', 'inductor', 'contained field'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <path d="M16 24v16"/>
      <path d="M22 20v24"/>
      <path d="M28 18v28"/>
      <path d="M36 18v28"/>
      <path d="M42 20v24"/>
      <path d="M48 24v16"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // ELECTROMAGNETIC WAVES
  // ===========================================================================
  {
    id: 'em-wave-propagation',
    name: 'EM Wave Propagation',
    domain: 'physics',
    category: 'em-waves',
    tags: ['electromagnetic wave', 'propagation', 'E field', 'B field'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h56"/>
      <path d="M52 28l4 4-4 4"/>
      <path d="M8 32c4-12 8-12 12 0s8 12 12 0 8-12 12 0 8 12 12 0" stroke="#EF4444"/>
      <path d="M8 32c4 0 8-8 12-8s8 8 12 8 8-8 12-8 8 8 12 8" stroke="#3B82F6" stroke-dasharray="3 2"/>
      <text x="4" y="20" font-size="6" fill="#EF4444" stroke="none">E</text>
      <text x="4" y="44" font-size="6" fill="#3B82F6" stroke="none">B</text>
      <text x="52" y="44" font-size="5" fill="currentColor" stroke="none">c</text>
    </svg>`
  },
  {
    id: 'em-spectrum',
    name: 'EM Spectrum',
    domain: 'physics',
    category: 'em-waves',
    tags: ['spectrum', 'electromagnetic', 'wavelength', 'frequency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="8" height="16" fill="#EF4444" opacity="0.5"/>
      <rect x="12" y="24" width="8" height="16" fill="#F59E0B" opacity="0.5"/>
      <rect x="20" y="24" width="8" height="16" fill="#FBBF24" opacity="0.5"/>
      <rect x="28" y="24" width="8" height="16" fill="#22C55E" opacity="0.5"/>
      <rect x="36" y="24" width="8" height="16" fill="#3B82F6" opacity="0.5"/>
      <rect x="44" y="24" width="8" height="16" fill="#6366F1" opacity="0.5"/>
      <rect x="52" y="24" width="8" height="16" fill="#8B5CF6" opacity="0.5"/>
      <path d="M4 48h56"/>
      <path d="M4 48l4-4"/>
      <path d="M56 48l4-4"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Radio</text>
      <text x="28" y="56" font-size="4" fill="currentColor" stroke="none">Visible</text>
      <text x="48" y="56" font-size="4" fill="currentColor" stroke="none">X-ray</text>
    </svg>`
  },
  {
    id: 'em-polarization',
    name: 'Polarization',
    domain: 'physics',
    category: 'em-waves',
    tags: ['polarization', 'linear', 'circular', 'polarizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="12"/>
      <line x1="16" y1="20" x2="16" y2="44"/>
      <line x1="8" y1="32" x2="24" y2="32"/>
      <rect x="28" y="20" width="8" height="24" fill="currentColor" opacity="0.2"/>
      <line x1="32" y1="20" x2="32" y2="44"/>
      <path d="M44 32h12"/>
      <path d="M50 26v12"/>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">Unpol.</text>
      <text x="42" y="56" font-size="5" fill="currentColor" stroke="none">Pol.</text>
    </svg>`
  },
  {
    id: 'em-antenna',
    name: 'Dipole Antenna',
    domain: 'physics',
    category: 'em-waves',
    tags: ['antenna', 'dipole', 'radiation', 'transmission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="8" x2="32" y2="28" stroke-width="2"/>
      <line x1="32" y1="36" x2="32" y2="56" stroke-width="2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="24" ry="28" stroke-dasharray="3 2"/>
      <path d="M48 32c4-4 8-4 12 0"/>
      <path d="M4 32c4-4 8-4 12 0"/>
    </svg>`
  },

  // ===========================================================================
  // CIRCUITS
  // ===========================================================================
  {
    id: 'em-resistor',
    name: 'Resistor',
    domain: 'physics',
    category: 'circuits',
    tags: ['resistor', 'resistance', 'ohm', 'circuit element'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="16" y2="32"/>
      <path d="M16 32l4-8 8 16 8-16 8 16 4-8"/>
      <line x1="48" y1="32" x2="60" y2="32"/>
      <text x="24" y="56" font-size="8" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'em-inductor',
    name: 'Inductor',
    domain: 'physics',
    category: 'circuits',
    tags: ['inductor', 'inductance', 'coil', 'circuit element'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="12" y2="32"/>
      <path d="M12 32c0-8 8-8 8 0"/>
      <path d="M20 32c0-8 8-8 8 0"/>
      <path d="M28 32c0-8 8-8 8 0"/>
      <path d="M36 32c0-8 8-8 8 0"/>
      <path d="M44 32c0-8 8-8 8 0"/>
      <line x1="52" y1="32" x2="60" y2="32"/>
      <text x="24" y="52" font-size="8" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'em-capacitor-circuit',
    name: 'Capacitor Symbol',
    domain: 'physics',
    category: 'circuits',
    tags: ['capacitor', 'capacitance', 'circuit element', 'farad'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="26" y2="32"/>
      <line x1="26" y1="20" x2="26" y2="44" stroke-width="2"/>
      <line x1="38" y1="20" x2="38" y2="44" stroke-width="2"/>
      <line x1="38" y1="32" x2="60" y2="32"/>
      <text x="26" y="56" font-size="8" fill="currentColor" stroke="none">C</text>
    </svg>`
  },
  {
    id: 'em-voltage-source',
    name: 'Voltage Source',
    domain: 'physics',
    category: 'circuits',
    tags: ['voltage', 'source', 'EMF', 'battery', 'circuit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="24" y2="32"/>
      <line x1="24" y1="20" x2="24" y2="44" stroke-width="2"/>
      <line x1="32" y1="26" x2="32" y2="38"/>
      <circle cx="32" cy="32" r="12"/>
      <line x1="40" y1="32" x2="60" y2="32"/>
      <text x="28" y="35" font-size="8" fill="currentColor" stroke="none">+</text>
      <text x="16" y="56" font-size="6" fill="currentColor" stroke="none">V</text>
    </svg>`
  },
  {
    id: 'em-rlc-circuit',
    name: 'RLC Circuit',
    domain: 'physics',
    category: 'circuits',
    tags: ['RLC', 'resonance', 'oscillator', 'circuit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="none"/>
      <path d="M16 16l2-4 4 8 4-8 4 8 2-4"/>
      <path d="M38 16c0-4 4-4 4 0s4 4 4 0 4-4 4 0"/>
      <line x1="16" y1="48" x2="16" y2="40"/>
      <line x1="12" y1="40" x2="20" y2="40"/>
      <line x1="12" y1="44" x2="20" y2="44"/>
      <line x1="48" y1="48" x2="48" y2="40"/>
      <circle cx="48" cy="36" r="4"/>
      <text x="24" y="28" font-size="5" fill="currentColor" stroke="none">R</text>
      <text x="42" y="28" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">C</text>
    </svg>`
  },

  // ===========================================================================
  // MAXWELL'S EQUATIONS
  // ===========================================================================
  {
    id: 'em-gauss-electric',
    name: 'Gauss Law Electric',
    domain: 'physics',
    category: 'maxwell',
    tags: ['Gauss', 'electric', 'flux', 'divergence', 'Maxwell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M38 32h16"/>
      <path d="M50 28l4 4-4 4"/>
      <path d="M26 32H10"/>
      <path d="M14 28l-4 4 4 4"/>
      <path d="M32 20v-12"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M32 44v12"/>
      <path d="M28 52l4 4 4-4"/>
      <text x="8" y="58" font-size="6" fill="currentColor" stroke="none">div E = rho/e0</text>
    </svg>`
  },
  {
    id: 'em-gauss-magnetic',
    name: 'Gauss Law Magnetic',
    domain: 'physics',
    category: 'maxwell',
    tags: ['Gauss', 'magnetic', 'no monopoles', 'divergence', 'Maxwell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12" stroke-dasharray="4 2"/>
      <path d="M20 32c0-8 24-8 24 0s-24 8-24 0" fill="currentColor" opacity="0.1"/>
      <path d="M20 32c0-8 24-8 24 0s-24 8-24 0"/>
      <path d="M12 28c8 8 32 8 40 0" stroke-dasharray="3 2"/>
      <path d="M12 36c8-8 32-8 40 0" stroke-dasharray="3 2"/>
      <text x="12" y="58" font-size="6" fill="currentColor" stroke="none">div B = 0</text>
    </svg>`
  },
  {
    id: 'em-faraday-law',
    name: 'Faraday Law',
    domain: 'physics',
    category: 'maxwell',
    tags: ['Faraday', 'induction', 'EMF', 'curl', 'Maxwell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="16" ry="8"/>
      <path d="M16 28v8"/>
      <path d="M48 28v8"/>
      <ellipse cx="32" cy="36" rx="16" ry="8" stroke-dasharray="3 2"/>
      <path d="M32 8v12"/>
      <path d="M28 16l4-4 4 4"/>
      <path d="M20 24l24 0"/>
      <path d="M40 20l4 4-4 4"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">dB/dt</text>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">curl E = -dB/dt</text>
    </svg>`
  },
  {
    id: 'em-ampere-maxwell',
    name: 'Ampere-Maxwell Law',
    domain: 'physics',
    category: 'maxwell',
    tags: ['Ampere', 'Maxwell', 'displacement current', 'curl'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="8" x2="32" y2="56" stroke-width="2"/>
      <ellipse cx="32" cy="24" rx="12" ry="6"/>
      <ellipse cx="32" cy="40" rx="12" ry="6"/>
      <path d="M40 20l4 4-4 4"/>
      <path d="M40 36l4 4-4 4"/>
      <text x="48" y="20" font-size="5" fill="currentColor" stroke="none">B</text>
      <text x="28" y="8" font-size="5" fill="currentColor" stroke="none">I</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">curl B = mu0*J</text>
    </svg>`
  },
  {
    id: 'em-poynting-vector',
    name: 'Poynting Vector',
    domain: 'physics',
    category: 'maxwell',
    tags: ['Poynting', 'energy flow', 'intensity', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20"/>
      <path d="M24 28l4 4-4 4"/>
      <path d="M32 48V16"/>
      <path d="M28 20l4-4 4 4"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M40 32h16" stroke-width="2"/>
      <path d="M52 28l4 4-4 4"/>
      <text x="4" y="28" font-size="6" fill="currentColor" stroke="none">E</text>
      <text x="36" y="20" font-size="6" fill="currentColor" stroke="none">B</text>
      <text x="48" y="44" font-size="6" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
];

export default electromagnetismIcons;
