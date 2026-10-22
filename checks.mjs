import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
const pages = ["index.html", "privacy.html", "terms.html", "404.html"];
const errors = [];
for (const page of pages) {
  const html = await readFile(path.join(root, page), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${page}: duplicate ids`);
  const noindex = html.includes("noindex,nofollow");
  if (noindex !== (page === "404.html"))
    errors.push(`${page}: only the 404 page should be noindex`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    errors.push(`${page}: expected one h1`);
  for (const m of html.matchAll(
    /<(?:a|link|script|img)\b[^>]*\b(?:href|src)="([^"]+)"/g,
  )) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [file, hash] = url.split("#");
    if (!file) {
      if (hash && !ids.includes(hash)) errors.push(`${page}: missing #${hash}`);
      continue;
    }
    try {
      await access(path.join(root, file));
    } catch {
      errors.push(`${page}: missing ${file}`);
    }
    if (hash && file.endsWith(".html")) {
      const other = await readFile(path.join(root, file), "utf8");
      if (!other.includes(`id="${hash}"`))
        errors.push(`${page}: missing ${url}`);
    }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g))
    if (!/\balt="/.test(m[0])) errors.push(`${page}: image missing alt`);
}
const release = await readFile(path.join(root, "release.js"), "utf8");
if (!/available: true/.test(release) || !/sha256: "[a-f0-9]{64}"/.test(release))
  errors.push("release.js must be available with a valid SHA-256");
const home = await readFile(path.join(root, "index.html"), "utf8");
if ((home.match(/class="module"/g) || []).length !== 7)
  errors.push("Expected seven learning modules");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "PASS: four pages, local assets, navigation anchors, unique IDs, alt text, module count, indexing, and release config.",
  );
