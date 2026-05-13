"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticCTA from "./MagneticCTA";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="book"
      ref={ref}
      style={{ position: "relative", overflow: "hidden", minHeight: 560 }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          y: bgY,
          scale: bgScale,
        }}
      >
        <Image
          src="/images/banner-2.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0.45) 100%)",
          }}
        />
      </motion.div>

      <div style={{ position: "relative", zIndex: 1, paddingTop: 120, paddingBottom: 120 }} className="px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 720, color: "#fff" }}
          >
            <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d8b4fe", fontWeight: 500, marginBottom: 20 }}>
              / Next step
            </p>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.0, letterSpacing: "-1.5px", fontWeight: 800, marginBottom: 24 }}>
              Got a <span style={{ color: "#a78bfa" }}>target intake?</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", marginBottom: 40, maxWidth: 600 }}>
              Tell us when you want to land on campus. We&apos;ll tell you exactly what the next 14 weeks look like, including which counsellor on our team will handle your file.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <MagneticCTA href="https://wa.me/918891908341" className="cta-primary">
                Book your free eligibility check
              </MagneticCTA>
              <a
                href="tel:+918891908341"
                style={{
                  border: "1px solid rgba(255,255,255,0.32)",
                  color: "#fff",
                  borderRadius: 9999,
                  padding: "16px 28px",
                  fontWeight: 500,
                  fontSize: 14,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 44,
                  textDecoration: "none",
                  transition: "background 0.25s ease, border-color 0.25s ease",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)"; }}
              >
                +91 88919 08341
              </a>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
              <span>Royal Thachil Plaza, MC Road, Angamaly</span>
              <span>info@globalnexs.com</span>
              <span>Mon to Sat · 9 AM to 5 PM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
