// Botany diagram templates for scientific illustration
import type { DiagramTemplate } from './index';

export const photosynthesisProcessTemplate: DiagramTemplate = {
  id: 'bot-photosynthesis',
  name: 'Photosynthesis Process Diagram',
  description: 'Comprehensive diagram showing light and dark reactions of photosynthesis',
  domain: 'biology',
  promptTemplate: `Create a photosynthesis diagram showing:
- Light reactions location: {{lightReactionsLocation}}
- Dark reactions location: {{darkReactionsLocation}}
- Electron transport chain: {{electronTransport}}
- ATP/NADPH production: {{atpNadphProduction}}
- Calvin cycle steps: {{calvinCycleSteps}}

Include photosystems I and II, and CO2 fixation.`,
  placeholders: ['lightReactionsLocation', 'darkReactionsLocation', 'electronTransport', 'atpNadphProduction', 'calvinCycleSteps'],
  mermaidExample: `flowchart LR
    subgraph Photosynthesis["Photosynthesis Overview"]
        subgraph Light["Light Reactions - Thylakoid"]
            PSII[Photosystem II] --> ETC[Electron Transport]
            ETC --> PSI[Photosystem I]
            PSI --> NADPH[NADPH]
            ETC --> ATP[ATP]
        end
        subgraph Dark["Calvin Cycle - Stroma"]
            CO2[CO2] --> FIX[Carbon Fixation]
            FIX --> RED[Reduction]
            RED --> REG[Regeneration]
            REG --> G3P[G3P Output]
        end
        ATP --> Dark
        NADPH --> Dark
    end`
};

export const plantCellStructureTemplate: DiagramTemplate = {
  id: 'bot-plant-cell',
  name: 'Plant Cell Structure',
  description: 'Detailed diagram of plant cell with all organelles and structures',
  domain: 'biology',
  promptTemplate: `Create a plant cell diagram showing:
- Cell wall components: {{cellWallComponents}}
- Chloroplast structure: {{chloroplastStructure}}
- Vacuole function: {{vacuoleFunction}}
- Plasmodesmata: {{plasmodesmata}}
- Other organelles: {{otherOrganelles}}

Highlight plant-specific structures distinct from animal cells.`,
  placeholders: ['cellWallComponents', 'chloroplastStructure', 'vacuoleFunction', 'plasmodesmata', 'otherOrganelles'],
  mermaidExample: `flowchart TB
    subgraph PlantCell["Plant Cell Structure"]
        WALL[Cell Wall] --> MEM[Plasma Membrane]
        MEM --> CYTO[Cytoplasm]
        CYTO --> VAC[Central Vacuole]
        CYTO --> CHLOR[Chloroplasts]
        CYTO --> NUC[Nucleus]
        CYTO --> MITO[Mitochondria]
        CYTO --> ER[Endoplasmic Reticulum]
        CYTO --> GOLGI[Golgi Apparatus]
        WALL --> PLASMO[Plasmodesmata]
    end`
};

export const plantAnatomyTemplate: DiagramTemplate = {
  id: 'bot-plant-anatomy',
  name: 'Plant Body Organization',
  description: 'Diagram showing organization of plant tissues and organs',
  domain: 'biology',
  promptTemplate: `Create a plant anatomy diagram showing:
- Root system: {{rootSystem}}
- Shoot system: {{shootSystem}}
- Tissue types: {{tissueTypes}}
- Meristems: {{meristems}}
- Vascular arrangement: {{vascularArrangement}}

Show cross-sections and longitudinal views.`,
  placeholders: ['rootSystem', 'shootSystem', 'tissueTypes', 'meristems', 'vascularArrangement'],
  mermaidExample: `flowchart TB
    subgraph PlantBody["Plant Body Organization"]
        subgraph Shoot["Shoot System"]
            LEAF[Leaves]
            STEM[Stem]
            FLOWER[Flowers]
        end
        subgraph Root["Root System"]
            TAP[Taproot/Fibrous]
            RHAIR[Root Hairs]
        end
        subgraph Tissues["Tissue Systems"]
            DERM[Dermal]
            VASC[Vascular]
            GROUND[Ground]
        end
    end`
};

export const waterTransportTemplate: DiagramTemplate = {
  id: 'bot-water-transport',
  name: 'Plant Water Transport',
  description: 'Diagram showing water movement from roots to leaves',
  domain: 'biology',
  promptTemplate: `Create a water transport diagram showing:
- Root water uptake: {{rootUptake}}
- Xylem pathway: {{xylemPathway}}
- Transpiration pull: {{transpirationPull}}
- Cohesion-tension theory: {{cohesionTension}}
- Stomatal regulation: {{stomatalRegulation}}

Include pressure gradients and driving forces.`,
  placeholders: ['rootUptake', 'xylemPathway', 'transpirationPull', 'cohesionTension', 'stomatalRegulation'],
  mermaidExample: `flowchart TB
    subgraph Transport["Water Transport"]
        SOIL[Soil Water] --> ROOT[Root Absorption]
        ROOT --> XYLEM[Xylem Vessels]
        XYLEM --> STEM[Stem Transport]
        STEM --> LEAF[Leaf Mesophyll]
        LEAF --> STOMA[Stomata]
        STOMA --> TRANS[Transpiration]
        TRANS --> |Tension| XYLEM
    end`
};

export const phloemTransportTemplate: DiagramTemplate = {
  id: 'bot-phloem-transport',
  name: 'Phloem Sugar Transport',
  description: 'Diagram showing pressure-flow mechanism of sugar translocation',
  domain: 'biology',
  promptTemplate: `Create a phloem transport diagram showing:
- Source tissues: {{sourceTissues}}
- Sink tissues: {{sinkTissues}}
- Sieve tube elements: {{sieveTubes}}
- Companion cells: {{companionCells}}
- Pressure-flow mechanism: {{pressureFlow}}

Show loading at source and unloading at sink.`,
  placeholders: ['sourceTissues', 'sinkTissues', 'sieveTubes', 'companionCells', 'pressureFlow'],
  mermaidExample: `flowchart LR
    subgraph Phloem["Phloem Transport"]
        SOURCE[Source - Leaf] --> LOAD[Sugar Loading]
        LOAD --> SIEVE[Sieve Tube]
        SIEVE --> |Pressure Flow| SINK[Sink - Root/Fruit]
        SINK --> UNLOAD[Sugar Unloading]
        COMP[Companion Cells] --> |Support| SIEVE
    end`
};

export const flowerStructureTemplate: DiagramTemplate = {
  id: 'bot-flower-structure',
  name: 'Flower Anatomy',
  description: 'Detailed diagram of flower parts and reproductive structures',
  domain: 'biology',
  promptTemplate: `Create a flower anatomy diagram showing:
- Sepals and petals: {{petalSepal}}
- Stamens (male parts): {{stamens}}
- Carpels (female parts): {{carpels}}
- Ovary position: {{ovaryPosition}}
- Flower type: {{flowerType}}

Label all whorls and reproductive structures.`,
  placeholders: ['petalSepal', 'stamens', 'carpels', 'ovaryPosition', 'flowerType'],
  mermaidExample: `flowchart TB
    subgraph Flower["Flower Structure"]
        subgraph Sterile["Sterile Whorls"]
            SEPAL[Sepals - Calyx]
            PETAL[Petals - Corolla]
        end
        subgraph Fertile["Fertile Whorls"]
            subgraph Male["Male"]
                ANTHER[Anther]
                FILA[Filament]
            end
            subgraph Female["Female"]
                STIGMA[Stigma]
                STYLE[Style]
                OVARY[Ovary]
            end
        end
    end`
};

export const plantLifeCycleTemplate: DiagramTemplate = {
  id: 'bot-plant-life-cycle',
  name: 'Plant Life Cycle - Alternation of Generations',
  description: 'Diagram showing alternation between sporophyte and gametophyte generations',
  domain: 'biology',
  promptTemplate: `Create a plant life cycle diagram showing:
- Sporophyte generation: {{sporophyte}}
- Gametophyte generation: {{gametophyte}}
- Meiosis location: {{meiosisLocation}}
- Fertilization: {{fertilization}}
- Dominant generation: {{dominantGeneration}}

Compare moss, fern, and flowering plant life cycles.`,
  placeholders: ['sporophyte', 'gametophyte', 'meiosisLocation', 'fertilization', 'dominantGeneration'],
  mermaidExample: `flowchart TB
    subgraph Lifecycle["Alternation of Generations"]
        SPORO[Sporophyte 2n] --> |Meiosis| SPORE[Spores n]
        SPORE --> GAMETO[Gametophyte n]
        GAMETO --> |Mitosis| GAMETE[Gametes n]
        GAMETE --> |Fertilization| ZYGOTE[Zygote 2n]
        ZYGOTE --> SPORO
    end`
};

export const pollinationMechanismsTemplate: DiagramTemplate = {
  id: 'bot-pollination',
  name: 'Pollination Mechanisms',
  description: 'Diagram showing different pollination strategies and adaptations',
  domain: 'biology',
  promptTemplate: `Create a pollination diagram showing:
- Pollination type: {{pollinationType}}
- Pollinator adaptations: {{pollinatorAdaptations}}
- Flower adaptations: {{flowerAdaptations}}
- Pollen transfer: {{pollenTransfer}}
- Reproductive success: {{reproductiveSuccess}}

Include wind, insect, bird, and bat pollination.`,
  placeholders: ['pollinationType', 'pollinatorAdaptations', 'flowerAdaptations', 'pollenTransfer', 'reproductiveSuccess'],
  mermaidExample: `flowchart TB
    subgraph Pollination["Pollination Mechanisms"]
        subgraph Biotic["Biotic Pollination"]
            INSECT[Insect - Entomophily]
            BIRD[Bird - Ornithophily]
            BAT[Bat - Chiropterophily]
        end
        subgraph Abiotic["Abiotic Pollination"]
            WIND[Wind - Anemophily]
            WATER[Water - Hydrophily]
        end
    end`
};

export const seedGerminationTemplate: DiagramTemplate = {
  id: 'bot-seed-germination',
  name: 'Seed Germination Process',
  description: 'Diagram showing stages of seed germination and seedling development',
  domain: 'biology',
  promptTemplate: `Create a seed germination diagram showing:
- Seed structure: {{seedStructure}}
- Germination conditions: {{germinationConditions}}
- Imbibition process: {{imbibition}}
- Radicle emergence: {{radicleEmergence}}
- Seedling establishment: {{seedlingEstablishment}}

Show epigeal vs hypogeal germination patterns.`,
  placeholders: ['seedStructure', 'germinationConditions', 'imbibition', 'radicleEmergence', 'seedlingEstablishment'],
  mermaidExample: `flowchart LR
    subgraph Germination["Seed Germination"]
        DORM[Dormant Seed] --> IMB[Imbibition]
        IMB --> ACT[Enzyme Activation]
        ACT --> RAD[Radicle Emergence]
        RAD --> HYPO[Hypocotyl Growth]
        HYPO --> COT[Cotyledon Emergence]
        COT --> SEED[Seedling]
    end`
};

export const plantHormoneTemplate: DiagramTemplate = {
  id: 'bot-plant-hormones',
  name: 'Plant Hormone Actions',
  description: 'Diagram showing major plant hormones and their effects',
  domain: 'biology',
  promptTemplate: `Create a plant hormone diagram showing:
- Hormone type: {{hormoneType}}
- Synthesis location: {{synthesisLocation}}
- Target tissues: {{targetTissues}}
- Physiological effects: {{effects}}
- Hormone interactions: {{interactions}}

Include auxin, cytokinin, gibberellin, ABA, and ethylene.`,
  placeholders: ['hormoneType', 'synthesisLocation', 'targetTissues', 'effects', 'interactions'],
  mermaidExample: `flowchart TB
    subgraph Hormones["Plant Hormones"]
        subgraph Growth["Growth Promoters"]
            AUX[Auxin - Cell Elongation]
            CYT[Cytokinin - Cell Division]
            GA[Gibberellin - Stem Growth]
        end
        subgraph Stress["Stress Response"]
            ABA[ABA - Dormancy/Stomatal Closure]
            ETH[Ethylene - Ripening/Senescence]
        end
    end`
};

export const plantTropismTemplate: DiagramTemplate = {
  id: 'bot-tropisms',
  name: 'Plant Tropisms and Movements',
  description: 'Diagram showing plant growth responses to environmental stimuli',
  domain: 'biology',
  promptTemplate: `Create a plant tropism diagram showing:
- Tropism type: {{tropismType}}
- Stimulus direction: {{stimulusDirection}}
- Hormone redistribution: {{hormoneRedistribution}}
- Growth response: {{growthResponse}}
- Signal transduction: {{signalTransduction}}

Include phototropism, gravitropism, and thigmotropism.`,
  placeholders: ['tropismType', 'stimulusDirection', 'hormoneRedistribution', 'growthResponse', 'signalTransduction'],
  mermaidExample: `flowchart TB
    subgraph Tropisms["Plant Tropisms"]
        PHOTO[Phototropism] --> |Light| SHOOT1[Shoot bends toward light]
        GRAVI[Gravitropism] --> |Gravity| ROOT[Root grows downward]
        GRAVI --> |Gravity| SHOOT2[Shoot grows upward]
        THIGMO[Thigmotropism] --> |Touch| COIL[Tendril coiling]
    end`
};

export const leafAnatomyTemplate: DiagramTemplate = {
  id: 'bot-leaf-anatomy',
  name: 'Leaf Cross-Section Anatomy',
  description: 'Detailed cross-section of leaf showing tissue layers',
  domain: 'biology',
  promptTemplate: `Create a leaf anatomy diagram showing:
- Epidermis layers: {{epidermis}}
- Mesophyll types: {{mesophyll}}
- Vascular bundle: {{vascularBundle}}
- Stomata and guard cells: {{stomata}}
- Cuticle: {{cuticle}}

Compare C3, C4, and CAM leaf anatomy.`,
  placeholders: ['epidermis', 'mesophyll', 'vascularBundle', 'stomata', 'cuticle'],
  mermaidExample: `flowchart TB
    subgraph Leaf["Leaf Cross-Section"]
        CUT[Cuticle] --> UEPID[Upper Epidermis]
        UEPID --> PAL[Palisade Mesophyll]
        PAL --> SPONGY[Spongy Mesophyll]
        SPONGY --> LEPID[Lower Epidermis]
        LEPID --> STOMA[Stomata + Guard Cells]
        SPONGY --> VEIN[Vascular Bundle]
    end`
};

export const rootStructureTemplate: DiagramTemplate = {
  id: 'bot-root-structure',
  name: 'Root Structure and Function',
  description: 'Diagram showing root anatomy and absorption mechanisms',
  domain: 'biology',
  promptTemplate: `Create a root structure diagram showing:
- Root zones: {{rootZones}}
- Root cap function: {{rootCap}}
- Vascular cylinder: {{vascularCylinder}}
- Casparian strip: {{casparianStrip}}
- Root hair absorption: {{rootHairAbsorption}}

Include longitudinal and cross-sectional views.`,
  placeholders: ['rootZones', 'rootCap', 'vascularCylinder', 'casparianStrip', 'rootHairAbsorption'],
  mermaidExample: `flowchart TB
    subgraph Root["Root Structure"]
        CAP[Root Cap] --> MERI[Meristematic Zone]
        MERI --> ELONG[Elongation Zone]
        ELONG --> MAT[Maturation Zone]
        MAT --> HAIR[Root Hairs]
        subgraph CrossSection["Cross-Section"]
            EPID[Epidermis] --> CORT[Cortex]
            CORT --> ENDO[Endodermis + Casparian Strip]
            ENDO --> PERI[Pericycle]
            PERI --> VASC[Vascular Cylinder]
        end
    end`
};

export const plantDefenseTemplate: DiagramTemplate = {
  id: 'bot-plant-defense',
  name: 'Plant Defense Mechanisms',
  description: 'Diagram showing physical and chemical plant defenses',
  domain: 'biology',
  promptTemplate: `Create a plant defense diagram showing:
- Physical defenses: {{physicalDefenses}}
- Chemical defenses: {{chemicalDefenses}}
- Induced responses: {{inducedResponses}}
- Systemic acquired resistance: {{sar}}
- Herbivore interactions: {{herbivoreInteractions}}

Include both constitutive and induced defenses.`,
  placeholders: ['physicalDefenses', 'chemicalDefenses', 'inducedResponses', 'sar', 'herbivoreInteractions'],
  mermaidExample: `flowchart TB
    subgraph Defense["Plant Defense Mechanisms"]
        subgraph Physical["Physical Defenses"]
            THORN[Thorns/Spines]
            TRICH[Trichomes]
            THICK[Thick Cuticle]
        end
        subgraph Chemical["Chemical Defenses"]
            ALKA[Alkaloids]
            TERP[Terpenes]
            PHENOL[Phenolics]
        end
        subgraph Induced["Induced Responses"]
            JAZ[Jasmonic Acid Pathway]
            SAL[Salicylic Acid Pathway]
        end
    end`
};

export const c4CamPhotosynthesisTemplate: DiagramTemplate = {
  id: 'bot-c4-cam',
  name: 'C4 and CAM Photosynthesis',
  description: 'Comparison of C3, C4, and CAM photosynthetic pathways',
  domain: 'biology',
  promptTemplate: `Create a C4/CAM comparison diagram showing:
- C3 pathway: {{c3Pathway}}
- C4 anatomy: {{c4Anatomy}}
- C4 pathway: {{c4Pathway}}
- CAM temporal separation: {{camTemporal}}
- Environmental adaptations: {{adaptations}}

Show spatial vs temporal CO2 concentration mechanisms.`,
  placeholders: ['c3Pathway', 'c4Anatomy', 'c4Pathway', 'camTemporal', 'adaptations'],
  mermaidExample: `flowchart TB
    subgraph Comparison["Photosynthesis Types"]
        subgraph C3["C3 Plants"]
            C3CO2[CO2] --> C3RUB[RuBisCO] --> C3CAL[Calvin Cycle]
        end
        subgraph C4["C4 Plants"]
            C4CO2[CO2] --> C4PEP[PEP Carboxylase - Mesophyll]
            C4PEP --> C4MAL[Malate] --> C4BS[Bundle Sheath]
            C4BS --> C4CAL[Calvin Cycle]
        end
        subgraph CAM["CAM Plants"]
            NIGHT[Night: CO2 Fixed] --> ACID[Organic Acids Stored]
            ACID --> DAY[Day: Calvin Cycle]
        end
    end`
};

export const plantPhylogenyTemplate: DiagramTemplate = {
  id: 'bot-plant-phylogeny',
  name: 'Plant Kingdom Phylogeny',
  description: 'Evolutionary tree of major plant groups',
  domain: 'biology',
  promptTemplate: `Create a plant phylogeny diagram showing:
- Major plant groups: {{majorGroups}}
- Key evolutionary innovations: {{innovations}}
- Divergence timeline: {{timeline}}
- Ancestral characteristics: {{ancestralChars}}
- Derived characteristics: {{derivedChars}}

Show progression from algae to angiosperms.`,
  placeholders: ['majorGroups', 'innovations', 'timeline', 'ancestralChars', 'derivedChars'],
  mermaidExample: `flowchart TB
    subgraph Phylogeny["Plant Evolution"]
        ALGAE[Green Algae] --> BRYO[Bryophytes - No Vascular Tissue]
        ALGAE --> VASC[Vascular Plants]
        VASC --> SEED[Seedless - Ferns]
        VASC --> SEEDED[Seed Plants]
        SEEDED --> GYMNO[Gymnosperms - Naked Seeds]
        SEEDED --> ANGIO[Angiosperms - Enclosed Seeds]
    end`
};

export const secondaryGrowthTemplate: DiagramTemplate = {
  id: 'bot-secondary-growth',
  name: 'Secondary Growth in Stems',
  description: 'Diagram showing wood formation and annual growth rings',
  domain: 'biology',
  promptTemplate: `Create a secondary growth diagram showing:
- Vascular cambium: {{vascularCambium}}
- Cork cambium: {{corkCambium}}
- Xylem production: {{xylomProduction}}
- Phloem production: {{phloemProduction}}
- Annual rings: {{annualRings}}

Show cross-section with bark, sapwood, and heartwood.`,
  placeholders: ['vascularCambium', 'corkCambium', 'xylomProduction', 'phloemProduction', 'annualRings'],
  mermaidExample: `flowchart LR
    subgraph SecondaryGrowth["Secondary Growth"]
        CORK[Cork/Bark] --> CCAMB[Cork Cambium]
        CCAMB --> PHLO[Secondary Phloem]
        PHLO --> VCAMB[Vascular Cambium]
        VCAMB --> XYLM[Secondary Xylem]
        XYLM --> SAP[Sapwood]
        SAP --> HEART[Heartwood]
    end`
};

// Export all botany templates
export const botanyTemplates: DiagramTemplate[] = [
  photosynthesisProcessTemplate,
  plantCellStructureTemplate,
  plantAnatomyTemplate,
  waterTransportTemplate,
  phloemTransportTemplate,
  flowerStructureTemplate,
  plantLifeCycleTemplate,
  pollinationMechanismsTemplate,
  seedGerminationTemplate,
  plantHormoneTemplate,
  plantTropismTemplate,
  leafAnatomyTemplate,
  rootStructureTemplate,
  plantDefenseTemplate,
  c4CamPhotosynthesisTemplate,
  plantPhylogenyTemplate,
  secondaryGrowthTemplate
];

export default botanyTemplates;
