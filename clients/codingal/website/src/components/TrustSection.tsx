"use client";

import { useCountUp } from "@/lib/useCountUp";

function Stat({
  target,
  display,
  label,
}: {
  target: number;
  display: (v: number) => string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="card-out reveal bg-surface px-4 py-6 text-center">
      <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
        <span ref={ref}>{display(value)}</span>
      </div>
      <div className="mx-auto mt-2 max-w-[14ch] text-sm text-ink-soft">{label}</div>
    </div>
  );
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default function TrustSection() {
  return (
    <section className="border-y-2 border-ink bg-grape py-20 text-ink lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral-dark">
            Why parents trust Codingal
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Why a million parents chose Codingal.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat target={1000000} display={(v) => `${fmt(v)}+`} label="students signed up" />
          <Stat target={20000} display={(v) => `${fmt(v)}+`} label="parent reviews behind a 4.6/5 rating" />
          <Stat target={135} display={(v) => `${v}`} label="countries" />
          <Stat target={1} display={() => "Top 1%"} label="of instructors hired" />
        </div>

        <div className="reveal mt-16 flex flex-col items-center gap-6 border-t-2 border-ink/15 pt-10 text-center">
          <p className="text-sm font-medium text-ink/75">
            Built &amp; backed by{" "}
            <span className="font-semibold text-ink">Y Combinator</span>,{" "}
            <span className="font-semibold text-ink">Google</span> and{" "}
            <span className="font-semibold text-ink">Amazon</span>
          </p>
          <p className="text-sm font-medium text-ink/75">
            As seen in{" "}
            <span className="font-semibold text-ink">
              Mint &middot; Indian Express &middot; YourStory &middot; Business
              Standard &middot; The Print
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
