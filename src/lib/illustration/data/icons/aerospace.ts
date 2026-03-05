/**
 * Aerospace Engineering Icon Library
 * Comprehensive SVG icons for aerospace engineering
 *
 * Categories:
 * - Aircraft (fuselage, wings, empennage, landing gear)
 * - Propulsion (turbines, propellers, rockets, nozzles)
 * - Aerodynamics (airfoils, control surfaces, flow)
 * - Spacecraft (satellites, capsules, stations)
 * - Avionics (instruments, navigation, communication)
 * - Structures (materials, testing, analysis)
 */

import type { IconDefinition } from './index';

export const aerospaceIcons: IconDefinition[] = [
  // ===========================================================================
  // AIRCRAFT COMPONENTS
  // ===========================================================================
  {
    id: 'aero-aircraft-side',
    name: 'Aircraft Side View',
    domain: 'engineering',
    category: 'aircraft',
    tags: ['aircraft', 'airplane', 'side', 'profile', 'fuselage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c8-4 16-4 28 0l24-8v4l-20 8h-8l-4 8H12l4-8c-8 0-12 0-12-4z" fill="currentColor" opacity="0.1"/>
      <path d="M4 32c8-4 16-4 28 0l24-8v4l-20 8h-8l-4 8H12l4-8c-8 0-12 0-12-4z"/>
      <path d="M16 32l-8 4"/>
      <circle cx="16" cy="40" r="2"/>
      <circle cx="28" cy="40" r="2"/>
    </svg>`
  },
  {
    id: 'aero-aircraft-top',
    name: 'Aircraft Top View',
    domain: 'engineering',
    category: 'aircraft',
    tags: ['aircraft', 'airplane', 'top', 'planform', 'wings'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4l-4 24-20 8 20 4v16l-8 4h16l-8-4V40l20-4-20-8z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4l-4 24-20 8 20 4v16l-8 4h16l-8-4V40l20-4-20-8z"/>
      <path d="M32 4l4 24 20 8-20 4"/>
    </svg>`
  },
  {
    id: 'aero-wing-section',
    name: 'Wing Cross Section',
    domain: 'engineering',
    category: 'aircraft',
    tags: ['wing', 'airfoil', 'section', 'NACA', 'profile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-12 32-12 48-4v4c-16-4-40-4-48 4v-4z" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c8-12 32-12 48-4"/>
      <path d="M8 32c8 4 32 8 48 0"/>
      <path d="M56 28v4"/>
      <path d="M24 24v16" stroke-dasharray="2 2"/>
      <text x="22" y="48" font-size="6" fill="currentColor" stroke="none">c/4</text>
    </svg>`
  },
  {
    id: 'aero-fuselage',
    name: 'Fuselage Section',
    domain: 'engineering',
    category: 'aircraft',
    tags: ['fuselage', 'body', 'section', 'structure', 'frame'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" stroke-dasharray="4 2"/>
      <path d="M32 12v40"/>
      <path d="M16 32h32"/>
      <circle cx="32" cy="32" r="3"/>
    </svg>`
  },
  {
    id: 'aero-landing-gear',
    name: 'Landing Gear',
    domain: 'engineering',
    category: 'aircraft',
    tags: ['landing', 'gear', 'wheel', 'strut', 'undercarriage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16"/>
      <path d="M32 8v24"/>
      <path d="M32 32l-12 16"/>
      <path d="M32 32l12 16"/>
      <circle cx="20" cy="52" r="6"/>
      <circle cx="44" cy="52" r="6"/>
      <path d="M26 32h12"/>
    </svg>`
  },

  // ===========================================================================
  // PROPULSION SYSTEMS
  // ===========================================================================
  {
    id: 'aero-turbofan',
    name: 'Turbofan Engine',
    domain: 'engineering',
    category: 'propulsion',
    tags: ['turbofan', 'engine', 'jet', 'propulsion', 'bypass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="8" ry="16"/>
      <path d="M12 16h40c4 0 8 8 8 16s-4 16-8 16H12"/>
      <ellipse cx="12" cy="32" rx="4" ry="10"/>
      <path d="M20 20v24"/>
      <path d="M32 24v16"/>
      <path d="M44 26v12"/>
      <path d="M12 32h8"/>
      <circle cx="12" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'aero-propeller',
    name: 'Propeller',
    domain: 'engineering',
    category: 'propulsion',
    tags: ['propeller', 'prop', 'blade', 'thrust', 'rotation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 26c-4-16-2-20 0-20s4 4 0 20" fill="currentColor" opacity="0.2"/>
      <path d="M32 26c-4-16-2-20 0-20s4 4 0 20"/>
      <path d="M32 38c4 16 2 20 0 20s-4-4 0-20" fill="currentColor" opacity="0.2"/>
      <path d="M32 38c4 16 2 20 0 20s-4-4 0-20"/>
      <path d="M26 32c-16 4-20 2-20 0s4-4 20 0" fill="currentColor" opacity="0.2"/>
      <path d="M26 32c-16 4-20 2-20 0s4-4 20 0"/>
      <path d="M38 32c16-4 20-2 20 0s-4 4-20 0" fill="currentColor" opacity="0.2"/>
      <path d="M38 32c16-4 20-2 20 0s-4 4-20 0"/>
    </svg>`
  },
  {
    id: 'aero-rocket-engine',
    name: 'Rocket Engine',
    domain: 'engineering',
    category: 'propulsion',
    tags: ['rocket', 'engine', 'nozzle', 'thrust', 'combustion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v16l8 24h-32l8-24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16v16l8 24h-32l8-24z"/>
      <ellipse cx="32" cy="8" rx="8" ry="3"/>
      <path d="M28 24h8"/>
      <path d="M26 32h12"/>
      <path d="M20 48c4 8 8 12 12 12s8-4 12-12"/>
      <path d="M28 52c2 4 4 6 4 6s2-2 4-6" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'aero-nozzle',
    name: 'Convergent-Divergent Nozzle',
    domain: 'engineering',
    category: 'propulsion',
    tags: ['nozzle', 'CD', 'supersonic', 'throat', 'expansion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16v32c8-8 12-12 16-12h8c4 0 8 4 16 12V16c-8 8-12 12-16 12h-8c-4 0-8-4-16-12z"/>
      <path d="M24 28v8" stroke-dasharray="2 2"/>
      <path d="M32 32h24"/>
      <polygon points="56,32 52,28 52,36" fill="currentColor"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">throat</text>
    </svg>`
  },
  {
    id: 'aero-afterburner',
    name: 'Afterburner',
    domain: 'engineering',
    category: 'propulsion',
    tags: ['afterburner', 'reheat', 'augmentor', 'thrust', 'military'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h24v24H8z"/>
      <path d="M32 20l16 4v16l-16 4"/>
      <path d="M48 24c4 4 8 8 8 8s-4 4-8 8"/>
      <path d="M52 28c2 2 4 4 4 4s-2 2-4 4" stroke-dasharray="2 2"/>
      <path d="M16 28v8"/>
      <path d="M24 26v12"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // AERODYNAMICS
  // ===========================================================================
  {
    id: 'aero-airflow',
    name: 'Airflow Streamlines',
    domain: 'engineering',
    category: 'aerodynamics',
    tags: ['airflow', 'streamlines', 'flow', 'aerodynamics', 'wind'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h48"/>
      <path d="M8 24c16 0 24 4 32 8 8 0 16-4 16-4"/>
      <path d="M8 32c16 0 24 8 32 8h16"/>
      <path d="M8 40c16 0 24 4 32-8 8 0 16 4 16 4"/>
      <path d="M8 48h48"/>
      <polygon points="56,16 52,14 52,18" fill="currentColor"/>
      <polygon points="56,32 52,30 52,34" fill="currentColor"/>
      <polygon points="56,48 52,46 52,50" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'aero-aileron',
    name: 'Aileron',
    domain: 'engineering',
    category: 'aerodynamics',
    tags: ['aileron', 'control', 'roll', 'surface', 'wing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28l48-8v8l-48 16z" fill="currentColor" opacity="0.1"/>
      <path d="M8 28l48-8v8l-48 16z"/>
      <path d="M40 24v16"/>
      <path d="M44 23v18" stroke-dasharray="2 2"/>
      <text x="44" y="48" font-size="6" fill="currentColor" stroke="none">hinge</text>
      <path d="M52 26l4 4"/>
      <path d="M52 34l4-4"/>
    </svg>`
  },
  {
    id: 'aero-flap',
    name: 'Wing Flap',
    domain: 'engineering',
    category: 'aerodynamics',
    tags: ['flap', 'high-lift', 'control', 'trailing edge', 'wing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c32-8 40-8 48 0v4c-8 4-16 4-24 8l-24 8z" fill="currentColor" opacity="0.1"/>
      <path d="M8 24c32-8 40-8 48 0"/>
      <path d="M8 24v20l24-8c8-4 16-4 24-8v-4"/>
      <path d="M32 32l-8 8"/>
      <path d="M36 30l-8 8"/>
      <circle cx="28" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'aero-elevator',
    name: 'Elevator',
    domain: 'engineering',
    category: 'aerodynamics',
    tags: ['elevator', 'control', 'pitch', 'tail', 'horizontal stabilizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32h56"/>
      <path d="M8 28h48v8H8z" fill="currentColor" opacity="0.1"/>
      <path d="M8 28h48v8H8z"/>
      <path d="M40 28v8"/>
      <path d="M32 28v8" stroke-dasharray="2 2"/>
      <path d="M48 24v-4"/>
      <path d="M52 24v-4"/>
      <path d="M48 20h4"/>
      <path d="M48 40v4"/>
      <path d="M52 40v4"/>
      <path d="M48 44h4"/>
    </svg>`
  },
  {
    id: 'aero-rudder',
    name: 'Rudder',
    domain: 'engineering',
    category: 'aerodynamics',
    tags: ['rudder', 'control', 'yaw', 'tail', 'vertical stabilizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8v48h-8z" fill="currentColor" opacity="0.1"/>
      <path d="M28 8c4 0 8 8 8 16v32H28V8z"/>
      <path d="M28 40h8"/>
      <path d="M28 44h8" stroke-dasharray="2 2"/>
      <path d="M20 48h8"/>
      <path d="M36 48h8"/>
      <text x="16" y="44" font-size="5" fill="currentColor" stroke="none">hinge</text>
    </svg>`
  },

  // ===========================================================================
  // SPACECRAFT
  // ===========================================================================
  {
    id: 'aero-satellite',
    name: 'Satellite',
    domain: 'engineering',
    category: 'spacecraft',
    tags: ['satellite', 'orbit', 'solar panel', 'communication', 'space'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <rect x="4" y="28" width="16" height="8"/>
      <rect x="44" y="28" width="16" height="8"/>
      <path d="M8 28v8"/>
      <path d="M12 28v8"/>
      <path d="M16 28v8"/>
      <path d="M48 28v8"/>
      <path d="M52 28v8"/>
      <path d="M56 28v8"/>
      <path d="M32 24v-8"/>
      <circle cx="32" cy="12" r="4"/>
      <path d="M32 40v8"/>
    </svg>`
  },
  {
    id: 'aero-rocket',
    name: 'Rocket',
    domain: 'engineering',
    category: 'spacecraft',
    tags: ['rocket', 'launch', 'vehicle', 'booster', 'space'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-8 8-8 24-8 32h16c0-8 0-24-8-32z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4c-8 8-8 24-8 32h16c0-8 0-24-8-32z"/>
      <path d="M24 36l-8 12h8"/>
      <path d="M40 36l8 12h-8"/>
      <ellipse cx="32" cy="48" rx="8" ry="4"/>
      <path d="M28 52c2 4 4 8 4 8s2-4 4-8" stroke-dasharray="2 2"/>
      <circle cx="32" cy="20" r="3"/>
    </svg>`
  },
  {
    id: 'aero-capsule',
    name: 'Crew Capsule',
    domain: 'engineering',
    category: 'spacecraft',
    tags: ['capsule', 'crew', 'reentry', 'spacecraft', 'manned'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c4 16 4 32 0 40H20c-4-8-4-24 0-40z" fill="currentColor" opacity="0.1"/>
      <path d="M20 8h24"/>
      <path d="M44 8c4 16 4 32 0 40"/>
      <path d="M20 8c-4 16-4 32 0 40"/>
      <path d="M20 48h24"/>
      <circle cx="32" cy="24" r="6"/>
      <path d="M16 52l4-4h24l4 4"/>
      <path d="M12 56h40"/>
    </svg>`
  },
  {
    id: 'aero-space-station',
    name: 'Space Station Module',
    domain: 'engineering',
    category: 'spacecraft',
    tags: ['station', 'module', 'ISS', 'habitat', 'orbital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="12"/>
      <ellipse cx="48" cy="32" rx="8" ry="12"/>
      <rect x="16" y="24" width="32" height="16"/>
      <path d="M24 24v16"/>
      <path d="M40 24v16"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M16 20v-8h4"/>
      <path d="M48 20v-8h-4"/>
      <path d="M16 44v8h4"/>
      <path d="M48 44v8h-4"/>
    </svg>`
  },
  {
    id: 'aero-antenna-dish',
    name: 'Dish Antenna',
    domain: 'engineering',
    category: 'spacecraft',
    tags: ['antenna', 'dish', 'communication', 'high-gain', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c24 8 40 8 48 0" fill="currentColor" opacity="0.1"/>
      <path d="M8 16c24 8 40 8 48 0"/>
      <path d="M8 16c0 8 24 16 48 0"/>
      <path d="M32 24v20"/>
      <path d="M32 44l-12 12"/>
      <path d="M32 44l12 12"/>
      <circle cx="32" cy="16" r="3"/>
      <path d="M32 19v5"/>
    </svg>`
  },

  // ===========================================================================
  // AVIONICS & INSTRUMENTS
  // ===========================================================================
  {
    id: 'aero-attitude-indicator',
    name: 'Attitude Indicator',
    domain: 'engineering',
    category: 'avionics',
    tags: ['attitude', 'indicator', 'artificial horizon', 'gyro', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M10 32h44"/>
      <path d="M10 32a22 22 0 0 0 44 0" fill="currentColor" opacity="0.2"/>
      <path d="M24 32l4-4h8l4 4"/>
      <path d="M32 28v-4"/>
      <path d="M20 24l4 4"/>
      <path d="M44 24l-4 4"/>
      <path d="M16 32h4"/>
      <path d="M44 32h4"/>
    </svg>`
  },
  {
    id: 'aero-altimeter',
    name: 'Altimeter',
    domain: 'engineering',
    category: 'avionics',
    tags: ['altimeter', 'altitude', 'pressure', 'instrument', 'flight'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M32 28v-12"/>
      <path d="M32 32l8 8"/>
      <text x="26" y="52" font-size="6" fill="currentColor" stroke="none">ALT</text>
      <path d="M20 16l2 4"/>
      <path d="M44 16l-2 4"/>
      <path d="M14 28l4 2"/>
      <path d="M50 28l-4 2"/>
    </svg>`
  },
  {
    id: 'aero-compass',
    name: 'Heading Indicator',
    domain: 'engineering',
    category: 'avionics',
    tags: ['compass', 'heading', 'direction', 'navigation', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 14v4"/>
      <path d="M32 46v4"/>
      <path d="M14 32h4"/>
      <path d="M46 32h4"/>
      <polygon points="32,20 28,32 32,40 36,32" fill="currentColor" opacity="0.3"/>
      <polygon points="32,20 28,32 32,40 36,32"/>
      <text x="30" y="16" font-size="5" fill="currentColor" stroke="none">N</text>
      <text x="30" y="52" font-size="5" fill="currentColor" stroke="none">S</text>
      <text x="10" y="34" font-size="5" fill="currentColor" stroke="none">W</text>
      <text x="48" y="34" font-size="5" fill="currentColor" stroke="none">E</text>
    </svg>`
  },
  {
    id: 'aero-airspeed',
    name: 'Airspeed Indicator',
    domain: 'engineering',
    category: 'avionics',
    tags: ['airspeed', 'speed', 'velocity', 'indicator', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 32l-8-12"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M20 44a16 16 0 0 1 0-24" stroke-width="3" stroke="green" opacity="0.5"/>
      <path d="M44 20a16 16 0 0 1 0 24" stroke-width="3" stroke="yellow" opacity="0.5"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">KIAS</text>
    </svg>`
  },
  {
    id: 'aero-vor',
    name: 'VOR Indicator',
    domain: 'engineering',
    category: 'avionics',
    tags: ['VOR', 'navigation', 'radio', 'bearing', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 10v8"/>
      <path d="M32 46v8"/>
      <path d="M10 32h8"/>
      <path d="M46 32h8"/>
      <path d="M32 32v-8"/>
      <polygon points="32,24 30,28 34,28" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <text x="22" y="52" font-size="5" fill="currentColor" stroke="none">VOR</text>
    </svg>`
  },

  // ===========================================================================
  // STRUCTURES & TESTING
  // ===========================================================================
  {
    id: 'aero-wind-tunnel',
    name: 'Wind Tunnel',
    domain: 'engineering',
    category: 'testing',
    tags: ['wind tunnel', 'testing', 'aerodynamics', 'model', 'flow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20h8l8-8h24l8 8h8v24h-8l-8 8H20l-8-8H4z"/>
      <path d="M12 24h40v16H12z" fill="currentColor" opacity="0.1"/>
      <path d="M28 28l8-4v16l-8-4z"/>
      <path d="M16 32h8"/>
      <path d="M40 32h8"/>
      <circle cx="8" cy="32" r="2"/>
      <circle cx="56" cy="32" r="2"/>
    </svg>`
  },
  {
    id: 'aero-stress-analysis',
    name: 'Stress Analysis',
    domain: 'engineering',
    category: 'structures',
    tags: ['stress', 'analysis', 'FEA', 'structural', 'load'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="16" rx="2"/>
      <path d="M4 32h8"/>
      <path d="M52 32h8"/>
      <polygon points="4,32 8,28 8,36" fill="currentColor"/>
      <polygon points="60,32 56,28 56,36" fill="currentColor"/>
      <path d="M20 28v8" stroke="red"/>
      <path d="M28 26v12" stroke="red"/>
      <path d="M36 26v12" stroke="red"/>
      <path d="M44 28v8" stroke="red"/>
      <text x="24" y="48" font-size="5" fill="currentColor" stroke="none">stress</text>
    </svg>`
  },
  {
    id: 'aero-composite',
    name: 'Composite Layup',
    domain: 'engineering',
    category: 'structures',
    tags: ['composite', 'layup', 'carbon fiber', 'laminate', 'material'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h40l-4 24H16z"/>
      <path d="M12 20l4 4h36"/>
      <path d="M52 24l-4 20"/>
      <path d="M14 26h34"/>
      <path d="M15 32h32"/>
      <path d="M16 38h30"/>
      <path d="M20 44v-4"/>
      <path d="M32 44v-4"/>
      <path d="M44 44v-4"/>
      <text x="20" y="54" font-size="5" fill="currentColor" stroke="none">0/90/45</text>
    </svg>`
  },
  {
    id: 'aero-fatigue-test',
    name: 'Fatigue Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['fatigue', 'testing', 'cycle', 'life', 'structural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48"/>
      <path d="M8 32l8-16 8 32 8-32 8 32 8-16"/>
      <rect x="4" y="28" width="8" height="8"/>
      <rect x="52" y="28" width="8" height="8"/>
      <path d="M32 48v8"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">N cycles</text>
    </svg>`
  },
  {
    id: 'aero-vibration',
    name: 'Vibration Analysis',
    domain: 'engineering',
    category: 'testing',
    tags: ['vibration', 'modal', 'frequency', 'analysis', 'resonance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="2"/>
      <path d="M24 16h16" stroke-dasharray="2 2"/>
      <path d="M24 32h16" stroke-dasharray="2 2"/>
      <path d="M24 48h16" stroke-dasharray="2 2"/>
      <path d="M20 16c-4 0-8 8-8 16s4 16 8 16"/>
      <path d="M44 16c4 0 8 8 8 16s-4 16-8 16"/>
      <path d="M16 20c-2 0-4 6-4 12s2 12 4 12"/>
      <path d="M48 20c2 0 4 6 4 12s-2 12-4 12"/>
    </svg>`
  }
];

export default aerospaceIcons;
