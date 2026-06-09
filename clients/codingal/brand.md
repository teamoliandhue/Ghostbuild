# Brand — codingal

## Logo
- Source: codingal.com (penguin mascot "Cody" + "Codingal" wordmark)
- Target: `website/public/logo/logo.svg` (or .png fallback)
- Works on light/cream background.

## Colours found in current site
| Hex | Where |
|---|---|
| Coral / orange-red | Primary CTA, brand accent (redesign mockup) |
| Teal | Live-site logo + accents (older direction) |
| White / warm cream | Backgrounds |

## Confirmed direction (locked by team — 2026-06-02)

**Vibe:** Warm & playful, coral brand. Edukids/Khan warmth fused with Codingal coral. Off-white cream bg, kid photos in rounded/coloured shapes, light doodle accents, credible but friendly.

### v2 — Synapse neo-brutalist pastel (RESTYLE locked 2026-06-04, CURRENT)

Team chose to restyle (layout + every line of copy unchanged) to the "Synapse" reference: cream bg, candy pastels, bold black 2px outlines, hard offset black shadows (no blur), generous rounded corners, bold geometric sans (no serif), playful doodle accents.

**Colour tokens (current)**
| Token | Hex | Use |
|---|---|---|
| `--coral` | `#F9543B` | Primary CTA, brand accent |
| `--coral-soft` | `#FBD9D2` | Featured pricing card, chips |
| `--cream` | `#FBF6EC` | Page background |
| `--cream-deep` | `#F3ECD8` | Alternating sections, footer |
| `--ink` | `#17120E` | Text AND all outlines + shadows |
| `--ink-soft` | `#5B524A` | Body / secondary text |
| `--surface` | `#FFFFFF` | Cards |
| pastels | `#5FC36E` grass, `#6CB5E8` sky, `#F0C43C` sun, `#A98CEE` grape, `#EF9B90` pink (+ `-soft` tints) | Card fills, badges, step circles, trust band |

**Outline system (globals.css):** `.card-out` / `.card-out-lg` (2px ink border + 5-7px hard shadow), `.btn` + `.btn-primary` / `.btn-secondary` (pill, 2px border, 4px hard shadow, press-down on hover/active), `.chip`, `.shadow-hard` / `.shadow-hard-sm`.

**Fonts:** **Plus Jakarta Sans** for everything (headings 800 / tracking -0.025em, body 400-500). No serif.

### v1 — Warm coral + cream, Fraunces serif + DM Sans (SUPERSEDED by v2)
Original direction. Tokens: cream `#FBF6EE`, ink `#2A211B`, soft 1px borders + blurred shadows, Fraunces + DM Sans. Replaced 2026-06-04.

## Pricing
- Team confirmed: surface directional pricing on the page (Synapse-style plan cards) + free trial + refund line.

## Design references (blueprint)
- UX flow: Coursera Plus (structured, conversion-led, browsable catalog, persistent CTA).
- UI look: uploaded set — Edukids (warm cream + colour blocks + doodles + kid photos), Khan Academy (serif headlines, supporters row, course grid, testimonials), Synapse (pricing cards), CodeQuest (gamification touches), Preply (feature icon grid).
- No Three.js background — references are photo/illustration-led. Use CSS scroll reveals + subtle doodle float + counting stats instead (per animations.md decision guide: don't force an animation the reference doesn't have).
