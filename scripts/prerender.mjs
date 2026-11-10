import { createServer } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve("dist");
const baseHtml = await readFile(resolve(root, "index.html"), "utf8");
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, entries: [], include: [] },
});

const replaceMarker = (html, name, replacement) => {
  const start = `<!--${name}-start-->`;
  const end = `<!--${name}-end-->`;
  const startIndex = html.indexOf(start);
  const endIndex = html.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) throw new Error(`Missing prerender markers: ${name}`);
  return `${html.slice(0, startIndex + start.length)}\n${replacement}\n${html.slice(endIndex)}`;
};

try {
  const { listPages, getPage, ORIGIN, siteContent } = await vite.ssrLoadModule("/src/seo/pages.ts");
  const { renderHead, renderFallback, fallbackCss, escapeHtml } = await vite.ssrLoadModule("/src/seo/render.ts");
  const pages = listPages();

  const render = (page) => {
    let html = baseHtml.replace(/<html\s+lang="[^"]*"/, `<html lang="${page.locale === "pt" ? "pt-BR" : "en"}"`);
    html = replaceMarker(html, "seo-head", renderHead(page));
    html = replaceMarker(html, "seo-style", `<style id="readable-fallback-style">${fallbackCss}</style>`);
    html = replaceMarker(html, "seo-body", `${renderFallback(page)}\n<div id="app"></div>`);
    return html;
  };

  for (const page of pages) {
    const output =
      page.path === "/"
        ? resolve(root, "index.html")
        : resolve(root, `${page.path.replace(/^\//, "").replace(/\/$/, "")}/index.html`);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, render(page));
  }
  await writeFile(resolve(root, "404.html"), render(getPage("/404")));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${pages.map((page) => `  <url><loc>${escapeHtml(page.canonical)}</loc><xhtml:link rel="alternate" hreflang="pt-BR" href="${escapeHtml(page.alternates.pt)}"/><xhtml:link rel="alternate" hreflang="en" href="${escapeHtml(page.alternates.en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(page.alternates.pt)}"/></url>`).join("\n")}\n</urlset>\n`;
  await writeFile(resolve(root, "sitemap.xml"), sitemap);

  // Preserve the existing allow-all policy. Search/indexing and model training
  // are different purposes; access is not a promise of indexing or AI citation.
  const robots = `# Public content is crawlable. This is not an access-control mechanism.\n# Googlebot / Bingbot: search indexing.\n# OAI-SearchBot / PerplexityBot: search and answer discovery.\n# GPTBot: model improvement/training; explicitly allowed under the existing policy.\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;
  await writeFile(resolve(root, "robots.txt"), robots);

  const home = pages.find((page) => page.path === "/");
  const llms = `# David Budeli\n\n> Personal portfolio of David Budeli (Alisson David da Silva), Software Engineer working with artificial intelligence, automation, and cybersecurity. Professional base: Curitiba, Paraná, Brazil.\n\nThis file is an experimental, supplementary navigation resource. It does not replace the public HTML, sitemap, robots.txt, or structured data and does not guarantee inclusion in AI-generated answers.\n\n## Identity and contact\n\n- [Portuguese portfolio](${ORIGIN}/): profile, solutions, technologies, projects, FAQ, and contact.\n- [English portfolio](${ORIGIN}/en/): English version of the same public information.\n- Role: ${siteContent.en.identity.role}. Work associated with Hyper Galaxy. No company-founding claims or legal corporate identity are asserted here.\n- [GitHub](https://github.com/DavidBudeli)\n- [Instagram](https://www.instagram.com/davidbudeli/)\n- [LinkedIn](https://www.linkedin.com/in/davidbudeli/)\n- [WhatsApp](https://wa.me/5541999360874)\n- [Email](mailto:consultoria@davidbudeli.com)\n\n## Portfolio cases (Portuguese)\n\n${home.projects.map((project) => `- [${project.title}](${ORIGIN}/project/${project.slug}): ${project.description}`).join("\n")}\n\n## Portfolio cases (English)\n\n${pages
    .filter((page) => page.kind === "project" && page.locale === "en")
    .map((page) => `- [${page.project.title}](${page.canonical}): ${page.description}`)
    .join(
      "\n",
    )}\n\n## Technical references\n\n- [Sitemap](${ORIGIN}/sitemap.xml)\n- [Crawler policy](${ORIGIN}/robots.txt)\n- [Licenses and attribution](${ORIGIN}/licencas.html)\n`;
  await writeFile(resolve(root, "llms.txt"), llms);
  console.log(
    `Prerendered ${pages.length} public pages plus 404.html; generated sitemap.xml, robots.txt, and llms.txt.`,
  );
} finally {
  await vite.close();
}
