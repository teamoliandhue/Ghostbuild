"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How much does GlobalNexs charge for their services?",
    a: "Our consultation and university application support is transparent with no hidden charges. We charge a one-time counselling fee covering everything from shortlisting to offer letter receipt. Visa processing has a separate fee quoted upfront before any commitment. Book a free assessment and we'll walk you through the full cost breakdown.",
  },
  {
    q: "What happens if my visa gets rejected?",
    a: "In the rare event of a rejection, we analyse the refusal letter and re-file with corrected documentation at no additional visa consultancy fee. Our 92% approval rate is built on thorough pre-filing review — we identify risk factors before submission, not after.",
  },
  {
    q: "What's the minimum academic score required to apply?",
    a: "It depends on the country and university. Some UK universities accept 55% aggregate; some Australian institutions have pathway programmes. We've helped students with lower scores find legitimate pathways. Book a free assessment — we'll be honest about your options, not just optimistic.",
  },
  {
    q: "How long does the full process take from consultation to visa?",
    a: "On average, 8–14 weeks from first consultation to visa in hand. This depends on your IELTS readiness and target country. UK is typically fastest; Canada can take longer. We'll give you a personalised timeline estimate at your free assessment.",
  },
  {
    q: "Do you help with education loans?",
    a: "Yes — we work with SBI, HDFC Credila, Avanse, and other major lenders. We help structure your loan application to maximise approval chances and have no-collateral options for eligible students going to certain countries. Average approval time: 18 days.",
  },
  {
    q: "Can I start IELTS coaching while my application is in progress?",
    a: "Absolutely — we recommend it. We run parallel tracks so your test prep and application prep happen simultaneously. Most universities accept conditional offers while you're still completing IELTS, so you don't lose intake time.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 md:px-[5%] bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#FF6B2B] text-lg">✦</span>
          <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-widest">FAQ</span>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-[#0A2558] leading-tight mb-14">
          Questions we hear at<br />
          <em className="not-italic text-[#1B6AC9]">every first consultation.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="text-[#0A2558] font-semibold text-[15px] leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`text-[#1B6AC9] text-2xl font-light shrink-0 transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#475569] text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
