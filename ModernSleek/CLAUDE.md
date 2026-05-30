# ModernSleek — Working Rules

This is the GhostBuild pitch-deck skill. It produces Figma pitch decks in the **ModernSleek** style — the visual language we use for every Stage 3 deck across every client. Read this file before building anything. The full skill spec is in [SKILL.md](SKILL.md). The 60-second orientation is in [README.md](README.md).

This skill is invoked from **Stage 3 — Crafting the Pitch Deck** in the GhostBuild workflow (see repo-root `skill.md`). Stages 1, 2, and 4 do not use this folder.

---

## Figma access (mandatory)

**Always use the Official Figma MCP** for any Figma read or write. Specifically the `use_figma` tool from the official Figma MCP server (server id beginning with `f5d038db-…`).

Do not propose, install, or use community Figma plugins (e.g. "Claude Talk to Figma"). The official server supports both reads (`get_design_context`, `get_metadata`, `get_screenshot`, `get_variable_defs`) and writes (`use_figma` runs JavaScript in the file via the Figma Plugin API).

Each client gets its own Figma file. Record the file key in the client's `clients/[slug]/progress.md` notes once it exists. If no file exists at the start of Stage 3, create one named `[Client] — Pitch Deck` and store the key before the first write.

---

## ModernSleek design language — non-negotiables

Every deck this skill produces follows these rules. They are baked into the helpers and patterns.

- **Light backgrounds only** for content slides (white or cream). Cover and final CTA *may* use a soft gradient or vivid block. NEVER dark navy or black for content slides.
- **Eyebrow PILL at top-left** — `pillBg` (#EDEFFF) capsule, brand-primary text, UPPERCASE with 6% letter-spacing. Never a bare eyebrow text.
- **Large Radio Canada Big Medium display headlines** (54–96px). Subtitle in Source Serif 4 or Inter directly below — never a naked headline.
- **Pastel-fill cards** (cyan / lavender / peach / yellow / pink / mint / cream). NO strokes on cards. Radius 24 default, 33 hero, 14 chips.
- **Brand primary** is the only colour that changes per client. It appears in the eyebrow pill text, optional one-word headline accent, and small decorative dots. **NEVER as a card fill.**
- **Page number bottom-left at y=1010** (`NN / Total`), client logo bottom-right at y=992. Both on every content slide.
- **Body text minimum 22px.** UPPERCASE is reserved for eyebrows.

---

## Brand primary per client

There is no global default brand colour. Every build reads it from the client.

1. Open `clients/[slug]/brand.md`
2. Take the **confirmed website colour** (locked in Phase 3 of Stage 1)
3. Pass that hex into `buildColors(hex)` — every pattern reads `C.primary` automatically

If `brand.md` is missing or unclear, stop and ask the team. Do not guess a primary colour.

The fixed palette (pastels, ink, pillBg, paper, etc.) does NOT change per client. Only the brand primary does.

---

## Process notes

- Figma `use_figma` writes DO persist. Trust the script's return value.
- Radio Canada Big and Geist Mono may not be loadable in every Figma file. If `figma.loadFontAsync` throws, fall back to Inter Bold (for display) and Inter Medium (for mono) and tell the user in the hand-off.
- Wrap finished decks in a SECTION on the target page so versions can sit side-by-side ("Current" / "Previous").
- Deck file/page naming convention: `[YYYY-MM-DD] [Client] — Pitch Deck — v[N]`

---

## Auto-layout (mandatory for any Figma design work)

**Every structural element on every slide uses Figma auto-layout.** Loose absolute-positioned text and rectangles are not acceptable as final output.

What this means in practice when generating slides via `use_figma`:

1. **Every card** is an auto-layout frame (`layoutMode = 'VERTICAL'`) with explicit padding (typically 24–33px) and itemSpacing (typically 12–24px). Cards expand/shrink with their content.
2. **Every card row** is an auto-layout frame (`layoutMode = 'HORIZONTAL'`) with itemSpacing (24px) and child cards using `layoutGrow = 1` so they share the row equally.
3. **Every header zone** (eyebrow + headline + body paragraph) is a VERTICAL auto-layout frame with explicit gap.
4. **Every two-column header** (headline left, body paragraph right) is a HORIZONTAL auto-layout frame.
5. **Top-bar** with logo + page number uses `primaryAxisAlignItems = 'SPACE_BETWEEN'` to push them to opposite ends.
6. **Footer bars** are HORIZONTAL auto-layout with appropriate sizing.
7. **Decorative absolutely-positioned elements** (orbital decorations, background dot grids, etc.) live on the OUTER slide frame (which itself is fixed-size, non-autolayout) so they don't disturb the content layout.
8. **Text inside auto-layout containers**: use `layoutAlign = 'STRETCH'` + `textAutoResize = 'HEIGHT'` for text that should fill the container width and wrap; use `textAutoResize = 'WIDTH_AND_HEIGHT'` for text that should hug both dimensions.
9. **Sizing modes**: `primaryAxisSizingMode = 'FIXED'` when the container has a known size; `'AUTO'` when it should hug its content. Default to FIXED for top-level slide sections, AUTO for cards' heights so they grow with content.
10. **`layoutGrow=1` requires a FIXED-size parent on the primary axis.** If the parent has `primaryAxisSizingMode='AUTO'` (hugs content), a child's `layoutGrow=1` collapses to zero/min width and the child renders as a thin sliver. Always set the row container to `primary:'FIXED'` with explicit width (or rely on `layoutAlign='STRETCH'` from a FIXED parent) before giving cards `layoutGrow=1`.
11. **Text helpers must apply x/y after appendChild for direct slide placement.** When placing text directly on a slide outer frame (which is non-autolayout — for stage-progression captions, milestone-dot labels, decorative annotations), the helper must set `t.x` and `t.y` *after* `appendChild`. If x/y aren't set, the text lands at (0,0) and floats over the logo.

The build template at `build/starter_deck.js` reflects this — each layout function uses auto-layout primitives, not absolute x/y inside cards.
