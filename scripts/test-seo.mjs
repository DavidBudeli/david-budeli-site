import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, access } from "node:fs/promises";
import { resolve, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { runInNewContext } from "node:vm";

// Structural/build-contract checks, not a substitute for Google's validators,
// browser accessibility testing, Search Console, or field Core Web Vitals.
const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const origin = "https://davidbudeli.com";
const base = "http://127.0.0.1:3555";
const projectSource = await readFile(join(root, "src/content/projects/index.ts"), "utf8");
const ids = [...projectSource.match(/projectIds\s*=\s*\[([\s\S]*?)\]/)[1].matchAll(/"([a-z0-9-]+)"/g)].map(
  (match) => match[1],
);
assert.equal(ids.length, 7, "Expected seven existing project cases");
const routes = ["/", "/en/", ...ids.flatMap((id) => [`/project/${id}`, `/en/project/${id}`])];
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [
      match[1].toLowerCase(),
      decode(match[2] ?? match[3]),
    ]),
  );
const tags = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]));
const meta = (html, key) =>
  tags(html, "meta")
    .filter((attrs) => attrs.name === key || attrs.property === key)
    .map((attrs) => attrs.content);
const links = (html, rel) => tags(html, "link").filter((attrs) => attrs.rel?.split(/\s+/).includes(rel));
const types = (node) => (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]);
const routeFile = (route) => join(dist, route.slice(1), "index.html");
const textContent = (html) =>
  decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<!--[^]*?-->/g, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
const documents = new Map();
const titles = new Set();
const descriptions = new Set();
let checks = 0;

// Exercise the real capability guard without claiming browser-level GPU
// emulation. Only this small, DOM-free function body is evaluated in the VM.
const entrySource = await readFile(join(root, "src/main.ts"), "utf8");
const guardBody = entrySource.match(/const canUseWebGL\s*=\s*\(\)\s*=>\s*\{([\s\S]*?)\n\};/);
assert.ok(guardBody, "Extract actual WebGL capability guard");
const runWebGLGuard = (getContext) =>
  runInNewContext(`(() => {${guardBody[1]}\n})()`, {
    document: {
      createElement(tag) {
        assert.equal(tag, "canvas");
        return { getContext };
      },
    },
  });
assert.equal(
  runWebGLGuard(() => null),
  false,
  "WebGL unavailable selects readable fallback",
);
assert.equal(
  runWebGLGuard(() => {
    throw new Error("Context creation blocked");
  }),
  false,
  "WebGL creation errors select readable fallback",
);
let testContextReleased = false;
assert.equal(
  runWebGLGuard((type) => {
    assert.equal(type, "webgl2", "Probe the context version used by Three.js");
    return {
      getExtension(name) {
        assert.equal(name, "WEBGL_lose_context");
        return {
          loseContext() {
            testContextReleased = true;
          },
        };
      },
    };
  }),
  true,
  "Supported WebGL enables interactive enhancement",
);
assert.equal(testContextReleased, true, "Release the temporary capability-test GPU context");
assert.equal(
  runWebGLGuard(() => ({ getExtension: () => null })),
  true,
  "Context-release extension remains optional",
);

for (const route of routes) {
  const html = await readFile(routeFile(route), "utf8");
  documents.set(route, html);
  const canonical = origin + route;
  const en = route.startsWith("/en/");
  const ptRoute = en ? route.slice(3) : route;
  const enRoute = ptRoute === "/" ? "/en/" : `/en${ptRoute}`;
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  assert.ok(title.length > 10, `${route}: descriptive title`);
  assert.ok(!titles.has(title), `${route}: title must be unique`);
  titles.add(title);
  const description = meta(html, "description");
  assert.equal(description.length, 1, `${route}: exactly one description`);
  assert.ok(description[0].length >= 50, `${route}: meaningful description`);
  assert.ok(!descriptions.has(description[0]), `${route}: unique description`);
  descriptions.add(description[0]);
  assert.deepEqual(
    links(html, "canonical").map((attrs) => attrs.href),
    [canonical],
    `${route}: canonical`,
  );
  const alternates = links(html, "alternate").filter((attrs) => attrs.hreflang);
  const byLanguage = new Map(alternates.map((attrs) => [attrs.hreflang.toLowerCase(), attrs.href]));
  assert.equal(byLanguage.get("pt-br"), origin + ptRoute, `${route}: reciprocal pt-BR alternate`);
  assert.equal(byLanguage.get("en"), origin + enRoute, `${route}: reciprocal en alternate`);
  assert.equal(byLanguage.get("x-default"), origin + ptRoute, `${route}: x-default`);
  assert.equal(alternates.length, 3, `${route}: no duplicate hreflang entries`);
  const lang = attributes(html.match(/<html\b[^>]*>/i)?.[0] ?? "").lang;
  assert.equal(lang?.toLowerCase(), en ? "en" : "pt-br", `${route}: HTML language`);
  assert.deepEqual(meta(html, "og:title"), [title], `${route}: OG title parity`);
  assert.deepEqual(meta(html, "og:description"), description, `${route}: OG description parity`);
  assert.deepEqual(meta(html, "og:url"), [canonical], `${route}: OG URL parity`);
  assert.deepEqual(meta(html, "twitter:title"), [title], `${route}: Twitter title parity`);
  assert.deepEqual(meta(html, "twitter:description"), description, `${route}: Twitter description parity`);
  assert.deepEqual(meta(html, "twitter:card"), ["summary_large_image"], `${route}: Twitter card`);
  for (const image of [...meta(html, "og:image"), ...meta(html, "twitter:image")]) {
    const url = new URL(image);
    assert.equal(url.origin, origin, `${route}: own absolute sharing image URL`);
    await access(join(dist, url.pathname));
  }
  assert.ok(meta(html, "og:image").length && meta(html, "twitter:image").length, `${route}: sharing images`);
  assert.ok(links(html, "icon").length, `${route}: favicon`);
  assert.equal((html.match(/<h1(?:\s|>)/gi) ?? []).length, 1, `${route}: one initial h1`);
  assert.match(html, /<main(?:\s|>)/i, `${route}: initial main landmark`);
  const text = textContent(html);
  assert.ok(text.length > 300, `${route}: initial content without JavaScript`);
  assert.ok(text.includes("David Budeli"), `${route}: initial identity`);
  assert.ok(!/localhost|127\.0\.0\.1/.test(html), `${route}: no development URLs`);
  const schemas = [
    ...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ].map((match) => JSON.parse(match[1]));
  assert.equal(schemas.length, 1, `${route}: one JSON-LD document`);
  const schema = schemas[0];
  assert.equal(schema["@context"], "https://schema.org", `${route}: Schema.org context`);
  assert.ok(Array.isArray(schema["@graph"]) && schema["@graph"].length, `${route}: JSON-LD graph`);
  const person = schema["@graph"].find((node) => types(node).includes("Person"));
  assert.ok(person, `${route}: Person in graph`);
  assert.equal(person.name, "David Budeli", `${route}: professional name`);
  assert.equal(person.alternateName, "Alisson David da Silva", `${route}: full name supplied by owner`);
  assert.equal(person.url, origin + "/", `${route}: Person URL`);
  assert.ok(person.sameAs.includes("https://github.com/DavidBudeli"), `${route}: GitHub identity`);
  if (route.includes("/project/")) {
    const work = schema["@graph"].find((node) => types(node).includes("CreativeWork"));
    assert.ok(work, `${route}: project CreativeWork`);
    assert.equal(work.url, canonical, `${route}: work URL`);
    assert.ok(work.name && work.description, `${route}: named/described work`);
    assert.ok(!schema["@graph"].some((node) => node.aggregateRating || node.review), `${route}: no invented ratings`);
  } else {
    assert.ok(
      schema["@graph"].some((node) => types(node).includes("WebSite")),
      `${route}: WebSite`,
    );
    for (const id of ids) {
      assert.ok(
        tags(html, "a").some((attrs) => attrs.href === `${en ? "/en" : ""}/project/${id}`),
        `${route}: crawlable case link ${id}`,
      );
    }
  }
  checks++;
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
assert.match(
  sitemap,
  /<urlset\b[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/,
  "Sitemap XML namespace",
);
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.equal(new Set(locations).size, locations.length, "No duplicate sitemap URLs");
for (const route of routes) assert.ok(locations.includes(origin + route), `Sitemap includes ${route}`);
for (const location of locations) {
  const url = new URL(location);
  assert.equal(url.origin, origin, "Sitemap production origin");
  assert.ok(!url.search && !url.hash, "No parameter/fragment sitemap variants");
  assert.ok(routes.includes(url.pathname) || url.pathname === "/licencas.html", `No invented sitemap URL ${location}`);
}
const robots = await readFile(join(dist, "robots.txt"), "utf8");
assert.match(robots, /User-agent:\s*\*/i, "Wildcard crawler policy");
assert.match(robots, /Allow:\s*\//i, "Public crawling allowed");
assert.ok(!/^Disallow:\s*\/\s*$/im.test(robots), "No blanket crawl block");
assert.match(robots, /Sitemap:\s*https:\/\/davidbudeli\.com\/sitemap\.xml/i, "Sitemap discovery");
const llms = await readFile(join(dist, "llms.txt"), "utf8");
assert.match(llms, /^#\s+David Budeli/m, "llms.txt identity");
assert.ok(llms.includes(origin), "llms.txt production links");
for (const id of ids) assert.ok(llms.includes(`/project/${id}`), `llms.txt includes ${id}`);

const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: "3555" },
  stdio: ["ignore", "pipe", "pipe"],
  windowsHide: true,
});
let serverOutput = "";
server.stdout.on("data", (data) => {
  serverOutput += data;
});
server.stderr.on("data", (data) => {
  serverOutput += data;
});
let spawnError;
server.on("error", (error) => {
  spawnError = error;
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (spawnError || server.exitCode !== null) throw spawnError ?? new Error(`Server failed: ${serverOutput}`);
    try {
      const response = await fetch(base + "/", { signal: AbortSignal.timeout(1000) });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Startup race, retry briefly. */
    }
    await delay(100);
  }
  assert.ok(ready, `Production server ready: ${serverOutput}`);
  for (const route of routes) {
    const response = await fetch(base + route, { redirect: "manual" });
    assert.equal(response.status, 200, `GET ${route}`);
    assert.match(response.headers.get("content-type"), /text\/html/, `GET ${route} content type`);
    assert.equal(await response.text(), documents.get(route), `HTTP initial HTML matches generated ${route}`);
    const head = await fetch(base + route, { method: "HEAD", redirect: "manual" });
    assert.equal(head.status, 200, `HEAD ${route}`);
    assert.equal(await head.text(), "", `HEAD ${route} has no body`);
    checks++;
  }
  for (const pathname of ["/not-a-real-page", "/project/not-a-project", "/assets/missing.png"]) {
    assert.equal((await fetch(base + pathname, { redirect: "manual" })).status, 404, `Real 404 for ${pathname}`);
    const head = await fetch(base + pathname, { method: "HEAD", redirect: "manual" });
    assert.equal(head.status, 404, `HEAD 404 for ${pathname}`);
    assert.equal(await head.text(), "", `HEAD ${pathname} has no body`);
  }
  for (const [from, to] of [
    ["/en", "/en/"],
    ["/index.html", "/"],
    ["/en/index.html", "/en/"],
    [`/project/${ids[0]}/`, `/project/${ids[0]}`],
    [`/en/project/${ids[0]}/`, `/en/project/${ids[0]}`],
    [`/project/${ids[0]}/index.html`, `/project/${ids[0]}`],
    [`/en/project/${ids[0]}/index.html`, `/en/project/${ids[0]}`],
  ]) {
    const response = await fetch(base + from, { redirect: "manual" });
    assert.equal(response.status, 308, `Canonical redirect ${from}`);
    assert.equal(new URL(response.headers.get("location"), base).pathname, to, `Canonical target ${from}`);
  }
  for (const [path, contentType] of [
    ["/robots.txt", /text\/plain/],
    ["/llms.txt", /text\/plain/],
    ["/sitemap.xml", /(?:application|text)\/xml/],
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, `Technical file ${path}`);
    assert.match(response.headers.get("content-type"), contentType, `${path} content type`);
  }
  for (const pathname of ["/%2f%2fevil.example/index.html", "/%E0%A4%A", "/%00", "/%5c..%5cprivate"]) {
    const response = await fetch(base + pathname, { redirect: "manual" });
    assert.equal(response.status, 400, `Reject malformed or unsafe path ${pathname}`);
    assert.equal(response.headers.get("location"), null, `No redirect for unsafe path ${pathname}`);
  }
  const unsupported = await fetch(base + "/", { method: "POST", redirect: "manual" });
  assert.equal(unsupported.status, 405, "Reject unsupported methods");
  assert.equal(unsupported.headers.get("allow"), "GET, HEAD", "Advertise supported methods");
  const standard = await (await fetch(base + "/", { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  for (const agent of ["Googlebot", "bingbot", "OAI-SearchBot", "GPTBot", "PerplexityBot"]) {
    assert.equal(
      await (await fetch(base + "/", { headers: { "User-Agent": agent } })).text(),
      standard,
      `Same public HTML for ${agent}`,
    );
  }
  console.log(
    `SEO checks passed: ${routes.length} static pages, ${routes.length} HTTP GET/HEAD pairs, metadata/JSON-LD, hreflang, sitemap, robots, llms.txt, redirects, real 404s, unsafe-path/method rejection, agent-independent HTML, and mocked capability tests of the actual WebGL guard (${checks} page checks).`,
  );
  console.log(
    "Scope: structural assertions only; no claim of Google rich-result eligibility, indexing, rankings, or field Core Web Vitals.",
  );
} finally {
  server.kill();
  if (server.exitCode === null) await Promise.race([new Promise((done) => server.once("exit", done)), delay(2000)]);
}
