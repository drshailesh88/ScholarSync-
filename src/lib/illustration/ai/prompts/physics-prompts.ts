/**
 * physics-prompts.ts
 * Physics-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for physics including:
 * - Classical mechanics (forces, motion, energy)
 * - Electromagnetism (circuits, fields, waves)
 * - Thermodynamics (heat, entropy, cycles)
 * - Modern physics (quantum, relativity, nuclear)
 * - Waves and optics
 * - Solid state physics
 * - Particle physics
 * - Astrophysics and cosmology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PHYSICS DOMAIN PROMPT
// =============================================================================

/**
 * Base physics domain prompt for physics diagrams
 */
export const PHYSICS_DOMAIN_PROMPT = `
Physics diagram requirements:
- Use SI units consistently (meters, kilograms, seconds, amperes, kelvins, moles, candelas)
- Follow standard physics notation (vectors in bold or with arrows, scalars in italics)
- Include proper coordinate systems (Cartesian, polar, spherical as appropriate)
- Use standard symbols (F for force, v for velocity, E for energy, etc.)
- Label all vectors with magnitude and direction where applicable
- Include reference frames when relevant (inertial vs. non-inertial)
- Use color coding: Forces (red), Velocities (blue), Accelerations (green), Energy (yellow)
- Show units in all numerical values
- Include free body diagrams for mechanics problems
- Reference fundamental equations when applicable`;

// =============================================================================
// PHYSICS-SPECIFIC PROMPTS
// =============================================================================

export const PHYSICS_PROMPTS = {
  // Classical Mechanics
  forceDiagram: `
Force Diagram requirements:
- Draw the object as a point mass or extended body
- Show all forces acting ON the object (not by the object)
- Use arrows with lengths proportional to force magnitudes
- Label each force (weight W=mg, normal N, friction f, tension T, etc.)
- Include coordinate axes (typically x horizontal, y vertical)
- Show force components when forces are at angles
- Include net force vector if requested
- State whether system is in equilibrium or accelerating`,

  projectileMotion: `
Projectile Motion requirements:
- Show the complete trajectory as a parabola
- Mark initial position, velocity vector, and launch angle
- Include horizontal and vertical velocity components
- Show key points: maximum height, landing point
- Include time markers at regular intervals
- Display relevant equations: x(t), y(t), range, max height
- Show gravitational acceleration vector
- Include air resistance consideration if specified`,

  energyDiagram: `
Energy Diagram requirements:
- Include energy bar charts or graphs
- Show kinetic energy (KE = 1/2 mv^2)
- Show potential energy (gravitational, elastic, etc.)
- Display total mechanical energy as conserved quantity
- Include work done by non-conservative forces if applicable
- Use consistent color coding (KE: red, PE: blue, Total: purple)
- Label energy values at key positions
- Include energy transformation arrows`,

  collisionAnalysis: `
Collision Analysis requirements:
- Show before and after states clearly
- Display momentum vectors (p = mv)
- Include velocity vectors with magnitudes
- Distinguish elastic vs. inelastic collisions
- Show conservation equations being applied
- Include coefficient of restitution for inelastic cases
- Display center of mass if relevant
- Show energy loss calculation for inelastic collisions`,

  simpleHarmonicMotion: `
Simple Harmonic Motion requirements:
- Show position vs. time sinusoidal graph
- Include equilibrium position clearly marked
- Display amplitude, period, and frequency
- Show velocity and acceleration graphs if requested
- Include phase relationships between x, v, a
- Display spring constant k or pendulum length L
- Show restoring force direction
- Include energy oscillation diagram`,

  rotationalDynamics: `
Rotational Dynamics requirements:
- Show axis of rotation clearly
- Display angular velocity (omega) and acceleration (alpha)
- Include moment of inertia calculation
- Show torques with lever arms
- Use right-hand rule convention
- Display angular momentum (L = Iw)
- Include rotational kinetic energy (KE = 1/2 Iw^2)
- Show parallel axis theorem if applicable`,

  // Electromagnetism
  circuitAnalysis: `
Circuit Analysis requirements:
- Use standard circuit symbols (IEEE or IEC)
- Label all components with values and units
- Show current direction with arrows
- Mark voltage drops across components
- Include Kirchhoff's laws application points
- Show node voltages if using nodal analysis
- Display power dissipation calculations
- Include equivalent resistance/capacitance simplifications`,

  electricFieldDiagram: `
Electric Field Diagram requirements:
- Show field lines originating from positive charges
- Field lines terminate at negative charges
- Line density indicates field strength
- Include equipotential lines (perpendicular to field lines)
- Display electric field vectors at key points
- Show Gaussian surfaces for symmetric distributions
- Include force on test charge if present
- Label field magnitude E = kq/r^2 or sigma/epsilon_0`,

  magneticFieldDiagram: `
Magnetic Field Diagram requirements:
- Use right-hand rule for current-generated fields
- Show field lines as closed loops (no monopoles)
- Display B-field vectors at key points
- Include magnetic flux through surfaces
- Show Lorentz force F = qv x B on moving charges
- Display Amperian loops for field calculations
- Include induced EMF for changing flux
- Show magnetic dipole moment if relevant`,

  emWaveAnalysis: `
Electromagnetic Wave Analysis requirements:
- Show E and B fields perpendicular to each other
- Display propagation direction (k vector)
- Include wavelength and frequency labels
- Show relationship c = f*lambda
- Display Poynting vector for energy flow
- Include polarization state (linear, circular)
- Show standing wave patterns if applicable
- Include dispersion relation if in medium`,

  // Thermodynamics
  thermodynamicCycle: `
Thermodynamic Cycle requirements:
- Display P-V diagram with labeled states
- Show isothermal processes (hyperbolas)
- Show isobaric processes (horizontal lines)
- Show isochoric processes (vertical lines)
- Show adiabatic processes (steeper curves)
- Calculate work as area under/enclosed by curve
- Include heat flow direction for each process
- Display efficiency calculation for engines`,

  heatTransfer: `
Heat Transfer Diagram requirements:
- Distinguish conduction, convection, radiation
- Show temperature gradient for conduction
- Display thermal resistance analogy if applicable
- Include convection currents for fluid heat transfer
- Show Stefan-Boltzmann law for radiation
- Include thermal boundary layers
- Display heat flux vectors
- Show equilibrium temperature calculations`,

  entropyDiagram: `
Entropy Diagram requirements:
- Show T-S diagram for thermodynamic processes
- Display entropy change calculations
- Include reversible vs. irreversible process comparison
- Show heat engine efficiency from Carnot cycle
- Display entropy of mixing for ideal gases
- Include statistical interpretation (S = k ln W)
- Show entropy increase for irreversible processes
- Display free energy relationships`,

  // Modern Physics
  quantumEnergyLevels: `
Quantum Energy Level Diagram requirements:
- Show discrete energy levels (horizontal lines)
- Label principal quantum numbers (n = 1, 2, 3...)
- Display allowed transitions with arrows
- Include photon energies (E = hf) for transitions
- Show selection rules application
- Display wave function shapes if requested
- Include fine structure splitting if relevant
- Show Zeeman/Stark effect splitting if applicable`,

  relativityDiagram: `
Relativity Diagram requirements:
- Show spacetime diagram with ct and x axes
- Display worldlines for objects
- Include light cones (45 degree lines)
- Show Lorentz transformation effects
- Display proper time vs. coordinate time
- Include length contraction visualization
- Show simultaneity breakdown
- Display invariant interval calculations`,

  nuclearDecay: `
Nuclear Decay Diagram requirements:
- Show parent and daughter nuclei
- Display decay type (alpha, beta+, beta-, gamma)
- Include energy released (Q value)
- Show half-life and decay constant
- Display decay chain if multiple decays
- Include binding energy per nucleon
- Show conservation of mass-energy
- Display activity calculations`,

  // Waves and Optics
  waveInterference: `
Wave Interference requirements:
- Show two or more wave sources
- Display constructive and destructive interference regions
- Include path length difference calculations
- Show interference pattern (maxima/minima positions)
- Display intensity distribution
- Include phase relationships
- Show standing wave patterns if applicable
- Display beat frequency for slightly different frequencies`,

  opticsRayDiagram: `
Optics Ray Diagram requirements:
- Show principal axis clearly
- Display focal points (F, F')
- Include object with height indication
- Draw at least two principal rays
- Show image formation (real/virtual, inverted/upright)
- Include magnification calculation
- Display thin lens/mirror equation application
- Show spherical aberration if relevant`,

  // Particle Physics
  particleInteraction: `
Particle Interaction requirements:
- Show Feynman diagram style representation
- Display incoming and outgoing particles
- Include mediator particles (photon, W/Z, gluon)
- Show vertex interactions
- Include conservation laws (charge, lepton number, baryon number)
- Display momentum and energy labels
- Show quark content for hadrons
- Include cross-section information if relevant`,

  // Astrophysics
  stellarEvolution: `
Stellar Evolution requirements:
- Show Hertzsprung-Russell diagram placement
- Display evolutionary track on H-R diagram
- Include main sequence lifetime calculation
- Show fusion processes (pp chain, CNO, triple-alpha)
- Display end states (white dwarf, neutron star, black hole)
- Include mass-luminosity relationship
- Show supernova mechanism if applicable
- Display nucleosynthesis products`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const PHYSICS_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a free body diagram for a block on an inclined plane',
    output: `Here's a free body diagram for a block on an inclined plane:

**Setup:**
- Block of mass m on plane inclined at angle theta
- Coordinate system: x parallel to plane (+ downhill), y perpendicular to plane (+ away from surface)

**Forces Acting on Block:**
1. **Weight (W)**: Magnitude = mg, Direction = straight down
   - Component parallel to plane: W_x = mg sin(theta)
   - Component perpendicular to plane: W_y = mg cos(theta)

2. **Normal Force (N)**: Magnitude = mg cos(theta), Direction = perpendicular to surface (+ y direction)

3. **Friction Force (f)**: Magnitude = mu_s * N (static) or mu_k * N (kinetic)
   - Direction: opposes motion (up the plane if block tends to slide down)

**Equilibrium Conditions:**
- Sum F_x = 0: mg sin(theta) - f = 0 (for static case)
- Sum F_y = 0: N - mg cos(theta) = 0

**Critical Angle:**
Block starts sliding when: tan(theta_c) = mu_s`,
  },
  {
    prompt: 'Explain the photoelectric effect with an energy diagram',
    output: `Here's an energy diagram for the photoelectric effect:

**Energy Level Representation:**
- Metal surface with electrons at various energy levels
- Fermi level (highest occupied state at T=0)
- Work function (phi): energy required to remove electron from surface

**Incident Photon:**
- Energy: E_photon = hf (h = Planck's constant, f = frequency)
- Threshold frequency: f_0 = phi/h

**Three Cases:**
1. **hf < phi**: No electrons ejected (photon energy insufficient)
2. **hf = phi**: Electrons barely escape (zero kinetic energy)
3. **hf > phi**: Electrons escape with kinetic energy

**Einstein's Photoelectric Equation:**
KE_max = hf - phi

**Key Observations:**
- KE_max depends on frequency, NOT intensity
- Intensity affects number of electrons, not their energy
- No time delay (quantum nature of light)
- Stopping potential: V_s = (hf - phi) / e`,
  },
  {
    prompt: 'Draw a PV diagram for a Carnot cycle',
    output: `Here's a PV diagram for a Carnot cycle:

**Cycle States:**
- State 1: (V1, P1) - Start of isothermal expansion
- State 2: (V2, P2) - End of isothermal expansion, start of adiabatic expansion
- State 3: (V3, P3) - End of adiabatic expansion, start of isothermal compression
- State 4: (V4, P4) - End of isothermal compression, start of adiabatic compression

**Four Processes:**

1. **1 -> 2: Isothermal Expansion at T_H**
   - Heat absorbed: Q_H = nRT_H ln(V2/V1)
   - Work done by gas: W_12 = Q_H (positive)

2. **2 -> 3: Adiabatic Expansion**
   - No heat exchange: Q = 0
   - Temperature drops: T_H -> T_C
   - Work done by gas: W_23 = nC_v(T_H - T_C) (positive)

3. **3 -> 4: Isothermal Compression at T_C**
   - Heat released: Q_C = nRT_C ln(V3/V4)
   - Work done on gas: W_34 (negative)

4. **4 -> 1: Adiabatic Compression**
   - No heat exchange: Q = 0
   - Temperature rises: T_C -> T_H
   - Work done on gas: W_41 (negative)

**Carnot Efficiency:**
eta = 1 - T_C/T_H = W_net / Q_H`,
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all physics prompts as an array
 */
export function getAllPhysicsPrompts(): { name: string; prompt: string }[] {
  return Object.entries(PHYSICS_PROMPTS).map(([name, prompt]) => ({
    name,
    prompt: prompt.trim(),
  }));
}

/**
 * Get a specific physics prompt by name
 */
export function getPhysicsPrompt(name: keyof typeof PHYSICS_PROMPTS): string {
  return PHYSICS_PROMPTS[name]?.trim() || '';
}

/**
 * Get physics prompt with domain context
 */
export function getFullPhysicsPrompt(name: keyof typeof PHYSICS_PROMPTS): string {
  const specificPrompt = getPhysicsPrompt(name);
  if (!specificPrompt) return PHYSICS_DOMAIN_PROMPT.trim();
  return `${PHYSICS_DOMAIN_PROMPT.trim()}\n\n${specificPrompt}`;
}

/**
 * Get random few-shot examples for physics
 */
export function getPhysicsFewShotExamples(count: number = 2): FewShotExample[] {
  const shuffled = [...PHYSICS_FEW_SHOT_EXAMPLES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  PHYSICS_DOMAIN_PROMPT,
  PHYSICS_PROMPTS,
  PHYSICS_FEW_SHOT_EXAMPLES,
  getAllPhysicsPrompts,
  getPhysicsPrompt,
  getFullPhysicsPrompt,
  getPhysicsFewShotExamples,
};
