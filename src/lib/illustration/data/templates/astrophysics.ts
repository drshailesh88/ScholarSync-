import type { DiagramTemplate } from './index';

// Stellar Evolution Templates
export const stellarEvolution: DiagramTemplate = {
  id: 'astrophysics-stellar-evolution',
  name: 'Stellar Evolution Diagram',
  description: 'Life cycle of stars from nebula to end state',
  domain: 'physics',
  promptTemplate: `Create a stellar evolution diagram showing:
- Initial mass: {{initialMass}}
- Main sequence phase: {{mainSequence}}
- Post-main sequence: {{postMainSequence}}
- End state: {{endState}}
- Timescales: {{timescales}}`,
  placeholders: ['initialMass', 'mainSequence', 'postMainSequence', 'endState', 'timescales'],
  mermaidExample: `flowchart TD
    subgraph "Stellar Evolution"
        N[Nebula] --> P[Protostar]
        P --> MS[Main Sequence]
        MS --> RG[Red Giant]
        RG --> |Low Mass| WD[White Dwarf]
        RG --> |High Mass| SN[Supernova]
        SN --> NS[Neutron Star]
        SN --> BH[Black Hole]
    end`,
};

export const hrDiagram: DiagramTemplate = {
  id: 'astrophysics-hr-diagram',
  name: 'Hertzsprung-Russell Diagram',
  description: 'Luminosity vs temperature classification of stars',
  domain: 'physics',
  promptTemplate: `Create an HR diagram showing:
- Temperature range: {{temperatureRange}}
- Luminosity range: {{luminosityRange}}
- Main sequence: {{mainSequence}}
- Giant branches: {{giantBranches}}
- Notable stars: {{notableStars}}`,
  placeholders: ['temperatureRange', 'luminosityRange', 'mainSequence', 'giantBranches', 'notableStars'],
  mermaidExample: `flowchart TB
    subgraph "HR Diagram"
        subgraph "Hot"
            SG[Supergiants]
            G[Giants]
            MS_H[Main Sequence Hot]
        end
        subgraph "Cool"
            RG[Red Giants]
            MS_C[Main Sequence Cool]
            WD[White Dwarfs]
        end
    end`,
};

export const stellarNucleosynthesis: DiagramTemplate = {
  id: 'astrophysics-nucleosynthesis',
  name: 'Stellar Nucleosynthesis',
  description: 'Nuclear fusion processes in stellar cores',
  domain: 'physics',
  promptTemplate: `Create a stellar nucleosynthesis diagram showing:
- Fusion chain: {{fusionChain}}
- Temperature requirements: {{temperatures}}
- Energy released: {{energyReleased}}
- Products: {{products}}
- Stellar mass requirements: {{massRequirements}}`,
  placeholders: ['fusionChain', 'temperatures', 'energyReleased', 'products', 'massRequirements'],
  mermaidExample: `flowchart LR
    subgraph "Stellar Nucleosynthesis"
        H[Hydrogen] --> |pp chain| He[Helium]
        He --> |Triple-alpha| C[Carbon]
        C --> O[Oxygen]
        O --> |Massive stars| Fe[Iron]
    end`,
};

// Galaxy Templates
export const galaxyStructure: DiagramTemplate = {
  id: 'astrophysics-galaxy-structure',
  name: 'Galaxy Structure Diagram',
  description: 'Components and structure of galaxies',
  domain: 'physics',
  promptTemplate: `Create a galaxy structure diagram showing:
- Galaxy type: {{galaxyType}}
- Components: {{components}}
- Dimensions: {{dimensions}}
- Dark matter halo: {{darkMatterHalo}}
- Notable features: {{features}}`,
  placeholders: ['galaxyType', 'components', 'dimensions', 'darkMatterHalo', 'features'],
  mermaidExample: `flowchart TB
    subgraph "Spiral Galaxy Structure"
        DM[Dark Matter Halo]
        DM --> H[Stellar Halo]
        H --> B[Bulge]
        B --> D[Disk]
        D --> SA[Spiral Arms]
        B --> SMBH[Central Black Hole]
    end`,
};

export const galaxyClassification: DiagramTemplate = {
  id: 'astrophysics-galaxy-classification',
  name: 'Galaxy Classification Hubble Tuning Fork',
  description: 'Hubble sequence for galaxy morphology',
  domain: 'physics',
  promptTemplate: `Create a galaxy classification diagram showing:
- Elliptical sequence: {{elliptical}}
- Lenticular: {{lenticular}}
- Spiral sequence: {{spiral}}
- Barred spirals: {{barredSpiral}}
- Irregular types: {{irregular}}`,
  placeholders: ['elliptical', 'lenticular', 'spiral', 'barredSpiral', 'irregular'],
  mermaidExample: `flowchart LR
    subgraph "Hubble Tuning Fork"
        E0 --> E3 --> E7 --> S0
        S0 --> Sa --> Sb --> Sc
        S0 --> SBa --> SBb --> SBc
    end`,
};

// Black Hole Templates
export const blackHoleAnatomy: DiagramTemplate = {
  id: 'astrophysics-black-hole-anatomy',
  name: 'Black Hole Anatomy',
  description: 'Structure and regions of a black hole',
  domain: 'physics',
  promptTemplate: `Create a black hole anatomy diagram showing:
- Singularity: {{singularity}}
- Event horizon radius: {{eventHorizon}}
- Photon sphere: {{photonSphere}}
- Ergosphere: {{ergosphere}}
- Accretion disk: {{accretionDisk}}`,
  placeholders: ['singularity', 'eventHorizon', 'photonSphere', 'ergosphere', 'accretionDisk'],
  mermaidExample: `flowchart TB
    subgraph "Black Hole Structure"
        AD[Accretion Disk]
        PS[Photon Sphere]
        EH[Event Horizon]
        S[Singularity]
        AD --> PS --> EH --> S
        J[Relativistic Jets] --> AD
    end`,
};

export const blackHoleTypes: DiagramTemplate = {
  id: 'astrophysics-black-hole-types',
  name: 'Black Hole Classification',
  description: 'Types of black holes by mass and origin',
  domain: 'physics',
  promptTemplate: `Create a black hole classification showing:
- Stellar mass: {{stellarMass}}
- Intermediate mass: {{intermediateMass}}
- Supermassive: {{supermassive}}
- Primordial: {{primordial}}
- Formation mechanisms: {{formation}}`,
  placeholders: ['stellarMass', 'intermediateMass', 'supermassive', 'primordial', 'formation'],
  mermaidExample: `flowchart TD
    subgraph "Black Hole Types"
        SBH[Stellar BH<br/>3-100 M☉]
        IMBH[Intermediate BH<br/>100-10⁵ M☉]
        SMBH[Supermassive BH<br/>10⁶-10¹⁰ M☉]
        PBH[Primordial BH]
    end`,
};

// Cosmology Templates
export const bigBangTimeline: DiagramTemplate = {
  id: 'astrophysics-big-bang-timeline',
  name: 'Big Bang Timeline',
  description: 'Cosmic evolution from Big Bang to present',
  domain: 'physics',
  promptTemplate: `Create a Big Bang timeline showing:
- Planck epoch: {{planckEpoch}}
- Inflation: {{inflation}}
- Nucleosynthesis: {{nucleosynthesis}}
- Recombination: {{recombination}}
- Structure formation: {{structureFormation}}`,
  placeholders: ['planckEpoch', 'inflation', 'nucleosynthesis', 'recombination', 'structureFormation'],
  mermaidExample: `flowchart LR
    subgraph "Cosmic Timeline"
        BB[Big Bang] --> I[Inflation<br/>10⁻³⁶s]
        I --> QE[Quark Epoch]
        QE --> BBN[Nucleosynthesis<br/>3 min]
        BBN --> R[Recombination<br/>380,000 yr]
        R --> DA[Dark Ages]
        DA --> SF[First Stars<br/>100 Myr]
        SF --> G[Galaxies<br/>1 Gyr]
        G --> N[Now<br/>13.8 Gyr]
    end`,
};

export const cosmicDistanceLadder: DiagramTemplate = {
  id: 'astrophysics-distance-ladder',
  name: 'Cosmic Distance Ladder',
  description: 'Methods for measuring astronomical distances',
  domain: 'physics',
  promptTemplate: `Create a cosmic distance ladder showing:
- Parallax: {{parallax}}
- Cepheid variables: {{cepheids}}
- Type Ia supernovae: {{supernovae}}
- Hubble law: {{hubbleLaw}}
- Distance ranges: {{ranges}}`,
  placeholders: ['parallax', 'cepheids', 'supernovae', 'hubbleLaw', 'ranges'],
  mermaidExample: `flowchart TB
    subgraph "Distance Ladder"
        P[Parallax<br/>< 100 pc]
        C[Cepheids<br/>< 30 Mpc]
        SN[Type Ia SNe<br/>< 1 Gpc]
        H[Hubble Law<br/>Entire Universe]
        P --> C --> SN --> H
    end`,
};

export const darkMatterEvidence: DiagramTemplate = {
  id: 'astrophysics-dark-matter-evidence',
  name: 'Dark Matter Evidence',
  description: 'Observational evidence for dark matter',
  domain: 'physics',
  promptTemplate: `Create a dark matter evidence diagram showing:
- Galaxy rotation curves: {{rotationCurves}}
- Gravitational lensing: {{lensing}}
- CMB anisotropies: {{cmb}}
- Galaxy cluster dynamics: {{clusters}}
- Large scale structure: {{structure}}`,
  placeholders: ['rotationCurves', 'lensing', 'cmb', 'clusters', 'structure'],
  mermaidExample: `flowchart TB
    subgraph "Dark Matter Evidence"
        RC[Flat Rotation Curves]
        GL[Gravitational Lensing]
        CMB[CMB Anisotropies]
        BC[Bullet Cluster]
        LSS[Large Scale Structure]
        RC --> DM[Dark Matter]
        GL --> DM
        CMB --> DM
        BC --> DM
        LSS --> DM
    end`,
};

// Exoplanet Templates
export const exoplanetDetection: DiagramTemplate = {
  id: 'astrophysics-exoplanet-detection',
  name: 'Exoplanet Detection Methods',
  description: 'Techniques for detecting extrasolar planets',
  domain: 'physics',
  promptTemplate: `Create an exoplanet detection diagram showing:
- Transit method: {{transit}}
- Radial velocity: {{radialVelocity}}
- Direct imaging: {{directImaging}}
- Microlensing: {{microlensing}}
- Sensitivity ranges: {{sensitivity}}`,
  placeholders: ['transit', 'radialVelocity', 'directImaging', 'microlensing', 'sensitivity'],
  mermaidExample: `flowchart TB
    subgraph "Detection Methods"
        T[Transit<br/>Photometry]
        RV[Radial Velocity<br/>Doppler]
        DI[Direct Imaging]
        ML[Microlensing]
        A[Astrometry]
    end`,
};

export const habitableZone: DiagramTemplate = {
  id: 'astrophysics-habitable-zone',
  name: 'Stellar Habitable Zone',
  description: 'Circumstellar habitable zone boundaries',
  domain: 'physics',
  promptTemplate: `Create a habitable zone diagram showing:
- Star type: {{starType}}
- Inner boundary: {{innerBoundary}}
- Outer boundary: {{outerBoundary}}
- Liquid water zone: {{liquidWater}}
- Known exoplanets: {{exoplanets}}`,
  placeholders: ['starType', 'innerBoundary', 'outerBoundary', 'liquidWater', 'exoplanets'],
  mermaidExample: `flowchart LR
    subgraph "Habitable Zone"
        S[Star] --> TH[Too Hot]
        TH --> IB[Inner Boundary]
        IB --> HZ[Habitable Zone]
        HZ --> OB[Outer Boundary]
        OB --> TC[Too Cold]
    end`,
};

// Observational Templates
export const telescopeTypes: DiagramTemplate = {
  id: 'astrophysics-telescope-types',
  name: 'Telescope Classification',
  description: 'Types of astronomical telescopes',
  domain: 'physics',
  promptTemplate: `Create a telescope classification showing:
- Optical designs: {{opticalDesigns}}
- Wavelength coverage: {{wavelengths}}
- Ground vs space: {{location}}
- Notable examples: {{examples}}
- Capabilities: {{capabilities}}`,
  placeholders: ['opticalDesigns', 'wavelengths', 'location', 'examples', 'capabilities'],
  mermaidExample: `flowchart TB
    subgraph "Telescope Types"
        subgraph "Ground"
            R[Refractor]
            RF[Reflector]
            RC[Radio]
        end
        subgraph "Space"
            HST[Optical/IR]
            XR[X-ray]
            GW[Gravitational Wave]
        end
    end`,
};

export const emSpectrum: DiagramTemplate = {
  id: 'astrophysics-em-spectrum-astro',
  name: 'Astronomical EM Spectrum',
  description: 'Electromagnetic spectrum for astronomical observations',
  domain: 'physics',
  promptTemplate: `Create an astronomical EM spectrum showing:
- Wavelength bands: {{bands}}
- Atmospheric transmission: {{transmission}}
- Sources observed: {{sources}}
- Instruments: {{instruments}}
- Key observations: {{observations}}`,
  placeholders: ['bands', 'transmission', 'sources', 'instruments', 'observations'],
  mermaidExample: `flowchart LR
    subgraph "Astronomical EM Spectrum"
        R[Radio] --> MW[Microwave]
        MW --> IR[Infrared]
        IR --> V[Visible]
        V --> UV[Ultraviolet]
        UV --> X[X-ray]
        X --> G[Gamma-ray]
    end`,
};

// Gravitational Wave Templates
export const gravitationalWaveSources: DiagramTemplate = {
  id: 'astrophysics-gw-sources',
  name: 'Gravitational Wave Sources',
  description: 'Sources of gravitational waves',
  domain: 'physics',
  promptTemplate: `Create a gravitational wave sources diagram showing:
- Binary mergers: {{mergers}}
- Frequency ranges: {{frequencies}}
- Detectors: {{detectors}}
- Strain amplitude: {{strain}}
- Notable events: {{events}}`,
  placeholders: ['mergers', 'frequencies', 'detectors', 'strain', 'events'],
  mermaidExample: `flowchart TD
    subgraph "GW Sources"
        BBH[Binary Black Holes]
        BNS[Binary Neutron Stars]
        BHNS[BH-NS Mergers]
        CW[Continuous Waves]
        SB[Stochastic Background]
    end`,
};

export const interferometerDesign: DiagramTemplate = {
  id: 'astrophysics-interferometer',
  name: 'Gravitational Wave Interferometer',
  description: 'LIGO/Virgo interferometer design',
  domain: 'physics',
  promptTemplate: `Create an interferometer diagram showing:
- Arm length: {{armLength}}
- Laser source: {{laser}}
- Beam splitter: {{beamSplitter}}
- Test masses: {{testMasses}}
- Detection: {{detection}}`,
  placeholders: ['armLength', 'laser', 'beamSplitter', 'testMasses', 'detection'],
  mermaidExample: `flowchart TB
    subgraph "Michelson Interferometer"
        L[Laser] --> BS[Beam Splitter]
        BS --> M1[Mirror 1 - 4km]
        BS --> M2[Mirror 2 - 4km]
        M1 --> BS
        M2 --> BS
        BS --> D[Photodetector]
    end`,
};

// Solar System Templates
export const solarSystemStructure: DiagramTemplate = {
  id: 'astrophysics-solar-system',
  name: 'Solar System Structure',
  description: 'Structure and components of the solar system',
  domain: 'physics',
  promptTemplate: `Create a solar system structure diagram showing:
- Inner planets: {{innerPlanets}}
- Outer planets: {{outerPlanets}}
- Asteroid belt: {{asteroidBelt}}
- Kuiper belt: {{kuiperBelt}}
- Oort cloud: {{oortCloud}}`,
  placeholders: ['innerPlanets', 'outerPlanets', 'asteroidBelt', 'kuiperBelt', 'oortCloud'],
  mermaidExample: `flowchart LR
    subgraph "Solar System"
        S[Sun] --> IP[Inner Planets]
        IP --> AB[Asteroid Belt]
        AB --> OP[Outer Planets]
        OP --> KB[Kuiper Belt]
        KB --> OC[Oort Cloud]
    end`,
};

export const planetaryFormation: DiagramTemplate = {
  id: 'astrophysics-planetary-formation',
  name: 'Planetary Formation',
  description: 'Stages of planetary system formation',
  domain: 'physics',
  promptTemplate: `Create a planetary formation diagram showing:
- Molecular cloud: {{molecularCloud}}
- Protoplanetary disk: {{protoplanetaryDisk}}
- Planetesimals: {{planetesimals}}
- Planet formation: {{planetFormation}}
- System clearing: {{clearing}}`,
  placeholders: ['molecularCloud', 'protoplanetaryDisk', 'planetesimals', 'planetFormation', 'clearing'],
  mermaidExample: `flowchart TD
    subgraph "Planet Formation"
        MC[Molecular Cloud] --> C[Collapse]
        C --> PPD[Protoplanetary Disk]
        PPD --> D[Dust Grains]
        D --> P[Planetesimals]
        P --> PE[Protoplanets]
        PE --> PL[Planets]
    end`,
};

// Export all templates
export const astrophysicsTemplates: DiagramTemplate[] = [
  stellarEvolution,
  hrDiagram,
  stellarNucleosynthesis,
  galaxyStructure,
  galaxyClassification,
  blackHoleAnatomy,
  blackHoleTypes,
  bigBangTimeline,
  cosmicDistanceLadder,
  darkMatterEvidence,
  exoplanetDetection,
  habitableZone,
  telescopeTypes,
  emSpectrum,
  gravitationalWaveSources,
  interferometerDesign,
  solarSystemStructure,
  planetaryFormation,
];

export default astrophysicsTemplates;
