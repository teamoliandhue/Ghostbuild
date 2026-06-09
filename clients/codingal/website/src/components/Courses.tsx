"use client";

import { useState } from "react";
import Image from "next/image";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Filter = "All" | Level;

const LEVEL_STYLE: Record<Level, string> = {
  Beginner: "bg-grass text-ink",
  Intermediate: "bg-sky text-ink",
  Advanced: "bg-grape text-ink",
};

// Active filter pill colours (matches the level badge colours)
const FILTER_ACTIVE: Record<Filter, string> = {
  All:          "bg-coral text-white border-ink shadow-hard-sm",
  Beginner:     "bg-grass text-ink border-ink shadow-hard-sm",
  Intermediate: "bg-sky text-ink border-ink shadow-hard-sm",
  Advanced:     "bg-grape text-ink border-ink shadow-hard-sm",
};

const FILTER_IDLE = "bg-surface text-ink border-ink hover:bg-cream-deep";

const FILTERS: Filter[] = ["All", "Beginner", "Intermediate", "Advanced"];

const COURSES: {
  title: string;
  img: string;
  grade: string;
  level: Level;
  outcome: string;
  meta: string;
}[] = [
  {
    title: "Scratch Programming with AI",
    img: "/images/course-scratch-programming.jpg",
    grade: "Grade 1-8",
    level: "Beginner",
    outcome: "First taste of code. Kids build animations and games by dragging blocks.",
    meta: "36 lessons · 2-4 months",
  },
  {
    title: "Block Coding Legend",
    img: "/images/course-block-coding-adv.jpg",
    grade: "Grade 1-5",
    level: "Beginner",
    outcome: "Advanced block coding for the youngest builders who want more.",
    meta: "48 lessons · 6 months",
  },
  {
    title: "Game Development for Kids",
    img: "/images/course-game-development.jpg",
    grade: "Grade 4-8",
    level: "Intermediate",
    outcome: "Design and ship playable games with AI-assisted tools.",
    meta: "36 lessons · 2-4 months",
  },
  {
    title: "Roblox Champion",
    img: "/images/course-roblox-champion.jpg",
    grade: "Grade 4-8",
    level: "Intermediate",
    outcome: "Build and design epic Roblox worlds other kids actually play.",
    meta: "36 lessons · 2-4 months",
  },
  {
    title: "App Development for Kids",
    img: "/images/course-app-development.jpg",
    grade: "Grade 4-8",
    level: "Intermediate",
    outcome: "Create AI-powered apps that run on a real phone.",
    meta: "36 lessons · 2-4 months",
  },
  {
    title: "AI Genius",
    img: "/images/course-ai-genius.jpg",
    grade: "Grade 3-7",
    level: "Intermediate",
    outcome: "ChatGPT, AI apps and games, explained at a kid's level.",
    meta: "48 lessons · 4-6 months",
  },
  {
    title: "Website Development",
    img: "/images/course-web-development.jpg",
    grade: "Grade 8-12",
    level: "Advanced",
    outcome: "Build and launch real AI-powered websites from scratch.",
    meta: "90 lessons · 10-12 months",
  },
  {
    title: "Python Champion",
    img: "/images/course-python-champion.jpg",
    grade: "Grade 6-12",
    level: "Intermediate",
    outcome: "Move from blocks to real Python, the language pros use daily.",
    meta: "44 lessons · 4-6 months",
  },
  {
    title: "AI & Data Science for Teens",
    img: "/images/course-data-science.jpg",
    grade: "Grade 9-12",
    level: "Advanced",
    outcome: "Python, analytics and machine learning for university-bound teens.",
    meta: "168 lessons · 18-20 months",
  },
];

export default function Courses() {
  const [active, setActive] = useState<Filter>("All");

  const visible = active === "All"
    ? COURSES
    : COURSES.filter((c) => c.level === active);

  return (
    <section id="courses" className="bg-cream-deep/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="reveal max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            Courses
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            15 courses, mapped to your child&apos;s grade. From first block of
            code to AP Computer Science.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Every course is a structured path with real projects at the end of
            each stage. Here are nine of the most popular.
          </p>
        </div>

        {/* Filter bar */}
        <div className="reveal mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-150 ${
                  isActive ? FILTER_ACTIVE[f] : FILTER_IDLE
                }`}
              >
                {/* coloured dot for non-All filters */}
                {f !== "All" && (
                  <span
                    className={`h-2.5 w-2.5 rounded-full border border-ink/30 ${
                      f === "Beginner" ? "bg-grass" :
                      f === "Intermediate" ? "bg-sky" : "bg-grape"
                    }`}
                  />
                )}
                {f}
                {/* count badge */}
                <span className={`rounded-full border border-ink/20 px-2 py-0.5 text-[11px] font-semibold ${
                  isActive ? "bg-white/30" : "bg-cream-deep"
                }`}>
                  {f === "All" ? COURSES.length : COURSES.filter(c => c.level === f).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Course grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <article
              key={c.title}
              className="card-out group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[7/3] w-full overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="chip absolute left-3 top-3 bg-white px-3 py-1 text-xs shadow-hard-sm">
                  {c.grade}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className={`chip mb-3 w-fit px-2.5 py-1 text-[11px] uppercase tracking-wide ${LEVEL_STYLE[c.level]}`}>
                  {c.level}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {c.outcome}
                </p>
                <div className="mt-5 flex items-center justify-between border-t-2 border-ink/10 pt-4">
                  <span className="text-xs font-medium text-ink-soft">{c.meta}</span>
                  <a
                    href="#trial"
                    className="text-sm font-semibold text-coral transition-colors hover:text-coral-dark"
                  >
                    Try free &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="mt-10 rounded-2xl border-2 border-ink bg-surface py-16 text-center shadow-hard">
            <p className="text-lg font-semibold text-ink">No courses found for this filter.</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <a href="#courses" className="btn btn-secondary px-7 py-3.5 text-base text-ink">
            Browse all 15 courses
          </a>
        </div>
      </div>
    </section>
  );
}
