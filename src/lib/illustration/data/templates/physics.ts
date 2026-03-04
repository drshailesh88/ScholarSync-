/**
 * physics.ts
 * Physics diagram templates for FINNISH
 *
 * Comprehensive templates for physics diagrams covering:
 * - Mechanics (force diagrams, motion, energy)
 * - Electromagnetism (circuits, fields, waves)
 * - Optics (ray diagrams, interference)
 * - Thermodynamics (cycles, engines, processes)
 * - Modern Physics (quantum, relativity)
 * - Laboratory (experiment setups, data)
 *
 * Ralph Loop Iteration 1 - Physics PATHOLOGY_50
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// MECHANICS TEMPLATES
// =============================================================================

/**
 * Force Diagram (Free Body Diagram) template
 */
export const forceDiagram: DiagramTemplate = {
  id: 'phys-force-diagram',
  name: 'Force Diagram',
  description:
    'Free body diagram showing all forces acting on an object with vectors',
  domain: 'physics',
  promptTemplate: `Create a free body diagram:
- Object/body: {{object}}
- Applied forces: {{appliedForces}}
- Gravitational force (weight): {{weight}}
- Normal force: {{normalForce}}
- Friction force: {{frictionForce}}
- Tension forces: {{tensionForces}}
- Other forces: {{otherForces}}
- Reference frame/coordinate system: {{referenceFrame}}
- Acceleration: {{acceleration}}
- Angle of incline (if applicable): {{inclineAngle}}`,
  placeholders: [
    'object',
    'appliedForces',
    'weight',
    'normalForce',
    'frictionForce',
    'tensionForces',
    'otherForces',
    'referenceFrame',
    'acceleration',
    'inclineAngle',
  ],
  mermaidExample: `flowchart TB
    subgraph fbd["Free Body Diagram"]
        object["Block<br/>(mass m)"]
    end

    subgraph forces["Forces"]
        weight["W = mg<br/>↓ Weight"]
        normal["N<br/>↑ Normal Force"]
        friction["f = μN<br/>← Friction"]
        applied["F<br/>→ Applied Force"]
    end

    subgraph equations["Equations"]
        eq1["ΣFx = F - f = ma"]
        eq2["ΣFy = N - mg = 0"]
    end

    weight --> object
    normal --> object
    friction --> object
    applied --> object

    classDef force fill:#fee2e2,stroke:#dc2626
    classDef obj fill:#dbeafe,stroke:#2563eb

    class weight,normal,friction,applied force
    class object obj`,
};

/**
 * Circuit Diagram template
 */
export const circuitDiagram: DiagramTemplate = {
  id: 'phys-circuit-diagram',
  name: 'Circuit Diagram',
  description:
    'Electrical circuit diagram with components and connections',
  domain: 'physics',
  promptTemplate: `Create an electrical circuit diagram:
- Circuit type: {{circuitType}}
- Power source: {{powerSource}}
- Resistors: {{resistors}}
- Capacitors: {{capacitors}}
- Inductors: {{inductors}}
- Switches: {{switches}}
- Other components: {{otherComponents}}
- Series/parallel configuration: {{configuration}}
- Current direction: {{currentDirection}}
- Voltage labels: {{voltageLabels}}
- Ground reference: {{ground}}`,
  placeholders: [
    'circuitType',
    'powerSource',
    'resistors',
    'capacitors',
    'inductors',
    'switches',
    'otherComponents',
    'configuration',
    'currentDirection',
    'voltageLabels',
    'ground',
  ],
  mermaidExample: `flowchart LR
    subgraph source["Power Source"]
        battery["Battery<br/>V = 12V"]
    end

    subgraph series["Series Branch"]
        r1["R1 = 100Ω"]
        r2["R2 = 200Ω"]
    end

    subgraph parallel["Parallel Branch"]
        r3["R3 = 150Ω"]
        r4["R4 = 150Ω"]
    end

    subgraph load["Load"]
        led["LED"]
    end

    battery -->|"I"| r1
    r1 --> r2
    r2 --> r3
    r2 --> r4
    r3 --> led
    r4 --> led
    led --> battery

    classDef source fill:#fef3c7,stroke:#d97706
    classDef resistor fill:#dbeafe,stroke:#2563eb
    classDef load fill:#dcfce7,stroke:#16a34a

    class battery source
    class r1,r2,r3,r4 resistor
    class led load`,
};

/**
 * Wave Diagram template
 */
export const waveDiagram: DiagramTemplate = {
  id: 'phys-wave-diagram',
  name: 'Wave Diagram',
  description:
    'Wave representation showing amplitude, wavelength, and propagation',
  domain: 'physics',
  promptTemplate: `Create a wave diagram:
- Wave type: {{waveType}}
- Amplitude: {{amplitude}}
- Wavelength: {{wavelength}}
- Frequency: {{frequency}}
- Period: {{period}}
- Wave speed: {{waveSpeed}}
- Direction of propagation: {{direction}}
- Medium: {{medium}}
- Phase: {{phase}}
- Interference pattern (if applicable): {{interference}}`,
  placeholders: [
    'waveType',
    'amplitude',
    'wavelength',
    'frequency',
    'period',
    'waveSpeed',
    'direction',
    'medium',
    'phase',
    'interference',
  ],
  mermaidExample: `flowchart TB
    subgraph wave["Wave Properties"]
        direction lateral["Wave Propagation →"]
        crest["Crest<br/>(Maximum)"]
        trough["Trough<br/>(Minimum)"]
        equilibrium["Equilibrium<br/>Line"]
    end

    subgraph measurements["Measurements"]
        amp["Amplitude (A)<br/>= displacement from equilibrium"]
        lambda["Wavelength (λ)<br/>= crest to crest distance"]
        period["Period (T)<br/>= time for one cycle"]
    end

    subgraph equations["Key Equations"]
        eq1["v = fλ"]
        eq2["f = 1/T"]
        eq3["y = A sin(kx - ωt)"]
    end

    crest --> equilibrium
    equilibrium --> trough`,
};

/**
 * Optics Ray Diagram template
 */
export const opticsRayDiagram: DiagramTemplate = {
  id: 'phys-optics-ray',
  name: 'Optics Ray Diagram',
  description:
    'Ray diagram for lenses or mirrors showing image formation',
  domain: 'physics',
  promptTemplate: `Create an optics ray diagram:
- Optical element type: {{elementType}}
- Focal length: {{focalLength}}
- Object distance: {{objectDistance}}
- Object height: {{objectHeight}}
- Principal rays to show: {{principalRays}}
- Image characteristics: {{imageCharacteristics}}
- Magnification: {{magnification}}
- Sign conventions: {{signConventions}}
- Multiple element system: {{multipleElements}}`,
  placeholders: [
    'elementType',
    'focalLength',
    'objectDistance',
    'objectHeight',
    'principalRays',
    'imageCharacteristics',
    'magnification',
    'signConventions',
    'multipleElements',
  ],
  mermaidExample: `flowchart LR
    subgraph object["Object Side"]
        obj["Object<br/>↑<br/>Height h"]
    end

    subgraph lens["Converging Lens"]
        f1["F<br/>(focal point)"]
        center["Optical<br/>Center"]
        f2["F'<br/>(focal point)"]
    end

    subgraph image["Image Side"]
        img["Image<br/>↓<br/>(inverted)"]
    end

    subgraph rays["Principal Rays"]
        ray1["Ray 1: Parallel → through F'"]
        ray2["Ray 2: Through center → straight"]
        ray3["Ray 3: Through F → parallel"]
    end

    obj -->|"Ray 1"| center
    center -->|"converges"| img
    obj -->|"Ray 2"| center
    obj -->|"Ray 3"| center

    classDef object fill:#dbeafe,stroke:#2563eb
    classDef lens fill:#fef3c7,stroke:#d97706
    classDef image fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Energy Level Diagram template
 */
export const energyLevelDiagram: DiagramTemplate = {
  id: 'phys-energy-level',
  name: 'Energy Level Diagram',
  description:
    'Atomic or molecular energy level diagram showing transitions',
  domain: 'physics',
  promptTemplate: `Create an energy level diagram:
- System type: {{systemType}}
- Energy levels: {{energyLevels}}
- Ground state: {{groundState}}
- Excited states: {{excitedStates}}
- Allowed transitions: {{allowedTransitions}}
- Photon energies/wavelengths: {{photonEnergies}}
- Selection rules: {{selectionRules}}
- Degeneracy: {{degeneracy}}
- Fine structure (if applicable): {{fineStructure}}`,
  placeholders: [
    'systemType',
    'energyLevels',
    'groundState',
    'excitedStates',
    'allowedTransitions',
    'photonEnergies',
    'selectionRules',
    'degeneracy',
    'fineStructure',
  ],
  mermaidExample: `flowchart TB
    subgraph levels["Energy Levels (Hydrogen Atom)"]
        n4["n = 4 _____ E = -0.85 eV"]
        n3["n = 3 _____ E = -1.51 eV"]
        n2["n = 2 _____ E = -3.40 eV"]
        n1["n = 1 _____ E = -13.6 eV<br/>(Ground State)"]
    end

    subgraph series["Spectral Series"]
        lyman["Lyman Series<br/>(UV)"]
        balmer["Balmer Series<br/>(Visible)"]
        paschen["Paschen Series<br/>(IR)"]
    end

    n4 -->|"Paschen"| n3
    n3 -->|"Balmer"| n2
    n2 -->|"Lyman"| n1
    n4 -->|"Balmer"| n2
    n3 -->|"Lyman"| n1
    n4 -->|"Lyman"| n1

    classDef ground fill:#dcfce7,stroke:#16a34a
    classDef excited fill:#dbeafe,stroke:#2563eb

    class n1 ground
    class n2,n3,n4 excited`,
};

/**
 * Motion Graph template
 */
export const motionGraph: DiagramTemplate = {
  id: 'phys-motion-graph',
  name: 'Motion Graph',
  description:
    'Kinematics graph showing position, velocity, or acceleration vs time',
  domain: 'physics',
  promptTemplate: `Create a motion graph:
- Graph type: {{graphType}}
- Motion description: {{motionDescription}}
- Initial conditions: {{initialConditions}}
- Time interval: {{timeInterval}}
- Key points/events: {{keyPoints}}
- Slope interpretation: {{slopeInterpretation}}
- Area interpretation: {{areaInterpretation}}
- Equations of motion: {{equations}}
- Multiple objects (if comparing): {{multipleObjects}}`,
  placeholders: [
    'graphType',
    'motionDescription',
    'initialConditions',
    'timeInterval',
    'keyPoints',
    'slopeInterpretation',
    'areaInterpretation',
    'equations',
    'multipleObjects',
  ],
  mermaidExample: `flowchart TB
    subgraph position["Position vs Time"]
        xvt["x(t) curve<br/>Slope = velocity"]
    end

    subgraph velocity["Velocity vs Time"]
        vvt["v(t) curve<br/>Slope = acceleration<br/>Area = displacement"]
    end

    subgraph acceleration["Acceleration vs Time"]
        avt["a(t) curve<br/>Area = change in velocity"]
    end

    subgraph interpretation["Graph Interpretation"]
        slope["Slope of x-t = v"]
        area1["Area under v-t = Δx"]
        slope2["Slope of v-t = a"]
        area2["Area under a-t = Δv"]
    end

    position --> velocity
    velocity --> acceleration

    classDef graph fill:#dbeafe,stroke:#2563eb
    class xvt,vvt,avt graph`,
};

// =============================================================================
// THERMODYNAMICS TEMPLATES
// =============================================================================

/**
 * Thermodynamic Cycle Diagram template
 */
export const thermodynamicCycle: DiagramTemplate = {
  id: 'phys-thermo-cycle',
  name: 'Thermodynamic Cycle Diagram',
  description:
    'PV or TS diagram showing thermodynamic cycle with processes',
  domain: 'physics',
  promptTemplate: `Create a thermodynamic cycle diagram:
- Cycle type: {{cycleType}}
- Working fluid: {{workingFluid}}
- Process 1 (state A to B): {{process1}}
- Process 2 (state B to C): {{process2}}
- Process 3 (state C to D): {{process3}}
- Process 4 (state D to A): {{process4}}
- Temperatures: {{temperatures}}
- Pressures: {{pressures}}
- Volumes: {{volumes}}
- Efficiency: {{efficiency}}
- Heat transfer: {{heatTransfer}}
- Work done: {{workDone}}`,
  placeholders: [
    'cycleType',
    'workingFluid',
    'process1',
    'process2',
    'process3',
    'process4',
    'temperatures',
    'pressures',
    'volumes',
    'efficiency',
    'heatTransfer',
    'workDone',
  ],
  mermaidExample: `flowchart TB
    subgraph carnot["Carnot Cycle (PV Diagram)"]
        direction TB
        A["State A<br/>P₁, V₁, T_H"]
        B["State B<br/>P₂, V₂, T_H"]
        C["State C<br/>P₃, V₃, T_C"]
        D["State D<br/>P₄, V₄, T_C"]
    end

    subgraph processes["Processes"]
        iso1["1→2: Isothermal Expansion<br/>Q_in at T_H"]
        adia1["2→3: Adiabatic Expansion<br/>Q = 0"]
        iso2["3→4: Isothermal Compression<br/>Q_out at T_C"]
        adia2["4→1: Adiabatic Compression<br/>Q = 0"]
    end

    subgraph efficiency["Efficiency"]
        eff["η = 1 - T_C/T_H<br/>W_net = Q_H - Q_C"]
    end

    A -->|"isothermal"| B
    B -->|"adiabatic"| C
    C -->|"isothermal"| D
    D -->|"adiabatic"| A

    classDef hot fill:#fee2e2,stroke:#dc2626
    classDef cold fill:#dbeafe,stroke:#2563eb

    class A,B hot
    class C,D cold`,
};

/**
 * Heat Engine Diagram template
 */
export const heatEngineDiagram: DiagramTemplate = {
  id: 'phys-heat-engine',
  name: 'Heat Engine Diagram',
  description:
    'Schematic diagram of heat engine showing heat flow and work',
  domain: 'physics',
  promptTemplate: `Create a heat engine diagram:
- Engine type: {{engineType}}
- Hot reservoir temperature: {{hotReservoir}}
- Cold reservoir temperature: {{coldReservoir}}
- Heat input (Q_H): {{heatInput}}
- Heat output (Q_C): {{heatOutput}}
- Work output: {{workOutput}}
- Efficiency: {{efficiency}}
- Reversibility: {{reversibility}}
- Practical applications: {{applications}}`,
  placeholders: [
    'engineType',
    'hotReservoir',
    'coldReservoir',
    'heatInput',
    'heatOutput',
    'workOutput',
    'efficiency',
    'reversibility',
    'applications',
  ],
  mermaidExample: `flowchart TB
    subgraph hot["Hot Reservoir"]
        TH["T_H = 600K"]
    end

    subgraph engine["Heat Engine"]
        E["Engine<br/>η = W/Q_H"]
    end

    subgraph cold["Cold Reservoir"]
        TC["T_C = 300K"]
    end

    subgraph work["Work Output"]
        W["W = Q_H - Q_C"]
    end

    TH -->|"Q_H = 1000J"| E
    E -->|"Q_C = 500J"| TC
    E -->|"W = 500J"| W

    classDef hot fill:#fee2e2,stroke:#dc2626
    classDef cold fill:#dbeafe,stroke:#2563eb
    classDef engine fill:#fef3c7,stroke:#d97706

    class TH hot
    class TC cold
    class E engine`,
};

// =============================================================================
// ELECTROMAGNETISM TEMPLATES
// =============================================================================

/**
 * Electric Field Lines Diagram template
 */
export const electricFieldDiagram: DiagramTemplate = {
  id: 'phys-electric-field',
  name: 'Electric Field Diagram',
  description:
    'Electric field lines and equipotential surfaces for charge configurations',
  domain: 'physics',
  promptTemplate: `Create an electric field diagram:
- Charge configuration: {{chargeConfiguration}}
- Charge values: {{chargeValues}}
- Field line density: {{fieldLineDensity}}
- Equipotential surfaces: {{equipotentials}}
- Field direction indicators: {{fieldDirection}}
- Field strength regions: {{fieldStrength}}
- Superposition effects: {{superposition}}
- Boundary conditions: {{boundaries}}`,
  placeholders: [
    'chargeConfiguration',
    'chargeValues',
    'fieldLineDensity',
    'equipotentials',
    'fieldDirection',
    'fieldStrength',
    'superposition',
    'boundaries',
  ],
  mermaidExample: `flowchart TB
    subgraph charges["Charge Configuration"]
        pos["+ Positive Charge<br/>q = +2μC"]
        neg["- Negative Charge<br/>q = -2μC"]
    end

    subgraph field["Electric Field"]
        lines["Field lines:<br/>• Start on + charges<br/>• End on - charges<br/>• Never cross"]
    end

    subgraph equations["Key Equations"]
        E["E = kq/r²"]
        F["F = qE"]
        V["V = kq/r"]
    end

    pos -->|"field lines"| neg

    classDef positive fill:#fee2e2,stroke:#dc2626
    classDef negative fill:#dbeafe,stroke:#2563eb

    class pos positive
    class neg negative`,
};

/**
 * Magnetic Field Diagram template
 */
export const magneticFieldDiagram: DiagramTemplate = {
  id: 'phys-magnetic-field',
  name: 'Magnetic Field Diagram',
  description:
    'Magnetic field lines for magnets, currents, or solenoids',
  domain: 'physics',
  promptTemplate: `Create a magnetic field diagram:
- Source type: {{sourceType}}
- Field geometry: {{fieldGeometry}}
- Current direction (if applicable): {{currentDirection}}
- Pole identification: {{poles}}
- Field line pattern: {{fieldPattern}}
- Right-hand rule application: {{rightHandRule}}
- Field strength indicators: {{fieldStrength}}
- Interaction with other fields: {{interactions}}`,
  placeholders: [
    'sourceType',
    'fieldGeometry',
    'currentDirection',
    'poles',
    'fieldPattern',
    'rightHandRule',
    'fieldStrength',
    'interactions',
  ],
  mermaidExample: `flowchart LR
    subgraph magnet["Bar Magnet"]
        N["N (North)"]
        S["S (South)"]
    end

    subgraph field["Magnetic Field"]
        external["External field lines:<br/>N → S (outside)"]
        internal["Internal field lines:<br/>S → N (inside)"]
    end

    subgraph rules["Key Rules"]
        closed["Field lines are<br/>always closed loops"]
        noMonopoles["No magnetic<br/>monopoles exist"]
    end

    N -->|"B field"| S

    classDef north fill:#fee2e2,stroke:#dc2626
    classDef south fill:#dbeafe,stroke:#2563eb

    class N north
    class S south`,
};

/**
 * Electromagnetic Wave Diagram template
 */
export const emWaveDiagram: DiagramTemplate = {
  id: 'phys-em-wave',
  name: 'Electromagnetic Wave Diagram',
  description:
    'Electromagnetic wave showing E and B field oscillations',
  domain: 'physics',
  promptTemplate: `Create an electromagnetic wave diagram:
- Wave type: {{waveType}}
- Frequency/wavelength: {{frequencyWavelength}}
- E field orientation: {{eFieldOrientation}}
- B field orientation: {{bFieldOrientation}}
- Propagation direction: {{propagationDirection}}
- Polarization: {{polarization}}
- Energy flow (Poynting vector): {{poyntingVector}}
- Phase relationship: {{phaseRelationship}}`,
  placeholders: [
    'waveType',
    'frequencyWavelength',
    'eFieldOrientation',
    'bFieldOrientation',
    'propagationDirection',
    'polarization',
    'poyntingVector',
    'phaseRelationship',
  ],
  mermaidExample: `flowchart LR
    subgraph em["EM Wave Structure"]
        E["E field<br/>(vertical oscillation)"]
        B["B field<br/>(horizontal oscillation)"]
        c["Propagation<br/>direction (c)"]
    end

    subgraph properties["Properties"]
        ortho["E ⊥ B ⊥ c"]
        speed["v = c = 3×10⁸ m/s"]
        relation["c = fλ"]
    end

    subgraph poynting["Energy Flow"]
        S["S = E × B / μ₀<br/>(Poynting vector)"]
    end

    E --> c
    B --> c

    classDef efield fill:#fee2e2,stroke:#dc2626
    classDef bfield fill:#dbeafe,stroke:#2563eb

    class E efield
    class B bfield`,
};

// =============================================================================
// MODERN PHYSICS TEMPLATES
// =============================================================================

/**
 * Quantum State Diagram template
 */
export const quantumStateDiagram: DiagramTemplate = {
  id: 'phys-quantum-state',
  name: 'Quantum State Diagram',
  description:
    'Quantum mechanical state representation with wavefunctions or Bloch sphere',
  domain: 'physics',
  promptTemplate: `Create a quantum state diagram:
- State representation: {{stateRepresentation}}
- Basis states: {{basisStates}}
- Superposition coefficients: {{coefficients}}
- Probability amplitudes: {{amplitudes}}
- Measurement outcomes: {{measurements}}
- Entanglement (if applicable): {{entanglement}}
- Time evolution: {{timeEvolution}}
- Observable operators: {{observables}}`,
  placeholders: [
    'stateRepresentation',
    'basisStates',
    'coefficients',
    'amplitudes',
    'measurements',
    'entanglement',
    'timeEvolution',
    'observables',
  ],
  mermaidExample: `flowchart TB
    subgraph state["Quantum State"]
        psi["|ψ⟩ = α|0⟩ + β|1⟩"]
    end

    subgraph basis["Basis States"]
        zero["|0⟩"]
        one["|1⟩"]
    end

    subgraph measurement["Measurement"]
        prob0["P(0) = |α|²"]
        prob1["P(1) = |β|²"]
        norm["|α|² + |β|² = 1"]
    end

    subgraph bloch["Bloch Sphere"]
        north["|0⟩ at North pole"]
        south["|1⟩ at South pole"]
        equator["Superpositions<br/>on sphere surface"]
    end

    psi --> zero
    psi --> one`,
};

/**
 * Spacetime Diagram template
 */
export const spacetimeDiagram: DiagramTemplate = {
  id: 'phys-spacetime',
  name: 'Spacetime Diagram',
  description:
    'Minkowski diagram showing worldlines, light cones, and relativistic effects',
  domain: 'physics',
  promptTemplate: `Create a spacetime diagram:
- Reference frame: {{referenceFrame}}
- Worldlines: {{worldlines}}
- Light cones: {{lightCones}}
- Events: {{events}}
- Time dilation: {{timeDilation}}
- Length contraction: {{lengthContraction}}
- Simultaneity: {{simultaneity}}
- Causality regions: {{causalityRegions}}`,
  placeholders: [
    'referenceFrame',
    'worldlines',
    'lightCones',
    'events',
    'timeDilation',
    'lengthContraction',
    'simultaneity',
    'causalityRegions',
  ],
  mermaidExample: `flowchart TB
    subgraph diagram["Minkowski Diagram"]
        t["ct (time axis)"]
        x["x (space axis)"]
    end

    subgraph lightcone["Light Cone"]
        future["Future Light Cone<br/>(causally connected)"]
        past["Past Light Cone<br/>(causally connected)"]
        elsewhere["Elsewhere<br/>(spacelike separated)"]
    end

    subgraph worldlines["Worldlines"]
        stationary["Stationary observer<br/>(vertical line)"]
        moving["Moving observer<br/>(tilted line, v < c)"]
        light["Photon<br/>(45° line, v = c)"]
    end

    t --> future
    t --> past`,
};

/**
 * Nuclear Decay Diagram template
 */
export const nuclearDecayDiagram: DiagramTemplate = {
  id: 'phys-nuclear-decay',
  name: 'Nuclear Decay Diagram',
  description:
    'Nuclear decay chain or single decay process with particles',
  domain: 'physics',
  promptTemplate: `Create a nuclear decay diagram:
- Parent nucleus: {{parentNucleus}}
- Daughter nucleus: {{daughterNucleus}}
- Decay type: {{decayType}}
- Emitted particles: {{emittedParticles}}
- Energy released: {{energyReleased}}
- Half-life: {{halfLife}}
- Decay chain (if applicable): {{decayChain}}
- Branching ratios: {{branchingRatios}}`,
  placeholders: [
    'parentNucleus',
    'daughterNucleus',
    'decayType',
    'emittedParticles',
    'energyReleased',
    'halfLife',
    'decayChain',
    'branchingRatios',
  ],
  mermaidExample: `flowchart LR
    subgraph alpha["Alpha Decay"]
        U238["²³⁸U<br/>(Uranium-238)"]
        Th234["²³⁴Th<br/>(Thorium-234)"]
        He4["⁴He<br/>(alpha particle)"]
    end

    subgraph beta["Beta Decay"]
        Th234b["²³⁴Th"]
        Pa234["²³⁴Pa<br/>(Protactinium-234)"]
        electron["e⁻ + ν̄"]
    end

    U238 -->|"α decay<br/>t½ = 4.5 Gyr"| Th234
    U238 -->|"emits"| He4
    Th234b -->|"β⁻ decay<br/>t½ = 24 days"| Pa234
    Th234b -->|"emits"| electron

    classDef parent fill:#fee2e2,stroke:#dc2626
    classDef daughter fill:#dcfce7,stroke:#16a34a

    class U238 parent
    class Th234,Pa234 daughter`,
};

// =============================================================================
// LABORATORY & EXPERIMENT TEMPLATES
// =============================================================================

/**
 * Experiment Setup Diagram template
 */
export const experimentSetup: DiagramTemplate = {
  id: 'phys-experiment-setup',
  name: 'Experiment Setup Diagram',
  description:
    'Laboratory experiment setup showing apparatus and connections',
  domain: 'physics',
  promptTemplate: `Create an experiment setup diagram:
- Experiment name: {{experimentName}}
- Main apparatus: {{apparatus}}
- Power supplies: {{powerSupplies}}
- Measuring instruments: {{instruments}}
- Connections: {{connections}}
- Safety equipment: {{safety}}
- Variables (independent): {{independentVars}}
- Variables (dependent): {{dependentVars}}
- Control variables: {{controlVars}}
- Procedure steps: {{procedure}}`,
  placeholders: [
    'experimentName',
    'apparatus',
    'powerSupplies',
    'instruments',
    'connections',
    'safety',
    'independentVars',
    'dependentVars',
    'controlVars',
    'procedure',
  ],
  mermaidExample: `flowchart TB
    subgraph setup["Ohm's Law Experiment"]
        ps["Variable DC<br/>Power Supply"]
        ammeter["Ammeter (A)<br/>in series"]
        resistor["Known<br/>Resistor R"]
        voltmeter["Voltmeter (V)<br/>in parallel"]
    end

    subgraph variables["Variables"]
        indep["Independent: V (voltage)"]
        dep["Dependent: I (current)"]
        control["Control: R (resistance)"]
    end

    subgraph analysis["Analysis"]
        graph["Plot I vs V<br/>Slope = 1/R"]
    end

    ps --> ammeter
    ammeter --> resistor
    resistor --> ps
    voltmeter --> resistor

    classDef power fill:#fef3c7,stroke:#d97706
    classDef meter fill:#dbeafe,stroke:#2563eb

    class ps power
    class ammeter,voltmeter meter`,
};

/**
 * Data Analysis Graph template
 */
export const dataAnalysisGraph: DiagramTemplate = {
  id: 'phys-data-analysis',
  name: 'Data Analysis Graph',
  description:
    'Scientific data plot with error bars, best fit line, and analysis',
  domain: 'physics',
  promptTemplate: `Create a data analysis graph:
- Graph title: {{title}}
- X-axis variable: {{xVariable}}
- Y-axis variable: {{yVariable}}
- Data points: {{dataPoints}}
- Error bars: {{errorBars}}
- Best fit type: {{bestFitType}}
- Fit equation: {{fitEquation}}
- R-squared value: {{rSquared}}
- Outliers: {{outliers}}
- Physical interpretation: {{interpretation}}`,
  placeholders: [
    'title',
    'xVariable',
    'yVariable',
    'dataPoints',
    'errorBars',
    'bestFitType',
    'fitEquation',
    'rSquared',
    'outliers',
    'interpretation',
  ],
  mermaidExample: `flowchart TB
    subgraph graph["Velocity vs Time Graph"]
        data["Data points with<br/>error bars (±σ)"]
        fit["Linear best fit:<br/>v = at + v₀"]
    end

    subgraph analysis["Analysis"]
        slope["Slope = a<br/>(acceleration)"]
        intercept["y-intercept = v₀<br/>(initial velocity)"]
        r2["R² = 0.998<br/>(excellent fit)"]
    end

    subgraph uncertainty["Uncertainty"]
        random["Random error:<br/>scatter in data"]
        systematic["Systematic error:<br/>offset from theory"]
    end

    data --> fit
    fit --> slope
    fit --> intercept`,
};

/**
 * Interference Pattern Diagram template
 */
export const interferencePattern: DiagramTemplate = {
  id: 'phys-interference-pattern',
  name: 'Interference Pattern Diagram',
  description:
    'Wave interference showing constructive and destructive patterns',
  domain: 'physics',
  promptTemplate: `Create an interference pattern diagram:
- Wave sources: {{waveSources}}
- Source separation: {{separation}}
- Wavelength: {{wavelength}}
- Screen distance: {{screenDistance}}
- Bright fringe positions: {{brightFringes}}
- Dark fringe positions: {{darkFringes}}
- Fringe spacing: {{fringeSpacing}}
- Central maximum: {{centralMaximum}}
- Path difference: {{pathDifference}}`,
  placeholders: [
    'waveSources',
    'separation',
    'wavelength',
    'screenDistance',
    'brightFringes',
    'darkFringes',
    'fringeSpacing',
    'centralMaximum',
    'pathDifference',
  ],
  mermaidExample: `flowchart LR
    subgraph sources["Double Slit"]
        s1["Slit 1"]
        s2["Slit 2"]
    end

    subgraph screen["Interference Pattern"]
        bright["Bright fringes<br/>(constructive)"]
        dark["Dark fringes<br/>(destructive)"]
        central["Central<br/>maximum"]
    end

    subgraph conditions["Conditions"]
        cons["Constructive:<br/>Δ = mλ (m = 0,1,2...)"]
        dest["Destructive:<br/>Δ = (m+½)λ"]
    end

    s1 -->|"wave 1"| central
    s2 -->|"wave 2"| central

    classDef bright fill:#dcfce7,stroke:#16a34a
    classDef dark fill:#374151,stroke:#111827,color:#fff

    class bright,central bright
    class dark dark`,
};

/**
 * Projectile Motion Diagram template
 */
export const projectileMotion: DiagramTemplate = {
  id: 'phys-projectile-motion',
  name: 'Projectile Motion Diagram',
  description:
    'Trajectory diagram showing projectile path and velocity components',
  domain: 'physics',
  promptTemplate: `Create a projectile motion diagram:
- Initial velocity: {{initialVelocity}}
- Launch angle: {{launchAngle}}
- Initial height: {{initialHeight}}
- Maximum height: {{maxHeight}}
- Range: {{range}}
- Time of flight: {{timeOfFlight}}
- Velocity components: {{velocityComponents}}
- Air resistance: {{airResistance}}
- Key positions: {{keyPositions}}`,
  placeholders: [
    'initialVelocity',
    'launchAngle',
    'initialHeight',
    'maxHeight',
    'range',
    'timeOfFlight',
    'velocityComponents',
    'airResistance',
    'keyPositions',
  ],
  mermaidExample: `flowchart TB
    subgraph trajectory["Parabolic Trajectory"]
        launch["Launch point<br/>v₀, θ"]
        apex["Apex<br/>v_y = 0"]
        land["Landing point<br/>Range R"]
    end

    subgraph components["Velocity Components"]
        vx["v_x = v₀ cos(θ)<br/>(constant)"]
        vy["v_y = v₀ sin(θ) - gt<br/>(changes)"]
    end

    subgraph equations["Key Equations"]
        range["R = v₀² sin(2θ)/g"]
        height["H = v₀² sin²(θ)/2g"]
        time["T = 2v₀ sin(θ)/g"]
    end

    launch -->|"ascent"| apex
    apex -->|"descent"| land

    classDef start fill:#dcfce7,stroke:#16a34a
    classDef peak fill:#fef3c7,stroke:#d97706
    classDef end fill:#fee2e2,stroke:#dc2626

    class launch start
    class apex peak
    class land end`,
};

/**
 * Simple Harmonic Motion Diagram template
 */
export const simpleHarmonicMotion: DiagramTemplate = {
  id: 'phys-shm-diagram',
  name: 'Simple Harmonic Motion Diagram',
  description:
    'SHM diagram showing oscillation, energy, and phase relationships',
  domain: 'physics',
  promptTemplate: `Create a simple harmonic motion diagram:
- Oscillator type: {{oscillatorType}}
- Amplitude: {{amplitude}}
- Angular frequency: {{angularFrequency}}
- Period: {{period}}
- Phase constant: {{phaseConstant}}
- Equilibrium position: {{equilibrium}}
- Maximum displacement: {{maxDisplacement}}
- Energy transformation: {{energyTransformation}}
- Damping (if any): {{damping}}`,
  placeholders: [
    'oscillatorType',
    'amplitude',
    'angularFrequency',
    'period',
    'phaseConstant',
    'equilibrium',
    'maxDisplacement',
    'energyTransformation',
    'damping',
  ],
  mermaidExample: `flowchart TB
    subgraph oscillation["Mass-Spring System"]
        eq["Equilibrium<br/>x = 0"]
        right["+A<br/>(max displacement)"]
        left["-A<br/>(max displacement)"]
    end

    subgraph energy["Energy"]
        pe["PE = ½kx²<br/>(max at ±A)"]
        ke["KE = ½mv²<br/>(max at x=0)"]
        total["E_total = ½kA²<br/>(constant)"]
    end

    subgraph equations["Equations"]
        pos["x(t) = A cos(ωt + φ)"]
        vel["v(t) = -Aω sin(ωt + φ)"]
        period["T = 2π√(m/k)"]
    end

    left -->|"oscillates through"| eq
    eq -->|"oscillates to"| right

    classDef max fill:#fee2e2,stroke:#dc2626
    classDef eq fill:#dcfce7,stroke:#16a34a

    class left,right max
    class eq eq`,
};

/**
 * Collision Diagram template
 */
export const collisionDiagram: DiagramTemplate = {
  id: 'phys-collision-diagram',
  name: 'Collision Diagram',
  description:
    'Momentum and energy analysis for elastic or inelastic collisions',
  domain: 'physics',
  promptTemplate: `Create a collision diagram:
- Collision type: {{collisionType}}
- Object 1 (mass, initial velocity): {{object1}}
- Object 2 (mass, initial velocity): {{object2}}
- Final velocities: {{finalVelocities}}
- Momentum conservation: {{momentumConservation}}
- Energy analysis: {{energyAnalysis}}
- Coefficient of restitution: {{restitution}}
- Collision geometry: {{collisionGeometry}}`,
  placeholders: [
    'collisionType',
    'object1',
    'object2',
    'finalVelocities',
    'momentumConservation',
    'energyAnalysis',
    'restitution',
    'collisionGeometry',
  ],
  mermaidExample: `flowchart TB
    subgraph before["Before Collision"]
        m1i["m₁<br/>v₁ᵢ →"]
        m2i["m₂<br/>← v₂ᵢ"]
    end

    subgraph collision["Collision"]
        impact["Momentum<br/>conserved"]
    end

    subgraph after["After Collision"]
        m1f["m₁<br/>← v₁f"]
        m2f["m₂<br/>v₂f →"]
    end

    subgraph conservation["Conservation Laws"]
        momentum["Σp_before = Σp_after<br/>(always)"]
        energy["Σ KE_before = Σ KE_after<br/>(elastic only)"]
    end

    m1i --> impact
    m2i --> impact
    impact --> m1f
    impact --> m2f

    classDef obj1 fill:#fee2e2,stroke:#dc2626
    classDef obj2 fill:#dbeafe,stroke:#2563eb

    class m1i,m1f obj1
    class m2i,m2f obj2`,
};

// =============================================================================
// ALL PHYSICS TEMPLATES EXPORT
// =============================================================================

/**
 * All physics templates exported as an array
 */
/**
 * Particle Physics Diagram template
 */
export const particlePhysicsDiagram: DiagramTemplate = {
  id: 'phys-particle-physics',
  name: 'Particle Physics Diagram',
  description:
    'Feynman diagram or particle interaction representation',
  domain: 'physics',
  promptTemplate: `Create a particle physics diagram:
- Interaction type: {{interactionType}}
- Incoming particles: {{incomingParticles}}
- Outgoing particles: {{outgoingParticles}}
- Mediator boson: {{mediatorBoson}}
- Vertex representation: {{vertexRepresentation}}
- Momentum labels: {{momentumLabels}}
- Conservation laws: {{conservationLaws}}
- Cross section (if applicable): {{crossSection}}`,
  placeholders: [
    'interactionType',
    'incomingParticles',
    'outgoingParticles',
    'mediatorBoson',
    'vertexRepresentation',
    'momentumLabels',
    'conservationLaws',
    'crossSection',
  ],
  mermaidExample: `flowchart LR
    subgraph incoming["Incoming"]
        e1["e⁻"]
        e2["e⁺"]
    end

    subgraph vertex["Interaction"]
        gamma["γ (photon)"]
    end

    subgraph outgoing["Outgoing"]
        mu1["μ⁻"]
        mu2["μ⁺"]
    end

    subgraph conservation["Conservation"]
        charge["Charge: -1 + 1 = -1 + 1 ✓"]
        lepton["Lepton number: 1 + (-1) = 1 + (-1) ✓"]
    end

    e1 --> gamma
    e2 --> gamma
    gamma --> mu1
    gamma --> mu2

    classDef electron fill:#dbeafe,stroke:#2563eb
    classDef muon fill:#dcfce7,stroke:#16a34a
    classDef photon fill:#fef3c7,stroke:#d97706

    class e1,e2 electron
    class mu1,mu2 muon
    class gamma photon`,
};

/**
 * Astrophysics Diagram template
 */
export const astrophysicsDiagram: DiagramTemplate = {
  id: 'phys-astrophysics',
  name: 'Astrophysics Diagram',
  description:
    'Stellar evolution, galaxy structure, or cosmological diagram',
  domain: 'physics',
  promptTemplate: `Create an astrophysics diagram:
- Diagram type: {{diagramType}}
- Celestial objects: {{celestialObjects}}
- Physical scales: {{physicalScales}}
- Key processes: {{keyProcesses}}
- Time evolution: {{timeEvolution}}
- Observable quantities: {{observables}}
- Theoretical framework: {{theory}}
- Data source (if applicable): {{dataSource}}`,
  placeholders: [
    'diagramType',
    'celestialObjects',
    'physicalScales',
    'keyProcesses',
    'timeEvolution',
    'observables',
    'theory',
    'dataSource',
  ],
  mermaidExample: `flowchart TB
    subgraph evolution["Stellar Evolution"]
        protostar["Protostar<br/>T ~ 10⁴ K"]
        mainseq["Main Sequence<br/>H → He fusion"]
        redgiant["Red Giant<br/>He burning"]
    end

    subgraph endpoints["Stellar Endpoints"]
        whitedwarf["White Dwarf<br/>M < 1.4 M☉"]
        neutronstar["Neutron Star<br/>1.4 < M < 3 M☉"]
        blackhole["Black Hole<br/>M > 3 M☉"]
    end

    protostar -->|"gravitational collapse"| mainseq
    mainseq -->|"H exhaustion"| redgiant
    redgiant -->|"low mass"| whitedwarf
    redgiant -->|"supernova"| neutronstar
    redgiant -->|"massive star"| blackhole

    classDef early fill:#fef3c7,stroke:#d97706
    classDef late fill:#fee2e2,stroke:#dc2626
    classDef remnant fill:#dbeafe,stroke:#2563eb

    class protostar,mainseq early
    class redgiant late
    class whitedwarf,neutronstar,blackhole remnant`,
};

/**
 * Solid State Physics Diagram template
 */
export const solidStateDiagram: DiagramTemplate = {
  id: 'phys-solid-state',
  name: 'Solid State Physics Diagram',
  description:
    'Crystal structure, band diagram, or condensed matter representation',
  domain: 'physics',
  promptTemplate: `Create a solid state physics diagram:
- Material type: {{materialType}}
- Crystal structure: {{crystalStructure}}
- Band structure: {{bandStructure}}
- Fermi level position: {{fermiLevel}}
- Dopants (if semiconductor): {{dopants}}
- Temperature effects: {{temperatureEffects}}
- Physical properties: {{physicalProperties}}
- Device application: {{deviceApplication}}`,
  placeholders: [
    'materialType',
    'crystalStructure',
    'bandStructure',
    'fermiLevel',
    'dopants',
    'temperatureEffects',
    'physicalProperties',
    'deviceApplication',
  ],
  mermaidExample: `flowchart TB
    subgraph bands["Band Structure"]
        conduction["Conduction Band<br/>Empty states"]
        gap["Band Gap (Eg)"]
        valence["Valence Band<br/>Filled states"]
    end

    subgraph doping["Doping Effects"]
        ntype["n-type: Donor levels<br/>near conduction band"]
        ptype["p-type: Acceptor levels<br/>near valence band"]
    end

    subgraph device["Device Applications"]
        diode["p-n Junction Diode"]
        transistor["MOSFET"]
    end

    conduction --> gap
    gap --> valence
    ntype --> diode
    ptype --> diode
    diode --> transistor

    classDef cond fill:#dbeafe,stroke:#2563eb
    classDef val fill:#dcfce7,stroke:#16a34a
    classDef gap fill:#f3f4f6,stroke:#6b7280

    class conduction cond
    class valence val
    class gap gap`,
};

/**
 * Electrostatics Diagram template
 */
export const electrostaticsDiagram: DiagramTemplate = {
  id: 'phys-electrostatics',
  name: 'Electrostatics Diagram',
  description:
    'Electric charge distribution, potential, and field configuration',
  domain: 'physics',
  promptTemplate: `Create an electrostatics diagram:
- Charge configuration: {{chargeConfiguration}}
- Charge magnitudes: {{chargeMagnitudes}}
- Electric field representation: {{fieldRepresentation}}
- Equipotential surfaces: {{equipotentials}}
- Gauss surface (if applicable): {{gaussSurface}}
- Boundary conditions: {{boundaryConditions}}
- Potential calculation: {{potentialCalculation}}
- Applications: {{applications}}`,
  placeholders: [
    'chargeConfiguration',
    'chargeMagnitudes',
    'fieldRepresentation',
    'equipotentials',
    'gaussSurface',
    'boundaryConditions',
    'potentialCalculation',
    'applications',
  ],
  mermaidExample: `flowchart TB
    subgraph charges["Charge Distribution"]
        pos["+q (positive)"]
        neg["-q (negative)"]
    end

    subgraph field["Electric Field"]
        direction["E points: + → -"]
        magnitude["E = kq/r²"]
    end

    subgraph potential["Electric Potential"]
        work["V = -∫E·dr"]
        reference["V(∞) = 0"]
    end

    subgraph gauss["Gauss's Law"]
        flux["Φ = ∮E·dA = q_enc/ε₀"]
    end

    pos -->|"field lines"| neg
    field --> potential
    potential --> gauss

    classDef positive fill:#fee2e2,stroke:#dc2626
    classDef negative fill:#dbeafe,stroke:#2563eb

    class pos positive
    class neg negative`,
};

/**
 * Rotational Mechanics Diagram template
 */
export const rotationalMechanicsDiagram: DiagramTemplate = {
  id: 'phys-rotational-mechanics',
  name: 'Rotational Mechanics Diagram',
  description:
    'Rotational motion, torque, and angular momentum representation',
  domain: 'physics',
  promptTemplate: `Create a rotational mechanics diagram:
- Rotating object: {{rotatingObject}}
- Axis of rotation: {{axisOfRotation}}
- Angular velocity: {{angularVelocity}}
- Moment of inertia: {{momentOfInertia}}
- Applied torques: {{appliedTorques}}
- Angular momentum: {{angularMomentum}}
- Energy considerations: {{energyConsiderations}}
- Precession (if applicable): {{precession}}`,
  placeholders: [
    'rotatingObject',
    'axisOfRotation',
    'angularVelocity',
    'momentOfInertia',
    'appliedTorques',
    'angularMomentum',
    'energyConsiderations',
    'precession',
  ],
  mermaidExample: `flowchart TB
    subgraph kinematics["Rotational Kinematics"]
        omega["ω = dθ/dt<br/>(angular velocity)"]
        alpha["α = dω/dt<br/>(angular acceleration)"]
    end

    subgraph dynamics["Rotational Dynamics"]
        torque["τ = r × F<br/>(torque)"]
        inertia["I = Σmr²<br/>(moment of inertia)"]
        newton["τ = Iα<br/>(Newton's 2nd for rotation)"]
    end

    subgraph conservation["Conservation Laws"]
        L["L = Iω<br/>(angular momentum)"]
        KE["KE = ½Iω²<br/>(rotational kinetic energy)"]
    end

    omega --> alpha
    torque --> newton
    inertia --> newton
    newton --> L
    newton --> KE

    classDef kinematic fill:#dbeafe,stroke:#2563eb
    classDef dynamic fill:#dcfce7,stroke:#16a34a
    classDef conserv fill:#fef3c7,stroke:#d97706

    class omega,alpha kinematic
    class torque,inertia,newton dynamic
    class L,KE conserv`,
};

export const physicsTemplates: DiagramTemplate[] = [
  // Mechanics
  forceDiagram,
  motionGraph,
  projectileMotion,
  simpleHarmonicMotion,
  collisionDiagram,
  rotationalMechanicsDiagram,
  // Electromagnetism
  circuitDiagram,
  electricFieldDiagram,
  magneticFieldDiagram,
  emWaveDiagram,
  electrostaticsDiagram,
  // Waves & Optics
  waveDiagram,
  opticsRayDiagram,
  interferencePattern,
  // Thermodynamics
  thermodynamicCycle,
  heatEngineDiagram,
  // Modern Physics
  energyLevelDiagram,
  quantumStateDiagram,
  spacetimeDiagram,
  nuclearDecayDiagram,
  particlePhysicsDiagram,
  // Condensed Matter
  solidStateDiagram,
  // Astrophysics
  astrophysicsDiagram,
  // Laboratory
  experimentSetup,
  dataAnalysisGraph,
];
