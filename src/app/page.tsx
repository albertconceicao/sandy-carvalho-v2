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
import { getSiteContent } from "@/lib/content";
import { getApprovedTestimonials } from "@/lib/supabase/testimonials";

export default async function Home() {
  const [content, testimonials] = await Promise.all([getSiteContent(), getApprovedTestimonials()]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar global={content.global} />
      <main className="flex-grow">
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ApproachSection content={content.approach} />
        <ModalitySection content={content.modality} />
        <ServicesSection content={content.services} />
        <FAQSection content={content.faq} />
        <TestimonialsSection content={content.testimonials} testimonials={testimonials} />
        <ContactSection global={content.global} />
      </main>
      <Footer global={content.global} />
    </div>
  );
}
