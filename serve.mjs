import http from "node:http";
import { readFile, stat, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const rootReal = await realpath(root);
const server = http.createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400);
      return res.end("Bad request");
    }
    let target = path.resolve(root, "." + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    if (pathname.split(/[\\/]/).some((part) => part.startsWith("."))) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    let status = 200;
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await stat(target);
    } catch {
      target = path.join(root, "404.html");
      status = 404;
    }
    const resolved = await realpath(target);
    if (resolved !== rootReal && !resolved.startsWith(rootReal + path.sep)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    const body = await readFile(target);
    res.writeHead(status, {
      "Content-Type": mime[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Length": body.length,
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(500);
    res.end("Preview server error");
  }
});
server.on("error", (e) => {
  console.error(
    e.code === "EADDRINUSE"
      ? `Port ${port} is already in use. Set PORT to another number or stop the existing preview.`
      : e.message,
  );
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Kinetix FSL preview: http://127.0.0.1:${port}\nPress Ctrl+C to stop.`,
  ),
);
