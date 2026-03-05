/**
 * civil.ts
 * Civil Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for civil engineering including:
 * - Structural analysis and design
 * - Foundation engineering
 * - Transportation systems
 * - Water resources engineering
 * - Construction management
 * - Surveying and geomatics
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// STRUCTURAL ENGINEERING
// =============================================================================

/**
 * Structural Load Analysis template
 */
export const structuralLoadAnalysis: DiagramTemplate = {
  id: 'civil-structural-load',
  name: 'Structural Load Analysis Diagram',
  description: 'Analysis of loads acting on structural members and systems',
  domain: 'engineering',
  promptTemplate: `Create a structural load analysis diagram:
- Structure type: {{structureType}}
- Dead loads: {{deadLoads}}
- Live loads: {{liveLoads}}
- Environmental loads: {{environmentalLoads}}
- Load combinations: {{loadCombinations}}
- Support conditions: {{supports}}
- Load distribution: {{loadDistribution}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'structureType',
    'deadLoads',
    'liveLoads',
    'environmentalLoads',
    'loadCombinations',
    'supports',
    'loadDistribution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Loads["Applied Loads"]
        DL["Dead Load\\n25 kN/m"]
        LL["Live Load\\n15 kN/m"]
        WL["Wind Load\\n10 kN"]
    end
    subgraph Structure["Beam Structure"]
        B1["Beam Span\\n10m"]
    end
    subgraph Reactions["Support Reactions"]
        RA["Reaction A\\n125 kN"]
        RB["Reaction B\\n125 kN"]
    end
    DL --> B1
    LL --> B1
    WL --> B1
    B1 --> RA
    B1 --> RB
    style DL fill:#3b82f6,color:#fff
    style LL fill:#10b981,color:#fff
    style WL fill:#f59e0b,color:#fff`,
};

/**
 * Steel Frame Design template
 */
export const steelFrameDesign: DiagramTemplate = {
  id: 'civil-steel-frame',
  name: 'Steel Frame Design',
  description: 'Steel structural frame design with connections and member sizing',
  domain: 'engineering',
  promptTemplate: `Create a steel frame design diagram:
- Frame type: {{frameType}}
- Bay dimensions: {{bayDimensions}}
- Column sections: {{columns}}
- Beam sections: {{beams}}
- Bracing system: {{bracing}}
- Connection types: {{connections}}
- Base plate design: {{basePlates}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'frameType',
    'bayDimensions',
    'columns',
    'beams',
    'bracing',
    'connections',
    'basePlates',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Frame["Steel Frame"]
        C1["Column\\nW12x65"]
        C2["Column\\nW12x65"]
        B1["Beam\\nW16x40"]
        BR["X-Bracing\\nL4x4x1/2"]
    end
    subgraph Connections["Connections"]
        MJ["Moment Joint"]
        SJ["Shear Tab"]
    end
    C1 --- B1
    B1 --- C2
    C1 --- BR --- C2
    B1 -.-> MJ
    BR -.-> SJ
    style C1 fill:#1e40af,color:#fff
    style C2 fill:#1e40af,color:#fff
    style B1 fill:#047857,color:#fff`,
};

/**
 * Reinforced Concrete Design template
 */
export const reinforcedConcreteDesign: DiagramTemplate = {
  id: 'civil-concrete-design',
  name: 'Reinforced Concrete Design',
  description: 'Reinforced concrete member design with reinforcement layout',
  domain: 'engineering',
  promptTemplate: `Create a reinforced concrete design diagram:
- Member type: {{memberType}}
- Concrete strength: {{concreteStrength}}
- Steel grade: {{steelGrade}}
- Cross-section: {{crossSection}}
- Main reinforcement: {{mainRebar}}
- Shear reinforcement: {{stirrups}}
- Cover requirements: {{coverThickness}}
{{#additionalNotes}}Design codes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'memberType',
    'concreteStrength',
    'steelGrade',
    'crossSection',
    'mainRebar',
    'stirrups',
    'coverThickness',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph CrossSection["Beam Cross-Section"]
        CS["300 x 600 mm"]
    end
    subgraph Reinforcement["Reinforcement"]
        TR["Top Steel\\n2-#16"]
        BR["Bottom Steel\\n4-#20"]
        ST["Stirrups\\n#10 @ 200mm"]
    end
    subgraph Cover["Concrete Cover"]
        CV["40mm Clear Cover"]
    end
    CS --> TR
    CS --> BR
    CS --> ST
    TR --> CV
    BR --> CV
    style CS fill:#6b7280,color:#fff
    style BR fill:#dc2626,color:#fff
    style TR fill:#dc2626,color:#fff`,
};

// =============================================================================
// FOUNDATION ENGINEERING
// =============================================================================

/**
 * Foundation Design template
 */
export const foundationDesign: DiagramTemplate = {
  id: 'civil-foundation',
  name: 'Foundation Design Diagram',
  description: 'Foundation design with soil interaction and load transfer',
  domain: 'engineering',
  promptTemplate: `Create a foundation design diagram:
- Foundation type: {{foundationType}}
- Soil conditions: {{soilConditions}}
- Bearing capacity: {{bearingCapacity}}
- Column loads: {{columnLoads}}
- Foundation dimensions: {{dimensions}}
- Reinforcement layout: {{reinforcement}}
- Water table level: {{waterTable}}
{{#additionalNotes}}Site conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'foundationType',
    'soilConditions',
    'bearingCapacity',
    'columnLoads',
    'dimensions',
    'reinforcement',
    'waterTable',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Column["Column Load"]
        P["P = 1500 kN"]
    end
    subgraph Footing["Spread Footing"]
        FT["3.0 x 3.0 x 0.6 m"]
    end
    subgraph Soil["Soil Layers"]
        S1["Sand\\nγ = 18 kN/m³"]
        S2["Clay\\nγ = 16 kN/m³"]
    end
    P --> FT
    FT --> S1
    S1 --> S2
    style P fill:#dc2626,color:#fff
    style FT fill:#6b7280,color:#fff
    style S1 fill:#92400e,color:#fff`,
};

/**
 * Pile Foundation Design template
 */
export const pileFoundationDesign: DiagramTemplate = {
  id: 'civil-pile-foundation',
  name: 'Pile Foundation Design',
  description: 'Deep foundation pile design with pile cap and load transfer',
  domain: 'engineering',
  promptTemplate: `Create a pile foundation design diagram:
- Pile type: {{pileType}}
- Pile capacity: {{pileCapacity}}
- Number of piles: {{pileCount}}
- Pile spacing: {{pileSpacing}}
- Pile cap design: {{pileCap}}
- Soil profile: {{soilProfile}}
- Load distribution: {{loadDistribution}}
{{#additionalNotes}}Design method: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pileType',
    'pileCapacity',
    'pileCount',
    'pileSpacing',
    'pileCap',
    'soilProfile',
    'loadDistribution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Structure["Structure Load"]
        SL["2000 kN"]
    end
    subgraph Cap["Pile Cap"]
        PC["2.5 x 2.5 x 1.0 m"]
    end
    subgraph Piles["Pile Group"]
        P1["Pile 1\\n600mm dia"]
        P2["Pile 2\\n600mm dia"]
        P3["Pile 3\\n600mm dia"]
        P4["Pile 4\\n600mm dia"]
    end
    SL --> PC
    PC --> P1 & P2 & P3 & P4
    style PC fill:#4b5563,color:#fff
    style P1 fill:#374151,color:#fff
    style P2 fill:#374151,color:#fff`,
};

/**
 * Retaining Wall Design template
 */
export const retainingWallDesign: DiagramTemplate = {
  id: 'civil-retaining-wall',
  name: 'Retaining Wall Design',
  description: 'Retaining wall design with earth pressure and stability analysis',
  domain: 'engineering',
  promptTemplate: `Create a retaining wall design diagram:
- Wall type: {{wallType}}
- Wall height: {{wallHeight}}
- Backfill properties: {{backfillProperties}}
- Surcharge loads: {{surcharge}}
- Drainage system: {{drainage}}
- Stability analysis: {{stability}}
- Foundation requirements: {{foundation}}
{{#additionalNotes}}Site constraints: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'wallType',
    'wallHeight',
    'backfillProperties',
    'surcharge',
    'drainage',
    'stability',
    'foundation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Backfill["Backfill Soil"]
        BF["Sand Fill\\nφ = 30°"]
        EP["Earth Pressure\\nKa = 0.33"]
    end
    subgraph Wall["Cantilever Wall"]
        ST["Stem\\n400mm thick"]
        HL["Heel\\n2.0m"]
        TO["Toe\\n1.0m"]
    end
    subgraph Forces["Stability"]
        OT["Overturning"]
        SL["Sliding"]
    end
    BF --> EP --> ST
    ST --> HL
    ST --> TO
    Wall --> OT
    Wall --> SL
    style ST fill:#6b7280,color:#fff
    style EP fill:#f59e0b,color:#fff`,
};

// =============================================================================
// TRANSPORTATION ENGINEERING
// =============================================================================

/**
 * Highway Geometric Design template
 */
export const highwayGeometricDesign: DiagramTemplate = {
  id: 'civil-highway-geometry',
  name: 'Highway Geometric Design',
  description: 'Highway alignment with horizontal and vertical curves',
  domain: 'engineering',
  promptTemplate: `Create a highway geometric design diagram:
- Design speed: {{designSpeed}}
- Horizontal alignment: {{horizontalAlignment}}
- Vertical alignment: {{verticalAlignment}}
- Cross-section: {{crossSection}}
- Superelevation: {{superelevation}}
- Sight distance: {{sightDistance}}
- Intersection design: {{intersections}}
{{#additionalNotes}}Design standards: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'designSpeed',
    'horizontalAlignment',
    'verticalAlignment',
    'crossSection',
    'superelevation',
    'sightDistance',
    'intersections',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Alignment["Highway Alignment"]
        TS["Tangent\\nStation 0+000"]
        PC["PC\\nStation 5+200"]
        CC["Curve\\nR = 400m"]
        PT["PT\\nStation 5+800"]
        TE["Tangent\\nStation 10+000"]
    end
    TS --> PC --> CC --> PT --> TE
    style PC fill:#3b82f6,color:#fff
    style CC fill:#10b981,color:#fff
    style PT fill:#3b82f6,color:#fff`,
};

/**
 * Pavement Design template
 */
export const pavementDesign: DiagramTemplate = {
  id: 'civil-pavement',
  name: 'Pavement Design Diagram',
  description: 'Flexible or rigid pavement layer design with material specifications',
  domain: 'engineering',
  promptTemplate: `Create a pavement design diagram:
- Pavement type: {{pavementType}}
- Traffic loading: {{trafficLoading}}
- Subgrade strength: {{subgradeStrength}}
- Layer thicknesses: {{layerThicknesses}}
- Material specifications: {{materials}}
- Drainage provisions: {{drainage}}
- Design life: {{designLife}}
{{#additionalNotes}}Design method: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pavementType',
    'trafficLoading',
    'subgradeStrength',
    'layerThicknesses',
    'materials',
    'drainage',
    'designLife',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Surface["Surface Layer"]
        AC["Asphalt Concrete\\n150mm"]
    end
    subgraph Base["Base Course"]
        BC["Crushed Stone\\n200mm"]
    end
    subgraph Subbase["Subbase"]
        SB["Granular Material\\n300mm"]
    end
    subgraph Subgrade["Subgrade"]
        SG["Native Soil\\nCBR = 5%"]
    end
    AC --> BC --> SB --> SG
    style AC fill:#1f2937,color:#fff
    style BC fill:#6b7280,color:#fff
    style SB fill:#92400e,color:#fff
    style SG fill:#78350f,color:#fff`,
};

/**
 * Traffic Flow Analysis template
 */
export const trafficFlowAnalysis: DiagramTemplate = {
  id: 'civil-traffic-flow',
  name: 'Traffic Flow Analysis',
  description: 'Traffic flow analysis at intersections and roadway segments',
  domain: 'engineering',
  promptTemplate: `Create a traffic flow analysis diagram:
- Intersection type: {{intersectionType}}
- Traffic volumes: {{trafficVolumes}}
- Peak hour factor: {{peakHourFactor}}
- Level of service: {{levelOfService}}
- Signal timing: {{signalTiming}}
- Capacity analysis: {{capacity}}
- Queue lengths: {{queues}}
{{#additionalNotes}}Analysis parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'intersectionType',
    'trafficVolumes',
    'peakHourFactor',
    'levelOfService',
    'signalTiming',
    'capacity',
    'queues',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Intersection["Signalized Intersection"]
        NB["Northbound\\n800 vph"]
        SB["Southbound\\n750 vph"]
        EB["Eastbound\\n500 vph"]
        WB["Westbound\\n450 vph"]
    end
    subgraph Analysis["LOS Analysis"]
        LOS["Level of Service\\nC"]
        DEL["Avg Delay\\n28 sec"]
    end
    NB --> LOS
    SB --> LOS
    EB --> LOS
    WB --> LOS
    LOS --> DEL
    style LOS fill:#f59e0b,color:#fff
    style NB fill:#3b82f6,color:#fff`,
};

// =============================================================================
// WATER RESOURCES ENGINEERING
// =============================================================================

/**
 * Stormwater Management template
 */
export const stormwaterManagement: DiagramTemplate = {
  id: 'civil-stormwater',
  name: 'Stormwater Management Design',
  description: 'Stormwater collection, conveyance, and treatment system design',
  domain: 'engineering',
  promptTemplate: `Create a stormwater management design diagram:
- Drainage area: {{drainageArea}}
- Design storm: {{designStorm}}
- Runoff coefficient: {{runoffCoefficient}}
- Collection system: {{collectionSystem}}
- Detention/retention: {{detention}}
- Water quality treatment: {{treatment}}
- Outlet structure: {{outlet}}
{{#additionalNotes}}Regulatory requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drainageArea',
    'designStorm',
    'runoffCoefficient',
    'collectionSystem',
    'detention',
    'treatment',
    'outlet',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Catchment["Drainage Area"]
        DA["10 hectares"]
        RO["Runoff\\nC = 0.6"]
    end
    subgraph Collection["Collection"]
        IN["Inlets"]
        PP["Storm Pipes"]
    end
    subgraph Treatment["Treatment"]
        DP["Detention Pond\\n2000 m³"]
        OL["Outlet\\nControl"]
    end
    DA --> RO --> IN --> PP --> DP --> OL
    style DP fill:#0891b2,color:#fff
    style PP fill:#6b7280,color:#fff`,
};

/**
 * Water Distribution System template
 */
export const waterDistributionSystem: DiagramTemplate = {
  id: 'civil-water-distribution',
  name: 'Water Distribution System Design',
  description: 'Municipal water distribution network with pipes, pumps, and storage',
  domain: 'engineering',
  promptTemplate: `Create a water distribution system design diagram:
- Service area: {{serviceArea}}
- Demand projections: {{demands}}
- Pipe network: {{pipeNetwork}}
- Pumping stations: {{pumpingStations}}
- Storage facilities: {{storage}}
- Pressure zones: {{pressureZones}}
- Fire flow requirements: {{fireFlow}}
{{#additionalNotes}}Design criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'serviceArea',
    'demands',
    'pipeNetwork',
    'pumpingStations',
    'storage',
    'pressureZones',
    'fireFlow',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Water Source"]
        WTP["Treatment\\nPlant"]
    end
    subgraph Distribution["Distribution"]
        PS["Pump\\nStation"]
        TM["Transmission\\nMain"]
        DM["Distribution\\nMains"]
    end
    subgraph Storage["Storage"]
        ET["Elevated\\nTank"]
    end
    WTP --> PS --> TM --> DM
    DM --> ET
    ET --> DM
    style WTP fill:#0891b2,color:#fff
    style ET fill:#3b82f6,color:#fff`,
};

/**
 * Sanitary Sewer Design template
 */
export const sanitarySewerDesign: DiagramTemplate = {
  id: 'civil-sanitary-sewer',
  name: 'Sanitary Sewer Design',
  description: 'Sanitary sewer collection system design with lift stations',
  domain: 'engineering',
  promptTemplate: `Create a sanitary sewer design diagram:
- Service area: {{serviceArea}}
- Design population: {{population}}
- Flow calculations: {{flows}}
- Pipe sizing: {{pipeSizing}}
- Manholes: {{manholes}}
- Lift stations: {{liftStations}}
- Treatment plant: {{treatmentPlant}}
{{#additionalNotes}}Design standards: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'serviceArea',
    'population',
    'flows',
    'pipeSizing',
    'manholes',
    'liftStations',
    'treatmentPlant',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Collection["Collection System"]
        LS["Laterals\\n150mm"]
        CM["Collection\\nMains 200mm"]
        MH["Manholes"]
    end
    subgraph Conveyance["Conveyance"]
        IM["Interceptor\\n450mm"]
        LF["Lift Station"]
    end
    subgraph Treatment["Treatment"]
        WWTP["Wastewater\\nPlant"]
    end
    LS --> CM --> MH --> IM --> LF --> WWTP
    style WWTP fill:#10b981,color:#fff
    style LF fill:#6b7280,color:#fff`,
};

// =============================================================================
// CONSTRUCTION MANAGEMENT
// =============================================================================

/**
 * Construction Sequence template
 */
export const constructionSequence: DiagramTemplate = {
  id: 'civil-construction-sequence',
  name: 'Construction Sequence Diagram',
  description: 'Construction phasing and sequencing for project execution',
  domain: 'engineering',
  promptTemplate: `Create a construction sequence diagram:
- Project type: {{projectType}}
- Major activities: {{activities}}
- Critical path: {{criticalPath}}
- Dependencies: {{dependencies}}
- Milestones: {{milestones}}
- Resource constraints: {{resources}}
- Duration estimates: {{durations}}
{{#additionalNotes}}Scheduling notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'projectType',
    'activities',
    'criticalPath',
    'dependencies',
    'milestones',
    'resources',
    'durations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Phase1["Phase 1 - Site Work"]
        EX["Excavation\\n2 weeks"]
        UT["Utilities\\n3 weeks"]
    end
    subgraph Phase2["Phase 2 - Structure"]
        FD["Foundation\\n4 weeks"]
        ST["Superstructure\\n8 weeks"]
    end
    subgraph Phase3["Phase 3 - Finishes"]
        EN["Envelope\\n6 weeks"]
        FN["Finishes\\n4 weeks"]
    end
    EX --> UT --> FD --> ST --> EN --> FN
    style FD fill:#dc2626,color:#fff
    style ST fill:#dc2626,color:#fff`,
};

/**
 * Site Layout Plan template
 */
export const siteLayoutPlan: DiagramTemplate = {
  id: 'civil-site-layout',
  name: 'Site Layout Plan',
  description: 'Construction site layout with equipment, access, and staging areas',
  domain: 'engineering',
  promptTemplate: `Create a site layout plan diagram:
- Project area: {{projectArea}}
- Access routes: {{accessRoutes}}
- Equipment locations: {{equipment}}
- Material staging: {{stagingAreas}}
- Worker facilities: {{workerFacilities}}
- Safety zones: {{safetyZones}}
- Temporary utilities: {{tempUtilities}}
{{#additionalNotes}}Site constraints: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'projectArea',
    'accessRoutes',
    'equipment',
    'stagingAreas',
    'workerFacilities',
    'safetyZones',
    'tempUtilities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Site["Construction Site"]
        BA["Building\\nArea"]
        CR["Crane\\nLocation"]
    end
    subgraph Support["Support Areas"]
        SA["Staging\\nArea"]
        OF["Site\\nOffice"]
        PK["Parking"]
    end
    subgraph Access["Access"]
        EN["Entry"]
        EX["Exit"]
    end
    EN --> BA
    EN --> SA
    SA --> CR --> BA
    BA --> EX
    OF --> PK
    style BA fill:#3b82f6,color:#fff
    style CR fill:#f59e0b,color:#fff`,
};

// =============================================================================
// SURVEYING AND GEOMATICS
// =============================================================================

/**
 * Survey Control Network template
 */
export const surveyControlNetwork: DiagramTemplate = {
  id: 'civil-survey-control',
  name: 'Survey Control Network',
  description: 'Geodetic control network with benchmarks and control points',
  domain: 'engineering',
  promptTemplate: `Create a survey control network diagram:
- Network type: {{networkType}}
- Control points: {{controlPoints}}
- Observation methods: {{observations}}
- Accuracy requirements: {{accuracy}}
- Datum reference: {{datum}}
- Adjustment method: {{adjustment}}
- Quality control: {{qualityControl}}
{{#additionalNotes}}Survey specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'networkType',
    'controlPoints',
    'observations',
    'accuracy',
    'datum',
    'adjustment',
    'qualityControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Primary["Primary Control"]
        P1["CP-1\\n1st Order"]
        P2["CP-2\\n1st Order"]
    end
    subgraph Secondary["Secondary Control"]
        S1["CP-101"]
        S2["CP-102"]
        S3["CP-103"]
    end
    subgraph Project["Project Control"]
        PR1["Site BM-1"]
        PR2["Site BM-2"]
    end
    P1 --- P2
    P1 --- S1 --- S2 --- P2
    S1 --- S3 --- S2
    S2 --- PR1 --- PR2 --- S3
    style P1 fill:#dc2626,color:#fff
    style P2 fill:#dc2626,color:#fff
    style S1 fill:#f59e0b,color:#fff`,
};

/**
 * Earthwork Calculation template
 */
export const earthworkCalculation: DiagramTemplate = {
  id: 'civil-earthwork',
  name: 'Earthwork Calculation Diagram',
  description: 'Cut and fill calculations with mass haul diagram',
  domain: 'engineering',
  promptTemplate: `Create an earthwork calculation diagram:
- Project alignment: {{alignment}}
- Cross-sections: {{crossSections}}
- Cut volumes: {{cutVolumes}}
- Fill volumes: {{fillVolumes}}
- Shrinkage/swell factors: {{factors}}
- Mass haul: {{massHaul}}
- Balance points: {{balancePoints}}
{{#additionalNotes}}Calculation method: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'alignment',
    'crossSections',
    'cutVolumes',
    'fillVolumes',
    'factors',
    'massHaul',
    'balancePoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Profile["Profile View"]
        ST1["Sta 0+000\\nCut 500m³"]
        ST2["Sta 0+100\\nCut 300m³"]
        ST3["Sta 0+200\\nBalance"]
        ST4["Sta 0+300\\nFill 400m³"]
        ST5["Sta 0+400\\nFill 600m³"]
    end
    ST1 --> ST2 --> ST3 --> ST4 --> ST5
    style ST1 fill:#dc2626,color:#fff
    style ST2 fill:#dc2626,color:#fff
    style ST3 fill:#6b7280,color:#fff
    style ST4 fill:#10b981,color:#fff
    style ST5 fill:#10b981,color:#fff`,
};

// =============================================================================
// BRIDGE ENGINEERING
// =============================================================================

/**
 * Bridge Design template
 */
export const bridgeDesign: DiagramTemplate = {
  id: 'civil-bridge-design',
  name: 'Bridge Design Diagram',
  description: 'Bridge structural design with superstructure and substructure components',
  domain: 'engineering',
  promptTemplate: `Create a bridge design diagram:
- Bridge type: {{bridgeType}}
- Span lengths: {{spanLengths}}
- Deck design: {{deckDesign}}
- Girder system: {{girders}}
- Pier design: {{piers}}
- Abutments: {{abutments}}
- Bearings: {{bearings}}
{{#additionalNotes}}Design standards: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bridgeType',
    'spanLengths',
    'deckDesign',
    'girders',
    'piers',
    'abutments',
    'bearings',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Super["Superstructure"]
        DK["Deck Slab\\n200mm"]
        GR["Girders\\n6 @ 1.8m"]
        BR["Bearings"]
    end
    subgraph Sub["Substructure"]
        AB1["Abutment 1"]
        PR["Pier"]
        AB2["Abutment 2"]
    end
    subgraph Found["Foundations"]
        F1["Pile Cap"]
        F2["Pile Cap"]
        F3["Pile Cap"]
    end
    DK --> GR --> BR
    BR --> AB1 & PR & AB2
    AB1 --> F1
    PR --> F2
    AB2 --> F3
    style DK fill:#4b5563,color:#fff
    style PR fill:#374151,color:#fff`,
};

/**
 * Culvert Design template
 */
export const culvertDesign: DiagramTemplate = {
  id: 'civil-culvert',
  name: 'Culvert Design Diagram',
  description: 'Culvert hydraulic and structural design',
  domain: 'engineering',
  promptTemplate: `Create a culvert design diagram:
- Culvert type: {{culvertType}}
- Design flow: {{designFlow}}
- Inlet type: {{inletType}}
- Outlet conditions: {{outlet}}
- Headwater depth: {{headwater}}
- Tailwater depth: {{tailwater}}
- Embedment: {{embedment}}
{{#additionalNotes}}Hydraulic analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'culvertType',
    'designFlow',
    'inletType',
    'outlet',
    'headwater',
    'tailwater',
    'embedment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Upstream["Upstream"]
        HW["Headwater\\nHW = 2.5m"]
    end
    subgraph Culvert["Box Culvert"]
        IN["Inlet\\nWingwall"]
        CL["Barrel\\n3m x 2m"]
        OT["Outlet"]
    end
    subgraph Downstream["Downstream"]
        TW["Tailwater\\nTW = 1.5m"]
    end
    HW --> IN --> CL --> OT --> TW
    style CL fill:#4b5563,color:#fff
    style HW fill:#0891b2,color:#fff
    style TW fill:#0891b2,color:#fff`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const civilTemplates: DiagramTemplate[] = [
  // Structural Engineering
  structuralLoadAnalysis,
  steelFrameDesign,
  reinforcedConcreteDesign,
  // Foundation Engineering
  foundationDesign,
  pileFoundationDesign,
  retainingWallDesign,
  // Transportation Engineering
  highwayGeometricDesign,
  pavementDesign,
  trafficFlowAnalysis,
  // Water Resources Engineering
  stormwaterManagement,
  waterDistributionSystem,
  sanitarySewerDesign,
  // Construction Management
  constructionSequence,
  siteLayoutPlan,
  // Surveying and Geomatics
  surveyControlNetwork,
  earthworkCalculation,
  // Bridge Engineering
  bridgeDesign,
  culvertDesign,
];
