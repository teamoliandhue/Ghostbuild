export default function CTA() {
  return (
    <section id="book" className="py-24 px-6 md:px-[5%] bg-[#0A2558] relative overflow-hidden text-center">
      {/* Background glow */}
      <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#1B6AC9]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#FF6B2B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Decorative spark motif */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-[#FF6B2B] text-lg">✦</span>
          <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-widest">Get Started</span>
          <span className="text-[#FF6B2B] text-lg">✦</span>
        </div>

        <h2 className="font-[family-name:var(--font-sora)] text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight mb-5">
          Your intake window is open.<br />
          Let&apos;s make sure <em className="not-italic text-[#FF6B2B]">you&apos;re in it.</em>
        </h2>

        <p className="text-white/55 text-lg leading-relaxed mb-6 max-w-xl mx-auto">
          The September 2026 UK &amp; Australia intake deadline is closer than you think. Our counsellors have limited assessment slots each week.
        </p>

        {/* Urgency pill */}
        <div className="inline-flex items-center gap-2 bg-[#FF6B2B]/15 border border-[#FF6B2B]/30 px-4 py-2 rounded-full mb-8">
          <span className="text-[#FF6B2B] text-sm">⚡</span>
          <span className="text-[#FF6B2B] text-sm font-semibold">September 2026 intake — limited slots remaining</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            className="inline-flex items-center gap-2 bg-white text-[#0A2558] font-bold text-[15px] px-7 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)] transition-all"
          >
            💬 Book on WhatsApp →
          </a>
          <a
            href="mailto:info@globalnexs.com"
            className="inline-flex items-center gap-2 border-2 border-white/25 hover:border-white text-white font-bold text-[15px] px-7 py-3.5 rounded-xl hover:bg-white/[0.06] transition-all"
          >
            📧 Email us instead
          </a>
        </div>

        <p className="text-white/35 text-sm">
          Free assessment, no pressure. <span className="text-white/60 font-semibold">Zero spam, ever.</span>
        </p>
      </div>
    </section>
  );
}
