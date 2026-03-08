/**
 * aerospace-prompts.ts
 * Aerospace-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for aerospace engineering including:
 * - Aerodynamics (lift, drag, airfoil, boundary layers)
 * - Propulsion systems (jet engines, rockets, turbofans)
 * - Orbital mechanics (trajectories, transfers, rendezvous)
 * - Spacecraft systems (thermal, power, attitude control)
 * - Aircraft structures (wings, fuselage, control surfaces)
 * - Flight dynamics (stability, control, performance)
 *
 * Total: 18 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// AEROSPACE DOMAIN PROMPT
// =============================================================================

/**
 * Base aerospace domain prompt for aerospace engineering diagrams
 */
export const AEROSPACE_DOMAIN_PROMPT = `
Aerospace diagram requirements:
- Use standard aerospace coordinate systems (body-fixed, Earth-fixed, orbital)
- Follow NASA/ESA diagram conventions for spacecraft and trajectories
- Include proper unit notation (m/s, km, N, kg, degrees)
- Show force vectors with proper arrow notation and labels
- Use standard airfoil nomenclature (chord, camber, leading/trailing edge)
- Include reference frames and coordinate axes where relevant
- Mark center of gravity (CG), center of pressure (CP), aerodynamic center (AC)
- Use color coding: Lift (blue), Drag (red), Thrust (green), Weight (orange)
- Show flow direction with streamlines or velocity vectors
- Include Mach number regimes where applicable (subsonic, transonic, supersonic, hypersonic)`;

// =============================================================================
// AEROSPACE-SPECIFIC PROMPTS
// =============================================================================

export const AEROSPACE_PROMPTS = {
  // Aerodynamics
  airfoilAerodynamics: `
Airfoil Aerodynamics requirements:
- Show airfoil cross-section with chord line and camber line
- Include leading edge, trailing edge, and maximum thickness point
- Mark angle of attack (alpha) relative to freestream
- Show pressure distribution (low pressure above, high pressure below)
- Include lift vector (perpendicular to freestream)
- Include drag vector (parallel to freestream)
- Show boundary layer development along surface
- Mark stagnation point at leading edge
- Include coefficient definitions (CL, CD, CM)`,

  liftDragForces: `
Lift and Drag Forces requirements:
- Show aircraft or airfoil in freestream flow
- Include all four primary forces: Lift, Weight, Thrust, Drag
- Position forces at correct application points
- Show angle of attack effect on lift generation
- Include induced drag from wingtip vortices
- Mark parasitic drag components (form, friction, interference)
- Show lift-to-drag ratio (L/D) significance
- Include polar diagram relating CL to CD`,

  boundaryLayer: `
Boundary Layer requirements:
- Show velocity profile development along flat plate or airfoil
- Distinguish laminar boundary layer (smooth, parallel streamlines)
- Show transition region with flow instabilities
- Illustrate turbulent boundary layer (thicker, more mixing)
- Mark boundary layer thickness (delta)
- Include displacement thickness and momentum thickness
- Show wall shear stress distribution
- Include Reynolds number effects on transition`,

  supersonicFlow: `
Supersonic Flow requirements:
- Show shock wave patterns (normal, oblique, bow shock)
- Include expansion fans (Prandtl-Meyer expansion)
- Mark Mach cone angle (mu = arcsin(1/M))
- Show pressure, density, temperature changes across shocks
- Include shock-boundary layer interaction
- Mark sonic line for transonic flows
- Show supersonic inlet design (external/internal compression)
- Include area-velocity relationship for nozzle flow`,

  // Propulsion
  jetEngineCycle: `
Jet Engine Thermodynamic Cycle requirements:
- Show Brayton cycle stages (intake, compression, combustion, expansion)
- Include T-s (temperature-entropy) diagram
- Mark compressor work input and turbine work output
- Show combustor heat addition
- Include afterburner (if applicable)
- Mark station numbering (0-9 for turbofan)
- Show bypass ratio for turbofan engines
- Include specific fuel consumption (SFC)
- Mark thrust equation components`,

  rocketPropulsion: `
Rocket Propulsion requirements:
- Show rocket engine schematic (combustion chamber, throat, nozzle)
- Include propellant flow (fuel and oxidizer)
- Mark chamber pressure and temperature
- Show nozzle expansion ratio and exit conditions
- Include thrust vector and specific impulse (Isp)
- Mark overexpanded, ideally expanded, underexpanded conditions
- Show propellant mass fraction and rocket equation
- Include staging benefits for multi-stage rockets`,

  turbofanEngine: `
Turbofan Engine requirements:
- Show fan, compressor (LPC/HPC), combustor, turbine (HPT/LPT), nozzle
- Include bypass duct and core flow paths
- Mark bypass ratio (BPR) and fan pressure ratio
- Show blade stages and pressure/temperature progression
- Include accessory gearbox and engine mounts
- Mark thrust contributions (fan vs core)
- Show FADEC control system integration
- Include efficiency parameters (thermal, propulsive, overall)`,

  // Orbital Mechanics
  orbitalElements: `
Orbital Elements requirements:
- Show six Keplerian elements defining orbit
- Include semi-major axis (a) and eccentricity (e)
- Mark inclination (i) relative to equatorial plane
- Show right ascension of ascending node (RAAN/Omega)
- Include argument of periapsis (omega)
- Mark true anomaly (nu) for position
- Show orbit visualization in 3D with reference planes
- Include orbital period calculation`,

  hohmannTransfer: `
Hohmann Transfer Orbit requirements:
- Show initial circular orbit and final circular orbit
- Include elliptical transfer orbit tangent to both
- Mark delta-V requirements at both burns
- Show periapsis at lower orbit, apoapsis at higher
- Include transfer time calculation (half orbital period)
- Mark velocity vectors at burn points
- Compare to other transfer options (bi-elliptic)
- Include fuel efficiency considerations`,

  rendezvousManeuver: `
Orbital Rendezvous requirements:
- Show chaser and target spacecraft in orbits
- Include phasing orbit for catch-up
- Mark v-bar and r-bar approach corridors
- Show proximity operations zone definitions
- Include hold points (e.g., 200m, 30m, 10m)
- Mark sensor coverage and keep-out zones
- Show docking mechanism alignment
- Include abort trajectory options`,

  // Spacecraft Systems
  spacecraftThermal: `
Spacecraft Thermal Control requirements:
- Show heat sources (solar, albedo, Earth IR, internal)
- Include passive thermal control (MLI, radiators, coatings)
- Mark active thermal control (heaters, heat pipes, louvers)
- Show thermal balance equation
- Include orbital thermal environment variations
- Mark hot case and cold case design points
- Show temperature limits for components
- Include thermal margin allocation`,

  attitudeControl: `
Attitude Control System requirements:
- Show spacecraft body axes (roll, pitch, yaw)
- Include attitude sensors (star trackers, sun sensors, gyros)
- Mark reaction wheels or control moment gyros
- Show thruster configuration for attitude control
- Include magnetorquers for momentum dumping
- Mark pointing accuracy and stability requirements
- Show control law block diagram (PID, etc.)
- Include disturbance torques (gravity gradient, solar pressure)`,

  // Aircraft Structures
  wingStructure: `
Wing Structural Components requirements:
- Show wing box with spars (front and rear)
- Include ribs perpendicular to spars
- Mark skin panels and stringers
- Show fuel tank locations in wing box
- Include leading edge and trailing edge assemblies
- Mark control surface hinges and actuators
- Show wing root attachment to fuselage
- Include load paths for lift distribution`,

  controlSurfaces: `
Aircraft Control Surfaces requirements:
- Show primary controls (ailerons, elevators, rudder)
- Include secondary controls (flaps, slats, spoilers)
- Mark hinge lines and deflection ranges
- Show aerodynamic forces generated by deflection
- Include trim tabs and balance tabs
- Mark fly-by-wire vs mechanical linkages
- Show control surface coordination
- Include flutter and reversal considerations`,

  // Flight Dynamics
  stabilityAxes: `
Aircraft Stability and Control requirements:
- Show body axis system (x-forward, y-right, z-down)
- Include stability axes (aligned with velocity)
- Mark longitudinal stability (pitch - Cm_alpha)
- Show lateral-directional stability (roll-yaw coupling)
- Include static margin definition (CG vs AC)
- Mark control derivatives and effectiveness
- Show stability augmentation system
- Include flying qualities requirements`,

  flightEnvelope: `
Flight Envelope requirements:
- Show V-n diagram with load factor limits
- Include maneuvering speed (Va) and maximum speed (Vne)
- Mark structural limits (positive and negative g)
- Show gust envelope overlay
- Include stall speed variation with load factor
- Mark design dive speed (Vd) and cruise speed (Vc)
- Show service ceiling altitude limits
- Include operating limitations summary`,

  missionProfile: `
Mission Profile requirements:
- Show flight phases (taxi, takeoff, climb, cruise, descent, landing)
- Include altitude vs distance or time plot
- Mark fuel consumption at each phase
- Show payload-range diagram
- Include reserve fuel requirements
- Mark critical points (decision altitudes, waypoints)
- Show alternate airport planning
- Include weight breakdown at each phase`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const AEROSPACE_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing forces on an aircraft in steady level flight',
    output: `flowchart TB
    subgraph forces["Forces on Aircraft"]
        lift["Lift (L)<br/>Perpendicular to flight path<br/>Generated by wings"]
        weight["Weight (W)<br/>Toward Earth center<br/>W = mg"]
        thrust["Thrust (T)<br/>Along flight path<br/>Engine force"]
        drag["Drag (D)<br/>Opposite to flight path<br/>Aerodynamic resistance"]
    end

    subgraph equilibrium["Steady Level Flight"]
        eq1["L = W (vertical equilibrium)"]
        eq2["T = D (horizontal equilibrium)"]
        result["No acceleration<br/>Constant altitude & speed"]
    end

    subgraph aircraft["Aircraft Diagram"]
        cg["Center of<br/>Gravity (CG)"]
    end

    lift -->|"Acts at AC"| cg
    weight -->|"Acts at CG"| cg
    thrust -->|"Acts at engine"| cg
    drag -->|"Acts at AC"| cg

    classDef lift fill:#dbeafe,stroke:#2563eb
    classDef weight fill:#fed7aa,stroke:#ea580c
    classDef thrust fill:#dcfce7,stroke:#16a34a
    classDef drag fill:#fecaca,stroke:#dc2626

    class lift lift
    class weight weight
    class thrust thrust
    class drag drag`,
    reasoning: 'Shows the four fundamental forces in equilibrium for steady level flight',
  },
  {
    prompt: 'Create a Hohmann transfer orbit diagram from LEO to GEO',
    output: `flowchart TB
    subgraph orbits["Orbital Transfer"]
        leo["LEO<br/>400 km altitude<br/>v = 7.67 km/s"]
        transfer["Transfer Orbit<br/>Elliptical<br/>Period = 5.25 hours"]
        geo["GEO<br/>35,786 km altitude<br/>v = 3.07 km/s"]
    end

    subgraph burns["Delta-V Requirements"]
        burn1["First Burn<br/>Delta-V1 = 2.44 km/s<br/>Raise apogee"]
        burn2["Second Burn<br/>Delta-V2 = 1.47 km/s<br/>Circularize"]
        total["Total Delta-V = 3.91 km/s"]
    end

    leo -->|"Periapsis"| burn1
    burn1 --> transfer
    transfer -->|"Apoapsis"| burn2
    burn2 --> geo

    note["Transfer time: ~5.25 hours<br/>Most fuel-efficient two-impulse transfer"]

    classDef lowOrbit fill:#dcfce7,stroke:#16a34a
    classDef highOrbit fill:#dbeafe,stroke:#2563eb
    classDef transfer fill:#fef3c7,stroke:#d97706
    classDef burn fill:#fecaca,stroke:#dc2626

    class leo lowOrbit
    class geo highOrbit
    class transfer transfer
    class burn1,burn2 burn`,
    reasoning: 'Illustrates the Hohmann transfer maneuver with delta-V requirements and orbital parameters',
  },
  {
    prompt: 'Create a turbofan engine cross-section diagram',
    output: `flowchart LR
    subgraph intake["Intake"]
        inlet["Inlet<br/>Station 0-1"]
    end

    subgraph fan["Fan Section"]
        fan_blades["Fan<br/>BPR = 9:1"]
    end

    subgraph bypass["Bypass Duct"]
        bypass_flow["80% of thrust"]
    end

    subgraph core["Core Engine"]
        lpc["LPC<br/>3 stages"]
        hpc["HPC<br/>10 stages"]
        combustor["Combustor<br/>T = 1700K"]
        hpt["HPT<br/>2 stages"]
        lpt["LPT<br/>5 stages"]
    end

    subgraph exhaust["Exhaust"]
        nozzle["Nozzle<br/>Station 8-9"]
    end

    inlet --> fan_blades
    fan_blades --> bypass_flow
    fan_blades --> lpc
    lpc --> hpc
    hpc --> combustor
    combustor --> hpt
    hpt --> lpt
    lpt --> nozzle
    bypass_flow --> nozzle

    note["Modern high-bypass turbofan<br/>Thermal efficiency ~40%<br/>Propulsive efficiency ~80%"]

    classDef cold fill:#dbeafe,stroke:#2563eb
    classDef hot fill:#fecaca,stroke:#dc2626
    classDef bypass fill:#dcfce7,stroke:#16a34a

    class inlet,fan_blades,lpc cold
    class hpc,combustor,hpt hot
    class bypass_flow,lpt bypass`,
    reasoning: 'Shows turbofan engine components with station numbering and efficiency parameters',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized aerospace prompt categories for UI grouping
 */
export const AEROSPACE_PROMPT_CATEGORIES = {
  aerodynamics: {
    name: 'Aerodynamics',
    prompts: ['airfoilAerodynamics', 'liftDragForces', 'boundaryLayer', 'supersonicFlow'],
  },
  propulsion: {
    name: 'Propulsion Systems',
    prompts: ['jetEngineCycle', 'rocketPropulsion', 'turbofanEngine'],
  },
  orbitalMechanics: {
    name: 'Orbital Mechanics',
    prompts: ['orbitalElements', 'hohmannTransfer', 'rendezvousManeuver'],
  },
  spacecraftSystems: {
    name: 'Spacecraft Systems',
    prompts: ['spacecraftThermal', 'attitudeControl'],
  },
  aircraftStructures: {
    name: 'Aircraft Structures',
    prompts: ['wingStructure', 'controlSurfaces'],
  },
  flightDynamics: {
    name: 'Flight Dynamics',
    prompts: ['stabilityAxes', 'flightEnvelope', 'missionProfile'],
  },
};

/**
 * Get a specific aerospace prompt by key
 */
export function getAerospacePrompt(key: keyof typeof AEROSPACE_PROMPTS): string {
  return AEROSPACE_PROMPTS[key];
}

/**
 * Get all aerospace prompts as an array
 */
export function getAllAerospacePrompts(): { key: string; prompt: string }[] {
  return Object.entries(AEROSPACE_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getAerospacePromptsByCategory(category: keyof typeof AEROSPACE_PROMPT_CATEGORIES): string[] {
  const categoryData = AEROSPACE_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => AEROSPACE_PROMPTS[key as keyof typeof AEROSPACE_PROMPTS]);
}

const aerospacePrompts = {
  AEROSPACE_DOMAIN_PROMPT,
  AEROSPACE_PROMPTS,
  AEROSPACE_FEW_SHOT_EXAMPLES,
  AEROSPACE_PROMPT_CATEGORIES,
  getAerospacePrompt,
  getAllAerospacePrompts,
  getAerospacePromptsByCategory,
};
export default aerospacePrompts;
