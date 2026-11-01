import AboutSection from "@/components/home/about-section";
// import InstallationSection from "@/components/home/installation-section";
import ImageSequencing from "@/components/home/image-sequencing";
import OurProductSection from "@/components/home/ourproduct-section";
import TestimonialSection from "@/components/home/testimonial copy";
import CtaSection from "@/components/home/cta-section";
import AdsSection from "@/components/home/billboard";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      <AdsSection/>
      <AboutSection />
      <ImageSequencing />
      <OurProductSection />
      {/* <InstallationSection /> */}
      <TestimonialSection />
      <CtaSection/>
    </main>
  );
}
