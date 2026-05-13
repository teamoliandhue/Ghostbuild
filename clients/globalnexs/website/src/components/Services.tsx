"use client";
import { motion } from "framer-motion";

const services = [
  {
    n: "01",
    title: "University admissions",
    body: "Shortlists matched to your scores. SOPs drafted by people who've read the rubrics. Five universities per profile, not generic top-tens.",
    outcome: "94% offer rate within 6 weeks, last cohort",
    tags: ["UK", "USA", "Europe"],
  },
  {
    n: "02",
    title: "IELTS / OET / PTE coaching",
    body: "Small batches. Live mock tests every week. Target band locked before the exam, not after.",
    outcome: "Average IELTS improvement: 0.7 band in 6 weeks",
    tags: ["IELTS", "OET", "PTE"],
  },
  {
    n: "03",
    title: "Visa filing",
    body: "Document review, SOP rewrite, mock interview the day before your real one. We catch the small rejections before the embassy does.",
    outcome: "94% first-time approval, all destinations",
    tags: ["UKVI", "F-1", "Subclass 500"],
  },
  {
    n: "04",
    title: "UKNARIC + UKVI support",
    body: "Qualification recognition for UK applications. We file directly, you get a single PDF in return.",
    outcome: "Standard delivery in 3 weeks",
    tags: ["UK only"],
  },
  {
    n: "05",
    title: "Loans + tickets",
    body: "Tie-ups with three lenders. We send the loan pack and book the flight only once your visa is stamped.",
    outcome: "Flight booked the same day visa arrives",
    tags: ["Loans", "Tickets"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-[820px]">
            <p className="eyebrow mb-5">/ What we do</p>
            <h2 className="h2-display">
              Five services. <span style={{ color: "var(--color-brand)" }}>One promise:</span> you board the flight.
            </h2>
          </div>
          <a href="#book" className="cta-ghost self-start lg:self-end" style={{ padding: "12px 22px", fontSize: 13 }}>
            Start with a free check →
          </a>
        </div>

        {/* Alternating row layout — Paraform-style feature blocks */}
        <div style={{ borderTop: "1px solid var(--color-line)" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24,
                padding: "32px 0",
                borderBottom: "1px solid var(--color-line)",
                transition: "background 0.3s ease",
                position: "relative",
              }}
            >
              <style>{`
                @media (min-width: 1024px) {
                  .service-row { grid-template-columns: 96px 1fr 1.4fr 200px !important; align-items: center; }
                }
                .service-row:hover .service-arrow { transform: translateX(8px); color: var(--color-brand); }
              `}</style>
              <div className="service-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }}>
                <div className="service-num" style={{ color: "var(--color-brand)", fontSize: 14, fontWeight: 600, fontFamily: "ui-monospace, SF Mono, Menlo, monospace", letterSpacing: "0.05em" }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.15, letterSpacing: "-0.4px", fontWeight: 700, color: "var(--color-ink)" }}>
                  {s.title}
                </h3>
                <p className="body-md" style={{ maxWidth: 560 }}>{s.body}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "4px 10px",
                          borderRadius: 9999,
                          background: "var(--color-surface)",
                          color: "var(--color-brand)",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--color-cta)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {s.outcome}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
