import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Psicoterapia Sistêmica
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Tome conhecimento do seu próprio padrão de funcionamento
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <Link href="#contact">
              <Button size="lg" className="w-full min-[400px]:w-auto">Agende sua consulta</Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">Serviços</Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/hero-person.jpg"
            alt="A person holding a computer"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;