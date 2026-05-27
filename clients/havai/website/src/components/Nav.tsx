"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "Air Coolers", href: "#categories" },
  { label: "BLDC Fans", href: "#categories" },
  { label: "Mist Fans", href: "#categories" },
  { label: "Why Havai", href: "#why" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-[var(--color-yellow)] text-[var(--color-ink)] text-center text-[13px] font-medium py-2 px-4">
      Pre-summer sale live. Save up to ₹4,000 on Arizona &amp; 8X coolers · Free shipping across India
    </div>
  );
}

export function Nav() {
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
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="Havai home">
          <Image
            src="/logo/logo.png"
            alt="Havai"
            width={120}
            height={40}
            priority
            className={`h-9 w-auto transition ${scrolled ? "" : "brightness-0 invert"}`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-[14px] font-medium tracking-tight transition-colors ${
                scrolled
                  ? "text-[var(--color-ink)] hover:text-[var(--color-navy-700)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919999999999?text=Hi%20Havai%2C%20I%27d%20like%20a%20sizing%20recommendation"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-flex items-center text-[14px] font-semibold rounded-full px-5 py-2.5 transition ${
              scrolled
                ? "bg-[var(--color-navy-700)] text-white hover:bg-[var(--color-navy-800)]"
                : "bg-white text-[var(--color-navy-900)] hover:bg-white/90"
            }`}
          >
            Talk to an expert
          </a>
          <button
            className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full ${
              scrolled ? "text-[var(--color-ink)]" : "text-white"
            }`}
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[var(--color-border)] px-6 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] font-medium text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/919999999999?text=Hi%20Havai%2C%20I%27d%20like%20a%20sizing%20recommendation"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[var(--color-navy-700)] text-white text-[14px] font-semibold rounded-full px-5 py-3"
          >
            Talk to an expert
          </a>
        </div>
      )}
    </header>
  );
}
