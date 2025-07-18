import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import ModalitySection from "@/components/ModalitySection";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection"; // Importar o novo componente

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
        <ContactSection /> {/* Adicionar a seção de contato aqui */}
      </main>
      <MadeWithDyad />
    </div>
  );
}