/**
 * biomedical-engineering-prompts.ts
 * Biomedical Engineering-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for biomedical engineering including:
 * - Medical device design
 * - Prosthetics and orthotics
 * - Biomaterials and tissue engineering
 * - Biosensors and instrumentation
 * - Neural engineering
 * - Biomechanics
 * - Medical imaging systems
 * - Drug delivery systems
 * - Rehabilitation engineering
 * - Regulatory and quality
 *
 * Total: 25 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// BIOMEDICAL ENGINEERING DOMAIN PROMPT
// =============================================================================

/**
 * Base biomedical engineering domain prompt
 */
export const BIOMEDICAL_ENGINEERING_DOMAIN_PROMPT = `
Biomedical Engineering diagram requirements:
- Use standard biomedical engineering terminology
- Follow FDA and ISO medical device standards where applicable
- Include proper system block diagrams with signal flow
- Use color coding: Biological (Green), Electronic (Blue), Mechanical (Gray), Control (Orange)
- Reference biocompatibility considerations
- Include proper safety and regulatory elements
- Show human-device interfaces clearly
- Maintain scale consistency and proper labeling
- Reference design controls (FDA 21 CFR 820)
- Include verification and validation checkpoints`;

// =============================================================================
// BIOMEDICAL ENGINEERING-SPECIFIC PROMPTS
// =============================================================================

export const BIOMEDICAL_ENGINEERING_PROMPTS = {
  // Medical Device Design
  medicalDeviceArchitecture: `
Medical Device Architecture requirements:
- Show system-level block diagram
- Include sensing, processing, and actuation subsystems
- Reference power management system
- Show user interface components
- Include communication modules (wireless, wired)
- Reference safety interlocks and alarms
- Show data storage and logging
- Include calibration interfaces
- Reference design controls per FDA 21 CFR 820`,

  implantableDeviceDesign: `
Implantable Device Design requirements:
- Show hermetic enclosure design
- Include biocompatible materials specification
- Reference power source (battery, inductive charging, energy harvesting)
- Show telemetry and communication system
- Include sensing and stimulation circuits
- Reference MRI compatibility considerations
- Show sterilization compatibility
- Include implant-tissue interface
- Reference longevity and reliability considerations`,

  wearableDeviceDesign: `
Wearable Device Design requirements:
- Show sensor placement and body interface
- Include data acquisition circuitry
- Reference wireless communication (Bluetooth, WiFi, cellular)
- Show power management for extended use
- Include user interface (display, buttons, haptics)
- Reference comfort and ergonomic considerations
- Show data processing pipeline
- Include cloud connectivity if applicable
- Reference regulatory pathway (FDA, CE marking)`,

  // Prosthetics and Orthotics
  prostheticControlSystem: `
Prosthetic Control System requirements:
- Show EMG signal acquisition from residual limb
- Include signal processing and feature extraction
- Reference pattern recognition or machine learning classifier
- Show actuator control (motor drivers, servo control)
- Include sensory feedback pathway
- Reference socket interface and force sensing
- Show power system and battery management
- Include real-time control loop timing
- Reference adaptive learning algorithms`,

  orthoticDeviceDesign: `
Orthotic Device Design requirements:
- Show biomechanical force analysis
- Include joint articulation mechanism
- Reference material selection (carbon fiber, thermoplastics)
- Show load distribution and pressure mapping
- Include alignment and adjustment mechanisms
- Reference gait cycle integration
- Show energy storage and release (if powered)
- Include sensor integration for monitoring
- Reference clinical fitting process`,

  exoskeletonControl: `
Exoskeleton Control System requirements:
- Show human-robot interaction control
- Include intent detection (EMG, kinematic, neural)
- Reference torque and position control loops
- Show safety monitoring and limits
- Include human joint alignment system
- Reference assistive vs resistive modes
- Show battery and power distribution
- Include user interface and mode selection
- Reference physical human-robot interaction safety`,

  // Biosensors and Instrumentation
  biosensorDesign: `
Biosensor Design requirements:
- Show biorecognition element (enzyme, antibody, aptamer, cell)
- Include transducer mechanism (electrochemical, optical, piezoelectric)
- Reference signal conditioning circuitry
- Show analyte diffusion and reaction kinetics
- Include selectivity and interference considerations
- Reference sensitivity and detection limits
- Show calibration methodology
- Include drift and stability considerations
- Reference point-of-care vs laboratory applications`,

  continuousMonitoring: `
Continuous Monitoring System requirements:
- Show sensor longevity and biocompatibility
- Include real-time signal processing
- Reference wireless data transmission
- Show alarm and alert algorithms
- Include trend analysis and prediction
- Reference calibration and recalibration schedule
- Show patient notification system
- Include clinician dashboard interface
- Reference regulatory requirements (CGM, ECG, etc.)`,

  implantableSensor: `
Implantable Sensor requirements:
- Show biocompatible packaging design
- Include power harvesting or long-life battery
- Reference hermetic sealing and feedthroughs
- Show tissue-sensor interface stability
- Include drift compensation algorithms
- Reference wireless power and data transfer
- Show miniaturization constraints
- Include explantation considerations
- Reference foreign body response mitigation`,

  // Tissue Engineering
  scaffoldDesign: `
Tissue Engineering Scaffold requirements:
- Show pore architecture (size, interconnectivity, porosity)
- Include material degradation profile
- Reference mechanical properties matching native tissue
- Show cell seeding and distribution
- Include growth factor incorporation
- Reference nutrient diffusion analysis
- Show surface modification for cell adhesion
- Include bioreactor culture conditions
- Reference vascularization strategy`,

  bioreactorSystem: `
Bioreactor System requirements:
- Show culture chamber and scaffold holder
- Include perfusion system design
- Reference mechanical stimulation (compression, shear, tension)
- Show gas exchange and oxygenation
- Include pH, temperature, and O2 control
- Reference sterility maintenance
- Show media circulation and nutrient delivery
- Include real-time monitoring sensors
- Reference scale-up considerations`,

  bioprintingProcess: `
3D Bioprinting Process requirements:
- Show bioink composition and rheology
- Include print head design (extrusion, inkjet, laser)
- Reference printing parameters (speed, resolution, layer height)
- Show crosslinking mechanism (thermal, ionic, photochemical)
- Include cell viability considerations
- Reference multi-material printing strategies
- Show scaffold geometry and design
- Include post-printing maturation
- Reference vascularization approach`,

  // Neural Engineering
  neuralInterfaceDesign: `
Neural Interface Design requirements:
- Show electrode array configuration
- Include signal acquisition front-end
- Reference noise reduction and filtering
- Show spike detection and sorting
- Include neural decoding algorithms
- Reference biocompatibility and stability
- Show hermetic packaging for implants
- Include wireless power and data
- Reference chronic vs acute applications`,

  brainComputerInterface: `
Brain-Computer Interface requirements:
- Show signal acquisition modality (EEG, ECoG, microelectrode)
- Include preprocessing and artifact removal
- Reference feature extraction algorithms
- Show classification and decoding
- Include feedback mechanism
- Reference learning and adaptation
- Show real-time processing requirements
- Include user training protocols
- Reference clinical applications and outcomes`,

  neurostimulationSystem: `
Neurostimulation System requirements:
- Show stimulation waveform parameters
- Include current source design
- Reference electrode-tissue interface model
- Show charge balancing mechanism
- Include safety limits and charge density
- Reference power consumption optimization
- Show programming interface
- Include sensing for closed-loop control
- Reference clinical efficacy parameters`,

  // Medical Imaging
  imagingSystemDesign: `
Medical Imaging System requirements:
- Show image acquisition physics (X-ray, ultrasound, MRI, etc.)
- Include detector array design
- Reference image reconstruction algorithms
- Show image processing pipeline
- Include display and visualization
- Reference dose optimization (for ionizing radiation)
- Show quality assurance protocols
- Include DICOM compatibility
- Reference clinical workflow integration`,

  ultrasoundTransducer: `
Ultrasound Transducer Design requirements:
- Show piezoelectric element configuration
- Include backing and matching layers
- Reference beamforming electronics
- Show frequency selection and bandwidth
- Include focusing and steering capabilities
- Reference array design (linear, phased, curved)
- Show housing and cable design
- Include biocompatibility for probes
- Reference specific clinical applications`,

  // Drug Delivery
  drugDeliverySystem: `
Drug Delivery System requirements:
- Show drug reservoir design
- Include release mechanism (passive, active, triggered)
- Reference pharmacokinetic modeling
- Show delivery rate control
- Include sensors for feedback control
- Reference biocompatibility of materials
- Show power and control electronics
- Include refilling or replacement mechanism
- Reference therapeutic window optimization`,

  microfluidicDevice: `
Microfluidic Device requirements:
- Show channel network design
- Include mixing and reaction chambers
- Reference pumping mechanism
- Show valve and flow control
- Include detection and sensing zones
- Reference surface chemistry and coatings
- Show sample input and waste handling
- Include integration with electronics
- Reference manufacturing considerations`,

  // Biomechanics
  jointBiomechanics: `
Joint Biomechanics Analysis requirements:
- Show anatomical joint model
- Include force and moment analysis
- Reference contact mechanics
- Show range of motion analysis
- Include muscle force estimation
- Reference ligament and tendon loading
- Show wear and degradation prediction
- Include surgical planning application
- Reference implant design optimization`,

  gaitAnalysis: `
Gait Analysis requirements:
- Show kinematic data acquisition (markers, IMUs)
- Include kinetic measurements (force plates)
- Reference temporal-spatial parameters
- Show joint angle calculations
- Include ground reaction force analysis
- Reference muscle activation (EMG)
- Show energy expenditure calculation
- Include pathological gait patterns
- Reference rehabilitation applications`,

  // Rehabilitation Engineering
  rehabilitationRobotics: `
Rehabilitation Robotics requirements:
- Show robot mechanism design (end-effector, exoskeleton)
- Include actuation system
- Reference control modes (passive, active-assist, resistive)
- Show therapy protocol implementation
- Include outcome measurement sensors
- Reference patient-robot interaction safety
- Show user interface for therapists
- Include data logging and progress tracking
- Reference clinical efficacy evidence`,

  assistiveTechnology: `
Assistive Technology requirements:
- Show user needs assessment
- Include input modality selection (switch, eye-gaze, voice)
- Reference customization and personalization
- Show control interface design
- Include environmental control integration
- Reference power wheelchair systems
- Show communication devices
- Include smart home integration
- Reference funding and procurement pathways`,

  // Regulatory and Quality
  designControls: `
Design Controls requirements:
- Show design input gathering
- Include design output specifications
- Reference design review checkpoints
- Show verification testing plan
- Include validation with intended users
- Reference design transfer to manufacturing
- Show design history file documentation
- Include risk management integration
- Reference design changes process`,

  riskManagement: `
Risk Management requirements:
- Show hazard identification (ISO 14971)
- Include risk estimation (severity x probability)
- Reference risk evaluation and acceptability
- Show risk control measures
- Include residual risk assessment
- Reference risk-benefit analysis
- Show production and post-production monitoring
- Include FMEA/FTA methodologies
- Reference risk management report`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Biomedical Engineering few-shot examples
 */
export const BIOMEDICAL_ENGINEERING_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram of an implantable glucose sensor system',
    output: `flowchart TB
    subgraph Sensor["Implantable Sensor"]
        SE["Sensing\\nElectrode"]
        GL["Glucose\\nOxidase Layer"]
        BM["Biocompatible\\nMembrane"]
    end

    subgraph Electronics["Implanted Electronics"]
        POT["Potentiostat"]
        ADC["ADC"]
        MCU["Microcontroller"]
        RF["RF\\nTransceiver"]
        BAT["Battery /\\nInductive Power"]
    end

    subgraph External["External System"]
        RX["Receiver /\\nCharger"]
        ALG["Algorithm\\nProcessor"]
        DSP["Display /\\nSmartphone"]
        ALM["Alarms"]
    end

    SE --> POT --> ADC --> MCU
    MCU --> RF
    BAT --> MCU
    RF <--> RX
    RX --> ALG --> DSP
    ALG --> ALM

    style SE fill:#10b981,color:#fff
    style MCU fill:#3b82f6,color:#fff
    style ALG fill:#f59e0b,color:#fff`,
  },
  {
    prompt: 'Create a prosthetic arm control system diagram',
    output: `flowchart LR
    subgraph Input["User Intent"]
        EMG["EMG\\nElectrodes"]
        IMU["IMU\\nSensor"]
    end

    subgraph Processing["Signal Processing"]
        AMP["Amplifier &\\nFilter"]
        FE["Feature\\nExtraction"]
        ML["ML\\nClassifier"]
    end

    subgraph Control["Control System"]
        SC["Supervisory\\nController"]
        LC["Low-level\\nMotor Control"]
        FB["Sensory\\nFeedback"]
    end

    subgraph Actuation["Hand/Arm"]
        MOT["DC Motors"]
        HAND["Prosthetic\\nHand"]
        FS["Force\\nSensors"]
    end

    EMG --> AMP --> FE --> ML
    IMU --> SC
    ML --> SC --> LC --> MOT --> HAND
    FS --> FB --> SC

    style EMG fill:#10b981,color:#fff
    style ML fill:#3b82f6,color:#fff
    style HAND fill:#6b7280,color:#fff`,
  },
  {
    prompt: 'Create a tissue engineering bioreactor system diagram',
    output: `flowchart TB
    subgraph MediaSystem["Media Circulation"]
        RES["Media\\nReservoir"]
        PM["Peristaltic\\nPump"]
        OX["Oxygenator"]
        HT["Heater"]
    end

    subgraph Chamber["Culture Chamber"]
        SC["Scaffold +\\nCells"]
        MS["Mechanical\\nStimulation"]
    end

    subgraph Sensors["Monitoring"]
        PH["pH Sensor"]
        O2["O2 Sensor"]
        TMP["Temperature"]
        GLU["Glucose"]
    end

    subgraph Control["Control System"]
        CTL["PLC /\\nController"]
        UI["User\\nInterface"]
        LOG["Data\\nLogging"]
    end

    RES --> PM --> OX --> HT --> SC
    SC --> RES
    MS --> SC
    PH & O2 & TMP & GLU --> CTL
    CTL --> PM & HT & MS
    CTL --> UI
    CTL --> LOG

    style SC fill:#10b981,color:#fff
    style CTL fill:#3b82f6,color:#fff
    style MS fill:#f59e0b,color:#fff`,
  },
  {
    prompt: 'Create a deep brain stimulation system diagram',
    output: `flowchart TB
    subgraph Brain["Brain Target"]
        TG["Target Nucleus\\n(STN, GPi)"]
        EL["DBS\\nElectrode"]
    end

    subgraph Implant["Implanted Pulse Generator"]
        SEN["Sensing\\nCircuit"]
        SP["Signal\\nProcessor"]
        PG["Pulse\\nGenerator"]
        BAT["Battery"]
        TM["Telemetry"]
    end

    subgraph External["Programming"]
        PR["Clinician\\nProgrammer"]
        PT["Patient\\nController"]
    end

    EL --> TG
    EL --> SEN --> SP
    SP --> PG --> EL
    BAT --> PG
    TM <--> PR
    TM <--> PT

    style TG fill:#dc2626,color:#fff
    style PG fill:#3b82f6,color:#fff
    style SP fill:#10b981,color:#fff`,
  },
  {
    prompt: 'Create a medical device design controls flowchart',
    output: `flowchart TB
    subgraph Inputs["Design Inputs"]
        UN["User\\nNeeds"]
        REQ["Design\\nRequirements"]
        RM["Risk\\nManagement"]
    end

    subgraph Development["Design & Development"]
        DES["Design\\nActivities"]
        OUT["Design\\nOutputs"]
        REV["Design\\nReviews"]
    end

    subgraph VV["Verification & Validation"]
        VER["Verification\\nTesting"]
        VAL["Validation\\n(Clinical)"]
    end

    subgraph Transfer["Transfer"]
        TR["Design\\nTransfer"]
        DMR["Device Master\\nRecord"]
        DHF["Design History\\nFile"]
    end

    UN --> REQ
    RM --> REQ
    REQ --> DES --> OUT
    OUT --> REV
    REV -->|Approved| VER
    REV -->|Issues| DES
    VER --> VAL
    VAL --> TR --> DMR
    DES & OUT & VER & VAL --> DHF

    style REQ fill:#3b82f6,color:#fff
    style VAL fill:#10b981,color:#fff
    style DHF fill:#f59e0b,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const biomedicalEngineeringPrompts = {
  BIOMEDICAL_ENGINEERING_DOMAIN_PROMPT,
  BIOMEDICAL_ENGINEERING_PROMPTS,
  BIOMEDICAL_ENGINEERING_FEW_SHOT_EXAMPLES,
};
export default biomedicalEngineeringPrompts;
