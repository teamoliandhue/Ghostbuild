"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "What does the full service cost?",
    a: "A flat consulting fee, no percentage cut on tuition or loans. We share the exact number on the first call once we know the country.",
  },
  {
    q: "What if my visa gets rejected?",
    a: "We refile at no extra cost. We file at a 94% first-time approval rate, so it's rarely needed.",
  },
  {
    q: "How long from first call to flight?",
    a: "Average 14 weeks for a September intake. 11 weeks for January.",
  },
  {
    q: "Do I need an IELTS band before I come to you?",
    a: "No. We can start with mock scores and coach you in parallel.",
  },
  {
    q: "Why Globalnex over a university's own agent?",
    a: "University agents work for the university. We work for you.",
  },
  {
    q: "What happens on day one after I book?",
    a: "A WhatsApp number for your assigned counsellor and a calendar link for a one-hour kickoff session, both within 24 hours.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-pad">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">/ Questions</p>
            <h2 className="h2-display">
              The things families <span style={{ color: "var(--color-brand)" }}>actually ask</span> us.
            </h2>
            <p className="body-md mt-6">
              Don't see yours?{" "}
              <a href="#book" style={{ color: "var(--color-cta)", textDecoration: "underline", textUnderlineOffset: 4 }}>
                Ask on the free call.
              </a>
            </p>
          </div>
          <div className="lg:col-span-8">
            <div style={{ borderTop: "1px solid var(--color-line)" }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="w-full text-left flex items-center justify-between gap-6"
                    style={{ padding: "24px 0", minHeight: 44, cursor: "pointer" }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 600, color: "var(--color-ink)" }}>{f.q}</span>
                    <span
                      style={{
                        color: "var(--color-brand)",
                        fontSize: 24,
                        flexShrink: 0,
                        transition: "transform 0.3s ease",
                        transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="body-md" style={{ paddingBottom: 24, maxWidth: 640 }}>
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
