/**
 * engineering-prompts.ts
 * Engineering-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for general engineering including:
 * - Mechanical systems and components
 * - Electrical and control systems
 * - Manufacturing and production
 * - Quality engineering and SPC
 * - Structural analysis
 * - Project management
 * - CAD and technical drawings
 * - Materials and testing
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ENGINEERING DOMAIN PROMPT
// =============================================================================

/**
 * Base engineering domain prompt for technical diagrams
 */
export const ENGINEERING_DOMAIN_PROMPT = `
Engineering diagram requirements:
- Use standard engineering symbols and notation (ISO, ANSI, IEC)
- Follow proper dimensioning practices (GD&T where applicable)
- Include appropriate tolerances and specifications
- Use consistent line weights (thin for dimensions, thick for outlines)
- Apply proper scale notation
- Include title block information where relevant
- Use color coding: Mechanical (Blue), Electrical (Yellow), Hydraulic (Red), Pneumatic (Green)
- Include bill of materials references when applicable
- Maintain technical accuracy in representations
- Follow industry-specific standards (ASME, IEEE, SAE)`;

// =============================================================================
// ENGINEERING-SPECIFIC PROMPTS
// =============================================================================

export const ENGINEERING_PROMPTS = {
  // Mechanical Engineering
  mechanicalSystem: `
Mechanical System Diagram requirements:
- Show all mechanical components (gears, bearings, shafts, couplings)
- Include power transmission paths
- Reference torque and speed values where applicable
- Show lubrication points and requirements
- Include safety features (guards, interlocks)
- Reference material specifications
- Show maintenance access points
- Include alignment and tolerance requirements`,

  gearTrain: `
Gear Train Diagram requirements:
- Show gear ratios and tooth counts
- Include input and output speeds/torques
- Reference gear types (spur, helical, bevel, worm)
- Show bearing locations and types
- Include center distances
- Reference pressure angles and module/pitch
- Show direction of rotation
- Include efficiency calculations where relevant`,

  structuralAnalysis: `
Structural Analysis Diagram requirements:
- Show load paths and force distributions
- Include support reactions and boundary conditions
- Reference material properties (E, yield strength)
- Show moment diagrams and shear diagrams
- Include deflection values at critical points
- Reference safety factors
- Show stress concentrations
- Include connection details`,

  // Electrical Engineering
  controlSystem: `
Control System Diagram requirements:
- Show feedback loops clearly (negative/positive)
- Include transfer functions for each block
- Reference controller types (P, PI, PID)
- Show setpoint, error, and output signals
- Include sensor and actuator blocks
- Reference stability criteria
- Show disturbance inputs
- Include system response characteristics`,

  electricalCircuit: `
Electrical Circuit Diagram requirements:
- Use standard IEEE/IEC electrical symbols
- Show component values and ratings
- Include power supply connections (+ and -)
- Reference ground connections clearly
- Show signal flow direction
- Include protection devices (fuses, breakers)
- Reference wire gauges where applicable
- Show terminal and connector designations`,

  plcLadderLogic: `
PLC Ladder Logic Diagram requirements:
- Use standard ladder diagram format
- Show rung numbers and addresses
- Include I/O addressing (inputs, outputs, internals)
- Reference timer and counter instructions
- Show normally open (NO) and normally closed (NC) contacts
- Include comments for each rung
- Reference program organization (subroutines, jumps)
- Show seal-in and interlock circuits`,

  // Manufacturing
  manufacturingProcess: `
Manufacturing Process Flow requirements:
- Show all production steps in sequence
- Include quality inspection points
- Reference cycle times and throughput
- Show material handling between stations
- Include rework and scrap paths
- Reference equipment and tooling
- Show bottleneck identification
- Include WIP inventory locations`,

  qualityControl: `
Quality Control Chart requirements:
- Show control limits (UCL, LCL, CL)
- Include sample data points
- Reference specification limits (USL, LSL)
- Show out-of-control conditions
- Include run rules violations
- Reference Cp, Cpk, Pp, Ppk values
- Show trends and patterns
- Include measurement system references`,

  processCapability: `
Process Capability Diagram requirements:
- Show normal distribution curve
- Include specification limits overlay
- Reference sigma levels
- Show defect rates (PPM, DPMO)
- Include process centering
- Reference natural tolerance limits
- Show process shift if applicable
- Include histogram of sample data`,

  // Fluid Systems
  hydraulicCircuit: `
Hydraulic Circuit Diagram requirements:
- Use ISO 1219 hydraulic symbols
- Show pump displacement and pressure
- Include directional control valves with positions
- Reference flow control and pressure relief settings
- Show actuators (cylinders, motors)
- Include filter and cooler locations
- Reference line sizes and pressure ratings
- Show reservoir and fluid level`,

  pneumaticCircuit: `
Pneumatic Circuit Diagram requirements:
- Use ISO 1219 pneumatic symbols
- Show air supply pressure and flow
- Include directional valves and actuators
- Reference speed control (flow restrictors)
- Show quick exhaust and silencer locations
- Include FRL unit (filter, regulator, lubricator)
- Reference tubing sizes
- Show sequence valves if applicable`,

  pidDiagram: `
P&ID (Piping and Instrumentation) requirements:
- Use ISA-5.1 instrument symbols
- Show all equipment with tag numbers
- Include pipe sizes and specifications
- Reference instrumentation (transmitters, controllers)
- Show control valves with failure positions
- Include safety instrumented systems
- Reference utility connections
- Show process flow direction`,

  // Analysis and Design
  fmeaAnalysis: `
FMEA Diagram requirements:
- Show failure modes for each component/step
- Include effects at local, system, and end levels
- Reference severity, occurrence, detection ratings
- Calculate Risk Priority Numbers (RPN)
- Show recommended actions
- Include responsible parties and due dates
- Reference detection methods
- Show before/after RPN comparison`,

  faultTree: `
Fault Tree Analysis requirements:
- Show top event clearly
- Include intermediate and basic events
- Use proper gate symbols (AND, OR, voting)
- Reference probability values for basic events
- Calculate system probability
- Show minimal cut sets
- Include common cause failures
- Reference redundancy arrangements`,

  reliabilityBlock: `
Reliability Block Diagram requirements:
- Show system configuration (series, parallel, k-of-n)
- Include component reliability values (R or MTBF)
- Calculate system reliability
- Show redundancy arrangements
- Include standby configurations
- Reference failure rates (lambda)
- Show hot/cold standby distinction
- Include reliability targets`,

  // Project Management
  projectSchedule: `
Project Schedule (Gantt) Diagram requirements:
- Show all tasks with durations
- Include task dependencies (FS, SS, FF, SF)
- Reference milestones clearly
- Show critical path highlighted
- Include resource assignments
- Reference baseline vs actual progress
- Show float/slack for non-critical tasks
- Include phase/stage groupings`,

  workBreakdown: `
Work Breakdown Structure requirements:
- Show hierarchical decomposition
- Include WBS numbering system
- Reference deliverables at lowest level
- Show responsibility assignments
- Include cost/budget allocations
- Reference schedule dependencies
- Show control accounts
- Include work packages`,

  // Technical Documentation
  technicalDrawing: `
Technical Drawing requirements:
- Use proper orthographic projection
- Include dimensioning per ASME Y14.5
- Reference geometric tolerances (GD&T)
- Show section views where needed
- Include detail views at proper scale
- Reference surface finish symbols
- Show material and heat treatment notes
- Include revision history and approval blocks`,

  assemblydrawing: `
Assembly Drawing requirements:
- Show exploded or assembled views
- Include item numbers with leader lines
- Reference parts list/BOM
- Show subassembly breakdowns
- Include installation sequences
- Reference torque specifications
- Show critical interfaces
- Include required tools list`,

  ishikawaDiagram: `
Ishikawa (Fishbone) Diagram requirements:
- Show problem statement at head
- Include 6M categories (Man, Machine, Material, Method, Measurement, Mother Nature)
- Reference primary and secondary causes
- Show cause relationships
- Include data/evidence for causes
- Reference verification methods
- Show prioritization of causes
- Include action items for root causes`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Engineering-specific few-shot examples
 */
export const ENGINEERING_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a PID control system block diagram for temperature control',
    output: `flowchart LR
    subgraph Input["Setpoint"]
        SP["Temperature<br/>Setpoint<br/>T_sp"]
    end

    subgraph Controller["PID Controller"]
        SUM(("+<br/>-"))
        PID["PID<br/>Kp=2.5<br/>Ki=0.8<br/>Kd=0.2"]
    end

    subgraph Plant["Process"]
        HTR["Heater<br/>Actuator"]
        PROC["Thermal<br/>Process<br/>G(s)"]
    end

    subgraph Feedback["Feedback"]
        TC["Thermocouple<br/>Sensor"]
    end

    subgraph Output["Output"]
        T["Temperature<br/>T_actual"]
    end

    SP --> SUM
    SUM -->|"Error e(t)"| PID
    PID -->|"Control u(t)"| HTR
    HTR --> PROC
    PROC --> T
    T --> TC
    TC -->|"Measured"| SUM

    style SP fill:#dbeafe
    style PID fill:#fef3c7
    style PROC fill:#dcfce7
    style TC fill:#f3e8ff`,
  },
  {
    prompt: 'Create a manufacturing process flow for CNC machining',
    output: `flowchart TB
    subgraph Input["Raw Material"]
        BAR["Bar Stock<br/>Receipt"]
        INSP1["Incoming<br/>Inspection"]
    end

    subgraph Machining["CNC Operations"]
        SAW["Cut to<br/>Length"]
        LATHE["CNC Lathe<br/>Turn OD/ID"]
        MILL["CNC Mill<br/>Features"]
        GRIND["Surface<br/>Grinding"]
    end

    subgraph QC["Quality Control"]
        CMM["CMM<br/>Inspection"]
        DIM{"Dims<br/>OK?"}
    end

    subgraph Finish["Finishing"]
        DEBURR["Deburr"]
        WASH["Clean &<br/>Wash"]
        PACK["Package"]
    end

    BAR --> INSP1
    INSP1 -->|"Accept"| SAW
    INSP1 -->|"Reject"| BAR
    SAW --> LATHE --> MILL --> GRIND
    GRIND --> CMM --> DIM
    DIM -->|"Pass"| DEBURR
    DIM -->|"Fail"| LATHE
    DEBURR --> WASH --> PACK

    style BAR fill:#dbeafe
    style CMM fill:#dcfce7
    style DIM fill:#fef3c7`,
  },
  {
    prompt: 'Create an electrical motor control schematic with start/stop',
    output: `flowchart LR
    subgraph Power["Power Circuit"]
        L1["L1"] --> CB["Circuit<br/>Breaker"]
        L2["L2"] --> CB
        L3["L3"] --> CB
        CB --> OL["Overload<br/>Relay"]
        OL --> M["Motor<br/>M1"]
    end

    subgraph Control["Control Circuit"]
        START["Start<br/>PB (NO)"]
        STOP["Stop<br/>PB (NC)"]
        SEAL["M1<br/>Aux (NO)"]
        COIL["M1<br/>Coil"]
    end

    subgraph Status["Indicators"]
        RUN["Run<br/>Light"]
        OL_TRIP["OL Trip<br/>Light"]
    end

    START --> COIL
    SEAL --> COIL
    STOP -.-> START
    COIL --> RUN
    OL -.-> OL_TRIP

    style L1 fill:#fee2e2
    style M fill:#dbeafe
    style COIL fill:#fef3c7`,
  },
  {
    prompt: 'Create a quality control chart showing process data',
    output: `flowchart TB
    subgraph Limits["Control Limits"]
        UCL["UCL = 10.25mm<br/>+3 sigma"]
        CL["CL = 10.00mm<br/>Mean"]
        LCL["LCL = 9.75mm<br/>-3 sigma"]
    end

    subgraph Data["Sample Measurements"]
        S1["S1: 10.02"]
        S2["S2: 9.98"]
        S3["S3: 10.05"]
        S4["S4: 10.28<br/>OUT!"]
        S5["S5: 10.01"]
        S6["S6: 9.96"]
    end

    subgraph Stats["Process Statistics"]
        CP["Cp = 1.33"]
        CPK["Cpk = 1.28"]
        SIG["Sigma = 0.083mm"]
    end

    subgraph Action["Corrective Action"]
        ROOT["Root Cause<br/>Analysis"]
        ADJ["Adjust<br/>Process"]
    end

    S4 --> ROOT --> ADJ

    style UCL fill:#fee2e2
    style LCL fill:#dbeafe
    style CL fill:#dcfce7
    style S4 fill:#fee2e2`,
  },
  {
    prompt: 'Create a hydraulic press circuit diagram',
    output: `flowchart TB
    subgraph PowerUnit["Power Unit"]
        RES["Reservoir<br/>50 Gal"]
        FLT["Filter<br/>10 micron"]
        PMP["Pump<br/>20 GPM"]
        PRV["Relief<br/>Valve<br/>3000 PSI"]
    end

    subgraph Control["Control Section"]
        SOL["Solenoid<br/>DCV 4/3"]
        PC["Pressure<br/>Compensator"]
        FC["Flow<br/>Control"]
    end

    subgraph Actuator["Press Cylinder"]
        CYL["Double Acting<br/>Cylinder<br/>6in Bore"]
    end

    subgraph Gauges["Instrumentation"]
        PG1["Pressure<br/>Gauge"]
        PG2["Pressure<br/>Gauge"]
    end

    RES --> FLT --> PMP
    PMP --> PRV
    PRV -->|"Return"| RES
    PMP --> PG1 --> SOL
    SOL -->|"Extend"| FC --> CYL
    CYL -->|"Retract"| SOL
    SOL -->|"Return"| RES

    style RES fill:#dbeafe
    style PMP fill:#dcfce7
    style CYL fill:#fef3c7`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const engineeringPrompts = {
  ENGINEERING_DOMAIN_PROMPT,
  ENGINEERING_PROMPTS,
  ENGINEERING_FEW_SHOT_EXAMPLES,
};

export default engineeringPrompts;
