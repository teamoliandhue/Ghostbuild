"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A2558]/95 backdrop-blur-md border-b border-white/[0.07] px-6 md:px-[5%]">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-17">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo/logo.png"
            alt="GlobalNexs International"
            width={114}
            height={80}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["Services", "Process", "Stories", "FAQ"].map((item) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="#book"
          className="hidden md:inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8C55] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
        >
          Book Free Assessment →
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden pb-6 flex flex-col gap-4 border-t border-white/[0.07] pt-4">
          {["Services", "Process", "Stories", "FAQ"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-sm font-medium"
            >
              {item}
            </Link>
          ))}
          <Link
            href="#book"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center bg-[#FF6B2B] text-white text-sm font-bold px-5 py-2.5 rounded-lg"
          >
            Book Free Assessment →
          </Link>
        </div>
      )}
    </nav>
  );
}
