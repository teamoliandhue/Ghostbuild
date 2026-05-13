"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { createGlobeScene } from "@/lib/three-scene";

const stats = [
  { value: "200+", label: "Students placed abroad" },
  { value: "92%", label: "Visa approval rate" },
  { value: "100+", label: "Partner universities" },
  { value: "20+", label: "Countries" },
];

const countries = ["🇬🇧 UK", "🇦🇺 Australia", "🇨🇦 Canada", "🇩🇪 Germany", "🇮🇪 Ireland"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = createGlobeScene(canvas);
    return cleanup;
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0A2558] flex items-center overflow-hidden px-6 md:px-[5%] py-24">
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      {/* Radial glow accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1B6AC9]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B2B]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF6B2B]/15 border border-[#FF6B2B]/30 px-3.5 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6B2B] animate-pulse" />
            <span className="text-[#FF6B2B] text-xs font-semibold tracking-wide">Kochi&apos;s Trusted Study Abroad Counsellors</span>
          </div>

          {/* Headline — italic emphasis, borrowed from reference */}
          <h1 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-[1.13] tracking-tight mb-5">
            Land Your Seat at<br />
            the <em className="not-italic text-[#FF6B2B]">Right University,</em><br />
            in the Right Country.
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-9 max-w-md">
            We handle everything — university shortlisting, IELTS coaching, visa paperwork, and loan assistance — so your focus stays on your future, not the paperwork.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="#book"
              className="inline-flex items-center gap-2 bg-[#FF6B2B] hover:bg-[#FF8C55] text-white text-[15px] font-bold px-6 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,107,43,0.35)]"
            >
              Start Your Free Assessment ↗
            </Link>
            <Link
              href="#how-it-works"
              className="text-white/70 hover:text-white text-[15px] font-semibold flex items-center gap-1.5 transition-colors"
            >
              See how it works →
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-5">
            {[
              { icon: "✓", bold: "92%", text: "visa approval rate" },
              { icon: "✓", bold: "100+", text: "partner universities" },
              { icon: "✓", bold: "Zero", text: "hidden fees" },
            ].map((t) => (
              <div key={t.bold} className="flex items-center gap-2">
                <span className="text-[#10B981] text-sm font-bold">{t.icon}</span>
                <span className="text-sm text-white/55">
                  <strong className="text-white/90 font-semibold">{t.bold}</strong> {t.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats card */}
        <div className="hidden md:block">
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-white/[0.06] rounded-2xl p-5 text-center"
                >
                  <div
                    className={`font-[family-name:var(--font-sora)] text-3xl font-extrabold leading-none mb-1 ${
                      i === 0 ? "text-[#FF6B2B]" : i === 1 ? "text-[#10B981]" : "text-white"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div className="text-white/45 text-xs font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Country chips */}
            <div className="bg-[#1B6AC9]/15 rounded-2xl p-4 flex items-center gap-3 flex-wrap">
              <span className="text-white/50 text-xs font-semibold shrink-0">Popular:</span>
              {countries.map((c) => (
                <span
                  key={c}
                  className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Floating social proof card */}
          <div className="mt-[-20px] ml-[-24px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-4 flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-base shrink-0">
              🎓
            </div>
            <div>
              <div className="text-[#FF6B2B] text-xs font-bold tracking-wide mb-0.5">★★★★★</div>
              <div className="text-[#0A2558] text-xs font-bold">Visa approved in 12 days</div>
              <div className="text-[#94A3B8] text-[11px]">Arjun P. — University of Exeter, UK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[11px] font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
