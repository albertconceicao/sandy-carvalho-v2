import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer"; // Importar o novo componente Footer
import HeroSection from "@/components/HeroSection";
import ModalitySection from "@/components/ModalitySection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <ModalitySection />
        <ServicesSection />
        <FAQSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer /> {/* Adicionar o rodapé aqui, após MadeWithDyad */}
    </div>
  );
}