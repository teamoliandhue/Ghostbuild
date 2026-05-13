"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    when: "Day 1",
    title: "Eligibility check",
    body: "Free 30-minute call. We pull your marks, scores and goals into a one-page brief. You leave knowing if you're a 6, 12 or 18-month candidate.",
    image: "/images/service-1.jpg",
    alt: "Counsellor walking a student through an eligibility check",
  },
  {
    n: "02",
    when: "Week 2 to 12",
    title: "Shortlist, apply, file",
    body: "Five university shortlists matched to your profile. SOPs drafted by your counsellor, reviewed by you. Apps in week 6, visa in week 8, embassy prep in week 11.",
    image: "/images/home-3.jpg",
    alt: "Student working on university applications at a laptop",
  },
  {
    n: "03",
    when: "Week 13 to 14",
    title: "Departure",
    body: "Flight booked once visa is stamped. You leave with a four-page Day 1 brief for your destination city. SIM, bank, lodging, university check-in.",
    image: "/images/service-2.jpg",
    alt: "Departing student carrying their destination country's flag",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="section-pad" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-[820px]">
          <p className="eyebrow mb-5">/ How we work</p>
          <h2 className="h2-display">
            One counsellor. <span style={{ color: "var(--color-brand)" }}>Three steps.</span> Fourteen weeks.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group"
              style={{
                background: "#fff",
                border: "1px solid var(--color-line)",
                borderRadius: 24,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.3s ease, transform 0.3s ease",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden", background: "var(--color-muted)" }}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-[1.04] transition-transform duration-500"
                />
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(15, 23, 42, 0.88)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.n}
                </span>
              </div>
              <div style={{ padding: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-brand)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {s.when}
                </p>
                <h3 className="h3-card mb-3">{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--color-ink-soft)" }}>{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
