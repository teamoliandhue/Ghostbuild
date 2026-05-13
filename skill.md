# GhostBuild Skill
**By Oli & Hue** — Version 3.0

GhostBuild is a proactive outreach system where we find businesses with weak websites, silently rebuild their homepage, write their pitch strategy, and present it as a gift — showing exactly what we can do before they spend a rupee.

---

## The Philosophy

> We don't pitch services. We deliver proof.

Most agencies send decks with case studies. We send the actual work — a live redesigned homepage, a clear growth plan, and ads ready to run. The prospect sees their own brand, elevated. That's the close.

---

## The GhostBuild Workflow

### Phase 1 — Hunt
Find a target business whose website is underperforming. Signals to look for:
- Outdated design (pre-2020 visual language)
- Weak or absent CTA hierarchy (more than 3 "Contact Us" links = red flag)
- Placeholder or lorem ipsum text still visible
- Keyword stuffing in headings (SEO desperation)
- No real testimonials / social proof
- Generic stock photos with no brand personality
- No urgency triggers or conversion mechanics
- Mobile experience broken or clunky
- Content not converting — vague copy, features not benefits, no emotional hook

Good hunting grounds:
- Local service businesses (education, clinic, real estate, legal, finance)
- Businesses running Google/Meta ads that land on a terrible page (wasted spend = easy sell)
- LinkedIn-active founders with no real web presence
- Referrals from existing clients in adjacent industries

---

### Phase 2 — Setup, Logo + Image Download
When a client URL is given:

1. Create the client folder at `clients/[slug]/website/` using the Next.js project scaffold
2. Download the logo — find the logo image URL from their HTML, save to `public/logo/`
3. Download all existing site images — hero images, team photos, office shots, any visual — save to `public/images/` with clear names (`hero.jpg`, `team-1.jpg`, etc.)
4. If any download fails, note the URL in `notes.md` and ask the team to drop the file in the correct folder
5. After downloading, assess each image: keep and use, use but flag for replacement, or skip and write a generation prompt. All prompts go into `image-prompts.md`

---

### Phase 3 — Logo Colour + Font Identification

**Colours (keep it simple, no brand system):**

Look at their logo and current site, extract:
- What colours appear in the logo (list hex or approximate values)
- What colour is used for their primary button on the current site

Present to the team:
> "Their logo uses [colour A] and [colour B]. Their current button colour is [colour C].
> What colour do you want for the website? We suggest [suggestion based on logo] or direct us."

Wait for confirmation. That confirmed colour is the palette. Do not decide fonts, visual language, or brand personality here.

**Fonts:**

Identify the fonts used on their current website (check CSS, Google Fonts links, or @font-face declarations). Then ask:
> "Their current site uses [Font Name]. Do you want to keep this font or switch to something else?"

- If they want to keep it and it is a Google Font: load it via `next/font/google` — no file needed.
- If they want to keep it and it is a custom or paid font: ask them to download the font files (`.woff2` preferred, `.woff` as fallback) and place them in `clients/[slug]/website/public/fonts/`. Tell them the exact path before building.
- If they want a different font: confirm the new font name, then proceed as above.

Font files folder: `clients/[slug]/website/public/fonts/[font-name]/`
Load custom fonts via `@font-face` in `globals.css` pointing to `/fonts/[font-name]/[file].woff2`.

---

### Phase 4 — Reference Website (Ask Before Building)

Always ask before building:
> "Please share 1–3 reference websites whose design you want us to closely follow."

**Critical rule:** The reference website is the design blueprint. We are NOT creating an original design — we are **adapting the reference layout, spacing, component patterns, and visual language** to the client's content and colours. The goal is to produce a site that looks like a natural version of the reference, not something original inspired by it.

When references are given:
1. Fetch and analyse the reference site thoroughly
2. Document: layout structure, section order, typography scale, spacing rhythm, card patterns, how each section is visually distinct
3. Rebuild in that exact pattern — the client's logo, their confirmed colour, and our improved content get fitted into that reference design
4. If the reference uses large dark hero → we use large dark hero. If it uses grid card sections → we use grid card sections. Follow the reference closely.

---

### Phase 5 — Content Analysis (Before Writing a Line)

Before writing any page copy, audit the client's current website content:
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

This becomes a section of the pitch deck — showing the client exactly what was wrong and what we fixed.

---

### Phase 6 — Build (The Ghost Work)
With logo ✓, colour confirmed ✓, reference analysed ✓, content audit done ✓:

1. **Redesigned homepage** — Next.js + Tailwind CSS + Three.js
   - Use the actual client logo (never a text placeholder)
   - Design closely follows the reference site's layout and visual language
   - Three.js background tailored to their industry (see guidelines below)
   - Use their existing images where they convert; suggest Gemini prompts where they don't
   - All content is from the content audit — our rewritten, conversion-optimised version

2. **Pitch deck content** (`pitch-deck.md`) — documents every content change: original → new → why

3. **Ad copy** (`ads/ad-copy.md`) — 3 Meta variants + 2 Google Search campaigns

---

### Phase 7 — Pitch
Deploy to Vercel. Send cold outreach with the live link as the closer.

### Phase 8 — Follow-Up
Single follow-up on day 5. Never send a third message.

---

### Deleting a Client
When instructed to delete a client:
- Remove the entire `clients/[slug]/` folder
- Do NOT remove anything from `skill.md`, `templates/`, or `.claude/`
- Commit the deletion with message: `ghostbuild(remove): delete [slug] client data`

---

## Tech Stack

| Layer | Tech | Why |
|-------|------|-----|
| Framework | Next.js 15 (App Router) | Fast, SEO-ready, easy Vercel deploy |
| Styling | Tailwind CSS v4 | Rapid, consistent, team-readable |
| Animation / 3D | Three.js | Visually stunning backgrounds |
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
        Hero.tsx           ← Three.js canvas lives here
        [sections].tsx
      lib/
        globe.ts           ← Three.js scene logic
    package.json
    next.config.ts
    tailwind.config.ts
    tsconfig.json
  audit.md                 ← Website audit and scores
  content-audit.md         ← Content before/after with reasoning
  image-prompts.md         ← AI generation prompts for every image needing replacement
  brand.md                 ← Logo colours + confirmed website colour + confirmed font
  pitch-deck.md
  ads/
    ad-copy.md
  notes.md
```

---

## Three.js Background Guidelines

Match the Three.js scene to the client's industry:

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

## Colour Confirmation Process (Phase 3 in Detail)

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

---

*Update this file every time you discover a better pattern. Bump the version.*
