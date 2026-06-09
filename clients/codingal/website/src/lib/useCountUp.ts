"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counting number animation (animations.md #9).
 * Counts from 0 to `target` once the element scrolls into view.
 * Respects prefers-reduced-motion by jumping straight to the target.
 */
export function useCountUp(target: number, duration = 1300) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}
