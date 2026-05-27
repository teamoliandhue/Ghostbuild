"use client";

import { useReveal } from "@/lib/useReveal";

const products = [
  {
    name: "Arizona 9 Personal Cooler",
    spec: "9-inch blade · 25L tank · 3-side honeycomb pads · motorised louvers",
    img: "/images/product-arizona-9.jpg",
    price: "₹5,499",
    mrp: "₹7,999",
    tag: "Best for bedrooms",
  },
  {
    name: "8X Flo Pro Duct Cooler",
    spec: '100L tank · 21" 4-leaf fan · 8,500 m³/hr · 30 ft throw · double ball bearing',
    img: "/images/product-8x-flo-pro.jpg",
    price: "₹18,499",
    mrp: "₹24,999",
    tag: "For shopfloors & halls",
  },
  {
    name: '20" BLDC Pedestal Fan',
    spec: "20–120W · 2mm aluminium blades · 4 lockable wheels · 4-speed · 2-yr on-site",
    img: "/images/product-bldc-pedestal.jpg",
    price: "₹10,999",
    mrp: "₹14,999",
    tag: "Commercial best seller",
  },
];

export function FeaturedProducts() {
  useReveal();

  return (
    <section className="py-20 lg:py-28 bg-[var(--color-bg)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-navy-700)]">
              This week's deals
            </p>
            <h2 className="mt-3 text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-balance">
              Three units doing most of our shipping right now.
            </h2>
          </div>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-navy-700)] hover:gap-3 transition-all"
          >
            All products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="reveal group bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-square bg-white overflow-hidden">
                <span className="absolute top-4 left-4 z-10 text-[11px] font-semibold uppercase tracking-wider bg-[var(--color-yellow)] text-[var(--color-ink)] rounded-full px-3 py-1.5">
                  {p.tag}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 lg:p-7 border-t border-[var(--color-border)] flex-1 flex flex-col">
                <h3 className="text-[18px] lg:text-[20px] font-semibold leading-tight text-[var(--color-ink)]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[13px] text-[var(--color-ink-soft)] leading-relaxed">
                  {p.spec}
                </p>
                <div className="mt-6 flex items-end justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
                  <div>
                    <p className="text-[12px] text-[var(--color-ink-soft)] line-through">
                      MRP {p.mrp}
                    </p>
                    <p className="text-[22px] lg:text-[26px] font-bold text-[var(--color-ink)] leading-none mt-1">
                      {p.price}
                    </p>
                  </div>
                  <button className="bg-[var(--color-navy-700)] text-white text-[13px] font-semibold rounded-full px-5 py-3 hover:bg-[var(--color-navy-800)] transition-colors">
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
