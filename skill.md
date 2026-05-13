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

### Phase 2 — Setup & Logo Grab
When a client URL is given:

1. Create the client folder at `clients/[slug]/website/` using the Next.js project scaffold
2. Download the logo — find the logo image URL from their HTML, download to `clients/[slug]/website/public/logo/`
3. If download fails, create the folder and ask the team to place it manually before building

---

### Phase 3 — Logo Colour Extract (Keep It Simple)

**This step is ONLY about colour identification — not building a brand system.**

Look at their logo and extract:
- What colours appear in the logo (list the hex or approximate values)
- What colour is used for their primary button on the current site

Then present exactly this to the team:
> "Their logo uses [colour A] and [colour B]. Their current button colour is [colour C].
> These are the only brand elements we're locking in.
> What colour do you want for the website? We can go with [our suggestion based on logo] or you can direct us."

Wait for the answer. Whatever colour direction the team confirms — that becomes the website palette. Do not impose a full brand system. Do not decide font pairings, visual language direction, or "brand personality" at this step. Just confirm the website colour.

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
        logo.png          ← Client logo (must exist before build starts)
      images/             ← Client's existing images + new assets
    src/
      app/
        layout.tsx
        page.tsx
        globals.css
      components/
        Nav.tsx
        Hero.tsx          ← Three.js canvas lives here
        [sections].tsx
      lib/
        globe.ts          ← Three.js scene logic
    package.json
    next.config.ts
    tailwind.config.ts
    tsconfig.json
  audit.md                ← Website audit
  content-audit.md        ← Content before/after with reasoning
  brand.md                ← Logo colours + confirmed website colour only
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

Every section must pass these checks before build:

**Headlines** — Never "Welcome to [Brand]" or "Best [X] in [City]"
- Outcome-first or problem-aware
- Specific beats vague: "Visa in hand in under 14 weeks" > "Fast visa processing"

**Body copy**
- Lead with the user's problem, not the company's features
- End every service description with a benefit, not a feature
- Numbers always have context: "92% visa approval rate across 200+ applications"

**CTAs**
- Action verb + specific outcome: "Book Your Free Assessment →" not "Submit"
- One primary CTA per section
- Never repeat the same CTA wording twice on the same page

**Social proof**
- Name the specific outcome in every testimonial
- Include: person, what they achieved, where they are now

**FAQ — always addresses these 6 conversion blockers:**
1. Pricing / hidden fees
2. What if something goes wrong
3. How long does it take
4. Minimum requirements / eligibility
5. Why you vs. doing it alone
6. What happens when I book

---

## Image Strategy

1. Use existing client images where they convert
2. Flag poor images in `content-audit.md` with a Gemini prompt:

```
Format: "[Style]: [subject], [setting], [mood], [technical spec], no text overlays"

Example: "Photorealistic: confident young Indian student at a UK university campus,
golden hour lighting, aspirational warm mood, wide angle, high resolution, no text overlays"
```

3. Never use placeholder images in the pitch preview

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

---

*Update this file every time you discover a better pattern. Bump the version.*
