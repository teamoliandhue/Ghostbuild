"use client";
import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
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

export default function Stats() {
  const stats = [
    { num: 75, suffix: "+", label: "Students placed across 7 destinations" },
    { num: 100, suffix: "+", label: "Partner universities" },
    { num: 94, suffix: "%", label: "Visa approval, first-time" },
    { num: 14, suffix: " wk", label: "Average shortlist to acceptance" },
  ];
  return (
    <section className="section-pad">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((s, i) => (
            <div key={i} style={{ borderLeft: "2px solid var(--color-line)", paddingLeft: 24 }}>
              <div className="gold-num" style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-2px" }}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <p className="small mt-3 max-w-[180px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
