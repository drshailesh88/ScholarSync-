/**
 * botany-prompts.ts
 * Botany-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for botany topics including:
 * - Plant anatomy and morphology
 * - Photosynthesis and respiration
 * - Plant reproduction and life cycles
 * - Plant hormones and signaling
 * - Plant ecology and interactions
 * - Plant taxonomy and evolution
 * - Plant physiology
 * - Agricultural botany
 * - Plant biotechnology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// BOTANY DOMAIN PROMPT
// =============================================================================

/**
 * Base botany domain prompt for plant science diagrams
 */
export const BOTANY_DOMAIN_PROMPT = `
Botany diagram requirements:
- Use standard botanical terminology and nomenclature
- Follow established conventions for plant diagrams and cross-sections
- Include appropriate scale bars and labels
- Use consistent color coding for plant tissues and structures
- Show directional arrows for transport, growth, and developmental processes
- Reference standard botanical classification systems
- Include legend/key for tissue types
- Color coding: Epidermis (light green), Mesophyll (green), Vascular (red/blue), Meristem (yellow)
- Cross-sections: Xylem (red/pink), Phloem (blue/purple), Cambium (green), Cortex (light green)`;

// =============================================================================
// BOTANY-SPECIFIC PROMPTS
// =============================================================================

export const BOTANY_PROMPTS = {
  // Plant Anatomy
  plantCellStructure: `
Plant Cell Structure requirements:
- Show cell wall (primary and secondary)
- Include plasma membrane
- Show central vacuole (large)
- Include chloroplasts with thylakoids
- Show nucleus and nucleolus
- Include mitochondria
- Show endoplasmic reticulum (rough and smooth)
- Include Golgi apparatus
- Show plasmodesmata connections
- Reference unique plant organelles`,

  leafAnatomy: `
Leaf Anatomy (Cross-Section) requirements:
- Show upper and lower epidermis
- Include cuticle layer
- Show palisade mesophyll
- Include spongy mesophyll
- Show vascular bundle (xylem and phloem)
- Include stomata and guard cells
- Show air spaces
- Reference C3 vs C4 anatomy differences
- Include bundle sheath cells if applicable`,

  stemAnatomy: `
Stem Anatomy requirements:
- Show epidermis and cortex
- Include vascular bundles arrangement
- Show xylem and phloem orientation
- Include pith (dicot) or scattered bundles (monocot)
- Show cambium layer (dicot)
- Include secondary growth if applicable
- Show bark layers (older stems)
- Reference monocot vs dicot differences`,

  rootAnatomy: `
Root Anatomy requirements:
- Show root cap and meristem
- Include zone of elongation
- Show zone of differentiation
- Include epidermis and root hairs
- Show cortex and endodermis
- Include Casparian strip
- Show vascular cylinder (stele)
- Reference primary vs secondary root structure`,

  // Photosynthesis
  photosynthesisOverview: `
Photosynthesis Overview requirements:
- Show light-dependent reactions (thylakoid)
- Include light-independent reactions (stroma)
- Show electron transport chain
- Include ATP and NADPH production
- Show Calvin cycle stages
- Include carbon fixation by RuBisCO
- Show inputs (CO2, H2O, light) and outputs (glucose, O2)
- Reference overall equation`,

  lightReactions: `
Light Reactions Diagram requirements:
- Show Photosystem II and I
- Include electron transport chain
- Show water splitting (photolysis)
- Include plastoquinone and cytochrome b6f
- Show NADP+ reduction
- Include chemiosmosis and ATP synthase
- Show cyclic vs non-cyclic pathways
- Reference Z-scheme representation`,

  calvinCycle: `
Calvin Cycle (Dark Reactions) requirements:
- Show carbon fixation (CO2 + RuBP)
- Include 3-PGA formation
- Show reduction phase (G3P formation)
- Include ATP and NADPH usage
- Show regeneration of RuBP
- Include stoichiometry (3 CO2 = 1 G3P)
- Show connection to sucrose/starch synthesis
- Reference RuBisCO enzyme`,

  c4CamPhotosynthesis: `
C4 and CAM Photosynthesis requirements:
- Show spatial separation (C4) vs temporal separation (CAM)
- Include mesophyll and bundle sheath cells (C4)
- Show PEP carboxylase role
- Include CO2 concentration mechanism
- Show malate/aspartate shuttle (C4)
- Include stomatal patterns (CAM)
- Reference adaptive advantages
- Compare to C3 pathway`,

  // Plant Reproduction
  flowerAnatomy: `
Flower Anatomy requirements:
- Show all four whorls (sepals, petals, stamens, carpels)
- Include receptacle and pedicel
- Show anther and filament (stamen)
- Include stigma, style, ovary (pistil)
- Show ovules inside ovary
- Include nectaries if present
- Reference perfect vs imperfect flowers
- Show monocot vs dicot differences`,

  pollinationFertilization: `
Pollination and Fertilization requirements:
- Show pollen grain structure
- Include pollen tube growth
- Show double fertilization process
- Include sperm cells (2)
- Show egg cell and polar nuclei fusion
- Include embryo and endosperm formation
- Reference self vs cross pollination
- Show pollination syndromes`,

  seedDevelopment: `
Seed Development requirements:
- Show embryo structure (radicle, hypocotyl, cotyledons)
- Include seed coat (testa)
- Show endosperm or cotyledon food storage
- Include micropyle and hilum
- Show monocot vs dicot seed differences
- Include dormancy mechanisms
- Reference germination process
- Show seed dispersal mechanisms`,

  plantLifeCycle: `
Plant Life Cycle (Alternation of Generations) requirements:
- Show sporophyte generation (2n)
- Include gametophyte generation (n)
- Show meiosis producing spores
- Include mitosis producing gametes
- Show fertilization (syngamy)
- Include angiosperm life cycle specifics
- Reference dominant generation differences
- Compare moss, fern, and seed plant cycles`,

  // Plant Hormones
  plantHormones: `
Plant Hormones Overview requirements:
- Show five major hormone classes
- Include auxin (IAA) effects
- Show cytokinins functions
- Include gibberellins roles
- Show abscisic acid (ABA) functions
- Include ethylene effects
- Reference hormone interactions
- Show sites of synthesis and action`,

  auxinFunction: `
Auxin Action Diagram requirements:
- Show polar auxin transport
- Include cell elongation mechanism
- Show phototropism response
- Include gravitropism response
- Show apical dominance
- Include acid growth hypothesis
- Reference auxin receptor (TIR1)
- Show auxin gradients in development`,

  // Plant Ecology
  plantWaterRelations: `
Plant Water Relations requirements:
- Show soil-plant-atmosphere continuum
- Include water potential gradients
- Show root water uptake
- Include xylem transport (cohesion-tension)
- Show transpiration through stomata
- Include stomatal regulation
- Reference water use efficiency
- Show drought adaptations`,

  plantNutrition: `
Plant Nutrition Diagram requirements:
- Show essential macro and micronutrients
- Include nutrient uptake mechanisms
- Show deficiency symptoms
- Include nitrogen assimilation
- Show mycorrhizal associations
- Include nitrogen fixation (legumes)
- Reference nutrient mobility
- Show hydroponics application`,

  plantDefense: `
Plant Defense Mechanisms requirements:
- Show physical barriers (thorns, trichomes)
- Include chemical defenses (secondary metabolites)
- Show induced defense responses
- Include systemic acquired resistance (SAR)
- Show jasmonic acid signaling
- Include hypersensitive response
- Reference plant immune system (PTI, ETI)
- Show herbivore and pathogen defenses`,

  // Plant Development
  meristemFunction: `
Meristem Organization requirements:
- Show shoot apical meristem (SAM)
- Include root apical meristem (RAM)
- Show lateral meristems (cambium)
- Include meristem zones (CZ, PZ, RZ)
- Show cell fate determination
- Include organogenesis
- Reference stem cell maintenance
- Show phytomer concept`,

  tropismResponses: `
Plant Tropism Diagram requirements:
- Show phototropism mechanism
- Include gravitropism (shoots and roots)
- Show thigmotropism
- Include hydrotropism
- Show hormone redistribution
- Include statoliths and amyloplasts
- Reference signal transduction
- Show positive vs negative responses`,

  secondaryGrowth: `
Secondary Growth requirements:
- Show vascular cambium activity
- Include secondary xylem (wood) formation
- Show secondary phloem formation
- Include cork cambium (phellogen)
- Show bark formation
- Include annual rings
- Reference heartwood vs sapwood
- Show ray parenchyma`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Botany-specific few-shot examples
 */
export const BOTANY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing leaf cross-section anatomy',
    output: `flowchart TB
    subgraph leaf["Leaf Cross-Section"]
        subgraph upper["Upper Surface"]
            cuticle_up["Waxy Cuticle<br/>(Water loss prevention)"]
            epidermis_up["Upper Epidermis<br/>(Single cell layer)"]
        end

        subgraph mesophyll["Mesophyll Tissue"]
            palisade["Palisade Mesophyll<br/>(Columnar cells)<br/>Main photosynthesis site<br/>Many chloroplasts"]
            spongy["Spongy Mesophyll<br/>(Irregular cells)<br/>Air spaces for gas exchange"]
        end

        subgraph vascular["Vascular Bundle (Vein)"]
            xylem["Xylem<br/>(Water transport)<br/>Upper position"]
            phloem["Phloem<br/>(Sugar transport)<br/>Lower position"]
            bundle_sheath["Bundle Sheath<br/>(Surrounds vascular tissue)"]
        end

        subgraph lower["Lower Surface"]
            epidermis_low["Lower Epidermis"]
            cuticle_low["Cuticle (thinner)"]
            stoma["Stomata"]
            guard["Guard Cells<br/>(Regulate opening)"]
        end
    end

    subgraph functions["Key Functions"]
        f1["Photosynthesis:<br/>CO2 + H2O + Light → Glucose + O2"]
        f2["Gas Exchange:<br/>CO2 in, O2 out (day)<br/>via stomata"]
        f3["Transpiration:<br/>Water vapor loss<br/>drives xylem flow"]
    end

    cuticle_up --> epidermis_up
    epidermis_up --> palisade
    palisade --> spongy
    spongy --> vascular
    vascular --> epidermis_low
    epidermis_low --> stoma
    stoma --- guard

    classDef cuticle fill:#fef3c7,stroke:#d97706
    classDef epidermis fill:#bbf7d0,stroke:#22c55e
    classDef palisade fill:#22c55e,stroke:#16a34a,color:#fff
    classDef spongy fill:#86efac,stroke:#22c55e
    classDef xylem fill:#fca5a5,stroke:#ef4444
    classDef phloem fill:#c4b5fd,stroke:#8b5cf6
    classDef stoma fill:#fef3c7,stroke:#d97706

    class cuticle_up,cuticle_low cuticle
    class epidermis_up,epidermis_low epidermis
    class palisade palisade
    class spongy spongy
    class xylem xylem
    class phloem phloem
    class stoma,guard stoma`,
  },
  {
    prompt: 'Create a diagram showing the Calvin Cycle',
    output: `flowchart TB
    subgraph calvin["Calvin Cycle (C3 Cycle)"]
        subgraph fixation["1. Carbon Fixation"]
            co2["CO2<br/>(3 molecules)"]
            rubp["RuBP<br/>(Ribulose-1,5-bisphosphate)<br/>3 molecules, 5C each"]
            rubisco["RuBisCO<br/>(Enzyme)"]
            pga["3-PGA<br/>(3-Phosphoglycerate)<br/>6 molecules, 3C each"]
        end

        subgraph reduction["2. Reduction Phase"]
            atp1["ATP<br/>(6 molecules)"]
            nadph["NADPH<br/>(6 molecules)"]
            bpg["1,3-BPG<br/>(6 molecules)"]
            g3p["G3P<br/>(Glyceraldehyde-3-phosphate)<br/>6 molecules, 3C each"]
        end

        subgraph regeneration["3. RuBP Regeneration"]
            g3p_out["1 G3P<br/>→ EXITS cycle<br/>(Net product)"]
            g3p_stay["5 G3P<br/>→ Regenerate RuBP"]
            atp2["ATP<br/>(3 molecules)"]
        end
    end

    subgraph inputs["Inputs (per 3 CO2)"]
        in_co2["3 CO2"]
        in_atp["9 ATP"]
        in_nadph["6 NADPH"]
    end

    subgraph outputs["Outputs"]
        out_g3p["1 G3P (3C)<br/>→ Glucose synthesis"]
        out_adp["9 ADP + 9 Pi"]
        out_nadp["6 NADP+"]
    end

    co2 --> rubisco
    rubp --> rubisco
    rubisco -->|"Carbon fixation"| pga
    pga --> atp1
    atp1 --> bpg
    bpg --> nadph
    nadph --> g3p
    g3p --> g3p_out
    g3p --> g3p_stay
    g3p_stay --> atp2
    atp2 -->|"Regeneration"| rubp

    classDef input fill:#dbeafe,stroke:#3b82f6
    classDef enzyme fill:#fef3c7,stroke:#d97706
    classDef intermediate fill:#dcfce7,stroke:#22c55e
    classDef energy fill:#fee2e2,stroke:#ef4444
    classDef product fill:#22c55e,stroke:#16a34a,color:#fff

    class co2,rubp,in_co2 input
    class rubisco enzyme
    class pga,bpg,g3p,g3p_stay intermediate
    class atp1,nadph,atp2,in_atp,in_nadph energy
    class g3p_out,out_g3p product`,
  },
  {
    prompt: 'Create a diagram showing plant hormone functions',
    output: `flowchart TB
    subgraph hormones["Major Plant Hormones"]
        subgraph auxin["Auxin (IAA)"]
            aux_source["Synthesis: Shoot tips,<br/>young leaves"]
            aux_func["Functions:<br/>• Cell elongation<br/>• Apical dominance<br/>• Tropisms<br/>• Root initiation"]
        end

        subgraph cytokinin["Cytokinins"]
            cyt_source["Synthesis: Root tips,<br/>developing seeds"]
            cyt_func["Functions:<br/>• Cell division<br/>• Shoot growth<br/>• Delay senescence<br/>• Chloroplast development"]
        end

        subgraph gibberellin["Gibberellins (GA)"]
            ga_source["Synthesis: Young tissues,<br/>seeds"]
            ga_func["Functions:<br/>• Stem elongation<br/>• Seed germination<br/>• Flowering<br/>• Fruit development"]
        end

        subgraph aba["Abscisic Acid (ABA)"]
            aba_source["Synthesis: Leaves, roots,<br/>mature fruits"]
            aba_func["Functions:<br/>• Stomatal closure<br/>• Seed dormancy<br/>• Stress response<br/>• Inhibits growth"]
        end

        subgraph ethylene["Ethylene (C2H4)"]
            eth_source["Synthesis: Most tissues,<br/>especially senescing"]
            eth_func["Functions:<br/>• Fruit ripening<br/>• Leaf abscission<br/>• Senescence<br/>• Triple response"]
        end
    end

    subgraph interactions["Hormone Interactions"]
        ratio1["Auxin:Cytokinin ratio<br/>determines organ development"]
        ratio2["GA vs ABA<br/>seed germination control"]
        ratio3["Ethylene + Auxin<br/>abscission zone"]
    end

    subgraph responses["Developmental Responses"]
        growth["Growth &<br/>Elongation"]
        dormancy["Dormancy &<br/>Germination"]
        senescence["Senescence &<br/>Ripening"]
        stress["Stress<br/>Response"]
    end

    auxin --> growth
    cytokinin --> growth
    gibberellin --> growth
    gibberellin --> dormancy
    aba --> dormancy
    aba --> stress
    ethylene --> senescence
    ethylene --> stress

    classDef auxin fill:#22c55e,stroke:#16a34a
    classDef cytokinin fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef ga fill:#f97316,stroke:#ea580c
    classDef aba fill:#ef4444,stroke:#dc2626,color:#fff
    classDef ethylene fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef response fill:#f3f4f6,stroke:#6b7280

    class aux_source,aux_func auxin
    class cyt_source,cyt_func cytokinin
    class ga_source,ga_func ga
    class aba_source,aba_func aba
    class eth_source,eth_func ethylene
    class growth,dormancy,senescence,stress response`,
  },
  {
    prompt: 'Create a diagram showing plant water transport',
    output: `flowchart TB
    subgraph spac["Soil-Plant-Atmosphere Continuum"]
        subgraph soil["Soil"]
            soil_water["Soil Water<br/>Ψ = -0.3 MPa"]
            soil_particles["Soil particles<br/>& air spaces"]
        end

        subgraph roots["Root System"]
            root_hair["Root Hairs<br/>(Increase surface area)"]
            cortex["Cortex<br/>(Apoplast & Symplast)"]
            endodermis["Endodermis<br/>(Casparian strip)"]
            root_xylem["Root Xylem<br/>Ψ = -0.6 MPa"]
        end

        subgraph stem["Stem"]
            stem_xylem["Stem Xylem<br/>(Vessel elements,<br/>Tracheids)<br/>Ψ = -0.8 MPa"]
        end

        subgraph leaf["Leaf"]
            leaf_xylem["Leaf Veins<br/>Ψ = -1.0 MPa"]
            mesophyll["Mesophyll Cells<br/>(Water evaporates)"]
            substomatal["Substomatal<br/>Chamber"]
            stomata["Stomata<br/>Guard Cells"]
        end

        subgraph atmosphere["Atmosphere"]
            atm["Air<br/>Ψ = -100 MPa<br/>(at 50% RH)"]
        end
    end

    subgraph mechanism["Cohesion-Tension Theory"]
        transpiration["Transpiration Pull<br/>(Driving force)"]
        cohesion["Cohesion<br/>(H-bonds between<br/>water molecules)"]
        adhesion["Adhesion<br/>(Water to xylem walls)"]
        tension["Negative pressure<br/>(Tension in xylem)"]
    end

    subgraph regulation["Regulation"]
        aba["ABA<br/>(Drought signal)"]
        guard_mech["Guard Cell<br/>Turgor changes"]
        k_ions["K+ flux<br/>(Open/Close stomata)"]
    end

    soil_water -->|"Osmosis"| root_hair
    root_hair --> cortex
    cortex -->|"Forced through<br/>symplast"| endodermis
    endodermis --> root_xylem
    root_xylem -->|"Cohesion-Tension"| stem_xylem
    stem_xylem --> leaf_xylem
    leaf_xylem --> mesophyll
    mesophyll -->|"Evaporation"| substomatal
    substomatal --> stomata
    stomata -->|"Transpiration"| atm

    transpiration --> tension
    cohesion --> tension
    adhesion --> tension
    aba --> guard_mech
    k_ions --> guard_mech
    guard_mech --> stomata

    classDef soil fill:#d4a574,stroke:#8b6914
    classDef root fill:#fef3c7,stroke:#d97706
    classDef xylem fill:#ef4444,stroke:#dc2626
    classDef leaf fill:#22c55e,stroke:#16a34a
    classDef atm fill:#e0f2fe,stroke:#0284c7
    classDef mechanism fill:#f3e8ff,stroke:#9333ea

    class soil_water,soil_particles soil
    class root_hair,cortex,endodermis root
    class root_xylem,stem_xylem,leaf_xylem xylem
    class mesophyll,substomatal,stomata leaf
    class atm atm
    class transpiration,cohesion,adhesion,tension mechanism`,
  },
  {
    prompt: 'Create a diagram showing alternation of generations in plants',
    output: `flowchart TB
    subgraph lifecycle["Plant Life Cycle: Alternation of Generations"]
        subgraph sporophyte["Sporophyte Generation (2n)"]
            adult_sporo["Adult Sporophyte<br/>(Diploid plant body)"]
            sporangia["Sporangia<br/>(Spore-producing structures)"]
            spore_mother["Spore Mother Cells<br/>(2n)"]
        end

        subgraph meiosis_box["MEIOSIS"]
            meiosis["Meiosis<br/>(Reduction division)<br/>2n → n"]
        end

        subgraph spores["Spores"]
            spore["Spores (n)<br/>(Haploid)"]
            megaspore["Megaspores (n)<br/>(Female)"]
            microspore["Microspores (n)<br/>(Male)"]
        end

        subgraph gametophyte["Gametophyte Generation (n)"]
            female_gameto["Female Gametophyte<br/>(Embryo sac in angiosperms)"]
            male_gameto["Male Gametophyte<br/>(Pollen grain)"]
            egg["Egg Cell (n)"]
            sperm["Sperm Cells (n)"]
        end

        subgraph fertilization_box["FERTILIZATION"]
            fert["Fertilization<br/>(Syngamy)<br/>n + n → 2n"]
        end

        subgraph zygote_dev["Zygote Development"]
            zygote["Zygote (2n)"]
            embryo["Embryo (2n)<br/>(In seed)"]
        end
    end

    subgraph comparison["Dominant Generation by Plant Group"]
        moss["Mosses:<br/>Gametophyte dominant"]
        fern["Ferns:<br/>Sporophyte dominant<br/>(free-living gametophyte)"]
        seed["Seed Plants:<br/>Sporophyte dominant<br/>(reduced gametophyte)"]
    end

    adult_sporo --> sporangia
    sporangia --> spore_mother
    spore_mother --> meiosis
    meiosis --> spore
    spore --> megaspore
    spore --> microspore
    megaspore -->|"Mitosis"| female_gameto
    microspore -->|"Mitosis"| male_gameto
    female_gameto --> egg
    male_gameto --> sperm
    egg --> fert
    sperm --> fert
    fert --> zygote
    zygote -->|"Mitosis"| embryo
    embryo -->|"Growth"| adult_sporo

    classDef diploid fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef haploid fill:#22c55e,stroke:#16a34a,color:#fff
    classDef division fill:#f97316,stroke:#ea580c,color:#fff
    classDef transition fill:#fef3c7,stroke:#d97706

    class adult_sporo,sporangia,spore_mother,zygote,embryo diploid
    class spore,megaspore,microspore,female_gameto,male_gameto,egg,sperm haploid
    class meiosis,fert division
    class moss,fern,seed transition`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  BOTANY_DOMAIN_PROMPT,
  BOTANY_PROMPTS,
  BOTANY_FEW_SHOT_EXAMPLES,
};
