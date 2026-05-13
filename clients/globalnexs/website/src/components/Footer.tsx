import Image from "next/image";
import Link from "next/link";

const links = {
  Services: ["University Admissions", "IELTS Coaching", "Visa Processing", "Education Loans", "Pre-Departure"],
  Countries: ["United Kingdom", "Australia", "Canada", "Germany", "Ireland"],
  Company: ["About Us", "Our Team", "Student Stories", "Blog", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0A2558] border-t border-white/[0.07] px-6 md:px-[5%] pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand column */}
          <div>
            <Link href="#" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo/logo.png"
                alt="GlobalNexs International"
                width={114}
                height={80}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[260px]">
              Helping Kerala students reach world-class universities since 2022. 200+ students placed across 20+ countries.
            </p>
            <div className="flex flex-col gap-2 mt-5">
              <a href="tel:+91XXXXXXXXXX" className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2">
                📞 +91 XXX XXX XXXX
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2">
                💬 WhatsApp
              </a>
              <a href="mailto:info@globalnexs.com" className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2">
                ✉️ info@globalnexs.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white/65 text-xs font-bold uppercase tracking-widest mb-4">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/40 text-sm hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-7 flex flex-wrap items-center justify-between gap-4 text-white/30 text-xs">
          <span>© 2026 GlobalNexs International. Kochi, Kerala.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
