/**
 * Astrophysics Icon Library
 * Comprehensive SVG icons for astrophysics and cosmology
 *
 * Categories:
 * - Stars (types, evolution, structure)
 * - Galaxies (types, structure, dynamics)
 * - Black Holes (event horizon, accretion, jets)
 * - Cosmology (Big Bang, expansion, dark matter)
 * - Observational (telescopes, spectra, techniques)
 */

import type { IconDefinition } from './index';

export const astrophysicsIcons: IconDefinition[] = [
  // ===========================================================================
  // STARS
  // ===========================================================================
  {
    id: 'astro-star',
    name: 'Star',
    domain: 'physics',
    category: 'stars',
    tags: ['star', 'sun', 'stellar', 'fusion', 'luminosity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#F59E0B" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
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
    id: 'astro-red-giant',
    name: 'Red Giant',
    domain: 'physics',
    category: 'stars',
    tags: ['red giant', 'evolved', 'stellar evolution', 'helium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="8" fill="#F59E0B" opacity="0.5"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 8v-4" stroke-dasharray="2 2"/>
      <path d="M32 60v-4" stroke-dasharray="2 2"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">core</text>
    </svg>`
  },
  {
    id: 'astro-white-dwarf',
    name: 'White Dwarf',
    domain: 'physics',
    category: 'stars',
    tags: ['white dwarf', 'degenerate', 'compact', 'electron degeneracy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#E5E7EB" opacity="0.5"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 12v8" stroke-dasharray="3 2"/>
      <path d="M32 44v8" stroke-dasharray="3 2"/>
      <path d="M12 32h8" stroke-dasharray="3 2"/>
      <path d="M44 32h8" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">Earth size</text>
    </svg>`
  },
  {
    id: 'astro-neutron-star',
    name: 'Neutron Star',
    domain: 'physics',
    category: 'stars',
    tags: ['neutron star', 'pulsar', 'magnetar', 'superdense'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#8B5CF6" opacity="0.5"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 8v16"/>
      <path d="M32 40v16"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M28 52l4 4 4-4"/>
      <ellipse cx="32" cy="32" rx="20" ry="6" stroke-dasharray="3 2"/>
      <path d="M16 28c8-8 24-8 32 0" stroke="#3B82F6"/>
      <path d="M16 36c8 8 24 8 32 0" stroke="#3B82F6"/>
    </svg>`
  },
  {
    id: 'astro-supernova',
    name: 'Supernova',
    domain: 'physics',
    category: 'stars',
    tags: ['supernova', 'explosion', 'stellar death', 'nucleosynthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="#F59E0B" opacity="0.8"/>
      <path d="M32 4v12"/>
      <path d="M32 48v12"/>
      <path d="M4 32h12"/>
      <path d="M48 32h12"/>
      <path d="M12 12l10 10"/>
      <path d="M42 42l10 10"/>
      <path d="M12 52l10-10"/>
      <path d="M42 22l10-10"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'astro-hr-diagram',
    name: 'HR Diagram',
    domain: 'physics',
    category: 'stars',
    tags: ['HR diagram', 'Hertzsprung-Russell', 'main sequence', 'stellar classification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="52" x2="12" y2="12"/>
      <line x1="12" y1="52" x2="56" y2="52"/>
      <path d="M16 48l32-32" stroke-width="2"/>
      <circle cx="20" cy="20" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="48" cy="44" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="24" cy="44" r="2" fill="#E5E7EB" opacity="0.5"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="50" y="60" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="28" y="32" font-size="4" fill="currentColor" stroke="none">MS</text>
    </svg>`
  },

  // ===========================================================================
  // GALAXIES
  // ===========================================================================
  {
    id: 'astro-spiral-galaxy',
    name: 'Spiral Galaxy',
    domain: 'physics',
    category: 'galaxies',
    tags: ['spiral', 'galaxy', 'Milky Way', 'arms', 'disk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="6" fill="#F59E0B" opacity="0.3"/>
      <path d="M32 32c8-4 16-2 20 4"/>
      <path d="M32 32c4 8 2 16-4 20"/>
      <path d="M32 32c-8 4-16 2-20-4"/>
      <path d="M32 32c-4-8-2-16 4-20"/>
      <circle cx="48" cy="28" r="1" fill="currentColor"/>
      <circle cx="20" cy="36" r="1" fill="currentColor"/>
      <circle cx="40" cy="40" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'astro-elliptical-galaxy',
    name: 'Elliptical Galaxy',
    domain: 'physics',
    category: 'galaxies',
    tags: ['elliptical', 'galaxy', 'old stars', 'spheroidal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="28" r="1" fill="currentColor"/>
      <circle cx="36" cy="34" r="1" fill="currentColor"/>
      <circle cx="32" cy="30" r="1" fill="currentColor"/>
      <circle cx="40" cy="32" r="1" fill="currentColor"/>
      <circle cx="24" cy="34" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'astro-galaxy-cluster',
    name: 'Galaxy Cluster',
    domain: 'physics',
    category: 'galaxies',
    tags: ['cluster', 'galaxies', 'gravitational', 'dark matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="24" rx="8" ry="4"/>
      <ellipse cx="44" cy="20" rx="6" ry="3"/>
      <ellipse cx="32" cy="36" rx="10" ry="5"/>
      <ellipse cx="16" cy="44" rx="6" ry="3"/>
      <ellipse cx="48" cy="40" rx="7" ry="4"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" opacity="0.5"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">cluster</text>
    </svg>`
  },
  {
    id: 'astro-galactic-rotation',
    name: 'Galaxy Rotation Curve',
    domain: 'physics',
    category: 'galaxies',
    tags: ['rotation curve', 'dark matter', 'velocity', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="48" x2="12" y2="12"/>
      <line x1="12" y1="48" x2="56" y2="48"/>
      <path d="M12 44c16-24 32-24 44-20"/>
      <path d="M12 44c16-16 24-16 32-20" stroke-dasharray="3 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">v</text>
      <text x="50" y="58" font-size="5" fill="currentColor" stroke="none">r</text>
      <text x="40" y="20" font-size="4" fill="currentColor" stroke="none">observed</text>
      <text x="36" y="32" font-size="4" fill="currentColor" stroke="none">expected</text>
    </svg>`
  },

  // ===========================================================================
  // BLACK HOLES
  // ===========================================================================
  {
    id: 'astro-black-hole',
    name: 'Black Hole',
    domain: 'physics',
    category: 'black-holes',
    tags: ['black hole', 'event horizon', 'singularity', 'gravity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="#1F2937"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <path d="M8 32c0-8 8-16 24-16"/>
      <path d="M56 32c0-8-8-16-24-16"/>
      <path d="M8 32c0 8 8 16 24 16"/>
      <path d="M56 32c0 8-8 16-24 16"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">event horizon</text>
    </svg>`
  },
  {
    id: 'astro-accretion-disk',
    name: 'Accretion Disk',
    domain: 'physics',
    category: 'black-holes',
    tags: ['accretion', 'disk', 'AGN', 'quasar', 'matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="#1F2937"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="#F59E0B" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="32" rx="18" ry="6" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="12" ry="4" stroke-dasharray="3 2"/>
      <path d="M52 28l4 4-4 4"/>
      <path d="M12 36l-4-4 4-4"/>
    </svg>`
  },
  {
    id: 'astro-relativistic-jet',
    name: 'Relativistic Jet',
    domain: 'physics',
    category: 'black-holes',
    tags: ['jet', 'relativistic', 'AGN', 'radio galaxy', 'plasma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#1F2937"/>
      <ellipse cx="32" cy="32" rx="16" ry="4"/>
      <path d="M32 24v-20" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M28 8l4-4 4 4" stroke="#8B5CF6"/>
      <path d="M32 40v20" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M28 56l4 4 4-4" stroke="#8B5CF6"/>
      <path d="M28 12c-4-4-4-8 0-8"/>
      <path d="M36 12c4-4 4-8 0-8"/>
      <path d="M28 52c-4 4-4 8 0 8"/>
      <path d="M36 52c4 4 4 8 0 8"/>
    </svg>`
  },
  {
    id: 'astro-gravitational-lensing',
    name: 'Gravitational Lensing',
    domain: 'physics',
    category: 'black-holes',
    tags: ['gravitational lensing', 'Einstein ring', 'light bending', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="8" cy="32" r="3" fill="#F59E0B"/>
      <path d="M11 32c8-12 16-12 21 0"/>
      <path d="M11 32c8 12 16 12 21 0"/>
      <circle cx="56" cy="24" r="2"/>
      <circle cx="56" cy="40" r="2"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">source</text>
      <text x="48" y="48" font-size="4" fill="currentColor" stroke="none">images</text>
    </svg>`
  },

  // ===========================================================================
  // COSMOLOGY
  // ===========================================================================
  {
    id: 'astro-big-bang',
    name: 'Big Bang',
    domain: 'physics',
    category: 'cosmology',
    tags: ['Big Bang', 'origin', 'expansion', 'universe', 'singularity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="#F59E0B" opacity="0.8"/>
      <path d="M12 32l44 0"/>
      <path d="M16 24l40 16"/>
      <path d="M16 40l40-16"/>
      <path d="M16 16l40 32"/>
      <path d="M16 48l40-32"/>
      <circle cx="56" cy="32" r="2"/>
      <circle cx="56" cy="48" r="2"/>
      <circle cx="56" cy="16" r="2"/>
      <circle cx="56" cy="40" r="2"/>
      <circle cx="56" cy="24" r="2"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">t=0</text>
      <text x="48" y="58" font-size="4" fill="currentColor" stroke="none">now</text>
    </svg>`
  },
  {
    id: 'astro-cosmic-expansion',
    name: 'Cosmic Expansion',
    domain: 'physics',
    category: 'cosmology',
    tags: ['expansion', 'Hubble', 'redshift', 'scale factor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v-4"/>
      <path d="M32 60v-4"/>
      <path d="M8 32h-4"/>
      <path d="M60 32h-4"/>
      <circle cx="40" cy="24" r="2"/>
      <circle cx="48" cy="16" r="2"/>
      <circle cx="24" cy="40" r="2"/>
      <circle cx="16" cy="48" r="2"/>
      <path d="M42 22l4-4"/>
      <path d="M22 42l-4 4"/>
    </svg>`
  },
  {
    id: 'astro-dark-matter',
    name: 'Dark Matter Halo',
    domain: 'physics',
    category: 'cosmology',
    tags: ['dark matter', 'halo', 'invisible', 'gravitational'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#6B7280" opacity="0.1" stroke-dasharray="4 2"/>
      <ellipse cx="32" cy="32" rx="16" ry="6"/>
      <circle cx="32" cy="32" r="4" fill="#F59E0B" opacity="0.3"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">dark matter halo</text>
    </svg>`
  },
  {
    id: 'astro-cmb',
    name: 'Cosmic Microwave Background',
    domain: 'physics',
    category: 'cosmology',
    tags: ['CMB', 'microwave background', 'cosmic', 'radiation', 'anisotropy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="16"/>
      <path d="M8 28c8 4 16-4 24 0s16 4 24-4"/>
      <path d="M8 36c8-4 16 4 24 0s16-4 24 4"/>
      <circle cx="20" cy="28" r="3" fill="#EF4444" opacity="0.3"/>
      <circle cx="44" cy="36" r="3" fill="#3B82F6" opacity="0.3"/>
      <circle cx="32" cy="24" r="2" fill="#EF4444" opacity="0.3"/>
      <circle cx="36" cy="40" r="2" fill="#3B82F6" opacity="0.3"/>
      <text x="18" y="56" font-size="5" fill="currentColor" stroke="none">CMB map</text>
    </svg>`
  },

  // ===========================================================================
  // OBSERVATIONAL
  // ===========================================================================
  {
    id: 'astro-telescope',
    name: 'Optical Telescope',
    domain: 'physics',
    category: 'observational',
    tags: ['telescope', 'optical', 'observation', 'astronomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c0-8 8-12 16-8l32 16c4 2 4 8 0 10L24 54c-8 4-16 0-16-8z"/>
      <ellipse cx="16" cy="32" rx="8" ry="12"/>
      <circle cx="52" cy="32" r="6"/>
      <path d="M20 32h28"/>
      <line x1="32" y1="54" x2="32" y2="60"/>
      <line x1="24" y1="60" x2="40" y2="60"/>
    </svg>`
  },
  {
    id: 'astro-radio-telescope',
    name: 'Radio Telescope',
    domain: 'physics',
    category: 'observational',
    tags: ['radio telescope', 'dish', 'antenna', 'radio waves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-12 20-16 20-16s20 4 20 16"/>
      <ellipse cx="32" cy="24" rx="20" ry="8"/>
      <path d="M32 32v20"/>
      <path d="M24 52h16"/>
      <path d="M32 24l8-16" stroke-dasharray="3 2"/>
      <circle cx="40" cy="8" r="2"/>
      <path d="M32 24l-8-12" stroke-dasharray="3 2"/>
      <path d="M32 24l12-8" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'astro-spectrum',
    name: 'Stellar Spectrum',
    domain: 'physics',
    category: 'observational',
    tags: ['spectrum', 'spectral lines', 'absorption', 'emission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <line x1="16" y1="20" x2="16" y2="44" stroke-width="2"/>
      <line x1="24" y1="20" x2="24" y2="44"/>
      <line x1="28" y1="20" x2="28" y2="44" stroke-width="2"/>
      <line x1="36" y1="20" x2="36" y2="44"/>
      <line x1="44" y1="20" x2="44" y2="44" stroke-width="2"/>
      <line x1="48" y1="20" x2="48" y2="44"/>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">H-alpha</text>
      <text x="40" y="56" font-size="5" fill="currentColor" stroke="none">H-beta</text>
    </svg>`
  },
  {
    id: 'astro-redshift',
    name: 'Redshift',
    domain: 'physics',
    category: 'observational',
    tags: ['redshift', 'Doppler', 'recession', 'velocity', 'z'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0"/>
      <path d="M8 44c6-4 12-4 18 0s12 4 18 0" stroke="#EF4444"/>
      <path d="M16 32h32"/>
      <path d="M40 28l8 4-8 4"/>
      <text x="16" y="16" font-size="5" fill="currentColor" stroke="none">emitted</text>
      <text x="16" y="56" font-size="5" fill="#EF4444" stroke="none">observed</text>
      <text x="44" y="28" font-size="5" fill="currentColor" stroke="none">v</text>
    </svg>`
  },
  {
    id: 'astro-parallax',
    name: 'Stellar Parallax',
    domain: 'physics',
    category: 'observational',
    tags: ['parallax', 'distance', 'parsec', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="48" r="6" fill="#F59E0B" opacity="0.3"/>
      <circle cx="32" cy="48" r="6"/>
      <circle cx="12" cy="48" r="3"/>
      <circle cx="52" cy="48" r="3"/>
      <ellipse cx="32" cy="48" rx="20" ry="4" stroke-dasharray="3 2"/>
      <circle cx="32" cy="12" r="4" fill="currentColor"/>
      <path d="M12 48l20-36"/>
      <path d="M52 48l-20-36"/>
      <path d="M28 16l4 8"/>
      <path d="M36 16l-4 8"/>
      <text x="28" y="8" font-size="5" fill="currentColor" stroke="none">star</text>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">Earth orbit</text>
    </svg>`
  },
];

export default astrophysicsIcons;
