/**
 * organic.ts
 * Organic Chemistry diagram templates
 *
 * Contains comprehensive templates for organic chemistry including:
 * - Reaction mechanisms (SN1, SN2, E1, E2, addition, etc.)
 * - Synthesis routes and retrosynthesis
 * - Stereochemistry diagrams
 * - Functional group transformations
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// REACTION MECHANISMS
// =============================================================================

/**
 * SN1 Mechanism template
 */
export const sn1Mechanism: DiagramTemplate = {
  id: 'organic-sn1-mechanism',
  name: 'SN1 Reaction Mechanism',
  description: 'Unimolecular nucleophilic substitution mechanism with carbocation intermediate',
  domain: 'chemistry',
  promptTemplate: `Create an SN1 reaction mechanism diagram:
- Substrate: {{substrate}}
- Leaving group: {{leavingGroup}}
- Nucleophile: {{nucleophile}}
- Solvent: {{solvent}}
- Carbocation stability: {{carbocationStability}}
- Rate expression: {{rateExpression}}
- Stereochemistry: {{stereochemistry}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substrate',
    'leavingGroup',
    'nucleophile',
    'solvent',
    'carbocationStability',
    'rateExpression',
    'stereochemistry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Step1["Step 1: Rate-Determining"]
        A["R-X"] -->|"Slow"| B["R+ + X-"]
    end
    subgraph Step2["Step 2: Fast"]
        B -->|"Nu- Fast"| C["R-Nu"]
    end
    style B fill:#ff6b6b,color:#fff
    style A fill:#4ecdc4
    style C fill:#45b7d1`,
};

/**
 * SN2 Mechanism template
 */
export const sn2Mechanism: DiagramTemplate = {
  id: 'organic-sn2-mechanism',
  name: 'SN2 Reaction Mechanism',
  description: 'Bimolecular nucleophilic substitution with backside attack',
  domain: 'chemistry',
  promptTemplate: `Create an SN2 reaction mechanism diagram:
- Substrate: {{substrate}}
- Nucleophile: {{nucleophile}}
- Leaving group: {{leavingGroup}}
- Transition state: {{transitionState}}
- Inversion of configuration: {{inversionDetails}}
- Rate expression: {{rateExpression}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substrate',
    'nucleophile',
    'leavingGroup',
    'transitionState',
    'inversionDetails',
    'rateExpression',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Nu-"] --> B["Substrate"]
    B --> C["[Nu---C---X]‡"]
    C --> D["Product + X-"]
    style C fill:#ffd93d,stroke:#ff6b6b
    style A fill:#4ecdc4
    style D fill:#45b7d1`,
};

/**
 * E1 Elimination template
 */
export const e1Elimination: DiagramTemplate = {
  id: 'organic-e1-elimination',
  name: 'E1 Elimination Mechanism',
  description: 'Unimolecular elimination with carbocation intermediate',
  domain: 'chemistry',
  promptTemplate: `Create an E1 elimination mechanism diagram:
- Substrate: {{substrate}}
- Leaving group: {{leavingGroup}}
- Base: {{base}}
- Carbocation intermediate: {{carbocation}}
- Alkene product: {{alkeneProduct}}
- Zaitsev/Hofmann selectivity: {{regioselectivity}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substrate',
    'leavingGroup',
    'base',
    'carbocation',
    'alkeneProduct',
    'regioselectivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["R-CH2-CH2-X"] -->|"Slow -X-"| B["R-CH2-CH2+"]
    B -->|"Fast -H+"| C["R-CH=CH2"]
    D["Base"] -.->|"removes H+"| B
    style B fill:#ff6b6b,color:#fff`,
};

/**
 * E2 Elimination template
 */
export const e2Elimination: DiagramTemplate = {
  id: 'organic-e2-elimination',
  name: 'E2 Elimination Mechanism',
  description: 'Bimolecular elimination with antiperiplanar geometry requirement',
  domain: 'chemistry',
  promptTemplate: `Create an E2 elimination mechanism diagram:
- Substrate: {{substrate}}
- Base: {{base}}
- Leaving group: {{leavingGroup}}
- Antiperiplanar requirement: {{antiperiplanar}}
- Alkene product(s): {{alkeneProducts}}
- Stereochemistry: {{stereochemistry}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substrate',
    'base',
    'leavingGroup',
    'antiperiplanar',
    'alkeneProducts',
    'stereochemistry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["B:"] --> B["H-C-C-X"]
    B --> C["[B--H--C=C--X]‡"]
    C --> D["C=C + BH + X-"]
    style C fill:#ffd93d`,
};

/**
 * Electrophilic Addition template
 */
export const electrophilicAddition: DiagramTemplate = {
  id: 'organic-electrophilic-addition',
  name: 'Electrophilic Addition to Alkenes',
  description: 'Addition of electrophiles to carbon-carbon double bonds',
  domain: 'chemistry',
  promptTemplate: `Create an electrophilic addition mechanism:
- Alkene substrate: {{alkene}}
- Electrophile: {{electrophile}}
- Carbocation/cyclic intermediate: {{intermediate}}
- Nucleophile attack: {{nucleophileAttack}}
- Product: {{product}}
- Regioselectivity (Markovnikov): {{regioselectivity}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'alkene',
    'electrophile',
    'intermediate',
    'nucleophileAttack',
    'product',
    'regioselectivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["C=C"] -->|"E+"| B["Carbocation"]
    B -->|"Nu-"| C["Product"]
    subgraph Markovnikov
        B -->|"H adds to C with more H"| D["More stable carbocation"]
    end
    style B fill:#ff6b6b,color:#fff`,
};

// =============================================================================
// SYNTHESIS AND RETROSYNTHESIS
// =============================================================================

/**
 * Retrosynthesis template
 */
export const retrosynthesis: DiagramTemplate = {
  id: 'organic-retrosynthesis',
  name: 'Retrosynthetic Analysis',
  description: 'Working backwards from target molecule to starting materials',
  domain: 'chemistry',
  promptTemplate: `Create a retrosynthetic analysis diagram:
- Target molecule: {{targetMolecule}}
- Disconnection sites: {{disconnections}}
- Synthons identified: {{synthons}}
- Synthetic equivalents: {{syntheticEquivalents}}
- Key transforms: {{keyTransforms}}
- Starting materials: {{startingMaterials}}
{{#additionalNotes}}Strategic considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetMolecule',
    'disconnections',
    'synthons',
    'syntheticEquivalents',
    'keyTransforms',
    'startingMaterials',
    'additionalNotes',
  ],
  mermaidExample: `flowchart RL
    A["Target"] ==>|"FGI"| B["Intermediate 1"]
    B ==>|"Disconnect"| C["Synthon A + B"]
    C ==>|"Equivalent"| D["Starting Materials"]
    style A fill:#45b7d1
    style D fill:#4ecdc4`,
};

/**
 * Multi-step Synthesis template
 */
export const multistepSynthesis: DiagramTemplate = {
  id: 'organic-multistep-synthesis',
  name: 'Multi-Step Synthesis Route',
  description: 'Complete synthesis pathway with reagents and conditions',
  domain: 'chemistry',
  promptTemplate: `Create a multi-step synthesis diagram:
- Starting material: {{startingMaterial}}
- Final product: {{finalProduct}}
- Number of steps: {{numberOfSteps}}
- Key intermediates: {{intermediates}}
- Reagents and conditions: {{reagentsConditions}}
- Overall yield: {{overallYield}}
{{#additionalNotes}}Optimization notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingMaterial',
    'finalProduct',
    'numberOfSteps',
    'intermediates',
    'reagentsConditions',
    'overallYield',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["SM"] -->|"1. NBS, hv"| B["Bromide"]
    B -->|"2. NaOH, H2O"| C["Alcohol"]
    C -->|"3. PCC"| D["Aldehyde"]
    D -->|"4. Grignard"| E["Product"]
    style A fill:#4ecdc4
    style E fill:#45b7d1`,
};

/**
 * Grignard Reaction template
 */
export const grignardReaction: DiagramTemplate = {
  id: 'organic-grignard-reaction',
  name: 'Grignard Reaction',
  description: 'Organomagnesium reagent reactions with carbonyl compounds',
  domain: 'chemistry',
  promptTemplate: `Create a Grignard reaction diagram:
- Grignard reagent: {{grignardReagent}}
- Carbonyl substrate: {{carbonylSubstrate}}
- Reaction conditions: {{conditions}}
- Alkoxide intermediate: {{alkoxide}}
- Work-up: {{workup}}
- Final product: {{product}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'grignardReagent',
    'carbonylSubstrate',
    'conditions',
    'alkoxide',
    'workup',
    'product',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["RMgBr"] + B["R'CHO"] -->|"Et2O"| C["R-CH(OMgBr)-R'"]
    C -->|"H3O+"| D["R-CH(OH)-R'"]
    style A fill:#4ecdc4
    style D fill:#45b7d1`,
};

// =============================================================================
// STEREOCHEMISTRY
// =============================================================================

/**
 * R/S Configuration template
 */
export const rsConfiguration: DiagramTemplate = {
  id: 'organic-rs-configuration',
  name: 'R/S Configuration Determination',
  description: 'Cahn-Ingold-Prelog priority rules for absolute configuration',
  domain: 'chemistry',
  promptTemplate: `Create an R/S configuration diagram:
- Chiral center: {{chiralCenter}}
- Four substituents: {{substituents}}
- Priority ranking: {{priorityRanking}}
- Lowest priority position: {{lowestPriority}}
- Direction of rotation: {{rotation}}
- Final configuration: {{configuration}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chiralCenter',
    'substituents',
    'priorityRanking',
    'lowestPriority',
    'rotation',
    'configuration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CIP["CIP Priority Rules"]
        A["Higher atomic # = Higher priority"]
        B["If tie, compare next atoms"]
        C["Double bonds = 2 single bonds"]
    end
    D["1 > 2 > 3 > 4"] --> E{"Rotation?"}
    E -->|"Clockwise"| F["R"]
    E -->|"Counter"| G["S"]
    style F fill:#45b7d1
    style G fill:#ff6b6b`,
};

/**
 * E/Z Isomerism template
 */
export const ezIsomerism: DiagramTemplate = {
  id: 'organic-ez-isomerism',
  name: 'E/Z Isomer Determination',
  description: 'Geometric isomerism in alkenes using CIP rules',
  domain: 'chemistry',
  promptTemplate: `Create an E/Z isomerism diagram:
- Alkene structure: {{alkeneStructure}}
- Substituents on C1: {{c1Substituents}}
- Substituents on C2: {{c2Substituents}}
- Priority on each carbon: {{priorities}}
- Configuration: {{configuration}}
- Physical properties difference: {{physicalDifference}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'alkeneStructure',
    'c1Substituents',
    'c2Substituents',
    'priorities',
    'configuration',
    'physicalDifference',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph E["E-isomer (trans)"]
        A["High priority groups on opposite sides"]
    end
    subgraph Z["Z-isomer (cis)"]
        B["High priority groups on same side"]
    end
    style E fill:#45b7d1
    style Z fill:#ff6b6b`,
};

/**
 * Conformational Analysis template
 */
export const conformationalAnalysis: DiagramTemplate = {
  id: 'organic-conformational-analysis',
  name: 'Conformational Analysis',
  description: 'Energy profile of molecular conformations',
  domain: 'chemistry',
  promptTemplate: `Create a conformational analysis diagram:
- Molecule: {{molecule}}
- Bond rotation: {{bondRotation}}
- Energy minima: {{energyMinima}}
- Energy maxima: {{energyMaxima}}
- Steric interactions: {{stericInteractions}}
- Most stable conformation: {{mostStable}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'molecule',
    'bondRotation',
    'energyMinima',
    'energyMaxima',
    'stericInteractions',
    'mostStable',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Anti"] -->|"Rotate 60°"| B["Gauche"]
    B -->|"Rotate 60°"| C["Eclipsed"]
    C -->|"Rotate 60°"| D["Gauche"]
    D -->|"Rotate 60°"| E["Eclipsed"]
    E -->|"Rotate 60°"| A
    style A fill:#4ecdc4
    style C fill:#ff6b6b
    style E fill:#ff6b6b`,
};

// =============================================================================
// FUNCTIONAL GROUP TRANSFORMATIONS
// =============================================================================

/**
 * Oxidation-Reduction template
 */
export const oxidationReduction: DiagramTemplate = {
  id: 'organic-oxidation-reduction',
  name: 'Oxidation-Reduction Reactions',
  description: 'Oxidation states of carbon and reagent selection',
  domain: 'chemistry',
  promptTemplate: `Create an oxidation-reduction diagram:
- Starting functional group: {{startingFG}}
- Target functional group: {{targetFG}}
- Oxidation state change: {{oxidationChange}}
- Reagent used: {{reagent}}
- Selectivity: {{selectivity}}
- Side products: {{sideProducts}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingFG',
    'targetFG',
    'oxidationChange',
    'reagent',
    'selectivity',
    'sideProducts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Oxidation["Oxidation Ladder"]
        A["Alkane"] -->|"[O]"| B["Alcohol"]
        B -->|"[O]"| C["Aldehyde"]
        C -->|"[O]"| D["Carboxylic Acid"]
    end
    subgraph Reduction["Reduction"]
        D -->|"[H]"| C
        C -->|"[H]"| B
    end`,
};

/**
 * Protecting Groups template
 */
export const protectingGroups: DiagramTemplate = {
  id: 'organic-protecting-groups',
  name: 'Protecting Group Strategy',
  description: 'Protection and deprotection of functional groups',
  domain: 'chemistry',
  promptTemplate: `Create a protecting group strategy diagram:
- Functional group to protect: {{functionalGroup}}
- Protecting group: {{protectingGroup}}
- Protection conditions: {{protectionConditions}}
- Stability during: {{stabilityDuring}}
- Deprotection conditions: {{deprotectionConditions}}
- Orthogonality with: {{orthogonality}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'functionalGroup',
    'protectingGroup',
    'protectionConditions',
    'stabilityDuring',
    'deprotectionConditions',
    'orthogonality',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["R-OH"] -->|"TBSCl, imidazole"| B["R-OTBS"]
    B -->|"Reactions"| C["Product-OTBS"]
    C -->|"TBAF"| D["Product-OH"]
    style B fill:#ffd93d
    style D fill:#45b7d1`,
};

/**
 * Aldol Reaction template
 */
export const aldolReaction: DiagramTemplate = {
  id: 'organic-aldol-reaction',
  name: 'Aldol Reaction',
  description: 'Carbon-carbon bond formation via enolate chemistry',
  domain: 'chemistry',
  promptTemplate: `Create an aldol reaction diagram:
- Enolizable carbonyl: {{enolizable}}
- Electrophilic carbonyl: {{electrophile}}
- Base/catalyst: {{baseCatalyst}}
- Beta-hydroxy product: {{aldolProduct}}
- Dehydration product: {{dehydrationProduct}}
- Stereochemistry: {{stereochemistry}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enolizable',
    'electrophile',
    'baseCatalyst',
    'aldolProduct',
    'dehydrationProduct',
    'stereochemistry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ketone"] -->|"Base"| B["Enolate"]
    B + C["Aldehyde"] --> D["β-hydroxy ketone"]
    D -->|"Heat/-H2O"| E["α,β-unsaturated"]
    style B fill:#ff6b6b,color:#fff
    style E fill:#45b7d1`,
};

/**
 * Diels-Alder Reaction template
 */
export const dielsAlder: DiagramTemplate = {
  id: 'organic-diels-alder',
  name: 'Diels-Alder Reaction',
  description: '[4+2] cycloaddition between diene and dienophile',
  domain: 'chemistry',
  promptTemplate: `Create a Diels-Alder reaction diagram:
- Diene: {{diene}}
- Dienophile: {{dienophile}}
- s-cis requirement: {{scisCis}}
- Endo/exo selectivity: {{endoExo}}
- Stereochemistry: {{stereochemistry}}
- Product cyclohexene: {{product}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diene',
    'dienophile',
    'scisCis',
    'endoExo',
    'stereochemistry',
    'product',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["Diene (4π)"] + B["Dienophile (2π)"] -->|"[4+2]"| C["Cyclohexene"]
    subgraph Rules
        D["Diene must be s-cis"]
        E["Endo typically favored"]
    end
    style C fill:#45b7d1`,
};

/**
 * Aromatic Substitution template
 */
export const aromaticSubstitution: DiagramTemplate = {
  id: 'organic-aromatic-substitution',
  name: 'Electrophilic Aromatic Substitution',
  description: 'EAS mechanism with directing effects',
  domain: 'chemistry',
  promptTemplate: `Create an electrophilic aromatic substitution diagram:
- Aromatic substrate: {{aromaticSubstrate}}
- Electrophile: {{electrophile}}
- Lewis acid catalyst: {{lewisAcid}}
- Sigma complex: {{sigmaComplex}}
- Directing groups present: {{directingGroups}}
- Regioselectivity: {{regioselectivity}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'aromaticSubstrate',
    'electrophile',
    'lewisAcid',
    'sigmaComplex',
    'directingGroups',
    'regioselectivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Benzene"] + B["E+"] --> C["σ-complex"]
    C -->|"-H+"| D["Product"]
    subgraph Directing["Directing Effects"]
        E["EDG → ortho/para"]
        F["EWG → meta"]
    end
    style C fill:#ff6b6b,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All organic chemistry templates
 */
export const organicTemplates: DiagramTemplate[] = [
  // Reaction Mechanisms
  sn1Mechanism,
  sn2Mechanism,
  e1Elimination,
  e2Elimination,
  electrophilicAddition,
  // Synthesis
  retrosynthesis,
  multistepSynthesis,
  grignardReaction,
  // Stereochemistry
  rsConfiguration,
  ezIsomerism,
  conformationalAnalysis,
  // Functional Group Transformations
  oxidationReduction,
  protectingGroups,
  aldolReaction,
  dielsAlder,
  aromaticSubstitution,
];

export default organicTemplates;
