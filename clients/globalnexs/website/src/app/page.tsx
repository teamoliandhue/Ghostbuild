import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Services />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      {/* GhostBuild preview badge — remove before client handoff */}
      <a
        href="https://www.oliandhue.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[999] bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0A2558] no-underline hover:shadow-[0_4px_32px_rgba(0,0,0,0.18)] transition-shadow"
      >
        <span className="w-2 h-2 rounded-full bg-[#1B6AC9]" />
        Redesigned by Oli &amp; Hue
        <span className="text-[#94A3B8] font-normal">· GhostBuild Preview</span>
      </a>
    </>
  );
}
