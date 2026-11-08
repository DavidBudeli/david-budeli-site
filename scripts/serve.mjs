import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT ?? 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const getFile = async (pathname) => {
  const safePath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = resolve(join(root, safePath === "/" ? "index.html" : safePath));

  if (candidate.startsWith(root)) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Client-side routes fall back to the app shell.
    }
  }

  return join(root, "index.html");
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://localhost");
    const file = await getFile(url.pathname);
    const extension = extname(file).toLowerCase();
    const body = await readFile(file);
    const isVersionedAsset = file.includes(`${join("dist", "assets")}`) || file.includes(`${join("dist", "chunks")}`);

    response.writeHead(200, {
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      "Cache-Control": isVersionedAsset ? "public, max-age=31536000, immutable" : "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal server error");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`David Budeli portfolio running on port ${port}`);
});
