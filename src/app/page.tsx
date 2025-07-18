import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection"; // Importar o novo componente

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection /> {/* Adicionar a seção 'Sobre mim' aqui */}
        {/* As próximas seções serão adicionadas aqui */}
      </main>
      <MadeWithDyad />
    </div>
  );
}