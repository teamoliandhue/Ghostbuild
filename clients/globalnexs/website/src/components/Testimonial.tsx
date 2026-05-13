"use client";
import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-black-section)", color: "#ffffff", position: "relative", overflow: "hidden" }}
    >
      {/* Soft radial backdrop — implies a spotlight on the quote */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.22), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.12), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Large decorative quote mark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 60,
          left: "8%",
          fontSize: 220,
          lineHeight: 1,
          fontWeight: 900,
          color: "rgba(124, 58, 237, 0.18)",
          fontFamily: "Georgia, serif",
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[820px] mx-auto text-center"
        >
          <p className="eyebrow mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>/ A recent placement</p>
          <p style={{ fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.25, fontWeight: 700, letterSpacing: "-0.4px" }}>
            &ldquo;I had a 6.0 IELTS and 78% in plus-two.{" "}
            <span style={{ color: "#a78bfa" }}>Globalnex got me into Coventry with a 30% scholarship</span>{" "}
            and my visa was stamped four weeks after I applied. They picked up the phone every time I called.&rdquo;
          </p>
          <div className="mt-10 inline-flex items-center gap-4">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(167, 139, 250, 0.18)",
                color: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              AR
            </div>
            <div className="text-left">
              <div style={{ fontSize: 15, fontWeight: 600 }}>Anjali R.</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                2nd year MSc Data Science, Coventry University
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
