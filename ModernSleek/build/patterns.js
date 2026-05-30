// =============================================================================
// Modern Sleek Deck — Slide Pattern Library
// =============================================================================
// Every reusable slide layout as a single function. Each function takes:
//   - slide: the parent slide frame (1920x1080, layoutMode='NONE') to build into
//   - opts:  the content for the pattern (title, items, etc.)
//   - C:     the colors object from buildColors() in helpers.js
//
// All patterns assume the helpers (FN, AF, T, eyebrowPill, buildHeaderZone,
// pageNumber, blackBanner, pastelCycle) are inlined in the same use_figma call.
//
// Usage in a use_figma script:
//   1. Inline helpers.js content + this file's content into your script
//   2. await loadDeckFonts()
//   3. const C = buildColors(BRAND_HEX)
//   4. Create a slide outer:
//        const slide = figma.createFrame();
//        slide.resize(1920, 1080);
//        slide.layoutMode = 'NONE';
//        slide.fills = [{type:'SOLID', color: C.white}];
//        slide.clipsContent = true;
//        page.appendChild(slide);
//        slide.x = 0; slide.y = 0;
//   5. Call pattern: buildCoverSlide(slide, {...}, C)
//   6. pageNumber(slide, slideIdx, totalSlides, C)
// =============================================================================


// =============================================================================
// 1. coverSlide — Cover with eyebrow + giant title + client (× partner) lockup
// =============================================================================
/**
 * @param {FrameNode} slide  outer 1920x1080 frame
 * @param {object} opts
 *   @param {string} opts.eyebrow         e.g. "PITCH DECK · 2026" or "STATEMENT OF WORK · 2026"
 *   @param {string} opts.title           e.g. "[Client Name]." or "Acme 1.0"  (large display)
 *   @param {string} opts.subtitle        e.g. "[One-line value prop tailored from the redesign]"
 *   @param {string} opts.lockup          e.g. "[Client] × Oli & Hue" or just "[Client]"
 *   @param {string[]} opts.footerMeta    e.g. ["Live preview ready", "Designed in 5 days", "Built to convert"]
 *   @param {boolean} opts.gradient       if true, fill slide with cover gradient (pastelStart → cream)
 *   @param {string} opts.titleAccentWord optional accent word inside title rendered in BRAND.primary
 * @param {object} C  colors
 */
function buildCoverSlide(slide, opts, C) {
  if (opts.gradient) {
    slide.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { color: { r: C.coverGradStart.r, g: C.coverGradStart.g, b: C.coverGradStart.b, a: 1 }, position: 0 },
        { color: { r: C.coverGradEnd.r,   g: C.coverGradEnd.g,   b: C.coverGradEnd.b,   a: 1 }, position: 1 }
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]]
    }];
  }

  // Eyebrow at top — small mono-style label, centered
  if (opts.eyebrow) {
    const e = T(slide, {
      t: opts.eyebrow,
      f: FN(INTER, 'Medium'), s: 24, c: C.ink, ls: 6, a: 'CENTER'
    });
    e.textAutoResize = 'HEIGHT';
    e.resize(1920, e.height);
    e.x = 0; e.y = 96;
  }

  // Massive title
  const title = T(slide, {
    t: opts.title,
    f: FN(RC, 'Medium'), s: 132, c: C.ink, ls: -2, lh: 100, a: 'CENTER'
  });
  title.textAutoResize = 'HEIGHT';
  title.resize(1920, title.height);
  title.x = 0; title.y = 360;

  // Optional brand-accent on a word inside the title
  if (opts.titleAccentWord) {
    const idx = opts.title.indexOf(opts.titleAccentWord);
    if (idx >= 0) {
      title.setRangeFills(idx, idx + opts.titleAccentWord.length, [{ type: 'SOLID', color: C.primary }]);
    }
  }

  // Subtitle
  if (opts.subtitle) {
    const sub = T(slide, {
      t: opts.subtitle,
      f: FN(SS, 'Regular'), s: 36, c: C.ink, lh: 130, a: 'CENTER'
    });
    sub.textAutoResize = 'HEIGHT';
    sub.resize(1920, sub.height);
    sub.x = 0; sub.y = 540;
  }

  // Client × partner (or solo client) lockup (centered, lower)
  if (opts.lockup) {
    const lo = T(slide, {
      t: opts.lockup,
      f: FN(RC, 'Medium'), s: 60, c: C.ink, lh: 110, a: 'CENTER'
    });
    lo.textAutoResize = 'HEIGHT';
    lo.resize(1920, lo.height);
    lo.x = 0; lo.y = 720;
  }

  // Footer meta (e.g. credentials, geographies)
  if (opts.footerMeta && opts.footerMeta.length > 0) {
    const footer = AF(slide, {
      dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 18, align: 'CENTER', crossAlign: 'CENTER'
    });
    opts.footerMeta.forEach((s, i) => {
      if (i > 0) {
        T(footer, { t: '·', f: FN(INTER, 'Regular'), s: 24, c: C.muted });
      }
      T(footer, { t: s, f: FN(INTER, 'Medium'), s: 24, c: C.ink });
    });
    footer.x = (1920 - footer.width) / 2;
    footer.y = 920;
  }
  return slide;
}


// =============================================================================
// 2. statementCards3 — Eyebrow + headline + 3 numbered question/statement cards
// =============================================================================
/**
 * @param {FrameNode} slide
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "THE PROBLEM"
 *   @param {string} opts.headline           e.g. "Your top accounts contribute 80% of revenue."
 *   @param {string} opts.subtitle           e.g. "But most teams can't answer three simple questions:"
 *   @param {Array<{title:string, body?:string}>} opts.questions  3 items max
 *   @param {string} opts.bottomLine         optional black banner text at bottom
 * @param {object} C
 */
function buildStatementCards3(slide, opts, C) {
  buildHeaderZone(slide, {
    eyebrow: opts.eyebrow,
    headline: opts.headline,
    subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 60
  }, C);

  const colors = [C.cyan, C.lavender, C.peach];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 380,
    x: 64, y: 380, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });

  opts.questions.slice(0, 3).forEach((q, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 380,
      fill: colors[i], r: 24, pad: 30, gap: 16, align: 'MIN'
    });
    T(card, { t: String(i + 1).padStart(2, '0'), f: FN(RC, 'Medium'), s: 96, c: C.ink, lh: 100, ls: -2, fillW: true });
    T(card, { t: q.title, f: FN(INTER, 'Semi Bold'), s: 28, c: C.ink, lh: 130, fillW: true });
    if (q.body) T(card, { t: q.body, f: FN(INTER, 'Regular'), s: 22, c: C.muted, lh: 140, fillW: true });
  });

  if (opts.bottomLine) {
    blackBanner(slide, opts.bottomLine, { x: 64, y: 820, width: 1792, height: 80 }, C);
  }
}


// =============================================================================
// 3. flow4Stage — 4 numbered stage cards in a row
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "HOW IT WORKS"
 *   @param {string} opts.headline           e.g. "How we work" or "[Client] Intake → Build → Launch → Grow."
 *   @param {string} opts.subtitle
 *   @param {Array<{label:string, title:string, bullets:string[]}>} opts.stages   4 items
 */
function buildFlow4Stage(slide, opts, C) {
  buildHeaderZone(slide, {
    eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 60
  }, C);

  const colors = [C.cyan, C.yellow, C.peach, C.lavender];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 480,
    x: 64, y: 380, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.stages.slice(0, 4).forEach((s, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 480,
      fill: colors[i], r: 24, pad: 24, gap: 16, align: 'MIN'
    });
    // Numbered badge — circle with brand-primary
    const badge = AF(card, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 40, h: 40,
      fill: C.primary, r: 20, align: 'CENTER', crossAlign: 'CENTER'
    });
    T(badge, { t: String(i + 1).padStart(2, '0'), f: FN(INTER, 'Semi Bold'), s: 22, c: C.white });
    // Eyebrow stage label
    T(card, { t: s.label, f: FN(INTER, 'Medium'), s: 24, c: C.primary, ls: 6, fillW: true });
    // Stage title
    T(card, { t: s.title, f: FN(INTER, 'Semi Bold'), s: 26, c: C.ink, lh: 130, fillW: true });
    // Bullets
    const list = AF(card, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH', gap: 8 });
    s.bullets.forEach(b => {
      T(list, { t: '• ' + b, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
    });
  });
}


// =============================================================================
// 4. columnOwnership3 — 3 columns with icon + label + bullet items
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "WHAT MANAGED MEANS"
 *   @param {string} opts.headline           e.g. "Not software you figure out. An extended team that runs your programme."
 *   @param {Array<{label:string, icon?:string, items:string[], fill?:string}>} opts.columns  3 items
 *   @param {string} opts.bottomLine         optional ink-banner closer
 */
function buildColumnOwnership3(slide, opts, C) {
  buildHeaderZone(slide, {
    eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 54
  }, C);

  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, mint: C.mint, yellow: C.yellow, pink: C.pink, cream: C.cream };
  const defaultFills = [C.cyan, C.lavender, C.peach];

  const cols = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 540,
    x: 64, y: 380, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.columns.slice(0, 3).forEach((col, i) => {
    const fill = (col.fill && fillMap[col.fill]) || defaultFills[i];
    const card = AF(cols, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 540,
      fill: fill, r: 24, pad: 30, gap: 20, align: 'MIN'
    });
    // Icon + label header
    const head = AF(card, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 14, align: 'MIN', crossAlign: 'CENTER' });
    if (col.icon) {
      const iconBox = AF(head, {
        dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 48, h: 48,
        fill: C.white, r: 10, align: 'CENTER', crossAlign: 'CENTER'
      });
      T(iconBox, { t: col.icon, f: FN(INTER, 'Bold'), s: 28, c: C.ink, a: 'CENTER' });
    }
    T(head, { t: col.label.toUpperCase(), f: FN(INTER, 'Semi Bold'), s: 22, c: C.ink, ls: 6 });
    // Items list
    const list = AF(card, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH', gap: 12 });
    col.items.forEach(it => {
      const row = AF(list, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 10, align: 'MIN', crossAlign: 'MIN', layoutAlign: 'STRETCH' });
      T(row, { t: '—', f: FN(INTER, 'Regular'), s: 22, c: C.ink });
      T(row, { t: it, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 135, layoutGrow: 1 });
    });
  });

  if (opts.bottomLine) {
    blackBanner(slide, opts.bottomLine, { x: 64, y: 950, width: 1792, height: 60 }, C);
  }
}


// =============================================================================
// 5. roles2Column — 2 cards side-by-side with checkmarks (we own / client owns)
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "ROLES & RESPONSIBILITIES"
 *   @param {string} opts.headline           e.g. "Who does what."
 *   @param {Array<{label:string, items:string[], fill?:string, badgeColor?:string}>} opts.columns  2 items
 */
function buildRoles2Column(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const defaultFills = [C.cyan, C.peach];
  const defaultBadges = [C.yes, C.no];

  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'AUTO', w: 1792,
    x: 64, y: 360, gap: 32, align: 'MIN', crossAlign: 'MIN'
  });
  opts.columns.slice(0, 2).forEach((col, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutGrow: 1,
      fill: col.fill || defaultFills[i], r: 24, pad: 36, gap: 20, align: 'MIN'
    });
    // Header row with circular badge + label
    const head = AF(card, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 16, align: 'MIN', crossAlign: 'CENTER' });
    const badge = AF(head, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 48, h: 48,
      fill: col.badgeColor || defaultBadges[i], r: 24, align: 'CENTER', crossAlign: 'CENTER'
    });
    T(badge, { t: '✓', f: FN(INTER, 'Semi Bold'), s: 24, c: C.white, a: 'CENTER' });
    T(head, { t: col.label, f: FN(INTER, 'Semi Bold'), s: 30, c: C.ink });
    // Items
    const list = AF(card, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH', gap: 14 });
    col.items.forEach(it => {
      T(list, { t: '— ' + it, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 135, fillW: true });
    });
  });
}


// =============================================================================
// 6. platform3Modules — 3 module cards with title + body
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "THE PLATFORM"
 *   @param {string} opts.headline           e.g. "Built for this. Not bolted together."
 *   @param {string} opts.subtitle
 *   @param {Array<{title:string, body:string, fill?:string}>} opts.modules  3 items
 */
function buildPlatform3Modules(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const fills = [C.cyan, C.lavender, C.peach];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 460,
    x: 64, y: 400, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.modules.slice(0, 3).forEach((m, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 460,
      fill: m.fill || fills[i], r: 33, pad: 36, gap: 18, align: 'MIN'
    });
    T(card, { t: m.title, f: FN(INTER, 'Semi Bold'), s: 30, c: C.ink, lh: 130, fillW: true });
    T(card, { t: m.body, f: FN(INTER, 'Regular'), s: 24, c: C.ink, lh: 140, fillW: true });
  });
}


// =============================================================================
// 7. statsGrid — 4-stat row OR 2x3 grid of stat cards
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "EXPECTED OUTCOMES · MONTH 4"
 *   @param {string} opts.headline           e.g. "What you'll see by Month 4."
 *   @param {Array<{stat:string, label:string, sub?:string, fill?:string}>} opts.stats  4 or 6 items
 *   @param {string} opts.bottomLine         optional ink banner
 */
function buildStatsGrid(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const stats = opts.stats || [];
  const colors = [C.cyan, C.lavender, C.peach, C.mint, C.yellow, C.pink];
  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };

  // Layout: 4 stats → 1 row of 4. 6 stats → 2 rows of 3.
  const cols = stats.length === 4 ? 4 : 3;
  const rows = Math.ceil(stats.length / cols);
  const grid = AF(slide, {
    dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 1792,
    x: 64, y: 360, gap: 24, align: 'MIN'
  });

  for (let r = 0; r < rows; r++) {
    const row = AF(grid, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 240,
      gap: 24, align: 'MIN', layoutAlign: 'STRETCH'
    });
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx >= stats.length) {
        // empty placeholder slot to balance
        AF(row, { dir: 'VERTICAL', primary: 'FIXED', counter: 'FIXED', layoutGrow: 1, h: 240 });
        continue;
      }
      const s = stats[idx];
      const fillC = (s.fill && fillMap[s.fill]) || colors[idx % colors.length];
      const card = AF(row, {
        dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 240,
        fill: fillC, r: 24, pad: 30, gap: 8, align: 'MIN'
      });
      T(card, { t: s.stat, f: FN(RC, 'Medium'), s: 96, c: C.ink, ls: -2, lh: 100, fillW: true });
      T(card, { t: s.label, f: FN(INTER, 'Semi Bold'), s: 24, c: C.ink, lh: 130, fillW: true });
      if (s.sub) T(card, { t: s.sub, f: FN(INTER, 'Regular'), s: 22, c: C.muted, lh: 135, fillW: true });
    }
  }

  if (opts.bottomLine) {
    blackBanner(slide, opts.bottomLine, { x: 64, y: 960, width: 1792, height: 60 }, C);
  }
}


// =============================================================================
// 8. statsFunnel — 4 stat bars with descending widths
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "EXPECTED OUTCOMES · 12 MONTHS"
 *   @param {string} opts.headline           e.g. "What the system delivers at full velocity."
 *   @param {Array<{stat:string, label:string, sub?:string, fill?:string}>} opts.stages   4 items
 *   @param {Array<{stat:string, label:string, sub?:string, fill?:string}>} [opts.qualityLift]  optional 3 cards
 *   @param {string} opts.bottomLine         optional ink banner
 */
function buildStatsFunnel(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const fills = [C.cyan, C.lavender, C.peach, C.mint];
  const widths = [1700, 1400, 1100, 800];
  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };

  const funnel = AF(slide, {
    dir: 'VERTICAL', primary: 'FIXED', counter: 'FIXED', w: 1700, h: 380,
    x: opts.qualityLift ? 64 : (1920 - 1700) / 2, y: 380, gap: 14, align: 'MIN', crossAlign: 'CENTER'
  });
  opts.stages.slice(0, 4).forEach((s, i) => {
    const fill = (s.fill && fillMap[s.fill]) || fills[i];
    const w = widths[i] || 800 - (i * 100);
    const bar = AF(funnel, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: w, h: 80,
      fill: fill, r: 24, padL: 32, padR: 32, gap: 24, align: 'MIN', crossAlign: 'CENTER'
    });
    T(bar, { t: s.stat, f: FN(RC, 'Medium'), s: 54, c: C.ink, ls: -2 });
    AF(bar, { dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 0.01, h: 1, layoutGrow: 1 });
    const labelCol = AF(bar, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', gap: 2, crossAlign: 'MAX' });
    T(labelCol, { t: s.label, f: FN(INTER, 'Semi Bold'), s: 26, c: C.ink, a: 'RIGHT' });
    if (s.sub) T(labelCol, { t: s.sub, f: FN(INTER, 'Regular'), s: 22, c: C.muted, a: 'RIGHT' });
  });

  // Optional Quality Lift sidebar — only shown if qualityLift array provided
  if (opts.qualityLift && opts.qualityLift.length > 0) {
    // Quality Lift eyebrow
    const qle = T(slide, { t: 'QUALITY LIFT — DOWNSTREAM IMPACT', f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6 });
    qle.x = 1314; qle.y = 360;

    const supportCol = AF(slide, {
      dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 550,
      gap: 16, align: 'MIN'
    });
    supportCol.x = 1314; supportCol.y = 400;
    const supColors = [C.yellow, C.pink, C.cream];
    opts.qualityLift.slice(0, 3).forEach((q, i) => {
      const fill = (q.fill && fillMap[q.fill]) || supColors[i];
      const card = AF(supportCol, {
        dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 550,
        fill: fill, r: 24, pad: 24, gap: 6, align: 'MIN'
      });
      T(card, { t: q.stat, f: FN(RC, 'Medium'), s: 64, c: C.ink, ls: -2, fillW: true });
      T(card, { t: q.label, f: FN(INTER, 'Semi Bold'), s: 24, c: C.ink, lh: 130, fillW: true });
      if (q.sub) T(card, { t: q.sub, f: FN(INTER, 'Regular'), s: 22, c: C.muted, lh: 135, fillW: true });
    });
  }

  if (opts.bottomLine) {
    blackBanner(slide, opts.bottomLine, { x: 64, y: 940, width: 1792, height: 70 }, C);
  }
}


// =============================================================================
// 9. proofStatsLogosQuote — 4 stats + logo strip + customer quote
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow                    e.g. "PROOF"
 *   @param {string} opts.headline                   e.g. "Results from teams like yours."
 *   @param {Array<{stat:string, label:string}>} opts.stats   4 items
 *   @param {string[]} opts.logos                    array of logo node ids OR just text labels (text fallback)
 *   @param {string} opts.quote                      customer quote text
 */
function buildProofStatsLogosQuote(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1100, headlineSize: 60 }, C);

  // Quote in top-right
  if (opts.quote) {
    const qBox = AF(slide, {
      dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 720,
      fill: C.pillBg, r: 24, pad: 24
    });
    qBox.x = 1136; qBox.y = 144;
    T(qBox, { t: opts.quote, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
  }

  // 4-stat row
  const fills = [C.cyan, C.yellow, C.peach, C.lavender];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 200,
    x: 64, y: 380, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.stats.slice(0, 4).forEach((s, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 200,
      fill: fills[i], r: 24, pad: 28, gap: 6, align: 'MIN'
    });
    T(card, { t: s.stat, f: FN(RC, 'Medium'), s: 80, c: C.ink, ls: -2, lh: 100, fillW: true });
    T(card, { t: s.label, f: FN(INTER, 'Regular'), s: 22, c: C.muted, lh: 135, fillW: true });
  });

  // Logo strip (text-based fallback — when calling this, replace with image fills if available)
  if (opts.logos && opts.logos.length > 0) {
    const logoEyebrow = T(slide, { t: 'TRUSTED BY', f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6 });
    logoEyebrow.x = 64; logoEyebrow.y = 660;

    const logoStrip = AF(slide, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 90,
      gap: 24, align: 'SPACE_BETWEEN', crossAlign: 'CENTER'
    });
    logoStrip.x = 64; logoStrip.y = 700;
    opts.logos.forEach(logo => {
      const slot = AF(logoStrip, {
        dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 200, h: 90,
        fill: C.pillBg, r: 14, align: 'CENTER', crossAlign: 'CENTER'
      });
      T(slot, { t: logo, f: FN(INTER, 'Semi Bold'), s: 24, c: C.ink, a: 'CENTER' });
    });
  }
}


// =============================================================================
// 10. timelineQuarters — Q1/Q2/Q3+ horizontal timeline
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "WHAT TO EXPECT"
 *   @param {string} opts.headline           e.g. "Two quarters to momentum. A third to measurable pipeline."
 *   @param {Array<{label:string, title:string, items:string[]}>} opts.quarters   typically 3 (Q1/Q2/Q3+)
 *   @param {string} opts.bottomLine         optional banner
 */
function buildTimelineQuarters(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 54 }, C);

  const fills = [C.cyan, C.yellow, C.peach];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 540,
    x: 64, y: 360, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.quarters.forEach((q, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 540,
      fill: fills[i % fills.length], r: 24, pad: 30, gap: 16, align: 'MIN'
    });
    // Quarter badge
    const badge = AF(card, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 60, h: 36,
      fill: C.primary, r: 18, align: 'CENTER', crossAlign: 'CENTER'
    });
    T(badge, { t: q.label, f: FN(INTER, 'Semi Bold'), s: 22, c: C.white });
    T(card, { t: q.title, f: FN(INTER, 'Semi Bold'), s: 30, c: C.ink, lh: 130, fillW: true });
    const list = AF(card, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH', gap: 12 });
    q.items.forEach(it => {
      T(list, { t: '— ' + it, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 135, fillW: true });
    });
  });

  if (opts.bottomLine) {
    blackBanner(slide, opts.bottomLine, { x: 64, y: 920, width: 1792, height: 60 }, C);
  }
}


// =============================================================================
// 11. timelineWeeks — 4 numbered phase cards with week ranges
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "SCOPE OF WORK"
 *   @param {string} opts.headline           e.g. "4 phases. 8 weeks to launch. Then ongoing."
 *   @param {Array<{number:string, weeks:string, title:string, body:string, fill?:string}>} opts.phases  4 items
 */
function buildTimelineWeeks(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };
  const defaultFills = [C.cyan, C.lavender, C.peach, C.yellow];

  // 2x2 grid for 4 phases
  const grid = AF(slide, {
    dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 1792,
    x: 64, y: 380, gap: 24
  });
  for (let r = 0; r < 2; r++) {
    const row = AF(grid, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 260,
      gap: 24, align: 'MIN', layoutAlign: 'STRETCH'
    });
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      if (idx >= opts.phases.length) continue;
      const p = opts.phases[idx];
      const fill = (p.fill && fillMap[p.fill]) || defaultFills[idx];
      const card = AF(row, {
        dir: 'HORIZONTAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 260,
        fill: fill, r: 24, pad: 30, gap: 24, align: 'MIN', crossAlign: 'MIN'
      });
      T(card, { t: p.number, f: FN(RC, 'Medium'), s: 80, c: C.ink, ls: -2, lh: 100 });
      const right = AF(card, { dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, gap: 6, align: 'MIN' });
      T(right, { t: p.weeks, f: FN(INTER, 'Medium'), s: 22, c: C.muted, ls: 4, fillW: true });
      T(right, { t: p.title, f: FN(INTER, 'Semi Bold'), s: 28, c: C.ink, lh: 130, fillW: true });
      T(right, { t: p.body, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
    }
  }
}


// =============================================================================
// 12. ctaOptionCards — 4 small cards + bottom CTA button
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "NEXT STEP · OPTION A"
 *   @param {string} opts.headline           e.g. "Book the kickoff call."
 *   @param {string} opts.subtitle           e.g. "30 minutes · No obligation · Walk out with the redesign live on a staging URL."
 *   @param {Array<{title:string, body:string}>} opts.options  4 items (or 2x2)
 *   @param {string} opts.cta                e.g. "Let's get your site live →"
 *   @param {string} opts.contact            e.g. "hello@example.com  ·  example.com"
 */
function buildCtaOptionCards(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 74 }, C);

  // 2x2 grid of option cards
  const fills = [C.cyan, C.lavender, C.peach, C.mint];
  const grid = AF(slide, { dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: 1792, x: 64, y: 420, gap: 24 });
  for (let r = 0; r < 2; r++) {
    const row = AF(grid, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 200,
      gap: 24, align: 'MIN', layoutAlign: 'STRETCH'
    });
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      if (idx >= opts.options.length) continue;
      const o = opts.options[idx];
      const card = AF(row, {
        dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 200,
        fill: fills[idx], r: 24, pad: 24, gap: 8, align: 'MIN'
      });
      T(card, { t: o.title, f: FN(INTER, 'Semi Bold'), s: 26, c: C.ink, lh: 130, fillW: true });
      T(card, { t: o.body, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
    }
  }

  // CTA button
  const ctaWrap = AF(slide, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO',
    fill: C.ink, r: 40, padL: 36, padR: 36, padT: 24, padB: 24 });
  T(ctaWrap, { t: opts.cta, f: FN(INTER, 'Semi Bold'), s: 28, c: C.white });
  ctaWrap.x = 64; ctaWrap.y = 900;

  // Contact info on right
  if (opts.contact) {
    const cont = T(slide, { t: opts.contact, f: FN(INTER, 'Regular'), s: 22, c: C.muted });
    cont.textAutoResize = 'WIDTH_AND_HEIGHT';
    cont.x = 1856 - cont.width; cont.y = 940;
  }
}


// =============================================================================
// 13. ctaNumberedSteps — 3 numbered cards horizontally + bottom CTA
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "NEXT STEP · OPTION B"
 *   @param {string} opts.headline           e.g. "See the live preview."
 *   @param {string} opts.subtitle
 *   @param {Array<{title:string, body:string}>} opts.steps  3 items
 *   @param {string} opts.cta                e.g. "Open the live preview →"
 *   @param {string} opts.contact            e.g. "hello@example.com  ·  example.com"
 */
function buildCtaNumberedSteps(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 74 }, C);

  const fills = [C.cyan, C.yellow, C.peach];
  const row = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 380,
    x: 64, y: 420, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.steps.slice(0, 3).forEach((s, i) => {
    const card = AF(row, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 380,
      fill: fills[i], r: 24, pad: 30, gap: 16, align: 'MIN'
    });
    T(card, { t: String(i + 1).padStart(2, '0'), f: FN(RC, 'Medium'), s: 80, c: C.primary, ls: -2, lh: 100, fillW: true });
    T(card, { t: s.title, f: FN(INTER, 'Semi Bold'), s: 28, c: C.ink, lh: 130, fillW: true });
    T(card, { t: s.body, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
  });

  // CTA + contact (same as ctaOptionCards)
  const ctaWrap = AF(slide, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO',
    fill: C.ink, r: 40, padL: 36, padR: 36, padT: 24, padB: 24 });
  T(ctaWrap, { t: opts.cta, f: FN(INTER, 'Semi Bold'), s: 28, c: C.white });
  ctaWrap.x = 64; ctaWrap.y = 900;
  if (opts.contact) {
    const cont = T(slide, { t: opts.contact, f: FN(INTER, 'Regular'), s: 22, c: C.muted });
    cont.textAutoResize = 'WIDTH_AND_HEIGHT';
    cont.x = 1856 - cont.width; cont.y = 940;
  }
}


// =============================================================================
// 14. pricingTwoTier — 2 hero cards + total bar + 3 secondary cards
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "INVESTMENT"
 *   @param {string} opts.headline           e.g. "Annual services proposal."
 *   @param {string} opts.subtitle
 *   @param {Array<{label:string, amount:string, sub:string, fill?:string}>} opts.tiers   2 items
 *   @param {string} opts.totalLabel         e.g. "TOTAL ANNUAL INVESTMENT"
 *   @param {string} opts.totalAmount        e.g. "$65,988"
 *   @param {Array<{label:string, amount:string, unit:string, sub:string, fill?:string}>} opts.addons   optional 3 items
 *   @param {string} opts.addonsEyebrow      e.g. "TOOLING & MEDIA · BUDGETED SEPARATELY"
 *   @param {string} opts.footnote           e.g. "* Option to renew at the 6-month mark."
 */
function buildPricingTwoTier(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  // 2 tier cards
  const tierFills = [C.cyan, C.lavender];
  const tierRow = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 240,
    x: 64, y: 360, gap: 24
  });
  opts.tiers.slice(0, 2).forEach((t, i) => {
    const card = AF(tierRow, {
      dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 240,
      fill: t.fill || tierFills[i], r: 24, pad: 30, gap: 8
    });
    T(card, { t: t.label.toUpperCase(), f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6, fillW: true });
    T(card, { t: t.amount, f: FN(RC, 'Medium'), s: 96, c: C.ink, ls: -2, lh: 100, fillW: true });
    T(card, { t: t.sub, f: FN(INTER, 'Semi Bold'), s: 22, c: C.ink, fillW: true });
  });

  // Total bar
  const totalBar = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 100,
    x: 64, y: 624, fill: C.ink, r: 24, padL: 36, padR: 36, gap: 14, align: 'MIN', crossAlign: 'CENTER'
  });
  T(totalBar, { t: opts.totalLabel, f: FN(INTER, 'Medium'), s: 22, c: C.yellow, ls: 6 });
  AF(totalBar, { dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 0.01, h: 1, layoutGrow: 1 });
  T(totalBar, { t: opts.totalAmount, f: FN(RC, 'Medium'), s: 64, c: C.white, ls: -2 });

  // Addons (optional)
  if (opts.addons && opts.addons.length > 0) {
    if (opts.addonsEyebrow) {
      const ae = T(slide, { t: opts.addonsEyebrow, f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6 });
      ae.x = 64; ae.y = 754;
    }
    const fills = [C.peach, C.mint, C.yellow];
    const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };
    const addonsRow = AF(slide, {
      dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: 1792, h: 200,
      x: 64, y: 790, gap: 24
    });
    opts.addons.slice(0, 3).forEach((a, i) => {
      const fill = (a.fill && fillMap[a.fill]) || fills[i];
      const card = AF(addonsRow, {
        dir: 'VERTICAL', primary: 'FIXED', counter: 'AUTO', layoutGrow: 1, h: 200,
        fill: fill, r: 24, pad: 24, gap: 6
      });
      T(card, { t: a.label, f: FN(INTER, 'Semi Bold'), s: 26, c: C.ink, lh: 130, fillW: true });
      const amtRow = AF(card, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 6, align: 'MIN', crossAlign: 'BASELINE' });
      T(amtRow, { t: a.amount, f: FN(RC, 'Medium'), s: 48, c: C.ink, ls: -2 });
      T(amtRow, { t: a.unit, f: FN(INTER, 'Regular'), s: 22, c: C.muted });
      T(card, { t: a.sub, f: FN(INTER, 'Regular'), s: 22, c: C.muted, lh: 135, fillW: true });
    });
  }

  // Footnote
  if (opts.footnote) {
    const f = T(slide, { t: opts.footnote, f: FN(INTER, 'Regular'), s: 22, c: C.muted });
    f.x = 64; f.y = 1010 - 30;
  }
}


// =============================================================================
// 15. requirementsGrid — 3 columns with REQUIRED/RECOMMENDED pill badges + items
// =============================================================================
/**
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "BEFORE WE LAUNCH"
 *   @param {string} opts.headline           e.g. "What we need from you to get started."
 *   @param {string} opts.subtitle
 *   @param {Array<{eyebrow:string, sub:string, items:Array<{tag:'REQUIRED'|'RECOMMENDED', title:string, body:string, fill?:string}>}>} opts.columns
 */
function buildRequirementsGrid(slide, opts, C) {
  buildHeaderZone(slide, { eyebrow: opts.eyebrow, headline: opts.headline, subtitle: opts.subtitle,
    x: 64, y: 64, width: 1700, headlineSize: 60 }, C);

  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };
  const defaultFills = [[C.cyan, C.lavender], [C.peach, C.mint], [C.pink, C.cream]];

  const cols = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'AUTO', w: 1792,
    x: 64, y: 420, gap: 24, align: 'MIN', crossAlign: 'MIN'
  });
  opts.columns.forEach((col, ci) => {
    const colF = AF(cols, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutGrow: 1, gap: 14 });
    const hdr = AF(colF, { dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH', gap: 6 });
    T(hdr, { t: col.eyebrow.toUpperCase(), f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6, fillW: true });
    T(hdr, { t: col.sub, f: FN(SS, 'Regular'), s: 24, c: C.ink, lh: 130, fillW: true });
    col.items.forEach((it, ii) => {
      const fill = (it.fill && fillMap[it.fill]) || defaultFills[ci % 3][ii % 2];
      const card = AF(colF, {
        dir: 'VERTICAL', primary: 'AUTO', counter: 'AUTO', layoutAlign: 'STRETCH',
        fill: fill, r: 24, pad: 24, gap: 12
      });
      // Tag pill
      const isReq = it.tag === 'REQUIRED';
      const pill = AF(card, {
        dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO',
        fill: isReq ? C.no : C.yellow, r: 100, padL: 14, padR: 14, padT: 6, padB: 6
      });
      T(pill, { t: it.tag, f: FN(INTER, 'Medium'), s: 22, c: isReq ? C.white : C.ink, ls: 6 });
      T(card, { t: it.title, f: FN(INTER, 'Semi Bold'), s: 26, c: C.ink, lh: 130, fillW: true });
      T(card, { t: it.body, f: FN(INTER, 'Regular'), s: 22, c: C.ink, lh: 140, fillW: true });
    });
  });
}


// =============================================================================
// 16. integrationsChipStrip — Single card with eyebrow + horizontal chip row
// =============================================================================
/**
 * @param {FrameNode} slide
 * @param {object} opts
 *   @param {string} opts.eyebrow            e.g. "INTEGRATIONS"
 *   @param {Array<{label:string, fill?:string}>} opts.integrations  6-8 chips
 *   @param {object} opts.position           { x, y, width, height } — defaults to bottom strip
 *   @param {string} opts.cardFill           e.g. "lavender" — outer card pastel
 */
function buildIntegrationsChipStrip(slide, opts, C) {
  const pos = opts.position || { x: 64, y: 820, width: 1792, height: 132 };
  const fillMap = { cyan: C.cyan, lavender: C.lavender, peach: C.peach, yellow: C.yellow, pink: C.pink, mint: C.mint, cream: C.cream };

  const card = AF(slide, {
    dir: 'VERTICAL', primary: 'FIXED', counter: 'FIXED', w: pos.width, h: pos.height,
    fill: (opts.cardFill && fillMap[opts.cardFill]) || C.lavender,
    r: 24, padL: 24, padR: 24, padT: 24, padB: 24, gap: 14, align: 'MIN'
  });
  card.x = pos.x; card.y = pos.y;

  if (opts.eyebrow) {
    T(card, { t: opts.eyebrow, f: FN(INTER, 'Medium'), s: 22, c: C.primary, ls: 6, fillW: true });
  }

  const chipRow = AF(card, {
    dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 8, align: 'MIN', crossAlign: 'CENTER',
    layoutAlign: 'STRETCH'
  });
  const chipColors = [C.cyan, C.peach, C.yellow, C.pink, C.mint, C.cream, C.lavender];
  opts.integrations.forEach((it, i) => {
    const fill = (it.fill && fillMap[it.fill]) || chipColors[i % chipColors.length];
    const pill = AF(chipRow, {
      dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO',
      fill: fill, r: 14, padL: 14, padR: 14, padT: 10, padB: 10, align: 'CENTER', crossAlign: 'CENTER'
    });
    T(pill, { t: it.label, f: FN(INTER, 'Semi Bold'), s: 22, c: C.ink });
  });
}
