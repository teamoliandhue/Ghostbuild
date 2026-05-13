# GhostBuild Skill
**By Oli & Hue** — Version 3.13

GhostBuild is a proactive outreach system where we find businesses with weak websites, silently rebuild their homepage, write their pitch strategy, and present it as a gift — showing exactly what we can do before they spend a rupee.

---

## The Philosophy

> We don't pitch services. We deliver proof.

Most agencies send decks with case studies. We send the actual work — a live redesigned homepage, a clear growth plan, and ads ready to run. The prospect sees their own brand, elevated. That's the close.

---

## Resuming a Build (Token Limit Safety)

The team works on Claude Pro with limited tokens. A session can end mid-build. To survive that, every client folder has a `progress.md` (format defined in `CLAUDE.md`).

**Rules:**
1. The moment a client URL is given, create `clients/[slug]/progress.md` before doing anything else.
2. Update `progress.md` at the end of every phase below.
3. Update `progress.md` *before* you ask the team a question — so if the session dies after your reply, the next session knows what was asked.
4. On a new session, read `progress.md` first and resume from `Next action`.

This is non-negotiable. Skipping it means the team loses hours when a session ends.

---

## The GhostBuild Workflow

> The old Phase 1 ("Hunt") has been moved to `hunt-playbook.md` because the agentic flow never starts at hunting — the team always supplies a URL. See that file when prospecting offline.

### Phase 1 — Setup, Logo + Image Download
When a client URL is given:

1. Create the client folder at `clients/[slug]/website/` using the Next.js project scaffold
2. **Create `clients/[slug]/progress.md`** with `Status: setting-up` (see `CLAUDE.md` for format)
3. Download the logo — find the logo image URL from their HTML, save to `public/logo/`
4. Download all existing site images — hero images, team photos, office shots, any visual — save to `public/images/` with clear names (`hero.jpg`, `team-1.jpg`, etc.)
5. If any download fails, note the URL in `notes.md` and ask the team to drop the file in the correct folder
6. After downloading, assess each image: keep and use, use but flag for replacement, or skip and write a generation prompt. All prompts go into `image-prompts.md`

**Checkpoint:** update `progress.md` — set logo/images flags, `Status: awaiting-colour`.

---

### Phase 2 — Colour (via ui-ux-pro-max) + Font Identification

**Step 2a — Lock the background tone from the client's current site (hard rule).**

Before anything else, decide the background colour direction by looking at the client's existing website:

- If their current site uses a **light theme** (white or near-white background, dark text) → our website background is **white** (`#ffffff` or a very light neutral like `#fafafa`).
- If their current site uses a **dark theme** (black or near-black background, light text) → our website background is **black** (`#000000` or a deep neutral like `#0a0a0a`).

How to detect: fetch their HTML, check the `<meta name="theme-color">` tag, the `body`/`html` `background-color` in their CSS, and (if still unclear) a homepage screenshot. If the result is ambiguous, ask the team — do not guess.

This bg choice is **non-negotiable** and is locked before the ui-ux-pro-max query runs. The palette from the script must adapt to fit this bg. If the script returns a bg colour that conflicts (e.g. it suggests a coloured background like `#FAF5FF` but our locked bg is pure white), we keep our locked bg and use the script's bg as a secondary surface colour instead.

Why: we proved with Globalnex that picking a bg tone that doesn't match the client's existing visual identity makes the rebuild feel wrong to the team, even when the palette is otherwise sound. Matching the client's existing light/dark direction keeps the work grounded.

**Step 2b — Use ui-ux-pro-max for the rest of the palette, not the client logo.**

**Pre-flight check (before running the script):**

```bash
# Verify python3 is installed and the script exists.
command -v python3 >/dev/null 2>&1 || { echo "python3 missing — see fallback below"; }
test -f "$UIUX_SCRIPT" || { echo "ui-ux-pro-max script not found at $UIUX_SCRIPT — see fallback below"; }
```

The script path is **not** hard-coded in skill.md any more. Read it from one of:
1. `$UIUX_SCRIPT` environment variable, if set
2. The `ui_skill_path` line in `.ghostbuild.json` at the repo root, if present
3. Default fallback path: `/Users/jizan/Documents/Claude Code/Ghostbuild/ui-skill/src/ui-ux-pro-max/scripts/search.py`

If either python3 is missing or the script is missing, log it visibly in `progress.md` under **Awaiting from team** as "ui-ux-pro-max unavailable — using logo-extraction fallback for palette" before proceeding. Never silently fall back.

We used to extract colours from the client's logo and let the team pick. That repeatedly produced palettes that didn't suit the industry (the Globalnex dark-navy build was killed for this reason). From v3.5 onward we query the ui-ux-pro-max design-system database first and propose its industry-matched palette to the team.

**How to run it:**

```bash
python3 "$UIUX_SCRIPT" "<industry keywords>" --design-system -p "<client name>"
```

**Keyword tips (critical — the match is keyword-based and can drift):**
- Be specific to the *commercial* category, not the broad theme. Use `"study abroad consultancy"` not `"education"` (the latter pulls children's-education palettes).
- Use `"medical clinic"` not `"healthcare"`. Use `"law firm"` not `"legal"`. Use `"boutique fashion"` not `"retail"`.
- If the first run gives an obviously wrong palette (e.g. kids' colours for a B2B service), re-run with sharper keywords before showing the team.

**What to pull from the output:**
- `COLORS` block → palette (primary, accent/CTA, background, foreground, muted, border)
- `STYLE` block → style direction (Glassmorphism, Exaggerated Minimalism, Bento, etc.)
- `AVOID` block → industry-specific anti-patterns. Treat these as hard "don't" rules during Phase 6.

**What to ignore from the output:**
- `TYPOGRAPHY` block — the font matching is unreliable for niche industries. We extract fonts from the client's actual site (see below).
- `PATTERN` block — we already get this from the Phase 3 reference sites.
- `PRE-DELIVERY CHECKLIST` — most of it overlaps with `post-build-review.md`. Use only the accessibility lines (contrast, focus, reduced-motion).

**Present to the team:**
> "ui-ux-pro-max suggests this palette for `[industry]`:
> Primary `[hex]`, Accent/CTA `[hex]`, Background `[hex]`, Foreground `[hex]`.
> Style direction: `[style name]`. Anti-patterns flagged: `[list]`.
> Want to go with this, tweak it, or direct us another way?"

Wait for confirmation. That confirmed palette goes into `brand.md`.

**Fallback:** if the script fails or every keyword gives a clearly wrong result, fall back to the old method — extract logo colours, present to team. Note in `progress.md` notes that the fallback was used.

**Fonts:**

Identify the fonts used on their current website (check CSS, Google Fonts links, or @font-face declarations). Then ask:
> "Their current site uses [Font Name]. Do you want to keep this font or switch to something else?"

- If they want to keep it and it is a Google Font: load it via `next/font/google` — no file needed.
- If they want to keep it and it is a custom or paid font: ask them to download the font files (`.woff2` preferred, `.woff` as fallback) and place them in `clients/[slug]/website/public/fonts/`. Tell them the exact path before building.
- If they want a different font: confirm the new font name, then proceed as above.

Font files folder: `clients/[slug]/website/public/fonts/[font-name]/`
Load custom fonts via `@font-face` in `globals.css` pointing to `/fonts/[font-name]/[file].woff2`.

**Checkpoint:** before asking the team the colour/font questions, update `progress.md` with the extracted colours/font and set `Status: awaiting-colour` (or `awaiting-font`). After the team answers, save confirmations to `brand.md` and update `progress.md`.

---

### Phase 3 — Reference Website (Ask Before Building)

Always ask before building:
> "Please share 1–3 reference websites whose design you want us to closely follow."

**Critical rule:** The reference website is the design blueprint. We are NOT creating an original design — we are **adapting the reference layout, spacing, component patterns, and visual language** to the client's content and colours. The goal is to produce a site that looks like a natural version of the reference, not something original inspired by it.

**Reference analysis is a hard deliverable.** Once references are given, write `clients/[slug]/reference-analysis.md` BEFORE writing the mockup. No skipping, no shortcuts. The mockup and the build are produced *against this file*, not against a vague memory of the reference.

**Required structure for `reference-analysis.md`:**

For each reference URL, fetch the HTML + computed CSS (use `curl` + grep, or inspect via the preview tools) and document:

1. **Section order** — list every section top-to-bottom with a one-line description. Note which one comes first after the hero, which one is the closer.
2. **Hero specs** — headline font-size in px (desktop and mobile), font-weight, line-height, letter-spacing. Hero padding-top and padding-bottom. Hero alignment (left, centre, split). Background treatment (solid, gradient, image, canvas).
3. **Type scale** — heading sizes for h2 / h3 / body / eyebrow as actual px values. Heading vs body font-family if different.
4. **Spacing rhythm** — section vertical padding (top + bottom) in px. Max-width of the content container.
5. **Card patterns** — if the reference uses cards, document: border-radius, padding, border vs shadow, hover treatment.
6. **Colour distribution** — roughly, how is colour used? Big colour blocks per section? Mostly neutral with one accent? Alternating dark/light strips?
7. **Animation density** — heavy (parallax + scroll-triggered everywhere), medium (fade-up on cards), or none. Note any signature interaction.
8. **The "feel" in one sentence** — e.g. "Editorial magazine grid with oversized type and generous whitespace; gold accent used sparingly on numbers only."

Write the values as numbers, not adjectives. "Hero headline 84px" beats "big headline." This file is what the build is measured against.

**If 2-3 references were given:** synthesise a single composite. Note any choices where the references disagree and pick one (state which reference won and why in one line).

**Then build to those numbers.** If the reference's hero is 84px, ours is 84px. If section padding is 144px, ours is 144px. Stop "loosely resembling" the reference.

**Checkpoint:** update `progress.md` with the reference URL(s) and a one-line summary of the design pattern. Move to Phase 4 (content audit). Status stays `building` for now; mockup-approval status is set at the start of Phase 5.

---

### Phase 4 — Content Analysis (Before Writing a Line)

Done BEFORE the mockup, not after — the mockup needs the final headline. Audit the client's current website content:
- What is their current headline? What's wrong with it?
- What are their current CTAs? Are they specific or generic?
- What social proof exists? Is it real, vague, or missing?
- What are the conversion blockers? (pricing opacity, no FAQ, no urgency, etc.)
- What does their audience actually care about? What fears do they have?

Write a `content-audit.md` that lists:
- Original text (quoted)
- What's wrong with it (specific)
- Our rewrite
- Why our version converts better (the principle behind the change)

Apply the voice rules from **Content Standards → Writing Voice** (no em dashes, no "we believe", etc.) to every rewrite.

This file becomes a section of the pitch deck — showing the client exactly what was wrong and what we fixed.

**Checkpoint:** update `progress.md` notes with "content-audit.md complete". The hero headline from this file is what the next phase's mockup will display.

---

### Phase 5 — Mockup Checkpoint (Kill Switch Before Full Build)

**Why this phase exists:** the Globalnex build was killed at 2 hours of work because the visual direction felt wrong once components were rendered. The mockup phase is a 15-minute cheap proof of the direction. If the team rejects it, we pivot or delete the client — having spent 15 minutes, not 2 hours.

**What to produce:** one static, self-contained HTML file at `clients/[slug]/mockup/index.html`.

**Hard constraints (these keep the mockup fast):**
- Single `index.html` file. No build tooling.
- Tailwind via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Google Font via CDN link in `<head>`
- No JavaScript beyond what Tailwind needs. No React. No Three.js. No scroll animations.
- Real client logo (use absolute path or copy into `mockup/`)
- One real client image OR a single solid-colour placeholder div
- **Real copy from `content-audit.md`** — the final headline + sub + CTA from the audit, not a guess. The supporting section can use lorem placeholder body text for now; we are testing visual direction, not content fidelity.

**What to include:**
1. The hero section, fully styled per the reference pattern + locked bg + ui-ux-pro-max palette.
2. ONE supporting section that establishes the rhythm — usually a stats strip, a 3-card service grid, or a single feature block. Whichever the reference leads with after its hero.

That is the entire mockup. Nothing else.

**How to show the team:**
- Start a preview server pointed at the mockup folder, OR open the HTML directly in the preview tool.
- Take a desktop screenshot and a mobile screenshot.
- Post both to the team with one question:

> "Here's the visual direction. Hero + one section, real palette, real reference pattern, real headline. Want us to build the full site in this direction, or pivot?"

**Decision rule:**
- **Approve →** set `Status: mockup-approved`, proceed to Phase 6.
- **Tweak →** apply the tweak in the mockup HTML (5-10 min), screenshot again, ask again. Do not move on until team says "go."
- **Reject hard →** do NOT start the full build. Either pivot reference/palette (return to Phase 2 or 3) or close the client per the deletion process. Saving 2 hours of wasted build is the entire point of this checkpoint.

**Checkpoint:** at the start of this phase, set `Status: awaiting-mockup-approval` and update `progress.md` notes with "mockup.html written, awaiting approval" before posting the screenshots. After the team responds, update notes with the decision and the new status.

---

### Phase 6 — Build (The Ghost Work)
With logo ✓, colour confirmed ✓, reference analysed ✓, content audit done ✓, **mockup approved ✓**:

**Scope ceiling — homepage only.** We rebuild the homepage and nothing else. About / Services / Contact / blog all stay on the client's old site. The bet is "one killer homepage + a clear pitch" — not a five-page site they didn't pay for. Anything beyond the homepage is paid scope after they sign. Do not create `/about/page.tsx` or any other route. Internal nav links point to anchors on the homepage, not new pages.

**Before writing a single component, paste the `AVOID` block from the Phase 2 ui-ux-pro-max output into `notes.md` and re-read it.** Those anti-patterns are hard rules for this build — e.g. "no AI purple gradients for banking", "no vibrant block colours for luxury", "no dark mode by default for SaaS".

1. **Redesigned homepage** — Next.js + Tailwind CSS (+ Three.js **only if the rule below says so**)
   - Use the actual client logo (never a text placeholder)
   - Design closely follows the reference site's layout and visual language
   - Build to the numbers in `reference-analysis.md` — hero font-size, section padding, max-width, all of it
   - Use their existing images where they convert; suggest Gemini prompts where they don't
   - All content is from the content audit — our rewritten, conversion-optimised version

**Three.js is opt-in, not default.** Most builds do not need a canvas animation. Globalnex spent real time on a globe that rendered wrong and added nothing to the pitch. Default to no Three.js. Add it only when **all three** of these are true:

   1. The reference site itself uses an animated/canvas background as a signature element.
   2. The industry genuinely benefits from it (see the table in "Three.js and Animation Guidelines" below — "global reach" stories, fintech data streams, real-estate landscapes).
   3. The mockup approved in Phase 5 already had it. We do not add Three.js for the first time during the full build.

   If any one of those three is false → skip Three.js entirely. Lean on great typography, generous whitespace, and CSS scroll reveals (see `animations.md` items 8–11). That is usually the higher-quality answer.

   When you skip Three.js, document the decision in one line in `notes.md` ("Three.js skipped — reference uses no canvas, typography-led design"). This trains future builds.

**Framer Motion is the default animation layer.** Use it for:
   - Scroll-triggered fade-up / stagger on cards, lists, sections (replaces our old `Reveal.tsx`)
   - Number counters (replaces our old `Counter` component in `Stats.tsx`)
   - Hover, tap, drag, layout animations
   - Page transitions if the reference uses them

   Don't hand-roll IntersectionObserver, RAF counters, or magnetic-cursor maths any more — Framer Motion does all of it with `motion.div`, `whileInView`, `useMotionValue`, `useSpring`. Install it as a dependency in every new project. Respect `prefers-reduced-motion` via `useReducedMotion()` — Framer Motion ships this hook.

   **Exception:** if `reference-analysis.md` shows the reference uses zero motion (some editorial sites do), skip Framer Motion too. Static is a valid design choice.

**21st.dev MCP is an optional Phase 6 scaffolding aid.** It can pull pre-built Tailwind components into the codebase. Rules for using it:
   - Allowed only AFTER the mockup is approved and `reference-analysis.md` is written.
   - Components it generates must be adapted to: the locked bg tone, the ui-ux-pro-max palette, the reference's exact font sizes and spacing from `reference-analysis.md`. **Never paste a 21st.dev component in raw.**
   - If a generated component fights the reference (wrong section order, wrong card pattern, wrong colour distribution), throw it away and hand-write instead. The reference always wins.
   - Log usage in `notes.md`: which components were generated, which were kept, which were rejected. We need this data to decide whether 21st.dev stays in the workflow after 2-3 builds.

**Rollback rule for Framer Motion and 21st.dev:** these are on probation. After 3 builds we evaluate both against measurable signals, not vibes.

**Framer Motion success criteria — keep if ALL three are true:**
- Build does not regress: responsive verification gate (7 checks × 3 breakpoints) still passes first try.
- Animation code line-count is *lower* than the equivalent hand-rolled IntersectionObserver/RAF approach (rough check, eyeball is fine).
- No bundle-size complaint in production build output.

If 2 of 3 builds fail any of these, remove Framer Motion and revert to the hand-rolled `Reveal.tsx` + RAF counter pattern.

**21st.dev success criteria — keep if ALL three are true:**
- At least one generated component per build survives reference-fit review (i.e., used in production after brand adaptation).
- Adaptation time (palette swap, font-size matching to `reference-analysis.md`) is less than what hand-writing would have taken.
- Components do not introduce dependencies we don't already have in the project.

If 2 of 3 builds fail any of these, remove 21st.dev from the workflow and hand-write components going forward.

Log per-build outcomes in `notes.md` under a `## Probation tracking` heading: which tool, which criteria passed/failed, one-line reason. Aggregate at the 3rd build to decide.

2. **Pitch deck content** (`pitch-deck.md`) — documents every content change: original → new → why

3. **Ad copy** (`ads/ad-copy.md`) — 3 Meta variants + 2 Google Search campaigns

**Checkpoint after each section is built:** update `progress.md` notes with the section just completed. If the session dies mid-build, the next session knows which sections are done and which are pending.

**Responsive verification gate (hard — do this BEFORE `Status: review-pending`).**

A build is not "done" until it passes on a phone. Prospects open the live link on mobile more often than desktop. Run the following with the preview tools, fix any failure, and only then move to `Status: review-pending`.

Breakpoints to test (use `preview_resize`):
- **Mobile:** 375 × 812 (iPhone baseline)
- **Tablet:** 768 × 1024
- **Desktop:** 1440 × 900

For each breakpoint, take a `preview_screenshot` of the full page and check:

1. **No horizontal scroll.** Verify with:
   ```js
   document.documentElement.scrollWidth <= window.innerWidth
   ```
   If false, find the overflowing element with `Array.from(document.querySelectorAll('*')).filter(el => el.scrollWidth > document.documentElement.clientWidth)` and fix.

2. **Hero readable.** Headline doesn't wrap awkwardly mid-word. Sub-headline fits without truncation. CTA button fully visible above the fold.

3. **Touch targets ≥ 44 × 44 px on mobile.** Inspect all interactive elements (nav, CTAs, FAQ toggles, card links). Use `preview_inspect` on each. Anything smaller, bump padding.

4. **Body text ≥ 14 px on mobile, ≥ 16 px on desktop.** No tiny grey-on-grey paragraphs.

5. **Images don't break the layout.** No image overflows its container. All `next/image` components have explicit `sizes` or `fill` with a sized parent.

6. **Nav usable on mobile.** If the desktop nav has more than 3 items, it must collapse into a hamburger or a sticky bottom bar. A row of 6 nav links squashed on a 375px screen is a fail.

7. **All sections render without errors.** Open `preview_console_logs` filtered to `level: error`. The list must be empty.

Once all 7 checks pass on all 3 breakpoints, save the three screenshots into `clients/[slug]/website/responsive/` (folder created on the fly) named `mobile.png`, `tablet.png`, `desktop.png`. These get attached to the pitch. Then set `Status: review-pending`.

If any check fails and you do not have time to fix it before the session ends, log it in `progress.md` under `Awaiting from team` with the specific breakpoint and the fix needed, and set `Status: building` (not `review-pending`). Never mark a build review-ready with known responsive failures.

---

### Phase 6.5 — Self-Improvement Passes (Mandatory Before Any Preview)

**Why this phase exists.** A first build is rarely good enough. Plain card grids, default fade-ups, and "functional" layouts ship as long as no one forces a second look. From v3.13 onward we do not show the build to the team until we have done TWO MORE PASSES on it, each one specifically hunting for sections that can be lifted using patterns from the reference websites.

**Hard rules:**
- Do NOT show a preview to the team between Phase 6 and Phase 6.5.
- Do NOT skip passes if the build "looks fine." That's the trap. Plain looks fine in isolation; it stops looking fine the moment the team compares it to the reference sites.
- Each pass must produce concrete code changes. If a pass produces zero changes, you didn't try hard enough. Go again.
- Update `notes.md` with a `## Polish pass tracking` heading and log each pass: what was reviewed, what was kept, what was rebuilt, why.

**Pass 1 — Layout reflow.**

For every section in `page.tsx`, ask:
- Is there a section type or layout pattern in any of the 3 references that would elevate this section?
- Is this section visually identical to other sections (5 cards on white, then 4 cards on white) and could it benefit from a layout shift (split-screen, full-bleed image, alternating row, sticky-pin, image collage, marquee)?
- Is the imagery being used to its fullest, or is it just decorative?

Rebuild the weakest 2-3 sections by grafting in a reference layout. Examples:
- A plain text card grid → an alternating big-card layout with one feature image per row.
- A flat flag-emoji country grid → a horizontal scroll carousel, OR a world-map dot illustration with hot points, OR alternating country panels with full-bleed flag-photo backgrounds.
- A static stats strip → a stat strip with one full-bleed portrait beside it (Fruitful's "proof in progress" pattern).
- A plain trust ribbon → a marquee strip of partner-university wordmarks.

**Pass 2 — Motion polish.**

For every section in `page.tsx`, ask:
- Is there a Framer Motion pattern that would make this section feel more crafted? (parallax on scroll, magnetic cursor on CTAs, image scale on hover, scroll-tied gradient, sticky-pin, text-mask reveal, layered fade-in)
- Are interactive elements (cards, buttons, accordions) using default browser transitions instead of considered motion?
- Are there moments that deserve a "wow" interaction — typically the hero, the closing CTA, and the testimonial?

Add 3-5 motion upgrades across the build. Document each in `notes.md` with the section and the Framer Motion technique used.

**After both passes, only then show the preview to the team.** Phase 7 (post-build review) only fires after Phase 6.5 is complete.

---

### Phase 7 — Post-Build Review (Before Pitching)

Before the client is contacted, run the post-build review defined in `post-build-review.md`. Ask the questions in groups of 3 to 4. Apply what is learned immediately: update skill.md, update animations.md rating for the animation used, add any new patterns discovered. Commit the changes.

This is not optional. Every build must feed the next one.

**Checkpoint:** update `progress.md` notes with "post-build review complete". Set `Status: awaiting-deploy`.

### Phase 8 — Pitch
Deploy to Vercel. Send cold outreach with the live link as the closer.

**Checkpoint:** update `progress.md` with the Vercel URL and set `Status: done`.

### Phase 9 — Follow-Up
Single follow-up on day 5. Never send a third message.

---

### Deleting a Client
When instructed to delete a client:
- Set `Status: deleted` in `clients/[slug]/progress.md` first
- Remove the entire `clients/[slug]/` folder
- Do NOT remove anything from `skill.md`, `templates/`, `.claude/`, or `CLAUDE.md`
- Commit the deletion with message: `ghostbuild(remove): delete [slug] client data`

---

## Tech Stack

| Layer | Tech | Why |
|-------|------|-----|
| Framework | Next.js 15 (App Router) | Fast, SEO-ready, easy Vercel deploy |
| Styling | Tailwind CSS v4 | Rapid, consistent, team-readable |
| Animation (default) | Framer Motion | Default for scroll reveals, stagger, counters, hover/tap. Replaces hand-rolled IntersectionObserver code. |
| Animation / 3D (opt-in) | Three.js | Visually stunning backgrounds — only when the Phase 6 rule allows it |
| Component scaffolding (optional aid) | 21st.dev MCP | Pull pre-built Tailwind/React components in Phase 6, adapt to brand. Never overrides reference-analysis or locked palette. |
| Language | TypeScript | Type safety for team contributions |
| Fonts | Google Fonts (via next/font) | Performance-optimised |
| Images | next/image | Optimised delivery |

### Project Structure
```
clients/[slug]/
  website/
    public/
      logo/
        logo.png           ← Client logo (must exist before build starts)
      images/              ← Downloaded from client site + any new assets
        hero.jpg           ← Named clearly by purpose
        team-1.jpg
        office.jpg
        [etc.]
      fonts/               ← Custom/paid fonts only (Google Fonts loaded via next/font)
        [font-name]/
          font.woff2
          font.woff
    src/
      app/
        layout.tsx
        page.tsx
        globals.css
      components/
        Nav.tsx
        Hero.tsx           ← Three.js canvas lives here (only when Three.js is opted in)
        [sections].tsx
      lib/
        globe.ts           ← Three.js scene logic (only when opted in; delete the lib/ folder if not)
    package.json
    next.config.ts
    tailwind.config.ts
    tsconfig.json
  audit.md                 ← Website audit and scores
  content-audit.md         ← Content before/after with reasoning
  image-prompts.md         ← AI generation prompts for every image needing replacement
  brand.md                 ← Logo colours + confirmed website colour + confirmed font
  reference-analysis.md    ← Measured analysis of reference site(s); required before mockup
  mockup/
    index.html             ← Static Tailwind-CDN mockup for team approval before full build
  pitch-deck.md
  ads/
    ad-copy.md
  notes.md
```

---

## Three.js and Animation Guidelines

**Read the Phase 6 opt-in rule first.** Most builds skip Three.js. The guidelines below apply only when the three-condition rule says we include it.

Full animation library is in `animations.md`. Always check it before writing new Three.js or CSS animation code. Reuse and adapt existing entries. Add new ones after every build. CSS-only animations (items 8–11 in `animations.md` — scroll reveals, counters, magnetic buttons, text reveal) are the default; Three.js is the exception.

Quick reference — when Three.js IS in scope, match scene to client's industry:

| Industry | Three.js Concept |
|----------|-----------------|
| Study abroad / Education | Slow-rotating wireframe globe, particle vertices |
| Real estate | Geometric low-poly landscape, subtle grid |
| Healthcare / Clinic | Soft particle drift (no medical clichés) |
| Finance / Fintech | Flowing graph lines, data streams |
| Legal | Minimalist floating planes, dark + authoritative |
| Fashion / Retail | Abstract colour blobs, fluid simulation |
| Tech / SaaS | Grid with floating nodes, neural network mesh |

Rules:
- Always runs at ≤30fps (performance)
- Never competes with the headline — always a bg layer, never foreground
- Must be skipped on `prefers-reduced-motion`
- Canvas opacity: 0.1–0.25 on dark bg, near invisible on light bg

---

## Colour Confirmation Process (Phase 2 in Detail)

Extract from logo and current site → present to team → wait for answer → lock in.

**What we lock in (from logo + team confirmation):**
- Website primary/bg colour direction (dark navy, light, white, etc.)
- Accent colour (often the logo's accent or button colour)
- Text colour (inferred from bg choice)

**What we do NOT decide at this step:**
- Typography pairings (choose freely based on reference site)
- "Brand personality" or visual language descriptors
- Anything beyond colour

---

## Content Standards

### Writing Voice — Most Important Rule

Every word of copy must read like it was written by a senior human copywriter with 20 years of website content experience. Not like AI output.

**The single clearest AI tell: the em dash (—). Never use it. Not once.**

Other patterns to avoid:
- Long compound sentences joined with "—" in the middle
- Phrases like "we believe", "we are committed to", "our mission is", "we strive to"
- Adjective stacking: "trusted, experienced, dedicated, passionate" — pick one or use none
- Hollow openers: "In today's world", "Are you looking for", "Welcome to"
- Bullet points that all start with a gerund: "Providing...", "Offering...", "Delivering..."
- Ending with "and more" or "and beyond"
- Any sentence that could appear on any competitor's site unchanged

What good copy sounds like instead:
- Short sentences. Punchy. Direct.
- The reader's problem in the first sentence, not the company's name
- Specific numbers over vague claims
- Conversational but confident — like someone who has seen it all and knows exactly what works
- Each line earns its place or gets cut

Run every section through this test before finalising: "Would a real person actually say this out loud?" If no, rewrite it.

---

### Content Checks

**Headlines** — Never "Welcome to [Brand]" or "Best [X] in [City]"
- Outcome-first or problem-aware
- Specific beats vague: "Visa in hand in under 14 weeks" beats "Fast visa processing"

**Body copy**
- Lead with the reader's problem, not the company's features
- End every service description with a benefit, not a feature
- Numbers always carry context: "92% visa approval across 200+ applications" not "high success rate"

**CTAs**
- Action verb plus specific outcome: "Book Your Free Assessment" not "Submit" or "Get in Touch"
- One primary CTA per section
- Never repeat identical CTA wording twice on the same page

**Social proof**
- Every testimonial names the specific outcome, not just "great service"
- Include: person's name, what they achieved, where they are now

**FAQ — always covers these 6 conversion blockers:**
1. Pricing and hidden fees
2. What happens if something goes wrong
3. How long does it take
4. Minimum requirements or eligibility
5. Why you over doing it alone or going to a competitor
6. What happens the moment I book

---

## Image Strategy

### Step 1 — Download their existing visuals first

When the client URL is given, before building anything, scan their site for all images being used: hero images, team photos, office shots, service illustrations, anything. Download every usable one into `clients/[slug]/website/public/images/`. Name them clearly: `hero.jpg`, `team-1.jpg`, `office.jpg`, etc.

These downloaded images go straight into the build. The redesign uses their actual visuals so the preview feels personal and real to them, not like a template demo.

How to find image URLs: fetch the page HTML, look for `<img src="...">`, `background-image: url(...)` in inline styles, and any `og:image` meta tags. Download each one with `curl -L [url] -o public/images/[name]`.

### Step 2 — Assess each image honestly

After downloading, look at each image and decide:

- **Keep and use** — the image is decent quality, relevant, and would work in the redesign
- **Use but flag** — the image is what they have so we use it, but it is not ideal. Note it in `content-audit.md` and write a generation prompt below
- **Skip** — pure stock photo with no connection to the brand. Do not use it. Write a generation prompt instead

### Step 3 — Write generation prompts for every image that needs replacing

For any image that is missing, too generic, or low quality, write a specific Gemini/AI image generation prompt. Store all prompts in `clients/[slug]/image-prompts.md`.

Prompt format:
```
Image: [what it's for — e.g. "Hero background", "Services section visual"]
Prompt: [Style], [exact subject], [setting], [lighting], [mood], [camera angle], [resolution], no text, no watermarks
Negative: [what to avoid — e.g. "no stock photo look, no generic handshake, no stiff poses"]
```

Example:
```
Image: Hero background
Prompt: Photorealistic, confident young Indian woman in her mid-20s walking
through the entrance of a modern UK university campus, golden hour side lighting,
warm aspirational mood, wide angle, cinematic depth of field, 4K
Negative: no stock photo look, no posed smile, no text overlays, no watermarks
```

Write a prompt even if you are not sure they need it. It costs nothing and gives the team options when they want to upgrade images later.

### Step 4 — In the build, always reference real files

Never use external image URLs from their old site inside the Next.js build. Always use the downloaded local file via `next/image` pointing to `/images/[name]`. If an image could not be downloaded, use a solid colour placeholder div with the generation prompt as a code comment above it so the team knows exactly what to drop in.

No placeholder `[IMAGE]` text. No grey boxes without context. Always either a real image or a clearly labelled colour placeholder with the prompt ready.

---

## Pitch Deck Structure (8 Slides)

1. **The Gap** — their current site vs. our rebuild (screenshot comparison)
2. **What We Found** — top 3 specific problems from content audit (quoted, with evidence)
3. **The Redesign** — showcase rebuilt homepage (link to Vercel preview)
4. **Content Before → After** — 3 examples from content-audit.md with the why
5. **The Growth Plan** — 90-day roadmap: site → SEO → ads → conversion
6. **Ad Previews** — 2 ad creatives ready to launch
7. **What It Costs** — transparent tier options
8. **Next Step** — single CTA: book a call

---

## Team Contribution Guide

1. Get URL → create `clients/[slug]/`
2. Download logo → if fails, note in `notes.md` and ask team
3. Extract logo colours → ask team for website colour confirmation → wait
4. Ask for reference website(s) → fetch and analyse thoroughly
5. Write `content-audit.md` before writing any copy
6. Build against the reference design pattern, not an original layout
7. Fill `pitch-deck.md` with every before/after content change
8. Write ad copy referencing the homepage's primary CTA

Commit prefix: `ghostbuild([slug]): [what you did]`

---

## Skill Upgrade Log

| Version | What Changed |
|---------|-------------|
| 1.0 | Initial skill — workflow, standards, globalnexs first client (vanilla HTML) |
| 2.0 | Next.js + Tailwind + Three.js; brand analysis phase; reference-first workflow; image strategy; content standards |
| 3.0 | Corrected brand phase — only extract logo colours, confirm website colour with team, do not impose brand system. Corrected reference phase — reference is the design blueprint, not just inspiration. Added content-audit.md as required deliverable before build. Added client deletion process. |
| 3.1 | Added font identification step in Phase 3 — identify current fonts, ask to keep or change, specify font file location for custom fonts. Added hard content rule: no em dashes ever, copy must read like 20-year human copywriter not AI, full list of AI writing patterns to avoid. |
| 3.2 | Image strategy overhaul — download all client site images into public/images/ at setup, use them in the build, assess each for quality, write AI generation prompts for anything that needs replacing, store all prompts in image-prompts.md. Never use placeholder boxes without a prompt. |
| 3.3 | Animation library + post-build review system. Three.js scenes now reference `animations.md` (12 documented animations). Every build feeds a structured 14-question review (`post-build-review.md`) before pitching. |
| 3.4 | Token-limit safety: every client folder must keep a `progress.md` file. New sessions read it first to resume in-flight builds without losing context. `CLAUDE.md` at repo root tells every new session to check `progress.md` before doing anything. Each phase now ends in a checkpoint where progress.md is updated. |
| 3.5 | Colour picking moved off the client logo and onto the ui-ux-pro-max design-system database. We query its `search.py` with industry keywords, take its palette + style direction + anti-patterns, and propose to the team. Triggered after Globalnex was killed for a logo-derived palette that didn't suit the industry. Logo extraction is now only a fallback when the script fails or returns clearly-wrong results. The `AVOID` block from the script output becomes a hard rule list at the start of Phase 6. |
| 3.6 | Background tone is now locked from the client's existing site BEFORE the ui-ux-pro-max query runs. Light theme on their site → white bg on ours. Dark theme → black bg on ours. Detected from theme-color meta + body CSS + homepage screenshot. The script's palette must adapt to this locked bg. Prevents the Globalnex-style mismatch where the team rejects a build because the bg tone doesn't match the brand's existing direction. |
| 3.7 | Added Phase 4.5 — Mockup Checkpoint. After reference is picked and before the full build, produce a single static `mockup/index.html` (Tailwind CDN, no React, no Three.js) showing hero + one section. Team approves or rejects in 15 minutes. If rejected, pivot or delete the client — never start the full build on a rejected direction. Direct response to the Globalnex 2-hour kill, which would have died at 15 minutes under this rule. New status: `awaiting-mockup-approval`. Phase 6 entry condition now requires `mockup approved`. |
| 3.8 | `reference-analysis.md` is now a required deliverable in Phase 4, written before the mockup. Documents measured values — hero font-size in px, section padding in px, type scale, card specs, colour distribution, animation density — not adjectives. Build and mockup must hit those numbers. Fixes the "loosely resembling the reference" problem where components only vaguely matched the design blueprint. |
| 3.9 | Three.js is now opt-in, not default. Added a three-condition rule in Phase 6: the reference uses an animated background, the industry genuinely benefits, and the approved mockup already had it. If any condition is false, we skip Three.js entirely and lean on typography + CSS scroll reveals from `animations.md` items 8–11. Decision is logged in `notes.md`. Triggered by the Globalnex build wasting time on a globe that rendered wrong and added nothing. |
| 3.10 | Hard responsive verification gate before `Status: review-pending`. Seven checks (no h-scroll, readable hero, 44×44 touch targets, min body sizes, image containment, mobile nav usability, zero console errors) across 3 breakpoints (375/768/1440). Screenshots saved to `website/responsive/` and attached to pitch. A build is not done until it passes on mobile — prospects open the link on phones more often than desktop. |
| 3.11 | Framer Motion is now the default animation layer (replaces hand-rolled IntersectionObserver/Reveal/Counter code). 21st.dev MCP is allowed as an optional Phase 6 scaffolding aid — generated components must be adapted to reference-analysis + locked palette, never pasted raw. Both tools are on probation: if after 3 builds they produce more friction than value, they get removed and we revert. Outcomes tracked in `notes.md` per build. |
| 3.12 | Workflow cleanup pass after honest review. (1) Phase 1 "Hunt" removed from the agentic flow and moved to `hunt-playbook.md` — we always start from a URL the team supplies. (2) Content audit now runs BEFORE the mockup (was after), so the mockup displays the final headline and the team approves on real copy. Phases renumbered: Setup → 1, Colour → 2, Reference → 3, Content Audit → 4, Mockup → 5, Build → 6. (3) Phase 6 now states the scope ceiling explicitly: homepage only, no internal pages. (4) ui-ux-pro-max script path is now configurable via `$UIUX_SCRIPT` env var or `.ghostbuild.json`, with a pre-flight check that logs to `progress.md` if unavailable — no more silent fallback. (5) Framer Motion + 21st.dev probation now has measurable success criteria (3 each) and a `## Probation tracking` heading in `notes.md` for per-build evaluation. |
| 3.13 | Added Phase 6.5 — Self-Improvement Passes (mandatory before any preview). After Phase 6 build, two more passes are forced: Pass 1 reflows the weakest 2-3 sections by grafting a reference layout (alternating big-cards, marquee strips, sticky-pinned sections, image collages, world-map dots, full-bleed portrait pairings). Pass 2 adds 3-5 motion upgrades (parallax, magnetic CTAs, image scale, scroll-tied gradients, text-mask reveals, layered fades). No preview is shown until both passes are complete. Each pass logged in `notes.md` under `## Polish pass tracking`. Reason: first builds always default to plain card grids and default fade-ups; the team rejects them; we save the build at pass 2 instead of after pitch. Triggered by Globalnex v1 build being killed for being too plain — would have been saved by this rule. |

---

*Update this file every time you discover a better pattern. Bump the version.*
