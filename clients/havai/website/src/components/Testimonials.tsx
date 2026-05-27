"use client";

import { useReveal } from "@/lib/useReveal";

const testimonials = [
  {
    quote:
      "Replaced 22 ceiling fans across three warehouse floors. Electricity bill dropped by ₹38,000 a month.",
    name: "Rakesh Menon",
    role: "Operations Head, Veejay Logistics",
    city: "Coimbatore",
  },
  {
    quote:
      "The 8X Flo Pro is the only cooler we don't have to refill every two hours during peak summer. Big tank, real airflow.",
    name: "Aarti Sharma",
    role: "Studio Owner, Sharma's Yoga Loft",
    city: "Pune",
  },
  {
    quote:
      "On-site warranty actually meant on-site. Engineer came in 48 hours, no arguing about warranty terms.",
    name: "Mohammed Faraz",
    role: "Facility Manager, Saffron Banquet Hall",
    city: "Hyderabad",
  },
];

export function Testimonials() {
  useReveal();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[var(--color-navy-900)] text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(70,82,153,0.4),_transparent_55%)]"
      />
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl reveal">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-yellow)]">
            What buyers tell us six months later
          </p>
          <h2 className="mt-3 text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-balance">
            Outcomes, not five-star fluff.
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal bg-white/5 border border-white/10 rounded-2xl p-7 lg:p-8 flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[var(--color-yellow)]/80 mb-5">
                <path d="M7 7h4v4H7v4c0 2 1 3 3 4l-1 2c-3-1-5-3-5-6V7zm10 0h4v4h-4v4c0 2 1 3 3 4l-1 2c-3-1-5-3-5-6V7z" />
              </svg>
              <blockquote className="text-[17px] lg:text-[18px] leading-relaxed text-white font-medium flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[14px] font-semibold text-white">{t.name}</p>
                <p className="text-[12px] text-white/55 mt-0.5">
                  {t.role} · {t.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 lg:mt-16 reveal flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white/5 border border-white/10 rounded-2xl p-7 lg:p-8">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-yellow)]">
              Buying for a commercial site?
            </p>
            <p className="mt-2 text-[18px] lg:text-[20px] font-semibold leading-snug text-balance">
              Get bulk pricing on 20+ units, with installation factored in.
            </p>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi%20Havai%2C%20bulk%20order%20enquiry%20for%2020%2B%20units"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto bg-[var(--color-yellow)] text-[var(--color-ink)] font-semibold text-[14px] rounded-full px-6 py-3 hover:bg-white transition-colors whitespace-nowrap"
          >
            Request bulk quote
          </a>
        </div>
      </div>
    </section>
  );
}
