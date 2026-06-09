import Image from "next/image";

const CHECKS = [
  "Every instructor is a computer science graduate, hired from the top 1% of applicants.",
  "Thorough background checks before any instructor ever meets a child.",
  "1-on-1 lessons, so the class moves at exactly your child's pace.",
  "Parent-teacher meetings after the 6th and 12th session, with written progress reports.",
];

const STATS = [
  { value: "1000+", label: "CS-grad instructors", bg: "bg-coral-soft" },
  { value: "Top 1%", label: "of applicants hired", bg: "bg-grass-soft" },
  { value: "4.9 / 5", label: "avg teacher rating", bg: "bg-sky-soft" },
  { value: "7+ yrs", label: "avg experience",      bg: "bg-sun-soft"  },
];

export default function Teachers() {
  return (
    <section id="teachers" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">

        {/* ── LEFT: copy ── */}
        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            The teachers
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Taught by the top 1% of instructors we interview. Every one
            background-checked.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            The right teacher is the whole game in 1-on-1 learning. We hire hard
            so you never have to wonder who is on the other side of the screen.
          </p>

          <ul className="mt-7 space-y-3.5">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 border-ink bg-grass text-sm font-bold text-ink">
                  ✓
                </span>
                <span className="text-[15px] leading-relaxed text-ink">{c}</span>
              </li>
            ))}
          </ul>

          {/* stat chips */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className={`card-out ${s.bg} px-3 py-4 text-center`}>
                <p className="font-display text-xl font-bold text-ink">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold leading-tight text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: collage mosaic ── */}
        <div className="reveal">
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 130px)",
            }}
          >
            {/* R1 C1 — circle photo */}
            <div className="relative overflow-hidden rounded-full border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 1, gridRow: 1 }}>
              <Image src="/images/teachers/teacher-1.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R1 C2 — accent circle: grape + star */}
            <div className="flex items-center justify-center rounded-full border-2 border-ink bg-grape-soft shadow-hard-sm"
              style={{ gridColumn: 2, gridRow: 1 }}>
              <span className="text-4xl">⭐</span>
            </div>

            {/* R1 C3 — square photo */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 3, gridRow: 1 }}>
              <Image src="/images/teachers/teacher-2.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R1 C4 — accent circle: coral + pencil */}
            <div className="flex items-center justify-center rounded-full border-2 border-ink bg-coral-soft shadow-hard-sm"
              style={{ gridColumn: 4, gridRow: 1 }}>
              <span className="text-4xl">✏️</span>
            </div>

            {/* R2 C1 — square photo */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 1, gridRow: 2 }}>
              <Image src="/images/teachers/teacher-3.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R2-R3 C2 — tall photo spans 2 rows */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 2, gridRow: "2 / 4" }}>
              <Image src="/images/teachers/teacher-4.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R2 C3 — accent square: sun + paper plane */}
            <div className="flex items-center justify-center rounded-2xl border-2 border-ink bg-sun-soft shadow-hard-sm"
              style={{ gridColumn: 3, gridRow: 2 }}>
              <span className="text-4xl">✈️</span>
            </div>

            {/* R2 C4 — circle photo */}
            <div className="relative overflow-hidden rounded-full border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 4, gridRow: 2 }}>
              <Image src="/images/teachers/teacher-5.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R3 C1 — accent circle: grass + rocket */}
            <div className="flex items-center justify-center rounded-full border-2 border-ink bg-grass-soft shadow-hard-sm"
              style={{ gridColumn: 1, gridRow: 3 }}>
              <span className="text-4xl">🚀</span>
            </div>

            {/* R3 C2 taken by tall photo */}

            {/* R3 C3 — circle photo */}
            <div className="relative overflow-hidden rounded-full border-2 border-ink shadow-hard-sm"
              style={{ gridColumn: 3, gridRow: 3 }}>
              <Image src="/images/teachers/teacher-6.jpg" alt="Codingal instructor" fill className="object-cover" sizes="130px" />
            </div>

            {/* R3 C4 — stat tile */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-ink bg-sky-soft px-2 shadow-hard-sm text-center"
              style={{ gridColumn: 4, gridRow: 3 }}>
              <p className="font-display text-2xl font-bold leading-none text-ink">Top 1%</p>
              <p className="mt-1 text-[10px] font-semibold leading-tight text-ink-soft">of applicants<br/>hired</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
