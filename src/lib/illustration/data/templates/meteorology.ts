/**
 * meteorology.ts
 * Meteorology diagram templates for FINNISH
 *
 * Contains comprehensive templates for meteorological sciences including:
 * - Atmospheric phenomena diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Weather process flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Atmospheric Layers Diagram template
 */
export const atmosphericLayersDiagram: DiagramTemplate = {
  id: 'met-atmospheric-layers',
  name: 'Atmospheric Layers Diagram',
  description: 'Vertical structure of the atmosphere with temperature profiles',
  domain: 'physics',
  promptTemplate: `Create an atmospheric layers diagram showing:
- Troposphere characteristics: {{troposphere}}
- Stratosphere features: {{stratosphere}}
- Mesosphere properties: {{mesosphere}}
- Thermosphere conditions: {{thermosphere}}
- Temperature profile: {{temperatureProfile}}
- Key boundaries: {{keyBoundaries}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'troposphere',
    'stratosphere',
    'mesosphere',
    'thermosphere',
    'temperatureProfile',
    'keyBoundaries',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Atmosphere["Atmospheric Layers"]
        THERM["Thermosphere >80km"]
        MESO["Mesosphere 50-80km"]
        STRAT["Stratosphere 12-50km"]
        TROP["Troposphere 0-12km"]
    end
    THERM --> MESOPAUSE["Mesopause"]
    MESOPAUSE --> MESO
    MESO --> STRATOPAUSE["Stratopause"]
    STRATOPAUSE --> STRAT
    STRAT --> TROPOPAUSE["Tropopause"]
    TROPOPAUSE --> TROP
    style TROP fill:#87CEEB
    style STRAT fill:#4169E1`,
};

/**
 * Cyclone Structure template
 */
export const cycloneStructure: DiagramTemplate = {
  id: 'met-cyclone-structure',
  name: 'Cyclone Structure Diagram',
  description: 'Anatomy of tropical and extratropical cyclones',
  domain: 'physics',
  promptTemplate: `Create a cyclone structure diagram:
- Eye characteristics: {{eyeCharacteristics}}
- Eyewall dynamics: {{eyewallDynamics}}
- Spiral rainbands: {{spiralRainbands}}
- Wind patterns: {{windPatterns}}
- Pressure distribution: {{pressureDistribution}}
- Storm surge: {{stormSurge}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'eyeCharacteristics',
    'eyewallDynamics',
    'spiralRainbands',
    'windPatterns',
    'pressureDistribution',
    'stormSurge',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CENTER["Low Pressure Center"] --> EYE["Eye"]
    EYE --> EYEWALL["Eyewall"]
    EYEWALL --> BANDS["Spiral Rainbands"]
    EYEWALL --> WIND["Max Winds"]
    BANDS --> PRECIP["Heavy Precipitation"]
    CENTER --> SURGE["Storm Surge"]
    style EYE fill:#FFFFFF
    style EYEWALL fill:#DC143C`,
};

/**
 * Thunderstorm Development template
 */
export const thunderstormDevelopment: DiagramTemplate = {
  id: 'met-thunderstorm-development',
  name: 'Thunderstorm Development',
  description: 'Life cycle stages of thunderstorm development',
  domain: 'physics',
  promptTemplate: `Create a thunderstorm development diagram:
- Cumulus stage: {{cumulusStage}}
- Mature stage: {{matureStage}}
- Dissipating stage: {{dissipatingStage}}
- Updraft dynamics: {{updraftDynamics}}
- Precipitation formation: {{precipitationFormation}}
- Electrical activity: {{electricalActivity}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cumulusStage',
    'matureStage',
    'dissipatingStage',
    'updraftDynamics',
    'precipitationFormation',
    'electricalActivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    CU["Cumulus Stage"] --> MAT["Mature Stage"]
    MAT --> DIS["Dissipating Stage"]
    CU --> UP["Updrafts Only"]
    MAT --> UPDOWN["Updrafts + Downdrafts"]
    MAT --> LIGHT["Lightning"]
    MAT --> HAIL["Hail"]
    DIS --> DOWN["Downdrafts Dominate"]
    style CU fill:#87CEEB
    style MAT fill:#DC143C
    style DIS fill:#808080`,
};

/**
 * Frontal Systems template
 */
export const frontalSystems: DiagramTemplate = {
  id: 'met-frontal-systems',
  name: 'Frontal Systems Diagram',
  description: 'Cold, warm, and occluded front structures',
  domain: 'physics',
  promptTemplate: `Create a frontal systems diagram:
- Cold front characteristics: {{coldFront}}
- Warm front characteristics: {{warmFront}}
- Occluded front: {{occludedFront}}
- Associated weather: {{associatedWeather}}
- Cloud types: {{cloudTypes}}
- Precipitation patterns: {{precipitationPatterns}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'coldFront',
    'warmFront',
    'occludedFront',
    'associatedWeather',
    'cloudTypes',
    'precipitationPatterns',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    FRONTS["Frontal Systems"] --> COLD["Cold Front"]
    FRONTS --> WARM["Warm Front"]
    FRONTS --> OCC["Occluded Front"]
    COLD --> CU["Cumulonimbus"]
    COLD --> HEAVY["Heavy Showers"]
    WARM --> STRAT["Stratus/Nimbostratus"]
    WARM --> STEADY["Steady Rain"]
    style COLD fill:#4169E1
    style WARM fill:#DC143C`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Weather Forecasting Process template
 */
export const weatherForecastingProcess: DiagramTemplate = {
  id: 'met-forecasting-process',
  name: 'Weather Forecasting Process',
  description: 'Numerical weather prediction workflow',
  domain: 'physics',
  promptTemplate: `Create a weather forecasting process diagram:
- Data collection: {{dataCollection}}
- Data assimilation: {{dataAssimilation}}
- Numerical modeling: {{numericalModeling}}
- Model output: {{modelOutput}}
- Forecast products: {{forecastProducts}}
- Verification: {{verification}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dataCollection',
    'dataAssimilation',
    'numericalModeling',
    'modelOutput',
    'forecastProducts',
    'verification',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    OBS["Observations"] --> QC["Quality Control"]
    QC --> DA["Data Assimilation"]
    DA --> INIT["Initial Conditions"]
    INIT --> NWP["NWP Model"]
    NWP --> POST["Post-Processing"]
    POST --> FCST["Forecast Products"]
    FCST --> VER["Verification"]
    VER --> OBS
    style OBS fill:#4169E1
    style FCST fill:#228B22`,
};

/**
 * Radar Meteorology Workflow template
 */
export const radarMeteorologyWorkflow: DiagramTemplate = {
  id: 'met-radar-workflow',
  name: 'Radar Meteorology Workflow',
  description: 'Weather radar data processing and interpretation',
  domain: 'physics',
  promptTemplate: `Create a radar meteorology workflow:
- Radar scanning strategy: {{scanningStrategy}}
- Signal processing: {{signalProcessing}}
- Reflectivity products: {{reflectivityProducts}}
- Doppler products: {{dopplerProducts}}
- Dual-polarization: {{dualPolarization}}
- Severe weather detection: {{severeWeatherDetection}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'scanningStrategy',
    'signalProcessing',
    'reflectivityProducts',
    'dopplerProducts',
    'dualPolarization',
    'severeWeatherDetection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    TRANS["Transmit Pulse"] --> TARG["Target Interaction"]
    TARG --> RECV["Receive Echo"]
    RECV --> PROC["Signal Processing"]
    PROC --> REF["Reflectivity"]
    PROC --> VEL["Doppler Velocity"]
    PROC --> ZDR["Differential Reflectivity"]
    REF & VEL & ZDR --> PROD["Products"]
    PROD --> WARN["Warning Decision"]
    style TRANS fill:#4169E1
    style WARN fill:#DC143C`,
};

/**
 * Upper Air Sounding template
 */
export const upperAirSounding: DiagramTemplate = {
  id: 'met-upper-air-sounding',
  name: 'Upper Air Sounding',
  description: 'Radiosonde observation and analysis workflow',
  domain: 'physics',
  promptTemplate: `Create an upper air sounding workflow:
- Launch procedures: {{launchProcedures}}
- Sensor measurements: {{sensorMeasurements}}
- Data transmission: {{dataTransmission}}
- Skew-T analysis: {{skewTAnalysis}}
- Stability indices: {{stabilityIndices}}
- Forecast applications: {{forecastApplications}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'launchProcedures',
    'sensorMeasurements',
    'dataTransmission',
    'skewTAnalysis',
    'stabilityIndices',
    'forecastApplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    LAUNCH["Balloon Launch"] --> ASCENT["Ascent"]
    ASCENT --> MEAS["T, RH, P, Wind"]
    MEAS --> TRANS["Data Transmission"]
    TRANS --> RECV["Ground Station"]
    RECV --> PLOT["Skew-T Plot"]
    PLOT --> ANAL["Stability Analysis"]
    ANAL --> CAPE["CAPE/CIN"]
    ANAL --> WIND["Wind Shear"]
    style LAUNCH fill:#87CEEB
    style ANAL fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Cloud Classification template
 */
export const cloudClassification: DiagramTemplate = {
  id: 'met-cloud-classification',
  name: 'Cloud Classification System',
  description: 'WMO cloud genera and species classification',
  domain: 'physics',
  promptTemplate: `Create a cloud classification diagram:
- High clouds: {{highClouds}}
- Middle clouds: {{middleClouds}}
- Low clouds: {{lowClouds}}
- Vertical development: {{verticalDevelopment}}
- Formation processes: {{formationProcesses}}
- Associated weather: {{associatedWeather}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'highClouds',
    'middleClouds',
    'lowClouds',
    'verticalDevelopment',
    'formationProcesses',
    'associatedWeather',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CLOUDS["Cloud Types"] --> HIGH["High >6km"]
    CLOUDS --> MID["Middle 2-6km"]
    CLOUDS --> LOW["Low <2km"]
    CLOUDS --> VERT["Vertical Development"]
    HIGH --> CI["Cirrus"]
    HIGH --> CC["Cirrocumulus"]
    MID --> AS["Altostratus"]
    LOW --> ST["Stratus"]
    VERT --> CU["Cumulus"]
    VERT --> CB["Cumulonimbus"]
    style CI fill:#E0E0E0
    style CB fill:#4169E1`,
};

/**
 * Precipitation Classification template
 */
export const precipitationClassification: DiagramTemplate = {
  id: 'met-precipitation-classification',
  name: 'Precipitation Classification',
  description: 'Types of precipitation and formation mechanisms',
  domain: 'physics',
  promptTemplate: `Create a precipitation classification diagram:
- Liquid precipitation: {{liquidPrecipitation}}
- Frozen precipitation: {{frozenPrecipitation}}
- Mixed precipitation: {{mixedPrecipitation}}
- Formation processes: {{formationProcesses}}
- Temperature profiles: {{temperatureProfiles}}
- Measurement methods: {{measurementMethods}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'liquidPrecipitation',
    'frozenPrecipitation',
    'mixedPrecipitation',
    'formationProcesses',
    'temperatureProfiles',
    'measurementMethods',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PRECIP["Precipitation Types"] --> LIQ["Liquid"]
    PRECIP --> FROZEN["Frozen"]
    PRECIP --> MIXED["Mixed"]
    LIQ --> RAIN["Rain"]
    LIQ --> DRIZZLE["Drizzle"]
    FROZEN --> SNOW["Snow"]
    FROZEN --> HAIL["Hail"]
    MIXED --> SLEET["Sleet"]
    MIXED --> FR["Freezing Rain"]
    style RAIN fill:#4169E1
    style SNOW fill:#FFFFFF
    style HAIL fill:#808080`,
};

/**
 * Tornado Classification template
 */
export const tornadoClassification: DiagramTemplate = {
  id: 'met-tornado-classification',
  name: 'Tornado Classification (EF Scale)',
  description: 'Enhanced Fujita scale for tornado intensity',
  domain: 'physics',
  promptTemplate: `Create a tornado classification diagram:
- EF scale ratings: {{efScaleRatings}}
- Wind speed ranges: {{windSpeedRanges}}
- Damage indicators: {{damageIndicators}}
- Degrees of damage: {{degreesOfDamage}}
- Historical examples: {{historicalExamples}}
- Safety recommendations: {{safetyRecommendations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'efScaleRatings',
    'windSpeedRanges',
    'damageIndicators',
    'degreesOfDamage',
    'historicalExamples',
    'safetyRecommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    TORN["Tornado Intensity"] --> EF0["EF0: 65-85 mph"]
    TORN --> EF1["EF1: 86-110 mph"]
    TORN --> EF2["EF2: 111-135 mph"]
    TORN --> EF3["EF3: 136-165 mph"]
    TORN --> EF4["EF4: 166-200 mph"]
    TORN --> EF5["EF5: >200 mph"]
    EF0 --> D0["Light Damage"]
    EF3 --> D3["Severe Damage"]
    EF5 --> D5["Incredible Damage"]
    style EF0 fill:#228B22
    style EF5 fill:#DC143C`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Water Cycle in Atmosphere template
 */
export const atmosphericWaterCycle: DiagramTemplate = {
  id: 'met-water-cycle',
  name: 'Atmospheric Water Cycle',
  description: 'Water phase changes and transport in the atmosphere',
  domain: 'physics',
  promptTemplate: `Create an atmospheric water cycle diagram:
- Evaporation processes: {{evaporationProcesses}}
- Condensation: {{condensation}}
- Precipitation formation: {{precipitationFormation}}
- Atmospheric transport: {{atmosphericTransport}}
- Energy exchange: {{energyExchange}}
- Global patterns: {{globalPatterns}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'evaporationProcesses',
    'condensation',
    'precipitationFormation',
    'atmosphericTransport',
    'energyExchange',
    'globalPatterns',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SURF["Surface Water"] -->|"Evaporation"| WV["Water Vapor"]
    WV -->|"Advection"| TRANS["Atmospheric Transport"]
    TRANS -->|"Lifting"| COOL["Cooling"]
    COOL -->|"Condensation"| CLOUD["Cloud Formation"]
    CLOUD -->|"Growth"| PRECIP["Precipitation"]
    PRECIP --> SURF
    style WV fill:#87CEEB
    style CLOUD fill:#E0E0E0`,
};

/**
 * Monsoon Circulation template
 */
export const monsoonCirculation: DiagramTemplate = {
  id: 'met-monsoon-circulation',
  name: 'Monsoon Circulation',
  description: 'Seasonal reversal of wind patterns and precipitation',
  domain: 'physics',
  promptTemplate: `Create a monsoon circulation diagram:
- Summer monsoon: {{summerMonsoon}}
- Winter monsoon: {{winterMonsoon}}
- Land-sea contrast: {{landSeaContrast}}
- ITCZ migration: {{itczMigration}}
- Precipitation distribution: {{precipitationDistribution}}
- Agricultural impacts: {{agriculturalImpacts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'summerMonsoon',
    'winterMonsoon',
    'landSeaContrast',
    'itczMigration',
    'precipitationDistribution',
    'agriculturalImpacts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Summer["Summer Monsoon"]
        OCEAN1["Cool Ocean"] --> LAND1["Hot Land"]
        LAND1 --> RAIN["Heavy Rainfall"]
    end
    subgraph Winter["Winter Monsoon"]
        LAND2["Cold Land"] --> OCEAN2["Warm Ocean"]
        LAND2 --> DRY["Dry Conditions"]
    end
    style RAIN fill:#4169E1
    style DRY fill:#DAA520`,
};

/**
 * El Nino Southern Oscillation template
 */
export const ensoProcess: DiagramTemplate = {
  id: 'met-enso-process',
  name: 'ENSO Process',
  description: 'El Nino and La Nina ocean-atmosphere interactions',
  domain: 'physics',
  promptTemplate: `Create an ENSO process diagram:
- Normal conditions: {{normalConditions}}
- El Nino phase: {{elNinoPhase}}
- La Nina phase: {{laNinaPhase}}
- Walker circulation: {{walkerCirculation}}
- Sea surface temperatures: {{seaSurfaceTemperatures}}
- Global impacts: {{globalImpacts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'normalConditions',
    'elNinoPhase',
    'laNinaPhase',
    'walkerCirculation',
    'seaSurfaceTemperatures',
    'globalImpacts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ENSO["ENSO Phases"] --> NORM["Normal"]
    ENSO --> NINO["El Nino"]
    ENSO --> NINA["La Nina"]
    NORM --> WALK["Strong Walker Cell"]
    NINO --> WEAK["Weak Walker Cell"]
    NINO --> WARM["Warm Eastern Pacific"]
    NINA --> STRONG["Enhanced Walker Cell"]
    NINA --> COOL["Cool Eastern Pacific"]
    style NINO fill:#DC143C
    style NINA fill:#4169E1`,
};

/**
 * Severe Weather Warning System template
 */
export const severeWeatherWarning: DiagramTemplate = {
  id: 'met-severe-weather-warning',
  name: 'Severe Weather Warning System',
  description: 'Warning decision process for severe weather events',
  domain: 'physics',
  promptTemplate: `Create a severe weather warning system diagram:
- Detection methods: {{detectionMethods}}
- Threat assessment: {{threatAssessment}}
- Warning criteria: {{warningCriteria}}
- Communication channels: {{communicationChannels}}
- Public response: {{publicResponse}}
- Verification: {{verification}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'detectionMethods',
    'threatAssessment',
    'warningCriteria',
    'communicationChannels',
    'publicResponse',
    'verification',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DET["Detection"] --> RADAR["Radar"]
    DET --> SAT["Satellite"]
    DET --> SPOT["Spotters"]
    RADAR & SAT & SPOT --> ASSESS["Threat Assessment"]
    ASSESS --> WATCH["Watch"]
    ASSESS --> WARN["Warning"]
    WARN --> EAS["Emergency Alert"]
    EAS --> PUBLIC["Public Action"]
    style WARN fill:#DC143C
    style PUBLIC fill:#228B22`,
};

/**
 * Climate Feedback Mechanisms template
 */
export const climateFeedbackMechanisms: DiagramTemplate = {
  id: 'met-climate-feedbacks',
  name: 'Climate Feedback Mechanisms',
  description: 'Positive and negative feedbacks in the climate system',
  domain: 'physics',
  promptTemplate: `Create a climate feedback diagram:
- Ice-albedo feedback: {{iceAlbedoFeedback}}
- Water vapor feedback: {{waterVaporFeedback}}
- Cloud feedbacks: {{cloudFeedbacks}}
- Carbon cycle feedbacks: {{carbonCycleFeedbacks}}
- Feedback sensitivity: {{feedbackSensitivity}}
- Tipping points: {{tippingPoints}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'iceAlbedoFeedback',
    'waterVaporFeedback',
    'cloudFeedbacks',
    'carbonCycleFeedbacks',
    'feedbackSensitivity',
    'tippingPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    WARM["Warming"] --> ICE["Ice Melting"]
    ICE --> ALB["Lower Albedo"]
    ALB --> ABS["More Absorption"]
    ABS --> WARM
    WARM --> WV["More Water Vapor"]
    WV --> GHG["Enhanced Greenhouse"]
    GHG --> WARM
    style WARM fill:#DC143C
    style ICE fill:#87CEEB`,
};

/**
 * Urban Heat Island template
 */
export const urbanHeatIsland: DiagramTemplate = {
  id: 'met-urban-heat-island',
  name: 'Urban Heat Island Effect',
  description: 'Temperature differences between urban and rural areas',
  domain: 'physics',
  promptTemplate: `Create an urban heat island diagram:
- Surface characteristics: {{surfaceCharacteristics}}
- Heat sources: {{heatSources}}
- Temperature gradients: {{temperatureGradients}}
- Urban canyon effects: {{urbanCanyonEffects}}
- Health impacts: {{healthImpacts}}
- Mitigation strategies: {{mitigationStrategies}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surfaceCharacteristics',
    'heatSources',
    'temperatureGradients',
    'urbanCanyonEffects',
    'healthImpacts',
    'mitigationStrategies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    URBAN["Urban Area"] --> BUILD["Buildings"]
    URBAN --> PAVE["Pavement"]
    URBAN --> ANTHRO["Anthropogenic Heat"]
    BUILD & PAVE --> ABSORB["Heat Absorption"]
    ABSORB --> TRAP["Heat Trapping"]
    ANTHRO --> TRAP
    TRAP --> UHI["Urban Heat Island"]
    UHI --> HEALTH["Health Impacts"]
    style URBAN fill:#808080
    style UHI fill:#DC143C`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All meteorology templates
 */
export const meteorologyTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  atmosphericLayersDiagram,
  cycloneStructure,
  thunderstormDevelopment,
  frontalSystems,
  // Research Methodologies
  weatherForecastingProcess,
  radarMeteorologyWorkflow,
  upperAirSounding,
  // Classification Systems
  cloudClassification,
  precipitationClassification,
  tornadoClassification,
  // Process Flows
  atmosphericWaterCycle,
  monsoonCirculation,
  ensoProcess,
  severeWeatherWarning,
  climateFeedbackMechanisms,
  urbanHeatIsland,
];

export default meteorologyTemplates;
