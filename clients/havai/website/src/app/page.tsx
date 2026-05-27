import { AnnouncementBar, Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { WhyHavai } from "@/components/WhyHavai";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Categories />
        <WhyHavai />
        <FeaturedProducts />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
