import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT ?? 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};

const getFile = async (pathname) => {
  const decoded = decodeURIComponent(pathname);
  if (decoded.startsWith("//") || decoded.includes("\0") || decoded.includes("\\")) return { status: 400 };
  const candidate = resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(root + sep)) return { status: 400 };

  if (decoded.endsWith("/index.html")) {
    const base = decoded.slice(0, -11) || "/";
    return { location: base === "/en" ? "/en/" : base };
  }
  if (await exists(candidate)) return { file: candidate, status: 200 };

  const index = join(candidate, "index.html");
  if (await exists(index)) {
    const canonical =
      decoded === "/" ? "/" : decoded.replace(/\/+$/, "") === "/en" ? "/en/" : decoded.replace(/\/+$/, "");
    if (decoded !== canonical) return { location: canonical };
    return { file: index, status: 200 };
  }
  return { file: join(root, "404.html"), status: 404 };
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" });
      return response.end();
    }
    const result = await getFile(url.pathname);
    if (result.location) {
      response.writeHead(308, { Location: result.location + url.search });
      return response.end();
    }
    if (!result.file) {
      response.writeHead(result.status ?? 400);
      return response.end();
    }
    const { file } = result;
    const extension = extname(file).toLowerCase();
    const body = await readFile(file);
    const isVersionedAsset = file.includes(`${join("dist", "assets")}`) || file.includes(`${join("dist", "chunks")}`);

    response.writeHead(result.status, {
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      "Cache-Control": isVersionedAsset ? "public, max-age=31536000, immutable" : "no-cache",
      "Content-Length": body.length,
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    console.error(error);
    response.writeHead(error instanceof URIError ? 400 : 500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : "Unable to serve this request");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`David Budeli portfolio running on port ${port}`);
});
