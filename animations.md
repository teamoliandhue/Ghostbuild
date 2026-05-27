# GhostBuild Animation Library
**Version 1.1**

A living reference of animations used across GhostBuild sites. Each entry documents what the animation looks like, what industry it suits, how to implement it, and what to watch out for. Add a new entry every time a new animation is used in a build and validated by the team.

---

## How to Use This File

When starting a new build, read the client's industry, scroll to the matching section, and pick the animation that fits best. If the reference website has a specific animation style, check if it already exists here before writing new Three.js code. Reuse and adapt over writing from scratch.

After a build ships, come back and rate the animation in the field provided.

---

## Three.js Background Animations

These run on a canvas behind the hero section. Always subtle. Never the main event.

---

### 1. Wireframe Globe

**What it looks like**
A slowly rotating sphere made of longitude and latitude lines. Dots glow at the intersections. Optional orbit rings around it. Feels like a satellite view or a global network.

**Best for**
Education, study abroad, logistics, international business, travel, NGOs, anything with a "global reach" story.

**Technical approach**
```typescript
// SphereGeometry with wireframe: true
const geo = new THREE.SphereGeometry(2, 36, 36);
const mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x2a7ad5, transparent: true, opacity: 0.18 });
// Add PointsMaterial dots at vertices for depth
// Add RingGeometry orbit rings tilted at 15deg and 55deg
// Rotate Y: 0.0012 per frame, X: 0.0003 per frame
```

**Performance**
Light. Runs comfortably at 60fps on mid-range devices.

**Opacity range**
0.12 to 0.20 on dark backgrounds. Nearly invisible on light backgrounds.

**Team rating after use**
_Not yet rated_

---

### 2. Particle Field / Constellation

**What it looks like**
Hundreds of small dots floating slowly in 3D space. Some connected by faint lines when close to each other. Feels like a night sky or a neural network at rest.

**Best for**
Tech, SaaS, AI products, fintech, data companies, anything that should feel intelligent and interconnected.

**Technical approach**
```typescript
// BufferGeometry with random Float32Array positions
// PointsMaterial with small size (0.02 to 0.05)
// For connection lines: every frame check distances, draw LineSegments for pairs under threshold
// Move particles: each frame add a tiny sin/cos offset per particle using time uniform
```

**Performance**
Medium. Keep particle count under 300 if drawing connection lines. Without lines, up to 800 is fine.

**Opacity range**
0.4 to 0.7 on dark backgrounds. Not suitable for light backgrounds.

**Team rating after use**
_Not yet rated_

---

### 3. Wave Mesh / Plane

**What it looks like**
A flat grid of vertices that ripples like a calm ocean surface. Vertices move up and down in a sine wave pattern. Can be viewed from above (top-down) or at a slight angle.

**Best for**
Finance, investment, healthcare, anything that needs to feel steady, rhythmic, and trustworthy without being aggressive.

**Technical approach**
```typescript
// PlaneGeometry with high segment count (80x80 minimum)
// In animation loop: iterate vertices, set Z = sin(x * freq + time) * amplitude
// Keep amplitude low (0.1 to 0.3) so it reads as calm, not chaotic
// Tilt camera slightly: camera.position.set(0, 3, 5), lookAt(0,0,0)
```

**Performance**
Medium. With 80x80 plane that is 6400 vertices being updated every frame. Use a typed array and update only the position attribute, not the whole geometry.

**Opacity range**
0.15 to 0.25. Works on both dark and very light backgrounds.

**Team rating after use**
_Not yet rated_

---

### 4. Flowing Lines / Data Streams

**What it looks like**
Thin curved lines that travel across the screen from one point to another, like electricity flowing through a circuit or data moving across a network. Individual lines appear, travel, then fade out.

**Best for**
SaaS, logistics, supply chain, API companies, developer tools, anything where "data moving fast" is the core metaphor.

**Technical approach**
```typescript
// Use CatmullRomCurve3 with random control points
// getPoints(50) to build the line geometry
// Animate by progressively revealing points (drawRange) then resetting
// Spawn 20 to 40 lines at staggered intervals using a simple pool
```

**Performance**
Light per line. Keep total active lines under 30.

**Opacity range**
0.2 to 0.5. Best on very dark backgrounds.

**Team rating after use**
_Not yet rated_

---

### 5. Low-Poly Terrain

**What it looks like**
A landscape of flat-shaded triangular facets, like a mountain range seen from the side, built from geometric shapes. Still or very slowly animated.

**Best for**
Real estate, construction, architecture, outdoors, property tech, hospitality.

**Technical approach**
```typescript
// PlaneGeometry, then randomise vertex Y positions before computing normals
// Use MeshLambertMaterial (not wireframe) with flatShading: true
// Add DirectionalLight and AmbientLight — the flat shading needs light to look good
// Slow rotation or no animation at all — terrain works static
```

**Performance**
Light. No per-frame vertex updates needed if static.

**Opacity range**
Full opacity works. This one is more of a scene element than a subtle overlay.

**Team rating after use**
_Not yet rated_

---

### 6. DNA Helix

**What it looks like**
Two intertwined spirals with connecting crossbars between them, slowly rotating around the vertical axis. Reads as science, biology, or research.

**Best for**
Healthcare, biotech, pharmaceuticals, medical clinics, lab services, nutrition, genetics.

**Technical approach**
```typescript
// Two helices: each is a series of SphereGeometry dots placed using
// x = r * cos(t), y = t * verticalSpacing, z = r * sin(t)
// Connect opposing dots with TubeGeometry or CylinderGeometry crossbars
// Rotate the whole group around Y axis slowly
```

**Performance**
Light. Number of spheres stays low (40 to 60 per helix).

**Opacity range**
0.15 to 0.30 on dark backgrounds.

**Team rating after use**
_Not yet rated_

---

### 7. Floating Geometric Shapes

**What it looks like**
Several 3D geometric forms (icosahedra, octahedra, toruses) floating at different depths, slowly rotating independently. Feels modern, abstract, creative.

**Best for**
Design agencies, creative studios, fashion, architecture, brand consultancies.

**Technical approach**
```typescript
// 5 to 8 shapes: mix IcosahedronGeometry, OctahedronGeometry, TorusGeometry
// Each gets a random rotation speed on all 3 axes
// Float up and down: position.y += sin(time + phaseOffset) * 0.002
// Use MeshBasicMaterial wireframe OR MeshStandardMaterial with low metalness
```

**Performance**
Light.

**Opacity range**
0.15 to 0.35. Works on dark backgrounds.

**Team rating after use**
_Not yet rated_

---

### 13. Airflow Streams

**What it looks like**
Thin, near-horizontal curves that drift across the canvas left-to-right at varied speeds and Y offsets. Each stream is short (under half the viewport wide), slightly wavy via a sine offset, and fades a small accent line (lighter blue) every 5th stream to add depth. Reads as visible air movement — exactly what a fan or cooler brand should suggest.

**Best for**
Fans, coolers, HVAC, ventilation, energy/utility, aerospace, anything where the product literally moves air or fluid. First used on Havai (BLDC fans + air coolers).

**Technical approach**
```typescript
// OrthographicCamera so streams stay screen-aligned regardless of FOV
// Per stream:
//   - BufferGeometry with 80 segments, positions Float32Array
//   - LineBasicMaterial: opacity 0.18 (white) or 0.32 (accent every 5th)
// Animation loop (capped at 30fps):
//   - head = (t * speed + offset) % 3 - 1.5  (wraps left to right)
//   - for each segment u: x = head - u * width
//   - y = yBase + sin((x + offset) * freq + t * 0.4) * amp
// 22 streams default. yBase distributed across the viewport vertical range.
// Honour prefers-reduced-motion: skip the animation loop entirely.
```

**Performance**
Light. 22 lines * 80 segments * one position update per frame, plus 30fps cap. Even on a low-end laptop the canvas stays under 4% CPU.

**Opacity range**
0.18 to 0.32 on dark backgrounds. Do not use on light backgrounds — the streams need contrast against navy/charcoal to read as airflow.

**Team rating after use**
_Not yet rated — debut on Havai (2026-05-27)._

---

## CSS and JavaScript Animations

These run on page elements, not on a Three.js canvas. Used for scroll reveals, hover effects, and counters.

---

### 8. Scroll-Triggered Fade and Slide Up

**What it looks like**
Elements start invisible and slightly below their final position. When they enter the viewport, they fade in and slide up into place. The most common high-quality site animation.

**Best for**
Every site. This is the baseline. If no other animation fits, this one always does.

**Technical approach**
```typescript
// Use IntersectionObserver, threshold: 0.15
// Initial state: opacity 0, transform translateY(24px)
// On intersect: transition to opacity 1, translateY(0) over 0.5s ease-out
// Stagger children: each child adds 0.08s delay based on its index
```

**When to stagger**
Card grids, feature lists, testimonials. Stagger makes the section feel alive without being flashy.

**Team rating after use**
_Not yet rated_

---

### 9. Counting Number Animation

**What it looks like**
A statistic like "200+" counts up from 0 to its final value when scrolled into view. Makes numbers feel earned rather than static.

**Best for**
Any stats section. Study abroad consultancies, fintech, healthcare outcomes, agency results.

**Technical approach**
```typescript
// IntersectionObserver triggers the count
// requestAnimationFrame loop: currentValue += (target - currentValue) * 0.08
// Stop when within 0.5 of target
// Keep duration under 1.5 seconds — longer feels slow
```

**Watch out for**
Decimals looking weird mid-count. Round to integer during animation, show the final formatted value when done.

**Team rating after use**
_Not yet rated_

---

### 10. Magnetic Button

**What it looks like**
When the cursor comes near a button, the button gently drifts toward the cursor as if magnetised. It snaps back when the cursor leaves. Used on premium agency sites constantly.

**Best for**
Creative agencies, design studios, luxury brands. Adds significant perceived quality to CTAs.

**Technical approach**
```typescript
// mousemove on or near the button element
// Calculate offset: (mouseX - buttonCenterX) * 0.25
// Apply as transform: translate(offsetX, offsetY)
// On mouseleave: transition back to translate(0, 0) with 0.4s ease
```

**Watch out for**
Only apply to buttons with enough padding. Too small a button and it looks broken.

**Team rating after use**
_Not yet rated_

---

### 11. Text Reveal (Split by Line)

**What it looks like**
Hero headline words or lines appear by sliding up from behind a clipping mask, one line at a time. Used heavily on Awwwards-level sites. Feels cinematic.

**Best for**
Hero sections on premium sites. Works with large headings (48px and above). Looks bad on body text.

**Technical approach**
```typescript
// Split headline into individual lines using a wrapper div per line
// Each line div: overflow hidden
// Inner span starts at translateY(100%) — hidden below the clip
// On page load: stagger each span to translateY(0) with 0.6s ease-out
// Delay: 0s, 0.1s, 0.2s per line
```

**Watch out for**
Does not work with dynamic line wrapping. Set a fixed max-width on the heading or the split will break at different screen sizes.

**Team rating after use**
_Not yet rated_

---

### 12. Horizontal Scroll Section

**What it looks like**
A section where the page appears to scroll sideways while the user scrolls down normally. Cards or panels move left as you scroll. Used for showcasing work, case studies, or feature comparisons.

**Best for**
Portfolios, agency case studies, product feature comparisons, testimonial carousels on large screens.

**Technical approach**
```typescript
// Pin the section using position sticky
// Track scroll progress within the pinned section
// Translate the inner container: translateX(-progress * totalScrollWidth)
// Use CSS scroll-snap for a cleaner snap-to-card feel
```

**Watch out for**
Complex on mobile. Either disable horizontal scroll on mobile and use a vertical stack, or use a native horizontal scroll with overflow-x: scroll and hide the scrollbar.

**Team rating after use**
_Not yet rated_

---

## Animation Decision Guide

When picking an animation for a new build, answer these three questions:

**1. What is the hero section background: dark or light?**
- Dark: any Three.js animation works. Start with Wireframe Globe or Particle Field.
- Light: use very low opacity Three.js (Wave Mesh works best) or no Three.js at all.

**2. What does the client's industry communicate?**
- Global / international: Globe
- Tech / data: Particle Field or Flowing Lines
- Finance / healthcare: Wave Mesh
- Real estate: Low-Poly Terrain
- Medical / science: DNA Helix
- Creative / design: Floating Shapes
- Fans / cooling / HVAC / ventilation: Airflow Streams

**3. What does the reference website do?**
- Always check what the reference site uses first.
- If the reference has no background animation, do not force one in.
- If the reference has subtle scroll reveals, make sure every section uses them.

---

## Adding a New Animation

When a new animation is used in a GhostBuild and approved:
1. Add it here with all fields filled in
2. Include the working code snippet (simplified but functional)
3. Note the team rating after the client sees it
4. Bump the version number at the top of this file

---

*Last updated: 2026-05-27 — v1.1 added Airflow Streams (Three.js #13, debut on Havai)*
