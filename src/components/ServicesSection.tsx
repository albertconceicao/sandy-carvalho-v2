import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ServicesSection = () => {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Serviços Ofertados
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
            Conheça as modalidades de atendimento e serviços disponíveis para o seu bem-estar.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Psicoterapia Individual Card */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Psicoterapia Individual</CardTitle>
              <CardDescription className="text-lg text-primary">Adolescente e adultos</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">
                A psicoterapia é um processo de autoconhecimento, crescimento e desenvolvimento pessoal, possibilitando a criação de hábitos saudáveis, aumentando a auto confiança, aprendendo a impor limites e desenvolvendo a inteligência emocional. Te ajuda a lidar com situações para além de transtornos mentais.
              </p>
              <Link href="#contact" className="mt-auto">
                <Button className="w-full">AGENDAR SESSÃO</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Palestras Card */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Palestras</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">
                As palestras possuem temas personalizados, de acordo com as necessidades da empresa ou instituição. Os temas como ansiedade, depressão e inteligência emocional, prevenção e promoção de cuidados relacionados à saúde mental, programas educacionais, culturais, desenvolvimento de habilidades, e qualidade de vida são os mais comuns. O principal objetivo das palestras é gerar um impacto positivo no grupo, garantindo a conexão com temas de grande importância para a saúde mental.
              </p>
              <Link href="#contact" className="mt-auto">
                <Button className="w-full">ENTRAR EM CONTATO</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Psicoterapia Casal Card */}
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Psicoterapia Casal</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">
                O principal objetivo da terapia de casal é promover um espaço seguro de diálogo em que o casal possa expressar opiniões sobre situações que estão interferindo no relacionamento. A partir do olhar sistêmico observo as interações do casal, suas habilidades, padrões de comportamento, crenças familiares, e como lidam com os problemas. Com base nessas observações são sugeridas algumas intervenções que visam possibilitar a resolução de conflitos, treino de habilidades do casal, autoconhecimento e abrir um espaço de comunicação assertiva e não violenta, buscando um alinhamento entre as expectativas do casal. As sessões duram média de 1h (uma hora) à 1h30 (uma hora e trinta minutos) de acordo com a necessidade ou da atividade proposta em sessão.
              </p>
              <p className="text-muted-foreground font-semibold mb-4">
                A terapia de casal é indicada para casais que:
              </p>
              <ul className="text-muted-foreground list-disc list-inside mb-4">
                <li>Desejam aprender como lidar com brigas.</li>
                <li>Superar a infidelidade e cultivar confiança e respeito.</li>
                <li>Alinhar expectativas sexuais e financeiras.</li>
                <li>Como uma última alternativa antes da separação.</li>
                <li>E para os que, mesmo em um relacionamento próspero, querem inovar e prevenir problemas futuros.</li>
              </ul>
              <Link href="#contact" className="mt-auto">
                <Button className="w-full">AGENDAR SESSÃO</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;