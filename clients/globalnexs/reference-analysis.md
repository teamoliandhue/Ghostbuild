# Reference Analysis — Globalnex

Three references locked: **superpower.com**, **fruitful.com**, **paraform.com**. All three are premium consumer-service marketing sites (health, fintech, recruiting) built on modern stacks (Next.js / Webflow / Framer). They share a tight visual grammar — that grammar is what we adapt.

Numbers below are measured from each reference's HTML/CSS. The composite at the bottom is what the mockup and the build must hit exactly.

---

## 1. superpower.com

| Field | Value |
|---|---|
| Hero headline | "Get better at being healthy, every year" — 6 words, outcome-first |
| Hero h1 class | `heading-style-h1 is-small-mobile` (Webflow custom; ~80px desktop, ~36px mobile based on visual scale) |
| Bg | Mostly white (#FFFFFF) with alternating off-white sections (#F4F4F5) |
| Section count | 9 |
| Section order | Hero → How it works (3 numbered steps) → Membership benefits → Clinicians → Testimonials → Members panel → Pricing/Membership CTA → Footer |
| Card pattern | Soft cards on off-white bg, ~24px radius, thin grey border, no shadow |
| Type family | Custom geometric sans (Webflow font) |
| Animation density | Medium — fade-up on cards, slight scroll-snap on how-it-works, no Three.js |
| Feel | Calm, clinical-but-warm. Light-only. Sparse. Headlines stand alone with lots of breathing room. |

## 2. fruitful.com

| Field | Value |
|---|---|
| Hero headline | "Your money, finally figured out." — 5 words, outcome-first, period-terminated |
| Hero h1 | `clamp(2rem, 5vw, 5.5rem)` → **32–88px responsive** |
| Bg | White + warm cream/peach accent sections (#FFDCB4) |
| Section count | 7 |
| Section order | Hero → Trust ribbon (rating + best-product badges) → Team panel (named advisors) → Process (3 steps) → Stats / proof → Feature grid → Membership pricing → Footer |
| Eyebrow | `class="eyebrow is--bigger"` — small uppercase label above every section heading |
| Card pattern | Generous radius (~20px), beige card on white, no shadow, hover scale |
| Type family | Sans, with serif accent for editorial moments |
| Animation density | Medium — text-split reveal on hero, fade-up elsewhere |
| Feel | Editorial fintech. Real advisor faces are the centerpiece. Cream/peach softens the financial seriousness. |

## 3. paraform.com

| Field | Value |
|---|---|
| Hero headline | "Hire on easy mode" — 4 words, declarative |
| Hero h1 | **`text-[64px] leading-[100%] -tracking-[1.2px]`** (Tailwind, exact values) |
| Bg | Alternating: white sections (`bg-grey-50 text-black`) and **full-black sections** (`bg-black text-white`) — the dark sections are reserved for the most important content (testimonials, big CTAs) |
| Section padding | `pt-10 md:pt-32 pb-12 md:pb-[164px]` → **mobile 40/48px, desktop 128/164px** |
| h2 sizes | `text-h2` (visually ~48px), `text-h3` line-height 1.15, `text-h5` line-height 1.2 |
| Section count | 8 |
| Section order | Hero (black bg) → Hiring-partner intro → Network → AI features (4 cards) → Process (steps) → Testimonials → AI insights → Trust ribbon |
| Heading max-width | 800px on h2; 920px on impact h2 |
| Card pattern | `rounded-2xl` (16px radius), thin border, no shadow, smooth border-darken hover |
| Animation density | Medium-low — subtle scroll reveals (`opacity:0;transform:translateX(10px)` on h5s) |
| Feel | Confident, modern B2B SaaS. White and full-black alternating. One statement per section. No filler. |

---

## Composite — what we build to

These are the **hard numbers** for the mockup and the full build. No "loosely resembling."

### Type scale

| Element | Desktop | Mobile | Line-height | Letter-spacing | Weight |
|---|---|---|---|---|---|
| Hero h1 | **64px** (`clamp(40px, 6vw, 64px)`) | **36px** | **1.0** | **-1.2px** | 800 |
| Section h2 | **48px** | **30px** | 1.05 | -0.6px | 800 |
| Card / sub h3 | **22px** | **20px** | 1.2 | -0.2px | 700 |
| Body | **18px** | **16px** | 1.55 | 0 | 400 |
| Eyebrow | **12px** uppercase | **12px** | 1.4 | **+0.2em** | 500 |
| Small / caption | 13px | 13px | 1.4 | 0 | 400 |

### Spacing rhythm

| Field | Desktop | Mobile |
|---|---|---|
| Section padding (top + bottom) | **120px / 120px** | **64px / 64px** |
| Container max-width | **1200px** | (full bleed, 24px gutter) |
| Heading max-width | **820px** | (full width) |
| Card padding | **32px** | **24px** |
| Card border-radius | **16px** | 16px |
| Hero padding-top (above nav) | 160px | 96px |

### Section order (composite — what we ship)

1. **Hero** — white bg. h1 + sub + 2 CTAs + small trust line below.
2. **Trust ribbon** — small badges row (rating, partner university count, countries) on white.
3. **Three-step "How it works"** — numbered 01/02/03 in purple, h3 + body each. Light surface bg (`#FAF5FF`).
4. **Services grid** — 4-6 cards on white bg. Eyebrow → headline → body → outcome line per card.
5. **Countries grid** — 7 countries as cards on light surface (`#FAF5FF`). Each card: flag + name + intake + university examples.
6. **Stats strip** — 4 big numbers in green (`#059669`), descriptors in muted. On white.
7. **Testimonial** — single big quote on **full black section** with white text. Purple accent on the outcome word. (Paraform's black-section pattern reserved for impact.)
8. **FAQ accordion** — 6 questions on white. Light border between rows.
9. **CTA banner** — closing block on purple-tinted surface (`#FAF5FF`). h2 + CTA + contact line.
10. **Footer** — minimal: logo, 3 link columns, copyright on white with hairline border-top.

### Card pattern (exact)

- Border-radius: **16px**
- Border: **1px solid #EFE7FC** (our border colour)
- Background: white OR `#FAF5FF` depending on section's bg (cards sit on the opposite tone)
- Padding: **32px desktop, 24px mobile**
- No box-shadow at rest
- Hover: border → `#7C3AED` (primary), translateY(-2px), 300ms ease

### Colour distribution

- 70% white sections, 20% `#FAF5FF` surface sections, 10% full-black section (testimonial only)
- Purple (`#7C3AED`) used for: eyebrow labels, numbered steps, hover borders, single accented word in big headlines
- Green (`#059669`) used for: primary CTAs only, stat numbers, link underlines
- Never both purple and green in the same component — they alternate by section

### Animation density

- **Medium-low.** Framer Motion fade-up + stagger on cards. Counter animation on stats numbers. Subtle border-darken on card hover.
- **No Three.js, no parallax, no gradient meshes, no chromatic effects.** ui-ux-pro-max anti-pattern "no excessive decoration" is the hard rule.
- Hero headline gets a single text-reveal (split-line slide-up, ~0.6s ease-out, one-time on load).

### Feel — one sentence

Editorial-confident. One statement per section, generous whitespace, mostly white with a single bold black section for the testimonial. Purple and green used as punctuation, never as decoration.

### Where the references disagree, and what won

- **Hero size:** Superpower ~80px, Fruitful 32-88px (clamp), Paraform 64px. **Paraform wins at 64px** because Heebo at 64px@900 reads as confident without overwhelming the locked white bg.
- **Use of dark sections:** Superpower none, Fruitful peach accent, Paraform alternating. **Paraform wins with one black section reserved for the testimonial** — high-impact, low-cost.
- **Animation:** Fruitful has text-split reveal on hero, others don't. **Fruitful's split-reveal wins for the hero only.**
- **Section count:** 7-9. **We land at 10** (one extra for the country grid which is unique to study-abroad and not in any reference).
