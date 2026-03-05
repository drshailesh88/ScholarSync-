/**
 * physiology.ts
 * Physiology diagram templates for FINNISH
 *
 * Contains comprehensive templates for physiological sciences including:
 * - Cardiovascular physiology
 * - Respiratory physiology
 * - Renal physiology
 * - Neurophysiology
 * - Muscle physiology
 * - Endocrine physiology
 * - GI physiology
 * - Metabolism
 * - Fluid/electrolyte balance
 * - Acid-base regulation
 * - Thermoregulation
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CARDIOVASCULAR PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Cardiac Cycle Diagram template
 */
export const cardiacCycleDiagram: DiagramTemplate = {
  id: 'physio-cardiac-cycle',
  name: 'Cardiac Cycle Diagram',
  description: 'Wiggers diagram showing pressure, volume, ECG, and heart sounds during the cardiac cycle',
  domain: 'biology',
  promptTemplate: `Create a cardiac cycle diagram showing:
- Phases: {{phases}}
- Pressure curves: {{pressureCurves}}
- Volume changes: {{volumeChanges}}
- ECG correlation: {{ecgCorrelation}}
- Heart sounds: {{heartSounds}}
- Valve events: {{valveEvents}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phases',
    'pressureCurves',
    'volumeChanges',
    'ecgCorrelation',
    'heartSounds',
    'valveEvents',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Systole["Systole"]
        A["Isovolumic\\nContraction"] --> B["Ejection"]
    end
    subgraph Diastole["Diastole"]
        C["Isovolumic\\nRelaxation"] --> D["Rapid Filling"]
        D --> E["Diastasis"] --> F["Atrial Kick"]
    end
    B --> C
    F --> A
    style A fill:#DC143C,color:#fff
    style B fill:#FF6347,color:#fff
    style D fill:#4169E1,color:#fff`,
};

/**
 * Frank-Starling Mechanism template
 */
export const frankStarlingMechanism: DiagramTemplate = {
  id: 'physio-frank-starling',
  name: 'Frank-Starling Mechanism',
  description: 'Illustration of the Frank-Starling law of the heart showing preload-output relationship',
  domain: 'biology',
  promptTemplate: `Create a Frank-Starling curve diagram showing:
- X-axis parameter: {{xAxisParameter}}
- Y-axis parameter: {{yAxisParameter}}
- Normal curve: {{normalCurve}}
- Increased contractility: {{increasedContractility}}
- Decreased contractility: {{decreasedContractility}}
- Operating point: {{operatingPoint}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'xAxisParameter',
    'yAxisParameter',
    'normalCurve',
    'increasedContractility',
    'decreasedContractility',
    'operatingPoint',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Preload\\n(EDV)")] --> B{"Frank-Starling\\nMechanism"}
    B --> C["↑ Sarcomere Stretch"]
    C --> D["↑ Ca²⁺ Sensitivity"]
    D --> E["↑ Force Generation"]
    E --> F[("↑ Stroke Volume")]
    style A fill:#4169E1,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Pressure-Volume Loop template
 */
export const pressureVolumeLooP: DiagramTemplate = {
  id: 'physio-pv-loop',
  name: 'Pressure-Volume Loop',
  description: 'LV pressure-volume relationship showing cardiac mechanics and energetics',
  domain: 'biology',
  promptTemplate: `Create a pressure-volume loop diagram showing:
- Loop phases: {{loopPhases}}
- Key points (A,B,C,D): {{keyPoints}}
- ESPVR line: {{espvrLine}}
- EDPVR line: {{edpvrLine}}
- Stroke work: {{strokeWork}}
- Pathological changes: {{pathologicalChanges}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loopPhases',
    'keyPoints',
    'espvrLine',
    'edpvrLine',
    'strokeWork',
    'pathologicalChanges',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PVLoop["PV Loop Phases"]
        A["A: MV Closes (EDV)"] --> B["B: AV Opens"]
        B --> C["C: AV Closes (ESV)"]
        C --> D["D: MV Opens"]
        D --> A
    end
    subgraph Parameters["Key Parameters"]
        P1["SV = EDV - ESV"]
        P2["EF = SV/EDV"]
        P3["Stroke Work = Loop Area"]
    end`,
};

// =============================================================================
// RESPIRATORY PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Oxygen-Hemoglobin Dissociation Curve template
 */
export const oxygenDissociationCurve: DiagramTemplate = {
  id: 'physio-o2-dissociation',
  name: 'Oxygen-Hemoglobin Dissociation Curve',
  description: 'Sigmoid curve showing O2-Hb binding relationship with right/left shifts',
  domain: 'biology',
  promptTemplate: `Create an oxygen-hemoglobin dissociation curve showing:
- Normal curve parameters: {{normalCurve}}
- P50 value: {{p50Value}}
- Right shift factors: {{rightShiftFactors}}
- Left shift factors: {{leftShiftFactors}}
- Bohr effect: {{bohrEffect}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Pathophysiology: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'normalCurve',
    'p50Value',
    'rightShiftFactors',
    'leftShiftFactors',
    'bohrEffect',
    'clinicalSignificance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("O₂-Hb Curve")] --> B{"Shift Direction?"}
    B -->|"Right Shift"| C["↓ Affinity\\n↑ O₂ Unloading"]
    B -->|"Left Shift"| D["↑ Affinity\\n↓ O₂ Unloading"]
    C --> E["↑ Temp, ↑ CO₂\\n↑ 2,3-DPG, ↓ pH"]
    D --> F["↓ Temp, ↓ CO₂\\n↓ 2,3-DPG, ↑ pH\\nCO, Fetal Hb"]
    style C fill:#DC143C,color:#fff
    style D fill:#4169E1,color:#fff`,
};

/**
 * V/Q Matching template
 */
export const vqMatching: DiagramTemplate = {
  id: 'physio-vq-matching',
  name: 'V/Q Matching',
  description: 'Ventilation-perfusion relationship across lung zones',
  domain: 'biology',
  promptTemplate: `Create a V/Q matching diagram showing:
- Lung zones: {{lungZones}}
- V/Q ratio at apex: {{apexRatio}}
- V/Q ratio at base: {{baseRatio}}
- V/Q mismatch types: {{mismatchTypes}}
- Shunt vs dead space: {{shuntDeadSpace}}
- Hypoxic vasoconstriction: {{hypoxicVasoconstriction}}
{{#additionalNotes}}Pathological examples: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lungZones',
    'apexRatio',
    'baseRatio',
    'mismatchTypes',
    'shuntDeadSpace',
    'hypoxicVasoconstriction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Lung["Lung V/Q Distribution"]
        A["Apex: V/Q ~3.0\\nHigh V, Low Q"]
        B["Middle: V/Q ~1.0\\nOptimal matching"]
        C["Base: V/Q ~0.6\\nLow V, High Q"]
    end
    subgraph Mismatch["V/Q Mismatch"]
        D["V/Q → 0 = Shunt"]
        E["V/Q → ∞ = Dead Space"]
    end
    style B fill:#228B22,color:#fff
    style D fill:#DC143C,color:#fff`,
};

/**
 * Spirometry template
 */
export const spirometryTemplate: DiagramTemplate = {
  id: 'physio-spirometry',
  name: 'Spirometry and Lung Volumes',
  description: 'Lung volumes and capacities with spirometry trace interpretation',
  domain: 'biology',
  promptTemplate: `Create a spirometry diagram showing:
- Tidal volume: {{tidalVolume}}
- Inspiratory reserve: {{inspiratoryReserve}}
- Expiratory reserve: {{expiratoryReserve}}
- Residual volume: {{residualVolume}}
- Capacities: {{capacities}}
- Pattern type: {{patternType}}
{{#additionalNotes}}Clinical interpretation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tidalVolume',
    'inspiratoryReserve',
    'expiratoryReserve',
    'residualVolume',
    'capacities',
    'patternType',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Volumes["Lung Volumes"]
        TV["TV: ~500 mL"]
        IRV["IRV: ~3000 mL"]
        ERV["ERV: ~1100 mL"]
        RV["RV: ~1200 mL"]
    end
    subgraph Capacities["Lung Capacities"]
        IC["IC = TV + IRV"]
        FRC["FRC = ERV + RV"]
        VC["VC = TV + IRV + ERV"]
        TLC["TLC = VC + RV"]
    end`,
};

// =============================================================================
// RENAL PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Nephron Function template
 */
export const nephronFunction: DiagramTemplate = {
  id: 'physio-nephron-function',
  name: 'Nephron Function',
  description: 'Filtration, reabsorption, and secretion along the nephron segments',
  domain: 'biology',
  promptTemplate: `Create a nephron function diagram showing:
- Glomerular filtration: {{glomerularFiltration}}
- Proximal tubule: {{proximalTubule}}
- Loop of Henle: {{loopOfHenle}}
- Distal tubule: {{distalTubule}}
- Collecting duct: {{collectingDuct}}
- Substances handled: {{substancesHandled}}
{{#additionalNotes}}Transport mechanisms: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glomerularFiltration',
    'proximalTubule',
    'loopOfHenle',
    'distalTubule',
    'collectingDuct',
    'substancesHandled',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Glomerulus\\nGFR 125 mL/min")] --> B["PCT\\n65% reabsorption"]
    B --> C["Thin Descending\\nH₂O out"]
    C --> D["Thick Ascending\\nNaCl out"]
    D --> E["DCT\\nNaCl, Ca²⁺"]
    E --> F["Collecting Duct\\nADH-dependent H₂O"]
    F --> G[("Urine\\n1-2 mL/min")]
    style A fill:#DC143C,color:#fff
    style G fill:#FFD700,color:#000`,
};

/**
 * RAAS System template
 */
export const raasSystem: DiagramTemplate = {
  id: 'physio-raas-system',
  name: 'Renin-Angiotensin-Aldosterone System',
  description: 'RAAS cascade with stimuli, effectors, and physiological effects',
  domain: 'biology',
  promptTemplate: `Create a RAAS system diagram showing:
- Triggers for renin release: {{reninTriggers}}
- Angiotensinogen to Ang I: {{angIConversion}}
- ACE conversion: {{aceConversion}}
- Angiotensin II effects: {{angIIEffects}}
- Aldosterone effects: {{aldosteroneEffects}}
- Feedback inhibition: {{feedbackInhibition}}
{{#additionalNotes}}Drug targets: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reninTriggers',
    'angIConversion',
    'aceConversion',
    'angIIEffects',
    'aldosteroneEffects',
    'feedbackInhibition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["↓ BP, ↓ Na⁺, SNS"] --> B["JG Cells"]
    B -->|"Renin"| C["Angiotensinogen→Ang I"]
    C -->|"ACE (lung)"| D["Angiotensin II"]
    D --> E["Vasoconstriction"]
    D --> F["Aldosterone Release"]
    D --> G["ADH Release"]
    D --> H["Thirst"]
    E & F & G & H --> I["↑ BP"]
    I -.->|"(-)"| B
    style D fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Countercurrent Mechanism template
 */
export const countercurrentMechanism: DiagramTemplate = {
  id: 'physio-countercurrent',
  name: 'Countercurrent Mechanism',
  description: 'Medullary concentration gradient establishment by loop of Henle',
  domain: 'biology',
  promptTemplate: `Create a countercurrent mechanism diagram showing:
- Descending limb permeability: {{descendingLimb}}
- Ascending limb transport: {{ascendingLimb}}
- Medullary gradient: {{medullaryGradient}}
- Vasa recta role: {{vasaRecta}}
- Urea recycling: {{ureaRecycling}}
- Final urine concentration: {{urineConcentration}}
{{#additionalNotes}}Regulation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'descendingLimb',
    'ascendingLimb',
    'medullaryGradient',
    'vasaRecta',
    'ureaRecycling',
    'urineConcentration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortex["Cortex ~300 mOsm"]
        A["PCT"]
    end
    subgraph Outer["Outer Medulla"]
        B["↓ Desc: H₂O out"]
        C["↑ Asc: NaCl out"]
    end
    subgraph Inner["Inner Medulla ~1200 mOsm"]
        D["Hairpin Turn"]
    end
    A --> B --> D --> C
    C --> E["DCT + CD"]
    style D fill:#8B4513,color:#fff`,
};

// =============================================================================
// NEUROPHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Action Potential template
 */
export const actionPotential: DiagramTemplate = {
  id: 'physio-action-potential',
  name: 'Action Potential',
  description: 'Neuronal action potential phases with ionic currents',
  domain: 'biology',
  promptTemplate: `Create an action potential diagram showing:
- Resting potential: {{restingPotential}}
- Threshold: {{threshold}}
- Depolarization phase: {{depolarization}}
- Repolarization phase: {{repolarization}}
- Afterhyperpolarization: {{afterhyperpolarization}}
- Refractory periods: {{refractoryPeriods}}
{{#additionalNotes}}Ion channel states: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'restingPotential',
    'threshold',
    'depolarization',
    'repolarization',
    'afterhyperpolarization',
    'refractoryPeriods',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Resting\\n-70mV"] --> B["Threshold\\n-55mV"]
    B --> C["Depolarization\\n+30mV"]
    C --> D["Repolarization"]
    D --> E["Hyperpolarization\\n-90mV"]
    E --> A
    subgraph Channels["Ion Channels"]
        F["Na⁺: Opens fast, inactivates"]
        G["K⁺: Opens slow, delayed"]
    end
    style C fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

/**
 * Synaptic Transmission template
 */
export const synapticTransmission: DiagramTemplate = {
  id: 'physio-synaptic-transmission',
  name: 'Synaptic Transmission',
  description: 'Steps of chemical synaptic transmission',
  domain: 'biology',
  promptTemplate: `Create a synaptic transmission diagram showing:
- Action potential arrival: {{apArrival}}
- Calcium influx: {{calciumInflux}}
- Vesicle fusion: {{vesicleFusion}}
- Neurotransmitter release: {{ntRelease}}
- Receptor binding: {{receptorBinding}}
- Postsynaptic response: {{postsynapticResponse}}
{{#additionalNotes}}Termination mechanisms: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'apArrival',
    'calciumInflux',
    'vesicleFusion',
    'ntRelease',
    'receptorBinding',
    'postsynapticResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["AP arrives at terminal"] --> B["Ca²⁺ channels open"]
    B --> C["Ca²⁺ influx"]
    C --> D["Vesicle fusion with membrane"]
    D --> E["NT release into cleft"]
    E --> F["NT binds postsynaptic receptors"]
    F --> G{"Receptor type?"}
    G -->|"Ionotropic"| H["Fast: Ion flux"]
    G -->|"Metabotropic"| I["Slow: 2nd messenger"]
    style C fill:#FFD700,color:#000
    style E fill:#228B22,color:#fff`,
};

// =============================================================================
// MUSCLE PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Sliding Filament Model template
 */
export const slidingFilamentModel: DiagramTemplate = {
  id: 'physio-sliding-filament',
  name: 'Sliding Filament Model',
  description: 'Muscle contraction via actin-myosin cross-bridge cycling',
  domain: 'biology',
  promptTemplate: `Create a sliding filament diagram showing:
- Sarcomere structure: {{sarcomereStructure}}
- Actin filaments: {{actinFilaments}}
- Myosin filaments: {{myosinFilaments}}
- Cross-bridge cycle: {{crossBridgeCycle}}
- ATP role: {{atpRole}}
- Calcium regulation: {{calciumRegulation}}
{{#additionalNotes}}Force generation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sarcomereStructure',
    'actinFilaments',
    'myosinFilaments',
    'crossBridgeCycle',
    'atpRole',
    'calciumRegulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CrossBridge["Cross-Bridge Cycle"]
        A["ATP binds myosin\\n→ Detachment"] --> B["ATP→ADP+Pi\\n→ Cocking"]
        B --> C["Ca²⁺ exposes binding site\\n→ Attachment"]
        C --> D["Pi release\\n→ Power Stroke"]
        D --> E["ADP release"]
        E --> A
    end
    style D fill:#DC143C,color:#fff`,
};

/**
 * Excitation-Contraction Coupling template
 */
export const excitationContractionCoupling: DiagramTemplate = {
  id: 'physio-ec-coupling',
  name: 'Excitation-Contraction Coupling',
  description: 'From action potential to muscle contraction',
  domain: 'biology',
  promptTemplate: `Create an E-C coupling diagram showing:
- Action potential propagation: {{apPropagation}}
- T-tubule depolarization: {{tTubule}}
- SR calcium release: {{srCalciumRelease}}
- Troponin-tropomyosin: {{troponinTropomyosin}}
- Cross-bridge formation: {{crossBridgeFormation}}
- Relaxation: {{relaxation}}
{{#additionalNotes}}Muscle fiber types: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'apPropagation',
    'tTubule',
    'srCalciumRelease',
    'troponinTropomyosin',
    'crossBridgeFormation',
    'relaxation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["AP at NMJ"] --> B["Sarcolemma depolarization"]
    B --> C["T-tubule signal"]
    C --> D["DHPR activation"]
    D --> E["RyR opens on SR"]
    E --> F["Ca²⁺ release"]
    F --> G["Ca²⁺ binds troponin C"]
    G --> H["Tropomyosin shifts"]
    H --> I["Actin-myosin binding"]
    I --> J["CONTRACTION"]
    J -->|"SERCA"| K["Ca²⁺ reuptake"]
    K --> L["RELAXATION"]
    style J fill:#DC143C,color:#fff
    style L fill:#4169E1,color:#fff`,
};

// =============================================================================
// ENDOCRINE PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Hypothalamic-Pituitary Axis template
 */
export const hypothalamicPituitaryAxis: DiagramTemplate = {
  id: 'physio-hpa-axis',
  name: 'Hypothalamic-Pituitary Axis',
  description: 'Neuroendocrine control pathways with feedback loops',
  domain: 'biology',
  promptTemplate: `Create an HPA axis diagram showing:
- Hypothalamic hormones: {{hypothalamicHormones}}
- Anterior pituitary hormones: {{anteriorPituitary}}
- Target gland hormones: {{targetGland}}
- Long feedback loop: {{longFeedback}}
- Short feedback loop: {{shortFeedback}}
- Ultra-short feedback: {{ultraShortFeedback}}
{{#additionalNotes}}Clinical disorders: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hypothalamicHormones',
    'anteriorPituitary',
    'targetGland',
    'longFeedback',
    'shortFeedback',
    'ultraShortFeedback',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hypothalamus"] -->|"CRH"| B["Anterior Pituitary"]
    B -->|"ACTH"| C["Adrenal Cortex"]
    C -->|"Cortisol"| D["Target Tissues"]
    C -.->|"(-) Long loop"| A
    C -.->|"(-)"| B
    B -.->|"(-) Short loop"| A
    style A fill:#4169E1,color:#fff
    style C fill:#228B22,color:#fff`,
};

/**
 * Insulin-Glucose Regulation template
 */
export const insulinGlucoseRegulation: DiagramTemplate = {
  id: 'physio-insulin-glucose',
  name: 'Insulin-Glucose Regulation',
  description: 'Blood glucose homeostasis via insulin and glucagon',
  domain: 'biology',
  promptTemplate: `Create an insulin-glucose regulation diagram showing:
- Glucose sensing: {{glucoseSensing}}
- Beta cell response: {{betaCellResponse}}
- Insulin effects: {{insulinEffects}}
- Alpha cell response: {{alphaCellResponse}}
- Glucagon effects: {{glucagonEffects}}
- Tissue responses: {{tissueResponses}}
{{#additionalNotes}}Pathophysiology: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glucoseSensing',
    'betaCellResponse',
    'insulinEffects',
    'alphaCellResponse',
    'glucagonEffects',
    'tissueResponses',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Blood Glucose")] --> B{"Level?"}
    B -->|"HIGH"| C["β-cells"]
    C -->|"Insulin"| D["↑ Glucose uptake"]
    D --> E["↓ Blood glucose"]
    B -->|"LOW"| F["α-cells"]
    F -->|"Glucagon"| G["↑ Glycogenolysis\\n↑ Gluconeogenesis"]
    G --> H["↑ Blood glucose"]
    E & H --> I["Normal: 70-100 mg/dL"]
    style C fill:#228B22,color:#fff
    style F fill:#DC143C,color:#fff`,
};

// =============================================================================
// METABOLISM TEMPLATES
// =============================================================================

/**
 * Cellular Respiration Overview template
 */
export const cellularRespirationOverview: DiagramTemplate = {
  id: 'physio-cellular-respiration',
  name: 'Cellular Respiration Overview',
  description: 'Complete pathway from glucose to ATP',
  domain: 'biology',
  promptTemplate: `Create a cellular respiration overview showing:
- Glycolysis: {{glycolysis}}
- Pyruvate oxidation: {{pyruvateOxidation}}
- Krebs cycle: {{krebsCycle}}
- Electron transport chain: {{etc}}
- ATP yield: {{atpYield}}
- Oxygen role: {{oxygenRole}}
{{#additionalNotes}}Anaerobic conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glycolysis',
    'pyruvateOxidation',
    'krebsCycle',
    'etc',
    'atpYield',
    'oxygenRole',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Glucose"] -->|"Glycolysis\\n(Cytoplasm)"| B["2 Pyruvate\\n+2 ATP, +2 NADH"]
    B -->|"Pyruvate oxidation"| C["2 Acetyl-CoA\\n+2 NADH"]
    C -->|"Krebs Cycle\\n(Mitochondria)"| D["+2 ATP\\n+6 NADH\\n+2 FADH₂"]
    D -->|"ETC + Ox Phos"| E["+32-34 ATP"]
    E --> F["TOTAL: ~36-38 ATP"]
    style A fill:#FFD700,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * Krebs Cycle template
 */
export const krebsCycleTemplate: DiagramTemplate = {
  id: 'physio-krebs-cycle',
  name: 'Krebs Cycle (TCA Cycle)',
  description: 'Citric acid cycle intermediates and energy carriers',
  domain: 'biology',
  promptTemplate: `Create a Krebs cycle diagram showing:
- Entry point: {{entryPoint}}
- Cycle intermediates: {{intermediates}}
- CO2 release: {{co2Release}}
- NADH production: {{nadhProduction}}
- FADH2 production: {{fadh2Production}}
- GTP/ATP production: {{gtpProduction}}
{{#additionalNotes}}Anaplerotic reactions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'entryPoint',
    'intermediates',
    'co2Release',
    'nadhProduction',
    'fadh2Production',
    'gtpProduction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acetyl-CoA"] --> B["Citrate"]
    B --> C["Isocitrate"]
    C -->|"NADH, CO₂"| D["α-Ketoglutarate"]
    D -->|"NADH, CO₂"| E["Succinyl-CoA"]
    E -->|"GTP"| F["Succinate"]
    F -->|"FADH₂"| G["Fumarate"]
    G --> H["Malate"]
    H -->|"NADH"| I["Oxaloacetate"]
    I --> A
    style A fill:#FFD700,color:#000
    style I fill:#4169E1,color:#fff`,
};

// =============================================================================
// ACID-BASE TEMPLATES
// =============================================================================

/**
 * Acid-Base Disorders template
 */
export const acidBaseDisorders: DiagramTemplate = {
  id: 'physio-acid-base-disorders',
  name: 'Acid-Base Disorders',
  description: 'Classification and compensation of acid-base disturbances',
  domain: 'biology',
  promptTemplate: `Create an acid-base disorders diagram showing:
- Primary disorder: {{primaryDisorder}}
- pH change: {{phChange}}
- Primary parameter: {{primaryParameter}}
- Compensation mechanism: {{compensation}}
- Expected compensation: {{expectedCompensation}}
- Common causes: {{commonCauses}}
{{#additionalNotes}}Clinical assessment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryDisorder',
    'phChange',
    'primaryParameter',
    'compensation',
    'expectedCompensation',
    'commonCauses',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("ABG Analysis")] --> B{"pH?"}
    B -->|"< 7.35"| C["Acidemia"]
    B -->|"> 7.45"| D["Alkalemia"]
    C --> E{"Primary?"}
    D --> F{"Primary?"}
    E -->|"↑PCO₂"| G["Respiratory Acidosis\\nComp: ↑HCO₃⁻"]
    E -->|"↓HCO₃⁻"| H["Metabolic Acidosis\\nComp: ↓PCO₂"]
    F -->|"↓PCO₂"| I["Respiratory Alkalosis\\nComp: ↓HCO₃⁻"]
    F -->|"↑HCO₃⁻"| J["Metabolic Alkalosis\\nComp: ↑PCO₂"]
    style G fill:#DC143C,color:#fff
    style H fill:#FF6347,color:#fff
    style I fill:#4169E1,color:#fff
    style J fill:#6495ED,color:#fff`,
};

// =============================================================================
// FLUID AND ELECTROLYTE TEMPLATES
// =============================================================================

/**
 * Body Fluid Compartments template
 */
export const bodyFluidCompartments: DiagramTemplate = {
  id: 'physio-fluid-compartments',
  name: 'Body Fluid Compartments',
  description: 'Distribution of body water and electrolytes across compartments',
  domain: 'biology',
  promptTemplate: `Create a body fluid compartments diagram showing:
- Total body water: {{totalBodyWater}}
- ICF volume and composition: {{icfComposition}}
- ECF volume and composition: {{ecfComposition}}
- Plasma volume: {{plasmaVolume}}
- Interstitial volume: {{interstitialVolume}}
- Osmolality equilibrium: {{osmolalityEquilibrium}}
{{#additionalNotes}}Clinical implications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'totalBodyWater',
    'icfComposition',
    'ecfComposition',
    'plasmaVolume',
    'interstitialVolume',
    'osmolalityEquilibrium',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Total Body Water\\n60% body weight"] --> B["ICF 40%\\n(2/3 TBW)"]
    A --> C["ECF 20%\\n(1/3 TBW)"]
    C --> D["Interstitial 15%"]
    C --> E["Plasma 5%"]
    C --> F["Transcellular 1%"]
    subgraph Composition["Dominant Ions"]
        G["ICF: K⁺, Mg²⁺, PO₄³⁻"]
        H["ECF: Na⁺, Cl⁻, HCO₃⁻"]
    end
    style B fill:#4169E1,color:#fff
    style C fill:#228B22,color:#fff`,
};

/**
 * Starling Forces template
 */
export const starlingForcesTemplate: DiagramTemplate = {
  id: 'physio-starling-forces',
  name: 'Starling Forces',
  description: 'Capillary fluid exchange governed by hydrostatic and oncotic pressures',
  domain: 'biology',
  promptTemplate: `Create a Starling forces diagram showing:
- Capillary hydrostatic pressure: {{capillaryHydrostatic}}
- Interstitial hydrostatic pressure: {{interstitialHydrostatic}}
- Plasma oncotic pressure: {{plasmaOncotic}}
- Interstitial oncotic pressure: {{interstitialOncotic}}
- Net filtration pressure: {{netFiltration}}
- Edema formation: {{edemaFormation}}
{{#additionalNotes}}Clinical examples: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'capillaryHydrostatic',
    'interstitialHydrostatic',
    'plasmaOncotic',
    'interstitialOncotic',
    'netFiltration',
    'edemaFormation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Arteriolar["Arteriolar End"]
        A["Pc = 35 mmHg\\nπc = 25 mmHg"]
        B["NFP = +10\\n→ Filtration"]
    end
    subgraph Venular["Venular End"]
        C["Pc = 15 mmHg\\nπc = 25 mmHg"]
        D["NFP = -10\\n→ Absorption"]
    end
    A --> C
    style B fill:#DC143C,color:#fff
    style D fill:#4169E1,color:#fff`,
};

// =============================================================================
// THERMOREGULATION TEMPLATES
// =============================================================================

/**
 * Temperature Regulation template
 */
export const temperatureRegulation: DiagramTemplate = {
  id: 'physio-temperature-regulation',
  name: 'Temperature Regulation',
  description: 'Hypothalamic thermoregulation with heat gain and loss mechanisms',
  domain: 'biology',
  promptTemplate: `Create a temperature regulation diagram showing:
- Set point: {{setPoint}}
- Thermoreceptors: {{thermoreceptors}}
- Hypothalamic integration: {{hypothalamicIntegration}}
- Heat gain mechanisms: {{heatGain}}
- Heat loss mechanisms: {{heatLoss}}
- Fever mechanism: {{feverMechanism}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'setPoint',
    'thermoreceptors',
    'hypothalamicIntegration',
    'heatGain',
    'heatLoss',
    'feverMechanism',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Temperature Sensors"] --> B["Hypothalamus\\nSet Point: 37°C"]
    B --> C{"T° vs Set Point?"}
    C -->|"T° > Set Point"| D["Heat Loss Responses"]
    D --> D1["Vasodilation"]
    D --> D2["Sweating"]
    D --> D3["Behavioral cooling"]
    C -->|"T° < Set Point"| E["Heat Gain Responses"]
    E --> E1["Vasoconstriction"]
    E --> E2["Shivering"]
    E --> E3["↑ Metabolism"]
    style B fill:#FFD700,color:#000
    style D fill:#4169E1,color:#fff
    style E fill:#DC143C,color:#fff`,
};

// =============================================================================
// ADDITIONAL PHYSIOLOGY TEMPLATES
// =============================================================================

/**
 * Autonomic Nervous System template
 */
export const physiologyAutonomicNS: DiagramTemplate = {
  id: 'physio-autonomic-ns',
  name: 'Autonomic Nervous System',
  description: 'Sympathetic and parasympathetic divisions with target organs',
  domain: 'biology',
  promptTemplate: `Create an autonomic nervous system diagram showing:
- Central control: {{centralControl}}
- Sympathetic division: {{sympatheticDivision}}
- Parasympathetic division: {{parasympatheticDivision}}
- Neurotransmitters: {{neurotransmitters}}
- Target organs: {{targetOrgans}}
- Physiological effects: {{effects}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'centralControl',
    'sympatheticDivision',
    'parasympatheticDivision',
    'neurotransmitters',
    'targetOrgans',
    'effects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hypothalamus"] --> B["Brainstem"]
    B --> C["Sympathetic"]
    B --> D["Parasympathetic"]
    C --> E["Fight or Flight\\nNE, Epi"]
    D --> F["Rest and Digest\\nACh"]
    E --> G["↑HR, ↑BP, ↑Glucose"]
    F --> H["↓HR, ↑Digestion"]
    style C fill:#DC143C,color:#fff
    style D fill:#4169E1,color:#fff`,
};

/**
 * Reflex Arc template
 */
export const reflexArc: DiagramTemplate = {
  id: 'physio-reflex-arc',
  name: 'Reflex Arc',
  description: 'Components of somatic and autonomic reflex pathways',
  domain: 'biology',
  promptTemplate: `Create a reflex arc diagram showing:
- Sensory receptor: {{sensoryReceptor}}
- Afferent neuron: {{afferentNeuron}}
- Integration center: {{integrationCenter}}
- Efferent neuron: {{efferentNeuron}}
- Effector: {{effector}}
- Example reflex: {{exampleReflex}}
{{#additionalNotes}}Clinical testing: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sensoryReceptor',
    'afferentNeuron',
    'integrationCenter',
    'efferentNeuron',
    'effector',
    'exampleReflex',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Stimulus"] --> B["Receptor"]
    B --> C["Sensory Neuron"]
    C --> D["Integration\\n(Spinal Cord)"]
    D --> E["Motor Neuron"]
    E --> F["Effector\\n(Muscle)"]
    F --> G["Response"]
    style D fill:#9370DB,color:#fff`,
};

/**
 * Sodium-Potassium Pump template
 */
export const sodiumPotassiumPump: DiagramTemplate = {
  id: 'physio-na-k-pump',
  name: 'Sodium-Potassium ATPase',
  description: 'Na+/K+-ATPase pump mechanism and cellular importance',
  domain: 'biology',
  promptTemplate: `Create a Na+/K+-ATPase pump diagram showing:
- Pump structure: {{pumpStructure}}
- ATP binding site: {{atpBinding}}
- Ion binding sites: {{ionBinding}}
- Transport stoichiometry: {{stoichiometry}}
- Conformational changes: {{conformationalChanges}}
- Physiological importance: {{importance}}
{{#additionalNotes}}Drug effects: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pumpStructure',
    'atpBinding',
    'ionBinding',
    'stoichiometry',
    'conformationalChanges',
    'importance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cycle["Na+/K+-ATPase Cycle"]
        A["3 Na⁺ bind inside"] --> B["ATP→ADP+Pi"]
        B --> C["Conformational change"]
        C --> D["3 Na⁺ released outside"]
        D --> E["2 K⁺ bind outside"]
        E --> F["Pi released"]
        F --> G["2 K⁺ released inside"]
        G --> A
    end
    style B fill:#FFD700,color:#000`,
};

/**
 * Oxygen Cascade template
 */
export const oxygenCascade: DiagramTemplate = {
  id: 'physio-oxygen-cascade',
  name: 'Oxygen Cascade',
  description: 'Stepwise decrease in PO2 from atmosphere to mitochondria',
  domain: 'biology',
  promptTemplate: `Create an oxygen cascade diagram showing:
- Atmospheric PO2: {{atmosphericPO2}}
- Alveolar PO2: {{alveolarPO2}}
- Arterial PO2: {{arterialPO2}}
- Capillary PO2: {{capillaryPO2}}
- Tissue PO2: {{tissuePO2}}
- Mitochondrial PO2: {{mitochondrialPO2}}
{{#additionalNotes}}Pathological changes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'atmosphericPO2',
    'alveolarPO2',
    'arterialPO2',
    'capillaryPO2',
    'tissuePO2',
    'mitochondrialPO2',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Atmosphere\\n160 mmHg"] --> B["Alveoli\\n100 mmHg"]
    B --> C["Arterial Blood\\n95 mmHg"]
    C --> D["Capillaries\\n40-95 mmHg"]
    D --> E["Tissues\\n20-40 mmHg"]
    E --> F["Mitochondria\\n1-5 mmHg"]
    style A fill:#87CEEB,color:#000
    style F fill:#DC143C,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All physiology templates
 */
export const physiologyTemplates: DiagramTemplate[] = [
  // Cardiovascular
  cardiacCycleDiagram,
  frankStarlingMechanism,
  pressureVolumeLooP,
  // Respiratory
  oxygenDissociationCurve,
  vqMatching,
  spirometryTemplate,
  oxygenCascade,
  // Renal
  nephronFunction,
  raasSystem,
  countercurrentMechanism,
  // Neurophysiology
  actionPotential,
  synapticTransmission,
  reflexArc,
  physiologyAutonomicNS,
  // Muscle
  slidingFilamentModel,
  excitationContractionCoupling,
  // Endocrine
  hypothalamicPituitaryAxis,
  insulinGlucoseRegulation,
  // Metabolism
  cellularRespirationOverview,
  krebsCycleTemplate,
  // Acid-Base
  acidBaseDisorders,
  // Fluid/Electrolyte
  bodyFluidCompartments,
  starlingForcesTemplate,
  sodiumPotassiumPump,
  // Thermoregulation
  temperatureRegulation,
];

export default physiologyTemplates;
