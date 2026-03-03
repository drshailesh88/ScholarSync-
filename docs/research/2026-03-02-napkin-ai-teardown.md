# Napkin.ai Comprehensive UX Teardown & Competitive Analysis

**Date:** 2026-03-02
**Purpose:** Research-only analysis to drive implementation strategy
**Status:** RESEARCH DOCUMENT -- No code changes

---

## 1. Core Product Flow

### First Landing Experience

- Clean, minimal landing page positioned as "the visual AI for business storytelling"
- Sign-in via Google OAuth or email/password (one-click Google is the primary path)
- Desktop-only for creation/editing; mobile apps (iOS launched March 2025, Android available) support viewing and basic edits
- After sign-in, a brief onboarding questionnaire about work style/preferences (not lengthy)
- Users are inside the product in under 2 minutes
- First action: "Create my first Napkin" button leads to a blank document

### Text Input to Visual Output Flow (Step-by-Step)

1. **Content Input:** User types text directly, pastes existing content (blog post, notes, bullet points), OR uses a built-in AI text generator by providing a brief prompt
2. **Trigger Generation:** Hover over any text block -- a blue "Generate Visual" lightning bolt icon appears on the left margin. Click it.
3. **AI Processing:** The multi-agent system processes the text (~5 seconds according to VentureBeat)
4. **Visual Options Palette:** A scrollable palette of visual options appears. The system generates multiple visual options across different visual categories (flowcharts, mind maps, timelines, etc.). The exact number varies by content but appears to be 6-10+ options based on reviews.
5. **Style Selection:** After picking a visual type, users can choose from different style treatments (color palettes, icon styles)
6. **Insertion:** Selected visual is inserted inline with the document text
7. **Post-Generation Editing:** Every element remains fully editable

### Generation Speed

- ~5 seconds for initial visual generation (per VentureBeat/CEO quote)
- Reviews consistently describe it as "seconds" not "minutes"
- Style switching is near-instant since the content structure is already parsed

### Post-Generation Editing Experience

- Fully editable: drag-and-drop nodes, resize elements, tweak connectors, move icons
- Four-option contextual menu below each visual:
  - **Spark Search:** Find and swap icons/shapes from the icon database
  - **Labeling Tool:** Add additional text labels
  - **Sketch Option:** Freehand digital pen markup
  - **Image Option:** Upload or paste custom images
- Double-click any element to access color/style controls
- Font type, text style, alignment, and color are all modifiable
- Connectors can be modified -- the AI auto-routes them but users can override

---

## 2. Visual Types / Diagram Categories

### Confirmed Visual Categories (30+ claimed)

| Category | Description | Typical Use Case |
|----------|-------------|-----------------|
| **Flowcharts** | Process flow with decision nodes and directional arrows | Step-by-step workflows, decision trees, algorithms |
| **Mind Maps** | Central node with branching subtopics | Brainstorming, concept exploration, topic clustering |
| **Timelines** | Linear chronological progression with milestone markers | Project plans, historical events, roadmaps |
| **Comparison Charts** | Side-by-side visual comparisons | Feature comparisons, pros/cons, competitor analysis |
| **Process Diagrams** | Sequential step visualization | Standard operating procedures, onboarding flows |
| **Hierarchy / Org Charts** | Tree-structured top-down relationships | Organizational structures, taxonomies, classification |
| **Tables** | Structured grid data presentation | Data summaries, feature matrices, specifications |
| **Cause & Effect** | Fishbone/Ishikawa-style diagrams | Root cause analysis, problem decomposition |
| **Frameworks** | Business framework visualizations (SWOT, Porter's, etc.) | Strategy, analysis, business planning |
| **Infographics** | Mixed-media information displays with icons and stats | Marketing content, reports, social media posts |
| **Data Charts** | Bar, pie, line, and other statistical charts | Data visualization, metrics dashboards |
| **Scenes/Illustrations** | Composed visual scenes with icons and imagery | Storytelling, concept illustration |
| **Venn Diagrams** | Overlapping circle relationships | Commonalities, set relationships |
| **Gantt Charts** | Timeline-based project scheduling | Project management, sprint planning |
| **UML Diagrams** | Unified Modeling Language diagrams | Software architecture, system design |
| **ERD (Entity Relationship)** | Database entity relationships | Data modeling |
| **DFD (Data Flow Diagrams)** | Data flow visualization | System analysis |
| **Wireframes** | UI layout sketches | UX/UI design mockups |
| **Blueprints** | Technical layout diagrams | Architecture, planning |

### Template vs AI-Generated

- Everything is AI-generated from text content -- there is NO template gallery to browse
- The system uses NLP to determine the best visual type for the given text
- "Custom Generation" feature (launched June 2025) allows users to specify the desired visual type (e.g., "flowchart" or "mind map") rather than relying solely on AI inference
- Users can hint at desired types by prefixing text with "Chart:", "Graph showing...", etc.

### Icon Library

- Extensive built-in icon database (not publicly documented which icon set)
- Searchable via "Spark Search" feature
- Two tiers: "Standard icons" (free) and "Bold icons" (Plus plan and above)
- If no matching icon exists in the database, the system can generate one on the fly
- Icons are vector-based and individually editable (resize, recolor, swap)

---

## 3. Customization & Editing UX

### What Users Can Customize After Generation

| Element | Customization Options |
|---------|----------------------|
| **Colors** | Text color, border color, background color via double-click menu. Hex code input or palette selection |
| **Fonts** | Multiple font families (M PLUS Rounded 1c, Noto Serif, Times New Roman, etc.). Font weight control. Custom font upload on Pro plan |
| **Icons** | Swap any icon via Spark Search. Resize individually. Recolor to match scheme |
| **Layout** | Drag-and-drop repositioning of nodes. Resize elements via corner handles |
| **Text** | Inline text editing on any element. Font size, weight, alignment controls |
| **Connectors** | Modify connection lines and arrows. Change line styles |
| **Shapes** | Add shapes via Spark Search (circle, triangle, etc.) |
| **Background/Canvas** | Toggle between ruled notebook and clean blank canvas |

### Editing Interface Pattern

- **NOT a property panel sidebar** -- uses inline/contextual editing
- Double-click an element to access its color/style menu (inline popup)
- Click an element to show resize handles (squares at corners/edges)
- Hover over elements to reveal contextual action buttons
- The approach is closer to Notion's inline block editing than Figma's panel-based editing
- No layers panel, no complex toolbars

### Style / Theme System

- **Built-in Styles:** Pre-configured color + font combinations available to all users
- **Custom Brands (Pro):** Upload logo/brand assets and Napkin auto-extracts colors. Set brand colors + fonts. Apply to new visuals or update existing ones. Unlimited custom brands on Pro plan; 3 on Plus
- **Style Switching:** Can instantly switch between styles on existing visuals without regenerating
- **Canvas Settings:** Frame and canvas background controls (ruled vs blank)

### Connectors / Arrows

- Auto-routed by the AI based on content relationships
- Users can modify connections manually
- Dynamic connectors that "can connect anything"
- The AI determines which elements belong together, but this is editable

### Visual Type Switching

- Users CAN switch between visual types for the same content
- Can regenerate from the same text with different visual type hints
- Style switching (colors/fonts) does NOT require regeneration

---

## 4. AI Interaction Pattern

### Input Method

- **Primary:** Paste existing text (blog posts, notes, bullet points, structured content)
- **Secondary:** Type text directly in the document editor
- **Tertiary:** Use built-in AI to generate text from a brief prompt
- **NOT a prompt-based tool** -- this is a key differentiator. Users do not write "create a flowchart of X." They write/paste their actual content, and the AI determines what visuals fit.

### Multi-Agent Architecture (per VentureBeat)

Napkin uses a "design agency" approach with specialized AI agents orchestrated by an LLM (primarily OpenAI GPT-4o mini):

1. **Text Agent:** Analyzes and suggests text for the design
2. **Layout Agent:** Examines the text and selects the optimal design layout
3. **Icon/Illustration Agent:** Searches the icon database for matches; generates custom icons if none exist
4. **Style Agent:** Applies customization (brand colors, fonts, visual style)

This is NOT a diffusion model approach (like DALL-E/Midjourney). Visuals are composed from structured elements, not generated as raster images.

### Iteration & Refinement

- Users can regenerate visuals from the same text to get different options
- Custom Generation allows specifying the desired visual type on subsequent attempts
- Can modify individual elements post-generation without full regeneration
- No conversational "chat with the AI" refinement (e.g., no "make this more detailed" prompt box)
- Refinement is manual: edit text, regenerate, or manually adjust elements

### What It Cannot Do

- No iterative conversational prompting ("make the arrows blue", "add a third column")
- No "refine this visual" AI command -- edits are manual
- Cannot generate from truly unstructured/abstract text -- needs some structure (headings, bullets, clear concepts)

---

## 5. Export & Integration

### Export Formats

| Format | Availability | Notes |
|--------|-------------|-------|
| **PNG** | All plans (free included) | Higher quality than JPEG. Unlimited exports on free plan |
| **PDF** | All plans (free included) | Single continuous page, A4, or 16:9 presentation format |
| **SVG** | Plus plan ($9/mo) and above | Vector format for scalable graphics |
| **PPT** | Plus plan ($9/mo) and above | Downloads as .ppt file; static images inside slides (not editable PowerPoint shapes) |

### Export Workflow

- Hover over or click a visual to select its frame
- Click export button in top-right corner
- Choose format (PNG/SVG/PPT/PDF)
- Color customization preview available before export
- Entire document can be exported as PDF (continuous, A4, or 16:9)

### Export Limitations

- Free plan exports include a visible Napkin AI watermark
- PPT exports are static images, NOT editable PowerPoint native shapes
- Copied content becomes a single image (text is not preserved as editable text)
- No direct "embed code" or iframe option found
- No API for programmatic export

### Integrations

| Platform | Integration Type | Status |
|----------|-----------------|--------|
| **PowerPoint** | Export as PPT file, import into PPT | Manual file transfer |
| **Google Slides** | Export PPT/PNG, import into Slides | Manual file transfer |
| **Canva** | Export PNG/SVG, import into Canva | Manual file transfer |
| **Keynote** | Export PPT/PNG, import into Keynote | Manual file transfer |
| **Notion** | Import notes from Notion; export visuals manually | Limited; not real-time sync |
| **Google Docs** | Import text content | Import only |
| **WordPress** | Export PNG/SVG, upload to WordPress | Manual file transfer |
| **Medium/Substack** | Export PNG, embed in posts | Manual file transfer |
| **LinkedIn/X/Instagram** | Export PNG for social posting | Manual file transfer |

### Collaboration Features

- Real-time collaborative editing (multiple users editing simultaneously)
- Teamspace for team member management
- Document sharing with access controls
- Document commenting
- These are internal to Napkin -- no external collaboration integrations

### What is Missing

- No public API
- No webhook/automation support
- No Zapier/Make integration
- No embed code for websites
- No real-time sync with external tools
- No Figma/Sketch plugin

---

## 6. Pricing & Limitations

### Pricing Tiers (as of 2026)

| Feature | Free | Plus ($9/mo) | Pro ($22/mo) | Enterprise |
|---------|------|-------------|-------------|-----------|
| AI Credits | 500/week | 10,000/month | 30,000/month | Custom |
| Visual Editing | Unlimited | Unlimited | Unlimited | Unlimited |
| File Import (PPT/DOC/PDF/HTML/MD) | Unlimited | Unlimited | Unlimited | Unlimited |
| PNG Export | Unlimited | Unlimited | Unlimited | Unlimited |
| PDF Export | Unlimited | Unlimited | Unlimited | Unlimited |
| SVG Export | No | Yes | Yes | Yes |
| PPT Export | No | Yes | Yes | Yes |
| Napkin Branding | Yes (watermark) | Removed | Removed | Removed |
| Icon Set | Standard | Bold | Bold | Bold |
| Custom Brands | No | 3 | Unlimited | Unlimited |
| Custom Font Upload | No | No | Yes | Yes |
| Exclusive Designs | No | No | Yes | Yes |
| Team Management | No | Yes | Yes | Yes |
| Credit Top-ups | No | No | Optional | Custom |

- **Annual billing:** 25% discount
- **Credit cost:** ~1 credit per word selected for generation
- **Free plan reality:** ~10-15 visuals per week (500 credits / ~35-50 words per generation)

### Key Limitations & User Complaints

1. **Structured input required:** Struggles with abstract, unstructured, or loosely organized content. Needs headings, bullet points, or clear conceptual structure
2. **Repetitive layouts:** Visual outputs can feel formulaic -- same-looking layouts across different topics
3. **Limited customization depth:** Not as granular as Canva/Figma for precise design control
4. **No brand palette persistence (free):** Cannot save brand color palettes on the free plan; must re-pick colors each time
5. **Confusing credit system:** Users find the credit/word calculation opaque
6. **No API:** Cannot integrate programmatically into workflows
7. **No native integrations:** Connecting to Notion, WordPress, etc. requires manual file handling
8. **Static PPT exports:** PowerPoint exports are images, not editable shapes -- defeats the purpose for many users
9. **Content copied as image:** When copying visuals, text becomes part of the image rather than remaining editable text
10. **Desktop-only for full editing:** Mobile apps are view-only with basic editing
11. **Limited data visualization:** Not suitable for complex, data-heavy charts (not a Tableau replacement)
12. **Visual quality:** Not quite stock-image quality for platforms like Pinterest
13. **No conversational refinement:** Cannot iterate with the AI via follow-up prompts

---

## 7. UX Patterns We Should Study

### What Makes Napkin Feel Magical

1. **Zero-prompt generation:** The biggest UX win. Users do NOT write prompts -- they write their actual content. The AI figures out what visuals fit. This removes the "prompt engineering" friction entirely.

2. **Inline generation trigger:** The blue lightning bolt appears contextually when hovering over text blocks. It is always one click away but never intrusive. This is superior to a separate "generate" workflow.

3. **Multiple options in a palette:** Instead of generating one visual and hoping it is right, users see a scrollable palette of options across different visual types. This gives agency and reduces iteration loops.

4. **Sub-5-second generation:** Fast enough to feel interactive rather than asynchronous. Users stay in flow.

5. **Everything is editable:** Unlike DALL-E/Midjourney raster outputs, every element (text, icons, shapes, connectors) is individually editable. This makes the AI output a starting point, not a final product.

6. **Text-first document model:** The product is a document editor that happens to generate visuals, not a canvas tool. This familiar paradigm (similar to Notion/Google Docs) lowers the learning curve dramatically.

7. **Style consistency via Custom Brands:** Upload a logo, auto-extract colors, apply to all visuals. This solves the "brand consistency" problem elegantly.

8. **60+ language support:** Visuals can be generated from text in over 60 languages.

### Smartest UX Decisions

1. **Document-first, not canvas-first:** By building around a text editor rather than a blank canvas, Napkin avoided the intimidation factor of tools like Figma/Miro. Users always start with content they already have.

2. **No prompt engineering required:** The biggest barrier to AI tools is knowing what to ask. Napkin sidesteps this by working from existing content.

3. **Generous free tier:** 500 credits/week is genuinely usable. This drives word-of-mouth adoption (5M+ users).

4. **Multi-agent architecture:** Separating text analysis, layout, iconography, and styling into separate agents allows each to be optimized independently and produces more coherent results than a single model.

5. **Not using diffusion models:** By composing visuals from structured elements rather than generating raster images, every element remains editable. This is a fundamental architectural decision that enables the entire editing experience.

### Weakest Parts (Opportunities for Us)

1. **No conversational refinement:** Users cannot say "make this more detailed" or "change to a timeline." All refinement is manual. A chat-based refinement loop would be a significant differentiator.

2. **Repetitive visual outputs:** Heavy users report visual fatigue -- layouts feel samey. Better variation algorithms or style randomization could help.

3. **Static exports:** PPT exports as images rather than native shapes is a major pain point. True editable PPT/Google Slides export would be a massive win.

4. **No API/integrations:** Zero programmatic access. For a product targeting business users, this is a surprising gap.

5. **No data-driven charts:** Cannot plug in actual datasets to generate charts. Only text-derived visuals. Real data visualization would expand the use case significantly.

6. **No embed/iframe:** Cannot embed live, interactive visuals in websites or docs. An embeddable widget would unlock new use cases.

7. **Credit system confusion:** The per-word credit model is unintuitive. A simpler "X generations per month" model would be clearer.

8. **No version history:** No apparent way to go back to a previous version of a visual.

9. **No animation/interactivity:** All visuals are static. Animated transitions, clickable elements, or interactive infographics would differentiate.

10. **Limited collaboration:** Real-time editing exists, but no commenting on specific visual elements, no approval workflows, no annotation tools.

---

## 8. Feature Comparison Matrix: Napkin.ai vs ScholarSync Target

| Feature | Napkin.ai | ScholarSync Target | Priority | Notes |
|---------|-----------|-------------------|----------|-------|
| **Text-to-visual generation** | Yes (core feature) | Must Build | P0 | Core value proposition to match |
| **Multi-visual palette selection** | Yes (6-10+ options) | Must Build | P0 | Critical for user agency |
| **Sub-5s generation time** | Yes | Must Match | P0 | Speed is key to the magic |
| **Inline generation trigger** | Yes (hover lightning bolt) | Must Build | P0 | Contextual trigger UX |
| **Flowcharts** | Yes | Must Build | P0 | Most common visual type |
| **Mind maps** | Yes | Must Build | P0 | Core for research/brainstorming |
| **Timelines** | Yes | Must Build | P0 | Common for academic/business |
| **Comparison charts** | Yes | Must Build | P0 | Side-by-side analysis |
| **Process diagrams** | Yes | Must Build | P0 | Step-by-step workflows |
| **Hierarchy/org charts** | Yes | Must Build | P1 | Less common but important |
| **Tables** | Yes | Must Build | P0 | Basic data organization |
| **Data charts (bar/pie/line)** | Basic (text-derived) | Build Better | P1 | Opportunity: real data input |
| **Infographics** | Yes | Must Build | P1 | Marketing/social content |
| **Venn diagrams** | Yes | Should Build | P2 | Niche but useful |
| **Gantt charts** | Yes | Should Build | P2 | Project management |
| **Post-generation editing** | Full (drag/drop/resize) | Must Build | P0 | Core editing experience |
| **Icon library + search** | Yes (extensive) | Must Build | P0 | Essential for visual quality |
| **Custom color/hex input** | Yes | Must Build | P0 | Basic customization |
| **Custom brand/style system** | Yes (Pro) | Must Build | P1 | Brand consistency |
| **Custom font upload** | Yes (Pro only) | Should Build | P2 | Nice-to-have |
| **Auto-routed connectors** | Yes | Must Build | P0 | Smart connections |
| **Style switching without regen** | Yes | Must Build | P1 | UX quality feature |
| **PNG export** | Yes (free) | Must Build | P0 | Basic export |
| **PDF export** | Yes (free) | Must Build | P0 | Basic export |
| **SVG export** | Yes (paid) | Must Build | P1 | Scalable graphics |
| **PPT export (static)** | Yes (paid, static images) | Build Better | P1 | Opportunity: editable shapes |
| **PPT export (native shapes)** | No | Differentiator | P1 | Major competitive advantage |
| **Real-time collaboration** | Yes | Must Build | P1 | Already have Liveblocks |
| **Document commenting** | Yes | Must Build | P1 | Already building |
| **60+ language support** | Yes | Should Match | P2 | Important for global users |
| **File import (DOC/PDF/PPT)** | Yes | Should Build | P2 | Content ingestion |
| **Mobile app** | Yes (view + basic edit) | Defer | P3 | Desktop-first is fine |
| **Custom Generation (type spec)** | Yes | Must Build | P0 | User control over output |
| **Freehand sketch to visual** | Beta | Could Build | P3 | Novel but not essential |
| **Conversational AI refinement** | No | Differentiator | P1 | "Make this more detailed" |
| **Data-driven charts** | No | Differentiator | P1 | Plug in real datasets |
| **Editable embed/iframe** | No | Differentiator | P2 | Live embeds in docs/web |
| **API access** | No | Differentiator | P2 | Programmatic generation |
| **Animation/interactivity** | No | Differentiator | P2 | Animated visuals |
| **Version history** | No | Differentiator | P1 | Already building this |
| **Academic visual types** | No (general business) | Differentiator | P0 | Research figures, citation graphs, methodology diagrams |
| **LaTeX/math in visuals** | No | Differentiator | P0 | Critical for academic users |
| **Reference/citation visuals** | No | Differentiator | P0 | Literature review maps |
| **Integration with writing** | Standalone | Differentiator | P0 | Visuals generated from paper content |

### Key Differentiators for ScholarSync

1. **Academic-specific visual types:** Research methodology diagrams, citation network graphs, literature review concept maps, experimental design flowcharts, statistical result visualizations, PRISMA flow diagrams. Napkin serves general business users -- we serve researchers and academics.

2. **LaTeX/math rendering in visuals:** Napkin cannot render mathematical equations inside generated visuals. For academic papers, this is non-negotiable.

3. **Conversational refinement:** "Add a feedback loop to step 3" or "Make this a comparison instead of a timeline" via natural language. Napkin requires manual editing.

4. **Native editable exports:** PPT/Google Slides exports as real shapes/text boxes, not static images. This alone could be a major selling point.

5. **Integration with the writing workflow:** Visuals generated from paper sections, automatically placed in context. Napkin is standalone; we are integrated into the writing tool.

6. **Data-driven visualization:** Feed in actual experimental data (CSV, table) and generate publication-quality charts. Napkin only works from text descriptions.

7. **Reference-aware visuals:** Generate citation network maps, co-author collaboration graphs, and literature landscape visualizations from the user's reference library.

---

## 9. Technical Architecture Notes (for Implementation Planning)

### Napkin's Approach

- **NOT diffusion/raster generation** -- composes visuals from structured vector elements
- **Multi-agent orchestration** via GPT-4o mini as the orchestrator LLM
- **4 specialized agents:** Text, Layout, Icon/Illustration, Style
- **Icon database** with on-the-fly icon generation fallback
- **Browser-based** rendering (no server-side image generation for the visuals themselves)
- **~5 second generation** time suggests lightweight inference, not heavy model calls

### Implications for Our Architecture

- We should similarly avoid diffusion models -- compose from structured SVG/vector elements
- Multi-agent pattern is proven and effective; consider similar decomposition
- Use our existing AI model routing: Claude Sonnet for content analysis, GPT-5 Nano for layout/structural decisions
- Our existing presentation engine infrastructure (components, rendering) can be adapted
- Consider rendering visuals as React components (SVG-based) for editability and export flexibility
- For academic visuals specifically, integrate KaTeX rendering into the visual element system

---

## Sources

- [Napkin AI Official Website](https://www.napkin.ai)
- [Napkin AI Pricing](https://www.napkin.ai/pricing/)
- [Napkin AI Help Center - Getting Started](https://help.napkin.ai/en/articles/9991710-getting-started-with-napkin-ai)
- [Napkin AI Help Center - Visual Customization](https://help.napkin.ai/en/articles/9992106-visuals-customization)
- [Napkin AI Help Center - Custom Brands](https://help.napkin.ai/en/articles/10696628-custom-styles)
- [Napkin AI Help Center - Custom Generation](https://help.napkin.ai/en/articles/11680919-custom-generation)
- [Napkin AI Help Center - Export](https://help.napkin.ai/en/articles/9992013-how-to-export-visuals-as-png-svg-ppt-or-pdf)
- [Napkin AI Help Center - Visual Type Guidance](https://help.napkin.ai/en/articles/10078876-how-can-i-guide-napkin-ai-to-generate-a-specific-visual-type)
- [VentureBeat - Napkin AI Multi-Agent Architecture](https://venturebeat.com/ai/napkin-vertical-ai-agents-design)
- [Concurate - Napkin AI Review](https://concurate.com/napkin-ai-review/)
- [TechPoint Africa - Napkin AI Review](https://techpoint.africa/guide/napkin-ai-review/)
- [Lead Advisors - Napkin AI Review 2025](https://leadadvisors.com/blog/napkin-ai-review/)
- [Max Productive - Napkin AI](https://max-productive.ai/ai-tools/napkin-ai/)
- [G2 - Napkin AI Reviews](https://www.g2.com/products/napkin-ai/reviews)
- [AVID Open Access - Generating Diagrams](https://avidopenaccess.org/resource/generating-diagrams-with-napkin-ai/)
- [Napkin AI Blog - PPT Export Launch](https://www.napkin.ai/blog/napkin-launches-ppt-export-files-import/)
- [Napkin AI Blog - Custom Generation Launch](https://www.napkin.ai/blog/napkin-launches-custom-generation/)
- [Napkin AI Blog - Custom Styles Launch](https://www.napkin.ai/blog/napkin-launches-custom-styles/)
- [Napkin AI Blog - Frame & Canvas Settings](https://www.napkin.ai/blog/napkin-launches-frame-and-canvas-settings/)
- [Toksta - Napkin Review (Reddit Sentiment)](https://www.toksta.com/products/napkin)
- [Unite AI - Napkin AI Review](https://www.unite.ai/napkin-ai-review/)
- [Raitly - Napkin AI Review 2026](https://raitly.com/tool/napkin-ai-1)
