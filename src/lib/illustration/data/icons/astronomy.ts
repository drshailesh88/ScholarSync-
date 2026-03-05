/**
 * Astronomy Icon Library
 * Comprehensive SVG icons for astronomical sciences
 *
 * Categories:
 * - Celestial Bodies (planets, stars, moons, asteroids)
 * - Observational Equipment (telescopes, satellites, observatories)
 * - Orbital Mechanics (orbits, trajectories, Kepler)
 * - Constellations (star patterns, celestial coordinates)
 * - Phenomena (eclipses, supernovae, black holes)
 */

import type { IconDefinition } from './index';

export const astronomyIcons: IconDefinition[] = [
  // ===========================================================================
  // CELESTIAL BODIES
  // ===========================================================================
  {
    id: 'astro-sun',
    name: 'Sun',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['sun', 'star', 'solar', 'corona', 'photosphere'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <path d="M32 4v8"/>
      <path d="M32 52v8"/>
      <path d="M4 32h8"/>
      <path d="M52 32h8"/>
      <path d="M12 12l6 6"/>
      <path d="M46 46l6 6"/>
      <path d="M52 12l-6 6"/>
      <path d="M18 46l-6 6"/>
    </svg>`
  },
  {
    id: 'astro-planet',
    name: 'Planet',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['planet', 'terrestrial', 'gas giant', 'world', 'sphere'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="20" ry="6" transform="rotate(-20 32 32)"/>
      <path d="M16 24c4 2 12 2 16 0"/>
      <path d="M20 40c8 2 16 0 20-4"/>
    </svg>`
  },
  {
    id: 'astro-ringed-planet',
    name: 'Ringed Planet',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['saturn', 'rings', 'gas giant', 'planet', 'jovian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="8" transform="rotate(-15 32 32)"/>
      <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.2"/>
      <path d="M18 32c0-7.7 6.3-14 14-14s14 6.3 14 14"/>
      <path d="M46 32c0 7.7-6.3 14-14 14s-14-6.3-14-14"/>
      <ellipse cx="32" cy="32" rx="24" ry="6" transform="rotate(-15 32 32)" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'astro-moon',
    name: 'Moon',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['moon', 'satellite', 'lunar', 'crescent', 'phases'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M40 8c-12 4-20 16-20 28s8 20 20 20c-16 0-28-12-28-28S24 4 40 8z" fill="currentColor" opacity="0.2"/>
      <path d="M40 8c-12 4-20 16-20 28s8 20 20 20c-16 0-28-12-28-28S24 4 40 8z"/>
      <circle cx="28" cy="24" r="3"/>
      <circle cx="36" cy="36" r="4"/>
      <circle cx="24" cy="40" r="2"/>
    </svg>`
  },
  {
    id: 'astro-asteroid',
    name: 'Asteroid',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['asteroid', 'meteoroid', 'minor planet', 'irregular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16l12-4 16 8 8 12-4 16-12 8-16-4-8-12 4-24z" fill="currentColor" opacity="0.2"/>
      <path d="M20 16l12-4 16 8 8 12-4 16-12 8-16-4-8-12 4-24z"/>
      <circle cx="28" cy="28" r="4"/>
      <circle cx="40" cy="36" r="3"/>
      <circle cx="24" cy="40" r="2"/>
    </svg>`
  },
  {
    id: 'astro-comet',
    name: 'Comet',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['comet', 'tail', 'coma', 'nucleus', 'periodic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="48" cy="16" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="16" r="8"/>
      <path d="M42 20c-12 8-28 20-36 32"/>
      <path d="M40 16c-16 4-32 12-36 20"/>
      <path d="M44 22c-8 10-20 24-28 34"/>
    </svg>`
  },
  {
    id: 'astro-star',
    name: 'Star',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['star', 'stellar', 'luminosity', 'magnitude', 'point source'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4l4 20h20l-16 12 6 20-14-12-14 12 6-20L8 24h20l4-20z" fill="currentColor" opacity="0.2"/>
      <path d="M32 4l4 20h20l-16 12 6 20-14-12-14 12 6-20L8 24h20l4-20z"/>
    </svg>`
  },
  {
    id: 'astro-galaxy',
    name: 'Galaxy',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['galaxy', 'spiral', 'milky way', 'nebula', 'stellar system'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(30 32 32)" fill="currentColor" opacity="0.1"/>
      <path d="M32 32c-16-8-20-20-8-24"/>
      <path d="M32 32c16 8 20 20 8 24"/>
      <path d="M32 32c-8 16-20 20-24 8"/>
      <path d="M32 32c8-16 20-20 24-8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'astro-black-hole',
    name: 'Black Hole',
    domain: 'physics',
    category: 'celestial-bodies',
    tags: ['black hole', 'singularity', 'event horizon', 'accretion disk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="currentColor"/>
      <ellipse cx="32" cy="32" rx="24" ry="6"/>
      <ellipse cx="32" cy="32" rx="20" ry="4" stroke-dasharray="3 2"/>
      <path d="M12 28c-4 2-4 6 0 8"/>
      <path d="M52 28c4 2 4 6 0 8"/>
    </svg>`
  },

  // ===========================================================================
  // OBSERVATIONAL EQUIPMENT
  // ===========================================================================
  {
    id: 'astro-telescope',
    name: 'Telescope',
    domain: 'physics',
    category: 'equipment',
    tags: ['telescope', 'refractor', 'optical', 'observation', 'eyepiece'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="24" rx="8" ry="12"/>
      <path d="M20 24h32l4-4v8l-4-4"/>
      <rect x="48" y="20" width="8" height="8" rx="1"/>
      <path d="M28 32v24"/>
      <path d="M20 56h16"/>
      <circle cx="12" cy="24" r="4"/>
    </svg>`
  },
  {
    id: 'astro-radio-telescope',
    name: 'Radio Telescope',
    domain: 'physics',
    category: 'equipment',
    tags: ['radio', 'dish', 'antenna', 'receiver', 'radio astronomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c0-12 10.7-20 24-20s24 8 24 20" fill="currentColor" opacity="0.2"/>
      <path d="M8 24c0-12 10.7-20 24-20s24 8 24 20"/>
      <line x1="32" y1="24" x2="32" y2="8"/>
      <circle cx="32" cy="8" r="3"/>
      <rect x="28" y="24" width="8" height="8"/>
      <path d="M32 32v20"/>
      <path d="M24 52h16"/>
      <path d="M20 60h24"/>
    </svg>`
  },
  {
    id: 'astro-satellite',
    name: 'Satellite',
    domain: 'physics',
    category: 'equipment',
    tags: ['satellite', 'spacecraft', 'solar panel', 'orbit', 'probe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <rect x="4" y="28" width="20" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="4" y="28" width="20" height="8"/>
      <rect x="40" y="28" width="20" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="28" width="20" height="8"/>
      <line x1="8" y1="28" x2="8" y2="36"/>
      <line x1="12" y1="28" x2="12" y2="36"/>
      <line x1="16" y1="28" x2="16" y2="36"/>
      <line x1="48" y1="28" x2="48" y2="36"/>
      <line x1="52" y1="28" x2="52" y2="36"/>
      <line x1="56" y1="28" x2="56" y2="36"/>
      <circle cx="32" cy="32" r="3"/>
    </svg>`
  },
  {
    id: 'astro-observatory',
    name: 'Observatory',
    domain: 'physics',
    category: 'equipment',
    tags: ['observatory', 'dome', 'facility', 'research', 'telescope house'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <rect x="12" y="36" width="40" height="20"/>
      <path d="M12 36c0-12 9-20 20-20s20 8 20 20" fill="currentColor" opacity="0.2"/>
      <path d="M12 36c0-12 9-20 20-20s20 8 20 20"/>
      <path d="M24 24l16 8"/>
      <rect x="28" y="44" width="8" height="12"/>
    </svg>`
  },
  {
    id: 'astro-space-probe',
    name: 'Space Probe',
    domain: 'physics',
    category: 'equipment',
    tags: ['probe', 'spacecraft', 'voyager', 'deep space', 'antenna'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="16" r="8"/>
      <rect x="20" y="24" width="8" height="20"/>
      <path d="M8 48l16-8 16 8"/>
      <path d="M24 44v12"/>
      <rect x="12" y="32" width="24" height="6" rx="1"/>
      <path d="M48 8l-16 8"/>
      <path d="M52 12l-20 10"/>
    </svg>`
  },

  // ===========================================================================
  // ORBITAL MECHANICS
  // ===========================================================================
  {
    id: 'astro-orbit',
    name: 'Orbital Path',
    domain: 'physics',
    category: 'orbital-mechanics',
    tags: ['orbit', 'ellipse', 'trajectory', 'path', 'revolution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="16"/>
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <circle cx="56" cy="28" r="4"/>
      <path d="M52 24l8 4-4 8" stroke-dasharray="2 1"/>
    </svg>`
  },
  {
    id: 'astro-kepler-laws',
    name: 'Kepler Laws',
    domain: 'physics',
    category: 'orbital-mechanics',
    tags: ['kepler', 'ellipse', 'equal areas', 'period', 'laws'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="14"/>
      <circle cx="20" cy="32" r="4" fill="currentColor"/>
      <path d="M20 32L48 24" stroke-dasharray="2 2"/>
      <path d="M20 32L48 40" stroke-dasharray="2 2"/>
      <path d="M20 32L10 32" stroke-dasharray="2 2"/>
      <circle cx="48" cy="24" r="2"/>
      <circle cx="48" cy="40" r="2"/>
      <circle cx="10" cy="32" r="2"/>
    </svg>`
  },
  {
    id: 'astro-gravity-well',
    name: 'Gravity Well',
    domain: 'physics',
    category: 'orbital-mechanics',
    tags: ['gravity', 'well', 'potential', 'curved space', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="24" ry="8"/>
      <path d="M8 24c0 16 10.7 28 24 28s24-12 24-28"/>
      <ellipse cx="32" cy="36" rx="16" ry="5"/>
      <ellipse cx="32" cy="44" rx="8" ry="3"/>
      <circle cx="32" cy="52" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'astro-lagrange-points',
    name: 'Lagrange Points',
    domain: 'physics',
    category: 'orbital-mechanics',
    tags: ['lagrange', 'L1', 'L2', 'stability', 'equilibrium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20"/>
      <circle cx="12" cy="32" r="6" fill="currentColor"/>
      <circle cx="44" cy="32" r="4"/>
      <circle cx="28" cy="32" r="2"/>
      <circle cx="56" cy="32" r="2"/>
      <circle cx="44" cy="14" r="2"/>
      <circle cx="44" cy="50" r="2"/>
      <text x="26" y="28" font-size="4" fill="currentColor" stroke="none">L1</text>
      <text x="54" y="28" font-size="4" fill="currentColor" stroke="none">L2</text>
    </svg>`
  },

  // ===========================================================================
  // CONSTELLATIONS & COORDINATES
  // ===========================================================================
  {
    id: 'astro-constellation',
    name: 'Constellation',
    domain: 'physics',
    category: 'constellations',
    tags: ['constellation', 'star pattern', 'asterism', 'navigation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <circle cx="28" cy="20" r="2" fill="currentColor"/>
      <circle cx="48" cy="16" r="3" fill="currentColor"/>
      <circle cx="20" cy="36" r="2" fill="currentColor"/>
      <circle cx="40" cy="40" r="3" fill="currentColor"/>
      <circle cx="52" cy="52" r="2" fill="currentColor"/>
      <circle cx="16" cy="52" r="2" fill="currentColor"/>
      <path d="M12 12l16 8 20-4"/>
      <path d="M28 20l-8 16"/>
      <path d="M20 36l20 4 12 12"/>
      <path d="M20 36l-4 16"/>
    </svg>`
  },
  {
    id: 'astro-celestial-sphere',
    name: 'Celestial Sphere',
    domain: 'physics',
    category: 'constellations',
    tags: ['celestial sphere', 'coordinates', 'equator', 'poles', 'ecliptic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(23.5 32 32)" stroke-dasharray="4 2"/>
      <path d="M32 8v48"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="56" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'astro-zenith-nadir',
    name: 'Zenith and Nadir',
    domain: 'physics',
    category: 'constellations',
    tags: ['zenith', 'nadir', 'horizon', 'altitude', 'azimuth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="8"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <circle cx="32" cy="8" r="3" fill="currentColor"/>
      <circle cx="32" cy="56" r="3"/>
      <circle cx="32" cy="40" r="4"/>
      <path d="M16 40l8-8 8 8"/>
      <path d="M32 40l8-8 8 8"/>
      <text x="28" y="6" font-size="4" fill="currentColor" stroke="none">Z</text>
      <text x="28" y="62" font-size="4" fill="currentColor" stroke="none">N</text>
    </svg>`
  },

  // ===========================================================================
  // PHENOMENA
  // ===========================================================================
  {
    id: 'astro-solar-eclipse',
    name: 'Solar Eclipse',
    domain: 'physics',
    category: 'phenomena',
    tags: ['eclipse', 'solar', 'corona', 'umbra', 'totality'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="16" fill="currentColor"/>
      <path d="M12 32c0-11 9-20 20-20"/>
      <path d="M32 52c11 0 20-9 20-20"/>
      <path d="M8 20l4 4"/>
      <path d="M52 44l4 4"/>
      <path d="M8 44l4-4"/>
      <path d="M52 20l4-4"/>
    </svg>`
  },
  {
    id: 'astro-lunar-eclipse',
    name: 'Lunar Eclipse',
    domain: 'physics',
    category: 'phenomena',
    tags: ['eclipse', 'lunar', 'umbra', 'penumbra', 'blood moon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="currentColor"/>
      <path d="M26 32h24"/>
      <circle cx="48" cy="32" r="8"/>
      <path d="M40 24v-8"/>
      <path d="M40 40v8"/>
      <circle cx="44" cy="32" r="8" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'astro-supernova',
    name: 'Supernova',
    domain: 'physics',
    category: 'phenomena',
    tags: ['supernova', 'explosion', 'stellar death', 'remnant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <path d="M32 4v12"/>
      <path d="M32 48v12"/>
      <path d="M4 32h12"/>
      <path d="M48 32h12"/>
      <path d="M12 12l10 10"/>
      <path d="M42 42l10 10"/>
      <path d="M52 12l-10 10"/>
      <path d="M22 42l-10 10"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'astro-nebula',
    name: 'Nebula',
    domain: 'physics',
    category: 'phenomena',
    tags: ['nebula', 'gas cloud', 'stellar nursery', 'emission', 'reflection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-20 16-20s12 8 20 12c8 4 8 16 0 20s-12 8-20 8-16-8-16-20z" fill="currentColor" opacity="0.2"/>
      <path d="M16 32c0-12 8-20 16-20s12 8 20 12c8 4 8 16 0 20s-12 8-20 8-16-8-16-20z"/>
      <circle cx="28" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="24" cy="36" r="1" fill="currentColor"/>
    </svg>`
  },
];

export default astronomyIcons;
