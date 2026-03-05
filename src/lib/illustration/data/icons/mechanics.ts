/**
 * Classical Mechanics Icon Library
 * Comprehensive SVG icons for Newtonian mechanics and analytical dynamics
 *
 * Categories:
 * - Forces (gravitational, friction, tension, spring)
 * - Motion (kinematics, projectile, circular, rotational)
 * - Energy (kinetic, potential, conservation)
 * - Momentum (linear, angular, collisions)
 * - Oscillations (SHM, damped, driven, coupled)
 */

import type { IconDefinition } from './index';

export const mechanicsIcons: IconDefinition[] = [
  // ===========================================================================
  // FORCES
  // ===========================================================================
  {
    id: 'mech-force-vector',
    name: 'Force Vector',
    domain: 'physics',
    category: 'forces',
    tags: ['force', 'vector', 'Newton', 'arrow', 'magnitude'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="40" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="40" r="8"/>
      <path d="M24 40h32" stroke-width="2"/>
      <path d="M48 32l8 8-8 8" stroke-width="2"/>
      <text x="40" y="28" font-size="10" font-weight="bold" fill="currentColor" stroke="none">F</text>
    </svg>`
  },
  {
    id: 'mech-gravity',
    name: 'Gravitational Force',
    domain: 'physics',
    category: 'forces',
    tags: ['gravity', 'weight', 'g', 'mg', 'gravitational'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="10"/>
      <path d="M32 30v24" stroke-width="2"/>
      <path d="M26 48l6 8 6-8" stroke-width="2"/>
      <text x="40" y="44" font-size="8" fill="currentColor" stroke="none">mg</text>
      <line x1="8" y1="58" x2="56" y2="58" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'mech-friction',
    name: 'Friction Force',
    domain: 'physics',
    category: 'forces',
    tags: ['friction', 'static', 'kinetic', 'coefficient', 'surface'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="24" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="24" width="24" height="16" rx="2"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-width="2"/>
      <path d="M44 32h12" stroke-width="2"/>
      <path d="M52 28l4 4-4 4"/>
      <path d="M20 32h-12" stroke="#EF4444" stroke-width="2"/>
      <path d="M12 28l-4 4 4 4" stroke="#EF4444"/>
      <text x="4" y="24" font-size="6" fill="#EF4444" stroke="none">f</text>
      <path d="M12 44l4-2 4 4 4-4 4 4 4-4 4 4 4-2"/>
    </svg>`
  },
  {
    id: 'mech-tension',
    name: 'Tension Force',
    domain: 'physics',
    category: 'forces',
    tags: ['tension', 'string', 'rope', 'cable', 'pull'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <line x1="16" y1="12" x2="16" y2="40"/>
      <circle cx="16" cy="48" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="48" r="8"/>
      <path d="M16 40v-12" stroke-width="2"/>
      <path d="M12 32l4-4 4 4"/>
      <path d="M16 56v8"/>
      <path d="M12 60l4 4 4-4"/>
      <text x="24" y="32" font-size="6" fill="currentColor" stroke="none">T</text>
      <text x="24" y="60" font-size="6" fill="currentColor" stroke="none">mg</text>
    </svg>`
  },
  {
    id: 'mech-spring-force',
    name: 'Spring Force',
    domain: 'physics',
    category: 'forces',
    tags: ['spring', 'Hooke', 'elastic', 'restoring', 'kx'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="8" height="16" fill="currentColor"/>
      <path d="M12 32l4 0 2-6 4 12 4-12 4 12 4-12 4 12 2-6 4 0"/>
      <circle cx="52" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="52" cy="32" r="6"/>
      <path d="M44 32h-8" stroke="#EF4444" stroke-width="2"/>
      <path d="M40 28l-4 4 4 4" stroke="#EF4444"/>
      <text x="24" y="52" font-size="6" fill="currentColor" stroke="none">F = -kx</text>
    </svg>`
  },
  {
    id: 'mech-normal-force',
    name: 'Normal Force',
    domain: 'physics',
    category: 'forces',
    tags: ['normal', 'contact', 'perpendicular', 'surface', 'reaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="28" width="16" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="28" width="16" height="12" rx="2"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-width="2"/>
      <path d="M32 28v-16" stroke="#22C55E" stroke-width="2"/>
      <path d="M28 16l4-4 4 4" stroke="#22C55E"/>
      <path d="M32 40v16" stroke-dasharray="3 2"/>
      <path d="M28 52l4 4 4-4"/>
      <text x="36" y="20" font-size="6" fill="#22C55E" stroke="none">N</text>
      <text x="36" y="52" font-size="6" fill="currentColor" stroke="none">mg</text>
    </svg>`
  },

  // ===========================================================================
  // MOTION
  // ===========================================================================
  {
    id: 'mech-velocity',
    name: 'Velocity Vector',
    domain: 'physics',
    category: 'motion',
    tags: ['velocity', 'speed', 'direction', 'kinematics', 'vector'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M22 32h32" stroke="#3B82F6" stroke-width="2"/>
      <path d="M48 26l6 6-6 6" stroke="#3B82F6" stroke-width="2"/>
      <path d="M16 44c8-4 16-4 24 0s16 4 24 0" stroke-dasharray="3 2"/>
      <text x="40" y="24" font-size="10" font-style="italic" fill="#3B82F6" stroke="none">v</text>
    </svg>`
  },
  {
    id: 'mech-acceleration',
    name: 'Acceleration',
    domain: 'physics',
    category: 'motion',
    tags: ['acceleration', 'change velocity', 'kinematics', 'a'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="6"/>
      <path d="M22 32h20" stroke="#3B82F6" stroke-width="1.5"/>
      <path d="M38 28l4 4-4 4" stroke="#3B82F6"/>
      <path d="M28 32h24" stroke="#EF4444" stroke-width="2"/>
      <path d="M48 26l6 6-6 6" stroke="#EF4444"/>
      <text x="32" y="20" font-size="8" fill="#3B82F6" stroke="none">v</text>
      <text x="48" y="20" font-size="8" fill="#EF4444" stroke="none">a</text>
      <text x="16" y="52" font-size="6" fill="currentColor" stroke="none">dv/dt</text>
    </svg>`
  },
  {
    id: 'mech-projectile',
    name: 'Projectile Motion',
    domain: 'physics',
    category: 'motion',
    tags: ['projectile', 'trajectory', 'parabola', 'ballistic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <path d="M12 52c8-32 24-32 40 0"/>
      <circle cx="12" cy="52" r="3" fill="currentColor"/>
      <circle cx="32" cy="20" r="3"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M12 52l8-12"/>
      <path d="M16 44l4-4"/>
      <path d="M32 20v8" stroke-dasharray="3 2"/>
      <text x="28" y="16" font-size="6" fill="currentColor" stroke="none">max</text>
    </svg>`
  },
  {
    id: 'mech-circular-motion',
    name: 'Circular Motion',
    domain: 'physics',
    category: 'motion',
    tags: ['circular', 'centripetal', 'angular velocity', 'rotation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <circle cx="52" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 32h20"/>
      <path d="M52 32v-12" stroke="#3B82F6"/>
      <path d="M48 24l4-4 4 4" stroke="#3B82F6"/>
      <path d="M52 32h-12" stroke="#EF4444"/>
      <path d="M44 28l-4 4 4 4" stroke="#EF4444"/>
      <text x="52" y="16" font-size="5" fill="#3B82F6" stroke="none">v</text>
      <text x="36" y="28" font-size="5" fill="#EF4444" stroke="none">a_c</text>
    </svg>`
  },
  {
    id: 'mech-rotational',
    name: 'Rotational Motion',
    domain: 'physics',
    category: 'motion',
    tags: ['rotation', 'angular', 'torque', 'moment of inertia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 8v16"/>
      <path d="M32 48v8"/>
      <path d="M44 28l4 4-4 4" stroke="#3B82F6"/>
      <path d="M20 28l-4 4 4 4" stroke="#3B82F6"/>
      <text x="48" y="24" font-size="8" fill="currentColor" stroke="none">omega</text>
    </svg>`
  },

  // ===========================================================================
  // ENERGY
  // ===========================================================================
  {
    id: 'mech-kinetic-energy',
    name: 'Kinetic Energy',
    domain: 'physics',
    category: 'energy',
    tags: ['kinetic', 'energy', 'motion', 'velocity', 'mv2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="10" fill="#F59E0B" opacity="0.3"/>
      <circle cx="24" cy="32" r="10"/>
      <path d="M34 32h20" stroke-width="2"/>
      <path d="M48 26l6 6-6 6"/>
      <path d="M16 32h-8" stroke-dasharray="3 2"/>
      <text x="16" y="52" font-size="7" fill="currentColor" stroke="none">KE = mv²/2</text>
    </svg>`
  },
  {
    id: 'mech-potential-energy',
    name: 'Potential Energy',
    domain: 'physics',
    category: 'energy',
    tags: ['potential', 'energy', 'gravitational', 'height', 'mgh'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <circle cx="32" cy="20" r="8" fill="#22C55E" opacity="0.3"/>
      <circle cx="32" cy="20" r="8"/>
      <line x1="8" y1="20" x2="24" y2="20" stroke-dasharray="3 2"/>
      <path d="M12 24v28"/>
      <path d="M8 24l4-4 4 4"/>
      <path d="M8 52l4 4 4-4"/>
      <text x="4" y="40" font-size="6" fill="currentColor" stroke="none">h</text>
      <text x="20" y="58" font-size="7" fill="currentColor" stroke="none">PE = mgh</text>
    </svg>`
  },
  {
    id: 'mech-energy-conservation',
    name: 'Energy Conservation',
    domain: 'physics',
    category: 'energy',
    tags: ['conservation', 'energy', 'mechanical', 'total'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48l24-32 24 32"/>
      <circle cx="12" cy="44" r="4" fill="#22C55E" opacity="0.5"/>
      <circle cx="32" cy="16" r="4" fill="#22C55E" opacity="0.8"/>
      <circle cx="52" cy="44" r="4" fill="#F59E0B" opacity="0.5"/>
      <line x1="8" y1="52" x2="56" y2="52"/>
      <text x="4" y="40" font-size="5" fill="currentColor" stroke="none">PE</text>
      <text x="28" y="12" font-size="5" fill="currentColor" stroke="none">PE</text>
      <text x="48" y="40" font-size="5" fill="currentColor" stroke="none">KE</text>
    </svg>`
  },
  {
    id: 'mech-work',
    name: 'Work Done',
    domain: 'physics',
    category: 'energy',
    tags: ['work', 'force', 'displacement', 'energy transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="28" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="28" width="12" height="12" rx="2"/>
      <path d="M28 34h24" stroke="#EF4444" stroke-width="2"/>
      <path d="M48 30l4 4-4 4" stroke="#EF4444"/>
      <path d="M16 44h32" stroke-dasharray="3 2"/>
      <path d="M16 48v-4"/>
      <path d="M48 48v-4"/>
      <text x="28" y="52" font-size="6" fill="currentColor" stroke="none">d</text>
      <text x="52" y="30" font-size="6" fill="#EF4444" stroke="none">F</text>
      <text x="16" y="60" font-size="6" fill="currentColor" stroke="none">W = F·d</text>
    </svg>`
  },

  // ===========================================================================
  // MOMENTUM
  // ===========================================================================
  {
    id: 'mech-linear-momentum',
    name: 'Linear Momentum',
    domain: 'physics',
    category: 'momentum',
    tags: ['momentum', 'linear', 'mv', 'impulse', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="32" r="10"/>
      <path d="M30 32h24" stroke="#8B5CF6" stroke-width="3"/>
      <path d="M48 26l6 6-6 6" stroke="#8B5CF6" stroke-width="2"/>
      <text x="40" y="24" font-size="10" font-style="italic" fill="#8B5CF6" stroke="none">p</text>
      <text x="16" y="52" font-size="7" fill="currentColor" stroke="none">p = mv</text>
    </svg>`
  },
  {
    id: 'mech-angular-momentum',
    name: 'Angular Momentum',
    domain: 'physics',
    category: 'momentum',
    tags: ['angular momentum', 'L', 'rotation', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <circle cx="48" cy="32" r="4"/>
      <path d="M32 8v12" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M28 16l4-4 4 4" stroke="#8B5CF6"/>
      <path d="M44 36l4 4-4 4"/>
      <text x="36" y="16" font-size="8" fill="#8B5CF6" stroke="none">L</text>
      <text x="16" y="56" font-size="6" fill="currentColor" stroke="none">L = r x p</text>
    </svg>`
  },
  {
    id: 'mech-elastic-collision',
    name: 'Elastic Collision',
    domain: 'physics',
    category: 'momentum',
    tags: ['elastic', 'collision', 'momentum', 'energy', 'conservation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="24" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="16" cy="24" r="8"/>
      <path d="M24 24h8"/>
      <path d="M28 20l4 4-4 4"/>
      <circle cx="44" cy="24" r="8"/>
      <circle cx="24" cy="44" r="8" fill="#3B82F6" opacity="0.3"/>
      <path d="M20 48l-8 8"/>
      <circle cx="44" cy="44" r="8"/>
      <path d="M48 48l8-8"/>
      <line x1="32" y1="32" x2="32" y2="36" stroke-dasharray="2 2"/>
      <text x="4" y="56" font-size="5" fill="currentColor" stroke="none">Before</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">After</text>
    </svg>`
  },
  {
    id: 'mech-inelastic-collision',
    name: 'Inelastic Collision',
    domain: 'physics',
    category: 'momentum',
    tags: ['inelastic', 'collision', 'momentum', 'stick together'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="8" fill="#3B82F6" opacity="0.3"/>
      <circle cx="16" cy="20" r="8"/>
      <path d="M24 20h8"/>
      <path d="M28 16l4 4-4 4"/>
      <circle cx="44" cy="20" r="8"/>
      <ellipse cx="32" cy="48" rx="16" ry="8" fill="#8B5CF6" opacity="0.3"/>
      <ellipse cx="32" cy="48" rx="16" ry="8"/>
      <path d="M48 48h8"/>
      <path d="M52 44l4 4-4 4"/>
      <line x1="32" y1="28" x2="32" y2="36" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // OSCILLATIONS
  // ===========================================================================
  {
    id: 'mech-shm',
    name: 'Simple Harmonic Motion',
    domain: 'physics',
    category: 'oscillations',
    tags: ['SHM', 'harmonic', 'oscillation', 'sine', 'periodic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="3 2"/>
      <path d="M8 32c8-16 16-16 24 0s16 16 24 0"/>
      <circle cx="8" cy="32" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="3"/>
      <circle cx="56" cy="32" r="3"/>
      <line x1="8" y1="16" x2="8" y2="48"/>
      <text x="4" y="24" font-size="5" fill="currentColor" stroke="none">A</text>
      <text x="4" y="44" font-size="5" fill="currentColor" stroke="none">-A</text>
    </svg>`
  },
  {
    id: 'mech-pendulum',
    name: 'Simple Pendulum',
    domain: 'physics',
    category: 'oscillations',
    tags: ['pendulum', 'period', 'oscillation', 'gravity', 'length'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="4" fill="currentColor"/>
      <path d="M32 12l-16 32"/>
      <path d="M32 12l16 32" stroke-dasharray="3 2"/>
      <path d="M32 12v32" stroke-dasharray="3 2"/>
      <circle cx="16" cy="44" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="44" r="6"/>
      <circle cx="48" cy="44" r="6"/>
      <path d="M16 50c8 4 24 4 32 0" stroke-dasharray="2 2"/>
      <text x="36" y="32" font-size="6" fill="currentColor" stroke="none">L</text>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">T = 2pi*sqrt(L/g)</text>
    </svg>`
  },
  {
    id: 'mech-spring-mass',
    name: 'Spring-Mass System',
    domain: 'physics',
    category: 'oscillations',
    tags: ['spring', 'mass', 'oscillator', 'Hooke', 'harmonic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="8" height="16" fill="currentColor"/>
      <path d="M12 32l4 0 2-6 4 12 4-12 4 12 4-12 2 6 4 0"/>
      <rect x="40" y="26" width="12" height="12" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="26" width="12" height="12" rx="2"/>
      <line x1="46" y1="44" x2="46" y2="52"/>
      <path d="M40 48l6 4 6-4"/>
      <line x1="4" y1="44" x2="56" y2="44" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'mech-damped-oscillation',
    name: 'Damped Oscillation',
    domain: 'physics',
    category: 'oscillations',
    tags: ['damped', 'decay', 'exponential', 'friction', 'resistance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="3 2"/>
      <path d="M8 32c4-16 8 0 12 0s4 12 8 0 4-8 8 0 4 4 8 0 4-2 8 0"/>
      <path d="M8 16c16 4 32 8 48 12" stroke-dasharray="2 2"/>
      <path d="M8 48c16-4 32-8 48-12" stroke-dasharray="2 2"/>
      <text x="44" y="24" font-size="6" fill="currentColor" stroke="none">e^-bt</text>
    </svg>`
  },
  {
    id: 'mech-driven-oscillation',
    name: 'Driven Oscillation',
    domain: 'physics',
    category: 'oscillations',
    tags: ['driven', 'forced', 'resonance', 'frequency', 'amplitude'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="8" height="16" fill="currentColor"/>
      <path d="M12 32c2-2 4 0 6 2s4 2 6 0"/>
      <path d="M24 32l4 0 2-4 4 8 4-8 4 8 2-4 4 0"/>
      <rect x="48" y="26" width="10" height="12" rx="2"/>
      <circle cx="8" cy="32" r="12" stroke-dasharray="3 2"/>
      <path d="M4 20l-2-4"/>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">F = F_0 cos(wt)</text>
    </svg>`
  },
  {
    id: 'mech-coupled-oscillators',
    name: 'Coupled Oscillators',
    domain: 'physics',
    category: 'oscillations',
    tags: ['coupled', 'oscillators', 'normal modes', 'transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="4" height="8" fill="currentColor"/>
      <path d="M8 32l2 0 1-3 2 6 2-6 2 6 1-3 2 0"/>
      <circle cx="24" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="32" r="6"/>
      <path d="M30 32l2 0 1-3 2 6 2-6 2 6 1-3 2 0"/>
      <circle cx="48" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="32" r="6"/>
      <path d="M54 32l2 0 1-3 2 6"/>
      <rect x="60" y="28" width="4" height="8" fill="currentColor"/>
      <path d="M24 44v8"/>
      <path d="M48 44v8"/>
    </svg>`
  },
];

export default mechanicsIcons;
