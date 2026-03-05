/**
 * inorganic.ts
 * Inorganic Chemistry diagram templates
 *
 * Contains comprehensive templates for inorganic chemistry including:
 * - Coordination chemistry and complex formation
 * - Crystal field theory and molecular orbital theory
 * - Solid state structures and crystallography
 * - Organometallic chemistry
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// COORDINATION CHEMISTRY
// =============================================================================

/**
 * Coordination Complex template
 */
export const coordinationComplex: DiagramTemplate = {
  id: 'inorganic-coordination-complex',
  name: 'Coordination Complex Structure',
  description: 'Metal center with coordinating ligands showing geometry and bonding',
  domain: 'chemistry',
  promptTemplate: `Create a coordination complex diagram:
- Metal center: {{metalCenter}}
- Oxidation state: {{oxidationState}}
- Ligands: {{ligands}}
- Coordination number: {{coordinationNumber}}
- Geometry: {{geometry}}
- d-electron count: {{dElectrons}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalCenter',
    'oxidationState',
    'ligands',
    'coordinationNumber',
    'geometry',
    'dElectrons',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Complex["[ML6]n+"]
        M["Metal (M)"] --> L1["L"]
        M --> L2["L"]
        M --> L3["L"]
        M --> L4["L"]
        M --> L5["L"]
        M --> L6["L"]
    end
    style M fill:#4ecdc4
    style L1 fill:#45b7d1`,
};

/**
 * Ligand Field Splitting template
 */
export const ligandFieldSplitting: DiagramTemplate = {
  id: 'inorganic-ligand-field',
  name: 'Ligand Field Splitting Diagram',
  description: 'd-orbital splitting in different geometries',
  domain: 'chemistry',
  promptTemplate: `Create a ligand field splitting diagram:
- Metal ion: {{metalIon}}
- d-electron configuration: {{dConfig}}
- Geometry: {{geometry}}
- Ligand field strength: {{fieldStrength}}
- Crystal field splitting energy: {{deltaValue}}
- High spin or low spin: {{spinState}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalIon',
    'dConfig',
    'geometry',
    'fieldStrength',
    'deltaValue',
    'spinState',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Octahedral["Octahedral Field"]
        E["eg (dx2-y2, dz2)"]
        T["t2g (dxy, dxz, dyz)"]
    end
    subgraph Free["Free Ion"]
        D["d orbitals degenerate"]
    end
    D -->|"Δo"| E
    D --> T
    style E fill:#ff6b6b
    style T fill:#4ecdc4`,
};

/**
 * Chelate Effect template
 */
export const chelateEffect: DiagramTemplate = {
  id: 'inorganic-chelate-effect',
  name: 'Chelate Effect Diagram',
  description: 'Thermodynamic stability of chelate complexes',
  domain: 'chemistry',
  promptTemplate: `Create a chelate effect diagram:
- Metal center: {{metalCenter}}
- Monodentate ligand: {{monodentateLigand}}
- Chelating ligand: {{chelatingLigand}}
- Stability constant comparison: {{stabilityComparison}}
- Entropic factor: {{entropicFactor}}
- Ring size effects: {{ringSizeEffects}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalCenter',
    'monodentateLigand',
    'chelatingLigand',
    'stabilityComparison',
    'entropicFactor',
    'ringSizeEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["[Ni(NH3)6]2+"] -->|"vs"| B["[Ni(en)3]2+"]
    subgraph Entropy["ΔS Effect"]
        C["6 ligands released"]
        D["3 chelates bound"]
        E["Net +3 particles"]
    end
    style B fill:#4ecdc4`,
};

/**
 * Isomerism in Complexes template
 */
export const complexIsomerism: DiagramTemplate = {
  id: 'inorganic-complex-isomerism',
  name: 'Coordination Complex Isomerism',
  description: 'Different types of isomerism in coordination compounds',
  domain: 'chemistry',
  promptTemplate: `Create a complex isomerism diagram:
- Complex formula: {{complexFormula}}
- Type of isomerism: {{isomerismType}}
- Isomer A structure: {{isomerA}}
- Isomer B structure: {{isomerB}}
- Properties difference: {{propertiesDifference}}
- Detection method: {{detectionMethod}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'complexFormula',
    'isomerismType',
    'isomerA',
    'isomerB',
    'propertiesDifference',
    'detectionMethod',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Geometric["Geometric Isomers"]
        A["cis-[PtCl2(NH3)2]"]
        B["trans-[PtCl2(NH3)2]"]
    end
    subgraph Optical["Optical Isomers"]
        C["Δ-[Co(en)3]3+"]
        D["Λ-[Co(en)3]3+"]
    end
    style A fill:#4ecdc4
    style B fill:#ff6b6b`,
};

// =============================================================================
// CRYSTAL FIELD AND MO THEORY
// =============================================================================

/**
 * Molecular Orbital Diagram template
 */
export const molecularOrbitalDiagram: DiagramTemplate = {
  id: 'inorganic-mo-diagram',
  name: 'Molecular Orbital Diagram',
  description: 'MO diagram for diatomic or polyatomic species',
  domain: 'chemistry',
  promptTemplate: `Create a molecular orbital diagram:
- Molecule/ion: {{molecule}}
- Atomic orbitals involved: {{atomicOrbitals}}
- Bonding orbitals: {{bondingOrbitals}}
- Antibonding orbitals: {{antibondingOrbitals}}
- Electron configuration: {{electronConfig}}
- Bond order: {{bondOrder}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'molecule',
    'atomicOrbitals',
    'bondingOrbitals',
    'antibondingOrbitals',
    'electronConfig',
    'bondOrder',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Atom1["Atom 1"]
        A1["2p"]
        A2["2s"]
    end
    subgraph MO["Molecular Orbitals"]
        S["σ*2p"]
        P["π*2p"]
        Q["π2p"]
        R["σ2p"]
        T["σ*2s"]
        U["σ2s"]
    end
    subgraph Atom2["Atom 2"]
        B1["2p"]
        B2["2s"]
    end`,
};

/**
 * Tanabe-Sugano Diagram template
 */
export const tanabeSugano: DiagramTemplate = {
  id: 'inorganic-tanabe-sugano',
  name: 'Tanabe-Sugano Diagram',
  description: 'Electronic state energy diagram for transition metal complexes',
  domain: 'chemistry',
  promptTemplate: `Create a Tanabe-Sugano diagram analysis:
- Metal ion: {{metalIon}}
- d-electron count: {{dCount}}
- Ground state term: {{groundState}}
- Excited state terms: {{excitedStates}}
- Dq/B ratio: {{dqBRatio}}
- Expected transitions: {{transitions}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalIon',
    'dCount',
    'groundState',
    'excitedStates',
    'dqBRatio',
    'transitions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph TS["Tanabe-Sugano d3"]
        A["4A2g ground state"]
        B["4T2g"]
        C["4T1g(F)"]
        D["4T1g(P)"]
    end
    A -->|"ν1"| B
    A -->|"ν2"| C
    A -->|"ν3"| D`,
};

/**
 * Jahn-Teller Distortion template
 */
export const jahnTellerDistortion: DiagramTemplate = {
  id: 'inorganic-jahn-teller',
  name: 'Jahn-Teller Distortion',
  description: 'Geometric distortion in degenerate electronic states',
  domain: 'chemistry',
  promptTemplate: `Create a Jahn-Teller distortion diagram:
- Metal complex: {{metalComplex}}
- d-electron configuration: {{dConfig}}
- Degeneracy: {{degeneracy}}
- Type of distortion: {{distortionType}}
- Energy stabilization: {{stabilization}}
- Examples: {{examples}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalComplex',
    'dConfig',
    'degeneracy',
    'distortionType',
    'stabilization',
    'examples',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Regular Octahedral"] -->|"JT active"| B["Elongated"]
    A -->|"JT active"| C["Compressed"]
    subgraph eg["eg orbital splitting"]
        D["dx2-y2 raised"]
        E["dz2 lowered"]
    end
    style A fill:#4ecdc4
    style B fill:#ffd93d`,
};

// =============================================================================
// SOLID STATE CHEMISTRY
// =============================================================================

/**
 * Unit Cell Structure template
 */
export const unitCellStructure: DiagramTemplate = {
  id: 'inorganic-unit-cell',
  name: 'Crystal Unit Cell Structure',
  description: 'Unit cell with lattice parameters and atom positions',
  domain: 'chemistry',
  promptTemplate: `Create a unit cell structure diagram:
- Crystal system: {{crystalSystem}}
- Space group: {{spaceGroup}}
- Lattice parameters: {{latticeParameters}}
- Atom positions: {{atomPositions}}
- Coordination environments: {{coordination}}
- Density calculation: {{density}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'crystalSystem',
    'spaceGroup',
    'latticeParameters',
    'atomPositions',
    'coordination',
    'density',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph UnitCell["Cubic Unit Cell"]
        A["Corner atoms: 8 × 1/8 = 1"]
        B["Face atoms: 6 × 1/2 = 3"]
        C["Body atoms: 1"]
    end
    subgraph Types["Crystal Types"]
        D["Simple Cubic"]
        E["BCC"]
        F["FCC"]
    end`,
};

/**
 * Band Theory template
 */
export const bandTheory: DiagramTemplate = {
  id: 'inorganic-band-theory',
  name: 'Band Theory Diagram',
  description: 'Electronic band structure for metals, semiconductors, insulators',
  domain: 'chemistry',
  promptTemplate: `Create a band theory diagram:
- Material type: {{materialType}}
- Valence band: {{valenceBand}}
- Conduction band: {{conductionBand}}
- Band gap: {{bandGap}}
- Fermi level: {{fermiLevel}}
- Conductivity: {{conductivity}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'materialType',
    'valenceBand',
    'conductionBand',
    'bandGap',
    'fermiLevel',
    'conductivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Metal["Metal"]
        M1["Overlapping bands"]
    end
    subgraph Semi["Semiconductor"]
        S1["Small gap ~1 eV"]
    end
    subgraph Insul["Insulator"]
        I1["Large gap >3 eV"]
    end`,
};

/**
 * Defect Chemistry template
 */
export const defectChemistry: DiagramTemplate = {
  id: 'inorganic-defect-chemistry',
  name: 'Crystal Defect Chemistry',
  description: 'Point defects, line defects, and their effects on properties',
  domain: 'chemistry',
  promptTemplate: `Create a crystal defect diagram:
- Crystal structure: {{crystalStructure}}
- Defect type: {{defectType}}
- Kroger-Vink notation: {{krogerVink}}
- Formation energy: {{formationEnergy}}
- Concentration: {{concentration}}
- Effect on properties: {{propertyEffects}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'crystalStructure',
    'defectType',
    'krogerVink',
    'formationEnergy',
    'concentration',
    'propertyEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Point["Point Defects"]
        A["Vacancy VNa'"]
        B["Interstitial Nai•"]
        C["Antisite"]
    end
    subgraph Schottky["Schottky Pair"]
        D["VNa' + VCl•"]
    end
    subgraph Frenkel["Frenkel Pair"]
        E["VAg' + Agi•"]
    end`,
};

// =============================================================================
// ORGANOMETALLIC CHEMISTRY
// =============================================================================

/**
 * 18-Electron Rule template
 */
export const eighteenElectronRule: DiagramTemplate = {
  id: 'inorganic-18-electron',
  name: '18-Electron Rule Analysis',
  description: 'Electron counting in organometallic complexes',
  domain: 'chemistry',
  promptTemplate: `Create an 18-electron rule diagram:
- Metal: {{metal}}
- Metal d electrons: {{metalElectrons}}
- Ligands: {{ligands}}
- Ligand electron donations: {{ligandElectrons}}
- Total electron count: {{totalCount}}
- Stability prediction: {{stability}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metal',
    'metalElectrons',
    'ligands',
    'ligandElectrons',
    'totalCount',
    'stability',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Count["Fe(CO)5 Counting"]
        A["Fe(0): 8 e-"]
        B["5 CO: 5×2 = 10 e-"]
        C["Total: 18 e-"]
    end
    style C fill:#4ecdc4`,
};

/**
 * Catalytic Cycle template
 */
export const catalyticCycle: DiagramTemplate = {
  id: 'inorganic-catalytic-cycle',
  name: 'Organometallic Catalytic Cycle',
  description: 'Complete catalytic cycle with elementary steps',
  domain: 'chemistry',
  promptTemplate: `Create a catalytic cycle diagram:
- Catalyst: {{catalyst}}
- Substrate(s): {{substrates}}
- Product(s): {{products}}
- Key steps: {{keySteps}}
- Turnover number: {{turnoverNumber}}
- Rate-determining step: {{rateStep}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'catalyst',
    'substrates',
    'products',
    'keySteps',
    'turnoverNumber',
    'rateStep',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["LnM"] -->|"Oxidative Addition"| B["LnM(H)(X)"]
    B -->|"Alkene Insertion"| C["LnM(alkyl)(X)"]
    C -->|"Reductive Elimination"| D["Product"]
    D --> A
    style A fill:#4ecdc4`,
};

/**
 * Oxidative Addition/Reductive Elimination template
 */
export const oxAddRedElim: DiagramTemplate = {
  id: 'inorganic-ox-add-red-elim',
  name: 'Oxidative Addition/Reductive Elimination',
  description: 'Key organometallic reaction mechanisms',
  domain: 'chemistry',
  promptTemplate: `Create an oxidative addition/reductive elimination diagram:
- Starting complex: {{startingComplex}}
- Substrate: {{substrate}}
- Oxidation state change: {{oxStateChange}}
- Coordination number change: {{cnChange}}
- Mechanism type: {{mechanismType}}
- Product: {{product}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingComplex',
    'substrate',
    'oxStateChange',
    'cnChange',
    'mechanismType',
    'product',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Mn, CNx"] -->|"Ox Add"| B["Mn+2, CNx+2"]
    B -->|"Red Elim"| A
    subgraph Change["Changes"]
        C["Ox State: +2"]
        D["CN: +2"]
    end`,
};

/**
 * Metal Carbonyl Bonding template
 */
export const metalCarbonylBonding: DiagramTemplate = {
  id: 'inorganic-metal-carbonyl',
  name: 'Metal Carbonyl Bonding',
  description: 'Synergistic σ-donation and π-backbonding in M-CO',
  domain: 'chemistry',
  promptTemplate: `Create a metal carbonyl bonding diagram:
- Metal center: {{metalCenter}}
- Number of CO ligands: {{coLigands}}
- σ-donation: {{sigmaDonation}}
- π-backbonding: {{piBackbonding}}
- CO stretching frequency: {{coFrequency}}
- Bonding implications: {{bondingImplications}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalCenter',
    'coLigands',
    'sigmaDonation',
    'piBackbonding',
    'coFrequency',
    'bondingImplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Donation["σ-donation"]
        A["CO 5σ → M"]
    end
    subgraph Backbond["π-backbonding"]
        B["M d → CO π*"]
    end
    style A fill:#4ecdc4
    style B fill:#ff6b6b`,
};

// =============================================================================
// BIOINORGANIC CHEMISTRY
// =============================================================================

/**
 * Metalloenzyme Active Site template
 */
export const metalloenzymeSite: DiagramTemplate = {
  id: 'inorganic-metalloenzyme',
  name: 'Metalloenzyme Active Site',
  description: 'Metal coordination environment in enzymes',
  domain: 'chemistry',
  promptTemplate: `Create a metalloenzyme active site diagram:
- Metal center: {{metalCenter}}
- Coordinating residues: {{coordinatingResidues}}
- Substrate binding: {{substrateBinding}}
- Catalytic mechanism: {{catalyticMechanism}}
- Oxidation state changes: {{oxidationStates}}
- Biological function: {{biologicalFunction}}
{{#additionalNotes}}Structure-function: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'metalCenter',
    'coordinatingResidues',
    'substrateBinding',
    'catalyticMechanism',
    'oxidationStates',
    'biologicalFunction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph ActiveSite["Active Site"]
        M["Metal (Fe, Cu, Zn)"]
        H1["His"]
        H2["His"]
        C["Cys/Asp"]
    end
    M --> H1 & H2 & C
    M --> S["Substrate"]
    style M fill:#ff6b6b`,
};

/**
 * Heme Chemistry template
 */
export const hemeChemistry: DiagramTemplate = {
  id: 'inorganic-heme',
  name: 'Heme Chemistry',
  description: 'Iron porphyrin structure and function',
  domain: 'chemistry',
  promptTemplate: `Create a heme chemistry diagram:
- Porphyrin structure: {{porphyrinStructure}}
- Iron oxidation state: {{ironOxidationState}}
- Axial ligands: {{axialLigands}}
- Spin state: {{spinState}}
- O2 binding: {{oxygenBinding}}
- Spectroscopic properties: {{spectroscopicProperties}}
{{#additionalNotes}}Protein environment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'porphyrinStructure',
    'ironOxidationState',
    'axialLigands',
    'spinState',
    'oxygenBinding',
    'spectroscopicProperties',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Heme["Heme Group"]
        P["Porphyrin ring"]
        Fe["Fe2+/Fe3+"]
        His["Proximal His"]
    end
    Fe --> P
    Fe --> His
    Fe --> O2["O2 (6th position)"]
    style Fe fill:#ff6b6b`,
};

/**
 * Iron-Sulfur Clusters template
 */
export const ironSulfurClusters: DiagramTemplate = {
  id: 'inorganic-fe-s-clusters',
  name: 'Iron-Sulfur Clusters',
  description: 'Fe-S cluster types and electron transfer',
  domain: 'chemistry',
  promptTemplate: `Create an iron-sulfur cluster diagram:
- Cluster type: {{clusterType}}
- Iron coordination: {{ironCoordination}}
- Sulfur bridges: {{sulfurBridges}}
- Redox potentials: {{redoxPotentials}}
- Electron transfer: {{electronTransfer}}
- Biological role: {{biologicalRole}}
{{#additionalNotes}}Protein binding: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clusterType',
    'ironCoordination',
    'sulfurBridges',
    'redoxPotentials',
    'electronTransfer',
    'biologicalRole',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Clusters["Fe-S Cluster Types"]
        A["[2Fe-2S]"]
        B["[3Fe-4S]"]
        C["[4Fe-4S]"]
    end
    subgraph Function
        D["Electron transfer"]
        E["Enzyme active sites"]
    end
    Clusters --> Function`,
};

// =============================================================================
// MAIN GROUP CHEMISTRY
// =============================================================================

/**
 * Main Group Compounds template
 */
export const mainGroupCompounds: DiagramTemplate = {
  id: 'inorganic-main-group',
  name: 'Main Group Compound Structures',
  description: 'Structures of main group element compounds',
  domain: 'chemistry',
  promptTemplate: `Create a main group compound diagram:
- Element: {{element}}
- Oxidation states: {{oxidationStates}}
- Common compounds: {{commonCompounds}}
- Hybridization: {{hybridization}}
- Molecular geometry: {{molecularGeometry}}
- Reactivity patterns: {{reactivityPatterns}}
{{#additionalNotes}}Industrial applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'element',
    'oxidationStates',
    'commonCompounds',
    'hybridization',
    'molecularGeometry',
    'reactivityPatterns',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Phosphorus["P Compounds"]
        A["PCl3 - pyramidal"]
        B["PCl5 - TBP"]
        C["PO43- - tetrahedral"]
    end
    subgraph Sulfur["S Compounds"]
        D["SF4 - see-saw"]
        E["SF6 - octahedral"]
    end`,
};

/**
 * Hypervalent Compounds template
 */
export const hypervalentCompounds: DiagramTemplate = {
  id: 'inorganic-hypervalent',
  name: 'Hypervalent Compounds',
  description: 'Compounds exceeding octet rule',
  domain: 'chemistry',
  promptTemplate: `Create a hypervalent compound diagram:
- Central atom: {{centralAtom}}
- Expanded octet: {{expandedOctet}}
- Bonding model: {{bondingModel}}
- 3c-4e bonds: {{threeCenterBonds}}
- Geometry: {{geometry}}
- Examples: {{examples}}
{{#additionalNotes}}Bonding controversy: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'centralAtom',
    'expandedOctet',
    'bondingModel',
    'threeCenterBonds',
    'geometry',
    'examples',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Examples["Hypervalent Examples"]
        A["SF6 - 12 electrons"]
        B["PCl5 - 10 electrons"]
        C["XeF4 - 12 electrons"]
    end
    subgraph Bonding["Bonding Model"]
        D["3-center 4-electron"]
        E["d-orbital participation?"]
    end`,
};

/**
 * Noble Gas Chemistry template
 */
export const nobleGasChemistry: DiagramTemplate = {
  id: 'inorganic-noble-gas',
  name: 'Noble Gas Chemistry',
  description: 'Compounds of noble gases especially Xe',
  domain: 'chemistry',
  promptTemplate: `Create a noble gas chemistry diagram:
- Noble gas: {{nobleGas}}
- Oxidation states: {{oxidationStates}}
- Fluorides: {{fluorides}}
- Oxides: {{oxides}}
- Structure: {{structure}}
- Synthesis: {{synthesis}}
{{#additionalNotes}}Historical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nobleGas',
    'oxidationStates',
    'fluorides',
    'oxides',
    'structure',
    'synthesis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Xenon["Xe Compounds"]
        A["XeF2 - linear"]
        B["XeF4 - square planar"]
        C["XeF6 - distorted oct"]
        D["XeO3 - pyramidal"]
    end
    E["Xe + F2 → XeF2"]`,
};

// =============================================================================
// TRANSITION METAL APPLICATIONS
// =============================================================================

/**
 * Homogeneous Catalysis template
 */
export const homogeneousCatalysis: DiagramTemplate = {
  id: 'inorganic-homogeneous-catalysis',
  name: 'Homogeneous Catalysis',
  description: 'Transition metal catalyzed reactions in solution',
  domain: 'chemistry',
  promptTemplate: `Create a homogeneous catalysis diagram:
- Catalyst: {{catalyst}}
- Reaction type: {{reactionType}}
- Key intermediates: {{keyIntermediates}}
- Turnover frequency: {{turnoverFrequency}}
- Selectivity: {{selectivity}}
- Industrial application: {{industrialApplication}}
{{#additionalNotes}}Mechanism details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'catalyst',
    'reactionType',
    'keyIntermediates',
    'turnoverFrequency',
    'selectivity',
    'industrialApplication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Wilkinson's Catalyst\\nRhCl(PPh3)3"] --> B["Alkene Binding"]
    B --> C["Oxidative Addition\\nH2"]
    C --> D["Migratory Insertion"]
    D --> E["Reductive Elimination"]
    E --> A`,
};

/**
 * Cross-Coupling Reactions template
 */
export const crossCouplingReactions: DiagramTemplate = {
  id: 'inorganic-cross-coupling',
  name: 'Cross-Coupling Reactions',
  description: 'Pd-catalyzed C-C bond forming reactions',
  domain: 'chemistry',
  promptTemplate: `Create a cross-coupling reaction diagram:
- Reaction name: {{reactionName}}
- Catalyst system: {{catalystSystem}}
- Coupling partners: {{couplingPartners}}
- Mechanism steps: {{mechanismSteps}}
- Ligand effects: {{ligandEffects}}
- Scope: {{scope}}
{{#additionalNotes}}Nobel Prize 2010: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reactionName',
    'catalystSystem',
    'couplingPartners',
    'mechanismSteps',
    'ligandEffects',
    'scope',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Reactions["Cross-Coupling Types"]
        A["Suzuki: Ar-B(OH)2"]
        B["Negishi: Ar-ZnX"]
        C["Stille: Ar-SnR3"]
    end
    D["Pd(0)"] --> E["Ox Add"]
    E --> F["Transmetallation"]
    F --> G["Red Elim"]
    G --> D`,
};

/**
 * VSEPR Theory template
 */
export const vseprTheory: DiagramTemplate = {
  id: 'inorganic-vsepr',
  name: 'VSEPR Theory',
  description: 'Predicting molecular geometry from electron pairs',
  domain: 'chemistry',
  promptTemplate: `Create a VSEPR theory diagram:
- Steric number: {{stericNumber}}
- Bonding pairs: {{bondingPairs}}
- Lone pairs: {{lonePairs}}
- Electron geometry: {{electronGeometry}}
- Molecular geometry: {{molecularGeometry}}
- Bond angles: {{bondAngles}}
{{#additionalNotes}}Deviations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'stericNumber',
    'bondingPairs',
    'lonePairs',
    'electronGeometry',
    'molecularGeometry',
    'bondAngles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph SN4["Steric Number 4"]
        A["4 BP, 0 LP: Tetrahedral"]
        B["3 BP, 1 LP: Trigonal Pyramidal"]
        C["2 BP, 2 LP: Bent"]
    end
    subgraph SN5["Steric Number 5"]
        D["5 BP: Trigonal Bipyramidal"]
        E["4 BP: See-saw"]
        F["3 BP: T-shape"]
    end`,
};

/**
 * Hard-Soft Acid-Base Theory template
 */
export const hsabTheory: DiagramTemplate = {
  id: 'inorganic-hsab',
  name: 'Hard-Soft Acid-Base Theory',
  description: 'HSAB principle for predicting complex stability',
  domain: 'chemistry',
  promptTemplate: `Create an HSAB theory diagram:
- Hard acids: {{hardAcids}}
- Soft acids: {{softAcids}}
- Hard bases: {{hardBases}}
- Soft bases: {{softBases}}
- Matching principle: {{matchingPrinciple}}
- Applications: {{applications}}
{{#additionalNotes}}Symbiosis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hardAcids',
    'softAcids',
    'hardBases',
    'softBases',
    'matchingPrinciple',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Hard["Hard-Hard"]
        A["Li+, Mg2+, Al3+"]
        B["F-, OH-, O2-"]
    end
    subgraph Soft["Soft-Soft"]
        C["Cu+, Ag+, Hg2+"]
        D["I-, RS-, CN-"]
    end
    E["Hard with Hard = Stable"]
    F["Soft with Soft = Stable"]`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All inorganic chemistry templates
 */
export const inorganicTemplates: DiagramTemplate[] = [
  // Coordination Chemistry
  coordinationComplex,
  ligandFieldSplitting,
  chelateEffect,
  complexIsomerism,
  // Crystal Field and MO Theory
  molecularOrbitalDiagram,
  tanabeSugano,
  jahnTellerDistortion,
  // Solid State Chemistry
  unitCellStructure,
  bandTheory,
  defectChemistry,
  // Organometallic Chemistry
  eighteenElectronRule,
  catalyticCycle,
  oxAddRedElim,
  metalCarbonylBonding,
  // Bioinorganic Chemistry
  metalloenzymeSite,
  hemeChemistry,
  ironSulfurClusters,
  // Main Group Chemistry
  mainGroupCompounds,
  hypervalentCompounds,
  nobleGasChemistry,
  // Transition Metal Applications
  homogeneousCatalysis,
  crossCouplingReactions,
  vseprTheory,
  hsabTheory,
];

export default inorganicTemplates;
