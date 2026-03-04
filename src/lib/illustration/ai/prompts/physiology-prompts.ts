/**
 * physiology-prompts.ts
 * Physiology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for physiological sciences including:
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
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PHYSIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base physiology domain prompt for physiological diagrams
 */
export const PHYSIOLOGY_DOMAIN_PROMPT = `
Physiology diagram requirements:
- Use standard physiological terminology and units
- Include normal values and ranges where applicable
- Show cause-and-effect relationships clearly
- Use appropriate arrows for stimulation (+) and inhibition (-)
- Color code: Red for oxygenated/excitatory, Blue for deoxygenated/inhibitory
- Include feedback loops with clear directionality
- Reference homeostatic set points
- Show time courses and phases where relevant
- Use standard curves (sigmoid for O2-Hb, exponential for kinetics)
- Include relevant equations (Fick, Henderson-Hasselbalch, Nernst)`;

// =============================================================================
// PHYSIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const PHYSIOLOGY_PROMPTS = {
  // Cardiovascular Physiology
  cardiacCycle: `
Cardiac Cycle diagram requirements:
- Include all phases: atrial systole, isovolumic contraction, ejection, isovolumic relaxation, rapid filling, diastasis
- Show pressure curves for aorta, LV, LA
- Correlate with ECG (P, QRS, T waves)
- Include heart sounds (S1, S2) timing
- Show valve opening and closing events
- Reference normal pressures and volumes
- Include Wiggers diagram format`,

  frankStarling: `
Frank-Starling Mechanism diagram requirements:
- X-axis: End-diastolic volume (preload) or LVEDP
- Y-axis: Stroke volume or cardiac output
- Show normal operating curve
- Illustrate positive inotropy (shift up and left)
- Illustrate negative inotropy (shift down and right)
- Mark normal operating point
- Reference molecular mechanism (sarcomere length-tension)
- Include clinical examples (exercise, heart failure)`,

  pressureVolume: `
Pressure-Volume Loop requirements:
- Clear ABCD points (MV close, AV open, AV close, MV open)
- ESPVR and EDPVR lines
- Calculate stroke volume (width of loop)
- Show ejection fraction calculation
- Demonstrate preload changes (horizontal shift)
- Demonstrate afterload changes (loop shape)
- Demonstrate contractility changes (ESPVR slope)
- Include stroke work (loop area)`,

  // Respiratory Physiology
  oxygenHemoglobin: `
Oxygen-Hemoglobin Dissociation Curve requirements:
- X-axis: PO2 (mmHg)
- Y-axis: O2 saturation (%)
- Sigmoid shape with P50 at ~27 mmHg
- Show right shift factors (↑temp, ↑CO2, ↑2,3-DPG, ↓pH)
- Show left shift factors (↓temp, ↓CO2, ↓2,3-DPG, ↑pH, CO, fetal Hb)
- Explain Bohr effect mechanism
- Include clinical significance (tissue O2 delivery)
- Show cooperative binding concept`,

  vqMatching: `
V/Q Matching diagram requirements:
- Show lung zone distribution (West zones)
- V/Q ratio at apex (~3.0) vs base (~0.6)
- Illustrate shunt (V/Q → 0) vs dead space (V/Q → ∞)
- Include hypoxic pulmonary vasoconstriction
- Show A-a gradient concept
- Reference normal V/Q = 0.8
- Include pathological examples (PE, atelectasis, pneumonia)`,

  respiratoryControl: `
Respiratory Control requirements:
- Show medullary respiratory centers (DRG, VRG)
- Include pontine centers (pneumotaxic, apneustic)
- Central chemoreceptors (H+, CO2 via CSF)
- Peripheral chemoreceptors (carotid, aortic bodies)
- Hering-Breuer reflex
- Show normal ventilatory response curves
- Include hypoxic drive in COPD`,

  // Renal Physiology
  nephronFunction: `
Nephron Function diagram requirements:
- Show all segments: glomerulus, PCT, loop of Henle, DCT, CD
- Include GFR calculation (GFR = Kf × Net filtration pressure)
- Reabsorption percentages by segment
- Secretion processes (PAH, H+, K+)
- Transport mechanisms (primary/secondary active, passive)
- Hormone effects (ADH, aldosterone, PTH, ANP)
- Clearance concepts`,

  countercurrent: `
Countercurrent Mechanism requirements:
- Show countercurrent multiplier (loop of Henle)
- Medullary osmotic gradient (300 → 1200 mOsm)
- Vasa recta as countercurrent exchanger
- Urea recycling contribution
- Water permeability differences by segment
- ADH effects on collecting duct
- Urine concentration range (50-1200 mOsm)`,

  raasSystem: `
RAAS System requirements:
- Triggers: ↓BP, ↓Na+, SNS activation
- Renin release from JG cells
- Angiotensinogen → Ang I (renin) → Ang II (ACE)
- Ang II effects: vasoconstriction, aldosterone, ADH, thirst, Na+ reabsorption
- Aldosterone effects on principal cells
- Negative feedback loops
- Drug targets (ACEi, ARB, aldosterone antagonists)`,

  // Neurophysiology
  actionPotential: `
Action Potential requirements:
- Show resting potential (-70mV)
- Threshold (-55mV)
- Depolarization phase (Na+ influx)
- Peak (+30mV)
- Repolarization phase (K+ efflux)
- Hyperpolarization (-90mV)
- Refractory periods (absolute and relative)
- Ion channel states (closed, open, inactivated)`,

  synapticTransmission: `
Synaptic Transmission requirements:
- Action potential arrival at terminal
- Ca2+ influx through voltage-gated channels
- Vesicle fusion (SNARE proteins)
- Neurotransmitter release
- Receptor binding (ionotropic vs metabotropic)
- Postsynaptic potential generation
- Termination mechanisms (reuptake, enzymatic, diffusion)
- EPSP and IPSP integration`,

  // Muscle Physiology
  excitationContraction: `
Excitation-Contraction Coupling requirements:
- Action potential at sarcolemma
- T-tubule depolarization
- DHPR activation
- RyR opening on SR
- Ca2+ release into cytoplasm
- Ca2+ binding to troponin C
- Tropomyosin movement exposing binding sites
- Cross-bridge cycling
- SERCA-mediated Ca2+ reuptake`,

  crossBridgeCycle: `
Cross-Bridge Cycle requirements:
- ATP binding to myosin head (detachment)
- ATP hydrolysis → ADP + Pi (cocking)
- Ca2+-enabled binding to actin (attachment)
- Pi release (power stroke initiation)
- ADP release (power stroke completion)
- Rigor state until new ATP binds
- Include force-velocity relationship
- Explain tetanus and summation`,

  // Endocrine Physiology
  feedbackLoops: `
Hormone Feedback Loop requirements:
- Hypothalamic releasing hormone
- Pituitary tropic hormone
- Target gland hormone
- Long feedback loop (target → hypothalamus)
- Short feedback loop (target → pituitary)
- Ultra-short feedback (hypothalamus self-inhibition)
- Show stimulatory (+) and inhibitory (-) effects
- Examples: HPA, HPT, HPG axes`,

  insulinGlucose: `
Insulin-Glucose Regulation requirements:
- Blood glucose sensing by beta cells
- GLUT2 transporter and glucokinase
- ATP/ADP ratio change
- K-ATP channel closure
- Ca2+ influx and insulin release
- Insulin receptor signaling (tyrosine kinase)
- GLUT4 translocation
- Counter-regulatory hormones (glucagon, cortisol, catecholamines)`,

  // Metabolism
  cellularRespiration: `
Cellular Respiration requirements:
- Glycolysis (cytoplasm): glucose → 2 pyruvate + 2 ATP + 2 NADH
- Pyruvate oxidation: → acetyl-CoA + NADH
- Krebs cycle (matrix): 2 ATP + 6 NADH + 2 FADH2
- ETC (inner membrane): NADH → 2.5 ATP, FADH2 → 1.5 ATP
- Total yield: ~30-32 ATP per glucose
- Oxygen as final electron acceptor
- Anaerobic alternatives (lactate, ethanol)`,

  // Acid-Base
  acidBaseAnalysis: `
Acid-Base Analysis requirements:
- Henderson-Hasselbalch equation: pH = 6.1 + log([HCO3-]/0.03×PCO2)
- Primary disorders identification
- Respiratory vs metabolic differentiation
- Compensation mechanisms and expected values
- Anion gap calculation: Na - (Cl + HCO3)
- Delta-delta ratio for mixed disorders
- Winter's formula for metabolic acidosis compensation
- Common causes for each disorder`,

  // Fluid/Electrolyte
  fluidCompartments: `
Body Fluid Compartments requirements:
- Total body water (60% in males, 55% in females)
- ICF (2/3 of TBW): K+, Mg2+, PO43-
- ECF (1/3 of TBW): Na+, Cl-, HCO3-
- Plasma (5% BW) vs interstitial (15% BW)
- Osmolality equilibrium across compartments
- Starling forces at capillary level
- IV fluid distribution (isotonic, hypotonic, colloid)`,

  // Thermoregulation
  temperatureControl: `
Temperature Regulation requirements:
- Hypothalamic set point (37°C)
- Peripheral and central thermoreceptors
- Heat loss mechanisms: radiation, convection, conduction, evaporation
- Heat gain mechanisms: shivering, vasoconstriction, metabolism
- Fever mechanism (pyrogens → PGE2 → set point elevation)
- Behavioral thermoregulation
- Brown adipose tissue thermogenesis`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Physiology-specific few-shot examples
 */
export const PHYSIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing the cardiac cycle phases and their relationship to pressure changes',
    output: `flowchart TD
    subgraph Systole["Ventricular Systole"]
        A["Isovolumic Contraction\\nMV/TV close (S1)\\nPressure ↑ rapidly"] --> B["Ejection Phase\\nAV/PV open\\nBlood ejected"]
    end

    subgraph Diastole["Ventricular Diastole"]
        C["Isovolumic Relaxation\\nAV/PV close (S2)\\nPressure ↓ rapidly"] --> D["Rapid Filling\\nMV/TV open\\n70% of filling"]
        D --> E["Diastasis\\nSlow passive filling"] --> F["Atrial Systole\\nP wave\\n30% of filling"]
    end

    B --> C
    F --> A

    subgraph Pressures["Typical Pressures"]
        P1["LV: 0-120 mmHg"]
        P2["Aorta: 80-120 mmHg"]
        P3["LA: 5-12 mmHg"]
    end

    style A fill:#DC143C,color:#fff
    style B fill:#FF6347,color:#fff
    style D fill:#4169E1,color:#fff
    style F fill:#9370DB,color:#fff`,
  },
  {
    prompt: 'Create a flowchart showing oxygen delivery from lungs to tissues',
    output: `flowchart TD
    A[("Atmospheric O₂\\n160 mmHg")] --> B["Alveolar O₂\\n~100 mmHg"]
    B --> C["Pulmonary Capillary\\nDiffusion across membrane"]
    C --> D["Hb-O₂ Binding\\n~97% saturation"]

    D --> E["Arterial Blood\\nPaO₂ 95-100 mmHg\\nCaO₂ = (Hb×1.34×SaO₂) + (0.003×PaO₂)"]

    E --> F["Tissue Capillaries"]
    F --> G["O₂ Unloading\\nBohr effect facilitates"]
    G --> H["Mitochondria\\nOxidative phosphorylation"]

    F --> I["Venous Blood\\nPvO₂ ~40 mmHg\\n~75% saturation"]

    subgraph Delivery["O₂ Delivery"]
        J["DO₂ = CO × CaO₂"]
        K["Normal: ~1000 mL/min"]
    end

    subgraph Consumption["O₂ Consumption"]
        L["VO₂ = CO × (CaO₂ - CvO₂)"]
        M["Normal: ~250 mL/min"]
    end

    style A fill:#87CEEB,color:#000
    style D fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a diagram of the nephron showing filtration, reabsorption, and secretion',
    output: `flowchart TD
    A[("Glomerulus\\nGFR: 180 L/day")] -->|"Filtration"| B["Bowman's Capsule"]
    B --> C["PCT\\n65% reabsorption"]

    C --> D["Thin Descending Limb\\nH₂O permeable\\nNaCl impermeable"]
    D --> E["Thin Ascending Limb\\nH₂O impermeable"]
    E --> F["Thick Ascending Limb\\nNa-K-2Cl cotransporter\\nDiluting segment"]

    F --> G["DCT\\nNa-Cl cotransporter\\nCa²⁺ reabsorption (PTH)"]
    G --> H["Collecting Duct\\nADH → H₂O reabsorption\\nAldosterone → Na⁺ reabsorption"]

    H --> I[("Final Urine\\n1-2 L/day")]

    subgraph Reabsorption["Key Reabsorption"]
        R1["PCT: glucose, amino acids, HCO₃⁻, Na⁺, H₂O"]
        R2["Loop: NaCl creates gradient"]
        R3["DCT: Fine-tuning"]
        R4["CD: Final concentration"]
    end

    subgraph Secretion["Key Secretion"]
        S1["PCT: PAH, organic acids, drugs"]
        S2["DCT/CD: K⁺, H⁺"]
    end

    style A fill:#DC143C,color:#fff
    style I fill:#FFD700,color:#000`,
  },
  {
    prompt: 'Create a diagram showing the action potential phases in a neuron',
    output: `flowchart TD
    subgraph RestingState["1. Resting State"]
        A["Membrane at -70mV\\nNa⁺ channels: closed\\nK⁺ channels: closed\\nNa⁺/K⁺ ATPase active"]
    end

    subgraph Threshold["2. Threshold"]
        B["Stimulus reaches -55mV\\nVoltage-gated Na⁺ channels\\nbegin to open"]
    end

    subgraph Depolarization["3. Depolarization"]
        C["Rapid Na⁺ influx\\nMembrane → +30mV\\nPositive feedback\\n(more open → more Na⁺)"]
    end

    subgraph Peak["4. Peak/Inactivation"]
        D["+30mV reached\\nNa⁺ channels inactivate\\nK⁺ channels open"]
    end

    subgraph Repolarization["5. Repolarization"]
        E["K⁺ efflux\\nMembrane returns\\ntoward -70mV"]
    end

    subgraph Hyperpolarization["6. Hyperpolarization"]
        F["K⁺ channels slow to close\\nUndershoot to -90mV\\nAbsolute → Relative refractory"]
    end

    A -->|"Stimulus"| B
    B -->|"Threshold reached"| C
    C -->|"Max depolarization"| D
    D -->|"Na⁺ inactivation"| E
    E -->|"K⁺ delayed closure"| F
    F -->|"Recovery"| A

    style C fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff
    style F fill:#9370DB,color:#fff`,
  },
  {
    prompt: 'Create a diagram showing acid-base disorders and their compensation',
    output: `flowchart TD
    A[("ABG Values\\npH, PCO₂, HCO₃⁻")] --> B{"Step 1: pH?"}

    B -->|"< 7.35"| C["ACIDEMIA"]
    B -->|"> 7.45"| D["ALKALEMIA"]
    B -->|"7.35-7.45"| E["Normal or\\nCompensated"]

    C --> F{"Step 2: Primary cause?"}
    D --> G{"Step 2: Primary cause?"}

    F -->|"PCO₂ > 45"| H["RESPIRATORY\\nACIDOSIS"]
    F -->|"HCO₃⁻ < 22"| I["METABOLIC\\nACIDOSIS"]

    G -->|"PCO₂ < 35"| J["RESPIRATORY\\nALKALOSIS"]
    G -->|"HCO₃⁻ > 26"| K["METABOLIC\\nALKALOSIS"]

    H --> H1["Compensation: ↑HCO₃⁻\\nAcute: ↑1 per 10 ↑PCO₂\\nChronic: ↑3.5 per 10 ↑PCO₂"]
    I --> I1["Compensation: ↓PCO₂\\nWinter's: PCO₂ = 1.5×HCO₃⁻+8±2"]
    J --> J1["Compensation: ↓HCO₃⁻\\nAcute: ↓2 per 10 ↓PCO₂\\nChronic: ↓5 per 10 ↓PCO₂"]
    K --> K1["Compensation: ↑PCO₂\\n↑0.7 per 1 ↑HCO₃⁻"]

    subgraph Causes["Common Causes"]
        CA["Resp Acidosis: COPD, sedation"]
        CB["Met Acidosis: DKA, lactic, renal"]
        CC["Resp Alkalosis: anxiety, PE, sepsis"]
        CD["Met Alkalosis: vomiting, diuretics"]
    end

    style H fill:#DC143C,color:#fff
    style I fill:#FF6347,color:#fff
    style J fill:#4169E1,color:#fff
    style K fill:#6495ED,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  PHYSIOLOGY_DOMAIN_PROMPT,
  PHYSIOLOGY_PROMPTS,
  PHYSIOLOGY_FEW_SHOT_EXAMPLES,
};
