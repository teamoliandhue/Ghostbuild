"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const countries = [
  { name: "United Kingdom", flag: "🇬🇧", unis: ["Coventry", "Limerick", "Greenwich", "Hertfordshire"], intakes: "Sep · Jan", tint: "linear-gradient(135deg, #1e3a8a, #6366f1)" },
  { name: "United States", flag: "🇺🇸", unis: ["ASU", "NEU", "RIT", "University at Buffalo"], intakes: "Aug · Jan", tint: "linear-gradient(135deg, #7c3aed, #ec4899)" },
  { name: "Australia", flag: "🇦🇺", unis: ["Monash", "RMIT", "Deakin", "Macquarie"], intakes: "Feb · Jul", tint: "linear-gradient(135deg, #0891b2, #059669)" },
  { name: "Ireland", flag: "🇮🇪", unis: ["Trinity College Dublin", "University of Limerick", "Maynooth"], intakes: "Sep · Jan", tint: "linear-gradient(135deg, #059669, #65a30d)" },
  { name: "Finland", flag: "🇫🇮", unis: ["Aalto University", "Tampere University"], intakes: "Sep", tint: "linear-gradient(135deg, #0284c7, #7c3aed)" },
  { name: "Germany", flag: "🇩🇪", unis: ["TU Munich", "Frankfurt School", "TU Berlin"], intakes: "Oct · Apr", tint: "linear-gradient(135deg, #ea580c, #dc2626)" },
  { name: "France", flag: "🇫🇷", unis: ["Sciences Po", "ESSEC", "EDHEC"], intakes: "Sep · Jan", tint: "linear-gradient(135deg, #1d4ed8, #db2777)" },
];

export default function Countries() {
  const [active, setActive] = useState(0);

  return (
    <section id="countries" className="section-pad" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-[820px]">
          <p className="eyebrow mb-5">/ Destinations</p>
          <h2 className="h2-display">
            Seven countries. <span style={{ color: "var(--color-brand)" }}>Real placements,</span> not brochures.
          </h2>
          <p className="body-lg mt-6 max-w-[680px]">
            Each destination has a counsellor on our team who&apos;s filed and walked through the visa process there in the last 12 months.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          {/* LEFT — interactive country list */}
          <div style={{ borderTop: "1px solid var(--color-line)" }}>
            {countries.map((c, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={c.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="w-full text-left"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 16,
                    alignItems: "center",
                    padding: "20px 4px",
                    borderBottom: "1px solid var(--color-line)",
                    cursor: "pointer",
                    background: "transparent",
                    transition: "padding 0.3s ease",
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1, transition: "transform 0.3s ease", transform: isActive ? "scale(1.2)" : "scale(1)" }} aria-hidden>
                    {c.flag}
                  </span>
                  <span style={{
                    fontSize: 22,
                    fontWeight: isActive ? 800 : 600,
                    letterSpacing: "-0.4px",
                    color: isActive ? "var(--color-ink)" : "rgba(15,23,42,0.55)",
                    transition: "all 0.3s ease",
                  }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: 13, color: isActive ? "var(--color-brand)" : "rgba(15,23,42,0.4)", fontWeight: 500, transition: "color 0.3s ease" }}>
                    {c.intakes}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — spotlight panel that reacts to hovered country */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              borderRadius: 28,
              overflow: "hidden",
              background: countries[active].tint,
              minHeight: 420,
              padding: 40,
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 56, marginBottom: 16, lineHeight: 1 }} aria-hidden>{countries[active].flag}</div>
              <h3 style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.8px", fontWeight: 800 }}>
                {countries[active].name}
              </h3>
              <p style={{ fontSize: 14, opacity: 0.75, marginTop: 8, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Intakes: {countries[active].intakes}
              </p>
            </div>

            <div style={{ marginTop: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>
                Recent placements
              </p>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {countries[active].unis.map((u) => (
                  <li
                    key={u}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      padding: "8px 14px",
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {u}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                style={{
                  marginTop: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "white",
                  textDecoration: "none",
                  padding: "12px 20px",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  transition: "background 0.25s ease",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              >
                Talk to the {countries[active].name} counsellor →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
