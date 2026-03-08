/**
 * chemistry-prompts.ts
 * Chemistry-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for chemistry including:
 * - Reaction mechanisms (SN1, SN2, elimination, addition)
 * - Molecular structure and bonding (Lewis, VSEPR, hybridization)
 * - Thermodynamics and kinetics (energy diagrams, rate laws)
 * - Analytical chemistry (spectroscopy, chromatography, titration)
 * - Laboratory procedures (distillation, extraction, synthesis)
 * - Electrochemistry (galvanic cells, redox reactions)
 *
 * Total: 20 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// CHEMISTRY DOMAIN PROMPT
// =============================================================================

/**
 * Base chemistry domain prompt for chemical diagrams
 */
export const CHEMISTRY_DOMAIN_PROMPT = `
Chemistry diagram requirements:
- Use IUPAC nomenclature for compounds and functional groups
- Follow standard reaction arrow conventions (single → irreversible, double ⇌ reversible)
- Include proper stereochemistry (wedge/dash notation, R/S, E/Z configurations)
- Show electron movement with curved arrows
- Use appropriate charge notation (formal charges, partial charges δ+/δ-)
- Include reaction conditions above/below arrows (reagents, solvent, temperature)
- Mark nucleophiles (Nu:) and electrophiles (E+) appropriately
- Use color coding: Reactants (blue), Products (green), Transition states (yellow), Intermediates (orange)
- Show orbital representations where relevant (σ, π, sp3, sp2, sp)
- Include energy values and units where applicable (kJ/mol, kcal/mol)`;

// =============================================================================
// CHEMISTRY-SPECIFIC PROMPTS
// =============================================================================

export const CHEMISTRY_PROMPTS = {
  // Reaction Mechanisms
  sn1Mechanism: `
SN1 Reaction Mechanism requirements:
- Show unimolecular nucleophilic substitution in two steps
- Step 1: Rate-determining ionization forming carbocation
- Step 2: Nucleophilic attack on carbocation
- Show carbocation stability order (3° > 2° > 1° > methyl)
- Indicate planar sp2 carbocation intermediate
- Show racemization in stereochemical outcome
- Include solvent effects (polar protic solvents favor SN1)
- Mark leaving group departure with curved arrow`,

  sn2Mechanism: `
SN2 Reaction Mechanism requirements:
- Show bimolecular nucleophilic substitution in one step
- Backside attack by nucleophile on electrophilic carbon
- Pentacoordinate transition state with partial bonds
- Show Walden inversion (stereochemical inversion)
- Rate = k[substrate][nucleophile]
- Steric effects: methyl > 1° > 2° > 3° (reactivity)
- Include polar aprotic solvent preference
- Show leaving group departure simultaneous with Nu attack`,

  e1Mechanism: `
E1 Elimination Mechanism requirements:
- Show unimolecular elimination in two steps
- Step 1: Ionization to form carbocation (rate-determining)
- Step 2: Base removes β-hydrogen
- Show Zaitsev's rule (more substituted alkene favored)
- Include carbocation rearrangements if applicable
- Indicate E1 vs SN1 competition with same carbocation
- Show favored conditions (weak base, polar protic, heat)`,

  e2Mechanism: `
E2 Elimination Mechanism requirements:
- Show bimolecular elimination in one step
- Anti-periplanar geometry requirement (β-H and LG 180°)
- Strong base abstracts β-hydrogen
- Concerted C-H bond breaking and C-LG bond breaking
- Show Zaitsev vs Hofmann product selectivity
- Include rate = k[substrate][base]
- Indicate bulky base preference for Hofmann product`,

  additionReaction: `
Addition Reaction requirements:
- Show electrophilic addition to alkene/alkyne π system
- Markovnikov vs anti-Markovnikov regioselectivity
- Syn vs anti addition stereochemistry
- Include carbocation intermediate (electrophilic addition)
- Show hydroboration-oxidation for anti-Markovnikov
- Halogenation via cyclic halonium ion intermediate
- Mark π bond as electron-rich site`,

  // Molecular Structure
  lewisStructure: `
Lewis Structure requirements:
- Show valence electrons as dots or lines
- Calculate total valence electrons for molecule/ion
- Identify central atom (usually least electronegative)
- Distribute electrons: bonding pairs first, then lone pairs
- Check octet rule (or exceptions: B, Be, expanded octets)
- Calculate formal charges (FC = V - L - B/2)
- Show resonance structures if applicable
- Mark overall charge for ions`,

  vseprGeometry: `
VSEPR Molecular Geometry requirements:
- Count electron domains (bonding + lone pairs)
- Determine electron domain geometry (2=linear, 3=trigonal planar, 4=tetrahedral, 5=trigonal bipyramidal, 6=octahedral)
- Account for lone pair repulsion effects
- Name molecular geometry (shape of atoms only)
- Include bond angles (ideal and actual)
- Predict molecular polarity from geometry
- Show 3D representation with wedge/dash`,

  orbitalHybridization: `
Orbital Hybridization requirements:
- Show atomic orbitals combining to form hybrid orbitals
- sp3: tetrahedral geometry (109.5°), 4 hybrid orbitals
- sp2: trigonal planar (120°), 3 hybrid + 1 p for π bond
- sp: linear (180°), 2 hybrid + 2 p for π bonds
- Show orbital energy level diagrams
- Include sigma and pi bond formation
- Mark unhybridized p orbitals for multiple bonds`,

  molecularOrbitalTheory: `
Molecular Orbital Theory requirements:
- Show atomic orbital combination (bonding and antibonding)
- Include MO energy level diagram
- Apply Aufbau principle, Hund's rule, Pauli exclusion
- Calculate bond order = (bonding e⁻ - antibonding e⁻)/2
- Predict paramagnetic/diamagnetic behavior
- Show σ and π molecular orbitals
- Include homo and LUMO for reactivity`,

  // Thermodynamics & Kinetics
  reactionEnergyDiagram: `
Reaction Energy Diagram requirements:
- Plot potential energy vs reaction coordinate
- Show reactants, products, and transition state(s)
- Mark activation energy (Ea) barrier
- Show enthalpy change (ΔH) between reactants and products
- Include intermediate energy wells for multi-step reactions
- Compare catalyzed vs uncatalyzed pathways
- Label rate-determining step (highest Ea)`,

  chemicalKinetics: `
Chemical Kinetics requirements:
- Show rate law: Rate = k[A]^m[B]^n
- Include integrated rate laws for 0, 1st, 2nd order
- Plot concentration vs time graphs for each order
- Show half-life expressions (t₁/₂)
- Include Arrhenius equation: k = Ae^(-Ea/RT)
- Show temperature dependence of rate constant
- Include collision theory concepts`,

  equilibriumDiagram: `
Chemical Equilibrium requirements:
- Show reversible reaction with equilibrium arrows (⇌)
- Write equilibrium expression: K = [products]/[reactants]
- Include Le Chatelier's principle applications
- Show concentration vs time approaching equilibrium
- Mark Q vs K for reaction direction prediction
- Include effect of temperature on K (exo vs endo)
- Show ICE table setup for calculations`,

  // Analytical Chemistry
  spectroscopyInterpretation: `
Spectroscopy Interpretation requirements:
- IR: Show functional group region (4000-1500 cm⁻¹) absorptions
- ¹H NMR: Include chemical shift (δ), splitting (J), integration
- ¹³C NMR: Show carbonyl, aromatic, aliphatic regions
- Mass Spec: Molecular ion (M⁺), base peak, fragmentation
- Include characteristic peaks for common functional groups
- Show spectral correlation between techniques
- Mark diagnostic peaks for structure determination`,

  chromatographySetup: `
Chromatography Setup requirements:
- Show mobile phase and stationary phase interaction
- Include sample injection and detection points
- Mark retention time (tR) and dead time (t₀)
- Show chromatogram with separated peaks
- Include Rf calculation for TLC
- Resolution between adjacent peaks
- Column efficiency (theoretical plates)`,

  titrationCurve: `
Titration Curve requirements:
- Plot pH vs volume of titrant added
- Mark equivalence point(s) and buffer region
- Show initial pH and final excess region
- Include half-equivalence point (pH = pKa)
- Indicate appropriate indicator choice
- Show weak acid/strong base vs strong acid/strong base differences
- Mark buffer capacity in plateau region`,

  // Laboratory Procedures
  distillationSetup: `
Distillation Setup requirements:
- Show round-bottom flask with boiling chips
- Include condenser with cooling water flow direction
- Mark thermometer placement at distillation head
- Show receiving flask and vacuum adapter
- Indicate simple vs fractional distillation difference
- Include fractionating column for fractional
- Mark heat source (heating mantle, oil bath)`,

  synthesisWorkflow: `
Synthesis Workflow requirements:
- Show linear sequence of reaction steps
- Include reagents and conditions for each step
- Mark yield and purity at each stage
- Show purification methods (extraction, recrystallization)
- Include TLC monitoring points
- Show retrosynthetic analysis arrow notation (⟹)
- Mark protecting group strategy if applicable`,

  // Electrochemistry
  electrochemicalCell: `
Electrochemical Cell requirements:
- Show anode (oxidation) and cathode (reduction) half-cells
- Include salt bridge for ion migration
- Mark electron flow direction (anode → cathode)
- Write half-reactions with standard potentials (E°)
- Calculate cell potential: E°cell = E°cathode - E°anode
- Show Nernst equation for non-standard conditions
- Distinguish galvanic (spontaneous) vs electrolytic (non-spontaneous)`,

  redoxBalancing: `
Redox Reaction Balancing requirements:
- Assign oxidation states to all atoms
- Identify species oxidized and reduced
- Write separate half-reactions
- Balance atoms: first element, then O (with H₂O), then H (with H⁺)
- Balance charge with electrons
- Multiply half-reactions to equalize electrons
- Add half-reactions and simplify
- For basic solution: add OH⁻ to neutralize H⁺`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const CHEMISTRY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create an SN2 reaction mechanism diagram for bromide displacement by hydroxide',
    output: `flowchart LR
    subgraph reactants["Reactants"]
        R["R-Br"]
        OH["HO⁻"]
    end

    subgraph ts["Transition State"]
        TS["[HO---R---Br]‡<br/>δ⁻ &nbsp;&nbsp;&nbsp;&nbsp; δ⁻"]
    end

    subgraph products["Products"]
        P["R-OH"]
        Br["Br⁻"]
    end

    OH -->|"Backside<br/>attack"| TS
    R --> TS
    TS -->|"Walden<br/>inversion"| P
    TS --> Br

    note["Rate = k[R-Br][OH⁻]<br/>Stereochemistry: Inversion"]

    classDef reactant fill:#dbeafe,stroke:#2563eb
    classDef ts fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a

    class R,OH reactant
    class TS ts
    class P,Br product`,
    reasoning: 'Shows the concerted SN2 mechanism with backside attack, transition state, and Walden inversion',
  },
  {
    prompt: 'Create an energy diagram comparing catalyzed and uncatalyzed reactions',
    output: `flowchart TB
    subgraph uncatalyzed["Uncatalyzed Pathway"]
        U_R["Reactants<br/>E = 0"]
        U_TS["Transition State<br/>Ea = 100 kJ/mol"]
        U_P["Products<br/>ΔH = -40 kJ/mol"]
    end

    subgraph catalyzed["Catalyzed Pathway"]
        C_R["Reactants"]
        C_TS1["TS₁<br/>Ea = 45 kJ/mol"]
        C_I["Intermediate"]
        C_TS2["TS₂<br/>Ea = 35 kJ/mol"]
        C_P["Products"]
    end

    U_R -->|"Ea = 100"| U_TS
    U_TS -->|"ΔH = -40"| U_P

    C_R -->|"Lower Ea"| C_TS1
    C_TS1 --> C_I
    C_I --> C_TS2
    C_TS2 --> C_P

    note["Catalyst lowers activation energy<br/>but doesn't change ΔH"]

    classDef high fill:#fecaca,stroke:#dc2626
    classDef low fill:#bbf7d0,stroke:#16a34a
    classDef intermediate fill:#fef3c7,stroke:#d97706

    class U_TS high
    class C_TS1,C_TS2 intermediate
    class U_P,C_P low`,
    reasoning: 'Compares energy profiles showing how catalyst lowers Ea without changing thermodynamics',
  },
  {
    prompt: 'Create a titration curve for weak acid with strong base',
    output: `flowchart TB
    subgraph curve["Titration Curve: Weak Acid + Strong Base"]
        initial["Initial pH<br/>pH ≈ 3 (weak acid)"]
        buffer["Buffer Region<br/>pH changes slowly"]
        half["Half-Equivalence<br/>pH = pKa"]
        equiv["Equivalence Point<br/>pH > 7 (basic)"]
        excess["Excess Base<br/>pH approaches 14"]
    end

    subgraph annotations["Key Points"]
        pka["pKa = 4.76<br/>(acetic acid)"]
        vol["V_eq = 25.0 mL"]
        indicator["Indicator: Phenolphthalein<br/>(pH 8.2-10)"]
    end

    initial --> buffer
    buffer --> half
    half --> equiv
    equiv --> excess

    classDef acidic fill:#fecaca,stroke:#dc2626
    classDef neutral fill:#fef3c7,stroke:#d97706
    classDef basic fill:#dbeafe,stroke:#2563eb

    class initial,buffer acidic
    class half,equiv neutral
    class excess basic`,
    reasoning: 'Shows the characteristic regions of a weak acid-strong base titration curve',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized chemistry prompt categories for UI grouping
 */
export const CHEMISTRY_PROMPT_CATEGORIES = {
  reactionMechanisms: {
    name: 'Reaction Mechanisms',
    prompts: ['sn1Mechanism', 'sn2Mechanism', 'e1Mechanism', 'e2Mechanism', 'additionReaction'],
  },
  molecularStructure: {
    name: 'Molecular Structure & Bonding',
    prompts: ['lewisStructure', 'vseprGeometry', 'orbitalHybridization', 'molecularOrbitalTheory'],
  },
  thermodynamicsKinetics: {
    name: 'Thermodynamics & Kinetics',
    prompts: ['reactionEnergyDiagram', 'chemicalKinetics', 'equilibriumDiagram'],
  },
  analyticalChemistry: {
    name: 'Analytical Chemistry',
    prompts: ['spectroscopyInterpretation', 'chromatographySetup', 'titrationCurve'],
  },
  laboratoryProcedures: {
    name: 'Laboratory Procedures',
    prompts: ['distillationSetup', 'synthesisWorkflow'],
  },
  electrochemistry: {
    name: 'Electrochemistry',
    prompts: ['electrochemicalCell', 'redoxBalancing'],
  },
};

/**
 * Get a specific chemistry prompt by key
 */
export function getChemistryPrompt(key: keyof typeof CHEMISTRY_PROMPTS): string {
  return CHEMISTRY_PROMPTS[key];
}

/**
 * Get all chemistry prompts as an array
 */
export function getAllChemistryPrompts(): { key: string; prompt: string }[] {
  return Object.entries(CHEMISTRY_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getChemistryPromptsByCategory(category: keyof typeof CHEMISTRY_PROMPT_CATEGORIES): string[] {
  const categoryData = CHEMISTRY_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => CHEMISTRY_PROMPTS[key as keyof typeof CHEMISTRY_PROMPTS]);
}

const chemistryPrompts = {
  CHEMISTRY_DOMAIN_PROMPT,
  CHEMISTRY_PROMPTS,
  CHEMISTRY_FEW_SHOT_EXAMPLES,
  CHEMISTRY_PROMPT_CATEGORIES,
  getChemistryPrompt,
  getAllChemistryPrompts,
  getChemistryPromptsByCategory,
};

export default chemistryPrompts;
