# GhostBuild Skill
**By Oli & Hue** — Version 1.0

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

Good hunting grounds:
- Local service businesses (education, clinic, real estate, legal, finance)
- Businesses running Google/Meta ads that land on a terrible page (wasted spend = easy sell)
- LinkedIn-active founders with no real web presence
- Referrals from existing clients in adjacent industries

### Phase 2 — Audit
For each target, produce an `audit.md` with:
- **Business snapshot** — what they do, who they serve, geography
- **Current site score** — design, content, conversion, SEO (rate each /10)
- **Top 5 problems** — specific, named, with evidence
- **Opportunity statement** — what's possible if fixed
- **Competitive gap** — how they compare to top 2 competitors

### Phase 3 — Build (The Ghost Work)
Without any client contact, build:
1. **Redesigned homepage** (`homepage/index.html`) — pixel-sharp, conversion-focused, fully responsive. Built in vanilla HTML/CSS/JS so anyone on the team can open and view it without a build step.
2. **Pitch deck content** (`pitch-deck.md`) — slide-by-slide copy and structure, ready to drop into a deck tool (Notion, Slides, Figma).
3. **Ad copy** (`ads/ad-copy.md`) — 3 Meta ad variants + 1 Google Search ad, ready to run.

### Phase 4 — Pitch
Send a cold outreach (email or LinkedIn DM) with:
- Subject line that hooks on their specific pain
- 2-sentence personalised opener
- Link to the live preview of their redesigned homepage (hosted on Vercel)
- A brief growth plan summary
- One clear next step (15-min call booking link)

No deck attached to cold outreach. The live homepage IS the deck.

### Phase 5 — Follow-Up (if no response in 5 days)
Send a single follow-up referencing a specific improvement from the redesign. Keep it under 4 lines. Never send a third message — if they don't respond, move on.

---

## Repository Structure

```
Ghostbuild/
  skill.md                  ← This file. The playbook.
  templates/
    audit-template.md       ← Blank audit for new clients
    pitch-deck-template.md  ← Blank pitch deck structure
    ad-copy-template.md     ← Blank ad copy framework
    outreach-email.md       ← Cold email / DM templates
  clients/
    [client-slug]/
      audit.md              ← Phase 2 output
      pitch-deck.md         ← Phase 3 output
      homepage/
        index.html          ← The rebuilt homepage
        style.css           ← Extracted styles (if needed)
        assets/             ← Images, icons
      ads/
        ad-copy.md          ← Phase 3 output
      notes.md              ← Team notes, client status, follow-up log
```

---

## Homepage Redesign Standards

Every GhostBuild homepage must follow these rules:

### Structure (in order)
1. **Nav** — Logo, 3 max nav links, one CTA button (not "Contact Us")
2. **Hero** — Headline (problem-aware, outcome-focused), subheadline, primary CTA, trust signal beneath fold
3. **Social Proof Strip** — logos, numbers, or a single powerful quote
4. **Problem → Solution** — Name their pain, show the fix
5. **Services** — 3–4 max, with outcomes not features
6. **How It Works** — 3-step process (makes them feel in control)
7. **Testimonials** — Real quotes with photo, name, city, outcome
8. **FAQ** — 4–6 questions addressing conversion blockers
9. **Final CTA** — Repeated but reworded, with urgency

### Design Rules
- Max 2 primary fonts
- Max 3 brand colors + 1 accent
- Every CTA button has a specific action verb (not "Submit" or "Contact")
- Mobile-first build
- No stock photos in hero — use abstract shapes, gradients, or real client imagery placeholder
- All text passes WCAG AA contrast minimum

### Content Rules
- Hero headline: specific outcome, not "welcome to" or "best [service] in [city]"
- Every service description ends with a benefit, not a feature
- Numbers are specific: "87% visa approval rate" not "high success rate"
- One primary CTA per section
- CTAs use time/action framing: "Book a free 15-min call →" not "Get in touch"

---

## Pitch Deck Structure (8 slides)

1. **The Gap** — Their current site vs. what's possible (screenshot comparison)
2. **What We Found** — Top 3 specific problems with their site (data-backed)
3. **The Redesign** — Showcase the rebuilt homepage
4. **The Growth Plan** — 90-day roadmap: website → SEO → ads → conversion
5. **Ads Preview** — 2 sample ad creatives ready to run
6. **Results We've Driven** — Oli & Hue case study or relevant metric
7. **What It Costs** — Transparent, tiered options
8. **Next Step** — Single CTA: book a call

---

## Ad Copy Framework

### Meta (Facebook / Instagram)
- **Hook** (first 3 words stop the scroll)
- **Pain line** (name the exact problem)
- **Proof** (one specific number or testimonial fragment)
- **CTA** (link to landing page, not homepage)

### Google Search
- Headline 1: Target keyword + outcome
- Headline 2: Differentiator or trust signal
- Headline 3: CTA with action verb
- Description: Problem + solution + urgency

---

## Team Contribution Guide

When you pick up a GhostBuild client:
1. Create `/clients/[slug]/` folder
2. Copy and fill `templates/audit-template.md` → `audit.md`
3. Build the homepage first — let the design decisions inform the deck
4. Fill `pitch-deck.md` using what the homepage establishes
5. Write ad copy last — it should reflect the homepage's primary CTA
6. Add a `notes.md` with: date started, team member name, current status, any research notes

Commit your work with the prefix: `ghostbuild([client-slug]): [what you did]`

Example: `ghostbuild(globalnexs): add homepage redesign and audit`

---

## Skill Upgrade Log

| Version | What Changed |
|---------|-------------|
| 1.0 | Initial skill — workflow, standards, globalnexs first client |

---

*This file grows with every GhostBuild. If you discover a better outreach hook, a smarter homepage pattern, or a faster audit method — update this file and bump the version.*
