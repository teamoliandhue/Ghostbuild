"use client";

import { useState } from "react";
import Image from "next/image";

const WEEKS = [
  {
    tag: "Week 1",
    title: "First working program",
    body: "No installs. Open a browser, meet your instructor 1-on-1, and write real code in the very first session. Most kids ship a small animation before the hour is up.",
    tool: "Scratch / Block coding",
    toolIcon: "🧩",
    img: "/images/project-dance.png",
    imgBg: "bg-coral-soft",
    alt: "Student's first animation project — a dance party built in Scratch",
    dotFill: "bg-coral border-coral",
    dotActive: "border-coral",
    cardAccent: "border-l-coral",
  },
  {
    tag: "Week 4",
    title: "First real project ships",
    body: "By session four the child moves from exercises to a complete, shareable project. Games, interactive stories, solar system simulations — something they can show a friend.",
    tool: "Python basics / Scratch advanced",
    toolIcon: "🐍",
    img: "/images/project-solar.png",
    imgBg: "bg-sky-soft",
    alt: "Student's solar system animation project",
    dotFill: "bg-sky border-sky",
    dotActive: "border-sky",
    cardAccent: "border-l-sky",
  },
  {
    tag: "Week 8",
    title: "Building real-world apps",
    body: "After eight sessions the child is writing Python, building working web pages, or designing playable games with AI tools. The projects go on a portfolio, not just a screenshot.",
    tool: "Python / Web dev / Game dev",
    toolIcon: "🚀",
    img: "/images/project-premier.png",
    imgBg: "bg-grass-soft",
    alt: "Student's Premier League voting website — Grade 10",
    dotFill: "bg-grass border-grass",
    dotActive: "border-grass",
    cardAccent: "border-l-grass",
  },
];

const TOOLS = [
  { name: "Scratch",      color: "bg-coral-soft" },
  { name: "Python",       color: "bg-sun-soft"   },
  { name: "Roblox",       color: "bg-sky-soft"   },
  { name: "HTML / CSS",   color: "bg-grape-soft" },
  { name: "AI & ChatGPT", color: "bg-grass-soft" },
  { name: "Game dev",     color: "bg-pink-soft"  },
];

export default function ClassPreview() {
  const [active, setActive] = useState(0);
  const current = WEEKS[active];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

      {/* ── Heading ── */}
      <div className="reveal max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          Inside a class
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Here&apos;s exactly what your child&apos;s journey looks like.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Every session is live, 1-on-1 with a vetted instructor. Here is what
          actually happens, week by week, with real student projects as proof.
        </p>
      </div>

      {/* ── Stepper + Project preview ── */}
      <div className="reveal mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

        {/* LEFT — vertical stepper */}
        <div className="card-out bg-surface p-6 sm:p-8">
          <ul className="relative space-y-0">
            {WEEKS.map((w, i) => {
              const isCurrent = i === active;
              const isFuture  = i > active;
              const isLast    = i === WEEKS.length - 1;

              return (
                <li key={w.tag} className="relative flex gap-5">

                  {/* ── Dot + line column (fixed 40px wide) ── */}
                  <div className="flex w-10 flex-none flex-col items-center">
                    {/* dot */}
                    <button
                      onClick={() => setActive(i)}
                      aria-label={`Select ${w.tag}`}
                      className="z-10 mt-5 flex-none focus:outline-none"
                    >
                      {isCurrent ? (
                        /* active: outer coral ring + inner filled dot */
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] bg-surface shadow-hard-sm ${w.dotActive} border-ink`}>
                          <span className={`h-4 w-4 rounded-full ${w.dotFill} border-2 border-ink`} />
                        </span>
                      ) : (
                        /* inactive: light outlined circle + small grey dot */
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/20 bg-surface">
                          <span className="h-3 w-3 rounded-full bg-ink/20" />
                        </span>
                      )}
                    </button>
                    {/* connector line — hidden on last item */}
                    {!isLast && (
                      <div className="mt-2 w-0.5 flex-1 bg-ink/15" style={{ minHeight: "32px" }} />
                    )}
                  </div>

                  {/* ── Content column ── */}
                  <div className={`mb-6 flex-1 cursor-pointer rounded-2xl transition-all duration-200 ${
                    isCurrent
                      ? "border-2 border-ink bg-cream-deep p-5 shadow-hard-sm"
                      : "p-2 pb-0 hover:bg-cream-deep/40 rounded-xl"
                  }`}
                    onClick={() => setActive(i)}
                  >
                    <p className={`text-xs font-bold uppercase tracking-widest ${
                      isCurrent ? "text-coral" : isFuture ? "text-ink/35" : "text-ink-soft"
                    }`}>
                      {w.tag}
                    </p>
                    <p className={`font-display mt-1 text-xl font-semibold leading-snug ${
                      isFuture ? "text-ink/35" : "text-ink"
                    }`}>
                      {w.title}
                    </p>
                    {isCurrent && (
                      <>
                        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                          {w.body}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm">{w.toolIcon}</span>
                          <span className="rounded-full border border-ink/20 bg-surface px-3 py-0.5 text-xs font-semibold text-ink-soft">
                            {w.tool}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — project screenshot for active step */}
        <div className="sticky top-24">
          <div className="card-out-lg overflow-hidden">
            {/* image */}
            <div className={`relative aspect-[4/3] w-full ${current.imgBg}`}>
              <Image
                src={current.img}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 540px"
                className="object-contain p-6"
                priority
              />
              <span className="chip absolute left-4 top-4 border-ink bg-white px-3 py-1 text-xs font-bold shadow-hard-sm">
                {current.tag} project
              </span>
            </div>
            {/* caption */}
            <div className="p-5">
              <p className="font-display text-xl font-semibold text-ink">{current.title}</p>
              <p className="mt-1 text-sm text-ink-soft">
                A real project built by a Codingal student — not a template, not a demo.
              </p>
              <a href="#trial" className="btn btn-primary mt-4 w-full py-3 text-sm text-white">
                Book a free trial class
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tools ── */}
      <div className="reveal mt-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          Tools &amp; languages
        </p>
        <p className="mt-2 text-lg font-semibold text-ink">
          What your child actually learns to use:
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {TOOLS.map((t) => (
            <span key={t.name} className={`chip border-ink px-4 py-2 text-sm font-bold text-ink shadow-hard-sm ${t.color}`}>
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Dashboard ── */}
      <div className="reveal mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            After every session
          </p>
          <h3 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            You see exactly what was built. Every time.
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            The parent dashboard logs every session: what was covered, what the
            child built, and how they are tracking against the course plan. No
            wondering what happened in class.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Session notes written by the instructor after every class",
              "Project files and screenshots saved automatically",
              "Parent-teacher meeting after session 6 and 12 with a written report",
            ].map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-ink bg-grass text-sm font-bold text-ink">
                  ✓
                </span>
                <span className="text-[15px] leading-relaxed text-ink">{pt}</span>
              </li>
            ))}
          </ul>
          <a href="#trial" className="btn btn-primary mt-8 px-7 py-3.5 text-base text-white">
            Book a free trial class
          </a>
        </div>

        <div className="card-out-lg overflow-hidden p-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-cream-deep">
            <Image
              src="/images/dashboard.png"
              alt="The Codingal parent and student dashboard"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
