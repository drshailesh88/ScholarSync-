/**
 * physics.ts
 * Physics icon definitions for FINNISH Icon Library
 *
 * Comprehensive physics icons covering:
 * - Classical Mechanics (forces, motion, energy)
 * - Electromagnetism (fields, circuits, waves)
 * - Optics (lenses, mirrors, interference)
 * - Thermodynamics (heat, entropy, engines)
 * - Modern Physics (relativity, quantum)
 * - Fluid Dynamics (pressure, flow, turbulence)
 * - Acoustics (sound, waves, resonance)
 * - Laboratory Equipment (measurement, apparatus)
 *
 * Ralph Loop Iteration 1 - Physics PATHOLOGY_50
 */

import type { IconDefinition } from './index';

/**
 * Physics domain icons collection
 */
export const physicsIcons: IconDefinition[] = [
  // ===========================================================================
  // CORE PHYSICS CONCEPTS
  // ===========================================================================
  {
    id: 'phys-magnet',
    name: 'Magnet',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['magnetic field', 'poles', 'attraction', 'horseshoe', 'ferromagnetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 15V9a6 6 0 0 1 12 0v6"/>
  <path d="M6 15a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2"/>
  <path d="M18 15a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2"/>
  <rect x="4" y="15" width="4" height="4"/>
  <rect x="16" y="15" width="4" height="4"/>
</svg>`,
  },
  {
    id: 'phys-wave',
    name: 'Wave',
    domain: 'physics',
    category: 'waves',
    tags: ['oscillation', 'frequency', 'amplitude', 'sine', 'periodic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"/>
</svg>`,
  },
  {
    id: 'phys-circuit',
    name: 'Electric Circuit',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['electricity', 'current', 'voltage', 'resistor', 'schematic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <path d="M4 12h4"/>
  <path d="M8 10v4l2-2 2 2 2-2 2 2v-4"/>
  <path d="M16 12h4"/>
  <circle cx="6" cy="12" r="1" fill="currentColor"/>
  <circle cx="18" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'phys-lens',
    name: 'Lens',
    domain: 'physics',
    category: 'optics',
    tags: ['convex', 'concave', 'refraction', 'focus', 'magnification'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="4" ry="10"/>
  <path d="M2 12h6"/>
  <path d="M16 12h6"/>
  <path d="M8 12l4-3"/>
  <path d="M8 12l4 3"/>
</svg>`,
  },
  {
    id: 'phys-pendulum',
    name: 'Pendulum',
    domain: 'physics',
    category: 'mechanics',
    tags: ['oscillation', 'gravity', 'period', 'harmonic', 'motion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 4h12"/>
  <path d="M12 4l4 12"/>
  <circle cx="16" cy="18" r="3"/>
  <path d="M12 4l-4 10" stroke-dasharray="2 2"/>
  <circle cx="8" cy="15" r="2" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'phys-prism',
    name: 'Prism',
    domain: 'physics',
    category: 'optics',
    tags: ['refraction', 'spectrum', 'dispersion', 'light', 'rainbow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 22,20 2,20"/>
  <path d="M2 12l6 0"/>
  <path d="M16 12l2 2"/>
  <path d="M16 14l3 1"/>
  <path d="M16 16l4 0"/>
</svg>`,
  },
  {
    id: 'phys-electron',
    name: 'Electron',
    domain: 'physics',
    category: 'particles',
    tags: ['particle', 'charge', 'orbit', 'quantum', 'lepton'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="8" r="2"/>
  <path d="M12 4a8 8 0 0 1 0 16"/>
</svg>`,
  },
  {
    id: 'phys-force',
    name: 'Force Vector',
    domain: 'physics',
    category: 'mechanics',
    tags: ['vector', 'arrow', 'newton', 'direction', 'magnitude'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 19L19 5"/>
  <path d="M12 5h7v7"/>
  <circle cx="5" cy="19" r="2"/>
</svg>`,
  },
  {
    id: 'phys-laser',
    name: 'Laser',
    domain: 'physics',
    category: 'optics',
    tags: ['coherent', 'beam', 'photon', 'stimulated emission', 'monochromatic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="8" height="8" rx="1"/>
  <path d="M10 12h12"/>
  <circle cx="6" cy="12" r="2"/>
  <path d="M22 10v4"/>
</svg>`,
  },
  {
    id: 'phys-thermometer',
    name: 'Thermometer',
    domain: 'physics',
    category: 'thermodynamics',
    tags: ['temperature', 'heat', 'celsius', 'fahrenheit', 'measurement'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 1 1 4 0Z"/>
  <path d="M10 10h4"/>
  <path d="M10 6h4"/>
</svg>`,
  },
  {
    id: 'phys-gravity',
    name: 'Gravity',
    domain: 'physics',
    category: 'mechanics',
    tags: ['gravitational', 'mass', 'attraction', 'weight', 'free fall'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="18" r="4"/>
  <path d="M12 2v8"/>
  <path d="M8 6l4 4 4-4"/>
  <path d="M4 18h4"/>
  <path d="M16 18h4"/>
</svg>`,
  },
  {
    id: 'phys-radiation',
    name: 'Radiation',
    domain: 'physics',
    category: 'nuclear',
    tags: ['radioactive', 'nuclear', 'decay', 'emission', 'hazard'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 2a10 10 0 0 1 8.66 5"/>
  <path d="M12 2a10 10 0 0 0-8.66 5"/>
  <path d="M20.66 17a10 10 0 0 1-8.66 5"/>
  <path d="M3.34 17a10 10 0 0 0 8.66 5"/>
  <path d="M3.34 7a10 10 0 0 0 0 10"/>
  <path d="M20.66 7a10 10 0 0 1 0 10"/>
</svg>`,
  },
  {
    id: 'phys-capacitor',
    name: 'Capacitor',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['charge', 'storage', 'electric field', 'farad', 'parallel plate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h6"/>
  <path d="M14 12h6"/>
  <path d="M10 6v12"/>
  <path d="M14 6v12"/>
</svg>`,
  },
  {
    id: 'phys-inductor',
    name: 'Inductor',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['coil', 'magnetic field', 'inductance', 'henry', 'electromagnetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h2"/>
  <path d="M6 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M10 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M14 12c0-2 1-3 2-3s2 1 2 3"/>
  <path d="M18 12h2"/>
</svg>`,
  },
  {
    id: 'phys-photon',
    name: 'Photon',
    domain: 'physics',
    category: 'particles',
    tags: ['light', 'quantum', 'electromagnetic', 'boson', 'energy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.93 4.93l2.83 2.83"/>
  <path d="M16.24 16.24l2.83 2.83"/>
  <path d="M4.93 19.07l2.83-2.83"/>
  <path d="M16.24 7.76l2.83-2.83"/>
</svg>`,
  },
  {
    id: 'phys-momentum',
    name: 'Momentum',
    domain: 'physics',
    category: 'mechanics',
    tags: ['mass', 'velocity', 'collision', 'conservation', 'impulse'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M10 12h2"/>
  <path d="M13 10l2 2-2 2"/>
</svg>`,
  },
  {
    id: 'phys-spring',
    name: 'Spring',
    domain: 'physics',
    category: 'mechanics',
    tags: ['hooke', 'elastic', 'oscillation', 'restoring force', 'coil'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h2"/>
  <path d="M6 12l1-3 2 6 2-6 2 6 2-6 2 6 1-3"/>
  <path d="M18 12h2"/>
  <rect x="2" y="10" width="2" height="4"/>
  <rect x="20" y="10" width="2" height="4"/>
</svg>`,
  },
  {
    id: 'phys-mirror',
    name: 'Mirror',
    domain: 'physics',
    category: 'optics',
    tags: ['reflection', 'concave', 'convex', 'focal point', 'image'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 3c2 3 3 6 3 9s-1 6-3 9"/>
  <path d="M2 12h10"/>
  <path d="M12 12l-4 4"/>
  <path d="M12 12l4-4"/>
  <path d="M16 3v18"/>
</svg>`,
  },
  {
    id: 'phys-pulley',
    name: 'Pulley',
    domain: 'physics',
    category: 'mechanics',
    tags: ['simple machine', 'mechanical advantage', 'rope', 'tension', 'lift'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="6" r="4"/>
  <path d="M12 2v-0"/>
  <path d="M8 6v14"/>
  <path d="M16 6v10"/>
  <rect x="6" y="20" width="4" height="2"/>
  <rect x="14" y="16" width="4" height="4"/>
</svg>`,
  },
  {
    id: 'phys-oscilloscope',
    name: 'Oscilloscope',
    domain: 'physics',
    category: 'measurement',
    tags: ['waveform', 'signal', 'frequency', 'voltage', 'display'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="M4 12h2c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0h2"/>
  <circle cx="6" cy="18" r="0.5" fill="currentColor"/>
  <circle cx="18" cy="18" r="0.5" fill="currentColor"/>
</svg>`,
  },

  // ===========================================================================
  // RELATIVITY & MODERN PHYSICS
  // ===========================================================================
  {
    id: 'phys-spacetime',
    name: 'Spacetime Curvature',
    domain: 'physics',
    category: 'relativity',
    tags: ['general relativity', 'Einstein', 'gravity', 'curvature', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c16 4 32 4 48 0"/>
      <path d="M8 28c16 8 32 8 48 0"/>
      <path d="M8 40c12 8 20 16 24 16s12-8 24-16"/>
      <circle cx="32" cy="40" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="8"/>
    </svg>`,
  },
  {
    id: 'phys-light-cone',
    name: 'Light Cone',
    domain: 'physics',
    category: 'relativity',
    tags: ['special relativity', 'causality', 'worldline', 'event', 'spacetime'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-20 24h40z" fill="currentColor" opacity="0.1"/>
      <path d="M32 56l-20-24h40z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8l-20 24"/>
      <path d="M32 8l20 24"/>
      <path d="M32 56l-20-24"/>
      <path d="M32 56l20 24"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <text x="4" y="20" font-size="6" fill="currentColor" stroke="none">future</text>
      <text x="4" y="52" font-size="6" fill="currentColor" stroke="none">past</text>
    </svg>`,
  },
  {
    id: 'phys-time-dilation',
    name: 'Time Dilation',
    domain: 'physics',
    category: 'relativity',
    tags: ['special relativity', 'twin paradox', 'Lorentz', 'velocity', 'clock'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="14"/>
      <path d="M20 22v10l6 4"/>
      <circle cx="44" cy="32" r="10"/>
      <path d="M44 26v6l4 2"/>
      <path d="M44 14l8-6"/>
      <path d="M44 50l8 6"/>
      <text x="14" y="58" font-size="5" fill="currentColor" stroke="none">rest</text>
      <text x="36" y="58" font-size="5" fill="currentColor" stroke="none">moving</text>
    </svg>`,
  },
  {
    id: 'phys-lorentz',
    name: 'Lorentz Contraction',
    domain: 'physics',
    category: 'relativity',
    tags: ['length contraction', 'special relativity', 'velocity', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="12" rx="2"/>
      <ellipse cx="32" cy="44" rx="24" ry="8"/>
      <path d="M8 28v8"/>
      <path d="M56 28v8"/>
      <path d="M8 36h48"/>
      <path d="M20 52l4-4"/>
      <path d="M44 52l-4-4"/>
      <text x="24" y="60" font-size="6" fill="currentColor" stroke="none">L = L₀/γ</text>
    </svg>`,
  },
  {
    id: 'phys-e-mc2',
    name: 'Mass-Energy Equivalence',
    domain: 'physics',
    category: 'relativity',
    tags: ['Einstein', 'E=mc2', 'energy', 'mass', 'speed of light'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="12" y="38" font-size="14" font-weight="bold" fill="currentColor" stroke="none">E=mc²</text>
      <path d="M32 8v4"/>
      <path d="M32 52v4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
    </svg>`,
  },
  {
    id: 'phys-black-hole',
    name: 'Black Hole',
    domain: 'physics',
    category: 'relativity',
    tags: ['event horizon', 'singularity', 'Schwarzschild', 'gravity', 'spacetime'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" stroke-dasharray="4 2"/>
      <path d="M8 24c8 4 16 8 24 8s16-4 24-8"/>
      <path d="M8 40c8-4 16-8 24-8s16 4 24 8"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">event horizon</text>
    </svg>`,
  },
  {
    id: 'phys-gravitational-wave',
    name: 'Gravitational Wave',
    domain: 'physics',
    category: 'relativity',
    tags: ['LIGO', 'spacetime ripple', 'binary merger', 'detection', 'wave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="8" ry="12"/>
      <ellipse cx="44" cy="32" rx="8" ry="12"/>
      <path d="M8 32c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0"/>
      <circle cx="20" cy="32" r="3" fill="currentColor"/>
      <circle cx="44" cy="32" r="3" fill="currentColor"/>
    </svg>`,
  },

  // ===========================================================================
  // FLUID DYNAMICS
  // ===========================================================================
  {
    id: 'phys-fluid-flow',
    name: 'Fluid Flow',
    domain: 'physics',
    category: 'fluids',
    tags: ['laminar', 'streamline', 'velocity', 'Bernoulli', 'hydrodynamics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h48"/>
      <path d="M8 28h48"/>
      <path d="M8 36h48"/>
      <path d="M8 44h48"/>
      <path d="M52 16l4 4-4 4"/>
      <path d="M52 24l4 4-4 4"/>
      <path d="M52 32l4 4-4 4"/>
      <path d="M52 40l4 4-4 4"/>
    </svg>`,
  },
  {
    id: 'phys-turbulence',
    name: 'Turbulent Flow',
    domain: 'physics',
    category: 'fluids',
    tags: ['turbulence', 'Reynolds', 'chaotic', 'vortex', 'eddies'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-8 8-4 12 0s8 8 12 0 8-8 12 4s8 4 12-4"/>
      <path d="M8 20c6-4 10 4 16 0s10-8 16 0 10 4 16 0"/>
      <path d="M8 44c6 4 10-4 16 0s10 8 16 0 10-4 16 0"/>
      <circle cx="28" cy="32" r="4"/>
      <circle cx="44" cy="28" r="3"/>
      <circle cx="40" cy="40" r="3"/>
    </svg>`,
  },
  {
    id: 'phys-bernoulli',
    name: 'Bernoulli Effect',
    domain: 'physics',
    category: 'fluids',
    tags: ['Bernoulli', 'pressure', 'velocity', 'venturi', 'lift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8 0 12 8 24 8s16-8 24-8"/>
      <path d="M8 48c8 0 12-8 24-8s16 8 24 8"/>
      <path d="M20 24v16" stroke-dasharray="3 2"/>
      <path d="M32 24v16" stroke-dasharray="3 2"/>
      <path d="M44 24v16" stroke-dasharray="3 2"/>
      <path d="M12 32h8"/>
      <path d="M16 28l4 4-4 4"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">P+ρv²/2=const</text>
    </svg>`,
  },
  {
    id: 'phys-viscosity',
    name: 'Viscosity',
    domain: 'physics',
    category: 'fluids',
    tags: ['viscosity', 'shear', 'stress', 'friction', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="48" width="48" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M12 20h40"/>
      <path d="M16 28h36"/>
      <path d="M20 36h32"/>
      <path d="M24 44h28"/>
      <path d="M48 16l4 4"/>
      <path d="M44 24l4 4"/>
      <path d="M40 32l4 4"/>
      <path d="M36 40l4 4"/>
    </svg>`,
  },
  {
    id: 'phys-buoyancy',
    name: 'Buoyancy',
    domain: 'physics',
    category: 'fluids',
    tags: ['Archimedes', 'floating', 'displacement', 'density', 'upthrust'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="28" fill="#3B82F6" opacity="0.2"/>
      <rect x="24" y="20" width="16" height="24" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="20" width="16" height="24" rx="2"/>
      <path d="M32 48v8"/>
      <path d="M28 52l4 4 4-4"/>
      <path d="M32 20v-8"/>
      <path d="M28 16l4-4 4 4" stroke="#22C55E"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">F_b = ρVg</text>
    </svg>`,
  },
  {
    id: 'phys-vortex',
    name: 'Vortex',
    domain: 'physics',
    category: 'fluids',
    tags: ['vortex', 'rotation', 'angular momentum', 'whirlpool', 'circulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M48 36l4 4-4 4"/>
      <path d="M44 48l-4 4 4 4"/>
      <path d="M16 28l-4-4 4-4"/>
    </svg>`,
  },
  {
    id: 'phys-pressure',
    name: 'Pressure',
    domain: 'physics',
    category: 'fluids',
    tags: ['pressure', 'force', 'area', 'Pascal', 'hydrostatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="24" rx="2"/>
      <path d="M24 24v-8"/>
      <path d="M32 24v-8"/>
      <path d="M40 24v-8"/>
      <path d="M20 20l4-4 4 4"/>
      <path d="M28 20l4-4 4 4"/>
      <path d="M36 20l4-4 4 4"/>
      <text x="20" y="40" font-size="8" fill="currentColor" stroke="none">P=F/A</text>
    </svg>`,
  },

  // ===========================================================================
  // ACOUSTICS & SOUND
  // ===========================================================================
  {
    id: 'phys-sound-wave',
    name: 'Sound Wave',
    domain: 'physics',
    category: 'acoustics',
    tags: ['sound', 'longitudinal', 'compression', 'rarefaction', 'acoustic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-12 8-12 12 0s8 12 12 0 8-12 12 0 8 12 12 0"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="20" cy="32" r="2"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">compression</text>
    </svg>`,
  },
  {
    id: 'phys-speaker',
    name: 'Speaker',
    domain: 'physics',
    category: 'acoustics',
    tags: ['speaker', 'loudspeaker', 'transducer', 'audio', 'vibration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20v24l16 8V12z" fill="currentColor" opacity="0.2"/>
      <path d="M8 20v24l16 8V12z"/>
      <path d="M32 24c4 4 4 12 0 16"/>
      <path d="M40 20c6 6 6 18 0 24"/>
      <path d="M48 16c8 8 8 24 0 32"/>
    </svg>`,
  },
  {
    id: 'phys-resonance',
    name: 'Resonance',
    domain: 'physics',
    category: 'acoustics',
    tags: ['resonance', 'natural frequency', 'standing wave', 'amplification', 'harmonic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" rx="2"/>
      <path d="M16 28c4-12 8-12 12 0"/>
      <path d="M28 28c4 12 8 12 12 0"/>
      <path d="M40 28c4-12 8-12 12 0"/>
      <circle cx="22" cy="16" r="2" fill="currentColor"/>
      <circle cx="34" cy="40" r="2" fill="currentColor"/>
      <circle cx="46" cy="16" r="2" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-doppler',
    name: 'Doppler Effect',
    domain: 'physics',
    category: 'acoustics',
    tags: ['Doppler', 'frequency shift', 'motion', 'redshift', 'blueshift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="4" fill="currentColor"/>
      <circle cx="24" cy="32" r="8"/>
      <circle cx="24" cy="32" r="12"/>
      <circle cx="24" cy="32" r="16"/>
      <path d="M24 32h28"/>
      <path d="M48 28l4 4-4 4"/>
      <text x="44" y="52" font-size="5" fill="currentColor" stroke="none">v</text>
    </svg>`,
  },
  {
    id: 'phys-ultrasound',
    name: 'Ultrasound',
    domain: 'physics',
    category: 'acoustics',
    tags: ['ultrasound', 'high frequency', 'imaging', 'sonar', 'echolocation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="12" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="24" width="12" height="16" rx="2"/>
      <path d="M24 28c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0"/>
      <path d="M24 36c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">f > 20kHz</text>
    </svg>`,
  },
  {
    id: 'phys-standing-wave',
    name: 'Standing Wave',
    domain: 'physics',
    category: 'acoustics',
    tags: ['standing wave', 'node', 'antinode', 'harmonic', 'stationary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="3 2"/>
      <path d="M8 32c6-12 12-12 18 0s12 12 18 0 6-12 12 0"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="26" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <text x="6" y="50" font-size="4" fill="currentColor" stroke="none">node</text>
      <text x="32" y="50" font-size="4" fill="currentColor" stroke="none">antinode</text>
    </svg>`,
  },
  {
    id: 'phys-beats',
    name: 'Beats',
    domain: 'physics',
    category: 'acoustics',
    tags: ['beats', 'interference', 'frequency difference', 'superposition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 24c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0 4-4 6 0 4 4 6 0 4-4 6 0 4 4 6 0 4-4 6 0"/>
      <path d="M4 40c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0"/>
      <path d="M8 56c8-8 16 0 24-4s16-4 24 4" stroke-width="2"/>
    </svg>`,
  },

  // ===========================================================================
  // LABORATORY EQUIPMENT
  // ===========================================================================
  {
    id: 'phys-spectrometer',
    name: 'Spectrometer',
    domain: 'physics',
    category: 'equipment',
    tags: ['spectrometer', 'spectroscopy', 'wavelength', 'analysis', 'spectrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <path d="M12 28h8"/>
      <line x1="24" y1="24" x2="24" y2="40"/>
      <path d="M28 32l4-4"/>
      <path d="M28 32l4 0"/>
      <path d="M28 32l4 4"/>
      <rect x="44" y="28" width="8" height="8"/>
    </svg>`,
  },
  {
    id: 'phys-interferometer',
    name: 'Interferometer',
    domain: 'physics',
    category: 'equipment',
    tags: ['interferometer', 'Michelson', 'Fabry-Perot', 'interference', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20"/>
      <rect x="28" y="28" width="8" height="8" transform="rotate(45 32 32)" fill="currentColor" opacity="0.2"/>
      <path d="M32 32h20"/>
      <path d="M32 32v-20"/>
      <line x1="52" y1="28" x2="52" y2="36" stroke-width="2"/>
      <line x1="28" y1="12" x2="36" y2="12" stroke-width="2"/>
      <circle cx="48" cy="48" r="8"/>
    </svg>`,
  },
  {
    id: 'phys-accelerator',
    name: 'Particle Accelerator',
    domain: 'physics',
    category: 'equipment',
    tags: ['accelerator', 'synchrotron', 'cyclotron', 'CERN', 'LHC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="18" stroke-dasharray="4 2"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="8" cy="32" r="4"/>
      <circle cx="56" cy="32" r="4"/>
      <circle cx="32" cy="56" r="4"/>
      <circle cx="18" cy="18" r="2" fill="currentColor"/>
      <path d="M18 18l8 8"/>
    </svg>`,
  },
  {
    id: 'phys-voltmeter',
    name: 'Voltmeter',
    domain: 'physics',
    category: 'equipment',
    tags: ['voltmeter', 'voltage', 'measurement', 'multimeter', 'electrical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="26" y="28" font-size="12" fill="currentColor" stroke="none">V</text>
      <path d="M32 40v8"/>
      <path d="M20 48l12-8 12 8"/>
      <circle cx="16" cy="52" r="3"/>
      <circle cx="48" cy="52" r="3"/>
    </svg>`,
  },
  {
    id: 'phys-ammeter',
    name: 'Ammeter',
    domain: 'physics',
    category: 'equipment',
    tags: ['ammeter', 'current', 'measurement', 'ampere', 'electrical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="26" y="28" font-size="12" fill="currentColor" stroke="none">A</text>
      <path d="M32 40v8"/>
      <path d="M20 48l12-8 12 8"/>
      <circle cx="16" cy="52" r="3"/>
      <circle cx="48" cy="52" r="3"/>
    </svg>`,
  },
  {
    id: 'phys-galvanometer',
    name: 'Galvanometer',
    domain: 'physics',
    category: 'equipment',
    tags: ['galvanometer', 'current detection', 'sensitive', 'deflection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="26" y="28" font-size="12" fill="currentColor" stroke="none">G</text>
      <path d="M32 32l-12 16"/>
      <path d="M24 44l-4-4 4-2"/>
      <line x1="12" y1="52" x2="52" y2="52"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-calorimeter',
    name: 'Calorimeter',
    domain: 'physics',
    category: 'equipment',
    tags: ['calorimeter', 'heat', 'measurement', 'thermal', 'specific heat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="36" rx="2"/>
      <rect x="20" y="20" width="24" height="28" rx="1" fill="#3B82F6" opacity="0.2"/>
      <path d="M32 8v8"/>
      <path d="M32 8l-4 4h8z" fill="currentColor"/>
      <path d="M28 32l4-8 4 8" stroke="#EF4444"/>
      <circle cx="32" cy="40" r="4" fill="#EF4444" opacity="0.3"/>
    </svg>`,
  },
  {
    id: 'phys-geiger-counter',
    name: 'Geiger Counter',
    domain: 'physics',
    category: 'equipment',
    tags: ['Geiger', 'radiation', 'detector', 'counter', 'radioactivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="36" height="24" rx="4"/>
      <rect x="44" y="28" width="12" height="8" rx="2"/>
      <circle cx="20" cy="32" r="8"/>
      <path d="M20 28v4l3 2"/>
      <path d="M32 28v8" stroke="#EF4444"/>
      <path d="M36 28v8" stroke="#EF4444"/>
      <path d="M16 48v4"/>
      <path d="M28 48v4"/>
    </svg>`,
  },
  {
    id: 'phys-cloud-chamber',
    name: 'Cloud Chamber',
    domain: 'physics',
    category: 'equipment',
    tags: ['cloud chamber', 'particle', 'tracks', 'ionization', 'detection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <rect x="12" y="12" width="40" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 32c8-8 16 0 24-8"/>
      <path d="M20 40c12-4 16-12 24-4"/>
      <path d="M24 24l16 20"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="20" cy="40" r="2" fill="currentColor"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-scintillator',
    name: 'Scintillation Detector',
    domain: 'physics',
    category: 'equipment',
    tags: ['scintillator', 'detector', 'photomultiplier', 'radiation', 'light'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="24" rx="2" fill="#8B5CF6" opacity="0.2"/>
      <rect x="8" y="20" width="20" height="24" rx="2"/>
      <rect x="28" y="24" width="28" height="16" rx="2"/>
      <path d="M16 28l4 4-4 4" stroke="#FBBF24"/>
      <circle cx="40" cy="32" r="4"/>
      <path d="M48 32h4"/>
      <text x="12" y="56" font-size="5" fill="currentColor" stroke="none">crystal</text>
      <text x="36" y="56" font-size="5" fill="currentColor" stroke="none">PMT</text>
    </svg>`,
  },

  // ===========================================================================
  // ADDITIONAL CORE PHYSICS
  // ===========================================================================
  {
    id: 'phys-atom',
    name: 'Atom',
    domain: 'physics',
    category: 'atomic',
    tags: ['atom', 'nucleus', 'electron', 'orbital', 'Bohr'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(60 32 32)"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(120 32 32)"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="8" cy="32" r="3" fill="currentColor"/>
      <circle cx="44" cy="52" r="3" fill="currentColor"/>
      <circle cx="44" cy="12" r="3" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-nucleus',
    name: 'Nucleus',
    domain: 'physics',
    category: 'nuclear',
    tags: ['nucleus', 'proton', 'neutron', 'nucleon', 'binding energy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="6" fill="#EF4444" opacity="0.5"/>
      <circle cx="36" cy="24" r="6" fill="#3B82F6" opacity="0.5"/>
      <circle cx="40" cy="36" r="6" fill="#EF4444" opacity="0.5"/>
      <circle cx="28" cy="40" r="6" fill="#3B82F6" opacity="0.5"/>
      <circle cx="32" cy="32" r="16"/>
      <text x="20" y="58" font-size="5" fill="#EF4444" stroke="none">p+</text>
      <text x="40" y="58" font-size="5" fill="#3B82F6" stroke="none">n</text>
    </svg>`,
  },
  {
    id: 'phys-beta-decay',
    name: 'Beta Decay',
    domain: 'physics',
    category: 'nuclear',
    tags: ['beta decay', 'radioactive', 'weak force', 'neutrino', 'electron'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="32" r="12"/>
      <path d="M32 32h20"/>
      <path d="M44 24l8 8-8 8"/>
      <path d="M32 20l20-12"/>
      <circle cx="52" cy="8" r="3"/>
      <path d="M32 44l20 12"/>
      <circle cx="52" cy="56" r="3" stroke-dasharray="2 2"/>
      <text x="52" y="36" font-size="5" fill="currentColor" stroke="none">β⁻</text>
      <text x="52" y="6" font-size="5" fill="currentColor" stroke="none">e⁻</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">ν</text>
    </svg>`,
  },
  {
    id: 'phys-alpha-decay',
    name: 'Alpha Decay',
    domain: 'physics',
    category: 'nuclear',
    tags: ['alpha decay', 'alpha particle', 'helium', 'radioactive', 'tunneling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="14" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="32" r="14"/>
      <path d="M34 32h16"/>
      <path d="M44 28l6 4-6 4"/>
      <circle cx="56" cy="32" r="6"/>
      <circle cx="54" cy="30" r="2" fill="#EF4444"/>
      <circle cx="58" cy="30" r="2" fill="#3B82F6"/>
      <circle cx="54" cy="34" r="2" fill="#3B82F6"/>
      <circle cx="58" cy="34" r="2" fill="#EF4444"/>
      <text x="50" y="48" font-size="6" fill="currentColor" stroke="none">α</text>
    </svg>`,
  },
  {
    id: 'phys-fission',
    name: 'Nuclear Fission',
    domain: 'physics',
    category: 'nuclear',
    tags: ['fission', 'splitting', 'chain reaction', 'energy', 'uranium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <path d="M26 32h4"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <ellipse cx="44" cy="24" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="40" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="24" rx="8" ry="6"/>
      <ellipse cx="44" cy="40" rx="8" ry="6"/>
      <path d="M52 24l4-4"/>
      <path d="M52 40l4 4"/>
      <circle cx="58" cy="18" r="2" fill="currentColor"/>
      <circle cx="58" cy="46" r="2" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-fusion',
    name: 'Nuclear Fusion',
    domain: 'physics',
    category: 'nuclear',
    tags: ['fusion', 'combining', 'hydrogen', 'stellar', 'plasma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="28" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="36" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="28" r="6"/>
      <circle cx="16" cy="36" r="6"/>
      <path d="M22 32h8"/>
      <path d="M26 28l4 4-4 4"/>
      <circle cx="44" cy="32" r="10" fill="#FBBF24" opacity="0.3"/>
      <circle cx="44" cy="32" r="10"/>
      <path d="M54 32l4 0"/>
      <path d="M44 22l0-4"/>
      <path d="M44 42l0 4"/>
      <text x="38" y="58" font-size="5" fill="currentColor" stroke="none">energy</text>
    </svg>`,
  },
  {
    id: 'phys-half-life',
    name: 'Half-Life',
    domain: 'physics',
    category: 'nuclear',
    tags: ['half-life', 'decay', 'exponential', 'radioactive', 'time'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V12"/>
      <path d="M8 56h48"/>
      <path d="M8 16c8 0 12 4 16 8s8 12 16 16 8 8 16 12"/>
      <line x1="16" y1="24" x2="16" y2="56" stroke-dasharray="3 2"/>
      <line x1="24" y1="32" x2="24" y2="56" stroke-dasharray="3 2"/>
      <line x1="32" y1="40" x2="32" y2="56" stroke-dasharray="3 2"/>
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">N</text>
      <text x="50" y="60" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">t½</text>
    </svg>`,
  },
  {
    id: 'phys-energy-level',
    name: 'Energy Levels',
    domain: 'physics',
    category: 'atomic',
    tags: ['energy levels', 'quantum', 'transition', 'photon', 'emission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="16" y1="52" x2="48" y2="52"/>
      <line x1="16" y1="40" x2="48" y2="40"/>
      <line x1="16" y1="28" x2="48" y2="28"/>
      <line x1="16" y1="16" x2="48" y2="16"/>
      <path d="M32 40v-12" stroke="#EF4444" stroke-width="2"/>
      <path d="M28 32l4-4 4 4" stroke="#EF4444"/>
      <path d="M40 32c4-4 8-4 12 0" stroke="#EF4444"/>
      <text x="4" y="54" font-size="5" fill="currentColor" stroke="none">n=1</text>
      <text x="4" y="42" font-size="5" fill="currentColor" stroke="none">n=2</text>
      <text x="4" y="30" font-size="5" fill="currentColor" stroke="none">n=3</text>
      <text x="4" y="18" font-size="5" fill="currentColor" stroke="none">n=4</text>
    </svg>`,
  },
  {
    id: 'phys-photoelectric',
    name: 'Photoelectric Effect',
    domain: 'physics',
    category: 'quantum',
    tags: ['photoelectric', 'photon', 'electron', 'Einstein', 'threshold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="20" width="8" height="32" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="20" width="8" height="32"/>
      <path d="M8 28c4-4 8-4 12 0" stroke="#FBBF24"/>
      <path d="M8 36c4-4 8-4 12 0" stroke="#FBBF24"/>
      <path d="M8 44c4-4 8-4 12 0" stroke="#FBBF24"/>
      <path d="M36 32h16"/>
      <path d="M44 28l8 4-8 4"/>
      <circle cx="56" cy="32" r="3" fill="currentColor"/>
      <text x="44" y="52" font-size="5" fill="currentColor" stroke="none">e⁻</text>
    </svg>`,
  },
  {
    id: 'phys-compton',
    name: 'Compton Scattering',
    domain: 'physics',
    category: 'quantum',
    tags: ['Compton', 'scattering', 'photon', 'electron', 'wavelength shift'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20" stroke="#FBBF24"/>
      <path d="M24 28l4 4-4 4" stroke="#FBBF24"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M36 28l16-12" stroke="#FBBF24" stroke-dasharray="3 2"/>
      <path d="M36 36l16 12"/>
      <path d="M48 44l4 4 4-4"/>
      <circle cx="56" cy="52" r="3" fill="currentColor"/>
      <text x="48" y="12" font-size="5" fill="#FBBF24" stroke="none">γ'</text>
      <text x="48" y="60" font-size="5" fill="currentColor" stroke="none">e⁻</text>
    </svg>`,
  },
  {
    id: 'phys-de-broglie',
    name: 'De Broglie Wave',
    domain: 'physics',
    category: 'quantum',
    tags: ['de Broglie', 'matter wave', 'wavelength', 'momentum', 'wave-particle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="32" r="8"/>
      <path d="M24 32c4-8 8-8 12 0s8 8 12 0 8-8 12 0"/>
      <path d="M24 32h32" stroke-dasharray="3 2"/>
      <text x="24" y="52" font-size="6" fill="currentColor" stroke="none">λ = h/p</text>
    </svg>`,
  },
  {
    id: 'phys-uncertainty',
    name: 'Uncertainty Principle',
    domain: 'physics',
    category: 'quantum',
    tags: ['uncertainty', 'Heisenberg', 'position', 'momentum', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="20" cy="32" rx="12" ry="20"/>
      <ellipse cx="44" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="44" cy="32" rx="12" ry="8"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Δx</text>
      <text x="40" y="58" font-size="5" fill="currentColor" stroke="none">Δp</text>
      <text x="16" y="8" font-size="6" fill="currentColor" stroke="none">ΔxΔp ≥ ℏ/2</text>
    </svg>`,
  },
  {
    id: 'phys-work-energy',
    name: 'Work-Energy',
    domain: 'physics',
    category: 'mechanics',
    tags: ['work', 'energy', 'theorem', 'force', 'displacement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="28" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="28" width="12" height="12" rx="2"/>
      <path d="M24 34h20" stroke-width="2"/>
      <path d="M40 30l4 4-4 4"/>
      <rect x="44" y="28" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="28" width="12" height="12" rx="2"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">W = ΔKE</text>
    </svg>`,
  },
  {
    id: 'phys-torque',
    name: 'Torque',
    domain: 'physics',
    category: 'mechanics',
    tags: ['torque', 'moment', 'rotation', 'lever arm', 'angular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <path d="M32 32h24"/>
      <path d="M56 24v16"/>
      <path d="M52 28l4-4 4 4"/>
      <path d="M52 36l4 4 4-4"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <path d="M44 20l4 4-4 4"/>
      <text x="16" y="56" font-size="6" fill="currentColor" stroke="none">τ = r × F</text>
    </svg>`,
  },
  {
    id: 'phys-lever',
    name: 'Lever',
    domain: 'physics',
    category: 'mechanics',
    tags: ['lever', 'fulcrum', 'mechanical advantage', 'simple machine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,40 28,52 36,52" fill="currentColor"/>
      <line x1="8" y1="36" x2="56" y2="44"/>
      <rect x="8" y="28" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="48" y="36" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <line x1="8" y1="52" x2="56" y2="52"/>
      <text x="8" y="24" font-size="5" fill="currentColor" stroke="none">F₁</text>
      <text x="48" y="56" font-size="5" fill="currentColor" stroke="none">F₂</text>
    </svg>`,
  },
  {
    id: 'phys-inclined-plane',
    name: 'Inclined Plane',
    domain: 'physics',
    category: 'mechanics',
    tags: ['inclined plane', 'ramp', 'friction', 'components', 'angle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="8,52 56,52 56,20" fill="currentColor" opacity="0.1"/>
      <path d="M8 52l48 0l0-32z"/>
      <rect x="28" y="32" width="8" height="8" transform="rotate(-34 32 36)" fill="currentColor" opacity="0.3"/>
      <path d="M32 36l-8 12"/>
      <path d="M28 44l4 4"/>
      <path d="M32 36l12 4"/>
      <path d="M40 36l4 4"/>
      <path d="M16 52c8 0 8-4 8-8"/>
      <text x="20" y="48" font-size="5" fill="currentColor" stroke="none">θ</text>
    </svg>`,
  },
  {
    id: 'phys-centripetal',
    name: 'Centripetal Force',
    domain: 'physics',
    category: 'mechanics',
    tags: ['centripetal', 'circular motion', 'acceleration', 'radius', 'velocity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <circle cx="52" cy="32" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="32" r="5"/>
      <path d="M52 32h-16" stroke="#EF4444" stroke-width="2"/>
      <path d="M40 28l-4 4 4 4" stroke="#EF4444"/>
      <path d="M52 27v-8" stroke="#3B82F6"/>
      <path d="M48 23l4-4 4 4" stroke="#3B82F6"/>
      <text x="40" y="44" font-size="5" fill="#EF4444" stroke="none">F_c</text>
      <text x="44" y="16" font-size="5" fill="#3B82F6" stroke="none">v</text>
    </svg>`,
  },
  {
    id: 'phys-electric-field',
    name: 'Electric Field',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['electric field', 'field lines', 'charge', 'Coulomb', 'vector'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="8"/>
      <text x="29" y="35" font-size="8" fill="currentColor" stroke="none">+</text>
      <path d="M40 32h16"/>
      <path d="M52 28l4 4-4 4"/>
      <path d="M24 32h-16"/>
      <path d="M12 28l-4 4 4 4"/>
      <path d="M32 24v-16"/>
      <path d="M28 12l4-4 4 4"/>
      <path d="M32 40v16"/>
      <path d="M28 52l4 4 4-4"/>
    </svg>`,
  },
  {
    id: 'phys-magnetic-field',
    name: 'Magnetic Field',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['magnetic field', 'field lines', 'magnet', 'dipole', 'B field'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="28" width="16" height="8" rx="1"/>
      <text x="26" y="35" font-size="6" fill="currentColor" stroke="none">N</text>
      <text x="34" y="35" font-size="6" fill="currentColor" stroke="none">S</text>
      <path d="M20 32c-8-16 8-24 12-24s20 8 12 24"/>
      <path d="M20 32c-8 16 8 24 12 24s20-8 12-24"/>
      <path d="M28 8l4 4"/>
      <path d="M28 56l4-4"/>
    </svg>`,
  },
  {
    id: 'phys-electromagnetic-induction',
    name: 'EM Induction',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['induction', 'Faraday', 'EMF', 'flux', 'generator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M16 32v8"/>
      <path d="M48 32v8"/>
      <ellipse cx="32" cy="40" rx="16" ry="8" stroke-dasharray="3 2"/>
      <path d="M32 8v16" stroke="#3B82F6"/>
      <path d="M28 20l4-4 4 4" stroke="#3B82F6"/>
      <circle cx="8" cy="32" r="3" fill="currentColor"/>
      <circle cx="56" cy="32" r="3"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">EMF = -dΦ/dt</text>
    </svg>`,
  },
  {
    id: 'phys-ac-current',
    name: 'AC Current',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['AC', 'alternating', 'current', 'sine wave', 'frequency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="3 2"/>
      <path d="M8 32c4-12 8-12 12 0s8 12 12 0 8-12 12 0 8 12 12 0"/>
      <path d="M8 8v48"/>
      <text x="4" y="20" font-size="5" fill="currentColor" stroke="none">I</text>
      <text x="50" y="44" font-size="5" fill="currentColor" stroke="none">t</text>
    </svg>`,
  },
  {
    id: 'phys-dc-current',
    name: 'DC Current',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['DC', 'direct', 'current', 'battery', 'constant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="40" x2="56" y2="40" stroke-dasharray="3 2"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke-width="2"/>
      <path d="M8 8v48"/>
      <text x="4" y="20" font-size="5" fill="currentColor" stroke="none">I</text>
      <text x="50" y="52" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="50" y="20" font-size="5" fill="currentColor" stroke="none">I₀</text>
    </svg>`,
  },
  {
    id: 'phys-ohms-law',
    name: 'Ohms Law',
    domain: 'physics',
    category: 'electromagnetism',
    tags: ['Ohm', 'law', 'voltage', 'current', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <text x="16" y="28" font-size="10" fill="currentColor" stroke="none">V</text>
      <line x1="12" y1="32" x2="52" y2="32"/>
      <text x="16" y="44" font-size="10" fill="currentColor" stroke="none">I</text>
      <text x="36" y="44" font-size="10" fill="currentColor" stroke="none">R</text>
    </svg>`,
  },
  {
    id: 'phys-refraction',
    name: 'Refraction',
    domain: 'physics',
    category: 'optics',
    tags: ['refraction', 'Snell', 'bending', 'interface', 'index'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="32" width="48" height="24" fill="#3B82F6" opacity="0.2"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <path d="M20 8l12 24"/>
      <path d="M32 32l16 20"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="3 2"/>
      <text x="8" y="28" font-size="5" fill="currentColor" stroke="none">n₁</text>
      <text x="8" y="44" font-size="5" fill="currentColor" stroke="none">n₂</text>
    </svg>`,
  },
  {
    id: 'phys-total-internal-reflection',
    name: 'Total Internal Reflection',
    domain: 'physics',
    category: 'optics',
    tags: ['TIR', 'critical angle', 'fiber optics', 'reflection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="24" fill="#3B82F6" opacity="0.2"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <path d="M16 8l16 24"/>
      <path d="M32 32l16-24"/>
      <line x1="32" y1="8" x2="32" y2="32" stroke-dasharray="3 2"/>
      <text x="40" y="44" font-size="5" fill="currentColor" stroke="none">θ > θ_c</text>
    </svg>`,
  },
  {
    id: 'phys-polarization',
    name: 'Polarization',
    domain: 'physics',
    category: 'optics',
    tags: ['polarization', 'polarizer', 'filter', 'linear', 'transverse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
      <rect x="28" y="16" width="4" height="32" fill="currentColor" opacity="0.2"/>
      <line x1="30" y1="16" x2="30" y2="48"/>
      <path d="M36 32h20"/>
      <path d="M40 28l-4 4 4 4"/>
      <path d="M48 24v16"/>
    </svg>`,
  },
  {
    id: 'phys-interference-pattern',
    name: 'Interference Pattern',
    domain: 'physics',
    category: 'optics',
    tags: ['interference', 'pattern', 'fringes', 'constructive', 'destructive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="20" x2="8" y2="44"/>
      <line x1="16" y1="16" x2="16" y2="48" stroke-width="2"/>
      <line x1="24" y1="20" x2="24" y2="44"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke-width="2"/>
      <line x1="40" y1="20" x2="40" y2="44"/>
      <line x1="48" y1="16" x2="48" y2="48" stroke-width="2"/>
      <line x1="56" y1="20" x2="56" y2="44"/>
    </svg>`,
  },
  {
    id: 'phys-diffraction',
    name: 'Diffraction',
    domain: 'physics',
    category: 'optics',
    tags: ['diffraction', 'bending', 'slit', 'wave', 'spreading'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="4" height="20" fill="currentColor"/>
      <rect x="28" y="36" width="4" height="20" fill="currentColor"/>
      <path d="M8 28l20 4"/>
      <path d="M8 32l20 0"/>
      <path d="M8 36l20-4"/>
      <path d="M32 32c8 0 12-16 24-16"/>
      <path d="M32 32c8 0 12 0 24 0"/>
      <path d="M32 32c8 0 12 16 24 16"/>
    </svg>`,
  },
  {
    id: 'phys-youngs-double-slit',
    name: 'Double Slit Experiment',
    domain: 'physics',
    category: 'optics',
    tags: ['Young', 'double slit', 'interference', 'wave', 'quantum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="8" height="16" rx="1"/>
      <rect x="24" y="8" width="4" height="16" fill="currentColor"/>
      <rect x="24" y="28" width="4" height="8" fill="currentColor"/>
      <rect x="24" y="40" width="4" height="16" fill="currentColor"/>
      <path d="M28 24c12 0 16 8 28 8"/>
      <path d="M28 40c12 0 16-8 28-8"/>
      <rect x="56" y="16" width="4" height="32" fill="currentColor" opacity="0.2"/>
    </svg>`,
  },
  {
    id: 'phys-entropy',
    name: 'Entropy',
    domain: 'physics',
    category: 'thermodynamics',
    tags: ['entropy', 'disorder', 'second law', 'irreversible', 'statistical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="48" rx="2"/>
      <rect x="36" y="8" width="20" height="48" rx="2"/>
      <circle cx="14" cy="20" r="2" fill="currentColor"/>
      <circle cx="22" cy="20" r="2" fill="currentColor"/>
      <circle cx="14" cy="28" r="2" fill="currentColor"/>
      <circle cx="22" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="16" r="2" fill="currentColor"/>
      <circle cx="52" cy="24" r="2" fill="currentColor"/>
      <circle cx="44" cy="36" r="2" fill="currentColor"/>
      <circle cx="48" cy="48" r="2" fill="currentColor"/>
      <text x="10" y="60" font-size="5" fill="currentColor" stroke="none">low S</text>
      <text x="38" y="60" font-size="5" fill="currentColor" stroke="none">high S</text>
    </svg>`,
  },
  {
    id: 'phys-carnot-cycle',
    name: 'Carnot Cycle',
    domain: 'physics',
    category: 'thermodynamics',
    tags: ['Carnot', 'cycle', 'efficiency', 'heat engine', 'ideal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 52V12"/>
      <path d="M12 52h44"/>
      <path d="M16 16c8 4 16 4 24 8"/>
      <path d="M40 24c4 8 4 16 0 24"/>
      <path d="M40 48c-8-4-16-4-24-8"/>
      <path d="M16 40c-4-8-4-16 0-24"/>
      <text x="4" y="16" font-size="6" fill="currentColor" stroke="none">P</text>
      <text x="50" y="60" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="28" y="36" font-size="5" fill="currentColor" stroke="none">W</text>
    </svg>`,
  },

  // ===========================================================================
  // PARTICLE PHYSICS
  // ===========================================================================
  {
    id: 'phys-quark',
    name: 'Quark',
    domain: 'physics',
    category: 'particles',
    tags: ['quark', 'fundamental', 'strong force', 'flavor', 'color charge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="26" y="36" font-size="10" font-weight="bold" fill="currentColor" stroke="none">q</text>
      <path d="M20 20l-8-8"/>
      <path d="M44 20l8-8"/>
      <path d="M32 48v8"/>
      <circle cx="12" cy="12" r="3" fill="#EF4444"/>
      <circle cx="52" cy="12" r="3" fill="#22C55E"/>
      <circle cx="32" cy="56" r="3" fill="#3B82F6"/>
    </svg>`,
  },
  {
    id: 'phys-gluon',
    name: 'Gluon',
    domain: 'physics',
    category: 'particles',
    tags: ['gluon', 'boson', 'strong force', 'QCD', 'color charge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0"/>
      <circle cx="8" cy="32" r="4" fill="#EF4444"/>
      <circle cx="56" cy="32" r="4" fill="#3B82F6"/>
      <text x="28" y="52" font-size="8" fill="currentColor" stroke="none">g</text>
    </svg>`,
  },
  {
    id: 'phys-neutrino',
    name: 'Neutrino',
    domain: 'physics',
    category: 'particles',
    tags: ['neutrino', 'lepton', 'weak force', 'oscillation', 'flavor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="3"/>
      <path d="M40 32h16"/>
      <path d="M52 28l4 4-4 4"/>
      <path d="M8 32h16"/>
      <text x="26" y="56" font-size="10" fill="currentColor" stroke="none">ν</text>
    </svg>`,
  },
  {
    id: 'phys-higgs-boson',
    name: 'Higgs Boson',
    domain: 'physics',
    category: 'particles',
    tags: ['Higgs', 'boson', 'mass', 'field', 'scalar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <text x="24" y="56" font-size="10" fill="currentColor" stroke="none">H</text>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
    </svg>`,
  },
  {
    id: 'phys-w-boson',
    name: 'W Boson',
    domain: 'physics',
    category: 'particles',
    tags: ['W boson', 'weak force', 'beta decay', 'massive', 'charged'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <text x="22" y="38" font-size="14" font-weight="bold" fill="currentColor" stroke="none">W</text>
      <text x="38" y="28" font-size="8" fill="currentColor" stroke="none">±</text>
      <path d="M8 32c4-4 8-4 12 0"/>
      <path d="M44 32c4-4 8-4 12 0"/>
    </svg>`,
  },
  {
    id: 'phys-z-boson',
    name: 'Z Boson',
    domain: 'physics',
    category: 'particles',
    tags: ['Z boson', 'weak force', 'neutral current', 'massive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <text x="24" y="38" font-size="14" font-weight="bold" fill="currentColor" stroke="none">Z</text>
      <text x="38" y="28" font-size="8" fill="currentColor" stroke="none">0</text>
      <path d="M8 32c4-4 8-4 12 0"/>
      <path d="M44 32c4-4 8-4 12 0"/>
    </svg>`,
  },
  {
    id: 'phys-muon',
    name: 'Muon',
    domain: 'physics',
    category: 'particles',
    tags: ['muon', 'lepton', 'heavy electron', 'decay', 'cosmic ray'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="26" y="38" font-size="14" fill="currentColor" stroke="none">μ</text>
      <text x="40" y="28" font-size="8" fill="currentColor" stroke="none">-</text>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
    </svg>`,
  },
  {
    id: 'phys-positron',
    name: 'Positron',
    domain: 'physics',
    category: 'particles',
    tags: ['positron', 'antiparticle', 'antimatter', 'positronium', 'annihilation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="25" y="38" font-size="14" fill="currentColor" stroke="none">e</text>
      <text x="38" y="28" font-size="8" fill="currentColor" stroke="none">+</text>
      <path d="M16 16l6 6"/>
      <path d="M42 42l6 6"/>
      <path d="M16 48l6-6"/>
      <path d="M42 22l6-6"/>
    </svg>`,
  },
  {
    id: 'phys-pion',
    name: 'Pion',
    domain: 'physics',
    category: 'particles',
    tags: ['pion', 'meson', 'strong force', 'Yukawa', 'nuclear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <text x="24" y="38" font-size="14" fill="currentColor" stroke="none">π</text>
      <circle cx="24" cy="28" r="4" fill="#EF4444" opacity="0.5"/>
      <circle cx="40" cy="36" r="4" fill="#3B82F6" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'phys-proton-structure',
    name: 'Proton Structure',
    domain: 'physics',
    category: 'particles',
    tags: ['proton', 'quark structure', 'uud', 'hadron', 'baryon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="24" cy="28" r="6" fill="#EF4444" opacity="0.5"/>
      <circle cx="40" cy="28" r="6" fill="#EF4444" opacity="0.5"/>
      <circle cx="32" cy="40" r="6" fill="#3B82F6" opacity="0.5"/>
      <text x="22" y="30" font-size="6" fill="currentColor" stroke="none">u</text>
      <text x="38" y="30" font-size="6" fill="currentColor" stroke="none">u</text>
      <text x="30" y="42" font-size="6" fill="currentColor" stroke="none">d</text>
      <text x="28" y="58" font-size="6" fill="currentColor" stroke="none">p+</text>
    </svg>`,
  },

  // ===========================================================================
  // ASTROPHYSICS & COSMOLOGY
  // ===========================================================================
  {
    id: 'phys-galaxy',
    name: 'Galaxy',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['galaxy', 'spiral', 'dark matter', 'rotation curve', 'cosmology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <path d="M32 32c-8-4-12-8-16-16"/>
      <path d="M32 32c8 4 12 8 16 16"/>
      <path d="M32 32c-4 8-8 12-16 16"/>
      <path d="M32 32c4-8 8-12 16-16"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'phys-neutron-star',
    name: 'Neutron Star',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['neutron star', 'pulsar', 'degenerate matter', 'magnetar', 'dense'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <ellipse cx="32" cy="32" rx="24" ry="4" stroke-dasharray="4 2"/>
      <path d="M16 28l-8-4"/>
      <path d="M16 36l-8 4"/>
      <path d="M48 28l8-4"/>
      <path d="M48 36l8 4"/>
    </svg>`,
  },
  {
    id: 'phys-supernova',
    name: 'Supernova',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['supernova', 'explosion', 'stellar death', 'nucleosynthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M15 15l8 8"/>
      <path d="M41 41l8 8"/>
      <path d="M15 49l8-8"/>
      <path d="M41 23l8-8"/>
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
    </svg>`,
  },
  {
    id: 'phys-big-bang',
    name: 'Big Bang',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['big bang', 'cosmology', 'expansion', 'CMB', 'origin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="4" fill="currentColor"/>
      <path d="M12 32l40 0"/>
      <path d="M12 32c8-16 20-20 40-24"/>
      <path d="M12 32c8 16 20 20 40 24"/>
      <path d="M20 32c8-8 16-12 32-12"/>
      <path d="M20 32c8 8 16 12 32 12"/>
      <path d="M48 28l4 4-4 4"/>
      <text x="48" y="60" font-size="5" fill="currentColor" stroke="none">time</text>
    </svg>`,
  },
  {
    id: 'phys-dark-matter',
    name: 'Dark Matter',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['dark matter', 'halo', 'WIMP', 'gravitational', 'invisible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" opacity="0.5"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2" opacity="0.7"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="24" r="2" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="28" r="2" fill="currentColor" opacity="0.2"/>
      <circle cx="36" cy="44" r="2" fill="currentColor" opacity="0.2"/>
      <text x="48" y="56" font-size="5" fill="currentColor" stroke="none">DM</text>
    </svg>`,
  },
  {
    id: 'phys-redshift',
    name: 'Redshift',
    domain: 'physics',
    category: 'astrophysics',
    tags: ['redshift', 'Doppler', 'expansion', 'cosmological', 'wavelength'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c4-4 8-4 12 0s8 4 12 0 8-4 12 0" stroke="#3B82F6"/>
      <path d="M8 40c6-6 12-6 18 0s12 6 18 0" stroke="#EF4444"/>
      <path d="M4 32h8"/>
      <path d="M52 32h8"/>
      <path d="M28 32l8 0"/>
      <path d="M32 28l4 4-4 4"/>
      <text x="4" y="20" font-size="5" fill="#3B82F6" stroke="none">λ₀</text>
      <text x="4" y="52" font-size="5" fill="#EF4444" stroke="none">λ</text>
    </svg>`,
  },

  // ===========================================================================
  // SOLID STATE PHYSICS
  // ===========================================================================
  {
    id: 'phys-crystal-lattice',
    name: 'Crystal Lattice',
    domain: 'physics',
    category: 'solid-state',
    tags: ['crystal', 'lattice', 'unit cell', 'periodic', 'structure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="4" fill="currentColor"/>
      <circle cx="48" cy="16" r="4" fill="currentColor"/>
      <circle cx="16" cy="48" r="4" fill="currentColor"/>
      <circle cx="48" cy="48" r="4" fill="currentColor"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M16 16h32"/>
      <path d="M16 16v32"/>
      <path d="M48 16v32"/>
      <path d="M16 48h32"/>
      <path d="M16 16l16 16"/>
      <path d="M48 16l-16 16"/>
      <path d="M16 48l16-16"/>
      <path d="M48 48l-16-16"/>
    </svg>`,
  },
  {
    id: 'phys-band-gap',
    name: 'Band Gap',
    domain: 'physics',
    category: 'solid-state',
    tags: ['band gap', 'conductor', 'insulator', 'semiconductor', 'Fermi level'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="16" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="40" width="48" height="16" fill="currentColor" opacity="0.3"/>
      <path d="M8 24h48"/>
      <path d="M8 40h48"/>
      <line x1="32" y1="24" x2="32" y2="40" stroke-dasharray="4 2"/>
      <path d="M36 28l-4 4 4 4"/>
      <path d="M28 36l4-4-4-4"/>
      <text x="8" y="18" font-size="5" fill="currentColor" stroke="none">Conduction</text>
      <text x="8" y="52" font-size="5" fill="currentColor" stroke="none">Valence</text>
      <text x="36" y="34" font-size="5" fill="currentColor" stroke="none">Eg</text>
    </svg>`,
  },
  {
    id: 'phys-phonon',
    name: 'Phonon',
    domain: 'physics',
    category: 'solid-state',
    tags: ['phonon', 'lattice vibration', 'quantum', 'thermal', 'acoustical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="4"/>
      <circle cx="28" cy="28" r="4"/>
      <circle cx="44" cy="32" r="4"/>
      <circle cx="28" cy="40" r="4"/>
      <path d="M16 32h8"/>
      <path d="M32 28h8"/>
      <path d="M28 32v4"/>
      <path d="M8 20c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0"/>
      <text x="24" y="56" font-size="5" fill="currentColor" stroke="none">phonon</text>
    </svg>`,
  },
  {
    id: 'phys-superconductor',
    name: 'Superconductor',
    domain: 'physics',
    category: 'solid-state',
    tags: ['superconductor', 'Cooper pair', 'Meissner effect', 'BCS', 'zero resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="28" width="32" height="8" rx="4" fill="currentColor" opacity="0.3"/>
      <rect x="16" y="28" width="32" height="8" rx="4"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M12 24l-4-4"/>
      <path d="M12 40l-4 4"/>
      <path d="M52 24l4-4"/>
      <path d="M52 40l4 4"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <text x="16" y="52" font-size="5" fill="currentColor" stroke="none">T < Tc, R = 0</text>
    </svg>`,
  },
  {
    id: 'phys-fermi-surface',
    name: 'Fermi Surface',
    domain: 'physics',
    category: 'solid-state',
    tags: ['Fermi surface', 'momentum space', 'electrons', 'metal', 'band structure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <path d="M32 12c12 0 20 8 20 20s-8 20-20 20"/>
      <path d="M32 12c-12 0-20 8-20 20s8 20 20 20"/>
      <path d="M32 12c0 12-8 20-8 20s8 8 8 20"/>
      <path d="M32 12c0 12 8 20 8 20s-8 8-8 20"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">k-space</text>
    </svg>`,
  },

  // ===========================================================================
  // ADDITIONAL MECHANICS
  // ===========================================================================
  {
    id: 'phys-angular-momentum',
    name: 'Angular Momentum',
    domain: 'physics',
    category: 'mechanics',
    tags: ['angular momentum', 'rotation', 'conservation', 'spin', 'L = r x p'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <circle cx="48" cy="32" r="5" fill="currentColor" opacity="0.3"/>
      <path d="M32 32h16"/>
      <path d="M48 24c8 8 8 16 0 24"/>
      <path d="M52 44l-4 4-4-4"/>
      <path d="M32 8v8"/>
      <path d="M28 12l4-4 4 4"/>
      <text x="24" y="56" font-size="6" fill="currentColor" stroke="none">L = r×p</text>
    </svg>`,
  },
  {
    id: 'phys-rotational-motion',
    name: 'Rotational Motion',
    domain: 'physics',
    category: 'mechanics',
    tags: ['rotation', 'angular velocity', 'omega', 'moment of inertia', 'torque'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 12v8"/>
      <path d="M32 44v8"/>
      <path d="M12 32h8"/>
      <path d="M44 32h8"/>
      <path d="M44 20c8 4 8 12 4 20"/>
      <path d="M44 36l4 4 4-4"/>
      <text x="8" y="16" font-size="6" fill="currentColor" stroke="none">ω</text>
    </svg>`,
  },
  {
    id: 'phys-gyroscope',
    name: 'Gyroscope',
    domain: 'physics',
    category: 'mechanics',
    tags: ['gyroscope', 'precession', 'angular momentum', 'stability', 'spinning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="8"/>
      <ellipse cx="32" cy="40" rx="12" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v24"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M20 40l-8 8"/>
      <path d="M44 40l8 8"/>
      <path d="M24 36c4 4 12 4 16 0"/>
      <path d="M36 32l4 4 4-4"/>
    </svg>`,
  },
  {
    id: 'phys-simple-machine',
    name: 'Simple Machine',
    domain: 'physics',
    category: 'mechanics',
    tags: ['simple machine', 'mechanical advantage', 'wheel', 'axle', 'efficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="16"/>
      <circle cx="24" cy="32" r="4" fill="currentColor"/>
      <path d="M40 32h16"/>
      <path d="M24 8v8"/>
      <path d="M20 12l4-4 4 4"/>
      <rect x="52" y="24" width="8" height="16"/>
      <text x="48" y="56" font-size="5" fill="currentColor" stroke="none">MA</text>
    </svg>`,
  },
  {
    id: 'phys-friction',
    name: 'Friction',
    domain: 'physics',
    category: 'mechanics',
    tags: ['friction', 'static', 'kinetic', 'coefficient', 'normal force'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="20" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="24" width="20" height="16"/>
      <line x1="8" y1="40" x2="56" y2="40"/>
      <path d="M36 32h16"/>
      <path d="M48 28l4 4-4 4"/>
      <path d="M16 32h-8"/>
      <path d="M12 28l-4 4 4 4" stroke="#EF4444"/>
      <text x="8" y="24" font-size="5" fill="#EF4444" stroke="none">f</text>
      <text x="48" y="24" font-size="5" fill="currentColor" stroke="none">F</text>
      <text x="20" y="56" font-size="5" fill="currentColor" stroke="none">f = μN</text>
    </svg>`,
  },
  {
    id: 'phys-elastic-collision',
    name: 'Elastic Collision',
    domain: 'physics',
    category: 'mechanics',
    tags: ['elastic', 'collision', 'kinetic energy', 'momentum', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="32" r="8"/>
      <circle cx="44" cy="32" r="8"/>
      <path d="M12 32h-4"/>
      <path d="M56 32h4"/>
      <path d="M12 28l-4 4 4 4"/>
      <path d="M56 28l4 4-4 4"/>
      <path d="M28 32h8" stroke-dasharray="2 2"/>
      <text x="20" y="52" font-size="5" fill="currentColor" stroke="none">KE conserved</text>
    </svg>`,
  },

  // ===========================================================================
  // ADDITIONAL WAVES & OSCILLATIONS
  // ===========================================================================
  {
    id: 'phys-superposition',
    name: 'Wave Superposition',
    domain: 'physics',
    category: 'waves',
    tags: ['superposition', 'interference', 'waves', 'addition', 'principle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 16c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0"/>
      <path d="M4 32c4 4 8 4 12 0s8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0"/>
      <path d="M4 48c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0 8-8 12 0" stroke-width="2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">ψ₁</text>
      <text x="4" y="28" font-size="5" fill="currentColor" stroke="none">ψ₂</text>
      <text x="4" y="58" font-size="5" fill="currentColor" stroke="none">ψ₁+ψ₂</text>
    </svg>`,
  },
  {
    id: 'phys-damped-oscillation',
    name: 'Damped Oscillation',
    domain: 'physics',
    category: 'waves',
    tags: ['damped', 'oscillation', 'decay', 'exponential', 'amplitude'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c4-16 8-16 12 0s8 12 12 0 8-8 12 0 8 4 12 0 8 2 12 0"/>
      <path d="M4 16c0 8 56 24 56 16" stroke-dasharray="3 2"/>
      <path d="M4 48c0-8 56-24 56-16" stroke-dasharray="3 2"/>
      <path d="M4 8v48"/>
      <text x="48" y="56" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="28" y="12" font-size="5" fill="currentColor" stroke="none">e^(-γt)</text>
    </svg>`,
  },
  {
    id: 'phys-driven-oscillation',
    name: 'Driven Oscillation',
    domain: 'physics',
    category: 'waves',
    tags: ['driven', 'forced', 'oscillation', 'resonance', 'frequency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56V12"/>
      <path d="M8 56h48"/>
      <path d="M12 48c4-4 8-16 12-32 4 24 8 24 12 0 4 8 8 20 12 32"/>
      <line x1="32" y1="56" x2="32" y2="16" stroke-dasharray="3 2"/>
      <text x="28" y="12" font-size="5" fill="currentColor" stroke="none">ω₀</text>
      <text x="52" y="60" font-size="5" fill="currentColor" stroke="none">ω</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">A</text>
    </svg>`,
  },
  {
    id: 'phys-transverse-wave',
    name: 'Transverse Wave',
    domain: 'physics',
    category: 'waves',
    tags: ['transverse', 'wave', 'perpendicular', 'light', 'string'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 32c8-16 16-16 24 0s16 16 24 0 16-16 24 0"/>
      <path d="M4 32h56" stroke-dasharray="3 2"/>
      <path d="M28 16v32"/>
      <path d="M24 20l4-4 4 4"/>
      <path d="M24 44l4 4 4-4"/>
      <path d="M48 28l4 4-4 4"/>
      <text x="48" y="24" font-size="5" fill="currentColor" stroke="none">v</text>
    </svg>`,
  },
  {
    id: 'phys-longitudinal-wave',
    name: 'Longitudinal Wave',
    domain: 'physics',
    category: 'waves',
    tags: ['longitudinal', 'wave', 'compression', 'sound', 'parallel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="28" x2="8" y2="36"/>
      <line x1="12" y1="28" x2="12" y2="36"/>
      <line x1="14" y1="28" x2="14" y2="36"/>
      <line x1="16" y1="28" x2="16" y2="36"/>
      <line x1="22" y1="28" x2="22" y2="36"/>
      <line x1="28" y1="28" x2="28" y2="36"/>
      <line x1="34" y1="28" x2="34" y2="36"/>
      <line x1="36" y1="28" x2="36" y2="36"/>
      <line x1="38" y1="28" x2="38" y2="36"/>
      <line x1="40" y1="28" x2="40" y2="36"/>
      <line x1="46" y1="28" x2="46" y2="36"/>
      <line x1="52" y1="28" x2="52" y2="36"/>
      <line x1="56" y1="28" x2="56" y2="36"/>
      <path d="M4 48h56"/>
      <path d="M52 44l4 4-4 4"/>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">compression</text>
      <text x="44" y="56" font-size="5" fill="currentColor" stroke="none">v</text>
    </svg>`,
  },
];

export default physicsIcons;
