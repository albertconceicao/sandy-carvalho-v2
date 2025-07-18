import React from "react";
import Image from "next/image";

const ApproachSection = () => {
  return (
    <section id="approach" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Abordagem: Terapia Relacional Sistêmica
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              A terapia Relacional Sistêmica parte do pressuposto de que o sujeito não pode ser compreendido sem conhecer os sistemas e ambientes em que está inserido.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Neste viés, as sessões passeiam por seus relacionamentos amorosos, familiares e de amizade. Sendo essas relações exploradas conjuntamente nas sessões de psicoterapia, permitindo ao cliente identificar seu próprio padrão de funcionamento, a partir de reflexões pontuais, perguntas, atividades com objetivos predefinidos e outras propostas terapêuticas.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              A partir dessas técnicas, o cliente passa a desenvolver novas habilidades, nomear e validar seus sentimentos e emoções, e por consequência passa a lidar de forma mais saudável com seus conflitos internos e externos.
            </p>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583fd046b7ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A person holding a book"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;