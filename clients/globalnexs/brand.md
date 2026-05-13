# Brand Analysis — GlobalNexs International

## Logo Colours (extracted from logo.png)
- **Primary:** Deep Navy `#0A2558` — Authority, trust, global ambition
- **Accent:** Vibrant Orange `#FF6B2B` — Energy, action, warmth (used on the "S" in GLOBALNEXS)
- **Globe Blue:** Medium Blue `#1B6AC9` — International reach, openness
- **Supporting:** White — Clean, aspirational

**Logo personality:** The globe + graduation cap combination communicates global education and aspiration. The navy anchors trust; the orange spark adds urgency and approachability. It's a strong mark — the brand system just hasn't been executed well around it.

---

## Current Website vs Brand Alignment

**Score: Partially Aligned**

What's working:
- The site does use navy and orange (matches logo)
- White background is consistent with the clean logo feeling

What's broken:
- The orange is used inconsistently — sometimes coral, sometimes warm orange — not the same value as in the logo
- Typography is generic (default system or a single sans-serif) — no personality, no hierarchy
- Photography is 100% stock — no visual connection to their actual brand or Kerala context
- The globe motif from the logo is never echoed in the design language of the site
- Spacing and density feel rushed — the design doesn't breathe, so the premium education positioning doesn't land

---

## Proposed Brand System for Redesign

| Token | Value | Use |
|-------|-------|-----|
| `--primary` | `#0A2558` | Nav bg, dark sections, headings |
| `--primary-mid` | `#0D3275` | Cards, hover states |
| `--blue-globe` | `#1B6AC9` | Accents, links, step numbers |
| `--orange` | `#FF6B2B` | CTAs, highlights, the "spark" |
| `--orange-light` | `#FF8C55` | Hover states on orange |
| `--surface` | `#F8FAFC` | Light section backgrounds |
| `--white` | `#FFFFFF` | Cards, primary bg |

**Heading font:** Clash Display or Sora — geometric, confident, global feel
**Body font:** Inter — clean, readable, modern

**Visual language:** "Premium global education" — dark navy hero with a slow-rotating wireframe globe in Three.js that echoes the logo mark directly. Clean white sections with navy accents. Orange used sparingly and deliberately — only on primary CTAs and one hero highlight word.

**Three.js concept:** A slow-rotating low-poly globe wireframe in the hero background — medium blue lines, very low opacity (0.15), subtle particle dots at vertices. As the user scrolls, the globe slowly scales up and fades. This directly mirrors the brand mark and signals "global" without saying it.

---

## Reference Sites
- **https://catalis-temlis.webflow.io/** — borrowing:
  - Italic emphasis on key words inside headings (e.g. "Land Your Seat at the *Right* University")
  - Large stat callouts with breathing room — prominent social proof numbers
  - Repeating small decorative motif used as section accent (we'll use a small globe/spark icon)
  - Alternating two-column layouts for features/problem sections
  - Generous vertical spacing — each section breathes
  - Modern SaaS clarity: no clutter, hierarchy-first

---

## Status
- [x] Brand analysis complete
- [x] Team approved brand direction (navy + orange + globe Three.js, Sora + Inter)
- [x] Reference websites provided and analysed
- [x] Build approved — ready to start
