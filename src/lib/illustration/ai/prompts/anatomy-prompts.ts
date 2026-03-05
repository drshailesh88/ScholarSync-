/**
 * anatomy-prompts.ts
 * Anatomy-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for human anatomy including:
 * - Body system overviews
 * - Organ structure diagrams
 * - Cross-sectional anatomy
 * - Regional anatomy
 * - Clinical anatomy correlations
 * - Developmental anatomy
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ANATOMY DOMAIN PROMPT
// =============================================================================

/**
 * Base anatomy domain prompt for anatomical diagrams
 */
export const ANATOMY_DOMAIN_PROMPT = `
Anatomy diagram requirements:
- Use standard anatomical terminology (Terminologia Anatomica)
- Follow anatomical position conventions (standing, palms forward)
- Use proper directional terms (superior, inferior, anterior, posterior, medial, lateral)
- Include proper anatomical planes where relevant (sagittal, coronal, transverse)
- Reference standard regional anatomy terms
- Use color coding: Bone (Ivory), Muscle (Red), Artery (Red), Vein (Blue), Nerve (Yellow)
- Include proper labeling with leader lines
- Maintain scale consistency within diagrams
- Reference Gray's Anatomy conventions where applicable
- Include clinical correlations when relevant`;

// =============================================================================
// ANATOMY-SPECIFIC PROMPTS
// =============================================================================

export const ANATOMY_PROMPTS = {
  // Skeletal System
  skeletalOverview: `
Skeletal System Overview requirements:
- Differentiate axial and appendicular skeleton
- Include bone count for each region
- Show major bone classifications (long, short, flat, irregular, sesamoid)
- Reference bone markings terminology (process, fossa, foramen, etc.)
- Include joint types and locations
- Use ivory/cream colors for bone tissue
- Show anterior and posterior views if comprehensive`,

  boneStructure: `
Bone Structure and Histology requirements:
- Show cortical (compact) vs trabecular (spongy) bone
- Include periosteum and endosteum layers
- Reference Haversian systems/osteons
- Show osteocytes, osteoblasts, osteoclasts
- Include bone marrow (red and yellow)
- Reference growth plate anatomy in long bones
- Show blood supply to bone`,

  jointAnatomy: `
Joint Anatomy requirements:
- Classify joint type (fibrous, cartilaginous, synovial)
- Include all joint components (capsule, ligaments, cartilage)
- Show synovial membrane and fluid if synovial joint
- Reference movement types (flexion, extension, rotation, etc.)
- Include stabilizing structures (menisci, labrum if present)
- Show innervation and blood supply
- Reference clinical relevance`,

  // Muscular System
  muscleAnatomy: `
Muscle Anatomy requirements:
- Show muscle origin and insertion points
- Include tendon attachments
- Reference muscle fiber orientation
- Show innervation (nerve supply)
- Include blood supply
- Reference primary action and synergists
- Use red/pink colors for muscle tissue
- Include fascial layers if relevant`,

  muscleContraction: `
Muscle Contraction Mechanism requirements:
- Show sarcomere structure (Z-lines, A-band, I-band, H-zone)
- Reference sliding filament theory
- Include actin and myosin arrangement
- Show calcium release from SR
- Reference cross-bridge cycling
- Include ATP role in contraction and relaxation
- Show neuromuscular junction if relevant`,

  // Cardiovascular System
  heartAnatomy: `
Heart Anatomy requirements:
- Show all four chambers with proper colors (blue=deoxygenated, red=oxygenated)
- Include all four valves with proper names
- Reference coronary circulation
- Show conduction system pathway
- Include great vessels (aorta, vena cava, pulmonary arteries/veins)
- Reference pericardium layers
- Show internal wall thickness differences`,

  vascularAnatomy: `
Vascular Anatomy requirements:
- Differentiate arteries (red) and veins (blue)
- Show vessel wall layers (intima, media, adventitia)
- Include capillary bed structure
- Reference major arterial branches
- Show venous drainage patterns
- Include lymphatic relationship if relevant
- Reference portal systems (hepatic, hypophyseal)`,

  // Nervous System
  brainAnatomy: `
Brain Anatomy requirements:
- Show lobes with functional areas
- Include gyri and sulci landmarks
- Reference deep structures (basal ganglia, thalamus, hypothalamus)
- Show brainstem divisions (midbrain, pons, medulla)
- Include cerebellum
- Reference ventricular system
- Show meningeal layers
- Include cranial nerve origins if relevant`,

  spinalCordAnatomy: `
Spinal Cord Anatomy requirements:
- Show gray matter (butterfly shape) and white matter
- Include dorsal and ventral horns
- Reference ascending and descending tracts
- Show spinal nerve formation (dorsal and ventral roots)
- Include dermatome distribution
- Reference myotome innervation
- Show vertebral level vs cord segment relationship`,

  peripheralNerveAnatomy: `
Peripheral Nerve Anatomy requirements:
- Show nerve fascicles within epineurium
- Include perineurium and endoneurium layers
- Reference nerve fiber types (myelinated vs unmyelinated)
- Show sensory vs motor component distribution
- Include nerve plexus organization if relevant
- Reference dermatome and myotome patterns
- Show common nerve injury sites`,

  // Respiratory System
  respiratoryAnatomy: `
Respiratory Anatomy requirements:
- Show upper and lower respiratory tract division
- Include airway branching generations
- Reference bronchopulmonary segments
- Show alveolar structure and blood-air barrier
- Include respiratory muscles
- Reference pleural cavity and membranes
- Show lung lobes and fissures`,

  // Digestive System
  giTractAnatomy: `
GI Tract Anatomy requirements:
- Show complete alimentary canal
- Include wall layers (mucosa, submucosa, muscularis, serosa/adventitia)
- Reference sphincters and their locations
- Show mesenteric attachments
- Include blood supply (celiac, SMA, IMA territories)
- Reference portal venous drainage
- Show anatomical variations if clinically relevant`,

  hepatobiliaryAnatomy: `
Hepatobiliary Anatomy requirements:
- Show liver segments (Couinaud classification)
- Include biliary tree anatomy
- Reference portal triad at porta hepatis
- Show gallbladder and cystic duct
- Include sphincter of Oddi
- Reference hepatic blood supply (dual supply)
- Show anatomical variations`,

  // Urinary System
  kidneyAnatomy: `
Kidney Anatomy requirements:
- Show cortex and medulla distinction
- Include nephron structure complete
- Reference renal pyramids and columns
- Show collecting system (calyces, pelvis)
- Include renal vasculature
- Reference juxtaglomerular apparatus
- Show ureter course and narrowing points`,

  // Reproductive System
  reproductiveAnatomy: `
Reproductive Anatomy requirements:
- Show gonads with internal structure
- Include reproductive tract pathway
- Reference gland contributions
- Show external genitalia relationships
- Include vascular supply
- Reference lymphatic drainage
- Show developmental homologs if relevant`,

  // Endocrine System
  endocrineAnatomy: `
Endocrine Gland Anatomy requirements:
- Show gland location and relationships
- Include internal histology if relevant
- Reference blood supply (portal systems for pituitary)
- Show target organ connections
- Include feedback loop representations
- Reference hormones produced
- Show clinical landmarks`,

  // Regional Anatomy
  crossSectionalAnatomy: `
Cross-Sectional Anatomy requirements:
- Specify anatomical level clearly
- Show all structures at that level
- Include fascial planes
- Reference vessel and nerve positions
- Show organ relationships
- Include body wall structures
- Reference MRI/CT appearance if relevant`,

  thoraxAnatomy: `
Thoracic Anatomy requirements:
- Show mediastinal divisions
- Include heart position and borders
- Reference great vessels
- Show bronchial tree
- Include esophageal course
- Reference thoracic duct
- Show chest wall structures`,

  abdomenPelvisAnatomy: `
Abdominal and Pelvic Anatomy requirements:
- Show peritoneal relationships (intra vs retroperitoneal)
- Include organ positions by region (9 regions or 4 quadrants)
- Reference mesenteric attachments
- Show blood supply territories
- Include pelvic floor structures
- Reference fascial planes
- Show urogenital relationships`,

  extremityAnatomy: `
Extremity Anatomy requirements:
- Show compartments and fascial boundaries
- Include neurovascular bundles
- Reference muscle groups by action
- Show bony landmarks
- Include joint structures
- Reference common injury patterns
- Show surface anatomy landmarks`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Anatomy-specific few-shot examples
 */
export const ANATOMY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram of heart blood flow pathway',
    output: `flowchart LR
    subgraph Systemic["Systemic Return"]
        BODY["Body Tissues"] -->|"Deoxygenated"| SVC["SVC"]
        BODY -->|"Deoxygenated"| IVC["IVC"]
    end

    subgraph RightHeart["Right Heart"]
        SVC & IVC --> RA["Right Atrium"]
        RA -->|"Tricuspid Valve"| RV["Right Ventricle"]
    end

    subgraph Pulmonary["Pulmonary Circuit"]
        RV -->|"Pulmonic Valve"| PA["Pulmonary Artery"]
        PA --> LUNGS["Lungs\\nGas Exchange"]
        LUNGS --> PV["Pulmonary Veins"]
    end

    subgraph LeftHeart["Left Heart"]
        PV --> LA["Left Atrium"]
        LA -->|"Mitral Valve"| LV["Left Ventricle"]
    end

    subgraph SystemicOutput["Systemic Output"]
        LV -->|"Aortic Valve"| AO["Aorta"]
        AO --> BODY
    end

    style RA fill:#4169E1,color:#fff
    style RV fill:#1E90FF,color:#fff
    style LA fill:#DC143C,color:#fff
    style LV fill:#B22222,color:#fff
    style LUNGS fill:#FFB6C1`,
  },
  {
    prompt: 'Create a spinal cord cross-section diagram showing major structures',
    output: `flowchart TB
    subgraph SpinalCord["Spinal Cord Cross-Section"]
        subgraph GrayMatter["Gray Matter (H-shape)"]
            DH["Dorsal Horn\\nSensory"]
            VH["Ventral Horn\\nMotor"]
            LH["Lateral Horn\\nAutonomic\\n(T1-L2)"]
            CC["Central Canal"]
        end
        subgraph WhiteMatter["White Matter"]
            DC["Dorsal Columns\\nFine touch, proprioception"]
            LC["Lateral Columns\\nCorticospinal tract"]
            VC["Ventral Columns\\nMotor pathways"]
        end
    end

    subgraph Roots["Nerve Roots"]
        DR["Dorsal Root\\n+ Ganglion"] -->|"Sensory"| DH
        VH -->|"Motor"| VR["Ventral Root"]
        DR & VR --> SN["Spinal Nerve"]
    end

    style DH fill:#808080
    style VH fill:#808080
    style LH fill:#808080
    style DC fill:#FFFAF0
    style LC fill:#FFFAF0
    style VC fill:#FFFAF0`,
  },
  {
    prompt: 'Create a nephron structure and function diagram',
    output: `flowchart TB
    subgraph Corpuscle["Renal Corpuscle"]
        AA["Afferent Arteriole"] --> G["Glomerulus\\nFiltration\\n180 L/day"]
        G --> EA["Efferent Arteriole"]
        G -.-> BC["Bowman's Capsule"]
    end

    subgraph Tubule["Renal Tubule"]
        BC --> PCT["Proximal Convoluted Tubule\\n65% reabsorption\\nNa+, glucose, amino acids"]
        PCT --> TDL["Thin Descending Limb\\nWater permeable"]
        TDL --> TAL["Thick Ascending Limb\\nNaCl reabsorption\\nWater impermeable"]
        TAL --> DCT["Distal Convoluted Tubule\\nAldosterone sensitive\\nNa+/K+ exchange"]
        DCT --> CD["Collecting Duct\\nADH responsive\\nFinal concentration"]
    end

    subgraph Output["Output"]
        CD --> RP["Renal Pelvis"]
        RP --> UR["Ureter"]
    end

    EA --> PC["Peritubular Capillaries"]
    PC --> VR["Vasa Recta"]

    style G fill:#DC143C
    style PCT fill:#90EE90
    style DCT fill:#7CFC00
    style CD fill:#FFD700`,
  },
  {
    prompt: 'Create a diagram of the brachial plexus organization',
    output: `flowchart LR
    subgraph Roots["Roots (C5-T1)"]
        C5["C5"]
        C6["C6"]
        C7["C7"]
        C8["C8"]
        T1["T1"]
    end

    subgraph Trunks["Trunks"]
        C5 & C6 --> UT["Upper Trunk"]
        C7 --> MT["Middle Trunk"]
        C8 & T1 --> LT["Lower Trunk"]
    end

    subgraph Divisions["Divisions"]
        UT --> UAD["Anterior"] & UPD["Posterior"]
        MT --> MAD["Anterior"] & MPD["Posterior"]
        LT --> LAD["Anterior"] & LPD["Posterior"]
    end

    subgraph Cords["Cords"]
        UAD & MAD --> LC["Lateral Cord"]
        UPD & MPD & LPD --> PC["Posterior Cord"]
        LAD --> MC["Medial Cord"]
    end

    subgraph Branches["Terminal Branches"]
        LC --> MSC["Musculocutaneous"]
        LC --> LCM["Lateral Pectoral"]
        PC --> AX["Axillary"]
        PC --> RAD["Radial"]
        MC --> ULN["Ulnar"]
        MC --> MPC["Medial Pectoral"]
        LC & MC --> MED["Median"]
    end

    style UT fill:#FFD700
    style MT fill:#FFD700
    style LT fill:#FFD700
    style LC fill:#87CEEB
    style PC fill:#87CEEB
    style MC fill:#87CEEB`,
  },
  {
    prompt: 'Create a diagram of the respiratory membrane and gas exchange',
    output: `flowchart TB
    subgraph Alveolus["Alveolus"]
        AS["Alveolar Space\\nO2 rich, CO2 poor"]
        SF["Surfactant Layer"]
        AE["Type I Alveolar\\nEpithelial Cell"]
    end

    subgraph Barrier["Blood-Air Barrier (0.5 μm)"]
        AE --> BM1["Epithelial\\nBasement Membrane"]
        BM1 --> IS["Interstitial Space"]
        IS --> BM2["Capillary\\nBasement Membrane"]
        BM2 --> END["Capillary\\nEndothelium"]
    end

    subgraph Capillary["Pulmonary Capillary"]
        END --> CAP["Capillary Lumen"]
        RBC["Red Blood Cells"]
    end

    subgraph GasExchange["Gas Exchange"]
        O2["O2"] -->|"Diffusion\\ndown gradient"| RBC
        RBC -->|"CO2 diffusion"| CO2["CO2"]
    end

    AS --> SF --> AE
    CAP --> RBC

    style AS fill:#FFE4E1
    style CAP fill:#DC143C
    style O2 fill:#87CEEB
    style CO2 fill:#808080`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  ANATOMY_DOMAIN_PROMPT,
  ANATOMY_PROMPTS,
  ANATOMY_FEW_SHOT_EXAMPLES,
};
