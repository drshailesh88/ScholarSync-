/**
 * Electrical Engineering Icon Library
 * Comprehensive SVG icons for electrical engineering
 *
 * Categories:
 * - Circuits & Components (resistors, capacitors, inductors, diodes)
 * - Power Systems (transformers, generators, transmission)
 * - Semiconductors (transistors, ICs, microprocessors)
 * - Signal Processing (filters, amplifiers, oscillators)
 * - Control Systems (sensors, actuators, controllers)
 */

import type { IconDefinition } from './index';

export const electricalIcons: IconDefinition[] = [
  // ===========================================================================
  // CIRCUIT COMPONENTS
  // ===========================================================================
  {
    id: 'elec-resistor-fixed',
    name: 'Fixed Resistor',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['resistor', 'ohm', 'resistance', 'passive', 'component'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h10"/>
      <path d="M46 32h10"/>
      <path d="M18 32l3-8 6 16 6-16 6 16 6-16 3 8"/>
      <text x="24" y="52" font-size="6" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'elec-resistor-variable',
    name: 'Variable Resistor',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['potentiometer', 'rheostat', 'variable', 'adjustable', 'trim'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h10"/>
      <path d="M46 32h10"/>
      <path d="M18 32l3-8 6 16 6-16 6 16 6-16 3 8"/>
      <path d="M32 12v12"/>
      <path d="M28 16l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'elec-capacitor-fixed',
    name: 'Fixed Capacitor',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['capacitor', 'farad', 'storage', 'charge', 'passive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20"/>
      <path d="M36 32h20"/>
      <line x1="28" y1="18" x2="28" y2="46"/>
      <line x1="36" y1="18" x2="36" y2="46"/>
      <text x="24" y="56" font-size="6" fill="currentColor" stroke="none">C</text>
    </svg>`
  },
  {
    id: 'elec-capacitor-polarized',
    name: 'Polarized Capacitor',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['electrolytic', 'capacitor', 'polarized', 'storage', 'DC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20"/>
      <path d="M36 32h20"/>
      <line x1="28" y1="18" x2="28" y2="46"/>
      <path d="M36 18c0 14-4 14-4 28"/>
      <text x="12" y="22" font-size="8" fill="currentColor" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'elec-inductor',
    name: 'Inductor',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['inductor', 'coil', 'henry', 'magnetic', 'inductive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M16 32c0-8 4-8 8-8s8 0 8 8-4 8-8 8"/>
      <path d="M24 32c0-8 4-8 8-8s8 0 8 8-4 8-8 8"/>
      <path d="M32 32c0-8 4-8 8-8s8 0 8 8"/>
      <text x="24" y="52" font-size="6" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'elec-diode',
    name: 'Diode',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['diode', 'rectifier', 'semiconductor', 'PN junction', 'one-way'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <polygon points="24,20 40,32 24,44" fill="currentColor" opacity="0.2"/>
      <polygon points="24,20 40,32 24,44"/>
      <line x1="40" y1="20" x2="40" y2="44"/>
    </svg>`
  },
  {
    id: 'elec-led',
    name: 'LED',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['LED', 'light', 'emitting', 'diode', 'indicator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <polygon points="24,20 40,32 24,44" fill="currentColor" opacity="0.2"/>
      <polygon points="24,20 40,32 24,44"/>
      <line x1="40" y1="20" x2="40" y2="44"/>
      <path d="M44 14l6-6"/>
      <path d="M48 18l6-6"/>
      <path d="M48 12l2-2"/>
      <path d="M52 16l2-2"/>
    </svg>`
  },
  {
    id: 'elec-zener-diode',
    name: 'Zener Diode',
    domain: 'engineering',
    category: 'circuit-components',
    tags: ['zener', 'voltage', 'regulator', 'reference', 'breakdown'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <polygon points="24,20 40,32 24,44" fill="currentColor" opacity="0.2"/>
      <polygon points="24,20 40,32 24,44"/>
      <path d="M36 20l4 0 0 24 4 0"/>
    </svg>`
  },

  // ===========================================================================
  // TRANSISTORS & SEMICONDUCTORS
  // ===========================================================================
  {
    id: 'elec-npn-transistor',
    name: 'NPN Transistor',
    domain: 'engineering',
    category: 'semiconductors',
    tags: ['NPN', 'BJT', 'transistor', 'amplifier', 'switch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <line x1="8" y1="32" x2="16" y2="32"/>
      <line x1="16" y1="20" x2="16" y2="44"/>
      <line x1="16" y1="26" x2="32" y2="14"/>
      <line x1="16" y1="38" x2="32" y2="50"/>
      <path d="M32 14v-6"/>
      <path d="M32 50v6"/>
      <polygon points="26,44 32,50 28,48" fill="currentColor"/>
      <text x="40" y="16" font-size="5" fill="currentColor" stroke="none">C</text>
      <text x="40" y="52" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="2" y="36" font-size="5" fill="currentColor" stroke="none">B</text>
    </svg>`
  },
  {
    id: 'elec-pnp-transistor',
    name: 'PNP Transistor',
    domain: 'engineering',
    category: 'semiconductors',
    tags: ['PNP', 'BJT', 'transistor', 'amplifier', 'switch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <line x1="8" y1="32" x2="16" y2="32"/>
      <line x1="16" y1="20" x2="16" y2="44"/>
      <line x1="16" y1="26" x2="32" y2="14"/>
      <line x1="16" y1="38" x2="32" y2="50"/>
      <path d="M32 14v-6"/>
      <path d="M32 50v6"/>
      <polygon points="20,30 16,26 22,28" fill="currentColor"/>
      <text x="40" y="16" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="40" y="52" font-size="5" fill="currentColor" stroke="none">C</text>
      <text x="2" y="36" font-size="5" fill="currentColor" stroke="none">B</text>
    </svg>`
  },
  {
    id: 'elec-nmos-transistor',
    name: 'N-Channel MOSFET',
    domain: 'engineering',
    category: 'semiconductors',
    tags: ['NMOS', 'MOSFET', 'FET', 'transistor', 'enhancement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 32h8"/>
      <line x1="16" y1="24" x2="16" y2="40"/>
      <line x1="20" y1="24" x2="20" y2="28"/>
      <line x1="20" y1="30" x2="20" y2="34"/>
      <line x1="20" y1="36" x2="20" y2="40"/>
      <path d="M20 26h12v-18"/>
      <path d="M20 38h12v18"/>
      <path d="M20 32h12"/>
      <polygon points="28,32 32,36 32,28" fill="currentColor"/>
      <text x="40" y="14" font-size="5" fill="currentColor" stroke="none">D</text>
      <text x="40" y="54" font-size="5" fill="currentColor" stroke="none">S</text>
      <text x="2" y="36" font-size="5" fill="currentColor" stroke="none">G</text>
    </svg>`
  },
  {
    id: 'elec-op-amp',
    name: 'Operational Amplifier',
    domain: 'engineering',
    category: 'semiconductors',
    tags: ['op-amp', 'amplifier', 'IC', 'analog', 'comparator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,8 52,32 12,56" fill="currentColor" opacity="0.1"/>
      <polygon points="12,8 52,32 12,56"/>
      <path d="M4 20h8"/>
      <path d="M4 44h8"/>
      <path d="M52 32h8"/>
      <text x="16" y="24" font-size="8" fill="currentColor" stroke="none">-</text>
      <text x="16" y="48" font-size="8" fill="currentColor" stroke="none">+</text>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
      <text x="34" y="8" font-size="5" fill="currentColor" stroke="none">V+</text>
      <text x="34" y="62" font-size="5" fill="currentColor" stroke="none">V-</text>
    </svg>`
  },
  {
    id: 'elec-thyristor',
    name: 'Thyristor (SCR)',
    domain: 'engineering',
    category: 'semiconductors',
    tags: ['SCR', 'thyristor', 'rectifier', 'power', 'controlled'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <polygon points="24,18 40,32 24,46" fill="currentColor" opacity="0.2"/>
      <polygon points="24,18 40,32 24,46"/>
      <line x1="40" y1="18" x2="40" y2="46"/>
      <path d="M32 46v10"/>
      <text x="26" y="62" font-size="5" fill="currentColor" stroke="none">G</text>
    </svg>`
  },

  // ===========================================================================
  // POWER SYSTEMS
  // ===========================================================================
  {
    id: 'elec-transformer',
    name: 'Transformer',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['transformer', 'voltage', 'AC', 'power', 'induction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16v32"/>
      <path d="M56 16v32"/>
      <path d="M8 16c4 0 6 2 6 6s-2 6-6 6 6 2 6 6-2 6-6 6 6 2 6 6-2 6-6 6"/>
      <path d="M56 16c-4 0-6 2-6 6s2 6 6 6-6 2-6 6 2 6 6 6-6 2-6 6 2 6 6 6"/>
      <line x1="28" y1="12" x2="28" y2="52"/>
      <line x1="36" y1="12" x2="36" y2="52"/>
    </svg>`
  },
  {
    id: 'elec-ac-source',
    name: 'AC Voltage Source',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['AC', 'source', 'voltage', 'alternating', 'generator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 32c0-4 4-4 4 0s4 4 4 0 4 4 4 0"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
    </svg>`
  },
  {
    id: 'elec-dc-source',
    name: 'DC Voltage Source',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['DC', 'source', 'voltage', 'battery', 'power'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <line x1="26" y1="26" x2="26" y2="38"/>
      <line x1="38" y1="28" x2="38" y2="36"/>
      <text x="22" y="22" font-size="8" fill="currentColor" stroke="none">+</text>
      <text x="36" y="22" font-size="8" fill="currentColor" stroke="none">-</text>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
    </svg>`
  },
  {
    id: 'elec-ground',
    name: 'Ground/Earth',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['ground', 'earth', 'reference', 'common', 'return'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <line x1="18" y1="28" x2="46" y2="28"/>
      <line x1="22" y1="36" x2="42" y2="36"/>
      <line x1="26" y1="44" x2="38" y2="44"/>
    </svg>`
  },
  {
    id: 'elec-fuse',
    name: 'Fuse',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['fuse', 'protection', 'overcurrent', 'safety', 'circuit breaker'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <rect x="20" y="24" width="24" height="16" rx="2"/>
      <path d="M24 32h16"/>
    </svg>`
  },
  {
    id: 'elec-circuit-breaker',
    name: 'Circuit Breaker',
    domain: 'engineering',
    category: 'power-systems',
    tags: ['breaker', 'protection', 'switch', 'overcurrent', 'safety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <path d="M24 32l16-12"/>
      <rect x="36" y="28" width="8" height="8" rx="1"/>
    </svg>`
  },

  // ===========================================================================
  // SIGNAL PROCESSING
  // ===========================================================================
  {
    id: 'elec-filter-lowpass',
    name: 'Low-Pass Filter',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['filter', 'lowpass', 'LPF', 'frequency', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M22 36h10l8-8"/>
      <text x="20" y="48" font-size="6" fill="currentColor" stroke="none">LPF</text>
    </svg>`
  },
  {
    id: 'elec-filter-highpass',
    name: 'High-Pass Filter',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['filter', 'highpass', 'HPF', 'frequency', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M22 36l8-8h10"/>
      <text x="20" y="48" font-size="6" fill="currentColor" stroke="none">HPF</text>
    </svg>`
  },
  {
    id: 'elec-amplifier',
    name: 'Amplifier Block',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['amplifier', 'gain', 'signal', 'boost', 'buffer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,32 16,48" fill="currentColor" opacity="0.1"/>
      <polygon points="16,16 48,32 16,48"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <text x="22" y="36" font-size="8" fill="currentColor" stroke="none">A</text>
    </svg>`
  },
  {
    id: 'elec-oscillator',
    name: 'Oscillator',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['oscillator', 'frequency', 'clock', 'waveform', 'generator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <path d="M22 32c0-6 4-6 4 0s4 6 4 0 4-6 4 0s4 6 4 0"/>
      <path d="M48 32h8"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'elec-adc',
    name: 'ADC (Analog-to-Digital)',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['ADC', 'converter', 'analog', 'digital', 'sampling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M22 32c0-4 2-4 4 0"/>
      <text x="32" y="36" font-size="8" fill="currentColor" stroke="none">01</text>
      <path d="M28 32h4"/>
    </svg>`
  },
  {
    id: 'elec-dac',
    name: 'DAC (Digital-to-Analog)',
    domain: 'engineering',
    category: 'signal-processing',
    tags: ['DAC', 'converter', 'digital', 'analog', 'reconstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <text x="20" y="36" font-size="8" fill="currentColor" stroke="none">01</text>
      <path d="M34 32h4"/>
      <path d="M38 32c0-4 2-4 4 0"/>
    </svg>`
  },

  // ===========================================================================
  // WIRING & CONNECTIONS
  // ===========================================================================
  {
    id: 'elec-wire-junction',
    name: 'Wire Junction',
    domain: 'engineering',
    category: 'wiring',
    tags: ['junction', 'connection', 'node', 'wire', 'solder'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48"/>
      <path d="M32 8v48"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'elec-wire-crossing',
    name: 'Wire Crossing',
    domain: 'engineering',
    category: 'wiring',
    tags: ['crossing', 'no-connection', 'wire', 'overlap', 'bridge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48"/>
      <path d="M32 8v16"/>
      <path d="M32 40v16"/>
      <path d="M32 24c4 0 4 4 0 4s-4 4 0 4"/>
    </svg>`
  },
  {
    id: 'elec-switch-spst',
    name: 'SPST Switch',
    domain: 'engineering',
    category: 'wiring',
    tags: ['switch', 'SPST', 'toggle', 'on-off', 'control'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <circle cx="24" cy="32" r="3"/>
      <circle cx="40" cy="32" r="3"/>
      <path d="M27 30l12-8"/>
    </svg>`
  },
  {
    id: 'elec-relay',
    name: 'Relay',
    domain: 'engineering',
    category: 'wiring',
    tags: ['relay', 'electromagnetic', 'switch', 'coil', 'contact'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="2" stroke-dasharray="4 2"/>
      <path d="M8 24h12"/>
      <path d="M44 24h12"/>
      <path d="M24 24c0-4 2-4 4-4s4 0 4 4-2 4-4 4"/>
      <path d="M32 24c0-4 2-4 4-4s4 0 4 4"/>
      <path d="M8 44h16"/>
      <path d="M40 44h16"/>
      <circle cx="24" cy="44" r="2"/>
      <circle cx="40" cy="44" r="2"/>
      <path d="M26 42l12-6"/>
      <path d="M32 28v8" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // INTEGRATED CIRCUITS
  // ===========================================================================
  {
    id: 'elec-ic-generic',
    name: 'Generic IC',
    domain: 'engineering',
    category: 'integrated-circuits',
    tags: ['IC', 'chip', 'integrated', 'circuit', 'package'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <circle cx="20" cy="20" r="2"/>
    </svg>`
  },
  {
    id: 'elec-microcontroller',
    name: 'Microcontroller',
    domain: 'engineering',
    category: 'integrated-circuits',
    tags: ['MCU', 'microcontroller', 'embedded', 'processor', 'controller'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="2"/>
      <path d="M16 12v-6"/>
      <path d="M24 12v-6"/>
      <path d="M32 12v-6"/>
      <path d="M40 12v-6"/>
      <path d="M48 12v-6"/>
      <path d="M16 52v6"/>
      <path d="M24 52v6"/>
      <path d="M32 52v6"/>
      <path d="M40 52v6"/>
      <path d="M48 52v6"/>
      <path d="M12 24h-6"/>
      <path d="M12 32h-6"/>
      <path d="M12 40h-6"/>
      <path d="M52 24h6"/>
      <path d="M52 32h6"/>
      <path d="M52 40h6"/>
      <circle cx="18" cy="18" r="2"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">MCU</text>
    </svg>`
  },
  {
    id: 'elec-fpga',
    name: 'FPGA',
    domain: 'engineering',
    category: 'integrated-circuits',
    tags: ['FPGA', 'programmable', 'logic', 'array', 'gate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="2"/>
      <rect x="20" y="20" width="8" height="8"/>
      <rect x="36" y="20" width="8" height="8"/>
      <rect x="20" y="36" width="8" height="8"/>
      <rect x="36" y="36" width="8" height="8"/>
      <path d="M28 24h8"/>
      <path d="M28 40h8"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <path d="M12 24h-6"/>
      <path d="M12 40h-6"/>
      <path d="M52 24h6"/>
      <path d="M52 40h6"/>
    </svg>`
  },
  {
    id: 'elec-memory-chip',
    name: 'Memory Chip',
    domain: 'engineering',
    category: 'integrated-circuits',
    tags: ['memory', 'RAM', 'ROM', 'EEPROM', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <path d="M20 12v-6"/>
      <path d="M28 12v-6"/>
      <path d="M36 12v-6"/>
      <path d="M44 12v-6"/>
      <path d="M20 52v6"/>
      <path d="M28 52v6"/>
      <path d="M36 52v6"/>
      <path d="M44 52v6"/>
      <line x1="22" y1="24" x2="42" y2="24"/>
      <line x1="22" y1="32" x2="42" y2="32"/>
      <line x1="22" y1="40" x2="42" y2="40"/>
      <circle cx="20" cy="16" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // MEASUREMENT & TESTING
  // ===========================================================================
  {
    id: 'elec-voltmeter',
    name: 'Voltmeter',
    domain: 'engineering',
    category: 'measurement',
    tags: ['voltmeter', 'voltage', 'measurement', 'meter', 'test'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">V</text>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'elec-ammeter',
    name: 'Ammeter',
    domain: 'engineering',
    category: 'measurement',
    tags: ['ammeter', 'current', 'measurement', 'meter', 'ampere'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">A</text>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'elec-oscilloscope',
    name: 'Oscilloscope',
    domain: 'engineering',
    category: 'measurement',
    tags: ['oscilloscope', 'waveform', 'scope', 'signal', 'display'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="14" y="18" width="36" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M18 30h6l3-8 6 16 6-16 3 8h6"/>
      <circle cx="20" cy="48" r="2"/>
      <circle cx="32" cy="48" r="2"/>
      <circle cx="44" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'elec-multimeter',
    name: 'Multimeter',
    domain: 'engineering',
    category: 'measurement',
    tags: ['multimeter', 'DMM', 'measurement', 'voltage', 'current', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="18" y="14" width="28" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="42" r="8"/>
      <line x1="32" y1="38" x2="38" y2="44"/>
      <circle cx="20" cy="52" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="52" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'elec-logic-analyzer',
    name: 'Logic Analyzer',
    domain: 'engineering',
    category: 'measurement',
    tags: ['logic', 'analyzer', 'digital', 'timing', 'debug'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M16 24h4v-4h4v4h4v-4h4v4h4v-4h4"/>
      <path d="M16 32h4v4h4v-4h4v4h4v-4h4v4h4"/>
      <path d="M16 40h8v-4h4v4h8v-4h4"/>
      <text x="20" y="20" font-size="4" fill="currentColor" stroke="none">D0</text>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">D1</text>
      <text x="20" y="48" font-size="4" fill="currentColor" stroke="none">CLK</text>
    </svg>`
  }
];

export default electricalIcons;
