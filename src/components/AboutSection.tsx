import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A person with her hair pulled over her face"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Um pouco sobre mim
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Olá! Seja bem vinda (o)! Eu sou a Sandy, me formei psicóloga pela Universidade Salvador. Tenho 26 anos. Minha atuação clínica é sempre orientada pela terapia familiar sistêmica.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Ainda durante a formação, me dediquei à área de Recursos Humanos, atuando com recrutamento e seleção. Atualmente, dedico-me totalmente ao atendimento clínico individual para adolescentes, adultos, casais e famílias. Iniciei minha trajetória na clínica com atendimentos presenciais ainda na graduação com estágios em clínicas e na clínica escola da universidade, o que inesperadamente fez eu me apaixonar por me conectar com pessoas/histórias. Já a paixão pela sistêmica começou bem antes, ainda no 5º semestre com as aulas de uma de minhas professoras favoritas da universidade.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Além da psicologia, ler livros de romance, maratonar séries, ir ao cinema, visitar museus e viajar estão entre meus programas favoritos, sem dúvidas as histórias movem a minha vida, não importa em quais formatos elas estejam apresentadas.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Quando me sinto esgotada encontro na natureza, no mar, na observação do céu, no artesanato e na costura a minha conexão comigo, com a minha história e meus antepassados e recarrego minhas energias novamente.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0 font-semibold">
              Meu propósito é ajudar meus clientes a melhor lidar com seus medos, angústias, desafios da vida e buscando trazer mais qualidade de vida e bem-estar, possibilitando a tomada de conhecimento do seu próprio padrão de funcionamento.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0 font-bold">
              Vamos Nessa jornada comigo?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;