// =============================================================================
// ModernSleek Deck — GhostBuild Stage 3 Starter
// =============================================================================
// Reference example showing how to compose the 8-slide GhostBuild pitch deck
// using the helpers + patterns. This is NOT a runnable file — it is the pattern
// Claude should follow when composing a `use_figma` script for any client.
//
// To actually run a build:
//   1. Paste the contents of helpers.js + the patterns.js functions you need +
//      the build code below into a single use_figma() code block.
//   2. Replace BRAND_HEX with the confirmed website colour from
//      clients/[slug]/brand.md (Phase 3 of Stage 1). Do NOT hard-code.
//   3. Replace every [Placeholder] with content from content-audit.md.
//   4. Execute.
// =============================================================================


/*
==============================================================================
USE_FIGMA SCRIPT TEMPLATE — GhostBuild Stage 3 — copy and adapt
==============================================================================

// ----- 1. Load fonts -----
const desired = [
  {family:'Inter', style:'Regular'}, {family:'Inter', style:'Medium'},
  {family:'Inter', style:'Semi Bold'}, {family:'Inter', style:'Bold'},
  {family:'Source Serif 4', style:'Regular'},
  {family:'Radio Canada Big', style:'Medium'},
];
for (const f of desired) { try { await figma.loadFontAsync(f); } catch(e){} }

// ----- 2. Inline helpers (paste from build/helpers.js) -----
// FN, AF, T, hex, buildColors, eyebrowPill, buildHeaderZone, pageNumber, blackBanner

// ----- 3. Inline ONLY the pattern functions this deck uses -----
// For the 8-slide GhostBuild recipe:
//   buildCoverSlide, buildStatementCards3, buildRoles2Column,
//   buildTimelineQuarters (or buildTimelineWeeks), buildPlatform3Modules,
//   buildPricingTwoTier, buildCtaOptionCards

// ----- 4. Build colors -----
// IMPORTANT: BRAND_HEX must come from clients/[slug]/brand.md.
// Never invent a hex. If brand.md is missing or unclear, stop and ask the team.
const BRAND_HEX = '#XXXXXX';                       // ← paste from brand.md
const C = buildColors(BRAND_HEX);
const TOTAL = 8;

// ----- 5. Get target page (or create one) -----
const page = await figma.getNodeByIdAsync('PAGE_NODE_ID');  // ← REPLACE
// or:
// const page = figma.createPage();
// page.name = '[YYYY-MM-DD] [Client] — Pitch Deck — v1';

// ----- 6. Slide-creation helper -----
function newSlide(name, x) {
  const s = figma.createFrame();
  s.name = name;
  s.resize(1920, 1080);
  s.layoutMode = 'NONE';
  s.fills = [{type:'SOLID', color: C.white}];
  s.clipsContent = true;
  page.appendChild(s);
  s.x = x; s.y = 0;
  return s;
}

// ----- 7. Slide 1 — Cover (The Gap) -----
const s1 = newSlide('Slide 1 — Cover', 0);
buildCoverSlide(s1, {
  eyebrow: 'PITCH DECK · 2026',
  title: '[Client Name]',
  subtitle: '[One-line value prop tailored from the redesign]',
  lockup: '[Client] × Oli & Hue',
  footerMeta: ['Live preview ready', 'Designed in [N] days', 'Built to convert'],
  gradient: true,
}, C);
// (Cover slide intentionally omits page number)

// ----- 8. Slide 2 — What We Found (3 problems from content-audit.md) -----
const s2 = newSlide('Slide 2 — What we found', 2160);
buildStatementCards3(s2, {
  eyebrow: 'What we found',
  headline: 'Three things losing you customers on your current site.',
  subtitle: 'Drawn from a full audit of your live homepage and competitor pages.',
  questions: [
    { title: '[Problem 1 quoted from content-audit.md — e.g. "Welcome to" headline with no benefit]' },
    { title: '[Problem 2 — e.g. generic "Contact Us" CTA repeated 4 times]' },
    { title: '[Problem 3 — e.g. no social proof above the fold]' },
  ],
  bottomLine: 'Each of these is a conversion blocker. The redesign fixes all three.',
}, C);
pageNumber(s2, 2, TOTAL, C);

// ----- 9. Slide 3 — The Redesign (live preview teaser) -----
const s3 = newSlide('Slide 3 — The redesign', 4320);
buildCoverSlide(s3, {
  eyebrow: 'The redesign',
  title: 'Your homepage,\nrebuilt to convert.',
  subtitle: 'Same brand. Same colours. Sharper copy, clearer CTAs, real proof.',
  lockup: '[vercel-preview-url]',
  footerMeta: ['Fully responsive', 'Lighthouse 95+', 'Yours to keep, day one'],
  gradient: false,
}, C);
pageNumber(s3, 3, TOTAL, C);

// ----- 10. Slide 4 — Content Before → After (from content-audit.md) -----
const s4 = newSlide('Slide 4 — Before / After', 6480);
buildRoles2Column(s4, {
  eyebrow: 'Content rewritten',
  headline: 'Before / after — three examples.',
  columns: [
    {
      label: 'Before', fill: 'ghost', items: [
        '"[Original headline from current site]"',
        '"[Original CTA copy]"',
        '"[Original about/services snippet]"',
      ]
    },
    {
      label: 'After', fill: 'cyan', items: [
        '"[Our rewrite — outcome-first]"',
        '"[Our CTA — action + specific outcome]"',
        '"[Our rewrite — reader\'s problem first]"',
      ]
    },
  ],
}, C);
pageNumber(s4, 4, TOTAL, C);

// ----- 11. Slide 5 — 90-Day Growth Plan -----
const s5 = newSlide('Slide 5 — Growth plan', 8640);
buildTimelineQuarters(s5, {
  eyebrow: 'The 90-day plan',
  headline: 'From live site to compounding growth.',
  quarters: [
    { label: 'Month 1', title: 'Launch',  items: ['New site live on your domain', 'Analytics + conversion tracking', 'Basic SEO foundations', 'First email/lead capture'] },
    { label: 'Month 2', title: 'Reach',   items: ['Search + social ads live', 'Landing-page variants A/B tested', 'Content rhythm started', 'Reviews + social proof loop'] },
    { label: 'Month 3', title: 'Compound',items: ['CRO based on real session data', 'Top-of-funnel scale-up', 'Retargeting + email sequences', 'Monthly performance review'] },
  ],
  bottomLine: 'The site is the start. The 90 days after are where revenue compounds.',
}, C);
pageNumber(s5, 5, TOTAL, C);

// ----- 12. Slide 6 — Ad Previews (3 creative directions from ad-copy.md) -----
const s6 = newSlide('Slide 6 — Ad previews', 10800);
buildPlatform3Modules(s6, {
  eyebrow: 'Ads, ready to run',
  headline: 'Three creative directions, queued for day one.',
  subtitle: 'Built around the strongest converting hooks from the redesign.',
  modules: [
    { title: '[Ad 1 title]',  body: '[Hook + visual concept + target audience from ad-copy.md]' },
    { title: '[Ad 2 title]',  body: '[Hook + visual concept + target audience]' },
    { title: '[Ad 3 title]',  body: '[Hook + visual concept + target audience]' },
  ],
}, C);
pageNumber(s6, 6, TOTAL, C);

// ----- 13. Slide 7 — Pricing (transparent tiers) -----
const s7 = newSlide('Slide 7 — Investment', 12960);
buildPricingTwoTier(s7, {
  eyebrow: 'Investment',
  headline: 'Clear pricing. No retainers you don\'t need.',
  subtitle: 'Pick the tier that matches the stage you\'re at.',
  tiers: [
    { name: 'Launch',  price: '[₹X / $X]',  unit: 'one-time', features: ['Redesigned homepage', 'Mobile-perfect', 'Hosting setup', '2 weeks support'] },
    { name: 'Growth',  price: '[₹X / $X]',  unit: 'per month', features: ['Everything in Launch', 'Ads managed', 'Monthly CRO', 'Monthly report'] },
  ],
  totalLine: 'Launch + first 30 days of Growth = [total]',
  addons: [
    { title: 'Lead magnet design',     body: '[Brief]' },
    { title: 'Email sequence (5 mail)',body: '[Brief]' },
    { title: 'Quarterly site refresh', body: '[Brief]' },
  ],
}, C);
pageNumber(s7, 7, TOTAL, C);

// ----- 14. Slide 8 — Next Step (single CTA) -----
const s8 = newSlide('Slide 8 — Next step', 15120);
buildCtaOptionCards(s8, {
  eyebrow: 'Next step',
  headline: 'Book the kickoff call.',
  subtitle: '30 minutes · No obligation · Walk out with the redesign live on a staging URL.',
  options: [
    { title: 'Live preview walkthrough', body: 'We\'ll demo the redesign on your domain, end to end.' },
    { title: 'Content audit deep-dive',  body: 'Every before/after rewrite, with the principle behind it.' },
    { title: '90-day plan, tailored',    body: 'We\'ll calibrate the roadmap to your team and bandwidth.' },
    { title: 'Pricing, walked through',  body: 'No hidden line items. Clear scope, clear terms.' },
  ],
  cta: 'Let\'s get your site live →',
  contact: 'hello@example.com  ·  example.com',
}, C);
pageNumber(s8, 8, TOTAL, C);

// ----- 15. Return summary -----
return { ok: true, count: 8, ids: [s1.id, s2.id, s3.id, s4.id, s5.id, s6.id, s7.id, s8.id] };

==============================================================================
*/

// This file intentionally has no executable code — its purpose is to be a
// reference template. Copy the commented section above into a use_figma() call,
// substitute helpers.js + patterns.js bodies, and run.
