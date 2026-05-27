"use client";

import { useEffect, useRef } from "react";
import { mountAirflow } from "@/lib/airflow";

export function Hero() {
  const canvasHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasHost.current) return;
    const handle = mountAirflow(canvasHost.current);
    return () => handle.dispose();
  }, []);

  return (
    <section className="relative bg-[var(--color-navy-900)] text-white overflow-hidden -mt-[72px] pt-[72px]">
      <div
        ref={canvasHost}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(70,82,153,0.35),_transparent_60%)]"
      />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider uppercase text-[var(--color-yellow)] bg-[var(--color-yellow)]/10 border border-[var(--color-yellow)]/30 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-yellow)] animate-pulse" />
              Pre-summer pricing · ends 31 May
            </span>

            <h1 className="mt-6 text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.02] font-extrabold tracking-[-0.025em] text-balance">
              Move more air.
              <br />
              <span className="text-[var(--color-yellow)]">Spend less power.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] lg:text-[18px] leading-relaxed text-white/75">
              Commercial BLDC fans and air coolers that drop your fan running cost by up to 50%. Backed by a 2-year on-site warranty across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-white text-[var(--color-navy-900)] font-semibold text-[15px] rounded-full px-7 py-4 hover:bg-[var(--color-yellow)] transition-colors"
              >
                Shop air coolers
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://wa.me/919999999999?text=Hi%20Havai%2C%20can%20you%20help%20me%20size%20a%20cooler%2Ffan%20for%20my%20space%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold text-[15px] rounded-full px-7 py-4 hover:bg-white/10 transition-colors"
              >
                Talk to a sizing expert
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              {[
                ["50%", "lower running cost"],
                ["2 yrs", "on-site warranty"],
                ["8,500 m³/hr", "peak airflow"],
              ].map(([num, label]) => (
                <div key={label}>
                  <dt className="text-[22px] lg:text-[26px] font-bold text-white">{num}</dt>
                  <dd className="text-[12px] text-white/55 mt-1 leading-snug">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -left-8 w-72 h-72 rounded-full bg-[var(--color-navy-700)]/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/product-bldc-pedestal.jpg"
                  alt="Havai 20-inch commercial BLDC pedestal fan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] text-[var(--color-yellow)] font-semibold uppercase tracking-wider">
                    Best seller
                  </p>
                  <h3 className="text-[17px] font-semibold leading-snug mt-1">
                    20" Commercial BLDC<br />Pedestal Fan
                  </h3>
                  <p className="text-[12px] text-white/55 mt-1">
                    2mm aluminium blades · 4 speeds · 2-yr on-site
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-white/40 line-through">₹14,999</p>
                  <p className="text-[20px] font-bold">₹10,999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
