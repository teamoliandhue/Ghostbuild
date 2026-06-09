import RevealInit from "@/components/RevealInit";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import HowItWorks from "@/components/HowItWorks";
import Courses from "@/components/Courses";
import ClassPreview from "@/components/ClassPreview";
import Projects from "@/components/Projects";
import Teachers from "@/components/Teachers";
import TrustSection from "@/components/TrustSection";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Courses />
        <ClassPreview />
        <Projects />
        <Teachers />
        <TrustSection />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
