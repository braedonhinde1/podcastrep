import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import BrandStrip from "@/components/sections/BrandStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyUs from "@/components/sections/WhyUs";
import Results from "@/components/sections/Results";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandStrip />
        <HowItWorks />
        <WhyUs />
        <Results />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
