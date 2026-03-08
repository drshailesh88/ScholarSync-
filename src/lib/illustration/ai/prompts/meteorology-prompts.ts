/**
 * meteorology-prompts.ts
 * Meteorology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for meteorology topics including:
 * - Atmospheric structure and composition
 * - Weather systems and fronts
 * - Cloud formation and types
 * - Precipitation processes
 * - Severe weather phenomena
 * - Climate patterns and oscillations
 * - Atmospheric circulation
 * - Weather forecasting
 * - Radiation and energy balance
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// METEOROLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base meteorology domain prompt for weather and climate diagrams
 */
export const METEOROLOGY_DOMAIN_PROMPT = `
Meteorology diagram requirements:
- Use standard meteorological symbols and notation (WMO standards)
- Follow established conventions for weather maps and atmospheric diagrams
- Include appropriate scales (spatial, temporal, pressure, temperature)
- Use consistent color coding for temperature gradients and weather phenomena
- Show directional arrows for wind flow, air mass movement, and circulation
- Reference standard pressure levels (mb/hPa) and altitude measurements
- Include legend/key for weather symbols
- Color coding: Warm air (red/orange), Cold air (blue), Moisture (green), Precipitation (blue gradients)
- Pressure: High (H, red), Low (L, blue), Fronts (standard symbols)`;

// =============================================================================
// METEOROLOGY-SPECIFIC PROMPTS
// =============================================================================

export const METEOROLOGY_PROMPTS = {
  // Atmospheric Structure
  atmosphericLayers: `
Atmospheric Layers Diagram requirements:
- Show troposphere, stratosphere, mesosphere, thermosphere, exosphere
- Include temperature profile with altitude
- Mark tropopause, stratopause, mesopause
- Show typical altitudes for each layer
- Include ozone layer location
- Indicate pressure changes with altitude
- Show where weather occurs
- Reference standard atmosphere values`,

  atmosphericComposition: `
Atmospheric Composition requirements:
- Show major gases (N2, O2, Ar, CO2)
- Include trace gases and their proportions
- Show variable components (H2O, aerosols)
- Indicate changes with altitude
- Include greenhouse gases specifically
- Show natural vs anthropogenic sources
- Reference pre-industrial vs current levels
- Include residence times`,

  radiationBalance: `
Earth's Radiation Balance requirements:
- Show incoming solar radiation (shortwave)
- Include reflection (albedo) components
- Show absorption by atmosphere and surface
- Include outgoing longwave radiation
- Show greenhouse effect mechanism
- Indicate energy values (W/m2)
- Include cloud effects
- Reference Stefan-Boltzmann law`,

  // Weather Systems
  frontSystems: `
Weather Front Diagram requirements:
- Show cold front structure and movement
- Include warm front characteristics
- Show occluded and stationary fronts
- Indicate air mass characteristics (mT, cP, etc.)
- Include temperature and pressure changes
- Show associated cloud types
- Indicate precipitation patterns
- Reference frontal symbols (standard notation)`,

  cycloneStructure: `
Mid-latitude Cyclone requirements:
- Show low pressure center
- Include warm and cold sectors
- Show frontal boundaries
- Indicate wind circulation (counterclockwise NH)
- Include cloud patterns
- Show precipitation distribution
- Indicate typical movement direction
- Reference Norwegian cyclone model`,

  anticycloneStructure: `
Anticyclone (High Pressure) requirements:
- Show high pressure center
- Include descending air pattern
- Show outward spiral flow
- Indicate associated weather (clear, stable)
- Include temperature inversions
- Show typical size and duration
- Indicate seasonal characteristics
- Reference blocking patterns`,

  // Cloud Formation
  cloudClassification: `
Cloud Classification Diagram requirements:
- Show all 10 basic cloud genera
- Include altitude levels (low, middle, high)
- Show vertical development clouds
- Indicate typical altitudes
- Include formation mechanisms
- Show associated weather
- Reference International Cloud Atlas
- Include cloud symbols`,

  cloudFormationProcesses: `
Cloud Formation Processes requirements:
- Show orographic lifting
- Include frontal lifting
- Show convective lifting
- Indicate convergence lifting
- Include adiabatic cooling concept
- Show dew point and condensation
- Indicate cloud condensation nuclei role
- Reference lifting condensation level`,

  precipitationProcesses: `
Precipitation Formation requirements:
- Show collision-coalescence process (warm clouds)
- Include Bergeron process (cold clouds)
- Show ice crystal formation
- Indicate raindrop formation
- Include precipitation types (rain, snow, sleet, hail)
- Show freezing level effects
- Indicate temperature profiles
- Reference terminal velocity`,

  // Severe Weather
  thunderstormDevelopment: `
Thunderstorm Life Cycle requirements:
- Show cumulus stage (updrafts only)
- Include mature stage (updrafts and downdrafts)
- Show dissipating stage (downdrafts dominant)
- Indicate anvil formation
- Include lightning mechanism
- Show precipitation distribution
- Indicate severe weather indicators
- Reference supercell structure if applicable`,

  tornadoFormation: `
Tornado Formation Diagram requirements:
- Show mesocyclone development
- Include wind shear role
- Show wall cloud formation
- Indicate funnel descent
- Include vortex structure
- Show debris cloud
- Indicate Enhanced Fujita scale reference
- Reference supercell tornado genesis`,

  hurricaneStructure: `
Hurricane Structure requirements:
- Show eye and eyewall
- Include spiral rainbands
- Show wind distribution
- Indicate pressure profile
- Include warm core structure
- Show inflow and outflow patterns
- Indicate Saffir-Simpson scale
- Reference conditions for development`,

  // Atmospheric Circulation
  globalCirculation: `
Global Atmospheric Circulation requirements:
- Show Hadley, Ferrel, and Polar cells
- Include trade winds, westerlies, polar easterlies
- Show ITCZ (Intertropical Convergence Zone)
- Indicate subtropical highs
- Include jet streams
- Show pressure belts
- Indicate seasonal shifts
- Reference Coriolis effect`,

  jetStreams: `
Jet Stream Diagram requirements:
- Show polar jet location and path
- Include subtropical jet
- Show jet stream core
- Indicate wind speeds
- Include meanders and Rossby waves
- Show relationship to surface weather
- Indicate seasonal variations
- Reference jet streak dynamics`,

  monsoonCirculation: `
Monsoon Circulation requirements:
- Show seasonal reversal of winds
- Include summer monsoon (onshore)
- Show winter monsoon (offshore)
- Indicate ITCZ movement
- Include land-sea temperature contrast
- Show precipitation patterns
- Indicate affected regions
- Reference Asian monsoon system`,

  // Climate Patterns
  elNinoLaNina: `
ENSO Cycle Diagram requirements:
- Show normal Pacific conditions
- Include El Nino pattern
- Show La Nina pattern
- Indicate Walker circulation changes
- Include SST anomalies
- Show atmospheric teleconnections
- Indicate global weather impacts
- Reference SOI (Southern Oscillation Index)`,

  climateZones: `
Climate Classification requirements:
- Show major climate zones (Koppen system)
- Include tropical, dry, temperate, continental, polar
- Show subcategories
- Indicate temperature and precipitation criteria
- Include geographic distribution
- Show seasonal patterns
- Reference climate normals
- Include vegetation associations`,

  // Weather Forecasting
  surfaceWeatherMap: `
Surface Weather Map requirements:
- Show isobars and pressure centers
- Include frontal positions
- Show station model data
- Indicate precipitation areas
- Include temperature contours
- Show wind barbs
- Reference standard map symbols
- Include time stamp and valid period`,

  upperAirAnalysis: `
Upper Air Chart requirements:
- Show height contours (geopotential)
- Include isotherms
- Show wind barbs at level
- Indicate troughs and ridges
- Include jet stream position
- Show vorticity patterns
- Reference 500mb analysis
- Include thickness patterns`,

  weatherSatelliteImagery: `
Satellite Imagery Interpretation requirements:
- Show visible imagery characteristics
- Include infrared interpretation
- Show water vapor channel
- Indicate cloud top temperatures
- Include enhancement curves
- Show storm identification features
- Reference geostationary vs polar orbiting
- Include multi-spectral analysis`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Meteorology-specific few-shot examples
 */
export const METEOROLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing atmospheric layers and temperature profile',
    output: `flowchart LR
    subgraph profile["Temperature Profile"]
        subgraph exo["Exosphere"]
            e1["500+ km<br/>Gradual transition<br/>to space"]
        end

        subgraph thermo["Thermosphere"]
            t1["80-500 km<br/>Temperature increases<br/>with altitude<br/>(UV absorption)"]
        end

        subgraph meso["Mesosphere"]
            m1["50-80 km<br/>Temperature decreases<br/>Coldest layer<br/>(-90C at mesopause)"]
        end

        subgraph strato["Stratosphere"]
            s1["12-50 km<br/>Temperature increases<br/>Ozone layer<br/>(UV absorption)"]
        end

        subgraph tropo["Troposphere"]
            tr1["0-12 km<br/>Temperature decreases<br/>6.5C/km lapse rate<br/>Weather occurs here"]
        end
    end

    subgraph features["Key Features"]
        ozone["Ozone Layer<br/>(15-35 km)"]
        tropopause["Tropopause<br/>(~12 km, -56C)"]
        stratopause["Stratopause<br/>(~50 km, 0C)"]
        mesopause["Mesopause<br/>(~80 km, -90C)"]
    end

    subgraph content["Atmospheric Content"]
        c1["99% of mass<br/>in troposphere<br/>& stratosphere"]
        c2["Pressure drops<br/>exponentially<br/>with altitude"]
    end

    tr1 --- tropopause
    tropopause --- s1
    s1 --- ozone
    s1 --- stratopause
    stratopause --- m1
    m1 --- mesopause
    mesopause --- t1
    t1 --- e1

    classDef tropo fill:#87CEEB,stroke:#4682B4
    classDef strato fill:#FFD700,stroke:#FFA500
    classDef meso fill:#DDA0DD,stroke:#9370DB
    classDef thermo fill:#FF6347,stroke:#DC143C
    classDef exo fill:#2F4F4F,stroke:#000,color:#fff
    classDef feature fill:#f3f4f6,stroke:#6b7280

    class tr1 tropo
    class s1,ozone strato
    class m1 meso
    class t1 thermo
    class e1 exo
    class tropopause,stratopause,mesopause feature`,
  },
  {
    prompt: 'Create a diagram showing a mid-latitude cyclone structure',
    output: `flowchart TB
    subgraph cyclone["Mid-Latitude Cyclone (Northern Hemisphere)"]
        subgraph center["Low Pressure Center"]
            L["L<br/>Low<br/>~990 mb"]
        end

        subgraph sectors["Air Mass Sectors"]
            warm_sector["Warm Sector<br/>(mT air)<br/>Mild, humid"]
            cold_sector["Cold Sector<br/>(cP air)<br/>Cold, dry"]
            cool_sector["Cool Sector<br/>(modified cP)<br/>Cool, clearing"]
        end

        subgraph fronts["Frontal Boundaries"]
            cold_front["Cold Front<br/>▼▼▼<br/>Fast moving<br/>Steep slope"]
            warm_front["Warm Front<br/>●●●<br/>Slow moving<br/>Gentle slope"]
            occluded["Occluded Front<br/>▼●▼●<br/>(Mature stage)"]
        end
    end

    subgraph weather["Associated Weather"]
        subgraph ahead_warm["Ahead of Warm Front"]
            aw1["Ci → Cs → As → Ns"]
            aw2["Steady light rain<br/>Wide precipitation band"]
        end

        subgraph at_cold["At Cold Front"]
            ac1["Cb, TCu"]
            ac2["Heavy showers<br/>Thunderstorms<br/>Narrow band"]
        end

        subgraph behind_cold["Behind Cold Front"]
            bc1["Cu, clearing"]
            bc2["Cooler, drier<br/>Pressure rising"]
        end
    end

    subgraph movement["Typical Movement"]
        mov["West → East<br/>20-30 mph<br/>Steered by<br/>upper-level flow"]
    end

    L --> warm_sector
    L --> cold_sector
    warm_sector --> cold_front
    warm_sector --> warm_front
    cold_front --> cool_sector
    warm_front --> ahead_warm
    cold_front --> at_cold
    cool_sector --> behind_cold

    classDef low fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef warm fill:#ef4444,stroke:#dc2626,color:#fff
    classDef cold fill:#06b6d4,stroke:#0891b2,color:#fff
    classDef front fill:#f3e8ff,stroke:#9333ea
    classDef weather fill:#fef3c7,stroke:#d97706

    class L low
    class warm_sector,warm_front warm
    class cold_sector,cold_front,cool_sector cold
    class occluded front
    class aw1,aw2,ac1,ac2,bc1,bc2 weather`,
  },
  {
    prompt: 'Create a diagram showing the global atmospheric circulation',
    output: `flowchart TB
    subgraph circulation["Global Atmospheric Circulation"]
        subgraph polar["Polar Cell (60-90)"]
            polar_high["Polar High<br/>(Surface)"]
            polar_low["Subpolar Low<br/>(60)"]
            polar_east["Polar Easterlies"]
        end

        subgraph ferrel["Ferrel Cell (30-60)"]
            ferrel_desc["Indirect cell<br/>Driven by<br/>adjacent cells"]
            westerlies["Westerlies<br/>(Prevailing winds)"]
        end

        subgraph hadley["Hadley Cell (0-30)"]
            itcz["ITCZ<br/>Rising air<br/>Low pressure"]
            sth["Subtropical High<br/>(30, Horse latitudes)<br/>Descending air"]
            trades["Trade Winds<br/>(NE in NH, SE in SH)"]
        end
    end

    subgraph upper["Upper Atmosphere"]
        polar_jet["Polar Jet Stream<br/>(~60, 10km)"]
        subtropical_jet["Subtropical Jet<br/>(~30, 12km)"]
    end

    subgraph surface["Surface Pressure Belts"]
        eq_low["Equatorial Low<br/>(Doldrums)"]
        st_high["Subtropical Highs<br/>(Desert belt)"]
        sp_low["Subpolar Lows<br/>(Storm track)"]
        p_high["Polar Highs"]
    end

    itcz -->|"Rising"| sth
    sth -->|"Surface flow"| trades
    trades -->|"Converge"| itcz
    sth --> westerlies
    westerlies --> polar_low
    polar_low -->|"Rising"| polar_jet
    polar_high -->|"Surface"| polar_east
    polar_east --> polar_low

    eq_low --> itcz
    st_high --> sth
    sp_low --> polar_low
    p_high --> polar_high

    classDef hadley fill:#ef4444,stroke:#dc2626,color:#fff
    classDef ferrel fill:#22c55e,stroke:#16a34a,color:#fff
    classDef polar fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef jet fill:#fbbf24,stroke:#d97706
    classDef pressure fill:#f3f4f6,stroke:#6b7280

    class itcz,sth,trades hadley
    class ferrel_desc,westerlies ferrel
    class polar_high,polar_low,polar_east polar
    class polar_jet,subtropical_jet jet
    class eq_low,st_high,sp_low,p_high pressure`,
  },
  {
    prompt: 'Create a diagram showing El Nino vs La Nina conditions',
    output: `flowchart TB
    subgraph normal["Normal Conditions"]
        subgraph norm_atm["Atmosphere"]
            norm_walker["Walker Circulation<br/>Strong easterly trades"]
        end
        subgraph norm_ocean["Pacific Ocean"]
            norm_west["Western Pacific<br/>Warm pool<br/>(~30C)"]
            norm_east["Eastern Pacific<br/>Cool upwelling<br/>(~20C)"]
            norm_thermo["Thermocline<br/>Tilted (deep W, shallow E)"]
        end
        norm_rain["Heavy rainfall<br/>Indonesia/Australia"]
        norm_dry["Dry conditions<br/>South America coast"]
    end

    subgraph elnino["El Nino Conditions"]
        subgraph en_atm["Atmosphere"]
            en_walker["Weakened Walker<br/>Weak/reversed trades"]
        end
        subgraph en_ocean["Pacific Ocean"]
            en_west["Western Pacific<br/>Normal temps"]
            en_east["Eastern Pacific<br/>Warm anomaly<br/>(+2-4C)"]
            en_thermo["Thermocline<br/>Flattened"]
        end
        en_rain["Drought<br/>Indonesia/Australia"]
        en_flood["Heavy rainfall<br/>South America"]
    end

    subgraph lanina["La Nina Conditions"]
        subgraph ln_atm["Atmosphere"]
            ln_walker["Strong Walker<br/>Enhanced trades"]
        end
        subgraph ln_ocean["Pacific Ocean"]
            ln_west["Western Pacific<br/>Very warm"]
            ln_east["Eastern Pacific<br/>Cold anomaly<br/>(-2-4C)"]
            ln_thermo["Thermocline<br/>Strongly tilted"]
        end
        ln_rain["Enhanced rainfall<br/>Indonesia/Australia"]
        ln_dry["Very dry<br/>South America"]
    end

    subgraph indicators["ENSO Indicators"]
        soi["SOI: Southern<br/>Oscillation Index"]
        sst["SST: Sea Surface<br/>Temperature anomaly"]
        oni["ONI: Oceanic<br/>Nino Index"]
    end

    normal -->|"Warming event"| elnino
    normal -->|"Cooling event"| lanina
    elnino -->|"Return to normal"| normal
    lanina -->|"Return to normal"| normal

    classDef normal fill:#22c55e,stroke:#16a34a
    classDef elnino fill:#ef4444,stroke:#dc2626,color:#fff
    classDef lanina fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef indicator fill:#f3e8ff,stroke:#9333ea

    class norm_walker,norm_west,norm_east,norm_thermo,norm_rain,norm_dry normal
    class en_walker,en_west,en_east,en_thermo,en_rain,en_flood elnino
    class ln_walker,ln_west,ln_east,ln_thermo,ln_rain,ln_dry lanina
    class soi,sst,oni indicator`,
  },
  {
    prompt: 'Create a diagram showing thunderstorm development stages',
    output: `flowchart LR
    subgraph stages["Thunderstorm Life Cycle"]
        subgraph cumulus["Cumulus Stage<br/>(10-15 min)"]
            c1["Strong updrafts<br/>(up to 50 mph)"]
            c2["No downdrafts"]
            c3["Developing Cu<br/>becoming TCu"]
            c4["No precipitation<br/>reaching surface"]
        end

        subgraph mature["Mature Stage<br/>(15-30 min)"]
            m1["Strong updrafts<br/>AND downdrafts"]
            m2["Heaviest precipitation"]
            m3["Cumulonimbus<br/>with anvil"]
            m4["Lightning, hail<br/>Strong winds<br/>Possible tornado"]
        end

        subgraph dissipating["Dissipating Stage<br/>(30+ min)"]
            d1["Downdrafts dominant"]
            d2["Updrafts weaken"]
            d3["Light rain<br/>decreasing"]
            d4["Cloud spreads out<br/>and dissipates"]
        end
    end

    subgraph structure["Mature Storm Structure"]
        anvil["Anvil (ice crystals)<br/>Spreads downwind"]
        overshooting["Overshooting top<br/>(strong updraft)"]
        main_up["Main updraft<br/>(warm, moist)"]
        main_down["Main downdraft<br/>(cool, with precip)"]
        gust_front["Gust front<br/>(outflow boundary)"]
        precip["Precipitation<br/>shaft"]
    end

    subgraph conditions["Required Conditions"]
        cond1["Moisture: Low-level<br/>humidity"]
        cond2["Lift: Trigger for<br/>convection"]
        cond3["Instability: CAPE<br/>(Convective Available<br/>Potential Energy)"]
    end

    cumulus -->|"Reaches<br/>freezing level"| mature
    mature -->|"Updraft<br/>cut off"| dissipating

    cond1 --> cumulus
    cond2 --> cumulus
    cond3 --> cumulus

    classDef cumulus fill:#87CEEB,stroke:#4682B4
    classDef mature fill:#4B0082,stroke:#2E0854,color:#fff
    classDef dissipate fill:#D3D3D3,stroke:#A9A9A9
    classDef structure fill:#fef3c7,stroke:#d97706
    classDef condition fill:#dcfce7,stroke:#16a34a

    class c1,c2,c3,c4 cumulus
    class m1,m2,m3,m4 mature
    class d1,d2,d3,d4 dissipate
    class anvil,overshooting,main_up,main_down,gust_front,precip structure
    class cond1,cond2,cond3 condition`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const meteorologyPrompts = {
  METEOROLOGY_DOMAIN_PROMPT,
  METEOROLOGY_PROMPTS,
  METEOROLOGY_FEW_SHOT_EXAMPLES,
};
export default meteorologyPrompts;
