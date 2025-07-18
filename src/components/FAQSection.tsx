import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqItems = [
    {
      question: "Quanto tempo dura uma sessão?",
      answer: "Até 50 minutos para atendimentos individuais e até 1h30 para terapias de casal e família.",
    },
    {
      question: "Quando vou receber alta?",
      answer: "O objetivo da psicoterapia é tornar o cliente independente do terapeuta. O processo terapêutico não tem um tempo predeterminado, a duração é particular para cada cliente.",
    },
    {
      question: "Como funciona a primeira sessão?",
      answer: "O principal objetivo da primeira sessão é coletar informações do cliente, demandas, e motivo da busca pela terapia. As normas e regras, frequência, horários e política de faltas são apresentadas e fica aberto um espaço para tirar dúvidas, dando início ainda nesta sessão a aliança terapêutica.",
    },
    {
      question: "Como funciona o sigilo?",
      answer: "Eu tenho o dever ético de resguardar todo o conteúdo trabalhado nas nossas sessões – até minhas anotações!",
    },
    {
      question: "Qual o valor da sessão?",
      answer: "O Conselho Federal de Psicologia, estabeleceu regras para a divulgação do valor de terapia, que visam garantir a ética e a transparência nas práticas de psicólogos. Entre em contato comigo para consultar os valores.",
    },
    {
      question: "Aceito convênio?",
      answer: "Realizo atendimentos apenas particulares. Mas forneço recibo para reembolso do convênio.",
    },
    {
      question: "Qual a frequência das sessões?",
      answer: "As sessões tem recorrência semanal. A decisão sobre o espaçamento ou aumento das sessões é geralmente tomada em conjunto entre o paciente e a psicóloga, baseado no desenvolvimento do processo terapêutico.",
    },
    {
      question: "Psicólogo ou psiquiatra?",
      answer: "São complementares. O psiquiatra tem foco em sintomas físicos, enquanto a psicoterapia auxilia o cliente em aspectos emocionais.",
    },
    {
      question: "Como Saber Se Preciso De Psicoterapia?",
      answer: (
        <>
          Desde o diagnóstico de transtornos mentais, sofrimento emocional intenso e/ou dificuldade de executar tarefas rotineiras, até o autoconhecimento.
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Casos clínicos clássicos como ansiedade, depressão, síndrome do pânico.</li>
            <li>Desenvolvimento de habilidades sociais</li>
            <li>Alterações bruscas de humor</li>
            <li>Dificuldades em lidar com separação e/ou relacionamentos.</li>
            <li>Tomada de decisão.</li>
            <li>Medos (de animais, avião, pessoas e situações diversas).</li>
            <li>Superar a timidez.</li>
            <li>Ciúmes excessivo.</li>
            <li>Dificuldade em lidar com pessoas difíceis como chefes, pais, irmãos, colegas de trabalho ou escola.</li>
            <li>Pensamentos repetitivos e angustiantes.</li>
            <li>Distração excessiva a ponto de perder aulas, não encontrar seus objetos, perder compromissos.</li>
            <li>Baixa autoestima</li>
          </ul>
        </>
      ),
    },
    {
      question: "Quais os benefícios da psicoterapia?",
      answer: (
        <>
          <ul className="list-disc list-inside space-y-1">
            <li>Autoconhecimento dos seus limites pessoais, inseguranças, desejos e seus conflitos.</li>
            <li>Aprender a regular as emoções ao nomear e validar seus sentimentos.</li>
            <li>Aumento das habilidades sociais ao posicionar-se socialmente de maneira assertiva, sobre seus sentimentos.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">dúvidas</p>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Link href="#contact">
              <Button size="lg">AGENDAR SESSÃO</Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto lg:mx-0">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;