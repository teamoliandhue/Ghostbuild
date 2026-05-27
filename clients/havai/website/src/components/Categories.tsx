"use client";

import { useReveal } from "@/lib/useReveal";

const categories = [
  {
    title: "Air Coolers",
    sub: "25L personal to 100L commercial duct",
    img: "/images/cat-air-cooler.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "Commercial Mist Fans",
    sub: "Outdoor cooling for events & restaurants",
    img: "/images/cat-commercial-mist.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "BLDC Pedestal & Wall",
    sub: "20W–120W · 4-speed industrial",
    img: "/images/cat-bldc-fans.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "BLDC Ceiling Fans",
    sub: "28W · half the electricity bill",
    img: "/images/cat-ceiling-fans.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "Tower Fans",
    sub: "Slim profile, big airflow",
    img: "/images/cat-tower-fans.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "Residential Mist Fans",
    sub: "Balcony & terrace cooling",
    img: "/images/cat-residential-mist.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "Ergonomic Chairs",
    sub: "Built for 9-hour shifts",
    img: "/images/cat-chairs.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
  {
    title: "Drying & Ironing",
    sub: "Iron boards, cloth airers, spares",
    img: "/images/cat-drying-stand.jpg",
    href: "#",
    span: "lg:col-span-2",
  },
];

export function Categories() {
  useReveal();

  return (
    <section id="categories" className="py-20 lg:py-28">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl reveal">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--color-navy-700)]">
            The catalogue
          </p>
          <h2 className="mt-3 text-[36px] lg:text-[52px] font-bold leading-[1.05] tracking-tight text-balance">
            Built for every room and every shopfloor.
          </h2>
          <p className="mt-5 text-[16px] lg:text-[17px] text-[var(--color-ink-soft)] leading-relaxed max-w-xl">
            From the 25-litre personal cooler in your study to the 100-litre duct cooler running your factory. Eight categories, one warranty, one phone number when something goes wrong.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="reveal group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] aspect-square flex flex-col"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex-1 overflow-hidden bg-[var(--color-navy-100)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-[15px] lg:text-[17px] font-semibold text-[var(--color-ink)] leading-tight">
                  {c.title}
                </h3>
                <p className="mt-1 text-[12px] lg:text-[13px] text-[var(--color-ink-soft)] leading-snug">
                  {c.sub}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-navy-700)] group-hover:gap-2.5 transition-all">
                  See all {c.title.toLowerCase()}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
