/**
 * Thin credibility strip (audit UX-1): slim proof high on the page.
 * Logos rendered as text wordmarks to stay crisp and avoid a crowded image row.
 */
export default function TrustStrip() {
  return (
    <section className="border-y-2 border-ink bg-sun-soft">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-6 lg:flex-row lg:justify-between lg:px-8">
        <p className="text-sm font-medium text-ink-soft">
          Built &amp; backed by{" "}
          <span className="font-semibold text-ink">Y Combinator</span>,{" "}
          <span className="font-semibold text-ink">Google</span> and{" "}
          <span className="font-semibold text-ink">Amazon</span>
        </p>
        <div className="hidden h-5 w-px bg-line lg:block" />
        <p className="text-sm font-medium text-ink-soft">
          As seen in{" "}
          <span className="font-semibold text-ink">
            Mint &middot; Indian Express &middot; YourStory &middot; Business
            Standard &middot; The Print
          </span>
        </p>
      </div>
    </section>
  );
}
