/**
 * zoology-prompts.ts
 * Zoology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for zoology topics including:
 * - Animal anatomy and morphology
 * - Animal physiology and systems
 * - Animal behavior and ethology
 * - Animal taxonomy and classification
 * - Animal development and life cycles
 * - Invertebrate biology
 * - Vertebrate biology
 * - Comparative anatomy
 * - Animal ecology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ZOOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base zoology domain prompt for animal science diagrams
 */
export const ZOOLOGY_DOMAIN_PROMPT = `
Zoology diagram requirements:
- Use standard zoological terminology and nomenclature (scientific names in italics)
- Follow established conventions for anatomical diagrams and cross-sections
- Include appropriate scale and orientation (dorsal, ventral, anterior, posterior)
- Use consistent color coding for organ systems and tissue types
- Show directional arrows for physiological processes and developmental stages
- Reference standard zoological classification (Linnaean hierarchy)
- Include legend/key for complex diagrams
- Color coding: Nervous (yellow), Muscular (red), Skeletal (white/tan), Circulatory (red/blue)
- Digestive (green), Respiratory (pink), Excretory (brown), Reproductive (purple)`;

// =============================================================================
// ZOOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const ZOOLOGY_PROMPTS = {
  // Animal Anatomy
  animalCellStructure: `
Animal Cell Structure requirements:
- Show plasma membrane (no cell wall)
- Include nucleus with nucleolus
- Show mitochondria
- Include rough and smooth ER
- Show Golgi apparatus
- Include lysosomes
- Show centrioles (animal-specific)
- Include cytoskeleton components
- Reference differences from plant cells`,

  bodySymmetry: `
Body Symmetry and Organization requirements:
- Show asymmetry examples (sponges)
- Include radial symmetry (cnidarians, echinoderms)
- Show bilateral symmetry (most animals)
- Indicate body axes (anterior-posterior, dorsal-ventral)
- Include cephalization concept
- Show body plans (acoelomate, pseudocoelomate, coelomate)
- Reference triploblastic vs diploblastic
- Include segmentation patterns`,

  skeletalSystems: `
Skeletal Systems Comparison requirements:
- Show hydrostatic skeleton (annelids)
- Include exoskeleton (arthropods)
- Show endoskeleton (vertebrates)
- Indicate structural components
- Include advantages and limitations of each
- Show movement mechanisms
- Reference molting in exoskeletons
- Include cartilage vs bone`,

  muscularSystem: `
Muscular System requirements:
- Show three muscle types (skeletal, smooth, cardiac)
- Include sarcomere structure
- Show sliding filament mechanism
- Indicate neuromuscular junction
- Include muscle fiber types
- Show antagonistic muscle pairs
- Reference muscle metabolism
- Include invertebrate muscle variations`,

  // Organ Systems
  digestiveSystemComparison: `
Digestive System Comparison requirements:
- Show incomplete vs complete digestive systems
- Include herbivore, carnivore, omnivore adaptations
- Show ruminant digestive system
- Indicate enzymatic digestion regions
- Include absorption structures
- Show specialized mouthparts
- Reference gut microbiome
- Include filter feeding mechanisms`,

  circulatorySystemComparison: `
Circulatory System Comparison requirements:
- Show open vs closed circulatory systems
- Include single vs double circulation
- Show heart chamber variations (2, 3, 4)
- Indicate blood flow patterns
- Include hemolymph vs blood
- Show respiratory pigments
- Reference hearts in invertebrates
- Include lymphatic system`,

  respiratorySystemComparison: `
Respiratory Systems requirements:
- Show gas exchange across body surface
- Include gills (aquatic)
- Show tracheal system (insects)
- Include book lungs (arachnids)
- Show lungs (terrestrial vertebrates)
- Indicate countercurrent exchange
- Reference respiratory surfaces
- Include ventilation mechanisms`,

  nervousSystemComparison: `
Nervous System Comparison requirements:
- Show nerve net (cnidarians)
- Include ganglia and nerve cords
- Show cephalization progression
- Indicate brain evolution
- Include vertebrate brain regions
- Show sensory organ evolution
- Reference giant axons
- Include autonomic nervous system`,

  excretorySystemComparison: `
Excretory System Comparison requirements:
- Show protonephridia (flame cells)
- Include metanephridia
- Show Malpighian tubules (insects)
- Indicate vertebrate kidney
- Include osmoregulation strategies
- Show nitrogenous waste types
- Reference marine vs freshwater adaptations
- Include water balance mechanisms`,

  // Animal Behavior
  animalBehaviorTypes: `
Animal Behavior Classification requirements:
- Show innate vs learned behaviors
- Include fixed action patterns
- Show classical and operant conditioning
- Indicate imprinting
- Include habituation and sensitization
- Show insight learning
- Reference proximate vs ultimate causes
- Include behavioral genetics`,

  animalCommunication: `
Animal Communication requirements:
- Show visual signals (displays, coloration)
- Include auditory communication
- Show chemical signals (pheromones)
- Indicate tactile communication
- Include electrical communication
- Show multimodal signals
- Reference honest vs dishonest signals
- Include human-animal communication`,

  socialBehavior: `
Social Behavior requirements:
- Show eusociality (insects)
- Include dominance hierarchies
- Show cooperative breeding
- Indicate altruism and kin selection
- Include territoriality
- Show mating systems
- Reference group living benefits/costs
- Include division of labor`,

  // Development
  animalDevelopment: `
Animal Development Stages requirements:
- Show cleavage patterns (radial, spiral)
- Include blastula formation
- Show gastrulation
- Indicate germ layer formation
- Include organogenesis
- Show determinate vs indeterminate cleavage
- Reference protostome vs deuterostome
- Include direct vs indirect development`,

  metamorphosis: `
Metamorphosis Diagram requirements:
- Show complete metamorphosis (holometabolous)
- Include incomplete metamorphosis (hemimetabolous)
- Show amphibian metamorphosis
- Indicate hormonal control (ecdysone, JH)
- Include larval adaptations
- Show metamorphic climax
- Reference ecological significance
- Include neoteny concept`,

  reproductiveStrategies: `
Reproductive Strategies requirements:
- Show sexual vs asexual reproduction
- Include hermaphroditism types
- Show internal vs external fertilization
- Indicate oviparity, viviparity, ovoviviparity
- Include parental care levels
- Show r vs K selection
- Reference sexual selection
- Include parthenogenesis`,

  // Taxonomy and Evolution
  animalPhylogeny: `
Animal Phylogeny requirements:
- Show major animal phyla
- Include key synapomorphies
- Show Bilateria split
- Indicate Ecdysozoa vs Lophotrochozoa
- Include deuterostome relationships
- Show body plan evolution
- Reference molecular phylogenetics
- Include Cambrian explosion`,

  vertebrateEvolution: `
Vertebrate Evolution requirements:
- Show jawless to jawed fish transition
- Include fish to tetrapod transition
- Show amphibian to amniote transition
- Indicate dinosaur-bird evolution
- Include mammal evolution
- Show key adaptations at each transition
- Reference transitional fossils
- Include homologous structures`,

  invertebrateDiversity: `
Invertebrate Diversity requirements:
- Show Porifera (sponges) structure
- Include Cnidaria body forms
- Show Platyhelminthes organization
- Indicate Annelida segmentation
- Include Mollusca body plans
- Show Arthropoda diversity
- Reference Echinodermata features
- Include minor phyla`,

  // Comparative Physiology
  thermoregulation: `
Thermoregulation Comparison requirements:
- Show ectothermy vs endothermy
- Include behavioral thermoregulation
- Show insulation mechanisms
- Indicate metabolic heat production
- Include countercurrent heat exchange
- Show torpor and hibernation
- Reference thermal neutral zone
- Include heterothermy`,

  locomotion: `
Animal Locomotion requirements:
- Show swimming mechanisms
- Include walking/running gaits
- Show flight adaptations
- Indicate burrowing locomotion
- Include jet propulsion
- Show peristaltic movement
- Reference energy costs
- Include convergent evolution of locomotion`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Zoology-specific few-shot examples
 */
export const ZOOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing animal body symmetry types',
    output: `flowchart TB
    subgraph symmetry["Body Symmetry in Animals"]
        subgraph asymmetry["Asymmetry"]
            asym_ex["Sponges (Porifera)<br/>No definite shape<br/>No body axes"]
            asym_img["Irregular form<br/>No planes of symmetry"]
        end

        subgraph radial["Radial Symmetry"]
            rad_ex["Cnidarians (jellyfish)<br/>Echinoderms (sea stars)"]
            rad_desc["Multiple planes of symmetry<br/>through central axis<br/>Oral-aboral axis only"]
            rad_adapt["Adaptation: Sessile or<br/>slow-moving lifestyle"]
        end

        subgraph bilateral["Bilateral Symmetry"]
            bil_ex["Most animals<br/>(Arthropods, Vertebrates,<br/>Mollusks, Annelids)"]
            bil_desc["Single plane of symmetry<br/>Left-right mirror images"]
            bil_axes["Body Axes:<br/>• Anterior-Posterior<br/>• Dorsal-Ventral<br/>• Left-Right"]
            bil_ceph["Cephalization:<br/>Concentration of sensory<br/>organs at anterior end"]
        end
    end

    subgraph body_plans["Body Plans (Coelom)"]
        acoelomate["Acoelomate<br/>(No body cavity)<br/>Flatworms"]
        pseudocoel["Pseudocoelomate<br/>(Partial cavity)<br/>Roundworms"]
        coelomate["Coelomate<br/>(True coelom)<br/>Most bilateral animals"]
    end

    subgraph germ_layers["Germ Layers"]
        diploblastic["Diploblastic (2 layers)<br/>Cnidarians<br/>Ectoderm + Endoderm"]
        triploblastic["Triploblastic (3 layers)<br/>Bilateral animals<br/>+ Mesoderm"]
    end

    asymmetry --> radial
    radial --> bilateral
    radial --> diploblastic
    bilateral --> triploblastic
    triploblastic --> acoelomate
    triploblastic --> pseudocoel
    triploblastic --> coelomate

    classDef asym fill:#d4d4d4,stroke:#737373
    classDef radial fill:#c4b5fd,stroke:#8b5cf6
    classDef bilateral fill:#22c55e,stroke:#16a34a
    classDef plan fill:#fef3c7,stroke:#d97706
    classDef germ fill:#dbeafe,stroke:#3b82f6

    class asym_ex,asym_img asym
    class rad_ex,rad_desc,rad_adapt radial
    class bil_ex,bil_desc,bil_axes,bil_ceph bilateral
    class acoelomate,pseudocoel,coelomate plan
    class diploblastic,triploblastic germ`,
  },
  {
    prompt: 'Create a diagram comparing circulatory systems',
    output: `flowchart TB
    subgraph circulatory["Circulatory System Comparison"]
        subgraph open_sys["Open Circulatory System"]
            open_desc["Hemolymph in hemocoel<br/>(body cavity)"]
            open_heart["Tubular heart<br/>with ostia"]
            open_ex["Examples:<br/>Arthropods<br/>Most mollusks"]
            open_flow["Blood → Heart → Arteries →<br/>Hemocoel → Heart"]
        end

        subgraph closed_sys["Closed Circulatory System"]
            closed_desc["Blood confined to vessels"]
            closed_heart["Muscular heart<br/>with chambers"]
            closed_ex["Examples:<br/>Annelids<br/>Cephalopods<br/>All vertebrates"]
            closed_flow["Blood always in vessels<br/>Capillary exchange"]
        end
    end

    subgraph vertebrate["Vertebrate Heart Evolution"]
        subgraph fish_heart["Fish"]
            fish["2 Chambers<br/>1 atrium, 1 ventricle<br/>Single circulation"]
        end

        subgraph amphibian_heart["Amphibians"]
            amph["3 Chambers<br/>2 atria, 1 ventricle<br/>Double circulation<br/>(some mixing)"]
        end

        subgraph reptile_heart["Reptiles"]
            rept["3-4 Chambers<br/>Partial septum<br/>(complete in crocs)"]
        end

        subgraph mammal_heart["Birds & Mammals"]
            mamm["4 Chambers<br/>Complete separation<br/>No mixing<br/>High metabolic rate"]
        end
    end

    subgraph features["Key Features"]
        pigments["Respiratory Pigments:<br/>Hemoglobin (red)<br/>Hemocyanin (blue)<br/>Hemerythrin (violet)"]
        pressure["Blood Pressure:<br/>Open: Low (~1 mmHg)<br/>Closed: High (40-120 mmHg)"]
    end

    open_sys --> fish_heart
    closed_sys --> fish_heart
    fish_heart --> amphibian_heart
    amphibian_heart --> reptile_heart
    reptile_heart --> mammal_heart

    classDef open fill:#fef3c7,stroke:#d97706
    classDef closed fill:#dbeafe,stroke:#3b82f6
    classDef fish fill:#e0f2fe,stroke:#0284c7
    classDef amph fill:#bbf7d0,stroke:#22c55e
    classDef rept fill:#fecaca,stroke:#ef4444
    classDef mamm fill:#f3e8ff,stroke:#9333ea

    class open_desc,open_heart,open_ex,open_flow open
    class closed_desc,closed_heart,closed_ex,closed_flow closed
    class fish fish
    class amph amph
    class rept rept
    class mamm mamm`,
  },
  {
    prompt: 'Create a diagram showing complete metamorphosis in insects',
    output: `flowchart TB
    subgraph holometabolous["Complete Metamorphosis (Holometabolous)"]
        subgraph egg_stage["Egg Stage"]
            egg["Fertilized Egg<br/>• Embryonic development<br/>• Species-specific duration<br/>• Laid on/near food source"]
        end

        subgraph larva_stage["Larval Stage"]
            larva["Larva<br/>• Feeding stage<br/>• Multiple instars (molts)<br/>• Accumulates resources<br/>• Looks nothing like adult"]
            larva_types["Larval Types:<br/>• Caterpillar (Lepidoptera)<br/>• Maggot (Diptera)<br/>• Grub (Coleoptera)"]
            molts["Instars: L1 → L2 → L3..."]
        end

        subgraph pupa_stage["Pupal Stage"]
            pupa["Pupa<br/>• Non-feeding stage<br/>• Complete tissue reorganization<br/>• Imaginal discs develop<br/>• Protected (cocoon/chrysalis)"]
            histolysis["Histolysis:<br/>Larval tissues break down"]
            histogenesis["Histogenesis:<br/>Adult tissues form"]
        end

        subgraph adult_stage["Adult Stage (Imago)"]
            adult["Adult<br/>• Reproductive stage<br/>• Wings fully developed<br/>• No further molting<br/>• May or may not feed"]
        end
    end

    subgraph hormones["Hormonal Control"]
        ecdysone["Ecdysone<br/>(Molting hormone)<br/>Triggers molts"]
        jh["Juvenile Hormone (JH)<br/>High: Larval molts<br/>Low: Pupation<br/>Absent: Adult emergence"]
        ptth["PTTH<br/>(Prothoracicotropic hormone)<br/>Regulates ecdysone"]
    end

    subgraph examples["Examples"]
        lepidoptera["Butterflies, Moths<br/>(Lepidoptera)"]
        coleoptera["Beetles<br/>(Coleoptera)"]
        diptera["Flies, Mosquitoes<br/>(Diptera)"]
        hymenoptera["Bees, Wasps, Ants<br/>(Hymenoptera)"]
    end

    egg --> larva
    larva --> molts
    molts -->|"JH decreases"| pupa
    pupa --> histolysis
    histolysis --> histogenesis
    histogenesis --> adult
    adult -->|"Reproduction"| egg

    ecdysone --> molts
    jh --> larva
    jh -.->|"Low/Absent"| pupa

    classDef egg fill:#fef3c7,stroke:#d97706
    classDef larva fill:#22c55e,stroke:#16a34a
    classDef pupa fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef adult fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef hormone fill:#fee2e2,stroke:#ef4444

    class egg egg
    class larva,larva_types,molts larva
    class pupa,histolysis,histogenesis pupa
    class adult adult
    class ecdysone,jh,ptth hormone`,
  },
  {
    prompt: 'Create a diagram showing animal phyla and their relationships',
    output: `flowchart TB
    subgraph phylogeny["Animal Phylogeny"]
        subgraph base["Basal Animals"]
            porifera["Porifera<br/>(Sponges)<br/>No true tissues"]
            cnidaria["Cnidaria<br/>(Jellyfish, Corals)<br/>Radial symmetry<br/>Diploblastic"]
        end

        subgraph bilateria["Bilateria (Bilateral Symmetry)"]
            subgraph protostome["Protostomes"]
                subgraph lophotrochozoa["Lophotrochozoa"]
                    platyhelminthes["Platyhelminthes<br/>(Flatworms)"]
                    annelida["Annelida<br/>(Segmented worms)"]
                    mollusca["Mollusca<br/>(Snails, Clams, Octopi)"]
                end

                subgraph ecdysozoa["Ecdysozoa (Molting)"]
                    nematoda["Nematoda<br/>(Roundworms)"]
                    arthropoda["Arthropoda<br/>(Insects, Crustaceans,<br/>Arachnids)"]
                end
            end

            subgraph deuterostome["Deuterostomes"]
                echinodermata["Echinodermata<br/>(Sea stars, Urchins)<br/>Radial symmetry (secondary)"]
                chordata["Chordata<br/>(Vertebrates & relatives)"]
            end
        end
    end

    subgraph synapomorphies["Key Synapomorphies"]
        tissues["True Tissues"]
        bilateral_sym["Bilateral Symmetry"]
        triplo["Triploblastic"]
        coelom["True Coelom"]
        proto_dev["Protostome Development<br/>(Spiral cleavage,<br/>mouth from blastopore)"]
        deut_dev["Deuterostome Development<br/>(Radial cleavage,<br/>anus from blastopore)"]
    end

    subgraph diversity["Species Diversity"]
        div["• Arthropoda: ~1.2 million species<br/>• Mollusca: ~85,000 species<br/>• Chordata: ~65,000 species<br/>• Nematoda: ~25,000 species"]
    end

    porifera --> tissues
    tissues --> cnidaria
    cnidaria --> bilateral_sym
    bilateral_sym --> bilateria
    triplo --> protostome
    triplo --> deuterostome
    proto_dev --> lophotrochozoa
    proto_dev --> ecdysozoa
    deut_dev --> echinodermata
    deut_dev --> chordata

    classDef basal fill:#d4d4d4,stroke:#737373
    classDef lopho fill:#22c55e,stroke:#16a34a
    classDef ecdyso fill:#f97316,stroke:#ea580c
    classDef deut fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef synapo fill:#fef3c7,stroke:#d97706

    class porifera,cnidaria basal
    class platyhelminthes,annelida,mollusca lopho
    class nematoda,arthropoda ecdyso
    class echinodermata,chordata deut
    class tissues,bilateral_sym,triplo,coelom,proto_dev,deut_dev synapo`,
  },
  {
    prompt: 'Create a diagram comparing thermoregulation strategies',
    output: `flowchart TB
    subgraph thermoregulation["Thermoregulation Strategies"]
        subgraph ectotherm["Ectotherms (Cold-blooded)"]
            ecto_def["Body temperature from<br/>external environment"]
            ecto_ex["Examples:<br/>Fish, Amphibians,<br/>Reptiles, Invertebrates"]
            ecto_behav["Behavioral regulation:<br/>• Basking<br/>• Seeking shade<br/>• Burrowing<br/>• Orientation to sun"]
            ecto_adv["Advantages:<br/>• Low energy requirements<br/>• Survive without food longer"]
            ecto_dis["Disadvantages:<br/>• Activity limited by temp<br/>• Vulnerable to extremes"]
        end

        subgraph endotherm["Endotherms (Warm-blooded)"]
            endo_def["Body temperature from<br/>internal metabolism"]
            endo_ex["Examples:<br/>Birds, Mammals"]
            endo_mech["Mechanisms:<br/>• Shivering thermogenesis<br/>• Non-shivering (BAT)<br/>• Insulation (fur, feathers)<br/>• Vasodilation/constriction"]
            endo_adv["Advantages:<br/>• Activity in varied temps<br/>• Rapid muscle response"]
            endo_dis["Disadvantages:<br/>• High energy requirements<br/>• Need frequent feeding"]
        end
    end

    subgraph special["Special Adaptations"]
        counter["Countercurrent Heat Exchange<br/>• Penguin flippers<br/>• Whale flukes<br/>• Bird legs<br/>(Conserve core heat)"]

        torpor["Torpor & Hibernation<br/>• Reduced metabolism<br/>• Lower body temp<br/>• Energy conservation<br/>(Bears, hummingbirds)"]

        hetero["Heterothermy<br/>• Regional endothermy<br/>• Tuna, sharks<br/>• Warm muscles for speed"]
    end

    subgraph zones["Thermal Zones"]
        tnz["Thermoneutral Zone (TNZ)<br/>No extra energy for<br/>temperature regulation"]
        below["Below TNZ:<br/>Shivering, vasoconstriction"]
        above["Above TNZ:<br/>Panting, sweating,<br/>vasodilation"]
    end

    ectotherm --> hetero
    endotherm --> torpor
    endotherm --> counter
    endo_mech --> tnz

    classDef ecto fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef endo fill:#ef4444,stroke:#dc2626,color:#fff
    classDef special fill:#f3e8ff,stroke:#9333ea
    classDef zone fill:#fef3c7,stroke:#d97706

    class ecto_def,ecto_ex,ecto_behav,ecto_adv,ecto_dis ecto
    class endo_def,endo_ex,endo_mech,endo_adv,endo_dis endo
    class counter,torpor,hetero special
    class tnz,below,above zone`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const zoologyPrompts = {
  ZOOLOGY_DOMAIN_PROMPT,
  ZOOLOGY_PROMPTS,
  ZOOLOGY_FEW_SHOT_EXAMPLES,
};

export default zoologyPrompts;
