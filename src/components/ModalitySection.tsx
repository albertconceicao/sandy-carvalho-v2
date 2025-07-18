import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// CheckCircle2 não será mais necessário para este layout

const ModalitySection = () => {
  return (
    <section id="modality" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Modalidade: Terapia Online
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              A terapia online oferece flexibilidade e conforto, permitindo que você cuide da sua saúde mental de onde estiver.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">O que é necessário?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6"> {/* Aumentei o espaçamento entre os itens */}
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Tenha um aparelho com boa conexão à internet;
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Procure sempre estar em um ambiente privado, onde você se sinta confortável para falar sobre o que precisar e sem interrupções;
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Recomendo também que, se possível, utilize fones de ouvido, e não fotografe ou faça gravações de áudio ou vídeo durante as sessões para que o sigilo durante o atendimento seja preservado;
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Quais as Vantagens?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6"> {/* Aumentei o espaçamento entre os itens */}
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Quebra de barreiras geográficas
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Flexibilidade e privacidade
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <p className="text-muted-foreground flex-grow">
                    Economia de tempo com deslocamento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-fd4282a76597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A person on a video call"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ModalitySection;