import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ModalitySection from "@/components/ModalitySection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { RootDivider } from "@/components/motion/RootDivider";
import { siteContent } from "@/content/site";
import { getApprovedTestimonials } from "@/lib/supabase/testimonials";

export const revalidate = 60;

export default async function Home() {
  const testimonials = await getApprovedTestimonials();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar global={siteContent.global} />
      <main className="flex-grow">
        <HeroSection content={siteContent.hero} />
        <RootDivider variant="hero" />
        <AboutSection content={siteContent.about} />
        <ApproachSection content={siteContent.approach} />
        <ModalitySection content={siteContent.modality} />
        <ServicesSection content={siteContent.services} />
        <FAQSection content={siteContent.faq} />
        <TestimonialsSection content={siteContent.testimonials} testimonials={testimonials} />
        <ContactSection global={siteContent.global} />
      </main>
      <Footer global={siteContent.global} />
    </div>
  );
}
