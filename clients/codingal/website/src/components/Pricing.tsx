/**
 * Pricing (audit UX-3 / content-audit #10).
 * NOTE: dollar amounts below are INDICATIVE placeholders for the team to
 * confirm before this site goes live. Codingal does not publish prices today,
 * so these are directional only and labelled as such on the page.
 */
const PLANS = [
  {
    name: "Explorer",
    price: "$59",
    cadence: "/ month",
    blurb: "1 live class a week. Best for first-timers finding their feet.",
    features: ["1 private 1-on-1 class / week", "Full course access", "Parent dashboard + reports"],
    featured: false,
  },
  {
    name: "Builder",
    price: "$109",
    cadence: "/ month",
    blurb: "2 live classes a week. The pace most families settle into.",
    features: ["2 private 1-on-1 classes / week", "Everything in Explorer", "Priority instructor matching", "Competition + certificate prep"],
    featured: true,
  },
  {
    name: "Pro",
    price: "$149",
    cadence: "/ month",
    blurb: "3+ live classes a week. For kids who want to move fast.",
    features: ["3+ private 1-on-1 classes / week", "Everything in Builder", "Dedicated mentor", "AP / portfolio guidance"],
    featured: false,
  },
];

const TINT: Record<string, string> = {
  Explorer: "bg-grass-soft",
  Builder: "bg-coral-soft",
  Pro: "bg-sun-soft",
};

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          Pricing
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Simple plans. Free trial first, full refund if it&apos;s not a fit.
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Every plan starts with a free trial class. 30-day money-back guarantee,
          no questions.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`reveal relative flex flex-col rounded-[26px] border-2 border-ink p-7 ${TINT[p.name]} ${
              p.featured
                ? "shadow-[8px_8px_0_0_#17120e] lg:-translate-y-3"
                : "shadow-hard"
            }`}
          >
            {p.featured && (
              <span className="chip absolute -top-3.5 left-1/2 -translate-x-1/2 bg-coral px-4 py-1 text-xs uppercase tracking-wide text-white shadow-hard-sm">
                Most popular
              </span>
            )}
            <h3 className="font-display text-2xl font-semibold text-ink">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
              <span className="mb-1 text-sm text-ink-soft">{p.cadence}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-ink bg-surface text-xs font-bold text-ink">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#trial"
              className={`btn mt-7 w-full px-6 py-3.5 text-base ${
                p.featured ? "btn-primary text-white" : "btn-secondary text-ink"
              }`}
            >
              Start with a free trial
            </a>
          </div>
        ))}
      </div>

      <p className="reveal mt-8 text-center text-xs text-ink-soft">
        Pricing shown is indicative. Your exact plan is confirmed on your free
        trial call, with no obligation to continue.
      </p>
    </section>
  );
}
