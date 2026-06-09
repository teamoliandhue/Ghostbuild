import Image from "next/image";

type Level = "Beginner" | "Intermediate" | "Advanced";

const LEVEL: Record<Level, { text: string; dot: string; avatar: string }> = {
  Beginner:     { text: "text-grass",     dot: "bg-grass", avatar: "bg-grass-soft" },
  Intermediate: { text: "text-[#c9971a]", dot: "bg-sun",   avatar: "bg-sun-soft"   },
  Advanced:     { text: "text-coral",     dot: "bg-coral", avatar: "bg-coral-soft" },
};

/* ── line icons ── */
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" /><path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}
function ClipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5l-9.2 9.2a5 5 0 0 1-7-7l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.3-2.3l8.5-8.5" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.3" />
    </svg>
  );
}

type Project = {
  title: string;
  grade: string;
  level: Level;
  student: string;
  date: string;
  desc: string;
  files: number;
  tags: string;
  img: string;
  imgBg: string;
};

const COLUMNS: { name: string; level: Level; projects: Project[] }[] = [
  {
    name: "Beginner", level: "Beginner",
    projects: [
      { title: "Dance party animation", grade: "Grade 3", level: "Beginner", student: "Aanya", date: "Sep 25, 2025", desc: "Characters dance to music using motion and sound blocks. A first Scratch build.", files: 24, tags: "Scratch, Animation", img: "/images/project-dance.png", imgBg: "bg-coral-soft" },
      { title: "Solar system explorer", grade: "Grade 2", level: "Beginner", student: "Samhith", date: "Oct 2, 2025", desc: "Planets orbit the sun in an interactive space scene the child narrates.", files: 31, tags: "Scratch, Space", img: "/images/project-solar.png", imgBg: "bg-grape-soft" },
    ],
  },
  {
    name: "Intermediate", level: "Intermediate",
    projects: [
      { title: "Knowing about animals", grade: "Grade 6", level: "Intermediate", student: "Hiba", date: "Sep 18, 2025", desc: "A quiz game that teaches facts about wild animals with score tracking.", files: 18, tags: "Quiz, Game", img: "/images/project-animals.png", imgBg: "bg-sky-soft" },
      { title: "Life cycle of a butterfly", grade: "Grade 7", level: "Intermediate", student: "Ankit", date: "Sep 21, 2025", desc: "An animated story showing each stage from egg to butterfly.", files: 27, tags: "Animation, Science", img: "/images/project-butterfly.png", imgBg: "bg-sun-soft" },
      { title: "Rocket launch", grade: "Grade 3", level: "Intermediate", student: "Abdullah", date: "Sep 14, 2025", desc: "A countdown rocket launch coded with Python turtle graphics.", files: 15, tags: "Python, Game", img: "/images/project-rocket.png", imgBg: "bg-grass-soft" },
    ],
  },
  {
    name: "Advanced", level: "Advanced",
    projects: [
      { title: "Premier league voting website", grade: "Grade 10", level: "Advanced", student: "Rohan", date: "Sep 26, 2025", desc: "A full web app where fans vote for their player of the week.", files: 56, tags: "Web, HTML, CSS", img: "/images/project-premier.png", imgBg: "bg-sky-soft" },
    ],
  },
];

function Card({ p }: { p: Project }) {
  const lv = LEVEL[p.level];
  return (
    <article className="folder-card">
      {/* folder outline (Vector 1636.svg) */}
      <svg
        className="folder-outline"
        viewBox="0 0 300 289"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M116.558 1.15771H21.1577C10.112 1.15771 1.15771 10.112 1.15771 21.1577V267.158C1.15771 278.203 10.112 287.158 21.1577 287.158H278.658C289.703 287.158 298.658 278.203 298.658 267.158V43.6577C298.658 32.612 289.703 23.6577 278.658 23.6577H161.758C152.877 23.6577 144.511 19.4931 139.158 12.4077C133.804 5.32237 125.438 1.15771 116.558 1.15771Z"
          fill="#ffffff"
          stroke="#17120e"
          strokeWidth="2.31579"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* grade in the tab (no flag icon) */}
      <span className={`folder-flag text-[11px] uppercase tracking-wide ${lv.text}`}>
        {p.grade}
      </span>

      {/* card content */}
      <div className="folder-body px-5 pb-5 pt-9">
        {/* menu dots */}
        <div className="flex justify-end">
          <span className="text-base leading-none text-ink-soft/50">···</span>
        </div>

        {/* thumbnail */}
        <div className={`relative mt-1 aspect-[16/9] w-full overflow-hidden rounded-xl border-2 border-ink ${p.imgBg}`}>
          <Image src={p.img} alt={p.title} fill sizes="320px" className="object-contain p-2" />
        </div>

        {/* title */}
        <h3 className="font-display mt-3 text-xl font-semibold leading-snug text-ink">
          {p.title}
        </h3>

        {/* assignee (initial avatar) + date */}
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink text-[13px] font-bold text-ink ${lv.avatar}`}>
              {p.student.charAt(0)}
            </span>
            <span className="text-[15px] font-medium text-ink">{p.student}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-ink-soft">
            <CalendarIcon /> {p.date}
          </span>
        </div>

        {/* description */}
        <p className="mt-4 min-h-[2.6em] text-[14px] leading-relaxed text-ink-soft">
          {p.desc}
        </p>

        {/* footer */}
        <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3.5 text-[13px] text-ink-soft">
          <span className="flex items-center gap-1.5"><ClipIcon /> {p.files} files</span>
          <span className="flex items-center gap-1.5"><TagIcon /> {p.tags}</span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="bg-cream-deep/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            Student projects
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Real projects, built by real kids.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Every one of these shipped at the end of a course stage. The grade is
            on each card, so you can see what a child your kid&apos;s age actually
            makes.
          </p>
        </div>

        {/* Kanban board */}
        <div className="reveal mt-8 flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {COLUMNS.map((col) => {
            const lv = LEVEL[col.level];
            return (
              <div key={col.name} className="w-[300px] flex-none lg:w-auto">
                {/* column header */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-ink bg-surface px-4 py-2.5 shadow-hard-sm">
                  <span className="flex items-center gap-2 font-display text-base font-bold text-ink">
                    <span className={`h-2.5 w-2.5 rounded-full ${lv.dot}`} />
                    {col.name}
                  </span>
                  <span className="rounded-full border-2 border-ink bg-cream-deep px-2.5 py-0.5 text-xs font-bold text-ink">
                    {col.projects.length}
                  </span>
                </div>
                {/* cards */}
                <div>
                  {col.projects.map((p) => (
                    <Card key={p.title} p={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
