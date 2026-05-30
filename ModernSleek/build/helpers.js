// =============================================================================
// Modern Sleek Deck — Helpers
// =============================================================================
// Inline these helpers into every `use_figma` script that builds slides.
// They wrap the Figma Plugin API in a way that is shorter, safer, and reflects
// our autolayout-first deck conventions.
//
// Three primary helpers:
//   FN(family, style)  — shorthand for fontName objects
//   AF(parent, opts)   — autolayout frame factory with sensible defaults
//   T(parent, opts)    — text node factory that handles font loading + sizing
//
// Plus utilities for color (hex → rgb), font loading, and brand-color override.
// =============================================================================


// -----------------------------------------------------------------------------
// FONT NAME SHORTHAND
// -----------------------------------------------------------------------------
function FN(family, style) {
  return { family: family, style: style || 'Regular' };
}

// Common family constants (match design_tokens.json typography stack)
const RC    = 'Radio Canada Big';   // display headlines + stats
const SS    = 'Source Serif 4';     // subheads
const INTER = 'Inter';              // body, eyebrows, card titles
const MONO  = 'Geist Mono';         // mono labels (rare)


// -----------------------------------------------------------------------------
// LOAD ALL FONTS THE DECK NEEDS
// -----------------------------------------------------------------------------
// Call once at the top of every build script before creating any text.
// Awaits all fonts in parallel; falls through silently if a font isn't loadable.
async function loadDeckFonts() {
  const desired = [
    { family: INTER, style: 'Regular' },
    { family: INTER, style: 'Medium' },
    { family: INTER, style: 'Semi Bold' },
    { family: INTER, style: 'Bold' },
    { family: SS,    style: 'Regular' },
    { family: RC,    style: 'Medium' },
    { family: MONO,  style: 'Regular' },
    { family: MONO,  style: 'Medium' },
  ];
  for (const f of desired) {
    try { await figma.loadFontAsync(f); } catch (e) { /* font not available — pattern functions will fall back */ }
  }
}


// -----------------------------------------------------------------------------
// COLOR HELPERS
// -----------------------------------------------------------------------------
function hex(h) {
  // Convert "#RRGGBB" → { r, g, b } in 0..1 for Figma's color API.
  const s = h.replace('#', '');
  return {
    r: parseInt(s.slice(0, 2), 16) / 255,
    g: parseInt(s.slice(2, 4), 16) / 255,
    b: parseInt(s.slice(4, 6), 16) / 255,
  };
}

// Build the deck color object once, with brand primary parameterized.
// brandPrimaryHex MUST be passed — it's the confirmed website colour from
// clients/[slug]/brand.md (locked in Phase 3 of Stage 1). There is no sensible
// default; if no hex is provided the build throws so the agent stops and reads
// brand.md instead of guessing.
function buildColors(brandPrimaryHex) {
  if (!brandPrimaryHex) {
    throw new Error('buildColors: brandPrimaryHex is required. Read it from clients/[slug]/brand.md (confirmed website colour from Phase 3 of Stage 1).');
  }
  const primary = hex(brandPrimaryHex);
  return {
    // primary (customer brand)
    primary:    primary,

    // text + paper
    white:      hex('#FFFFFF'),
    ink:        hex('#0B0E18'),
    muted:      hex('#6C6C70'),
    pillBg:     hex('#EDEFFF'),
    navTrack:   hex('#F5F5F8'),
    ghost:      hex('#F7F7F9'),

    // pastels (fixed deck-wide)
    cyan:       hex('#C6F1FF'),
    lavender:   hex('#E0D4F7'),
    peach:      hex('#FFAFA3'),
    yellow:     hex('#FFE166'),
    pink:       hex('#FFA8DB'),
    mint:       hex('#DFEBCF'),
    cream:      hex('#FFF4DE'),

    // pastel-deep (sales row, two-tone hierarchy)
    cyanDeep:     hex('#8CD9F2'),
    lavenderDeep: hex('#C7B3EB'),
    peachDeep:    hex('#F58D80'),
    yellowDeep:   hex('#F2C84D'),

    // semantic
    yes:        hex('#4DAF50'),
    no:         hex('#E84D3D'),

    // gradient stops for cover slides
    coverGradStart: hex('#A8D3FF'),
    coverGradEnd:   hex('#FFF4DE'),
  };
}

// Convenience: rotate through the pastel palette in a stable order.
// Use this when a pattern has N cards and you want each to get a different fill.
function pastelCycle(C, n) {
  const pool = [C.cyan, C.lavender, C.peach, C.mint, C.yellow, C.pink, C.cream];
  const out = [];
  for (let i = 0; i < n; i++) out.push(pool[i % pool.length]);
  return out;
}


// -----------------------------------------------------------------------------
// AUTOLAYOUT FRAME FACTORY
// -----------------------------------------------------------------------------
// AF(parent, opts) creates a frame, applies autolayout + sizing + padding +
// alignment + fills + radius, then appends to parent. Position via opts.x/y is
// applied AFTER appendChild so it works even when the parent isn't autolayout.
//
// opts:
//   dir          'VERTICAL' (default) | 'HORIZONTAL'
//   gap          itemSpacing (px)
//   pad          uniform padding (px). Or use padL/padR/padT/padB individually.
//   primary      'AUTO' (default) | 'FIXED'
//   counter      'AUTO' (default) | 'FIXED'
//   w, h         applied when primary or counter is 'FIXED'
//   align        primaryAxisAlignItems    'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'
//   crossAlign   counterAxisAlignItems    'MIN' | 'CENTER' | 'MAX' | 'BASELINE'
//   layoutGrow   0 (default) | 1
//   layoutAlign  'INHERIT' | 'STRETCH'    use 'STRETCH' to fill cross axis of parent
//   fill         {r,g,b}     solid fill color (use buildColors to get tokens)
//   gradient     [{type:'GRADIENT_LINEAR', gradientStops:[...], gradientTransform:[...]}, ...]
//   stroke       {r,g,b}
//   strokeW      number
//   r            cornerRadius
//   x, y         absolute position on the slide outer (applied after appendChild)
//   clip         clipsContent (bool)
function AF(parent, o) {
  const f = figma.createFrame();
  if (o.fill)         f.fills = [{ type: 'SOLID', color: o.fill }];
  else if (o.gradient) f.fills = o.gradient;
  else                f.fills = [];
  if (o.stroke)       f.strokes = [{ type: 'SOLID', color: o.stroke }];
  else                f.strokes = [];
  if (o.strokeW)      f.strokeWeight = o.strokeW;
  if (o.r != null)    f.cornerRadius = o.r;

  f.layoutMode = o.dir || 'VERTICAL';
  f.itemSpacing = o.gap || 0;

  f.paddingLeft   = o.padL != null ? o.padL : (o.pad || 0);
  f.paddingRight  = o.padR != null ? o.padR : (o.pad || 0);
  f.paddingTop    = o.padT != null ? o.padT : (o.pad || 0);
  f.paddingBottom = o.padB != null ? o.padB : (o.pad || 0);

  f.primaryAxisSizingMode = o.primary || 'AUTO';
  f.counterAxisSizingMode = o.counter || 'AUTO';

  if (o.primary === 'FIXED' || o.counter === 'FIXED') {
    const w = o.w != null ? o.w : f.width;
    const h = o.h != null ? o.h : f.height;
    f.resize(Math.max(w, 0.01), Math.max(h, 0.01));
  }

  if (o.align)       f.primaryAxisAlignItems = o.align;
  if (o.crossAlign)  f.counterAxisAlignItems = o.crossAlign;
  if (o.layoutGrow != null) f.layoutGrow = o.layoutGrow;
  if (o.layoutAlign) f.layoutAlign = o.layoutAlign;
  if (o.clip != null) f.clipsContent = o.clip;

  parent.appendChild(f);

  // Apply x/y AFTER appendChild — ensures direct slide placement works even
  // when the parent is non-autolayout (the slide outer frame).
  if (o.x != null) f.x = o.x;
  if (o.y != null) f.y = o.y;

  return f;
}


// -----------------------------------------------------------------------------
// TEXT NODE FACTORY
// -----------------------------------------------------------------------------
// T(parent, opts) creates a text node, applies font + size + color + alignment,
// then appends to parent. Position via opts.x/y is applied AFTER appendChild.
//
// opts:
//   t       string content (default '')
//   f       fontName object (use FN()). Default: FN(INTER, 'Regular')
//   s       fontSize (default 24)
//   c       color {r,g,b}
//   ls      letterSpacing in PERCENT (e.g. -2, 6)
//   lh      lineHeight in PERCENT (e.g. 130, 140)
//   a       textAlignHorizontal 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'
//   w       fixed width (sets textAutoResize='HEIGHT' so text wraps naturally)
//   x, y    absolute position (applied after appendChild)
//   fillW   if true, set layoutAlign='STRETCH' + textAutoResize='HEIGHT' so the
//           text fills the cross-axis of an autolayout parent
//   layoutGrow  0 | 1 — for text inside horizontal autolayout to take remaining space
function T(parent, o) {
  const t = figma.createText();
  t.fontName = o.f || FN(INTER, 'Regular');
  if (o.s != null) t.fontSize = o.s;
  t.characters = o.t || '';

  if (o.c)  t.fills = [{ type: 'SOLID', color: o.c }];
  if (o.ls != null) t.letterSpacing = { value: o.ls, unit: 'PERCENT' };
  if (o.lh != null) t.lineHeight    = { value: o.lh, unit: 'PERCENT' };
  if (o.a)  t.textAlignHorizontal = o.a;

  parent.appendChild(t);

  if (o.x != null) t.x = o.x;
  if (o.y != null) t.y = o.y;

  if (o.w != null) {
    t.textAutoResize = 'HEIGHT';
    t.resize(o.w, t.height);
  }
  if (o.fillW) {
    t.layoutAlign = 'STRETCH';
    t.textAutoResize = 'HEIGHT';
  }
  if (o.layoutGrow != null) t.layoutGrow = o.layoutGrow;

  return t;
}


// -----------------------------------------------------------------------------
// EYEBROW PILL — used at the top of nearly every content slide
// -----------------------------------------------------------------------------
function eyebrowPill(parent, label, C) {
  const pill = AF(parent, {
    dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO',
    fill: C.pillBg, r: 100, padL: 18, padR: 18, padT: 10, padB: 10
  });
  T(pill, { t: label.toUpperCase(), f: FN(INTER, 'Medium'), s: 24, c: C.primary, ls: 6 });
  return pill;
}


// -----------------------------------------------------------------------------
// HEADER ZONE — eyebrow + headline (+ optional subtitle)
// Returns the outer header frame; positioned at fixed x/y on the slide outer.
// -----------------------------------------------------------------------------
function buildHeaderZone(slide, opts, C) {
  // opts: { eyebrow, headline, subtitle, x, y, width, headlineSize }
  const x = opts.x != null ? opts.x : 64;
  const y = opts.y != null ? opts.y : 64;
  const width = opts.width != null ? opts.width : 1700;
  const hSize = opts.headlineSize != null ? opts.headlineSize : 60;

  // Eyebrow as floating pill at the top
  const pill = eyebrowPill(slide, opts.eyebrow, C);
  pill.x = x; pill.y = y;

  // Headline + subtitle vertical block below the eyebrow
  const headerZ = AF(slide, {
    dir: 'VERTICAL', primary: 'AUTO', counter: 'FIXED', w: width, gap: 14
  });
  T(headerZ, {
    t: opts.headline,
    f: FN(RC, 'Medium'), s: hSize, c: C.ink, ls: -2, lh: 110, fillW: true
  });
  if (opts.subtitle) {
    T(headerZ, {
      t: opts.subtitle,
      f: FN(SS, 'Regular'), s: 28, c: C.muted, lh: 140, fillW: true
    });
  }
  headerZ.x = x;
  headerZ.y = y + 80;
  return { pill: pill, header: headerZ };
}


// -----------------------------------------------------------------------------
// PAGE NUMBER — bottom-left "NN / Total"
// -----------------------------------------------------------------------------
function pageNumber(slide, n, total, C) {
  const pn = AF(slide, { dir: 'HORIZONTAL', primary: 'AUTO', counter: 'AUTO', gap: 12 });
  T(pn, { t: String(n).padStart(2, '0'), f: FN(INTER, 'Medium'), s: 22, c: C.ink });
  T(pn, { t: '/ ' + total, f: FN(INTER, 'Regular'), s: 22, c: C.muted });
  pn.x = 64; pn.y = 1010;
  pn.name = 'PageNum';
  return pn;
}


// -----------------------------------------------------------------------------
// BLACK EMPHASIS BANNER — full-width ink bar at the bottom of a slide
// -----------------------------------------------------------------------------
function blackBanner(slide, text, opts, C) {
  // opts: { x, y, width, height, fontSize }
  const x = opts.x != null ? opts.x : 64;
  const y = opts.y != null ? opts.y : 920;
  const w = opts.width != null ? opts.width : 1792;
  const h = opts.height != null ? opts.height : 70;
  const banner = AF(slide, {
    dir: 'HORIZONTAL', primary: 'FIXED', counter: 'FIXED', w: w, h: h,
    fill: C.ink, r: 24, padL: 32, padR: 32, align: 'CENTER', crossAlign: 'CENTER'
  });
  banner.x = x; banner.y = y;
  T(banner, {
    t: text, f: FN(INTER, 'Medium'),
    s: opts.fontSize != null ? opts.fontSize : 24,
    c: C.white, a: 'CENTER'
  });
  return banner;
}


// -----------------------------------------------------------------------------
// EXPORT (when this file is bundled into a single use_figma call, just inline
// every function above. There is no JS module loader inside the Plugin API.)
// -----------------------------------------------------------------------------
//
// Usage in a use_figma script:
//   1. Inline this file's functions (copy them into the script body).
//   2. await loadDeckFonts();
//   3. const C = buildColors(BRAND_HEX);   // BRAND_HEX from clients/[slug]/brand.md
//   4. Build slides using AF / T / eyebrowPill / buildHeaderZone / pageNumber / blackBanner
//      plus pattern functions from build/patterns.js.
