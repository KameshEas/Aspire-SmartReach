import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import SocialProof from "@/components/sections/SocialProof";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <SocialProof /> */}
        {/* <StatsSection /> */}
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
