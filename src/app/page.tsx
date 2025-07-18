import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import ModalitySection from "@/components/ModalitySection"; // Importar o novo componente

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <ModalitySection /> {/* Adicionar a seção 'Modalidade' aqui */}
        {/* As próximas seções serão adicionadas aqui */}
      </main>
      <MadeWithDyad />
    </div>
  );
}