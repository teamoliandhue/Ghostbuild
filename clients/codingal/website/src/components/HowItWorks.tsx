const STEPS = [
  {
    n: "01",
    title: "Book a free trial class",
    body: "Pick a time that suits you. Your child meets a real instructor 1-on-1 and builds something live in the very first session. No payment to try.",
    tint: "bg-coral text-white",
  },
  {
    n: "02",
    title: "We match the right course",
    body: "After the trial we recommend a course mapped to your child's grade and pace, from the first block of code through to AP Computer Science.",
    tint: "bg-sky text-ink",
  },
  {
    n: "03",
    title: "Watch real projects ship",
    body: "Your child builds games, apps and websites every few weeks. You track every project and progress report from the parent dashboard.",
    tint: "bg-grass text-ink",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="reveal max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          How it works
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          From booking to a finished project in three steps.
        </h2>
      </div>

      <div className="relative mt-14 grid gap-6 md:grid-cols-3">
        {/* connector line */}
        <div className="absolute left-0 right-0 top-9 hidden border-t-2 border-dashed border-line md:block" />
        {STEPS.map((s) => (
          <div key={s.n} className="reveal relative">
            <span
              className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-base font-bold shadow-hard-sm ${s.tint}`}
            >
              {s.n}
            </span>
            <h3 className="font-display mt-5 text-2xl font-semibold text-ink">
              {s.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
