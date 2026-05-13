const steps = [
  {
    n: "01",
    title: "Free Assessment Call",
    body: "A 30-minute session with your dedicated counsellor. We review your academic background, budget, career goals, and preferred countries — and give you a realistic shortlist the same day.",
  },
  {
    n: "02",
    title: "Application & Test Prep",
    body: "We prepare and submit your applications, handle all communication with universities, and run parallel IELTS/OET coaching if needed. You review decisions, we execute everything else.",
  },
  {
    n: "03",
    title: "Visa, Loan & Departure",
    body: "Once your offer letter is confirmed, we move fast on visa filing, loan processing, and your pre-departure checklist. Most students land within 90 days of starting.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-[5%] bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#FF6B2B] text-lg">✦</span>
          <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-widest">The Process</span>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-[#0A2558] leading-tight mb-4">
          From <em className="not-italic text-[#FF6B2B]">&ldquo;I want to study abroad&rdquo;</em><br />
          to <em className="not-italic text-[#1B6AC9]">&ldquo;I just landed&rdquo;</em> — in 3 stages.
        </h2>
        <p className="text-[#475569] text-lg mb-16 max-w-xl leading-relaxed">
          We&apos;ve refined this process across 200+ student journeys. Here&apos;s what yours looks like.
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#1B6AC9] to-[#FF6B2B]" />

          {steps.map((s) => (
            <div key={s.n} className="relative text-center md:text-left">
              {/* Step number bubble */}
              <div className="w-[72px] h-[72px] rounded-full bg-[#0A2558] border-4 border-[#F8FAFC] shadow-[0_0_0_4px_#1B6AC9] flex items-center justify-center mx-auto md:mx-0 mb-6 relative z-10">
                <span className="font-[family-name:var(--font-sora)] text-white text-xl font-extrabold">{s.n}</span>
              </div>
              <h3 className="font-[family-name:var(--font-sora)] text-[#0A2558] font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Stat strip below steps */}
        <div className="grid grid-cols-3 gap-6 mt-16 bg-[#0A2558] rounded-3xl p-8">
          {[
            { stat: "30 min", label: "First consultation — same-day shortlist" },
            { stat: "8–14 wks", label: "Average time from first call to visa" },
            { stat: "90 days", label: "Most students land within 90 days" },
          ].map((item) => (
            <div key={item.stat} className="text-center">
              <div className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-[#FF6B2B] mb-1">{item.stat}</div>
              <div className="text-white/50 text-sm leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
