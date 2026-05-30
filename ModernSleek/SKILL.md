---
name: modern-sleek-deck
description: Build modern, beautifully-designed pitch decks in Figma using the ModernSleek design system. Covers the full design language (palette, typography, components, spacing) plus a library of 16 reusable slide patterns. Brand primary is read per-client from `clients/[slug]/brand.md`. Use whenever Stage 3 of a GhostBuild flow needs a client pitch deck, sales deck, SOW deck, or any client-facing presentation that needs to feel premium, structured, and on-brand.
---

# ModernSleek Deck

A complete pitch-deck design system + pattern library for Claude. It produces decks that look hand-crafted by a senior designer — light, structured, pastel-led, with one bold brand-primary accent per slide. The brand primary is the **only** customer-specific colour; everything else (pastels, ink, typography, spacing) is fixed across every deck.

This skill runs as part of **Stage 3 — Crafting the Pitch Deck** in the GhostBuild workflow. The output is a deck built directly in Figma via the Official Figma MCP (`use_figma`). The agent reads this file plus `design_tokens.json` and `build/patterns.js`, then composes a `use_figma` call that builds the slides.

---

## When to use this skill

Use whenever Stage 3 begins for any client, OR the user asks to:

- Create a new pitch deck, sales deck, SOW (statement of work), board deck, investor deck, or proposal deck for a GhostBuild client
- Update an existing deck to a "modern" or "premium" feel using the ModernSleek system
- Build slides that follow the GhostBuild house design language

Do **not** use for: data dashboards, marketing webpages, product UI, or report-style documents — those need different systems.

---

## Mandatory pre-flight (read before building anything)

1. **Read `design_tokens.json`** — palette, typography, spacing tokens. Understand which colours are fixed (pastels, ink) vs which are parameterized (brand primary).
2. **Read `build/patterns.js`** — full inventory of slide pattern functions. Each function has a JSDoc with input shape.
3. **Read `build/helpers.js`** — `AF`, `T`, `FN` helper signatures used by all patterns.
4. **Read `clients/[slug]/brand.md`** — pull the confirmed website colour as the brand primary hex for this build. If `brand.md` is missing or unclear, stop and ask the team. Do not guess.
5. **Read `clients/[slug]/content-audit.md`** — the spine of the deck content. Every before/after rewrite informs slide copy.
6. **Confirm Figma file + page** the deck should land on. Use Official Figma MCP only (server prefix `f5d038db-…`). If no file exists, create one named `[Client] — Pitch Deck` and store the key in `clients/[slug]/progress.md` notes.

---

## Critical rules — non-negotiable

These rules exist because we've seen what breaks the system. Do not violate them.

| # | Rule |
|---|---|
| 1 | **No dark backgrounds for content slides.** Cover and final CTA *may* use dark or vivid colour blocks. Every other slide is white or cream paper. |
| 2 | **One brand-primary accent per slide.** The brand colour appears in eyebrow text, optional accent words in headlines, small dots/anchors. Never as a card fill. |
| 3 | **Pastels are fixed.** Cyan, lavender, peach, yellow, pink, mint, cream are deck-wide and don't change per client. They are the supporting palette. Brand primary is the only thing that changes. |
| 4 | **No card strokes.** Cards are filled with pastel and have no border. Radius 24px (default), 33px (hero stat cards), 14px (chips). |
| 5 | **No UPPERCASE on body text.** UPPERCASE is reserved for eyebrows (Inter Medium, 6% letter-spacing, brand-primary colour). |
| 6 | **Minimum body font 22px.** Subtitles 24–26px, body 22–24px, captions 22px. Never below 22px. |
| 7 | **Auto-layout is mandatory** for every structural element — cards, rows, columns, stat groups, headers. The only exceptions are decorative elements (orbital rings, dot patterns) and absolutely-positioned overlays (logos, page numbers). |
| 8 | **Eyebrows are pills, not just text.** Always wrapped in a small pillBg-filled rounded rectangle (r=100, padL/R=18, padT/B=10). |
| 9 | **Every slide has a page number** (`NN / Total`) bottom-left at y=1010, x=64 or 120. Client logo bottom-right at y=992. |
| 10 | **Headlines pair large with small.** Big headline (Radio Canada Big Medium 54–96px, ls -2%) immediately followed by an Inter or Source Serif subtitle (24–30px). Never a naked headline. |
| 11 | **`layoutGrow=1` requires a FIXED-size parent on the primary axis.** If the parent has `primaryAxisSizingMode='AUTO'`, a child with `layoutGrow=1` collapses to a sliver. Always set the parent row to `primary='FIXED'` with explicit width before giving children `layoutGrow=1`. |
| 12 | **Text helpers must apply x/y after appendChild for direct slide placement.** When placing text directly on a non-autolayout slide outer frame, set `t.x` and `t.y` *after* `appendChild`, otherwise the text lands at (0,0). |
| 13 | **Load fonts before writing or resizing text.** Every font you use (Inter, Source Serif 4, Radio Canada Big, Geist Mono) must be loaded with `figma.loadFontAsync` before changing `characters`, `fontSize`, or `textAutoResize`. |
| 14 | **No emojis in headlines or body.** Reserve emoji for tiny accent indicators only when explicitly requested. Default is no emojis. |

---

## Design language at a glance

### Palette

The palette has two parts: **fixed deck colours** (used on every deck regardless of client) and **brand primary** (the only client-specific colour, read from `clients/[slug]/brand.md`).

**Fixed deck colours** — these never change:

| Token | Hex | Use |
|---|---|---|
| `paper.white` | `#FFFFFF` | Default slide background |
| `paper.cream` | `#FFF4DE` | Cover / closing slide gradient stop |
| `paper.pastelStart` | `#A8D3FF` | Cover gradient start (when used) |
| `ink` | `#0B0E18` | All headlines and body text |
| `muted` | `#6C6C70` | Subtitles, secondary text, captions |
| `pillBg` | `#EDEFFF` | Eyebrow pill background |
| `pastel.cyan` | `#C6F1FF` | Card fill 1 |
| `pastel.lavender` | `#E0D4F7` | Card fill 2 |
| `pastel.peach` | `#FFAFA3` | Card fill 3 |
| `pastel.yellow` | `#FFE166` | Card fill 4 |
| `pastel.pink` | `#FFA8DB` | Card fill 5 |
| `pastel.mint` | `#DFEBCF` | Card fill 6 |
| `pastel.cream` | `#FFF4DE` | Card fill 7 |

**Brand primary** — read from `clients/[slug]/brand.md` per build.

The brand primary appears in: eyebrow pill text, optional headline accent words (using `setRangeFills`), small anchor dots, decorative orbital strokes. **Never as a card fill** — pastels handle card fills.

### Typography

| Role | Font | Weight | Size range | Notes |
|---|---|---|---|---|
| Display headline | Radio Canada Big | Medium | 54–96px | ls -2%, lh 108–115% |
| Subhead | Source Serif 4 | Regular | 26–36px | lh 130–140% |
| Body | Inter | Regular | 22–26px | lh 135–140% |
| Card title | Inter | Semi Bold | 24–30px | lh 130% |
| Eyebrow | Inter | Medium | 22–24px | ls 6%, UPPERCASE wrapped in pill |
| Stat number | Radio Canada Big | Medium | 64–120px | ls -2% |
| Mono detail | Geist Mono | Regular/Medium | 22–24px | for IDs, codes, metric markers (rare) |

If Radio Canada Big or Geist Mono isn't loaded by the target Figma, fall back to Inter Bold for headlines and Inter Medium for mono. Always tell the user about substitutions in the hand-off.

### Spacing & layout grid

- Canvas: 1920 × 1080 (16:9)
- Left/right margin: **64px** (preferred — slim) or **120px** (traditional, more padding)
- Eyebrow position: y=64 to y=120 (top-left)
- Page number: y=1010 (bottom-left), client logo y=992 (bottom-right)
- Body content: y=200 to y=940
- Card radius: 24 (default), 33 (hero stat), 14 (chips), 100 (pills)
- Card padding: 24 (default), 30–36 (hero), 18 (compact)
- Inter-card gap: 24 (cards in a row), 14–18 (chips in a strip)

### Components (the visual building blocks)

These are the atoms every pattern is built from. See `build/helpers.js` for the implementation.

- **Eyebrow pill** — small pillBg-fill capsule, brand-primary text, all-caps with 6% letter-spacing
- **Headline + subtitle block** — Radio Canada Big headline above Source Serif or Inter subtitle, vertical autolayout
- **Stat card** — pastel fill, 24px radius, 24–30px padding, big stat number top + label below
- **Numbered card** — pastel fill with a small primary-colour circle in top-left (40×40, radius 20) containing white "01"-style numeral, plus title + body below
- **Pill chip** — small horizontal pastel pill, single line of body text, used in chip strips
- **Black emphasis banner** — full-width ink-fill bar at the bottom of a slide (radius 24, white text, Inter Semi Bold)
- **Phase navigator** — horizontal row of 4 small pills, active one filled brand-primary with white text, others are navTrack-fill with muted text

---

## Slide pattern library

These are the canonical slide shapes. Pick from here when composing a deck. Each pattern is implemented as a function in `build/patterns.js` with a JSDoc that lists its input shape.

| ID | Pattern | When to use |
|---|---|---|
| `coverSlide` | Cover with eyebrow + giant title + client (× partner) lockup | Slide 1 of every deck |
| `statementCards3` | Eyebrow + headline + 3 numbered question/statement cards | Problem statement, "3 things you can't answer" |
| `flow4Stage` | 4 numbered stage cards in a row, each with title + 4 bullets | Process flow (e.g. INTAKE → BUILD → LAUNCH → GROW) |
| `columnOwnership3` | 3 columns with icon + label + bullet items | "You provide / We run / You receive" or "Inputs / Process / Outputs" |
| `roles2Column` | 2 cards side-by-side, each with checkmarks + items | "We own / Client owns" |
| `platform3Modules` | 3 module cards with icon, title, body | Service pillars, product modules |
| `statsGrid` | 4-stat row OR 2×3 grid of stat cards | Outcomes, metrics, KPIs |
| `statsFunnel` | 4 stat bars with descending widths | Funnel narrative |
| `proofStatsLogosQuote` | 4 stats + 7-logo strip + client quote | Social proof slide |
| `timelineQuarters` | Q1/Q2/Q3+ horizontal timeline with bullet lists per quarter | "What to expect" / phasing |
| `timelineWeeks` | 4 numbered phase cards with week ranges | Scope of work / project plan |
| `ctaOptionCards` | 4 small content cards + bottom CTA button | "Book the kickoff call" Option A close |
| `ctaNumberedSteps` | 3 numbered cards horizontally + bottom CTA button | "See it in action" Option B close |
| `pricingTwoTier` | 2 stat cards (platform + services) + black total bar + 3 secondary cards | Investment / pricing slide |
| `requirementsGrid` | 3 columns with REQUIRED/RECOMMENDED pill badges + items | "Before we launch" / kickoff requirements |
| `integrationsChipStrip` | Single card with eyebrow + horizontal chip row of integration / channel names | Listing tools, integrations, or channels |

---

## How to build a deck (the agent's playbook)

### Step 0 — Confirm scope

Before building anything, confirm:
- Which client (slug) and which Figma file + page
- What kind of deck — pitch (default for Stage 3), sales, SOW, board
- Audience (founder, marketing lead, CXO, etc.) — informs voice and density
- How many slides / which patterns from the library? Or pick a recipe below.

Brand primary is **always** read from `clients/[slug]/brand.md`. Never hard-code or ask the user for a different hex when one is already locked in `brand.md`.

### Step 1 — Read the kit

Read these three files in order: `SKILL.md` (this file) → `design_tokens.json` → `build/patterns.js`. You now have the rules, tokens, and pattern function signatures in context.

### Step 1.5 — Draft copy before design

Before composing the `use_figma` script, draft the **eyebrow / headline / subtitle / body bullets** for every slide as a plain-text outline. Get the user's approval on the copy. Then build the design. Doing copy first and design second is faster than doing both and re-doing both.

### Step 2 — Compose the build script

Build a single `use_figma` call that:
1. Loads required fonts (`Inter Regular/Medium/Semi Bold/Bold`, `Source Serif 4 Regular`, `Radio Canada Big Medium`, optionally `Geist Mono`)
2. Inlines the helpers from `build/helpers.js`
3. Inlines the pattern functions you need from `build/patterns.js` (do not include patterns you don't use — keep the script tight)
4. Defines the `BRAND` object with `primary` set to the hex from `clients/[slug]/brand.md`
5. Creates the page (or uses an existing one) and walks through each slide:
   - Create the outer slide frame (1920×1080, white fill, layoutMode='NONE', clipsContent=true)
   - Position it at the right x/y on the page
   - Call the pattern function for that slide with the content
6. Returns a summary (slide IDs, page name, count)

### Step 3 — Verify visually

After building, screenshot the section/page (single screenshot of the outer container is faster than 9 individual ones). Read the screenshot. Look for:
- Text wrapping issues (frame width too narrow → "Not / soft / war" word-per-line collapse)
- Card overflow (content taller than fixed-height card)
- Page-num collisions with content
- Missing eyebrow pill (text outside a pill)
- Missing client logo

If any issue is found, fix it (don't leave broken output for the user to find).

### Step 4 — Hand off

Reply with:
- A 2–3 line summary of the deck structure
- A list of slide titles and what content went on each
- A `[Open in Figma](https://www.figma.com/design/...)` link to the page or section
- Any font substitutions or content gaps the user should fix manually

---

## Reference images

The `reference/Template/` subfolder has PNG screenshots of canonical ModernSleek frame layouts. When you're not sure how a pattern should look, open one and compare. These are pattern examples — not client-specific content.

---

## The 8-slide GhostBuild pitch-deck recipe (Stage 3 default)

This is the canonical structure for a Stage 3 client pitch deck. It maps to the 8 slides described in repo-root `skill.md` → "Pitch Deck Structure".

1. **The Gap** — `coverSlide` or split before/after layout — their current site screenshot vs. our rebuild
2. **What We Found** — `statementCards3` — top 3 specific problems from `content-audit.md` (quoted, with evidence)
3. **The Redesign** — full-bleed screenshot frame + link to Vercel preview (use `coverSlide` variant)
4. **Content Before → After** — `roles2Column` repurposed: original copy left (ghost fill), our rewrite right (cyan fill). 3 examples from `content-audit.md`.
5. **The 90-Day Growth Plan** — `timelineQuarters` or `timelineWeeks` — site → SEO → ads → conversion
6. **Ad Previews** — `platform3Modules` repurposed — 2–3 ad creatives with caption + intent
7. **What It Costs** — `pricingTwoTier` — transparent tier options
8. **Next Step** — `ctaOptionCards` or `ctaNumberedSteps` — single CTA: book a call

---

## Common content recipes (alternates)

When the deck is not a Stage 3 ghost-pitch (e.g. a paying client wants an internal deck), use one of these.

**Sales / proposal deck — 10 slides:**
1. `coverSlide` — client × us cover
2. `statementCards3` — the problem in 3 questions
3. `flow4Stage` — how we work (4 stages)
4. `platform3Modules` — our service pillars
5. `statsGrid` — outcomes / case-study metrics
6. `proofStatsLogosQuote` — client logos + a quote
7. `roles2Column` — we own / client owns
8. `timelineQuarters` — what to expect (Q1 / Q2 / Q3+)
9. `ctaOptionCards` — Option A close
10. `ctaNumberedSteps` — Option B close

**SOW / project deck (12–18 slides):**
1. Cover + situation + offer overview
2. Phases with `timelineWeeks` overview
3. Detail slide per phase (`columnOwnership3` or sidebar pattern)
4. Roles & responsibilities (`roles2Column`)
5. Outcomes (`statsGrid` or `statsFunnel` for milestones)
6. Pricing (`pricingTwoTier`)
7. Requirements (`requirementsGrid`, `integrationsChipStrip`)
8. CTA closing (`ctaOptionCards` or `ctaNumberedSteps`)

---

## Anti-patterns — things that look bad and should be fixed on sight

- Card with stroke + pastel fill (drop the stroke)
- Eyebrow rendered as plain text without a pill
- Headline + body crammed against the top edge with no eyebrow above
- Stat card where the number is smaller than the label (always invert: number 60–100px, label 24–26px)
- Two stat cards in a row with different heights (bind heights to match)
- Sales/process flow without arrows between stages (or with arrows that disappear into the next card)
- Brand colour used as a card fill (it's an *accent* — pastels do the heavy lifting)
- Crowded slide with no breathing room (delete content rather than shrinking type)
- Page number missing from a content slide
- Three different fonts on one slide (stick to the four-font stack)

---

## Skill versioning

ModernSleek is version 1.0. Patterns added in 1.0 cover the canonical GhostBuild Stage 3 deck shape. New patterns should be added by:
1. Adding a function to `build/patterns.js` with a JSDoc input contract
2. Adding the pattern to the [Slide pattern library](#slide-pattern-library) table
3. Adding a reference PNG to `reference/Template/` (or a new subfolder)
4. Bumping this version number in this file
