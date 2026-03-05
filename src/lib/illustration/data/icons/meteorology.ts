/**
 * Meteorology Icon Library
 * Comprehensive SVG icons for meteorological sciences
 *
 * Categories:
 * - Weather Systems (fronts, pressure systems, cyclones)
 * - Precipitation (rain, snow, hail, fog)
 * - Atmospheric Layers (troposphere, stratosphere, mesosphere)
 * - Instruments (barometer, anemometer, radar)
 * - Phenomena (lightning, tornado, rainbow)
 */

import type { IconDefinition } from './index';

export const meteorologyIcons: IconDefinition[] = [
  // ===========================================================================
  // WEATHER SYSTEMS
  // ===========================================================================
  {
    id: 'met-cold-front',
    name: 'Cold Front',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['cold front', 'front', 'boundary', 'air mass', 'weather'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="3"/>
      <path d="M16 32l-6-8 6 0z" fill="currentColor"/>
      <path d="M28 32l-6-8 6 0z" fill="currentColor"/>
      <path d="M40 32l-6-8 6 0z" fill="currentColor"/>
      <path d="M52 32l-6-8 6 0z" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-warm-front',
    name: 'Warm Front',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['warm front', 'front', 'boundary', 'air mass', 'weather'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="3"/>
      <circle cx="16" cy="26" r="4" fill="currentColor"/>
      <circle cx="28" cy="26" r="4" fill="currentColor"/>
      <circle cx="40" cy="26" r="4" fill="currentColor"/>
      <circle cx="52" cy="26" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-occluded-front',
    name: 'Occluded Front',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['occluded', 'front', 'boundary', 'mature cyclone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="3"/>
      <path d="M14 32l-4-6 4 0z" fill="currentColor"/>
      <circle cx="22" cy="26" r="3" fill="currentColor"/>
      <path d="M30 32l-4-6 4 0z" fill="currentColor"/>
      <circle cx="38" cy="26" r="3" fill="currentColor"/>
      <path d="M46 32l-4-6 4 0z" fill="currentColor"/>
      <circle cx="54" cy="26" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-high-pressure',
    name: 'High Pressure System',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['high pressure', 'anticyclone', 'H', 'fair weather', 'ridge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="24" y="38" font-size="16" font-weight="bold" fill="currentColor" stroke="none">H</text>
      <path d="M32 8l4 4-4 4"/>
      <path d="M56 32l-4 4-4-4"/>
      <path d="M32 56l-4-4 4-4"/>
      <path d="M8 32l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'met-low-pressure',
    name: 'Low Pressure System',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['low pressure', 'cyclone', 'L', 'storm', 'trough'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="26" y="38" font-size="16" font-weight="bold" fill="currentColor" stroke="none">L</text>
      <path d="M32 8l-4 4 4 4"/>
      <path d="M56 32l-4-4-4 4"/>
      <path d="M32 56l4-4-4-4"/>
      <path d="M8 32l4 4 4-4"/>
    </svg>`
  },
  {
    id: 'met-hurricane',
    name: 'Hurricane',
    domain: 'physics',
    category: 'weather-systems',
    tags: ['hurricane', 'typhoon', 'cyclone', 'tropical', 'eye'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 8c-13 0-24 11-24 24"/>
      <path d="M56 32c0 13-11 24-24 24"/>
      <path d="M32 16c-9 0-16 7-16 16"/>
      <path d="M48 32c0 9-7 16-16 16"/>
    </svg>`
  },

  // ===========================================================================
  // PRECIPITATION
  // ===========================================================================
  {
    id: 'met-rain',
    name: 'Rain',
    domain: 'physics',
    category: 'precipitation',
    tags: ['rain', 'precipitation', 'rainfall', 'shower', 'drizzle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-8 8-16 20-16s20 8 20 16c0 4-4 8-8 8H20c-4 0-8-4-8-8z" fill="currentColor" opacity="0.2"/>
      <path d="M12 28c0-8 8-16 20-16s20 8 20 16c0 4-4 8-8 8H20c-4 0-8-4-8-8z"/>
      <path d="M20 44l-4 8"/>
      <path d="M28 44l-4 12"/>
      <path d="M36 44l-4 8"/>
      <path d="M44 44l-4 12"/>
    </svg>`
  },
  {
    id: 'met-snow',
    name: 'Snow',
    domain: 'physics',
    category: 'precipitation',
    tags: ['snow', 'snowfall', 'flurry', 'blizzard', 'winter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-8 8-14 20-14s20 6 20 14c0 4-4 6-8 6H20c-4 0-8-2-8-6z" fill="currentColor" opacity="0.2"/>
      <path d="M12 24c0-8 8-14 20-14s20 6 20 14c0 4-4 6-8 6H20c-4 0-8-2-8-6z"/>
      <path d="M20 40v8"/>
      <path d="M16 44h8"/>
      <path d="M32 44v8"/>
      <path d="M28 48h8"/>
      <path d="M44 40v8"/>
      <path d="M40 44h8"/>
      <path d="M26 54v4"/>
      <path d="M38 54v4"/>
    </svg>`
  },
  {
    id: 'met-hail',
    name: 'Hail',
    domain: 'physics',
    category: 'precipitation',
    tags: ['hail', 'hailstorm', 'ice', 'precipitation', 'severe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-8 8-14 20-14s20 6 20 14c0 4-4 6-8 6H20c-4 0-8-2-8-6z" fill="currentColor" opacity="0.3"/>
      <path d="M12 24c0-8 8-14 20-14s20 6 20 14c0 4-4 6-8 6H20c-4 0-8-2-8-6z"/>
      <circle cx="20" cy="40" r="4" fill="currentColor"/>
      <circle cx="32" cy="44" r="5" fill="currentColor"/>
      <circle cx="44" cy="40" r="4" fill="currentColor"/>
      <circle cx="26" cy="54" r="3" fill="currentColor"/>
      <circle cx="38" cy="52" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-fog',
    name: 'Fog',
    domain: 'physics',
    category: 'precipitation',
    tags: ['fog', 'mist', 'visibility', 'haze', 'condensation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h48"/>
      <path d="M12 28h40"/>
      <path d="M8 36h48"/>
      <path d="M12 44h40"/>
      <path d="M8 52h48"/>
    </svg>`
  },
  {
    id: 'met-sleet',
    name: 'Sleet',
    domain: 'physics',
    category: 'precipitation',
    tags: ['sleet', 'ice pellets', 'freezing rain', 'mixed', 'winter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-8 8-14 20-14s20 6 20 14c0 4-4 6-8 6H20c-4 0-8-2-8-6z"/>
      <path d="M18 40l-4 8"/>
      <circle cx="26" cy="44" r="3" fill="currentColor"/>
      <path d="M34 38l-4 12"/>
      <circle cx="42" cy="42" r="3" fill="currentColor"/>
      <path d="M50 40l-4 8"/>
      <circle cx="22" cy="56" r="2" fill="currentColor"/>
      <path d="M38 52l-2 6"/>
    </svg>`
  },

  // ===========================================================================
  // ATMOSPHERIC LAYERS
  // ===========================================================================
  {
    id: 'met-troposphere',
    name: 'Troposphere',
    domain: 'physics',
    category: 'atmospheric-layers',
    tags: ['troposphere', 'weather', 'layer', 'atmosphere', 'boundary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="48" height="20" fill="currentColor" opacity="0.2"/>
      <path d="M8 36h48"/>
      <path d="M8 56h48"/>
      <path d="M16 44c4 4 8 4 12 0"/>
      <path d="M36 48c4 4 8 4 12 0"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">0-12 km</text>
      <path d="M32 28v8"/>
      <path d="M28 32l4 4 4-4"/>
    </svg>`
  },
  {
    id: 'met-stratosphere',
    name: 'Stratosphere',
    domain: 'physics',
    category: 'atmospheric-layers',
    tags: ['stratosphere', 'ozone', 'layer', 'atmosphere', 'jet stream'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.15"/>
      <path d="M8 24h48"/>
      <path d="M8 40h48"/>
      <text x="16" y="34" font-size="5" fill="currentColor" stroke="none">12-50 km</text>
      <path d="M40 28h12"/>
      <path d="M44 24l4 4 4-4"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-mesosphere',
    name: 'Mesosphere',
    domain: 'physics',
    category: 'atmospheric-layers',
    tags: ['mesosphere', 'meteors', 'layer', 'atmosphere', 'cold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="12" fill="currentColor" opacity="0.1"/>
      <path d="M8 20h48"/>
      <path d="M8 32h48"/>
      <text x="16" y="28" font-size="5" fill="currentColor" stroke="none">50-85 km</text>
      <path d="M40 12l8 8"/>
      <path d="M44 16l-2-2 2-2"/>
      <circle cx="48" cy="20" r="1" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // INSTRUMENTS
  // ===========================================================================
  {
    id: 'met-barometer',
    name: 'Barometer',
    domain: 'physics',
    category: 'instruments',
    tags: ['barometer', 'pressure', 'mercury', 'aneroid', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 16v4"/>
      <path d="M32 44v4"/>
      <path d="M16 32h4"/>
      <path d="M44 32h4"/>
      <path d="M32 32l8-12"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">LOW</text>
      <text x="36" y="54" font-size="4" fill="currentColor" stroke="none">HIGH</text>
    </svg>`
  },
  {
    id: 'met-anemometer',
    name: 'Anemometer',
    domain: 'physics',
    category: 'instruments',
    tags: ['anemometer', 'wind', 'speed', 'cups', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="4"/>
      <path d="M32 28v28"/>
      <path d="M24 56h16"/>
      <path d="M32 24l-12-8c-4-2-4-6 0-8 2 0 4 2 4 4l8 8"/>
      <path d="M32 24l12-8c4-2 4-6 0-8-2 0-4 2-4 4l-8 8"/>
      <path d="M32 24v-16c0-4 4-6 8-4 2 2 0 4-2 6l-6 10"/>
    </svg>`
  },
  {
    id: 'met-weather-radar',
    name: 'Weather Radar',
    domain: 'physics',
    category: 'instruments',
    tags: ['radar', 'Doppler', 'precipitation', 'storm', 'detection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c0-20 10.7-36 24-36s24 16 24 36"/>
      <circle cx="32" cy="48" r="4"/>
      <path d="M32 44v-24"/>
      <path d="M24 24l8-4 8 4"/>
      <path d="M16 36c4 4 12 4 16 0"/>
      <path d="M32 36c4 4 12 4 16 0"/>
      <rect x="28" y="52" width="8" height="8"/>
    </svg>`
  },
  {
    id: 'met-thermometer',
    name: 'Thermometer',
    domain: 'physics',
    category: 'instruments',
    tags: ['thermometer', 'temperature', 'celsius', 'fahrenheit', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8v32c4 2 8 6 8 12 0 8-6.4 12-12 12s-12-4-12-12c0-6 4-10 8-12V8z"/>
      <circle cx="32" cy="52" r="6" fill="currentColor"/>
      <path d="M32 48V24" stroke-width="4"/>
      <path d="M40 16h8"/>
      <path d="M40 24h8"/>
      <path d="M40 32h8"/>
    </svg>`
  },
  {
    id: 'met-hygrometer',
    name: 'Hygrometer',
    domain: 'physics',
    category: 'instruments',
    tags: ['hygrometer', 'humidity', 'moisture', 'relative humidity', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M32 14v4"/>
      <path d="M32 46v4"/>
      <path d="M14 32h4"/>
      <path d="M46 32h4"/>
      <path d="M32 32l-10 10"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M24 40l-2 4"/>
      <path d="M40 40l2 4"/>
      <text x="24" y="52" font-size="4" fill="currentColor" stroke="none">RH%</text>
    </svg>`
  },
  {
    id: 'met-weather-balloon',
    name: 'Weather Balloon',
    domain: 'physics',
    category: 'instruments',
    tags: ['balloon', 'radiosonde', 'sounding', 'upper air', 'profile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="16"/>
      <path d="M32 36v8"/>
      <rect x="24" y="44" width="16" height="12" rx="2"/>
      <path d="M28 48h8"/>
      <path d="M28 52h8"/>
      <path d="M28 36l4 4 4-4"/>
    </svg>`
  },

  // ===========================================================================
  // PHENOMENA
  // ===========================================================================
  {
    id: 'met-lightning',
    name: 'Lightning',
    domain: 'physics',
    category: 'phenomena',
    tags: ['lightning', 'thunder', 'storm', 'electric', 'discharge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c0-8 8-12 20-12s20 4 20 12c0 4-4 8-8 8H20c-4 0-8-4-8-8z" fill="currentColor" opacity="0.3"/>
      <path d="M12 20c0-8 8-12 20-12s20 4 20 12c0 4-4 8-8 8H20c-4 0-8-4-8-8z"/>
      <path d="M36 28l-8 16h12l-8 16" stroke-width="3" fill="none"/>
    </svg>`
  },
  {
    id: 'met-tornado',
    name: 'Tornado',
    domain: 'physics',
    category: 'phenomena',
    tags: ['tornado', 'twister', 'funnel', 'severe', 'vortex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12c0-4 8-8 20-8s20 4 20 8c0 4-4 4-8 4H20c-4 0-8 0-8-4z" fill="currentColor" opacity="0.3"/>
      <path d="M12 12c0-4 8-8 20-8s20 4 20 8c0 4-4 4-8 4H20c-4 0-8 0-8-4z"/>
      <path d="M16 16c4 4 12 4 16 0"/>
      <path d="M32 16c4 4 12 4 16 0"/>
      <path d="M24 24l-8 32"/>
      <path d="M40 24l8 32"/>
      <path d="M28 32l-4 20"/>
      <path d="M36 32l4 20"/>
    </svg>`
  },
  {
    id: 'met-rainbow',
    name: 'Rainbow',
    domain: 'physics',
    category: 'phenomena',
    tags: ['rainbow', 'spectrum', 'refraction', 'arc', 'colors'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c0-20 10.7-36 24-36s24 16 24 36"/>
      <path d="M14 48c0-16 8-30 18-30s18 14 18 30"/>
      <path d="M20 48c0-12 5.4-22 12-22s12 10 12 22"/>
      <path d="M26 48c0-8 2.7-14 6-14s6 6 6 14"/>
    </svg>`
  },
  {
    id: 'met-dust-storm',
    name: 'Dust Storm',
    domain: 'physics',
    category: 'phenomena',
    tags: ['dust storm', 'haboob', 'sand', 'visibility', 'arid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8-8 16 0 24-8s16 0 24-8"/>
      <path d="M8 36c8-8 16 0 24-8s16 0 24-8"/>
      <path d="M8 48c8-8 16 0 24-8s16 0 24-8"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
      <circle cx="48" cy="36" r="2" fill="currentColor"/>
      <circle cx="24" cy="44" r="2" fill="currentColor"/>
      <circle cx="40" cy="48" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'met-aurora',
    name: 'Aurora',
    domain: 'physics',
    category: 'phenomena',
    tags: ['aurora', 'borealis', 'australis', 'northern lights', 'solar wind'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c4-16 8-32 16-40"/>
      <path d="M20 56c4-20 8-36 12-44"/>
      <path d="M32 56c4-24 4-40 8-48"/>
      <path d="M44 56c0-20 4-36 4-44"/>
      <path d="M12 20c4-4 8-4 12 0"/>
      <path d="M28 16c4-4 8-4 12 0"/>
      <circle cx="16" cy="36" r="2" fill="currentColor"/>
      <circle cx="36" cy="28" r="2" fill="currentColor"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
];

export default meteorologyIcons;
