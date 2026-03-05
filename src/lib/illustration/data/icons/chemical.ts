/**
 * Chemical Engineering Icon Library
 * Comprehensive SVG icons for chemical engineering
 *
 * Categories:
 * - Reactors (CSTR, PFR, batch, fluidized bed)
 * - Separation (distillation, absorption, extraction)
 * - Heat Transfer (exchangers, condensers, boilers)
 * - Fluid Handling (pumps, compressors, valves)
 * - Process Equipment (vessels, tanks, mixers)
 * - Instrumentation (sensors, controllers, analyzers)
 */

import type { IconDefinition } from './index';

export const chemicalIcons: IconDefinition[] = [
  // ===========================================================================
  // REACTORS
  // ===========================================================================
  {
    id: 'chem-reactor-cstr',
    name: 'CSTR Reactor',
    domain: 'engineering',
    category: 'reactors',
    tags: ['CSTR', 'reactor', 'continuous', 'stirred', 'tank'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="6"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <ellipse cx="32" cy="48" rx="16" ry="6"/>
      <path d="M32 8v-4"/>
      <path d="M32 12v28"/>
      <path d="M28 36l8-8"/>
      <path d="M36 36l-8-8"/>
      <path d="M8 24h8"/>
      <path d="M48 40h8"/>
      <path d="M32 54v6"/>
    </svg>`
  },
  {
    id: 'chem-reactor-pfr',
    name: 'PFR Reactor',
    domain: 'engineering',
    category: 'reactors',
    tags: ['PFR', 'plug flow', 'reactor', 'tubular', 'continuous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48"/>
      <path d="M8 40h48"/>
      <ellipse cx="8" cy="32" rx="4" ry="8"/>
      <ellipse cx="56" cy="32" rx="4" ry="8"/>
      <path d="M16 28h8v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 28h8v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M40 28h8v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M4 32h-2"/>
      <path d="M62 32h-2"/>
    </svg>`
  },
  {
    id: 'chem-reactor-batch',
    name: 'Batch Reactor',
    domain: 'engineering',
    category: 'reactors',
    tags: ['batch', 'reactor', 'vessel', 'jacketed', 'mixing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="6"/>
      <path d="M16 16v28c0 4 7.2 8 16 8s16-4 16-8V16"/>
      <path d="M12 20v24c0 6 9 10 20 10s20-4 20-10V20"/>
      <path d="M32 8v-4"/>
      <path d="M32 10v20"/>
      <path d="M26 26l12 0"/>
      <path d="M26 22l12 0"/>
      <path d="M8 28h4"/>
      <path d="M52 36h4"/>
    </svg>`
  },
  {
    id: 'chem-reactor-fluidized',
    name: 'Fluidized Bed Reactor',
    domain: 'engineering',
    category: 'reactors',
    tags: ['fluidized', 'bed', 'reactor', 'catalyst', 'gas-solid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24"/>
      <path d="M16 8l4 48h24l4-48"/>
      <path d="M20 56v4"/>
      <path d="M44 56v4"/>
      <circle cx="28" cy="32" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="28" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="36" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="40" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="38" r="2" fill="currentColor" opacity="0.4"/>
      <path d="M22 48h20" stroke-dasharray="2 2"/>
      <path d="M32 52v8"/>
    </svg>`
  },
  {
    id: 'chem-reactor-packed',
    name: 'Packed Bed Reactor',
    domain: 'engineering',
    category: 'reactors',
    tags: ['packed', 'bed', 'reactor', 'catalyst', 'fixed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <path d="M32 4v4"/>
      <path d="M32 56v4"/>
      <circle cx="28" cy="20" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="20" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M20 14h24" stroke-dasharray="2 2"/>
      <path d="M20 50h24" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // SEPARATION EQUIPMENT
  // ===========================================================================
  {
    id: 'chem-distillation-column',
    name: 'Distillation Column',
    domain: 'engineering',
    category: 'separation',
    tags: ['distillation', 'column', 'fractionation', 'separation', 'trays'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="52" rx="4"/>
      <path d="M20 16h24"/>
      <path d="M20 28h24"/>
      <path d="M20 40h24"/>
      <path d="M8 12h12"/>
      <path d="M44 12h12"/>
      <path d="M8 48h12"/>
      <path d="M44 48h12"/>
      <ellipse cx="32" cy="4" rx="12" ry="3"/>
      <path d="M32 1v-2"/>
      <ellipse cx="32" cy="56" rx="12" ry="3"/>
      <path d="M32 59v2"/>
    </svg>`
  },
  {
    id: 'chem-absorption-column',
    name: 'Absorption Column',
    domain: 'engineering',
    category: 'separation',
    tags: ['absorption', 'column', 'scrubber', 'gas', 'liquid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <path d="M32 4v4"/>
      <path d="M8 16h12"/>
      <path d="M44 48h12"/>
      <path d="M24 20v4l8-4v4l8-4v4"/>
      <path d="M24 32v4l8-4v4l8-4v4"/>
      <path d="M24 44v4l8-4v4l8-4v4"/>
      <path d="M32 56v4"/>
      <circle cx="56" cy="48" r="3"/>
    </svg>`
  },
  {
    id: 'chem-extraction-column',
    name: 'Extraction Column',
    domain: 'engineering',
    category: 'separation',
    tags: ['extraction', 'column', 'liquid-liquid', 'solvent', 'separation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <path d="M8 16h12"/>
      <path d="M44 16h12"/>
      <path d="M8 48h12"/>
      <path d="M44 48h12"/>
      <ellipse cx="28" cy="24" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="36" cy="32" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <ellipse cx="28" cy="40" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <path d="M32 4v4"/>
      <path d="M32 56v4"/>
    </svg>`
  },
  {
    id: 'chem-filter',
    name: 'Filter',
    domain: 'engineering',
    category: 'separation',
    tags: ['filter', 'filtration', 'separation', 'solid', 'liquid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32l-8 24v24h-16V32L16 8z"/>
      <path d="M24 32h16"/>
      <path d="M32 4v4"/>
      <path d="M32 56v4"/>
      <circle cx="24" cy="20" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.4"/>
      <path d="M28 44v4"/>
      <path d="M36 44v4"/>
    </svg>`
  },
  {
    id: 'chem-centrifuge',
    name: 'Centrifuge',
    domain: 'engineering',
    category: 'separation',
    tags: ['centrifuge', 'separation', 'rotation', 'solid', 'liquid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 12v-8"/>
      <path d="M32 52v8"/>
      <path d="M12 32h-8"/>
      <path d="M52 32h8"/>
      <path d="M40 32c0-4-4-8-8-8s-8 4-8 8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // HEAT TRANSFER
  // ===========================================================================
  {
    id: 'chem-heat-exchanger-shell',
    name: 'Shell & Tube Heat Exchanger',
    domain: 'engineering',
    category: 'heat-transfer',
    tags: ['heat exchanger', 'shell', 'tube', 'cooling', 'heating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="6" ry="16"/>
      <ellipse cx="52" cy="32" rx="6" ry="16"/>
      <path d="M12 16h40"/>
      <path d="M12 48h40"/>
      <path d="M18 24h28"/>
      <path d="M18 32h28"/>
      <path d="M18 40h28"/>
      <path d="M6 24h-4"/>
      <path d="M6 40h-4"/>
      <path d="M58 24h4"/>
      <path d="M58 40h4"/>
      <path d="M32 12v-8"/>
      <path d="M32 52v8"/>
    </svg>`
  },
  {
    id: 'chem-heat-exchanger-plate',
    name: 'Plate Heat Exchanger',
    domain: 'engineering',
    category: 'heat-transfer',
    tags: ['heat exchanger', 'plate', 'compact', 'efficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <line x1="20" y1="12" x2="20" y2="52"/>
      <line x1="28" y1="12" x2="28" y2="52"/>
      <line x1="36" y1="12" x2="36" y2="52"/>
      <line x1="44" y1="12" x2="44" y2="52"/>
      <path d="M12 20h4"/>
      <path d="M12 44h4"/>
      <path d="M48 20h4"/>
      <path d="M48 44h4"/>
      <circle cx="12" cy="20" r="2"/>
      <circle cx="52" cy="44" r="2"/>
    </svg>`
  },
  {
    id: 'chem-condenser',
    name: 'Condenser',
    domain: 'engineering',
    category: 'heat-transfer',
    tags: ['condenser', 'cooling', 'vapor', 'liquid', 'phase change'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="6"/>
      <path d="M16 12v40"/>
      <path d="M48 12v40"/>
      <ellipse cx="32" cy="52" rx="16" ry="6"/>
      <path d="M32 6v-4"/>
      <path d="M32 58v4"/>
      <path d="M8 24h8"/>
      <path d="M48 24h8"/>
      <path d="M8 40h8"/>
      <path d="M48 40h8"/>
      <path d="M24 20c4 4 4 8 0 12s-4 8 0 12"/>
      <path d="M40 20c-4 4-4 8 0 12s4 8 0 12"/>
    </svg>`
  },
  {
    id: 'chem-reboiler',
    name: 'Reboiler',
    domain: 'engineering',
    category: 'heat-transfer',
    tags: ['reboiler', 'heating', 'vaporization', 'distillation', 'boiler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12"/>
      <path d="M32 44v8"/>
      <path d="M32 20v-8"/>
      <path d="M20 32h24"/>
      <path d="M8 28h4"/>
      <path d="M52 28h4"/>
      <path d="M8 36h4"/>
      <path d="M52 36h4"/>
      <path d="M28 26c2 2 2 4 0 6"/>
      <path d="M36 26c2 2 2 4 0 6"/>
    </svg>`
  },
  {
    id: 'chem-cooler',
    name: 'Air Cooler',
    domain: 'engineering',
    category: 'heat-transfer',
    tags: ['cooler', 'air', 'fin', 'tube', 'cooling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="16" rx="2"/>
      <path d="M16 24v-8h32v8"/>
      <path d="M20 16v-4"/>
      <path d="M32 16v-4"/>
      <path d="M44 16v-4"/>
      <path d="M16 40v8h32v-8"/>
      <path d="M20 48v4"/>
      <path d="M32 48v4"/>
      <path d="M44 48v4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <circle cx="24" cy="32" r="2"/>
      <circle cx="40" cy="32" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // FLUID HANDLING
  // ===========================================================================
  {
    id: 'chem-pump-centrifugal',
    name: 'Centrifugal Pump',
    domain: 'engineering',
    category: 'fluid-handling',
    tags: ['pump', 'centrifugal', 'fluid', 'pressure', 'flow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 32h8"/>
      <path d="M32 16v-8"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M26 32l12 0"/>
      <path d="M32 26v12"/>
      <path d="M48 32h8"/>
      <path d="M56 28v8"/>
    </svg>`
  },
  {
    id: 'chem-compressor',
    name: 'Compressor',
    domain: 'engineering',
    category: 'fluid-handling',
    tags: ['compressor', 'gas', 'pressure', 'compression', 'turbine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,8 48,56 16,48" fill="currentColor" opacity="0.1"/>
      <polygon points="16,16 48,8 48,56 16,48"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
      <path d="M24 24l16-4"/>
      <path d="M24 32l16-4"/>
      <path d="M24 40l16-4"/>
    </svg>`
  },
  {
    id: 'chem-valve-control',
    name: 'Control Valve',
    domain: 'engineering',
    category: 'fluid-handling',
    tags: ['valve', 'control', 'flow', 'regulation', 'actuator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h16l8 8 8-8h16"/>
      <path d="M8 40h16l8-8 8 8h16"/>
      <path d="M32 16v8"/>
      <rect x="24" y="8" width="16" height="8"/>
      <path d="M32 8v-4"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'chem-valve-check',
    name: 'Check Valve',
    domain: 'engineering',
    category: 'fluid-handling',
    tags: ['valve', 'check', 'one-way', 'non-return', 'backflow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <polygon points="24,24 40,32 24,40" fill="currentColor" opacity="0.2"/>
      <polygon points="24,24 40,32 24,40"/>
    </svg>`
  },
  {
    id: 'chem-blower',
    name: 'Blower/Fan',
    domain: 'engineering',
    category: 'fluid-handling',
    tags: ['blower', 'fan', 'air', 'gas', 'ventilation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 14c-4 4-4 10 0 18"/>
      <path d="M32 50c4-4 4-10 0-18"/>
      <path d="M14 32c4 4 10 4 18 0"/>
      <path d="M50 32c-4-4-10-4-18 0"/>
      <path d="M8 32h6"/>
      <path d="M50 32h6"/>
    </svg>`
  },

  // ===========================================================================
  // PROCESS VESSELS
  // ===========================================================================
  {
    id: 'chem-tank-storage',
    name: 'Storage Tank',
    domain: 'engineering',
    category: 'vessels',
    tags: ['tank', 'storage', 'vessel', 'liquid', 'bulk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="20" ry="6"/>
      <path d="M12 12v40"/>
      <path d="M52 12v40"/>
      <ellipse cx="32" cy="52" rx="20" ry="6"/>
      <path d="M32 6v-4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
      <path d="M16 36h32" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'chem-vessel-pressure',
    name: 'Pressure Vessel',
    domain: 'engineering',
    category: 'vessels',
    tags: ['vessel', 'pressure', 'tank', 'horizontal', 'drum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="6" ry="14"/>
      <ellipse cx="52" cy="32" rx="6" ry="14"/>
      <path d="M12 18h40"/>
      <path d="M12 46h40"/>
      <path d="M32 12v-8"/>
      <path d="M32 52v8"/>
      <path d="M16 52l-4 8"/>
      <path d="M48 52l4 8"/>
      <circle cx="32" cy="32" r="4"/>
    </svg>`
  },
  {
    id: 'chem-mixer',
    name: 'Mixer/Agitator',
    domain: 'engineering',
    category: 'vessels',
    tags: ['mixer', 'agitator', 'stirrer', 'blending', 'vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="6"/>
      <path d="M16 20v28c0 4 7.2 8 16 8s16-4 16-8V20"/>
      <path d="M32 8v36"/>
      <path d="M24 36h16"/>
      <path d="M20 44h24"/>
      <rect x="28" y="4" width="8" height="4"/>
      <circle cx="32" cy="4" r="2"/>
    </svg>`
  },
  {
    id: 'chem-drum',
    name: 'Drum/Accumulator',
    domain: 'engineering',
    category: 'vessels',
    tags: ['drum', 'accumulator', 'surge', 'buffer', 'vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="6"/>
      <path d="M18 16v32"/>
      <path d="M46 16v32"/>
      <ellipse cx="32" cy="48" rx="14" ry="6"/>
      <path d="M32 10v-6"/>
      <path d="M32 54v6"/>
      <path d="M12 28h6"/>
      <path d="M46 40h6"/>
      <path d="M22 36h20" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'chem-cyclone',
    name: 'Cyclone Separator',
    domain: 'engineering',
    category: 'vessels',
    tags: ['cyclone', 'separator', 'dust', 'particle', 'centrifugal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="6"/>
      <path d="M18 16l6 36h16l6-36"/>
      <path d="M32 10v-6"/>
      <path d="M32 52v8"/>
      <ellipse cx="32" cy="52" rx="6" ry="3"/>
      <path d="M8 16h10"/>
      <path d="M46 16h10"/>
      <path d="M32 16v24" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // INSTRUMENTATION
  // ===========================================================================
  {
    id: 'chem-flow-meter',
    name: 'Flow Meter',
    domain: 'engineering',
    category: 'instrumentation',
    tags: ['flow', 'meter', 'measurement', 'orifice', 'sensor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <path d="M8 32h10"/>
      <path d="M46 32h10"/>
      <text x="26" y="36" font-size="10" fill="currentColor" stroke="none">F</text>
      <path d="M32 18v-10"/>
      <rect x="28" y="4" width="8" height="4"/>
    </svg>`
  },
  {
    id: 'chem-level-indicator',
    name: 'Level Indicator',
    domain: 'engineering',
    category: 'instrumentation',
    tags: ['level', 'indicator', 'measurement', 'tank', 'sensor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <rect x="24" y="32" width="16" height="20" fill="currentColor" opacity="0.2"/>
      <path d="M28 16h8"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
      <path d="M28 48h8"/>
      <circle cx="32" cy="32" r="3"/>
      <path d="M44 32h8"/>
    </svg>`
  },
  {
    id: 'chem-pressure-gauge',
    name: 'Pressure Gauge',
    domain: 'engineering',
    category: 'instrumentation',
    tags: ['pressure', 'gauge', 'measurement', 'indicator', 'sensor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="18"/>
      <text x="26" y="32" font-size="10" fill="currentColor" stroke="none">P</text>
      <path d="M32 28l8-8"/>
      <path d="M32 46v10"/>
      <circle cx="32" cy="28" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'chem-temperature-sensor',
    name: 'Temperature Sensor',
    domain: 'engineering',
    category: 'instrumentation',
    tags: ['temperature', 'sensor', 'thermocouple', 'RTD', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="18"/>
      <text x="26" y="32" font-size="10" fill="currentColor" stroke="none">T</text>
      <path d="M32 46v10"/>
      <rect x="28" y="52" width="8" height="8"/>
      <path d="M32 10v-6"/>
    </svg>`
  },
  {
    id: 'chem-controller',
    name: 'Controller',
    domain: 'engineering',
    category: 'instrumentation',
    tags: ['controller', 'PID', 'control', 'automation', 'loop'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="40" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // PROCESS FLOW SYMBOLS
  // ===========================================================================
  {
    id: 'chem-stream-arrow',
    name: 'Process Stream',
    domain: 'engineering',
    category: 'process-flow',
    tags: ['stream', 'flow', 'arrow', 'process', 'piping'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h40"/>
      <polygon points="48,32 40,26 40,38" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'chem-utility-steam',
    name: 'Steam Utility',
    domain: 'engineering',
    category: 'process-flow',
    tags: ['steam', 'utility', 'heating', 'energy', 'process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48c4-8 4-16 0-24s-4-16 0-24"/>
      <path d="M32 48c4-8 4-16 0-24s-4-16 0-24"/>
      <path d="M48 48c4-8 4-16 0-24s-4-16 0-24"/>
      <text x="20" y="58" font-size="8" fill="currentColor" stroke="none">STM</text>
    </svg>`
  },
  {
    id: 'chem-utility-water',
    name: 'Cooling Water',
    domain: 'engineering',
    category: 'process-flow',
    tags: ['water', 'cooling', 'utility', 'CW', 'process'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8 4 8 8 0 12s-8 8 0 12"/>
      <path d="M24 24c8 4 8 8 0 12s-8 8 0 12"/>
      <path d="M40 24c8 4 8 8 0 12s-8 8 0 12"/>
      <path d="M56 24c0 4-8 8 0 12"/>
      <text x="20" y="18" font-size="8" fill="currentColor" stroke="none">CW</text>
    </svg>`
  },
  {
    id: 'chem-rupture-disk',
    name: 'Rupture Disk',
    domain: 'engineering',
    category: 'process-flow',
    tags: ['rupture', 'disk', 'safety', 'pressure', 'relief'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <path d="M8 32h10"/>
      <path d="M46 32h10"/>
      <path d="M26 26l12 12"/>
      <path d="M38 26l-12 12"/>
    </svg>`
  },
  {
    id: 'chem-relief-valve',
    name: 'Relief Valve',
    domain: 'engineering',
    category: 'process-flow',
    tags: ['relief', 'valve', 'safety', 'pressure', 'PSV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 48l8-24 8 24z"/>
      <path d="M32 24v-16"/>
      <path d="M24 8h16"/>
      <path d="M8 48h48"/>
      <path d="M32 48v8"/>
      <circle cx="32" cy="40" r="3" fill="currentColor"/>
    </svg>`
  }
];

export default chemicalIcons;
