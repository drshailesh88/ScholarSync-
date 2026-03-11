# presentation — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Content Block Types (20+)
#### Content Block Editor -- Inline Editing UI
- [ ] **9.67** Value field (`content-block-editor.tsx:563`, `:565`)
- [ ] **9.68** CI field with placeholder "95% CI" when active (`content-block-editor.tsx:570`, `:574`, `:576`)
- [ ] **9.69** p-value field with placeholder "p-value" when active (`content-block-editor.tsx:580`, `:582`)
- [ ] **9.70** Interpretation text shown when present (`content-block-editor.tsx:587`)
- [ ] **9.71** Header shows "Bibliography ({style.toUpperCase()})" (`content-block-editor.tsx:597`, `:599`)
- [ ] **9.72** Entry list renders all entries (`content-block-editor.tsx:603`)
- [ ] **9.73** "Timeline" header with Clock icon (`content-block-editor.tsx:617`, `:618`)
- [ ] **9.74** Entry label editable via EditableText (`content-block-editor.tsx:621`, `:635`, `:637`)
- [ ] **9.75** Date field with placeholder "Date" (`content-block-editor.tsx:646`, `:652`)
- [ ] **9.76** Description field editable when present (`content-block-editor.tsx:655`, `:658`)
- [ ] **9.77** Date and description shown in read mode (`content-block-editor.tsx:669`, `:670`)
- [ ] **9.79** "+ Add milestone" button to append entry (`content-block-editor.tsx:677`, `:686`)
- [ ] **9.80** Timeline entry status colors: completed=#22C55E, in_progress=theme.primaryColor, default=#94A3B8 (`content-block-editor.tsx:627-628`)
- [ ] **9.81** Style picker with solid/dashed/gradient options (`content-block-editor.tsx:712`, `:714`, `:717`, `:720`)
- [ ] **9.82** Fallback displays "Unknown block type:" label (`content-block-editor.tsx:732`)
#### Chart Block Rendering Details
- [ ] **9.83** Bar chart: BarChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar per dataset (`chart-block.tsx:201-208`)
- [ ] **9.84** Line chart: LineChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line per dataset (`chart-block.tsx:215-222`)
- [ ] **9.85** Pie chart: PieChart with Pie and Cell per data point, Tooltip (`chart-block.tsx:233-248`)
- [ ] **9.86** Donut chart: PieChart with inner radius Pie, Cell per point, Tooltip (`chart-block.tsx:260-276`)
- [ ] **9.87** Scatter chart: ScatterChart with CartesianGrid, XAxis, YAxis, Tooltip, Scatter per dataset (`chart-block.tsx:286-292`)
- [ ] **9.88** Area chart: AreaChart with CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area per dataset (`chart-block.tsx:299-306`)
- [ ] **9.89** Radar chart: RadarChart with PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar per dataset, Legend (`chart-block.tsx:313-320`)
- [ ] **9.90** Stacked bar chart: BarChart with stacked Bar components and Legend (`chart-block.tsx:327-334`)
- [ ] **9.91** Funnel chart: FunnelChart with Funnel, Tooltip, LabelList (`chart-block.tsx:346-349`)
- [ ] **9.92** Waterfall chart: BarChart with per-bar Cell colors (blue=total, green=increase, red=decrease) (`chart-block.tsx:359-369`)
- [ ] **9.93** Treemap: Treemap with custom TreemapContent, Tooltip (`chart-block.tsx:384-391`)
- [ ] **9.94** Gauge: SVG arc with color thresholds (red <33%, amber <66%, green >=66%) (`chart-block.tsx:410`, `:418`)
- [ ] **9.95** Forest plot: table layout with Study/Effect Size/ES columns, per-study rows, Overall summary diamond (`chart-block.tsx:473-525`)
- [ ] **9.97** "No chart data" empty state text (`chart-block.tsx:68`)
- [ ] **9.98** Title shown conditionally above chart (`chart-block.tsx:89`)
- [ ] **9.99** ResponsiveContainer wrapping (except forest_plot and gauge) (`chart-block.tsx:98`, `:101`)
- [ ] **9.100** xAxisLabel and yAxisLabel conditionally displayed (`chart-block.tsx:203-204`)
- [ ] **9.101** Legend shown conditionally when `showLegend !== false` (`chart-block.tsx:206`, `:220`, `:304`, `:320`, `:332`)
#### Infographic Block Rendering Details
- [ ] **9.103** Process flow: circular steps with connector lines/arrows between items (`infographic-block.tsx:131-166`)
- [ ] **9.104** Cycle: circular layout with items positioned around circumference (`infographic-block.tsx:177`)
