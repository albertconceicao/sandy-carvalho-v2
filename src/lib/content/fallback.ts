import type { SiteContent } from "./types";

export const fallbackContent: SiteContent = {
  global: {
    siteName: "Sandy Carvalho",
    siteSubtitle: "Psicóloga Clínica/CRP",
    navLinks: [
      { name: "Sobre mim", href: "#about" },
      { name: "Abordagem", href: "#approach" },
      { name: "Modalidade", href: "#modality" },
      { name: "Serviços", href: "#services" },
      { name: "Dúvidas frequentes", href: "#faq" },
      { name: "Depoimentos", href: "#testimonials" },
      { name: "Contato", href: "#contact" },
    ],
    instagram: "@psandycarvalhopsi",
    email: "contato@sandycarvalho.com.br",
    contactTitle: "Entre em contato",
    contactSubtitle: "Sua mensagem será respondida em breve!",
    footerWarning:
      "Atenção: Este site não oferece atendimento imediato a pessoas em crise suicida.",
    footerCvv: "Em caso de crise ligue para o CVV – 188",
    footerEmergency:
      "Em caso de emergência, procure o hospital mais próximo. Havendo risco de morte, ligue imediatamente para o SAMU (telefone 192).",
  },
  hero: {
    title: "Psicoterapia Sistêmica",
    subtitle: "Tome conhecimento do seu próprio padrão de funcionamento",
    primaryCta: "Agende sua consulta",
    secondaryCta: "Serviços",
    image: {
      src: "/hero-person.jpg",
      alt: "Pessoa em sessão de psicoterapia online",
    },
  },
  about: {
    title: "Um pouco sobre mim",
    paragraphs: [
      "Olá! Seja bem vinda (o)! Eu sou a Sandy, me formei psicóloga pela Universidade Salvador. Tenho 26 anos. Minha atuação clínica é sempre orientada pela terapia familiar sistêmica.",
      "Ainda durante a formação, me dediquei à área de Recursos Humanos, atuando com recrutamento e seleção. Atualmente, dedico-me totalmente ao atendimento clínico individual para adolescentes, adultos, casais e famílias. Iniciei minha trajetória na clínica com atendimentos presenciais ainda na graduação com estágios em clínicas e na clínica escola da universidade, o que inesperadamente fez eu me apaixonar por me conectar com pessoas/histórias. Já a paixão pela sistêmica começou bem antes, ainda no 5º semestre com as aulas de uma de minhas professoras favoritas da universidade.",
      "Além da psicologia, ler livros de romance, maratonar séries, ir ao cinema, visitar museus e viajar estão entre meus programas favoritos, sem dúvidas as histórias movem a minha vida, não importa em quais formatos elas estejam apresentadas.",
      "Quando me sinto esgotada encontro na natureza, no mar, na observação do céu, no artesanato e na costura a minha conexão comigo, com a minha história e meus antepassados e recarrego minhas energias novamente.",
      "Meu propósito é ajudar meus clientes a melhor lidar com seus medos, angústias, desafios da vida e buscando trazer mais qualidade de vida e bem-estar, possibilitando a tomada de conhecimento do seu próprio padrão de funcionamento.",
      "Vamos Nessa jornada comigo?",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Sandy Carvalho, psicóloga clínica",
    },
  },
  approach: {
    title: "Abordagem: Terapia Relacional Sistêmica",
    paragraphs: [
      "A terapia Relacional Sistêmica parte do pressuposto de que o sujeito não pode ser compreendido sem conhecer os sistemas e ambientes em que está inserido.",
      "Neste viés, as sessões passeiam por seus relacionamentos amorosos, familiares e de amizade. Sendo essas relações exploradas conjuntamente nas sessões de psicoterapia, permitindo ao cliente identificar seu próprio padrão de funcionamento, a partir de reflexões pontuais, perguntas, atividades com objetivos predefinidos e outras propostas terapêuticas.",
      "A partir dessas técnicas, o cliente passa a desenvolver novas habilidades, nomear e validar seus sentimentos e emoções, e por consequência passa a lidar de forma mais saudável com seus conflitos internos e externos.",
    ],
    image: {
      src: "/person-with-a-book.jpg",
      alt: "Pessoa lendo um livro",
    },
  },
  modality: {
    title: "Modalidade: Terapia Online",
    description:
      "A terapia online oferece flexibilidade e conforto, permitindo que você cuide da sua saúde mental de onde estiver.",
    requirementsTitle: "O que é necessário?",
    requirements: [
      "Tenha um aparelho com boa conexão à internet;",
      "Procure sempre estar em um ambiente privado, onde você se sinta confortável para falar sobre o que precisar e sem interrupções;",
      "Recomendo também que, se possível, utilize fones de ouvido, e não fotografe ou faça gravações de áudio ou vídeo durante as sessões para que o sigilo durante o atendimento seja preservado;",
    ],
    advantagesTitle: "Quais as Vantagens?",
    advantages: [
      "Quebra de barreiras geográficas",
      "Flexibilidade e privacidade",
      "Economia de tempo com deslocamento",
    ],
    image: {
      src: "/video-call.jpg",
      alt: "Pessoa em videochamada de terapia online",
    },
  },
  services: {
    title: "Serviços Ofertados",
    description:
      "Conheça as modalidades de atendimento e serviços disponíveis para o seu bem-estar.",
    items: [
      {
        title: "Psicoterapia Individual",
        subtitle: "Adolescente e adultos",
        description:
          "A psicoterapia é um processo de autoconhecimento, crescimento e desenvolvimento pessoal, possibilitando a criação de hábitos saudáveis, aumentando a auto confiança, aprendendo a impor limites e desenvolvendo a inteligência emocional. Te ajuda a lidar com situações para além de transtornos mentais.",
        buttonLabel: "AGENDAR SESSÃO",
      },
      {
        title: "Palestras",
        description:
          "As palestras possuem temas personalizados, de acordo com as necessidades da empresa ou instituição. Os temas como ansiedade, depressão e inteligência emocional, prevenção e promoção de cuidados relacionados à saúde mental, programas educacionais, culturais, desenvolvimento de habilidades, e qualidade de vida são os mais comuns. O principal objetivo das palestras é gerar um impacto positivo no grupo, garantindo a conexão com temas de grande importância para a saúde mental.",
        buttonLabel: "ENTRAR EM CONTATO",
      },
      {
        title: "Psicoterapia Casal",
        description:
          "O principal objetivo da terapia de casal é promover um espaço seguro de diálogo em que o casal possa expressar opiniões sobre situações que estão interferindo no relacionamento. A partir do olhar sistêmico observo as interações do casal, suas habilidades, padrões de comportamento, crenças familiares, e como lidam com os problemas. Com base nessas observações são sugeridas algumas intervenções que visam possibilitar a resolução de conflitos, treino de habilidades do casal, autoconhecimento e abrir um espaço de comunicação assertiva e não violenta, buscando um alinhamento entre as expectativas do casal. As sessões duram média de 1h (uma hora) à 1h30 (uma hora e trinta minutos) de acordo com a necessidade ou da atividade proposta em sessão.",
        buttonLabel: "AGENDAR SESSÃO",
        details: {
          title: "Indicações para Terapia de Casal",
          description: "A terapia de casal é indicada para casais que:",
          items: [
            "Desejam aprender como lidar com brigas.",
            "Superar a infidelidade e cultivar confiança e respeito.",
            "Alinhar expectativas sexuais e financeiras.",
            "Como uma última alternativa antes da separação.",
            "E para os que, mesmo em um relacionamento próspero, querem inovar e prevenir problemas futuros.",
          ],
        },
      },
    ],
  },
  faq: {
    eyebrow: "dúvidas",
    title: "Perguntas Frequentes",
    ctaLabel: "AGENDAR SESSÃO",
    items: [
      {
        question: "Quanto tempo dura uma sessão?",
        answer:
          "Até 50 minutos para atendimentos individuais e até 1h30 para terapias de casal e família.",
      },
      {
        question: "Quando vou receber alta?",
        answer:
          "O objetivo da psicoterapia é tornar o cliente independente do terapeuta. O processo terapêutico não tem um tempo predeterminado, a duração é particular para cada cliente.",
      },
      {
        question: "Como funciona a primeira sessão?",
        answer:
          "O principal objetivo da primeira sessão é coletar informações do cliente, demandas, e motivo da busca pela terapia. As normas e regras, frequência, horários e política de faltas são apresentadas e fica aberto um espaço para tirar dúvidas, dando início ainda nesta sessão a aliança terapêutica.",
      },
      {
        question: "Como funciona o sigilo?",
        answer:
          "Eu tenho o dever ético de resguardar todo o conteúdo trabalhado nas nossas sessões – até minhas anotações!",
      },
      {
        question: "Qual o valor da sessão?",
        answer:
          "O Conselho Federal de Psicologia, estabeleceu regras para a divulgação do valor de terapia, que visam garantir a ética e a transparência nas práticas de psicólogos. Entre em contato comigo para consultar os valores.",
      },
      {
        question: "Aceito convênio?",
        answer: "Realizo atendimentos apenas particulares. Mas forneço recibo para reembolso do convênio.",
      },
      {
        question: "Qual a frequência das sessões?",
        answer:
          "As sessões tem recorrência semanal. A decisão sobre o espaçamento ou aumento das sessões é geralmente tomada em conjunto entre o paciente e a psicóloga, baseado no desenvolvimento do processo terapêutico.",
      },
      {
        question: "Psicólogo ou psiquiatra?",
        answer:
          "São complementares. O psiquiatra tem foco em sintomas físicos, enquanto a psicoterapia auxilia o cliente em aspectos emocionais.",
      },
      {
        question: "Como Saber Se Preciso De Psicoterapia?",
        answer:
          "Desde o diagnóstico de transtornos mentais, sofrimento emocional intenso e/ou dificuldade de executar tarefas rotineiras, até o autoconhecimento.",
        listItems: [
          "Casos clínicos clássicos como ansiedade, depressão, síndrome do pânico.",
          "Desenvolvimento de habilidades sociais",
          "Alterações bruscas de humor",
          "Dificuldades em lidar com separação e/ou relacionamentos.",
          "Tomada de decisão.",
          "Medos (de animais, avião, pessoas e situações diversas).",
          "Superar a timidez.",
          "Ciúmes excessivo.",
          "Dificuldade em lidar com pessoas difíceis como chefes, pais, irmãos, colegas de trabalho ou escola.",
          "Pensamentos repetitivos e angustiantes.",
          "Distração excessiva a ponto de perder aulas, não encontrar seus objetos, perder compromissos.",
          "Baixa autoestima",
        ],
      },
      {
        question: "Quais os benefícios da psicoterapia?",
        answer: "",
        listItems: [
          "Autoconhecimento dos seus limites pessoais, inseguranças, desejos e seus conflitos.",
          "Aprender a regular as emoções ao nomear e validar seus sentimentos.",
          "Aumento das habilidades sociais ao posicionar-se socialmente de maneira assertiva, sobre seus sentimentos.",
        ],
      },
    ],
  },
  testimonials: {
    title: "O que meus clientes falam de mim",
  },
};

export const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Mylena Pereira",
    date: "23/06/2023",
    rating: 5,
    text: "Não tenho palavras para descrever a gratidão que sinto. Comecei a fazer acompanhamento psicológico com Stefany num momento muito delicado da minha vida e ela foi essencial nesse processo.",
  },
  {
    id: "fallback-2",
    name: "Nicolle Castilho",
    date: "23/06/2023",
    rating: 5,
    text: "A Stefany é uma excelente profissional! Me senti acolhida e confortável desde a primeira sessão e sou muito grata tê-la como auxílio.",
  },
  {
    id: "fallback-3",
    name: "João Silva",
    date: "15/05/2023",
    rating: 4,
    text: "A terapia me ajudou a ver as coisas de uma nova perspectiva. Recomendo muito!",
  },
  {
    id: "fallback-4",
    name: "Ana Costa",
    date: "01/07/2023",
    rating: 5,
    text: "Profissionalismo e empatia definem o trabalho da Sandy. Me sinto muito melhor após as sessões.",
  },
];
