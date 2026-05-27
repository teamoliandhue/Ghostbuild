# Progress — havai

**Status:** review-pending
**Last updated:** 2026-05-27 11:05
**Client URL:** https://www.havai.in

## Confirmed
- Logo downloaded: yes (2500x2500 PNG, transparent)
- Images downloaded: 18 in public/images/ (5 hero banners, 10 category tiles, 3 product shots)
- Logo colours: #465299 (deep blue-purple, brand primary), #ffb503 (yellow accent — used in current site buttons/highlights), #EDD618 (warmer yellow variant)
- Website colour direction: dark hero (navy #0F1530) + light off-white #FAFAFA body, navy #465299 on CTAs, yellow #FFB503 sparingly on sale badges. Full token list in brand.md.
- Font: Inter (via next/font/google), weights 400/500/600/700/800.
- Reference sites: havinic.webflow.io — see reference-analysis.md.
- Content audit: complete (content-audit.md).

## Awaiting from team
- None right now.

## Next action
Scaffold Next.js project (package.json, tsconfig, tailwind, globals.css, layout.tsx), then build components in order: Nav → Hero → Categories → WhyHavai → FeaturedProducts → Testimonials → FAQ → Newsletter → Footer.

## Files done
- package.json, tsconfig.json, next.config.ts, postcss.config.mjs, next-env.d.ts
- src/app/globals.css, src/app/layout.tsx
- src/lib/useReveal.ts
- src/components/Nav.tsx (AnnouncementBar + Nav exported)
- src/lib/airflow.ts (new Three.js animation — Airflow Streams)
- src/components/Hero.tsx (dark hero with airflow bg, product card right)
- src/components/Categories.tsx (8-tile category grid w/ reveal)
- src/components/WhyHavai.tsx (split: pitch + 4 reason cards)
- src/components/FeaturedProducts.tsx (3 product cards w/ Arizona 9, 8X Flo Pro, BLDC Pedestal)
- src/components/Testimonials.tsx (3 outcome-led quotes + bulk CTA strip)
- src/components/FAQ.tsx (6 inline FAQs covering conversion blockers)
- src/components/Newsletter.tsx (lead magnet + call/whatsapp card)
- src/components/Footer.tsx (4 link cols, social, legal)
- src/app/page.tsx (all sections wired)
- npm install + next 15.5.18 (security patch from 15.0.3)
- Build verified: `next build` passes (4 static pages, 236 kB first load)
- Em-dash scrub: 14 violations removed across 7 files
- Visual verified via inspect: Hero #0F1530 navy + Inter, body #FAFAFA, WhyHavai #E4E7F4, Testimonials/Footer #0F1530
- Hero screenshot confirmed visually

## Currently writing
- pitch-deck.md + ads/ad-copy.md

## Notes
- Site is on Shopify (theme: built-in, with Zecpe checkout overlay). Catalogue: air coolers, BLDC pedestal/wall/tower/ceiling fans, mist fans, exhaust fans, ergonomic chairs, iron boards, cloth drying stands, spares. Positioning line on current site: "Your one-stop destination for powerful, energy-saving commercial BLDC fans."
- Current site visual issues to address in audit: stacked auto-rotating hero banners with no copy, generic "SHOP BY CATEGORY" headline, 4-bar trust strip with tiny icons, no clear hero CTA, no benefit-led copy on the homepage, no testimonials block above the fold, no warranty/installation messaging despite their 2-yr on-site warranty product spec.
- Logo is square format with the "HAVAI" wordmark — works on both dark and light bg.
