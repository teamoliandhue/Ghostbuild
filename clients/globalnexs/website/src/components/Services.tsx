const services = [
  {
    icon: "🎓",
    title: "University Admissions",
    body: "Personalised shortlisting across 100+ partner universities in UK, Australia, Canada, Europe, and more. We match your profile to the best fit — not just the easiest acceptance.",
    outcome: "Avg. 3 offers per student",
  },
  {
    icon: "📝",
    title: "IELTS / OET / PTE Coaching",
    body: "Structured coaching from experienced trainers with real exam simulations. Weekday, weekend, and online batches available — we work around your schedule.",
    outcome: "85% score their target band first try",
  },
  {
    icon: "✈️",
    title: "Visa Processing",
    body: "Student, dependent, and visiting visas handled with a documentation checklist built from 200+ successful applications. We know what each embassy actually wants to see.",
    outcome: "92% visa approval rate",
  },
  {
    icon: "💳",
    title: "Education Loans",
    body: "We partner with leading banks and NBFCs to help you secure the best loan terms. No-collateral options available for eligible students going to select countries.",
    outcome: "Avg. loan approval in 18 days",
  },
  {
    icon: "📑",
    title: "Document Evaluation",
    body: "UKNARIC, WES, and international credential evaluation handled in-house. We verify before submission so embassies don't reject on technical grounds.",
    outcome: "Zero rejection rate on evaluated docs",
  },
  {
    icon: "🌍",
    title: "Pre-Departure Support",
    body: "Country briefings, accommodation guidance, SIM and bank account setup — so you arrive prepared, not overwhelmed. Plus lifelong access to our alumni network.",
    outcome: "Students active in 20+ countries",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#1B6AC9] text-lg">✦</span>
          <span className="text-[#1B6AC9] text-xs font-bold uppercase tracking-widest">What We Do</span>
        </div>
        <div className="md:flex md:items-end md:justify-between mb-14">
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-[#0A2558] leading-tight">
              Everything you need,<br />
              <em className="not-italic text-[#1B6AC9]">under one roof.</em>
            </h2>
            <p className="text-[#475569] text-lg mt-3 max-w-lg leading-relaxed">
              From your first IELTS class to your first day on campus — we&apos;re with you at every step.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group border border-[#E2E8F0] hover:border-transparent rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] bg-white relative overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1B6AC9] to-[#FF6B2B] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-12 h-12 rounded-xl bg-[#0A2558]/[0.06] flex items-center justify-center text-2xl mb-5">
                {s.icon}
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-[#0A2558] font-bold text-lg mb-2.5">{s.title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-4">{s.body}</p>
              <div className="flex items-center gap-1.5 text-[#10B981] text-sm font-semibold">
                <span>✓</span>
                <span>{s.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
