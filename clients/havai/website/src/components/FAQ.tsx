"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";

const faqs = [
  {
    q: "What's the total cost, including installation and shipping?",
    a: "Shipping is free across India. Pedestal, tower and personal coolers ship plug-and-play with no installation needed. For wall-mount fans, ceiling fans and duct coolers we'll connect you with a Havai-trained installer in your city. Installation cost is shown upfront on the product page. No hidden add-ons at checkout.",
  },
  {
    q: "What happens if the cooler or fan stops working in year 1 or year 2?",
    a: "You call or WhatsApp us. We dispatch an engineer to your address (anywhere in India) within 48 to 72 hours. No charge, no debate about whether it's covered. The 2-year on-site warranty starts from the day of delivery and covers motor, electronics and structural defects.",
  },
  {
    q: "How fast is delivery, and where do you not ship?",
    a: "Metro cities: 2 to 4 working days. Tier 2/3 towns: 4 to 7 working days. Northeast and remote pin codes: 7 to 10 working days. We currently do not ship to Lakshadweep and parts of Andaman; if you're there, message us before ordering and we'll quote a custom rate.",
  },
  {
    q: "How do I know which cooler or fan size fits my space?",
    a: "Send us a photo of the room or shopfloor on WhatsApp with the rough dimensions. A real human (not a bot) will reply within 10 minutes during business hours with a sizing recommendation. We'd rather lose a sale than ship you something undersized. Those come back.",
  },
  {
    q: "Why pay more for Havai vs. a Crompton or a Bajaj?",
    a: "On entry-level fans, the gap is small and honestly Crompton makes a fine product. Where Havai wins is the commercial range: 2mm aluminium blades, double-ball-bearing motors, 4-speed BLDC control, 2-yr on-site warranty. Compare spec to spec on any 18\" or 20\" pedestal and the difference shows up on the invoice. And again on the electricity bill.",
  },
  {
    q: "What if I want to buy 20+ units for a commercial site?",
    a: "WhatsApp us for bulk pricing. Above 20 units we factor in installation, a dedicated WhatsApp line for the duration of the contract, and a single annual on-site visit for preventive maintenance. GST invoice with company name included by default.",
  },
];

export function FAQ() {
  useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[var(--color-bg)]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="text-center reveal max-w-2xl mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-navy-700)]">
            Before you ask
          </p>
          <h2 className="mt-3 text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-balance">
            The six things buyers actually want to know.
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                <button
                  className="w-full flex items-start justify-between gap-6 text-left py-6 lg:py-7 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] lg:text-[19px] font-semibold leading-tight text-[var(--color-ink)] group-hover:text-[var(--color-navy-700)] transition-colors">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-transform ${
                      isOpen ? "rotate-45 bg-[var(--color-navy-700)] border-[var(--color-navy-700)] text-white" : "text-[var(--color-ink)]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    isOpen ? "max-h-[400px] pb-7" : "max-h-0"
                  }`}
                >
                  <p className="text-[15px] lg:text-[16px] leading-relaxed text-[var(--color-ink-soft)] max-w-[760px] pr-12">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-10 text-[14px] text-[var(--color-ink-soft)]">
          Still on the fence?{" "}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-navy-700)] font-semibold hover:underline"
          >
            Drop us a WhatsApp message
          </a>{" "}
          . Average reply in 10 minutes.
        </p>
      </div>
    </section>
  );
}
