/**
 * Oceanography Icon Library
 * Comprehensive SVG icons for oceanographic sciences
 *
 * Categories:
 * - Ocean Currents (circulation, gyres, thermohaline)
 * - Marine Life (organisms, ecosystems, plankton)
 * - Seafloor Features (ridges, trenches, vents)
 * - Waves & Tides (surface waves, tidal patterns)
 * - Instrumentation (buoys, ROVs, sensors)
 */

import type { IconDefinition } from './index';

export const oceanographyIcons: IconDefinition[] = [
  // ===========================================================================
  // OCEAN CURRENTS
  // ===========================================================================
  {
    id: 'ocean-current',
    name: 'Ocean Current',
    domain: 'biology',
    category: 'currents',
    tags: ['current', 'flow', 'circulation', 'stream', 'drift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c12 0 20 8 32 8s12-8 16-8"/>
      <path d="M8 32c12 0 20 8 32 8s12-8 16-8"/>
      <path d="M8 44c12 0 20 8 32 8s12-8 16-8"/>
      <path d="M48 16l8 4-8 4"/>
      <path d="M48 28l8 4-8 4"/>
      <path d="M48 40l8 4-8 4"/>
    </svg>`
  },
  {
    id: 'ocean-gyre',
    name: 'Ocean Gyre',
    domain: 'biology',
    category: 'currents',
    tags: ['gyre', 'circulation', 'vortex', 'subtropical', 'garbage patch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10"/>
      <ellipse cx="32" cy="32" rx="8" ry="5"/>
      <path d="M52 24l4 8"/>
      <path d="M12 40l-4-8"/>
      <path d="M40 16l-8-4"/>
      <path d="M24 48l8 4"/>
    </svg>`
  },
  {
    id: 'ocean-thermohaline',
    name: 'Thermohaline Circulation',
    domain: 'biology',
    category: 'currents',
    tags: ['thermohaline', 'conveyor belt', 'deep water', 'density driven'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M8 48h48"/>
      <path d="M12 16c-4 8-4 24 0 32"/>
      <path d="M52 16c4 8 4 24 0 32"/>
      <path d="M20 16v12c0 4 8 4 8 0V16"/>
      <path d="M36 48v-12c0-4 8-4 8 0V48"/>
      <path d="M16 20l-4 4 4 4"/>
      <path d="M48 40l4-4-4-4"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="48" cy="44" r="2"/>
    </svg>`
  },
  {
    id: 'ocean-upwelling',
    name: 'Upwelling',
    domain: 'biology',
    category: 'currents',
    tags: ['upwelling', 'nutrients', 'cold water', 'productivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M16 48v-24"/>
      <path d="M32 48v-32"/>
      <path d="M48 48v-24"/>
      <path d="M12 28l4-4 4 4"/>
      <path d="M28 20l4-4 4 4"/>
      <path d="M44 28l4-4 4 4"/>
      <circle cx="20" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="36" r="2" fill="currentColor"/>
      <circle cx="44" cy="44" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ocean-eddy',
    name: 'Mesoscale Eddy',
    domain: 'biology',
    category: 'currents',
    tags: ['eddy', 'vortex', 'mesoscale', 'ring', 'rotating'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 12c-11 0-20 9-20 20"/>
      <path d="M12 32c0 11 9 20 20 20"/>
      <path d="M32 52c11 0 20-9 20-20"/>
      <path d="M52 32c0-11-9-20-20-20"/>
      <path d="M28 8l4 4 4-4"/>
    </svg>`
  },

  // ===========================================================================
  // MARINE LIFE
  // ===========================================================================
  {
    id: 'ocean-fish',
    name: 'Fish',
    domain: 'biology',
    category: 'marine-life',
    tags: ['fish', 'marine', 'aquatic', 'vertebrate', 'school'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 32c0-12-12-20-28-20 8 8 8 24 0 40 16 0 28-8 28-20z" fill="currentColor" opacity="0.2"/>
      <path d="M48 32c0-12-12-20-28-20 8 8 8 24 0 40 16 0 28-8 28-20z"/>
      <path d="M8 20l12 12-12 12"/>
      <circle cx="40" cy="28" r="2" fill="currentColor"/>
      <path d="M28 32h12"/>
      <path d="M48 24l8-4"/>
      <path d="M48 40l8 4"/>
    </svg>`
  },
  {
    id: 'ocean-whale',
    name: 'Whale',
    domain: 'biology',
    category: 'marine-life',
    tags: ['whale', 'cetacean', 'mammal', 'marine', 'migration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 36c0-12 16-20 36-20 8 0 12 8 12 16s-4 16-12 16H16c-4 0-8-4-8-12z" fill="currentColor" opacity="0.2"/>
      <path d="M8 36c0-12 16-20 36-20 8 0 12 8 12 16s-4 16-12 16H16c-4 0-8-4-8-12z"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <path d="M40 24v8"/>
      <path d="M4 20c4 4 4 8 0 12"/>
      <path d="M52 28h4"/>
    </svg>`
  },
  {
    id: 'ocean-plankton',
    name: 'Plankton',
    domain: 'biology',
    category: 'marine-life',
    tags: ['plankton', 'phytoplankton', 'zooplankton', 'microscopic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 24v-12"/>
      <path d="M32 40v12"/>
      <path d="M24 32h-12"/>
      <path d="M40 32h12"/>
      <path d="M26 26l-8-8"/>
      <path d="M38 38l8 8"/>
      <path d="M38 26l8-8"/>
      <path d="M26 38l-8 8"/>
      <circle cx="16" cy="16" r="2"/>
      <circle cx="48" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'ocean-coral',
    name: 'Coral Reef',
    domain: 'biology',
    category: 'marine-life',
    tags: ['coral', 'reef', 'cnidarian', 'ecosystem', 'bleaching'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M16 56v-16c0-4 4-8 8-8v-8"/>
      <path d="M24 24c-4 0-8 4-8 8"/>
      <path d="M24 24c4 0 8 4 8 8v24"/>
      <path d="M40 56v-20c0-4 4-8 8-8"/>
      <path d="M48 28v-12"/>
      <path d="M44 20l4-4 4 4"/>
      <path d="M20 32l4-4 4 4"/>
      <circle cx="24" cy="16" r="4"/>
      <circle cx="48" cy="16" r="4"/>
    </svg>`
  },
  {
    id: 'ocean-jellyfish',
    name: 'Jellyfish',
    domain: 'biology',
    category: 'marine-life',
    tags: ['jellyfish', 'medusa', 'cnidarian', 'bioluminescent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c0-8 7.2-16 16-16s16 8 16 16" fill="currentColor" opacity="0.2"/>
      <path d="M16 24c0-8 7.2-16 16-16s16 8 16 16"/>
      <path d="M16 24c0 4 7.2 8 16 8s16-4 16-8"/>
      <path d="M20 32v20"/>
      <path d="M28 32v24"/>
      <path d="M36 32v24"/>
      <path d="M44 32v20"/>
      <path d="M20 40c2 2 2 6 0 8"/>
      <path d="M44 44c-2 2-2 6 0 8"/>
    </svg>`
  },

  // ===========================================================================
  // SEAFLOOR FEATURES
  // ===========================================================================
  {
    id: 'ocean-mid-ridge',
    name: 'Mid-Ocean Ridge',
    domain: 'biology',
    category: 'seafloor',
    tags: ['ridge', 'spreading', 'volcanic', 'plate boundary', 'rift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 48l12-8 8 4 8-20 8 4 8-8 12 8"/>
      <path d="M32 24v-16"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M20 40l-8 8"/>
      <path d="M44 40l8 8"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ocean-trench',
    name: 'Ocean Trench',
    domain: 'biology',
    category: 'seafloor',
    tags: ['trench', 'subduction', 'deep', 'hadal', 'abyssal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 24h20l8 32 8-32h20"/>
      <path d="M24 24l8 16 8-16"/>
      <path d="M28 40l4 8 4-8"/>
      <line x1="32" y1="16" x2="32" y2="8" stroke-dasharray="2 2"/>
      <text x="28" y="8" font-size="4" fill="currentColor" stroke="none">0m</text>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">11km</text>
    </svg>`
  },
  {
    id: 'ocean-hydrothermal',
    name: 'Hydrothermal Vent',
    domain: 'biology',
    category: 'seafloor',
    tags: ['hydrothermal', 'vent', 'black smoker', 'chemosynthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56h16l-4-16h-8l-4 16z"/>
      <path d="M28 40v-8c-4-4-4-12 0-16"/>
      <path d="M36 40v-8c4-4 4-12 0-16"/>
      <path d="M32 16c-4-4 0-8 4-12"/>
      <path d="M28 8c-2-4 2-6 4-8"/>
      <ellipse cx="32" cy="8" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="48" r="2"/>
      <circle cx="40" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'ocean-seamount',
    name: 'Seamount',
    domain: 'biology',
    category: 'seafloor',
    tags: ['seamount', 'underwater volcano', 'guyot', 'hotspot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 56h56"/>
      <path d="M8 56l12-16 12 8 12-28 12 20 8 16" fill="currentColor" opacity="0.2"/>
      <path d="M8 56l12-16 12 8 12-28 12 20 8 16"/>
      <path d="M44 20c4-4 8-4 12 0"/>
      <ellipse cx="44" cy="16" rx="8" ry="3"/>
    </svg>`
  },
  {
    id: 'ocean-continental-shelf',
    name: 'Continental Shelf',
    domain: 'biology',
    category: 'seafloor',
    tags: ['shelf', 'continental', 'slope', 'margin', 'bathymetry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 16h20l4 8 8 24h24" fill="currentColor" opacity="0.1"/>
      <path d="M4 16h20l4 8 8 24h24"/>
      <text x="8" y="14" font-size="4" fill="currentColor" stroke="none">Shelf</text>
      <text x="28" y="30" font-size="4" fill="currentColor" stroke="none">Slope</text>
      <text x="44" y="54" font-size="4" fill="currentColor" stroke="none">Abyss</text>
      <path d="M24 16v-8"/>
      <path d="M20 12l4-4 4 4"/>
    </svg>`
  },

  // ===========================================================================
  // WAVES & TIDES
  // ===========================================================================
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    domain: 'biology',
    category: 'waves-tides',
    tags: ['wave', 'swell', 'surface', 'wavelength', 'amplitude'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c8-16 16 0 24-16s16 0 24-16"/>
      <path d="M4 48c8-16 16 0 24-16s16 0 24-16"/>
      <path d="M16 8v24" stroke-dasharray="2 2"/>
      <path d="M40 8v24" stroke-dasharray="2 2"/>
      <path d="M16 20h24"/>
      <text x="24" y="18" font-size="4" fill="currentColor" stroke="none">λ</text>
    </svg>`
  },
  {
    id: 'ocean-tide',
    name: 'Tidal Pattern',
    domain: 'biology',
    category: 'waves-tides',
    tags: ['tide', 'tidal', 'lunar', 'high tide', 'low tide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="28" ry="8"/>
      <circle cx="8" cy="32" r="4" fill="currentColor"/>
      <path d="M4 24l4 8-4 8"/>
      <path d="M60 24l-4 8 4 8"/>
      <text x="28" y="16" font-size="4" fill="currentColor" stroke="none">High</text>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">High</text>
    </svg>`
  },
  {
    id: 'ocean-tsunami',
    name: 'Tsunami',
    domain: 'biology',
    category: 'waves-tides',
    tags: ['tsunami', 'seismic wave', 'long wave', 'coastal', 'hazard'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40c8-24 16-24 24 0"/>
      <path d="M28 40c8-32 16-32 28 0"/>
      <path d="M4 48h56"/>
      <path d="M8 56h12"/>
      <path d="M8 52l12 8V52"/>
      <path d="M32 20l4-8 4 4"/>
      <circle cx="16" cy="16" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'ocean-storm-surge',
    name: 'Storm Surge',
    domain: 'biology',
    category: 'waves-tides',
    tags: ['storm surge', 'hurricane', 'flooding', 'coastal', 'extreme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 44c8-8 16-4 24-12s16-4 24-12"/>
      <path d="M4 56c8-8 16-4 24-12s16-4 24-12"/>
      <path d="M8 12c4 4 8 4 12 0s8 4 12 0"/>
      <path d="M20 8l4 4-4 4"/>
      <path d="M36 8l4 4-4 4"/>
      <rect x="48" y="36" width="12" height="20"/>
      <path d="M48 44h12"/>
    </svg>`
  },

  // ===========================================================================
  // INSTRUMENTATION
  // ===========================================================================
  {
    id: 'ocean-buoy',
    name: 'Ocean Buoy',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['buoy', 'mooring', 'monitoring', 'sensor', 'station'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M28 8v-4"/>
      <path d="M36 8v-4"/>
      <path d="M32 4h-8"/>
      <path d="M32 4h8"/>
      <path d="M32 32v24"/>
      <path d="M24 40l8 4"/>
      <path d="M40 40l-8 4"/>
      <ellipse cx="32" cy="56" rx="8" ry="4"/>
      <path d="M8 24c8-4 16 4 24 0s16 4 24 0"/>
    </svg>`
  },
  {
    id: 'ocean-rov',
    name: 'ROV Submersible',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['ROV', 'submersible', 'underwater', 'remote', 'robot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <circle cx="24" cy="32" r="6"/>
      <circle cx="24" cy="32" r="3" fill="currentColor"/>
      <rect x="36" y="26" width="12" height="12" rx="2"/>
      <path d="M32 12v8"/>
      <path d="M16 48v8"/>
      <path d="M48 48v8"/>
      <ellipse cx="16" cy="56" rx="4" ry="2"/>
      <ellipse cx="48" cy="56" rx="4" ry="2"/>
    </svg>`
  },
  {
    id: 'ocean-ctd',
    name: 'CTD Profiler',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['CTD', 'conductivity', 'temperature', 'depth', 'profiler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="16" ry="4"/>
      <path d="M16 12v32c0 4 7.2 8 16 8s16-4 16-8V12"/>
      <ellipse cx="32" cy="44" rx="16" ry="8"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="20" y1="36" x2="44" y2="36"/>
      <path d="M32 4v8"/>
      <circle cx="32" cy="4" r="2"/>
    </svg>`
  },
  {
    id: 'ocean-sonar',
    name: 'Sonar System',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['sonar', 'echosounder', 'acoustic', 'mapping', 'bathymetry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="12" rx="2"/>
      <path d="M20 20h24"/>
      <path d="M16 28c8 4 16 4 24 0s8 4 16 0"/>
      <path d="M32 20v8"/>
      <path d="M24 36c4 8 8 16 8 24"/>
      <path d="M40 36c-4 8-8 16-8 24"/>
      <path d="M20 44c6 4 12 8 12 16"/>
      <path d="M44 44c-6 4-12 8-12 16"/>
    </svg>`
  },
  {
    id: 'ocean-argo-float',
    name: 'Argo Float',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['Argo', 'float', 'profiling', 'autonomous', 'ocean observation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="8" ry="4"/>
      <path d="M24 16v24c0 6 3.6 12 8 12s8-6 8-12V16"/>
      <circle cx="32" cy="52" r="4"/>
      <path d="M28 8v8"/>
      <path d="M36 8v8"/>
      <path d="M32 4l-4-2"/>
      <path d="M32 4l4-2"/>
      <line x1="24" y1="24" x2="40" y2="24" stroke-dasharray="2 2"/>
      <line x1="24" y1="32" x2="40" y2="32" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'ocean-research-vessel',
    name: 'Research Vessel',
    domain: 'biology',
    category: 'instrumentation',
    tags: ['ship', 'vessel', 'research', 'oceanographic', 'cruise'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40l8-8h32l8 8H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 40l8-8h32l8 8H8z"/>
      <path d="M4 40c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M4 48c8-4 16 4 24 0s16 4 24 0"/>
      <rect x="24" y="20" width="16" height="12"/>
      <rect x="28" y="24" width="4" height="4"/>
      <path d="M32 12v8"/>
      <path d="M28 16l4-4 4 4"/>
    </svg>`
  },
];

export default oceanographyIcons;
