export default function FinalCTA() {
  return (
    <section id="trial" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="reveal relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-coral px-6 py-14 text-center shadow-[10px_10px_0_0_#17120e] sm:px-12 lg:py-20">
        {/* soft decorative blobs */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -right-8 h-52 w-52 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Book your child&apos;s free trial class.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">
            One live session, one real project, zero payment. See if it clicks
            before you decide anything.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#trial"
              className="btn bg-white px-8 py-4 text-base text-coral-dark"
            >
              Book a free trial class
            </a>
            <a
              href="#courses"
              className="btn bg-sun px-8 py-4 text-base text-ink"
            >
              See the courses
            </a>
          </div>
          <p className="mt-6 text-sm text-white/80">
            No card required &middot; 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
