import type { ProjectContent } from "../types";

const makeProject = (content: ProjectContent) => content;

export const projectContentPt = {
  "hyper-galaxy": makeProject({
    title: "Hyper Galaxy",
    theme: "dark",
    tags: ["product", "ai", "automation", "analytics"],
    live: "https://hypergalaxy.cloud",
    description:
      "Um centro de comando que conecta produtos, métricas, automações e decisões em uma única camada estratégica.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyper-galaxy.png", alt: "Interface do Hyper Galaxy", caption: "Ecossistema operacional" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Arquitetura de produto e visão operacional", "Automação de fluxos e leitura de sinais", "Interface para decisões rápidas e visão integrada"], size: "md" } },
    ],
  }),
  hyperag: makeProject({
    title: "HyperAG",
    theme: "dark",
    tags: ["product", "ai", "design", "next"],
    live: "https://hyperag.com.br",
    description:
      "Estratégia, engenharia, inteligência artificial e design reunidos para transformar ideias em produtos digitais premium.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyperag.png", alt: "Site da HyperAG", caption: "Studio de produto" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Posicionamento e narrativa de marca", "Produtos e agentes de inteligência artificial", "Design system, engenharia e movimento"], size: "md" } },
    ],
  }),
  hyperpag: makeProject({
    title: "HyperPag",
    theme: "dark",
    tags: ["payments", "automation", "product", "analytics"],
    live: "https://hyperpag.com/",
    description:
      "Infraestrutura para pagamentos, cobrança inteligente, prevenção operacional a fraudes e automação financeira.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyperpag.png", alt: "Plataforma HyperPag", caption: "Fintech e orquestração" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Jornadas de pagamento e cobrança", "Integrações e orquestração de eventos", "Visibilidade operacional para risco e finanças"], size: "md" } },
    ],
  }),
  everpersonal: makeProject({
    title: "EverPersonal",
    theme: "dark",
    tags: ["product", "automation", "analytics", "conversion"],
    live: "https://everpersonal.com.br",
    description:
      "Interface, dados e automações combinados em uma jornada premium de acompanhamento, recorrência e retenção.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/everpersonal.png", alt: "Plataforma EverPersonal", caption: "Plataforma de relacionamento" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Experiência de acompanhamento e relacionamento", "Automação de jornadas e recorrência", "Organização de dados, comunicação e retenção"], size: "md" } },
    ],
  }),
  "daniela-moura-studio": makeProject({
    title: "Daniela Moura Studio",
    theme: "dark",
    tags: ["design", "conversion", "performance"],
    live: "https://danielamourastudio.com.br",
    description:
      "Presença digital sofisticada para elevar a percepção de valor, gerar confiança e converter novos atendimentos.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/daniela-moura-studio.png", alt: "Site Daniela Moura Studio", caption: "Experiência de marca" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Direção visual e experiência premium", "Conteúdo orientado a confiança e posicionamento", "Jornada de conversão para novos atendimentos"], size: "md" } },
    ],
  }),
  "gabriella-tsuruda": makeProject({
    title: "Gabriella Tsuruda",
    theme: "dark",
    tags: ["design", "conversion", "performance"],
    live: "https://gabriellatsuruda.com.br/",
    description:
      "Uma presença digital elegante para a Physis Therapeia, traduzindo escuta, cuidado e fisioterapia individualizada em uma experiência clara e acolhedora.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/gabriella-tsuruda.png", alt: "Site Gabriella Tsuruda — Physis Therapeia", caption: "Physis Therapeia" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Posicionamento de marca e direção visual", "Experiência responsiva com linguagem acolhedora", "Jornada de conversão para avaliações e atendimentos"], size: "md" } },
    ],
  }),
  "cristiano-ronaldo-blog": makeProject({
    title: "Cristiano Ronaldo Blog",
    theme: "dark",
    tags: ["seo", "performance", "analytics", "product"],
    live: "https://cristianoronaldo.blog",
    description:
      "Arquitetura editorial otimizada para conteúdo, busca, leitura rápida e crescimento contínuo de audiência.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/cristiano-ronaldo-blog.png", alt: "Cristiano Ronaldo Blog", caption: "Mídia de alta performance" } },
      { type: "list", props: { title: "Frentes do projeto", items: ["Estrutura editorial preparada para escala", "SEO técnico e performance de carregamento", "Leitura rápida e organização de conteúdo"], size: "md" } },
    ],
  }),
} as const;

export const projectContentEn = {
  "hyper-galaxy": makeProject({
    title: "Hyper Galaxy",
    theme: "dark",
    tags: ["product", "ai", "automation", "analytics"],
    live: "https://hypergalaxy.cloud",
    description: "A command center connecting products, metrics, automations, and decisions in one strategic layer.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyper-galaxy.png", alt: "Hyper Galaxy interface", caption: "Operational ecosystem" } },
      { type: "list", props: { title: "Project scope", items: ["Product architecture and operational vision", "Workflow automation and signal monitoring", "An interface for fast, integrated decision-making"], size: "md" } },
    ],
  }),
  hyperag: makeProject({
    title: "HyperAG",
    theme: "dark",
    tags: ["product", "ai", "design", "next"],
    live: "https://hyperag.com.br",
    description: "Strategy, engineering, artificial intelligence, and design transformed into premium digital products.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyperag.png", alt: "HyperAG website", caption: "Product studio" } },
      { type: "list", props: { title: "Project scope", items: ["Brand positioning and narrative", "AI products and agents", "Design systems, engineering, and motion"], size: "md" } },
    ],
  }),
  hyperpag: makeProject({
    title: "HyperPag",
    theme: "dark",
    tags: ["payments", "automation", "product", "analytics"],
    live: "https://hyperpag.com/",
    description: "Infrastructure for payments, smart billing, operational fraud prevention, and financial automation.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/hyperpag.png", alt: "HyperPag platform", caption: "Fintech and orchestration" } },
      { type: "list", props: { title: "Project scope", items: ["Payment and billing journeys", "Event integrations and orchestration", "Operational visibility for risk and finance"], size: "md" } },
    ],
  }),
  everpersonal: makeProject({
    title: "EverPersonal",
    theme: "dark",
    tags: ["product", "automation", "analytics", "conversion"],
    live: "https://everpersonal.com.br",
    description: "Interface, data, and automation combined into a premium journey for follow-up, recurring engagement, and retention.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/everpersonal.png", alt: "EverPersonal platform", caption: "Relationship platform" } },
      { type: "list", props: { title: "Project scope", items: ["Follow-up and relationship experience", "Automated recurring journeys", "Data, communication, and retention structure"], size: "md" } },
    ],
  }),
  "daniela-moura-studio": makeProject({
    title: "Daniela Moura Studio",
    theme: "dark",
    tags: ["design", "conversion", "performance"],
    live: "https://danielamourastudio.com.br",
    description: "A sophisticated digital presence designed to raise perceived value, build trust, and convert new appointments.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/daniela-moura-studio.png", alt: "Daniela Moura Studio website", caption: "Brand experience" } },
      { type: "list", props: { title: "Project scope", items: ["Visual direction and premium experience", "Trust-led content and positioning", "Conversion journey for new appointments"], size: "md" } },
    ],
  }),
  "gabriella-tsuruda": makeProject({
    title: "Gabriella Tsuruda",
    theme: "dark",
    tags: ["design", "conversion", "performance"],
    live: "https://gabriellatsuruda.com.br/",
    description: "An elegant digital presence for Physis Therapeia, translating attentive care and personalized physiotherapy into a clear, welcoming experience.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/gabriella-tsuruda.png", alt: "Gabriella Tsuruda — Physis Therapeia website", caption: "Physis Therapeia" } },
      { type: "list", props: { title: "Project scope", items: ["Brand positioning and visual direction", "Responsive experience with a welcoming voice", "Conversion journey for assessments and appointments"], size: "md" } },
    ],
  }),
  "cristiano-ronaldo-blog": makeProject({
    title: "Cristiano Ronaldo Blog",
    theme: "dark",
    tags: ["seo", "performance", "analytics", "product"],
    live: "https://cristianoronaldo.blog",
    description: "Editorial architecture optimized for content, search, fast reading, and continuous audience growth.",
    components: [
      { type: "media", props: { type: "image", src: "/cases/cristiano-ronaldo-blog.png", alt: "Cristiano Ronaldo Blog", caption: "High-performance media" } },
      { type: "list", props: { title: "Project scope", items: ["Scalable editorial structure", "Technical SEO and loading performance", "Fast reading and content organization"], size: "md" } },
    ],
  }),
} as const;
