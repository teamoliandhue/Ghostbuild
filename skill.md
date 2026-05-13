# GhostBuild Skill
**By Oli & Hue** — Version 2.0

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

1. **Create the client folder** at `clients/[slug]/website/` using the Next.js project scaffold (see Tech Stack section below)
2. **Download the logo** — find the logo URL from their HTML source, download to `clients/[slug]/website/public/logo/`. If download fails, create the folder structure and ask the team to manually place the logo there before building.
3. **Grab existing images** — identify images they're using (hero, team, office) and note their URLs. Download usable ones to `public/images/`.

---

### Phase 3 — Brand Analysis (Ask Before Building)
Before touching a single component, run a brand analysis and present it to the team. This ensures the redesign elevates their identity, not erases it.

Produce a `brand.md` file and present a summary covering:

**A. Logo Colour Extraction**
- What are the exact colours in their logo? (primary, accent, supporting)
- What emotion/feeling do those colours convey?

**B. Current Website vs. Brand Alignment**
- Does the current website's colour palette match the logo?
- Are the fonts consistent with the brand personality?
- Is the visual language (photography style, illustration, iconography) coherent?
- Score: Aligned / Partially Aligned / Misaligned

**C. Proposed Brand System for Redesign**
- Primary colour (from logo or elevated version)
- Secondary/surface colour
- Accent colour
- Typography pairing (heading + body)
- Visual language direction (e.g., "premium dark mode with gold accents", "clean white with bold navy")
- Three.js background concept suggestion (e.g., "slow-rotating globe mesh for a global education consultancy")

**Then ask:**
> "This is our brand analysis. We're proposing [X brand direction]. Do you want to go with this, adjust anything, or do you have a different direction in mind?"

---

### Phase 4 — Reference Website (Ask Before Building)
Before building, always ask:
> "Before we start building, please share 1–3 reference websites whose design, feel, or layout you want us to draw inspiration from. This gives us a clear visual direction."

Wait for references. Fetch them, extract what's being borrowed (layout patterns, animation style, section structure, colour mood), and document in `brand.md`.

---

### Phase 5 — Build (The Ghost Work)
With logo ✓, brand direction approved ✓, references reviewed ✓ — build:

1. **Redesigned homepage** — Next.js + Tailwind CSS + Three.js
   - Use the actual client logo (never a text placeholder)
   - Three.js background tailored to their domain/industry
   - Use their existing images where they work; suggest Gemini prompts for replacements where they don't
   - Every section has enough content — no thin sections
   - Content is conversion-engineered (see Content Standards below)

2. **Pitch deck content** (`pitch-deck.md`) — documents exactly what changed, why, and the expected impact

3. **Ad copy** (`ads/ad-copy.md`) — 3 Meta variants + 2 Google Search campaigns

---

### Phase 6 — Pitch
Deploy to Vercel. Send cold outreach with the live link as the closer.

### Phase 7 — Follow-Up
Single follow-up on day 5. Never send a third message.

---

## Tech Stack

Every GhostBuild website is built with:

| Layer | Tech | Why |
|-------|------|-----|
| Framework | Next.js 14 (App Router) | Fast, SEO-ready, easy Vercel deploy |
| Styling | Tailwind CSS | Rapid, consistent, team-readable |
| Animation / 3D | Three.js | Visually stunning backgrounds tailored to client domain |
| Language | TypeScript | Type safety for team contributions |
| Fonts | Google Fonts (via next/font) | Performance-optimised font loading |
| Images | next/image | Optimised delivery, proper sizing |

### Project Structure
```
clients/[slug]/
  website/
    public/
      logo/
        logo.png        ← Client logo (always present before build starts)
        logo.svg        ← SVG version if available
      images/           ← Client's existing images + any new assets
    src/
      app/
        layout.tsx      ← Root layout, fonts, meta
        page.tsx        ← Homepage (assembled from components)
        globals.css     ← Tailwind base + CSS variables
      components/
        Nav.tsx
        Hero.tsx        ← Includes Three.js canvas
        TrustStrip.tsx
        Problem.tsx
        Services.tsx
        HowItWorks.tsx
        Testimonials.tsx
        FAQ.tsx
        CTA.tsx
        Footer.tsx
      lib/
        three-scene.ts  ← Three.js scene setup and animation logic
    package.json
    next.config.ts
    tailwind.config.ts
    tsconfig.json
  audit.md
  brand.md             ← Brand analysis + approved direction
  pitch-deck.md
  ads/
    ad-copy.md
  notes.md
```

---

## Three.js Background Guidelines

Match the Three.js scene to the client's domain:

| Industry | Three.js Concept |
|----------|-----------------|
| Study abroad / Education | Slow-rotating wireframe globe, particle constellations |
| Real estate | Geometric low-poly landscape, subtle grid |
| Healthcare / Clinic | Soft particle drift, DNA helix (subtle, bg only) |
| Finance / Fintech | Flowing graph lines, data streams |
| Legal | Minimalist floating planes, dark and authoritative |
| Fashion / Retail | Abstract colour blobs, fluid simulation |
| Tech / SaaS | Grid with floating nodes, neural network mesh |

Rules:
- Always runs at 30fps or lower (performance)
- Never competes with the headline — always subtle, bg layer
- Dark scenes: lower opacity (0.15–0.3 on mesh)
- Light scenes: very low opacity or monochrome
- Must be pausable on `prefers-reduced-motion`

---

## Homepage Structure (Required Sections)

Every build must include all 9 sections. No thin sections — each must have enough content to stand alone.

1. **Nav** — Logo (actual file), max 4 nav links, one specific CTA button
2. **Hero** — Three.js bg, outcome-led headline, sub-copy, primary + secondary CTA, 3 trust signals
3. **Trust Strip** — logos, partner names, or key numbers
4. **Problem → Solution** — name the pain, show the fix, structured as 2-column dark section
5. **Services** — 3–6 cards, each with icon, title, body, and a green outcome line
6. **How It Works** — 3 steps with numbered connector line
7. **Testimonials** — 3 real-feeling quotes with name, role, outcome
8. **FAQ** — 6 questions addressing the real conversion blockers for their industry
9. **Final CTA** — urgency signal, 2 buttons (primary + secondary), trust line
10. **Footer** — links grouped by category, contact info, copyright

---

## Content Standards (Most Important)

Weak content kills conversions even on a beautiful site. Every section must pass these checks:

**Headlines**
- Never "Welcome to [Brand]" or "Best [service] in [city]"
- Always outcome-first or problem-aware
- Specific beats vague: "Land your UK visa in under 21 days" > "Fast visa processing"

**Body Copy**
- Lead with the user's problem, not the company's features
- Every service description ends with a benefit, not a feature
- Numbers are specific with context: "92% visa approval rate across 200+ applications" not "high success rate"

**CTAs**
- Action verb + specific outcome: "Book Your Free Assessment →" not "Submit"
- One primary CTA per section
- Vary the wording across sections — never repeat the same button copy twice

**Social Proof**
- Testimonials name the specific outcome, not just "great service"
- Include: person's name, what they achieved, where they are now
- Trust signals anchor to real numbers

**Conversion Blockers (always addressed in FAQ)**
- Pricing / hidden fees
- What happens if something goes wrong
- Timeline / how long does it take
- Minimum requirements / eligibility
- Comparison to doing it alone / competitors
- First step / what happens when I book

**Pitch Deck Documentation**
For every content improvement, `pitch-deck.md` must include:
- What the original said
- What we changed it to
- Why (conversion principle behind the change)

---

## Image Strategy

1. **Use their existing images** where they work — it makes the preview feel real and personalised
2. **Flag bad images** — if a hero image is stock or low quality, note it in `brand.md` and suggest a Gemini prompt to generate a replacement:

```
Gemini prompt format:
"[Style]: [subject], [setting], [mood], [technical spec]"

Example: "Photorealistic: confident young Indian student at a UK university campus, 
golden hour lighting, aspirational and warm mood, wide angle, high resolution, 
no text overlays"
```

3. **Never use placeholder images** in the pitch preview — always something real or AI-generated

---

## Brand Analysis File Structure (`brand.md`)

```markdown
# Brand Analysis — [Client Name]

## Logo Colours
- Primary: #XXXXXX ([name] — [emotion])
- Accent: #XXXXXX ([name] — [emotion])
- Supporting: #XXXXXX

## Current Site vs Brand Alignment
Score: Aligned / Partially Aligned / Misaligned
[Explanation]

## Proposed Brand System
- Primary: #XXXXXX
- Secondary: #XXXXXX
- Accent: #XXXXXX
- Surface/BG: #XXXXXX
- Heading font: [font name + weight]
- Body font: [font name + weight]
- Visual language: [description]
- Three.js concept: [description]

## Reference Sites
- [URL 1] — borrowing: [what specifically]
- [URL 2] — borrowing: [what specifically]

## Status
[ ] Pending team approval
[ ] Approved — build can begin
```

---

## Team Contribution Guide

When you pick up a GhostBuild client:
1. Get the URL from the team
2. Create `clients/[slug]/` and run the Next.js scaffold
3. Download the logo — if it fails, create the folder and note it in `notes.md`
4. Run brand analysis → write `brand.md` → present to team for approval
5. Ask for reference websites → add to `brand.md`
6. Get approval, then build
7. Fill `pitch-deck.md` — document every content change with original → new → why
8. Write ad copy last

Commit prefix: `ghostbuild([slug]): [what you did]`
Example: `ghostbuild(globalnexs): add Next.js scaffold and brand analysis`

---

## Skill Upgrade Log

| Version | What Changed |
|---------|-------------|
| 1.0 | Initial skill — workflow, standards, globalnexs first client (vanilla HTML) |
| 2.0 | Upgraded to Next.js + Tailwind + Three.js; added brand analysis phase; added reference-first workflow; image strategy with Gemini prompts; content standards with before/after pitch documentation; team structure guide |

---

*This file grows with every GhostBuild. Update it every time you discover a better pattern, hook, or standard. Bump the version number.*
