/**
 * Physical Chemistry Icon Library
 * Comprehensive SVG icons for physical chemistry
 *
 * Categories:
 * - Thermodynamics (enthalpy, entropy, Gibbs energy, equilibrium)
 * - Kinetics (rate laws, Arrhenius, mechanisms)
 * - Quantum Chemistry (orbitals, wavefunctions, spectroscopy)
 * - Phase Diagrams (equilibria, transitions, critical points)
 */

import type { IconDefinition } from './index';

export const physicalIcons: IconDefinition[] = [
  // ===========================================================================
  // THERMODYNAMICS
  // ===========================================================================
  {
    id: 'physical-enthalpy',
    name: 'Enthalpy Diagram',
    domain: 'chemistry',
    category: 'thermodynamics',
    tags: ['enthalpy', 'delta H', 'heat', 'exothermic', 'endothermic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <line x1="12" y1="20" x2="28" y2="20" stroke="blue" stroke-width="2"/>
      <line x1="36" y1="44" x2="52" y2="44" stroke="red" stroke-width="2"/>
      <path d="M28 20 L32 32 L36 44" stroke="green" stroke-dasharray="4 2"/>
      <path d="M24 32 L32 32" stroke="currentColor"/>
      <path d="M28 28 L32 32 L28 36" stroke="currentColor"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">H</text>
      <text x="14" y="16" font-size="5" fill="blue" stroke="none">Reactants</text>
      <text x="38" y="52" font-size="5" fill="red" stroke="none">Products</text>
      <text x="36" y="28" font-size="5" fill="green" stroke="none">ΔH</text>
    </svg>`
  },
  {
    id: 'physical-entropy',
    name: 'Entropy Change',
    domain: 'chemistry',
    category: 'thermodynamics',
    tags: ['entropy', 'delta S', 'disorder', 'spontaneity', 'second law'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="2"/>
      <circle cx="14" cy="28" r="2" fill="blue"/>
      <circle cx="22" cy="28" r="2" fill="blue"/>
      <circle cx="14" cy="36" r="2" fill="blue"/>
      <circle cx="22" cy="36" r="2" fill="blue"/>
      <path d="M32 32 L40 32" marker-end="url(#arrow)"/>
      <rect x="44" y="16" width="16" height="32" rx="2"/>
      <circle cx="48" cy="22" r="2" fill="red"/>
      <circle cx="54" cy="26" r="2" fill="red"/>
      <circle cx="50" cy="34" r="2" fill="red"/>
      <circle cx="56" cy="40" r="2" fill="red"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Low S</text>
      <text x="44" y="58" font-size="5" fill="currentColor" stroke="none">High S</text>
      <text x="32" y="24" font-size="5" fill="green" stroke="none">ΔS>0</text>
    </svg>`
  },
  {
    id: 'physical-gibbs-energy',
    name: 'Gibbs Free Energy',
    domain: 'chemistry',
    category: 'thermodynamics',
    tags: ['Gibbs', 'free energy', 'delta G', 'spontaneous', 'equilibrium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="20" rx="2" fill="blue" opacity="0.1"/>
      <text x="12" y="22" font-size="8" fill="currentColor" stroke="none">ΔG = ΔH - TΔS</text>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <text x="8" y="46" font-size="5" fill="green" stroke="none">ΔG < 0: Spontaneous</text>
      <text x="8" y="54" font-size="5" fill="red" stroke="none">ΔG > 0: Non-spontaneous</text>
      <text x="8" y="62" font-size="5" fill="blue" stroke="none">ΔG = 0: Equilibrium</text>
    </svg>`
  },
  {
    id: 'physical-equilibrium',
    name: 'Chemical Equilibrium',
    domain: 'chemistry',
    category: 'thermodynamics',
    tags: ['equilibrium', 'Keq', 'reversible', 'Le Chatelier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="8" fill="blue" opacity="0.3"/>
      <text x="12" y="35" font-size="8" fill="currentColor" stroke="none">A</text>
      <circle cx="48" cy="32" r="8" fill="red" opacity="0.3"/>
      <text x="44" y="35" font-size="8" fill="currentColor" stroke="none">B</text>
      <path d="M26 28 L38 28" stroke="blue" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M38 36 L26 36" stroke="red" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="28" y="24" font-size="5" fill="blue" stroke="none">kf</text>
      <text x="28" y="44" font-size="5" fill="red" stroke="none">kr</text>
      <text x="16" y="54" font-size="6" fill="currentColor" stroke="none">K = kf/kr</text>
    </svg>`
  },
  {
    id: 'physical-hess-law',
    name: "Hess's Law Cycle",
    domain: 'chemistry',
    category: 'thermodynamics',
    tags: ['Hess law', 'state function', 'enthalpy', 'path independent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="blue" opacity="0.3"/>
      <text x="14" y="18" font-size="6" fill="currentColor" stroke="none">A</text>
      <circle cx="48" cy="16" r="6" fill="blue" opacity="0.3"/>
      <text x="46" y="18" font-size="6" fill="currentColor" stroke="none">B</text>
      <circle cx="32" cy="48" r="6" fill="red" opacity="0.3"/>
      <text x="30" y="50" font-size="6" fill="currentColor" stroke="none">C</text>
      <path d="M22 16 L42 16" stroke="blue" marker-end="url(#arrow)"/>
      <path d="M20 22 L28 44" stroke="green" marker-end="url(#arrow)"/>
      <path d="M36 44 L46 22" stroke="green" marker-end="url(#arrow)"/>
      <text x="28" y="12" font-size="5" fill="blue" stroke="none">ΔH1</text>
      <text x="8" y="36" font-size="5" fill="green" stroke="none">ΔH2</text>
      <text x="44" y="36" font-size="5" fill="green" stroke="none">ΔH3</text>
      <text x="12" y="60" font-size="5" fill="currentColor" stroke="none">ΔH1 = ΔH2 + ΔH3</text>
    </svg>`
  },

  // ===========================================================================
  // KINETICS
  // ===========================================================================
  {
    id: 'physical-rate-law',
    name: 'Rate Law',
    domain: 'chemistry',
    category: 'kinetics',
    tags: ['rate law', 'order', 'rate constant', 'concentration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="16" rx="2" fill="blue" opacity="0.1"/>
      <text x="12" y="24" font-size="7" fill="currentColor" stroke="none">Rate = k[A]m[B]n</text>
      <line x1="8" y1="36" x2="56" y2="36"/>
      <text x="8" y="46" font-size="5" fill="currentColor" stroke="none">m + n = overall order</text>
      <text x="8" y="54" font-size="5" fill="currentColor" stroke="none">k = rate constant</text>
      <text x="8" y="62" font-size="5" fill="blue" stroke="none">[A], [B] = concentrations</text>
    </svg>`
  },
  {
    id: 'physical-arrhenius',
    name: 'Arrhenius Equation',
    domain: 'chemistry',
    category: 'kinetics',
    tags: ['Arrhenius', 'activation energy', 'temperature', 'rate constant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="16" rx="2" fill="orange" opacity="0.1"/>
      <text x="8" y="20" font-size="6" fill="currentColor" stroke="none">k = Ae^(-Ea/RT)</text>
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="28"/>
      <path d="M12 52 L20 48 L32 40 L48 32" stroke="blue" stroke-width="2"/>
      <text x="4" y="32" font-size="5" fill="currentColor" stroke="none">ln k</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">1/T</text>
      <text x="32" y="52" font-size="4" fill="red" stroke="none">slope=-Ea/R</text>
    </svg>`
  },
  {
    id: 'physical-activation-energy',
    name: 'Activation Energy Diagram',
    domain: 'chemistry',
    category: 'kinetics',
    tags: ['activation energy', 'Ea', 'transition state', 'barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <line x1="12" y1="40" x2="20" y2="40" stroke="blue" stroke-width="2"/>
      <path d="M20 40 C28 40, 32 16, 40 16 C48 16, 44 28, 52 28" stroke="green" stroke-width="2"/>
      <line x1="52" y1="28" x2="56" y2="28" stroke="red" stroke-width="2"/>
      <circle cx="40" cy="16" r="3" fill="orange"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="48" y="62" font-size="5" fill="currentColor" stroke="none">Rxn</text>
      <path d="M22 40 L22 16" stroke-dasharray="2 2"/>
      <text x="24" y="28" font-size="4" fill="currentColor" stroke="none">Ea</text>
      <text x="36" y="12" font-size="4" fill="orange" stroke="none">TS</text>
    </svg>`
  },
  {
    id: 'physical-reaction-order',
    name: 'Reaction Order Plots',
    domain: 'chemistry',
    category: 'kinetics',
    tags: ['zero order', 'first order', 'second order', 'half-life'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="30" x2="28" y2="30"/>
      <line x1="4" y1="30" x2="4" y2="8"/>
      <line x1="8" y1="12" x2="24" y2="26" stroke="blue"/>
      <text x="8" y="6" font-size="4" fill="currentColor" stroke="none">[A]</text>
      <line x1="36" y1="30" x2="60" y2="30"/>
      <line x1="36" y1="30" x2="36" y2="8"/>
      <path d="M40 12 C44 16, 48 22, 56 26" stroke="green"/>
      <text x="36" y="6" font-size="4" fill="currentColor" stroke="none">ln[A]</text>
      <text x="6" y="38" font-size="4" fill="blue" stroke="none">0th</text>
      <text x="38" y="38" font-size="4" fill="green" stroke="none">1st</text>
      <line x1="4" y1="60" x2="28" y2="60"/>
      <line x1="4" y1="60" x2="4" y2="44"/>
      <line x1="8" y1="48" x2="24" y2="56" stroke="red"/>
      <text x="4" y="42" font-size="4" fill="currentColor" stroke="none">1/[A]</text>
      <text x="6" y="64" font-size="4" fill="red" stroke="none">2nd</text>
    </svg>`
  },
  {
    id: 'physical-catalyst',
    name: 'Catalyst Effect',
    domain: 'chemistry',
    category: 'kinetics',
    tags: ['catalyst', 'activation energy', 'alternative pathway', 'enzyme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <line x1="12" y1="44" x2="18" y2="44" stroke="blue" stroke-width="2"/>
      <path d="M18 44 C24 44, 28 12, 36 12 C44 12, 48 32, 52 32" stroke="blue" stroke-width="2"/>
      <path d="M18 44 C24 44, 28 28, 36 28 C44 28, 48 32, 52 32" stroke="green" stroke-width="2" stroke-dasharray="4 2"/>
      <line x1="52" y1="32" x2="56" y2="32" stroke="red" stroke-width="2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">E</text>
      <text x="28" y="8" font-size="4" fill="blue" stroke="none">No cat</text>
      <text x="28" y="38" font-size="4" fill="green" stroke="none">With cat</text>
    </svg>`
  },

  // ===========================================================================
  // QUANTUM CHEMISTRY
  // ===========================================================================
  {
    id: 'physical-s-orbital',
    name: 's Orbital',
    domain: 'chemistry',
    category: 'quantum',
    tags: ['s orbital', 'spherical', 'wavefunction', 'probability density'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="blue" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="blue" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill="blue"/>
      <text x="28" y="58" font-size="6" fill="currentColor" stroke="none">1s</text>
      <line x1="8" y1="32" x2="4" y2="32"/>
      <line x1="56" y1="32" x2="60" y2="32"/>
      <line x1="32" y1="8" x2="32" y2="4"/>
      <line x1="32" y1="56" x2="32" y2="60"/>
    </svg>`
  },
  {
    id: 'physical-p-orbital',
    name: 'p Orbital',
    domain: 'chemistry',
    category: 'quantum',
    tags: ['p orbital', 'dumbbell', 'node', 'angular momentum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="18" rx="10" ry="14" fill="blue" opacity="0.3"/>
      <ellipse cx="32" cy="18" rx="10" ry="14"/>
      <ellipse cx="32" cy="46" rx="10" ry="14" fill="red" opacity="0.3"/>
      <ellipse cx="32" cy="46" rx="10" ry="14"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <text x="44" y="20" font-size="5" fill="blue" stroke="none">+</text>
      <text x="44" y="48" font-size="5" fill="red" stroke="none">-</text>
      <text x="28" y="62" font-size="6" fill="currentColor" stroke="none">pz</text>
    </svg>`
  },
  {
    id: 'physical-molecular-orbital',
    name: 'Molecular Orbital Diagram',
    domain: 'chemistry',
    category: 'quantum',
    tags: ['molecular orbital', 'bonding', 'antibonding', 'LCAO'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="20" y2="48"/>
      <line x1="44" y1="48" x2="56" y2="48"/>
      <line x1="26" y1="56" x2="38" y2="56" stroke="blue"/>
      <line x1="26" y1="24" x2="38" y2="24" stroke="red"/>
      <path d="M20 48 L26 56" stroke-dasharray="2 2"/>
      <path d="M44 48 L38 56" stroke-dasharray="2 2"/>
      <path d="M20 48 L26 24" stroke-dasharray="2 2"/>
      <path d="M44 48 L38 24" stroke-dasharray="2 2"/>
      <circle cx="28" cy="56" r="2" fill="blue"/>
      <circle cx="36" cy="56" r="2" fill="blue"/>
      <text x="26" y="62" font-size="4" fill="blue" stroke="none">σ</text>
      <text x="26" y="20" font-size="4" fill="red" stroke="none">σ*</text>
      <text x="8" y="44" font-size="5" fill="currentColor" stroke="none">AO</text>
      <text x="44" y="44" font-size="5" fill="currentColor" stroke="none">AO</text>
    </svg>`
  },
  {
    id: 'physical-particle-box',
    name: 'Particle in a Box',
    domain: 'chemistry',
    category: 'quantum',
    tags: ['particle in box', 'quantum', 'energy levels', 'standing wave'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="56" x2="12" y2="8" stroke-width="3"/>
      <line x1="52" y1="56" x2="52" y2="8" stroke-width="3"/>
      <path d="M12 48 Q22 40, 32 48 Q42 56, 52 48" stroke="blue" stroke-width="2"/>
      <path d="M12 36 Q22 28, 32 36 Q42 44, 52 36" stroke="green" stroke-width="2"/>
      <path d="M12 24 Q18 20, 24 24 Q30 28, 36 24 Q42 20, 48 24" stroke="red" stroke-width="2"/>
      <text x="4" y="50" font-size="5" fill="blue" stroke="none">n=1</text>
      <text x="4" y="38" font-size="5" fill="green" stroke="none">n=2</text>
      <text x="4" y="26" font-size="5" fill="red" stroke="none">n=3</text>
      <text x="28" y="62" font-size="5" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'physical-hybridization',
    name: 'Orbital Hybridization',
    domain: 'chemistry',
    category: 'quantum',
    tags: ['hybridization', 'sp3', 'sp2', 'sp', 'VSEPR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6" fill="currentColor"/>
      <path d="M32 26 L32 8" stroke="blue" stroke-width="2"/>
      <path d="M38 32 L56 32" stroke="blue" stroke-width="2"/>
      <path d="M28 36 L16 52" stroke="blue" stroke-width="2"/>
      <path d="M36 36 L48 52" stroke="blue" stroke-width="2"/>
      <ellipse cx="32" cy="16" rx="4" ry="8" fill="blue" opacity="0.3"/>
      <ellipse cx="48" cy="32" rx="8" ry="4" fill="blue" opacity="0.3"/>
      <text x="20" y="62" font-size="6" fill="currentColor" stroke="none">sp3</text>
      <text x="24" y="8" font-size="4" fill="currentColor" stroke="none">109.5°</text>
    </svg>`
  },

  // ===========================================================================
  // PHASE DIAGRAMS
  // ===========================================================================
  {
    id: 'physical-phase-diagram',
    name: 'Phase Diagram',
    domain: 'chemistry',
    category: 'phase',
    tags: ['phase diagram', 'triple point', 'critical point', 'equilibrium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M12 52 L24 32" stroke="blue" stroke-width="2"/>
      <path d="M24 32 L48 16" stroke="green" stroke-width="2"/>
      <path d="M24 32 L52 52" stroke="red" stroke-width="2"/>
      <circle cx="24" cy="32" r="3" fill="purple"/>
      <circle cx="48" cy="16" r="3" fill="orange"/>
      <text x="8" y="44" font-size="5" fill="currentColor" stroke="none">Solid</text>
      <text x="36" y="36" font-size="5" fill="currentColor" stroke="none">Liquid</text>
      <text x="36" y="52" font-size="5" fill="currentColor" stroke="none">Gas</text>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">P</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="12" y="28" font-size="4" fill="purple" stroke="none">TP</text>
      <text x="50" y="12" font-size="4" fill="orange" stroke="none">CP</text>
    </svg>`
  },
  {
    id: 'physical-vapor-pressure',
    name: 'Vapor Pressure Curve',
    domain: 'chemistry',
    category: 'phase',
    tags: ['vapor pressure', 'Clausius-Clapeyron', 'boiling point', 'volatility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M12 52 C20 48, 32 36, 52 12" stroke="blue" stroke-width="2"/>
      <line x1="8" y1="28" x2="40" y2="28" stroke-dasharray="4 2"/>
      <line x1="40" y1="28" x2="40" y2="56" stroke-dasharray="4 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">P</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="4" y="26" font-size="4" fill="currentColor" stroke="none">1 atm</text>
      <text x="36" y="62" font-size="4" fill="currentColor" stroke="none">Tb</text>
    </svg>`
  },
  {
    id: 'physical-cooling-curve',
    name: 'Cooling Curve',
    domain: 'chemistry',
    category: 'phase',
    tags: ['cooling curve', 'freezing', 'phase transition', 'heat of fusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M12 12 L20 24 L32 24 L40 40 L52 52" stroke="blue" stroke-width="2"/>
      <line x1="20" y1="24" x2="8" y2="24" stroke-dasharray="2 2"/>
      <line x1="40" y1="40" x2="8" y2="40" stroke-dasharray="2 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">t</text>
      <text x="4" y="22" font-size="4" fill="currentColor" stroke="none">Tb</text>
      <text x="4" y="38" font-size="4" fill="currentColor" stroke="none">Tf</text>
      <text x="24" y="20" font-size="4" fill="red" stroke="none">Liquid</text>
      <text x="42" y="48" font-size="4" fill="blue" stroke="none">Solid</text>
    </svg>`
  },
  {
    id: 'physical-raoults-law',
    name: "Raoult's Law",
    domain: 'chemistry',
    category: 'phase',
    tags: ['Raoult law', 'ideal solution', 'vapor pressure', 'mole fraction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <line x1="8" y1="20" x2="56" y2="44" stroke="blue" stroke-width="2"/>
      <line x1="8" y1="44" x2="56" y2="20" stroke="red" stroke-width="2"/>
      <line x1="8" y1="20" x2="56" y2="20" stroke-dasharray="4 2"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-dasharray="4 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">P</text>
      <text x="28" y="62" font-size="5" fill="currentColor" stroke="none">XB</text>
      <text x="46" y="42" font-size="4" fill="blue" stroke="none">PA</text>
      <text x="46" y="24" font-size="4" fill="red" stroke="none">PB</text>
      <text x="4" y="18" font-size="4" fill="blue" stroke="none">PA°</text>
      <text x="4" y="42" font-size="4" fill="red" stroke="none">PB°</text>
    </svg>`
  },
  {
    id: 'physical-colligative',
    name: 'Colligative Properties',
    domain: 'chemistry',
    category: 'phase',
    tags: ['colligative', 'boiling point elevation', 'freezing point depression', 'osmotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M12 44 C24 40, 40 28, 52 16" stroke="blue" stroke-width="2"/>
      <path d="M12 48 C24 44, 40 32, 52 20" stroke="red" stroke-width="2" stroke-dasharray="4 2"/>
      <line x1="8" y1="28" x2="48" y2="28" stroke-dasharray="2 2"/>
      <text x="4" y="12" font-size="5" fill="currentColor" stroke="none">P</text>
      <text x="52" y="62" font-size="5" fill="currentColor" stroke="none">T</text>
      <text x="48" y="12" font-size="4" fill="blue" stroke="none">Pure</text>
      <text x="48" y="24" font-size="4" fill="red" stroke="none">Solution</text>
      <path d="M32 28 L32 32" stroke="green"/>
      <text x="34" y="34" font-size="4" fill="green" stroke="none">ΔTb</text>
    </svg>`
  },
];

export default physicalIcons;
