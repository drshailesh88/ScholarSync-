/**
 * Civil Engineering Icon Library
 * Comprehensive SVG icons for civil engineering
 *
 * Categories:
 * - Structures (beams, columns, trusses, frames)
 * - Bridges (arch, suspension, truss, cable-stayed)
 * - Buildings (foundations, walls, floors, roofs)
 * - Surveying (theodolite, level, GPS, total station)
 * - Geotechnical (soil, piles, retaining walls)
 * - Transportation (roads, intersections, signs)
 */

import type { IconDefinition } from './index';

export const civilIcons: IconDefinition[] = [
  // ===========================================================================
  // STRUCTURAL ELEMENTS
  // ===========================================================================
  {
    id: 'civil-beam-ibeam',
    name: 'I-Beam Section',
    domain: 'engineering',
    category: 'structures',
    tags: ['beam', 'I-beam', 'steel', 'section', 'structural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12h32"/>
      <path d="M16 52h32"/>
      <path d="M32 12v40"/>
      <path d="M16 12v4"/>
      <path d="M48 12v4"/>
      <path d="M16 48v4"/>
      <path d="M48 48v4"/>
      <rect x="28" y="12" width="8" height="40" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'civil-column',
    name: 'Column',
    domain: 'engineering',
    category: 'structures',
    tags: ['column', 'pillar', 'vertical', 'support', 'compression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="16" height="48"/>
      <path d="M20 8h24"/>
      <path d="M20 56h24"/>
      <path d="M28 16v32" stroke-dasharray="4 2"/>
      <path d="M36 16v32" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'civil-truss',
    name: 'Truss Structure',
    domain: 'engineering',
    category: 'structures',
    tags: ['truss', 'triangular', 'frame', 'roof', 'bridge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48h48"/>
      <path d="M8 48l24-32 24 32"/>
      <path d="M16 48l16-21.3"/>
      <path d="M48 48l-16-21.3"/>
      <path d="M24 48v-16"/>
      <path d="M40 48v-16"/>
      <path d="M24 32h16"/>
      <circle cx="8" cy="48" r="2" fill="currentColor"/>
      <circle cx="56" cy="48" r="2" fill="currentColor"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'civil-frame-portal',
    name: 'Portal Frame',
    domain: 'engineering',
    category: 'structures',
    tags: ['frame', 'portal', 'rigid', 'moment', 'building'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56v-36l20-12 20 12v36"/>
      <path d="M12 20h40"/>
      <path d="M8 56h8"/>
      <path d="M48 56h8"/>
      <circle cx="12" cy="56" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="56" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'civil-cantilever',
    name: 'Cantilever Beam',
    domain: 'engineering',
    category: 'structures',
    tags: ['cantilever', 'beam', 'overhang', 'fixed', 'moment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="8" height="24" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="24" width="8" height="24"/>
      <rect x="16" y="32" width="40" height="8"/>
      <path d="M56 36l-4 8"/>
      <path d="M56 36v12"/>
      <path d="M48 48h12"/>
      <text x="52" y="46" font-size="6" fill="currentColor" stroke="none">P</text>
    </svg>`
  },

  // ===========================================================================
  // BRIDGES
  // ===========================================================================
  {
    id: 'civil-bridge-arch',
    name: 'Arch Bridge',
    domain: 'engineering',
    category: 'bridges',
    tags: ['bridge', 'arch', 'span', 'masonry', 'compression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 48h56"/>
      <path d="M8 48c0-24 48-24 48 0"/>
      <path d="M8 48v-8"/>
      <path d="M56 48v-8"/>
      <path d="M20 48v-16"/>
      <path d="M32 48v-20"/>
      <path d="M44 48v-16"/>
      <rect x="4" y="36" width="56" height="4" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'civil-bridge-suspension',
    name: 'Suspension Bridge',
    domain: 'engineering',
    category: 'bridges',
    tags: ['bridge', 'suspension', 'cable', 'tower', 'span'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 44h56"/>
      <path d="M16 44v-28"/>
      <path d="M48 44v-28"/>
      <path d="M4 20c12 12 20 12 28 12s16 0 28-12"/>
      <path d="M16 16l-12 4"/>
      <path d="M48 16l12 4"/>
      <path d="M20 30v14"/>
      <path d="M26 32v12"/>
      <path d="M32 32v12"/>
      <path d="M38 32v12"/>
      <path d="M44 30v14"/>
    </svg>`
  },
  {
    id: 'civil-bridge-truss',
    name: 'Truss Bridge',
    domain: 'engineering',
    category: 'bridges',
    tags: ['bridge', 'truss', 'steel', 'triangular', 'span'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 24h56"/>
      <path d="M4 44h56"/>
      <path d="M4 24v20"/>
      <path d="M60 24v20"/>
      <path d="M16 24v20"/>
      <path d="M28 24v20"/>
      <path d="M40 24v20"/>
      <path d="M52 24v20"/>
      <path d="M4 24l12 20"/>
      <path d="M16 24l12 20"/>
      <path d="M28 24l12 20"/>
      <path d="M40 24l12 20"/>
      <path d="M52 24l8 10"/>
    </svg>`
  },
  {
    id: 'civil-bridge-cable-stayed',
    name: 'Cable-Stayed Bridge',
    domain: 'engineering',
    category: 'bridges',
    tags: ['bridge', 'cable-stayed', 'modern', 'tower', 'fan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 44h56"/>
      <path d="M32 44v-36"/>
      <path d="M32 12l-24 32"/>
      <path d="M32 12l24 32"/>
      <path d="M32 20l-16 24"/>
      <path d="M32 20l16 24"/>
      <path d="M32 28l-8 16"/>
      <path d="M32 28l8 16"/>
      <path d="M28 8h8"/>
      <path d="M30 8v4"/>
      <path d="M34 8v4"/>
    </svg>`
  },
  {
    id: 'civil-bridge-beam',
    name: 'Beam Bridge',
    domain: 'engineering',
    category: 'bridges',
    tags: ['bridge', 'beam', 'girder', 'simple', 'span'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="56" height="8" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="28" width="56" height="8"/>
      <rect x="8" y="36" width="8" height="16"/>
      <rect x="48" y="36" width="8" height="16"/>
      <path d="M4 52h12"/>
      <path d="M48 52h12"/>
    </svg>`
  },

  // ===========================================================================
  // FOUNDATIONS & GEOTECHNICAL
  // ===========================================================================
  {
    id: 'civil-foundation-spread',
    name: 'Spread Footing',
    domain: 'engineering',
    category: 'foundations',
    tags: ['foundation', 'footing', 'spread', 'shallow', 'concrete'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24"/>
      <path d="M24 32l-12 8v8h40v-8l-12-8"/>
      <rect x="12" y="40" width="40" height="8" fill="currentColor" opacity="0.2"/>
      <path d="M8 52l4-4h40l4 4" stroke-dasharray="2 2"/>
      <path d="M4 56h56" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'civil-pile',
    name: 'Pile Foundation',
    domain: 'engineering',
    category: 'foundations',
    tags: ['pile', 'foundation', 'deep', 'driven', 'bearing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="8"/>
      <rect x="12" y="16" width="8" height="40"/>
      <rect x="28" y="16" width="8" height="40"/>
      <rect x="44" y="16" width="8" height="40"/>
      <path d="M16 56l-4 4"/>
      <path d="M32 56l0 4"/>
      <path d="M48 56l4 4"/>
      <path d="M4 20h56" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'civil-retaining-wall',
    name: 'Retaining Wall',
    domain: 'engineering',
    category: 'foundations',
    tags: ['retaining', 'wall', 'earth', 'pressure', 'gravity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48"/>
      <path d="M20 8l12 0 0 48-12 0"/>
      <path d="M32 48h8v8h-8"/>
      <rect x="20" y="8" width="12" height="48" fill="currentColor" opacity="0.2"/>
      <path d="M8 16l12-8"/>
      <path d="M8 24l12-8"/>
      <path d="M8 32l12-8"/>
      <path d="M8 40l12-8"/>
      <path d="M8 48l12-8"/>
      <path d="M8 56h12"/>
      <path d="M32 56h24" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'civil-soil-layers',
    name: 'Soil Profile',
    domain: 'engineering',
    category: 'geotechnical',
    tags: ['soil', 'layers', 'strata', 'profile', 'geology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="12"/>
      <rect x="8" y="20" width="48" height="16"/>
      <rect x="8" y="36" width="48" height="12"/>
      <rect x="8" y="48" width="48" height="8"/>
      <path d="M12 14h4"/>
      <path d="M20 14h4"/>
      <path d="M28 14h4"/>
      <circle cx="16" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M12 42h8" stroke-dasharray="2 2"/>
      <path d="M24 42h8" stroke-dasharray="2 2"/>
      <path d="M40 42h8" stroke-dasharray="2 2"/>
      <rect x="8" y="48" width="48" height="8" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'civil-excavation',
    name: 'Excavation',
    domain: 'engineering',
    category: 'geotechnical',
    tags: ['excavation', 'dig', 'earthwork', 'cut', 'slope'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 24h16l8 24h8l8-24h16"/>
      <path d="M20 24l8 24" stroke-dasharray="4 2"/>
      <path d="M44 24l-8 24" stroke-dasharray="4 2"/>
      <path d="M4 24v32"/>
      <path d="M60 24v32"/>
      <path d="M28 48h8"/>
      <text x="30" y="40" font-size="5" fill="currentColor" stroke="none">H</text>
    </svg>`
  },

  // ===========================================================================
  // SURVEYING EQUIPMENT
  // ===========================================================================
  {
    id: 'civil-theodolite',
    name: 'Theodolite',
    domain: 'engineering',
    category: 'surveying',
    tags: ['theodolite', 'survey', 'angle', 'instrument', 'transit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12"/>
      <path d="M20 24h24"/>
      <circle cx="32" cy="24" r="4"/>
      <path d="M32 12v-4"/>
      <path d="M28 36l-8 20"/>
      <path d="M36 36l8 20"/>
      <path d="M32 36v20"/>
      <path d="M16 56h32"/>
      <rect x="28" y="32" width="8" height="8"/>
    </svg>`
  },
  {
    id: 'civil-level-instrument',
    name: 'Level Instrument',
    domain: 'engineering',
    category: 'surveying',
    tags: ['level', 'survey', 'elevation', 'benchmark', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="12" rx="2"/>
      <circle cx="32" cy="26" r="4"/>
      <path d="M8 26h8"/>
      <path d="M48 26h8"/>
      <path d="M28 32v4"/>
      <path d="M36 32v4"/>
      <path d="M24 36l-8 20"/>
      <path d="M40 36l8 20"/>
      <path d="M32 36v20"/>
      <path d="M12 56h40"/>
    </svg>`
  },
  {
    id: 'civil-total-station',
    name: 'Total Station',
    domain: 'engineering',
    category: 'surveying',
    tags: ['total station', 'survey', 'EDM', 'coordinates', 'electronic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="20" rx="2"/>
      <circle cx="32" cy="22" r="6"/>
      <path d="M26 22h12"/>
      <path d="M32 16v12"/>
      <rect x="24" y="32" width="16" height="8"/>
      <path d="M28 40l-8 16"/>
      <path d="M36 40l8 16"/>
      <path d="M32 40v16"/>
      <path d="M16 56h32"/>
      <path d="M8 22h12"/>
      <path d="M44 22h12"/>
    </svg>`
  },
  {
    id: 'civil-gps-receiver',
    name: 'GPS Receiver',
    domain: 'engineering',
    category: 'surveying',
    tags: ['GPS', 'GNSS', 'satellite', 'positioning', 'survey'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M32 8v-4"/>
      <path d="M32 32v8"/>
      <rect x="24" y="40" width="16" height="8"/>
      <path d="M28 48l-4 8"/>
      <path d="M36 48l4 8"/>
      <path d="M32 48v8"/>
      <path d="M20 56h24"/>
      <path d="M24 16c4 0 8 4 8 4s4-4 8-4" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'civil-staff-rod',
    name: 'Survey Staff/Rod',
    domain: 'engineering',
    category: 'surveying',
    tags: ['staff', 'rod', 'leveling', 'measurement', 'survey'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="48"/>
      <path d="M28 16h8"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
      <path d="M28 48h8"/>
      <rect x="28" y="8" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="24" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="40" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M24 56h16"/>
    </svg>`
  },

  // ===========================================================================
  // TRANSPORTATION
  // ===========================================================================
  {
    id: 'civil-road-section',
    name: 'Road Cross Section',
    domain: 'engineering',
    category: 'transportation',
    tags: ['road', 'section', 'pavement', 'cross-section', 'highway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 40l12-8h32l12 8"/>
      <path d="M16 32h32"/>
      <rect x="16" y="32" width="32" height="4" fill="currentColor" opacity="0.2"/>
      <path d="M4 44h56"/>
      <path d="M32 32v-8"/>
      <path d="M30 24l4 0"/>
      <path d="M28 28l8 0" stroke-dasharray="2 2"/>
      <path d="M8 48l4-4"/>
      <path d="M52 48l4-4"/>
    </svg>`
  },
  {
    id: 'civil-intersection',
    name: 'Road Intersection',
    domain: 'engineering',
    category: 'transportation',
    tags: ['intersection', 'junction', 'crossroad', 'traffic', 'road'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4v20"/>
      <path d="M40 4v20"/>
      <path d="M24 40v20"/>
      <path d="M40 40v20"/>
      <path d="M4 24h20"/>
      <path d="M4 40h20"/>
      <path d="M40 24h20"/>
      <path d="M40 40h20"/>
      <rect x="24" y="24" width="16" height="16" fill="currentColor" opacity="0.1"/>
      <path d="M32 4v8" stroke-dasharray="2 2"/>
      <path d="M32 52v8" stroke-dasharray="2 2"/>
      <path d="M4 32h8" stroke-dasharray="2 2"/>
      <path d="M52 32h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'civil-traffic-signal',
    name: 'Traffic Signal',
    domain: 'engineering',
    category: 'transportation',
    tags: ['traffic', 'signal', 'light', 'control', 'intersection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="36" rx="2"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="26" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.1"/>
      <path d="M32 44v12"/>
      <path d="M24 56h16"/>
      <path d="M40 20h8"/>
      <path d="M16 20h8"/>
    </svg>`
  },
  {
    id: 'civil-guardrail',
    name: 'Guardrail',
    domain: 'engineering',
    category: 'transportation',
    tags: ['guardrail', 'barrier', 'safety', 'road', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 28h56"/>
      <path d="M4 32h56"/>
      <path d="M8 32v16"/>
      <path d="M24 32v16"/>
      <path d="M40 32v16"/>
      <path d="M56 32v16"/>
      <path d="M4 48h56"/>
      <path d="M8 36c4 2 4 6 0 8"/>
      <path d="M24 36c4 2 4 6 0 8"/>
      <path d="M40 36c4 2 4 6 0 8"/>
    </svg>`
  },
  {
    id: 'civil-culvert',
    name: 'Culvert',
    domain: 'engineering',
    category: 'transportation',
    tags: ['culvert', 'drainage', 'pipe', 'crossing', 'water'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20l24 8 8 0 24-8"/>
      <path d="M4 44l24-8 8 0 24 8"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <ellipse cx="8" cy="32" rx="4" ry="12"/>
      <ellipse cx="56" cy="32" rx="4" ry="12"/>
      <path d="M4 20v24"/>
      <path d="M60 20v24"/>
      <path d="M28 32h8" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // CONSTRUCTION EQUIPMENT
  // ===========================================================================
  {
    id: 'civil-crane',
    name: 'Tower Crane',
    domain: 'engineering',
    category: 'construction',
    tags: ['crane', 'tower', 'lift', 'construction', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 56v-44"/>
      <path d="M32 56v-44"/>
      <path d="M28 12h32"/>
      <path d="M12 12h16"/>
      <path d="M60 12v4l-8 4"/>
      <path d="M16 12l-4 4v8"/>
      <path d="M52 20v12"/>
      <rect x="48" y="32" width="8" height="6"/>
      <path d="M28 16l4-4 4 4"/>
      <path d="M24 56h12"/>
    </svg>`
  },
  {
    id: 'civil-excavator',
    name: 'Excavator',
    domain: 'engineering',
    category: 'construction',
    tags: ['excavator', 'digger', 'earthmover', 'construction', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="24" height="12" rx="2"/>
      <rect x="12" y="28" width="12" height="8"/>
      <path d="M24 32l16-16"/>
      <path d="M40 16l8 8"/>
      <path d="M48 24l-4 8-8-4"/>
      <circle cx="12" cy="52" r="4"/>
      <circle cx="28" cy="52" r="4"/>
      <path d="M8 48h24"/>
    </svg>`
  },
  {
    id: 'civil-concrete-mixer',
    name: 'Concrete Mixer',
    domain: 'engineering',
    category: 'construction',
    tags: ['concrete', 'mixer', 'truck', 'construction', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="36" cy="28" rx="16" ry="12" transform="rotate(-15 36 28)"/>
      <path d="M48 20l8-4"/>
      <rect x="8" y="36" width="16" height="12"/>
      <rect x="24" y="40" width="28" height="8"/>
      <circle cx="16" cy="52" r="4"/>
      <circle cx="36" cy="52" r="4"/>
      <circle cx="48" cy="52" r="4"/>
      <path d="M52 40v8"/>
    </svg>`
  },
  {
    id: 'civil-bulldozer',
    name: 'Bulldozer',
    domain: 'engineering',
    category: 'construction',
    tags: ['bulldozer', 'dozer', 'earthmover', 'grading', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="32" height="16" rx="2"/>
      <rect x="24" y="16" width="12" height="8"/>
      <rect x="4" y="28" width="16" height="16"/>
      <path d="M4 28l8-8"/>
      <path d="M4 44l8 8"/>
      <circle cx="28" cy="48" r="6"/>
      <circle cx="44" cy="48" r="6"/>
      <path d="M22 48h4"/>
      <path d="M38 48h4"/>
    </svg>`
  },
  {
    id: 'civil-scaffolding',
    name: 'Scaffolding',
    domain: 'engineering',
    category: 'construction',
    tags: ['scaffolding', 'temporary', 'platform', 'construction', 'access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v48"/>
      <path d="M28 8v48"/>
      <path d="M44 8v48"/>
      <path d="M12 16h32"/>
      <path d="M12 32h32"/>
      <path d="M12 48h32"/>
      <path d="M12 16l16 16"/>
      <path d="M28 16l-16 16"/>
      <path d="M28 32l16 16"/>
      <path d="M44 32l-16 16"/>
      <path d="M8 56h40"/>
    </svg>`
  },

  // ===========================================================================
  // WATER RESOURCES
  // ===========================================================================
  {
    id: 'civil-dam',
    name: 'Dam',
    domain: 'engineering',
    category: 'water-resources',
    tags: ['dam', 'reservoir', 'hydroelectric', 'water', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16v32l8 8h32l8-8v-32"/>
      <path d="M8 16h48"/>
      <path d="M16 48v-24"/>
      <path d="M48 48v-24"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M4 20c2-4 4-4 4 0s2 4 4 0 2-4 4 0"/>
      <path d="M52 20c2-4 4-4 4 0"/>
      <rect x="16" y="24" width="32" height="24" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'civil-pipe-network',
    name: 'Pipe Network',
    domain: 'engineering',
    category: 'water-resources',
    tags: ['pipe', 'network', 'water', 'distribution', 'sewer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6"/>
      <circle cx="48" cy="16" r="6"/>
      <circle cx="16" cy="48" r="6"/>
      <circle cx="48" cy="48" r="6"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M22 16h20"/>
      <path d="M22 48h20"/>
      <path d="M16 22v20"/>
      <path d="M48 22v20"/>
      <path d="M24 24l8 8"/>
      <path d="M40 24l-8 8"/>
      <path d="M24 40l8-8"/>
      <path d="M40 40l-8-8"/>
    </svg>`
  },
  {
    id: 'civil-manhole',
    name: 'Manhole',
    domain: 'engineering',
    category: 'water-resources',
    tags: ['manhole', 'access', 'sewer', 'utility', 'inspection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="20" ry="8"/>
      <path d="M12 16v32"/>
      <path d="M52 16v32"/>
      <ellipse cx="32" cy="48" rx="20" ry="8"/>
      <ellipse cx="32" cy="16" rx="12" ry="5" fill="currentColor" opacity="0.2"/>
      <path d="M20 24h24"/>
      <path d="M20 32h24"/>
      <path d="M20 40h24"/>
    </svg>`
  },
  {
    id: 'civil-pump-station',
    name: 'Pump Station',
    domain: 'engineering',
    category: 'water-resources',
    tags: ['pump', 'station', 'lift', 'water', 'sewer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="28" rx="2"/>
      <circle cx="24" cy="34" r="8"/>
      <circle cx="40" cy="34" r="8"/>
      <path d="M24 26v16"/>
      <path d="M16 34h16"/>
      <path d="M40 26v16"/>
      <path d="M32 34h16"/>
      <path d="M8 34h4"/>
      <path d="M52 34h4"/>
      <path d="M32 8v12"/>
      <path d="M32 48v8"/>
    </svg>`
  },
  {
    id: 'civil-hydrant',
    name: 'Fire Hydrant',
    domain: 'engineering',
    category: 'water-resources',
    tags: ['hydrant', 'fire', 'water', 'emergency', 'supply'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="24" width="16" height="24" rx="2"/>
      <path d="M20 32h-8"/>
      <path d="M52 32h-8"/>
      <circle cx="12" cy="32" r="4"/>
      <circle cx="52" cy="32" r="4"/>
      <ellipse cx="32" cy="24" rx="8" ry="4"/>
      <path d="M32 20v-8"/>
      <ellipse cx="32" cy="12" rx="4" ry="2"/>
      <path d="M24 48v8h16v-8"/>
    </svg>`
  }
];

export default civilIcons;
