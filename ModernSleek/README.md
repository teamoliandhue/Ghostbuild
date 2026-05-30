# ModernSleek Deck — Quick Start (for Claude)

Drop-in skill kit for building beautiful pitch decks in Figma for GhostBuild clients. This README is the 60-second orientation. The full rules are in [SKILL.md](SKILL.md); the design tokens (palette, type, spacing) are in [design_tokens.json](design_tokens.json); the pattern library (16 reusable slide layouts) is in [build/patterns.js](build/patterns.js); the helper utilities are in [build/helpers.js](build/helpers.js); reference screenshots of canonical frames live in [reference/Template/](reference/Template/).

This kit is invoked from **Stage 3 — Crafting the Pitch Deck** in the GhostBuild workflow.

## Folder map

```
ModernSleek/
├── CLAUDE.md             ← Workspace working rules. Read first.
├── SKILL.md              ← The master skill spec.
├── README.md             ← (this file) Quick start
├── design_tokens.json    ← Palette, typography, spacing
├── build/
│   ├── helpers.js        ← AF, T, FN, eyebrowPill, buildHeaderZone, pageNumber, blackBanner
│   ├── patterns.js       ← 16 slide pattern functions, fully documented
│   └── starter_deck.js   ← Reference example of a 10-slide build script
└── reference/
    └── Template/
        └── Frame*.png    ← Canonical pattern frames
```

## How to use

### 1. Read the kit (always, before any build)

In order:
1. `CLAUDE.md` — workspace rules (Figma MCP, brand primary source)
2. `SKILL.md` — rules and how-to
3. `design_tokens.json` — palette, typography
4. `build/patterns.js` — pattern function signatures (skim JSDoc for each)
5. `build/helpers.js` — helper signatures
6. `reference/Template/Frame*.png` — open as needed when composing

### 2. Pull the brand primary from the client

Before any Figma write, open `clients/[slug]/brand.md` and copy the **confirmed website colour** hex. That hex is `BRAND.primary` for this build. There is no global default — never guess one.

### 3. Confirm scope with the user (always — don't skip)

- What **kind** of deck — pitch (Stage 3 default), sales, SOW, board?
- Which **audience** — founder, CMO, ops lead, investor?
- Which **patterns** from the library, in what order? Or follow one of the recipes in `SKILL.md`.
- Which **Figma file** and **page** should it land on? (Use Official Figma MCP only.)

### 4. Draft copy first

Before writing a `use_figma` script, hand the user a plain-text outline of the **eyebrow / headline / subtitle / body bullets** for every slide. Get approval. Then build the design.

### 5. Compose ONE `use_figma` script

The script should:
1. `await loadDeckFonts()` (helper)
2. `const C = buildColors(BRAND_HEX)` — pass the client brand hex from `brand.md`
3. Inline only the helpers + pattern functions you'll use (keep the script lean)
4. For each slide, create the outer slide frame and call the pattern function

### 6. Verify, then hand off

After build:
1. Take a single screenshot of the section/page (faster than per-slide)
2. Read the screenshot. Look for: headline width collapse, card overflow, missing logos, missing page numbers, page-num collisions
3. Fix anything broken
4. Reply with a 2–3 line summary, slide-by-slide list, and a Figma deep-link

## Boilerplate `use_figma` skeleton

```javascript
// 1. Load fonts
const desired = [
  {family:'Inter', style:'Regular'}, {family:'Inter', style:'Medium'},
  {family:'Inter', style:'Semi Bold'}, {family:'Inter', style:'Bold'},
  {family:'Source Serif 4', style:'Regular'},
  {family:'Radio Canada Big', style:'Medium'},
];
for (const f of desired) { try { await figma.loadFontAsync(f); } catch(e){} }

// 2. Inline helpers (FN, AF, T, hex, buildColors, eyebrowPill, buildHeaderZone, pageNumber, blackBanner)
//    [PASTE FROM build/helpers.js]

// 3. Inline only the pattern functions you need
//    [PASTE FROM build/patterns.js]

// 4. Build colors — pass the brand hex pulled from clients/[slug]/brand.md
const BRAND_HEX = '#XXXXXX';                 // ← from brand.md, NOT hard-coded
const C = buildColors(BRAND_HEX);
const TOTAL_SLIDES = 8;

// 5. Get the Figma page (or create one)
const page = await figma.getNodeByIdAsync('PAGE_ID');  // or figma.createPage()

// 6. Slide builder helper
function newSlide(name, x) {
  const s = figma.createFrame();
  s.name = name;
  s.resize(1920, 1080);
  s.layoutMode = 'NONE';
  s.fills = [{type:'SOLID', color: C.white}];
  s.clipsContent = true;
  page.appendChild(s);
  s.x = x; s.y = 0;
  return s;
}

// 7. Build each slide
const s1 = newSlide('Slide 1', 0);
buildCoverSlide(s1, {
  eyebrow: 'PITCH DECK · 2026',
  title: '[Client Name]',
  subtitle: '[One-line value prop tailored from the redesign]',
  lockup: '[Client] × Oli & Hue',
  footerMeta: ['Live preview ready', 'Designed in 5 days', 'Built to convert'],
  gradient: true,
}, C);
pageNumber(s1, 1, TOTAL_SLIDES, C);

// ... repeat for s2..s8 with the right pattern functions

return { ok: true, count: 8 };
```

## Pattern selection cheat sheet

| Need to show… | Use pattern |
|---|---|
| Cover page | `coverSlide` |
| Client's pain in 3 questions | `statementCards3` |
| 4-step process | `flow4Stage` |
| Who-does-what (3 parties) | `columnOwnership3` |
| Who-does-what (2 parties: us / them) | `roles2Column` |
| 3 service modules / pillars | `platform3Modules` |
| 4 or 6 metrics | `statsGrid` |
| Funnel narrative | `statsFunnel` |
| Social proof + logos | `proofStatsLogosQuote` |
| Quarter-by-quarter timeline | `timelineQuarters` |
| Week-by-week phase plan | `timelineWeeks` |
| Closing CTA — book a workshop / kickoff | `ctaOptionCards` |
| Closing CTA — see a demo / live preview | `ctaNumberedSteps` |
| Pricing / investment | `pricingTwoTier` |
| Kickoff requirements | `requirementsGrid` |
| Integration / channel list | `integrationsChipStrip` |

## Brand primary

The brand primary is the **only** colour that changes between decks. It is **always** read from `clients/[slug]/brand.md` (the confirmed website colour from Phase 3 of Stage 1).

- Pass the hex into `buildColors(hex)` — every pattern function reads `C.primary` automatically.
- Pastels stay fixed across every deck. Do not substitute them for brand colour variants.
- If `brand.md` is missing or unclear, stop and ask the team. Do not invent a hex.

## Anti-patterns (don't do these)

- Don't use the brand primary as a card fill — pastels do that.
- Don't skip the eyebrow pill — every content slide has one above the headline.
- Don't go below 22px font size for body text.
- Don't put strokes on cards — they're filled, no border.
- Don't use UPPERCASE outside of eyebrows.
- Don't skip the page number on a content slide.
- Don't crowd a slide — delete content rather than shrink type.

## When something goes wrong

| Symptom | Fix |
|---|---|
| Headline wraps to one word per line | The headline frame's width didn't apply. Set `n.textAutoResize = 'HEIGHT'` then `n.resize(targetWidth, n.height)` directly on the text node. |
| Card content gets clipped at the bottom | Card height is FIXED but content is taller. Switch the card's `primaryAxisSizingMode` to `'AUTO'`. |
| `layoutGrow=1` children collapse to slivers | Parent row has `primaryAxisSizingMode='AUTO'`. Set parent to `'FIXED'` with explicit width. |
| Page number overlaps content | Bottom content extends past y=1000. Move it up so it ends at y≤1000. |
| Text won't update — "font not loaded" error | Call `figma.loadFontAsync(node.fontName)` before changing characters. |
| Stat numbers don't replace via text-match | Hyphen vs en-dash mismatch. Match by sibling label instead of by stat string value. |
| Use_figma timeouts on a deep recursion | Walk one container level at a time instead of the whole slide. |

## Versioning

Skill version 1.0 — initial generic ModernSleek kit for GhostBuild Stage 3. To extend: see `SKILL.md` → "Skill versioning".
