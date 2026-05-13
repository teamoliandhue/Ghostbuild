import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-line)", paddingTop: 64, paddingBottom: 40 }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Image src="/logo/logo.png" alt="Globalnex" width={160} height={42} className="h-10 w-auto" />
            <p className="body-md mt-6 max-w-md">
              Study abroad consultancy based in Angamaly, Kerala. Placing students from Kerala into world-class universities across seven countries.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="small mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-ink-mute)" }}>Explore</div>
            <ul style={{ fontSize: 14 }} className="footer-list">
              <li><a href="#about" className="hover:text-[var(--color-brand)]">About</a></li>
              <li><a href="#services" className="hover:text-[var(--color-brand)]">Services</a></li>
              <li><a href="#countries" className="hover:text-[var(--color-brand)]">Countries</a></li>
              <li><a href="#process" className="hover:text-[var(--color-brand)]">Process</a></li>
              <li><a href="#faq" className="hover:text-[var(--color-brand)]">FAQ</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="small mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-ink-mute)" }}>Coaching</div>
            <ul style={{ fontSize: 14 }} className="footer-list">
              <li>IELTS</li>
              <li>OET</li>
              <li>PTE</li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="small mb-4" style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-ink-mute)" }}>Find us</div>
            <ul style={{ fontSize: 14 }} className="footer-list">
              <li>Royal Thachil Plaza, MC Road, Angamaly</li>
              <li>info@globalnexs.com</li>
              <li>+91 88919 08341</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 small" style={{ borderTop: "1px solid var(--color-line)" }}>
          <div>© {new Date().getFullYear()} Globalnex International. All rights reserved.</div>
          <div>Angamaly · Kochi · Kerala</div>
        </div>
      </div>
    </footer>
  );
}
