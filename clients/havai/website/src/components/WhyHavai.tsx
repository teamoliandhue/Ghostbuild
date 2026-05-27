"use client";

import { useReveal } from "@/lib/useReveal";

const reasons = [
  {
    eyebrow: "BLDC efficiency",
    headline: "Half the running cost.",
    body: "Our BLDC motors pull 28–35W vs 90–110W on a standard fan. Run them 8 hours a day and the savings cover a new fan in two summers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "On-site warranty",
    headline: "We come to you for 2 years.",
    body: "Most brands ship you a replacement part and tell you to find a technician. We send one. Anywhere in India, no charge, for two full years from purchase.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "Commercial build",
    headline: "Built for shopfloors, not showrooms.",
    body: "2mm aluminium blades, double-ball-bearing motors, IP-rated bodies. The same units run in factories in Bhiwadi and warehouses in Bhiwandi.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "Real airflow",
    headline: "30 ft throw, 8,500 m³/hr.",
    body: "The 8X Flo Pro doesn't just stir the air around it. It moves it across the room. Numbers we publish on the spec sheet, not 'powerful cooling'.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M3 8c4-3 8-3 12 0s8 3 6 0M3 13c4-3 8-3 12 0s8 3 6 0M3 18c4-3 8-3 12 0s8 3 6 0" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function WhyHavai() {
  useReveal();

  return (
    <section id="why" className="py-20 lg:py-28 bg-[var(--color-navy-100)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div className="reveal">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-navy-700)]">
              Why Havai
            </p>
            <h2 className="mt-3 text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] text-balance">
              Four reasons your next cooler should say Havai on the box.
            </h2>
            <p className="mt-5 text-[16px] text-[var(--color-ink-soft)] leading-relaxed max-w-md">
              We sell against Crompton, Bajaj, Symphony every single day. Here's exactly how we win.
            </p>
            <a
              href="#categories"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-navy-700)] hover:gap-3 transition-all"
            >
              See the full catalogue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {reasons.map((r, i) => (
              <div
                key={r.eyebrow}
                className="reveal bg-white rounded-2xl p-7 lg:p-8 border border-[var(--color-border)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-navy-700)]/10 text-[var(--color-navy-700)] flex items-center justify-center">
                  {r.icon}
                </div>
                <p className="mt-5 text-[12px] font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">
                  {r.eyebrow}
                </p>
                <h3 className="mt-1.5 text-[19px] lg:text-[21px] font-bold leading-tight text-[var(--color-ink)]">
                  {r.headline}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
