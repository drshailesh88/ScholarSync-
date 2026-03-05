/**
 * Mechanical Engineering Icon Library
 * Comprehensive SVG icons for mechanical engineering
 *
 * Categories:
 * - Gears & Transmissions (spur gears, helical, bevel, worm)
 * - Bearings & Shafts (ball bearings, roller bearings, bushings)
 * - Engines & Motors (pistons, crankshafts, turbines)
 * - Fasteners (bolts, nuts, screws, rivets)
 * - Mechanisms (linkages, cams, springs)
 * - CAD Symbols (dimensions, tolerances, surface finish)
 */

import type { IconDefinition } from './index';

export const mechanicalIcons: IconDefinition[] = [
  // ===========================================================================
  // GEARS & TRANSMISSIONS
  // ===========================================================================
  {
    id: 'mech-spur-gear',
    name: 'Spur Gear',
    domain: 'engineering',
    category: 'gears',
    tags: ['gear', 'spur', 'teeth', 'transmission', 'mesh'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 14v-6"/>
      <path d="M32 56v-6"/>
      <path d="M14 32h-6"/>
      <path d="M56 32h-6"/>
      <path d="M19.3 19.3l-4.2-4.2"/>
      <path d="M48.9 48.9l-4.2-4.2"/>
      <path d="M19.3 44.7l-4.2 4.2"/>
      <path d="M48.9 15.1l-4.2 4.2"/>
      <path d="M24 15l-2-5"/>
      <path d="M40 15l2-5"/>
      <path d="M24 49l-2 5"/>
      <path d="M40 49l2 5"/>
      <path d="M15 24l-5-2"/>
      <path d="M15 40l-5 2"/>
      <path d="M49 24l5-2"/>
      <path d="M49 40l5 2"/>
    </svg>`
  },
  {
    id: 'mech-gear-mesh',
    name: 'Gear Mesh',
    domain: 'engineering',
    category: 'gears',
    tags: ['gear', 'mesh', 'pair', 'transmission', 'ratio'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="22" cy="32" r="14"/>
      <circle cx="22" cy="32" r="4"/>
      <circle cx="46" cy="32" r="10"/>
      <circle cx="46" cy="32" r="3"/>
      <path d="M22 18v-4"/>
      <path d="M22 46v4"/>
      <path d="M8 32h-4"/>
      <path d="M12 22l-3-3"/>
      <path d="M12 42l-3 3"/>
      <path d="M46 22v-4"/>
      <path d="M46 42v4"/>
      <path d="M56 32h4"/>
    </svg>`
  },
  {
    id: 'mech-bevel-gear',
    name: 'Bevel Gear',
    domain: 'engineering',
    category: 'gears',
    tags: ['bevel', 'gear', 'conical', 'angle', '90-degree'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="8"/>
      <path d="M12 24l8 24"/>
      <path d="M52 24l-8 24"/>
      <ellipse cx="32" cy="48" rx="12" ry="4"/>
      <path d="M32 24v-16"/>
      <circle cx="32" cy="24" r="4"/>
    </svg>`
  },
  {
    id: 'mech-worm-gear',
    name: 'Worm Gear',
    domain: 'engineering',
    category: 'gears',
    tags: ['worm', 'gear', 'reduction', 'high-ratio', 'self-locking'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="16"/>
      <path d="M16 16v-8"/>
      <path d="M16 48v8"/>
      <circle cx="44" cy="32" r="12"/>
      <circle cx="44" cy="32" r="4"/>
      <path d="M44 20v-4"/>
      <path d="M44 44v4"/>
      <path d="M32 32h-8"/>
      <path d="M56 32h4"/>
      <path d="M10 22c4 4 4 16 0 20"/>
      <path d="M22 22c-4 4-4 16 0 20"/>
    </svg>`
  },
  {
    id: 'mech-rack-pinion',
    name: 'Rack and Pinion',
    domain: 'engineering',
    category: 'gears',
    tags: ['rack', 'pinion', 'linear', 'motion', 'steering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="10"/>
      <circle cx="32" cy="24" r="3"/>
      <path d="M32 14v-6"/>
      <rect x="8" y="36" width="48" height="8"/>
      <path d="M12 36v-4"/>
      <path d="M20 36v-4"/>
      <path d="M28 36v-4"/>
      <path d="M36 36v-4"/>
      <path d="M44 36v-4"/>
      <path d="M52 36v-4"/>
      <path d="M4 40h4"/>
      <path d="M56 40h4"/>
    </svg>`
  },

  // ===========================================================================
  // BEARINGS & SHAFTS
  // ===========================================================================
  {
    id: 'mech-ball-bearing',
    name: 'Ball Bearing',
    domain: 'engineering',
    category: 'bearings',
    tags: ['bearing', 'ball', 'radial', 'rotation', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="52" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="17.9" cy="17.9" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="46.1" cy="17.9" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="17.9" cy="46.1" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="46.1" cy="46.1" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'mech-roller-bearing',
    name: 'Roller Bearing',
    domain: 'engineering',
    category: 'bearings',
    tags: ['bearing', 'roller', 'cylindrical', 'heavy-load', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="10"/>
      <rect x="30" y="10" width="4" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="30" y="46" width="4" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="10" y="30" width="8" height="4" fill="currentColor" opacity="0.3"/>
      <rect x="46" y="30" width="8" height="4" fill="currentColor" opacity="0.3"/>
      <rect x="16" y="16" width="6" height="4" transform="rotate(45 19 18)" fill="currentColor" opacity="0.3"/>
      <rect x="42" y="16" width="6" height="4" transform="rotate(-45 45 18)" fill="currentColor" opacity="0.3"/>
      <rect x="16" y="44" width="6" height="4" transform="rotate(-45 19 46)" fill="currentColor" opacity="0.3"/>
      <rect x="42" y="44" width="6" height="4" transform="rotate(45 45 46)" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'mech-thrust-bearing',
    name: 'Thrust Bearing',
    domain: 'engineering',
    category: 'bearings',
    tags: ['bearing', 'thrust', 'axial', 'load', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="24" ry="8"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="44" rx="24" ry="8"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
    </svg>`
  },
  {
    id: 'mech-shaft',
    name: 'Shaft',
    domain: 'engineering',
    category: 'bearings',
    tags: ['shaft', 'axis', 'rotation', 'drive', 'spindle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" rx="1"/>
      <ellipse cx="8" cy="32" rx="4" ry="8"/>
      <ellipse cx="56" cy="32" rx="4" ry="8"/>
      <line x1="20" y1="28" x2="20" y2="36" stroke-dasharray="2 2"/>
      <line x1="44" y1="28" x2="44" y2="36" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'mech-bushing',
    name: 'Bushing',
    domain: 'engineering',
    category: 'bearings',
    tags: ['bushing', 'sleeve', 'plain', 'bearing', 'friction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M16 24h-8"/>
      <path d="M16 40h-8"/>
      <path d="M48 24h8"/>
      <path d="M48 40h8"/>
    </svg>`
  },

  // ===========================================================================
  // ENGINES & MOTORS
  // ===========================================================================
  {
    id: 'mech-piston-cylinder',
    name: 'Piston and Cylinder',
    domain: 'engineering',
    category: 'engines',
    tags: ['piston', 'cylinder', 'engine', 'reciprocating', 'combustion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="32" rx="2"/>
      <rect x="20" y="24" width="24" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="24" width="24" height="12"/>
      <path d="M32 36v16"/>
      <circle cx="32" cy="56" r="4"/>
      <path d="M20 12h24"/>
      <path d="M20 16h24" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'mech-crankshaft',
    name: 'Crankshaft',
    domain: 'engineering',
    category: 'engines',
    tags: ['crankshaft', 'crank', 'engine', 'rotation', 'conversion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h8"/>
      <circle cx="20" cy="32" r="4"/>
      <path d="M24 32v-12"/>
      <circle cx="24" cy="16" r="4"/>
      <path d="M28 16h8"/>
      <circle cx="40" cy="16" r="4"/>
      <path d="M40 20v12"/>
      <circle cx="40" cy="36" r="4"/>
      <path d="M44 36h12"/>
      <ellipse cx="8" cy="32" rx="2" ry="6"/>
      <ellipse cx="56" cy="36" rx="2" ry="6"/>
    </svg>`
  },
  {
    id: 'mech-turbine',
    name: 'Turbine',
    domain: 'engineering',
    category: 'engines',
    tags: ['turbine', 'rotor', 'blades', 'power', 'rotation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 12c-4 4-4 12 0 20"/>
      <path d="M32 52c4-4 4-12 0-20"/>
      <path d="M12 32c4 4 12 4 20 0"/>
      <path d="M52 32c-4-4-12-4-20 0"/>
      <path d="M17.9 17.9c0 6 6 10 14.1 14.1"/>
      <path d="M46.1 46.1c0-6-6-10-14.1-14.1"/>
      <path d="M17.9 46.1c6 0 10-6 14.1-14.1"/>
      <path d="M46.1 17.9c-6 0-10 6-14.1 14.1"/>
    </svg>`
  },
  {
    id: 'mech-camshaft',
    name: 'Camshaft',
    domain: 'engineering',
    category: 'engines',
    tags: ['camshaft', 'cam', 'valve', 'timing', 'engine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48"/>
      <ellipse cx="16" cy="32" rx="4" ry="8" transform="rotate(30 16 32)"/>
      <ellipse cx="32" cy="32" rx="4" ry="8" transform="rotate(-30 32 32)"/>
      <ellipse cx="48" cy="32" rx="4" ry="8" transform="rotate(60 48 32)"/>
      <circle cx="4" cy="32" r="3"/>
      <circle cx="60" cy="32" r="3"/>
    </svg>`
  },
  {
    id: 'mech-flywheel',
    name: 'Flywheel',
    domain: 'engineering',
    category: 'engines',
    tags: ['flywheel', 'inertia', 'energy', 'storage', 'rotation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-width="6"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 8v-4"/>
      <path d="M32 60v-4"/>
      <path d="M8 32h-4"/>
      <path d="M60 32h-4"/>
    </svg>`
  },

  // ===========================================================================
  // FASTENERS
  // ===========================================================================
  {
    id: 'mech-hex-bolt',
    name: 'Hex Bolt',
    domain: 'engineering',
    category: 'fasteners',
    tags: ['bolt', 'hex', 'fastener', 'thread', 'screw'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 44,14 44,26 32,32 20,26 20,14" fill="currentColor" opacity="0.2"/>
      <polygon points="32,8 44,14 44,26 32,32 20,26 20,14"/>
      <rect x="28" y="32" width="8" height="24"/>
      <path d="M28 38h8"/>
      <path d="M28 44h8"/>
      <path d="M28 50h8"/>
    </svg>`
  },
  {
    id: 'mech-hex-nut',
    name: 'Hex Nut',
    domain: 'engineering',
    category: 'fasteners',
    tags: ['nut', 'hex', 'fastener', 'thread', 'hardware'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 48,16 48,40 32,48 16,40 16,16" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 48,16 48,40 32,48 16,40 16,16"/>
      <circle cx="32" cy="28" r="10"/>
    </svg>`
  },
  {
    id: 'mech-washer',
    name: 'Washer',
    domain: 'engineering',
    category: 'fasteners',
    tags: ['washer', 'flat', 'spacer', 'load', 'distribution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="8"/>
      <ellipse cx="32" cy="36" rx="20" ry="8"/>
      <path d="M12 28v8"/>
      <path d="M52 28v8"/>
      <ellipse cx="32" cy="28" rx="8" ry="3"/>
      <ellipse cx="32" cy="36" rx="8" ry="3"/>
    </svg>`
  },
  {
    id: 'mech-screw-phillips',
    name: 'Phillips Screw',
    domain: 'engineering',
    category: 'fasteners',
    tags: ['screw', 'phillips', 'cross', 'fastener', 'drive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="14" ry="6"/>
      <path d="M18 12l6 44"/>
      <path d="M46 12l-6 44"/>
      <path d="M24 56l16 0"/>
      <line x1="32" y1="8" x2="32" y2="16"/>
      <line x1="26" y1="12" x2="38" y2="12"/>
    </svg>`
  },
  {
    id: 'mech-rivet',
    name: 'Rivet',
    domain: 'engineering',
    category: 'fasteners',
    tags: ['rivet', 'permanent', 'fastener', 'joint', 'metal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="14" rx="12" ry="6"/>
      <path d="M20 14v28"/>
      <path d="M44 14v28"/>
      <ellipse cx="32" cy="42" rx="12" ry="6"/>
      <ellipse cx="32" cy="50" rx="16" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="50" rx="16" ry="6"/>
    </svg>`
  },

  // ===========================================================================
  // MECHANISMS
  // ===========================================================================
  {
    id: 'mech-spring-coil',
    name: 'Coil Spring',
    domain: 'engineering',
    category: 'mechanisms',
    tags: ['spring', 'coil', 'compression', 'tension', 'elastic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16"/>
      <path d="M32 8v4"/>
      <path d="M24 12c8 4 8 8 0 12s-8 8 0 12 8 8 0 12 8 8 0 12"/>
      <path d="M32 52v4"/>
      <path d="M24 56h16"/>
    </svg>`
  },
  {
    id: 'mech-spring-leaf',
    name: 'Leaf Spring',
    domain: 'engineering',
    category: 'mechanisms',
    tags: ['spring', 'leaf', 'suspension', 'vehicle', 'elastic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c16-16 32-16 48 0"/>
      <path d="M12 32c12-12 28-12 40 0"/>
      <path d="M16 32c8-8 24-8 32 0"/>
      <circle cx="8" cy="32" r="3"/>
      <circle cx="56" cy="32" r="3"/>
      <path d="M32 32v12"/>
    </svg>`
  },
  {
    id: 'mech-linkage',
    name: 'Four-Bar Linkage',
    domain: 'engineering',
    category: 'mechanisms',
    tags: ['linkage', 'four-bar', 'mechanism', 'motion', 'kinematic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="20" r="4"/>
      <circle cx="44" cy="24" r="4"/>
      <line x1="12" y1="48" x2="20" y2="20"/>
      <line x1="20" y1="20" x2="44" y2="24"/>
      <line x1="44" y1="24" x2="52" y2="48"/>
      <line x1="12" y1="48" x2="52" y2="48"/>
    </svg>`
  },
  {
    id: 'mech-cam-follower',
    name: 'Cam and Follower',
    domain: 'engineering',
    category: 'mechanisms',
    tags: ['cam', 'follower', 'mechanism', 'motion', 'profile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 48c-12 0-20-8-20-16s8-16 20-12 12-4 12-8-4-4-12-4"/>
      <circle cx="32" cy="32" r="4"/>
      <rect x="28" y="8" width="8" height="16"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M32 4v-2"/>
    </svg>`
  },
  {
    id: 'mech-clutch',
    name: 'Clutch',
    domain: 'engineering',
    category: 'mechanisms',
    tags: ['clutch', 'friction', 'coupling', 'engagement', 'transmission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="6" ry="16"/>
      <ellipse cx="32" cy="32" rx="6" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="6" ry="20"/>
      <ellipse cx="40" cy="32" rx="6" ry="16"/>
      <path d="M8 32h10"/>
      <path d="M46 32h10"/>
    </svg>`
  },

  // ===========================================================================
  // CAD SYMBOLS
  // ===========================================================================
  {
    id: 'mech-dimension-linear',
    name: 'Linear Dimension',
    domain: 'engineering',
    category: 'cad-symbols',
    tags: ['dimension', 'linear', 'measurement', 'CAD', 'drawing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 48v-32"/>
      <path d="M52 48v-32"/>
      <path d="M12 24h40"/>
      <polygon points="12,24 18,21 18,27" fill="currentColor"/>
      <polygon points="52,24 46,21 46,27" fill="currentColor"/>
      <text x="26" y="20" font-size="8" fill="currentColor" stroke="none">50</text>
    </svg>`
  },
  {
    id: 'mech-dimension-diameter',
    name: 'Diameter Dimension',
    domain: 'engineering',
    category: 'cad-symbols',
    tags: ['diameter', 'dimension', 'circle', 'CAD', 'drawing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M16 16l32 32"/>
      <polygon points="16,16 22,16 16,22" fill="currentColor"/>
      <polygon points="48,48 42,48 48,42" fill="currentColor"/>
      <text x="36" y="28" font-size="8" fill="currentColor" stroke="none">D40</text>
    </svg>`
  },
  {
    id: 'mech-surface-finish',
    name: 'Surface Finish Symbol',
    domain: 'engineering',
    category: 'cad-symbols',
    tags: ['surface', 'finish', 'roughness', 'Ra', 'machining'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48l16-32 16 32"/>
      <path d="M32 16v-8"/>
      <path d="M16 48h32"/>
      <text x="28" y="40" font-size="6" fill="currentColor" stroke="none">Ra</text>
      <text x="24" y="12" font-size="6" fill="currentColor" stroke="none">1.6</text>
    </svg>`
  },
  {
    id: 'mech-tolerance-gdt',
    name: 'GD&T Frame',
    domain: 'engineering',
    category: 'cad-symbols',
    tags: ['GDT', 'tolerance', 'geometric', 'dimension', 'frame'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16"/>
      <line x1="24" y1="24" x2="24" y2="40"/>
      <line x1="40" y1="24" x2="40" y2="40"/>
      <circle cx="16" cy="32" r="4"/>
      <text x="28" y="36" font-size="6" fill="currentColor" stroke="none">0.1</text>
      <text x="44" y="36" font-size="6" fill="currentColor" stroke="none">A</text>
    </svg>`
  },
  {
    id: 'mech-weld-symbol',
    name: 'Weld Symbol',
    domain: 'engineering',
    category: 'cad-symbols',
    tags: ['weld', 'symbol', 'joint', 'fabrication', 'drawing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h24"/>
      <path d="M32 32l12-12"/>
      <circle cx="48" cy="16" r="4"/>
      <path d="M28 28l8 8"/>
      <path d="M20 36v-8l8 4-8 4"/>
      <text x="36" y="44" font-size="6" fill="currentColor" stroke="none">3</text>
    </svg>`
  },

  // ===========================================================================
  // HYDRAULICS & PNEUMATICS
  // ===========================================================================
  {
    id: 'mech-hydraulic-cylinder',
    name: 'Hydraulic Cylinder',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['hydraulic', 'cylinder', 'actuator', 'linear', 'piston'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="32" height="24" rx="2"/>
      <rect x="36" y="28" width="20" height="8"/>
      <path d="M8 28h4"/>
      <path d="M8 36h4"/>
      <circle cx="12" cy="28" r="2"/>
      <circle cx="12" cy="36" r="2"/>
    </svg>`
  },
  {
    id: 'mech-pneumatic-valve',
    name: 'Pneumatic Valve',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['pneumatic', 'valve', 'directional', 'control', 'air'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="20" height="24"/>
      <rect x="32" y="20" width="20" height="24"/>
      <path d="M22 20v-8"/>
      <path d="M22 44v8"/>
      <path d="M42 20v-8"/>
      <path d="M42 44v8"/>
      <path d="M16 28l8 8"/>
      <path d="M16 36l8-8"/>
      <path d="M36 32h12"/>
      <polygon points="48,32 44,28 44,36" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'mech-pump-hydraulic',
    name: 'Hydraulic Pump',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['pump', 'hydraulic', 'pressure', 'flow', 'positive-displacement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <polygon points="32,20 44,32 32,44 20,32" fill="currentColor" opacity="0.2"/>
      <polygon points="32,20 44,32 32,44 20,32"/>
      <path d="M32 8v6"/>
      <path d="M32 50v6"/>
      <path d="M8 32h6"/>
      <path d="M50 32h6"/>
    </svg>`
  },
  {
    id: 'mech-accumulator',
    name: 'Accumulator',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['accumulator', 'hydraulic', 'storage', 'pressure', 'energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <path d="M16 32h32" stroke-dasharray="4 2"/>
      <path d="M32 48v8"/>
    </svg>`
  },
  {
    id: 'mech-filter-hydraulic',
    name: 'Hydraulic Filter',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['filter', 'hydraulic', 'strainer', 'contamination', 'clean'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="32" rx="2"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <line x1="24" y1="24" x2="40" y2="24"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <line x1="24" y1="40" x2="40" y2="40"/>
      <path d="M24 28l16 0" stroke-dasharray="2 2"/>
      <path d="M24 36l16 0" stroke-dasharray="2 2"/>
    </svg>`
  }
];

export default mechanicalIcons;
