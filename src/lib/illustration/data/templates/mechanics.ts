/**
 * mechanics.ts
 * Classical Mechanics diagram templates for FINNISH
 *
 * Contains comprehensive templates for Newtonian mechanics including:
 * - Free body diagrams
 * - Motion analysis
 * - Energy diagrams
 * - Oscillation systems
 * - Rotational dynamics
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// FREE BODY DIAGRAM TEMPLATES
// =============================================================================

/**
 * Free Body Diagram template
 */
export const freeBodyDiagram: DiagramTemplate = {
  id: 'mech-free-body',
  name: 'Free Body Diagram',
  description: 'Force analysis with all forces acting on an object',
  domain: 'physics',
  promptTemplate: `Create a free body diagram:
- Object description: {{objectDescription}}
- Weight: {{weight}}
- Normal force: {{normalForce}}
- Applied forces: {{appliedForces}}
- Friction: {{friction}}
- Tension: {{tension}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'objectDescription',
    'weight',
    'normalForce',
    'appliedForces',
    'friction',
    'tension',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph FBD["Free Body Diagram"]
        O["Object"]
    end
    subgraph Forces["Forces"]
        N["N: Normal (up)"]
        W["W=mg: Weight (down)"]
        F["F: Applied"]
        f["f: Friction"]
    end
    N --> O
    W --> O
    F --> O
    f --> O`,
};

/**
 * Inclined Plane template
 */
export const inclinedPlane: DiagramTemplate = {
  id: 'mech-inclined-plane',
  name: 'Inclined Plane Analysis',
  description: 'Force decomposition on an inclined surface',
  domain: 'physics',
  promptTemplate: `Create an inclined plane diagram:
- Incline angle: {{inclineAngle}}
- Object mass: {{objectMass}}
- Friction coefficient: {{frictionCoefficient}}
- Normal force: {{normalForce}}
- Component along plane: {{componentAlong}}
- Acceleration: {{acceleration}}
{{#additionalNotes}}Additional forces: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inclineAngle',
    'objectMass',
    'frictionCoefficient',
    'normalForce',
    'componentAlong',
    'acceleration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Plane["Inclined Plane θ"]
        O["Mass m"]
    end
    subgraph Components["Force Components"]
        N["N = mg cosθ"]
        P["mg sinθ (parallel)"]
        F["f = μN (friction)"]
    end
    O --> N
    O --> P
    O --> F`,
};

/**
 * Pulley System template
 */
export const pulleySystem: DiagramTemplate = {
  id: 'mech-pulley-system',
  name: 'Pulley System',
  description: 'Atwood machine and pulley mechanics',
  domain: 'physics',
  promptTemplate: `Create a pulley system diagram:
- Pulley type: {{pulleyType}}
- Mass 1: {{mass1}}
- Mass 2: {{mass2}}
- String tension: {{stringTension}}
- Acceleration: {{acceleration}}
- Mechanical advantage: {{mechanicalAdvantage}}
{{#additionalNotes}}System notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pulleyType',
    'mass1',
    'mass2',
    'stringTension',
    'acceleration',
    'mechanicalAdvantage',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Pulley["Frictionless Pulley"]
        P["Massless, frictionless"]
    end
    subgraph M1["Mass m₁"]
        L["Left side"]
    end
    subgraph M2["Mass m₂"]
        R["Right side"]
    end
    M1 -->|"T"| Pulley
    Pulley -->|"T"| M2
    M1 -->|"m₁g"| L
    M2 -->|"m₂g"| R`,
};

// =============================================================================
// MOTION ANALYSIS TEMPLATES
// =============================================================================

/**
 * Projectile Motion template
 */
export const projectileMotion: DiagramTemplate = {
  id: 'mech-projectile-motion',
  name: 'Projectile Motion',
  description: 'Two-dimensional motion under gravity',
  domain: 'physics',
  promptTemplate: `Create a projectile motion diagram:
- Initial velocity: {{initialVelocity}}
- Launch angle: {{launchAngle}}
- Maximum height: {{maximumHeight}}
- Range: {{range}}
- Time of flight: {{timeOfFlight}}
- Trajectory equation: {{trajectoryEquation}}
{{#additionalNotes}}Projectile notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialVelocity',
    'launchAngle',
    'maximumHeight',
    'range',
    'timeOfFlight',
    'trajectoryEquation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Launch["Launch"]
        V0["v₀ at angle θ"]
    end
    subgraph Peak["Maximum Height"]
        H["H = v₀²sin²θ/(2g)"]
    end
    subgraph Land["Landing"]
        R["R = v₀²sin2θ/g"]
    end
    Launch --> Peak --> Land`,
};

/**
 * Circular Motion template
 */
export const circularMotion: DiagramTemplate = {
  id: 'mech-circular-motion',
  name: 'Uniform Circular Motion',
  description: 'Centripetal acceleration and circular dynamics',
  domain: 'physics',
  promptTemplate: `Create a circular motion diagram:
- Radius: {{radius}}
- Angular velocity: {{angularVelocity}}
- Linear speed: {{linearSpeed}}
- Centripetal acceleration: {{centripetalAcceleration}}
- Centripetal force: {{centripetalForce}}
- Period: {{period}}
{{#additionalNotes}}Rotation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'radius',
    'angularVelocity',
    'linearSpeed',
    'centripetalAcceleration',
    'centripetalForce',
    'period',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Circle["Circular Path r"]
        O["Center"]
        M["Mass m"]
    end
    subgraph Vectors["At any point"]
        V["v tangent"]
        A["a toward center"]
    end
    subgraph Equations["Relations"]
        E["a = v²/r = ω²r"]
        F["F = ma = mv²/r"]
    end
    Circle --> Vectors --> Equations`,
};

/**
 * Relative Motion template
 */
export const relativeMotion: DiagramTemplate = {
  id: 'mech-relative-motion',
  name: 'Relative Motion',
  description: 'Motion in different reference frames',
  domain: 'physics',
  promptTemplate: `Create a relative motion diagram:
- Reference frame A: {{referenceFrameA}}
- Reference frame B: {{referenceFrameB}}
- Velocity of B relative to A: {{velocityBA}}
- Object velocity in A: {{velocityInA}}
- Object velocity in B: {{velocityInB}}
- Vector addition: {{vectorAddition}}
{{#additionalNotes}}Frame notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'referenceFrameA',
    'referenceFrameB',
    'velocityBA',
    'velocityInA',
    'velocityInB',
    'vectorAddition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph FrameA["Frame A (ground)"]
        VA["v_obj,A"]
    end
    subgraph FrameB["Frame B (moving)"]
        VB["v_obj,B"]
    end
    subgraph Relation["Velocity Addition"]
        R["v_obj,A = v_obj,B + v_B,A"]
    end
    FrameA --> Relation
    FrameB --> Relation`,
};

// =============================================================================
// ENERGY TEMPLATES
// =============================================================================

/**
 * Energy Conservation template
 */
export const energyConservation: DiagramTemplate = {
  id: 'mech-energy-conservation',
  name: 'Energy Conservation',
  description: 'Mechanical energy conservation in systems',
  domain: 'physics',
  promptTemplate: `Create an energy conservation diagram:
- Initial kinetic energy: {{initialKE}}
- Initial potential energy: {{initialPE}}
- Final kinetic energy: {{finalKE}}
- Final potential energy: {{finalPE}}
- Work by non-conservative forces: {{nonConservativeWork}}
- Energy equation: {{energyEquation}}
{{#additionalNotes}}Conservation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialKE',
    'initialPE',
    'finalKE',
    'finalPE',
    'nonConservativeWork',
    'energyEquation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Initial["Initial State"]
        KE1["KE₁ = ½mv₁²"]
        PE1["PE₁ = mgh₁"]
    end
    subgraph Final["Final State"]
        KE2["KE₂ = ½mv₂²"]
        PE2["PE₂ = mgh₂"]
    end
    subgraph Conserve["Conservation"]
        E["E₁ = E₂"]
    end
    Initial --> Conserve --> Final`,
};

/**
 * Work-Energy Theorem template
 */
export const workEnergyTheorem: DiagramTemplate = {
  id: 'mech-work-energy',
  name: 'Work-Energy Theorem',
  description: 'Net work equals change in kinetic energy',
  domain: 'physics',
  promptTemplate: `Create a work-energy theorem diagram:
- Applied force: {{appliedForce}}
- Displacement: {{displacement}}
- Work done: {{workDone}}
- Initial velocity: {{initialVelocity}}
- Final velocity: {{finalVelocity}}
- Change in KE: {{changeKE}}
{{#additionalNotes}}Work notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'appliedForce',
    'displacement',
    'workDone',
    'initialVelocity',
    'finalVelocity',
    'changeKE',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Work["Net Work"]
        W["W = F·d = ∫F·dr"]
    end
    subgraph Energy["Change in KE"]
        DKE["ΔKE = ½m(v₂²-v₁²)"]
    end
    subgraph Theorem["Work-Energy"]
        T["W_net = ΔKE"]
    end
    Work --> Theorem
    Energy --> Theorem`,
};

/**
 * Potential Energy Curve template
 */
export const potentialEnergyCurve: DiagramTemplate = {
  id: 'mech-potential-energy-curve',
  name: 'Potential Energy Curve',
  description: 'Analysis of motion from potential energy function',
  domain: 'physics',
  promptTemplate: `Create a potential energy curve diagram:
- Potential function: {{potentialFunction}}
- Equilibrium points: {{equilibriumPoints}}
- Stable/unstable: {{stabilityAnalysis}}
- Turning points: {{turningPoints}}
- Total energy line: {{totalEnergyLine}}
- Allowed region: {{allowedRegion}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'potentialFunction',
    'equilibriumPoints',
    'stabilityAnalysis',
    'turningPoints',
    'totalEnergyLine',
    'allowedRegion',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Curve["U(x) Curve"]
        MIN["Minimum: Stable eq."]
        MAX["Maximum: Unstable eq."]
    end
    subgraph Energy["E = KE + U"]
        E["Total energy line"]
    end
    subgraph Motion["Allowed Motion"]
        TP["Turning points: KE=0"]
    end
    Curve --> Motion
    Energy --> Motion`,
};

// =============================================================================
// MOMENTUM AND COLLISION TEMPLATES
// =============================================================================

/**
 * Momentum Conservation template
 */
export const momentumConservation: DiagramTemplate = {
  id: 'mech-momentum-conservation',
  name: 'Momentum Conservation',
  description: 'Linear momentum conservation in collisions',
  domain: 'physics',
  promptTemplate: `Create a momentum conservation diagram:
- Object 1 initial: {{object1Initial}}
- Object 2 initial: {{object2Initial}}
- Object 1 final: {{object1Final}}
- Object 2 final: {{object2Final}}
- Total momentum: {{totalMomentum}}
- Impulse analysis: {{impulseAnalysis}}
{{#additionalNotes}}Collision notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'object1Initial',
    'object2Initial',
    'object1Final',
    'object2Final',
    'totalMomentum',
    'impulseAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Before["Before Collision"]
        P1i["p₁ᵢ = m₁v₁ᵢ"]
        P2i["p₂ᵢ = m₂v₂ᵢ"]
    end
    subgraph After["After Collision"]
        P1f["p₁f = m₁v₁f"]
        P2f["p₂f = m₂v₂f"]
    end
    subgraph Conserve["p_total = const"]
        C["p₁ᵢ + p₂ᵢ = p₁f + p₂f"]
    end
    Before --> Conserve --> After`,
};

/**
 * Collision Types template
 */
export const collisionTypes: DiagramTemplate = {
  id: 'mech-collision-types',
  name: 'Collision Types',
  description: 'Elastic and inelastic collision analysis',
  domain: 'physics',
  promptTemplate: `Create a collision types diagram:
- Collision type: {{collisionType}}
- Momentum conservation: {{momentumConservation}}
- Energy conservation: {{energyConservation}}
- Coefficient of restitution: {{restitution}}
- Final velocities: {{finalVelocities}}
- Energy loss: {{energyLoss}}
{{#additionalNotes}}Collision analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'collisionType',
    'momentumConservation',
    'energyConservation',
    'restitution',
    'finalVelocities',
    'energyLoss',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Elastic["Elastic Collision"]
        E["KE conserved"]
        E1["e = 1"]
    end
    subgraph Inelastic["Inelastic"]
        I["KE not conserved"]
        I1["e < 1"]
    end
    subgraph Perfect["Perfectly Inelastic"]
        P["Objects stick"]
        P1["e = 0"]
    end`,
};

// =============================================================================
// OSCILLATION TEMPLATES
// =============================================================================

/**
 * Simple Harmonic Motion template
 */
export const simpleHarmonicMotion: DiagramTemplate = {
  id: 'mech-shm',
  name: 'Simple Harmonic Motion',
  description: 'SHM analysis with position, velocity, acceleration',
  domain: 'physics',
  promptTemplate: `Create an SHM diagram:
- Amplitude: {{amplitude}}
- Angular frequency: {{angularFrequency}}
- Period: {{period}}
- Position equation: {{positionEquation}}
- Velocity equation: {{velocityEquation}}
- Acceleration equation: {{accelerationEquation}}
{{#additionalNotes}}Oscillation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'amplitude',
    'angularFrequency',
    'period',
    'positionEquation',
    'velocityEquation',
    'accelerationEquation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Position["x(t)"]
        X["A cos(ωt + φ)"]
    end
    subgraph Velocity["v(t)"]
        V["-Aω sin(ωt + φ)"]
    end
    subgraph Accel["a(t)"]
        A["-Aω² cos(ωt + φ)"]
    end
    Position -->|"d/dt"| Velocity -->|"d/dt"| Accel`,
};

/**
 * Spring-Mass System template
 */
export const springMassSystem: DiagramTemplate = {
  id: 'mech-spring-mass',
  name: 'Spring-Mass System',
  description: 'Mass on spring oscillator analysis',
  domain: 'physics',
  promptTemplate: `Create a spring-mass system diagram:
- Spring constant: {{springConstant}}
- Mass: {{mass}}
- Natural frequency: {{naturalFrequency}}
- Equilibrium position: {{equilibriumPosition}}
- Energy exchange: {{energyExchange}}
- Damping: {{damping}}
{{#additionalNotes}}System notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'springConstant',
    'mass',
    'naturalFrequency',
    'equilibriumPosition',
    'energyExchange',
    'damping',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph System["Spring-Mass"]
        S["Spring k"]
        M["Mass m"]
    end
    subgraph Properties["Properties"]
        W["ω = √(k/m)"]
        T["T = 2π√(m/k)"]
    end
    subgraph Energy["Energy"]
        PE["PE = ½kx²"]
        KE["KE = ½mv²"]
    end
    System --> Properties
    System --> Energy`,
};

/**
 * Pendulum Motion template
 */
export const pendulumMotion: DiagramTemplate = {
  id: 'mech-pendulum',
  name: 'Simple Pendulum',
  description: 'Pendulum dynamics for small oscillations',
  domain: 'physics',
  promptTemplate: `Create a pendulum motion diagram:
- Length: {{length}}
- Mass: {{mass}}
- Period: {{period}}
- Small angle approximation: {{smallAngle}}
- Restoring force: {{restoringForce}}
- Energy analysis: {{energyAnalysis}}
{{#additionalNotes}}Pendulum notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'length',
    'mass',
    'period',
    'smallAngle',
    'restoringForce',
    'energyAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Pendulum["Simple Pendulum"]
        L["Length L"]
        M["Mass m"]
        TH["Angle θ"]
    end
    subgraph Period["For small θ"]
        T["T = 2π√(L/g)"]
    end
    subgraph Motion["SHM"]
        SH["θ(t) = θ₀cos(ωt)"]
    end
    Pendulum --> Period --> Motion`,
};

// =============================================================================
// ROTATIONAL DYNAMICS TEMPLATES
// =============================================================================

/**
 * Rotational Kinematics template
 */
export const rotationalKinematics: DiagramTemplate = {
  id: 'mech-rotational-kinematics',
  name: 'Rotational Kinematics',
  description: 'Angular position, velocity, and acceleration',
  domain: 'physics',
  promptTemplate: `Create a rotational kinematics diagram:
- Angular position: {{angularPosition}}
- Angular velocity: {{angularVelocity}}
- Angular acceleration: {{angularAcceleration}}
- Linear-angular relations: {{linearAngularRelations}}
- Kinematic equations: {{kinematicEquations}}
- Rotation direction: {{rotationDirection}}
{{#additionalNotes}}Rotation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'angularPosition',
    'angularVelocity',
    'angularAcceleration',
    'linearAngularRelations',
    'kinematicEquations',
    'rotationDirection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Angular["Angular Quantities"]
        TH["θ: position"]
        W["ω = dθ/dt: velocity"]
        AL["α = dω/dt: acceleration"]
    end
    subgraph Linear["Linear at r"]
        S["s = rθ"]
        V["v = rω"]
        A["a = rα"]
    end
    Angular --> Linear`,
};

/**
 * Torque and Rotation template
 */
export const torqueRotation: DiagramTemplate = {
  id: 'mech-torque',
  name: 'Torque and Rotational Dynamics',
  description: 'Torque, moment of inertia, and angular acceleration',
  domain: 'physics',
  promptTemplate: `Create a torque diagram:
- Applied force: {{appliedForce}}
- Lever arm: {{leverArm}}
- Torque: {{torque}}
- Moment of inertia: {{momentOfInertia}}
- Angular acceleration: {{angularAcceleration}}
- Newton's second law (rotation): {{newtonRotation}}
{{#additionalNotes}}Torque notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'appliedForce',
    'leverArm',
    'torque',
    'momentOfInertia',
    'angularAcceleration',
    'newtonRotation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Torque["Torque"]
        T["τ = r × F = rF sinθ"]
    end
    subgraph Inertia["Moment of Inertia"]
        I["I = Σmr²"]
    end
    subgraph Newton["Newton's 2nd (rot)"]
        N["τ = Iα"]
    end
    Torque --> Newton
    Inertia --> Newton`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All mechanics templates
 */
export const mechanicsTemplates: DiagramTemplate[] = [
  // Free Body Diagrams
  freeBodyDiagram,
  inclinedPlane,
  pulleySystem,
  // Motion Analysis
  projectileMotion,
  circularMotion,
  relativeMotion,
  // Energy
  energyConservation,
  workEnergyTheorem,
  potentialEnergyCurve,
  // Momentum
  momentumConservation,
  collisionTypes,
  // Oscillations
  simpleHarmonicMotion,
  springMassSystem,
  pendulumMotion,
  // Rotational
  rotationalKinematics,
  torqueRotation,
];

export default mechanicsTemplates;
