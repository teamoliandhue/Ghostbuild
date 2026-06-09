const COLS = [
  {
    title: "Courses by grade",
    links: ["Grade 1-3", "Grade 4-5", "Grade 6-8", "Grade 9-10", "Grade 11-12"],
  },
  {
    title: "Learning paths",
    links: ["Elementary", "Middle school", "High school", "Coding for girls", "Camps"],
  },
  {
    title: "Company",
    links: ["About us", "Reviews", "Curriculum", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["Competitions", "Quizzes", "Masterclasses", "Worksheets", "Blog"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-cream-deep text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-coral text-lg">
                🐧
              </span>
              <span className="font-display text-2xl font-semibold">Codingal</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Live 1-on-1 coding and AI classes for kids ages 5 to 17. Trusted by
              a million students across 135 countries.
            </p>
            <a
              href="#trial"
              className="btn btn-primary mt-6 px-6 py-3 text-sm text-white"
            >
              Book a free trial class
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t-2 border-ink/15 pt-8 text-sm text-ink-soft sm:flex-row">
          <p>© Codingal 2026. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-ink">Terms</a>
            <a href="#" className="transition-colors hover:text-ink">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink">Refund policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
