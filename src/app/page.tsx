import { ComingSoon } from "@/components/sections/coming-soon";
import { Feature } from "@/components/sections/features-section";
import { Footer } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { Features } from "@/components/sections/who-it-is-for";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <HowItWorksSection />
      <Feature />
      <ComingSoon />
      <Footer/>
    </>
  );
}
