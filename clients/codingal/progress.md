# Progress — codingal

**Status:** review-pending
**Last updated:** 2026-06-04 21:30
**Client URL:** https://www.codingal.com

## Confirmed
- Logo downloaded: yes (logo.svg, penguin + wordmark)
- Images downloaded: 26 in public/images/ (11 course cards, 6 student projects, 5 student avatars, teachers, 2 dashboards, hero photo)
- Website colour direction: coral #F9543B + warm cream #FBF6EE, bright multi-colour course cards (brand.md)
- Font: Fraunces (display serif) + DM Sans (body), via next/font/google
- Reference sites: UX = Coursera Plus; UI = Edukids/Khan/Synapse/Preply/CodeQuest (uploaded)
- Pricing: directional plan cards on page (team confirmed)
- Content audit: complete (content-audit.md)
- Website audit: complete (audit.md, overall 5.0/10)

## Awaiting from team
- Confirm pricing amounts ($59/$109/$149 indicative)
- Real teacher names/details (placeholders used with real photos)
- Compress course/teacher images before launch (some 2-3 MB)

## Next action
Iterative design polish complete (see v3 log below). Build verified clean. Next: write pitch-deck.md + ads/ad-copy.md, then Phase 7 post-build review, then deploy to Vercel.

## Files done
- All config (package.json, tsconfig, next.config, postcss, next-env, .gitignore)
- src/app/globals.css (coral/cream tokens), src/app/layout.tsx (Fraunces + DM Sans)
- src/lib/useReveal.ts, src/lib/useCountUp.ts
- src/components: RevealInit, Nav, Hero, TrustStrip, HowItWorks, Courses, ClassPreview, Projects, Teachers, TrustSection, Pricing, FAQ, FinalCTA, Footer
- src/app/page.tsx (all sections wired)

## Currently writing
- (none)

## Build verification status — VERIFIED
- No Node on machine, so installed portable Node 20.18.0 at /tmp/nodejs/node-v20.18.0-darwin-arm64 (network was available). NOTE: /tmp may clear on reboot; team should install Node properly for ongoing work.
- npm install OK (47 pkgs). Patched Next 15.5.4 -> 15.5.19 (CVE-2025-66478, same advisory Havai hit).
- `next build` PASSES: compiled in 4.7s, types + lint clean, 4 static pages, homepage 111 kB first load, zero errors.
- Dev server runs (managed preview config "codingal-dev" in .claude/launch.json, port 3100).
- Visual pass done via preview screenshots: hero (Fraunces serif + coral "in week one" + squiggle, penguin logo, teacher cluster), trust strip, how-it-works (coloured step badges), courses grid (9 real course images, grade + level badges, Try free CTA) all render correctly. Pricing confirmed via DOM (3 plans, featured coral card). Reveals fire, palette + fonts correct.
- To run locally (with Node on PATH): cd clients/codingal/website && npm install && npm run dev

## Restyle v2 — Synapse neo-brutalist pastel (2026-06-04) — DONE + VERIFIED
- Team requested restyle to the "Synapse" reference (kept all layout + copy).
- Changed: globals.css (new pastel tokens + .card-out/.btn/.chip outline system w/ hard offset shadows), layout.tsx (Fraunces+DM Sans -> Plus Jakarta Sans), all 14 components retargeted (black 2px outlines, hard shadows, pastel fills, sticker buttons, outlined badges/checks). Dark trust band -> lavender band w/ white outline stat tiles. Dark footer -> cream footer w/ black top border.
- `next build` PASSES clean (4 static pages, 111 kB, zero errors). Visual pass confirmed via preview: hero sticker buttons, pricing pastel cards (mint/coral) w/ MOST POPULAR pill, step badges, all correct. Computed styles confirm Plus Jakarta Sans + hard `4px 4px 0` shadows.
- brand.md updated: v2 current, v1 superseded.

## Iterative polish v3 (2026-06-04) — DONE + BUILD VERIFIED
- Headline font switched back to Fraunces serif (display) + DM Sans body (team picked "warm serif"); layout.tsx + globals .font-display updated.
- Hero: inline student photo in headline ("Your child [photo] writes..."); replaced teacher-cluster with hero-illustration.svg (kids/coding 3D, from /Downloads, static, ~380px); added floating teacher cards in the 4 CORNERS around it (Sara L./Rahul M./Daniel K. + live badge) — illustration kept original size, cards in corner whitespace, not over the figure.
- Courses: added client-side LEVEL filter (All/Beginner/Intermediate/Advanced pills + counts); replaced all 9 course images with team's screenshots from "clients/codingal/course images/" (mapped by mtime order 1-9). NOTE images are 0.5-3MB screenshots w/ cropped Unsplash+ watermark — compress + license before launch.
- Class preview ("Inside a class"): rebuilt as Week 1/4/8 vertical stepper (active step expands, double-ring dot + connector line) + tools row + dashboard preview. Then content unchanged per request.
- Teachers: collage mosaic (photos + emoji accent circles ⭐✏️✈️🚀 + Top 1% tile) using 6 real teacher photos in public/images/teachers/ (teacher-1..6.jpg from /Downloads unsplash portraits). Names/subjects are PLACEHOLDERS.
- Projects: rebuilt as kanban board (Beginner/Intermediate/Advanced columns) of FOLDER-shaped cards using Vector 1636.svg outline (inline SVG, non-scaling-stroke + drop-shadow hard shadow). Card = grade tab (no flag icon), thumbnail, title, INITIAL avatar (first letter), date, desc, "N files" + tags. Exact structure from reference card. files counts + student names are placeholders.
- next build PASSES clean (6.9s, 4 static pages, homepage 115 kB, 0 errors).
- WARNING: portable Node at /tmp/nodejs got partially wiped (npm broken; node still works). Build run via `node node_modules/next/dist/bin/next build`. Team should install Node properly.

## Remaining for full GhostBuild
- pitch-deck.md (8 slides) — NOT yet written
- ads/ad-copy.md (3 Meta + 2 Google) — NOT yet written
- Replace placeholder teacher names + project file counts/students with real data
- Compress + license images (course screenshots, teacher portraits)
- Phase 7 post-build review
- Deploy to Vercel

## Notes
- Phase 1 research complete, saved in research.md.
- IMPORTANT: screenshots shared are a REDESIGN MOCKUP (coral palette, "Your child writes their first real program in week one"), NOT the live site (live = teal, "Top-rated online programming..."). Audit doc describes the LIVE site.
- Audit + screenshots have an internal contradiction: audit says move trust LATER / product EARLIER, but mockup places a heavy stats+trust bar immediately after hero.
- Codingal = K-12 online coding/AI classes. 1M+ students, 135 countries, YC/Google/Amazon backed, penguin mascot (Cody).
- Key gaps I flagged: pricing fully gated, no "what a class looks like" preview, project showcase dropped from mockup, stats lack context (no review counts), mobile-specific findings missing despite "Mobile Web" scope.
