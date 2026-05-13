import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustRibbon from "@/components/TrustRibbon";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Countries from "@/components/Countries";
import Team from "@/components/Team";
import CohortProof from "@/components/CohortProof";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustRibbon />
        <HowItWorks />
        <Services />
        <Countries />
        <Team />
        <CohortProof />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
