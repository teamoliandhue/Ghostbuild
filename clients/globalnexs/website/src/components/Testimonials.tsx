const testimonials = [
  {
    stars: 5,
    quote:
      "My visa was approved in 14 days. I'd heard horror stories about UK visas but my counsellor built the documentation checklist from scratch and made sure every single detail was airtight before we filed.",
    name: "Arjun Pradeep",
    detail: "MSc Data Science — University of Exeter, UK",
    bg: "from-indigo-400 to-purple-500",
    initial: "A",
  },
  {
    stars: 5,
    quote:
      "I was scared about the loan process. GlobalNexs handled the entire bank paperwork and I got approval within 3 weeks. They also negotiated a better interest rate than what I found on my own online.",
    name: "Sneha Nair",
    detail: "BCom Accounting — Deakin University, Australia",
    bg: "from-pink-400 to-orange-400",
    initial: "S",
  },
  {
    stars: 5,
    quote:
      "What I didn't expect was the post-arrival support. Even after landing in Toronto, my counsellor helped me set up a bank account and connected me with Kerala students already studying there.",
    name: "Rohan Menon",
    detail: "MBA — York University, Canada",
    bg: "from-emerald-400 to-cyan-500",
    initial: "R",
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-24 px-6 md:px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#1B6AC9] text-lg">✦</span>
          <span className="text-[#1B6AC9] text-xs font-bold uppercase tracking-widest">Student Stories</span>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-[#0A2558] leading-tight mb-3">
          Real students. Real universities.<br />
          <em className="not-italic text-[#FF6B2B]">Real outcomes.</em>
        </h2>
        <p className="text-[#475569] text-lg mb-14 max-w-lg leading-relaxed">
          Don&apos;t take our word for it — here&apos;s what students who&apos;ve been through the process say.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              {/* Stars */}
              <div className="text-[#FF6B2B] text-sm tracking-[3px] mb-5">{"★".repeat(t.stars)}</div>

              {/* Opening quote mark */}
              <div className="text-5xl text-[#1B6AC9]/20 leading-none font-serif mb-2">&ldquo;</div>

              <p className="text-[#1E293B] text-sm leading-[1.8] mb-6 italic">{t.quote}</p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center text-white font-bold text-base shrink-0`}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="text-[#0A2558] font-bold text-sm">{t.name}</div>
                  <div className="text-[#94A3B8] text-xs">{t.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gemini image prompt note for team — visible only in dev */}
        {/*
          Image generation prompt for hero testimonial background:
          "Photorealistic: confident young Indian student at a UK university campus,
          golden hour lighting, aspirational and warm mood, wide angle,
          no text overlays, high resolution"
        */}
      </div>
    </section>
  );
}
