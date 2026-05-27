"use client";

import { useReveal } from "@/lib/useReveal";

export function Newsletter() {
  useReveal();

  return (
    <section className="py-20 lg:py-24 bg-[var(--color-navy-100)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="reveal grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-navy-700)]">
              Free guide
            </p>
            <h2 className="mt-3 text-[32px] lg:text-[44px] font-bold leading-[1.05] tracking-tight text-balance">
              Get your free pre-summer cooling guide.
            </h2>
            <p className="mt-5 text-[16px] text-[var(--color-ink-soft)] leading-relaxed max-w-lg">
              A sizing chart for every room type, a maintenance checklist for the off-season, and first dibs on the March pre-summer sale.
            </p>
            <form
              className="mt-7 flex flex-col sm:flex-row gap-3 max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@yourcompany.in"
                className="flex-1 px-5 py-4 rounded-full bg-white border border-[var(--color-border)] text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:outline-none focus:border-[var(--color-navy-700)]"
              />
              <button
                type="submit"
                className="bg-[var(--color-navy-700)] text-white font-semibold text-[15px] rounded-full px-7 py-4 hover:bg-[var(--color-navy-800)] transition-colors whitespace-nowrap"
              >
                Send me the guide
              </button>
            </form>
            <p className="mt-3 text-[12px] text-[var(--color-ink-soft)]">
              No spam. One email a fortnight at peak season, less the rest of the year.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 lg:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">
              Or just call us
            </p>
            <p className="mt-3 text-[28px] lg:text-[32px] font-bold text-[var(--color-ink)] leading-none">
              +91 99999 99999
            </p>
            <p className="mt-3 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
              Mon to Sat, 9 AM to 6 PM IST. A real person picks up. Average wait under 30 seconds.
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-navy-700)] hover:gap-3 transition-all"
            >
              Or WhatsApp us instead
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
