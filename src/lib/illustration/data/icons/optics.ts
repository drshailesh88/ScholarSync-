/**
 * Optics Icon Library
 * Comprehensive SVG icons for optical physics and photonics
 *
 * Categories:
 * - Lenses (converging, diverging, focal points)
 * - Mirrors (concave, convex, plane)
 * - Diffraction (slits, gratings, patterns)
 * - Interference (Young's, thin films, coherence)
 * - Lasers (cavities, modes, applications)
 * - Optical Instruments (microscopes, telescopes, spectrometers)
 */

import type { IconDefinition } from './index';

export const opticsIcons: IconDefinition[] = [
  // ===========================================================================
  // LENSES
  // ===========================================================================
  {
    id: 'optics-convex-lens',
    name: 'Convex Lens',
    domain: 'physics',
    category: 'lenses',
    tags: ['convex', 'converging', 'lens', 'focal point', 'biconvex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8c-8 8-8 40 0 48"/>
      <path d="M36 8c8 8 8 40 0 48"/>
      <path d="M4 32h24"/>
      <path d="M36 32h24"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
      <path d="M4 20l28 12-12 12"/>
      <text x="46" y="44" font-size="6" fill="currentColor" stroke="none">f</text>
    </svg>`
  },
  {
    id: 'optics-concave-lens',
    name: 'Concave Lens',
    domain: 'physics',
    category: 'lenses',
    tags: ['concave', 'diverging', 'lens', 'virtual focus', 'biconcave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c8 8 8 40 0 48"/>
      <path d="M40 8c-8 8-8 40 0 48"/>
      <path d="M4 32h20"/>
      <path d="M40 32h20"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <path d="M4 20l36 12"/>
      <path d="M4 44l36-12"/>
      <path d="M24 32l-16-8" stroke-dasharray="3 2"/>
      <path d="M24 32l-16 8" stroke-dasharray="3 2"/>
      <text x="12" y="44" font-size="6" fill="currentColor" stroke="none">f</text>
    </svg>`
  },
  {
    id: 'optics-plano-convex',
    name: 'Plano-Convex Lens',
    domain: 'physics',
    category: 'lenses',
    tags: ['plano-convex', 'lens', 'one flat side', 'focusing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="28" y1="8" x2="28" y2="56"/>
      <path d="M28 8c12 8 12 40 0 48"/>
      <path d="M4 32h24"/>
      <path d="M36 32h20"/>
      <circle cx="48" cy="32" r="2" fill="currentColor"/>
      <path d="M4 24l32 8"/>
      <path d="M4 40l32-8"/>
    </svg>`
  },
  {
    id: 'optics-lens-equation',
    name: 'Thin Lens Diagram',
    domain: 'physics',
    category: 'lenses',
    tags: ['thin lens', 'equation', 'object', 'image', 'magnification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M30 8l4 4-4 4"/>
      <path d="M34 48l-4 4 4 4"/>
      <line x1="4" y1="32" x2="60" y2="32"/>
      <path d="M12 32v-16"/>
      <path d="M12 16l-3 6h6z" fill="currentColor"/>
      <path d="M52 32v8"/>
      <path d="M52 40l-2-4h4z" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <text x="8" y="52" font-size="5" fill="currentColor" stroke="none">obj</text>
      <text x="48" y="52" font-size="5" fill="currentColor" stroke="none">img</text>
    </svg>`
  },

  // ===========================================================================
  // MIRRORS
  // ===========================================================================
  {
    id: 'optics-concave-mirror',
    name: 'Concave Mirror',
    domain: 'physics',
    category: 'mirrors',
    tags: ['concave', 'mirror', 'converging', 'focal point', 'reflection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 8c-16 8-16 40 0 48" stroke-width="2"/>
      <path d="M48 8c-16 8-16 40 0 48" fill="currentColor" opacity="0.1"/>
      <line x1="4" y1="32" x2="48" y2="32"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M4 20l32 12"/>
      <path d="M36 32l-32 12"/>
      <path d="M36 32l12-12"/>
      <text x="28" y="44" font-size="6" fill="currentColor" stroke="none">f</text>
    </svg>`
  },
  {
    id: 'optics-convex-mirror',
    name: 'Convex Mirror',
    domain: 'physics',
    category: 'mirrors',
    tags: ['convex', 'mirror', 'diverging', 'virtual image', 'reflection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c16 8 16 40 0 48" stroke-width="2"/>
      <line x1="16" y1="32" x2="60" y2="32"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <path d="M60 20l-44 12"/>
      <path d="M16 32l44 12"/>
      <path d="M16 20l-8 12" stroke-dasharray="3 2"/>
      <path d="M16 44l-8-12" stroke-dasharray="3 2"/>
      <text x="20" y="44" font-size="6" fill="currentColor" stroke="none">f</text>
    </svg>`
  },
  {
    id: 'optics-plane-mirror',
    name: 'Plane Mirror',
    domain: 'physics',
    category: 'mirrors',
    tags: ['plane', 'mirror', 'flat', 'reflection', 'virtual image'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="36" y1="8" x2="36" y2="56" stroke-width="2"/>
      <rect x="36" y="8" width="4" height="48" fill="currentColor" opacity="0.2"/>
      <path d="M12 24l24 8"/>
      <path d="M36 32l-24 8"/>
      <path d="M12 24v16"/>
      <path d="M12 24l-4 8h8z" fill="currentColor"/>
      <path d="M60 24v16" stroke-dasharray="3 2"/>
      <path d="M60 40l-4-8h8z" fill="none" stroke-dasharray="3 2"/>
      <text x="4" y="52" font-size="5" fill="currentColor" stroke="none">object</text>
      <text x="48" y="52" font-size="5" fill="currentColor" stroke="none">image</text>
    </svg>`
  },

  // ===========================================================================
  // DIFFRACTION
  // ===========================================================================
  {
    id: 'optics-single-slit',
    name: 'Single Slit Diffraction',
    domain: 'physics',
    category: 'diffraction',
    tags: ['single slit', 'diffraction', 'Fraunhofer', 'intensity pattern'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="4" height="20" fill="currentColor"/>
      <rect x="28" y="36" width="4" height="20" fill="currentColor"/>
      <path d="M8 28l20 4"/>
      <path d="M8 32l20 0"/>
      <path d="M8 36l20-4"/>
      <path d="M32 32l24-16"/>
      <path d="M32 32l24 0"/>
      <path d="M32 32l24 16"/>
      <path d="M32 32l24-8"/>
      <path d="M32 32l24 8"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">slit</text>
    </svg>`
  },
  {
    id: 'optics-double-slit',
    name: 'Double Slit Diffraction',
    domain: 'physics',
    category: 'diffraction',
    tags: ['double slit', 'Young', 'interference', 'diffraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="4" height="16" fill="currentColor"/>
      <rect x="28" y="28" width="4" height="8" fill="currentColor"/>
      <rect x="28" y="40" width="4" height="16" fill="currentColor"/>
      <path d="M8 32l20-8"/>
      <path d="M8 32l20 8"/>
      <path d="M32 24l24 8"/>
      <path d="M32 40l24-8"/>
      <path d="M32 24l24-12"/>
      <path d="M32 40l24 12"/>
      <ellipse cx="56" cy="32" rx="2" ry="20" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'optics-diffraction-grating',
    name: 'Diffraction Grating',
    domain: 'physics',
    category: 'diffraction',
    tags: ['grating', 'diffraction', 'orders', 'spectroscopy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="28" y1="8" x2="28" y2="56"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="36" y1="8" x2="36" y2="56"/>
      <path d="M8 32h20"/>
      <path d="M36 32h8"/>
      <path d="M44 32l16 0"/>
      <path d="M44 32l16-12"/>
      <path d="M44 32l16 12"/>
      <path d="M44 32l16-24"/>
      <path d="M44 32l16 24"/>
      <text x="52" y="28" font-size="5" fill="currentColor" stroke="none">m=0</text>
      <text x="52" y="18" font-size="5" fill="currentColor" stroke="none">m=1</text>
      <text x="52" y="48" font-size="5" fill="currentColor" stroke="none">m=-1</text>
    </svg>`
  },
  {
    id: 'optics-diffraction-pattern',
    name: 'Diffraction Pattern',
    domain: 'physics',
    category: 'diffraction',
    tags: ['pattern', 'intensity', 'fringes', 'central maximum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <path d="M8 48c4-4 4-8 8-8s4 8 8 8 4-24 8-24 4 24 8 24 4-8 8-8 4 4 8 8"/>
      <line x1="32" y1="24" x2="32" y2="48" stroke-dasharray="3 2"/>
      <text x="28" y="20" font-size="5" fill="currentColor" stroke="none">I_0</text>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">-2</text>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">-1</text>
      <text x="30" y="56" font-size="5" fill="currentColor" stroke="none">0</text>
      <text x="40" y="56" font-size="5" fill="currentColor" stroke="none">1</text>
      <text x="50" y="56" font-size="5" fill="currentColor" stroke="none">2</text>
    </svg>`
  },

  // ===========================================================================
  // INTERFERENCE
  // ===========================================================================
  {
    id: 'optics-interference-fringes',
    name: 'Interference Fringes',
    domain: 'physics',
    category: 'interference',
    tags: ['interference', 'fringes', 'bright', 'dark', 'constructive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <line x1="16" y1="8" x2="16" y2="56"/>
      <line x1="24" y1="8" x2="24" y2="56" stroke-width="2"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="40" y1="8" x2="40" y2="56" stroke-width="2"/>
      <line x1="48" y1="8" x2="48" y2="56"/>
      <text x="20" y="62" font-size="5" fill="currentColor" stroke="none">bright</text>
      <text x="40" y="62" font-size="5" fill="currentColor" stroke="none">bright</text>
    </svg>`
  },
  {
    id: 'optics-thin-film',
    name: 'Thin Film Interference',
    domain: 'physics',
    category: 'interference',
    tags: ['thin film', 'interference', 'soap bubble', 'oil slick'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="8" fill="#3B82F6" opacity="0.3"/>
      <line x1="8" y1="24" x2="56" y2="24"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <path d="M20 8l4 16"/>
      <path d="M24 24l-8 24"/>
      <path d="M24 24l4 8"/>
      <path d="M28 32l-8 24"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">n1</text>
      <text x="4" y="30" font-size="5" fill="currentColor" stroke="none">n2</text>
      <text x="4" y="44" font-size="5" fill="currentColor" stroke="none">n3</text>
    </svg>`
  },
  {
    id: 'optics-michelson',
    name: 'Michelson Interferometer',
    domain: 'physics',
    category: 'interference',
    tags: ['Michelson', 'interferometer', 'beam splitter', 'precision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h24"/>
      <line x1="32" y1="24" x2="32" y2="40" transform="rotate(45 32 32)"/>
      <path d="M32 32h20"/>
      <line x1="52" y1="28" x2="52" y2="36" stroke-width="2"/>
      <path d="M32 32v-20"/>
      <line x1="28" y1="12" x2="36" y2="12" stroke-width="2"/>
      <path d="M32 32l16 16"/>
      <circle cx="48" cy="48" r="6"/>
      <text x="4" y="28" font-size="5" fill="currentColor" stroke="none">src</text>
      <text x="44" y="56" font-size="5" fill="currentColor" stroke="none">det</text>
    </svg>`
  },
  {
    id: 'optics-newtons-rings',
    name: 'Newton Rings',
    domain: 'physics',
    category: 'interference',
    tags: ['Newton rings', 'interference', 'air wedge', 'circular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="20" stroke-width="2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="12" stroke-width="2"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // LASERS
  // ===========================================================================
  {
    id: 'optics-laser-cavity',
    name: 'Laser Cavity',
    domain: 'physics',
    category: 'lasers',
    tags: ['laser', 'cavity', 'resonator', 'mirrors', 'gain medium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" fill="#EF4444" opacity="0.2"/>
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <line x1="12" y1="20" x2="12" y2="44" stroke-width="3"/>
      <line x1="52" y1="20" x2="52" y2="44" stroke-width="2"/>
      <path d="M52 32h8"/>
      <path d="M56 28l4 4-4 4"/>
      <path d="M16 32h32" stroke="#EF4444" stroke-dasharray="4 2"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">gain</text>
      <text x="54" y="48" font-size="5" fill="currentColor" stroke="none">out</text>
    </svg>`
  },
  {
    id: 'optics-laser-beam',
    name: 'Laser Beam',
    domain: 'physics',
    category: 'lasers',
    tags: ['laser', 'beam', 'coherent', 'collimated', 'monochromatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="16" height="16" rx="2" fill="#EF4444" opacity="0.3"/>
      <rect x="4" y="24" width="16" height="16" rx="2"/>
      <line x1="20" y1="32" x2="60" y2="32" stroke="#EF4444" stroke-width="3"/>
      <path d="M24 28c4 8 8 8 12 0s8-8 12 0 8 8 12 0" stroke="#EF4444" stroke-width="1"/>
      <circle cx="60" cy="32" r="4" fill="#EF4444" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'optics-stimulated-emission',
    name: 'Stimulated Emission',
    domain: 'physics',
    category: 'lasers',
    tags: ['stimulated', 'emission', 'photon', 'amplification', 'laser'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="8"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
      <path d="M4 32c4-4 8-4 12 0" stroke="#3B82F6"/>
      <path d="M32 28c4-4 8-4 12 0" stroke="#3B82F6"/>
      <path d="M32 36c4-4 8-4 12 0" stroke="#3B82F6"/>
      <path d="M48 28c4-4 8-4 12 0" stroke="#3B82F6"/>
      <path d="M48 36c4-4 8-4 12 0" stroke="#3B82F6"/>
      <circle cx="24" cy="40" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M24 24v16" stroke-dasharray="3 2"/>
      <text x="16" y="56" font-size="5" fill="currentColor" stroke="none">atom</text>
    </svg>`
  },
  {
    id: 'optics-population-inversion',
    name: 'Population Inversion',
    domain: 'physics',
    category: 'lasers',
    tags: ['population inversion', 'energy levels', 'pumping', 'laser'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="28" y2="48"/>
      <line x1="8" y1="32" x2="28" y2="32"/>
      <line x1="8" y1="16" x2="28" y2="16"/>
      <circle cx="12" cy="48" r="2" fill="currentColor"/>
      <circle cx="18" cy="48" r="2" fill="currentColor"/>
      <line x1="36" y1="48" x2="56" y2="48"/>
      <line x1="36" y1="32" x2="56" y2="32"/>
      <line x1="36" y1="16" x2="56" y2="16"/>
      <circle cx="40" cy="16" r="2" fill="currentColor"/>
      <circle cx="46" cy="16" r="2" fill="currentColor"/>
      <circle cx="52" cy="16" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <text x="14" y="58" font-size="5" fill="currentColor" stroke="none">normal</text>
      <text x="38" y="58" font-size="5" fill="currentColor" stroke="none">inverted</text>
    </svg>`
  },

  // ===========================================================================
  // OPTICAL INSTRUMENTS
  // ===========================================================================
  {
    id: 'optics-microscope',
    name: 'Compound Microscope',
    domain: 'physics',
    category: 'instruments',
    tags: ['microscope', 'compound', 'objective', 'eyepiece', 'magnification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="12" rx="2"/>
      <path d="M26 20c-8 4-8 8 0 12"/>
      <path d="M38 20c8 4 8 8 0 12"/>
      <rect x="28" y="36" width="8" height="8" rx="1"/>
      <line x1="32" y1="44" x2="32" y2="52"/>
      <line x1="24" y1="52" x2="40" y2="52" stroke-width="2"/>
      <ellipse cx="32" cy="56" rx="12" ry="4"/>
      <circle cx="32" cy="60" r="2" fill="currentColor"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">eye</text>
      <text x="4" y="40" font-size="5" fill="currentColor" stroke="none">obj</text>
    </svg>`
  },
  {
    id: 'optics-telescope',
    name: 'Refracting Telescope',
    domain: 'physics',
    category: 'instruments',
    tags: ['telescope', 'refracting', 'objective', 'eyepiece', 'astronomical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c-4 4-4 16 0 20"/>
      <path d="M8 24h48"/>
      <path d="M8 44h48"/>
      <path d="M56 28c4 4 4 8 0 12"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="4 2"/>
      <circle cx="12" cy="20" r="2" fill="currentColor"/>
      <circle cx="20" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="12" r="2" fill="currentColor"/>
      <circle cx="60" cy="34" r="4"/>
      <text x="4" y="58" font-size="5" fill="currentColor" stroke="none">objective</text>
      <text x="44" y="58" font-size="5" fill="currentColor" stroke="none">eyepiece</text>
    </svg>`
  },
  {
    id: 'optics-prism',
    name: 'Prism Dispersion',
    domain: 'physics',
    category: 'instruments',
    tags: ['prism', 'dispersion', 'spectrum', 'refraction', 'rainbow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8L8 52h48z"/>
      <path d="M4 28l20 8"/>
      <path d="M28 36l28-4" stroke="#EF4444"/>
      <path d="M28 36l28 0" stroke="#F59E0B"/>
      <path d="M28 36l28 4" stroke="#22C55E"/>
      <path d="M28 36l28 8" stroke="#3B82F6"/>
      <path d="M28 36l28 12" stroke="#8B5CF6"/>
    </svg>`
  },
  {
    id: 'optics-spectrometer',
    name: 'Spectrometer',
    domain: 'physics',
    category: 'instruments',
    tags: ['spectrometer', 'spectroscopy', 'wavelength', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="12" height="8"/>
      <path d="M16 32h8"/>
      <line x1="24" y1="20" x2="24" y2="44"/>
      <path d="M24 32l16-8"/>
      <path d="M24 32l16 0"/>
      <path d="M24 32l16 8"/>
      <line x1="44" y1="12" x2="44" y2="52"/>
      <line x1="44" y1="24" x2="56" y2="24"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
      <line x1="44" y1="40" x2="56" y2="40"/>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">src</text>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">slit</text>
      <text x="40" y="56" font-size="5" fill="currentColor" stroke="none">det</text>
    </svg>`
  },
  {
    id: 'optics-fiber',
    name: 'Optical Fiber',
    domain: 'physics',
    category: 'instruments',
    tags: ['fiber optic', 'total internal reflection', 'waveguide', 'communication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 28c16 0 24 8 40 8h16"/>
      <path d="M4 36c16 0 24-8 40-8h16"/>
      <path d="M12 32l8-4v8z" fill="#EF4444"/>
      <path d="M24 34l8-4"/>
      <path d="M32 30l8 4"/>
      <path d="M40 34l8-4"/>
      <path d="M48 30l8 4"/>
      <text x="20" y="48" font-size="5" fill="currentColor" stroke="none">core</text>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">cladding</text>
    </svg>`
  },
];

export default opticsIcons;
