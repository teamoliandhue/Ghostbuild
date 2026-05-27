import Image from "next/image";

const cols = [
  {
    title: "Shop",
    links: ["Air Coolers", "BLDC Pedestal Fans", "BLDC Ceiling Fans", "Mist Fans", "Tower Fans", "Exhaust Fans"],
  },
  {
    title: "For business",
    links: ["Bulk orders (20+ units)", "Commercial cooling solutions", "Annual maintenance contracts", "Become a reseller"],
  },
  {
    title: "Support",
    links: ["Warranty & on-site service", "Installation guides", "Spare parts", "Track your order", "Returns & refunds"],
  },
  {
    title: "Company",
    links: ["About Havai", "Blog & cooling tips", "Press", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy-900)] text-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_3fr] gap-12 lg:gap-20 pb-14 border-b border-white/10">
          <div>
            <Image
              src="/logo/logo.png"
              alt="Havai"
              width={140}
              height={48}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-6 text-[14px] text-white/55 leading-relaxed max-w-sm">
              Commercial BLDC fans, air coolers and mist systems built for Indian conditions. Ship anywhere in India, on-site warranty everywhere.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {["instagram", "facebook", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={s}
                >
                  <span className="text-[11px] uppercase tracking-wider">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white/40">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] text-white/75 hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-[12px] text-white/40">
          <p>© {new Date().getFullYear()} Havai Appliances Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Refunds</a>
            <a href="#" className="hover:text-white/70 transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
