import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import BuildSpace from "@/components/home/build-space";
import InstallationSection from "@/components/home/installation-section";
import ImageSequencing from "@/components/home/image-sequencing";
import OurProductSection from "@/components/home/ourproduct-section";
import TestimonialSection from "@/components/home/testimonial";
import CtaSection from "@/components/home/cta-section";
import AdsSection from "@/components/home/billboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <HeroSection />
      <AboutSection />
      <AdsSection/>
      <BuildSpace />
      <InstallationSection />
      <ImageSequencing />
      <OurProductSection />
      <TestimonialSection />
      <CtaSection/>
    </main>
  );
}
