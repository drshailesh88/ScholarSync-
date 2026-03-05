// Zoology diagram templates for scientific illustration
import type { DiagramTemplate } from './index';

export const animalPhylogenyTemplate: DiagramTemplate = {
  id: 'zoo-animal-phylogeny',
  name: 'Animal Phylogenetic Tree',
  description: 'Phylogenetic tree showing evolutionary relationships among major animal groups',
  domain: 'biology',
  promptTemplate: `Create an animal phylogenetic tree showing:
- Root: {{ancestralGroup}}
- Major clades: {{majorClades}}
- Key synapomorphies: {{synapomorphies}}
- Divergence times: {{divergenceTimes}}
- Outgroup: {{outgroup}}

Include branch support values and scale bar for evolutionary distance.`,
  placeholders: ['ancestralGroup', 'majorClades', 'synapomorphies', 'divergenceTimes', 'outgroup'],
  mermaidExample: `flowchart TB
    subgraph Phylogeny["Animal Phylogenetic Tree"]
        ANC[Common Ancestor] --> PARA[Parazoa]
        ANC --> EUM[Eumetazoa]
        PARA --> PORI[Porifera]
        EUM --> RAD[Radiata]
        EUM --> BIL[Bilateria]
        RAD --> CNID[Cnidaria]
        BIL --> PROT[Protostomia]
        BIL --> DEUT[Deuterostomia]
        PROT --> ECDY[Ecdysozoa]
        PROT --> SPIR[Spiralia]
        DEUT --> CHOR[Chordata]
        DEUT --> ECHI[Echinodermata]
    end`
};

export const vertebrateAnatomyTemplate: DiagramTemplate = {
  id: 'zoo-vertebrate-anatomy',
  name: 'Vertebrate Comparative Anatomy',
  description: 'Comparative anatomy diagram showing homologous structures across vertebrate groups',
  domain: 'biology',
  promptTemplate: `Create a comparative vertebrate anatomy diagram showing:
- Body system: {{bodySystem}}
- Species compared: {{speciesCompared}}
- Homologous structures: {{homologousStructures}}
- Analogous structures: {{analogousStructures}}
- Evolutionary modifications: {{modifications}}

Highlight structural similarities and differences with color coding.`,
  placeholders: ['bodySystem', 'speciesCompared', 'homologousStructures', 'analogousStructures', 'modifications'],
  mermaidExample: `flowchart LR
    subgraph Forelimb["Vertebrate Forelimb Homology"]
        HUM[Human Arm] --> BONE1[Humerus-Radius-Ulna-Carpals-Digits]
        BAT[Bat Wing] --> BONE2[Humerus-Radius-Ulna-Carpals-Elongated Digits]
        WHALE[Whale Flipper] --> BONE3[Humerus-Radius-Ulna-Carpals-Digits]
        HORSE[Horse Leg] --> BONE4[Humerus-Radius-Ulna-Carpals-Single Digit]
    end`
};

export const animalLifeCycleTemplate: DiagramTemplate = {
  id: 'zoo-animal-life-cycle',
  name: 'Animal Life Cycle Diagram',
  description: 'Life cycle diagram showing developmental stages and metamorphosis',
  domain: 'biology',
  promptTemplate: `Create an animal life cycle diagram showing:
- Species: {{species}}
- Developmental stages: {{developmentalStages}}
- Type of metamorphosis: {{metamorphosisType}}
- Duration of each stage: {{stageDurations}}
- Environmental factors: {{environmentalFactors}}

Show circular progression with detailed illustrations of each stage.`,
  placeholders: ['species', 'developmentalStages', 'metamorphosisType', 'stageDurations', 'environmentalFactors'],
  mermaidExample: `flowchart TB
    subgraph Lifecycle["Frog Life Cycle"]
        EGG[Fertilized Egg] --> EMB[Embryo]
        EMB --> TAD[Tadpole]
        TAD --> META[Metamorphosis]
        META --> FROG[Adult Frog]
        FROG --> |Reproduction| EGG
    end`
};

export const animalBehaviorEthogramTemplate: DiagramTemplate = {
  id: 'zoo-ethogram',
  name: 'Animal Behavior Ethogram',
  description: 'Ethogram showing behavioral repertoire and action patterns',
  domain: 'biology',
  promptTemplate: `Create an ethogram diagram showing:
- Species: {{species}}
- Behavioral categories: {{behavioralCategories}}
- Action patterns: {{actionPatterns}}
- Behavioral states: {{behavioralStates}}
- Transition probabilities: {{transitions}}

Organize behaviors by functional category with clear descriptions.`,
  placeholders: ['species', 'behavioralCategories', 'actionPatterns', 'behavioralStates', 'transitions'],
  mermaidExample: `flowchart TB
    subgraph Ethogram["Wolf Ethogram"]
        subgraph Agonistic["Agonistic Behaviors"]
            THREAT[Threat Display]
            SUBMIT[Submission]
            ATTACK[Attack]
        end
        subgraph Social["Social Behaviors"]
            GROOM[Allogrooming]
            PLAY[Play]
            GREET[Greeting]
        end
        subgraph Foraging["Foraging Behaviors"]
            HUNT[Hunting]
            EAT[Feeding]
            CACHE[Food Caching]
        end
    end`
};

export const animalClassificationTemplate: DiagramTemplate = {
  id: 'zoo-classification',
  name: 'Animal Taxonomic Classification',
  description: 'Hierarchical classification showing taxonomic ranks from kingdom to species',
  domain: 'biology',
  promptTemplate: `Create a taxonomic classification diagram showing:
- Species: {{species}}
- Kingdom through Species: {{taxonomicRanks}}
- Diagnostic characteristics: {{diagnosticCharacters}}
- Related taxa: {{relatedTaxa}}
- Common names: {{commonNames}}

Show hierarchical structure with key identifying features at each level.`,
  placeholders: ['species', 'taxonomicRanks', 'diagnosticCharacters', 'relatedTaxa', 'commonNames'],
  mermaidExample: `flowchart TB
    subgraph Classification["Taxonomic Classification - Gray Wolf"]
        KING[Kingdom: Animalia] --> PHYL[Phylum: Chordata]
        PHYL --> CLASS[Class: Mammalia]
        CLASS --> ORD[Order: Carnivora]
        ORD --> FAM[Family: Canidae]
        FAM --> GEN[Genus: Canis]
        GEN --> SPEC[Species: C. lupus]
    end`
};

export const animalDigestiveSystemTemplate: DiagramTemplate = {
  id: 'zoo-digestive-system',
  name: 'Animal Digestive System Comparison',
  description: 'Comparative diagram of digestive systems in different animal groups',
  domain: 'biology',
  promptTemplate: `Create a digestive system comparison showing:
- Animal groups: {{animalGroups}}
- Digestive organs: {{digestiveOrgans}}
- Digestive strategy: {{digestiveStrategy}}
- Specializations: {{specializations}}
- Diet correlation: {{dietCorrelation}}

Compare herbivore, carnivore, and omnivore digestive adaptations.`,
  placeholders: ['animalGroups', 'digestiveOrgans', 'digestiveStrategy', 'specializations', 'dietCorrelation'],
  mermaidExample: `flowchart LR
    subgraph Ruminant["Ruminant Digestion"]
        MOUTH1[Mouth] --> RUM[Rumen] --> RET[Reticulum] --> OMA[Omasum] --> ABO[Abomasum] --> INT1[Intestines]
    end
    subgraph Carnivore["Carnivore Digestion"]
        MOUTH2[Mouth] --> STOM[Simple Stomach] --> SINT[Short Intestines]
    end`
};

export const animalCirculatorySystemTemplate: DiagramTemplate = {
  id: 'zoo-circulatory-system',
  name: 'Animal Circulatory System Evolution',
  description: 'Evolutionary progression of circulatory systems across animal groups',
  domain: 'biology',
  promptTemplate: `Create a circulatory system evolution diagram showing:
- Animal groups: {{animalGroups}}
- Circulation type: {{circulationType}}
- Heart chambers: {{heartChambers}}
- Blood vessels: {{bloodVessels}}
- Gas exchange efficiency: {{gasExchange}}

Show progression from open to closed, and 2-chamber to 4-chamber hearts.`,
  placeholders: ['animalGroups', 'circulationType', 'heartChambers', 'bloodVessels', 'gasExchange'],
  mermaidExample: `flowchart TB
    subgraph Evolution["Circulatory System Evolution"]
        OPEN[Open Circulation - Insects] --> CLOSED[Closed Circulation - Fish]
        CLOSED --> TWO[2-Chamber Heart - Fish]
        TWO --> THREE[3-Chamber Heart - Amphibians]
        THREE --> FOUR[4-Chamber Heart - Birds/Mammals]
    end`
};

export const animalReproductionTemplate: DiagramTemplate = {
  id: 'zoo-reproduction',
  name: 'Animal Reproduction Strategies',
  description: 'Diagram comparing different reproductive strategies across animal groups',
  domain: 'biology',
  promptTemplate: `Create a reproduction strategy diagram showing:
- Reproductive mode: {{reproductiveMode}}
- Fertilization type: {{fertilizationType}}
- Parental investment: {{parentalInvestment}}
- Offspring number: {{offspringNumber}}
- Development type: {{developmentType}}

Compare r-selected vs K-selected species strategies.`,
  placeholders: ['reproductiveMode', 'fertilizationType', 'parentalInvestment', 'offspringNumber', 'developmentType'],
  mermaidExample: `flowchart TB
    subgraph Strategies["Reproductive Strategies"]
        subgraph RSelected["r-Selection"]
            RMANY[Many Offspring]
            RLOW[Low Parental Care]
            RFAST[Fast Maturation]
        end
        subgraph KSelected["K-Selection"]
            KFEW[Few Offspring]
            KHIGH[High Parental Care]
            KSLOW[Slow Maturation]
        end
    end`
};

export const animalMigrationTemplate: DiagramTemplate = {
  id: 'zoo-migration',
  name: 'Animal Migration Pattern',
  description: 'Map showing animal migration routes and seasonal movements',
  domain: 'biology',
  promptTemplate: `Create an animal migration diagram showing:
- Species: {{species}}
- Migration route: {{migrationRoute}}
- Breeding grounds: {{breedingGrounds}}
- Wintering grounds: {{winteringGrounds}}
- Navigation cues: {{navigationCues}}
- Stopover sites: {{stopoverSites}}

Include seasonal timing and distance traveled.`,
  placeholders: ['species', 'migrationRoute', 'breedingGrounds', 'winteringGrounds', 'navigationCues', 'stopoverSites'],
  mermaidExample: `flowchart TB
    subgraph Migration["Arctic Tern Migration"]
        ARCTIC[Arctic Breeding Grounds] --> |Summer| NORTH[North Atlantic]
        NORTH --> |Fall| AFRICA[West Africa Coast]
        AFRICA --> |Winter| ANTARCTIC[Antarctic Feeding Grounds]
        ANTARCTIC --> |Spring| NORTH
        NORTH --> ARCTIC
    end`
};

export const animalCommunicationTemplate: DiagramTemplate = {
  id: 'zoo-communication',
  name: 'Animal Communication Systems',
  description: 'Diagram showing modes and signals in animal communication',
  domain: 'biology',
  promptTemplate: `Create an animal communication diagram showing:
- Species: {{species}}
- Communication channels: {{channels}}
- Signal types: {{signalTypes}}
- Signal functions: {{signalFunctions}}
- Receiver responses: {{receiverResponses}}

Include visual, auditory, chemical, and tactile communication modes.`,
  placeholders: ['species', 'channels', 'signalTypes', 'signalFunctions', 'receiverResponses'],
  mermaidExample: `flowchart LR
    subgraph Communication["Honeybee Communication"]
        subgraph Visual["Visual"]
            WAGGLE[Waggle Dance]
            ROUND[Round Dance]
        end
        subgraph Chemical["Chemical"]
            PHER[Pheromones]
            ALARM[Alarm Signals]
        end
        subgraph Tactile["Tactile"]
            TROPH[Trophallaxis]
            ANTENN[Antennation]
        end
    end`
};

export const animalHomeostasisTemplate: DiagramTemplate = {
  id: 'zoo-homeostasis',
  name: 'Animal Homeostasis Mechanisms',
  description: 'Diagram showing homeostatic regulation in animals',
  domain: 'biology',
  promptTemplate: `Create a homeostasis diagram showing:
- Regulated variable: {{regulatedVariable}}
- Set point: {{setPoint}}
- Sensors: {{sensors}}
- Control center: {{controlCenter}}
- Effectors: {{effectors}}
- Feedback type: {{feedbackType}}

Show negative feedback loops maintaining physiological balance.`,
  placeholders: ['regulatedVariable', 'setPoint', 'sensors', 'controlCenter', 'effectors', 'feedbackType'],
  mermaidExample: `flowchart TB
    subgraph Thermoregulation["Body Temperature Regulation"]
        TEMP[Body Temperature] --> SENSE[Thermoreceptors]
        SENSE --> HYPO[Hypothalamus]
        HYPO --> |Too Hot| SWEAT[Sweating/Vasodilation]
        HYPO --> |Too Cold| SHIVER[Shivering/Vasoconstriction]
        SWEAT --> |Negative Feedback| TEMP
        SHIVER --> |Negative Feedback| TEMP
    end`
};

export const animalLocomotionTemplate: DiagramTemplate = {
  id: 'zoo-locomotion',
  name: 'Animal Locomotion Modes',
  description: 'Comparative diagram of locomotion adaptations in different environments',
  domain: 'biology',
  promptTemplate: `Create an animal locomotion diagram showing:
- Environment: {{environment}}
- Locomotion mode: {{locomotionMode}}
- Anatomical adaptations: {{adaptations}}
- Biomechanics: {{biomechanics}}
- Energy efficiency: {{energyEfficiency}}

Compare walking, running, flying, swimming, and burrowing locomotion.`,
  placeholders: ['environment', 'locomotionMode', 'adaptations', 'biomechanics', 'energyEfficiency'],
  mermaidExample: `flowchart TB
    subgraph Locomotion["Locomotion Modes"]
        subgraph Terrestrial["Terrestrial"]
            WALK[Walking]
            RUN[Running]
            JUMP[Jumping]
        end
        subgraph Aquatic["Aquatic"]
            SWIM[Swimming]
            JET[Jet Propulsion]
        end
        subgraph Aerial["Aerial"]
            FLY[Flapping Flight]
            GLIDE[Gliding]
        end
    end`
};

export const invertebrateDiversityTemplate: DiagramTemplate = {
  id: 'zoo-invertebrate-diversity',
  name: 'Invertebrate Phyla Overview',
  description: 'Diagram showing diversity and characteristics of major invertebrate phyla',
  domain: 'biology',
  promptTemplate: `Create an invertebrate diversity diagram showing:
- Major phyla: {{majorPhyla}}
- Body plans: {{bodyPlans}}
- Key characteristics: {{keyCharacteristics}}
- Ecological roles: {{ecologicalRoles}}
- Species diversity: {{speciesDiversity}}

Organize by body symmetry and complexity.`,
  placeholders: ['majorPhyla', 'bodyPlans', 'keyCharacteristics', 'ecologicalRoles', 'speciesDiversity'],
  mermaidExample: `flowchart TB
    subgraph Invertebrates["Invertebrate Phyla"]
        subgraph Radial["Radial Symmetry"]
            CNID[Cnidaria]
            CTENO[Ctenophora]
        end
        subgraph Bilateral["Bilateral Symmetry"]
            PLATY[Platyhelminthes]
            NEMA[Nematoda]
            MOLL[Mollusca]
            ANNEL[Annelida]
            ARTH[Arthropoda]
            ECHI[Echinodermata]
        end
    end`
};

export const animalEmbryologyTemplate: DiagramTemplate = {
  id: 'zoo-embryology',
  name: 'Animal Embryonic Development',
  description: 'Diagram showing stages of embryonic development and germ layer formation',
  domain: 'biology',
  promptTemplate: `Create an embryology diagram showing:
- Developmental stages: {{stages}}
- Cleavage pattern: {{cleavagePattern}}
- Gastrulation: {{gastrulation}}
- Germ layers: {{germLayers}}
- Tissue derivatives: {{tissueDerivatives}}

Show progression from zygote through organogenesis.`,
  placeholders: ['stages', 'cleavagePattern', 'gastrulation', 'germLayers', 'tissueDerivatives'],
  mermaidExample: `flowchart LR
    subgraph Development["Embryonic Development"]
        ZYG[Zygote] --> CLEAV[Cleavage]
        CLEAV --> BLAST[Blastula]
        BLAST --> GAST[Gastrula]
        GAST --> ECTO[Ectoderm]
        GAST --> MESO[Mesoderm]
        GAST --> ENDO[Endoderm]
    end`
};

export const animalSensorySystemTemplate: DiagramTemplate = {
  id: 'zoo-sensory-systems',
  name: 'Animal Sensory System Diversity',
  description: 'Diagram comparing sensory adaptations across animal groups',
  domain: 'biology',
  promptTemplate: `Create a sensory systems diagram showing:
- Sensory modality: {{sensoryModality}}
- Receptor types: {{receptorTypes}}
- Animal examples: {{animalExamples}}
- Environmental adaptations: {{adaptations}}
- Signal processing: {{signalProcessing}}

Include vision, hearing, chemoreception, mechanoreception, and electroreception.`,
  placeholders: ['sensoryModality', 'receptorTypes', 'animalExamples', 'adaptations', 'signalProcessing'],
  mermaidExample: `flowchart TB
    subgraph Senses["Animal Sensory Systems"]
        subgraph Vision["Vision"]
            COMP[Compound Eyes - Insects]
            CAM[Camera Eyes - Vertebrates]
        end
        subgraph Special["Specialized Senses"]
            ECHO[Echolocation - Bats]
            ELEC[Electroreception - Sharks]
            INFRA[Infrared - Pit Vipers]
        end
    end`
};

export const animalSocialStructureTemplate: DiagramTemplate = {
  id: 'zoo-social-structure',
  name: 'Animal Social Organization',
  description: 'Diagram showing social hierarchy and group structure in social animals',
  domain: 'biology',
  promptTemplate: `Create a social structure diagram showing:
- Species: {{species}}
- Social system: {{socialSystem}}
- Dominance hierarchy: {{dominanceHierarchy}}
- Division of labor: {{divisionOfLabor}}
- Kin relationships: {{kinRelationships}}

Include roles, ranks, and social interactions.`,
  placeholders: ['species', 'socialSystem', 'dominanceHierarchy', 'divisionOfLabor', 'kinRelationships'],
  mermaidExample: `flowchart TB
    subgraph Colony["Honeybee Colony Structure"]
        QUEEN[Queen] --> |Reproduction| DRONE[Drones]
        QUEEN --> |Lay Eggs| WORKER[Workers]
        subgraph Workers["Worker Castes"]
            NURSE[Nurse Bees]
            FORAGE[Foragers]
            GUARD[Guards]
        end
    end`
};

export const animalAdaptationTemplate: DiagramTemplate = {
  id: 'zoo-adaptations',
  name: 'Animal Adaptation Diagram',
  description: 'Diagram showing structural, physiological, and behavioral adaptations',
  domain: 'biology',
  promptTemplate: `Create an adaptation diagram showing:
- Species: {{species}}
- Environment: {{environment}}
- Structural adaptations: {{structuralAdaptations}}
- Physiological adaptations: {{physiologicalAdaptations}}
- Behavioral adaptations: {{behavioralAdaptations}}

Connect adaptations to specific environmental challenges.`,
  placeholders: ['species', 'environment', 'structuralAdaptations', 'physiologicalAdaptations', 'behavioralAdaptations'],
  mermaidExample: `flowchart TB
    subgraph Desert["Desert Adaptations - Camel"]
        subgraph Structural["Structural"]
            HUMP[Fat Storage Hump]
            FEET[Wide Feet]
            LASH[Long Eyelashes]
        end
        subgraph Physiological["Physiological"]
            WATER[Water Conservation]
            TEMP[Temperature Tolerance]
        end
        subgraph Behavioral["Behavioral"]
            NOCT[Nocturnal Activity]
            SHADE[Shade Seeking]
        end
    end`
};

// Export all zoology templates
export const zoologyTemplates: DiagramTemplate[] = [
  animalPhylogenyTemplate,
  vertebrateAnatomyTemplate,
  animalLifeCycleTemplate,
  animalBehaviorEthogramTemplate,
  animalClassificationTemplate,
  animalDigestiveSystemTemplate,
  animalCirculatorySystemTemplate,
  animalReproductionTemplate,
  animalMigrationTemplate,
  animalCommunicationTemplate,
  animalHomeostasisTemplate,
  animalLocomotionTemplate,
  invertebrateDiversityTemplate,
  animalEmbryologyTemplate,
  animalSensorySystemTemplate,
  animalSocialStructureTemplate,
  animalAdaptationTemplate
];

export default zoologyTemplates;
