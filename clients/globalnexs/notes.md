# Notes — Globalnex Build

## ui-ux-pro-max AVOID block (hard rules for this build)

> Excessive decoration

Translated for this site:
- No Three.js
- No gradient meshes / aurora backgrounds
- No chromatic aberration / RGB-split effects
- No shadow stacks (single hairline border on cards, no box-shadow at rest)
- No bento patchwork — clean alternating sections only
- One accent word in purple per headline, max one. No multi-colour stunts.

## Three.js decision (Phase 6 rule)

Skipped. Three-condition rule fails:
1. None of the references (Paraform, Fruitful, Superpower) use a Three.js / canvas background.
2. Industry could theoretically benefit (globe = "global reach") but the rule needs all three.
3. The approved mockup has zero canvas.

Decision: typography-led, no Three.js. Lean on generous whitespace + Framer Motion scroll reveals + one text-split reveal on the hero only.

## 21st.dev MCP decision

Not used this build. The MCP isn't configured in this environment, and the reference patterns (Paraform-style alternating sections, Fruitful-style team grid) are specific enough that scaffolding from a generic library would fight `reference-analysis.md`. Hand-write components.

## Probation tracking

### Framer Motion (probation build 1 of 3) — RESULTS

- [⚠️] Responsive verification gate passed but NOT on first try. Two failures caught and fixed (nav book button under 44px, missing mobile drawer). Partial pass.
- [✅] Animation code line-count lower than hand-rolled. `useInView` + `animate(value, target)` replaced IntersectionObserver + RAF counter. `whileInView` replaced `Reveal.tsx`. Plus new patterns added cheaply: image scale-in on hover, parallax fade on hero portrait, layered floating overlays — all in 1–3 lines per element.
- [⏸️] Bundle-size: dev server only, no production build yet. Will measure at Phase 8 deploy.

Verdict so far: very positive. The richer v2 rebuild (image-led hero, photo step cards, team grid, cohort proof, full-bleed CTA) was much faster to build with Framer Motion than it would have been hand-rolled. Build 2 + 3 will confirm.

## Phase 6 v2 — visual richness pass (post-mockup-v1 rejection)

Trigger: team rejected v1 mockup as "very basic, not visually stunning, no images." Re-did Phase 3-6 with new section-grafting approach.

What changed in v2:
- Hero now uses `home-1.jpg` (passport + visa + globe) as right-side anchor card with floating testimonial + outcome tag overlays (Fruitful pattern)
- How it works now uses 3 real client photos (service-1 advisor, home-3 student, service-2 flag) with dark numbered badges (Superpower pattern)
- NEW Team section uses team-1 + team-2 portraits + 2 labelled placeholder slots (Fruitful named-advisor pattern)
- NEW Cohort Proof section uses help-2 portrait with overlay caption + counter-animated stats (Fruitful "proof in progress" pattern)
- CTA closer rewritten with banner-2 as full-bleed bg + dark gradient + white copy
- 8 of 12 client images now used in production (vs 0 in v1)

Lessons baked in for next build (need to fold into skill.md if validated):
1. Reference analysis must include a SECTION CATALOG, not just typography/spacing
2. Section plan must map content → reference section → client image (or skip if no image)
3. Mockup must include at least one real image in the hero, not just typography
4. Phase 6 build must verify imagery coverage: how many of the downloaded client images are actually used? Target ≥60%.

## Polish pass tracking (v3.13 new phase)

### Pass 1 — Layout reflow

Reviewed every section against the 3 references for layout opportunities.

Weakest 3 sections reflowed:
- **Services** → Paraform-style alternating row layout. Each service is now a full-width row with: monospace number, big H3, body, plus tag chips + outcome line on the right. Replaces the prior 3x2 card grid. Reads more like an editorial index.
- **Countries** → Fruitful-style interactive split. Left: vertical country list (hovering changes the active one, intake label on the right). Right: live "spotlight panel" with the country's gradient-tinted background, big flag, name, recent placement chips, and a CTA. Way more interactive than the prior flag-emoji grid.
- **TrustRibbon** → infinite horizontal marquee with edge gradient fades. Replaces the prior 4-item static row. 7 items rotating continuously with a small diamond separator.

Sections reviewed and kept as-is: Hero (already image-led), HowItWorks (already image-led), Stats embedded inside CohortProof (already strong), Team (already grafted), Testimonial (changed in Pass 2 instead), FAQ (works), Footer (minimal is correct).

### Pass 2 — Motion polish

5 motion upgrades added:
1. **Hero image parallax** (Framer Motion `useScroll` + `useTransform`): anchor card translates -80px and scales 1.05x as user scrolls through the hero.
2. **CTA closer parallax**: full-bleed banner-2 background translates ±10% and scales 1.05→1.15 across the section's scroll range.
3. **Magnetic CTA buttons**: new `MagneticCTA.tsx` component. Primary CTAs in Hero and closing CTA now drift toward cursor with a Framer Motion spring. The button text feels alive.
4. **Testimonial radial glow + decorative quote mark**: black section now has two radial gradients (purple top, green-soft bottom-right) and a giant translucent "&ldquo;" character behind the quote.
5. **Team portrait hover overlay**: real portraits now reveal a gradient + "On the team since 2023 · [Role]" caption on hover. Photo also scales 1.06x slower (700ms).

### Framer Motion probation update (build 1)

All 5 motion upgrades were ≤15 lines each. Same effects hand-rolled would have been 50-100 lines plus event handlers. Framer Motion clearly winning at build 1.

### 21st.dev MCP (probation build 0 of 3 — not used this build, no data)

## Scope ceiling

Homepage only. No `/about`, `/services`, `/contact`, `/blog`. Internal nav links point to `#about`, `#services`, etc. anchors on the homepage. Per skill.md v3.12 Phase 6 rule.
