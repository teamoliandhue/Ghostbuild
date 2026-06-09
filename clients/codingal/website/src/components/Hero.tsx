import Image from "next/image";

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="86"
      height="22"
      viewBox="0 0 86 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 13C8 4 14 4 20 13s12 9 18 0 12-9 18 0 12 9 18 0"
        stroke="#FFC23C"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TeacherCard({
  img,
  name,
  subject,
  className = "",
}: {
  img: string;
  name: string;
  subject: string;
  className?: string;
}) {
  return (
    <div
      className={`w-[140px] items-center gap-2.5 rounded-2xl border-2 border-ink bg-surface px-2.5 py-2 shadow-hard-sm ${className}`}
    >
      <span className="relative h-9 w-9 flex-none overflow-hidden rounded-xl border-2 border-ink">
        <Image src={img} alt={name} fill sizes="36px" className="object-cover" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[12px] font-bold text-ink">{name}</span>
        <span className="block truncate text-[10px] text-ink-soft">{subject}</span>
        <span className="text-[9px] tracking-tight text-sun" aria-hidden="true">★★★★★</span>
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-coral-soft/50 via-cream to-cream" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-20 lg:pt-16">
        {/* Left: copy */}
        <div className="reveal">
          <span className="chip gap-2 bg-coral-soft px-3.5 py-1.5 text-[13px] text-ink shadow-hard-sm">
            <span className="h-2 w-2 rounded-full bg-coral" />
            Backed by Y Combinator
          </span>

          <h1 className="font-display mt-5 text-[2.6rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-6xl">
            Your child{" "}
            {/* inline student photo — same style as the reference screenshot */}
            <span className="relative mx-1 inline-block h-[1em] w-[1.6em] translate-y-[0.08em] overflow-hidden rounded-full border-2 border-ink align-middle shadow-hard-sm">
              <Image
                src="/images/student-samhith.png"
                alt=""
                fill
                sizes="80px"
                className="object-cover object-top"
                aria-hidden="true"
              />
            </span>
            {" "}writes their
            <br className="hidden sm:block" /> first real program{" "}
            <span className="relative whitespace-nowrap text-coral">
              in week one
              <Squiggle className="absolute -bottom-3 left-1 w-[88%]" />
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Live 1-on-1 coding and AI classes for ages 5 to 17, taught by vetted
            CS instructors. Trusted by a million students across 135 countries.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#trial"
              className="btn btn-primary px-7 py-4 text-base text-white"
            >
              Book a free trial class
            </a>
            <a
              href="#courses"
              className="btn btn-secondary px-7 py-4 text-base text-ink"
            >
              See the courses
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="text-base tracking-tight text-sun" aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <strong className="font-semibold text-ink">4.6/5</strong> on
              Trustpilot from parents in 135 countries
            </span>
          </div>
        </div>

        {/* Right: SVG illustration (unchanged) with teacher cards in the corners */}
        <div className="reveal relative flex items-center justify-center py-10">
          <div className="relative mx-auto w-full max-w-[560px]">

            {/* illustration at its original size, centered */}
            <div className="mx-auto w-full max-w-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-illustration.svg"
                alt="Kids learning to code with Codingal"
                className="h-auto w-full"
              />
            </div>

            {/* teacher card — top-left corner (empty space) */}
            <TeacherCard
              img="/images/teachers/teacher-5.jpg"
              name="Sara L."
              subject="AI & Data Science"
              className="absolute left-0 top-0 hidden sm:flex"
            />

            {/* teacher card — top-right corner */}
            <TeacherCard
              img="/images/teachers/teacher-2.jpg"
              name="Rahul M."
              subject="Coding teacher"
              className="absolute right-0 top-0 hidden sm:flex"
            />

            {/* teacher card — bottom-right corner */}
            <TeacherCard
              img="/images/teachers/teacher-3.jpg"
              name="Daniel K."
              subject="Game Dev teacher"
              className="absolute bottom-2 right-0 hidden sm:flex"
            />

            {/* Live badge — bottom-left corner */}
            <div className="absolute bottom-2 left-0 hidden items-center gap-2.5 rounded-2xl border-2 border-ink bg-surface px-3.5 py-2.5 shadow-hard-sm sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grass-soft">
                <span className="h-2 w-2 animate-pulse rounded-full bg-grass" />
              </span>
              <span className="text-[12px] leading-tight text-ink-soft">
                Live class starting
                <br />
                <strong className="font-semibold text-ink">1,000+ kids today</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
