"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const members = [
  {
    image: "/images/team-1.jpg",
    name: "Founder",
    role: "Lead Counsellor · UK + Australia",
    line: "Files 30+ visas a year, personally walks every UK student through their UKVI interview prep.",
    real: true,
  },
  {
    image: "/images/team-2.jpg",
    name: "Senior Counsellor",
    role: "USA + Ireland",
    line: "Drafts SOPs every counsellor on the team uses as a template. Last year: 12/12 USA placements stamped.",
    real: true,
  },
  {
    image: null,
    name: "Counsellor · to be added",
    role: "Coaching · IELTS / OET / PTE",
    line: "Portrait pending. Owns the test-prep classroom and weekly mock-test cycle.",
    real: false,
  },
  {
    image: null,
    name: "Counsellor · to be added",
    role: "Germany + Finland + France",
    line: "Portrait pending. Handles all European intakes including the German qualification recognition pipeline.",
    real: false,
  },
];

export default function Team() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16">
          <div>
            <p className="eyebrow mb-5">/ Who handles your file</p>
            <h2 className="h2-display">
              One counsellor, <span style={{ color: "var(--color-brand)" }}>start to flight.</span>
            </h2>
          </div>
          <div className="body-lg max-w-[640px]">
            We don&apos;t outsource. We don&apos;t run a phone-room. The person you meet on day one is the same person on the embassy call. Royal Thachil Plaza, MC Road, Angamaly &mdash; walk in, sit down, talk it out.
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                }}
              >
                {m.real ? (
                  <>
                    <Image
                      src={m.image as string}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-[1.06] transition-transform duration-700"
                    />
                    {/* hover caption overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.85) 100%)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: 18,
                      }}
                      className="group-hover:opacity-100"
                    >
                      <div style={{ color: "white" }}>
                        <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7, fontWeight: 500 }}>On the team since 2023</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{m.role}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      padding: 20,
                      textAlign: "center",
                      color: "var(--color-ink-mute)",
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "var(--color-brand-soft)",
                        color: "var(--color-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                      }}
                    >
                      ＋
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-ink)" }}>Portrait to be added</div>
                    <div style={{ fontSize: 11, lineHeight: 1.4 }}>Team to drop in their photo before pitch</div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, color: "var(--color-ink)" }}>{m.name}</h3>
                <p style={{ fontSize: 13, color: "var(--color-brand)", fontWeight: 500, marginTop: 2 }}>{m.role}</p>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-ink-soft)", marginTop: 10 }}>{m.line}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
