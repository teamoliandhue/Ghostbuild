"use client";
import Image from "next/image";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(value, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, target, value]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v) + suffix;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { num: 75, suffix: "+", label: "Students placed" },
  { num: 100, suffix: "+", label: "Partner universities" },
  { num: 94, suffix: "%", label: "Visa approval" },
  { num: 14, suffix: " wk", label: "Avg shortlist to offer" },
];

export default function CohortProof() {
  return (
    <section className="section-pad" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — portrait anchor */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                borderRadius: 24,
                overflow: "hidden",
                background: "var(--color-muted)",
                maxWidth: 460,
              }}
            >
              <Image
                src="/images/help-2.jpg"
                alt="Graduate from the last cohort, ready for departure"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  background: "rgba(15,23,42,0.9)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 16,
                  padding: "16px 18px",
                  color: "white",
                }}
              >
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500 }}>
                  Last cohort · September 2025
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>
                  Ravi P. · now MSc Marketing, University of Limerick
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — stats with copy intro */}
          <div>
            <p className="eyebrow mb-5">/ Proof in the numbers</p>
            <h2 className="h2-display mb-6">
              The last 12 months, <span style={{ color: "var(--color-brand)" }}>by the numbers.</span>
            </h2>
            <p className="body-md mb-12 max-w-[520px]">
              Every number below comes from filings we still have receipts for. Ask us on the call to see the breakdown by intake, country and counsellor.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ borderLeft: "2px solid var(--color-line)", paddingLeft: 20 }}
                >
                  <div
                    className="gold-num"
                    style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-2px", color: "var(--color-cta)" }}
                  >
                    <Counter target={s.num} suffix={s.suffix} />
                  </div>
                  <p style={{ fontSize: 14, color: "var(--color-ink-soft)", marginTop: 10 }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
