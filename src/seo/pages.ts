import { projectContentEn, projectContentPt } from "../content/projects/data";
import type { ProjectContent } from "../content/types";

export const ORIGIN = "https://davidbudeli.com";
export type SeoLocale = "pt" | "en";

export const siteContent = {
  pt: {
    heading: "David Budeli",
    intro:
      "David Budeli é engenheiro de software com atuação em inteligência artificial, automação e cibersegurança. Desenvolve softwares personalizados, plataformas SaaS e sistemas web para empresas.",
    identity: {
      name: "David Budeli",
      fullName: "Alisson David da Silva",
      role: "Software Engineer",
      company: "Hyper Galaxy",
      location: "Curitiba, Paraná, Brasil",
    },
    identityText:
      "David Budeli é o nome profissional de Alisson David da Silva. Sua atuação está ligada à Hyper Galaxy, com base profissional em Curitiba, Paraná, Brasil.",
    technologies: ["Vue 3", "TypeScript", "Vite", "Three.js", "WebGL", "GSAP", "Lenis", "Howler"],
    technologyIntro:
      "Este portfólio utiliza Vue 3, TypeScript, Vite, Three.js, WebGL, GSAP, Lenis e Howler. As tecnologias de cada solução são definidas conforme seus requisitos.",
    services: [
      "Desenvolvimento de software personalizado",
      "Plataformas SaaS sob medida",
      "Sistemas de inteligência artificial",
      "Automação de processos empresariais",
      "Sites e sistemas web",
      "Engenharia de software e cibersegurança",
    ],
    faq: [
      {
        question: "O que David Budeli desenvolve?",
        answer:
          "Softwares personalizados, plataformas SaaS, sistemas web e soluções de inteligência artificial e automação, de acordo com a necessidade de cada projeto.",
      },
      {
        question: "Como contratar o desenvolvimento de um software personalizado?",
        answer:
          "Entre em contato pelo WhatsApp ou pelo e-mail consultoria@davidbudeli.com. Apresente o problema, os processos envolvidos e o objetivo do projeto para iniciar a avaliação de escopo.",
      },
      {
        question: "É possível criar uma plataforma SaaS sob medida?",
        answer:
          "Sim. A proposta é avaliar o público, as funcionalidades, as integrações e os requisitos de segurança para definir uma plataforma adequada ao modelo de negócio.",
      },
      {
        question: "Como a inteligência artificial pode automatizar processos empresariais?",
        answer:
          "A IA pode apoiar atendimento, organização de informações e execução de tarefas repetitivas. A viabilidade depende dos dados, das integrações e dos controles de revisão e segurança necessários.",
      },
      {
        question: "Como solicitar uma consultoria de tecnologia?",
        answer:
          "Envie uma mensagem com o contexto do seu negócio, o desafio técnico e o resultado esperado. A conversa inicial ajuda a definir os próximos passos.",
      },
      {
        question: "Onde David Budeli atua?",
        answer:
          "Sua base profissional fica em Curitiba, Paraná, Brasil. Consulte diretamente a disponibilidade e o formato de atendimento para o seu projeto.",
      },
    ],
    labels: {
      home: "Início",
      about: "Sobre",
      services: "Soluções",
      projects: "Projetos",
      technologies: "Tecnologias",
      faq: "Perguntas frequentes",
      contact: "Contato",
      live: "Visitar site do projeto",
      scope: "Frentes do projeto",
      back: "Voltar ao portfólio",
      licenses: "Licenças",
      builtBy: "Desenvolvido por",
      notFound: "Página não encontrada",
      notFoundDescription:
        "Esta página não existe ou foi movida. Volte ao portfólio para conhecer David Budeli e seus projetos.",
      name: "Nome completo",
      role: "Profissão",
      company: "Atuação",
      location: "Base profissional",
    },
  },
  en: {
    heading: "David Budeli",
    intro:
      "David Budeli is a software engineer working with artificial intelligence, automation, and cybersecurity. He develops custom software, SaaS platforms, and web systems for businesses.",
    identity: {
      name: "David Budeli",
      fullName: "Alisson David da Silva",
      role: "Software Engineer",
      company: "Hyper Galaxy",
      location: "Curitiba, Paraná, Brazil",
    },
    identityText:
      "David Budeli is the professional name of Alisson David da Silva. His work is associated with Hyper Galaxy, with a professional base in Curitiba, Paraná, Brazil.",
    technologies: ["Vue 3", "TypeScript", "Vite", "Three.js", "WebGL", "GSAP", "Lenis", "Howler"],
    technologyIntro:
      "This portfolio uses Vue 3, TypeScript, Vite, Three.js, WebGL, GSAP, Lenis, and Howler. Technologies for each solution are chosen according to its requirements.",
    services: [
      "Custom software development",
      "Tailored SaaS platforms",
      "Artificial intelligence systems",
      "Business process automation",
      "Websites and web systems",
      "Software engineering and cybersecurity",
    ],
    faq: [
      {
        question: "What does David Budeli develop?",
        answer:
          "Custom software, SaaS platforms, web systems, and artificial intelligence and automation solutions tailored to each project's requirements.",
      },
      {
        question: "How can I commission custom software?",
        answer:
          "Contact David via WhatsApp or consultoria@davidbudeli.com. Describe the problem, the processes involved, and the project goal to begin a scope assessment.",
      },
      {
        question: "Can a tailored SaaS platform be developed?",
        answer:
          "Yes. The proposal is to assess the audience, features, integrations, and security requirements to define a platform suited to the business model.",
      },
      {
        question: "How can artificial intelligence automate business processes?",
        answer:
          "AI can support customer service, information organization, and repetitive tasks. Feasibility depends on the data, integrations, and necessary review and security controls.",
      },
      {
        question: "How can I request technology consulting?",
        answer:
          "Send a message with your business context, technical challenge, and desired outcome. The initial conversation helps define the next steps.",
      },
      {
        question: "Where does David Budeli work?",
        answer:
          "His professional base is Curitiba, Paraná, Brazil. Contact him directly to discuss availability and the delivery format for your project.",
      },
    ],
    labels: {
      home: "Home",
      about: "About",
      services: "Solutions",
      projects: "Projects",
      technologies: "Technologies",
      faq: "Frequently asked questions",
      contact: "Contact",
      live: "Visit project website",
      scope: "Project scope",
      back: "Back to portfolio",
      licenses: "Licenses",
      builtBy: "Developed by",
      notFound: "Page not found",
      notFoundDescription:
        "This page does not exist or has moved. Return to the portfolio to learn about David Budeli and his projects.",
      name: "Full name",
      role: "Profession",
      company: "Work",
      location: "Professional base",
    },
  },
} as const;

const contentByLocale: Record<SeoLocale, Record<string, ProjectContent>> = {
  pt: projectContentPt,
  en: projectContentEn,
};
const dimensions: Record<string, [number, number]> = { hyperpag: [1425, 1100], "gabriella-tsuruda": [1265, 712] };
const categories: Record<SeoLocale, Record<string, string>> = {
  pt: {
    "hyper-galaxy": "Ecossistema operacional",
    hyperag: "Estúdio de produto com IA",
    hyperpag: "Pagamentos e orquestração",
    everpersonal: "Presença digital e acompanhamento",
    "daniela-moura-studio": "Experiência de marca",
    "gabriella-tsuruda": "Physis Therapeia",
    "cristiano-ronaldo-blog": "Projeto editorial",
  },
  en: {
    "hyper-galaxy": "Operational ecosystem",
    hyperag: "AI product studio",
    hyperpag: "Payments and orchestration",
    everpersonal: "Digital presence and follow-up",
    "daniela-moura-studio": "Brand experience",
    "gabriella-tsuruda": "Physis Therapeia",
    "cristiano-ronaldo-blog": "Editorial project",
  },
};

export interface SeoProjectPreview {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  live?: string;
  scope: string[];
}

export interface SeoPage {
  path: string;
  locale: SeoLocale;
  kind: "home" | "project" | "not-found";
  slug?: string;
  title: string;
  description: string;
  canonical: string;
  image: string;
  alternates: { pt: string; en: string };
  schema: Record<string, unknown>;
  project?: ProjectContent;
  projects: SeoProjectPreview[];
}

export const localeFromPath = (path: string): SeoLocale =>
  /^\/en(?:\/|$)/.test(path.split(/[?#]/)[0] ?? "/") ? "en" : "pt";

export const stripLocale = (path: string): string => {
  const pathname = path.split(/[?#]/)[0] || "/";
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return stripped === "/" ? "/" : stripped.replace(/\/+$/, "");
};

export const localizePath = (path: string, locale: SeoLocale): string => {
  const stripped = stripLocale(path);
  return locale === "en" ? (stripped === "/" ? "/en/" : `/en${stripped}`) : stripped;
};

const plainText = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const getProjects = (locale: SeoLocale): SeoProjectPreview[] =>
  Object.entries(contentByLocale[locale]).map(([slug, project]) => {
    const media = project.components?.find((component) => component.type === "media");
    const image =
      media?.type === "media" && typeof media.props.src === "string" ? media.props.src : `/cases/${slug}.png`;
    const imageAlt = media?.type === "media" ? media.props.alt || project.title : project.title;
    const scope =
      project.components?.flatMap((component) => (component.type === "list" ? component.props.items : [])) ?? [];
    const [width, height] = dimensions[slug] ?? [1440, 1000];
    return {
      slug,
      title: project.title,
      description: plainText(project.description ?? ""),
      category: categories[locale][slug] ?? project.title,
      image,
      imageAlt,
      width,
      height,
      live: project.live,
      scope,
    };
  });

export const getPage = (requestedPath: string): SeoPage => {
  const locale = localeFromPath(requestedPath);
  const basePath = stripLocale(requestedPath);
  const match = /^\/project\/([a-z0-9-]+)$/.exec(basePath);
  const slug = match?.[1];
  const project = slug ? contentByLocale[locale][slug] : undefined;
  const kind = basePath === "/" ? "home" : project ? "project" : "not-found";
  const path = localizePath(basePath, locale);
  const canonical = `${ORIGIN}${path}`;
  const labels = siteContent[locale].labels;
  const projectDescription = plainText(project?.description ?? "");
  const title =
    kind === "home"
      ? locale === "pt"
        ? "David Budeli | Engenharia de Software, IA e Automação"
        : "David Budeli | Software Engineering, AI & Automation"
      : kind === "project"
        ? locale === "pt"
          ? `${project!.title} | Projeto de David Budeli`
          : `${project!.title} | David Budeli Case Study`
        : `${labels.notFound} | David Budeli`;
  const description =
    kind === "home"
      ? locale === "pt"
        ? "David Budeli desenvolve softwares personalizados, plataformas SaaS, sistemas de inteligência artificial e automações para empresas. Conheça seus projetos e soluções digitais."
        : "David Budeli develops custom software, SaaS platforms, artificial intelligence systems, and business automation. Explore his projects and digital solutions."
      : kind === "project"
        ? projectDescription
        : labels.notFoundDescription;
  const projects = getProjects(locale);
  const preview = projects.find((entry) => entry.slug === slug);
  const image = `${ORIGIN}${preview?.image ?? "/meta/og-image.webp"}`;
  const personId = `${ORIGIN}/#person`;
  const organizationId = `${ORIGIN}/#hyper-galaxy`;
  const websiteId = `${ORIGIN}/#website`;
  const pageId = `${canonical}#webpage`;
  const workId = `${canonical}#work`;
  const person = {
    "@type": "Person",
    "@id": personId,
    name: "David Budeli",
    alternateName: "Alisson David da Silva",
    jobTitle: "Software Engineer",
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/david-budeli-profile-2026.webp`,
    description: siteContent[locale].intro,
    knowsAbout: ["Software engineering", "Artificial intelligence", "Automation", "Cybersecurity"],
    worksFor: { "@id": organizationId },
    address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "Paraná", addressCountry: "BR" },
    sameAs: [
      "https://github.com/DavidBudeli",
      "https://www.instagram.com/davidbudeli/",
      "https://www.linkedin.com/in/davidbudeli/",
    ],
  };
  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: "Hyper Galaxy",
    url: "https://hypergalaxy.cloud/",
  };
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: "David Budeli",
    url: `${ORIGIN}/`,
    publisher: { "@id": personId },
    inLanguage: ["pt-BR", "en"],
  };
  const webPage = {
    "@type": "WebPage",
    "@id": pageId,
    url: canonical,
    name: title,
    description,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": kind === "project" ? workId : personId },
  };
  const graph: Record<string, unknown>[] = [person, organization, website, webPage];
  if (kind === "project") {
    graph.push({
      "@type": "CreativeWork",
      "@id": workId,
      url: canonical,
      name: project!.title,
      description: projectDescription,
      image,
      creator: { "@id": personId },
      inLanguage: locale === "pt" ? "pt-BR" : "en",
      mainEntityOfPage: { "@id": pageId },
      ...(project!.live ? { sameAs: project!.live } : {}),
    });
  }
  return {
    path,
    locale,
    kind,
    ...(slug ? { slug } : {}),
    title,
    description,
    canonical,
    image,
    alternates: { pt: `${ORIGIN}${localizePath(basePath, "pt")}`, en: `${ORIGIN}${localizePath(basePath, "en")}` },
    schema: { "@context": "https://schema.org", "@graph": graph },
    project,
    projects,
  };
};

export const listPages = (): SeoPage[] =>
  (["pt", "en"] as const).flatMap((locale) => [
    getPage(localizePath("/", locale)),
    ...Object.keys(contentByLocale[locale]).map((slug) => getPage(localizePath(`/project/${slug}`, locale))),
  ]);
