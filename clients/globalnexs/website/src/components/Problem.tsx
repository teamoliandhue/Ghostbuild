const problems = [
  {
    icon: "😰",
    title: "Overwhelmed by options",
    body: "20 countries, hundreds of universities, dozens of deadlines. Without guidance, most students pick the wrong course or miss intake windows entirely.",
  },
  {
    icon: "📋",
    title: "Visa rejections from preventable errors",
    body: "Small documentation mistakes are the #1 cause of visa rejection. One wrong form and your plans are delayed by 6–12 months.",
  },
  {
    icon: "💰",
    title: "Hidden costs from bad guidance",
    body: "Wrong university choice means wrong tuition fees, wrong scholarship eligibility, and sometimes — deportation back home mid-semester.",
  },
];

const steps = [
  {
    n: "1",
    title: "Free eligibility assessment",
    body: "We map your profile to real universities — no generic shortlists, no false promises.",
  },
  {
    n: "2",
    title: "Dedicated counsellor, one point of contact",
    body: "Not a call centre. One counsellor handles your file from day one to departure.",
  },
  {
    n: "3",
    title: "Visa-first documentation strategy",
    body: "We build your file for visa approval from the start, not as an afterthought.",
  },
  {
    n: "4",
    title: "Support until you land",
    body: "Loan assistance, pre-departure briefings, and a community of GlobalNexs alumni abroad.",
  },
];

export default function Problem() {
  return (
    <section id="why" className="bg-[#0A2558] py-24 px-6 md:px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Section label — decorative spark motif from reference */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#FF6B2B] text-lg">✦</span>
          <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-widest">The Challenge</span>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
          Studying abroad is <em className="not-italic text-[#FF6B2B]">complicated.</em><br />
          Finding the right guide shouldn&apos;t be.
        </h2>
        <p className="text-white/50 text-lg max-w-xl mb-14 leading-relaxed">
          Most students lose 3–6 months navigating confusing applications, unclear visa rules, and wrong university choices — alone.
        </p>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Problems */}
          <div className="flex flex-col gap-4">
            {problems.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 items-start bg-white/[0.04] border border-white/[0.07] hover:border-[#FF6B2B]/30 rounded-2xl p-5 transition-colors"
              >
                <span className="text-2xl shrink-0 mt-0.5">{p.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Solution panel */}
          <div className="bg-gradient-to-br from-[#1B6AC9]/20 to-[#FF6B2B]/8 border border-white/10 rounded-3xl p-8">
            <h3 className="text-white font-[family-name:var(--font-sora)] font-bold text-xl mb-7">
              Here&apos;s what GlobalNexs does differently
            </h3>
            <div className="flex flex-col gap-5">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1B6AC9] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">{s.title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
