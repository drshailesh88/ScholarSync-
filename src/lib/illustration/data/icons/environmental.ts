/**
 * Environmental Science Icon Library
 * Comprehensive SVG icons for environmental sciences
 *
 * Categories:
 * - Climate Systems (temperature, weather patterns, greenhouse)
 * - Pollution (air, water, soil contamination)
 * - Conservation (biodiversity, habitats, endangered species)
 * - Sustainability (renewable energy, recycling, green technology)
 * - Ecosystems (biomes, food webs, nutrient cycles)
 */

import type { IconDefinition } from './index';

export const environmentalIcons: IconDefinition[] = [
  // ===========================================================================
  // CLIMATE SYSTEMS
  // ===========================================================================
  {
    id: 'env-greenhouse-effect',
    name: 'Greenhouse Effect',
    domain: 'biology',
    category: 'climate-systems',
    tags: ['greenhouse', 'CO2', 'warming', 'radiation', 'atmosphere'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c0-20 10.7-36 24-36s24 16 24 36" fill="currentColor" opacity="0.1"/>
      <path d="M8 48c0-20 10.7-36 24-36s24 16 24 36"/>
      <path d="M16 56h32"/>
      <path d="M20 20l4 12-4 12"/>
      <path d="M44 20l-4 12 4 12"/>
      <path d="M28 8v8"/>
      <path d="M36 8v8"/>
      <path d="M32 8l-4-4"/>
      <path d="M32 8l4-4"/>
    </svg>`
  },
  {
    id: 'env-carbon-cycle',
    name: 'Carbon Cycle',
    domain: 'biology',
    category: 'climate-systems',
    tags: ['carbon', 'cycle', 'CO2', 'photosynthesis', 'respiration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <circle cx="32" cy="12" r="4"/>
      <circle cx="32" cy="52" r="4"/>
      <circle cx="12" cy="32" r="4"/>
      <circle cx="52" cy="32" r="4"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">CO₂</text>
      <path d="M20 20l24 24"/>
      <path d="M44 20l-24 24"/>
    </svg>`
  },
  {
    id: 'env-global-warming',
    name: 'Global Warming',
    domain: 'biology',
    category: 'climate-systems',
    tags: ['warming', 'temperature', 'climate change', 'thermometer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="16"/>
      <path d="M12 32c4 4 12 4 16 0"/>
      <path d="M14 24c0 4 4 6 6 6"/>
      <path d="M26 24c0 4-4 6-6 6"/>
      <rect x="44" y="12" width="8" height="40" rx="4"/>
      <rect x="46" y="28" width="4" height="22" rx="2" fill="currentColor"/>
      <circle cx="48" cy="48" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M48 8v4"/>
    </svg>`
  },
  {
    id: 'env-ice-cap',
    name: 'Ice Cap Melting',
    domain: 'biology',
    category: 'climate-systems',
    tags: ['ice', 'glacier', 'melting', 'arctic', 'sea level'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h48v4c0 8-10.7 16-24 16S8 40 8 32v-4z" fill="currentColor" opacity="0.2"/>
      <path d="M8 28h48"/>
      <path d="M12 16l4 12"/>
      <path d="M20 12l4 16"/>
      <path d="M32 8l4 20"/>
      <path d="M44 12l-4 16"/>
      <path d="M52 16l-4 12"/>
      <path d="M16 44c0 4 4 8 8 8"/>
      <path d="M40 44c0 4-4 8-8 8"/>
      <path d="M24 52v4"/>
      <path d="M40 52v4"/>
    </svg>`
  },
  {
    id: 'env-ozone-layer',
    name: 'Ozone Layer',
    domain: 'biology',
    category: 'climate-systems',
    tags: ['ozone', 'O3', 'UV', 'stratosphere', 'depletion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="44" r="16"/>
      <path d="M8 20c8-4 16 0 24 0s16 4 24 0" stroke-dasharray="4 2"/>
      <path d="M12 28c6-2 12 2 20 2s14 0 20-2"/>
      <path d="M32 8l-4 8 8 4-8 4"/>
      <path d="M24 4l-2 6"/>
      <path d="M40 4l2 6"/>
      <circle cx="28" cy="16" r="1" fill="currentColor"/>
      <circle cx="36" cy="12" r="1" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // POLLUTION
  // ===========================================================================
  {
    id: 'env-air-pollution',
    name: 'Air Pollution',
    domain: 'biology',
    category: 'pollution',
    tags: ['smog', 'emissions', 'particulates', 'air quality', 'smoke'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="36" width="24" height="20" rx="2"/>
      <path d="M28 36v-8c0-2 2-4 4-4s4 2 4 4v8"/>
      <path d="M24 24c-4-8 0-16 8-16"/>
      <path d="M40 24c4-8 0-16-8-16"/>
      <path d="M16 16c-4 4-4 12 4 16"/>
      <path d="M48 16c4 4 4 12-4 16"/>
      <ellipse cx="32" cy="8" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'env-water-pollution',
    name: 'Water Pollution',
    domain: 'biology',
    category: 'pollution',
    tags: ['contamination', 'effluent', 'runoff', 'aquatic', 'toxins'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="2"/>
      <path d="M8 40c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M8 48c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M24 16l-4 16"/>
      <path d="M28 8l-2 24"/>
      <path d="M40 16l4 16"/>
      <circle cx="20" cy="44" r="2" fill="currentColor"/>
      <circle cx="36" cy="40" r="3" fill="currentColor"/>
      <circle cx="48" cy="44" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'env-soil-contamination',
    name: 'Soil Contamination',
    domain: 'biology',
    category: 'pollution',
    tags: ['soil', 'contamination', 'heavy metals', 'remediation', 'leaching'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48"/>
      <rect x="8" y="24" width="48" height="32" fill="currentColor" opacity="0.1"/>
      <path d="M16 24v-8l4-4v12"/>
      <path d="M28 24v-12l4-4v16"/>
      <path d="M44 24v-8l4-4v12"/>
      <circle cx="20" cy="36" r="3"/>
      <circle cx="36" cy="40" r="4"/>
      <circle cx="48" cy="32" r="2"/>
      <path d="M20 36l-4 12"/>
      <path d="M36 40l2 14"/>
      <path d="M48 32l4 16"/>
    </svg>`
  },
  {
    id: 'env-plastic-pollution',
    name: 'Plastic Pollution',
    domain: 'biology',
    category: 'pollution',
    tags: ['plastic', 'microplastic', 'ocean', 'waste', 'debris'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M8 36c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M16 24l-2-12h8l-2 12"/>
      <path d="M36 20l-2-8h6l-2 8"/>
      <rect x="44" y="8" width="8" height="16" rx="1"/>
      <circle cx="20" cy="44" r="3"/>
      <circle cx="36" cy="48" r="2"/>
      <circle cx="48" cy="42" r="4"/>
    </svg>`
  },
  {
    id: 'env-noise-pollution',
    name: 'Noise Pollution',
    domain: 'biology',
    category: 'pollution',
    tags: ['noise', 'sound', 'decibels', 'urban', 'acoustic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24v16l16 8V16L8 24z" fill="currentColor" opacity="0.2"/>
      <path d="M8 24v16l16 8V16L8 24z"/>
      <path d="M32 20c4 4 4 20 0 24"/>
      <path d="M40 12c8 8 8 32 0 40"/>
      <path d="M48 4c12 12 12 44 0 56"/>
    </svg>`
  },

  // ===========================================================================
  // CONSERVATION
  // ===========================================================================
  {
    id: 'env-biodiversity',
    name: 'Biodiversity',
    domain: 'biology',
    category: 'conservation',
    tags: ['biodiversity', 'species', 'variety', 'ecosystem', 'wildlife'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M20 20c4 4 8 4 12 0"/>
      <path d="M32 20c4 4 8 4 12 0"/>
      <circle cx="24" cy="32" r="4"/>
      <circle cx="40" cy="32" r="4"/>
      <path d="M20 44l12 8 12-8"/>
      <path d="M16 28l-4-8"/>
      <path d="M48 28l4-8"/>
      <circle cx="12" cy="18" r="2"/>
      <circle cx="52" cy="18" r="2"/>
    </svg>`
  },
  {
    id: 'env-habitat-protection',
    name: 'Habitat Protection',
    domain: 'biology',
    category: 'conservation',
    tags: ['habitat', 'reserve', 'sanctuary', 'protected', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4L8 20v32l24 8 24-8V20L32 4z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4L8 20v32l24 8 24-8V20L32 4z"/>
      <path d="M24 28l-4 20"/>
      <path d="M40 28l4 20"/>
      <path d="M32 24v-8"/>
      <path d="M28 20l4-4 4 4"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M28 36c2 2 6 2 8 0"/>
    </svg>`
  },
  {
    id: 'env-endangered-species',
    name: 'Endangered Species',
    domain: 'biology',
    category: 'conservation',
    tags: ['endangered', 'extinct', 'threatened', 'IUCN', 'red list'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12l4-12z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12l4-12z"/>
      <circle cx="32" cy="52" r="6"/>
      <text x="28" y="55" font-size="8" fill="currentColor" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'env-reforestation',
    name: 'Reforestation',
    domain: 'biology',
    category: 'conservation',
    tags: ['reforestation', 'trees', 'planting', 'carbon sink', 'restoration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48l8-16-4 4 8-16-4 4 8-16 8 16-4-4 8 16-4-4 8 16H16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 48l8-16-4 4 8-16-4 4 8-16 8 16-4-4 8 16-4-4 8 16H16z"/>
      <rect x="28" y="48" width="8" height="12"/>
      <path d="M8 56h48"/>
    </svg>`
  },
  {
    id: 'env-wildlife-corridor',
    name: 'Wildlife Corridor',
    domain: 'biology',
    category: 'conservation',
    tags: ['corridor', 'connectivity', 'migration', 'pathway', 'habitat link'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="52" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="12" cy="32" rx="8" ry="16"/>
      <ellipse cx="52" cy="32" rx="8" ry="16"/>
      <path d="M20 28h24"/>
      <path d="M20 36h24"/>
      <path d="M28 24l-4 4 4 4"/>
      <path d="M36 28l4 4-4 4"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // SUSTAINABILITY
  // ===========================================================================
  {
    id: 'env-solar-energy',
    name: 'Solar Energy',
    domain: 'biology',
    category: 'sustainability',
    tags: ['solar', 'photovoltaic', 'renewable', 'panel', 'clean energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="20" width="48" height="32" rx="2"/>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <line x1="24" y1="20" x2="24" y2="52"/>
      <line x1="40" y1="20" x2="40" y2="52"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M32 12v8"/>
      <path d="M24 8l8-4 8 4"/>
    </svg>`
  },
  {
    id: 'env-wind-energy',
    name: 'Wind Energy',
    domain: 'biology',
    category: 'sustainability',
    tags: ['wind', 'turbine', 'renewable', 'windmill', 'clean energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="4"/>
      <path d="M32 20l-4-16 8 0-4 16z" fill="currentColor" opacity="0.2"/>
      <path d="M32 20l-4-16 8 0-4 16z"/>
      <path d="M32 20l14 8-4 6-10-14z" fill="currentColor" opacity="0.2"/>
      <path d="M32 20l14 8-4 6-10-14z"/>
      <path d="M32 20l-10 12-4-6 14-6z" fill="currentColor" opacity="0.2"/>
      <path d="M32 20l-10 12-4-6 14-6z"/>
      <path d="M32 24v32"/>
      <path d="M24 56h16"/>
    </svg>`
  },
  {
    id: 'env-recycling',
    name: 'Recycling',
    domain: 'biology',
    category: 'sustainability',
    tags: ['recycle', 'reuse', 'reduce', 'waste', 'circular economy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l8 12H24l8-12z"/>
      <path d="M20 44l-8-12 12-8"/>
      <path d="M44 44l8-12-12-8"/>
      <path d="M24 20l-8 12"/>
      <path d="M40 20l8 12"/>
      <path d="M20 44h24"/>
      <path d="M16 36l-4 8 8 4"/>
      <path d="M48 36l4 8-8 4"/>
      <path d="M28 52l4 8 4-8"/>
    </svg>`
  },
  {
    id: 'env-green-building',
    name: 'Green Building',
    domain: 'biology',
    category: 'sustainability',
    tags: ['LEED', 'sustainable', 'efficient', 'architecture', 'eco-friendly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="32" rx="2"/>
      <path d="M32 8l-24 16h48L32 8z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8l-24 16h48L32 8z"/>
      <rect x="20" y="32" width="8" height="8"/>
      <rect x="36" y="32" width="8" height="8"/>
      <rect x="26" y="44" width="12" height="12"/>
      <path d="M4 20l8-4"/>
      <path d="M60 20l-8-4"/>
      <path d="M8 12l4 4"/>
      <path d="M56 12l-4 4"/>
    </svg>`
  },
  {
    id: 'env-electric-vehicle',
    name: 'Electric Vehicle',
    domain: 'biology',
    category: 'sustainability',
    tags: ['EV', 'electric', 'transport', 'zero emission', 'charging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 36h48l-4-12H12l-4 12z" fill="currentColor" opacity="0.2"/>
      <path d="M8 36h48l-4-12H12l-4 12z"/>
      <path d="M8 36v8h48v-8"/>
      <circle cx="16" cy="44" r="4"/>
      <circle cx="48" cy="44" r="4"/>
      <path d="M28 16h8l-4 8 6-2-8 10 2-8-6 2 2-10z"/>
      <rect x="20" y="28" width="8" height="8"/>
      <rect x="36" y="28" width="8" height="8"/>
    </svg>`
  },

  // ===========================================================================
  // ECOSYSTEMS
  // ===========================================================================
  {
    id: 'env-food-web',
    name: 'Food Web',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['food web', 'trophic', 'predator', 'prey', 'energy flow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6"/>
      <circle cx="16" cy="32" r="6"/>
      <circle cx="48" cy="32" r="6"/>
      <circle cx="24" cy="52" r="6"/>
      <circle cx="40" cy="52" r="6"/>
      <path d="M32 18l-12 10"/>
      <path d="M32 18l12 10"/>
      <path d="M18 38l4 10"/>
      <path d="M46 38l-4 10"/>
      <path d="M30 52h4"/>
    </svg>`
  },
  {
    id: 'env-nitrogen-cycle',
    name: 'Nitrogen Cycle',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['nitrogen', 'fixation', 'nitrification', 'denitrification', 'cycle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <circle cx="32" cy="12" r="4"/>
      <circle cx="52" cy="32" r="4"/>
      <circle cx="32" cy="52" r="4"/>
      <circle cx="12" cy="32" r="4"/>
      <path d="M36 12c8 4 12 12 16 16"/>
      <path d="M52 36c-4 8-12 12-16 16"/>
      <path d="M28 52c-8-4-12-12-16-16"/>
      <path d="M12 28c4-8 12-12 16-16"/>
      <text x="28" y="35" font-size="6" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'env-water-cycle',
    name: 'Water Cycle',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['hydrological', 'evaporation', 'precipitation', 'condensation', 'runoff'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M8 56c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M16 44v-8c0-4 4-8 8-8"/>
      <path d="M8 16c8 0 16 4 24 4s16-4 24-4" fill="currentColor" opacity="0.2"/>
      <path d="M8 16c8 0 16 4 24 4s16-4 24-4"/>
      <path d="M24 28l-2-6-2 6"/>
      <path d="M32 24l-2-6-2 6"/>
      <path d="M40 28l-2-6-2 6"/>
      <path d="M48 36l8-8"/>
      <path d="M52 28l4 4"/>
    </svg>`
  },
  {
    id: 'env-biome',
    name: 'Biome',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['biome', 'ecosystem', 'climate zone', 'habitat', 'vegetation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20"/>
      <path d="M4 32h56"/>
      <path d="M32 12v40"/>
      <path d="M12 20c4 4 12 4 16 0"/>
      <path d="M36 20c4 4 12 4 16 0"/>
      <path d="M12 44c4-4 12-4 16 0"/>
      <path d="M36 44c4-4 12-4 16 0"/>
    </svg>`
  },
  {
    id: 'env-wetland',
    name: 'Wetland',
    domain: 'biology',
    category: 'ecosystems',
    tags: ['wetland', 'marsh', 'swamp', 'estuary', 'riparian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M8 48c8-4 16 4 24 0s16 4 24 0"/>
      <path d="M16 40v-16"/>
      <path d="M12 28l4-4 4 4"/>
      <path d="M32 40v-20"/>
      <path d="M28 24l4-4 4 4"/>
      <path d="M48 40v-16"/>
      <path d="M44 28l4-4 4 4"/>
      <circle cx="24" cy="52" r="2" fill="currentColor"/>
      <circle cx="40" cy="54" r="2" fill="currentColor"/>
    </svg>`
  },
];

export default environmentalIcons;
