import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
// Pages live at clean addresses (/, /fil/, /privacy/, /terms/); the old .html addresses are redirect stubs (checked below).
const pages = ["index.html", "fil/index.html", "privacy/index.html", "terms/index.html", "404.html"];
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
    if (file.endsWith(".html") && page !== "404.html" && !file.startsWith("/404"))
      errors.push(`${page}: link to ${url} shows the file name; use the clean address (/, /fil/, /privacy/, /terms/)`);
    let rel = file.startsWith("/") ? file.slice(1) : path.join(path.dirname(page), file);
    if (rel === "" || rel.endsWith("/") || rel.endsWith(path.sep)) rel = path.join(rel, "index.html");
    try {
      await access(path.join(root, rel));
    } catch {
      errors.push(`${page}: missing ${file}`);
      continue;
    }
    if (hash && rel.endsWith(".html")) {
      const other = await readFile(path.join(root, rel), "utf8");
      if (!other.includes(`id="${hash}"`))
        errors.push(`${page}: missing ${url}`);
    }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g))
    if (!/\balt="/.test(m[0])) errors.push(`${page}: image missing alt`);
}
// The old addresses stay alive as redirect stubs, so links already shared keep working.
for (const [stub, target] of [["fil.html", "/fil/"], ["privacy.html", "/privacy/"], ["terms.html", "/terms/"]]) {
  const html = await readFile(path.join(root, stub), "utf8");
  if (!html.includes(`url=${target}`) || !html.includes(`href="https://kinetixfsl.app${target}"`) || !html.includes("noindex"))
    errors.push(`${stub}: must redirect to ${target} (meta refresh, canonical, noindex)`);
}
const release = await readFile(path.join(root, "release.js"), "utf8");
if (!/available: true/.test(release) || !/sha256: "[a-f0-9]{64}"/.test(release))
  errors.push("release.js must be available with a valid SHA-256");
const home = await readFile(path.join(root, "index.html"), "utf8");
// The app's "Check for new updates" reads app-update.json: it must name the same APK as the Download button.
try {
  const update = JSON.parse(await readFile(path.join(root, "app-update.json"), "utf8"));
  if (!Number.isInteger(update.versionCode) || update.versionCode <= 0)
    errors.push("app-update.json: versionCode must be a positive whole number");
  if (!release.includes(`"${update.apkUrl}"`) || !release.includes(`"${update.sha256}"`))
    errors.push("app-update.json and release.js name different APKs (run tools/publish-release.mjs)");
  if (!home.includes(`"downloadUrl": "${update.apkUrl}"`))
    errors.push("index.html downloadUrl differs from app-update.json");
} catch (e) {
  errors.push(`app-update.json: ${e.message}`);
}
if ((home.match(/class="module"/g) || []).length !== 7)
  errors.push("Expected seven learning modules");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "PASS: four pages, local assets, navigation anchors, unique IDs, alt text, module count, indexing, release config, and app update file.",
  );
