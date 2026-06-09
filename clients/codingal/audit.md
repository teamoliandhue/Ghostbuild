# Website Audit — codingal.com

**Audited:** 2026-06-02
**Scope:** Homepage (desktop + mobile web)
**Type:** UX + UI + conversion audit, feeding the GhostBuild redesign
**Subject:** Live site (teal palette, hero "Top-rated online programming, Coding & AI classes for kids to become the innovators of tomorrow"). A coral redesign mockup exists and is referenced where relevant.

---

## Executive Summary

Codingal has earned trust most edtech brands would envy: a million students, 135 countries, 4.6/5 parent rating, YC / Google / Amazon backing, top-1% instructor hiring. The homepage leans on all of it, hard. That is the problem.

The page sells credibility before it explains the product. A parent lands, gets hit with ratings, logos, and statistics, and scrolls a long way before understanding what a class actually is, what their child will build, or what it costs. The result is a visitor who trusts Codingal but cannot yet picture the experience or the price, and so does not book.

The fix is not "add more proof." It is to **lead with clarity, then back it with proof**: show what the child builds and how learning progresses first, then let the (substantial) trust stack close the deal. Two structural gaps make this worse than a pure ordering problem: **pricing is entirely gated**, and there is **no preview of what a live class looks like**. Both are decisive for a parent spending money on a child.

---

## Scoring

| Dimension | Score /10 | Note |
|---|---|---|
| First-impression clarity (hero) | 6 | Strong brand, but headline is a slogan, not an outcome |
| Product understanding | 4 | What a class is, what's built, how it progresses is unclear |
| Course discovery | 5 | Cards show grade + duration only; no level, age, or outcome |
| Trust & social proof | 8 | Abundant, but fragmented and uncontextualised |
| Pricing transparency | 2 | Fully gated behind signup |
| CTA clarity | 5 | Strong primary, but inconsistent labels across the page |
| Information hierarchy | 4 | Proof front-loaded; product buried |
| Mobile experience | — | Not yet verified; flagged for live check |
| Copy quality | 6 | Competent but generic in places ("innovators of tomorrow") |
| **Overall** | **5.0** | Credible brand, under-converting homepage |

---

## UX Findings

Severity: **High** = directly costs bookings · **Medium** = adds friction · **Low** = polish.

### UX-1 · Proof comes before product understanding — **High**
The page front-loads ratings, statistics, and media logos before answering "what is this, what will my child do, how does it work." A parent can finish the first few scrolls trusting Codingal yet unable to describe the actual experience.
**Recommendation:** Lead with the product. Order: Hero → How It Works → Courses / Learning Paths → Student Projects → Teachers → Full Trust Section → Pricing → Final CTA. Keep only a *thin* credibility strip (one rating line + 3 logos) high on the page.

### UX-2 · No preview of what a class actually is — **High**
Codingal sells live 1:1 instruction to children aged 5–17. The single biggest unanswered question for a parent is "what happens in the room." The homepage never shows it: no class screenshot, no short clip, no sample of the teacher-student interaction.
**Recommendation:** Add a "What a class looks like" section. One real class screenshot or a 20–30s clip, plus a 1-line description of the session flow (meet instructor → build live → leave with a project).

### UX-3 · Pricing is fully gated — **High**
There is no price anywhere on the public site; it surfaces only after registration. For a considered, recurring purchase aimed at cautious parents, hiding price is a larger conversion blocker than any layout issue. It forces a signup commitment before the buyer has the one fact they most want.
**Recommendation:** Put a pricing anchor on the page. Even a directional "Plans from $X / session · free trial first · full refund if it's not a fit" removes the biggest source of hesitation. Full transparency beats a gate.

### UX-4 · Course discovery is thin — **High**
Course cards display grade range, title, and duration only. They omit skill level (beginner / intermediate / advanced), recommended age, and the outcome ("by the end your child ships a playable game"). A parent cannot self-select confidently.
**Recommendation:** Add a level badge, an age tag, and a one-line outcome to each card. Offer a "not sure? match my child" path into the free trial.

### UX-5 · Parent objections are never addressed — **High**
The real reasons a parent hesitates are specific and emotional: screen time, "is 5 too young," "what if my child loses interest," "can I get my money back." The site has a generic FAQ that does not confront these head-on.
**Recommendation:** Rebuild the FAQ around the actual blockers: screen-time framing (building vs consuming), age suitability, what happens if the child disengages, exact refund mechanics, device requirements, and "why guided 1:1 over free YouTube tutorials."

### UX-6 · Statistics lack context — **Medium**
"4.6/5," "1,000,000+ students," "Top 1% instructors" are impressive but unsupported, which makes them read as marketing rather than evidence.
**Recommendation:** Attach the source to every number. "4.6/5 from 20,000+ parent reviews." "Instructors hired from the top 1% of 50,000+ applicants." Context turns a claim into proof.

### UX-7 · Inconsistent CTA strategy — **Medium**
The live page mixes "Try a free lesson," "Sign Up," "Join class," and "Try free." Multiple labels for the same action add micro-friction and dilute the primary path.
**Recommendation:** One primary CTA everywhere ("Book a free trial class"), one secondary ("See the courses" / "Explore courses"). No third variant.

### UX-8 · Dual audience is unmanaged — **Medium**
The parent pays; the child uses. These are two different people with different triggers, and the page speaks mostly to one at a time without a deliberate strategy. The hero is parent-facing; the course art is kid-facing; nothing ties them together.
**Recommendation:** Make the split intentional. Parent-facing copy carries the headline, trust, pricing, and outcomes. Kid-facing energy lives in the course cards and project showcase (Roblox, Minecraft, game art). Let the parent see their child wanting it.

### UX-9 · "How It Works" reads as passive — **Low/Medium**
Three disconnected cards describe the process without a sense of progression.
**Recommendation:** Connect the three steps visually (numbered timeline with connectors). The redesign mockup already moves toward this; keep going.

---

## UI Findings

### UI-1 · Layout monotony — **Medium**
Most sections repeat heading → paragraph → white card, producing scroll fatigue on an already long page.
**Recommendation:** Vary the rhythm: split image/text sections, an image-led project showcase, a timeline, a full-width trust band. The coral mockup varies layout more than the live site; continue that.

### UI-2 · Limited visual proof of student work — **High (UI)**
Very little on the page shows what students actually create. For an outcomes-driven purchase this is the most persuasive visual asset and it is underused. (Note: the live site has a projects section; the redesign mockup appears to have dropped it. It must return.)
**Recommendation:** Prominent "Projects students build" showcase — games, apps, websites, AI projects — ideally clickable or playable, with the child's grade shown.

### UI-3 · Logo / media row is crowded — **Medium**
Press and partner logos appear cramped and unsized, weakening rather than reinforcing authority.
**Recommendation:** Standardise logo height, increase spacing, group "Backed by" separately from "As seen in."

### UI-4 · Weak typographic hierarchy — **Medium**
Similar type scale and card styling across sections means important content competes with secondary content for attention.
**Recommendation:** Widen the type scale between section headers, sub-heads, and body. Use a clear visual anchor per section.

---

## The trust-placement contradiction (resolve before building)

The team audit recommends moving trust *later* and product *earlier*. The coral redesign mockup does the opposite at the top: a heavy stats + "Built & backed by" + "As seen in" band sits immediately after the hero, ahead of How It Works and Courses.

**Resolution:** Both can be right if we separate two different things.
- A **thin credibility strip** (one rating line + three logos) directly under the hero is good and is *not* what UX-1 warns against. Keep it.
- The **heavy trust section** (review detail, instructor depth, full press row, contextualised stats) belongs *after* the parent understands the product, not before.

So: slim strip high, deep trust low. The current mockup keeps the heavy band high; that needs to move down.

---

## Recommended Homepage Structure

1. **Hero** — outcome headline, primary CTA, one trust line, a glimpse of outcome
2. **Thin credibility strip** — rating + 3 logos (slim, not the full band)
3. **How It Works** — three connected steps, trial → match → ship
4. **Courses / Learning Paths** — cards with grade, level, age, and outcome
5. **What a class looks like** — class preview (screenshot or clip)
6. **Student project showcase** — real builds, clickable, grade-tagged
7. **The teachers** — top 1%, CS grads, background-checked, contextualised
8. **Why parents trust Codingal** — full trust section, contextualised stats, reviews, press
9. **Pricing** — transparent anchor + free-trial + refund
10. **FAQ** — real parent objections answered
11. **Final conversion** — single CTA, trial benefits restated

---

## Priority Matrix

**P1 — Critical (do first)**
- UX-1 Reorder: product before heavy proof
- UX-2 Add a "what a class looks like" preview
- UX-3 Put a pricing anchor on the page
- UX-4 Richer course cards (level, age, outcome)
- UI-2 Restore + strengthen the student project showcase
- UX-7 Standardise CTAs

**P2 — Important**
- UX-5 Rebuild FAQ around real parent objections
- UX-6 Contextualise every statistic
- UX-8 Deliberate dual-audience messaging
- Resolve the trust-placement contradiction

**P3 — Enhancement**
- UX-9 Connected "How It Works" timeline
- UI-1 Layout variety
- UI-3 Logo row cleanup
- UI-4 Stronger typographic hierarchy
- Decide consciously on the Cody penguin mascot's role

---

## What we keep from the existing brand and mockup

- Hero headline direction from the mockup ("Your child writes their first real program in week one") — outcome-first, specific, parent-facing. Strong; keep.
- The genuine trust assets (1M students, YC/Google/Amazon, top-1% instructors). Re-sequence, do not remove.
- Kid-facing course art (Roblox, Python, game dev). Keep — it does the dual-audience job.
- CTA discipline from the mockup ("Book a free trial class" / "See the courses"). Keep and apply everywhere.

---

## Open items before content audit + build

1. Confirm whether the coral mockup is the design blueprint to follow, or a draft to improve on.
2. Confirm the redesign target is the live teal site, with the coral mockup as the proposed direction.
3. Pricing: are we allowed to surface a directional price, or must it stay gated? (This decides UX-3.)
4. Mobile: confirm scope so the live mobile experience can be audited properly (UX flagged, not yet verified).
