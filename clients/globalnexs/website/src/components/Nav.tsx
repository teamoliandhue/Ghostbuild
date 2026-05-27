"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#countries", label: "Countries" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open ? "bg-white/90 backdrop-blur-md border-b border-[var(--color-line)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center"
            style={{ minHeight: 44 }}
            onClick={() => setOpen(false)}
          >
            <Image src="/logo/logo.png" alt="Globalnex International" width={150} height={40} priority className="h-9 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-[14px] text-[var(--color-ink-soft)]">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--color-ink)] transition">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#book"
              className="cta-primary hidden sm:inline-flex"
              style={{ padding: "12px 22px", fontSize: 13 }}
            >
              Book a free check
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "1px solid var(--color-line)",
                background: open ? "var(--color-surface)" : "transparent",
              }}
            >
              <span style={{ position: "relative", width: 18, height: 14, display: "inline-block" }}>
                <span style={{
                  position: "absolute", left: 0, right: 0, height: 2, background: "var(--color-ink)",
                  top: open ? 6 : 0, transform: open ? "rotate(45deg)" : "none", transition: "all 0.3s ease",
                }} />
                <span style={{
                  position: "absolute", left: 0, right: 0, height: 2, background: "var(--color-ink)", top: 6,
                  opacity: open ? 0 : 1, transition: "opacity 0.2s ease",
                }} />
                <span style={{
                  position: "absolute", left: 0, right: 0, height: 2, background: "var(--color-ink)",
                  top: open ? 6 : 12, transform: open ? "rotate(-45deg)" : "none", transition: "all 0.3s ease",
                }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-[var(--color-line)]"
          >
            <nav className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ minHeight: 44, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500, color: "var(--color-ink)" }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="cta-primary mt-4"
                style={{ alignSelf: "stretch", justifyContent: "center" }}
              >
                Book a free eligibility check
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
