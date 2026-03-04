/**
 * chemistry.ts
 * Chemistry diagram templates for FINNISH
 *
 * Contains templates for chemical reactions, molecular structures,
 * laboratory procedures, and analytical methods.
 *
 * Ralph Loop - COMPLETE checkpoint
 * Total: 25 templates covering all chemistry domains
 *
 * Categories:
 * - Reaction Mechanisms (SN1, SN2, E1, E2, Addition)
 * - Molecular Structures (Lewis, VSEPR, Hybridization)
 * - Thermodynamics & Kinetics (Energy diagrams, Rate laws, Phase diagrams)
 * - Analytical Chemistry (Titration, Chromatography, Spectroscopy)
 * - Laboratory Procedures (Distillation, Extraction, Recrystallization)
 * - Electrochemistry (Galvanic cells, Redox balancing)
 * - Equilibrium & Acids/Bases (Buffer solutions, Chemical equilibrium)
 * - Periodic Trends
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// REACTION MECHANISMS
// =============================================================================

/**
 * Reaction Mechanism template
 */
export const reactionMechanism: DiagramTemplate = {
  id: 'chem-reaction-mechanism',
  name: 'Reaction Mechanism',
  description:
    'Step-by-step reaction mechanism showing electron movement and intermediates',
  domain: 'chemistry',
  promptTemplate: `Create a reaction mechanism diagram:
- Reaction type: {{reactionType}}
- Starting materials: {{startingMaterials}}
- Reagents/conditions: {{reagentsConditions}}
- Mechanism steps: {{mechanismSteps}}
- Intermediates: {{intermediates}}
- Transition states: {{transitionStates}}
- Products: {{products}}
- Stereochemistry: {{stereochemistry}}
{{#catalysis}}Catalytic cycle: {{catalysis}}{{/catalysis}}`,
  placeholders: [
    'reactionType',
    'startingMaterials',
    'reagentsConditions',
    'mechanismSteps',
    'intermediates',
    'transitionStates',
    'products',
    'stereochemistry',
    'catalysis',
  ],
  mermaidExample: `flowchart LR
    subgraph step1["Step 1: Nucleophilic Attack"]
        sm["R-X<br/>(Substrate)"]
        nu["Nu⁻<br/>(Nucleophile)"]
        ts1["[Nu---R---X]‡<br/>Transition State"]
    end

    subgraph step2["Step 2: Product Formation"]
        prod["Nu-R<br/>(Product)"]
        lg["X⁻<br/>(Leaving Group)"]
    end

    sm --> ts1
    nu --> ts1
    ts1 --> prod
    ts1 --> lg

    classDef substrate fill:#dbeafe,stroke:#2563eb
    classDef ts fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a

    class sm,nu substrate
    class ts1 ts
    class prod,lg product`,
};

/**
 * SN1 Reaction Mechanism template
 */
export const chemSN1Mechanism: DiagramTemplate = {
  id: 'chem-sn1-mechanism',
  name: 'SN1 Reaction Mechanism',
  description: 'Unimolecular nucleophilic substitution reaction mechanism',
  domain: 'chemistry',
  promptTemplate: `Create an SN1 reaction mechanism diagram:
- Substrate: {{substrate}}
- Leaving group: {{leavingGroup}}
- Nucleophile: {{nucleophile}}
- Solvent: {{solvent}}
- Carbocation intermediate: {{carbocation}}
- Rate-determining step: {{rateStep}}
- Stereochemical outcome: {{stereochemistry}}
- Side products: {{sideProducts}}`,
  placeholders: [
    'substrate',
    'leavingGroup',
    'nucleophile',
    'solvent',
    'carbocation',
    'rateStep',
    'stereochemistry',
    'sideProducts',
  ],
  mermaidExample: `flowchart TD
    subgraph step1["Step 1: Ionization (Rate-Determining)"]
        A["R-X<br/>(Substrate)"] --> B["R⁺<br/>(Carbocation)"]
        A --> C["X⁻<br/>(Leaving Group)"]
    end

    subgraph step2["Step 2: Nucleophilic Attack"]
        B --> D["R-Nu<br/>(Product)"]
        E["Nu⁻"] --> D
    end

    note["Racemization occurs<br/>(attack from both sides)"]

    classDef substrate fill:#dbeafe,stroke:#2563eb
    classDef intermediate fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a

    class A substrate
    class B intermediate
    class D product`,
};

/**
 * SN2 Reaction Mechanism template
 */
export const chemSN2Mechanism: DiagramTemplate = {
  id: 'chem-sn2-mechanism',
  name: 'SN2 Reaction Mechanism',
  description: 'Bimolecular nucleophilic substitution reaction mechanism',
  domain: 'chemistry',
  promptTemplate: `Create an SN2 reaction mechanism diagram:
- Substrate: {{substrate}}
- Leaving group: {{leavingGroup}}
- Nucleophile: {{nucleophile}}
- Solvent: {{solvent}}
- Transition state: {{transitionState}}
- Stereochemical outcome: {{stereochemistry}}
- Steric effects: {{stericEffects}}
- Kinetics: {{kinetics}}`,
  placeholders: [
    'substrate',
    'leavingGroup',
    'nucleophile',
    'solvent',
    'transitionState',
    'stereochemistry',
    'stericEffects',
    'kinetics',
  ],
  mermaidExample: `flowchart LR
    subgraph reaction["SN2 Mechanism (Concerted)"]
        A["Nu⁻"] --> B["[Nu---R---X]‡<br/>Transition State"]
        C["R-X"] --> B
        B --> D["Nu-R"]
        B --> E["X⁻"]
    end

    note["Walden Inversion<br/>(Backside Attack)"]

    classDef nucleophile fill:#dbeafe,stroke:#2563eb
    classDef ts fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a

    class A,C nucleophile
    class B ts
    class D,E product`,
};

/**
 * Elimination Reaction Mechanism template
 */
export const eliminationMechanism: DiagramTemplate = {
  id: 'chem-elimination-mechanism',
  name: 'Elimination Reaction Mechanism',
  description: 'E1 and E2 elimination reaction mechanism diagrams',
  domain: 'chemistry',
  promptTemplate: `Create an elimination reaction mechanism diagram:
- Mechanism type: {{mechanismType}}
- Substrate: {{substrate}}
- Base: {{base}}
- Leaving group: {{leavingGroup}}
- Beta-hydrogen position: {{betaHydrogen}}
- Transition state: {{transitionState}}
- Alkene product: {{alkeneProduct}}
- Regioselectivity: {{regioselectivity}}
- Stereoselectivity: {{stereoselectivity}}`,
  placeholders: [
    'mechanismType',
    'substrate',
    'base',
    'leavingGroup',
    'betaHydrogen',
    'transitionState',
    'alkeneProduct',
    'regioselectivity',
    'stereoselectivity',
  ],
  mermaidExample: `flowchart TD
    subgraph E2["E2 Mechanism (Concerted)"]
        A["Base B⁻"] --> B["β-H"]
        B --> C["Substrate"]
        C --> D["Alkene + B-H + X⁻"]
    end

    subgraph zaitsev["Zaitsev's Rule"]
        E["More substituted<br/>alkene favored"]
    end

    note["Anti-periplanar<br/>geometry required"]

    classDef base fill:#dbeafe,stroke:#2563eb
    classDef substrate fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Addition Reaction Mechanism template
 */
export const additionMechanism: DiagramTemplate = {
  id: 'chem-addition-mechanism',
  name: 'Addition Reaction Mechanism',
  description: 'Electrophilic and nucleophilic addition reaction mechanisms',
  domain: 'chemistry',
  promptTemplate: `Create an addition reaction mechanism diagram:
- Addition type: {{additionType}}
- Substrate (alkene/alkyne): {{substrate}}
- Electrophile/Nucleophile: {{reagent}}
- Intermediate: {{intermediate}}
- Regioselectivity (Markovnikov/anti): {{regioselectivity}}
- Stereochemistry (syn/anti): {{stereochemistry}}
- Products: {{products}}
- Catalyst if any: {{catalyst}}`,
  placeholders: [
    'additionType',
    'substrate',
    'reagent',
    'intermediate',
    'regioselectivity',
    'stereochemistry',
    'products',
    'catalyst',
  ],
  mermaidExample: `flowchart TD
    subgraph step1["Step 1: Electrophilic Attack"]
        A["Alkene π-bond"] --> B["Carbocation<br/>Intermediate"]
        C["H⁺ (from HX)"] --> B
    end

    subgraph step2["Step 2: Nucleophilic Capture"]
        B --> D["Markovnikov<br/>Product"]
        E["X⁻"] --> D
    end

    note["H adds to less<br/>substituted carbon"]

    classDef alkene fill:#dbeafe,stroke:#2563eb
    classDef carbocation fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a`,
};

// =============================================================================
// MOLECULAR STRUCTURES
// =============================================================================

/**
 * Molecular Structure template
 */
export const molecularStructure: DiagramTemplate = {
  id: 'chem-molecular-structure',
  name: 'Molecular Structure',
  description:
    'Molecular structure diagram showing atoms, bonds, and spatial arrangement',
  domain: 'chemistry',
  promptTemplate: `Create a molecular structure diagram:
- Compound name: {{compoundName}}
- Molecular formula: {{molecularFormula}}
- Structural features: {{structuralFeatures}}
- Functional groups: {{functionalGroups}}
- Bond types: {{bondTypes}}
- Stereochemistry: {{stereochemistry}}
- Representation style: {{representationStyle}}
- Highlight specific atoms/groups: {{highlights}}`,
  placeholders: [
    'compoundName',
    'molecularFormula',
    'structuralFeatures',
    'functionalGroups',
    'bondTypes',
    'stereochemistry',
    'representationStyle',
    'highlights',
  ],
};

/**
 * Lewis Structure template
 */
export const lewisStructure: DiagramTemplate = {
  id: 'chem-lewis-structure',
  name: 'Lewis Structure',
  description: 'Lewis dot structure showing valence electrons and bonding',
  domain: 'chemistry',
  promptTemplate: `Create a Lewis structure diagram:
- Molecule/Ion: {{molecule}}
- Total valence electrons: {{valenceElectrons}}
- Central atom: {{centralAtom}}
- Terminal atoms: {{terminalAtoms}}
- Bonding pairs: {{bondingPairs}}
- Lone pairs: {{lonePairs}}
- Formal charges: {{formalCharges}}
- Resonance structures: {{resonanceStructures}}`,
  placeholders: [
    'molecule',
    'valenceElectrons',
    'centralAtom',
    'terminalAtoms',
    'bondingPairs',
    'lonePairs',
    'formalCharges',
    'resonanceStructures',
  ],
  mermaidExample: `flowchart LR
    subgraph water["H₂O Lewis Structure"]
        O["O<br/>(2 lone pairs)"]
        H1["H"]
        H2["H"]
        O --- H1
        O --- H2
    end

    subgraph info["Electron Count"]
        total["Total: 8 valence e⁻"]
        bonds["Bonding: 4 e⁻"]
        lone["Non-bonding: 4 e⁻"]
    end`,
};

/**
 * VSEPR Geometry template
 */
export const vseprGeometry: DiagramTemplate = {
  id: 'chem-vsepr-geometry',
  name: 'VSEPR Molecular Geometry',
  description: 'Molecular geometry based on VSEPR theory',
  domain: 'chemistry',
  promptTemplate: `Create a VSEPR geometry diagram:
- Molecule: {{molecule}}
- Central atom: {{centralAtom}}
- Electron domains: {{electronDomains}}
- Bonding domains: {{bondingDomains}}
- Lone pair domains: {{lonePairDomains}}
- Electron geometry: {{electronGeometry}}
- Molecular geometry: {{molecularGeometry}}
- Bond angles: {{bondAngles}}
- Polarity: {{polarity}}`,
  placeholders: [
    'molecule',
    'centralAtom',
    'electronDomains',
    'bondingDomains',
    'lonePairDomains',
    'electronGeometry',
    'molecularGeometry',
    'bondAngles',
    'polarity',
  ],
  mermaidExample: `flowchart TD
    subgraph geometries["Common VSEPR Geometries"]
        A["Linear<br/>180°"]
        B["Trigonal Planar<br/>120°"]
        C["Tetrahedral<br/>109.5°"]
        D["Trigonal Bipyramidal<br/>90°, 120°"]
        E["Octahedral<br/>90°"]
    end

    subgraph examples["Examples"]
        A1["CO₂"] --> A
        B1["BF₃"] --> B
        C1["CH₄"] --> C
        D1["PCl₅"] --> D
        E1["SF₆"] --> E
    end`,
};

/**
 * Orbital Hybridization template
 */
export const orbitalHybridization: DiagramTemplate = {
  id: 'chem-orbital-hybridization',
  name: 'Orbital Hybridization',
  description: 'Diagram showing orbital mixing and hybrid orbital formation',
  domain: 'chemistry',
  promptTemplate: `Create an orbital hybridization diagram:
- Atom: {{atom}}
- Ground state configuration: {{groundState}}
- Hybridization type: {{hybridizationType}}
- Orbitals mixed: {{orbitalsMixed}}
- Resulting hybrid orbitals: {{hybridOrbitals}}
- Geometry: {{geometry}}
- Bond types formed: {{bondTypes}}
- Example molecule: {{exampleMolecule}}`,
  placeholders: [
    'atom',
    'groundState',
    'hybridizationType',
    'orbitalsMixed',
    'hybridOrbitals',
    'geometry',
    'bondTypes',
    'exampleMolecule',
  ],
  mermaidExample: `flowchart TD
    subgraph sp3["sp³ Hybridization"]
        A["1s + 3p orbitals"] --> B["4 sp³ hybrid orbitals"]
        B --> C["Tetrahedral geometry"]
        C --> D["Example: CH₄"]
    end

    subgraph sp2["sp² Hybridization"]
        E["1s + 2p orbitals"] --> F["3 sp² hybrids + 1p"]
        F --> G["Trigonal planar + π bond"]
        G --> H["Example: C₂H₄"]
    end`,
};

// =============================================================================
// THERMODYNAMICS & KINETICS
// =============================================================================

/**
 * Energy Diagram template (Reaction Coordinate)
 */
export const energyDiagram: DiagramTemplate = {
  id: 'chem-energy-diagram',
  name: 'Energy Diagram',
  description:
    'Reaction coordinate diagram showing energy changes during a chemical reaction',
  domain: 'chemistry',
  promptTemplate: `Create a reaction energy diagram:
- Reaction: {{reaction}}
- Reactant energy level: {{reactantEnergy}}
- Product energy level: {{productEnergy}}
- Activation energy (Ea): {{activationEnergy}}
- Transition state(s): {{transitionStates}}
- Intermediate(s): {{intermediates}}
- Delta H (enthalpy change): {{deltaH}}
- Catalyst effect (if applicable): {{catalystEffect}}
- Temperature dependence: {{temperatureDependence}}`,
  placeholders: [
    'reaction',
    'reactantEnergy',
    'productEnergy',
    'activationEnergy',
    'transitionStates',
    'intermediates',
    'deltaH',
    'catalystEffect',
    'temperatureDependence',
  ],
  mermaidExample: `flowchart TB
    subgraph uncatalyzed["Uncatalyzed Pathway"]
        r1["Reactants<br/>E = 0 kJ/mol"]
        ts1["Transition State<br/>Ea = 75 kJ/mol"]
        p1["Products<br/>ΔH = -30 kJ/mol"]
    end

    subgraph catalyzed["Catalyzed Pathway"]
        r2["Reactants"]
        ts2a["TS1<br/>Ea = 40 kJ/mol"]
        int["Intermediate"]
        ts2b["TS2<br/>Ea = 35 kJ/mol"]
        p2["Products"]
    end

    r1 -->|"Ea = 75"| ts1
    ts1 -->|"ΔH = -30"| p1

    r2 -->|"Ea = 40"| ts2a
    ts2a --> int
    int -->|"Ea = 35"| ts2b
    ts2b --> p2

    note["Catalyst lowers Ea<br/>but doesn't change ΔH"]`,
};

/**
 * Phase Diagram template
 */
export const chemPhaseDiagram: DiagramTemplate = {
  id: 'chem-phase-diagram',
  name: 'Phase Diagram',
  description:
    'Phase diagram showing states of matter as function of temperature and pressure',
  domain: 'chemistry',
  promptTemplate: `Create a phase diagram:
- Substance: {{substance}}
- Triple point (T, P): {{triplePoint}}
- Critical point (T, P): {{criticalPoint}}
- Normal melting point: {{meltingPoint}}
- Normal boiling point: {{boilingPoint}}
- Solid phase regions: {{solidPhases}}
- Special features: {{specialFeatures}}
- Phase transition lines: {{transitionLines}}`,
  placeholders: [
    'substance',
    'triplePoint',
    'criticalPoint',
    'meltingPoint',
    'boilingPoint',
    'solidPhases',
    'specialFeatures',
    'transitionLines',
  ],
  mermaidExample: `flowchart TB
    subgraph diagram["Phase Diagram"]
        solid["SOLID<br/>Region"]
        liquid["LIQUID<br/>Region"]
        gas["GAS<br/>Region"]
        supercrit["Supercritical<br/>Fluid"]
    end

    subgraph points["Key Points"]
        triple["Triple Point<br/>(0.01°C, 611 Pa)"]
        critical["Critical Point<br/>(374°C, 22.1 MPa)"]
    end

    subgraph transitions["Phase Boundaries"]
        melt["Melting/Freezing Line"]
        vap["Vaporization Line"]
        sub["Sublimation Line"]
    end

    solid -->|"melt"| liquid
    liquid -->|"vaporize"| gas
    solid -->|"sublimate"| gas
    liquid -->|"above critical"| supercrit
    gas -->|"above critical"| supercrit`,
};

/**
 * Kinetics Rate Law template
 */
export const kineticsRateLaw: DiagramTemplate = {
  id: 'chem-kinetics-rate-law',
  name: 'Chemical Kinetics Rate Law',
  description: 'Diagram illustrating reaction rate laws and order',
  domain: 'chemistry',
  promptTemplate: `Create a kinetics rate law diagram:
- Reaction: {{reaction}}
- Rate law expression: {{rateLaw}}
- Reaction order: {{reactionOrder}}
- Rate constant (k): {{rateConstant}}
- Temperature dependence: {{temperatureDependence}}
- Half-life expression: {{halfLife}}
- Integrated rate law: {{integratedRateLaw}}
- Concentration vs time plot: {{concentrationPlot}}`,
  placeholders: [
    'reaction',
    'rateLaw',
    'reactionOrder',
    'rateConstant',
    'temperatureDependence',
    'halfLife',
    'integratedRateLaw',
    'concentrationPlot',
  ],
  mermaidExample: `flowchart TD
    subgraph orders["Reaction Orders"]
        zero["Zero Order<br/>Rate = k"]
        first["First Order<br/>Rate = k[A]"]
        second["Second Order<br/>Rate = k[A]²"]
    end

    subgraph plots["[A] vs Time"]
        z_plot["Linear decrease"]
        f_plot["Exponential decay"]
        s_plot["1/[A] linear"]
    end

    subgraph halflife["Half-Life"]
        z_hl["t₁/₂ = [A]₀/2k"]
        f_hl["t₁/₂ = ln2/k"]
        s_hl["t₁/₂ = 1/k[A]₀"]
    end

    zero --> z_plot --> z_hl
    first --> f_plot --> f_hl
    second --> s_plot --> s_hl`,
};

// =============================================================================
// ANALYTICAL CHEMISTRY
// =============================================================================

/**
 * Titration Curve template
 */
export const titrationCurve: DiagramTemplate = {
  id: 'chem-titration-curve',
  name: 'Titration Curve',
  description:
    'pH vs volume curve for acid-base titration with equivalence point',
  domain: 'chemistry',
  promptTemplate: `Create a titration curve diagram:
- Titration type: {{titrationType}}
- Analyte: {{analyte}}
- Titrant: {{titrant}}
- Initial concentration of analyte: {{analyteConcentration}}
- Concentration of titrant: {{titrantConcentration}}
- Initial pH: {{initialPH}}
- Equivalence point(s): {{equivalencePoints}}
- pKa value(s): {{pKaValues}}
- Buffer region: {{bufferRegion}}
- Indicator recommended: {{indicator}}`,
  placeholders: [
    'titrationType',
    'analyte',
    'titrant',
    'analyteConcentration',
    'titrantConcentration',
    'initialPH',
    'equivalencePoints',
    'pKaValues',
    'bufferRegion',
    'indicator',
  ],
  mermaidExample: `flowchart TB
    subgraph curve["Titration Curve Features"]
        initial["Initial pH<br/>(acidic analyte)"]
        buffer["Buffer Region<br/>pH = pKa"]
        halfEq["Half-Equivalence Point<br/>[HA] = [A⁻]"]
        equiv["Equivalence Point<br/>Steep rise"]
        excess["Excess Titrant<br/>Region"]
    end

    subgraph annotations["Key Values"]
        pka["pKa = 4.76<br/>(acetic acid)"]
        equivpH["pH at equiv = 8.72"]
        volume["Veq = 25.0 mL"]
    end

    initial --> buffer
    buffer --> halfEq
    halfEq --> equiv
    equiv --> excess`,
};

/**
 * Electron Configuration template
 */
export const electronConfiguration: DiagramTemplate = {
  id: 'chem-electron-configuration',
  name: 'Electron Configuration',
  description:
    'Orbital diagram showing electron arrangement in atomic orbitals',
  domain: 'chemistry',
  promptTemplate: `Create an electron configuration diagram:
- Element: {{element}}
- Atomic number: {{atomicNumber}}
- Electron configuration notation: {{configNotation}}
- Orbital diagram type: {{orbitalDiagramType}}
- Valence electrons: {{valenceElectrons}}
- Unpaired electrons: {{unpairedElectrons}}
- Oxidation states: {{oxidationStates}}
- Special features (exceptions): {{specialFeatures}}`,
  placeholders: [
    'element',
    'atomicNumber',
    'configNotation',
    'orbitalDiagramType',
    'valenceElectrons',
    'unpairedElectrons',
    'oxidationStates',
    'specialFeatures',
  ],
  mermaidExample: `flowchart TB
    subgraph orbitals["Orbital Energy Levels"]
        s1["1s ↑↓"]
        s2["2s ↑↓"]
        p2["2p ↑↓ ↑↓ ↑↓"]
        s3["3s ↑↓"]
        p3["3p ↑↓ ↑↓ ↑"]
    end

    subgraph info["Configuration Info"]
        element["Chlorine (Cl)"]
        config["1s² 2s² 2p⁶ 3s² 3p⁵"]
        valence["Valence: 7 electrons"]
        unpaired["Unpaired: 1 electron"]
    end

    s1 --> s2
    s2 --> p2
    p2 --> s3
    s3 --> p3

    classDef filled fill:#dcfce7,stroke:#16a34a
    classDef partial fill:#fef3c7,stroke:#d97706

    class s1,s2,p2,s3 filled
    class p3 partial`,
};

/**
 * Chromatography Analysis template
 */
export const chromatographyAnalysis: DiagramTemplate = {
  id: 'chem-chromatography-analysis',
  name: 'Chromatography Analysis',
  description: 'Chromatography setup and results interpretation diagram',
  domain: 'chemistry',
  promptTemplate: `Create a chromatography analysis diagram:
- Chromatography type: {{chromatographyType}}
- Stationary phase: {{stationaryPhase}}
- Mobile phase: {{mobilePhase}}
- Sample components: {{sampleComponents}}
- Retention times: {{retentionTimes}}
- Rf values (if TLC): {{rfValues}}
- Peak resolution: {{peakResolution}}
- Detector type: {{detectorType}}
- Interpretation: {{interpretation}}`,
  placeholders: [
    'chromatographyType',
    'stationaryPhase',
    'mobilePhase',
    'sampleComponents',
    'retentionTimes',
    'rfValues',
    'peakResolution',
    'detectorType',
    'interpretation',
  ],
  mermaidExample: `flowchart TD
    subgraph setup["Chromatography Setup"]
        sample["Sample Injection"]
        column["Column<br/>(Stationary Phase)"]
        mobile["Mobile Phase Flow"]
        detector["Detector"]
    end

    subgraph results["Chromatogram"]
        peak1["Peak 1<br/>Rt = 2.5 min"]
        peak2["Peak 2<br/>Rt = 4.1 min"]
        peak3["Peak 3<br/>Rt = 6.8 min"]
    end

    sample --> column
    mobile --> column
    column --> detector
    detector --> peak1 & peak2 & peak3`,
};

/**
 * Spectroscopy Interpretation template
 */
export const spectroscopyInterpretation: DiagramTemplate = {
  id: 'chem-spectroscopy-interpretation',
  name: 'Spectroscopy Interpretation',
  description: 'Guide for interpreting NMR, IR, and MS spectra',
  domain: 'chemistry',
  promptTemplate: `Create a spectroscopy interpretation diagram:
- Spectroscopy type: {{spectroscopyType}}
- Compound being analyzed: {{compound}}
- Key peaks/signals: {{keyPeaks}}
- Chemical shifts (NMR): {{chemicalShifts}}
- Functional group absorptions (IR): {{functionalGroups}}
- Fragmentation pattern (MS): {{fragmentation}}
- Molecular ion (MS): {{molecularIon}}
- Structure elucidation: {{structureElucidation}}`,
  placeholders: [
    'spectroscopyType',
    'compound',
    'keyPeaks',
    'chemicalShifts',
    'functionalGroups',
    'fragmentation',
    'molecularIon',
    'structureElucidation',
  ],
  mermaidExample: `flowchart TD
    subgraph nmr["¹H NMR Interpretation"]
        A["δ 0-1 ppm: Alkyl"]
        B["δ 2-4 ppm: α to EWG"]
        C["δ 6-8 ppm: Aromatic"]
        D["δ 9-10 ppm: Aldehyde"]
    end

    subgraph ir["IR Key Absorptions"]
        E["3300 cm⁻¹: O-H"]
        F["1700 cm⁻¹: C=O"]
        G["1600 cm⁻¹: C=C aromatic"]
    end

    subgraph ms["Mass Spec"]
        H["M⁺: Molecular ion"]
        I["M-15: Loss of CH₃"]
        J["m/z 91: Tropylium"]
    end`,
};

// =============================================================================
// LABORATORY PROCEDURES
// =============================================================================

/**
 * Laboratory Setup template
 */
export const laboratorySetup: DiagramTemplate = {
  id: 'chem-laboratory-setup',
  name: 'Laboratory Setup',
  description: 'Diagram of laboratory apparatus configuration',
  domain: 'chemistry',
  promptTemplate: `Create a laboratory setup diagram:
- Experiment type: {{experimentType}}
- Main apparatus: {{mainApparatus}}
- Supporting equipment: {{supportingEquipment}}
- Heat source: {{heatSource}}
- Cooling/Condensation: {{cooling}}
- Collection vessel: {{collectionVessel}}
- Safety equipment: {{safetyEquipment}}
- Procedure overview: {{procedureOverview}}`,
  placeholders: [
    'experimentType',
    'mainApparatus',
    'supportingEquipment',
    'heatSource',
    'cooling',
    'collectionVessel',
    'safetyEquipment',
    'procedureOverview',
  ],
  mermaidExample: `flowchart TD
    subgraph distillation["Simple Distillation Setup"]
        A["Round Bottom Flask<br/>(with mixture)"]
        B["Heating Mantle"]
        C["Distillation Head"]
        D["Thermometer"]
        E["Condenser<br/>(water-cooled)"]
        F["Vacuum Adapter"]
        G["Collection Flask"]
    end

    B --> A
    A --> C
    D --> C
    C --> E
    E --> F
    F --> G

    classDef heating fill:#fef3c7,stroke:#d97706
    classDef cooling fill:#dbeafe,stroke:#2563eb

    class B heating
    class E cooling`,
};

/**
 * Distillation Procedure template
 */
export const distillationProcedure: DiagramTemplate = {
  id: 'chem-distillation-procedure',
  name: 'Distillation Procedure',
  description: 'Step-by-step distillation setup and procedure diagram',
  domain: 'chemistry',
  promptTemplate: `Create a distillation procedure diagram:
- Distillation type: {{distillationType}}
- Mixture to separate: {{mixture}}
- Boiling points: {{boilingPoints}}
- Equipment required: {{equipment}}
- Heat source: {{heatSource}}
- Condenser type: {{condenserType}}
- Collection fractions: {{fractions}}
- Safety precautions: {{safetyPrecautions}}`,
  placeholders: [
    'distillationType',
    'mixture',
    'boilingPoints',
    'equipment',
    'heatSource',
    'condenserType',
    'fractions',
    'safetyPrecautions',
  ],
  mermaidExample: `flowchart TD
    subgraph setup["Fractional Distillation"]
        flask["Round Bottom Flask"]
        column["Fractionating Column"]
        head["Distillation Head"]
        therm["Thermometer"]
        condenser["Condenser"]
        receiver["Receiving Flask"]
    end

    subgraph fractions["Collected Fractions"]
        f1["Fraction 1: 40-60°C"]
        f2["Fraction 2: 60-80°C"]
        f3["Fraction 3: 80-100°C"]
    end

    flask --> column --> head
    therm --> head
    head --> condenser --> receiver`,
};

/**
 * Extraction Procedure template
 */
export const extractionProcedure: DiagramTemplate = {
  id: 'chem-extraction-procedure',
  name: 'Extraction Procedure',
  description: 'Liquid-liquid extraction procedure flowchart',
  domain: 'chemistry',
  promptTemplate: `Create an extraction procedure diagram:
- Extraction type: {{extractionType}}
- Aqueous phase: {{aqueousPhase}}
- Organic phase: {{organicPhase}}
- Compound to extract: {{compoundToExtract}}
- pH adjustments: {{pHAdjustments}}
- Number of extractions: {{numberOfExtractions}}
- Drying agent: {{dryingAgent}}
- Final workup: {{finalWorkup}}`,
  placeholders: [
    'extractionType',
    'aqueousPhase',
    'organicPhase',
    'compoundToExtract',
    'pHAdjustments',
    'numberOfExtractions',
    'dryingAgent',
    'finalWorkup',
  ],
  mermaidExample: `flowchart TD
    A["Starting Mixture"] --> B["Add to Sep Funnel"]
    B --> C["Add Organic Solvent"]
    C --> D["Shake & Vent"]
    D --> E["Allow Layers to Separate"]
    E --> F{"Which Layer?"}
    F -->|"Lower"| G["Drain Bottom Layer"]
    F -->|"Upper"| H["Pour Off Top Layer"]
    G --> I["Dry over MgSO₄"]
    H --> I
    I --> J["Filter & Evaporate"]
    J --> K["Pure Product"]`,
};

/**
 * Recrystallization Procedure template
 */
export const recrystallizationProcedure: DiagramTemplate = {
  id: 'chem-recrystallization-procedure',
  name: 'Recrystallization Procedure',
  description: 'Purification by recrystallization procedure diagram',
  domain: 'chemistry',
  promptTemplate: `Create a recrystallization procedure diagram:
- Compound to purify: {{compound}}
- Solvent selection: {{solvent}}
- Hot solvent volume: {{hotSolventVolume}}
- Decolorization (if needed): {{decolorization}}
- Cooling method: {{coolingMethod}}
- Filtration method: {{filtrationMethod}}
- Washing solvent: {{washingSolvent}}
- Yield expected: {{yieldExpected}}`,
  placeholders: [
    'compound',
    'solvent',
    'hotSolventVolume',
    'decolorization',
    'coolingMethod',
    'filtrationMethod',
    'washingSolvent',
    'yieldExpected',
  ],
  mermaidExample: `flowchart TD
    A["Impure Solid"] --> B["Dissolve in<br/>Hot Solvent"]
    B --> C{"Colored<br/>Impurities?"}
    C -->|"Yes"| D["Add Activated<br/>Charcoal"]
    C -->|"No"| E["Hot Filtration"]
    D --> E
    E --> F["Slow Cooling"]
    F --> G["Crystal Formation"]
    G --> H["Vacuum Filtration"]
    H --> I["Wash with<br/>Cold Solvent"]
    I --> J["Dry Crystals"]
    J --> K["Pure Product"]`,
};

// =============================================================================
// ELECTROCHEMISTRY
// =============================================================================

/**
 * Electrochemical Cell template
 */
export const electrochemicalCell: DiagramTemplate = {
  id: 'chem-electrochemical-cell',
  name: 'Electrochemical Cell',
  description: 'Galvanic or electrolytic cell diagram with half-reactions',
  domain: 'chemistry',
  promptTemplate: `Create an electrochemical cell diagram:
- Cell type: {{cellType}}
- Anode material: {{anode}}
- Cathode material: {{cathode}}
- Anode half-reaction: {{anodeReaction}}
- Cathode half-reaction: {{cathodeReaction}}
- Electrolyte solutions: {{electrolytes}}
- Salt bridge: {{saltBridge}}
- Cell potential (E°): {{cellPotential}}
- Electron flow direction: {{electronFlow}}`,
  placeholders: [
    'cellType',
    'anode',
    'cathode',
    'anodeReaction',
    'cathodeReaction',
    'electrolytes',
    'saltBridge',
    'cellPotential',
    'electronFlow',
  ],
  mermaidExample: `flowchart LR
    subgraph anode["Anode (Oxidation)"]
        A["Zn electrode"]
        A1["Zn → Zn²⁺ + 2e⁻"]
        A2["ZnSO₄ solution"]
    end

    subgraph cathode["Cathode (Reduction)"]
        C["Cu electrode"]
        C1["Cu²⁺ + 2e⁻ → Cu"]
        C2["CuSO₄ solution"]
    end

    subgraph bridge["Salt Bridge"]
        SB["KNO₃ or KCl"]
    end

    A -->|"e⁻ flow"| C
    A2 <-->|"ions"| SB
    SB <-->|"ions"| C2

    note["E°cell = +1.10 V"]`,
};

/**
 * Redox Reaction Balance template
 */
export const redoxBalance: DiagramTemplate = {
  id: 'chem-redox-balance',
  name: 'Redox Reaction Balancing',
  description: 'Step-by-step balancing of redox reactions',
  domain: 'chemistry',
  promptTemplate: `Create a redox reaction balancing diagram:
- Unbalanced reaction: {{unbalancedReaction}}
- Oxidation half-reaction: {{oxidationHalf}}
- Reduction half-reaction: {{reductionHalf}}
- Oxidation state changes: {{oxidationStates}}
- Electron transfer: {{electronTransfer}}
- Balancing in acidic/basic solution: {{solutionType}}
- Balanced equation: {{balancedEquation}}
- Verification: {{verification}}`,
  placeholders: [
    'unbalancedReaction',
    'oxidationHalf',
    'reductionHalf',
    'oxidationStates',
    'electronTransfer',
    'solutionType',
    'balancedEquation',
    'verification',
  ],
  mermaidExample: `flowchart TD
    A["Unbalanced Equation"] --> B["Separate into<br/>Half-Reactions"]
    B --> C["Balance atoms<br/>(except O, H)"]
    C --> D["Balance O<br/>(add H₂O)"]
    D --> E["Balance H<br/>(add H⁺)"]
    E --> F["Balance charge<br/>(add e⁻)"]
    F --> G["Equalize electrons"]
    G --> H["Add half-reactions"]
    H --> I["Simplify"]
    I --> J["Verify balance"]`,
};

// =============================================================================
// EQUILIBRIUM & ACIDS/BASES
// =============================================================================

/**
 * Chemical Equilibrium template
 */
export const chemicalEquilibrium: DiagramTemplate = {
  id: 'chem-chemical-equilibrium',
  name: 'Chemical Equilibrium',
  description: 'Le Chatelier principle and equilibrium constant diagram',
  domain: 'chemistry',
  promptTemplate: `Create a chemical equilibrium diagram:
- Equilibrium reaction: {{equilibriumReaction}}
- Equilibrium constant (K): {{equilibriumConstant}}
- Concentrations at equilibrium: {{concentrations}}
- Le Chatelier perturbations: {{perturbations}}
- Shift direction: {{shiftDirection}}
- Temperature effect: {{temperatureEffect}}
- Pressure effect: {{pressureEffect}}
- Q vs K comparison: {{qVsK}}`,
  placeholders: [
    'equilibriumReaction',
    'equilibriumConstant',
    'concentrations',
    'perturbations',
    'shiftDirection',
    'temperatureEffect',
    'pressureEffect',
    'qVsK',
  ],
  mermaidExample: `flowchart TD
    subgraph reaction["Equilibrium"]
        eq["N₂ + 3H₂ ⇌ 2NH₃"]
        K["K = [NH₃]²/[N₂][H₂]³"]
    end

    subgraph lechatelier["Le Chatelier's Principle"]
        add_react["Add N₂/H₂ → Shift Right"]
        add_prod["Add NH₃ → Shift Left"]
        inc_P["Increase P → Shift Right"]
        inc_T["Increase T → Shift Left<br/>(exothermic)"]
    end

    eq --> K
    K --> add_react & add_prod & inc_P & inc_T`,
};

/**
 * Buffer Solution template
 */
export const bufferSolution: DiagramTemplate = {
  id: 'chem-buffer-solution',
  name: 'Buffer Solution',
  description: 'Buffer system composition and Henderson-Hasselbalch equation',
  domain: 'chemistry',
  promptTemplate: `Create a buffer solution diagram:
- Buffer type: {{bufferType}}
- Weak acid/base: {{weakAcidBase}}
- Conjugate pair: {{conjugatePair}}
- pKa value: {{pKa}}
- Buffer pH: {{bufferPH}}
- Henderson-Hasselbalch: {{hendersonHasselbalch}}
- Buffer capacity: {{bufferCapacity}}
- Response to added acid/base: {{responseToAddition}}`,
  placeholders: [
    'bufferType',
    'weakAcidBase',
    'conjugatePair',
    'pKa',
    'bufferPH',
    'hendersonHasselbalch',
    'bufferCapacity',
    'responseToAddition',
  ],
  mermaidExample: `flowchart TD
    subgraph buffer["Acetate Buffer System"]
        acid["CH₃COOH<br/>(Weak Acid)"]
        base["CH₃COO⁻<br/>(Conjugate Base)"]
        hh["pH = pKa + log([A⁻]/[HA])"]
    end

    subgraph action["Buffer Action"]
        add_acid["Add H⁺ →<br/>A⁻ + H⁺ → HA"]
        add_base["Add OH⁻ →<br/>HA + OH⁻ → A⁻ + H₂O"]
    end

    acid <--> base
    base --> add_acid
    acid --> add_base`,
};

// =============================================================================
// PERIODIC TRENDS
// =============================================================================

/**
 * Periodic Trends template
 */
export const periodicTrends: DiagramTemplate = {
  id: 'chem-periodic-trends',
  name: 'Periodic Trends',
  description: 'Diagram showing periodic trends in atomic properties across the periodic table',
  domain: 'chemistry',
  promptTemplate: `Create a periodic trends diagram:
- Property to display: {{property}}
- Direction across period: {{periodTrend}}
- Direction down group: {{groupTrend}}
- Elements to highlight: {{highlightElements}}
- Exceptions to note: {{exceptions}}
- Explanation of trend: {{trendExplanation}}
- Comparison examples: {{comparisonExamples}}
- Applications: {{applications}}`,
  placeholders: [
    'property',
    'periodTrend',
    'groupTrend',
    'highlightElements',
    'exceptions',
    'trendExplanation',
    'comparisonExamples',
    'applications',
  ],
  mermaidExample: `flowchart TD
    subgraph trends["Periodic Trends"]
        ar["Atomic Radius<br/>↓ increases down group<br/>← decreases across period"]
        ie["Ionization Energy<br/>↑ decreases down group<br/>→ increases across period"]
        en["Electronegativity<br/>↑ decreases down group<br/>→ increases across period"]
        ea["Electron Affinity<br/>Generally increases<br/>toward halogens"]
    end

    subgraph examples["Key Examples"]
        maxEN["Most EN: F (4.0)"]
        minEN["Least EN: Cs (0.79)"]
        maxIE["Highest 1st IE: He"]
        minIE["Lowest 1st IE: Cs"]
    end

    ar --> ie
    ie --> en
    en --> ea

    classDef increase fill:#dcfce7,stroke:#16a34a
    classDef decrease fill:#fecaca,stroke:#dc2626

    class ie,en increase
    class ar decrease`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All chemistry templates exported as an array
 */
export const chemistryTemplates: DiagramTemplate[] = [
  // Reaction Mechanisms
  reactionMechanism,
  chemSN1Mechanism,
  chemSN2Mechanism,
  eliminationMechanism,
  additionMechanism,
  // Molecular Structures
  molecularStructure,
  lewisStructure,
  vseprGeometry,
  orbitalHybridization,
  // Thermodynamics & Kinetics
  energyDiagram,
  chemPhaseDiagram,
  kineticsRateLaw,
  // Analytical Chemistry
  titrationCurve,
  electronConfiguration,
  chromatographyAnalysis,
  spectroscopyInterpretation,
  // Laboratory Procedures
  laboratorySetup,
  distillationProcedure,
  extractionProcedure,
  recrystallizationProcedure,
  // Electrochemistry
  electrochemicalCell,
  redoxBalance,
  // Equilibrium & Acids/Bases
  chemicalEquilibrium,
  bufferSolution,
  // Periodic Table
  periodicTrends,
];

export default chemistryTemplates;
