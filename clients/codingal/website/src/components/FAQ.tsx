"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How much does it cost, and what's included?",
    a: "Plans start at an indicative $59 a month for one private 1-on-1 class a week, up to $149 for three or more. Every plan includes full course access, the parent dashboard, and progress reports. Your exact plan is confirmed on your free trial call, and the first class is free either way.",
  },
  {
    q: "Is my child too young, or too old, to start?",
    a: "We teach ages 5 to 17. Younger kids start with drag-and-drop block coding and animations; older students move into Python, web development, AI and AP Computer Science. After the free trial we map a course to your child's exact grade and pace.",
  },
  {
    q: "What if my child loses interest, or we want to stop?",
    a: "You can pause or cancel any time. There is a 30-day money-back guarantee, no questions asked. Because classes are 1-on-1, the instructor also adjusts the projects to keep your child engaged, so disinterest is rare once a kid ships their first game.",
  },
  {
    q: "How is this better than free coding videos on YouTube?",
    a: "Videos can't see your child's screen, can't answer a question, and can't tell when they're stuck. A live instructor does all three, every session, and holds your child accountable with real projects and parent reports. That is the difference between watching coding and actually doing it.",
  },
  {
    q: "How much screen time does this actually add?",
    a: "Classes are typically one hour, once or twice a week. It is screen time spent building and creating rather than scrolling, and most parents tell us their child starts making things outside class too.",
  },
  {
    q: "Do we need a special computer or software?",
    a: "Any laptop or desktop with a browser and a webcam works. There's nothing to install. We send a system check link before the first class so you know it works ahead of time.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-out reveal mb-4 bg-surface px-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-ink">{q}</span>
        <span
          className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border-2 border-ink bg-coral-soft text-lg leading-none text-ink transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-[15px] leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream-deep/50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="reveal text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            FAQ
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            The questions parents actually ask.
          </h2>
        </div>
        <div className="mt-10">
          {FAQS.map((f) => (
            <Item key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
