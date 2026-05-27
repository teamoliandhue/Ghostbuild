"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import MagneticCTA from "./MagneticCTA";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: 144, paddingBottom: 96 }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="eyebrow mb-6">
              / Study Abroad · Kochi · Angamaly
            </motion.p>

            <h1
              className="h1-display mb-8"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-1.5px" }}
              aria-label="A seat at a world-class university. In your hands in 14 weeks."
            >
              {[
                <>A seat at a</>,
                <>
                  <span style={{ color: "var(--color-brand)" }}>world-class</span> university.
                </>,
                <>In your hands in 14 weeks.</>,
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span className="block" custom={i} initial="hidden" animate="visible" variants={lineVariants}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="body-lg mb-10 max-w-[560px]"
            >
              We place students from Kerala into universities across the UK, US, Australia, Ireland, Finland, Germany and France. Shortlisting, applications, visa, ticket. All under one roof, in one office, with one counsellor from your first call to your boarding pass.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <MagneticCTA href="#book" className="cta-primary">Book a free eligibility check</MagneticCTA>
              <a href="#countries" className="cta-ghost">See where our students are studying</a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 small"
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-cta)" }} />
                75+ students placed
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-cta)" }} />
                94% visa approval
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-cta)" }} />
                7 destination countries
              </span>
            </motion.div>
          </div>

          {/* RIGHT — anchor image with parallax + floating overlays */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            <motion.div
              style={{
                y: imgY,
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: 32,
                overflow: "hidden",
                background: "var(--color-surface)",
                boxShadow: "0 40px 80px -32px rgba(124, 58, 237, 0.25)",
              }}
            >
              <motion.div style={{ scale: imgScale, position: "absolute", inset: 0 }}>
                <Image
                  src="/images/home-1.jpg"
                  alt="Passport and US visa with globe, study abroad essentials"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "10px 16px",
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 2,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-cta)" }} />
                Visa stamped in 4 weeks · last cohort
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: 28,
                  right: 28,
                  background: "rgba(15,23,42,0.88)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  padding: "14px 18px",
                  borderRadius: 16,
                  fontSize: 13,
                  maxWidth: 220,
                  lineHeight: 1.45,
                  zIndex: 2,
                }}
              >
                <strong style={{ color: "#d8b4fe" }}>&ldquo;Picked up the phone every time I called.&rdquo;</strong>
                <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>Anjali R., Coventry MSc</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
