import { localizePath, ORIGIN, siteContent } from "./pages";
import type { SeoPage, SeoProjectPreview } from "./pages";

export const escapeHtml = (value: unknown): string =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );
const safeJson = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export const renderHead = (page: SeoPage): string => {
  const escape = escapeHtml;
  return `<title>${escape(page.title)}</title>
<meta name="description" content="${escape(page.description)}" />
<meta name="robots" content="${page.kind === "not-found" ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
<link rel="canonical" href="${escape(page.canonical)}" />
${
  page.kind === "not-found"
    ? ""
    : `<link rel="alternate" hreflang="pt-BR" href="${escape(page.alternates.pt)}" />
<link rel="alternate" hreflang="en" href="${escape(page.alternates.en)}" />
<link rel="alternate" hreflang="x-default" href="${escape(page.alternates.pt)}" />`
}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="David Budeli" />
<meta property="og:title" content="${escape(page.title)}" />
<meta property="og:description" content="${escape(page.description)}" />
<meta property="og:url" content="${escape(page.canonical)}" />
<meta property="og:locale" content="${page.locale === "pt" ? "pt_BR" : "en_US"}" />
<meta property="og:locale:alternate" content="${page.locale === "pt" ? "en_US" : "pt_BR"}" />
<meta property="og:image" content="${escape(page.image)}" />
<meta property="og:image:alt" content="${escape(page.kind === "project" ? page.project!.title : "David Budeli — Software Engineer")}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(page.title)}" />
<meta name="twitter:description" content="${escape(page.description)}" />
<meta name="twitter:image" content="${escape(page.image)}" />
<meta name="twitter:image:alt" content="${escape(page.kind === "project" ? page.project!.title : "David Budeli — Software Engineer")}" />
<script type="application/ld+json" id="page-schema">${safeJson(page.schema)}</script>`;
};

const externalLink = (href: string, text: string) =>
  `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
const contacts = () => `<ul class="readable-contact-links">
<li>${externalLink("https://wa.me/5541999360874?text=Ol%C3%A1%2C%20David!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.", "WhatsApp")}</li>
<li><a href="mailto:consultoria@davidbudeli.com">consultoria@davidbudeli.com</a></li>
<li>${externalLink("https://github.com/DavidBudeli", "GitHub")}</li>
<li>${externalLink("https://www.instagram.com/davidbudeli/", "Instagram")}</li>
<li>${externalLink("https://www.linkedin.com/in/davidbudeli/", "LinkedIn")}</li>
</ul>`;

const projectCard = (project: SeoProjectPreview, page: SeoPage) => `<article class="readable-project-card">
<a href="${escapeHtml(localizePath(`/project/${project.slug}`, page.locale))}"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async" /><h3>${escapeHtml(project.title)}</h3></a>
<p class="readable-eyebrow">${escapeHtml(project.category)}</p><p>${escapeHtml(project.description)}</p>
</article>`;

export const renderFallback = (page: SeoPage): string => {
  const content = siteContent[page.locale];
  const label = content.labels;
  const escape = escapeHtml;
  const home = localizePath("/", page.locale);
  const alternatePath = localizePath(page.path, page.locale === "pt" ? "en" : "pt");
  const nav = `<nav aria-label="${page.locale === "pt" ? "Navegação principal" : "Main navigation"}"><a href="${home}">DB — David Budeli</a><a href="${home}#about">${label.about}</a><a href="${home}#projects">${label.projects}</a><a href="${home}#contact">${label.contact}</a><a href="${escape(alternatePath)}" lang="${page.locale === "pt" ? "en" : "pt-BR"}" hreflang="${page.locale === "pt" ? "en" : "pt-BR"}">${page.locale === "pt" ? "English" : "Português"}</a></nav>`;
  const footer = `<footer><p>© ${new Date().getUTCFullYear()} David Budeli · ${label.builtBy} ${externalLink("https://hyperag.com.br", "HyperAG")}</p><a href="/licencas.html">${label.licenses}</a></footer>`;

  if (page.kind === "not-found")
    return `<main id="main-content" class="readable-shell" data-page-kind="not-found">${nav}<header><h1>${label.notFound}</h1><p>${escape(page.description)}</p><a href="${home}">${label.back}</a></header>${footer}</main>`;

  if (page.kind === "project") {
    const project = page.projects.find((entry) => entry.slug === page.slug)!;
    return `<main id="main-content" class="readable-shell" data-page-kind="project">${nav}
<header><p class="readable-eyebrow">${escape(project.category)}</p><h1>${escape(project.title)}</h1><p>${escape(project.description)}</p><div class="readable-actions"></div></header>
<figure class="readable-project-image"><img src="${escape(project.image)}" alt="${escape(project.imageAlt)}" width="${project.width}" height="${project.height}" fetchpriority="high" decoding="async" /><figcaption>${escape(project.category)}</figcaption></figure>
${project.scope.length ? `<section aria-labelledby="project-scope"><h2 id="project-scope">${label.scope}</h2><ul>${project.scope.map((item) => `<li>${escape(item)}</li>`).join("")}</ul></section>` : ""}
${project.live ? `<p>${externalLink(project.live, label.live)}</p>` : ""}
<section aria-labelledby="project-author"><h2 id="project-author">David Budeli</h2><p>${escape(content.intro)}</p><a href="${home}">${label.back}</a></section>
<section id="contact" aria-labelledby="contact-heading"><h2 id="contact-heading">${label.contact}</h2>${contacts()}</section>
${footer}</main>`;
  }

  return `<main id="main-content" class="readable-shell" data-page-kind="home">${nav}
<header><p class="readable-eyebrow">Software Engineer · IA · ${page.locale === "pt" ? "Automação" : "Automation"}</p><h1>${content.heading}</h1><p>${escape(content.intro)}</p><div class="readable-actions"></div></header>
<section id="about" aria-labelledby="profile-heading"><h2 id="profile-heading">${label.about}</h2><p>${escape(content.identityText)}</p><dl><dt>${label.name}</dt><dd>${escape(content.identity.fullName)}</dd><dt>${label.role}</dt><dd>${escape(content.identity.role)}</dd><dt>${label.company}</dt><dd>${externalLink("https://hypergalaxy.cloud/", content.identity.company)}</dd><dt>${label.location}</dt><dd>${escape(content.identity.location)}</dd></dl></section>
<section aria-labelledby="solutions-heading"><h2 id="solutions-heading">${label.services}</h2><ul>${content.services.map((service) => `<li>${escape(service)}</li>`).join("")}</ul></section>
<section aria-labelledby="technology-heading"><h2 id="technology-heading">${label.technologies}</h2><p>${escape(content.technologyIntro)}</p></section>
<section id="projects" aria-labelledby="portfolio-heading"><h2 id="portfolio-heading">${label.projects}</h2><div class="readable-project-grid">${page.projects.map((project) => projectCard(project, page)).join("")}</div></section>
<section aria-labelledby="faq-heading"><h2 id="faq-heading">${label.faq}</h2>${content.faq.map((item) => `<details><summary>${escape(item.question)}</summary><p>${escape(item.answer)}</p></details>`).join("")}</section>
<section id="contact" aria-labelledby="contact-heading"><h2 id="contact-heading">${label.contact}</h2>${contacts()}</section>${footer}</main>`;
};

export const fallbackCss = `
html{background:#05090a}body{margin:0}
.readable-shell{position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:24px clamp(20px,5vw,64px) 40px;color:#f3fbfb;background:#05090a;font:400 17px/1.7 system-ui,sans-serif;letter-spacing:normal}
.readable-shell a{color:#5eead4;text-decoration:underline;text-underline-offset:4px;overflow-wrap:anywhere}
.readable-shell a:focus-visible,.readable-shell summary:focus-visible,.readable-shell button:focus-visible{outline:2px solid #5eead4;outline-offset:6px}
.readable-shell nav{display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px;font-size:14px;margin-bottom:60px}
.readable-shell header{margin-bottom:52px}.readable-shell h1{font-size:clamp(36px,7vw,76px);line-height:1.08;letter-spacing:-.04em;margin:12px 0 24px;font-weight:800}
.readable-shell h2{font-size:clamp(24px,4vw,34px);line-height:1.2;margin:0 0 20px}.readable-shell h3{font-size:22px;line-height:1.25;margin:16px 0 10px}
.readable-shell p{margin:12px 0;max-width:76ch}.readable-shell section{margin:52px 0}.readable-shell ul{list-style:disc;padding-left:22px}.readable-shell li{margin:8px 0}
.readable-shell dl{display:grid;grid-template-columns:minmax(110px,auto) 1fr;gap:10px 24px;margin-top:24px}.readable-shell dt{color:#a8bbbe}.readable-shell dd{margin:0}
.readable-eyebrow{font-size:14px;color:#a8bbbe}.readable-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.readable-actions:empty{display:none}
.readable-shell button{cursor:pointer;border:1px solid #5eead4;border-radius:999px;background:#092025;color:#f3fbfb;padding:12px 22px;font:600 15px system-ui,sans-serif}
.readable-project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:32px}.readable-project-card{min-width:0}
.readable-shell img{display:block;max-width:100%;height:auto;border-radius:16px}.readable-project-card img{aspect-ratio:16/9;object-fit:cover;width:100%}.readable-project-card>a{display:block}
.readable-project-image{margin:0 0 40px}.readable-shell figcaption{font-size:14px;color:#a8bbbe;margin-top:8px}
.readable-shell details{border-top:1px solid #253438;padding:18px 0}.readable-shell summary{cursor:pointer;font-weight:600}.readable-shell details p{color:#c5d3d5}
.readable-shell .readable-contact-links{display:flex;flex-wrap:wrap;gap:8px 24px;list-style:none;padding:0}.readable-shell footer{border-top:1px solid #253438;padding-top:24px;font-size:14px;color:#a8bbbe}
@media(max-width:520px){.readable-shell dl{display:block}.readable-shell dd{margin-bottom:14px}.readable-shell nav{margin-bottom:36px}}
`;

export const siteOrigin = ORIGIN;
