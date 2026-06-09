"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how" },
  { label: "Teachers", href: "#teachers" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md border-b-2 border-ink" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <a href="#top" className="flex items-center" aria-label="Codingal home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo.svg" alt="Codingal" className="h-8 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#courses"
            className="text-[15px] font-semibold text-ink transition-colors hover:text-coral"
          >
            See courses
          </a>
          <a
            href="#trial"
            className="btn btn-primary px-5 py-2.5 text-[15px] text-white"
          >
            Book a free trial
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-surface shadow-hard-sm lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-xl leading-none text-ink">{open ? "×" : "≡"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t-2 border-ink bg-cream px-5 pb-5 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#trial"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-full px-5 py-3 text-base text-white"
          >
            Book a free trial class
          </a>
        </div>
      )}
    </header>
  );
}
